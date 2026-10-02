import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Loader2 } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { saveLead } from "../firebase";
import { Button } from "@/components/ui/button";

const apiKey = process.env.GEMINI_API_KEY as string | undefined;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const SYSTEM_PROMPT = `
You are the Oceanalt assistant. Help small-business owners work out which plan fits them and get them to send a brief or book a call.

What Oceanalt does: designs, builds, hosts and maintains websites for small businesses (cafés, tradies, coaches, clinics, local shops) on a monthly plan. Customers tell us what they want and we build it. If they already have a website we can rebuild it, including online payments.

Plans (AUD):
- Care, $29/month, month to month: we host and look after an existing site (hosting, SSL, backups, security updates, uptime monitoring). Small edits $60 each.
- Launch, $99/month, $0 upfront, 12-month minimum then month to month: custom site up to 5 pages, domain, hosting, contact/quote forms, Google Business Profile, on-page SEO, 30 minutes of edits a month, live in about 10 days.
- Grow, $199/month, $0 upfront, 12-month minimum then month to month: everything in Launch up to 12 pages, plus online payments or a shop (up to 50 products), bookings, an AI chat assistant, rebuild of an existing site, 2 hours of edits a month, monthly report.
- One-off build from $1,499 (50% upfront, 50% at launch) for people who'd rather own it outright.
- Custom apps, portals and small SaaS: quoted per project.

Rules that matter to customers:
- The first month is only charged after they approve the design preview.
- After 12 paid months they can cancel any time and keep the site, code and domain. Cancelling earlier costs the lesser of the remaining months or a $1,499 buyout.
- Payments from their customers go straight to their own Stripe account.
- Edit time covers changes to existing pages; new features are quoted first.

How to talk:
- Plain English, 2–3 sentences unless they ask for more detail.
- Give real prices when asked. Don't invent features, discounts, deadlines or scarcity.
- If you don't know something, say so and suggest emailing hello@oceanalt.com.au.
- Stay on topic: Oceanalt, websites, and how the plans work.
- When they sound interested, ask for their email and current website (if any), or suggest sending a brief.
`;

const OceanBotIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Brain/circuit top */}
    <circle cx="12" cy="8" r="4" />
    <path d="M9 6.5 L7 5" />
    <path d="M15 6.5 L17 5" />
    <path d="M9 9.5 L7 11" />
    <path d="M15 9.5 L17 11" />
    <circle cx="6.5" cy="4.5" r="1" />
    <circle cx="17.5" cy="4.5" r="1" />
    <circle cx="6.5" cy="11.5" r="1" />
    <circle cx="17.5" cy="11.5" r="1" />
    {/* Connector to wave */}
    <line x1="12" y1="12" x2="12" y2="15" />
    {/* Ocean wave */}
    <path d="M3 17 C5.5 15 8 19 10.5 17 C13 15 15.5 19 18 17 C19.5 16 20.5 16.5 21 17" />
    <path d="M3 20 C5.5 18 8 22 10.5 20 C13 18 15.5 22 18 20 C19.5 19 20.5 19.5 21 20" strokeOpacity="0.4" />
  </svg>
);

const RATE_LIMIT = 15;
const RATE_WINDOW_MS = 60 * 60 * 1000;

