import { useState } from "react";
import { AlertCircle, ChevronDown } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "../ui/Alert.jsx";
import { cn } from "../../lib/utils.js";

const SUMMARY_LIMIT = 100;

function getErrorSummary(message) {
  const line = message.split("\n").find((part) => part.trim())?.trim() ?? message;
  if (line.length <= SUMMARY_LIMIT) return line;
  return `${line.slice(0, SUMMARY_LIMIT - 1)}…`;
}

export function IndexErrorAlert({ message }) {
  const [open, setOpen] = useState(false);
  const summary = getErrorSummary(message);
  const isExpandable = message.trim().length > summary.length;

  return (
    <Alert variant="destructive" className="border-dashed border-destructive/30 bg-destructive/5 px-3 py-2.5">
      <AlertCircle className="size-4" />
      <AlertTitle className="text-xs font-semibold">Indexing failed</AlertTitle>
      <AlertDescription className="text-xs text-destructive/90">
        {!isExpandable ? (
          <p className="break-words leading-relaxed">{message}</p>
        ) : (
          <div>
            {!open && <p className="break-words leading-relaxed">{summary}</p>}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className={cn(
                "inline-flex items-center gap-1 font-medium text-destructive hover:underline",
                !open ? "mt-1.5" : "mt-0"
              )}
            >
              {open ? "Hide details" : "Show details"}
              <ChevronDown className={cn("size-3 transition-transform", open && "rotate-180")} />
            </button>
            {open && (
              <div className="mt-2 max-h-28 overflow-y-auto rounded-md border border-destructive/20 bg-destructive/10 p-2.5">
                <p className="break-words whitespace-pre-wrap leading-relaxed">{message}</p>
              </div>
            )}
          </div>
        )}
      </AlertDescription>
    </Alert>
  );
}
