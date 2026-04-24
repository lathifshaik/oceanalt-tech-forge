import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, useTransform } from "motion/react";
import { 
  Ship, Cloud, Code, Rocket, Globe, ArrowRight, Menu, X, Check, Zap, Shield, 
  DollarSign, MessageSquare, Bot, Cpu, Layers, Palette, BrainCircuit, BarChart3, 
  Users, Lock, FastForward, MapPin, ShieldCheck, Scale, UserCheck, Brain, 
  History, Hammer, MessageCircleCode, Terminal, Workflow, Wand2, Database, 
  TrendingUp, FileCheck, MessageSquareText, Gem, RefreshCcw, Search, Loader2
} from "lucide-react";
import { useState, useEffect, useRef, FormEvent, ReactNode, Suspense, lazy } from "react";
import Lenis from "lenis";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ChatBot } from "./components/ChatBot";
import { saveLead } from "./firebase";

const Navbar = ({ onBookNow, onNavigate, currentView }: { onBookNow: () => void, onNavigate: (view: any) => void, currentView: string }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Expertise", href: "#expertise", view: "home" },
    { name: "AI", href: "#ai", view: "home" },
    { name: "SEO", href: "#seo", view: "home" },
    { name: "Projects", href: "#projects", view: "home" },
    { name: "Pricing", href: "#pricing", view: "home" },
    { name: "Contact", href: "#contact", view: "home" },
  ];

  return (
    <div className="fixed top-6 w-full z-50 px-6">
      <nav className={`mx-auto max-w-7xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isScrolled ? "bg-background/80 backdrop-blur-2xl border border-foreground/10 py-3 px-8 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)]" : "bg-transparent py-6 px-4 rounded-none border-transparent"}`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-2xl shadow-primary/40 group-hover:scale-110 transition-transform duration-500">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 10.189V14" />
                <path d="M12 2v3" />
                <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6" />
                <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 2.81 7.76" />
                <motion.path
                  d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
                  whileHover={{
                    d: "M2 21c.6-.5 1.2-1 2.5-1 2.5 0 2.5 2 5 2 1.3 0 1.9-.5 2.5-1s1.2-1 2.5-1c2.5 0 2.5 2 5 2 1.3 0 1.9-.5 2.5-1"
                  }}
                  animate={{
                    d: [
                      "M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
                      "M2 21c.6-.5 1.2-1 2.5-1 2.5 0 2.5 2 5 2 1.3 0 1.9-.5 2.5-1s1.2-1 2.5-1c2.5 0 2.5 2 5 2 1.3 0 1.9-.5 2.5-1",
                      "M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[xl] font-black tracking-tighter text-foreground uppercase italic leading-none">Oceanalt</span>
              <span className="text-[8px] font-bold tracking-[0.2em] text-primary uppercase">Tech Forge</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-all" 
                onClick={() => {
                  if (currentView !== 'home') {
                    onNavigate('home');
                  }
                }}
              >
                {item.name}
              </a>
            ))}
            <div className="h-4 w-[1px] bg-foreground/10 mx-2" />
            <div className="flex flex-col items-end">
              <span className="text-[8px] font-bold tracking-widest text-muted-foreground uppercase">Glebe · Sydney</span>
              <span className="text-[8px] font-bold tracking-widest text-primary uppercase">Solo Practice</span>
            </div>
            <Button
              size="sm"
              className="rounded-full px-8 font-black uppercase italic text-xs tracking-tighter hover:scale-105 transition-transform shadow-xl shadow-primary-20"
              onClick={onBookNow}
            >
              Book a Chat
            </Button>
          </div>

          <button className="lg:hidden text-foreground p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="lg:hidden absolute top-full left-0 w-full mt-4 bg-background/95 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <div className="p-10 flex flex-col gap-8">
                {navItems.map((item) => (
                  <a 
                    key={item.name} 
                    href={item.href} 
                    className="text-3xl font-black uppercase italic tracking-tighter" 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onNavigate('home');
                    }}
                  >
                    {item.name}
                  </a>
                ))}
                <div className="pt-4 border-t border-foreground/10">
                  <p className="text-[10px] font-bold tracking-widest text-primary uppercase mb-2">Glebe · Sydney · AU</p>
                  <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Solo full-stack practice</p>
                </div>
                <Button className="w-full py-10 text-2xl font-black uppercase italic rounded-3xl" onClick={() => {
                  setIsMobileMenuOpen(false);
                  onBookNow();
                }}>Book a Chat</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

