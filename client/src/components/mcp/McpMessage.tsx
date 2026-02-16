import { cn } from "@/lib/utils";
import type { McpMessage as McpMessageType } from "@/types";

interface McpMessageProps {
  message: McpMessageType;
}

export default function McpMessage({ message }: McpMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "bg-accent text-primary font-medium rounded-br-md"
            : "bg-surface text-text rounded-bl-md border border-border"
        )}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
}
