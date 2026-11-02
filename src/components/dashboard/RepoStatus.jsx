import { cn } from "../../lib/utils.js";
import { Badge } from "../ui/Badge.jsx";

export function indexStatusLabel(status) {
  switch (status) {
    case "READY": return "Ready";
    case "INDEXING": return "Indexing";
    case "FAILED": return "Failed";
    default: return "Not indexed";
  }
}

export function IndexStatusBadge({ status, className }) {
  const variant =
    status === "READY" ? "default"
    : status === "FAILED" ? "destructive"
    : status === "INDEXING" ? "secondary"
    : "outline";

  return (
    <Badge variant={variant} className={cn(className)}>
      {status === "INDEXING" && (
        <span className="mr-1 size-1.5 animate-pulse rounded-full bg-current" />
      )}
      {indexStatusLabel(status)}
    </Badge>
  );
}

export function languageColor(language) {
  const map = {
    TypeScript: "bg-sky-500",
    JavaScript: "bg-amber-400",
    Java: "bg-orange-500",
    Python: "bg-emerald-500",
    Go: "bg-cyan-500",
    Rust: "bg-orange-700",
    Kotlin: "bg-violet-500",
  };
  return map[language ?? ""] ?? "bg-muted-foreground";
}
