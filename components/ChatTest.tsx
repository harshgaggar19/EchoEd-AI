import React, { useState, useEffect, useRef } from "react";
import { saveMessage, getMessages, clearMessages } from "@/lib/db";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, User, Bot } from "lucide-react";
import api from "@/lib/api";

const AVATARS = {
  user: <User className="text-indigo-500" size={20} />,
  bot: <Bot className="text-green-500" size={20} />,
};

const ChatTest: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getMessages().then(setMessages);
  }, []);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { type: "user", text: input, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    saveMessage(userMsg);
    setInput("");
    setLoading(true);

    try {
      const { data } = await api.post("/api/chat", { message: userMsg.text });
      const botMsg = {
        type: "bot",
        text: data.response,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, botMsg]);
      saveMessage(botMsg);
    } catch {
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "Error getting response.", timestamp: Date.now() },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <section
      className="
      flex flex-col h-[85vh] w-full rounded-2xl mx-auto
      min-h-[450px] max-h-[90vh]
      bg-card border border-border
      backdrop-blur-md
      shadow-lg
      relative
    "
    >
      <header className="flex justify-between items-center gap-2 py-4 px-6 border-b border-border bg-muted/40 sticky top-0 z-10">
        <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-green-400 bg-clip-text text-transparent text-xl font-bold">
          EchoEdAI Chat
        </span>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="text-xs px-2 py-1 h-auto"
            onClick={() => {
              setMessages([]);
              clearMessages();
            }}
          >
            Clear Chat
          </Button>
          <span className="text-xs text-muted-foreground tracking-wide font-mono">
            v1.0
          </span>
        </div>
      </header>

      {/* Scrollable chat window */}
      <div className="flex-1 overflow-y-auto min-h-0 p-6 space-y-4 bg-background">
        {messages.length === 0 && !loading && (
          <div className="text-center text-muted-foreground pt-16">
            <span className="opacity-40 text-2xl">Ask me anything…</span>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex group items-end max-w-full ${
              msg.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.type === "bot" && (
              <div className="flex-shrink-0 mr-2">{AVATARS.bot}</div>
            )}
            <div
              className={`
              px-4 py-2 rounded-2xl shadow text-base font-medium whitespace-pre-line max-w-xs
              ${
                msg.type === "user"
                  ? "bg-indigo-600 text-white ml-12 dark:bg-indigo-700"
                  : "bg-muted text-foreground mr-12 dark:bg-gray-800 dark:text-gray-200"
              }
              ${
                idx === messages.length - 1 && loading && msg.type === "bot"
                  ? "animate-pulse"
                  : ""
              }
            `}
            >
              {msg.text}
              <span className="ml-2 text-xs text-gray-400 dark:text-gray-500 font-mono align-bottom block">
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            {msg.type === "user" && (
              <div className="flex-shrink-0 ml-2">{AVATARS.user}</div>
            )}
          </div>
        ))}

        {/* Loader */}
        {loading && (
          <div className="flex items-end">
            <div className="flex-shrink-0 mr-2">{AVATARS.bot}</div>
            <div className="px-4 py-2 rounded-2xl bg-muted text-muted-foreground flex items-center gap-2 shadow animate-pulse dark:bg-gray-700 dark:text-gray-300">
              <Loader2 className="animate-spin" size={18} /> Generating
              response…
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <form
        className="flex items-center gap-2 px-4 py-4 border-t border-border bg-muted/60 w-full sticky bottom-0 rounded-b-2xl"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <Input
          ref={inputRef}
          className="
          flex-1 bg-muted text-foreground border-0
          focus:ring-2 focus:ring-indigo-600 rounded-xl shadow-inner
          dark:bg-[#18171b] dark:text-white
        "
          placeholder="Type your message and press Enter…"
          disabled={loading}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          type="submit"
          className="
          rounded-xl bg-indigo-600 hover:bg-indigo-500 transition-all shadow-lg
          text-white dark:text-white
        "
          disabled={loading || !input.trim()}
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : "Send"}
        </Button>
      </form>
    </section>
  );
};

export default ChatTest;
