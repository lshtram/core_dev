import { createClient } from '@/lib/supabase/client';
import { FileItem, CreateFolderDTO, FileFilter } from './types';
import { v4 as uuidv4 } from 'uuid';

export class FileService {
  private supabase = createClient();

  /**
   * List files in a folder or search
   */
  async list(filter: FileFilter): Promise<FileItem[]> {
    let query = this.supabase
      .from('storage_files' as any)
      .select('*')
      .order('type', { ascending: false }) // Folders first
      .order('name', { ascending: true });

    if (filter.deleted) {
       query = query.not('deleted_at', 'is', null);
    } else {
       query = query.is('deleted_at', null);
    }

    if (filter.parent_id !== undefined) {
       // if parent_id is explicitly null (root), check for null
       if (filter.parent_id === null) {
         query = query.is('parent_id', null);
       } else {
         query = query.eq('parent_id', filter.parent_id);
       }
    }

    if (filter.search) {
      query = query.ilike('name', `%${filter.search}%`);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as any as FileItem[];
  }

  /**
   * Upload a file (Transaction: Storage + DB)
   */
  async upload(file: File, parent_id: string | null): Promise<FileItem> {
    // 1. Quota Check (Pre-flight) - Simplified for now
    const { data: user } = await this.supabase.auth.getUser();
    if (!user.user) throw new Error('Unauthorized');
    
    // TODO: Fetch org quota and validate
    
    // 2. Upload to Storage
    const ext = file.name.split('.').pop();
    const objectId = uuidv4();
    const storagePath = `${user.user.user_metadata.org_id}/${objectId}.${ext}`;
    
    const { error: uploadError } = await this.supabase.storage
      .from('files')
      .upload(storagePath, file);
      
    if (uploadError) throw uploadError;

    // 3. Insert Metadata
    const { data: fileItem, error: dbError } = await this.supabase
      .from('storage_files' as any)
      .insert({
        name: file.name,
        type: 'file',
        mime_type: file.type,
        size: file.size,
        parent_id,
        storage_path: storagePath,
      })
      .select()
      .single();

    if (dbError) {
      // Rollback Storage (Orphan cleanup later)
      await this.supabase.storage.from('files').remove([storagePath]);
      throw dbError;
    }

    return fileItem as unknown as FileItem;
  }

  /**
   * Create a virtual folder
   */
  async createFolder(dto: CreateFolderDTO): Promise<FileItem> {
    const { data, error } = await this.supabase
      .from('storage_files' as any)
      .insert({
        name: dto.name,
        type: 'folder',
        parent_id: dto.parent_id,
        size: 0
      })
      .select()
      .single();

    if (error) throw error;
    return data as unknown as FileItem;
  }

  /**
   * Soft Delete
   */
  async delete(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('storage_files' as any)
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw error;
  }

  /**
   * Move / Rename
   */
  async update(id: string, updates: Partial<Pick<FileItem, 'name' | 'parent_id'>>): Promise<void> {
    const { error } = await this.supabase
      .from('storage_files' as any)
      .update(updates)
      .eq('id', id);

    if (error) throw error;
  }

  /**
   * Get Download URL
   */
  async getDownloadUrl(path: string): Promise<string> {
    const { data } = await this.supabase.storage
      .from('files')
      .createSignedUrl(path, 60 * 60); // 1 hour
    
    if (!data?.signedUrl) throw new Error('Could not generate URL');
    return data.signedUrl;
  }
  
  /**
   * Get Usage Stats
   */
  async getUsage(userId?: string): Promise<number> {
      let query = this.supabase
        .from('storage_files' as any)
        .select('size');
        
      if (userId) {
          query = query.eq('owner_id', userId);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      
      // Aggregate in JS (DB sum is better but requires RPC)
      return (data as any[]).reduce((acc: number, curr: { size: number | null }) => acc + (curr.size || 0), 0);
  }
}
