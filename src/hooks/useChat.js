import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";
import { api } from "../lib/api.js";
import { queryKeys } from "../lib/queryKeys.js";
import { streamChatMessage } from "../lib/streamChat.js";
import { toast } from "./useRepos.js";

export function useChatSessions(repositoryId, enabled = true) {
  return useQuery({
    queryKey: queryKeys.chat.sessions(repositoryId),
    queryFn: () => api.listSessions(repositoryId),
    enabled: Boolean(repositoryId) && enabled,
  });
}

export function useChatMessages(sessionId) {
  return useQuery({
    queryKey: queryKeys.chat.messages(sessionId ?? ""),
    queryFn: () => api.getMessages(sessionId),
    enabled: Boolean(sessionId),
  });
}

export function useCreateChatSession(repositoryId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (title) => api.createSession(repositoryId, title),
    onSuccess: (session) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.chat.sessions(repositoryId) });
      queryClient.setQueryData(queryKeys.chat.messages(session.id), []);
    },
    onError: (error) => {
      toast.add({ title: "Could not create chat", description: error.message, type: "error" });
    },
  });
}

export function useStreamChat(sessionId) {
  const queryClient = useQueryClient();
  const [streaming, setStreaming] = useState(false);
  const [streamText, setStreamText] = useState("");
  const abortRef = useRef(null);

  const send = useCallback(
    async (content) => {
      if (!sessionId || !content.trim() || streaming) return;

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      const optimisticId = `temp-${Date.now()}`;
      const optimistic = {
        id: optimisticId,
        role: "USER",
        content: content.trim(),
        citations: [],
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData(queryKeys.chat.messages(sessionId), (prev) => [
        ...(prev ?? []),
        optimistic,
      ]);

      setStreaming(true);
      setStreamText("");

      try {
        await streamChatMessage(sessionId, content.trim(), {
          signal: controller.signal,
          onUserMessage: (message) => {
            queryClient.setQueryData(queryKeys.chat.messages(sessionId), (prev) => [
              ...(prev ?? []).filter((m) => m.id !== optimisticId),
              message,
            ]);
          },
          onToken: (token) => {
            setStreamText((prev) => prev + token);
          },
          onAssistantMessage: (message) => {
            queryClient.setQueryData(queryKeys.chat.messages(sessionId), (prev) => [
              ...(prev ?? []),
              message,
            ]);
            setStreamText("");
          },
        });
      } catch (err) {
        if (err.name === "AbortError") return;
        toast.add({
          title: "Message failed",
          description: err instanceof Error ? err.message : "Unknown error",
          type: "error",
        });
        queryClient.setQueryData(queryKeys.chat.messages(sessionId), (prev) =>
          (prev ?? []).filter((m) => m.id !== optimisticId)
        );
        setStreamText("");
      } finally {
        setStreaming(false);
      }
    },
    [sessionId, streaming, queryClient]
  );

  const stop = useCallback(() => {
    abortRef.current?.abort();
    setStreaming(false);
  }, []);

  return { send, stop, streaming, streamText };
}
