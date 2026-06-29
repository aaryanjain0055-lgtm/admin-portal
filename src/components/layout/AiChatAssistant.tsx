import React, { useState, useRef, useEffect } from "react";
import { Bot, X, Send, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
}

export function AiChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "Hello! I'm Stratum AI. I can help you find candidates, generate reports, schedule interviews, and more. How can I assist you today?",
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (open) {
      scrollToBottom();
    }
  }, [messages, open]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = inputValue.trim();
    setInputValue("");
    
    setMessages(prev => [...prev, { id: Date.now().toString(), type: "user", content: userMsg }]);
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      let aiResponse = "I can certainly help with that. Could you provide more details?";
      
      const lowerMsg = userMsg.toLowerCase();
      if (lowerMsg.includes("ats") || lowerMsg.includes("candidate") || lowerMsg.includes("find")) {
        aiResponse = "I've analyzed the talent pool. I found 12 candidates with an ATS score above 90. Would you like me to open the candidates view filtered by top scores?";
        // Simulate an action suggestion
        setTimeout(() => navigate("/candidates"), 3000);
      } else if (lowerMsg.includes("report")) {
        aiResponse = "Generating the report now. I'll open the Report Builder with the suggested metrics.";
        setTimeout(() => navigate("/reports"), 2000);
      } else if (lowerMsg.includes("company")) {
        aiResponse = "Searching for company records...";
        setTimeout(() => navigate("/companies"), 2000);
      }

      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), type: "ai", content: aiResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className={cn(
          "fixed bottom-24 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
          open ? "bg-slate-800 text-white" : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-xl"
        )}
      >
        <Bot className="h-6 w-6" />
        {/* Unread dot simulation */}
        {!open && <span className="absolute top-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-rose-500"></span>}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-40 right-6 z-50 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950 sm:w-[400px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-600 to-purple-700 px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Stratum AI</h3>
                  <p className="text-[10px] text-indigo-100">Intelligent Recruitment Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-1 transition-colors hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-slate-50 dark:bg-slate-900/50">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex max-w-[85%] items-end gap-2",
                      msg.type === "user" ? "ml-auto flex-row-reverse" : ""
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold shadow-sm",
                        msg.type === "user"
                          ? "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                          : "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300"
                      )}
                    >
                      {msg.type === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-2.5 text-sm shadow-sm",
                        msg.type === "user"
                          ? "rounded-br-sm bg-indigo-600 text-white"
                          : "rounded-bl-sm border border-slate-200 bg-white text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
                      )}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex max-w-[85%] items-end gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"></div>
                      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "0.15s" }}></div>
                      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "0.3s" }}></div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="border-t border-slate-200 p-3 dark:border-slate-800 bg-white dark:bg-slate-950">
              <div className="relative flex items-center">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask Stratum AI..."
                  className="pr-10 rounded-full bg-slate-50 border-slate-200 dark:bg-slate-900 dark:border-slate-800"
                />
                <Button
                  type="submit"
                  size="icon"
                  variant="ghost"
                  className="absolute right-1 h-8 w-8 rounded-full text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-950"
                  disabled={!inputValue.trim() || isTyping}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2 text-center text-[10px] text-slate-400">
                AI can make mistakes. Verify important information.
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
