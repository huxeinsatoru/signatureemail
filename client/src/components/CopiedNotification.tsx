import { CheckCircle } from "lucide-react";

interface CopiedNotificationProps {
  visible: boolean;
}

export default function CopiedNotification({ visible }: CopiedNotificationProps) {
  return (
    <div 
      className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg flex items-center pointer-events-none ${
        visible ? 'copied-notification' : 'opacity-0'
      }`}
    >
      <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
      <span>HTML copied to clipboard!</span>
    </div>
  );
}
