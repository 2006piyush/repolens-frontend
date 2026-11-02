import { LanguageIcon, getLanguageLabel } from "../icons/LanguageIcon.jsx";
import { cn } from "../../lib/utils.js";

export function LanguageBadge({ language, className, showLabel = true, iconSize = "md" }) {
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <LanguageIcon language={language} size={iconSize} />
      {showLabel && (
        <span className="text-xs font-medium text-foreground">{getLanguageLabel(language)}</span>
      )}
    </div>
  );
}