const Marquee = ({ items, reverse = false }: { items: string[], reverse?: boolean }) => {
  return (
    <div className="flex overflow-hidden select-none gap-12 py-10 border-y border-foreground/5">
      <div className={`flex flex-none gap-12 items-center min-w-full ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter text-foreground/20 whitespace-nowrap">
            {item} <span className="text-primary mx-4">/</span>
          </span>
        ))}
      </div>
    </div>
  );
};

const ModernAIIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 2v4" />
    <path d="M12 18v4" />
    <path d="M4.93 4.93l2.83 2.83" />
    <path d="M16.24 16.24l2.83 2.83" />
    <path d="M2 12h4" />
    <path d="M18 12h4" />
    <path d="M4.93 19.07l2.83-2.83" />
    <path d="M16.24 7.76l2.83-2.83" />
    <circle cx="12" cy="12" r="4" />
  </svg>
);

const Hero = ({ onBookNow }: { onBookNow: () => void }) => {
  const stats = [
    { label: "$1,499", sub: "STARTER SITE" },
    { label: "~2 WKS", sub: "TURNAROUND" },
    { label: "AU", sub: "HOSTED / OWNED" },
    { label: "100%", sub: "IP YOURS" }
  ];

  const partners = ["CAFÉS", "TRADIES", "COACHES", "SMALL RETAIL", "INDIE SAAS", "CLINICS", "AGENCIES", "STARTUPS"];

  return (
    <section className="relative pt-48 pb-32 overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Animated Mesh Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="animate-blob absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="animate-blob-reverse absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-9xl lg:text-[11rem] font-black mb-12 leading-[0.8] tracking-tighter uppercase italic relative">
              <span className="relative z-10">FAST SITES.</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-primary to-primary/30 relative z-10">AI THAT WORKS.</span>
              <motion.div
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-primary/20 blur-[100px] -z-10 rounded-full"
              />
            </h1>
            <p className="text-xl md:text-3xl text-muted-foreground mb-16 max-w-5xl mx-auto font-medium leading-relaxed opacity-80">
              Websites, AI chatbots and small internal tools — built end-to-end for cafés, tradies, coaches and indie SaaS. Starter sites from $1,499 AUD, delivered in about two weeks.
            </p>

            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary font-bold">Milestone billing · No lock-in · Full ownership</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-24">
              <Button
                size="lg"
                className="h-24 px-16 text-2xl font-black uppercase italic rounded-[2rem] shadow-[0_30px_60px_rgba(var(--primary-rgb),0.2)] hover:shadow-[0_30px_90px_rgba(var(--primary-rgb),0.3)] transition-all duration-700 group"
                onClick={onBookNow}
              >
                Book a Chat <ArrowRight className="ml-4 w-8 h-8 group-hover:translate-x-3 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-24 px-16 text-2xl font-black uppercase italic rounded-[2rem] border-foreground/10 hover:bg-foreground/5 transition-all"
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Pricing
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-4xl mx-auto border-t border-foreground/10 pt-16 mb-24 items-center justify-items-center">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <span className="text-5xl font-black italic tracking-tighter text-primary">{stat.label}</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mt-2">{stat.sub}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <Marquee items={partners} />
    </section>
  );
};

// ─── Working Prototypes ──────────────────────────────────────────────────────

const CafeV1 = () => {
  const [activeTab, setActiveTab] = useState<'Coffee' | 'Food' | 'Desserts'>('Coffee');
  const [booking, setBooking] = useState(false);
  const [booked, setBooked] = useState(false);
  const [bookingData, setBookingData] = useState({ name: '', date: '', time: '7:00pm', guests: '2' });
  const menuRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const findRef = useRef<HTMLDivElement>(null);
  const scrollTo = (r: React.RefObject<HTMLDivElement | null>) =>
    r.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const openBooking = () => { setBooked(false); setBooking(true); };
  const menu = {
    Coffee: [
      { name: 'Flat White', desc: 'Double shot, steamed milk', price: '$5.50' },
      { name: 'Cold Brew', desc: '12hr slow drip, served over ice', price: '$6.50' },
      { name: 'Matcha Latte', desc: 'Ceremonial grade, oat milk', price: '$7.00' },
    ],
    Food: [
      { name: 'Avocado Toast', desc: 'Sourdough, heirloom tomato, feta', price: '$18' },
      { name: 'Egg & Bacon Roll', desc: 'Brioche, free range eggs, relish', price: '$14' },
      { name: 'Acai Bowl', desc: 'Fresh berries, granola, honey', price: '$16' },
    ],
    Desserts: [
      { name: 'Kouign Amann', desc: 'Caramelised pastry, served warm', price: '$7' },
      { name: 'Banana Bread', desc: 'Toasted with salted butter', price: '$6' },
      { name: 'Affogato', desc: 'Vanilla gelato, double espresso', price: '$9' },
    ],
  };
  return (
    <div className="relative bg-white text-gray-900 font-sans text-[14px]">
      <nav className="flex items-center justify-between px-6 py-3 border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur z-10">
        <button onClick={() => scrollTo(menuRef)} className="font-black text-lg tracking-tighter">THE BLACK WAVE</button>
        <div className="flex gap-5 text-sm">
          <button onClick={() => scrollTo(menuRef)} className="text-gray-500 hover:text-black transition-colors">Menu</button>
          <button onClick={() => scrollTo(aboutRef)} className="text-gray-500 hover:text-black transition-colors">About</button>
          <button onClick={() => scrollTo(findRef)} className="text-gray-500 hover:text-black transition-colors">Find Us</button>
        </div>
        <button onClick={openBooking} className="bg-black text-white px-4 py-1.5 rounded-full text-xs font-bold hover:bg-gray-800 transition-colors">Book a Table</button>
      </nav>
      <div className="relative h-52 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80" className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="café" />
        <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center gap-2 text-white text-center">
          <p className="text-[10px] uppercase tracking-widest font-bold text-white/60">Sydney · Est. 2019</p>
          <h1 className="text-3xl font-black tracking-tighter">SPECIALTY COFFEE<br/>& MODERN KITCHEN</h1>
          <button onClick={() => scrollTo(menuRef)} className="bg-white text-black px-6 py-1.5 rounded-full text-xs font-black mt-1 hover:bg-gray-100 transition-colors">View Menu ↓</button>
        </div>
      </div>
      <div ref={menuRef} className="px-6 py-6 scroll-mt-16">
        <h2 className="text-lg font-black tracking-tighter mb-4 uppercase">Our Menu</h2>
        <div className="flex gap-2 mb-5">
          {(['Coffee','Food','Desserts'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-1 rounded-full text-[11px] font-black uppercase tracking-wide transition-all ${activeTab === tab ? 'bg-black text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>{tab}</button>
          ))}
        </div>
        <div className="space-y-0">
          {menu[activeTab].map((item, i) => (
            <div key={i} className="flex justify-between py-3 border-b border-gray-100 last:border-0">
              <div><p className="font-bold text-sm">{item.name}</p><p className="text-gray-400 text-xs mt-0.5">{item.desc}</p></div>
              <span className="font-black text-sm">{item.price}</span>
            </div>
          ))}
        </div>
      </div>
      <div ref={aboutRef} className="px-6 py-6 bg-stone-50 border-t border-gray-100 scroll-mt-16">
        <h2 className="text-lg font-black tracking-tighter mb-3 uppercase">Our Story</h2>
        <p className="text-xs text-gray-500 leading-relaxed mb-4">Born in Surry Hills in 2019, The Black Wave started with a single espresso machine and a simple idea: serve the best coffee in Sydney, every single cup. Six years on, we roast our own beans, bake our own pastries, and still treat every order like it's the one that matters.</p>
        <div className="grid grid-cols-3 gap-3">
          {[['6yr','Open'],['120kg','Beans / week'],['4.9★','Google']].map(([v,l]) => (
            <div key={l} className="p-3 bg-white rounded-xl border border-gray-100 text-center">
              <p className="text-lg font-black">{v}</p>
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{l}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="px-6 py-8 border-t border-gray-100">
        <h2 className="text-lg font-black tracking-tighter mb-4 uppercase">From our regulars</h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { n: 'Claire M.', s: 5, t: 'The flat white is a religious experience. Staff know my order by heart now.', d: 'Aug 2025' },
            { n: 'Marcus T.', s: 5, t: 'Best kouign amann outside Paris. Come in early — they sell out by 10am.', d: 'Jul 2025' },
            { n: 'Pri N.',   s: 5, t: 'A proper neighbourhood café. Great laptop spot on weekdays too.', d: 'Jul 2025' },
          ].map(r => (
            <div key={r.n} className="p-4 rounded-xl bg-stone-50 border border-gray-100">
              <div className="flex gap-0.5 mb-1.5">{Array.from({length:r.s}).map((_,i)=><span key={i} className="text-amber-500 text-xs">★</span>)}</div>
              <p className="text-[11px] text-gray-600 leading-relaxed mb-2">"{r.t}"</p>
              <p className="text-[10px] font-black text-gray-500">{r.n} · <span className="font-normal text-gray-400">{r.d}</span></p>
            </div>
          ))}
        </div>
      </div>
      <div ref={findRef} className="grid grid-cols-2 bg-gray-50 border-t border-gray-100 scroll-mt-16">
        <div className="p-6 border-r border-gray-200">
          <h3 className="font-black text-xs uppercase tracking-widest mb-3 text-gray-500">Hours</h3>
          {[['Mon – Fri','7:00am – 5:00pm'],['Saturday','8:00am – 4:00pm'],['Sunday','9:00am – 3:00pm']].map(([d,t]) => (
            <div key={d} className="flex justify-between text-xs mb-1.5"><span className="text-gray-400">{d}</span><span className="font-bold">{t}</span></div>
          ))}
        </div>
        <div className="p-6">
          <h3 className="font-black text-xs uppercase tracking-widest mb-3 text-gray-500">Find Us</h3>
          <p className="text-xs text-gray-400 leading-relaxed">42 Crown Street<br/>Surry Hills NSW 2010</p>
          <p className="text-xs font-black text-gray-700 mt-2">(02) 9876 5432</p>
          <button onClick={openBooking} className="mt-3 bg-black text-white px-4 py-1.5 rounded-full text-[11px] font-black hover:bg-gray-800 transition-colors">Book a Table →</button>
        </div>
      </div>
      <footer className="bg-black text-white px-6 py-8">
        <div className="grid grid-cols-3 gap-8 mb-6">
          <div>
            <p className="font-black text-base tracking-tighter mb-3">THE BLACK WAVE</p>
            <p className="text-[11px] text-white/50 leading-relaxed">Specialty coffee & modern kitchen serving Sydney's east since 2019.</p>
          </div>
          <div>
            <p className="font-black text-[10px] uppercase tracking-widest mb-3 text-white/40">Follow</p>
            <div className="space-y-1.5 text-[11px] text-white/70">
              <p>Instagram · @theblackwave</p>
              <p>TikTok · @blackwave.cafe</p>
              <p>hello@blackwave.com.au</p>
            </div>
          </div>
          <div>
            <p className="font-black text-[10px] uppercase tracking-widest mb-3 text-white/40">Newsletter</p>
            <p className="text-[11px] text-white/60 mb-2">Monthly updates on seasonal menus.</p>
            <div className="flex gap-1">
              <input placeholder="email@address.com" className="flex-1 bg-white/10 border border-white/20 px-2.5 py-1.5 text-[11px] outline-none rounded placeholder:text-white/30" />
              <button className="bg-white text-black px-3 py-1.5 text-[10px] font-black rounded">Join</button>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-white/10 flex justify-between text-[10px] text-white/40">
          <span>© 2025 The Black Wave. Wurundjeri country.</span>
          <span>Privacy · Accessibility</span>
        </div>
      </footer>

      {booking && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6" onClick={() => setBooking(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl" onClick={e => e.stopPropagation()}>
            {booked ? (
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3"><span className="text-green-600 text-xl font-black">✓</span></div>
                <h3 className="font-black text-lg tracking-tighter mb-1">Booking confirmed</h3>
                <p className="text-xs text-gray-500 mb-4">{bookingData.name ? `${bookingData.name}, see` : 'See'} you at {bookingData.time} for {bookingData.guests} guest{+bookingData.guests > 1 ? 's' : ''}. A confirmation has been sent.</p>
                <button onClick={() => setBooking(false)} className="bg-black text-white px-5 py-2 rounded-full text-xs font-black w-full hover:bg-gray-800 transition-colors">Done</button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-black text-base tracking-tighter uppercase">Book a Table</h3>
                  <button onClick={() => setBooking(false)} className="text-gray-400 hover:text-black text-sm">✕</button>
                </div>
                <div className="space-y-2.5">
                  <input value={bookingData.name} onChange={e => setBookingData({...bookingData, name: e.target.value})} placeholder="Your name" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs outline-none focus:border-black" />
                  <input type="date" value={bookingData.date} onChange={e => setBookingData({...bookingData, date: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs outline-none focus:border-black" />
                  <div className="grid grid-cols-2 gap-2">
                    <select value={bookingData.time} onChange={e => setBookingData({...bookingData, time: e.target.value})} className="px-3 py-2 rounded-lg border border-gray-200 text-xs outline-none focus:border-black">
                      {['5:30pm','6:00pm','6:30pm','7:00pm','7:30pm','8:00pm','8:30pm'].map(t => <option key={t}>{t}</option>)}
                    </select>
                    <select value={bookingData.guests} onChange={e => setBookingData({...bookingData, guests: e.target.value})} className="px-3 py-2 rounded-lg border border-gray-200 text-xs outline-none focus:border-black">
                      {['1','2','3','4','5','6','7','8'].map(g => <option key={g} value={g}>{g} {+g===1?'guest':'guests'}</option>)}
                    </select>
                  </div>
                  <button onClick={() => setBooked(true)} className="w-full bg-black text-white py-2.5 rounded-full text-xs font-black mt-2 hover:bg-gray-800 transition-colors">Confirm booking</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const TradieV1 = () => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', need: 'What do you need?' });
  const [lightbox, setLightbox] = useState<string | null>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const scrollTo = (r: React.RefObject<HTMLDivElement | null>) =>
    r.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const services = [
    { icon: '🏠', title: 'Residential', desc: 'New builds, renovations, safety inspections and upgrades.' },
    { icon: '🏢', title: 'Commercial', desc: 'Office fitouts, retail lighting, switchboard upgrades.' },
    { icon: '⚡', title: 'Emergency 24/7', desc: 'Emergency callouts. On-site within 60 minutes.' },
  ];
  const gallery = [
    'https://images.unsplash.com/photo-1621905252472-e8de8a2f9ee9?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1565608087341-404b25492fee?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1588014191755-d726e86a4aef?w=500&auto=format&fit=crop&q=80',
  ];
  const reviews = [
    { name: 'Sarah K.', suburb: 'Paddington', text: 'Rob showed up on time, fixed the switchboard in under an hour, and the price was exactly what was quoted. Couldn\'t recommend higher.', stars: 5 },
    { name: 'Michael T.', suburb: 'Bondi', text: 'Emergency callout at 11pm — they answered and had someone here within 40 minutes. Total lifesaver.', stars: 5 },
    { name: 'Amy W.', suburb: 'Newtown', text: 'Did a full rewire of our terrace. Clean, tidy, no surprises. These guys are the real deal.', stars: 5 },
  ];

  const submit = () => {
    if (!form.name || !form.phone) return;
    setSent(true);
  };

  return (
    <div className="relative bg-white text-gray-900 font-sans text-[14px]">
      <div className="bg-yellow-400 px-4 py-1.5 text-center text-[10px] font-black uppercase tracking-widest">24/7 Emergency: <a href="tel:0291234567" className="underline">(02) 9123 4567</a></div>
      <nav className="flex items-center justify-between px-6 py-3 border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur z-10">
        <button onClick={() => scrollTo(servicesRef)} className="text-left"><p className="font-black text-base tracking-tighter">WATTS ELECTRICAL</p><p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Lic. No. 123456C</p></button>
        <div className="flex gap-5 text-sm">
          <button onClick={() => scrollTo(servicesRef)} className="text-gray-500 hover:text-black transition-colors">Services</button>
          <button onClick={() => scrollTo(galleryRef)} className="text-gray-500 hover:text-black transition-colors">Gallery</button>
          <button onClick={() => scrollTo(reviewsRef)} className="text-gray-500 hover:text-black transition-colors">Reviews</button>
        </div>
        <button onClick={() => scrollTo(quoteRef)} className="bg-yellow-400 text-black px-4 py-1.5 rounded-lg text-xs font-black hover:bg-yellow-500 transition-colors">Get Free Quote</button>
      </nav>
      <div className="relative h-48 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80" className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="tradie" />
        <div className="absolute inset-0 bg-black/55 flex items-center px-8">
          <div>
            <p className="text-yellow-400 text-[10px] font-black uppercase tracking-widest mb-1">Sydney's Trusted Electricians</p>
            <h1 className="text-white text-2xl font-black tracking-tighter leading-tight">LICENSED. INSURED.<br/>ON TIME.</h1>
            <div className="flex gap-2 mt-3">
              <button onClick={() => scrollTo(quoteRef)} className="bg-yellow-400 text-black px-4 py-1.5 rounded-lg text-xs font-black hover:bg-yellow-500 transition-colors">Get a Quote</button>
              <button onClick={() => scrollTo(galleryRef)} className="border border-white text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-white hover:text-black transition-colors">View Work</button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 border-b border-gray-100 text-center">
        {['20+ Years','A-Grade Lic.','Fully Insured','5★ Reviews'].map(b => (
          <div key={b} className="py-3 border-r border-gray-100 last:border-0"><p className="font-black text-xs">{b}</p></div>
        ))}
      </div>
      <div ref={servicesRef} className="px-6 py-6 scroll-mt-16">
        <h2 className="text-base font-black tracking-tighter uppercase mb-4">What We Do</h2>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {services.map((s, i) => (
            <button key={i} onClick={() => scrollTo(quoteRef)} className="text-left p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-yellow-400 hover:bg-yellow-50 transition-all">
              <div className="text-xl mb-2">{s.icon}</div>
              <h3 className="font-black text-xs mb-1">{s.title}</h3>
              <p className="text-[11px] text-gray-400 leading-relaxed">{s.desc}</p>
            </button>
          ))}
        </div>
      </div>
      <div ref={galleryRef} className="px-6 py-6 bg-gray-50 scroll-mt-16 border-t border-gray-100">
        <h2 className="text-base font-black tracking-tighter uppercase mb-4">Recent Jobs</h2>
        <div className="grid grid-cols-3 gap-2">
          {gallery.map((src, i) => (
            <button key={i} onClick={() => setLightbox(src)} className="aspect-square rounded-lg overflow-hidden bg-gray-200 hover:opacity-90 transition-opacity">
              <img src={src} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="job" />
            </button>
          ))}
        </div>
      </div>
      <div ref={reviewsRef} className="px-6 py-6 scroll-mt-16 border-t border-gray-100">
        <h2 className="text-base font-black tracking-tighter uppercase mb-4">What Clients Say</h2>
        <div className="space-y-3">
          {reviews.map((r, i) => (
            <div key={i} className="p-4 rounded-xl border border-gray-100">
              <div className="flex gap-0.5 mb-1.5">{Array.from({length: r.stars}).map((_,j) => <span key={j} className="text-yellow-400 text-xs">★</span>)}</div>
              <p className="text-[11px] text-gray-600 leading-relaxed mb-2">"{r.text}"</p>
              <p className="text-[10px] font-black text-gray-500">— {r.name}, {r.suburb}</p>
            </div>
          ))}
        </div>
      </div>
      <div ref={quoteRef} className="px-6 py-6 scroll-mt-16 border-t border-gray-100">
        <div className="p-5 rounded-2xl bg-gray-900 text-white">
          <h3 className="font-black text-sm mb-3 tracking-tighter uppercase">Get a Free Quote</h3>
          {sent ? (
            <div className="text-center py-3">
              <p className="text-green-400 font-black text-sm mb-1">✓ Request sent!</p>
              <p className="text-white/60 text-[11px]">Thanks {form.name} — we'll call you on {form.phone} within 2 hours.</p>
              <button onClick={() => { setSent(false); setForm({ name: '', phone: '', need: 'What do you need?' }); }} className="mt-3 text-yellow-400 text-[11px] font-black underline">Send another</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-xs text-white placeholder:text-white/40 outline-none focus:border-yellow-400" placeholder="Your name" />
              <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-xs text-white placeholder:text-white/40 outline-none focus:border-yellow-400" placeholder="Phone number" />
              <select value={form.need} onChange={e => setForm({...form, need: e.target.value})} className="col-span-2 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-xs text-white/70 outline-none focus:border-yellow-400">
                <option>What do you need?</option>
                <option>Residential work</option>
                <option>Commercial work</option>
                <option>Emergency callout</option>
              </select>
              <button onClick={submit} disabled={!form.name || !form.phone} className="col-span-2 bg-yellow-400 text-black py-2 rounded-lg font-black text-xs disabled:opacity-50 hover:bg-yellow-500 transition-colors">Send Request →</button>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 py-6 border-t border-gray-100">
        <h2 className="text-base font-black tracking-tighter uppercase mb-3">Service areas</h2>
        <p className="text-xs text-gray-500 mb-3">Covering Sydney metro — 60-minute response:</p>
        <div className="flex flex-wrap gap-1.5">
          {['Bondi','Paddington','Newtown','Surry Hills','Marrickville','Redfern','Chippendale','Glebe','Randwick','Coogee','Kensington','Waterloo','Alexandria','Darlinghurst','Potts Point'].map(s => (
            <span key={s} className="text-[10px] font-bold uppercase tracking-widest text-gray-500 border border-gray-200 px-2 py-1 rounded">{s}</span>
          ))}
        </div>
      </div>

      {lightbox && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6" onClick={() => setLightbox(null)}>
          <img src={lightbox} className="max-h-full max-w-full rounded-xl shadow-2xl" alt="preview" referrerPolicy="no-referrer" />
          <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 text-white text-xl">✕</button>
        </div>
      )}
      <footer className="bg-gray-900 text-white px-6 py-8">
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="col-span-2">
            <p className="font-black text-base tracking-tighter mb-1">WATTS ELECTRICAL</p>
            <p className="text-[10px] text-yellow-400 font-bold uppercase tracking-widest mb-3">Lic. 123456C · ABN 45 678 901 234</p>
            <p className="text-[11px] text-white/50 leading-relaxed">Family-owned master electricians. Servicing Sydney metro since 2003.</p>
            <div className="flex gap-2 mt-3">
              <span className="text-[9px] bg-yellow-400 text-black font-black px-2 py-0.5 rounded">NECA</span>
              <span className="text-[9px] bg-white/10 text-white font-black px-2 py-0.5 rounded">A-Grade</span>
              <span className="text-[9px] bg-white/10 text-white font-black px-2 py-0.5 rounded">$20M Insured</span>
            </div>
          </div>
          <div>
            <p className="font-black text-[10px] uppercase tracking-widest mb-3 text-white/40">Contact</p>
            <p className="text-[11px] text-white/70 mb-0.5">(02) 9123 4567</p>
            <p className="text-[11px] text-white/70 mb-0.5">info@watts.com.au</p>
            <p className="text-[11px] text-white/70">Bondi Junction NSW</p>
          </div>
          <div>
            <p className="font-black text-[10px] uppercase tracking-widest mb-3 text-white/40">Hours</p>
            <p className="text-[11px] text-white/70 mb-0.5">Mon–Fri · 7am–5pm</p>
            <p className="text-[11px] text-white/70 mb-0.5">Sat · 8am–2pm</p>
            <p className="text-[11px] text-yellow-400 font-bold">24/7 Emergency</p>
          </div>
        </div>
        <div className="pt-4 border-t border-white/10 flex justify-between text-[10px] text-white/40">
          <span>© 2025 Watts Electrical Pty Ltd.</span>
          <span>Terms · Privacy · Warranty</span>
        </div>
      </footer>
    </div>
  );
};

const CoachV1 = () => {
  const plans = [
    { name: 'Discovery Call', price: 'Free', duration: '30 min', features: ['Goal mapping', 'Q&A', 'No commitment'] },
    { name: 'Monthly 1:1', price: '$350/mo', duration: '4 sessions', features: ['Weekly check-ins', 'Action plans', 'Slack support'] },
    { name: 'Intensive', price: '$990', duration: '12 weeks', features: ['2× sessions/week', 'Full roadmap', 'Priority access'] },
  ];
  const [booking, setBooking] = useState<number | null>(null);
  const [booked, setBooked] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const storiesRef = useRef<HTMLDivElement>(null);
  const scrollTo = (r: React.RefObject<HTMLDivElement | null>) =>
    r.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const today = new Date();
  const dates = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i + 1);
    return { key: d.toISOString().slice(0, 10), day: d.toLocaleDateString('en-AU', { weekday: 'short' }), num: d.getDate(), month: d.toLocaleDateString('en-AU', { month: 'short' }) };
  });
  const times = ['9:00am', '10:30am', '12:00pm', '2:00pm', '3:30pm', '5:00pm'];

  const openBooking = (idx: number) => { setBooking(idx); setBooked(false); setSelectedDate(null); setSelectedTime(null); setEmail(''); };
  const canConfirm = selectedDate && selectedTime && email.includes('@');

  return (
    <div className="relative bg-white text-gray-900 font-sans text-[14px]">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur z-10">
        <button onClick={() => scrollTo(aboutRef)} className="font-black text-lg tracking-tighter italic">Jessica Moore</button>
        <div className="flex gap-5 text-sm">
          <button onClick={() => scrollTo(aboutRef)} className="text-gray-500 hover:text-black transition-colors">About</button>
          <button onClick={() => scrollTo(servicesRef)} className="text-gray-500 hover:text-black transition-colors">Services</button>
          <button onClick={() => scrollTo(storiesRef)} className="text-gray-500 hover:text-black transition-colors">Stories</button>
        </div>
        <button onClick={() => openBooking(0)} className="border-2 border-black text-black px-4 py-1.5 rounded-full text-xs font-black hover:bg-black hover:text-white transition-colors">Book a Call</button>
      </nav>
      <div ref={aboutRef} className="grid grid-cols-2 min-h-[180px] scroll-mt-16">
        <div className="bg-stone-50 p-8 flex flex-col justify-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-rose-500 mb-2">Life & Career Coach</p>
          <h1 className="text-2xl font-black tracking-tighter leading-tight mb-3">CLARITY.<br/>DIRECTION.<br/>MOMENTUM.</h1>
          <p className="text-xs text-gray-400 leading-relaxed mb-4">I help ambitious professionals design a life they're proud of — without burning out.</p>
          <button onClick={() => openBooking(0)} className="bg-black text-white px-5 py-2 rounded-full text-xs font-black w-fit hover:bg-gray-800 transition-colors">Book Free Call →</button>
        </div>
        <div className="overflow-hidden">
          <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&auto=format&fit=crop&q=80" className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="coach" />
        </div>
      </div>
      <div ref={servicesRef} className="px-6 py-6 scroll-mt-16">
        <h2 className="text-base font-black tracking-tighter uppercase mb-4">Work With Me</h2>
        <div className="grid grid-cols-3 gap-3 mb-5">
          {plans.map((p, i) => (
            <div key={i} className={`p-4 rounded-2xl border-2 ${i === 1 ? 'border-black bg-black text-white' : 'border-gray-100'}`}>
              <p className={`text-[10px] font-black uppercase tracking-widest mb-0.5 ${i === 1 ? 'text-white/50' : 'text-gray-400'}`}>{p.duration}</p>
              <h3 className="font-black text-xs mb-1">{p.name}</h3>
              <p className={`text-base font-black mb-3 ${i === 1 ? 'text-white' : ''}`}>{p.price}</p>
              <div className="space-y-1 mb-3">
                {p.features.map((f, j) => <p key={j} className={`text-[11px] ${i === 1 ? 'text-white/70' : 'text-gray-500'}`}>✓ {f}</p>)}
              </div>
              <button onClick={() => openBooking(i)} className={`w-full py-1.5 rounded-xl text-[11px] font-black transition-colors ${i === 1 ? 'bg-white text-black hover:bg-gray-100' : 'bg-gray-100 hover:bg-gray-200'}`}>Book Now</button>
            </div>
          ))}
        </div>
      </div>
      <div ref={storiesRef} className="px-6 py-6 scroll-mt-16 border-t border-gray-100">
        <h2 className="text-base font-black tracking-tighter uppercase mb-4">Client Stories</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-5 rounded-2xl bg-rose-50">
            <p className="text-xs italic text-gray-600 leading-relaxed mb-2">"Jessica helped me land my dream role in 8 weeks. Direct, warm, and genuinely results-focused."</p>
            <p className="text-[10px] font-black text-gray-700">— Priya S., Product Manager at Atlassian</p>
          </div>
          <div className="p-5 rounded-2xl bg-stone-100">
            <p className="text-xs italic text-gray-600 leading-relaxed mb-2">"I came in burnt out and stuck. Three months later, I've got a career plan I actually believe in."</p>
            <p className="text-[10px] font-black text-gray-700">— Daniel R., Engineering Lead</p>
          </div>
        </div>
      </div>

      {booking !== null && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setBooking(null)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl max-h-[95%] overflow-y-auto" onClick={e => e.stopPropagation()}>
            {booked ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3"><span className="text-rose-500 text-2xl">✓</span></div>
                <h3 className="font-black text-lg tracking-tighter mb-1">You're booked in!</h3>
                <p className="text-xs text-gray-500 mb-1">{plans[booking].name} · {selectedDate} at {selectedTime}</p>
                <p className="text-[11px] text-gray-400">Calendar invite sent to {email}</p>
                <button onClick={() => setBooking(null)} className="mt-4 bg-black text-white px-5 py-2 rounded-full text-xs font-black w-full hover:bg-gray-800 transition-colors">Done</button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-rose-500 mb-0.5">Book {plans[booking].name}</p>
                    <h3 className="font-black text-base tracking-tighter">Pick a date & time</h3>
                  </div>
                  <button onClick={() => setBooking(null)} className="text-gray-400 hover:text-black">✕</button>
                </div>
                <div className="mb-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Date</p>
                  <div className="grid grid-cols-7 gap-1.5">
                    {dates.map(d => (
                      <button key={d.key} onClick={() => setSelectedDate(d.key)} className={`p-2 rounded-lg text-center transition-colors ${selectedDate === d.key ? 'bg-black text-white' : 'bg-gray-50 hover:bg-gray-100'}`}>
                        <p className="text-[9px] font-bold uppercase">{d.day}</p>
                        <p className="text-sm font-black">{d.num}</p>
                        <p className="text-[8px] uppercase">{d.month}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Time</p>
                  <div className="grid grid-cols-3 gap-1.5">
                    {times.map(t => (
                      <button key={t} onClick={() => setSelectedTime(t)} className={`py-1.5 rounded-lg text-[11px] font-black transition-colors ${selectedTime === t ? 'bg-black text-white' : 'bg-gray-50 hover:bg-gray-100'}`}>{t}</button>
                    ))}
                  </div>
                </div>
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Your email" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs outline-none focus:border-black mb-3" />
                <button onClick={() => setBooked(true)} disabled={!canConfirm} className="w-full bg-black text-white py-2.5 rounded-full text-xs font-black disabled:opacity-40 hover:bg-gray-800 transition-colors">Confirm booking</button>
              </>
            )}
          </div>
        </div>
      )}

      <div className="px-6 py-8 bg-stone-50 border-t border-gray-100">
        <h2 className="font-black text-base tracking-tighter uppercase mb-4">Featured in</h2>
        <div className="flex flex-wrap gap-5 text-xs text-gray-400 italic">
          <span>The Sydney Morning Herald</span><span>·</span><span>ABC Life</span><span>·</span><span>Broadsheet</span><span>·</span><span>InDaily</span>
        </div>
      </div>

      <footer className="bg-stone-900 text-stone-100 px-6 py-8">
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div>
            <p className="font-serif italic text-lg mb-2">Jessica Moore</p>
            <p className="text-[10px] text-rose-400 font-black uppercase tracking-widest mb-3">APC Member · ICF Certified</p>
            <p className="text-[11px] text-stone-400 leading-relaxed">1-to-1 coaching for ambitious professionals. Sydney based, globally available.</p>
          </div>
          <div>
            <p className="font-black text-[10px] uppercase tracking-widest mb-3 text-stone-500">Contact</p>
            <p className="text-[11px] text-stone-300 mb-0.5">hello@jessicamoore.co</p>
            <p className="text-[11px] text-stone-300 mb-0.5">Sydney · Mon–Fri</p>
            <p className="text-[11px] text-stone-300">@jessicamoore.coach</p>
          </div>
          <div>
            <p className="font-black text-[10px] uppercase tracking-widest mb-3 text-stone-500">The Newsletter</p>
            <p className="text-[11px] text-stone-400 mb-2">Weekly notes on clarity and direction.</p>
            <div className="flex gap-1">
              <input placeholder="your@email.com" className="flex-1 bg-white/5 border border-white/10 px-2.5 py-1.5 text-[11px] outline-none rounded placeholder:text-stone-500" />
              <button className="bg-rose-400 text-stone-900 px-3 py-1.5 text-[10px] font-black rounded">Join</button>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-white/10 flex justify-between text-[10px] text-stone-500">
          <span>© 2025 Jessica Moore Coaching</span>
          <span>Privacy · Terms · Ethics</span>
        </div>
      </footer>
    </div>
  );
};

type Product = { id: string; name: string; price: number; img: string; desc: string };
const RetailV1 = () => {
  const products: Product[] = [
    { id: 'tote',    name: 'Linen Tote — Sand',    price: 49,  img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&auto=format&fit=crop&q=80', desc: 'Heavyweight woven linen, hand-finished handles. Made in Portugal.' },
    { id: 'mug',     name: 'Ceramic Mug — Ash',    price: 34,  img: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=300&auto=format&fit=crop&q=80', desc: 'Hand-thrown stoneware with a matte glaze. Holds 320ml. Dishwasher safe.' },
    { id: 'candle',  name: 'Beeswax Candle',       price: 28,  img: 'https://images.unsplash.com/photo-1602607963921-a42c8736bd28?w=300&auto=format&fit=crop&q=80', desc: '100% Australian beeswax. 40-hour burn time. Unscented.' },
    { id: 'throw',   name: 'Merino Throw',         price: 120, img: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=300&auto=format&fit=crop&q=80', desc: 'Fine-gauge merino wool from NZ. 130×180cm. Natural off-white.' },
    { id: 'tray',    name: 'Timber Tray',          price: 65,  img: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=300&auto=format&fit=crop&q=80', desc: 'Solid Tasmanian oak, finished with natural tung oil. 40×25cm.' },
    { id: 'botanic', name: 'Pressed Botanicals',   price: 22,  img: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=300&auto=format&fit=crop&q=80', desc: 'Hand-pressed native flora, framed in recycled glass. A6 size.' },
  ];
  type CartItem = { id: string; qty: number };
  const [cart, setCart] = useState<CartItem[]>([]);
  const [drawer, setDrawer] = useState(false);
  const [detail, setDetail] = useState<Product | null>(null);
  const [checkout, setCheckout] = useState(false);
  const [ordered, setOrdered] = useState(false);

  const totalQty = cart.reduce((s, c) => s + c.qty, 0);
  const items = cart.map(c => ({ ...c, product: products.find(p => p.id === c.id)! }));
  const total = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const addToCart = (id: string) => setCart(c => {
    const found = c.find(x => x.id === id);
    return found ? c.map(x => x.id === id ? { ...x, qty: x.qty + 1 } : x) : [...c, { id, qty: 1 }];
  });
  const updateQty = (id: string, delta: number) => setCart(c => c.flatMap(x => x.id === id ? (x.qty + delta <= 0 ? [] : [{ ...x, qty: x.qty + delta }]) : [x]));
  const removeItem = (id: string) => setCart(c => c.filter(x => x.id !== id));

  return (
    <div className="relative bg-white text-gray-900 font-sans text-[14px]">
      <div className="bg-stone-100 text-center py-1.5 text-[10px] font-bold text-gray-500 tracking-widest uppercase">Free shipping on orders over $75</div>
      <nav className="flex items-center justify-between px-6 py-3 border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur z-10">
        <div className="font-black text-lg tracking-tighter">STONE & GROVE</div>
        <div className="flex gap-5 text-sm text-gray-400"><span>Shop</span><span>About</span><span>Stockists</span></div>
        <button onClick={() => setDrawer(true)} className="relative text-sm font-bold hover:text-black transition-colors">
          Cart {totalQty > 0 && <span className="absolute -top-1.5 -right-3 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-black">{totalQty}</span>}
        </button>
      </nav>
      <div className="relative h-40 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&auto=format&fit=crop&q=80" className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="retail" />
        <div className="absolute inset-0 bg-black/35 flex flex-col items-center justify-center gap-1.5 text-white">
          <p className="text-[10px] uppercase tracking-widest font-bold text-white/60">New Arrivals — Winter 2025</p>
          <h2 className="text-2xl font-black tracking-tighter">NATURALLY CONSIDERED.</h2>
          <button onClick={() => setDetail(products[0])} className="bg-white text-black px-5 py-1.5 rounded-full text-[11px] font-black hover:bg-gray-100 transition-colors">Shop Now →</button>
        </div>
      </div>
      <div className="px-6 py-6">
        <h2 className="text-xs font-black uppercase tracking-widest mb-4 text-gray-400">Featured Products</h2>
        <div className="grid grid-cols-3 gap-3">
          {products.map((p) => (
            <div key={p.id} className="group">
              <button onClick={() => setDetail(p)} className="block w-full aspect-square rounded-xl overflow-hidden bg-gray-100 mb-2">
                <img src={p.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" alt={p.name} />
              </button>
              <button onClick={() => setDetail(p)} className="text-left text-[11px] font-bold text-gray-700 mb-0.5 hover:underline">{p.name}</button>
              <div className="flex items-center justify-between">
                <p className="text-[11px] text-gray-400">${p.price}</p>
                <button onClick={() => addToCart(p.id)} className="text-[9px] font-black text-black opacity-0 group-hover:opacity-100 transition-opacity hover:underline">Add +</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {detail && (
        <div className="absolute inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setDetail(null)}>
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="aspect-[4/3] overflow-hidden bg-gray-100"><img src={detail.img} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt={detail.name} /></div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-black text-base tracking-tighter">{detail.name}</h3>
                  <p className="text-sm font-black text-gray-900 mt-0.5">${detail.price}</p>
                </div>
                <button onClick={() => setDetail(null)} className="text-gray-400 hover:text-black text-sm">✕</button>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed mb-4">{detail.desc}</p>
              <button onClick={() => { addToCart(detail.id); setDetail(null); setDrawer(true); }} className="w-full bg-black text-white py-2.5 rounded-full text-xs font-black hover:bg-gray-800 transition-colors">Add to cart — ${detail.price}</button>
            </div>
          </div>
        </div>
      )}

      {drawer && (
        <div className="absolute inset-0 z-50 bg-black/40 flex justify-end" onClick={() => setDrawer(false)}>
          <div className="bg-white w-full max-w-xs h-full flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <h3 className="font-black text-sm tracking-tighter uppercase">Your cart ({totalQty})</h3>
              <button onClick={() => setDrawer(false)} className="text-gray-400 hover:text-black">✕</button>
            </div>
            {ordered ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-3"><span className="text-green-600 text-2xl">✓</span></div>
                <h4 className="font-black text-base tracking-tighter mb-1">Order placed!</h4>
                <p className="text-xs text-gray-500">Order #SG-{Math.floor(Math.random()*9000+1000)} · Confirmation emailed.</p>
                <button onClick={() => { setOrdered(false); setCart([]); setCheckout(false); setDrawer(false); }} className="mt-4 bg-black text-white px-5 py-2 rounded-full text-xs font-black">Continue shopping</button>
              </div>
            ) : checkout ? (
              <div className="flex-1 overflow-y-auto p-4">
                <button onClick={() => setCheckout(false)} className="text-[10px] font-black text-gray-500 hover:text-black mb-3 uppercase tracking-widest">← Back to cart</button>
                <h4 className="font-black text-xs uppercase tracking-widest mb-3 text-gray-500">Checkout</h4>
                <div className="space-y-2 mb-4">
                  <input placeholder="Email" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs outline-none focus:border-black" />
                  <input placeholder="Full name" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs outline-none focus:border-black" />
                  <input placeholder="Shipping address" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs outline-none focus:border-black" />
                  <input placeholder="Card number" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs outline-none focus:border-black" />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mb-1"><span>Subtotal</span><span>${total}</span></div>
                <div className="flex justify-between text-xs text-gray-500 mb-3"><span>Shipping</span><span>{total >= 75 ? 'Free' : '$9.50'}</span></div>
                <div className="flex justify-between font-black text-sm mb-3 pt-2 border-t border-gray-100"><span>Total</span><span>${total + (total >= 75 ? 0 : 9.5)}</span></div>
                <button onClick={() => setOrdered(true)} className="w-full bg-black text-white py-2.5 rounded-full text-xs font-black hover:bg-gray-800 transition-colors">Pay now</button>
              </div>
            ) : items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <p className="text-xs text-gray-400 mb-3">Your cart is empty.</p>
                <button onClick={() => setDrawer(false)} className="bg-black text-white px-5 py-2 rounded-full text-xs font-black">Keep shopping</button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {items.map(it => (
                    <div key={it.id} className="flex gap-3">
                      <img src={it.product.img} className="w-14 h-14 rounded-lg object-cover shrink-0" referrerPolicy="no-referrer" alt={it.product.name} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-bold truncate">{it.product.name}</p>
                        <p className="text-[11px] text-gray-400 mb-1">${it.product.price}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center border border-gray-200 rounded-full">
                            <button onClick={() => updateQty(it.id, -1)} className="w-5 h-5 text-xs hover:bg-gray-100 rounded-l-full">−</button>
                            <span className="text-[10px] font-black px-2">{it.qty}</span>
                            <button onClick={() => updateQty(it.id, 1)} className="w-5 h-5 text-xs hover:bg-gray-100 rounded-r-full">+</button>
                          </div>
                          <button onClick={() => removeItem(it.id)} className="text-[10px] text-gray-400 hover:text-red-500 underline">Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-100">
                  <div className="flex justify-between font-black text-sm mb-3"><span>Subtotal</span><span>${total}</span></div>
                  <button onClick={() => setCheckout(true)} className="w-full bg-black text-white py-2.5 rounded-full text-xs font-black hover:bg-gray-800 transition-colors">Checkout →</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div className="px-6 py-8 border-t border-gray-100 bg-stone-50">
        <div className="grid grid-cols-2 gap-6 items-center">
          <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=80" className="w-full aspect-[4/3] object-cover rounded-2xl" referrerPolicy="no-referrer" alt="workshop" />
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Our story</p>
            <h2 className="text-xl font-black tracking-tighter uppercase mb-3">Made by hand.<br/>Built to last.</h2>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">Stone & Grove was founded in 2019 by a small team of makers in Marrickville, NSW. Every piece in our store is handcrafted — either by us or by our network of Australian and Portuguese artisans.</p>
            <p className="text-xs text-gray-500 leading-relaxed">We believe homewares should be made slowly, repaired rather than replaced, and passed down.</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 border-t border-gray-100">
        <h2 className="text-xs font-black uppercase tracking-widest mb-4 text-gray-500">Customer reviews · 4.9 ★ (243)</h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { n: 'Olivia J.', s: 5, t: 'The throw is even better in person. Packaged beautifully.', d: 'Verified · 2 weeks ago' },
            { n: 'Luke R.',   s: 5, t: 'Second time ordering. Everything arrives carefully wrapped.', d: 'Verified · 1 month ago' },
            { n: 'Zara K.',   s: 5, t: 'My favourite homewares store in Sydney. Everything has a soul.', d: 'Verified · 2 months ago' },
          ].map(r => (
            <div key={r.n} className="p-4 rounded-xl bg-stone-50">
              <div className="flex gap-0.5 mb-1.5">{Array.from({length:r.s}).map((_,i)=><span key={i} className="text-amber-500 text-xs">★</span>)}</div>
              <p className="text-[11px] text-gray-600 leading-relaxed mb-2">"{r.t}"</p>
              <p className="text-[10px] font-black text-gray-500">{r.n}</p>
              <p className="text-[9px] text-gray-400">{r.d}</p>
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-black text-white px-6 py-8">
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div>
            <p className="font-black text-base tracking-tighter mb-3">STONE & GROVE</p>
            <p className="text-[11px] text-white/50 leading-relaxed">Considered homewares, made to last.</p>
          </div>
          <div>
            <p className="font-black text-[10px] uppercase tracking-widest mb-3 text-white/40">Shop</p>
            <div className="space-y-1 text-[11px] text-white/70"><p>All products</p><p>New arrivals</p><p>Sale</p><p>Gift cards</p></div>
          </div>
          <div>
            <p className="font-black text-[10px] uppercase tracking-widest mb-3 text-white/40">Support</p>
            <div className="space-y-1 text-[11px] text-white/70"><p>Shipping & returns</p><p>FAQ</p><p>Stockists</p><p>Contact</p></div>
          </div>
          <div>
            <p className="font-black text-[10px] uppercase tracking-widest mb-3 text-white/40">Newsletter</p>
            <p className="text-[11px] text-white/60 mb-2">10% off your first order.</p>
            <div className="flex gap-1">
              <input placeholder="email@address" className="flex-1 bg-white/10 border border-white/20 px-2.5 py-1.5 text-[11px] outline-none rounded placeholder:text-white/30" />
              <button className="bg-white text-black px-3 py-1.5 text-[10px] font-black rounded">Join</button>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-white/10 flex justify-between text-[10px] text-white/40">
          <span>© 2025 Stone & Grove. Made in Marrickville.</span>
          <span>Privacy · Terms · Shipping</span>
        </div>
      </footer>
    </div>
  );
};

const SmallBizV1 = () => {
  const [formSent, setFormSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [booking, setBooking] = useState(false);
  const [booked, setBooked] = useState(false);
  const [bookingData, setBookingData] = useState({ name: '', email: '', topic: 'Tax planning', time: '' });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const scrollTo = (r: React.RefObject<HTMLDivElement | null>) =>
    r.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const openBooking = () => { setBooked(false); setBooking(true); };

  const services = [
    { icon: '📋', title: 'Bookkeeping', desc: 'Monthly reconciliation, BAS preparation, and financial reporting.' },
    { icon: '📊', title: 'Tax Returns', desc: 'Individual, company, and trust returns. Lodged on time.' },
    { icon: '💼', title: 'Business Advisory', desc: 'Cash flow forecasting, growth strategy, and budget planning.' },
    { icon: '⚙️', title: 'Payroll', desc: 'STP-compliant payroll, superannuation, and leave management.' },
  ];
  const team = [
    { name: 'Elena Chen', role: 'Principal · CPA', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80' },
    { name: 'James Park', role: 'Senior Tax Agent', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80' },
    { name: 'Priya Nair', role: 'Business Advisor', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80' },
  ];
  const faqs = [
    { q: 'How much do you charge?', a: 'Fixed monthly packages starting at $299/mo for sole traders, or one-off engagements from $450. No hidden fees — ever.' },
    { q: 'Do you handle ATO audits?', a: 'Yes. Every engagement includes ATO correspondence support. If you\'re audited, we handle it end-to-end.' },
    { q: 'Can I switch mid-year?', a: 'Absolutely. We\'ll take a handover from your current accountant and get everything reconciled within 2 weeks.' },
  ];

  const submit = () => {
    if (!form.name || !form.email) return;
    setFormSent(true);
  };
  const confirmBooking = () => setBooked(true);

  return (
    <div className="relative bg-white text-gray-900 font-sans text-[14px]">
      <nav className="flex items-center justify-between px-6 py-3 bg-blue-900 text-white sticky top-0 z-10">
        <button onClick={() => scrollTo(servicesRef)} className="text-left"><p className="font-black text-sm tracking-tighter">MERIDIAN ACCOUNTING</p><p className="text-[10px] text-blue-300 font-bold uppercase tracking-widest">CPA · Tax Agents</p></button>
        <div className="flex gap-5 text-sm">
          <button onClick={() => scrollTo(servicesRef)} className="text-blue-300 hover:text-white transition-colors">Services</button>
          <button onClick={() => scrollTo(teamRef)} className="text-blue-300 hover:text-white transition-colors">Team</button>
          <button onClick={() => scrollTo(resourcesRef)} className="text-blue-300 hover:text-white transition-colors">Resources</button>
        </div>
        <button onClick={openBooking} className="bg-blue-400 text-white px-4 py-1.5 rounded-lg text-xs font-black hover:bg-blue-500 transition-colors">Book a Meeting</button>
      </nav>
      <div className="bg-blue-50 px-6 py-8 flex justify-between items-center gap-6">
        <div className="max-w-xs">
          <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2">Trusted by 200+ Australian businesses</p>
          <h1 className="text-2xl font-black tracking-tighter leading-tight text-blue-900 mb-3">YOUR NUMBERS.<br/>OUR EXPERTISE.</h1>
          <p className="text-xs text-gray-500 leading-relaxed mb-4">Helping small and medium businesses take control of their finances.</p>
          <div className="flex gap-2">
            <button onClick={openBooking} className="bg-blue-900 text-white px-4 py-2 rounded-lg text-xs font-black hover:bg-blue-800 transition-colors">Free Consultation</button>
            <button onClick={() => scrollTo(servicesRef)} className="border border-blue-900 text-blue-900 px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-900 hover:text-white transition-colors">Our Services</button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 shrink-0">
          {[['200+','Clients'],['15yr','Experience'],['$0','Hidden Fees'],['48hr','Response']].map(([v,l]) => (
            <div key={l} className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
              <p className="text-lg font-black text-blue-900">{v}</p>
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{l}</p>
            </div>
          ))}
        </div>
      </div>
      <div ref={servicesRef} className="px-6 py-6 scroll-mt-16">
        <h2 className="text-sm font-black tracking-tighter uppercase mb-4">Our Services</h2>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {services.map((s, i) => (
            <button key={i} onClick={openBooking} className="text-left p-4 rounded-xl border border-gray-100 hover:border-blue-400 hover:bg-blue-50 transition-all">
              <div className="text-xl mb-1.5">{s.icon}</div>
              <h3 className="font-black text-xs mb-0.5">{s.title}</h3>
              <p className="text-[11px] text-gray-400 leading-relaxed">{s.desc}</p>
            </button>
          ))}
        </div>
      </div>
      <div ref={teamRef} className="px-6 py-6 bg-gray-50 border-t border-gray-100 scroll-mt-16">
        <h2 className="text-sm font-black tracking-tighter uppercase mb-4">Meet the Team</h2>
        <div className="grid grid-cols-3 gap-3">
          {team.map(m => (
            <div key={m.name} className="text-center">
              <div className="aspect-square rounded-full overflow-hidden mb-2 bg-gray-200"><img src={m.img} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt={m.name} /></div>
              <p className="text-xs font-black">{m.name}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{m.role}</p>
            </div>
          ))}
        </div>
      </div>
      <div ref={resourcesRef} className="px-6 py-6 scroll-mt-16 border-t border-gray-100">
        <h2 className="text-sm font-black tracking-tighter uppercase mb-4">FAQs</h2>
        <div className="space-y-2">
          {faqs.map((f, i) => (
            <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex justify-between items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors">
                <span className="text-xs font-black">{f.q}</span>
                <span className={`text-gray-400 text-sm transition-transform ${openFaq === i ? 'rotate-180' : ''}`}>⌄</span>
              </button>
              {openFaq === i && <div className="px-4 pb-3 text-[11px] text-gray-500 leading-relaxed">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
      <div ref={contactRef} className="px-6 py-6 scroll-mt-16 border-t border-gray-100">
        <div className="p-5 rounded-2xl border border-gray-100">
          <h3 className="font-black text-sm uppercase tracking-tight mb-3">Get In Touch</h3>
          {formSent ? (
            <div className="text-center py-3">
              <p className="text-green-600 font-black text-sm mb-1">✓ Message sent!</p>
              <p className="text-[11px] text-gray-500">Thanks {form.name} — we'll reply to {form.email} within 24h.</p>
              <button onClick={() => { setFormSent(false); setForm({ name: '', email: '', message: '' }); }} className="mt-3 text-blue-600 text-[11px] font-black underline">Send another</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="px-3 py-2 rounded-lg border border-gray-200 text-xs outline-none focus:border-blue-600" placeholder="Your name" />
              <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="px-3 py-2 rounded-lg border border-gray-200 text-xs outline-none focus:border-blue-600" placeholder="Email address" />
              <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="col-span-2 px-3 py-2 rounded-lg border border-gray-200 text-xs outline-none h-14 resize-none focus:border-blue-600" placeholder="How can we help?" />
              <button onClick={submit} disabled={!form.name || !form.email} className="col-span-2 bg-blue-900 text-white py-2 rounded-lg font-black text-xs disabled:opacity-50 hover:bg-blue-800 transition-colors">Send Message →</button>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 py-6 bg-blue-50 border-t border-blue-100">
        <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-3">Our Offices</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { city: 'Sydney', addr: 'Level 14, 88 Phillip St', suburb: 'Sydney NSW 2000', hrs: 'Mon–Fri · 8:30am–5:30pm' },
            { city: 'Melbourne', addr: 'Suite 702, 120 Collins St', suburb: 'Melbourne VIC 3000', hrs: 'Mon–Fri · 9:00am–5:30pm' },
          ].map(o => (
            <div key={o.city} className="p-3 bg-white rounded-xl border border-blue-100">
              <p className="text-xs font-black text-blue-900">{o.city}</p>
              <p className="text-[11px] text-gray-500 mt-1">{o.addr}</p>
              <p className="text-[11px] text-gray-500">{o.suburb}</p>
              <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-1.5">{o.hrs}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5 mt-4">
          {['CPA Australia','Registered Tax Agent 25814326','Xero Gold Partner','MYOB Certified'].map(b => (
            <span key={b} className="text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-white border border-blue-200 text-blue-900 rounded">{b}</span>
          ))}
        </div>
      </div>

      <footer className="bg-blue-900 text-white px-6 py-8">
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <p className="font-black text-sm tracking-tighter">MERIDIAN ACCOUNTING</p>
            <p className="text-[10px] text-blue-300 font-bold uppercase tracking-widest mb-3">CPA · Tax Agents</p>
            <p className="text-[11px] text-blue-200 leading-relaxed">Australian-owned accounting firm serving 200+ SMEs across NSW &amp; VIC since 2009.</p>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-blue-300 mb-2">Services</p>
            <ul className="space-y-1 text-[11px] text-blue-100">
              <li>Bookkeeping &amp; BAS</li>
              <li>Tax returns</li>
              <li>Business advisory</li>
              <li>Payroll &amp; super</li>
              <li>SMSF</li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-blue-300 mb-2">Tax Deadline Reminders</p>
            <p className="text-[11px] text-blue-200 mb-2 leading-relaxed">Never miss a BAS or lodgement. Quarterly email digest.</p>
            <div className="flex gap-1.5">
              <input placeholder="you@business.com.au" className="flex-1 px-2 py-1.5 rounded bg-blue-800 border border-blue-700 text-[11px] text-white placeholder:text-blue-400 outline-none" />
              <button className="bg-blue-400 hover:bg-blue-300 text-blue-900 px-3 py-1.5 rounded text-[10px] font-black transition-colors">Sign up</button>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-blue-300 mb-2">Contact</p>
            <p className="text-[11px] text-blue-100">(02) 9283 4400</p>
            <p className="text-[11px] text-blue-100">hello@meridian.com.au</p>
            <p className="text-[11px] text-blue-300 mt-2">ABN 72 128 445 903</p>
          </div>
        </div>
        <div className="pt-4 border-t border-blue-800 flex justify-between items-center text-[10px] text-blue-300 font-bold uppercase tracking-widest">
          <span>© 2025 Meridian Accounting Pty Ltd</span>
          <span>Privacy · Terms · Client Login</span>
        </div>
      </footer>

      {booking && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6" onClick={() => setBooking(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl" onClick={e => e.stopPropagation()}>
            {booked ? (
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3"><span className="text-blue-600 text-xl">✓</span></div>
                <h3 className="font-black text-lg tracking-tighter mb-1">Consultation booked</h3>
                <p className="text-xs text-gray-500 mb-4">{bookingData.time} · {bookingData.topic}. Calendar invite sent to {bookingData.email}.</p>
                <button onClick={() => setBooking(false)} className="bg-blue-900 text-white px-5 py-2 rounded-lg text-xs font-black w-full hover:bg-blue-800 transition-colors">Done</button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-black text-base tracking-tighter uppercase">Free Consultation</h3>
                  <button onClick={() => setBooking(false)} className="text-gray-400 hover:text-black text-sm">✕</button>
                </div>
                <div className="space-y-2.5">
                  <input value={bookingData.name} onChange={e => setBookingData({...bookingData, name: e.target.value})} placeholder="Your name" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs outline-none focus:border-blue-600" />
                  <input value={bookingData.email} onChange={e => setBookingData({...bookingData, email: e.target.value})} placeholder="Email" type="email" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs outline-none focus:border-blue-600" />
                  <select value={bookingData.topic} onChange={e => setBookingData({...bookingData, topic: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs outline-none focus:border-blue-600">
                    <option>Tax planning</option>
                    <option>Bookkeeping</option>
                    <option>Business advisory</option>
                    <option>Payroll</option>
                  </select>
                  <select value={bookingData.time} onChange={e => setBookingData({...bookingData, time: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs outline-none focus:border-blue-600">
                    <option value="">Pick a time slot</option>
                    <option>Tomorrow · 10:00am</option>
                    <option>Tomorrow · 2:30pm</option>
                    <option>Wed · 9:30am</option>
                    <option>Wed · 1:00pm</option>
                    <option>Thu · 11:00am</option>
                  </select>
                  <button onClick={confirmBooking} disabled={!bookingData.name || !bookingData.email || !bookingData.time} className="w-full bg-blue-900 text-white py-2.5 rounded-lg text-xs font-black mt-2 disabled:opacity-50 hover:bg-blue-800 transition-colors">Confirm booking</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const AIV1 = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi! I'm Aria, AI assistant for Peak Performance Co. I can answer questions, help you book a consultation, or connect you with our team. How can I help?" }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const replies: Record<string, string> = {
    price: "Our plans start from $349/month. There's also a 14-day free trial — no credit card needed. Want me to send you the full comparison?",
    pricing: "Our plans start from $349/month. There's also a 14-day free trial — no credit card needed. Want me to send you the full comparison?",
    cost: "Plans start from $349/month. Good news — there's a free trial so you can test it first. Want details?",
    book: "I'd love to help you book a call! Our team is available Mon–Fri, 9am–5pm AEST. Could I grab your name and email?",
    demo: "Our live demo takes about 15 minutes. I can check availability right now — when works best for you?",
    hello: "Hey there! Happy to help. Ask me about pricing, features, a demo, or anything else about us.",
    hi: "Hey there! Ask me about pricing, features, booking a demo, or anything else you'd like to know.",
    features: "We offer goal tracking, AI-powered coaching insights, team dashboards, Slack integration, and analytics. Which interests you most?",
    trial: "Yes — 14-day free trial, no credit card required. Full feature access. Want me to set that up?",
  };

  const send = () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    const key = Object.keys(replies).find(k => input.toLowerCase().includes(k));
    const botText = key ? replies[key] : "Great question! Let me get our team to follow up. Can I grab your email so they can reach out within a few hours?";
    setMessages(m => [...m, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMessages(m => [...m, { role: 'bot', text: botText }]);
      setTyping(false);
      setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    }, 900);
  };

  return (
    <div className="bg-white font-sans text-[14px]">
      <div className="bg-indigo-600 px-5 py-3 flex items-center gap-3">
        <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-indigo-600 font-black text-xs">A</div>
        <div><p className="text-white font-black text-sm">Aria — AI Assistant</p><p className="text-indigo-300 text-[10px]">Peak Performance Co.</p></div>
        <div className="ml-auto flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /><span className="text-green-400 text-[10px] font-bold">Online</span></div>
      </div>
      <div className="h-64 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
            {m.role === 'bot' && <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center text-white text-[8px] font-black mt-0.5 shrink-0">A</div>}
            <div className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-sm' : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-tl-sm'}`}>{m.text}</div>
          </div>
        ))}
        {typing && (
          <div className="flex gap-2">
            <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center text-white text-[8px] font-black mt-0.5 shrink-0">A</div>
            <div className="bg-white shadow-sm border border-gray-100 rounded-2xl rounded-tl-sm px-3.5 py-2.5 flex gap-1 items-center">
              {[0,1,2].map(i => <div key={i} className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: `${i*0.15}s` }} />)}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>
      <div className="px-4 py-2 flex gap-2 flex-wrap bg-white border-t border-gray-100">
        {['Pricing?','Book a demo','Free trial?'].map(s => (
          <button key={s} onClick={() => setInput(s)} className="text-[10px] font-bold text-indigo-600 border border-indigo-200 px-2.5 py-1 rounded-full hover:bg-indigo-50 transition-colors">{s}</button>
        ))}
      </div>
      <div className="px-4 py-3 flex gap-2 bg-white border-t border-gray-100">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Type a message..." className="flex-1 px-3.5 py-2 rounded-full border border-gray-200 text-xs outline-none focus:border-indigo-300 transition-colors" />
        <button onClick={send} className="bg-indigo-600 text-white px-4 py-2 rounded-full text-[11px] font-black hover:bg-indigo-700 transition-colors">Send</button>
      </div>
      <p className="text-center text-[10px] text-gray-400 py-2.5 border-t border-gray-100">Powered by Claude AI · Built by Oceanalt</p>
    </div>
  );
};

