import { useRef } from "react";
import { Copy } from "lucide-react";

interface PreviewPaneProps {
  html: string;
  transformedHtml: string;
  onCopy: () => void;
}

export default function PreviewPane({ html, transformedHtml, onCopy }: PreviewPaneProps) {
  const previewRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full lg:w-1/2">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-google-sans font-medium">Gmail Preview</h3>
          <button 
            onClick={onCopy}
            className="bg-blue-600 text-white flex items-center text-sm px-4 py-2 rounded hover:bg-opacity-90 transition duration-150"
          >
            <Copy className="h-4 w-4 mr-1" />
            Copy for Gmail
          </button>
        </div>
        <div className="editor-container preview-pane">
          <div 
            ref={previewRef}
            className="w-full h-full p-4 overflow-auto"
            dangerouslySetInnerHTML={{ __html: html ? transformedHtml : '' }}
          />
        </div>
      </div>
    </div>
  );
}
