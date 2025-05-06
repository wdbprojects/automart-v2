import { CircleCheckBig } from "lucide-react";

interface FormSuccessProps {
  message?: string;
}

const DialogSuccess = ({ message }: FormSuccessProps) => {
  return (
    <div className="bg-emerald-500/15 rounded-md flex items-center gap-x-2 text-sm text-emerald-500 py-1 px-2">
      <CircleCheckBig className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

export default DialogSuccess;
