import { Button } from '@/components/ui/button'
import { motion, useReducedMotion } from 'framer-motion'
import {
  BadgeDollarSign,
  Compass,
  CreditCard,
  MapPinned,
  ShieldCheck,
  Sparkles,
  Plane,
  Hotel,
  ArrowRight,
  Route,
} from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  const prefersReducedMotion = useReducedMotion()

  const advantages = [
    {
      icon: BadgeDollarSign,
      title: 'Budget Optimization',
      description: 'Build memorable trips with smarter plans that align closely with your budget limits.',
      colorClass: 'text-amber-400',
      bgClass: 'bg-amber-500/5 border-amber-500/20',
      glowClass: 'group-hover:border-amber-500/30 group-hover:shadow-[0_12px_35px_rgba(245,158,11,0.08)]',
      topGlow: 'from-transparent via-amber-500 to-transparent'
    },
    {
      icon: CreditCard,
      title: 'Cost Transparency',
      description: 'Review clear, localized budget ranges for food, hotels, and activities before you fly.',
      colorClass: 'text-rose-400',
      bgClass: 'bg-rose-500/5 border-rose-500/20',
      glowClass: 'group-hover:border-rose-500/30 group-hover:shadow-[0_12px_35px_rgba(244,63,94,0.08)]',
      topGlow: 'from-transparent via-rose-500 to-transparent'
    },
    {
      icon: Compass,
      title: 'Smart Itineraries',
      description: 'AI handles daily route layouts so you spend less time planning and more exploring.',
      colorClass: 'text-indigo-400',
      bgClass: 'bg-indigo-500/5 border-indigo-500/20',
      glowClass: 'group-hover:border-indigo-500/30 group-hover:shadow-[0_12px_35px_rgba(99,102,241,0.08)]',
      topGlow: 'from-transparent via-indigo-500 to-transparent'
    },
    {
      icon: ShieldCheck,
      title: 'Reliable Stays',
      description: 'Discover popular hotel recommendations curated around your group and travel style.',
      colorClass: 'text-emerald-400',
      bgClass: 'bg-emerald-500/5 border-emerald-500/20',
      glowClass: 'group-hover:border-emerald-500/30 group-hover:shadow-[0_12px_35px_rgba(16,185,129,0.08)]',
      topGlow: 'from-transparent via-emerald-500 to-transparent'
    },
    {
      icon: MapPinned,
      title: 'Explore Confidently',
      description: 'View custom visual roadmaps filled with sightseeing, foods, and local experiences.',
      colorClass: 'text-sky-400',
      bgClass: 'bg-sky-500/5 border-sky-500/20',
      glowClass: 'group-hover:border-sky-500/30 group-hover:shadow-[0_12px_35px_rgba(56,189,248,0.08)]',
      topGlow: 'from-transparent via-sky-500 to-transparent'
    },
  ]

  const cardsContainerVariants = {
    hidden: {},
    show: {
      transition: prefersReducedMotion
        ? { staggerChildren: 0 }
        : { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  }

  const cardVariants = {
    hidden: (index) =>
      prefersReducedMotion
        ? { opacity: 0 }
        : {
            opacity: 0,
            y: 20,
            scale: 0.95,
          },
    show: (index) =>
      prefersReducedMotion
        ? { opacity: 1 }
        : {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              type: 'spring',
              stiffness: 100,
              damping: 15,
            },
          },
  }

  // Floating animations for travel cards overlay
  const floatAnimation = (delay) => ({
    y: [-8, 8, -8],
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
      delay: delay
    }
  })

  return (
    <section className="relative isolate overflow-hidden pt-28 pb-10 sm:pt-36 sm:pb-14 md:pb-18 w-full">
      {/* Glowing background gradients & Sweeping wave effects */}
      <div className="absolute -left-1/4 top-0 -z-10 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-indigo-500/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute right-0 bottom-0 -z-10 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-amber-500/8 to-transparent blur-3xl pointer-events-none" />
      
      {/* Sweeping organic wave background */}
      <div className="absolute inset-0 -z-20 pointer-events-none overflow-hidden select-none">
        <svg 
          className="absolute top-0 right-0 w-full h-[120%] min-w-[900px] opacity-55 translate-x-[12%] -translate-y-[8%]" 
          viewBox="0 0 1000 800" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          preserveAspectRatio="none"
        >
          <path d="M350 0 C600 180 750 -80 1000 250 L1000 800 L250 800 C100 680 150 480 350 0 Z" fill="url(#heroWaveGrad)" />
          <path d="M220 0 C520 280 690 -30 1000 400 L1000 800 L150 800 C20 680 75 480 220 0 Z" fill="url(#heroWaveGrad2)" opacity="0.45" />
          <defs>
            <linearGradient id="heroWaveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.58 0.23 268)" stopOpacity="0.16" />
              <stop offset="50%" stopColor="oklch(0.58 0.23 268)" stopOpacity="0.04" />
              <stop offset="100%" stopColor="var(--background)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="heroWaveGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.75 0.17 65)" stopOpacity="0.06" />
              <stop offset="60%" stopColor="oklch(0.58 0.23 268)" stopOpacity="0.03" />
              <stop offset="100%" stopColor="var(--background)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 flex flex-col justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Top Hero Section */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center w-full pt-[4vh]">
          
          {/* Left Column: Typography & CTAs */}
          <div className="space-y-6 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4.5 py-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Sparkles className="size-4 animate-pulse" />
              Empowered by Gemini 2.5 Flash
            </div>

            <div className="space-y-4">
              <h1 className="font-heading text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
                Explore Smarter.
                <br />
                Plan <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-indigo-400 bg-clip-text text-transparent">Calmer.</span>
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-white/60 sm:text-base md:text-lg">
                Shape customized travel itineraries tailored around your companions, budget, and culinary tastes in seconds. Less admin, more exploration.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/create-trip">
                <Button className="h-13 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-7 text-sm font-bold uppercase tracking-wider text-white shadow-[0_10px_30px_rgba(245,158,11,0.3)] hover:scale-102 hover:from-amber-400 hover:to-orange-400 hover:shadow-[0_12px_35px_rgba(245,158,11,0.45)] cursor-pointer transition-all duration-300">
                  Plan a New Trip
                  <ArrowRight className="size-4 ml-1.5" />
                </Button>
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-6 text-xs font-bold uppercase tracking-wider text-white/80 transition-all duration-300 hover:bg-white/[0.08] hover:text-white"
              >
                <Route className="size-4.5 text-indigo-400" />
                See How It Works
              </a>
            </div>
          </div>

          {/* Right Column: High-fidelity Vector Globe & Floating Glass Cards */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[440px] lg:min-h-[500px]">
            
            {/* Globe Glow Backdrop */}
            <div className="absolute size-88 sm:size-104 rounded-full bg-indigo-500/5 blur-3xl" />
            
            {/* Globe SVG (Increased Size) */}
            <svg className="w-full max-w-[440px] sm:max-w-[480px] lg:max-w-[530px] aspect-square text-indigo-500/20" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="globeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.05" />
                </linearGradient>
                <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fb923c" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              {/* Globe Boundaries */}
              <circle cx="100" cy="100" r="90" stroke="url(#globeGrad)" strokeWidth="1" strokeDasharray="5 5" />
              <circle cx="100" cy="100" r="75" stroke="url(#globeGrad)" strokeWidth="1.5" />
              <circle cx="100" cy="100" r="60" stroke="url(#globeGrad)" strokeWidth="1" opacity="0.5" />

              {/* Longitudes & Latitudes */}
              <path d="M100 10 A90 90 0 0 0 100 190" stroke="url(#globeGrad)" strokeWidth="1" />
              <path d="M100 10 A60 90 0 0 0 100 190" stroke="url(#globeGrad)" strokeWidth="1.2" />
              <path d="M100 10 A30 90 0 0 0 100 190" stroke="url(#globeGrad)" strokeWidth="1.5" strokeDasharray="3 3" />
              <path d="M10 100 A90 90 0 0 0 190 100" stroke="url(#globeGrad)" strokeWidth="1" />
              <path d="M22 65 A80 40 0 0 0 178 65" stroke="url(#globeGrad)" strokeWidth="1" opacity="0.6" />
              <path d="M22 135 A80 40 0 0 0 178 135" stroke="url(#globeGrad)" strokeWidth="1" opacity="0.6" />

              {/* Dashed Flight path routes */}
              <path d="M35 85 C60 45 110 30 160 70" stroke="url(#routeGrad)" strokeWidth="2.5" strokeDasharray="6 4" />
              <path d="M50 145 C90 165 140 145 165 110" stroke="url(#routeGrad)" strokeWidth="2" strokeDasharray="4 4" />

              {/* Anchor glowing pins */}
              <circle cx="35" cy="85" r="4.5" fill="#f59e0b" filter="drop-shadow(0 0 6px #f59e0b)" />
              <circle cx="160" cy="70" r="4.5" fill="#818cf8" filter="drop-shadow(0 0 6px #818cf8)" />
              <circle cx="165" cy="110" r="4" fill="#fb7185" filter="drop-shadow(0 0 6px #fb7185)" />
            </svg>

            {/* FLOATING COLLAGE CARD 1: Flight details */}
            <motion.div
              animate={floatAnimation(0)}
              className="absolute top-6 left-2 sm:-left-6 border border-white/10 bg-black/55 p-3 rounded-2xl shadow-[0_12px_32px_rgba(0,0,0,0.4)] backdrop-blur-md flex items-center gap-3 max-w-[170px] sm:max-w-[190px]"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                <Plane className="size-4.5 rotate-45" />
              </div>
              <div className="min-w-0">
                <span className="block text-[0.68rem] uppercase font-bold tracking-wider text-white/30">Flight Log</span>
                <span className="block text-xs font-bold text-white truncate">HND - Tokyo Booking</span>
              </div>
            </motion.div>

            {/* FLOATING COLLAGE CARD 2: Hotel Reservation */}
            <motion.div
              animate={floatAnimation(1.8)}
              className="absolute bottom-10 right-2 sm:-right-6 border border-white/10 bg-black/55 p-3 rounded-2xl shadow-[0_12px_32px_rgba(0,0,0,0.4)] backdrop-blur-md flex items-center gap-3 max-w-[160px] sm:max-w-[185px]"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                <Hotel className="size-4.5" />
              </div>
              <div className="min-w-0">
                <span className="block text-[0.68rem] uppercase font-bold tracking-wider text-white/30">Accommodation</span>
                <span className="block text-xs font-bold text-white truncate">Aman Kyoto Suite</span>
              </div>
            </motion.div>

            {/* FLOATING COLLAGE CARD 3: AI Generation Status */}
            <motion.div
              animate={floatAnimation(0.9)}
              className="absolute top-1/3 -right-4 sm:-right-8 border border-white/10 bg-black/55 p-3 rounded-2xl shadow-[0_12px_32px_rgba(0,0,0,0.4)] backdrop-blur-md flex items-center gap-3 max-w-[170px] sm:max-w-[190px]"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <Sparkles className="size-4.5 animate-spin-slow" />
              </div>
              <div className="min-w-0">
                <span className="block text-[0.68rem] uppercase font-bold tracking-wider text-white/30">AI Optimizing</span>
                <span className="block text-xs font-bold text-white truncate">Structuring Route...</span>
              </div>
            </motion.div>

            {/* FLOATING COLLAGE CARD 4: Route Map Pin */}
            <motion.div
              animate={floatAnimation(1.3)}
              className="absolute bottom-14 left-0 sm:-left-10 border border-white/10 bg-black/55 p-3 rounded-2xl shadow-[0_12px_32px_rgba(0,0,0,0.4)] backdrop-blur-md flex items-center gap-3 max-w-[170px] sm:max-w-[190px]"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400">
                <Route className="size-4.5" />
              </div>
              <div className="min-w-0">
                <span className="block text-[0.68rem] uppercase font-bold tracking-wider text-white/30">Itinerary Map</span>
                <span className="block text-xs font-bold text-white truncate">5 Optimal Sights</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Grid: Advantages Cards */}
        <motion.div
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 w-full"
          variants={cardsContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {advantages.map(({ icon: Icon, title, description, colorClass, bgClass, glowClass, topGlow }, index) => (
            <motion.div
              key={title}
              custom={index}
              variants={cardVariants}
              className={`group relative rounded-[22px] border border-white/6 bg-[#0c121e]/80 p-5 shadow-[0_12px_30px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-[#0f1828] cursor-pointer ${glowClass}`}
            >
              {/* Top Border Glow Bar */}
              <div className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r ${topGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-[22px]`} />

              {/* Icon Container with mapped styles */}
              <div className={`mb-4 flex size-11 items-center justify-center rounded-2xl border transition-all duration-300 ${bgClass} ${colorClass}`}>
                <Icon className="size-5" />
              </div>
              <h3 className="mb-2 text-base font-bold text-white tracking-tight group-hover:text-white/95 transition-colors duration-300">{title}</h3>
              <p className="text-xs text-white/50 leading-relaxed group-hover:text-white/65 transition-colors duration-300">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
