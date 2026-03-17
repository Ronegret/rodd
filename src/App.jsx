import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useInView } from 'framer-motion';
import { ArrowUpRight, Cpu, Menu, Smartphone, Phone, Workflow, Globe, Plus, X, ArrowRight, MessageCircle } from 'lucide-react';

const AnimatedCounter = ({ value, text, setCursorState }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = null;
      const duration = 2500;
      const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
      const isFloat = value.includes('.');
      
      const animate = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = easeOutQuart * numericValue;
        
        setCount(isFloat ? currentCount.toFixed(1) : Math.floor(currentCount));
        if (progress < 1) requestAnimationFrame(animate);
        else setCount(isFloat ? numericValue.toFixed(1) : numericValue);
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  const prefix = value.includes('+') ? '+' : '';
  const suffix = value.includes('%') ? '%' : value.includes('s') ? 's' : '';

  return (
    <div ref={ref} className="flex flex-col border-l-2 border-[#ff0033] pl-6 cursor-none" onMouseEnter={()=>setCursorState("hover", "STAT")} onMouseLeave={()=>setCursorState("default")}>
       <h4 className="font-display font-black text-5xl md:text-7xl text-white mb-2">{prefix}{count}{suffix}</h4>
       <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/50">{text}</p>
    </div>
  );
};

