import { useState, useEffect, useRef } from 'react';
import { FileService } from '@/modules/files/FileService';
import { FileItem } from '@/modules/files/types';
import { 
  Folder, 
  File, 
  MoreVertical, 
  Download, 
  Trash2, 
  Edit3, 
  ExternalLink,
  ChevronRight,
  Plus
} from 'lucide-react';

export default function FileExplorer() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [parentId, setParentId] = useState<string | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<{id: string, name: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number, file: FileItem } | null>(null);
  
  const service = new FileService();

  useEffect(() => {
    loadFiles();
  }, [parentId]);

  async function loadFiles() {
    setLoading(true);
    try {
      const data = await service.list({ parent_id: parentId });
    } catch (e: any) {
      console.error('FileExplorer loadFiles error:', e);
      // If it's a Supabase error, it might have .message
      if (e?.message) console.error('Error message:', e.message);
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

  const onContextMenu = (e: React.MouseEvent, file: FileItem) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, file });
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden" onClick={() => setContextMenu(null)}>
      {/* Header / Breadcrumbs */}
      <header className="h-16 border-b border-gray-50 flex items-center justify-between px-6 shrink-0 bg-white z-10">
        <div className="flex items-center gap-2 overflow-hidden">
          <button 
            onClick={() => { setParentId(null); setBreadcrumbs([]); }}
            className={`text-sm font-medium ${breadcrumbs.length === 0 ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
          >
            All Files
          </button>
          {breadcrumbs.map((crumb, idx) => (
            <div key={crumb.id} className="flex items-center min-w-0">
              <ChevronRight size={14} className="text-gray-300 shrink-0" />
              <span className={`text-sm font-medium truncate ${idx === breadcrumbs.length - 1 ? 'text-gray-900' : 'text-gray-400'}`}>
                {crumb.name}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition shadow-sm">
            <Plus size={14} />
            New
          </button>
        </div>
      </header>

      {/* Grid Content */}
      <div className="flex-1 p-6 overflow-y-auto bg-gray-50/30">
        {loading ? (
          <div className="flex flex-col justify-center items-center h-48 gap-3">
             <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
             <p className="text-sm text-gray-400 font-medium">Loading files...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
            {parentId && (
              <div 
                onClick={handleUp}
                className="group flex flex-col items-center justify-center p-4 h-32 rounded-2xl border border-dashed border-gray-200 hover:border-blue-300 hover:bg-white cursor-pointer transition-all"
              >
                <div className="text-gray-300 group-hover:text-blue-400 rotate-180 transition-colors">
                    <ChevronRight size={24} />
                </div>
                <span className="text-xs font-medium text-gray-400 mt-2">Go back</span>
              </div>
            )}

            {files.map(file => (
              <div 
                key={file.id}
                onClick={() => file.type === 'folder' && handleNavigate(file)}
                onContextMenu={(e) => onContextMenu(e, file)}
                className={`group relative flex flex-col p-4 h-32 rounded-2xl border bg-white shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer ${file.type === 'folder' ? 'border-gray-50' : 'border-gray-100'}`}
              >
                <div className="flex items-start justify-between mb-auto">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      file.type === 'folder' ? 'bg-yellow-50 text-yellow-500' : 
                      file.mime_type?.includes('pdf') ? 'bg-red-50 text-red-500' :
                      file.mime_type?.includes('image') ? 'bg-green-50 text-green-500' :
                      'bg-blue-50 text-blue-500'
                    }`}>
                        {file.type === 'folder' ? <Folder size={20} fill="currentColor" /> : <File size={20} />}
                    </div>
                    <button className="text-gray-300 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical size={16} />
                    </button>
                </div>
                
                <div className="mt-auto overflow-hidden">
                    <h3 className="font-semibold text-sm text-gray-900 truncate">{file.name}</h3>
                    <p className="text-[10px] font-medium text-gray-400 mt-0.5 truncate uppercase tracking-wider">
                        {file.type === 'folder' ? 'Directory' : `${(file.size / 1024).toFixed(1)} KB • ${file.mime_type?.split('/')[1] || 'File'}`}
                    </p>
                </div>
              </div>
            ))}
            
            {files.length === 0 && !parentId && (
                <div className="col-span-full py-20 flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-300 mb-4">
                        <Folder size={32} />
                    </div>
                    <h3 className="text-gray-900 font-semibold italic">Empty Explorer</h3>
                    <p className="text-sm text-gray-400 mt-1">Start by uploading some files.</p>
                </div>
            )}
          </div>
        )}
      </div>

      {/* Context Menu Overlay */}
      {contextMenu && (
        <div 
            className="fixed bg-white shadow-xl rounded-xl border border-gray-100 py-2 w-48 z-50 animate-in fade-in zoom-in duration-100"
            style={{ top: contextMenu.y, left: contextMenu.x }}
            onClick={(e) => e.stopPropagation()}
        >
            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                <Download size={14} className="text-gray-400" /> Download
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                <Edit3 size={14} className="text-gray-400" /> Rename
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                <ExternalLink size={14} className="text-gray-400" /> Share Link
            </button>
            <div className="h-px bg-gray-100 my-1" />
            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                <Trash2 size={14} /> Delete
            </button>
        </div>
      )}
    </div>
  );
}
