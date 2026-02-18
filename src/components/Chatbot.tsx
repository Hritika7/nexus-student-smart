import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Mic, Sparkles } from 'lucide-react';

const RESPONSES: Record<string, string[]> = {
  hi: ["Hey there! 👋 Welcome to CampusNXT! How can I help you today?"],
  hello: ["Hello! I'm CampBot, your AI campus assistant. What do you need help with?"],
  fee: ["Your current fee status: ₹45,000 due by March 15, 2025. You can pay in the Fee Portal section. Need help navigating there?"],
  document: ["Your documents are 80% verified. 'Aadhaar Card' and 'Bank Passbook' are still pending. Upload them in the Documents section."],
  mentor: ["You've been matched with Prof. Kavita Singh (AI/ML Expert). She's available Mon-Wed 3-5 PM. Want me to show her full profile?"],
  hostel: ["You're allocated to Block C, Room 214. Your roommate is Vikram Nair (EEE Dept). Move-in date: July 20, 2025."],
  library: ["Based on your CS branch, I recommend: 'Introduction to Algorithms' by CLRS and 'The Pragmatic Programmer'. Both are available in the library!"],
  schedule: ["Your upcoming deadlines: Document submission (Feb 22), Fee payment (Mar 15), Library card activation (Feb 28). Want a full view?"],
  risk: ["Your onboarding risk score is currently LOW (32/100) — great job! Keep completing tasks to maintain this score."],
  default: ["I'm here to help! Ask me about fees, documents, mentors, hostel, library, or your onboarding schedule."],
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, responses] of Object.entries(RESPONSES)) {
    if (key !== 'default' && lower.includes(key)) {
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  return RESPONSES.default[0];
}

interface Message { id: string; text: string; isBot: boolean; time: string; }

const SUGGESTED = ['What are my deadlines?', 'Show my risk score', 'Library recommendations', 'Fee status'];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Hi! I'm CampBot 🤖 Your AI campus assistant. Ask me about fees, documents, mentors, or anything campus-related!", isBot: true, time: 'Now' }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = async (text: string) => {
    if (!text.trim()) return;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(m => [...m, { id: Date.now().toString(), text, isBot: false, time }]);
    setInput('');
    setTyping(true);
    await new Promise(r => setTimeout(r, 800 + Math.random() * 600));
    setTyping(false);
    const response = getResponse(text);
    setMessages(m => [...m, { id: (Date.now() + 1).toString(), text: response, isBot: true, time }]);
  };

  return (
    <>
      {/* FAB */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-2xl gradient-primary shadow-glow flex items-center justify-center z-50"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageSquare className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full flex items-center justify-center text-white text-xs font-bold">1</span>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 rounded-3xl bg-card border border-border shadow-lg overflow-hidden z-50 flex flex-col"
            style={{ height: '480px' }}
          >
            {/* Header */}
            <div className="gradient-primary p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-display font-bold text-white text-sm">CampBot AI</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-success rounded-full" />
                  <span className="text-white/70 text-xs">Online · Instant replies</span>
                </div>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-white/60" />
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.isBot ? '' : 'flex-row-reverse'}`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${msg.isBot ? 'gradient-primary' : 'bg-secondary'}`}>
                    {msg.isBot ? <Bot className="w-3.5 h-3.5 text-white" /> : <User className="w-3.5 h-3.5" />}
                  </div>
                  <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${msg.isBot ? 'bg-secondary text-secondary-foreground rounded-tl-sm' : 'gradient-primary text-white rounded-tr-sm'}`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
                  <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="bg-secondary rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map(i => (
                        <div key={i} className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            <div className="px-3 pb-2 flex gap-1.5 overflow-x-auto scrollbar-hide">
              {SUGGESTED.map(s => (
                <button key={s} onClick={() => send(s)} className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border border-border hover:border-primary hover:text-primary transition-all">
                  {s}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send(input)}
                placeholder="Ask me anything..."
                className="flex-1 bg-secondary rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 ring-primary/30 transition-all"
              />
              <button onClick={() => send(input)} className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
