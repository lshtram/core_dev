'use client';
import { useState, useEffect } from 'react';
import { FileService } from '@/modules/files/FileService';
import { FileItem } from '@/modules/files/types';
import { createClient } from '@/lib/supabase/client';

export default function FileExplorer() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [parentId, setParentId] = useState<string | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<{id: string, name: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const service = new FileService();

  useEffect(() => {
    loadFiles();
  }, [parentId]);

  async function loadFiles() {
    setLoading(true);
    try {
      const data = await service.list({ parent_id: parentId });
      setFiles(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  function handleNavigate(folder: FileItem) {
    setParentId(folder.id);
    setBreadcrumbs([...breadcrumbs, { id: folder.id, name: folder.name }]);
  }

  function handleUp() {
    if (breadcrumbs.length === 0) return;
    const newCrumbs = [...breadcrumbs];
    newCrumbs.pop();
    setBreadcrumbs(newCrumbs);
    setParentId(newCrumbs.length > 0 ? newCrumbs[newCrumbs.length - 1].id : null);
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
             <button onClick={() => { setParentId(null); setBreadcrumbs([]); }} className="hover:text-blue-600">Home</button>
             {breadcrumbs.map((crumb, idx) => (
                 <span key={crumb.id} className="flex items-center">
                     <span className="mx-1">/</span>
                     <span className={idx === breadcrumbs.length - 1 ? 'font-bold text-gray-900' : ''}>{crumb.name}</span>
                 </span>
             ))}
        </div>
        <div className="flex space-x-2">
            <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">Upload</button>
            <button className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50">New Folder</button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-auto">
        {loading ? (
             <div className="flex justify-center items-center h-32 text-gray-400">Loading...</div>
        ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {parentId && (
                    <div onClick={handleUp} className="flex flex-col items-center justify-center p-4 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 text-gray-400">
                        <span>..</span> 
                    </div>
                )}
                
                {files.map(file => (
                    <div 
                        key={file.id}
                        onClick={() => file.type === 'folder' && handleNavigate(file)}
                        className={`group relative flex flex-col items-center p-4 rounded-xl border ${file.type === 'folder' ? 'border-gray-100 bg-gray-50' : 'border-gray-200 bg-white'} hover:border-blue-400 hover:shadow-sm cursor-pointer transition-all`}
                    >
                        {file.type === 'folder' ? (
                             <div className="text-blue-500 text-4xl mb-2">📁</div>
                        ) : (
                             <div className="text-gray-400 text-4xl mb-2">📄</div>
                        )}
                        <span className="text-sm text-gray-700 truncate w-full text-center">{file.name}</span>
                        <span className="text-xs text-gray-400">{file.type === 'folder' ? '-' : (file.size / 1024).toFixed(1) + ' KB'}</span>
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
}
