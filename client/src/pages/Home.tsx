import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HtmlEditor from "@/components/HtmlEditor";
import PreviewPane from "@/components/PreviewPane";
import CleanupOptions from "@/components/CleanupOptions";
import UsageGuide from "@/components/UsageGuide";
import CopiedNotification from "@/components/CopiedNotification";
import ErrorNotification from "@/components/ErrorNotification";
import SignatureForm from "@/components/SignatureForm";
import { 
  DEFAULT_HTML, 
  DEFAULT_OPTIONS, 
  DEFAULT_SIGNATURE_DATA,
  SignatureData,
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
  const [signatureData, setSignatureData] = useState<SignatureData>(DEFAULT_SIGNATURE_DATA);
  const [activeTab, setActiveTab] = useState<'editor' | 'form'>('form'); // default to form view

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

  // Generate HTML from signature data
  const generateSignatureHtml = (data: SignatureData) => {
    // Using template literals to generate the HTML with the updated data
    const generatedHtml = `<!-- Gmail Signature Template -->
<table style="max-width:600px; width:100%; border-collapse:collapse; font-family:Arial, sans-serif; color:#ffffff;" cellpadding="0" cellspacing="0" border="0">
  <!-- Header with Name, Title and Logo -->
  <tr>
    <td style="background-color:#000000; padding:20px;">
      <!-- Profile Photo and Name Section -->
      <table style="width:100%;" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="width:80px; vertical-align:middle;">
            <img src="${data.profileImageUrl}" alt="Profile Photo" style="display:block; width:80px; height:80px; border-radius:40px; border:none; object-fit:cover; image-rendering:high-quality; -ms-interpolation-mode:bicubic;">
          </td>
          <td style="padding-left:20px; vertical-align:middle; width:60%;">
            <div style="font-size:20px; font-weight:bold;">${data.name}</div>
            <div style="font-size:14px; color:#cccccc;">${data.title}</div>
          </td>
          <td style="text-align:right; vertical-align:middle; width:20%; padding-left:20px;">
            <img src="${data.companyLogoUrl}" alt="Company Logo" style="display:block; max-width:100px; width:auto; height:auto; max-height:40px; border:none; margin-left:auto; image-rendering:high-quality; -ms-interpolation-mode:bicubic;">
          </td>
        </tr>
      </table>
    </td>
  </tr>
  
  <!-- Contact Information -->
  <tr>
    <td style="background-color:#1a1a1a; padding:20px;">
      <!-- Contact Section -->
      <table style="width:100%; color:#cccccc; font-size:12px;" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding-bottom:15px;">
            <div style="font-weight:bold; color:#ffffff; margin-bottom:5px;">Contact</div>
            <div>${data.name}</div>
            <div>${data.phone}</div>
            <div><a href="mailto:${data.email}" style="color:#cccccc; text-decoration:none;">${data.email}</a></div>
          </td>
        </tr>
        
        <!-- Company Information -->
        <tr>
          <td style="padding-bottom:15px;">
            <div style="font-weight:bold; color:#ffffff; margin-bottom:5px;">Company</div>
            <div>${data.company}</div>
            <div>${data.address}</div>
            <div><a href="https://${data.website}" style="color:#cccccc; text-decoration:none;">${data.website}</a> • <a href="mailto:${data.email}" style="color:#cccccc; text-decoration:none;">${data.email}</a> • ${data.companyRegistration}</div>
          </td>
        </tr>
        
        <!-- Governance Information -->
        <tr>
          <td style="padding-bottom:15px;">
            <div style="font-weight:bold; color:#ffffff; margin-bottom:5px;">Governance</div>
            <div>Supervisory Board: RA Berthold Yahya • Julian J. Schrader, M.Sc. • Tanja Scheuering, B.Sc.</div>
            <div>Advisory Board: Axel Scheuering • Daniel Unger • Volker Walther • Axel Goldau • Kurt Groh • Luke Greenwood</div>
            <div>Auditor: Harald Albert Belzer</div>
          </td>
        </tr>
        
        <!-- Corporate Group Information -->
        <tr>
          <td style="padding-bottom:15px;">
            <div style="font-weight:bold; color:#ffffff; margin-bottom:5px;">Corporate Group</div>
            <div>Peak Atlas Group AG is the parent of a corporate group ("Konzern") comprising:</div>
            <div>Management Company – Peak Atlas HQ GmbH, District Court of Würzburg, HRB 17790 Intermediate</div>
            <div>Holding Company – Peak Atlas UG, District Court of Würzburg, HRB 17694</div>
            <div>Project Company – Peak Atlas Office UG, District Court of Würzburg, HRB 17806</div>
          </td>
        </tr>
        
        <!-- Disclaimer -->
        <tr>
          <td>
            <div style="font-weight:bold; color:#ffffff; margin-bottom:5px;">Disclaimer</div>
            <div>This email and any attachments are confidential and intended solely for the use of the individual or entity to whom they are addressed. If you are not the intended recipient, please notify the sender immediately and delete this email from your system. Any unauthorized use, disclosure, or distribution is prohibited.</div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
    
    setHtml(generatedHtml);
  };

  // Update signature when data changes
  useEffect(() => {
    if (activeTab === 'form') {
      generateSignatureHtml(signatureData);
    }
  }, [signatureData, activeTab]);

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
          <h2 className="font-google-sans text-xl font-medium mb-2">Gmail Signature Generator</h2>
          <p className="text-gray-600">
            Create a professional email signature for Gmail. Customize your details, preview how it will look, and copy to use in Gmail.
          </p>
        </div>

        <ErrorNotification error={error} />

        {/* Tab Switcher */}
        <div className="mb-6 flex border-b border-gray-200">
          <button 
            className={`py-2 px-4 font-medium ${activeTab === 'form' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('form')}
          >
            Easy Editor
          </button>
          <button 
            className={`py-2 px-4 font-medium ${activeTab === 'editor' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('editor')}
          >
            Advanced HTML Editor
          </button>
        </div>

        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
          {activeTab === 'form' ? (
            <SignatureForm 
              data={signatureData}
              onChange={setSignatureData}
            />
          ) : (
            <HtmlEditor 
              html={html} 
              onChange={setHtml} 
              onClear={handleClear} 
            />
          )}
          
          <div className="w-full lg:w-1/2 flex flex-col">
            <PreviewPane 
              html={html}
              transformedHtml={transformedHtml} 
              onCopy={handleCopy} 
            />
            
            <div className="mt-4 space-y-4">
              <CleanupOptions options={options} onChange={setOptions} />
              <UsageGuide />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">Gmail Signature Generator | Create professional email signatures</p>
            <div className="mt-4 md:mt-0">
              <a href="https://support.google.com/mail/answer/8395" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">Gmail Signature Help</a>
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
