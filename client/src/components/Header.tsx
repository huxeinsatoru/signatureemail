import { Mail } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white mr-3">
            <Mail size={20} />
          </div>
          <h1 className="font-google-sans text-2xl font-medium text-gray-900">Gmail Signature Generator</h1>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <a 
            href="https://support.google.com/mail/answer/8395" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-opacity-80 transition duration-150 flex items-center"
          >
            <span className="material-icons mr-1 text-sm">help_outline</span>
            <span className="text-sm">Gmail Signature Help</span>
          </a>
        </div>
      </div>
    </header>
  );
}
