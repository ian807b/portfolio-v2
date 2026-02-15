import { useState, useCallback } from "react";
import { sendMcpMessage } from "@/lib/api";
import { generateId } from "@/lib/utils";
import type { McpMessage } from "@/types";

/**
 * Hook for managing MCP chat state and interactions.
 */
export function useMcpChat() {
  const [messages, setMessages] = useState<McpMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      setError(null);

      // Add user message immediately
      const userMessage: McpMessage = {
        id: generateId(),
        role: "user",
        content: content.trim(),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const response = await sendMcpMessage({
          conversationId,
          message: content.trim(),
        });

        setConversationId(response.conversationId);

        // Add assistant response
        const assistantMessage: McpMessage = {
          id: generateId(),
          role: "assistant",
          content: response.reply,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } catch (err) {
        setError("Failed to get a response. Please try again.");
        console.error("MCP chat error:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [conversationId, isLoading]
  );

  const clearChat = useCallback(() => {
    setMessages([]);
    setConversationId(undefined);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
  };
}
