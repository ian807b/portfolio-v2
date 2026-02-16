import { Eye } from "lucide-react";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { formatNumber } from "@/lib/utils";

export default function VisitorCounter() {
  const { visitorCount, isLoading } = useVisitorTracking();

  if (isLoading) {
    return (
      <div className="flex items-center gap-1.5 text-text-muted text-sm">
        <Eye size={14} />
        <span>---</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 text-text-muted text-sm">
      <Eye size={14} />
      <span>{formatNumber(visitorCount)} visitors</span>
    </div>
  );
}
