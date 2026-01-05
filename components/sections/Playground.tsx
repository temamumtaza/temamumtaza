"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

type Message = {
    role: "user" | "assistant";
    content: string;
};

export function Playground() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasStarted, setHasStarted] = useState(false);

    // Placeholder logic - Mix of Business, Tech, and Strategy
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const placeholders = [
        "I have a business idea but need help validating if it’s viable.",
        "Our operations are messy — how can we systemize this?",
        "I need a high-converting landing page for my new agency.",
        "We’re growing fast but our internal processes are breaking.",
        "I want to build a custom tool, but I’m not sure where to start.",
        "How can we use AI to handle customer support inquiries 24/7?",
        "I’m looking for a partner to help strategize our next phase of growth.",
        "I want to turn my service business into a productized model."
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // Auto-scroll to bottom - Use 'nearest' block to prevent whole page jump
    const messagesEndRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (messages.length > 0) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    }, [messages, loading]);

    const handleInitialSubmit = async () => {
        if (!input.trim()) return;
        setHasStarted(true);
        const initialInput = input;
        setInput("");
        handleSend(initialInput);
    };

    const handleSend = async (textOverride?: string) => {
        const textToSend = textOverride || input;
        if (!textToSend.trim() || loading) return;

        const userMsg: Message = { role: "user", content: textToSend };
        setMessages(prev => [...prev, userMsg]);
        if (!textOverride) setInput("");
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content }))
                }),
            });

            if (!res.ok) throw new Error("Connection issue. Please try again.");

            // Handle streaming or chunked response if properly implemented, currently just full await
            const data = await res.json();
            const assistantMsg: Message = { role: "assistant", content: data.content };

            setMessages(prev => [...prev, assistantMsg]);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <section id="playground" className={cn(
            "h-screen py-32 px-6 bg-zinc-950 flex flex-col items-center overflow-hidden relative", // Strict overflow hidden
            hasStarted ? "justify-center" : "justify-center"
        )}>

            <AnimatePresence mode="wait">
                {!hasStarted ? (
                    <motion.div
                        key="input-mode"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="max-w-3xl w-full z-10"
                    >
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
                                <Sparkles className="w-3 h-3 text-blue-400" />
                                <span className="text-xs font-medium text-white/60">
                                    Strategic Partner Active
                                </span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-semibold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/60">
                                Let’s explore an idea together
                            </h2>
                            <p className="text-lg text-white/50 font-light">
                                A strategic partner to think out loud with — clarifying ideas, strategy, and systems.
                            </p>
                        </div>

                        <div className="relative group bg-black border border-white/10 rounded-3xl p-2 shadow-2xl transition-all duration-500 focus-within:border-white/20 hover:border-white/15">
                            <div className="relative w-full min-h-[160px]">
                                { /* Placeholder Rotating */}
                                <AnimatePresence mode="wait">
                                    {!input && (
                                        <motion.div
                                            key={placeholderIndex}
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            transition={{ duration: 0.5 }}
                                            className="absolute inset-0 p-6 pointer-events-none text-white/20 text-lg font-light leading-relaxed"
                                        >
                                            {placeholders[placeholderIndex]}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    className="relative w-full h-full min-h-[160px] bg-transparent text-white text-lg p-6 focus:outline-none resize-none font-light leading-relaxed scrollbar-hide z-10"
                                    spellCheck={false}
                                />
                            </div>

                            <div className="flex justify-between items-center px-4 pb-4">
                                <p className="text-xs text-white/30 font-medium">
                                    Write it the way you’d explain it to a trusted collaborator.
                                </p>
                                <button
                                    onClick={handleInitialSubmit}
                                    disabled={!input.trim()}
                                    className="h-12 px-6 bg-white text-black font-medium rounded-2xl hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-[0.98] flex items-center gap-2 group/btn"
                                >
                                    Explore the Idea <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="chat-mode"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="max-w-3xl w-full flex flex-col h-[700px] max-h-[80vh] bg-black border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative z-10"
                    >
                        {/* Header Compact - Fixed at top */}
                        <div className="shrink-0 px-6 py-4 border-b border-white/5 flex items-center justify-between bg-zinc-900/20 backdrop-blur">
                            <span className="text-sm font-medium text-white/60">Exploration Session</span>
                            <button onClick={() => { setHasStarted(false); setMessages([]); setInput(""); }} className="text-xs text-white/40 hover:text-white transition-colors">End Session</button>
                        </div>

                        {/* Messages Area - Scrollable Container */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 scrollbar-hide overscroll-contain">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={cn(
                                        "flex flex-col gap-2 max-w-[90%]",
                                        msg.role === "user" ? "self-end items-end" : "self-start items-start"
                                    )}
                                >
                                    <div className={cn(
                                        "px-6 py-4 rounded-2xl text-[15px] leading-relaxed font-light shadow-sm",
                                        msg.role === "user"
                                            ? "bg-white text-black rounded-tr-sm"
                                            : "bg-white/5 text-white/90 border border-white/10 rounded-tl-sm"
                                    )}>
                                        {msg.role === "user" ? (
                                            msg.content
                                        ) : (
                                            <ReactMarkdown
                                                components={{
                                                    a: ({ node, ...props }) => (
                                                        <a
                                                            {...props}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-400 hover:text-blue-300 underline underline-offset-4 decoration-blue-400/30 transition-colors"
                                                        />
                                                    ),
                                                    p: ({ node, ...props }) => <p {...props} className="mb-2 last:mb-0" />
                                                }}
                                            >
                                                {msg.content}
                                            </ReactMarkdown>
                                        )}
                                    </div>
                                    <span className="text-[10px] text-white/20 uppercase tracking-widest px-2">
                                        {msg.role === "user" ? "You" : "The Partner"}
                                    </span>
                                </motion.div>
                            ))}

                            {loading && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="self-start flex items-center gap-3 px-6 py-4 bg-white/5 border border-white/5 rounded-2xl rounded-tl-sm"
                                >
                                    <div className="flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                        <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                        <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
                                    </div>
                                    <span className="text-xs text-white/30 uppercase tracking-widest">Thinking</span>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Chat Input Area - Anchored at bottom */}
                        <div className="shrink-0 p-4 bg-black border-t border-white/10 relative z-20">
                            <div className="relative bg-zinc-900/50 border border-white/10 rounded-2xl focus-within:border-white/20 transition-colors flex items-end">
                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Type your thought..."
                                    className="flex-1 bg-transparent text-white p-4 focus:outline-none resize-none min-h-[60px] max-h-[120px] scrollbar-hide font-light"
                                />
                                <button
                                    onClick={() => handleSend()}
                                    disabled={!input.trim() || loading}
                                    className="m-2 p-3 bg-white text-black rounded-xl hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
                                >
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
