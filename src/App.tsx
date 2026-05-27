import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  Quote, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle, 
  ChevronRight, 
  Sparkles, 
  Calendar, 
  Briefcase, 
  Users, 
  MessageSquare,
  Menu,
  X,
  Instagram,
  Facebook,
  Linkedin
} from 'lucide-react';

export default function App() {
  // Navigation active state
  const [activeTab, setActiveTab] = useState('story');
  
  // Image error states for robust fallbacks
  const [heroImgError, setHeroImgError] = useState(false);
  const [founderImgError, setFounderImgError] = useState(false);
  
  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Training & Motivation',
    message: ''
  });
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll position & motion hooks state
  const [scrollY, setScrollY] = useState(0);
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Calculate scroll progress percentage
      const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollHeight > 0) {
        setScrollProgress((currentScrollY / totalScrollHeight) * 100);
      }

      // Shrink/Autohide navigation motion layout:
      // Hide completely on fast scroll-down past 120px to stay clear of content,
      // reveal instantly upon scrolling up even slightly.
      if (currentScrollY > 120) {
        if (currentScrollY > lastScrollY) {
          setNavVisible(false); // scrolling down
        } else {
          setNavVisible(true); // scrolling up
        }
      } else {
        setNavVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Viewport intersection-alike tracker to dynamically highlight the current navigation tab on page scroll
  useEffect(() => {
    const handleActiveOnScroll = () => {
      const sections = ['story', 'services', 'insights', 'contact'];
      // Check current offset to see which section is closest to top
      const scrollPosition = window.scrollY + 220;
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleActiveOnScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleActiveOnScroll);
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Save a snapshotted copy of details to enable pre-filling WhatsApp chat
    setSubmittedData({ ...formData });
    
    // Simulate API Submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'Training & Motivation',
        message: ''
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-lime-brand selection:text-white font-sans scroll-smooth antialiased">
      
      {/* 1. Floating Nav Bar with Scroll-based Navigation Motion */}
      <motion.div 
        initial={{ y: -80, opacity: 0 }}
        animate={{ 
          y: navVisible ? 0 : -100, 
          opacity: navVisible ? 1 : 0,
        }}
        transition={{ duration: 0.28, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 flex flex-col items-center justify-center pt-3 sm:pt-4 px-4 sm:px-8 w-full pointer-events-none transition-all duration-300 ${
          scrollY > 30 ? 'scale-[0.98]' : ''
        }`}
      >
        {/* Soft green/lime loading trace progress bar at the top of header */}
        <div 
          className="absolute top-0 left-0 h-[3.5px] bg-gradient-to-r from-forest via-[#65A30D] to-[#65A30D]/80 z-50 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="w-full max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-3">
          {/* Left Pill (Logo) */}
          <div className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 hover:scale-110 transition-all duration-300 shadow-sm pointer-events-auto ${
            scrollY > 30 
              ? 'bg-white/80 backdrop-blur-md border-slate-200/40 text-forest' 
              : 'bg-white border-slate-100 text-forest'
          }`}>
            <svg className="w-5 h-5 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22C12 22 20 18 20 12C20 6.5 16 2 12 2C8 2 4 6.5 4 12C4 18 12 22 12 22Z" />
              <path d="M12 2V22" />
              <path d="M12 12C12 12 16 10 18 12" />
              <path d="M12 15C12 15 8 13 6 15" />
              <path d="M12 9C12 9 17 7 19 9" />
              <path d="M12 7C12 7 7 5 5 7" />
            </svg>
          </div>

          {/* Right Pill (Links & Button Container) */}
          <div className={`rounded-full px-4 sm:px-8 py-2 md:py-2.5 shadow-sm border flex items-center gap-3 sm:gap-8 md:gap-10 pointer-events-auto transition-all duration-300 ${
            scrollY > 30 
              ? 'bg-white/90 backdrop-blur-md border-slate-200/45 hover:bg-white' 
              : 'bg-white border-slate-100'
          }`}>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="md:hidden text-slate-700 hover:text-forest focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="hidden md:flex items-center gap-6 lg:gap-10">
              {[
                { id: 'story', label: 'Story' }, 
                { id: 'services', label: 'Services' }, 
                { id: 'insights', label: 'Insights' }, 
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(item.id);
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`text-[12px] font-medium transition-colors uppercase tracking-wider relative py-1 ${
                    activeTab === item.id 
                      ? 'text-forest font-bold' 
                      : 'text-slate-600 hover:text-forest'
                  }`}
                >
                  {item.label}
                  {activeTab === item.id && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#65A30D] rounded-full" />
                  )}
                </a>
              ))}
            </div>

            <div className="h-4 w-[1px] bg-slate-200 hidden md:block"></div>

            {/* Bold CTA Button inside Navbar container linking straight to WhatsApp */}
            <a
              href="https://wa.me/26656506092?text=Hello%20Mohau%20Mosoeunyane%2C%20I%20would%20like%20to%20book%20a%20session%20with%20MSM%20Training%20Company%20and%20Counselling%20services."
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center justify-center text-[10px] sm:text-[12px] font-semibold text-white bg-forest hover:bg-lime-brand px-4 sm:px-5 py-2 rounded-full transition-all duration-300 uppercase tracking-widest shrink-0 shadow-sm shadow-forest/10 hover:shadow-md cursor-pointer"
            >
              Book a Session
            </a>
          </div>
        </div>

        {/* Mobile Menu Dropdown Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-2 w-full max-w-[90%] bg-white rounded-2xl shadow-xl border border-slate-100 p-6 pointer-events-auto"
            >
              <div className="flex flex-col gap-4">
                {[
                  { id: 'story', label: 'Story - Meet Mohau' }, 
                  { id: 'services', label: 'Services & Modules' }, 
                  { id: 'insights', label: 'Words of Wisdom' }, 
                  { id: 'contact', label: 'Consultation & Contact' }
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                      document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                      activeTab === item.id 
                        ? 'bg-forest/5 text-forest font-bold' 
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>


      {/* 2. Premium 3D Hero Section */}
      <section className="relative min-h-[550px] xs:min-h-[600px] sm:min-h-[660px] md:min-h-[720px] lg:h-[530px] xl:h-[610px] 2xl:h-[670px] overflow-hidden bg-[#EFEFEF] mt-[-70px] pt-24 pb-0 flex flex-col justify-between">
        
        {/* Abstract 3D-feeling geometric grid background */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/4 -left-12 w-96 h-96 rounded-full border-[32px] border-forest filter blur-xl"></div>
          <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] rounded-full border-[1px] border-slate-500/30"></div>
          <div className="absolute top-12 right-20 w-80 h-80 bg-lime-light/20 rounded-full filter blur-3xl"></div>
          <div className="w-full h-full bg-[linear-gradient(rgba(15,46,34,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,46,34,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        {/* Large Decorative Typographic Accent Behind Hero */}
        <div className="absolute top-[35%] right-0 -translate-y-1/2 select-none pointer-events-none z-0 overflow-hidden w-full text-right pr-6 sm:pr-12 md:pr-24 lg:pr-32">
          <h2 className="text-[13vw] font-black tracking-widest text-[#0F2E22]/6 uppercase leading-none font-mono">
            SUCCESS
          </h2>
        </div>

        <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 md:px-20 lg:px-28 z-20 relative flex flex-col lg:flex-row items-stretch justify-between h-full">
          
          {/* Left Column (Text Content) - Responsive layer */}
          <div className="relative z-20 w-[72%] xs:w-[68%] sm:w-[60%] lg:w-[55%] flex flex-col justify-center min-h-[56vh] lg:min-h-0 px-5 lg:px-0 pt-20 pb-4 lg:pt-6 lg:pb-16 text-left">
            
            {/* Badge Link */}
            <a 
              href="#story"
              className="inline-flex self-start items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-widest font-semibold text-[#65A30D] bg-[#0F2E22]/10 rounded-full px-3.5 py-1.5 group mb-5 sm:mb-6 hover:bg-[#0F2E22]/15 transition-all duration-300"
            >
              <span>Mohau & The Success Masters</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>

            {/* Headline */}
            <h1 className="text-[1.85rem] sm:text-4.5xl md:text-5xl lg:text-5xl xl:text-6xl leading-[1.12] font-black text-[#0F2E22] tracking-tight mb-4 sm:mb-5">
              We train, motivate, <span className="text-[#65A30D]">empower</span> and connect.
            </h1>

            {/* Subtext */}
            <p className="text-[13px] sm:text-[15px] md:text-[15.5px] text-slate-600 font-normal leading-relaxed mb-6 sm:mb-8 max-w-md">
              Partnering with individuals, government ministries, peer groups, and corporate organizations to dismantle restrictive boundaries and unlock true legacy success.
            </p>

            {/* Buttons Container */}
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 max-w-[240px] sm:max-w-none mt-2 sm:mt-0 relative z-30 w-full sm:w-auto">
              <a
                href="https://wa.me/26656506092?text=Hello%20Mohau%20Mosoeunyane%2C%20I%20would%20like%20to%20get%20started%20and%20book%20a%20consultation%20with%20MSM%20Training%20Company%20and%20Counselling%20services."
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center font-bold text-[11px] sm:text-[12px] md:text-[13px] uppercase tracking-wider text-white bg-[#65A30D] hover:bg-[#0F2E22] py-3.5 px-6 sm:px-7 rounded shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer w-full sm:w-auto text-center"
              >
                Get Started
              </a>
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center font-bold text-[11px] sm:text-[12px] md:text-[13px] uppercase tracking-wider text-[#0F2E22] border-2 border-[#0F2E22]/20 hover:border-[#0F2E22] py-3 px-6 sm:px-7 rounded bg-white/20 hover:bg-white/40 transition-all duration-300 w-full sm:w-auto text-center"
              >
                View Services
              </button>
            </div>
            
          </div>

          {/* Right Column Spacer (Preserves side-by-side sizing on desktop) */}
          <div className="hidden lg:block lg:w-[45%] h-full pointer-events-none relative z-20"></div>

        </div>

        {/* Character Cutout - Positioned relative to the viewport/section container for absolute pixel alignment */}
        {!heroImgError ? (
          <img
            src="/Images/heroimg.png"
            alt="Mohau Mosoeunyane confidently standing"
            onError={() => setHeroImgError(true)}
            className="absolute bottom-0 right-0 h-[40vh] sm:h-[37vh] md:h-[40vh] lg:h-[90vh] xl:h-[96vh] w-auto object-contain object-bottom select-none pointer-events-none transform translate-x-[6%] translate-y-[4%] lg:translate-x-[1.5%] lg:translate-y-[6%] z-10 md:z-10 lg:z-10 transition-transform duration-700 ease-out hover:scale-[1.03] filter drop-shadow-[0_20px_40px_rgba(15,46,34,0.22)]"
          />
        ) : (
          /* High-End Vector Graphic Placeholder if Image is Missing/Failing */
          <div className="absolute bottom-4 lg:bottom-12 right-6 lg:right-12 z-20 text-center animate-fade-in pointer-events-auto flex justify-center w-full lg:w-auto left-0 lg:left-auto">
            <div className="p-6 md:p-8 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/50 shadow-2xl max-w-xs sm:max-w-sm flex flex-col items-center gap-4 hover:scale-[1.01] transition-transform duration-300">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-forest rounded-full flex items-center justify-center text-white relative shadow-lg">
                <span className="text-2xl sm:text-3xl font-black font-mono tracking-tighter">MM</span>
                <div className="absolute -bottom-1 -right-1 bg-lime-light p-1.5 rounded-full text-forest">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-base sm:text-lg text-forest">Mohau Mosoeunyane</h4>
                <p className="text-[10px] sm:text-xs text-[#65A30D] uppercase tracking-widest font-semibold mt-1">Founder & Chief Consultant</p>
                <p className="text-slate-500 text-[11px] sm:text-xs mt-2 sm:mt-3 leading-relaxed">
                  "Unlocking deep financial understanding & organizational mindsets across Southern Africa."
                </p>
              </div>
              <div className="flex gap-2 mt-1 sm:mt-2">
                <span className="text-[9px] sm:text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded font-medium">Motivate</span>
                <span className="text-[9px] sm:text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded font-medium">Train</span>
                <span className="text-[9px] sm:text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded font-medium">Empower</span>
              </div>
            </div>
          </div>
        )}

        {/* Studio-light gradient bar bottom divider - Anchored absolutely at the bottom for rock-solid stability */}
        <div className="absolute bottom-0 left-0 w-full h-[6px] bg-gradient-to-r from-forest via-[#65A30D] to-forest/20 z-30"></div>
      </section>


      {/* 3. Meet the Founder / Chief Trainer Section */}
      <section id="story" className="py-20 sm:py-28 bg-[#F1F5F9] relative overflow-hidden">
        {/* Subtle decorative shapes */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-forest/5 rounded-bl-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/60 rounded-tr-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Side: Portrait Image with Fallback */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute inset-4 border-2 border-[#65A30D] translate-x-3 translate-y-3 rounded-lg -z-10 group-hover:translate-x-1.5 group-hover:translate-y-1.5 transition-transform duration-500"></div>
              
              <div className="bg-white p-3 rounded-lg shadow-xl overflow-hidden relative">
                
                {/* Image element */}
                <img
                  src="/assets/702684658...n.jpg"
                  alt="Mohau Mosoeunyane in crisp white shirt, sharp suit jacket over his shoulder, and a bold red tie"
                  onError={() => {
                    setFounderImgError(true);
                  }}
                  className={`w-full h-auto aspect-[3/4] object-cover rounded shadow-inner filter grayscale-10 hover:grayscale-0 transition-all duration-700 ease-in-out ${
                    founderImgError ? 'hidden' : 'block'
                  }`}
                />

                {/* Highly Designed Corporate Art Portrait Fallback if file isn't uploaded */}
                {founderImgError && (
                  <div className="w-full aspect-[3/4] min-h-[460px] sm:min-h-0 rounded bg-gradient-to-br from-forest to-slate-900 flex flex-col justify-between p-6 sm:p-8 text-white relative overflow-hidden">
                    {/* Glowing background circles */}
                    <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-lime-light/10 blur-xl"></div>
                    <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full bg-forest/30 blur-lg"></div>

                    {/* Logo/Insignia */}
                    <div className="flex justify-between items-start z-10">
                      <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
                        <svg className="w-5 h-5 text-lime-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-lime-brand bg-white/10 px-2.5 py-1 rounded">
                        MSM EXECUTIVE
                      </span>
                    </div>

                    {/* Styled Avatar Composition mimicking the description */}
                    <div className="my-auto flex flex-col items-center justify-center py-4 sm:py-6 relative z-10">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-lime-light/40 bg-zinc-800 flex items-center justify-center p-1 sm:p-1.5 shadow-2xl relative">
                        {/* Stylized jacket collar and neck tie silhouette in pure SVG */}
                        <svg className="w-full h-full text-slate-100" viewBox="0 0 64 64" fill="none">
                          <circle cx="32" cy="18" r="10" fill="currentColor" opacity="0.9" />
                          {/* suit jacket behind */}
                          <path d="M14 54 C14 42, 20 38, 32 38 C44 38, 50 42, 50 54" fill="#0F2E22" />
                          {/* white collar */}
                          <path d="M26 38 L32 46 L38 38 C35 34, 29 34, 26 38" fill="#FFFFFF" />
                          {/* bold red tie */}
                          <path d="M30 43 L32 58 L34 43 L32 41 Z" fill="#EF4444" />
                        </svg>
                      </div>
                      <span className="text-[11px] font-mono text-zinc-400 mt-4 tracking-widest uppercase">Consultant Practitioner</span>
                    </div>

                    {/* Portrait Frame Footer Info */}
                    <div className="z-10 text-left border-t border-white/10 pt-3 sm:pt-4">
                      <h4 className="text-lg sm:text-xl font-bold tracking-tight text-white">Mohau Mosoeunyane</h4>
                      <p className="text-[11px] sm:text-xs text-lime-light font-medium uppercase tracking-wider mt-0.5">
                        Founder & Chief Motivator
                      </p>
                    </div>
                  </div>
                )}

                {/* Overlaid Badge */}
                {!founderImgError && (
                  <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-forest text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md shadow-lg z-30">
                    <p className="text-[10px] uppercase tracking-widest text-[#65A30D] font-bold">FOUNDER CERTIFIED</p>
                    <p className="text-xs font-semibold">The Success Masters</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side: Biography Content */}
            <div className="lg:col-span-7 text-left">
              
              <div className="flex items-center gap-2 mb-3">
                <span className="h-0.5 w-8 bg-[#65A30D]"></span>
                <span className="text-xs uppercase tracking-widest text-[#65A30D] font-bold">OUR FOUNDING MISSION</span>
              </div>

              <h2 className="text-[#0F2E22] font-black text-3xl md:text-4xl lg:text-5xl tracking-tight mb-6">
                Meet Mohau Mosoeunyane
              </h2>

              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                <p>
                  Some are born to lead, others to inspire. Mohau Mosoeunyane is driven by a deep, unwavering mission to equip individuals and organizations with the exact blueprints required to master the complex dynamics of sustainable growth.
                </p>
                
                <p className="border-l-4 border-[#65A30D] pl-4 italic text-[#0F2E22] font-medium my-4 bg-lime-brand/5 py-3 rounded-r">
                  "Debt is not structural decay unless it is governed by ignorance. Financial literacy is the shield that converts simple assets into immense forward-moving structures."
                </p>

                <p>
                  Through MSM Training Company and Counselling Services, Mohau has successfully partnered with government departments, corporate boards, and local community leaders. His comprehensive modules focus on correcting the foundational mindsets surrounding wealth, correcting workplace inefficiencies, developing structural leadership, and restoring mental clarity through secure, professional therapeutic processes.
                </p>
              </div>

              {/* Bio Checklist Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 pb-8 border-b border-slate-200">
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-[#65A30D] shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-slate-800">Elite Professional Motivation Systems</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-[#65A30D] shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-slate-800">Guaranteed 100% Secure Counselling</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-[#65A30D] shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-slate-800">Government-Scale Training Modules</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-[#65A30D] shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-slate-800">Pragmatic Financial Mindset Strategy</span>
                </div>
              </div>

              {/* Company Metrics Grid */}
              <div className="grid grid-cols-3 gap-4 pt-8 text-center sm:text-left">
                <div>
                  <h5 className="text-2xl sm:text-3xl font-black text-forest font-mono">10K+</h5>
                  <p className="text-[11px] text-slate-500 uppercase tracking-wider mt-1 font-semibold">Lives Guided</p>
                </div>
                <div className="border-l border-slate-200 pl-4 sm:pl-6">
                  <h5 className="text-2xl sm:text-3xl font-black text-forest font-mono">15+</h5>
                  <p className="text-[11px] text-slate-500 uppercase tracking-wider mt-1 font-semibold">Ministries Served</p>
                </div>
                <div className="border-l border-slate-200 pl-4 sm:pl-6">
                  <h5 className="text-2xl sm:text-3xl font-black text-forest font-mono">100%</h5>
                  <p className="text-[11px] text-slate-500 uppercase tracking-wider mt-1 font-semibold">Strict Privacy</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* 4. Who We Serve & Core Services Grid */}
      <section id="services" className="py-20 sm:py-28 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-28">
          
          {/* Header Introduction */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-[#65A30D] font-extrabold bg-[#65A30D]/10 rounded-full px-4 py-1.5 inline-block mb-3">
              WHAT WE OPERATE
            </span>
            <h2 className="text-[#0F2E22] font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
              Our Professional Verticals
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              MSM delivers executive solutions, mind training and direct mental support. We establish frameworks designed to elevate corporate, governmental, and private units.
            </p>
          </div>

          {/* Three Clean Component Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Training & Motivation */}
            <div className="group bg-slate-50 p-6 sm:p-8 rounded-xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-forest/20 transition-all duration-300 flex flex-col justify-between text-left">
              <div>
                {/* Icon Wrapper */}
                <div className="w-12 h-12 bg-forest/5 rounded-lg flex items-center justify-center text-forest mb-6 group-hover:bg-forest group-hover:text-white transition-all duration-300">
                  <Award className="w-6 h-6" />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-forest mb-3">
                  Training & Motivation
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  Custom high-performance programs built directly for businesses, corporate agencies, and government ministries looking to revolutionize output and workflow design.
                </p>

                {/* Vertical Specific Bullet Points */}
                <ul className="space-y-2.5 mb-8 border-t border-slate-200/60 pt-4">
                  <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <ChevronRight className="w-4 h-4 text-[#65A30D] shrink-0 mt-0.5" />
                    <span>Workplace optimization & efficiency</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <ChevronRight className="w-4 h-4 text-[#65A30D] shrink-0 mt-0.5" />
                    <span>High-performance mindset models</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <ChevronRight className="w-4 h-4 text-[#65A30D] shrink-0 mt-0.5" />
                    <span>Government structural consultancies</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <ChevronRight className="w-4 h-4 text-[#65A30D] shrink-0 mt-0.5" />
                    <span>Group motivation & speaker panels</span>
                  </li>
                </ul>
              </div>

              <a 
                href="https://wa.me/26656506092?text=Hello%20Mohau%20Mosoeunyane%2C%20I%20am%20interested%20in%20inquiring%20about%20your%20Training%20%26%20Motivation%20services%20with%20MSM%20Training%20Company%20and%20Counselling%20services."
                target="_blank"
                rel="noreferrer noopener"
                className="mt-auto inline-flex items-center gap-1.5 text-xs text-forest group-hover:text-[#65A30D] font-bold group-hover:translate-x-1 transition-all duration-300 uppercase tracking-wider text-left cursor-pointer"
              >
                <span>Inquire Service</span> 
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Card 2: Financial Literacy Education */}
            <div className="group bg-white p-6 sm:p-8 rounded-xl border-2 border-forest/10 shadow-md hover:shadow-xl hover:border-forest transition-all duration-300 flex flex-col justify-between text-left relative overflow-hidden">
              {/* Highlight sash or element */}
              <div className="absolute top-0 right-0 bg-[#65A30D] text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl">
                FLAGSHIP
              </div>

              <div>
                {/* Icon Wrapper */}
                <div className="w-12 h-12 bg-[#65A30D]/10 rounded-lg flex items-center justify-center text-[#65A30D] mb-6 group-hover:bg-[#65A30D] group-hover:text-white transition-all duration-300">
                  <TrendingUp className="w-6 h-6" />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-forest mb-3 flex items-center gap-2">
                  <span>Financial Literacy</span>
                </h3>

                {/* Mascot Core Motto */}
                <div className="mb-4 bg-forest text-white rounded p-3 text-xs font-mono border-l-4 border-lime-light">
                  "Se ka ts'aba mokoloto. Ithute ho sebelisa mokoloto ho aha leruo!"
                </div>
                
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  Elite wealth systems engineered to reformat how money is perceived, conserved, and correctly leveraged to build structural generational holdings.
                </p>

                {/* Vertical Specific Bullet Points */}
                <ul className="space-y-2.5 mb-8 border-t border-slate-200/60 pt-4">
                  <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <ChevronRight className="w-4 h-4 text-[#65A30D] shrink-0 mt-0.5" />
                    <span className="font-semibold">Leveraged debt strategy systems</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <ChevronRight className="w-4 h-4 text-[#65A30D] shrink-0 mt-0.5" />
                    <span>Wealth building & allocation guides</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <ChevronRight className="w-4 h-4 text-[#65A30D] shrink-0 mt-0.5" />
                    <span>Savings mindsets & wealth preservation</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <ChevronRight className="w-4 h-4 text-[#65A30D] shrink-0 mt-0.5" />
                    <span>Corporate wealth & benefits guidance</span>
                  </li>
                </ul>
              </div>

              <a 
                href="https://wa.me/26656506092?text=Hello%20Mohau%20Mosoeunyane%2C%20I%20am%20interested%20in%20learning%20more%20about%20your%20Financial%20Literacy%2520Education%20curriculum%20with%20MSM%20Training%20Company%20and%20Counselling%20services."
                target="_blank"
                rel="noreferrer noopener"
                className="mt-auto inline-flex items-center gap-1.5 text-xs text-[#65A30D] group-hover:text-forest font-bold group-hover:translate-x-1 transition-all duration-300 uppercase tracking-wider text-left cursor-pointer"
              >
                <span>Read Curriculum</span> 
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Card 3: Counselling Services */}
            <div className="group bg-slate-50 p-6 sm:p-8 rounded-xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-forest/20 transition-all duration-300 flex flex-col justify-between text-left">
              <div>
                {/* Icon Wrapper */}
                <div className="w-12 h-12 bg-forest/5 rounded-lg flex items-center justify-center text-forest mb-6 group-hover:bg-forest group-hover:text-white transition-all duration-300">
                  <ShieldCheck className="w-6 h-6" />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-forest mb-3">
                  Counselling Services
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  Completely private, safe, and elite counseling systems modeled for corporate stress points, group motivation alignments, or high-urgency individual blockages.
                </p>

                {/* Vertical Specific Bullet Points */}
                <ul className="space-y-2.5 mb-8 border-t border-slate-200/60 pt-4">
                  <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <ChevronRight className="w-4 h-4 text-[#65A30D] shrink-0 mt-0.5" />
                    <span className="font-semibold">Guaranteed premium confidentiality</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <ChevronRight className="w-4 h-4 text-[#65A30D] shrink-0 mt-0.5" />
                    <span>Substance & behavioral recovery plans</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <ChevronRight className="w-4 h-4 text-[#65A30D] shrink-0 mt-0.5" />
                    <span>Executive stress & anxiety frameworks</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <ChevronRight className="w-4 h-4 text-[#65A30D] shrink-0 mt-0.5" />
                    <span>Trauma resolution & life mapping</span>
                  </li>
                </ul>
              </div>

              <a 
                href="https://wa.me/26656506092?text=Hello%20Mohau%20Mosoeunyane%2C%20I%20would%20like%20to%21book%20a%20highly%20confidential%20counselling%20session%20with%20MSM%20Training%20Company%20and%20Counselling%20services."
                target="_blank"
                rel="noreferrer noopener"
                className="mt-auto inline-flex items-center gap-1.5 text-xs text-forest group-hover:text-[#65A30D] font-bold group-hover:translate-x-1 transition-all duration-300 uppercase tracking-wider text-left cursor-pointer"
              >
                <span>Book Confidentially</span> 
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Quick statement on bottom */}
          <div className="mt-16 bg-[#0F2E22] text-white rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#65A30D]/10 rounded-full blur-xl"></div>
            <div className="text-left max-w-xl">
              <h4 className="text-lg font-bold mb-1">Do you represent a corporate or government body?</h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Contact our executive desk to book custom training dates, workshop curricula, or discrete group therapy alignment tracks for your team.
              </p>
            </div>
            <a
              href="https://wa.me/26656506092?text=Hello%20Mohau%20Mosoeunyane%2C%20I%20represent%20a%23corporate%20or%20government%20body%20and%20would%20like%20to%20discuss%20custom%20training%20workshops%20with%20MSM%20Training%20Company%20and%20Counselling%20services."
              target="_blank"
              rel="noreferrer noopener"
              className="px-6 py-3 bg-[#65A30D] text-white font-bold text-xs uppercase tracking-wider rounded hover:bg-white hover:text-forest transition-all shrink-0 cursor-pointer"
            >
              Contact Advisory Desk
            </a>
          </div>

        </div>
      </section>


      {/* 5. Daily Inspiration / Quotes Section */}
      <section id="insights" className="py-20 sm:py-28 bg-[#F8FAFC] relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-28">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-baseline justify-between mb-16 gap-4 text-left">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#65A30D] font-extrabold block mb-2">
                DAILY MANIFESTO
              </span>
              <h2 className="text-[#0F2E22] font-black text-3xl sm:text-4xl tracking-tight">
                Words of Wisdom
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 uppercase tracking-widest font-mono">
                by Mohau Mosoeunyane
              </p>
            </div>
            <div className="h-[2px] bg-slate-200 flex-grow hidden sm:block mx-8"></div>
            <span className="text-xs font-mono text-[#65A30D] font-bold uppercase whitespace-nowrap">
              Legacy Knowledge Systems
            </span>
          </div>

          {/* Clean Quote Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Quote 1 */}
            <div className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 relative flex flex-col justify-between text-left">
              <div>
                <Quote className="w-10 h-10 text-[#65A30D] opacity-20 mb-4" />
                <p className="text-base sm:text-lg font-semibold text-forest leading-relaxed mb-6">
                  "A salary can feed you... But financial knowledge can change your future."
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-forest">Mohau Mosoeunyane</span>
                  <span className="block text-[10px] text-slate-400">Chief Motivator</span>
                </div>
                <span className="text-[10px] font-mono text-lime-brand bg-lime-brand/5 px-2 py-0.5 rounded">MM-01</span>
              </div>
            </div>

            {/* Quote 2 */}
            <div className="bg-[#0F2E22] text-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between text-left">
              <div>
                <Quote className="w-10 h-10 text-lime-light opacity-30 mb-4" />
                <p className="text-base sm:text-lg font-bold text-white leading-relaxed mb-6">
                  "Have your why for money so strong that all excuses don't get a chance to stop you!"
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white">Mohau Mosoeunyane</span>
                  <span className="block text-[10px] text-slate-300 font-mono">Lesotho Keynote</span>
                </div>
                <span className="text-[10px] font-mono text-lime-light bg-white/10 px-2 py-0.5 rounded">MM-02</span>
              </div>
            </div>

            {/* Quote 3 */}
            <div className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 relative flex flex-col justify-between text-left">
              <div>
                <Quote className="w-10 h-10 text-[#65A30D] opacity-20 mb-4" />
                <p className="text-base sm:text-lg font-semibold text-forest leading-relaxed mb-6">
                  "It is impossible to become rich if you can't save money!"
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-forest">Mohau Mosoeunyane</span>
                  <span className="block text-[10px] text-slate-400">Financial Coach</span>
                </div>
                <span className="text-[10px] font-mono text-lime-brand bg-lime-brand/5 px-2 py-0.5 rounded">MM-03</span>
              </div>
            </div>

          </div>

          {/* Extra motivation block */}
          <div className="mt-12 text-center">
            <span className="inline-flex items-center gap-1 text-slate-500 text-xs">
              <span>Read the full leadership library inside his official Masterclass sessions</span>
              <Sparkles className="w-3.5 h-3.5 text-lime-brand" />
            </span>
          </div>

        </div>
      </section>


      {/* 6. Corporate Contact & Booking Form (Footer Section) */}
      <section id="contact" className="bg-[#0F2E22] text-white pt-20 pb-12 relative overflow-hidden">
        {/* Subtle decorative mesh */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-28">
          
          {/* Main top grid split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/10 text-left">
            
            {/* Left Box (Contact Information) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 mb-4 bg-white/10 px-3.5 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-[#84CC16]"></span>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#84CC16]">OFFICIAL BOOKING DESK</span>
                </div>
                
                <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                  Schedule an Executive Consultation
                </h3>
                
                <p className="text-sm text-slate-300 leading-relaxed mb-8">
                  Get in touch with Mohau Mosoeunyane and MSM Training Company and Counselling services to finalize booking dates, secure personal therapy slots, or schedule tailored corporate training workshops across South Africa, Lesotho, Swaziland, Botswana, and regional boards.
                </p>

                {/* Direct info list */}
                <div className="space-y-4.5">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-lime-light shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-xs uppercase tracking-wide text-lime-light">Maseru Main Office</h5>
                      <p className="text-sm text-slate-300 font-medium">Maseru, Maseru, Lesotho, 100</p>
                      <p className="text-xs text-lime-light font-semibold mt-0.5 uppercase tracking-wider">Always open</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-lime-light shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
                      <path d="M2 12h20"/>
                    </svg>
                    <div>
                      <h5 className="font-bold text-xs uppercase tracking-wide text-lime-light">Regions Served</h5>
                      <p className="text-[12px] text-slate-300 leading-relaxed">
                        Maseru, Lesotho · Mbabane, Swaziland · Pretoria, South Africa · Gauteng · Gaborone, Botswana · Bloemfontein, South Africa
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-lime-light shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-xs uppercase tracking-wide text-lime-light">Phone / WhatsApp Line</h5>
                      <p className="text-sm text-slate-300">
                        <a href="tel:+26656506092" className="hover:text-white transition-colors font-medium">+266 5650 6092</a> / <a href="tel:56506092" className="hover:text-white transition-colors">5650 6092</a>
                      </p>
                      <p className="text-xs text-[#84CC16] font-semibold mt-0.5">
                        <a href="https://wa.me/26656506092" target="_blank" rel="noreferrer noopener" className="hover:underline flex items-center gap-1">
                          <span>Chat instantly on WhatsApp</span> →
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-lime-light shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-xs uppercase tracking-wide text-lime-light">Email Direct</h5>
                      <p className="text-sm text-slate-300 underline underline-offset-4">
                        <a href="mailto:mohau11459@gmail.com" className="hover:text-white transition-colors">mohau11459@gmail.com</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Badge */}
              <div className="mt-8 pt-6 border-t border-white/10 hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/5 rounded">
                    <ShieldCheck className="w-6 h-6 text-lime-light" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-white">Confidential & SECURE</span>
                    <span className="block text-[10px] text-slate-400">Rest assured that your records and sessions are completely private.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Box (Consultation Form Container) */}
            <div className="lg:col-span-7">
              <div className="bg-white text-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl relative">
                
                {isSubmitted ? (
                  <div className="py-10 px-4 text-center animate-fade-in">
                    <div className="w-16 h-16 bg-[#0F2E22] text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <CheckCircle className="w-8 h-8 text-[#84CC16]" />
                    </div>
                    <h4 className="text-2xl font-black text-forest mb-2">Request Saved!</h4>
                    <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
                      Thank you! Your information has been registered. For immediate booking confirmation and priority advice, click below to send your request straight to Mohau Mosoeunyane on WhatsApp:
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                      <a 
                        href={`https://wa.me/26656506092?text=${encodeURIComponent(
                          `Hello Mohau Mosoeunyane,\n\nI just filled out the Consultation Booking Form on your website for MSM Training Company and Counselling services with the following details:\n\n` +
                          `• *Name/Org*: ${submittedData?.name || 'Interested Client'}\n` +
                          `• *Email*: ${submittedData?.email || '-'}\n` +
                          `• *Phone*: ${submittedData?.phone || '-'}\n` +
                          `• *Specialty Suite*: ${submittedData?.service || 'General Consultation'}\n` +
                          `• *Requirements*: ${submittedData?.message || 'Ready to start!'}`
                        )}`}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs font-bold uppercase tracking-widest rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer w-full sm:w-auto text-center justify-center"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Send via WhatsApp</span>
                      </a>
                      <button 
                        onClick={() => setIsSubmitted(false)}
                        className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors w-full sm:w-auto"
                      >
                        Edit / Fill Again
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <h4 className="text-xl font-bold text-forest text-left mb-2">Consultation Booking Form</h4>
                    <p className="text-xs text-slate-500 text-left mb-6">Please complete your details below. Fields with * are required.</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="flex flex-col text-left">
                        <label htmlFor="name" className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                          Name / Organization *
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleFormChange}
                          placeholder="Mohamed / Government Board"
                          className="px-4 py-2.5 rounded border border-slate-200 text-sm focus:outline-none focus:border-forest/50 transition-colors bg-slate-50"
                        />
                      </div>

                      {/* Email */}
                      <div className="flex flex-col text-left">
                        <label htmlFor="email" className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                          Email Address *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleFormChange}
                          placeholder="yourname@domain.com"
                          className="px-4 py-2.5 rounded border border-slate-200 text-sm focus:outline-none focus:border-forest/50 transition-colors bg-slate-50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone Number */}
                      <div className="flex flex-col text-left">
                        <label htmlFor="phone" className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleFormChange}
                          placeholder="+266 5..."
                          className="px-4 py-2.5 rounded border border-slate-200 text-sm focus:outline-none focus:border-forest/50 transition-colors bg-slate-50"
                        />
                      </div>

                      {/* Service Selector dropdown */}
                      <div className="flex flex-col text-left">
                        <label htmlFor="service" className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                          Needed Specialty Suite *
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleFormChange}
                          className="px-4 py-2.5 rounded border border-slate-200 text-sm focus:outline-none focus:border-forest/50 transition-colors bg-slate-50"
                        >
                          <option value="Training & Motivation">Training & Motivation</option>
                          <option value="Financial Literacy Education">Financial Literacy Education</option>
                          <option value="Counselling Services">Counselling Services</option>
                          <option value="Government Consulting Services">Government Consulting Services</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col text-left">
                      <label htmlFor="message" className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                        Consultation Summary / Requirements
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleFormChange}
                        placeholder="Detail your requirements here, e.g. number of staff to train, personal slot interest..."
                        className="px-4 py-2.5 rounded border border-slate-200 text-sm focus:outline-none focus:border-forest/50 transition-colors bg-slate-50 resize-y"
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#0F2E22] hover:bg-lime-brand text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending Advisory Request...</span>
                        </>
                      ) : (
                        <>
                          <Calendar className="w-4 h-4" />
                          <span>Request Booking Session</span>
                        </>
                      )}
                    </button>
                    
                    <p className="text-[10px] text-slate-400 text-center mt-2">
                      Protected by secure confidentiality regulations. Details are kept 100% private.
                    </p>
                  </form>
                )}

              </div>
            </div>

          </div>

          {/* Footer Base Info Block */}
          <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-300">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-lime-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 22C12 22 20 18 20 12C20 6.5 16 2 12 2C8 2 4 6.5 4 12C4 18 12 22 12 22Z" />
                </svg>
              </div>
              <div className="text-left">
                <span className="block font-bold text-white text-xs tracking-wider uppercase">MSM Training Company and Counselling services</span>
                <span className="block text-[11px] text-slate-400">
                  © 2026 The Success Masters. All Rights Reserved. | Made by <a href="https://apex.dev" target="_blank" rel="noreferrer noopener" className="hover:text-lime-light transition-colors underline font-medium">apex.dev</a>
                </span>
              </div>
            </div>

            {/* Social Anchor Links */}
            <div className="flex items-center gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer noopener"
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#65A30D] transition-all"
                aria-label="Facebook Profile"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer noopener"
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#65A30D] transition-all"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer noopener"
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#65A30D] transition-all"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 7. Premium Floating WhatsApp Button */}
      <a
        href="https://wa.me/26656506092?text=Hello%20Mohau%20Mosoeunyane%2C%20I%20would%20like%20to%20book%20a%20session%20with%20MSM%20Training%20Company%20and%20Counselling%20services."
        target="_blank"
        rel="noreferrer noopener"
        className="fixed bottom-6 right-6 z-50 p-4 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-[#128C7E] transition-all hover:scale-110 active:scale-95 group"
        aria-label="Direct Chat on WhatsApp"
      >
        <span className="absolute -top-10 right-0 bg-[#0F2E22] text-white text-[10px] uppercase tracking-widest font-bold font-mono px-2.5 py-1 rounded shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-[#65A30D]/20">
          Chat With Mohau
        </span>
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12.008.01a11.95 11.95 0 0 0-8.477 3.513A11.96 11.96 0 0 0 .026 12c.001 2.097.548 4.142 1.589 5.946L0 24l6.335-1.662c1.751.953 3.719 1.454 5.724 1.455 6.613 0 11.949-5.34 11.953-11.997A11.96 11.96 0 0 0 12.008.01zm0 21.948h-.005a9.92 9.92 0 0 1-5.068-1.393l-.362-.215-3.766.988 1.005-3.673-.235-.375a9.914 9.914 0 0 1-1.523-5.289c.002-5.467 4.453-9.917 9.924-9.917a9.88 9.88 0 0 1 7.016 2.909c2.443 2.443 2.446 6.425 0 8.868-1.87 1.868-4.35 2.898-7.006 2.898z" />
        </svg>
      </a>

    </div>
  );
}
