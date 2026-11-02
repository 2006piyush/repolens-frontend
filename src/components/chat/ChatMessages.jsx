import { useEffect, useRef } from "react";
import { Bot, UserRound } from "lucide-react";
import { ChatMarkdown } from "./ChatMarkdown.jsx";
import { CitationChips } from "./CitationChips.jsx";
import { Avatar, AvatarFallback } from "../ui/Avatar.jsx";
import { ScrollArea } from "../ui/ScrollArea.jsx";
import { Skeleton } from "../ui/Skeleton.jsx";
import { cn } from "../../lib/utils.js";

function UserBubble({ message }) {
  return (
    <div className="flex items-end gap-2 justify-end">
      <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-primary-foreground">
        <span className="whitespace-pre-wrap text-sm">{message.content}</span>
      </div>
      <Avatar className="size-8 shrink-0">
        <AvatarFallback className="bg-primary text-primary-foreground">
          <UserRound className="size-4" />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}

function AssistantBubble({ message, repo }) {
  return (
    <div className="flex items-start gap-2">
      <Avatar className="size-8 shrink-0 mt-0.5">
        <AvatarFallback className="bg-muted">
          <Bot className="size-4" />
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="rounded-2xl rounded-bl-sm bg-muted px-4 py-3">
          <ChatMarkdown content={message.content} />
        </div>
        {message.citations?.length > 0 && (
          <CitationChips repo={repo} citations={message.citations} />
        )}
      </div>
    </div>
  );
}

export function ChatMessages({ repo, messages, streamText, isLoading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamText]);

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-6">
        <Skeleton className="h-16 w-2/3 rounded-3xl" />
        <Skeleton className="ml-auto h-12 w-1/2 rounded-3xl" />
        <Skeleton className="h-24 w-3/4 rounded-3xl" />
      </div>
    );
  }

  return (
    <ScrollArea className="min-h-0 flex-1 overflow-y-auto">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 py-6">
        {messages.length === 0 && !streamText && (
          <div className="rounded-2xl border border-dashed bg-muted/30 px-6 py-10 text-center">
            <p className="font-medium">Ask anything about this codebase</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try "Where is authentication handled?" or "Explain the repository indexing flow."
            </p>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {messages.map((message) =>
            message.role === "USER" ? (
              <UserBubble key={message.id} message={message} />
            ) : (
              <AssistantBubble key={message.id} message={message} repo={repo} />
            )
          )}

          {streamText && (
            <div className="flex items-start gap-2">
              <Avatar className="size-8 shrink-0 mt-0.5">
                <AvatarFallback className="bg-muted">
                  <Bot className="size-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 rounded-2xl rounded-bl-sm bg-muted px-4 py-3">
                <ChatMarkdown content={streamText} isStreaming />
                <span className="ml-0.5 inline-block h-4 w-1.5 animate-pulse rounded-sm bg-foreground/50 align-middle" />
              </div>
            </div>
          )}
        </div>
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}
