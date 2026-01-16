import FileExplorer from '@/components/files/FileExplorer';

export default function FilesPage() {
  return (
    <div className="h-[calc(100vh-4rem)] p-4">
      <h1 className="text-2xl font-bold mb-4">Files</h1>
      <FileExplorer />
    </div>
  );
}
