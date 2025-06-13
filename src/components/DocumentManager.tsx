import { useRef, useState } from 'react';
import { Download, FilePlus, Link as LinkIcon, X, Trash } from 'lucide-react';
import { saveAs } from 'file-saver';

interface Doc {
  name: string;
  date: string;
  type: string;
  status: string;
  content?: string; // raw string for demo download
}

interface Props {
  documents: Doc[];
  onAdd: (doc: Doc) => void;
  onDelete?: (index: number) => void;
}

/**
 * Simple document management table with:
 *  - per-row multi-format download (PDF, XLSX, DOCX, PNG)
 *  - upload from local machine
 *  - add by URL (fetches and stores as plain text in demo)
 */
const DocumentManager: React.FC<Props> = ({ documents, onAdd, onDelete }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [url, setUrl] = useState('');
  const [isUploading, setUploading] = useState(false);

  const handleLocalChoose = () => fileInputRef.current?.click();

  const handleLocalSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      onAdd({
        name: file.name,
        date: new Date().toISOString().split('T')[0],
        type: file.type || 'file',
        status: 'uploaded',
        content: reader.result as string
      });
    };
    reader.readAsText(file);
  };

  const handleAddByUrl = async () => {
    if (!url) return;
    setUploading(true);
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      onAdd({
        name: url.split('/').pop() || 'remote-file',
        date: new Date().toISOString().split('T')[0],
        type: blob.type || 'file',
        status: 'uploaded',
        content: ''
      });
    } catch (err) {
      console.error(err);
      alert('Failed to fetch URL');
    } finally {
      setUploading(false);
      setUrl('');
    }
  };

  const download = (doc: Doc, ext: 'pdf' | 'xlsx' | 'docx' | 'png') => {
    // Demo: just create a simple blob with placeholder content
    const blob = new Blob([`${doc.name} (${ext.toUpperCase()}) sample`], {
      type: 'application/octet-stream'
    });
    saveAs(blob, `${doc.name}.${ext}`);
  };

  return (
    <div>
      {/* Upload controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0 mb-6">
        <button
          onClick={handleLocalChoose}
          className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 flex items-center space-x-2"
        >
          <FilePlus className="h-4 w-4" />
          <span>Upload from Device</span>
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleLocalSelected}
          className="hidden"
        />

        <div className="flex-1 flex items-center space-x-2">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste file URL…"
            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
          />
          {url && (
            <button onClick={() => setUrl('')} className="text-gray-400 hover:text-gray-600">
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={handleAddByUrl}
            disabled={!url || isUploading}
            className="bg-primary-500 text-white px-3 py-2 rounded-lg hover:bg-primary-600 disabled:opacity-50 flex items-center space-x-1"
          >
            <LinkIcon className="h-4 w-4" />
            <span>Add URL</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left font-semibold text-gray-600">Name</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-600">Date</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-600">Type</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {documents.map((doc, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-2 whitespace-nowrap">{doc.name}</td>
                <td className="px-4 py-2 whitespace-nowrap">{doc.date}</td>
                <td className="px-4 py-2 whitespace-nowrap">{doc.type}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {(['pdf', 'xlsx', 'docx', 'png'] as const).map((ext) => (
                      <button
                        key={ext}
                        onClick={() => download(doc, ext)}
                        className="group inline-flex items-center p-2 bg-gray-50 hover:bg-primary-50 text-gray-500 hover:text-primary-600 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-200"
                        aria-label={`Download as ${ext.toUpperCase()}`}
                        title={`Download as ${ext.toUpperCase()}`}
                      >
                        <Download className="h-4 w-4" />
                        <span className="ml-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                          {ext}
                        </span>
                      </button>
                    ))}
                    {/* Delete */}
                    <button
                      onClick={() => {
                        if (confirm('Delete this document?')) {
                          onDelete?.(idx);
                        }
                      }}
                      className="group inline-flex items-center p-2 bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-200"
                      aria-label="Delete document"
                      title="Delete document"
                    >
                      <Trash className="h-4 w-4" />
                      <span className="ml-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        Del
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentManager;
