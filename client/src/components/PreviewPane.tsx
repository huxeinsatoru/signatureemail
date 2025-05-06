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
          <h3 className="font-google-sans font-medium">Signature Preview</h3>
          <button 
            onClick={onCopy}
            className="bg-blue-600 text-white flex items-center text-sm px-4 py-2 rounded hover:bg-opacity-90 transition duration-150"
          >
            <Copy className="h-4 w-4 mr-1" />
            Copy for Gmail
          </button>
        </div>
        <div className="editor-container preview-pane">
          <div className="flex flex-col">
            <div className="px-4 py-2 bg-gray-100 border-b text-xs text-gray-500">
              Mobile View
            </div>
            <div
              style={{maxWidth: "375px", margin: "0 auto", border: "1px solid #e5e7eb"}}
              className="w-full mt-4 mb-8 overflow-auto bg-white py-4"
            >
              <div 
                dangerouslySetInnerHTML={{ __html: html ? transformedHtml : '' }}
              />
            </div>
            <div className="px-4 py-2 bg-gray-100 border-b text-xs text-gray-500">
              Desktop View
            </div>
            <div 
              ref={previewRef}
              className="w-full p-4 overflow-auto bg-white"
              dangerouslySetInnerHTML={{ __html: html ? transformedHtml : '' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
