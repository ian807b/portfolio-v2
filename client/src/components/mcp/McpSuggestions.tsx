import { MCP_SUGGESTIONS } from "@/lib/constants";

interface McpSuggestionsProps {
  onSelect: (message: string) => void;
}

export default function McpSuggestions({ onSelect }: McpSuggestionsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {MCP_SUGGESTIONS.map((suggestion) => (
        <button
          key={suggestion}
          onClick={() => onSelect(suggestion)}
          className="px-3 py-1.5 text-xs bg-surface border border-border
                     text-text-secondary rounded-full hover:border-accent/50
                     hover:text-accent transition-all duration-200"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}
