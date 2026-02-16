import { useState, useRef, type FormEvent, type KeyboardEvent } from "react";
import { Send } from "lucide-react";

interface McpInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export default function McpInput({ onSend, isLoading }: McpInputProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input);
      setInput("");
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-border px-3 py-2 bg-surface flex items-end gap-2"
    >
      <textarea
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask me anything about Ian..."
        rows={1}
        className="flex-1 resize-none bg-transparent text-sm text-text
                   placeholder-text-muted focus:outline-none py-2 max-h-24"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={!input.trim() || isLoading}
        className="p-2 text-accent hover:text-[#67e8f9] disabled:text-text-muted
                   disabled:cursor-not-allowed transition-colors"
        aria-label="Send message"
      >
        <Send size={18} />
      </button>
    </form>
  );
}
