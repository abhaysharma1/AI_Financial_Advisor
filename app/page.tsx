"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Send, User, Bot, Sparkles, TrendingUp, PiggyBank, Target } from "lucide-react";
import { motion } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "advisor";
  content: string;
}

const QUICK_ACTIONS = [
  { icon: TrendingUp, text: "How do I start investing with $1,000?" },
  { icon: Target, text: "Plan my retirement at 45" },
  { icon: PiggyBank, text: "Analyze my 50/30/20 budget" }
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "advisor",
      content: "Welcome. I am your personal AI Financial Advisor. From creating a comprehensive budget to designing a long-term retirement strategy, I'm here to provide premium, actionable insights. How can we optimize your wealth today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    
    const newMessages: Message[] = [
      ...messages,
      { id: Date.now().toString(), role: "user", content: userMessage }
    ];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) throw new Error("API request failed");

      const data = await res.json();
      
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "advisor", content: data.text }
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "advisor", content: "I apologize, but I am currently unable to process your request. Please ensure your API key is correctly configured." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (text: string) => {
    setInput(text);
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4 md:p-6 pb-20 md:pb-6 relative z-10">
      
      {/* Header */}
      <header className="flex items-center gap-3 py-4 mb-4 border-b border-gray-800/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400">
            AI Financial Advisor
          </h1>
          <p className="text-xs text-gray-500 font-medium">Premium Wealth Management</p>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-2 scrollbar-thin pb-4">
        {messages.map((m) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            key={m.id}
            className={`flex gap-4 ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {m.role === "advisor" && (
               <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 mt-1">
                 <Bot className="w-5 h-5" />
               </div>
            )}
            
            <div className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-5 ${
              m.role === "user" 
                ? "bg-gray-800 text-gray-100 shadow-md"
                : "bg-gray-900/50 border border-gray-800/50 shadow-lg text-gray-300 backdrop-blur-sm"
            }`}>
              {m.role === "advisor" ? (
                <div className="prose prose-invert prose-emerald max-w-none text-sm md:text-base leading-relaxed break-words">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                </div>
              ) : (
                <div className="text-sm md:text-base">{m.content}</div>
              )}
            </div>

            {m.role === "user" && (
               <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 mt-1">
                 <User className="w-5 h-5" />
               </div>
            )}
          </motion.div>
        ))}

        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex gap-4 justify-start"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 mt-1">
              <Bot className="w-5 h-5" />
            </div>
            <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-5 backdrop-blur-sm">
               <div className="flex gap-1.5 items-center">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse delay-150"></div>
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse delay-300"></div>
               </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {messages.length === 1 && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
             {QUICK_ACTIONS.map((action, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickAction(action.text)}
                  className="bg-gray-900/40 hover:bg-gray-800/60 border border-gray-800/50 transition-all p-4 rounded-2xl text-left group flex flex-col gap-3 backdrop-blur-sm shadow-md cursor-pointer"
                >
                  <div className="p-2 rounded-full bg-gray-800/80 text-emerald-400 group-hover:scale-110 transition-transform w-max">
                     <action.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm text-gray-300 font-medium">{action.text}</span>
                </button>
             ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="mt-4 pt-2">
        <form onSubmit={handleSubmit} className="relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Ask about budgeting, investing, or retirement..."
            className="w-full bg-gray-900/80 border border-gray-700/50 rounded-full px-6 py-4 pr-16 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all shadow-lg backdrop-blur-md shadow-emerald-900/5"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-2 bottom-2 p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center transition-colors disabled:opacity-50 disabled:hover:bg-emerald-600 w-12"
          >
            <Send className="w-5 h-5 ml-[-2px]" />
          </button>
        </form>
      </div>
      
    </div>
  );
}
