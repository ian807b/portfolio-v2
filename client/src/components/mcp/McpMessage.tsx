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
            ? "bg-accent text-white rounded-br-md"
            : "bg-slate-800 text-slate-200 rounded-bl-md"
        )}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
}
