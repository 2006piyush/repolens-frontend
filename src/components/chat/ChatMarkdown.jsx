import { code } from "@streamdown/code";
import { mermaid } from "@streamdown/mermaid";
import { Streamdown } from "streamdown";
import { cn } from "../../lib/utils.js";
import "./chat-markdown.css";
import "streamdown/styles.css";

const streamdownPlugins = { code, mermaid };

export function ChatMarkdown({ content, isStreaming = false, className }) {
  return (
    <Streamdown
      className={cn("chat-markdown max-w-none text-sm leading-relaxed", className)}
      mode={isStreaming ? "streaming" : "static"}
      plugins={streamdownPlugins}
      shikiTheme={["github-light", "github-dark"]}
      isAnimating={isStreaming}
    >
      {content}
    </Streamdown>
  );
}
