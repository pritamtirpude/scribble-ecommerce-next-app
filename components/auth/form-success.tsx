import { CheckCircle2 } from "lucide-react";

export default function FormSuccess({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="bg-teal-400/25 flex items-center my-4 text-xs font-medium gap-2 text-secondary-foreground p-3 rounded-md">
      <CheckCircle2 className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
}
