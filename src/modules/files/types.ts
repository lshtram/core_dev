export interface FileItem {
  id: string;
  org_id: string;
  owner_id: string;
  parent_id: string | null;
  name: string;
  type: 'file' | 'folder';
  mime_type?: string;
  size: number; // in bytes
  storage_path?: string; // Null for folders
  deleted_at?: string; // ISO Date for soft delete
  created_at: string;
  updated_at: string;
}

export interface CreateFolderDTO {
  parent_id: string | null;
  name: string;
}

export interface FileFilter {
  parent_id?: string | null; // Use 'root' or null for top level
  search?: string;
  deleted?: boolean; // If true, list from Trash
}
