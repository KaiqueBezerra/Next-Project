import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center mt-5">
      <div className="animate-spin text-gray-500">
        <Loader2 className="size-12" />
      </div>
    </div>
  );
}
