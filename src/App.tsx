/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, MouseEvent, TouchEvent, RefObject, SVGProps } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, Activity, Wind, Droplets, Thermometer, Heart, Calculator, 
  Layers, Fingerprint, Clock, ShieldCheck, BookOpen, Frown, Moon, 
  RefreshCw, AlertCircle, ShieldAlert, Play, Check, CheckCircle2, 
  ChevronDown, Star, Lock, Mail, ExternalLink, HelpCircle, Gift, 
  Users, Instagram, Award, Shield, AlertTriangle, ArrowRight, Bookmark, Flame,
  Menu, MoreVertical, ChevronUp
} from "lucide-react";
import { 
  PAIN_POINTS, COURSE_MODULES, BONUSES, TESTIMONIALS, OBJECTIONS 
} from "./data";

// Helper component to render icons type-safely from the dataset
const IconMapper = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case "Sparkles": return <Sparkles className={className} id="icon-sparkles" />;
    case "Activity": return <Activity className={className} id="icon-activity" />;
    case "Wind": return <Wind className={className} id="icon-wind" />;
    case "Droplets": return <Droplets className={className} id="icon-droplets" />;
    case "Thermometer": return <Thermometer className={className} id="icon-thermometer" />;
    case "Heart": return <Heart className={className} id="icon-heart" />;
    case "Calculator": return <Calculator className={className} id="icon-calculator" />;
    case "Layers": return <Layers className={className} id="icon-layers" />;
    case "Fingerprint": return <Fingerprint className={className} id="icon-fingerprint" />;
    case "Clock": return <Clock className={className} id="icon-clock" />;
    case "ShieldCheck": return <ShieldCheck className={className} id="icon-shieldcheck" />;
    case "BookOpen": return <BookOpen className={className} id="icon-bookopen" />;
    case "Frown": return <Frown className={className} id="icon-frown" />;
    case "Moon": return <Moon className={className} id="icon-moon" />;
    case "RefreshCw": return <RefreshCw className={className} id="icon-refreshcw" />;
    case "AlertCircle": return <AlertCircle className={className} id="icon-alertcircle" />;
    case "ShieldAlert": return <ShieldAlert className={className} id="icon-shieldalert" />;
    case "Play": return <Play className={className} id="icon-play" />;
    case "Menu": return <Menu className={className} id="icon-menu" />;
    case "MoreVertical": return <MoreVertical className={className} id="icon-more-vertical" />;
    case "ChevronUp": return <ChevronUp className={className} id="icon-chevron-up" />;
    default: return <Sparkles className={className} id="icon-default" />;
  }
};

