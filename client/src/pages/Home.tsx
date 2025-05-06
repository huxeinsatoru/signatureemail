import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HtmlEditor from "@/components/HtmlEditor";
import PreviewPane from "@/components/PreviewPane";
import CleanupOptions from "@/components/CleanupOptions";
import UsageGuide from "@/components/UsageGuide";
import CopiedNotification from "@/components/CopiedNotification";
import ErrorNotification from "@/components/ErrorNotification";
import { 
  DEFAULT_HTML, 
  DEFAULT_OPTIONS, 
  CleanupOptions as CleanupOptionsType,
  transformHtml,
  validateHtml
} from "@/lib/htmlTransformer";

export default function Home() {
  const [html, setHtml] = useState(DEFAULT_HTML);
  const [transformedHtml, setTransformedHtml] = useState("");
  const [options, setOptions] = useState<CleanupOptionsType>(DEFAULT_OPTIONS);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Transform HTML whenever the html or options change
  useEffect(() => {
    // Validate HTML first
    const validation = validateHtml(html);
    if (!validation.valid && validation.error) {
      setError(validation.error);
      // Still attempt to transform the HTML for preview
      setTransformedHtml(transformHtml(html, options));
      return;
    }

    // Clear any previous errors
    setError(null);
    // Transform the HTML
    setTransformedHtml(transformHtml(html, options));
  }, [html, options]);

  // Handle copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(transformedHtml);
      setCopied(true);
      // Reset copied state after animation
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError("Failed to copy to clipboard. Please try again.");
    }
  };

  // Handle clearing the editor
  const handleClear = () => {
    setHtml("");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 py-6 flex-grow">
        <div className="mb-6">
          <h2 className="font-google-sans text-xl font-medium mb-2">Format Your HTML for Gmail Compose</h2>
          <p className="text-gray-600">
            Paste your HTML code, preview how it will look in Gmail, and copy the formatted code to use in Gmail compose.
          </p>
        </div>

        <ErrorNotification error={error} />

        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
          <HtmlEditor 
            html={html} 
            onChange={setHtml} 
            onClear={handleClear} 
          />
          
          <div className="w-full lg:w-1/2 flex flex-col">
            <PreviewPane 
              html={html}
              transformedHtml={transformedHtml} 
              onCopy={handleCopy} 
            />
            
            <UsageGuide />
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">Gmail HTML Formatter | Optimizes your HTML for Gmail compose</p>
            <div className="mt-4 md:mt-0">
              <a href="https://support.google.com/mail/answer/176654" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">Gmail HTML Support</a>
              <span className="mx-2 text-gray-300">|</span>
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">Privacy</a>
            </div>
          </div>
        </div>
      </footer>

      <CopiedNotification visible={copied} />
    </div>
  );
}
