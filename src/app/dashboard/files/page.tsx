'use client';
import FileExplorer from '@/components/files/FileExplorer';
import { 
  Folder, 
  Users, 
  Star, 
  Trash2, 
  Cloud,
  LayoutGrid,
  Menu
} from 'lucide-react';

export default function FilesPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)] bg-white overflow-hidden">
      {/* Secondary Sidebar */}
      <aside className="w-64 border-r border-gray-100 flex flex-col shrink-0 bg-gray-50/20">
        <div className="p-6">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Storage</h2>
          
          <nav className="space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-semibold text-blue-600 bg-blue-50/50 rounded-xl">
              <Folder size={18} fill="currentColor" />
              My Files
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 rounded-xl transition-colors">
              <Users size={18} />
              Shared
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 rounded-xl transition-colors">
              <Star size={18} />
              Starred
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 rounded-xl transition-colors">
              <Trash2 size={18} />
              Trash
            </button>
          </nav>
        </div>

        {/* Quota Indicator */}
        <div className="mt-auto p-6 border-t border-gray-100/50">
          <div className="mb-4">
            <div className="flex justify-between text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-widest">
                <span>Usage</span>
                <span>2.4 MB / 1 GB</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div className="bg-blue-600 h-1.5 rounded-full shadow-sm" style={{ width: '0.2%' }}></div>
            </div>
          </div>
          <button className="w-full py-2.5 px-4 bg-gray-900 text-white text-xs font-bold rounded-xl hover:bg-black transition-all shadow-lg shadow-gray-200">
            Upgrade Storage
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 p-6 overflow-hidden">
             <FileExplorer />
        </div>
      </main>
    </div>
  );
}