const ChatbotForm = ({ setCursorState }) => {
   const [step, setStep] = useState(0);
   const [email, setEmail] = useState('');
   const [message, setMessage] = useState('');
   const [sent, setSent] = useState(false);

   const nextStep = () => {
      if(step === 0 && email.includes('@')) setStep(1);
      else if(step === 1 && message.length > 2) setSent(true);
   };

   return (
       <div className="mt-16 md:mt-24 w-full max-w-4xl mx-auto bg-[#050505] border border-white/20 rounded-[2rem] p-6 md:p-10 text-left shadow-2xl relative z-20 cursor-none" onMouseEnter={()=>setCursorState("default")}>
          <div className="flex justify-between items-center border-b border-white/10 pb-6 mb-8">
             <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-[#ff0033] rounded-full flex items-center justify-center font-bold text-black shadow-[0_0_20px_#ff0033]">
                  AI
               </div>
               <div>
                  <h3 className="text-white font-bold text-xl md:text-2xl tracking-tighter">RODDBOT 1.0</h3>
                  <div className="flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-[#ff0033] animate-pulse"></span>
                     <p className="text-white/50 text-[10px] font-bold tracking-widest uppercase">Sistema Activo | Grabando</p>
                  </div>
               </div>
             </div>
             <p className="text-white/20 text-[10px] md:text-xs tracking-widest uppercase font-bold hidden md:block">RODD_INTELLIGENCE</p>
          </div>
          
          <div className="space-y-6">
             <div className="bg-white/5 border border-white/10 p-5 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl max-w-[90%] md:max-w-[75%]">
                <p className="text-white/80 font-medium leading-relaxed font-sans">
                   Hola, soy la inteligencia conversacional de RODD. Analizaré tu caso y programaré una sesión estratégica con nuestros ingenieros. <br/><br/>¿A qué correo te contacto para enviarte la agenda?
                </p>
             </div>
             
             {!sent && (
               <div className="bg-[#ff0033]/5 border border-[#ff0033]/20 p-5 rounded-tl-2xl rounded-bl-2xl rounded-br-2xl max-w-[90%] md:max-w-[75%] ml-auto mt-4 transition-all">
                  {step === 0 ? (
                    <div className="flex flex-col gap-4">
                      <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="tu-email@empresa.com" className="bg-transparent border-b border-[#ff0033]/50 text-white p-2 md:p-4 text-sm md:text-base focus:outline-none focus:border-[#ff0033] w-full cursor-none" onMouseEnter={()=>setCursorState("hover", "ESCRIBIR")} onMouseLeave={()=>setCursorState("default")}/>
                      <button onClick={nextStep} className="bg-[#ff0033] text-black font-bold uppercase tracking-widest text-xs md:text-sm py-3 px-6 rounded-full self-end hover:bg-white hover:shadow-[0_0_20px_white] transition-all cursor-none" onMouseEnter={()=>setCursorState("hover", "AVANZAR")} onMouseLeave={()=>setCursorState("default")}>
                         Siguiente &rarr;
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <p className="text-[#ff0033] text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2 block"><span className="w-1.5 h-1.5 bg-[#ff0033] rounded-full"></span> {email}</p>
                      <textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder="¿De qué trata tu proyecto? (Web, Ecommerce, App, Agente IA...)" rows="3" className="bg-transparent border-b border-[#ff0033]/50 text-white p-2 md:p-4 text-sm md:text-base focus:outline-none focus:border-[#ff0033] w-full resize-none cursor-none" onMouseEnter={()=>setCursorState("hover", "ESCRIBIR")} onMouseLeave={()=>setCursorState("default")}></textarea>
                      <button onClick={nextStep} className="bg-[#ff0033] text-black font-bold uppercase tracking-widest text-xs md:text-sm py-3 px-6 rounded-full self-end hover:bg-white hover:shadow-[0_0_20px_white] transition-all cursor-none" onMouseEnter={()=>setCursorState("hover", "ENVIAR")} onMouseLeave={()=>setCursorState("default")}>
                         Agenda vía Email &rarr;
                      </button>
                    </div>
                  )}
               </div>
             )}

             {sent && (
                <div className="bg-white/10 text-white/80 p-6 rounded-tl-2xl rounded-bl-2xl rounded-br-2xl max-w-[90%] md:max-w-[75%] ml-auto mt-4 text-center border border-white/20">
                   <p className="text-[#ff0033] mb-3 text-lg font-black uppercase tracking-widest flex items-center justify-center gap-3">
                     <span className="w-2 h-2 rounded-full bg-[#ff0033] animate-pulse"></span> DATOS TRANSMITIDOS
                   </p>
                   Tu información fue procesada por nuestra red central. Revisa tu bandeja de entrada en unos instantes.
                </div>
             )}
          </div>
       </div>
   )
}

const projects = [
  { 
    title: "AURA AI", category: "Dashboards & Data", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1500&auto=format&fit=crop",
    year: "2026",
    details: "Desarrollo de una plataforma SaaS impulsada por IA para análisis predictivo. \nUX/UI: Interfaz oscura 'glassmorphism' para reducir la fatiga visual. \nDesarrollo: React, WebGL para gráficas 3D y conexión a LLMs privados para procesar Terabytes de datos."
  },
  { 
    title: "NXT MOBILITY", category: "App Nativa Automotriz", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1500&auto=format&fit=crop",
    year: "2025",
    details: "App móvil (iOS/Android) para alquiler de flota eléctrica premium. \nUX/UI: Diseño fluido inspirado en interfaces de Tesla. Microinteracciones en cada toque. \nDesarrollo: Construido en React Native con integraciones IoT para apertura de puertas sin llave."
  },
  { 
    title: "VERTEX", category: "Agente IA Inmobiliario", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1500&auto=format&fit=crop",
    year: "2026",
    details: "Clonación de voz y agente telefónico 24/7 para multinacional inmobiliaria. \nUX/UI: Panel de control minimalista para los agentes humanos. \nDesarrollo: Integración con Twilio, ElevenLabs y un cerebro LLM entrenado con 10,000 folletos de propiedades."
  },
  { 
    title: "HELIOS", category: "E-commerce Inmersivo", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1500&auto=format&fit=crop",
    year: "2025",
    details: "Rediseño completo de e-commerce de alta gama. Pasamos de una conversión del 1.2% al 4.8%. \nUX/UI: Scroll tracking, animaciones asimétricas y tipografía brutalista. \nDesarrollo: Integración Headless Shopify con Next.js."
  },
  { 
    title: "OMNIA", category: "Fintech Web App", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1500&auto=format&fit=crop",
    year: "2025",
    details: "Gestor de patrimonio digital para fondos de inversión. \nUX/UI: Accesibilidad nivel AA, paleta de colores de alta confianza (monocromáticos + acentos neón). \nDesarrollo: Arquitectura Serverless AWS, Node.js y encriptación bancaria de extremo a extremo."
  },
  { 
    title: "LUMINAR", category: "Corporate Web 3D", img: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1500&auto=format&fit=crop",
    year: "2026",
    details: "Presencia digital para estudio de arquitectura internacional. \nUX/UI: Minimalismo llevado al extremo. Espacios en blanco masivos. \nDesarrollo: Modelos 3D de edificios interactivos renderizados en el navegador usando Three.js y WebGL."
  },
  { 
    title: "QUANTUM RE", category: "Automatización B2B", img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1500&auto=format&fit=crop",
    year: "2024",
    details: "Automatización total de embudos de captación corporativa. \nUX/UI: Portales de onboarding optimizados para reducir la fricción. \nDesarrollo: RPA en n8n conectando LinkedIn, CRMs (HubSpot) y agentes de IA para cualificar empresas."
  },
  { 
    title: "SYNAPSE", category: "SaaS Médico", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1500&auto=format&fit=crop",
    year: "2025",
    details: "Portal de telediagnóstico para clínicas privadas. \nUX/UI: User research exhaustivo con médicos reales para evitar errores de clics. \nDesarrollo: Integración de IA para pre-diagnóstico y videollamadas nativas encriptadas (WebRTC)."
  },
  { 
    title: "NEURAL LOGISTICS", category: "IA Operativa", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1500&auto=format&fit=crop",
    year: "2026",
    details: "Optimización de flotas terrestres mediante predicción neuronal. \nUX/UI: Mapas interactivos de calor en tiempo real. \nDesarrollo: Machine learning para predicción de tráfico y consumos. Backend robusto en Python/Django."
  },
  { 
    title: "KINETIC", category: "GenAI Fitness Platform", img: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1500&auto=format&fit=crop",
    year: "2026",
    details: "Entrenador personal hiperrealista basado en IA para app de fitness. \nUX/UI: Estética deportiva agresiva, alto contraste y gamificación. \nDesarrollo: Generación de rutinas y dietas al instante mediante LLMs afinados de OpenAI."
  }
];

const RevealText = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ y: 80, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

const FallingLetters = ({ text, delayOffset = 0 }) => {
  const letters = Array.from(text);
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: delayOffset } }
  };
  const child = {
    hidden: { y: -100, opacity: 0, rotate: -15 },
    visible: { y: 0, opacity: 1, rotate: 0, transition: { type: "spring", damping: 15, stiffness: 100 } }
  };
  return (
    <motion.span variants={container} initial="hidden" animate="visible" className="inline-flex overflow-hidden pb-1">
      {letters.map((char, index) => (
        <motion.span variants={child} key={index} className="inline-block">{char === " " ? "\u00A0" : char}</motion.span>
      ))}
    </motion.span>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSlogan, setShowSlogan] = useState(false);
  
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [cursorText, setCursorText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const methodologyRef = useRef(null);
  const { scrollYProgress: methodologyProgress } = useScroll({ 
    target: methodologyRef,
    offset: ["start start", "end end"]
  });
  
  const methodologyTransform = useTransform(
    methodologyProgress, 
    [0, 0.05, 0.95, 1], 
    ["0%", "0%", "-66.66%", "-66.66%"]
  ); 
  const methodologyLineWidth = useTransform(
    methodologyProgress, 
    [0, 0.05, 0.95, 1], 
    ["0%", "0%", "100%", "100%"]
  );

  useEffect(() => {
    const sloganTimer = setTimeout(() => { setShowSlogan(true); }, 1500);
    const timer = setTimeout(() => { setLoading(false); window.scrollTo(0,0); }, 4500);
    return () => { clearTimeout(timer); clearTimeout(sloganTimer); };
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;
    const move = (e) => {
      setCursorVisible(true);
      if(cursorRef.current && cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        cursorRef.current.style.transform = `translate3d(${e.clientX - 24}px, ${e.clientY - 24}px, 0)`;
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  const setCursorState = (state, text = "") => {
    if (window.innerWidth < 768 || !cursorRef.current) return;
    cursorRef.current.classList.remove('cursor-hover-state', 'cursor-balloon-state');
    if (state === "hover") cursorRef.current.classList.add('cursor-hover-state');
    if (state === "balloon") cursorRef.current.classList.add('cursor-balloon-state');
    setCursorText(text);
  };

  const scrollTo = (id) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  if (loading) {
    return (
      <div className="h-screen w-screen bg-bg flex flex-col items-center justify-center fixed inset-0 z-[9999] overflow-hidden">
        <div className="absolute top-0 left-0 w-[60vw] h-[60vw] bg-[#ff0033]/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[60vw] h-[60vw] bg-[#ff0033]/5 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 animate-pulse pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }} 
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} 
          exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }} 
          transition={{ duration: 1.5, ease: "easeInOut" }} 
          className="flex flex-col items-center relative"
        >
           <div className="text-white font-display font-black text-6xl md:text-9xl tracking-tighter flex items-center gap-2 relative">
             <span className="relative z-10">RODD</span>
             <span className="w-4 h-4 rounded-full recording-dot mt-4 relative z-10"></span>
             <motion.div 
                animate={{ opacity: [0, 1, 0] }} 
                transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                className="absolute inset-0 bg-white blur-3xl rounded-full opacity-0 transform scale-150 z-0"
             />
           </div>
           
           <AnimatePresence>
             {showSlogan && (
               <motion.div 
                 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}
                 className="mt-8 text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-[#ff0033] text-center"
               >
                 Diseño Premium & Inteligencia Artificial
               </motion.div>
             )}
           </AnimatePresence>
        </motion.div>
        
        <div className="absolute bottom-20 w-48 md:w-64 h-[1px] bg-white/10 overflow-hidden">
           <motion.div 
             initial={{ x: "-100%" }} 
             animate={{ x: "0%" }} 
             transition={{ duration: 4.2, ease: [0.16, 1, 0.3, 1] }} 
             className="h-full bg-[#ff0033] w-full" 
           />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg min-h-screen text-white selection:bg-[#ff0033] selection:text-white relative overflow-x-hidden">
      
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-[#ff0033] origin-left z-[9999]" style={{ scaleX: smoothProgress }} />

      <a 
        href="https://wa.me/34653567610" target="_blank" rel="noreferrer"
        onMouseEnter={()=>setCursorState("hover", "WSP")} onMouseLeave={()=>setCursorState("default")}
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 w-16 h-16 bg-[#ff0033] text-white rounded-full flex items-center justify-center z-[9000] shadow-[0_0_20px_rgba(255,0,51,0.4)] hover:scale-110 transition-transform cursor-none overflow-hidden group"
      >
        <MessageCircle className="w-8 h-8 group-hover:scale-125 transition-transform" />
      </a>

      <div ref={cursorDotRef} className={`hidden md:block w-3 h-3 cursor-dot rounded-full fixed top-0 left-0 pointer-events-none z-[100001] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></div>
      <div ref={cursorRef} className={`hidden md:flex items-center justify-center w-12 h-12 cursor-ring rounded-full fixed top-0 left-0 pointer-events-none z-[100000] transition-all duration-300 ease-out overflow-hidden ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}>
         <span className="text-center transition-opacity duration-300 pointer-events-none opacity-0 font-bold uppercase tracking-widest leading-tight text-[10px]">{cursorText}</span>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ y: "-100%" }} animate={{ y: "0%" }} exit={{ y: "-100%" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#020202] z-[9999] flex flex-col justify-between p-6 md:p-12 overflow-hidden"
          >
             <div className="flex justify-between items-center w-full max-w-[1600px] mx-auto">
               <div className="font-display font-black text-3xl text-white">RODD<span className="text-[#ff0033]">.</span></div>
               <button onClick={() => setMenuOpen(false)} className="bg-white/10 hover:bg-white/20 p-4 rounded-full transition-colors cursor-none" onMouseEnter={()=>setCursorState("hover")} onMouseLeave={()=>setCursorState("default")}><X className="w-8 h-8"/></button>
             </div>

             <div className="flex-1 flex flex-col justify-center items-center gap-6 md:gap-10 text-center">
                {['inicio', 'nosotros', 'servicios', 'proyectos', 'contacto'].map((item) => (
                  <motion.button 
                    key={item} initial={{y: 50, opacity: 0}} animate={{y:0, opacity: 1}} transition={{delay: 0.2}}
                    onClick={() => scrollTo(item)}
                    onMouseEnter={()=>setCursorState("hover", "IR")} onMouseLeave={()=>setCursorState("default")}
                    className="font-display font-black text-5xl md:text-8xl uppercase tracking-tighter text-white hover:text-[#ff0033] transition-colors cursor-none"
                  >
                    {item}
                  </motion.button>
                ))}
             </div>

             <div className="text-center font-bold tracking-[0.2em] text-white/30 text-xs md:text-sm uppercase pb-12">
               info@rodd.es <br/><br/> Barcelona, ES
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="fixed w-full z-50 bg-[#050505]/70 backdrop-blur-xl border-b border-white/5 transition-all duration-500">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 h-20 md:h-24 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <div className="font-display font-black text-2xl md:text-3xl tracking-tighter cursor-none flex items-center gap-1" onClick={() => scrollTo('inicio')} onMouseEnter={()=>setCursorState("hover", "TOP")} onMouseLeave={()=>setCursorState("default")}>
               RODD<span className="w-2 md:w-3 h-2 md:h-3 rounded-full recording-dot inline-block mb-1 ml-1"></span>
             </div>
             <span className="hidden md:block w-px h-6 bg-white/20"></span>
             <span className="hidden md:block text-[10px] font-bold tracking-[0.2em] uppercase text-white/40">Diseño Digital & Inteligencia Artificial</span>
          </div>
          <div className="hidden lg:flex gap-10 font-bold text-xs tracking-widest uppercase text-white/50">
             <button onClick={() => scrollTo('nosotros')} className="hover:text-white transition-colors cursor-none" onMouseEnter={()=>setCursorState("hover")} onMouseLeave={()=>setCursorState("default")}>Nosotros</button>
             <button onClick={() => scrollTo('servicios')} className="hover:text-white transition-colors cursor-none" onMouseEnter={()=>setCursorState("hover")} onMouseLeave={()=>setCursorState("default")}>Servicios</button>
             <button onClick={() => scrollTo('proyectos')} className="hover:text-white transition-colors cursor-none" onMouseEnter={()=>setCursorState("hover")} onMouseLeave={()=>setCursorState("default")}>Portfolio</button>
          </div>
          <button className="text-sm font-bold tracking-widest uppercase flex items-center gap-3 hover:text-white text-white/50 transition-colors cursor-none" onClick={() => setMenuOpen(true)} onMouseEnter={()=>setCursorState("hover", "MENÚ")} onMouseLeave={()=>setCursorState("default")}>
            <span className="hidden sm:inline">Menú</span> <Menu className="w-5 h-5"/>
          </button>
        </div>
      </nav>

      <section id="inicio" className="relative min-h-[100svh] w-full flex flex-col justify-center px-6 sm:px-10 pt-20">
        <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-[70vw] h-[70vw] bg-[#ff0033]/10 rounded-full blur-[150px] -translate-x-[30%] -translate-y-[30%] pointer-events-none mix-blend-screen animate-pulse"></div>
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-white/5 rounded-full blur-[130px] translate-x-[20%] -translate-y-[20%] pointer-events-none mix-blend-screen transition-opacity duration-1000"></div>

        <div className="relative z-10 w-full max-w-[1600px] mx-auto mt-12 md:mt-24">
           <motion.div initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} transition={{delay: 1.2, duration: 1}} className="inline-flex items-center gap-2 sm:gap-3 px-4 py-2 rounded-full border border-[rgba(255,0,51,0.2)] bg-black/50 backdrop-blur-md mb-8 cursor-none" onMouseEnter={()=>setCursorState("balloon", "WE ARE ONLINE")} onMouseLeave={()=>setCursorState("default")}>
              <span className="w-2 h-2 rounded-full recording-dot"></span>
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase text-white shrink-0">Agencia de Diseño & IA</span>
           </motion.div>

           <h1 className="font-display font-black text-[clamp(2.2rem,11vw,11rem)] leading-[0.82] tracking-tighter uppercase w-full flex flex-col pt-4 md:pt-0">
              <span className="text-white relative cursor-none" onMouseEnter={()=>setCursorState("balloon", "NO HAY LÍMITES")} onMouseLeave={()=>setCursorState("default")}>
                 <FallingLetters text="ROMPEMOS" delayOffset={0.5} />
              </span>
              <span className="text-outline hover:text-white transition-colors duration-500 ease-out cursor-none" onMouseEnter={()=>setCursorState("hover", "PULSA")} onMouseLeave={()=>setCursorState("default")}>
                 <FallingLetters text="LOS" delayOffset={0.9} />
              </span>
              <span className="text-white relative flex items-baseline gap-2 md:gap-4 flex-wrap">
                 <FallingLetters text="LÍMITES" delayOffset={1.3} /><span className="text-[#ff0033] animate-pulse">.</span>
              </span>
           </h1>
           
           <div className="mt-12 md:mt-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-t border-white/10 pt-8">
               <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 1.8}} className="text-white/60 text-lg md:text-2xl font-light leading-relaxed max-w-xl">
                 No adaptamos lo viejo al presente. <strong className="text-white font-medium">Construimos plataformas inmersivas y Agentes de Inteligencia Artificial</strong> para las empresas que liderarán la próxima década.
               </motion.p>
               
               <motion.button 
                  onClick={() => scrollTo('nosotros')}
                  initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 2}}
                  onMouseEnter={()=>setCursorState("hover", "DESCUBRIR")} onMouseLeave={()=>setCursorState("default")}
                  className="group flex flex-col items-start gap-4 text-sm md:text-base font-bold tracking-widest uppercase cursor-none text-white/80 hover:text-white transition-colors"
               >
                 <span>Descubre RODD</span>
                 <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center group-hover:w-full group-hover:bg-white group-hover:text-black group-hover:px-6 transition-all duration-700 ease-[0.16,1,0.3,1]">
                   <ArrowRight className="w-6 h-6 rotate-90 group-hover:hidden" />
                   <span className="hidden group-hover:inline uppercase tracking-widest font-black text-xs">Avanzar</span>
                 </div>
               </motion.button>
           </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-y border-white/5 bg-[#020202]">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
            {[
              { num: "+40", text: "Modelos de IA" },
              { num: "+120", text: "Proyectos Web" },
              { num: "0.8s", text: "Carga Promedio" },
              { num: "100%", text: "Conversión Real" }
            ].map((stat, i) => (
               <RevealText key={i} delay={0.1*i}>
                  <AnimatedCounter value={stat.num} text={stat.text} setCursorState={setCursorState} />
               </RevealText>
            ))}
        </div>
      </section>

      <section id="nosotros" className="py-24 md:py-48 px-6 sm:px-10 max-w-[1600px] mx-auto">
         <RevealText>
            <p className="text-[#ff0033] text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-8">NUESTRO ADN</p>
            <h2 className="font-display font-black text-[clamp(2.5rem,5vw,7rem)] leading-[0.9] tracking-tighter mb-12">
               No hacemos webs. <br/><span className="text-outline">Creamos monopolios digitales.</span>
            </h2>
         </RevealText>

         <div className="grid lg:grid-cols-2 gap-16 md:gap-32 mt-16 md:mt-32">
            <div className="space-y-12">
               <RevealText delay={0.2}>
                 <p className="text-white/70 text-lg md:text-2xl font-light leading-relaxed">
                   Somos una <strong className="text-white">agencia altamente especializada</strong> estructurada como un equipo de élite. Nuestro equipo no está lleno de perfiles genéricos, sino de expertos quirúrgicos: <strong className="text-white">Diseñadores UX/UI premiados, Arquitectos Web Senior e Ingenieros en Inteligencia artificial.</strong>
                 </p>
               </RevealText>
               <RevealText delay={0.3}>
                 <p className="text-white/50 text-base md:text-xl font-light leading-relaxed">
                   Tu marca no necesita una tarjeta de visita online. Necesita un sistema visual que aplaste emocionalmente a tu competencia en los primeros 3 segundos, apoyado por una ingeniería invisible que capte y convierta clientes sin que tú tengas que hacer absolutamente nada.
                 </p>
               </RevealText>
               
               <RevealText delay={0.4}>
                  <div className="flex flex-col gap-6 pt-8 border-t border-white/10">
                    <h4 className="font-display font-bold text-2xl">¿Nuestro Equipo? Especialistas.</h4>
                    <ul className="space-y-4">
                       {[
                         "UX/UI Designers enfocado en Psicología Cognitiva.",
                         "Frontend Devs obsesionados con WebGL y Animaciones (React/Webflow).",
                         "Expertos en Machine Learning y Agentes LLM Privados.",
                         "Arquitectos Backend para infraestructuras escalables en Cloud."
                       ].map((item, i) => (
                           <li key={i} className="flex items-center gap-4 text-white/70 text-sm md:text-lg">
                              <span className="w-2 h-2 rounded-full bg-[#ff0033] shrink-0"></span> {item}
                           </li>
                       ))}
                    </ul>
                  </div>
               </RevealText>
            </div>

            <div className="relative">
               <div className="sticky top-32 w-full h-[60vh] md:h-[80vh] rounded-[2rem] overflow-hidden cursor-none shadow-2xl" onMouseEnter={()=>setCursorState("balloon", "ADN\nRODD")} onMouseLeave={()=>setCursorState("default")}>
                  <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1500&auto=format&fit=crop" alt="Rodd Agency Team" className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-[1s] ease-out"/>
                  <div className="absolute inset-0 bg-black/40 hover:bg-black/10 transition-colors duration-500 pointer-events-none"></div>
               </div>
            </div>
         </div>
      </section>

      <section ref={methodologyRef} className="relative h-[400vh] md:h-[500vh] bg-[#020202] border-y border-white/5">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
           <div className="w-full text-center px-6 absolute top-12 md:top-20 left-0 right-0 z-30 pointer-events-none">
              <h2 className="font-display font-black text-[clamp(2rem,7vw,7rem)] leading-[0.9] tracking-tighter" onMouseEnter={()=>setCursorState("hover", "MÉTODO")} onMouseLeave={()=>setCursorState("default")}>
                 Ingeniería de la <span className="text-[#ff0033]">Perfección.</span>
              </h2>
           </div>

           <div className="flex relative w-full items-center mt-[10vh]">
              <motion.div style={{ x: methodologyTransform }} className="flex w-[340vw] md:w-[300vw] relative z-20">
                 <div className="absolute top-[34px] md:top-[39px] left-[10vw] w-[225vw] h-[1px] bg-white/10 z-0"></div>
                 <motion.div style={{ width: methodologyLineWidth }} className="absolute top-[34px] md:top-[39px] left-[10vw] w-[225vw] h-[3px] z-10 origin-left">
                    <div className="w-full h-full bg-[#ff0033] shadow-[0_0_15px_#ff0033]"></div>
                 </motion.div>
              
                 {[
                  { title: "INVESTIGACIÓN UI & DATOS B2B", desc: "No arrancamos hasta entender tu embudo nivel forense. Mapas de calor y arquitectura." },
                  { title: "MÁQUINAS REACT & FRONTEND 3D", desc: "Código modular rápido como un rayo. Creamos Web Apps con WebGL y Three.js." },
                  { title: "SISTEMAS E-COMMERCE ESCALABLES", desc: "Infraestructuras comerciales hiper-optimizadas con tráfico alto sin caídas." },
                  { title: "LLMs Y AGENTES IA AUTOMATIZADOS", desc: "Transformamos visitantes en clientes mediante automatización asíncrona liderada por IA." }
                 ].map((step, i) => (
                   <div key={i} className="w-[85vw] md:w-[75vw] flex flex-col items-start px-[8vw] md:px-[10vw] cursor-none group relative pt-0 shrink-0" onMouseEnter={()=>setCursorState("balloon", `FASE 0${i+1}`)} onMouseLeave={()=>setCursorState("default")}>
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center font-display font-black text-2xl md:text-3xl text-white group-hover:border-[#ff0033] group-hover:text-[#ff0033] transition-colors duration-500 mb-8 md:mb-12 z-10 shadow-[0_0_0_10px_#020202] relative">
                         0{i+1}
                      </div>
                      <div className="w-full max-w-2xl break-words text-left">
                         <h3 className="font-display font-black text-3xl md:text-5xl tracking-tighter mb-4 md:mb-6 text-white group-hover:text-outline-hover transition-colors min-h-[80px] md:min-h-[100px] leading-none">{step.title}</h3>
                         <p className="text-white/50 font-light leading-relaxed text-base md:text-xl pr-4 md:pr-12">{step.desc}</p>
                      </div>
                   </div>
                 ))}
              </motion.div>
           </div>
        </div>
      </section>

      <section className="bg-white py-12 overflow-hidden flex items-center border-y border-black relative z-40">
         <motion.div 
           animate={{ x: [0, -1000] }} 
           transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
           className="flex gap-12 whitespace-nowrap"
         >
            {[1,2,3,4,5,6,7,8].map(i => (
               <div key={i} className="flex items-center gap-12">
                  <span className="text-black font-display font-black text-6xl md:text-8xl tracking-tighter uppercase italic">LET'S WORK —</span>
                  <span className="text-[#ff0033] font-display font-black text-6xl md:text-8xl tracking-tighter uppercase">RODD —</span>
               </div>
            ))}
         </motion.div>
      </section>

      <section id="proyectos" className="py-24 md:py-48 px-6 sm:px-10 max-w-[1600px] mx-auto relative">
         <RevealText>
            <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-6">
              <h2 className="font-display font-black text-[clamp(2.5rem,9vw,11rem)] leading-[0.85] tracking-tighter uppercase break-words">Selected <br/><span className="text-outline">Works.</span></h2>
              <p className="text-white/50 text-right max-w-sm uppercase tracking-widest text-xs font-bold leading-relaxed mb-4">
                 Proyectos hiper-optimizados donde el diseño se encuentra con la ingeniería de la nueva era.
              </p>
            </div>
         </RevealText>

         <div className="flex flex-col gap-24 relative">
            {projects.map((proj, i) => (
               <div 
                 key={i} 
                 className={`project-card-sticky w-full h-[70vh] md:h-[85vh] rounded-[2rem] overflow-hidden cursor-none border border-white/10 flex flex-col md:flex-row bg-[#0a0a0a] shadow-2xl relative`}
                 style={{ top: `calc(10vh + ${i * 20}px)`, zIndex: i }}
                 onMouseEnter={()=>setCursorState("balloon", "CASE STUDY \n↗")} onMouseLeave={()=>setCursorState("default")}
               >
                  <div className="w-full md:w-1/3 p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 relative z-10 bg-[#0a0a0a]">
                     <div>
                        <div className="flex justify-between items-start mb-8">
                           <span className="text-[10px] md:text-xs font-bold text-[#ff0033] uppercase tracking-[0.3em]">0{i+1} / 10</span>
                           <span className="text-[10px] md:text-xs font-bold text-white/30 uppercase tracking-[0.2em]">{proj.year}</span>
                        </div>
                        <h3 className="font-display font-black text-3xl md:text-5xl tracking-tighter text-white mb-4">{proj.title}</h3>
                        <p className="text-white/50 font-bold uppercase tracking-widest text-xs mb-6">{proj.category}</p>
                        <p className="text-white/70 text-sm md:text-base font-light leading-relaxed whitespace-pre-line hidden md:block">{proj.details}</p>
                     </div>
                  </div>
                  
                  <div className="w-full md:w-2/3 h-full relative overflow-hidden bg-[#050505] group">
                     <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-1000 z-10 pointer-events-none"></div>
                     <img src={proj.img} alt={proj.title} className={`w-full h-full object-cover transition-all duration-[2s] ease-[0.16,1,0.3,1] ${i % 2 === 0 ? 'scale-110 group-hover:scale-100 grayscale hover:grayscale-0' : 'scale-100 hover:scale-110 filter brightness-[0.7] hover:brightness-100 blur-[2px] hover:blur-0'}`} loading="lazy"/>
                  </div>
               </div>
            ))}
         </div>
      </section>

      <section id="servicios" className="py-24 md:py-40 max-w-[1400px] mx-auto px-6 sm:px-10 border-t border-white/10">
         <RevealText>
            <h2 className="font-display font-black text-[clamp(2.5rem,6vw,8rem)] tracking-tighter mb-12 md:mb-20">El <span className="text-[#ff0033]">Arsenal.</span></h2>
         </RevealText>
         
         <div className="border-t border-white/10">
            {[
              { title: "IA & Custom LLMs", icon: <Cpu/>, desc: "Desarrollo de LLMs privados. Entrenamos IA con los manuales de tu empresa.", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1500&auto=format&fit=crop" },
              { title: "Diseño Web Inmersivo", icon: <Globe/>, desc: "Experiencias premiadas. React, Next.js, Webflow con animaciones 3D.", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1500&auto=format&fit=crop" },
              { title: "Voice Agents", icon: <Phone/>, desc: "Clonación vocal hiperrealista. IAs que llaman y agendan citas 24/7.", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1500&auto=format&fit=crop" },
              { title: "Ingeniería de Apps", icon: <Smartphone/>, desc: "Sistemas nativos iOS y Android hiperescalables.", img: "https://images.unsplash.com/photo-1617791160536-598cf32026fe?q=80&w=1500&auto=format&fit=crop" },
              { title: "RPA Automation", icon: <Workflow/>, desc: "Sincronizamos todos tus softwares en piloto automático.", img: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=1500&auto=format&fit=crop" }
            ].map((srv, index) => (
              <div key={index} className="border-b border-white/10 group overflow-hidden cursor-none" onMouseEnter={()=>setCursorState("hover")} onMouseLeave={()=>setCursorState("default")}>
                 <div className="py-8 md:py-12 flex justify-between items-center transition-colors duration-300 group-hover:bg-white/5 md:px-8 text-left">
                    <div className="flex items-center gap-6 md:gap-12">
                       <span className="text-xl md:text-3xl text-white/20 font-bold font-sans group-hover:text-[#ff0033] transition-colors">0{index + 1}</span>
                       <h3 className="font-display font-black text-3xl sm:text-5xl md:text-7xl tracking-tighter text-outline group-hover:text-white transition-colors duration-500">{srv.title}</h3>
                    </div>
                 </div>
                 <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-700 ease-[0.16,1,0.3,1] px-4 md:px-8">
                    <div className="pb-12 flex flex-col md:flex-row gap-8 md:gap-16 items-start text-left">
                       <div className="w-full md:w-1/2 pt-4">
                          <p className="text-white/60 text-lg md:text-2xl font-light leading-relaxed mb-8">{srv.desc}</p>
                       </div>
                       <div className="hidden md:block w-full md:w-1/2 h-[300px] rounded-3xl overflow-hidden shadow-2xl">
                          <img src={srv.img} alt={srv.title} className="w-full h-full object-cover"/>
                       </div>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </section>

      <section id="contacto" className="py-24 md:py-40 px-6 sm:px-10 relative overflow-hidden flex flex-col items-center justify-center min-h-[120vh] bg-[#ff0033] border-t border-black">
         <div className="absolute inset-0 z-0 opacity-[0.15] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none"></div>
         <div className="absolute inset-0 z-0 bg-radial-gradient from-transparent to-[#ff0033] opacity-50"></div>

         <div className="container max-w-[1400px] mx-auto relative z-10 text-center flex flex-col items-center">
            <RevealText>
               <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-black/20 bg-black/10 text-black mb-8">
                  <span className="w-2 h-2 rounded-full bg-black animate-pulse"></span>
                  <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">Agentes Neuronales Desplegados</span>
               </div>
            </RevealText>

            <RevealText delay={0.1}>
              <h2 className="font-display font-black text-[clamp(2rem,8vw,7.5rem)] leading-[0.85] tracking-tighter text-black w-full" onMouseEnter={()=>setCursorState("balloon", "AGENDAR LLAMADA")} onMouseLeave={()=>setCursorState("default")}>
                 PROGRAMA TU <br/> <span className="text-white">SESIÓN CON IA.</span>
              </h2>
            </RevealText>

            <RevealText delay={0.2}>
               <p className="mt-8 md:mt-12 text-black text-lg md:text-2xl font-bold max-w-2xl mx-auto px-4 leading-relaxed font-sans">
                  "No tienes que esperar." <br/> Interacciona con <strong>RODDBOT</strong>, nuestro modelo pre-entrenado, para enviarnos la información vital de tu corporación directamente a nuestra mesa de operaciones.
               </p>
            </RevealText>

            <RevealText delay={0.4} className="w-full">
               <ChatbotForm setCursorState={setCursorState} />
            </RevealText>
         </div>
      </section>

      <footer className="bg-black text-white/50 py-16 px-6 md:px-16">
         <div className="max-w-[1600px] mx-auto grid grid-cols-1 justify-center md:grid-cols-4 md:justify-between items-start gap-12 border-b border-white/10 pb-16 mb-8 text-center md:text-left">
            <div className="col-span-1 md:col-span-2">
               <div className="font-display font-black text-5xl md:text-7xl tracking-tighter text-white mb-6">RODD<span className="text-[#ff0033]">.</span></div>
               <p className="text-xs font-bold tracking-[0.2em] uppercase max-w-sm mx-auto md:mx-0 leading-loose">
                 Agencia creativa y laboratorios de Inteligencia Artificial para corporaciones. El nuevo status quo.
               </p>
            </div>
            <div>
               <h4 className="text-white font-display font-bold text-2xl mb-8">Enlaces</h4>
               <div className="flex flex-col gap-4 text-xs font-bold tracking-widest uppercase">
                  <button onClick={()=>scrollTo('inicio')} className="hover:text-white transition-colors cursor-none text-center md:text-left" onMouseEnter={()=>setCursorState("hover")} onMouseLeave={()=>setCursorState("default")}>Inicio</button>
                  <button onClick={()=>scrollTo('nosotros')} className="hover:text-white transition-colors cursor-none text-center md:text-left" onMouseEnter={()=>setCursorState("hover")} onMouseLeave={()=>setCursorState("default")}>Agencia / ADN</button>
                  <button onClick={()=>scrollTo('servicios')} className="hover:text-white transition-colors cursor-none text-center md:text-left" onMouseEnter={()=>setCursorState("hover")} onMouseLeave={()=>setCursorState("default")}>Servicios</button>
                  <button onClick={()=>scrollTo('proyectos')} className="hover:text-white transition-colors cursor-none text-center md:text-left" onMouseEnter={()=>setCursorState("hover")} onMouseLeave={()=>setCursorState("default")}>Proyectos</button>
               </div>
            </div>
            <div>
               <h4 className="text-white font-display font-bold text-2xl mb-8">Social & Contacto</h4>
               <div className="flex flex-col gap-4 text-xs font-bold tracking-widest uppercase">
                  <a href="https://wa.me/34653567610" target="_blank" rel="noreferrer" className="hover:text-[#25D366] transition-colors cursor-none text-center md:text-left" onMouseEnter={()=>setCursorState("hover")} onMouseLeave={()=>setCursorState("default")}>WhatsApp Negocios</a>
                  <a href="#" className="hover:text-white transition-colors cursor-none text-center md:text-left" onMouseEnter={()=>setCursorState("hover")} onMouseLeave={()=>setCursorState("default")}>Instagram / @rodd_agency</a>
                  <a href="#" className="hover:text-white transition-colors cursor-none text-center md:text-left" onMouseEnter={()=>setCursorState("hover")} onMouseLeave={()=>setCursorState("default")}>LinkedIn Profesional</a>
                  <a href="mailto:info@rodd.es" className="hover:text-[#ff0033] transition-colors cursor-none text-center md:text-left mt-4" onMouseEnter={()=>setCursorState("hover")} onMouseLeave={()=>setCursorState("default")}>info@rodd.es</a>
               </div>
            </div>
         </div>
         
         <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] md:text-xs font-bold text-white/20 tracking-widest uppercase">
            <span>© {new Date().getFullYear()} RODD AGENCY INC. All rights reserved.</span>
            <span className="cursor-none hover:text-white" onMouseEnter={()=>setCursorState("hover")} onMouseLeave={()=>setCursorState("default")}>Operado por Rodrigo Negrete</span>
         </div>
      </footer>
    </div>
  );
}
