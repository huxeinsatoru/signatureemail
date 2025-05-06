import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorNotificationProps {
  error: string | null;
}

export default function ErrorNotification({ error }: ErrorNotificationProps) {
  if (!error) return null;

  return (
    <Alert variant="destructive" className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>HTML Error</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
}