export const ChatBot = ({ onBookNow }: { onBookNow?: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string; showCTA?: boolean }[]>([
    { role: "bot", text: "Hi! Tell me a bit about your business and what you need, and I'll point you to the right plan." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messageCount = useRef(0);
  const windowStart = useRef(Date.now());

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    if (!ai) {
      setMessages(prev => [...prev, { role: "bot", text: "AI service is unavailable right now. Please reach out directly at hello@oceanalt.com.au." }]);
      return;
    }

    const now = Date.now();
    if (now - windowStart.current > RATE_WINDOW_MS) {
      messageCount.current = 0;
      windowStart.current = now;
    }
    if (messageCount.current >= RATE_LIMIT) {
      setMessages(prev => [...prev, { role: "bot", text: "You've reached the chat limit for this hour. Email us at hello@oceanalt.com.au to continue." }]);
      return;
    }
    messageCount.current += 1;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const chatHistory = messages.map(m => `${m.role === 'user' ? 'User' : 'Concierge'}: ${m.text}`).join("\n");

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-exp",
        contents: [
          { role: "user", parts: [{ text: `${SYSTEM_PROMPT}\n\nHistory:\n${chatHistory}\n\nUser: ${userMessage}` }] }
        ],
      });

      const botResponse = response.text || "I'm sorry, I'm having a bit of a moment. Could you try again?";

      const hasBookingIntent = userMessage.toLowerCase().includes("book") ||
                               userMessage.toLowerCase().includes("quote") ||
                               botResponse.toLowerCase().includes("book") ||
                               botResponse.toLowerCase().includes("quote");

      setMessages(prev => [...prev, { role: "bot", text: botResponse, showCTA: hasBookingIntent }]);

      if (userMessage.includes("@") || hasBookingIntent) {
        const emailMatch = userMessage.match(/[^\s@]+@[^\s@]+\.[^\s@]+/);
        await saveLead({
          email: emailMatch?.[0],
          query: userMessage,
          source: 'chatbot',
          chatHistory: chatHistory + `\nUser: ${userMessage}\nConcierge: ${botResponse}`,
        });
      }

    } catch (error) {
      const isNetworkError = error instanceof TypeError && error.message.includes('fetch');
      setMessages(prev => [...prev, {
        role: "bot",
        text: isNetworkError
          ? "Network error. Check your connection and try again."
          : "Connection lost. My architects are on it."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 40, scale: 0.9, filter: "blur(10px)" }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className="absolute bottom-24 right-0 w-[420px] h-[650px] bg-background/80 backdrop-blur-3xl border border-foreground/10 rounded-[3rem] shadow-[0_80px_160px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-10 border-b border-foreground/5 flex justify-between items-center bg-gradient-to-b from-primary/10 to-transparent">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground shadow-2xl shadow-primary/40 relative overflow-hidden group">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-50"
                  />
                  <OceanBotIcon className="w-8 h-8 relative z-10" />
                </div>
                <div>
                  <h4 className="text-lg font-black uppercase italic tracking-tighter leading-none mb-1">AI Concierge</h4>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(var(--primary-rgb),0.8)]" />
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Neural Link Active</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-4 hover:bg-foreground/5 rounded-2xl transition-all hover:scale-110 active:scale-90">
                <X size={24} className="text-muted-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-8 scrollbar-hide">
              <AnimatePresence initial={false}>
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", damping: 20, stiffness: 100, delay: i * 0.05 }}
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] p-6 rounded-[2rem] text-sm font-medium leading-relaxed shadow-lg ${
                      m.role === 'user' 
                        ? 'bg-primary text-primary-foreground rounded-tr-none' 
                        : 'bg-secondary/40 border border-foreground/10 rounded-tl-none backdrop-blur-md'
                    }`}>
                      {m.text}
                      {m.showCTA && (
                        <div className="mt-6 pt-6 border-t border-foreground/10">
                          <Button 
                            onClick={() => {
                              onBookNow?.();
                              setIsOpen(false);
                            }}
                            className="w-full py-6 rounded-xl font-black uppercase tracking-widest italic text-[10px] shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
                          >
                            Book a Consultation
                          </Button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-secondary/40 border border-foreground/10 p-6 rounded-[2rem] rounded-tl-none flex gap-2">
                    <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-primary rounded-full" />
                    <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-primary rounded-full" />
                    <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-10 bg-secondary/5 border-t border-foreground/5">
              <div className="relative group/input">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Describe your vision..."
                  className="w-full h-16 bg-background/50 border border-foreground/10 rounded-2xl px-8 pr-16 text-sm font-medium focus:border-primary focus:ring-8 focus:ring-primary/5 outline-none transition-all backdrop-blur-md"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-3 top-3 w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground hover:scale-110 active:scale-95 transition-all disabled:opacity-50 shadow-2xl shadow-primary/40"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-20 h-20 bg-primary rounded-[2.5rem] flex items-center justify-center text-primary-foreground shadow-[0_40px_80px_rgba(var(--primary-rgb),0.5)] hover:shadow-[0_40px_100px_rgba(var(--primary-rgb),0.6)] transition-all relative group overflow-hidden"
      >
        <motion.div 
          animate={{ 
            rotate: [0, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.2),transparent)]"
        />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
              className="relative z-10"
            >
              <X size={32} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="flex items-center justify-center relative z-10"
            >
              <OceanBotIcon className="w-10 h-10" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
