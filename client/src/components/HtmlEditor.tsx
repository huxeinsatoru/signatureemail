import { useRef, useEffect } from "react";
import { Trash2 } from "lucide-react";

interface HtmlEditorProps {
  html: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export default function HtmlEditor({ html, onChange, onClear }: HtmlEditorProps) {
  const editorRef = useRef<HTMLTextAreaElement>(null);

  // Auto-focus the editor on mount
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, []);

  return (
    <div className="w-full lg:w-1/2">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-google-sans font-medium">HTML Input</h3>
          <button 
            onClick={onClear}
            className="text-gray-500 hover:text-gray-900 flex items-center text-sm px-3 py-1 rounded hover:bg-gray-100 transition duration-150"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Clear
          </button>
        </div>
        <div className="editor-container">
          <textarea 
            ref={editorRef}
            value={html}
            onChange={(e) => onChange(e.target.value)}
            className="code-editor w-full h-full p-4 text-sm focus:outline-none" 
            placeholder="Paste your HTML code here..."
          />
        </div>
      </div>
    </div>
  );
}