export default function App() {
  const checkoutUrl = "https://pay.kiwify.com.br/AtsMCOK";

  // State: Countdown Timer for Urgency
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem("sos_timer_v2");
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed > 0) return parsed;
    }
    return 15 * 60; // 15 minutes default
  });

  // State: Interactive testimonial category filter
  const [selectedTag, setSelectedTag] = useState<string>("Todos");

  // State: Interactive Symptoms Evaluator
  const [selectedSymps, setSelectedSymps] = useState<string[]>([]);
  const [evaluatedResult, setEvaluatedResult] = useState<boolean>(false);

  // State: Objection Accordion item index
  const [openObjection, setOpenObjection] = useState<string | null>(null);

  // State: Expanded modules
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    if (COURSE_MODULES.length > 0) {
      initial[COURSE_MODULES[0].id] = true;
    }
    return initial;
  });

  const toggleModule = (id: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // State: Slider before/after view position
  const [slidePos, setSlidePos] = useState<number>(50);
  const [isSlideDragging, setIsSlideDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // State: Notification toasts
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Refs for smooth navigation jumping
  const modulesRef = useRef<HTMLDivElement>(null);
  const offerRef = useRef<HTMLDivElement>(null);

  // Effect: Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          localStorage.setItem("sos_timer_v2", (15 * 60).toString());
          return 15 * 60; // reset to 15m gracefully
        }
        const updated = prev - 1;
        localStorage.setItem("sos_timer_v2", updated.toString());
        return updated;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Effect: Random purchase notifications simulator for high-energy social proof
  useEffect(() => {
    const names = [
      "Juliana de São Paulo/SP", "Mariana de Belo Horizonte/MG", "Clara de Curitiba/PR", 
      "Gabriela de Porto Alegre/RS", "Aline do Rio de Janeiro/RJ", "Patrícia de Salvador/BA", 
      "Carolina de Brasília/DF", "Vanessa de Campinas/SP", "Larissa de Joinville/SC"
    ];
    
    const triggerToast = () => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      setToastMessage(`✨ ${randomName} acabou de adquirir o SOS Respiratório Infantil!`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    };

    // Initial toast after 10s, then cycle every 60s
    const initialTimer = setTimeout(triggerToast, 10000);
    const interval = setInterval(triggerToast, 120000);
    
    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  // Format countdown string
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Calculator logic removed

  // Pain points checklist triggers
  const handleToggleSymptom = (id: string) => {
    if (selectedSymps.includes(id)) {
      setSelectedSymps(selectedSymps.filter((s) => s !== id));
    } else {
      setSelectedSymps([...selectedSymps, id]);
    }
    setEvaluatedResult(false);
  };

  const handleEvaluateSymptoms = () => {
    setEvaluatedResult(true);
    // Smooth scroll down to interactive recommendation result
    setTimeout(() => {
      const el = document.getElementById("diagnostic-result");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  // Scroll handler for button clicks
  const scrollToRef = (ref: RefObject<HTMLDivElement | null>) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Helper to calculate and set percentage based on clientX
  const handleSlideUpdate = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const offset = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (offset / rect.width) * 100));
    setSlidePos(percentage);
  };

  const handleSlideMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsSlideDragging(true);
    handleSlideUpdate(e.clientX);
  };

  const handleSlideTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setIsSlideDragging(true);
    if (e.touches.length > 0) {
      handleSlideUpdate(e.touches[0].clientX);
    }
  };

  // Track dragging outside the container limits
  useEffect(() => {
    if (!isSlideDragging) return;

    const handleGlobalMouseMove = (e: globalThis.MouseEvent) => {
      handleSlideUpdate(e.clientX);
    };

    const handleGlobalTouchMove = (e: globalThis.TouchEvent) => {
      if (e.touches.length > 0) {
        handleSlideUpdate(e.touches[0].clientX);
      }
    };

    const handleGlobalRelease = () => {
      setIsSlideDragging(false);
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    window.addEventListener("mouseup", handleGlobalRelease);
    window.addEventListener("touchmove", handleGlobalTouchMove, { passive: true });
    window.addEventListener("touchend", handleGlobalRelease);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleGlobalRelease);
      window.removeEventListener("touchmove", handleGlobalTouchMove);
      window.removeEventListener("touchend", handleGlobalRelease);
    };
  }, [isSlideDragging]);

  // Tags calculated for social testimonials
  const testimonialTags = ["Todos", "Nariz escorrendo", "Tosse", "Uso Seguro", "Imunidade"];
  const filteredTestimonials = selectedTag === "Todos"
    ? TESTIMONIALS
    : TESTIMONIALS.filter(t => t.tags.some(tag => tag.toLowerCase().includes(selectedTag.toLowerCase().slice(0, 5))));

  return (
    <div className="bg-warm-50 text-brand-900 font-sans antialiased min-h-screen relative" id="app-container">
      
      {/* FIXED HEADER WRAPPER */}
      <div className="sticky top-0 w-full z-50 flex flex-col">
        {/* ⚡ TOP CONVERSION HEADER ALERT */}
        <div className="bg-brand-900 text-brand-100 text-[11px] sm:text-xs py-2 px-4 font-medium tracking-normal text-center flex justify-center items-center gap-1.5 sm:gap-3 border-b border-brand-800 shadow-sm" id="alert-bar">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-gold"></span>
          </span>
          <span className="text-warm-100">
            PROMOÇÃO EXCLUSIVA: O Treinamento Completo + 5 Bônus Especiais sai de <span className="line-through opacity-70">R$97</span> por apenas <span className="font-bold text-white bg-brand-800/80 px-1.5 py-0.5 rounded">R$ 37</span>!
          </span>
          <span className="hidden md:inline font-mono text-amber-gold">
            {formatTime(timeLeft)}
          </span>
        </div>

        {/* COMPACT HEADLINE */}
        <header className="bg-white/95 backdrop-blur-md border-b border-brand-100/60 shadow-xs transition-all" id="sticky-header">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="bg-brand-50 text-brand-600 p-1.5 rounded-full border border-brand-100 hidden sm:block">
              <LeafIcon className="h-4 w-4" />
            </span>
            <div>
              <h1 className="font-serif font-bold text-base sm:text-lg text-brand-800 tracking-tight leading-none">Miriam Nardin</h1>
              <span className="text-[10px] sm:text-xs text-brand-500 font-medium">Aromaterapia Infantil & Cuidado Integral</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-4">
            <div className="hidden lg:flex items-center gap-2 text-xs text-brand-600 font-medium">
              <Users className="h-3.5 w-3.5 text-brand-500" />
              <span>Mais de 1.480 mães alunas</span>
            </div>
            
            <a 
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-vibrant-orange hover:bg-vibrant-orange-hover text-white font-semibold text-xs sm:text-sm py-2 px-4 sm:px-5.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-1.5 leading-none uppercase tracking-wide"
              id="header-cta"
            >
              <span>🌿 COMPRAR</span>
              <ArrowRight className="h-3.5 w-3.5 hidden sm:inline" />
            </a>
          </div>
        </div>
      </header>
      </div>

      {/* 🌿 SECTION 1: HERO (Primeira dobra) */}
      <section className="relative pt-12 pb-20 sm:pt-16 sm:pb-28 overflow-hidden bg-gradient-to-b from-brand-50/50 via-warm-100/35 to-warm-50" id="hero-section">
        {/* Subtle decorative background organic shape */}
        <div className="absolute top-20 right-[-10%] w-72 h-72 rounded-full bg-brand-100/30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-[-5%] w-60 h-60 rounded-full bg-brand-200/20 blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          
          {/* Animated Float Tag */}
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white text-gray-800 text-xs font-semibold uppercase tracking-wider mb-6 sm:mb-8 border border-gray-200 shadow-sm"
            id="hero-badge"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-gold fill-amber-gold animate-pulse" />
            <span>Treinamento Prático Completo + 5 Bônus</span>
          </motion.div>

          {/* Título Principal */}
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-sans text-3xl sm:text-5xl md:text-6xl font-extrabold text-black tracking-tight leading-[1.1] mb-6"
            id="hero-main-title"
          >
            SOS Respiratório Infantil
          </motion.h2>

          {/* Subtitle emocional com os óleos essenciais */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-xl text-brand-700/90 font-serif leading-relaxed max-w-3xl mx-auto mb-6 px-1"
            id="hero-extended-subtitle"
          >
            Aprenda a agir com <strong className="text-brand-900 font-semibold underline decoration-brand-400 decoration-3">mais segurança</strong> quando seu filho apresentar tosse, rinite, resfriado e outros sintomas respiratórios utilizando os óleos essenciais de forma simples, natural e livre de riscos.
          </motion.p>

          {/* Subtítulo complementar */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm sm:text-base text-brand-600/80 max-w-2xl mx-auto mb-10 leading-relaxed font-sans"
            id="hero-body"
          >
            Pare de se sentir perdida quando seu filho adoece. Aprenda a construir sua própria <strong className="text-brand-800 font-semibold">Farmácia Natural</strong> em casa e saiba exatamente o que fazer nos primeiros sinais.
          </motion.p>

          {/* CTA Group */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col items-center justify-center gap-4 mb-8"
            id="hero-cta-wrapper"
          >
            <a 
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-vibrant-orange hover:bg-vibrant-orange-hover text-white font-bold text-base sm:text-lg px-8 sm:px-12 py-4.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 uppercase tracking-wide"
              id="hero-cta-btn"
            >
              <span>🌿 ADQUIRA AGORA</span>
              <ArrowRight className="h-5 w-5" />
            </a>

            {/* Price tag preview below button */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-brand-600/95 font-medium bg-brand-100/50 backdrop-blur-xs py-1.5 px-4 rounded-full border border-brand-200/40">
              <span className="line-through text-brand-400">R$ 97,00</span>
              <span className="font-extrabold text-brand-800">Por apenas R$ 37,00</span>
              <span className="text-[10px] bg-amber-gold text-white font-semibold py-0.5 px-2 rounded-full leading-none">61% OFF</span>
            </div>
          </motion.div>

          {/* Trust points */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto text-brand-700/90 text-xs sm:text-sm font-semibold border-t border-brand-200/40 pt-8"
            id="hero-highlights"
          >
            <div className="flex items-center justify-center gap-2 bg-white/70 py-2.5 px-4 rounded-xl border border-brand-100 shadow-2xs">
              <span className="text-brand-600 select-none">✔️</span>
              <span className="font-sans">Acesso imediato</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-white/70 py-2.5 px-4 rounded-xl border border-brand-100 shadow-2xs">
              <span className="text-brand-600 select-none">✔️</span>
              <span className="font-sans">Aulas práticas</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-white/70 py-2.5 px-4 rounded-xl border border-brand-100 shadow-2xs">
              <span className="text-brand-600 select-none">✔️</span>
              <span className="font-sans">Aplicação simples para mães</span>
            </div>
          </motion.div>

          {/* Security details row */}
          <div className="flex items-center justify-center gap-6 mt-8 opacity-60 text-[10px] sm:text-xs text-brand-500" id="trust-seals-row">
            <span className="flex items-center gap-1">
              <Lock className="h-3 w-3 inline text-brand-600" />
              Checkout 100% Seguro
            </span>
            <span className="flex items-center gap-1">
              <Shield className="h-3 w-3 inline text-brand-600" />
              Garantia de 7 Dias inclusa
            </span>
            <span className="flex items-center gap-1">
              <Award className="h-3 w-3 inline text-brand-600" />
              Curso Miriam Nardin
            </span>
          </div>

        </div>

        {/* Dynamic Curved Botanical Separator */}
        <div className="absolute bottom-0 left-0 right-0 h-10 w-full overflow-hidden pointer-events-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full text-warm-100 fill-current">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" />
          </svg>
        </div>
      </section>

      {/* 🌿 SECTION 2: INTERACTIVE SYMPTOMS & PAIN (Seção Dor + Identificação) */}
      <section className="bg-warm-100 py-16 sm:py-24 relative" id="pain-section">
        <div className="max-w-6xl mx-auto px-4">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-brand-900 tracking-tight mb-4">
              Você se identifica com algumas dessas situações?
            </h3>
            <p className="text-sm sm:text-base text-brand-600 max-w-2xl mx-auto leading-relaxed">
              Selecione abaixo os sintomas ou sentimentos que você mais lida hoje no seu lar:
            </p>
          </div>

          {/* Interactive Pain Points Selector Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto mb-12" id="pain-grid-container">
            {/* Left side column: Child image with cold symptom */}
            <div className="lg:col-span-4 flex flex-col justify-start">
              <div className="bg-white p-3.5 rounded-2xl border border-brand-100 shadow-xs overflow-hidden sticky top-24">
                <div className="relative aspect-[4/5] h-64 sm:h-72 w-full rounded-xl overflow-hidden mb-4">
                  <img 
                    src="/crianca2.jpg" 
                    alt="Criança doente com nariz escorrendo" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
                </div>
                <h4 className="font-serif font-bold text-base text-brand-900 mb-1 leading-snug px-1">
                  Tristeza de ver o filho doente...
                </h4>
              </div>
            </div>

            {/* Right side: Pain grid taking 8 columns */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4" id="pain-grid">
              {PAIN_POINTS.map((pain) => {
                const isSelected = selectedSymps.includes(pain.id);
                return (
                  <div 
                    key={pain.id}
                    id={`pain-item-${pain.id}`}
                    onClick={() => handleToggleSymptom(pain.id)}
                    className={`group relative cursor-pointer overflow-hidden rounded-2xl p-5 border transition-all duration-300 text-left select-none ${
                      isSelected 
                        ? "bg-brand-900 border-brand-800 text-white shadow-md translate-y-[-2px]" 
                        : "bg-white border-brand-100 hover:border-brand-200/80 hover:shadow-sm text-brand-900"
                    }`}
                  >
                    {/* Decorative tick for selection */}
                    <div className="absolute top-4 right-4.5">
                      <span className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isSelected ? "bg-amber-gold text-brand-900" : "bg-brand-50 border border-brand-200/50 text-transparent"
                      }`}>
                        ✓
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-xl transition-colors ${
                        isSelected ? "bg-brand-800 text-brand-200" : "bg-brand-50 text-brand-600 group-hover:bg-brand-100"
                      }`}>
                        <IconMapper name={pain.icon} className="h-4.5 w-4.5" />
                      </div>
                      <h4 className={`font-serif text-sm sm:text-base font-bold leading-tight ${isSelected ? "text-white" : "text-brand-900"}`}>
                        {pain.text}
                      </h4>
                    </div>

                    <p className={`text-xs leading-relaxed ${
                      isSelected ? "text-brand-100" : "text-brand-600"
                    }`}>
                      {pain.subtext}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Symptom Checker Dynamic Diagnostic Result Box */}
          <div className="max-w-2xl mx-auto text-center">
            {selectedSymps.length === 0 ? (
              <p className="text-xs sm:text-sm italic text-brand-500">
                💡 Toque nos cartões acima para selecionar e obter uma recomendação de Miriam sobre cada questão.
              </p>
            ) : (
              <div className="bg-white p-1 rounded-2xl border border-brand-100 shadow-sm transition-all animate-fade-in">
                <div className="p-6 sm:p-8">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-800 bg-brand-50 border border-brand-100 py-1.5 px-3.5 rounded-full mb-4">
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand-600" />
                    <span>{selectedSymps.length} {selectedSymps.length === 1 ? "sintoma selecionado" : "sintomas selecionados"}</span>
                  </div>

                  <h4 className="font-serif text-lg sm:text-xl font-bold text-brand-900 mb-3">
                    Se você respondeu <span className="text-brand-700 italic">sim</span> para essas situações, leia com atenção:
                  </h4>
                  
                  <p className="text-sm text-brand-600 mb-6 leading-relaxed">
                    Você não está sozinha. Esse treinamento foi inteiramente desenhado para acalmar seu coração de mãe e criar a segurança necessária. O SOS Respiratório possui aulas em vídeo curtas ensinando protocolos exatos para cada uma das situações marcadas acima.
                  </p>

                  <button
                    onClick={handleEvaluateSymptoms}
                    className="bg-brand-100 hover:bg-brand-200 text-brand-800 font-bold text-xs sm:text-sm py-3 px-6 sm:px-8 rounded-xl border border-brand-200 transition-all cursor-pointer"
                    id="btn-evaluate-sys"
                  >
                    Ver Como o Treinamento Resolve Isso!
                  </button>

                  <AnimatePresence>
                    {evaluatedResult && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 pt-6 border-t border-brand-100 text-left"
                        id="diagnostic-result"
                      >
                        <div className="bg-brand-50/70 p-4.5 rounded-xl border border-brand-100/50">
                          <h5 className="text-xs sm:text-sm font-bold text-brand-800 flex items-center gap-1.5 mb-2.5">
                            <LeafIcon className="h-4 w-4" />
                            Prescrição Conceitual da Miriam:
                          </h5>
                          <ul className="space-y-2 text-xs sm:text-sm text-brand-700/90 list-disc pl-5">
                            {selectedSymps.includes("nose") && (
                              <li><strong>Nariz Escorrendo/Rinite:</strong> No módulo 5, você aprenderá as aplicações suaves de Melaleuca e Copaíba, ideais para modular a barreira de proteção histamínica do nariz infantil sem efeito rebote.</li>
                            )}
                            {selectedSymps.includes("cough") && (
                              <li><strong>Tossa Noturna:</strong> No módulo 3 e 4, cobrimos de forma precisa as diferenças entre tosse seca e produtiva. Você receberá a sinergia de Cipreste e Lavanda para massagear o peitinho do bebê antes de dormir.</li>
                            )}
                            {selectedSymps.includes("cycle") && (
                              <li><strong>Ciclo Sem Fim:</strong> O módulo 11 foca no Protocolo de Fortalhamento de Imunidade Preventivo. Vamos usar fitoterápicos e aromaterapia diária leve para quebrar o ciclo de contágio recorrente.</li>
                            )}
                            {selectedSymps.includes("lost") && (
                              <li><strong>Falta de Rumo nos Sinais:</strong> O módulo 2 aborda o Checklist Clínico de Mãe. Você compreenderá os tempos ideais e saberá identificar o momento de observar em casa versus buscar auxílio médico.</li>
                            )}
                            {selectedSymps.includes("fear") && (
                              <li><strong>Medo de Errar Dosagem:</strong> O módulo 7 conta com um simulador interativo em tabela para diluições de 0.1% a 2.0% exato por idade. Segurança máxima para que você se sinta calma e dona da situação.</li>
                            )}
                            {selectedSymps.includes("start") && (
                              <li><strong>Por Onde Começar:</strong> O guia estruturado em 12 aulas foca nos top 10 óleos que cabem no bolso de qualquer família brasileira. Não precisa comprar dezenas de itens caros.</li>
                            )}
                          </ul>
                          
                          <div className="mt-5 text-center">
                            <button 
                              onClick={() => scrollToRef(modulesRef)}
                              className="text-brand-700 hover:text-brand-900 font-bold text-xs underline decoration-brand-400 cursor-pointer"
                            >
                              Ver toda a grade horária de aulas abaixo ↓
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 🌿 SECTION 3: INTERACTIVE HOPE SLIDER & BRIDGE (Solução) */}
      <section className="bg-white py-16 sm:py-24 overflow-hidden" id="solution-section">
        <div className="max-w-5xl mx-auto px-4">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-brand-900 tracking-tight leading-snug">
              Existe um caminho seguro entre o desespero da crise e o bem-estar contínuo do seu filho
            </h3>
          </div>

          <p className="text-sm sm:text-base text-brand-600 max-w-3xl mx-auto text-center leading-relaxed mb-12">
            Como Aromaterapeuta Infantil, meu objetivo principal é te ajudar a criar uma verdadeira <strong className="text-brand-800 font-semibold">Farmácia Natural em casa</strong>, para que você tenha mais autonomia e absoluta segurança na rotina com o seu filho.
          </p>

          {/* Interactive Before/After Visual Slider */}
          <div className="max-w-3xl mx-auto mb-14" id="slider-card-wrapper">
            <div className="bg-warm-100 rounded-2xl p-1 border border-brand-100 shadow-sm overflow-hidden">
              <div className="p-4 bg-white rounded-t-xl border-b border-brand-50 text-center text-xs sm:text-sm text-brand-600 font-medium">
                👉 Use as alavancas ou toque para contrastar a realidade atual com a que você pode adquirir hoje:
              </div>

              {/* Before vs After Frame */}
              <div 
                ref={containerRef}
                onMouseDown={handleSlideMouseDown}
                onTouchStart={handleSlideTouchStart}
                className="relative h-80 sm:h-96 w-full cursor-ew-resize select-none overflow-hidden"
                id="interactive-comparison"
              >
                {/* AFTER side (Harmony) */}
                <div className="absolute inset-0 bg-brand-50 flex flex-col justify-center px-6 sm:px-12 text-left">
                  <div className="max-w-md">
                    <span className="text-xs bg-brand-600 text-white font-semibold py-1 px-3.5 rounded-full uppercase tracking-wider mb-3.5 inline-block shadow-2xs">
                      Cuidado Natural & Autonomia (DEPOIS)
                    </span>
                    <h4 className="font-serif text-2xl sm:text-3.5xl font-bold text-brand-900 mb-3.5 leading-tight">
                      Mãe segura, filho calmo respirando leve
                    </h4>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-brand-800 font-medium">
                      <li className="flex items-center gap-2">
                        <Check className="h-4.5 w-4.5 text-brand-600 flex-shrink-0" />
                        <span>Sono limpo, tosse sob controle nas noites de frio</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4.5 w-4.5 text-brand-600 flex-shrink-0" />
                        <span>Saber a dosagem precisa em gotas para a idade correta</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4.5 w-4.5 text-brand-600 flex-shrink-0" />
                        <span>Ambiente de casa seguro livre de químicos pesados sintéticos</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4.5 w-4.5 text-brand-600 flex-shrink-0" />
                        <span>Sinergias prontas para uso preventivo da imunidade</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* BEFORE side (Crisis) - clipped layout */}
                <div 
                  className="absolute inset-y-0 left-0 bg-rose-50 border-r border-amber-gold/50 overflow-hidden"
                  style={{ width: `${slidePos}%` }}
                >
                  <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 text-left w-full min-w-[320px] sm:min-w-[600px]">
                    <div className="max-w-md">
                      <span className="text-xs bg-rose-600 text-white font-semibold py-1 px-3.5 rounded-full uppercase tracking-wider mb-3.5 inline-block shadow-2xs">
                        Crise & Insegurança (ANTES)
                      </span>
                      <h4 className="font-serif text-2xl sm:text-3.5xl font-bold text-rose-950 mb-3.5 leading-tight">
                        Sono cortado pela tosse e pânico à noite
                      </h4>
                      <ul className="space-y-2.5 text-xs sm:text-sm text-rose-800 font-medium opacity-90">
                        <li className="flex items-center gap-2">
                          <AlertTriangle className="h-4.5 w-4.5 text-rose-600 flex-shrink-0" />
                          <span>Coração apertado vendo o nariz da criança trancado</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <AlertTriangle className="h-4.5 w-4.5 text-rose-600 flex-shrink-0" />
                          <span>Dúvidas assustadoras se o óleo essencial pode queimar a pele</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <AlertTriangle className="h-4.5 w-4.5 text-rose-600 flex-shrink-0" />
                          <span>Correr para o PS para tomar antialérgico de emergência</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <AlertTriangle className="h-4.5 w-4.5 text-rose-600 flex-shrink-0" />
                          <span>Sensação de culpa de não estar agindo do jeito certo</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Vertical handle */}
                <div 
                  className="absolute inset-y-0 w-8 flex items-center justify-center cursor-ew-resize pointer-events-none"
                  style={{ left: `calc(${slidePos}% - 16px)` }}
                >
                  <div className="h-full w-1 bg-amber-gold" />
                  <div className="absolute h-9 w-9 rounded-full bg-white border-2 border-amber-gold shadow-md flex items-center justify-center text-amber-gold font-mono text-xs font-black">
                    ↔
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="bg-brand-50/40 rounded-3xl border border-brand-100 max-w-4xl mx-auto overflow-hidden shadow-xs hover:shadow-sm transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-stretch">
              
              {/* Left Column: Image of Child using nebulizer */}
              <div className="md:col-span-5 relative h-56 md:h-auto min-h-[240px]">
                <img 
                  src="/crianca1.jpg" 
                  alt="Criança praticando inalação de forma segura" 
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-brand-900/10 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Right Column: Narrative content */}
              <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center text-left">
                <span className="text-[10px] font-bold text-brand-600 bg-brand-100/60 py-1 px-3 rounded-full uppercase tracking-wider mb-3.5 mr-auto">
                  Cuidado Empático & Natural
                </span>
                <h4 className="font-serif text-lg sm:text-xl font-bold text-brand-900 mb-3.5">
                  Não se trata apenas de amenizar ou anestesiar sintomas infantis.
                </h4>
                <div className="text-xs sm:text-sm text-brand-700 leading-relaxed space-y-3.5">
                  <p>Trata-se de aprender a agir com consciência real, entender o que o corpo e os pulmões do seu filho estão tentando comunicar e saber conduzir o processo de cura com as armas que a natureza nos dá.</p>
                  <p>O SOS Respiratório foi planejado para ser o seu guia de bolso definitivo. Sem enrolação acadêmica, puramente focado em protocolos diretos para o alívio que você precisa.</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>



      {/* 🌿 SECTION 5: WHAT YOU WILL LEARN (O que vai aprender) */}
      <section ref={modulesRef} className="bg-white py-16 sm:py-24 relative" id="modules-section">
        <div className="max-w-6xl mx-auto px-4">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-gray-800 tracking-widest uppercase bg-gray-100 border border-gray-200 px-3 py-1 rounded-full mb-3 inline-block">
              Ementa Completa
            </span>
            <h3 className="font-sans text-2xl sm:text-4xl font-extrabold text-black tracking-tight leading-snug">
              Veja por dentro tudo o que você vai dominar no treinamento
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mt-4 max-w-xl mx-auto font-medium">
              Aulas diretas de 5 a 10 minutos, sem rodeios ou termos técnicos complexos, prontas para visualização imediata.
            </p>
          </div>

          <div className="flex flex-col gap-6 max-w-3xl mx-auto" id="modules-list">
            {COURSE_MODULES.map((mod) => {
              const isExpanded = expandedModules[mod.id] ?? false;

              return (
              <div 
                key={mod.id}
                id={`module-item-${mod.id}`}
                className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden transition-all duration-300"
              >
                {/* Header */}
                <button 
                  onClick={() => toggleModule(mod.id)}
                  className="w-full text-left flex items-center justify-between p-4 sm:p-5 border-b border-gray-100 bg-gray-50/50 hover:bg-gray-100/70 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400"><IconMapper name="Menu" className="w-5 h-5 hidden sm:block" /></span>
                    <div className="w-5 h-5 border border-gray-200 rounded-md bg-white"></div>
                    <h4 className="font-sans font-medium text-lg text-black uppercase tracking-wide ml-1">
                      {mod.title}
                    </h4>
                    <span className="ml-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-indigo-50 text-indigo-600 text-xs font-semibold">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                      {mod.itemCount} conteúdos
                    </span>
                  </div>
                  <div className="text-gray-500 border border-gray-200 rounded-md p-1 bg-white shadow-xs">
                    <IconMapper name="MoreVertical" className="w-5 h-5" />
                  </div>
                </button>
                
                {/* Arrow space */}
                <button 
                  onClick={() => toggleModule(mod.id)}
                  className="w-full bg-slate-50 border-b border-gray-100 flex justify-center py-2 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
                    <IconMapper name="ChevronDown" className="w-5 h-5 text-gray-500" />
                  </div>
                </button>

                {/* Contents list */}
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden flex flex-col">
                    {mod.contents.map((content, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-100 last:border-0 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-3 w-3/4">
                          <span className="text-gray-300"><IconMapper name="Menu" className="w-4 h-4 hidden sm:block" /></span>
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border border-gray-200 rounded text-transparent bg-white flex-shrink-0"></div>
                          <span className="font-sans text-sm sm:text-base text-gray-600 uppercase tracking-widest border-b border-dashed border-gray-300 pb-0.5 truncate max-w-full">
                            {content.title}
                          </span>
                        </div>
                        <span className="flex-shrink-0 ml-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                          Publicado
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )})}
          </div>

        </div>
      </section>

      {/* 🌿 SECTION 6: BONUSES (Bônus Especiais) */}
      <section className="bg-warm-100 py-16 sm:py-24 relative overflow-hidden" id="bonuses-section">
        {/* Decorative elements */}
        <div className="absolute top-[-50px] right-[-50px] w-96 h-96 rounded-full bg-brand-200/20 blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold text-brand-600 tracking-wider uppercase bg-brand-100 px-3 py-1 rounded-full mb-3 inline-block">
              Super Pacote
            </span>
            <h3 className="font-serif text-3xl sm:text-4.5xl font-bold text-brand-900 tracking-tight leading-none mb-4">
              Bônus Especiais Inclusos Gratuitamente
            </h3>
            <p className="text-sm sm:text-base text-brand-600 max-w-xl mx-auto">
              Ao se inscrever hoje por apenas R$37, você garante este ecossistema completo de suporte avaliado em mais de R$260:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto" id="bonuses-list">
            {BONUSES.map((bonus) => (
              <div 
                key={bonus.id}
                id={`bonus-item-${bonus.id}`}
                className="bg-white border border-brand-100 p-6 rounded-2xl shadow-2xs relative overflow-hidden group hover:shadow-xs transition-all duration-300"
              >
                {/* Visual price slash absolute header */}
                <span className="absolute top-4 right-4 text-[10px] font-bold text-rose-500 font-mono line-through">
                  Valor normal: {bonus.originalPrice}
                </span>

                <div className="flex gap-4 items-start pt-2">
                  <div className="p-3 bg-brand-50 text-brand-600 rounded-xl group-hover:scale-105 transition-transform">
                    <Gift className="h-5 w-5 text-amber-gold" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-150 py-0.5 px-2 rounded-full leading-none">
                        {bonus.tag}
                      </span>
                      <span className="text-[10px] font-extrabold text-brand-600 bg-brand-50 py-0.5 px-2 rounded-full leading-none">
                        🎁 HOJE: GRÁTIS
                      </span>
                    </div>

                    <h4 className="font-serif text-base sm:text-lg font-bold text-brand-900 mb-2">
                      {bonus.title}
                    </h4>
                    
                    <p className="text-xs sm:text-sm text-brand-600 leading-relaxed">
                      {bonus.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 🌿 SECTION 7: SOCIAL PROOF (Prova Social - Depoimentos Reais) */}
      <section className="bg-white py-16 sm:py-24 relative" id="testimonials-section">
        <div className="max-w-6xl mx-auto px-4 text-center">
          
          <div className="max-w-3xl mx-auto mb-12">
            <span className="text-xs font-semibold text-brand-600 tracking-wider uppercase bg-brand-50 px-3 py-1 rounded-full mb-3 inline-block">
              Prova Social Reais
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-brand-900 tracking-tight leading-snug">
              Resultados de quem decidiu confiar no cuidado natural
            </h3>
            <p className="text-sm sm:text-base text-brand-600 max-w-xl mx-auto mt-3">
              Mães reais que superaram a insegurança das crises respiratórias e hoje dormem de forma muito mais tranquila.
            </p>
          </div>

          {/* Testimonial Filter Tags */}
          <div className="flex flex-wrap items-center justify-center gap-1.5. sm:gap-2 max-w-xl mx-auto mb-10" id="testimonial-filters">
            {testimonialTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`text-xs sm:text-sm py-1.5 px-3.5 sm:px-4.5 rounded-full font-medium transition-all duration-200 cursor-pointer ${
                  selectedTag === tag
                    ? "bg-brand-800 text-white shadow-3xs"
                    : "bg-brand-50 text-brand-700 hover:bg-brand-100"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Grid Layout filtered testimonails */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left" id="test-list">
            {filteredTestimonials.map((test) => (
              <div 
                key={test.id}
                id={`testimonial-item-${test.id}`}
                className="bg-warm-50/40 border border-brand-100 p-6 rounded-2xl flex flex-col justify-between hover:border-brand-200 hover:bg-white transition-all duration-300"
              >
                <div>
                  {/* Five-star bar */}
                  <div className="flex gap-1 mb-3.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-gold text-amber-gold" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-brand-700 leading-relaxed mb-4 italic font-medium">
                    "{test.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3.5 border-t border-brand-100/50 pt-4 mt-2">
                  <div className="h-10 w-10 rounded-full bg-brand-150 flex items-center justify-center font-bold font-serif text-brand-800 text-sm border-2 border-white shadow-2xs">
                    {test.author.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-brand-900 leading-none mb-1">
                      {test.author}
                    </h5>
                    <span className="text-[10px] text-brand-500 font-medium">{test.role}</span>
                  </div>

                  <span className="ml-auto text-[10px] bg-brand-100/60 text-brand-800 py-1 px-2.5 rounded-full">
                    👶 {test.ageOfChild}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 🌿 SECTION 8: ABOUT MIRIAM NARDIN (Quem sou) */}
      <section className="bg-warm-100 py-16 sm:py-24 relative overflow-hidden" id="about-section">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Elegant visual frame avatar representation */}
            <div className="lg:col-span-4 flex justify-center" id="photo-frame-wrapper">
              <div className="relative group">
                {/* Botanical frame background decoration */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-brand-300 to-brand-100 rounded-2xl opacity-60 blur-xs transition duration-1000 group-hover:opacity-85 pointer-events-none" />
                
                {/* Real photo of Miriam Nardin */}
                <div className="relative w-56 h-72 sm:w-64 sm:h-80 rounded-2xl bg-brand-800 border-4 border-white shadow-lg overflow-hidden flex flex-col justify-end items-center animate-fade-in">
                   <img 
                    src="/miriam.jpg" 
                    alt="Miriam Nardin - Aromaterapeuta Infantil" 
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-fill object-center transition duration-500 group-hover:scale-102"
                    onError={(e) => {
                      const img = e.currentTarget;
                      if (img.src.endsWith("/miriam.jpg")) {
                        img.src = "/miriam.png";
                      } else if (img.src.endsWith("/miriam.png")) {
                        img.src = "/input_file_0.png";
                      } else if (img.src.endsWith("/input_file_0.png")) {
                        img.src = "https://images.unsplash.com/photo-1594824813573-24643433c697?auto=format&fit=crop&q=80&w=600&h=800";
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent pointer-events-none" />

                  <div className="relative z-10 p-4.5 text-center text-white pb-5 w-full">
                    <span className="text-amber-gold text-[10px] sm:text-xs font-semibold uppercase tracking-wider block mb-0.5">
                      Aromaterapeuta Infantil
                    </span>
                    <h4 className="font-serif text-sm sm:text-base font-bold">
                      Miriam Nardin
                    </h4>
                  </div>
                </div>

                <div className="absolute bottom-[-15px] right-[-15px] bg-brand-900 text-white font-bold text-[10px] uppercase py-2 px-3 rounded-lg border border-brand-800 shadow-md">
                  Formada & Certificada 🌿
                </div>
              </div>
            </div>

            {/* Narrative text column */}
            <div className="lg:col-span-8 text-left" id="about-story">
              <span className="text-xs font-semibold text-brand-600 tracking-wider uppercase bg-brand-50 px-3 py-1 rounded-full mb-3 inline-block">
                Fundadora
              </span>
              <h3 className="font-serif text-2xl sm:text-4.5xl font-bold text-brand-900 tracking-tight leading-none mb-6">
                Quem sou eu
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-brand-700 leading-relaxed max-w-xl">
                <p className="font-serif text-base font-bold text-brand-900 italic">
                  "Olá, eu sou Miriam Nardin 🌿"
                </p>
                <p>
                  Sou <strong>Aromaterapeuta Infantil</strong> e meu propósito de vida é ajudar mães comuns a cuidarem de seus filhos de forma muito mais natural, segura e energeticamente consciente.
                </p>
                <p>
                  O meu trabalho ultrapassa a análise fria dos sintomas. Eu busco enxergar e compreender os sinais do corpo infantil de forma integral, respeitando suas necessidades físicas, seu corpinho sensível, suas emoções e sua individualidade biológica.
                </p>
                <p>
                  Por causa dos mitos, modismos e exageros espalhados sem escrúpulos na internet, vejo muitas mães inseguras e assustadas com medo de errar a mão na aromaterapia. Criei o <strong>SOS Respiratório Infantil</strong> justamente para preencher essa lacuna de cuidado, oferecendo um guia claro, com bases e dosagens seguras para te dar autonomia.
                </p>
              </div>

              <div className="mt-8 flex gap-4 text-xs font-semibold text-brand-800">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-brand-100 shadow-3xs">
                  🌿 100% Didático
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-brand-100 shadow-3xs">
                  🛡️ Aplicação Pediátrica
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 🌿 SECTION 9: OBJECTION HANDLING (Quebra de Objeções) */}
      <section className="bg-white py-16 sm:py-24 border-t border-brand-100" id="objections-section">
        <div className="max-w-4xl mx-auto px-4 text-center">
          
          <div className="max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-semibold text-brand-600 tracking-wider uppercase bg-brand-50 px-3 py-1 rounded-full mb-3 inline-block">
              Perguntas Frequentes
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-brand-900 tracking-tight leading-snug">
              Dúvidas comuns sobre o treinamento respondidas
            </h3>
            <p className="text-sm sm:text-base text-brand-600 mt-2">
              Se você ainda possui alguma hesitação, leia com atenção os tópicos abaixo:
            </p>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto text-left" id="objection-accordion-wrapper">
            {OBJECTIONS.map((obj) => {
              const isOpen = openObjection === obj.id;
              return (
                <div 
                  key={obj.id}
                  id={`objection-item-${obj.id}`}
                  className="bg-warm-50/50 border border-brand-100 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenObjection(isOpen ? null : obj.id)}
                    className="w-full flex items-center justify-between p-5 text-left font-serif text-sm sm:text-base font-bold text-brand-900 hover:text-brand-700 transition-colors gap-4 cursor-pointer"
                  >
                    <span>{obj.question}</span>
                    <ChevronDown className={`h-4.5 w-4.5 text-brand-500 transition-transform ${isOpen ? "transform rotate-180 text-brand-800" : ""}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-brand-650 leading-relaxed border-t border-brand-100/30 bg-white">
                          {obj.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 🌿 SECTION 10: THE UNBEATABLE OFFER (Oferta Irrecusável) */}
      <section ref={offerRef} className="bg-gradient-to-b from-brand-900 to-brand-950 text-brand-100 py-16 sm:py-24 relative overflow-hidden" id="offer-section">
        {/* Decorative background shapes */}
        <div className="absolute top-24 left-[-15%] w-80 h-80 rounded-full bg-brand-800/40 blur-3xl pointer-events-none" />
        <div className="absolute bottom-12 right-[-10%] w-96 h-96 rounded-full bg-brand-700/20 blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          
          <span className="text-[10px] sm:text-xs font-bold text-amber-gold tracking-widest uppercase bg-brand-800 border border-brand-700 py-1 px-4 rounded-full mb-6 inline-block">
            🎁 ACESSO IMEDIATO
          </span>

          <h3 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4 leading-tight">
            Comece hoje mesmo a construir sua Farmácia Natural
          </h3>

          <p className="text-sm sm:text-base text-brand-200 mt-2 max-w-xl mx-auto mb-10 leading-relaxed">
            Tenha em mãos a chave secreta dos óleos essenciais e sinta a verdadeira tranquilidade de saber cuidar do pulmão do seu pequeno em qualquer emergência ou crise.
          </p>

          <div className="max-w-md mx-auto bg-white text-brand-900 rounded-3xl p-6 sm:p-10 shadow-xl border border-brand-100 relative" id="pricing-card">
            
            {/* Countdown Badge inside Card */}
            <div className="absolute top-[-15px] left-1/2 transform -translate-x-1/2 bg-amber-gold text-brand-950 font-bold text-xs py-1 px-4.5 rounded-full shadow-md whitespace-nowrap flex items-center gap-1.5 uppercase">
              <Clock className="h-3 w-3 animate-pulse" />
              <span>OFERTA EXPIRA EM {formatTime(timeLeft)} Minutos</span>
            </div>

            <span className="text-xs font-semibold text-brand-500 uppercase tracking-widest block mb-1.5 mt-2">
              Curso Digital SOS Respiratório Infantil + 5 Bônus
            </span>

            <div className="flex justify-center items-center gap-2 text-sm text-brand-500/80 mb-2">
              <span>De:</span>
              <span className="line-through font-mono">R$ 97,00</span>
            </div>

            <div className="text-center mb-6">
              <span className="text-xs text-brand-400 block font-medium">Por apenas:</span>
              <div className="flex justify-center items-baseline gap-1" id="pricing-number">
                <span className="text-sm font-extrabold text-brand-800">R$</span>
                <span className="text-5xl sm:text-6xl font-serif font-black text-brand-950 tracking-tight">
                  37
                </span>
                <span className="text-xs font-semibold text-brand-600 font-mono">,00</span>
              </div>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-bold mt-2.5 inline-block border border-emerald-100/60">
                Pagamento único • Sem mensalidade
              </span>
            </div>

            {/* List checklist inside the cart */}
            <ul className="mb-8 space-y-3 text-xs sm:text-sm text-brand-750 font-medium text-left bg-brand-50/50 p-4.5. sm:p-5 rounded-2xl border border-brand-100/60">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-brand-600 flex-shrink-0" />
                <span>✔️ Acesso imediato à plataforma de alunas</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-brand-600 flex-shrink-0" />
                <span>✔️ Conteúdo prático passo a passo de tosse/febre</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-brand-600 flex-shrink-0" />
                <span>✔️ 5 Bônus VIP Inclusos Gratuitamente</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-brand-600 flex-shrink-0" />
                <span>✔️ Suporte de dúvidas respondido pela Miriam</span>
              </li>
            </ul>

            {/* Pulsing Core Action Button */}
            <a 
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-full inline-flex items-center justify-center gap-2 bg-vibrant-orange hover:bg-vibrant-orange-hover text-white font-bold text-base sm:text-lg py-4.5 px-6 rounded-2xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 select-none cursor-pointer uppercase tracking-wide"
              id="pricing-cta-button"
            >
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
              <span>🌿 ADQUIRA AGORA</span>
              <ArrowRight className="h-5 w-5" />
            </a>

            {/* Security Guarantee details */}
            <div className="mt-5 text-[10px] text-brand-500 leading-snug space-y-1.5">
              <span className="block italic">🔒 Transação criptografada de alta segurança protegida pela Kiwify</span>
              <div className="flex justify-center gap-3">
                <span>💳 Cartão de Crédito</span>
                <span>•</span>
                <span>⚡ Pix</span>
                <span>•</span>
                <span>📄 Boleto</span>
              </div>
            </div>

          </div>

          {/* Satisfacation Guard badge */}
          <div className="mt-14 max-w-xl mx-auto bg-brand-800/50 border border-brand-700/60 p-6 sm:p-8 rounded-2xl text-left flex flex-col sm:flex-row gap-5 items-start">
            <div className="bg-brand-900 border border-brand-700 p-3.5 rounded-full flex-shrink-0 mx-auto sm:mx-0">
              <Award className="h-8 w-8 text-amber-gold" />
            </div>
            <div>
              <h4 className="font-serif text-base sm:text-lg font-bold text-white mb-1.5 text-center sm:text-left">
                Garantia Incondicional de 7 Dias
              </h4>
              <p className="text-xs sm:text-sm text-brand-200 leading-relaxed text-center sm:text-left">
                Não possui riscos ao testar! Se por qualquer motivo você assistir às primeiras aulas, conferir as tabelas de diluição por idade e achar que o treinamento não serve para você, devolvemos 100% do seu dinheiro. Basta enviar um e-mail em até 7 dias da compra.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 🌿 SECTION 11: CLOSING LETTER (Fechamento) */}
      <section className="bg-warm-100 py-16 sm:py-24 relative" id="closing-section">
        <div className="max-w-screen-md mx-auto px-4 text-center">
          
          <div className="p-1 max-w-lg mx-auto mb-2 select-none pointer-events-none">
            <span className="text-brand-300 text-6xl font-serif">“</span>
          </div>

          {/* Letter Body */}
          <div className="font-serif text-lg sm:text-2xl text-brand-900 leading-relaxed italic max-w-2xl mx-auto mb-8 px-4">
            <p className="mb-4">
              "Seu filho não precisa que você saiba tudo."
            </p>
            <p className="text-brand-700 font-sans text-xs sm:text-sm not-italic mt-4 font-normal">
              Ele precisa de uma mãe calma e segura, que aprende um passo prático de cada vez.
            </p>
          </div>

          <p className="text-xs sm:text-sm text-brand-650 max-w-md mx-auto leading-relaxed mb-10">
            Comece hoje sua jornada de aromaterapia com muito mais tranquilidade, total autonomia e cuidado saudável.
          </p>

          <p className="font-serif text-base sm:text-lg font-bold text-brand-900 flex justify-center items-center gap-1">
            <span>🌿 Te espero dentro do SOS Respiratório Infantil</span>
            <span className="text-[14px]">💛</span>
          </p>

          <div className="mt-3 text-brand-500 text-xs sm:text-sm">
            Miriam Nardin
          </div>

          <div className="mt-12 pt-8 border-t border-brand-200 text-[11px] sm:text-xs text-brand-500 max-w-sm mx-auto" id="final-credits">
            <p className="mb-2">🔒 Treinamento SOS Respiratório Infantil • Todos os direitos reservados.</p>
            <p>Precisa de suporte comercial? Fale conosco em <a href="mailto:miriamnardinprofessora@gmail.com" className="underline hover:text-brand-700">miriamnardinprofessora@gmail.com</a></p>
          </div>

        </div>
      </section>

      {/* ⚡ REAL_TIME FLOATING toast notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-4 sm:bottom-6 right-4 left-4 sm:left-auto sm:w-96 bg-brand-900 text-white p-4.5 rounded-2xl shadow-xl flex items-center gap-3.5 z-50 border border-brand-800"
            id="toast-notification"
          >
            <div className="bg-brand-800 p-2 rounded-full text-amber-gold flex-shrink-0 animate-bounce">
              <Flame className="h-4.5 w-4.5 fill-amber-gold" />
            </div>
            <div className="text-left text-xs text-brand-100">
              <span className="font-medium">{toastMessage}</span>
              <span className="block text-[10px] text-brand-300 mt-0.5">Comprado agora mesmo via Kiwify</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Inline SVG representation icon to prevent module resolution complications
function LeafIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2Z" />
      <path d="M9 22v-4h4" />
    </svg>
  );
}
