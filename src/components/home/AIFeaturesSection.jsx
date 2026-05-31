import React from 'react'
import { motion } from 'framer-motion'
import { 
  BrainCircuit, 
  WandSparkles, 
  Landmark, 
  Utensils, 
  Coffee, 
  User, 
  Tag, 
  Sun, 
  Moon, 
  CloudSun,
  MapPin,
  Star
} from 'lucide-react'

const AIFeaturesSection = () => {
  return (
    <section className="bg-transparent px-2 py-10 sm:px-0 sm:py-12 lg:py-14">
      {/* Header Info */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-indigo-300 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-md mb-2">
            <BrainCircuit className="size-3.5 text-indigo-400" />
            <span>AI Features</span>
          </div>
          <h2 className="mt-4 font-heading text-3xl font-bold text-white sm:text-4xl">
            Smart enough to feel interactive, not robotic
          </h2>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-indigo-200 self-start lg:self-auto">
          <WandSparkles className="size-4 text-indigo-400 animate-pulse" />
          Intelligent planning layer
        </div>
      </div>

      {/* Bento Grid */}
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        
        {/* Card 1: Preference-aware planning (Double width on desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="md:col-span-2 rounded-[28px] border border-white/8 bg-[#090e18]/80 p-6 md:p-8 flex flex-col justify-between overflow-hidden relative group"
        >
          <div className="absolute -right-20 -top-20 size-48 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
          
          <div className="grid gap-6 md:grid-cols-2 items-center">
            <div className="space-y-4">
              <div className="flex size-11 items-center justify-center rounded-2xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400">
                <BrainCircuit className="size-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">Preference-aware planning</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  Balances budget limits, trip lengths, and traveler mix to curate suggestions tailored to you, filtering out generic filler.
                </p>
              </div>
            </div>

            {/* Interactive tag selectors illustration */}
            <div className="relative flex flex-wrap gap-2.5 justify-center md:justify-end py-4">
              <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/70 flex items-center gap-1.5 transition-all duration-300 group-hover:border-indigo-500/30">
                <Landmark className="size-3.5 text-indigo-400" />
                <span>Historic</span>
              </div>
              <div className="rounded-xl border border-indigo-500/40 bg-indigo-500/10 px-3 py-2 text-xs font-bold text-indigo-300 flex items-center gap-1.5 ring-1 ring-indigo-500/30 animate-pulse">
                <Utensils className="size-3.5 text-indigo-400" />
                <span>Foodie</span>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/70 flex items-center gap-1.5 transition-all duration-300 group-hover:border-indigo-500/30">
                <User className="size-3.5 text-indigo-400" />
                <span>Solo</span>
              </div>
              <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs font-bold text-amber-300 flex items-center gap-1.5 ring-1 ring-amber-500/30">
                <Coffee className="size-3.5 text-amber-400" />
                <span>Relaxed</span>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/70 flex items-center gap-1.5 transition-all duration-300 group-hover:border-indigo-500/30">
                <Tag className="size-3.5 text-indigo-400" />
                <span>Budget</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Stay matching */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-[28px] border border-white/8 bg-[#090e18]/80 p-6 flex flex-col justify-between overflow-hidden relative group"
        >
          <div className="absolute -left-10 -bottom-10 size-32 rounded-full bg-amber-500/5 blur-2xl pointer-events-none" />
          
          <div className="space-y-4">
            <div className="flex size-11 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-amber-400">
              <Star className="size-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Stay matching</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">
                Surfaces hotel recommendations that coordinate directly with the destination mood and budget tier you chose.
              </p>
            </div>
          </div>

          {/* Fanning stay stack illustration */}
          <div className="h-28 mt-6 relative flex justify-center items-end">
            {/* Card C (back) */}
            <div className="absolute bottom-1 w-[80%] rounded-xl border border-white/5 bg-[#0d1525]/90 p-2.5 shadow-md flex items-center justify-between opacity-40 transition-all duration-300 group-hover:translate-y-[-12px] group-hover:rotate-[-6deg]">
              <span className="text-[10px] font-bold text-white/50">Ryokan Tokyo</span>
              <span className="text-[9px] text-amber-400 font-bold">$</span>
            </div>
            {/* Card B (middle) */}
            <div className="absolute bottom-0 w-[85%] rounded-xl border border-white/5 bg-[#0d1525]/95 p-2.5 shadow-lg flex items-center justify-between opacity-75 transition-all duration-300 group-hover:translate-y-[-6px] group-hover:rotate-[4deg]">
              <span className="text-[10px] font-bold text-white/80">Regina Louvre</span>
              <span className="text-[9px] text-amber-400 font-bold">$$</span>
            </div>
            {/* Card A (front) */}
            <div className="absolute bottom-[-1px] w-[90%] rounded-xl border border-indigo-500/20 bg-[#0f192b] p-2.5 shadow-2xl flex items-center justify-between z-10 transition-all duration-300 group-hover:translate-y-[-2px] group-hover:border-indigo-500/40">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-white">Aman Kyoto</span>
                <span className="text-[8px] text-white/40">Highly rated 4.9★</span>
              </div>
              <span className="text-[9px] text-amber-400 font-bold">$$$</span>
            </div>
          </div>
        </motion.div>

        {/* Card 3: Daily rhythm suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="rounded-[28px] border border-white/8 bg-[#090e18]/80 p-6 flex flex-col justify-between overflow-hidden relative group"
        >
          <div className="absolute -right-10 -bottom-10 size-32 rounded-full bg-indigo-500/5 blur-2xl pointer-events-none" />
          
          <div className="space-y-4">
            <div className="flex size-11 items-center justify-center rounded-2xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400">
              <Sun className="size-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Daily rhythm suggestions</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">
                Structures morning-to-evening flows so that daily itineraries feel realistic, paced, and relaxed instead of packed.
              </p>
            </div>
          </div>

          {/* Time Dial illustration */}
          <div className="h-28 mt-6 flex items-center justify-center relative">
            <div className="absolute w-20 h-20 rounded-full border border-dashed border-white/10 flex items-center justify-center animate-spin-slow" />
            <div className="flex gap-4 items-center z-10">
              <div className="flex flex-col items-center gap-1 group-hover:scale-105 transition-transform duration-300">
                <div className="size-8 rounded-full border border-amber-500/30 bg-amber-500/10 flex items-center justify-center text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.15)]">
                  <Sun className="size-4" />
                </div>
                <span className="text-[9px] font-bold text-white/60">09:00</span>
              </div>
              <div className="flex flex-col items-center gap-1 group-hover:scale-105 transition-transform duration-300">
                <div className="size-8 rounded-full border border-indigo-500/20 bg-indigo-500/5 flex items-center justify-center text-indigo-400/80">
                  <CloudSun className="size-4" />
                </div>
                <span className="text-[9px] font-bold text-white/60">14:00</span>
              </div>
              <div className="flex flex-col items-center gap-1 group-hover:scale-105 transition-transform duration-300">
                <div className="size-8 rounded-full border border-indigo-500/30 bg-indigo-500/10 flex items-center justify-center text-indigo-300 shadow-[0_0_10px_rgba(99,102,241,0.15)]">
                  <Moon className="size-4" />
                </div>
                <span className="text-[9px] font-bold text-white/60">20:00</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 4: Visual discovery (Double width on desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:col-span-2 rounded-[28px] border border-white/8 bg-[#090e18]/80 p-6 md:p-8 flex flex-col justify-between overflow-hidden relative group"
        >
          <div className="absolute -left-20 -top-20 size-48 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
          
          <div className="grid gap-6 md:grid-cols-2 items-center">
            <div className="space-y-4">
              <div className="flex size-11 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-amber-400">
                <WandSparkles className="size-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">Visual discovery</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  Connects plans with authentic localized photos, enabling you to visual-feel the sights, hotels, and food spots before booking.
                </p>
              </div>
            </div>

            {/* Overlapping Polaroid Image mockup showcase */}
            <div className="h-32 mt-4 relative flex items-center justify-center md:justify-end">
              {/* Photo 1 (left) */}
              <div className="absolute left-6 md:left-auto md:right-28 w-24 h-24 rounded-2xl border border-white/10 bg-gradient-to-tr from-cyan-500/30 to-indigo-500/30 p-1 flex flex-col justify-end shadow-xl transition-all duration-300 group-hover:translate-x-[-12px] group-hover:rotate-[-8deg]">
                <div className="bg-black/30 rounded-lg p-1.5 flex items-center gap-1 backdrop-blur-sm">
                  <MapPin className="size-2 text-amber-400" />
                  <span className="text-[8px] font-bold text-white truncate">Ubud, Bali</span>
                </div>
              </div>
              {/* Photo 2 (center) */}
              <div className="absolute w-26 h-26 rounded-2xl border border-white/12 bg-gradient-to-tr from-amber-500/30 to-orange-500/30 p-1 flex flex-col justify-end shadow-2xl z-10 transition-all duration-300 group-hover:translate-y-[-6px] group-hover:scale-104">
                <div className="bg-black/40 rounded-lg p-1.5 flex items-center gap-1 backdrop-blur-sm">
                  <MapPin className="size-2 text-amber-400" />
                  <span className="text-[8px] font-bold text-white truncate">Tokyo, Japan</span>
                </div>
              </div>
              {/* Photo 3 (right) */}
              <div className="absolute right-6 md:right-0 w-24 h-24 rounded-2xl border border-white/10 bg-gradient-to-tr from-indigo-500/30 to-purple-500/30 p-1 flex flex-col justify-end shadow-xl transition-all duration-300 group-hover:translate-x-[12px] group-hover:rotate-[8deg]">
                <div className="bg-black/30 rounded-lg p-1.5 flex items-center gap-1 backdrop-blur-sm">
                  <MapPin className="size-2 text-amber-400" />
                  <span className="text-[8px] font-bold text-white truncate">Paris, France</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default AIFeaturesSection
