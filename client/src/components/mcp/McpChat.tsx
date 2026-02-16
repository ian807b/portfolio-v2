import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, RotateCcw } from "lucide-react";
import { useMcpChat } from "@/hooks/useMcpChat";
import McpMessage from "./McpMessage";
import McpInput from "./McpInput";
import McpSuggestions from "./McpSuggestions";

export default function McpChat() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, isLoading, error, sendMessage, clearChat } = useMcpChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3
                       bg-accent text-primary rounded-full font-medium
                       shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30
                       hover:bg-accent/90 transition-all"
            aria-label="Open chat to ask about Ian"
          >
            <MessageCircle size={20} />
            <span className="text-sm font-medium hidden sm:inline">
              Ask about Ian
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)]
                       h-[560px] max-h-[calc(100vh-3rem)] bg-surface-raised border
                       border-border rounded-2xl shadow-2xl shadow-black/40
                       flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface">
              <div>
                <h3 className="font-semibold text-sm text-text">Ask about Ian</h3>
                <p className="text-xs text-text-muted">
                  AI-powered Q&A about my background
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={clearChat}
                  className="p-1.5 text-text-muted hover:text-text rounded-lg
                             hover:bg-border/50 transition-colors"
                  aria-label="Clear conversation"
                  title="Start new conversation"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-text-muted hover:text-text rounded-lg
                             hover:bg-border/50 transition-colors"
                  aria-label="Close chat"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col justify-center">
                  <div className="text-center mb-6">
                    <MessageCircle
                      size={40}
                      className="text-accent mx-auto mb-3"
                    />
                    <p className="text-text-secondary text-sm font-medium mb-1">
                      Welcome! I'm Ian's AI assistant.
                    </p>
                    <p className="text-text-muted text-xs">
                      Ask me anything about Ian's skills, projects, or
                      availability.
                    </p>
                  </div>
                  <McpSuggestions onSelect={sendMessage} />
                </div>
              ) : (
                <>
                  {messages.map((msg) => (
                    <McpMessage key={msg.id} message={msg} />
                  ))}
                  {isLoading && (
                    <div className="flex items-center gap-2 text-text-muted text-sm">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" />
                        <span
                          className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <span
                          className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                      <span>Thinking...</span>
                    </div>
                  )}
                  {error && (
                    <p className="text-error text-xs text-center">{error}</p>
                  )}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <McpInput onSend={sendMessage} isLoading={isLoading} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
