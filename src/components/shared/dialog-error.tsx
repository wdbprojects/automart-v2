import { TriangleAlert } from "lucide-react";

interface FormErrorProps {
  message?: string;
}

const DialogError = ({ message }: FormErrorProps) => {
  return (
    <div className="bg-destructive/15 rounded-md flex items-center gap-x-2 text-sm text-destructive py-1 px-2">
      <TriangleAlert className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

export default DialogError;