// ─── Café V2 — Lumière Bakery (warm cream / terracotta) ────────────
const CafeV2 = () => {
  const [order, setOrder] = useState<{ name: string; price: number; qty: number }[]>([]);
  const [ordered, setOrdered] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const items = [
    { name: 'Sourdough Loaf', price: 9, img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&auto=format&fit=crop&q=80' },
    { name: 'Pain au Chocolat', price: 6, img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&auto=format&fit=crop&q=80' },
    { name: 'Almond Croissant', price: 7, img: 'https://images.unsplash.com/photo-1623334044303-241021148842?w=300&auto=format&fit=crop&q=80' },
    { name: 'Lemon Tart', price: 8, img: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=300&auto=format&fit=crop&q=80' },
  ];
  const add = (n: string, p: number) => setOrder(o => {
    const f = o.find(x => x.name === n);
    return f ? o.map(x => x.name === n ? { ...x, qty: x.qty + 1 } : x) : [...o, { name: n, price: p, qty: 1 }];
  });
  const total = order.reduce((s, x) => s + x.price * x.qty, 0);
  const qty = order.reduce((s, x) => s + x.qty, 0);
  return (
    <div className="relative bg-[#fdf7ee] text-[#3b2a1a] font-sans text-[14px]">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-[#3b2a1a]/10">
        <div className="font-serif italic text-xl tracking-tight">Lumière</div>
        <div className="flex gap-5 text-[11px] uppercase tracking-widest">
          <button onClick={() => menuRef.current?.scrollIntoView({ behavior: 'smooth' })} className="text-[#3b2a1a]/60 hover:text-[#3b2a1a]">Pastries</button>
          <span className="text-[#3b2a1a]/60">Events</span>
          <span className="text-[#3b2a1a]/60">Journal</span>
        </div>
        <button className="bg-[#c8573d] text-white px-4 py-1.5 rounded-none text-[10px] font-black uppercase tracking-widest">Pre-order</button>
      </nav>
      <div className="grid grid-cols-2 min-h-[220px]">
        <div className="p-8 flex flex-col justify-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#c8573d] font-black mb-3">Est. Paris · 2011</p>
          <h1 className="font-serif italic text-4xl leading-tight mb-3">Fresh from<br/>our ovens,<br/>every morning.</h1>
          <p className="text-xs text-[#3b2a1a]/60 leading-relaxed mb-4 max-w-xs">Traditional French pastries, slow-fermented sourdough, and single-origin coffee.</p>
          <button onClick={() => menuRef.current?.scrollIntoView({ behavior: 'smooth' })} className="bg-[#3b2a1a] text-[#fdf7ee] px-5 py-2 text-[10px] font-black uppercase tracking-widest w-fit">Order ahead →</button>
        </div>
        <div className="overflow-hidden"><img src="https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=500&auto=format&fit=crop&q=80" className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="bakery" /></div>
      </div>
      <div ref={menuRef} className="px-6 py-6 scroll-mt-16">
        <h2 className="font-serif italic text-2xl mb-4">The Counter</h2>
        <div className="grid grid-cols-2 gap-3">
          {items.map(it => (
            <div key={it.name} className="flex gap-3 p-3 bg-white/60 border border-[#3b2a1a]/10">
              <img src={it.img} className="w-16 h-16 object-cover" referrerPolicy="no-referrer" alt={it.name} />
              <div className="flex-1">
                <p className="font-serif italic text-sm">{it.name}</p>
                <p className="text-xs text-[#3b2a1a]/50 mb-1.5">${it.price}.00</p>
                <button onClick={() => add(it.name, it.price)} className="text-[10px] uppercase tracking-widest font-black text-[#c8573d] hover:underline">+ Add</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="px-6 py-8 bg-white/40 border-t border-[#3b2a1a]/10">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#c8573d] font-black mb-4">Notes from our guests</p>
        <div className="grid grid-cols-3 gap-4">
          {[
            { q: '"The pain au chocolat is the closest thing to Paris I\'ve found in this city."', by: 'Margot · Surry Hills' },
            { q: '"Genuinely the best sourdough I\'ve had. I drive 40min for this."', by: 'Nikhil · Bondi' },
            { q: '"A tiny bakery that treats coffee and pastry with equal care."', by: 'Sophie · Newtown' },
          ].map(r => (
            <div key={r.by} className="text-xs leading-relaxed">
              <p className="font-serif italic text-[#3b2a1a] mb-1.5">{r.q}</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#3b2a1a]/50">{r.by}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="px-6 py-8 grid grid-cols-3 gap-6 bg-[#3b2a1a] text-[#fdf7ee]">
        <div>
          <p className="font-serif italic text-xl mb-1">Lumière</p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#fdf7ee]/60 mb-3">Boulangerie · Est. 2011</p>
          <p className="text-[11px] text-[#fdf7ee]/70 leading-relaxed">128 Norton St, Leichhardt<br/>Sydney NSW 2040</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#c8573d] font-black mb-2">Hours</p>
          <ul className="space-y-0.5 text-[11px] text-[#fdf7ee]/70">
            <li>Mon–Fri · 6:30am – 3:00pm</li>
            <li>Sat · 7:00am – 4:00pm</li>
            <li>Sun · 7:30am – 2:00pm</li>
          </ul>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#c8573d] font-black mb-2">Journal</p>
          <p className="text-[11px] text-[#fdf7ee]/70 mb-2 leading-relaxed">Seasonal recipes and bakery stories, monthly.</p>
          <div className="flex gap-1.5">
            <input placeholder="you@email.com" className="flex-1 bg-transparent border border-[#fdf7ee]/30 px-2 py-1.5 text-[11px] placeholder:text-[#fdf7ee]/40 outline-none" />
            <button className="bg-[#c8573d] px-3 text-[10px] font-black uppercase tracking-widest">Join</button>
          </div>
        </div>
      </div>
      <div className="px-6 py-3 bg-[#2b1d10] text-[#fdf7ee]/40 text-[10px] uppercase tracking-[0.3em] flex justify-between">
        <span>© 2025 Lumière Boulangerie</span>
        <span>Instagram · @lumiere.syd</span>
      </div>
      {qty > 0 && !ordered && (
        <div className="sticky bottom-0 bg-[#3b2a1a] text-[#fdf7ee] px-6 py-3 flex justify-between items-center">
          <div><p className="text-[10px] uppercase tracking-widest opacity-60">{qty} items</p><p className="font-serif italic text-lg">${total}.00</p></div>
          <button onClick={() => setOrdered(true)} className="bg-[#c8573d] px-5 py-2 text-[10px] font-black uppercase tracking-widest">Place order</button>
        </div>
      )}
      {ordered && (
        <div className="absolute inset-0 z-50 bg-[#3b2a1a]/70 flex items-center justify-center p-6" onClick={() => { setOrdered(false); setOrder([]); }}>
          <div className="bg-[#fdf7ee] p-6 max-w-xs text-center" onClick={e => e.stopPropagation()}>
            <p className="font-serif italic text-2xl mb-2">Merci!</p>
            <p className="text-xs text-[#3b2a1a]/60 mb-4">Your order is being prepared. Ready for pickup in 15 minutes.</p>
            <button onClick={() => { setOrdered(false); setOrder([]); }} className="bg-[#3b2a1a] text-[#fdf7ee] px-5 py-2 text-[10px] font-black uppercase tracking-widest">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Café V3 — Kindred Kitchen (dark moody restaurant) ────────────
const CafeV3 = () => {
  const [booking, setBooking] = useState(false);
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ date: '', time: '7:00pm', guests: 2, name: '', email: '' });
  return (
    <div className="relative bg-[#0f0f0d] text-[#e8e4d9] font-sans text-[14px]">
      <nav className="flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.4em]"><span className="text-[#b5985a]">Menu</span><span className="text-[#e8e4d9]/50">Wine</span><span className="text-[#e8e4d9]/50">About</span></div>
        <div className="font-serif italic text-2xl tracking-tight text-[#b5985a]">KINDRED</div>
        <button onClick={() => { setBooking(true); setStep(1); }} className="border border-[#b5985a] text-[#b5985a] px-5 py-1.5 text-[10px] uppercase tracking-[0.3em] hover:bg-[#b5985a] hover:text-black transition-colors">Reserve</button>
      </nav>
      <div className="relative h-64 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" alt="restaurant" />
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#b5985a] mb-3">Seasonal · Tasting Menu</p>
          <h1 className="font-serif italic text-5xl text-center">A table<br/>amongst friends.</h1>
        </div>
      </div>
      <div className="px-8 py-10">
        <p className="text-[10px] uppercase tracking-[0.4em] text-[#b5985a] mb-3">Tonight's Service</p>
        <div className="space-y-5 mb-8">
          {[
            ['FIRST', 'Smoked ocean trout, yuzu, native pepperberry'],
            ['SECOND', 'Hand-cut pappardelle, slow-braised Wagyu cheek'],
            ['MAIN', 'Roast Berkshire pork, burnt apple, fennel'],
            ['DESSERT', 'Olive oil cake, crème fraîche, honeycomb'],
          ].map(([k, v]) => (
            <div key={k} className="flex gap-6 border-b border-[#e8e4d9]/10 pb-4">
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#b5985a] w-20 shrink-0 mt-0.5">{k}</span>
              <p className="font-serif italic text-base">{v}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="font-serif italic text-2xl mb-1">$145 per guest</p>
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#e8e4d9]/40 mb-4">Six courses · Wine pairing +$95</p>
          <button onClick={() => { setBooking(true); setStep(1); }} className="border border-[#b5985a] text-[#b5985a] px-8 py-3 text-[10px] uppercase tracking-[0.4em] hover:bg-[#b5985a] hover:text-black transition-colors">Reserve a table</button>
        </div>
      </div>
      <div className="px-8 py-10 border-t border-[#e8e4d9]/10">
        <p className="text-[10px] uppercase tracking-[0.4em] text-[#b5985a] mb-4">Noted In</p>
        <div className="flex flex-wrap gap-x-8 gap-y-3 font-serif italic text-base text-[#e8e4d9]/60 mb-6">
          <span>The Sydney Morning Herald</span>
          <span>Broadsheet</span>
          <span>Gourmet Traveller</span>
          <span>Time Out</span>
        </div>
        <div className="grid grid-cols-2 gap-8 mt-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#b5985a] mb-2">The Room</p>
            <p className="text-[12px] text-[#e8e4d9]/70 leading-relaxed font-serif italic">Twenty-four seats. Open kitchen. One service at 7pm, Wednesday through Saturday. An intimate space where each plate is finished at the pass.</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#b5985a] mb-2">Private Events</p>
            <p className="text-[12px] text-[#e8e4d9]/70 leading-relaxed font-serif italic">The full room for parties of 16 to 24, bespoke menus crafted with the chef. Enquiries to <span className="text-[#b5985a] underline">events@kindred.com.au</span></p>
          </div>
        </div>
      </div>
      <div className="px-8 py-10 border-t border-[#e8e4d9]/10 grid grid-cols-3 gap-6">
        <div>
          <p className="font-serif italic text-2xl text-[#b5985a] mb-1">KINDRED</p>
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#e8e4d9]/40">Est. 2018 · Surry Hills</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#b5985a] mb-2">Find Us</p>
          <p className="text-[11px] text-[#e8e4d9]/60 leading-relaxed">412 Crown Street<br/>Surry Hills NSW 2010<br/>(02) 9338 1122</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#b5985a] mb-2">Service</p>
          <p className="text-[11px] text-[#e8e4d9]/60 leading-relaxed">Wed–Sat · One seating, 7pm<br/>Closed Sun–Tue</p>
        </div>
      </div>
      <div className="px-8 py-3 border-t border-[#e8e4d9]/10 text-[10px] uppercase tracking-[0.4em] text-[#e8e4d9]/30 flex justify-between">
        <span>© 2025 Kindred Kitchen</span>
        <span>Instagram · @kindred.kitchen</span>
      </div>
      {booking && (
        <div className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center p-6" onClick={() => setBooking(false)}>
          <div className="bg-[#0f0f0d] border border-[#b5985a]/40 p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
            {step === 3 ? (
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-[0.4em] text-[#b5985a] mb-2">Confirmed</p>
                <p className="font-serif italic text-2xl mb-2">À bientôt.</p>
                <p className="text-xs text-[#e8e4d9]/50 mb-4">{data.name}, we've reserved a table for {data.guests} on {data.date} at {data.time}.</p>
                <button onClick={() => setBooking(false)} className="border border-[#b5985a] text-[#b5985a] px-6 py-2 text-[10px] uppercase tracking-[0.4em]">Close</button>
              </div>
            ) : step === 1 ? (
              <>
                <p className="text-[10px] uppercase tracking-[0.4em] text-[#b5985a] mb-3">Step 1 of 2 · Select</p>
                <div className="space-y-3 mb-5">
                  <input type="date" value={data.date} onChange={e => setData({...data, date: e.target.value})} className="w-full bg-transparent border-b border-[#e8e4d9]/20 py-2 text-sm outline-none focus:border-[#b5985a]" />
                  <div className="grid grid-cols-2 gap-3">
                    <select value={data.time} onChange={e => setData({...data, time: e.target.value})} className="bg-transparent border-b border-[#e8e4d9]/20 py-2 text-sm outline-none focus:border-[#b5985a]">
                      {['6:00pm','6:30pm','7:00pm','7:30pm','8:00pm','8:30pm'].map(t => <option key={t} className="bg-[#0f0f0d]">{t}</option>)}
                    </select>
                    <select value={data.guests} onChange={e => setData({...data, guests: +e.target.value})} className="bg-transparent border-b border-[#e8e4d9]/20 py-2 text-sm outline-none focus:border-[#b5985a]">
                      {[2,3,4,5,6,8].map(n => <option key={n} value={n} className="bg-[#0f0f0d]">{n} guests</option>)}
                    </select>
                  </div>
                </div>
                <button onClick={() => data.date && setStep(2)} className="w-full border border-[#b5985a] text-[#b5985a] py-2.5 text-[10px] uppercase tracking-[0.4em] hover:bg-[#b5985a] hover:text-black transition-colors">Continue →</button>
              </>
            ) : (
              <>
                <p className="text-[10px] uppercase tracking-[0.4em] text-[#b5985a] mb-3">Step 2 of 2 · Details</p>
                <div className="space-y-3 mb-5">
                  <input value={data.name} onChange={e => setData({...data, name: e.target.value})} placeholder="Name" className="w-full bg-transparent border-b border-[#e8e4d9]/20 py-2 text-sm outline-none focus:border-[#b5985a] placeholder:text-[#e8e4d9]/30" />
                  <input value={data.email} onChange={e => setData({...data, email: e.target.value})} placeholder="Email" type="email" className="w-full bg-transparent border-b border-[#e8e4d9]/20 py-2 text-sm outline-none focus:border-[#b5985a] placeholder:text-[#e8e4d9]/30" />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setStep(1)} className="flex-1 border border-[#e8e4d9]/20 text-[#e8e4d9]/60 py-2.5 text-[10px] uppercase tracking-[0.4em]">Back</button>
                  <button onClick={() => data.name && data.email && setStep(3)} className="flex-1 border border-[#b5985a] text-[#b5985a] py-2.5 text-[10px] uppercase tracking-[0.4em] hover:bg-[#b5985a] hover:text-black transition-colors">Confirm</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Tradie V2 — Ironbark Plumbing ────────────
const TradieV2 = () => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', issue: 'Blocked drain', urgent: false });
  return (
    <div className="relative bg-white text-slate-900 font-sans text-[14px]">
      <div className="bg-blue-600 text-white text-center py-2 text-xs font-bold">💧 Same-day service · Fixed prices · No call-out fee</div>
      <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm">IB</div>
          <div><p className="font-black text-sm">IRONBARK PLUMBING</p><p className="text-[10px] text-slate-400">Master Plumbers Lic. 78234</p></div>
        </div>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-md text-xs font-black hover:bg-blue-700 transition-colors">📞 Call Now</button>
      </nav>
      <div className="grid grid-cols-2 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="p-8">
          <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2">Sydney-wide · 45 min response</p>
          <h1 className="text-3xl font-black leading-tight mb-2">Blocked drain?<br/>We're on it.</h1>
          <p className="text-xs text-slate-500 mb-4">From $89 fixed price. No surprises. Hot water, taps, drains, emergencies — we handle it all.</p>
          <div className="flex gap-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-xs font-black">Book online</button>
            <button className="border-2 border-slate-900 text-slate-900 px-4 py-2 rounded-md text-xs font-black">View services</button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 p-6">
          {[['$89','Call-out'],['45min','Response'],['4.9★','450+ reviews'],['24/7','Available']].map(([v,l]) => (
            <div key={l} className="p-3 bg-white rounded-md shadow-sm border border-slate-100 text-center">
              <p className="text-lg font-black text-blue-600">{v}</p>
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{l}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="px-6 py-6 grid grid-cols-4 gap-2">
        {[['🚿','Blocked drains'],['🔥','Hot water'],['🚰','Leaking taps'],['🚽','Toilets']].map(([i,t]) => (
          <div key={t} className="p-3 rounded-md border border-slate-100 text-center hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-all">
            <div className="text-xl mb-1">{i}</div>
            <p className="text-[11px] font-bold">{t}</p>
          </div>
        ))}
      </div>
      <div className="px-6 py-6 bg-slate-50">
        <h3 className="font-black text-sm uppercase mb-3">Book a plumber</h3>
        {sent ? (
          <div className="p-4 bg-green-50 border border-green-200 rounded-md text-center">
            <p className="text-green-700 font-black text-sm">✓ Booking confirmed — #IB-{Math.floor(Math.random()*900+100)}</p>
            <p className="text-xs text-green-600 mt-1">A plumber will call {form.phone} within 15 minutes.</p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Name" className="px-3 py-2 rounded-md border border-slate-200 text-xs outline-none focus:border-blue-600" />
              <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="Phone" className="px-3 py-2 rounded-md border border-slate-200 text-xs outline-none focus:border-blue-600" />
            </div>
            <select value={form.issue} onChange={e => setForm({...form, issue: e.target.value})} className="w-full px-3 py-2 rounded-md border border-slate-200 text-xs outline-none focus:border-blue-600">
              {['Blocked drain','Leaking tap','Hot water issue','Toilet repair','Other'].map(o => <option key={o}>{o}</option>)}
            </select>
            <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={form.urgent} onChange={e => setForm({...form, urgent: e.target.checked})} /> Urgent — need someone today</label>
            <button onClick={() => form.name && form.phone && setSent(true)} className="w-full bg-blue-600 text-white py-2.5 rounded-md font-black text-xs hover:bg-blue-700 transition-colors">Request plumber →</button>
          </div>
        )}
      </div>
      <div className="px-6 py-6 border-t border-slate-100">
        <h3 className="font-black text-sm uppercase mb-4">What customers say</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { q: 'Fixed a hot water emergency at 10pm on a Sunday. Fair price, no surprises.', by: 'Chris M · Chatswood', rating: 5 },
            { q: 'Honest quote, arrived on time, left the place cleaner than they found it.', by: 'Priya S · Inner West', rating: 5 },
            { q: 'Great communication — the SMS updates meant I could stay at work.', by: 'Tom W · Eastern Suburbs', rating: 5 },
          ].map(r => (
            <div key={r.by} className="p-3 bg-slate-50 rounded-md">
              <div className="text-yellow-500 text-xs mb-1">{'★'.repeat(r.rating)}</div>
              <p className="text-[11px] text-slate-700 leading-relaxed mb-2">"{r.q}"</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{r.by}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="px-6 py-6 bg-slate-50 border-t border-slate-100">
        <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-3">Suburbs we cover</p>
        <div className="flex flex-wrap gap-1.5">
          {['Surry Hills','Paddington','Bondi','Coogee','Randwick','Waverley','Alexandria','Redfern','Newtown','Marrickville','Leichhardt','Balmain','Mosman','Neutral Bay','Chatswood','North Sydney'].map(s => (
            <span key={s} className="text-[10px] px-2 py-0.5 bg-white border border-slate-200 rounded">{s}</span>
          ))}
        </div>
      </div>
      <footer className="bg-slate-900 text-white px-6 py-8 grid grid-cols-4 gap-5">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-xs">IB</div>
            <div><p className="font-black text-xs">IRONBARK PLUMBING</p><p className="text-[9px] text-slate-400 uppercase tracking-widest">Master Plumbers Lic. 78234</p></div>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed max-w-xs">Family-owned plumbers serving Sydney since 2003. $20M public liability. All work guaranteed 12 months.</p>
          <div className="flex gap-1.5 mt-3">
            {['Master Plumbers NSW','Plumbing License 78234','$20M Insured','Gas Compliant'].map(b => (
              <span key={b} className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 bg-blue-900/40 border border-blue-400/30 text-blue-200 rounded">{b}</span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-blue-300 mb-2">Services</p>
          <ul className="space-y-1 text-[11px] text-slate-300">
            <li>Emergency plumbing</li>
            <li>Hot water</li>
            <li>Blocked drains</li>
            <li>Gas fitting</li>
            <li>Renovations</li>
          </ul>
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-blue-300 mb-2">Contact</p>
          <p className="text-[11px] text-slate-300">(02) 8006 4477</p>
          <p className="text-[11px] text-slate-300">hello@ironbark.com.au</p>
          <p className="text-[11px] text-slate-400 mt-2">24/7 emergency line</p>
        </div>
        <div className="col-span-4 pt-4 mt-2 border-t border-slate-800 text-[10px] text-slate-500 uppercase tracking-widest flex justify-between">
          <span>© 2025 Ironbark Plumbing Pty Ltd · ABN 84 223 451 009</span>
          <span>Privacy · Terms</span>
        </div>
      </footer>
    </div>
  );
};

// ─── Tradie V3 — Hammer & Co Carpentry ────────────
const TradieV3 = () => {
  const [project, setProject] = useState<any>(null);
  const projects = [
    { title: 'Custom Kitchen · Mosman', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&auto=format&fit=crop&q=80', desc: 'Full custom oak kitchen with integrated appliances. 4-week build.', budget: '$28,000' },
    { title: 'Deck Build · Coogee', img: 'https://images.unsplash.com/photo-1560185008-a33f5c1c5bbb?w=500&auto=format&fit=crop&q=80', desc: 'Merbau hardwood deck with glass balustrade. 10 days.', budget: '$12,400' },
    { title: 'Walk-in Robe · Paddo', img: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=500&auto=format&fit=crop&q=80', desc: 'Built-in oak wardrobe with soft-close. 1 week.', budget: '$8,900' },
    { title: 'Barn Conversion · Bowral', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&auto=format&fit=crop&q=80', desc: 'Full timber-frame barn to studio conversion. 8 weeks.', budget: '$62,000' },
  ];
  return (
    <div className="relative bg-stone-50 text-stone-900 font-sans text-[14px]">
      <nav className="flex items-center justify-between px-8 py-5 bg-stone-900 text-stone-50">
        <div className="flex items-center gap-3">
          <Hammer className="w-5 h-5" />
          <div className="font-serif text-lg tracking-wide">HAMMER & CO</div>
        </div>
        <div className="flex gap-6 text-[11px] uppercase tracking-widest"><span className="hover:text-amber-400 cursor-pointer">Work</span><span className="hover:text-amber-400 cursor-pointer">Process</span><span className="hover:text-amber-400 cursor-pointer">Contact</span></div>
        <button className="bg-amber-400 text-stone-900 px-5 py-2 text-[11px] font-black uppercase tracking-widest">Start Project</button>
      </nav>
      <div className="relative h-56 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&auto=format&fit=crop&q=80" className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="carpentry" />
        <div className="absolute inset-0 bg-stone-900/60 flex flex-col items-center justify-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-amber-400 mb-3">Master carpenters · Est. 2008</p>
          <h1 className="font-serif text-4xl text-stone-50 text-center">Craft you can feel.</h1>
        </div>
      </div>
      <div className="px-6 py-8">
        <div className="flex items-end justify-between mb-5">
          <h2 className="font-serif text-2xl">Recent builds</h2>
          <p className="text-[10px] uppercase tracking-widest text-stone-500">Click to view →</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {projects.map(p => (
            <button key={p.title} onClick={() => setProject(p)} className="group text-left">
              <div className="aspect-[4/3] overflow-hidden mb-2">
                <img src={p.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" alt={p.title} />
              </div>
              <p className="font-serif text-sm">{p.title}</p>
              <p className="text-[10px] uppercase tracking-widest text-amber-700">{p.budget}</p>
            </button>
          ))}
        </div>
      </div>
      <div className="px-6 py-8 bg-stone-900 text-stone-50">
        <div className="grid grid-cols-3 gap-5 mb-6">
          {[
            { n: 'Lamington Reno', by: 'Anna B · Coogee', q: 'The finish is extraordinary. Small family business that shows up when they say they will.' },
            { n: 'Barn Conversion', by: 'Owen T · Bowral', q: 'Treated the property like it was their own. Budget was within 3% of quote.' },
            { n: 'Walk-in Robe', by: 'Hana K · Paddington', q: 'Oak joinery is flawless — tight reveals, silent drawers. Worth every dollar.' },
          ].map(r => (
            <div key={r.by} className="border-l-2 border-amber-400 pl-3">
              <p className="font-serif text-sm leading-snug mb-2 text-stone-100">"{r.q}"</p>
              <p className="text-[10px] uppercase tracking-widest text-amber-400 font-bold">{r.n}</p>
              <p className="text-[10px] uppercase tracking-widest text-stone-500">{r.by}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="px-6 py-8 grid grid-cols-3 gap-4">
        {[
          { h: 'Visit', b: '22 Railway Pde\nPaddington NSW 2021' },
          { h: 'Call', b: '(02) 7200 4189\nMon–Fri · 7am–5pm' },
          { h: 'Email', b: 'studio@hammerco.au\nQuote reply · 48h' },
        ].map(c => (
          <div key={c.h}>
            <p className="text-[10px] uppercase tracking-[0.3em] text-amber-700 font-black mb-2">{c.h}</p>
            <p className="text-xs text-stone-600 leading-relaxed whitespace-pre-line">{c.b}</p>
          </div>
        ))}
      </div>
      <div className="bg-stone-900 text-stone-500 px-6 py-4 text-[10px] uppercase tracking-[0.3em] flex justify-between">
        <span>© 2025 Hammer & Co Carpentry</span>
        <span>Lic. 287156C · ABN 19 812 445 762</span>
      </div>
      {project && (
        <div className="absolute inset-0 z-50 bg-stone-900/80 flex items-center justify-center p-6" onClick={() => setProject(null)}>
          <div className="bg-stone-50 max-w-md w-full overflow-hidden" onClick={e => e.stopPropagation()}>
            <img src={project.img} className="w-full h-48 object-cover" referrerPolicy="no-referrer" alt={project.title} />
            <div className="p-5">
              <p className="text-[10px] uppercase tracking-widest text-amber-700 mb-1">Case Study</p>
              <h3 className="font-serif text-xl mb-2">{project.title}</h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-3">{project.desc}</p>
              <div className="flex justify-between items-center pt-3 border-t border-stone-200">
                <span className="text-[11px] text-stone-500">Budget: <strong className="text-stone-900">{project.budget}</strong></span>
                <button onClick={() => setProject(null)} className="bg-stone-900 text-amber-400 px-4 py-2 text-[10px] font-black uppercase tracking-widest">Get a similar quote</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Coach V2 — Dr. Alex Voss Therapy (soft lavender) ────────────
const CoachV2 = () => {
  const [booking, setBooking] = useState(false);
  const [booked, setBooked] = useState(false);
  const [slot, setSlot] = useState<string | null>(null);
  const slots = ['Mon 10:00am','Mon 2:00pm','Tue 11:00am','Tue 4:00pm','Wed 9:00am','Wed 3:30pm'];
  return (
    <div className="relative bg-[#f7f4fa] text-[#2c2440] font-sans text-[14px]">
      <nav className="flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur border-b border-[#2c2440]/5">
        <div className="font-serif italic text-lg">Dr. Alex Voss</div>
        <div className="flex gap-5 text-[11px]"><span className="text-[#2c2440]/60">Approach</span><span className="text-[#2c2440]/60">Specialties</span><span className="text-[#2c2440]/60">FAQ</span></div>
        <button onClick={() => setBooking(true)} className="bg-[#6b5b95] text-white px-4 py-2 rounded-full text-xs font-bold">Book Session</button>
      </nav>
      <div className="p-8 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#6b5b95] font-bold mb-3">Clinical Psychologist · APS Registered</p>
        <h1 className="font-serif italic text-3xl leading-tight mb-3">A calm space for<br/>your harder questions.</h1>
        <p className="text-xs text-[#2c2440]/60 max-w-sm mx-auto mb-5">I work with adults navigating anxiety, burnout, relationships, and life transitions. Confidential, compassionate, evidence-based.</p>
        <button onClick={() => setBooking(true)} className="bg-[#6b5b95] text-white px-6 py-2.5 rounded-full text-xs font-bold">Book a first session</button>
      </div>
      <div className="px-6 py-6 bg-white">
        <h2 className="font-serif italic text-xl mb-4 text-center">What I work with</h2>
        <div className="grid grid-cols-2 gap-2">
          {['Anxiety & worry','Burnout & overwhelm','Relationship patterns','Grief & loss','Life transitions','Work & identity'].map(s => (
            <div key={s} className="px-3 py-2 bg-[#f7f4fa] rounded-lg text-xs text-center">{s}</div>
          ))}
        </div>
      </div>
      <div className="px-6 py-6 text-center">
        <p className="font-serif italic text-lg mb-1">50-minute session · $220</p>
        <p className="text-[11px] text-[#2c2440]/50">Medicare rebate available with GP referral</p>
      </div>
      <div className="px-6 py-6 bg-white">
        <h2 className="font-serif italic text-xl mb-4 text-center">Questions clients often have</h2>
        <div className="space-y-2 max-w-md mx-auto">
          {[
            { q: 'How do sessions actually work?', a: 'We meet weekly or fortnightly for 50 minutes, in person or via secure video. I\'ll help you notice patterns and build practical tools that fit your life.' },
            { q: 'Do I need a Medicare referral?', a: 'Not to start. If you\'d like the rebate (~$141 per session under a Mental Health Care Plan), I can walk you through how to get one from your GP.' },
            { q: 'How long does therapy usually take?', a: 'Most people see real change between 8 and 16 sessions. We review progress every 4 sessions so you\'re never in it longer than you need.' },
          ].map(f => (
            <details key={f.q} className="bg-[#f7f4fa] rounded-lg px-4 py-3 text-xs">
              <summary className="cursor-pointer font-serif italic text-sm">{f.q}</summary>
              <p className="mt-2 text-[#2c2440]/60 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
      <div className="px-6 py-6 bg-[#ede6f5]">
        <h2 className="font-serif italic text-xl mb-4 text-center">Training &amp; memberships</h2>
        <div className="flex flex-wrap justify-center gap-2 text-[10px] uppercase tracking-widest">
          {['PhD Clinical Psychology (UNSW)','APS Registered','Medicare Provider','AHPRA PSY0001924713','EMDR Trained'].map(b => (
            <span key={b} className="px-3 py-1 bg-white border border-[#2c2440]/10 rounded-full text-[#2c2440]/70 font-bold">{b}</span>
          ))}
        </div>
      </div>
      <footer className="px-6 py-8 bg-[#2c2440] text-white grid grid-cols-3 gap-6">
        <div>
          <p className="font-serif italic text-lg mb-1">Dr. Alex Voss</p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-3">Clinical Psychology Practice</p>
          <p className="text-[11px] text-white/60 leading-relaxed">Suite 4, 120 Enmore Rd<br/>Enmore NSW 2042</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#b0a0d6] font-bold mb-2">Confidential Contact</p>
          <p className="text-[11px] text-white/60">reception@alexvoss.com.au</p>
          <p className="text-[11px] text-white/60">(02) 9550 8811</p>
          <p className="text-[11px] text-white/40 mt-2">Crisis? Lifeline 13 11 14</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#b0a0d6] font-bold mb-2">Practice Hours</p>
          <ul className="space-y-0.5 text-[11px] text-white/60">
            <li>Mon–Thu · 9am – 6pm</li>
            <li>Fri · 9am – 1pm</li>
            <li>Telehealth available</li>
          </ul>
        </div>
      </footer>
      <div className="bg-[#1e1830] text-white/40 px-6 py-3 text-[10px] uppercase tracking-[0.3em] flex justify-between">
        <span>© 2025 Alex Voss Psychology Pty Ltd</span>
        <span>Privacy · Confidentiality Policy</span>
      </div>
      {booking && (
        <div className="absolute inset-0 z-50 bg-[#2c2440]/50 backdrop-blur-sm flex items-center justify-center p-6" onClick={() => setBooking(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
            {booked ? (
              <div className="text-center">
                <div className="w-12 h-12 bg-[#f7f4fa] rounded-full flex items-center justify-center mx-auto mb-3"><span className="text-[#6b5b95] text-xl">✓</span></div>
                <p className="font-serif italic text-xl mb-1">You're booked in.</p>
                <p className="text-xs text-[#2c2440]/60 mb-4">See you {slot}. Confirmation sent via email with Medicare paperwork.</p>
                <button onClick={() => setBooking(false)} className="bg-[#6b5b95] text-white px-5 py-2 rounded-full text-xs font-bold w-full">Done</button>
              </div>
            ) : (
              <>
                <p className="font-serif italic text-lg mb-1">Available next week</p>
                <p className="text-[11px] text-[#2c2440]/50 mb-4">All times Sydney · AEST</p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {slots.map(s => (
                    <button key={s} onClick={() => setSlot(s)} className={`py-2 rounded-lg text-xs font-bold transition-colors ${slot === s ? 'bg-[#6b5b95] text-white' : 'bg-[#f7f4fa] text-[#2c2440] hover:bg-[#ede6f5]'}`}>{s}</button>
                  ))}
                </div>
                <button onClick={() => slot && setBooked(true)} disabled={!slot} className="w-full bg-[#6b5b95] text-white py-2.5 rounded-full text-xs font-bold disabled:opacity-40">Confirm session</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Coach V3 — Executive Edge (dark corporate) ────────────
const CoachV3 = () => {
  const [audit, setAudit] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const questions = [
    { q: 'What\'s your current role?', options: ['C-Suite', 'VP / Director', 'Senior Manager', 'Founder'] },
    { q: 'Biggest leadership challenge?', options: ['Scaling teams', 'Board dynamics', 'Personal brand', 'Work-life balance'] },
    { q: 'Investment readiness?', options: ['<$5k', '$5-15k', '$15-30k', '$30k+'] },
  ];
  const answer = (a: string) => { setAnswers([...answers, a]); setStep(step + 1); };
  return (
    <div className="relative bg-black text-white font-sans text-[14px]">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <div className="font-serif text-xl tracking-tight">EXECUTIVE<span className="text-yellow-500">·</span>EDGE</div>
        <div className="flex gap-6 text-[11px] uppercase tracking-widest"><span className="text-white/60">Clients</span><span className="text-white/60">Method</span><span className="text-white/60">Press</span></div>
        <button onClick={() => { setAudit(true); setStep(0); setAnswers([]); }} className="bg-yellow-500 text-black px-5 py-2 text-[11px] font-black uppercase tracking-widest">Free Audit</button>
      </nav>
      <div className="px-8 py-10">
        <p className="text-[10px] uppercase tracking-[0.4em] text-yellow-500 mb-3">For Fortune 500 leaders</p>
        <h1 className="font-serif text-5xl leading-tight mb-4">The edge<br/>that closes<br/>the gap.</h1>
        <p className="text-sm text-white/50 max-w-md mb-6">Strategic coaching for CEOs, VPs, and founders who need to move fast. $60k+ per engagement. Not for everyone.</p>
        <button onClick={() => { setAudit(true); setStep(0); setAnswers([]); }} className="bg-yellow-500 text-black px-6 py-3 text-[11px] font-black uppercase tracking-widest">Take the 2-min audit →</button>
      </div>
      <div className="px-8 py-8 border-t border-white/10 grid grid-cols-4 gap-4">
        {[['$2.1B','Client revenue'],['127','Leaders coached'],['98%','Retention'],['15yr','Experience']].map(([v,l]) => (
          <div key={l}>
            <p className="font-serif text-3xl text-yellow-500">{v}</p>
            <p className="text-[10px] uppercase tracking-widest text-white/40 mt-1">{l}</p>
          </div>
        ))}
      </div>
      <div className="px-8 py-8 border-t border-white/10">
        <p className="text-[10px] uppercase tracking-[0.4em] text-yellow-500 mb-3">Trusted by</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-serif text-white/60">
          <span>Atlassian</span><span>·</span><span>Canva</span><span>·</span><span>Deloitte</span><span>·</span><span>Macquarie</span><span>·</span><span>NAB</span>
        </div>
      </div>
      <div className="px-8 py-10 border-t border-white/10">
        <p className="text-[10px] uppercase tracking-[0.4em] text-yellow-500 mb-6">Case Studies</p>
        <div className="grid grid-cols-2 gap-8">
          {[
            { co: 'Series C SaaS', role: 'Co-founder &amp; CEO', result: 'Reduced executive team attrition 42% → 7% over 18 months. Led $80M Series C close.' },
            { co: 'ASX-Listed Insurer', role: 'Managing Director', result: 'Navigated regulator-driven restructure. Cut board cycle time 60%. NPS +31.' },
            { co: 'Private Equity Fund', role: 'Operating Partner', result: 'Coached 4 portfolio CEOs through scale-up. 3 successful exits in 24 months.' },
            { co: 'Tech Unicorn', role: 'Chief Product Officer', result: 'Repositioned leadership narrative post-IPO. Board confidence score 9.2/10.' },
          ].map(c => (
            <div key={c.co} className="border-l-2 border-yellow-500/60 pl-4">
              <p className="text-[10px] uppercase tracking-[0.4em] text-yellow-500 mb-1">{c.co}</p>
              <p className="font-serif text-base text-white mb-2">{c.role}</p>
              <p className="text-xs text-white/60 leading-relaxed" dangerouslySetInnerHTML={{ __html: c.result }} />
            </div>
          ))}
        </div>
      </div>
      <div className="px-8 py-10 border-t border-white/10">
        <p className="text-[10px] uppercase tracking-[0.4em] text-yellow-500 mb-4">Press</p>
        <div className="grid grid-cols-3 gap-6 text-xs text-white/60 font-serif">
          <div>
            <p className="text-white/40 mb-1">Australian Financial Review</p>
            <p className="italic">"The coach the C-suite calls when stakes are terminal."</p>
          </div>
          <div>
            <p className="text-white/40 mb-1">Boss Magazine</p>
            <p className="italic">"Quietly shaping the next generation of ASX leadership."</p>
          </div>
          <div>
            <p className="text-white/40 mb-1">Harvard Business Review ANZ</p>
            <p className="italic">"A case study in strategic executive development."</p>
          </div>
        </div>
      </div>
      <footer className="px-8 py-10 border-t border-white/10 grid grid-cols-4 gap-6">
        <div className="col-span-2">
          <p className="font-serif text-xl mb-1">EXECUTIVE<span className="text-yellow-500">·</span>EDGE</p>
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-3">Strategic Coaching for Senior Leaders</p>
          <p className="text-[11px] text-white/50 leading-relaxed max-w-sm">By application only. Engagements run 6 or 12 months. Confidentiality is absolute.</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-yellow-500 mb-2">Sydney</p>
          <p className="text-[11px] text-white/50">Level 36, Governor Phillip Tower<br/>1 Farrer Place, Sydney NSW</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-yellow-500 mb-2">Contact</p>
          <p className="text-[11px] text-white/50">partners@executive-edge.com</p>
          <p className="text-[11px] text-white/50">(02) 8015 4400</p>
        </div>
      </footer>
      <div className="bg-black text-white/30 px-8 py-4 text-[10px] uppercase tracking-[0.4em] flex justify-between border-t border-white/5">
        <span>© 2025 Executive Edge Partners</span>
        <span>ABN 18 641 228 009 · LinkedIn · Insights</span>
      </div>
      {audit && (
        <div className="absolute inset-0 z-50 bg-black/90 flex items-center justify-center p-6" onClick={() => setAudit(false)}>
          <div className="bg-zinc-900 border border-yellow-500/30 p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            {step >= questions.length ? (
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-[0.4em] text-yellow-500 mb-2">Qualified</p>
                <p className="font-serif text-2xl mb-3">You're a fit.</p>
                <p className="text-xs text-white/60 mb-4">Based on your answers, we'd recommend our Signature Engagement. A partner will reach out within 24h.</p>
                <input placeholder="Your email" className="w-full bg-black border border-white/20 px-3 py-2 text-xs mb-3 outline-none focus:border-yellow-500" />
                <button onClick={() => setAudit(false)} className="w-full bg-yellow-500 text-black py-2.5 text-[11px] font-black uppercase tracking-widest">Request Call</button>
              </div>
            ) : (
              <>
                <p className="text-[10px] uppercase tracking-[0.4em] text-yellow-500 mb-2">Question {step + 1} of {questions.length}</p>
                <p className="font-serif text-xl mb-4">{questions[step].q}</p>
                <div className="space-y-2">
                  {questions[step].options.map(o => (
                    <button key={o} onClick={() => answer(o)} className="w-full text-left px-4 py-3 border border-white/10 hover:border-yellow-500 hover:bg-yellow-500/10 transition-colors text-sm">{o}</button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Retail V2 — Wildflower Studio (florist) ────────────
const RetailV2 = () => {
  const [picked, setPicked] = useState<string | null>(null);
  const [sub, setSub] = useState(false);
  const bouquets = [
    { id: 'garden',  name: 'The Garden',    price: 75,  img: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&auto=format&fit=crop&q=80' },
    { id: 'meadow',  name: 'The Meadow',    price: 95,  img: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400&auto=format&fit=crop&q=80' },
    { id: 'market',  name: "Florist's Choice", price: 55, img: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=400&auto=format&fit=crop&q=80' },
  ];
  return (
    <div className="relative bg-[#fef6f3] text-[#542b2b] font-sans text-[14px]">
      <nav className="flex items-center justify-between px-6 py-4">
        <div className="font-serif italic text-2xl">wildflower</div>
        <div className="flex gap-5 text-[11px] uppercase tracking-widest"><span>Fresh</span><span>Subscribe</span><span>Weddings</span></div>
        <button className="text-[11px] uppercase tracking-widest">🛍 0</button>
      </nav>
      <div className="grid grid-cols-2">
        <div className="p-8 flex flex-col justify-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#c4645e] mb-3">Fresh daily · Sydney delivery</p>
          <h1 className="font-serif italic text-4xl leading-tight mb-3">Flowers, but make them wild.</h1>
          <p className="text-xs text-[#542b2b]/60 mb-4">Hand-tied seasonal bouquets using local growers. Delivered before noon.</p>
          <button className="bg-[#542b2b] text-[#fef6f3] px-5 py-2.5 text-[10px] font-black uppercase tracking-widest w-fit">Shop fresh</button>
        </div>
        <div className="overflow-hidden"><img src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600&auto=format&fit=crop&q=80" className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="flowers" /></div>
      </div>
      <div className="px-6 py-6">
        <h2 className="font-serif italic text-2xl text-center mb-5">This Week's Bouquets</h2>
        <div className="grid grid-cols-3 gap-3">
          {bouquets.map(b => (
            <button key={b.id} onClick={() => setPicked(b.id)} className={`text-left group ${picked === b.id ? 'ring-2 ring-[#542b2b]' : ''} rounded-xl overflow-hidden`}>
              <img src={b.img} className="aspect-square w-full object-cover" referrerPolicy="no-referrer" alt={b.name} />
              <div className="p-2.5 bg-white">
                <p className="font-serif italic text-sm">{b.name}</p>
                <p className="text-[11px] text-[#c4645e]">${b.price} · {picked === b.id ? 'Selected ✓' : 'Choose'}</p>
              </div>
            </button>
          ))}
        </div>
        {picked && (
          <button className="mt-4 w-full bg-[#542b2b] text-[#fef6f3] py-3 text-[11px] font-black uppercase tracking-widest">Order {bouquets.find(b => b.id === picked)?.name} — ${bouquets.find(b => b.id === picked)?.price}</button>
        )}
      </div>
      <div className="px-6 py-8 bg-[#542b2b] text-[#fef6f3] text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-[#c4645e] mb-2">Weekly Subscription</p>
        <h3 className="font-serif italic text-2xl mb-2">Fresh flowers every Friday.</h3>
        <p className="text-xs text-[#fef6f3]/60 mb-4">$45/week · Cancel anytime</p>
        {sub ? (
          <p className="text-[#c4645e] font-bold">✓ You're subscribed! First delivery this Friday.</p>
        ) : (
          <div className="flex gap-2 max-w-xs mx-auto">
            <input placeholder="your@email.com" className="flex-1 bg-transparent border border-[#fef6f3]/30 px-3 py-2 text-xs outline-none focus:border-[#fef6f3]" />
            <button onClick={() => setSub(true)} className="bg-[#fef6f3] text-[#542b2b] px-4 py-2 text-[10px] font-black uppercase tracking-widest">Subscribe</button>
          </div>
        )}
      </div>
      <div className="px-6 py-8 bg-white">
        <h2 className="font-serif italic text-2xl text-center mb-5">Weddings &amp; Events</h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { t: 'Intimate Ceremonies', n: 'From $480', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=300&auto=format&fit=crop&q=80' },
            { t: 'Full Bridal Packages', n: 'From $1,800', img: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=300&auto=format&fit=crop&q=80' },
            { t: 'Corporate Events', n: 'Quote on request', img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=300&auto=format&fit=crop&q=80' },
          ].map(w => (
            <div key={w.t} className="rounded-xl overflow-hidden">
              <img src={w.img} className="aspect-[4/3] w-full object-cover" referrerPolicy="no-referrer" alt={w.t} />
              <div className="p-3 bg-[#fef6f3]">
                <p className="font-serif italic text-sm">{w.t}</p>
                <p className="text-[11px] text-[#c4645e] font-bold">{w.n}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="px-6 py-8 bg-[#fef6f3] grid grid-cols-3 gap-4">
        {[
          { q: '"My bouquet was so unexpected and so me. Everyone asked who did it."', by: 'Ruth & Sam · Eloped in Byron' },
          { q: '"A Friday delivery is genuinely the highlight of my week. Worth every dollar."', by: 'Lucinda J. · Subscriber, 14 months' },
          { q: '"The only florist I trust for corporate openings — always on time, always beautiful."', by: 'Studio Salim · Event Designer' },
        ].map(r => (
          <div key={r.by}>
            <p className="font-serif italic text-sm leading-relaxed mb-2">{r.q}</p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#c4645e]">{r.by}</p>
          </div>
        ))}
      </div>
      <footer className="px-6 py-8 bg-[#3a1d1d] text-[#fef6f3] grid grid-cols-3 gap-5">
        <div>
          <p className="font-serif italic text-2xl mb-1">wildflower</p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#c4645e] mb-3">Studio · Marrickville</p>
          <p className="text-[11px] text-[#fef6f3]/60 leading-relaxed">Studio 4, The Annandale Markets<br/>Annandale NSW 2038</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#c4645e] font-black mb-2">Delivery</p>
          <p className="text-[11px] text-[#fef6f3]/60 leading-relaxed">Mon–Fri · Sydney metro<br/>Order by 11am for same-day<br/>Free over $85</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#c4645e] font-black mb-2">Say Hello</p>
          <p className="text-[11px] text-[#fef6f3]/60">hello@wildflower.studio</p>
          <p className="text-[11px] text-[#fef6f3]/60">(02) 9559 1186</p>
          <p className="text-[11px] text-[#fef6f3]/60 mt-1">@wildflower.studio</p>
        </div>
      </footer>
      <div className="bg-[#2c1515] text-[#fef6f3]/40 px-6 py-3 text-[10px] uppercase tracking-[0.3em] flex justify-between">
        <span>© 2025 Wildflower Studio</span>
        <span>Terms · Returns · Care Guide</span>
      </div>
    </div>
  );
};

// ─── Retail V3 — Vinyl shop (streetwear/music) ────────────
const RetailV3 = () => {
  const [filter, setFilter] = useState<'all'|'hiphop'|'jazz'|'electronic'>('all');
  const [cart, setCart] = useState(0);
  const [toast, setToast] = useState('');
  const records = [
    { id: 1, artist: 'Kendrick Lamar', title: 'To Pimp a Butterfly', price: 45, genre: 'hiphop', img: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=300&auto=format&fit=crop&q=80' },
    { id: 2, artist: 'Miles Davis',    title: 'Kind of Blue',         price: 38, genre: 'jazz',   img: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=300&auto=format&fit=crop&q=80' },
    { id: 3, artist: 'Four Tet',       title: 'New Energy',           price: 42, genre: 'electronic', img: 'https://images.unsplash.com/photo-1483821600393-1b2ead0351f4?w=300&auto=format&fit=crop&q=80' },
    { id: 4, artist: 'Tyler, The Creator', title: 'IGOR',             price: 48, genre: 'hiphop', img: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&auto=format&fit=crop&q=80' },
    { id: 5, artist: 'John Coltrane',  title: 'A Love Supreme',       price: 40, genre: 'jazz',   img: 'https://images.unsplash.com/photo-1482442120256-9c03866de390?w=300&auto=format&fit=crop&q=80' },
    { id: 6, artist: 'Aphex Twin',     title: 'Selected Ambient Works', price: 50, genre: 'electronic', img: 'https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=300&auto=format&fit=crop&q=80' },
  ];
  const filtered = filter === 'all' ? records : records.filter(r => r.genre === filter);
  const add = (a: string) => { setCart(c => c + 1); setToast(`${a} added to crate`); setTimeout(() => setToast(''), 1800); };
  return (
    <div className="relative bg-black text-white font-mono text-[13px]">
      <nav className="flex items-center justify-between px-5 py-4 border-b border-white/20">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-black" /></div>
          <span className="font-bold tracking-widest text-sm">WAXHAUS</span>
        </div>
        <div className="flex gap-5 text-[11px] uppercase"><span className="hover:text-yellow-400 cursor-pointer">Shop</span><span className="hover:text-yellow-400 cursor-pointer">New</span><span className="hover:text-yellow-400 cursor-pointer">Sale</span></div>
        <button className="bg-yellow-400 text-black px-4 py-1.5 text-[11px] font-bold">CRATE · {cart}</button>
      </nav>
      <div className="px-5 py-5 bg-gradient-to-br from-fuchsia-500/20 to-yellow-400/20 border-b border-white/10">
        <p className="text-[10px] uppercase tracking-widest text-yellow-400 mb-2">New this week · 42 titles</p>
        <h1 className="font-bold text-3xl leading-tight mb-1">The rarest cuts.<br/>Dropped weekly.</h1>
        <p className="text-xs text-white/50">Independent record shop · Newtown, Sydney</p>
      </div>
      <div className="px-5 py-3 flex gap-2 border-b border-white/10">
        {(['all','hiphop','jazz','electronic'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 text-[10px] uppercase tracking-widest transition-colors ${filter === f ? 'bg-yellow-400 text-black' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}>{f}</button>
        ))}
      </div>
      <div className="p-5 grid grid-cols-3 gap-3">
        {filtered.map(r => (
          <div key={r.id} className="group">
            <div className="aspect-square bg-white/5 mb-2 overflow-hidden"><img src={r.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" alt={r.title} /></div>
            <p className="text-[10px] uppercase tracking-widest text-white/50 truncate">{r.artist}</p>
            <p className="text-xs font-bold truncate">{r.title}</p>
            <div className="flex justify-between items-center mt-1">
              <span className="text-[11px] text-yellow-400">${r.price}</span>
              <button onClick={() => add(r.artist)} className="text-[10px] uppercase tracking-widest text-yellow-400 hover:underline">+ Add</button>
            </div>
          </div>
        ))}
      </div>
      <div className="px-5 py-6 border-t border-white/10">
        <p className="text-[10px] uppercase tracking-widest text-yellow-400 mb-3">Staff Picks This Week</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { by: 'Dani (owner)', pick: 'Kind of Blue — the version to own, remastered mono.', tag: 'JAZZ' },
            { by: 'Jules', pick: 'IGOR — honestly the best-sounding hip-hop pressing of 2024.', tag: 'HIP-HOP' },
          ].map(s => (
            <div key={s.by} className="bg-white/5 p-3">
              <p className="text-[10px] uppercase tracking-widest text-yellow-400 mb-1">{s.tag} · {s.by}</p>
              <p className="text-xs text-white/80 leading-relaxed">"{s.pick}"</p>
            </div>
          ))}
        </div>
      </div>
      <div className="px-5 py-6 border-t border-white/10 bg-white/5">
        <p className="text-[10px] uppercase tracking-widest text-yellow-400 mb-3">In-Store This Month</p>
        <div className="space-y-2 text-xs">
          {[
            { d: 'FRI · 02 MAY', e: 'Listening Party — Four Tet, new album', p: 'Free entry' },
            { d: 'SAT · 17 MAY', e: 'Record Store Day exclusive drops', p: 'From 9am' },
            { d: 'THU · 29 MAY', e: 'In-conversation — Sydney beatmakers', p: '$10 at door' },
          ].map(ev => (
            <div key={ev.d} className="flex justify-between border-b border-white/5 pb-2">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40">{ev.d}</p>
                <p className="font-bold">{ev.e}</p>
              </div>
              <p className="text-yellow-400 text-[11px] uppercase tracking-widest self-center">{ev.p}</p>
            </div>
          ))}
        </div>
      </div>
      <footer className="px-5 py-6 border-t border-white/10 grid grid-cols-4 gap-4">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-black" /></div>
            <span className="font-bold tracking-widest text-sm">WAXHAUS</span>
          </div>
          <p className="text-[11px] text-white/50 leading-relaxed">Independent record store since 2014. Worldwide shipping. In-store: Wed–Sun 11am–7pm.</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-yellow-400 mb-2">Shop</p>
          <ul className="space-y-0.5 text-[11px] text-white/60">
            <li>New arrivals</li>
            <li>Used &amp; rare</li>
            <li>Pre-orders</li>
            <li>Merch</li>
          </ul>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-yellow-400 mb-2">Find Us</p>
          <p className="text-[11px] text-white/60 leading-relaxed">82 Enmore Rd<br/>Newtown NSW 2042<br/>hello@waxhaus.store</p>
        </div>
      </footer>
      <div className="bg-black text-white/40 px-5 py-3 text-[10px] uppercase tracking-widest flex justify-between border-t border-white/5">
        <span>© 2025 WAXHAUS</span>
        <span>Instagram · Discogs · Newsletter</span>
      </div>
      {toast && <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-4 py-2 text-[11px] font-bold uppercase tracking-widest z-40">{toast}</div>}
    </div>
  );
};

// ─── SmallBiz V2 — Anchor Legal ────────────
const SmallBizV2 = () => {
  const [consult, setConsult] = useState(false);
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ matter: '', name: '', email: '', details: '' });
  return (
    <div className="relative bg-[#f5f1ea] text-[#1c2b3a] font-sans text-[14px]">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-[#1c2b3a]/10">
        <div><p className="font-serif italic text-xl">Anchor</p><p className="text-[9px] uppercase tracking-[0.3em] text-[#1c2b3a]/50">Legal · Est. 1989</p></div>
        <div className="flex gap-5 text-[11px]"><span>Practice Areas</span><span>Our Team</span><span>Insights</span></div>
        <button onClick={() => { setConsult(true); setStep(1); }} className="bg-[#1c2b3a] text-[#f5f1ea] px-5 py-2 text-[11px] uppercase tracking-widest">Consult</button>
      </nav>
      <div className="grid grid-cols-2 min-h-[200px]">
        <div className="p-8 flex flex-col justify-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#8b7355] mb-3">Sydney · Melbourne · Brisbane</p>
          <h1 className="font-serif italic text-3xl leading-tight mb-3">Steady counsel.<br/>Decisive outcomes.</h1>
          <p className="text-xs text-[#1c2b3a]/60 mb-4 max-w-xs">Commercial, property, and family law for businesses and private clients. Three generations of practice.</p>
          <button onClick={() => { setConsult(true); setStep(1); }} className="bg-[#1c2b3a] text-[#f5f1ea] px-5 py-2.5 text-[11px] uppercase tracking-widest w-fit">Request consult</button>
        </div>
        <div className="overflow-hidden"><img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500&auto=format&fit=crop&q=80" className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="legal" /></div>
      </div>
      <div className="px-8 py-7 grid grid-cols-4 gap-2 border-t border-[#1c2b3a]/10">
        {['Commercial','Property','Family','Wills & Estates'].map(s => (
          <div key={s} className="text-center py-3 border-r border-[#1c2b3a]/10 last:border-r-0">
            <p className="font-serif italic text-base mb-0.5">{s}</p>
            <p className="text-[9px] uppercase tracking-widest text-[#1c2b3a]/50">Learn more →</p>
          </div>
        ))}
      </div>
      <div className="px-8 py-8 border-t border-[#1c2b3a]/10 bg-white">
        <p className="text-[10px] uppercase tracking-[0.4em] text-[#8b7355] mb-4">Partners</p>
        <div className="grid grid-cols-3 gap-6">
          {[
            { n: 'Eleanor Hargrove', r: 'Managing Partner · Commercial', y: '24 years' },
            { n: 'Daniel O\'Rourke', r: 'Partner · Property &amp; Conveyancing', y: '18 years' },
            { n: 'Priscilla Chen', r: 'Partner · Family Law', y: '15 years' },
          ].map(p => (
            <div key={p.n}>
              <p className="font-serif italic text-lg mb-0.5">{p.n}</p>
              <p className="text-[11px] text-[#1c2b3a]/60 mb-0.5" dangerouslySetInnerHTML={{ __html: p.r }} />
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#8b7355]">Admitted · {p.y}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="px-8 py-8 border-t border-[#1c2b3a]/10 grid grid-cols-2 gap-8">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#8b7355] mb-3">Notable Engagements</p>
          <ul className="space-y-2 text-xs text-[#1c2b3a]/70">
            <li>· Represented ASX-200 retailer in $40M supply contract dispute</li>
            <li>· Acted for foreign investor in $18M Point Piper acquisition</li>
            <li>· Successfully defended family office in Supreme Court estate matter</li>
            <li>· Advised logistics group on cross-border merger (2024)</li>
          </ul>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#8b7355] mb-3">Press &amp; Recognition</p>
          <ul className="space-y-1 text-xs text-[#1c2b3a]/70 font-serif italic">
            <li>Doyle's Guide — Leading Sydney Commercial Firm, 2023 &amp; 2024</li>
            <li>Australian Financial Review — Top 50 Boutique Firms</li>
            <li>The Legal 500 — Tier 2, Family Law NSW</li>
          </ul>
        </div>
      </div>
      <footer className="px-8 py-10 border-t-2 border-[#1c2b3a] bg-[#1c2b3a] text-[#f5f1ea] grid grid-cols-4 gap-6">
        <div>
          <p className="font-serif italic text-2xl">Anchor</p>
          <p className="text-[9px] uppercase tracking-[0.3em] text-[#f5f1ea]/60 mb-3">Legal · Est. 1989</p>
          <p className="text-[11px] text-[#f5f1ea]/60 leading-relaxed">A third-generation practice built on discretion, accuracy, and long-term relationships.</p>
        </div>
        {[
          { h: 'Sydney', b: 'Level 22, 60 Castlereagh St\nSydney NSW 2000\n(02) 8215 0900' },
          { h: 'Melbourne', b: 'Level 9, 520 Collins St\nMelbourne VIC 3000\n(03) 8610 2200' },
          { h: 'Brisbane', b: 'Level 14, 71 Eagle St\nBrisbane QLD 4000\n(07) 3003 4800' },
        ].map(o => (
          <div key={o.h}>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#d4b87f] mb-2">{o.h}</p>
            <p className="text-[11px] text-[#f5f1ea]/60 leading-relaxed whitespace-pre-line">{o.b}</p>
          </div>
        ))}
      </footer>
      <div className="bg-[#13202b] text-[#f5f1ea]/40 px-8 py-3 text-[10px] uppercase tracking-[0.3em] flex justify-between">
        <span>Liability limited by a scheme approved under Professional Standards Legislation</span>
        <span>© 2025 Anchor Legal</span>
      </div>
      {consult && (
        <div className="absolute inset-0 z-50 bg-[#1c2b3a]/70 flex items-center justify-center p-6" onClick={() => setConsult(false)}>
          <div className="bg-[#f5f1ea] p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            {step === 3 ? (
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-[0.4em] text-[#8b7355] mb-2">Received</p>
                <p className="font-serif italic text-2xl mb-2">We'll be in touch.</p>
                <p className="text-xs text-[#1c2b3a]/60 mb-4">A partner will review your matter and respond within 24 hours to {data.email}.</p>
                <button onClick={() => setConsult(false)} className="bg-[#1c2b3a] text-[#f5f1ea] px-6 py-2 text-[11px] uppercase tracking-widest">Close</button>
              </div>
            ) : step === 1 ? (
              <>
                <p className="text-[10px] uppercase tracking-[0.4em] text-[#8b7355] mb-2">Step 1 of 2</p>
                <p className="font-serif italic text-xl mb-4">Which area of law?</p>
                <div className="space-y-2 mb-4">
                  {['Commercial','Property','Family','Wills & Estates','Other'].map(m => (
                    <button key={m} onClick={() => { setData({...data, matter: m}); setStep(2); }} className={`w-full text-left px-4 py-3 border transition-colors ${data.matter === m ? 'border-[#1c2b3a] bg-[#1c2b3a] text-[#f5f1ea]' : 'border-[#1c2b3a]/20 hover:border-[#1c2b3a]'}`}>{m}</button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p className="text-[10px] uppercase tracking-[0.4em] text-[#8b7355] mb-2">Step 2 of 2 · {data.matter}</p>
                <p className="font-serif italic text-xl mb-4">Tell us about it.</p>
                <div className="space-y-3 mb-4">
                  <input value={data.name} onChange={e => setData({...data, name: e.target.value})} placeholder="Name" className="w-full bg-white border border-[#1c2b3a]/20 px-3 py-2 text-sm outline-none focus:border-[#1c2b3a]" />
                  <input value={data.email} onChange={e => setData({...data, email: e.target.value})} placeholder="Email" className="w-full bg-white border border-[#1c2b3a]/20 px-3 py-2 text-sm outline-none focus:border-[#1c2b3a]" />
                  <textarea value={data.details} onChange={e => setData({...data, details: e.target.value})} placeholder="Brief description (confidential)" className="w-full bg-white border border-[#1c2b3a]/20 px-3 py-2 text-sm outline-none focus:border-[#1c2b3a] h-20 resize-none" />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setStep(1)} className="flex-1 border border-[#1c2b3a]/20 py-2.5 text-[11px] uppercase tracking-widest">Back</button>
                  <button onClick={() => data.name && data.email && setStep(3)} className="flex-1 bg-[#1c2b3a] text-[#f5f1ea] py-2.5 text-[11px] uppercase tracking-widest">Submit</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── SmallBiz V3 — Pulse Marketing Agency ────────────
const SmallBizV3 = () => {
  const [brief, setBrief] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', budget: '$10-25k', goal: '' });
  const [sent, setSent] = useState(false);
  return (
    <div className="relative bg-white text-black font-sans text-[14px]">
      <nav className="flex items-center justify-between px-6 py-4 border-b-2 border-black">
        <div className="font-black text-xl tracking-tighter">PULSE/</div>
        <div className="flex gap-5 text-[11px] font-bold uppercase"><span>Work</span><span>Services</span><span>Team</span><span>Ideas</span></div>
        <button onClick={() => { setBrief(true); setSent(false); }} className="bg-[#ff3366] text-white px-5 py-2 text-[11px] font-black uppercase">Start Project</button>
      </nav>
      <div className="px-6 py-10 bg-gradient-to-br from-[#ff3366] to-[#ff9933] text-white">
        <p className="text-[10px] font-black uppercase tracking-widest mb-3">A marketing agency that actually moves the needle.</p>
        <h1 className="font-black text-5xl leading-[0.95] tracking-tighter mb-3">WE BUILD<br/>BRANDS THAT<br/>CONVERT.</h1>
        <div className="flex gap-2 mt-4">
          <button onClick={() => { setBrief(true); setSent(false); }} className="bg-black text-white px-5 py-3 text-[11px] font-black uppercase">Brief us →</button>
          <button className="bg-white text-black px-5 py-3 text-[11px] font-black uppercase">See our work</button>
        </div>
      </div>
      <div className="grid grid-cols-3 border-b-2 border-black">
        {[['127','campaigns shipped'],['$43M','revenue driven'],['4.2×','avg ROAS']].map(([v,l]) => (
          <div key={l} className="p-5 border-r-2 border-black last:border-0">
            <p className="font-black text-3xl tracking-tighter">{v}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest">{l}</p>
          </div>
        ))}
      </div>
      <div className="px-6 py-8">
        <p className="text-[10px] font-black uppercase tracking-widest mb-3">What we do</p>
        <div className="space-y-0">
          {[['01','BRAND STRATEGY','Positioning · Identity · Story'],['02','PERFORMANCE','Paid media · SEO · CRO'],['03','CONTENT','Video · Social · Organic']].map(([n,t,s]) => (
            <div key={n} className="flex items-center justify-between py-4 border-b border-black/10 group cursor-pointer hover:bg-black hover:text-white transition-colors px-2 -mx-2">
              <div className="flex items-center gap-4"><span className="text-[#ff3366] font-black">{n}</span><span className="font-black tracking-tighter text-lg">{t}</span></div>
              <span className="text-[11px] opacity-60">{s}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="px-6 py-8 border-t-2 border-black">
        <p className="text-[10px] font-black uppercase tracking-widest mb-4">Selected Clients</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { co: 'SIRO WINES', metric: '+312% DTC revenue', period: '9 months' },
            { co: 'HIVEMIND', metric: '4.8× ROAS, paid media', period: 'Ongoing' },
            { co: 'CASA NOMADE', metric: '127k organic visits/mo', period: 'From 12k' },
            { co: 'OFF-GRID', metric: 'Rebrand + launch', period: '$1.2M first quarter' },
            { co: 'CARTER COFFEE', metric: '6-city rollout', period: '7 months' },
            { co: 'ALMA SKIN', metric: 'TikTok virality', period: '14M views · 3 campaigns' },
          ].map(c => (
            <div key={c.co} className="p-3 border-2 border-black hover:bg-black hover:text-white transition-colors cursor-pointer">
              <p className="font-black tracking-tighter text-base">{c.co}</p>
              <p className="text-[11px] font-bold text-[#ff3366] group-hover:text-white">{c.metric}</p>
              <p className="text-[10px] opacity-60">{c.period}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="px-6 py-8 bg-black text-white border-t-2 border-black">
        <p className="text-[10px] font-black uppercase tracking-widest mb-4 text-[#ff9933]">The Team</p>
        <div className="grid grid-cols-4 gap-3">
          {[
            { n: 'Mara Yi', r: 'Creative Director' },
            { n: 'Jonah Bell', r: 'Head of Performance' },
            { n: 'Frankie S.', r: 'Content Lead' },
            { n: 'Sam Tait', r: 'Strategy &amp; Ops' },
          ].map(p => (
            <div key={p.n} className="p-3 border border-white/20">
              <p className="font-black tracking-tighter">{p.n}</p>
              <p className="text-[10px] uppercase tracking-widest opacity-60" dangerouslySetInnerHTML={{ __html: p.r }} />
            </div>
          ))}
        </div>
      </div>
      <footer className="px-6 py-8 grid grid-cols-4 gap-4 border-t-2 border-black">
        <div className="col-span-2">
          <p className="font-black text-3xl tracking-tighter mb-1">PULSE/</p>
          <p className="text-[11px] font-bold uppercase tracking-widest mb-3">Sydney · Melbourne</p>
          <p className="text-[11px] leading-relaxed max-w-xs">Independent agency. Client-owned IP. No retainer lock-ins. Start with a sprint, scale if it works.</p>
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#ff3366] mb-2">Studio</p>
          <p className="text-[11px]">Suite 4.02, 312 Crown St<br/>Surry Hills NSW 2010</p>
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#ff3366] mb-2">Say hi</p>
          <p className="text-[11px]">work@pulse.studio</p>
          <p className="text-[11px]">+61 2 8386 4400</p>
          <p className="text-[11px] mt-1">@pulse.studio</p>
        </div>
      </footer>
      <div className="bg-[#ff3366] text-white px-6 py-3 text-[10px] font-black uppercase tracking-widest flex justify-between">
        <span>© 2025 PULSE MARKETING CO.</span>
        <span>Careers · Press Kit · Privacy</span>
      </div>
      {brief && (
        <div className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center p-6" onClick={() => setBrief(false)}>
          <div className="bg-white border-2 border-black p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            {sent ? (
              <div className="text-center">
                <p className="bg-[#ff3366] text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest inline-block mb-3">Received ✓</p>
                <p className="font-black text-2xl tracking-tighter mb-2">LET'S TALK.</p>
                <p className="text-sm text-black/60 mb-4">We'll review your brief and come back with next steps within 48h.</p>
                <button onClick={() => setBrief(false)} className="bg-black text-white px-6 py-2 text-[11px] font-black uppercase">Close</button>
              </div>
            ) : (
              <>
                <p className="font-black text-2xl tracking-tighter mb-4">BRIEF US.</p>
                <div className="space-y-3 mb-4">
                  <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="NAME" className="w-full border-b-2 border-black py-2 text-sm outline-none font-bold placeholder:text-black/40" />
                  <input value={form.company} onChange={e => setForm({...form, company: e.target.value})} placeholder="COMPANY" className="w-full border-b-2 border-black py-2 text-sm outline-none font-bold placeholder:text-black/40" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest mb-2">Budget</p>
                    <div className="flex gap-1.5 flex-wrap">
                      {['$5-10k','$10-25k','$25-50k','$50k+'].map(b => (
                        <button key={b} onClick={() => setForm({...form, budget: b})} className={`px-3 py-1.5 text-[11px] font-black border-2 border-black ${form.budget === b ? 'bg-black text-white' : 'bg-white'}`}>{b}</button>
                      ))}
                    </div>
                  </div>
                  <textarea value={form.goal} onChange={e => setForm({...form, goal: e.target.value})} placeholder="WHAT'S THE GOAL?" className="w-full border-2 border-black p-2 text-sm outline-none font-bold h-20 resize-none placeholder:text-black/40" />
                </div>
                <button onClick={() => form.name && form.company && setSent(true)} className="w-full bg-[#ff3366] text-white py-3 text-[11px] font-black uppercase">Send brief →</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── AI V2 — Support Ticket Bot ────────────
const AIV2 = () => {
  const [stage, setStage] = useState<'form'|'category'|'resolved'>('form');
  const [issue, setIssue] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const solutions: Record<string, string> = {
    'Billing': 'For billing issues, visit Settings → Billing. You can update card details, download invoices, or request refunds directly. If this doesn\'t help, I can escalate to our billing specialist.',
    'Login': 'Try resetting your password via the "Forgot password" link. If you\'re locked out, I can send a magic link to your verified email right now.',
    'Bug': 'Thanks for flagging. I\'ve created Ticket #T-4829. An engineer will investigate within 4 business hours. You\'ll get an update via email.',
    'Feature': 'Logged your request — it\'ll go to our product team for review. Upvote similar requests on our roadmap page to boost priority.',
  };
  return (
    <div className="relative bg-white font-sans text-[14px] min-h-[400px]">
      <div className="bg-slate-900 px-5 py-3 flex items-center gap-3 text-white">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-black text-sm">S</div>
        <div className="flex-1"><p className="font-bold text-sm">Stax Support</p><p className="text-[10px] text-slate-400">Avg. response: 12s · 94% solved first try</p></div>
        <span className="text-[10px] px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full font-bold">● Online</span>
      </div>
      <div className="p-6">
        {stage === 'form' && (
          <>
            <div className="bg-slate-100 rounded-xl p-4 mb-4">
              <p className="text-xs font-bold mb-1">👋 Hi! I'm Stax Support Bot.</p>
              <p className="text-xs text-slate-600">Describe your issue in a sentence — I'll either solve it or route it to the right person.</p>
            </div>
            <textarea value={issue} onChange={e => setIssue(e.target.value)} placeholder="e.g. My invoice for March hasn't arrived yet..." className="w-full px-3 py-3 rounded-xl border border-slate-200 text-xs outline-none focus:border-blue-500 h-24 resize-none mb-3" />
            <button onClick={() => issue.trim() && setStage('category')} disabled={!issue.trim()} className="w-full bg-slate-900 text-white py-2.5 rounded-xl text-xs font-bold disabled:opacity-40 hover:bg-slate-800 transition-colors">Continue →</button>
          </>
        )}
        {stage === 'category' && (
          <>
            <div className="bg-blue-50 rounded-xl p-3 mb-4 text-xs text-slate-600 border border-blue-100">
              <p className="font-bold text-slate-800 mb-1">Got it. Which category fits best?</p>
              <p className="opacity-70 italic">"{issue.slice(0, 80)}{issue.length > 80 ? '...' : ''}"</p>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {Object.keys(solutions).map(c => (
                <button key={c} onClick={() => { setCategory(c); setStage('resolved'); }} className="p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-xs font-bold text-left transition-colors">{c}</button>
              ))}
            </div>
          </>
        )}
        {stage === 'resolved' && category && (
          <>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-3">
              <p className="text-xs font-bold text-green-800 mb-2">✓ {category} — here's what I can do:</p>
              <p className="text-xs text-slate-700 leading-relaxed">{solutions[category]}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setStage('form'); setIssue(''); setCategory(null); }} className="flex-1 bg-slate-900 text-white py-2.5 rounded-xl text-xs font-bold">Ask another</button>
              <button onClick={() => { setStage('form'); setIssue(''); setCategory(null); }} className="flex-1 border border-slate-200 py-2.5 rounded-xl text-xs font-bold">Talk to human</button>
            </div>
          </>
        )}
      </div>
      <div className="px-6 py-7 border-t border-slate-200 bg-slate-50">
        <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-4">How Stax Support performs</p>
        <div className="grid grid-cols-4 gap-3">
          {[
            { v: '82%', l: 'Tickets auto-resolved' },
            { v: '12s', l: 'Avg. first reply' },
            { v: '4.7★', l: 'CSAT after bot' },
            { v: '-64%', l: 'Support headcount cost' },
          ].map(s => (
            <div key={s.l} className="p-3 bg-white rounded-xl border border-slate-100">
              <p className="font-black text-2xl text-slate-900 tracking-tight">{s.v}</p>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="px-6 py-7 border-t border-slate-100">
        <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-3">Trusted by support teams</p>
        <div className="grid grid-cols-2 gap-4">
          {[
            { q: '"Cut our average first-response from 4h to under a minute. Our agents finally have time for the hard stuff."', by: 'Eliza Park · Head of CX, SEED Finance' },
            { q: '"It answers 80% of invoice questions correctly on the first try. Saved us from hiring two more people this quarter."', by: 'Marco Silva · Ops Lead, Nomad Travel' },
          ].map(r => (
            <div key={r.by} className="p-4 border border-slate-100 rounded-xl">
              <p className="text-xs text-slate-700 leading-relaxed mb-2">{r.q}</p>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{r.by}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="px-6 py-7 border-t border-slate-100 bg-slate-50">
        <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-3">Integrations, out of the box</p>
        <div className="flex flex-wrap gap-1.5">
          {['Zendesk','Intercom','Freshdesk','Help Scout','Slack','MS Teams','Stripe','Shopify','HubSpot','Salesforce','Linear','Jira'].map(i => (
            <span key={i} className="text-[11px] px-3 py-1 bg-white border border-slate-200 rounded-md font-bold">{i}</span>
          ))}
        </div>
      </div>
      <footer className="px-6 py-6 bg-slate-900 text-white grid grid-cols-4 gap-4">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-black text-xs">S</div>
            <p className="font-bold text-sm">Stax Support</p>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">The AI layer for your existing support stack. SOC2 Type II, GDPR, data-resident in AU/EU/US.</p>
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-blue-300 mb-2">Product</p>
          <ul className="space-y-0.5 text-[11px] text-slate-300"><li>Features</li><li>Pricing</li><li>Changelog</li><li>Security</li></ul>
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-blue-300 mb-2">Company</p>
          <ul className="space-y-0.5 text-[11px] text-slate-300"><li>About</li><li>Careers</li><li>Press</li><li>hello@stax.ai</li></ul>
        </div>
      </footer>
      <div className="bg-slate-950 text-slate-500 px-6 py-3 text-[10px] uppercase tracking-widest flex justify-between">
        <span>© 2025 Stax Inc.</span>
        <span>SOC2 · GDPR · ISO 27001</span>
      </div>
    </div>
  );
};

// ─── AI V3 — Healthcare appointment assistant ────────────
const AIV3 = () => {
  const [step, setStep] = useState<'hello'|'symptom'|'doctor'|'time'|'done'>('hello');
  const [symptom, setSymptom] = useState('');
  const [doctor, setDoctor] = useState<any>(null);
  const [slot, setSlot] = useState('');
  const doctors = [
    { name: 'Dr. Sarah Chen', spec: 'GP', avail: 'Today 3:30pm', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&auto=format&fit=crop&q=80' },
    { name: 'Dr. Marcus Hill', spec: 'GP', avail: 'Tomorrow 10am', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&auto=format&fit=crop&q=80' },
    { name: 'Dr. Priya Rao', spec: 'GP', avail: 'Today 5:00pm', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&auto=format&fit=crop&q=80' },
  ];
  const slots = ['3:30pm','4:00pm','4:30pm','5:00pm'];
  return (
    <div className="relative bg-white font-sans text-[14px]">
      <div className="bg-emerald-600 px-5 py-3 flex items-center gap-3 text-white">
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center"><span className="text-emerald-600 text-base">+</span></div>
        <div className="flex-1"><p className="font-bold text-sm">Wellspring Medical</p><p className="text-[10px] text-emerald-200">AI-powered triage · HIPAA compliant</p></div>
      </div>
      <div className="p-5 bg-emerald-50/50 min-h-[400px]">
        {step === 'hello' && (
          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">A</div>
              <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 text-xs border border-emerald-100">Hi there. I'm your AI health assistant. What brings you in today?</div>
            </div>
            <div className="ml-9 flex flex-col gap-2">
              {['General checkup','Feeling unwell','Prescription refill','Test results'].map(o => (
                <button key={o} onClick={() => { setSymptom(o); setStep('symptom'); }} className="text-left bg-white border border-emerald-200 rounded-xl px-4 py-2.5 text-xs hover:bg-emerald-50 transition-colors">{o}</button>
              ))}
            </div>
          </div>
        )}
        {step === 'symptom' && (
          <div className="space-y-3">
            <div className="flex justify-end"><div className="bg-emerald-600 text-white rounded-2xl rounded-tr-sm px-4 py-2 text-xs">{symptom}</div></div>
            <div className="flex gap-2">
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">A</div>
              <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 text-xs border border-emerald-100">Got it. Based on your concern, I recommend a GP consultation. Here are available doctors today or tomorrow:</div>
            </div>
            <div className="ml-9 space-y-2">
              {doctors.map(d => (
                <button key={d.name} onClick={() => { setDoctor(d); setStep('doctor'); }} className="w-full flex items-center gap-3 bg-white border border-emerald-200 rounded-xl p-2.5 hover:bg-emerald-50 transition-colors">
                  <img src={d.img} className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" alt={d.name} />
                  <div className="flex-1 text-left">
                    <p className="text-xs font-bold">{d.name}</p>
                    <p className="text-[10px] text-emerald-700">{d.spec} · Next: {d.avail}</p>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-bold">Select →</span>
                </button>
              ))}
            </div>
          </div>
        )}
        {step === 'doctor' && doctor && (
          <div className="space-y-3">
            <div className="flex justify-end"><div className="bg-emerald-600 text-white rounded-2xl rounded-tr-sm px-4 py-2 text-xs">{doctor.name}</div></div>
            <div className="flex gap-2">
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">A</div>
              <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 text-xs border border-emerald-100">Great choice. Pick a time slot for today:</div>
            </div>
            <div className="ml-9 grid grid-cols-2 gap-2">
              {slots.map(s => (
                <button key={s} onClick={() => { setSlot(s); setStep('time'); }} className="bg-white border border-emerald-200 rounded-xl py-2 text-xs font-bold hover:bg-emerald-50 transition-colors">{s}</button>
              ))}
            </div>
          </div>
        )}
        {step === 'time' && (
          <div className="space-y-3">
            <div className="flex justify-end"><div className="bg-emerald-600 text-white rounded-2xl rounded-tr-sm px-4 py-2 text-xs">{slot}</div></div>
            <div className="flex gap-2">
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">A</div>
              <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 text-xs border border-emerald-100">To confirm, can I grab your Medicare number?</div>
            </div>
            <input placeholder="xxxx xxxxx x" className="w-full bg-white border border-emerald-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-emerald-500 ml-9 max-w-[calc(100%-2.25rem)]" />
            <button onClick={() => setStep('done')} className="ml-9 bg-emerald-600 text-white px-5 py-2 rounded-full text-xs font-bold">Confirm appointment →</button>
          </div>
        )}
        {step === 'done' && (
          <div className="flex flex-col items-center justify-center text-center py-10">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-3"><span className="text-emerald-600 text-3xl">✓</span></div>
            <p className="font-bold text-lg mb-1">Appointment confirmed!</p>
            <p className="text-xs text-emerald-700 mb-4">{doctor?.name} · Today at {slot}</p>
            <p className="text-[11px] text-slate-500">Confirmation sent to your email with pre-visit forms.</p>
            <button onClick={() => { setStep('hello'); setSymptom(''); setDoctor(null); setSlot(''); }} className="mt-4 text-xs text-emerald-600 font-bold underline">Book another</button>
          </div>
        )}
      </div>
      <div className="px-6 py-7 border-t border-emerald-100 bg-white">
        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-4">Why Wellspring uses AI triage</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { v: '24/7', l: 'Always-on booking' },
            { v: '-48%', l: 'No-show rate' },
            { v: '93%', l: 'Patient CSAT' },
          ].map(s => (
            <div key={s.l} className="p-3 bg-emerald-50 rounded-xl">
              <p className="font-black text-2xl text-emerald-700">{s.v}</p>
              <p className="text-[10px] uppercase tracking-widest text-emerald-700/70 font-bold">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="px-6 py-7 bg-emerald-50 border-t border-emerald-100">
        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-3">What patients say</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { q: '"Booked an appointment at 11pm on a Sunday. Confirmation with Medicare autofill was instant."', by: 'Rose T.' },
            { q: '"Way better than trying to get through on the phone during a sick week."', by: 'David M.' },
          ].map(r => (
            <div key={r.by} className="p-3 bg-white rounded-xl border border-emerald-100">
              <p className="text-xs text-slate-700 leading-relaxed mb-1">{r.q}</p>
              <p className="text-[10px] uppercase tracking-widest text-emerald-700 font-bold">{r.by}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="px-6 py-7 border-t border-emerald-100">
        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-3">Our Doctors</p>
        <div className="grid grid-cols-3 gap-3">
          {doctors.map(d => (
            <div key={d.name} className="p-3 border border-emerald-100 rounded-xl text-center">
              <img src={d.img} className="w-14 h-14 rounded-full object-cover mx-auto mb-2" referrerPolicy="no-referrer" alt={d.name} />
              <p className="text-xs font-bold">{d.name}</p>
              <p className="text-[10px] text-emerald-700">{d.spec}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="px-6 py-5 bg-emerald-50 border-t border-emerald-100 flex flex-wrap gap-2">
        {['Bulk-billing available','HIPAA compliant','Medicare Provider 41288A','APHRA Registered GPs','Telehealth ready'].map(b => (
          <span key={b} className="text-[10px] px-3 py-1 bg-white border border-emerald-200 rounded-full text-emerald-700 font-bold uppercase tracking-widest">{b}</span>
        ))}
      </div>
      <footer className="px-6 py-7 bg-emerald-900 text-white grid grid-cols-4 gap-4">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center"><span className="text-emerald-600 text-base">+</span></div>
            <p className="font-bold text-sm">Wellspring Medical</p>
          </div>
          <p className="text-[11px] text-emerald-100/70 leading-relaxed max-w-xs">Family medical practice serving North Sydney since 2002. Bulk billing for concession card holders.</p>
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-300 mb-2">Visit</p>
          <p className="text-[11px] text-emerald-100/70 leading-relaxed">Suite 3, 210 Miller St<br/>North Sydney NSW 2060<br/>(02) 9955 0088</p>
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-300 mb-2">Hours</p>
          <p className="text-[11px] text-emerald-100/70 leading-relaxed">Mon–Fri · 8am–7pm<br/>Sat · 9am–1pm<br/>Telehealth 7 days</p>
        </div>
      </footer>
      <div className="bg-emerald-950 text-emerald-100/40 px-6 py-3 text-[10px] uppercase tracking-widest flex justify-between">
        <span>© 2025 Wellspring Medical Group</span>
        <span>Privacy · Patient Rights · Feedback</span>
      </div>
    </div>
  );
};

const DEMOS = [
  { id: 'cafe',     label: 'Restaurant & Café',    sub: 'Menus, bookings & Google presence',  preview: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80',
    templates: [
      { id: 'v1', name: 'The Black Wave',   sub: 'Modern minimal', Component: CafeV1 },
      { id: 'v2', name: 'Lumière Bakery',    sub: 'Warm · French',  Component: CafeV2 },
      { id: 'v3', name: 'Kindred Kitchen',   sub: 'Dark · Fine dining', Component: CafeV3 },
    ]},
  { id: 'tradie',   label: 'Trades & Contractors', sub: 'Quote forms, gallery & credentials', preview: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80',
    templates: [
      { id: 'v1', name: 'Watts Electrical',  sub: 'Bold · Urgent',   Component: TradieV1 },
      { id: 'v2', name: 'Ironbark Plumbing', sub: 'Corporate · Blue', Component: TradieV2 },
      { id: 'v3', name: 'Hammer & Co',       sub: 'Craftsman · Editorial', Component: TradieV3 },
    ]},
  { id: 'coach',    label: 'Coaches & Therapists', sub: 'Booking pages, plans & trust',       preview: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&auto=format&fit=crop&q=80',
    templates: [
      { id: 'v1', name: 'Jessica Moore',     sub: 'Warm · Accessible', Component: CoachV1 },
      { id: 'v2', name: 'Dr. Alex Voss',     sub: 'Calm · Clinical',  Component: CoachV2 },
      { id: 'v3', name: 'Executive Edge',    sub: 'Luxury · Enterprise', Component: CoachV3 },
    ]},
  { id: 'retail',   label: 'Retail & Local Shops', sub: 'Product grid, cart & brand story',   preview: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&auto=format&fit=crop&q=80',
    templates: [
      { id: 'v1', name: 'Stone & Grove',     sub: 'Refined · Homewares', Component: RetailV1 },
      { id: 'v2', name: 'Wildflower',        sub: 'Romantic · Florist',  Component: RetailV2 },
      { id: 'v3', name: 'Waxhaus',           sub: 'Bold · Vinyl shop',   Component: RetailV3 },
    ]},
  { id: 'smallbiz', label: 'Small Business',       sub: 'Services, contact & trust signals',  preview: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80',
    templates: [
      { id: 'v1', name: 'Meridian Accounting', sub: 'Classic · Trustworthy', Component: SmallBizV1 },
      { id: 'v2', name: 'Anchor Legal',        sub: 'Editorial · Law',       Component: SmallBizV2 },
      { id: 'v3', name: 'Pulse Marketing',     sub: 'Bold · Agency',         Component: SmallBizV3 },
    ]},
  { id: 'ai',       label: 'AI Chatbot Demo',      sub: 'Lead qualification & 24/7 support',  preview: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&auto=format&fit=crop&q=80',
    templates: [
      { id: 'v1', name: 'Sales Qualifier',     sub: 'Lead capture',   Component: AIV1 },
      { id: 'v2', name: 'Support Triage',      sub: 'Ticket routing', Component: AIV2 },
      { id: 'v3', name: 'Healthcare Booker',   sub: 'Appointment AI', Component: AIV3 },
    ]},
];

const openDemoRoute = (id: string, tId: string = 'v1') => {
  window.location.hash = `#/demo/${id}/${tId}`;
};

const PrototypesSection = ({ onBookNow }: { onBookNow: () => void }) => {
  return (
    <section className="py-32 bg-secondary/20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 uppercase tracking-widest font-black italic">// LIVE DEMOS</Badge>
          <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-6">SEE IT <span className="text-primary">WORKING.</span></h2>
          <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
            Interactive prototypes of what we'd build for your business. 3 template variants per industry — every button, form, and flow fully working.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEMOS.map((demo, i) => (
            <motion.div
              key={demo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              onClick={() => openDemoRoute(demo.id)}
              className="group cursor-pointer rounded-[2rem] overflow-hidden border border-foreground/5 hover:border-primary/30 transition-all duration-500 bg-background hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={demo.preview} alt={demo.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-background/90 backdrop-blur text-foreground border-0 text-[9px] uppercase tracking-widest font-black">{demo.templates.length} Templates</Badge>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest shadow-xl scale-95 group-hover:scale-100 transition-transform duration-300">
                    Explore Templates →
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-black uppercase italic tracking-tighter">{demo.label}</h3>
                  <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                </div>
                <p className="text-xs text-muted-foreground font-medium mb-3">{demo.sub}</p>
                <div className="flex flex-wrap gap-1.5">
                  {demo.templates.map(t => (
                    <button
                      key={t.id}
                      onClick={(e) => { e.stopPropagation(); openDemoRoute(demo.id, t.id); }}
                      className="group/tpl text-[9px] font-bold uppercase tracking-widest text-muted-foreground/70 border border-foreground/10 px-2 py-0.5 rounded hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
                    >
                      {t.name} <span className="opacity-0 group-hover/tpl:opacity-100 transition-opacity">↗</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground font-medium mb-6">From $1,499 — delivered in 2 weeks, owned by you forever. No lock-in.</p>
          <Button size="lg" className="h-16 px-12 text-base font-black uppercase italic rounded-2xl shadow-xl shadow-primary/20" onClick={onBookNow}>
            Get My Website — from $1,499 <ArrowRight className="ml-3 w-5 h-5" />
          </Button>
        </div>
      </div>

    </section>
  );
};

const parseDemoRoute = () => {
  const m = window.location.hash.match(/^#\/demo\/([^/]+)(?:\/([^/]+))?$/);
  if (!m) return null;
  const [, id, tid] = m;
  const demo = DEMOS.find(d => d.id === id);
  if (!demo) return null;
  const template = (tid && demo.templates.find(t => t.id === tid)) || demo.templates[0];
  return { demo, template };
};

type DemoRoute = NonNullable<ReturnType<typeof parseDemoRoute>>;

const DemoPage = ({ route, onBookNow, onGoHome }: { route: DemoRoute; onBookNow: () => void; onGoHome: () => void }) => {
  const { demo, template } = route;
  const Component = template.Component;

  useEffect(() => {
    document.title = `${template.name} · ${demo.label} — Oceanalt Demo`;
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [demo.id, template.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onGoHome();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onGoHome]);

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-40 bg-[#1a1a1e]/95 backdrop-blur-xl text-white border-b border-white/10">
        <div className="px-4 md:px-6 h-11 flex items-center gap-3">
          <button onClick={onGoHome} className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-gray-300 hover:text-white transition-colors shrink-0">
            <span className="text-primary">←</span> Oceanalt
          </button>
          <span className="text-white/20 shrink-0">/</span>
          <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold shrink-0">{demo.label}</span>
          <div className="hidden md:flex flex-1 bg-black/40 rounded-md px-3 py-1 text-[11px] font-mono text-gray-400 truncate mx-2">
            www.{template.name.toLowerCase().replace(/[^a-z]/g,'').slice(0,24)}.com.au
          </div>
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none shrink-0">
            {demo.templates.map(t => (
              <button
                key={t.id}
                onClick={() => openDemoRoute(demo.id, t.id)}
                className={`shrink-0 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest transition-all ${t.id === template.id ? 'bg-white text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}
              >
                {t.name}
              </button>
            ))}
          </div>
          <button onClick={onBookNow} className="shrink-0 bg-primary hover:brightness-110 text-primary-foreground px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all">
            Book This Build
          </button>
          <button onClick={onGoHome} aria-label="Close demo" className="shrink-0 text-gray-500 hover:text-white transition-colors" title="Close (Esc)">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="relative">
        <Component />
      </div>
      <div className="bg-[#0f0f12] text-white px-6 py-8 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-primary font-black mb-1">Oceanalt Demo · {template.name}</p>
            <p className="text-sm text-gray-300 font-medium">Like what you see? We'll build and ship yours in 2 weeks.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={onGoHome} className="text-[11px] font-bold uppercase tracking-widest text-gray-400 border border-white/10 px-4 py-2 rounded-md hover:bg-white/5 transition-all">
              Back to Oceanalt
            </button>
            <button onClick={onBookNow} className="text-[11px] font-black uppercase tracking-widest bg-primary text-primary-foreground px-4 py-2 rounded-md hover:brightness-110 transition-all">
              Book a Call →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Modernization = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "center start"]
  });

  const mobileOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const whyOceanalt = [
    {
      title: "End-to-end delivery",
      desc: "Design, frontend, backend, AI and deploy handled under one roof. No hand-offs between separate agencies, no dependency on a third-party dev shop.",
      icon: <Globe className="w-8 h-8" />
    },
    {
      title: "Full ownership",
      desc: "Code in your GitHub, domain in your registrar, data in your Firestore, keys in your name. The engagement ends; the build stays yours.",
      icon: <Lock className="w-8 h-8" />
    },
    {
      title: "Milestone billing",
      desc: "Pay per delivered milestone — not upfront, not monthly. If a milestone isn't shipped and approved, it isn't invoiced.",
      icon: <DollarSign className="w-8 h-8" />
    },
    {
      title: "Direct communication",
      desc: "Slack or email straight through to the people writing the code. No account manager layer. Same-business-day replies during a project.",
      icon: <MessageSquare className="w-8 h-8" />
    },
    {
      title: "AU-hosted by default",
      desc: "Vercel/Cloudflare with AU edge for sites. Firestore in ap-southeast-2 for lead data. Happy to deploy into your AWS/GCP if you already have one.",
      icon: <Database className="w-8 h-8" />
    },
    {
      title: "Honest scoping",
      desc: "If a project needs a research team, security clearance or 24/7 on-call, that's flagged upfront with a referral out — not quietly absorbed into the quote.",
      icon: <Scale className="w-8 h-8" />
    }
  ];

  const expertise = [
    {
      id: "01",
      title: "Websites",
      desc: "Fast, mobile-first marketing sites with a contact form, Google Maps, basic SEO and analytics. React + Tailwind deployed to Vercel or Cloudflare. Usually 2 weeks start-to-launch.",
      tags: ["React", "Tailwind", "Vercel", "SEO basics"],
      icon: <Palette className="w-10 h-10" />,
      color: "text-primary"
    },
    {
      id: "02",
      title: "AI chatbots & tools",
      desc: "Lead-qualifying chatbots (Gemini, Claude, GPT), RAG search over your docs, small internal tools like quote generators, appointment workflows, or email triage.",
      tags: ["Gemini", "Claude", "RAG", "Firestore"],
      icon: <Bot className="w-10 h-10" />,
      color: "text-cyan-400"
    },
    {
      id: "03",
      title: "Small SaaS / MVPs",
      desc: "1–3 screen internal tools or indie SaaS MVPs. React/Next frontend, FastAPI or Node backend, Postgres or Firestore. No Kubernetes — deployed to Vercel, Fly.io, or Cloud Run.",
      tags: ["Next.js", "FastAPI", "Postgres", "Stripe"],
      icon: <Hammer className="w-10 h-10" />,
      color: "text-blue-400"
    }
  ];

  const techStack = [
    "NEXT.JS", "TYPESCRIPT", "FASTAPI", "PYTHON", "LANGCHAIN", "LLAMAINDEX",
    "KUBERNETES", "DOCKER", "AWS AU", "AZURE AU", "CI/CD",
    "GRAPHQL", "REST", "PGVECTOR", "PINECONE", "TERRAFORM", "IaC", "REACT", "NODE.JS"
  ];

  return (
    <section id="expertise" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="mb-40">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 uppercase tracking-widest font-black italic">// WHY OCEANALT</Badge>
            <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-8">LEAN. <br/><span className="text-primary">OWNED. SHIPPED.</span></h2>
            <p className="text-xl text-muted-foreground font-medium leading-relaxed max-w-3xl mx-auto">
              Six reasons small businesses pick Oceanalt over a traditional agency: speed, ownership and honest scope — without the retainer.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {whyOceanalt.map((item, i) => (
              <div key={i} className="p-8 rounded-3xl bg-secondary/10 border border-foreground/5 hover:border-primary/20 transition-all group relative overflow-hidden flex flex-col items-center text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-primary mb-6 group-hover:scale-110 transition-transform relative z-10 flex justify-center">{item.icon}</div>
                <h4 className="text-xl font-black uppercase italic tracking-tighter mb-3 relative z-10">{item.title}</h4>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed relative z-10">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Advantage Comparison */}
        <div className="mb-40 p-12 rounded-[4rem] bg-foreground text-background relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-[100px] -z-0" />
          <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <Badge className="mb-6 bg-background/10 text-background border-background/20 uppercase tracking-widest font-black italic">// LEAN VS AGENCY</Badge>
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-8 leading-tight">
                OCEANALT <br/><span className="text-primary">VS AN AGENCY</span>
              </h2>
              <p className="text-xl text-background/70 font-medium leading-relaxed mb-10">
                Agencies sell hours and bill retainers. Oceanalt sells shipped milestones. Here's the difference for small businesses.
              </p>
            </div>
            <div className="space-y-6">
              {[
                { label: "Delivery model", off: "Project managers + offshore", local: "One team, end-to-end" },
                { label: "Turnaround", off: "6–12 weeks min", local: "~2 weeks for a starter site" },
                { label: "Billing", off: "Monthly retainer", local: "Per delivered milestone" },
                { label: "Ownership", off: "Locked to their stack", local: "Your GitHub, your accounts" }
              ].map((item, i) => (
                <div key={i} className="grid grid-cols-3 gap-4 py-6 border-b border-background/10">
                  <span className="text-xs font-black uppercase tracking-widest text-background/40">{item.label}</span>
                  <span className="text-sm font-bold text-red-400 italic line-through opacity-50">{item.off}</span>
                  <span className="text-sm font-black text-primary italic uppercase tracking-tighter">{item.local}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Core Expertise */}
        <div ref={containerRef} className="grid lg:grid-cols-2 gap-24 items-start">
          <motion.div 
            className="sticky top-32"
            style={{ opacity: isMobile ? mobileOpacity : 1 }}
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 uppercase tracking-widest font-black italic">// WHAT OCEANALT BUILDS</Badge>
            <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-4 leading-tight">
              THREE THINGS, WELL.
            </h2>
            <p className="text-xl text-muted-foreground font-medium leading-relaxed mb-10">
              Websites, AI chatbots, and small SaaS / internal tools. No mobile apps, no real-time video, no Kubernetes — just the boring, shippable tech small businesses actually need.
            </p>
          </motion.div>
          <div className="grid gap-8">
            {expertise.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="p-12 rounded-[3rem] bg-secondary/20 border border-white/5 hover:border-primary/30 transition-all group"
              >
                <div className="flex justify-between items-center mb-8">
                  <div className={`p-4 rounded-2xl bg-background ${f.color} group-hover:scale-110 transition-transform shadow-xl flex items-center justify-center`}>{f.icon}</div>
                  <span className="text-4xl font-black text-foreground/5 italic">{f.id}</span>
                </div>
                <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-4">{f.title}</h3>
                <p className="text-muted-foreground font-medium leading-relaxed mb-8">{f.desc}</p>
                <div className="flex flex-wrap gap-3">
                  {f.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-foreground/5 text-[10px] font-bold uppercase tracking-widest">{tag}</Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-32">
        <Marquee items={techStack} reverse />
      </div>
    </section>
  );
};

const Testimonials = () => {
  const principles = [
    {
      title: "Full ownership",
      body: "Code in your GitHub. Domain, hosting, database and API keys in your accounts. The whole build is yours from day one — nothing to migrate later.",
    },
    {
      title: "Milestone billing",
      body: "Fixed scope, quoted up front, billed per delivered milestone. If a milestone isn't shipped and approved, it isn't invoiced. No monthly retainers.",
    },
    {
      title: "Boring, shippable tech",
      body: "React, Tailwind, FastAPI, Postgres, Firestore, Vercel — proven pieces that small businesses can host, run and maintain without a DevOps hire.",
    },
    {
      title: "Honest about scope",
      body: "If a project needs a security audit, a native mobile SDK, or a dedicated ML team, it's flagged upfront — with a referral out — rather than overpromised.",
    },
  ];

  return (
    <section className="py-32 bg-primary/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 uppercase tracking-widest font-black italic">// COMMITMENTS</Badge>
          <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-6">IN <span className="text-primary">WRITING.</span></h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">Four things that go into every engagement contract.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {principles.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="group p-8 md:p-10 rounded-[2.5rem] bg-background border border-foreground/5 hover:border-primary/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-500"
            >
              <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter mb-4">{p.title}</h3>
              <p className="text-base text-muted-foreground leading-relaxed font-medium">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AIDelivery = () => {
  const smallCards = [
    {
      icon: <Terminal className="w-6 h-6" />,
      title: "AI Apps",
      desc: "Full applications powered by AI engines.",
      items: ["Document Intel", "Semantic Search"],
      num: "02",
    },
    {
      icon: <Workflow className="w-6 h-6" />,
      title: "Automation",
      desc: "Map and automate your manual workflows.",
      items: ["Email triage", "Data extraction"],
      num: "03",
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "RAG Systems",
      desc: "Private knowledge bases on your infrastructure.",
      items: ["Vector stores", "Local embedding compute"],
      num: "04",
    },
    {
      icon: <Wand2 className="w-6 h-6" />,
      title: "Rebuild",
      desc: "Modernize legacy systems with AI layers.",
      items: ["PWA transformation", "API grafting"],
      num: "05",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Analytics",
      desc: "Turn raw data into actionable decisions.",
      items: ["Predictive dashboards", "BigQuery ML"],
      num: "06",
    },
  ];

  return (
    <section id="ai" className="py-48 relative overflow-hidden bg-background">
      {/* Dot grid background */}
      <div
        className="absolute inset-0 -z-10 opacity-40"
        style={{ backgroundImage: 'radial-gradient(circle, oklch(0.55 0.18 200 / 0.12) 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-12">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 uppercase tracking-widest font-black italic">// AI-FIRST ARCHITECTURE</Badge>
            <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.88]">
              AI BAKED INTO <br /><span className="text-primary">THE CORE LAYER.</span>
            </h2>
          </div>
          <p className="text-lg text-muted-foreground font-medium leading-relaxed max-w-xs lg:mb-2">
            We don't bolt on AI. We engineer AI-native data pipelines, embedding stores, and inference endpoints from the ground up.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Featured card — spans 2 cols, 2 rows */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-2 group relative rounded-[2.5rem] overflow-hidden border border-primary/25 bg-gradient-to-br from-primary/12 via-primary/4 to-transparent p-10 md:p-14 flex flex-col min-h-[400px]"
          >
            {/* Glow orb */}
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/20 rounded-full blur-[80px] group-hover:bg-primary/30 transition-colors duration-700 pointer-events-none" />
            {/* Big decorative number */}
            <span className="absolute bottom-8 right-10 text-[clamp(80px,12vw,130px)] font-black italic leading-none text-primary/8 select-none pointer-events-none">01</span>

            <div className="relative z-10 flex flex-col h-full">
              {/* Icon */}
              <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground mb-10 shadow-[0_20px_60px_rgba(0,0,0,0.15)] shadow-primary/40 group-hover:scale-105 transition-transform duration-500">
                <ModernAIIcon className="w-10 h-10" />
              </div>

              <span className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Featured Service</span>
              <h3 className="text-4xl md:text-[3.25rem] font-black uppercase italic tracking-tighter leading-none mb-5">Custom Chatbots</h3>
              <p className="text-muted-foreground font-medium text-base md:text-lg leading-relaxed max-w-md mb-10">
                Intelligent agents that act on your behalf — qualify leads, update your CRM, and close deals around the clock.
              </p>

              <div className="mt-auto flex flex-wrap gap-2">
                {["Sales Qualification", "CRM Write-Back", "Powered by Claude / GPT / Gemini"].map((tag, i) => (
                  <span key={i} className="font-mono text-[10px] uppercase tracking-widest bg-primary/10 text-primary border border-primary/25 px-4 py-1.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Small cards */}
          {smallCards.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="group relative rounded-[2rem] border border-foreground/6 bg-secondary/25 hover:bg-secondary/50 hover:border-primary/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-500 p-8 flex flex-col min-h-[220px] overflow-hidden"
            >
              {/* Decorative number */}
              <span className="absolute bottom-5 right-7 text-[56px] font-black italic leading-none text-foreground/[0.04] group-hover:text-primary/[0.07] transition-colors select-none pointer-events-none">{f.num}</span>

              <div className="relative z-10 flex flex-col h-full">
                {/* Icon */}
                <div className="w-11 h-11 rounded-xl bg-background border border-foreground/8 flex items-center justify-center text-primary mb-5 group-hover:border-primary/30 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-400 shadow-sm">
                  {f.icon}
                </div>

                <h3 className="text-xl font-black uppercase italic tracking-tighter mb-1.5">{f.title}</h3>
                <p className="text-muted-foreground text-sm font-medium leading-snug mb-5">{f.desc}</p>

                <div className="mt-auto flex flex-wrap gap-1.5">
                  {f.items.map((item, idx) => (
                    <span key={idx} className="font-mono text-[9px] uppercase tracking-widest text-foreground/45 border border-foreground/8 px-2.5 py-1 rounded-full group-hover:border-primary/20 group-hover:text-primary/70 transition-colors">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SEOSection = () => {
  const seoFeatures = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Technical SEO",
      desc: "Crawlability audits, XML sitemaps, robots.txt, canonical tags, structured data (JSON-LD), hreflang, and log-file analysis."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Core Web Vitals",
      desc: "LCP <2.5s, CLS <0.1, INP <200ms. Edge caching, CDN configuration, lazy-loading, and image format optimisation (WebP/AVIF)."
    },
    {
      icon: <FileCheck className="w-8 h-8" />,
      title: "On-Page SEO",
      desc: "Keyword architecture, semantic HTML5, meta title/description templates, heading hierarchy, and internal link graphs."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Analytics Setup",
      desc: "GA4 + Google Search Console + Tag Manager. Custom event tracking, conversion funnels, and real-time dashboards."
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "AI Search Compliance (GEO)",
      desc: "Generative Engine Optimisation. We ensure your brand is cited by Perplexity, SearchGPT, and Gemini through factual density and semantic authority."
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI-Native Content",
      desc: "LLM-powered content gap analysis, semantic keyword clustering, and automated meta-tag generation at scale."
    }
  ];

  return (
    <section id="seo" className="py-32 bg-secondary/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 uppercase tracking-widest font-black italic">// SEO & DISCOVERABILITY</Badge>
          <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-8">BUILT TO RANK. <br/><span className="text-primary">BUILT TO CONVERT.</span></h2>
          <p className="text-xl text-muted-foreground font-medium leading-relaxed max-w-3xl mx-auto">
            Every product we ship is SEO-native and AI-search compliant. We engineer schema markup, Core Web Vitals, and Generative Engine Optimisation (GEO) into the build — not as an add-on.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {seoFeatures.map((item, i) => (
            <div key={i} className="p-8 rounded-3xl bg-background border border-foreground/5 hover:border-primary/20 transition-all group">
              <div className="text-primary mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
              <h4 className="text-xl font-black uppercase italic tracking-tighter mb-3">{item.title}</h4>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    {
      id: "STEP 01",
      title: "DISCOVERY & SCOPING",
      desc: "We map your workflows, audit existing tech debt, and identify AI/automation opportunities. Output: a signed tech spec with milestone breakdown and fixed milestone pricing."
    },
    {
      id: "STEP 02",
      title: "ARCHITECTURE & STACK DESIGN",
      desc: "We design the full AI stack — model selection, embedding strategy, data pipelines, API contracts, and IaC modules. Output: architecture diagram + approved tech stack."
    },
    {
      id: "STEP 03",
      title: "SPRINT BUILD",
      desc: "2-week sprints. Each sprint ships working, tested code into a staging environment. No scope creep — changes go to backlog. You have Slack access to your architect 24/7."
    },
    {
      id: "STEP 04",
      title: "CLIENT REVIEW & MILESTONE INVOICE",
      desc: "You review the working sprint build. Once approved, we invoice for that milestone only. You never pay for work you haven't seen and signed off."
    },
    {
      id: "STEP 05",
      title: "PRODUCTION DEPLOY & HANDOVER",
      desc: "Blue-green deployment. Automated rollback. Full runbook, documentation, and codebase handover. You own every line."
    },
    {
      id: "STEP 06",
      title: "2-YEAR POST-LAUNCH SUPPORT",
      desc: "Dedicated support channel, SLA-backed response times, proactive monitoring alerts, and quarterly performance reviews — for 2 full years, included in every engagement."
    }
  ];

  return (
    <section className="py-32 bg-primary/5 border-y border-foreground/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 uppercase tracking-widest font-black italic">// DELIVERY METHODOLOGY</Badge>
          <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-8">HOW WE <span className="text-primary">SHIP</span></h2>
          <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">A lean, milestone-gated delivery loop. You see working software at every stage. You pay per milestone. No surprises.</p>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-8">
          {steps.map((s, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative group text-center md:text-left"
            >
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4">{s.id}</div>
              <h4 className="text-xl font-black uppercase italic tracking-tighter mb-3 group-hover:text-primary transition-colors">{s.title}</h4>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const EngagementIncludes = () => {
  const inclusions = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "2-YR DOMAIN MAINTENANCE",
      desc: "Domain registration, DNS management, and renewal handled for 2 years. No surprises."
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "1-YR HOSTING",
      desc: "First year of cloud hosting (AU region) configured, monitored, and managed by us."
    },
    {
      icon: <Hammer className="w-8 h-8" />,
      title: "2-YR SUPPORT",
      desc: "SLA-backed bug fixes, security patches, and feature tweaks for 24 months post-launch."
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "SSL CERTIFICATE",
      desc: "Managed Let's Encrypt or DigiCert SSL. Auto-renewal. HTTPS enforced from day one."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "SEO FOUNDATION",
      desc: "Technical SEO audit, GA4 setup, sitemap, robots.txt, Core Web Vitals baseline."
    },
    {
      icon: <FastForward className="w-8 h-8" />,
      title: "CDN SETUP",
      desc: "CloudFront or Cloudflare configured for edge caching and global performance from launch."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "MONTHLY REPORTS",
      desc: "Uptime, performance, error rates, and SEO rankings delivered to your inbox monthly."
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "SECURITY HARDENING",
      desc: "OWASP Top 10 compliance, dependency scanning, secrets management, and WAF configuration."
    }
  ];

  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 uppercase tracking-widest font-black italic">// EVERY ENGAGEMENT INCLUDES</Badge>
          <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-8">ZERO HIDDEN <span className="text-primary">COSTS.</span></h2>
          <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">Everything you need to go live and stay live. Bundled in, not bolted on.</p>
        </div>
        <div className="grid md:grid-cols-4 gap-8 items-stretch">
          {inclusions.map((item, i) => (
            <div key={i} className="p-8 rounded-3xl bg-secondary/10 border border-foreground/5 hover:border-primary/20 transition-all group flex flex-col items-center text-center">
              <div className="text-primary mb-6 group-hover:scale-110 transition-transform flex justify-center">{item.icon}</div>
              <h4 className="text-lg font-black uppercase italic tracking-tighter mb-3">{item.title}</h4>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BillingModel = () => {
  const billingSteps = [
    { step: "STEP 1", title: "Agree on milestone scope & price" },
    { step: "STEP 2", title: "We build & deploy to staging" },
    { step: "STEP 3", title: "You review & approve" },
    { step: "STEP 4", title: "Invoice issued. Repeat." }
  ];

  return (
    <section className="py-32 bg-primary/5 border-y border-foreground/5">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 uppercase tracking-widest font-black italic">// BILLING MODEL</Badge>
            <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-8 leading-tight">
              PAY PER MILESTONE. <br/><span className="text-primary">NOT PER MONTH.</span>
            </h2>
            <p className="text-xl text-muted-foreground font-medium leading-relaxed mb-10">
              We break every project into clearly-defined milestones. You only pay when you see working software and give the green light. No retainers. No upfront lump sums. No lock-in.
            </p>
          </div>
          <div className="grid gap-4">
            {billingSteps.map((s, i) => (
              <div key={i} className="flex items-center gap-6 p-6 rounded-2xl bg-background border border-foreground/5">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary font-black italic text-xs tracking-tighter">
                  {s.step}
                </div>
                <h4 className="text-xl font-black uppercase italic tracking-tighter">{s.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Pricing = ({ onBookNow }: { onBookNow: () => void }) => {
  const plans = [
    {
      name: "STARTER SITE",
      price: "$1,499",
      sub: "AUD flat",
      note: "One fixed price. 50% to start, 50% on launch. No monthly fees after.",
      description: "A clean, fast website for a café, tradie, coach, or small service business that needs to stop losing jobs to Google Maps.",
      features: [
        "Up to 5 pages (Home, About, Services, Gallery, Contact)",
        "Mobile-first, fast-loading design",
        "Contact form → your email",
        "Google Maps + Analytics setup",
        "1-year domain & hosting included",
        "Basic SEO (titles, descriptions, sitemap)",
        "SSL certificate",
        "Delivered in ~2 weeks",
        "You own the domain, the code, everything"
      ],
      icon: <Palette className="w-6 h-6 text-primary" />
    },
    {
      name: "SITE + AI CHATBOT",
      price: "$4,999",
      sub: "AUD / first milestone",
      note: "Typical total $8k–$15k across 2–3 milestones. Pay per delivered milestone.",
      description: "Everything in Starter, plus an AI chatbot that qualifies leads, answers FAQs, and writes each conversation to your inbox and a database. Powered by Gemini or Claude.",
      features: [
        "Everything in Starter Site",
        "AI chatbot trained on your content",
        "Captures name, email, budget, project scope",
        "Saves leads to Firestore + emails your inbox",
        "Connects to your existing tools (email, CRM)",
        "6 months of bug-fix support post-launch",
        "All model keys, prompts and data stay in your accounts"
      ],
      icon: <Bot className="w-6 h-6 text-primary" />,
      popular: true
    },
    {
      name: "CUSTOM BUILD",
      price: "LET'S",
      sub: "TALK",
      note: "Internal tools, dashboards, small SaaS MVPs, or anything that doesn't fit a template. Scoped honestly — only taken on if the fit is there.",
      description: "For projects that don't fit a template. Scope is agreed together, milestones locked up front, work starts only if the fit is right.",
      features: [
        "Honest scoping — projects outside scope get referred",
        "Milestone pricing agreed before work starts",
        "No retainers, no lock-in contracts",
        "Direct access to the builder — no account manager layer",
        "You own the code, data, and accounts",
        "Referral network for anything out of scope"
      ],
      icon: <MessageSquareText className="w-6 h-6 text-primary" />,
      custom: true
    }
  ];

  return (
    <section id="pricing" className="py-32 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 uppercase tracking-widest font-black italic">// PRICING</Badge>
          <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-6">THREE <span className="text-primary">WAYS IN.</span></h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Fixed-price starter, milestone billing for bigger builds, custom scope for everything else. No retainers, no lock-in. If a milestone isn't delivered, you don't pay for it.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={`relative p-8 md:p-10 rounded-[2.5rem] border flex flex-col ${plan.popular ? "bg-primary/5 border-primary/30 shadow-2xl shadow-primary/10" : "bg-background border-foreground/5"}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-primary text-primary-foreground font-black uppercase italic tracking-widest">Most Popular</Badge>
              )}
              <div className="mb-8 p-4 rounded-2xl bg-secondary w-fit">
                {plan.icon}
              </div>
              <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-5xl font-black tracking-tighter">{plan.price}</span>
                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">{plan.sub}</span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-6">★ BILL AS YOU GO — pay per approved milestone</p>
              <p className="text-xs text-muted-foreground font-medium mb-8 leading-relaxed italic">{plan.note}</p>
              <p className="text-sm text-foreground font-bold mb-8 leading-relaxed">{plan.description}</p>
              <div className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1 w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                      {i < 4 ? <Zap size={10} strokeWidth={4} /> : <Check size={10} strokeWidth={4} />}
                    </div>
                    <span className="text-xs font-bold text-foreground/80">{feature}</span>
                  </div>
                ))}
              </div>
              <Button
                className={`w-full h-16 text-lg font-black uppercase italic rounded-2xl ${plan.popular ? "bg-primary" : "bg-secondary hover:bg-secondary/80"}`}
                onClick={onBookNow}
              >
                {(plan as any).custom ? "Start a Conversation" : plan.name === "STARTER SITE" ? "Get My Website" : "Book a Chat"}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WontDo = () => {
  const wont = [
    {
      label: "Enterprise / gov work",
      detail: "SOC2, IRAP, 24/7 on-call rotations and security-cleared projects need a bigger outfit. Oceanalt will refer those out rather than take them on."
    },
    {
      label: "Offshore handoffs",
      detail: "Projects aren't subcontracted to anonymous dev shops. The same people who scope the work write the code and ship the deploy."
    },
    {
      label: "Monthly retainers",
      detail: "No lock-in. Milestone pricing is agreed up front and paid on delivery. Ongoing work after launch is scoped as a fresh milestone."
    },
    {
      label: "Fine-tuning when RAG works",
      detail: "LLM fine-tuning is expensive and rarely the right answer for small businesses. If retrieval-augmented search solves the problem in two weeks, that's what ships."
    },
    {
      label: "Scope that can't be stood behind",
      detail: "Native mobile SDKs, real-time video and research-grade ML pipelines aren't in scope. Projects like those get flagged upfront with a referral."
    },
    {
      label: "Vague timelines",
      detail: "Every engagement starts with a written milestone plan — dates, deliverables, acceptance criteria. If a milestone slips, the extra time is absorbed, not billed."
    },
  ];

  return (
    <section className="py-32 bg-foreground text-background relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_50%,rgba(var(--primary-rgb),0.15),transparent_60%)]" />
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-20">
          <Badge className="mb-6 bg-background/10 text-background border-background/20 uppercase tracking-widest font-black italic">// HONESTY OVER SALES</Badge>
          <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-[0.9] mb-6">
            WHAT OCEANALT <br /><span className="text-primary">WON'T DO.</span>
          </h2>
          <p className="text-xl text-background/60 font-medium leading-relaxed">
            Better to lose a deal than fail a client. Everything below gets turned down or referred out — so fit can be decided early.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wont.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="group p-8 rounded-[2rem] bg-background/5 border border-background/10 hover:border-primary/40 transition-all duration-500"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="mt-0.5 w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                  <X size={12} className="text-primary" strokeWidth={3} />
                </div>
                <h3 className="text-lg font-black uppercase italic tracking-tighter text-background">{item.label}</h3>
              </div>
              <p className="text-background/55 font-medium text-sm leading-relaxed pl-10">{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = ({ onBookNow }: { onBookNow: () => void }) => {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 uppercase tracking-widest font-black italic">// GET IN TOUCH</Badge>
          <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-8">READY TO <span className="text-primary">BUILD?</span></h2>
          <p className="text-xl text-muted-foreground font-medium leading-relaxed max-w-2xl mx-auto">
            Send a brief. Replies come back within 24 hours with a rough scope, a price, and an honest read on fit.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Primary CTA */}
          <div className="p-8 md:p-10 rounded-[2.5rem] bg-primary/5 border border-primary/20 backdrop-blur-xl flex flex-col justify-center items-center text-center lg:col-span-1">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground mb-6 shadow-xl shadow-primary/30">
              <MessageSquare size={28} />
            </div>
            <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-3">SEND A BRIEF</h3>
            <p className="text-muted-foreground font-medium mb-8 text-sm leading-relaxed">Drop a project brief. Replies come back within 24h with scope, price, and an honest read on fit.</p>
            <Button
              className="w-full h-16 text-base font-black uppercase italic rounded-2xl shadow-xl shadow-primary/20"
              onClick={onBookNow}
            >
              Send Brief <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* Free 15-min call — lower friction */}
          <div className="p-8 md:p-10 rounded-[2.5rem] bg-secondary/30 border border-foreground/5 backdrop-blur-xl flex flex-col justify-center items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
              <Zap size={28} />
            </div>
            <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-3">FREE 15-MIN CHAT</h3>
            <p className="text-muted-foreground font-medium mb-8 text-sm leading-relaxed">Not sure where to start? Book a free 15-minute scoping call — no pitch, no obligation.</p>
            <a
              href="mailto:hello@oceanalt.com.au?subject=Free%2015-min%20call%20request"
              className="w-full"
            >
              <Button variant="outline" className="w-full h-16 text-base font-black uppercase italic rounded-2xl border-foreground/10 hover:bg-foreground/5">
                Schedule Call
              </Button>
            </a>
          </div>

          {/* Direct email */}
          <div className="p-8 md:p-10 rounded-[2.5rem] bg-secondary/30 border border-foreground/5 backdrop-blur-xl flex flex-col justify-center items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
              <Globe size={28} />
            </div>
            <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-3">DIRECT EMAIL</h3>
            <p className="text-muted-foreground font-medium mb-8 text-sm leading-relaxed">Prefer email? Send a brief to hello@oceanalt.com.au — reply within 24 hours.</p>
            <a href="mailto:hello@oceanalt.com.au" className="text-lg font-black uppercase italic tracking-tighter text-primary hover:underline break-all">
              hello@oceanalt.com.au
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onNavigate }: { onNavigate: (view: 'home' | 'book' | 'terms' | 'privacy') => void }) => {
  return (
    <footer className="py-20 border-t border-foreground/5 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground">
                <Ship size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter uppercase italic leading-none">Oceanalt</span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Tech Forge</span>
              </div>
            </div>
            <p className="text-muted-foreground font-medium max-w-sm leading-relaxed">
              A solo full-stack practice in Glebe, Sydney. Websites, AI chatbots and small tools for cafés, tradies, coaches and indie SaaS.
            </p>
          </div>
          
          <div>
            <h4 className="font-black uppercase italic tracking-tighter mb-6">Navigation</h4>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">
              <li><a href="#expertise" onClick={() => onNavigate('home')} className="hover:text-primary transition-colors">Expertise</a></li>
              <li><a href="#ai" onClick={() => onNavigate('home')} className="hover:text-primary transition-colors">AI</a></li>
              <li><a href="#seo" onClick={() => onNavigate('home')} className="hover:text-primary transition-colors">SEO</a></li>
              <li><a href="#projects" onClick={() => onNavigate('home')} className="hover:text-primary transition-colors">Projects</a></li>
              <li><a href="#pricing" onClick={() => onNavigate('home')} className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#contact" onClick={() => onNavigate('home')} className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase italic tracking-tighter mb-6">Connect</h4>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">LINKEDIN</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">GITHUB</a></li>
              <li><a href="mailto:hello@oceanalt.com.au" className="hover:text-primary transition-colors">HELLO@OCEANALT.COM.AU</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-foreground/5 gap-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
            © {new Date().getFullYear()} OCEANALT. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
            <button onClick={() => onNavigate('privacy')} className="hover:text-primary transition-colors">PRIVACY POLICY</button>
            <button onClick={() => onNavigate('terms')} className="hover:text-primary transition-colors">TERMS OF SERVICE</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

const LegalPage = ({ title, content, onBack }: { title: string, content: ReactNode, onBack: () => void }) => {
  return (
    <div className="min-h-screen pt-48 pb-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button variant="ghost" className="mb-12 group hover:bg-transparent p-0" onClick={onBack}>
              <ArrowRight className="mr-2 w-4 h-4 rotate-180 group-hover:-translate-x-2 transition-transform" />
              <span className="text-xs font-black uppercase tracking-widest">Back to Home</span>
            </Button>

            <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-12 leading-tight">
              {title}
            </h1>
            
            <div className="prose prose-invert max-w-none text-muted-foreground font-medium leading-relaxed space-y-8">
              {content}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-1 z-[100] bg-primary origin-left"
      style={{ scaleX }}
    />
  );
};

const CustomCursor = () => {
  const isTouch = useRef(window.matchMedia('(pointer: coarse)').matches);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 450 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    if (isTouch.current) return;
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest('button, a, [role="button"]'));
    };
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  if (isTouch.current) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block border-2 border-primary"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        scale: isClicking ? 0.8 : (isHovering ? 2.5 : 1),
        backgroundColor: isHovering ? "rgba(var(--primary-rgb), 0.3)" : "transparent"
      }}
      transition={{ scale: { type: "spring", damping: 25, stiffness: 300, mass: 0.5 } }}
    />
  );
};

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-10 right-10 z-50 w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
        >
          <ArrowRight className="-rotate-90 w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const BookingPage = ({ onBack }: { onBack: () => void }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    try {
      await saveLead({
        name: data.get("name") as string,
        email: data.get("email") as string,
        company: data.get("company") as string,
        budget: data.get("budget") as string,
        projectType: data.get("projectType") as string,
        query: data.get("brief") as string,
        source: 'form',
      });
      setSubmitted(true);
      setTimeout(() => onBack(), 3000);
    } catch {
      setSubmitError("Submission failed. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-48 pb-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button variant="ghost" className="mb-12 group hover:bg-transparent p-0" onClick={onBack}>
              <ArrowRight className="mr-2 w-4 h-4 rotate-180 group-hover:-translate-x-2 transition-transform" />
              <span className="text-xs font-black uppercase tracking-widest">Back to Home</span>
            </Button>

            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 uppercase tracking-widest font-black italic">Send a Brief</Badge>
            <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-8 leading-tight">
              Start a <span className="text-primary">project.</span>
            </h1>
            <p className="text-xl text-muted-foreground font-medium leading-relaxed mb-16">
              Drop a project brief below. Replies come back within 24 hours with a rough scope, a price, and an honest read on fit.
            </p>

            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 rounded-[3rem] bg-primary/5 border border-primary/20 text-center"
              >
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-primary-foreground mx-auto mb-8">
                  <Check size={40} strokeWidth={4} />
                </div>
                <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-4">Brief Received</h3>
                <p className="text-muted-foreground font-medium">Thanks — a reply will land in your inbox within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 p-12 rounded-[3rem] bg-secondary/30 border border-foreground/5 backdrop-blur-xl">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Full Name</Label>
                    <Input name="name" required placeholder="John Doe" className="h-14 rounded-2xl bg-background border-foreground/10 focus:border-primary transition-all" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Company</Label>
                    <Input name="company" required placeholder="Enterprise Ltd" className="h-14 rounded-2xl bg-background border-foreground/10 focus:border-primary transition-all" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Work Email</Label>
                  <Input name="email" required type="email" placeholder="john@enterprise.com.au" className="h-14 rounded-2xl bg-background border-foreground/10 focus:border-primary transition-all" />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Project Type</Label>
                    <select name="projectType" className="w-full h-14 rounded-2xl bg-background border border-foreground/10 focus:border-primary transition-all px-4 text-sm font-medium outline-none">
                      <option>AI / LLM Solutions</option>
                      <option>Enterprise Infrastructure Refresh</option>
                      <option>MVP Forge (New Product)</option>
                      <option>Process Automation</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Budget Range (AUD)</Label>
                    <select name="budget" className="w-full h-14 rounded-2xl bg-background border border-foreground/10 focus:border-primary transition-all px-4 text-sm font-medium outline-none">
                      <option value="">Select a range</option>
                      <option>Under $2k (just need a website)</option>
                      <option>$2k – $10k</option>
                      <option>$10k – $25k</option>
                      <option>$25k – $50k</option>
                      <option>$50k+</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Project Brief</Label>
                  <Textarea name="brief" required placeholder="Describe your vision, goals, and any specific project requirements..." className="min-h-[200px] rounded-2xl bg-background border-foreground/10 focus:border-primary transition-all p-6" />
                </div>

                {submitError && (
                  <p className="text-sm text-red-500 font-medium">{submitError}</p>
                )}

                <Button type="submit" disabled={isSubmitting} className="w-full h-20 text-xl font-black uppercase italic rounded-2xl shadow-2xl shadow-primary/20">
                  {isSubmitting ? (
                    <><Loader2 className="mr-3 w-6 h-6 animate-spin" /> Submitting...</>
                  ) : (
                    <>Submit Brief <ArrowRight className="ml-4 w-6 h-6" /></>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const SmoothSection = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'book' | 'terms' | 'privacy'>('home');
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [demoRoute, setDemoRoute] = useState<DemoRoute | null>(() => parseDemoRoute());

  useEffect(() => {
    const onHash = () => setDemoRoute(parseDemoRoute());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    if (demoRoute) return;
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, [demoRoute]);

  useEffect(() => {
    const timer = setTimeout(() => setIsAppLoading(false), demoRoute ? 400 : 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (demoRoute) return;
    document.title = "Oceanalt — Websites & AI chatbots for small business · Sydney";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", "Solo full-stack builder in Glebe, Sydney. Fast websites, AI chatbots and small internal tools for cafés, tradies, coaches and indie SaaS. Starter sites from $1,499 AUD.");

    if (currentView === 'home' && window.location.hash && !window.location.hash.startsWith('#/')) {
      const id = window.location.hash.substring(1);
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [currentView, demoRoute]);

  const clearDemoHash = () => {
    if (window.location.hash.startsWith('#/')) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
      setDemoRoute(null);
    }
  };

  const handleBookNow = () => {
    clearDemoHash();
    setCurrentView('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    clearDemoHash();
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: 'home' | 'book' | 'terms' | 'privacy') => {
    clearDemoHash();
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (demoRoute && !isAppLoading) {
    return (
      <div id="app-root" className="min-h-screen font-sans">
        <DemoPage route={demoRoute} onBookNow={handleBookNow} onGoHome={handleGoHome} />
      </div>
    );
  }

  return (
    <div id="app-root" className="min-h-screen selection:bg-primary/30 font-sans relative">
      <AnimatePresence mode="wait">
        {isAppLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
            className="fixed inset-0 z-[200] bg-background flex flex-col items-center justify-center gap-10"
          >
            {/* Ambient glow */}
            <div className="absolute w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Logo mark */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 14, stiffness: 180, delay: 0.1 }}
              className="relative"
            >
              {/* Ripple rings */}
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border border-primary/30"
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{ scale: [1, 2.4], opacity: [0.5, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.8, ease: "easeOut" }}
                />
              ))}

              {/* Logo circle */}
              <div className="w-28 h-28 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-[0_24px_80px_rgba(var(--primary-rgb),0.45)] relative z-10">
                {/* Ship icon with animated wave path */}
                <svg
                  viewBox="0 0 24 24"
                  width="56"
                  height="56"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 10.189V14" />
                  <path d="M12 2v3" />
                  <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6" />
                  <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 2.81 7.76" />
                  <motion.path
                    d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
                    animate={{
                      d: [
                        "M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
                        "M2 21c.6-.5 1.2-1 2.5-1 2.5 0 2.5 2 5 2 1.3 0 1.9-.5 2.5-1s1.2-1 2.5-1c2.5 0 2.5 2 5 2 1.3 0 1.9-.5 2.5-1",
                        "M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
                      ]
                    }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  />
                </svg>
              </div>
            </motion.div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-5xl font-black uppercase italic tracking-tighter">Oceanalt</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.45em] text-primary">Tech Forge</span>
            </motion.div>

            {/* Loading dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex gap-2"
            >
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.25, 1, 0.25], scale: [0.75, 1, 0.75] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.22, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 bg-primary rounded-full"
                />
              ))}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative"
          >
            <ScrollProgress />
            <div className="noise" />
            <CustomCursor />
            <BackToTop />
            <Navbar onBookNow={handleBookNow} onNavigate={handleNavigate} currentView={currentView} />
            
            <AnimatePresence mode="wait">
        {currentView === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <main id="main-content">
              <Hero onBookNow={handleBookNow} />
              <SmoothSection><PrototypesSection onBookNow={handleBookNow} /></SmoothSection>
              <SmoothSection><Modernization /></SmoothSection>
              <SmoothSection><AIDelivery /></SmoothSection>
              <SmoothSection><SEOSection /></SmoothSection>
              <SmoothSection><Process /></SmoothSection>
              <SmoothSection><Testimonials /></SmoothSection>
              <SmoothSection><Pricing onBookNow={handleBookNow} /></SmoothSection>
              <SmoothSection><Contact onBookNow={handleBookNow} /></SmoothSection>
            </main>
            <Footer onNavigate={handleNavigate} />
          </motion.div>
        )}

        {currentView === 'book' && (
          <motion.div
            key="book"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <BookingPage onBack={handleGoHome} />
            <Footer onNavigate={handleNavigate} />
          </motion.div>
        )}

        {currentView === 'terms' && (
          <motion.div
            key="terms"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <LegalPage 
              title="Terms of Service" 
              onBack={handleGoHome}
              content={
                <div className="space-y-6">
                  <section>
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter text-foreground mb-4">1. Acceptance of Terms</h2>
                    <p>By accessing or using Oceanalt's services, you agree to be bound by these Terms of Service. If you do not agree, you may not use our services.</p>
                  </section>
                  <section>
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter text-foreground mb-4">2. Services</h2>
                    <p>Oceanalt provides high-performance digital infrastructure, AI engineering, and software development services. Specific project scopes are defined in individual milestone agreements.</p>
                  </section>
                  <section>
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter text-foreground mb-4">3. Intellectual Property</h2>
                    <p>Upon full payment of each milestone, the client owns 100% of the intellectual property, codebase, and models developed during that milestone, unless otherwise specified in writing.</p>
                  </section>
                  <section>
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter text-foreground mb-4">4. Billing and Payments</h2>
                    <p>Oceanalt operates on a milestone-based billing model. Invoices are issued upon client approval of a working milestone build. Payments are due within the timeframe specified on the invoice.</p>
                  </section>
                  <section>
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter text-foreground mb-4">5. Limitation of Liability</h2>
                    <p>Oceanalt shall not be liable for any indirect, incidental, or consequential damages arising out of the use or inability to use our services.</p>
                  </section>
                </div>
              }
            />
            <Footer onNavigate={handleNavigate} />
          </motion.div>
        )}

        {currentView === 'privacy' && (
          <motion.div
            key="privacy"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <LegalPage 
              title="Privacy Policy" 
              onBack={handleGoHome}
              content={
                <div className="space-y-6">
                  <section>
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter text-foreground mb-4">1. Contact</h2>
                    <p>Oceanalt is based in Sydney, Australia. For privacy enquiries, email hello@oceanalt.com.au.</p>
                  </section>
                  <section>
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter text-foreground mb-4">2. What is collected</h2>
                    <p>When a visitor submits the contact form or chats with the AI concierge, Oceanalt collects name, email, company (optional), budget range, project description, and the chat transcript. No cookies beyond those set by the hosting provider, no tracking pixels, no third-party analytics by default.</p>
                  </section>
                  <section>
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter text-foreground mb-4">3. Where it is stored</h2>
                    <p>Submissions are stored in Google Firestore (region: australia-southeast1 or asia-southeast1) and a copy is sent to the Oceanalt inbox via EmailJS. The AI concierge uses Google's Gemini API to generate replies; chat messages are sent to Google as part of that request.</p>
                  </section>
                  <section>
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter text-foreground mb-4">4. How it is used</h2>
                    <p>Submissions are used to reply to enquiries and scope potential projects. Data is not sold, shared with third parties, or used to train any model. Deletion requests are honoured.</p>
                  </section>
                  <section>
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter text-foreground mb-4">5. Rights under the Privacy Act 1988</h2>
                    <p>Visitors may request access to, correction of, or deletion of data Oceanalt holds about them by emailing hello@oceanalt.com.au. Client-project data ownership and compliance obligations (including GDPR for EU clients) are specified in the engagement contract, not claimed on this marketing page.</p>
                  </section>
                </div>
              }
            />
            <Footer onNavigate={handleNavigate} />
          </motion.div>
        )}
      </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      <ChatBot onBookNow={handleBookNow} />
    </div>
  );
}
