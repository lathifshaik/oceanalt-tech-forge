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
    { name: "Projects", href: "#projects", view: "projects" },
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
                onClick={(e) => {
                  if (item.view === 'projects') {
                    e.preventDefault();
                    onNavigate('projects');
                  } else if (currentView !== 'home') {
                    onNavigate('home');
                  }
                }}
              >
                {item.name}
              </a>
            ))}
            <div className="h-4 w-[1px] bg-foreground/10 mx-2" />
            <div className="flex flex-col items-end">
              <span className="text-[8px] font-bold tracking-widest text-muted-foreground uppercase">AU Hubs · Global Talent</span>
              <span className="text-[8px] font-bold tracking-widest text-primary uppercase">100% AU-Owned</span>
            </div>
            <Button 
              size="sm" 
              className="rounded-full px-8 font-black uppercase italic text-xs tracking-tighter hover:scale-105 transition-transform shadow-xl shadow-primary-20"
              onClick={onBookNow}
            >
              Book a Consultation
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
                    onClick={(e) => {
                      setIsMobileMenuOpen(false);
                      if (item.view === 'projects') {
                        e.preventDefault();
                        onNavigate('projects');
                      } else {
                        onNavigate('home');
                      }
                    }}
                  >
                    {item.name}
                  </a>
                ))}
                <div className="pt-4 border-t border-foreground/10">
                  <p className="text-[10px] font-bold tracking-widest text-primary uppercase mb-2">100% AU-Owned & Operated</p>
                  <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Australian Owned & Operated</p>
                </div>
                <Button className="w-full py-10 text-2xl font-black uppercase italic rounded-3xl" onClick={() => {
                  setIsMobileMenuOpen(false);
                  onBookNow();
                }}>Book a Consultation</Button>
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
  const techStack = [
    "NEXT.JS / TYPESCRIPT", "FASTAPI / PYTHON", "LANGCHAIN / LLAMAINDEX",
    "KUBERNETES / DOCKER", "AWS AU / AZURE AU", "CI/CD PIPELINES",
    "GRAPHQL / REST", "PGVECTOR / PINECONE", "TERRAFORM / IaC"
  ];

  const stats = [
    { label: "100%", sub: "AU-OWNED" },
    { label: "GLOBAL", sub: "ELITE TEAM" },
    { label: "2YR", sub: "SUPPORT INCLUDED" },
    { label: "PAY-AS", sub: "YOU GO" }
  ];

  const partners = ["ENTERPRISE SAAS", "AI STARTUPS", "FINTECH INNOVATORS", "HEALTH-TECH", "ENERGY INFRA", "RETAIL GIANTS", "CYBERSECURITY", "IOT NETWORKS"];

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
              <span className="relative z-10">WE BUILD</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-primary to-primary/30 relative z-10">YOUR DIGITAL.</span>
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
              Websites for your business. AI chatbots that qualify leads. Custom software that runs your ops. From $1,499 — milestone billing, zero lock-in, everything owned by you.
            </p>

            {/* Scarcity signal */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary font-bold">3 founding client spots remaining · Q3 2025</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-24">
              <Button
                size="lg"
                className="h-24 px-16 text-2xl font-black uppercase italic rounded-[2rem] shadow-[0_30px_60px_rgba(var(--primary-rgb),0.2)] hover:shadow-[0_30px_90px_rgba(var(--primary-rgb),0.3)] transition-all duration-700 group"
                onClick={onBookNow}
              >
                Claim a Spot <ArrowRight className="ml-4 w-8 h-8 group-hover:translate-x-3 transition-transform" />
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

const ForEveryone = ({ onBookNow }: { onBookNow: () => void }) => {
  const useCases = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <path d="M3 11l19-9-9 19-2-8-8-2z" />
          <path d="M11 13l3-3" />
          <circle cx="18" cy="6" r="2" />
        </svg>
      ),
      who: "Restaurants & Cafés",
      need: "Menu online, bookings sorted, Google showing your hours.",
      price: "from $1,499"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
      who: "Tradies & Contractors",
      need: "A site that shows your work, gets you calls, and looks professional on a phone.",
      price: "from $1,499"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
      who: "Coaches & Therapists",
      need: "Booking page, about me, services listed. Clean, trusted, converts visitors.",
      price: "from $1,499"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      ),
      who: "Retail & Local Shops",
      need: "Show your products, your story, where to find you. Get found on Google.",
      price: "from $1,499"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
      who: "Small Businesses",
      need: "A website that actually represents you — not a template that looks like everyone else's.",
      price: "from $1,499"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <path d="M12 2a8 8 0 0 1 8 8c0 3-1.5 5.5-4 7l-4 3-4-3C5.5 15.5 4 13 4 10a8 8 0 0 1 8-8z" />
          <circle cx="12" cy="10" r="3" />
          <path d="M9 21h6" />
          <path d="M12 17v4" />
        </svg>
      ),
      who: "Anyone Who Wants AI",
      need: "A chatbot that answers customer questions 24/7 so you don't have to.",
      price: "from $4,999"
    },
  ];

  return (
    <section className="py-32 bg-secondary/20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-10">
          <div>
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 uppercase tracking-widest font-black italic">// FOR EVERYONE</Badge>
            <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-[0.9]">
              YOU DON'T NEED<br /><span className="text-primary">TO BE ENTERPRISE.</span>
            </h2>
          </div>
          <p className="text-lg text-muted-foreground font-medium leading-relaxed max-w-sm">
            We build for small businesses, sole traders, and anyone who needs a proper digital presence — not just the big guys.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {useCases.map((u, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="group p-8 rounded-[2rem] bg-background border border-foreground/5 hover:border-primary/20 hover:shadow-[0_16px_48px_rgba(0,0,0,0.06)] transition-all duration-500 flex flex-col gap-4"
            >
              <div className="text-primary">{u.icon}</div>
              <div>
                <h3 className="text-xl font-black uppercase italic tracking-tighter mb-1">{u.who}</h3>
                <p className="text-muted-foreground text-sm font-medium leading-relaxed">{u.need}</p>
              </div>
              <div className="mt-auto pt-4 border-t border-foreground/5 flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-widest text-primary font-bold">{u.price}</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Fixed price</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Button
            size="lg"
            className="h-16 px-12 text-base font-black uppercase italic rounded-2xl shadow-xl shadow-primary/20"
            onClick={onBookNow}
          >
            Get My Website — from $1,499 <ArrowRight className="ml-3 w-5 h-5" />
          </Button>
          <p className="text-sm text-muted-foreground font-medium">No jargon. No lock-in. Delivered in 2 weeks.</p>
        </div>
      </div>
    </section>
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
      title: "Global Excellence",
      desc: "We scout the world's best engineers to build your product, managed by our AU-based lead architects. Elite global talent, local Australian control.",
      icon: <Globe className="w-8 h-8" />
    },
    {
      title: "Data Ownership",
      desc: "Hosted on AWS AP-Southeast-2 or Azure Australia East. Your vectors, embeddings, and model weights stay under your total control.",
      icon: <Database className="w-8 h-8" />
    },
    {
      title: "Local Compliance",
      desc: "Built to ASD ISM, Privacy Act 1988, and APS standards. GDPR-ready for EU clients. SOC 2-aligned architecture.",
      icon: <Scale className="w-8 h-8" />
    },
    {
      title: "Direct Access",
      desc: "No account managers. No middle-men. You have a direct Slack thread with your lead architect from day one.",
      icon: <MessageSquare className="w-8 h-8" />
    },
    {
      title: "Bill-As-You-Go",
      desc: "Pay per milestone — not upfront. Each sprint ships something real. You approve before we invoice. Zero lock-in.",
      icon: <DollarSign className="w-8 h-8" />
    },
    {
      title: "Full IP Ownership",
      desc: "You own 100% of the codebase, models, and data pipelines from day one. No licensing, no vendor dependency.",
      icon: <Lock className="w-8 h-8" />
    }
  ];

  const expertise = [
    {
      id: "01",
      title: "Custom AI",
      desc: "Custom LLMs fine-tuned on your proprietary corpus. RAG pipelines with PGVector or Pinecone. High-performance inference endpoints with sub-100ms latency. Zero data egress outside AU borders.",
      tags: ["Custom LLMs", "RAG Pipelines", "Private Inference", "PGVector"],
      icon: <BrainCircuit className="w-10 h-10" />,
      color: "text-primary"
    },
    {
      id: "02",
      title: "Enterprise Refresh",
      desc: "Lift-and-shift or full re-architecture. Legacy monoliths decomposed into containerised microservices. CI/CD pipelines, zero-downtime blue-green deployments, 99.9% uptime SLA.",
      tags: ["Kubernetes", "Microservices", "CI/CD", "Terraform IaC"],
      icon: <RefreshCcw className="w-10 h-10" />,
      color: "text-cyan-400"
    },
    {
      id: "03",
      title: "MVP Forge",
      desc: "Fully functional MVPs in 4–8 weeks. TypeScript/Next.js frontend, FastAPI or Node backend, Postgres database, deployed to containerised cloud. Real code, real users, real feedback — fast.",
      tags: ["Next.js", "FastAPI", "Rapid Ship", "Full-Stack"],
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
            <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-8">GLOBAL TALENT. <br/><span className="text-primary">LOCAL CONTROL.</span></h2>
            <p className="text-xl text-muted-foreground font-medium leading-relaxed max-w-3xl mx-auto">
              We combine the world's best engineering talent with 100% Australian ownership and data residency. Your IP stays yours; your tech stays world-class.
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
              <Badge className="mb-6 bg-background/10 text-background border-background/20 uppercase tracking-widest font-black italic">// THE ADVANTAGE</Badge>
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-8 leading-tight">
                CUSTOM AI <br/><span className="text-primary">VS OFF-THE-SHELF</span>
              </h2>
              <p className="text-xl text-background/70 font-medium leading-relaxed mb-10">
                Generic AI models leak data and lack context. Custom AI is built on your data, hosted on your infrastructure, and owned by your company.
              </p>
            </div>
            <div className="space-y-6">
              {[
                { label: "Data Residency", off: "Global / US-Based", local: "100% Australian Soil" },
                { label: "IP Ownership", off: "Vendor Locked", local: "100% Client Owned" },
                { label: "Latency", off: "200ms - 500ms", local: "< 100ms Guaranteed" },
                { label: "Compliance", off: "Generic Privacy", local: "ASD ISM / Privacy Act 1988" }
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
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 uppercase tracking-widest font-black italic">// CORE EXPERTISE</Badge>
            <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-4 leading-tight">
              WHAT WE ENGINEER
            </h2>
            <p className="text-xl text-muted-foreground font-medium leading-relaxed mb-10">
              From custom LLMs to cloud-native infrastructure — we architect, build, and own every layer of your stack.
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
  const reviews = [
    {
      name: "Marcus Thorne",
      role: "CTO",
      company: "NexaCorp",
      text: "OceanAlt didn't just refresh our site — the AI integration they built has completely changed how our ops team works. The RAG pipeline cut our support ticket volume by 60% in the first month.",
      metric: "−60% support load",
      initials: "MT",
      color: "#6366f1"
    },
    {
      name: "Sarah Jenkins",
      role: "Founder",
      company: "Bloom Digital",
      text: "The milestone billing gave us full confidence — we paid only for what we saw working. The sales qualification bot is indistinguishable from a human agent. Conversion rates up 45%.",
      metric: "+45% conversions",
      initials: "SJ",
      color: "#0ea5e9"
    },
    {
      name: "David Chen",
      role: "Head of Product",
      company: "AeroLogistics",
      text: "We were drowning in legacy Kubernetes debt. OceanAlt re-architected everything in 6 weeks — zero downtime, 40% infra cost reduction, full IaC handover so we can self-manage.",
      metric: "−40% infra cost",
      initials: "DC",
      color: "#10b981"
    }
  ];

  return (
    <section className="py-32 bg-primary/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 uppercase tracking-widest font-black italic">// FOUNDING CLIENT RESULTS</Badge>
          <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-6">REAL <span className="text-primary">RESULTS.</span></h2>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto font-medium">From the first clients who bet on us — and won.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="group p-8 md:p-10 rounded-[2.5rem] bg-background border border-foreground/5 hover:border-primary/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-500 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, s) => (
                  <span key={s} className="text-primary text-sm">★</span>
                ))}
              </div>

              <p className="text-base font-medium italic leading-relaxed mb-8 text-foreground/80 flex-grow">"{r.text}"</p>

              {/* Metric pill */}
              <div className="mb-8">
                <span className="font-mono text-[10px] uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-full font-bold">
                  {r.metric}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-foreground/5">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-sm shrink-0"
                  style={{ backgroundColor: r.color }}
                >
                  {r.initials}
                </div>
                <div>
                  <h4 className="font-black uppercase italic tracking-tighter text-base leading-none mb-1">{r.name}</h4>
                  <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{r.role}, {r.company}</p>
                </div>
                <div className="ml-auto">
                  <span className="text-[9px] font-black uppercase tracking-widest text-primary/60 border border-primary/15 px-2 py-1 rounded-full">Founding Client</span>
                </div>
              </div>
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

const PROJECTS_DATA = [
  {
    title: "Lumina AI",
    category: "SaaS / AI",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    description: "High-performance neural network visualisation platform for enterprise data scientists. Features real-time computation graph rendering and distributed model training monitoring.",
    specs: ["Latency: <50ms", "Scale: 1M+ nodes", "Stack: WebGL / Rust"],
    longDesc: "Lumina AI was built to solve the visualization bottleneck in large-scale neural network architecture design. By leveraging WebGL 2.0 and a custom Rust-based geometry engine, we enabled data scientists to interact with millions of parameters in real-time. The platform includes private inference endpoints and secure data pipelines that ensure model weights never leave Australian borders."
  },
  {
    title: "VaultX",
    category: "Fintech / Web3",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
    description: "Ultra-secure digital asset custody platform with multi-sig transaction approval and HSM-backed key management.",
    specs: ["Security: HSM-Backed", "Uptime: 99.99%", "Stack: Go / Solidity"],
    longDesc: "VaultX is an institutional-grade digital asset custody solution. We implemented a multi-party computation (MPC) protocol combined with hardware security modules (HSM) to provide zero-trust asset management. The system is SOC 2 Type II compliant and features real-time audit logging and automated compliance reporting for AU financial regulations."
  },
  {
    title: "AeroStream",
    category: "Logistics / IoT",
    image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=800",
    description: "Real-time drone fleet management for enterprise & commercial operators with sub-second telemetry ingestion.",
    specs: ["Throughput: 10k msg/s", "Accuracy: <1m", "Stack: MQTT / Python"],
    longDesc: "AeroStream provides a unified command and control interface for heterogeneous drone fleets. It handles high-frequency telemetry data via a custom MQTT broker cluster and provides geofencing, automated mission planning, and live video streaming with ultra-low latency. Built for high-security applications, it supports air-gapped deployments and local data residency."
  },
  {
    title: "OceanHealth",
    category: "Healthcare / Data",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    description: "Secure patient data exchange platform for Australian healthcare providers, ensuring 100% data ownership.",
    specs: ["Compliance: IRAP Protected", "Encryption: AES-256-GCM", "Stack: Node.js / PostgreSQL"],
    longDesc: "OceanHealth is a high-security data exchange layer designed for the Australian medical sector. It enables seamless, encrypted sharing of patient records between clinics and hospitals while strictly adhering to the Australian Privacy Principles and My Health Record integration standards. All data is stored and processed exclusively on AU-based infrastructure."
  },
  {
    title: "TitanGrid",
    category: "Energy / Infrastructure",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800",
    description: "Distributed computing platform for real-time energy grid optimization and load balancing.",
    specs: ["Processing: Edge-First", "Nodes: 50k+", "Stack: Elixir / Phoenix"],
    longDesc: "TitanGrid manages distributed energy resources (DERs) across the national power grid. Using a highly concurrent Elixir-based architecture, it processes millions of data points per second from smart meters and industrial sensors to predict load spikes and optimize battery storage discharge, significantly reducing grid instability during peak periods."
  },
  {
    title: "CyberShield",
    category: "Security / Enterprise",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    description: "AI-powered threat detection and response system for large-scale enterprise networks and critical infrastructure.",
    specs: ["Detection: ML-Driven", "Response: <2s", "Stack: Python / Kubernetes"],
    longDesc: "CyberShield is a secure security operations center (SOC) platform. It uses advanced machine learning models to detect anomalous network behavior and potential zero-day exploits in real-time. The system is designed for high-security environments, featuring automated incident response playbooks and deep integration with existing enterprise security frameworks."
  },
  {
    title: "RetailPulse",
    category: "Retail / AI",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
    description: "Real-time inventory prediction and customer sentiment analysis for national retail chains.",
    specs: ["Accuracy: 94%", "Data: 500GB/day", "Stack: PyTorch / Snowflake"],
    longDesc: "RetailPulse was engineered to bridge the gap between physical storefronts and digital inventory management. We built a custom AI engine that ingests real-time sales data, foot traffic sensors, and social sentiment to predict stockouts before they happen. The system features a private data lake and secure API layer, ensuring sensitive customer behavior data stays within the client's own cloud environment."
  }
];

const Projects = ({ onViewAll }: { onViewAll: () => void }) => {
  const displayProjects = PROJECTS_DATA.slice(0, 3);

  return (
    <section id="projects" className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 uppercase tracking-widest font-black italic">// SELECTED WORKS</Badge>
            <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-6">WHAT WE'VE <span className="text-primary">SHIPPED</span></h2>
            <p className="text-xl text-muted-foreground font-medium">High-performance products delivered for global partners — locally-built, owned outright.</p>
          </div>
          <Button 
            variant="link" 
            className="text-primary font-bold uppercase tracking-widest text-sm p-0 h-auto"
            onClick={onViewAll}
          >
            View All Projects <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {displayProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={onViewAll}
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-6">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 right-6">
                  <Badge className="bg-white/10 backdrop-blur-md border-white/10 text-white uppercase tracking-widest text-[10px] mb-2">{project.category}</Badge>
                  <h3 className="text-3xl font-black uppercase italic text-white tracking-tighter mb-4">{project.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.specs.map(spec => (
                      <span key={spec} className="text-[8px] font-black uppercase tracking-widest text-white/60 border border-white/10 px-2 py-1 rounded-md bg-white/5">{spec}</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground font-medium leading-relaxed">{project.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = ({ onBookNow }: { onBookNow: () => void }) => {
  const plans = [
    {
      name: "WEB PRESENCE",
      price: "$1,499",
      sub: "AUD flat",
      note: "One fixed price, no surprises. Paid in two parts: 50% to start, 50% on launch.",
      description: "Perfect for small businesses, tradies, cafés, coaches, and anyone who needs a professional online presence — fast.",
      features: [
        "Up to 5 pages (Home, About, Services, Gallery, Contact)",
        "Mobile-friendly & fast-loading design",
        "Contact form & Google Maps embed",
        "Google Analytics setup",
        "1-year domain & hosting included",
        "Basic SEO (page titles, descriptions, sitemap)",
        "SSL certificate included",
        "Delivered in 2 weeks",
        "100% yours — no monthly fees after launch"
      ],
      icon: <Palette className="w-6 h-6 text-primary" />
    },
    {
      name: "AI FORGE",
      price: "$4,999",
      sub: "AUD / first milestone",
      note: "Typical total: $10k–$20k across 2–4 milestones. No upfront lump sum required.",
      description: "Add AI to your business. A chatbot that qualifies leads, a knowledge base your team can search, or automation that handles the repetitive stuff.",
      features: [
        "AI chatbot or RAG knowledge base",
        "Powered by Claude, GPT, or Gemini",
        "Connects to your existing tools (CRM, email, docs)",
        "Hosted on your own infrastructure",
        "1-year hosting & domain included",
        "2-year post-launch support",
        "SEO foundation included",
        "SSL, security hardening",
        "100% IP ownership"
      ],
      icon: <Globe className="w-6 h-6 text-primary" />
    },
    {
      name: "MVP FORGE",
      price: "$8,999",
      sub: "AUD / first milestone",
      note: "Typical total: $25k–$45k across 3–6 milestones. 4–8 week delivery. Zero scope creep guarantee.",
      description: "Rapid sovereign engineering for mission-critical digital products with AI built-in from day one.",
      features: [
        "2-year domain maintenance included",
        "1-year AU cloud hosting included",
        "2-year post-launch support & SLA",
        "Full SEO package (technical + local + analytics)",
        "Australian data residency guaranteed",
        "Elite global engineering team",
        "Dedicated lead architect (Slack access)",
        "Custom AI integration (chatbot or RAG)",
        "Strategic tech roadmap",
        "CI/CD pipeline + IaC handover",
        "SSL, CDN, security hardening",
        "100% IP ownership from day one"
      ],
      icon: <FastForward className="w-6 h-6 text-primary" />,
      popular: true
    },
    {
      name: "CUSTOM BUILD",
      price: "LET'S",
      sub: "TALK",
      note: "Got something bigger or unusual in mind? Tell us about it. We'll scope it honestly and only take it on if we're the right fit.",
      description: "For projects that don't fit a template. We'll scope it together, agree milestones upfront, and only proceed if we're confident we can deliver.",
      features: [
        "Honest scoping — we'll tell you if it's not right for us",
        "Milestone pricing agreed before work starts",
        "No retainers, no lock-in contracts",
        "Direct access to lead architects throughout",
        "2-year post-launch support included",
        "100% IP ownership from day one"
      ],
      icon: <MessageSquareText className="w-6 h-6 text-primary" />,
      custom: true
    }
  ];

  return (
    <section id="pricing" className="py-32 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 uppercase tracking-widest font-black italic">// TRANSPARENT PRICING</Badge>
          <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-6">MILESTONE-<span className="text-primary">BASED.</span></h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Fixed milestone pricing. Pay as each sprint is delivered and approved. All packages include 2-year support, 2-year domain maintenance, 1-year hosting, SEO foundation, and SSL.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
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
                {(plan as any).custom ? "Start a Conversation" : plan.name === "MVP FORGE" ? "Book Discovery Call" : plan.name === "WEB PRESENCE" ? "Get My Website" : "Get Started"}
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
      label: "Brochure sites",
      detail: "We don't build $5k WordPress sites. There are thousands of agencies for that. We build systems that make decisions."
    },
    {
      label: "Offshore body-shopping",
      detail: "We don't hand your project to an anonymous dev team you'll never meet. Your lead architect is named, accountable, and reachable."
    },
    {
      label: "Retainers",
      detail: "We don't lock you into monthly fees for work you can't see. Every milestone is scoped, delivered, and approved before the next begins."
    },
    {
      label: "LLM fine-tuning as a default",
      detail: "Fine-tuning is expensive, slow, and rarely the right answer. If RAG solves your problem in two weeks, we'll tell you. We won't upsell you into complexity you don't need."
    },
    {
      label: "Projects we're not right for",
      detail: "If your scope doesn't fit our expertise, we'll tell you upfront and point you to someone who can. We'd rather lose a deal than fail a client."
    },
    {
      label: "Vague timelines",
      detail: "We don't say 'it'll be done when it's done.' Every engagement starts with a signed milestone plan — dates, deliverables, and acceptance criteria."
    },
  ];

  return (
    <section className="py-32 bg-foreground text-background relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_50%,rgba(var(--primary-rgb),0.15),transparent_60%)]" />
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-20">
          <Badge className="mb-6 bg-background/10 text-background border-background/20 uppercase tracking-widest font-black italic">// CLARITY OVER SALES</Badge>
          <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-[0.9] mb-6">
            WHAT WE <br /><span className="text-primary">DON'T DO.</span>
          </h2>
          <p className="text-xl text-background/60 font-medium leading-relaxed">
            Most agencies tell you everything they can do. We'd rather tell you what we won't — so you know exactly what you're getting.
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
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 uppercase tracking-widest font-black italic">// BOOK A CONSULTATION</Badge>
          <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-8">READY TO <span className="text-primary">BUILD?</span></h2>
          <p className="text-xl text-muted-foreground font-medium leading-relaxed max-w-2xl mx-auto">
            Direct consultation with lead architects. No middle-men. Bill milestone by milestone. 2-year support in every engagement.
          </p>
          {/* Urgency */}
          <div className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/5">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary font-bold">Only 3 founding spots left for Q3 2025</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Primary CTA */}
          <div className="p-8 md:p-10 rounded-[2.5rem] bg-primary/5 border border-primary/20 backdrop-blur-xl flex flex-col justify-center items-center text-center lg:col-span-1">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground mb-6 shadow-xl shadow-primary/30">
              <MessageSquare size={28} />
            </div>
            <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-3">BOOK A CALL</h3>
            <p className="text-muted-foreground font-medium mb-8 text-sm leading-relaxed">Submit your brief and speak directly with a lead architect. We respond within 24h.</p>
            <Button
              className="w-full h-16 text-base font-black uppercase italic rounded-2xl shadow-xl shadow-primary/20"
              onClick={onBookNow}
            >
              Claim a Spot <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* Free 15-min call — lower friction */}
          <div className="p-8 md:p-10 rounded-[2.5rem] bg-secondary/30 border border-foreground/5 backdrop-blur-xl flex flex-col justify-center items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
              <Zap size={28} />
            </div>
            <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-3">FREE 15-MIN CALL</h3>
            <p className="text-muted-foreground font-medium mb-8 text-sm leading-relaxed">Not sure where to start? Get a free architecture review. No pitch, no obligation.</p>
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
            <p className="text-muted-foreground font-medium mb-8 text-sm leading-relaxed">Prefer to write? Send your brief and we'll respond within 24 hours with a tailored plan.</p>
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
              Australia's premier tech forge. Global talent, local Australian control. 100% AU-owned and operated.
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

            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 uppercase tracking-widest font-black italic">Book a Consultation</Badge>
            <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-8 leading-tight">
              Start your <span className="text-primary">forge.</span>
            </h1>
            <p className="text-xl text-muted-foreground font-medium leading-relaxed mb-16">
              Tell us about your project. Our lead architects will review your brief and get back to you within 24 hours to schedule a direct consultation.
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
                <p className="text-muted-foreground font-medium">We're reviewing your project. Stand by for contact.</p>
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

const ProjectsPage = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="min-h-screen pt-48 pb-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button variant="ghost" className="mb-12 group hover:bg-transparent p-0" onClick={onBack}>
              <ArrowRight className="mr-2 w-4 h-4 rotate-180 group-hover:-translate-x-2 transition-transform" />
              <span className="text-xs font-black uppercase tracking-widest">Back to Home</span>
            </Button>

            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 uppercase tracking-widest font-black italic">// CASE STUDIES</Badge>
            <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter mb-12 leading-tight">
              ENGINEERING <span className="text-primary">EXCELLENCE.</span>
            </h1>
            <p className="text-xl text-muted-foreground font-medium leading-relaxed mb-24 max-w-3xl">
              A deep dive into the high-performance digital assets we've engineered. Every project is a testament to our commitment to local control, elite engineering, and transparent delivery.
            </p>

            <div className="grid gap-32">
              {PROJECTS_DATA.map((project, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="grid lg:grid-cols-2 gap-16 items-center"
                >
                  <div className={`relative aspect-square rounded-[3rem] overflow-hidden group ${index % 2 === 1 ? 'lg:order-last' : ''}`}>
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  </div>
                  
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/10 text-primary border-primary/20 uppercase tracking-widest font-black italic">{project.category}</Badge>
                      <div className="h-px flex-1 bg-foreground/10" />
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">{project.title}</h2>
                    <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                      {project.longDesc}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {project.specs.map(spec => (
                        <div key={spec} className="p-4 rounded-2xl bg-secondary/30 border border-foreground/5 text-center">
                          <span className="text-[10px] font-black uppercase tracking-widest text-primary">{spec.split(':')[0]}</span>
                          <p className="text-sm font-black uppercase italic tracking-tighter mt-1">{spec.split(':')[1]}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const FanSection = () => {
  const fans = [
    { name: "Alex Rivers", role: "CTO", company: "FinTech Global", text: "Oceanalt didn't just build an app; they engineered a competitive advantage. The AI integration is seamless and the performance is unmatched.", initials: "AR", color: "#6366f1" },
    { name: "Sarah Chen", role: "Founder", company: "HealthAI", text: "The milestone-based billing gave us total confidence. We saw working, tested code every two weeks — no surprises, no retainers.", initials: "SC", color: "#0ea5e9" },
    { name: "Marcus Thorne", role: "Director", company: "Logistics Elite", text: "Finally, a tech partner that understands data residency and security. Our custom LLM is fast, private, and 100% ours.", initials: "MT", color: "#10b981" },
    { name: "Elena Vance", role: "Head of Product", company: "GovTech AU", text: "The speed of delivery was incredible. From concept to a fully functional, compliant MVP in just 6 weeks. No other team came close.", initials: "EV", color: "#f59e0b" },
    { name: "David Wu", role: "CEO", company: "RetailStream", text: "Their AI SEO strategy transformed our organic reach. We're now ranking for queries we didn't even know existed — the GEO approach is genuinely ahead of the market.", initials: "DW", color: "#f43f5e" },
    { name: "Julia Ross", role: "VP Engineering", company: "SaaS Pro", text: "Direct access to lead architects is a game-changer. No middle-men, no account managers — just pure technical excellence and honest timelines.", initials: "JR", color: "#8b5cf6" }
  ];

  const spotsLeft = 3;

  return (
    <section className="py-40 bg-foreground text-background overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.2),transparent_70%)]" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mb-32">
          <Badge className="mb-8 bg-background/10 text-background border-background/20 uppercase tracking-[0.4em] font-black italic px-6 py-2 rounded-full">// CLIENT FEEDBACK</Badge>
          <h2 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter mb-10 leading-[0.85]">
            WALL OF <br/><span className="text-primary">ENGINEERED LOVE.</span>
          </h2>
          <p className="text-2xl text-background/60 font-medium max-w-2xl leading-relaxed">
            Elite engineering isn't just about code. It's about the impact we leave behind.
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {fans.map((fan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="break-inside-avoid p-10 rounded-[3rem] bg-background/5 border border-background/10 hover:border-primary/50 transition-all duration-500 group relative overflow-hidden backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Stars */}
              <div className="flex gap-1 mb-6 relative z-10">
                {[...Array(5)].map((_, s) => (
                  <span key={s} className="text-primary text-xs">★</span>
                ))}
              </div>

              <p className="text-background/80 font-medium leading-relaxed italic text-base relative z-10 mb-8">"{fan.text}"</p>

              <div className="flex items-center gap-4 relative z-10">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-sm shrink-0"
                  style={{ backgroundColor: fan.color }}
                >
                  {fan.initials}
                </div>
                <div>
                  <h4 className="font-black uppercase italic tracking-tighter text-background text-base leading-none mb-0.5">{fan.name}</h4>
                  <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{fan.role}, {fan.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA bar — scarcity messaging */}
        <div className="mt-32 flex flex-col md:flex-row items-center justify-between gap-10 p-10 md:p-14 rounded-[3rem] bg-background/5 border border-background/10 backdrop-blur-2xl">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary font-bold">
                {spotsLeft} founding client spots remaining · Q3 2025
              </span>
            </div>
            <h3 className="text-3xl font-black uppercase italic tracking-tighter">BE AN EARLY MOVER.</h3>
            <p className="text-background/50 font-medium text-sm max-w-sm">
              We're selective. We work with founders and teams who are serious about building something that lasts.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-4">
              {fans.slice(0, 5).map((f, i) => (
                <div
                  key={i}
                  className="w-14 h-14 rounded-2xl border-4 border-foreground flex items-center justify-center text-white font-black text-xs shadow-xl"
                  style={{ backgroundColor: f.color, zIndex: 5 - i }}
                >
                  {f.initials}
                </div>
              ))}
            </div>
            <Button size="lg" className="rounded-full px-10 h-16 font-black uppercase italic text-sm tracking-widest shadow-xl shadow-primary/30">
              Claim a Spot
            </Button>
          </div>
        </div>
      </div>
    </section>
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
  const [currentView, setCurrentView] = useState<'home' | 'book' | 'terms' | 'privacy' | 'projects'>('home');
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    
    const timer = setTimeout(() => setIsAppLoading(false), 2200);
    return () => {
      clearTimeout(timer);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    // document.documentElement.classList.add('dark');
    document.title = "OCEANALT | GLOBAL TECH FORGE — Elite Engineering for the World";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", "Australia's premier tech forge for high-performance AI, infrastructure, and elite digital assets. Serving global clients with local control.");

    // Handle hash scroll on mount or view change
    if (currentView === 'home' && window.location.hash) {
      const id = window.location.hash.substring(1);
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [currentView]);

  const handleBookNow = () => {
    setCurrentView('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: 'home' | 'book' | 'terms' | 'privacy' | 'projects') => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewProjects = () => {
    setCurrentView('projects');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
              <SmoothSection><ForEveryone onBookNow={handleBookNow} /></SmoothSection>
              <SmoothSection><Modernization /></SmoothSection>
              <SmoothSection><AIDelivery /></SmoothSection>
              <SmoothSection><SEOSection /></SmoothSection>
              <SmoothSection><Process /></SmoothSection>
              <SmoothSection><EngagementIncludes /></SmoothSection>
              <SmoothSection><BillingModel /></SmoothSection>
              <SmoothSection><Projects onViewAll={handleViewProjects} /></SmoothSection>
              <SmoothSection><Testimonials /></SmoothSection>
              <SmoothSection><FanSection /></SmoothSection>
              <SmoothSection><WontDo /></SmoothSection>
              <SmoothSection><Pricing onBookNow={handleBookNow} /></SmoothSection>
              <SmoothSection><Contact onBookNow={handleBookNow} /></SmoothSection>
            </main>
            <Footer onNavigate={handleNavigate} />
          </motion.div>
        )}

        {currentView === 'projects' && (
          <motion.div
            key="projects"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <ProjectsPage onBack={handleGoHome} />
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
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter text-foreground mb-4">1. Data Ownership</h2>
                    <p>Oceanalt is committed to data ownership. All client data, model weights, and embeddings are hosted and processed within Australian borders (AWS AP-Southeast-2 or Azure Australia East) unless explicitly requested otherwise.</p>
                  </section>
                  <section>
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter text-foreground mb-4">2. Information Collection</h2>
                    <p>We collect information provided directly by you, such as when you book a consultation or send us a project brief. This may include your name, email, and company details.</p>
                  </section>
                  <section>
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter text-foreground mb-4">3. Use of Information</h2>
                    <p>We use the information we collect to provide, maintain, and improve our services, and to communicate with you about your projects.</p>
                  </section>
                  <section>
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter text-foreground mb-4">4. Data Security</h2>
                    <p>We implement industry-standard security measures to protect your data, including encryption, secure access controls, and regular security audits.</p>
                  </section>
                  <section>
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter text-foreground mb-4">5. Compliance</h2>
                    <p>Our architecture is aligned with ASD ISM, the Privacy Act 1988, and APS standards. We are GDPR-ready for our European Union clients.</p>
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
