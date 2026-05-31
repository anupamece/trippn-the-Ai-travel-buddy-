import React from 'react'
import { motion } from 'framer-motion'
import { 
  Compass, 
  MapPinned, 
  Sparkles, 
  Route, 
  MapPin, 
  Users, 
  Utensils, 
  Hotel,
  Check,
  Share2,
  Bookmark
} from 'lucide-react'

// Step 1 Vibe Selector Illustration
const StepOneIllustration = () => {
  return (
    <div className="relative w-full max-w-sm mx-auto p-5 rounded-3xl border border-white/8 bg-[#090e18]/80 backdrop-blur-xl shadow-2xl overflow-hidden group">
      {/* Background gradients */}
      <div className="absolute -right-10 -top-10 size-32 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />
      <div className="absolute -left-10 -bottom-10 size-32 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />
      
      <div className="space-y-4">
        {/* Destination input mock */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Destination</label>
          <div className="flex items-center gap-2 rounded-xl border border-indigo-500/30 bg-indigo-500/5 px-3 py-2.5">
            <MapPin className="size-4 text-indigo-400 shrink-0" />
            <span className="text-xs font-bold text-white">Paris, France</span>
          </div>
        </div>
        
        {/* Budget Select mock */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Select Budget</label>
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-lg border border-white/5 bg-white/[0.02] p-2 text-center">
              <span className="block text-[10px] font-bold text-white/30">Budget</span>
              <span className="text-[9px] text-white/20">$</span>
            </div>
            <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-2 text-center ring-1 ring-amber-500/30">
              <span className="block text-[10px] font-bold text-amber-300">Moderate</span>
              <span className="text-[9px] text-amber-400 font-bold">$$</span>
            </div>
            <div className="rounded-lg border border-white/5 bg-white/[0.02] p-2 text-center">
              <span className="block text-[10px] font-bold text-white/30">Luxury</span>
              <span className="text-[9px] text-white/20">$$$</span>
            </div>
          </div>
        </div>

        {/* Travelers stepper mock */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Who is going?</label>
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-2.5">
            <div className="flex items-center gap-2">
              <Users className="size-4 text-amber-400" />
              <span className="text-xs font-semibold text-white">Couple Trip</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex size-5 items-center justify-center rounded-md bg-white/5 text-[10px] font-bold text-white/60 select-none">-</span>
              <span className="text-xs font-bold text-white">2</span>
              <span className="flex size-5 items-center justify-center rounded-md bg-white/5 text-[10px] font-bold text-white/60 select-none">+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Step 2 AI Matching Illustration
const StepTwoIllustration = () => {
  return (
    <div className="relative w-full max-w-sm mx-auto p-5 rounded-3xl border border-white/8 bg-[#090e18]/80 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col items-center justify-center min-h-[220px]">
      <div className="absolute -right-10 -bottom-10 size-32 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />
      
      {/* Central Pulsing AI Core */}
      <div className="relative z-10 flex size-16 items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-500/10 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
        <Sparkles className="size-7 text-indigo-400 animate-pulse" />
        
        {/* Pulsing Concentric rings */}
        <div className="absolute -inset-2 rounded-full border border-indigo-500/20 animate-ping opacity-35" />
        <div className="absolute -inset-4 rounded-full border border-indigo-500/10 animate-ping opacity-20" style={{ animationDelay: '0.6s' }} />
      </div>

      {/* Orbiting match points */}
      <div className="absolute top-6 left-6 flex items-center gap-1.5 rounded-xl border border-white/5 bg-white/[0.02] px-2.5 py-1.5 shadow-lg">
        <Hotel className="size-3.5 text-amber-400 animate-bounce" />
        <span className="text-[10px] font-bold text-white/70">Matching Stays</span>
      </div>

      <div className="absolute bottom-6 left-8 flex items-center gap-1.5 rounded-xl border border-white/5 bg-white/[0.02] px-2.5 py-1.5 shadow-lg">
        <Utensils className="size-3.5 text-emerald-400" />
        <span className="text-[10px] font-bold text-white/70">Culinary Route</span>
      </div>

      <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 flex items-center gap-1.5 rounded-xl border border-white/5 bg-white/[0.02] px-2.5 py-1.5 shadow-lg">
        <Compass className="size-3.5 text-indigo-400 animate-spin" style={{ animationDuration: '6s' }} />
        <span className="text-[10px] font-bold text-white/70">Geo Layout</span>
      </div>
      
      {/* Connection curves */}
      <svg className="absolute inset-0 size-full pointer-events-none opacity-20" viewBox="0 0 200 200">
        <path d="M40 40 Q100 100 100 100" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M50 160 Q100 100 100 100" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M170 100 Q100 100 100 100" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 3" />
      </svg>
    </div>
  )
}

// Step 3 Result Preview Illustration
const StepThreeIllustration = () => {
  return (
    <div className="relative w-full max-w-sm mx-auto p-5 rounded-3xl border border-white/8 bg-[#090e18]/80 backdrop-blur-xl shadow-2xl overflow-hidden">
      <div className="absolute -left-10 -top-10 size-32 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />
      
      {/* Mini itinerary timeline */}
      <div className="space-y-3.5">
        {/* Timeline Item 1 */}
        <div className="flex gap-3">
          <div className="flex flex-col items-center shrink-0">
            <div className="flex size-5 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-bold text-white">1</div>
            <div className="w-0.5 h-10 bg-gradient-to-b from-indigo-500 to-amber-500/50" />
          </div>
          <div className="flex-1 rounded-xl border border-white/5 bg-white/[0.02] p-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-400">09:00 AM</span>
              <span className="text-[8px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">Sightseeing</span>
            </div>
            <h4 className="text-xs font-bold text-white mt-1">Louvre Museum Tour</h4>
          </div>
        </div>

        {/* Timeline Item 2 */}
        <div className="flex gap-3">
          <div className="flex flex-col items-center shrink-0">
            <div className="flex size-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white">2</div>
            <div className="w-0.5 h-10 bg-gradient-to-b from-amber-500 to-transparent" />
          </div>
          <div className="flex-1 rounded-xl border border-white/5 bg-white/[0.02] p-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400">01:30 PM</span>
              <span className="text-[8px] font-bold text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded">Dining</span>
            </div>
            <h4 className="text-xs font-bold text-white mt-1">Le Jules Verne Lunch</h4>
          </div>
        </div>

        {/* Timeline Item 3 */}
        <div className="flex gap-3">
          <div className="flex size-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white shrink-0">
            <Check className="size-3 text-white" />
          </div>
          <div className="flex-1 rounded-xl border border-amber-500/20 bg-amber-500/5 p-2.5 shadow-[0_0_15px_rgba(245,158,11,0.05)]">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400">Hotel Selected</span>
              <span className="text-[9px] font-bold text-white/50">$$$</span>
            </div>
            <h4 className="text-xs font-bold text-white mt-0.5">Hotel Regina Louvre</h4>
            <p className="text-[8px] text-white/40 mt-1">4.8★ reviews • 2 min walk to Louvre</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Step 4 Save & Share Illustration
const StepFourIllustration = () => {
  return (
    <div className="relative w-full max-w-sm mx-auto p-5 rounded-3xl border border-white/8 bg-[#090e18]/80 backdrop-blur-xl shadow-2xl overflow-hidden">
      {/* Background gradients */}
      <div className="absolute -right-10 -bottom-10 size-32 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />
      <div className="absolute -left-10 -top-10 size-32 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />

      <div className="space-y-4">
        {/* Header/Card info */}
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Bookmark className="size-4" />
            </div>
            <div className="text-left">
              <span className="block text-[8px] font-bold text-white/40 uppercase tracking-wider leading-none">Status</span>
              <span className="text-[10px] font-extrabold text-white mt-1 block">Itinerary Saved</span>
            </div>
          </div>
          <span className="text-[8px] font-bold text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">Private Link Active</span>
        </div>

        {/* Group members / friends sharing preview */}
        <div className="space-y-2 text-left">
          <label className="text-[9px] font-bold uppercase tracking-wider text-white/40">Shared Companions</label>
          <div className="flex items-center justify-between rounded-xl border border-white/6 bg-white/[0.02] p-2.5">
            <div className="flex -space-x-2">
              <div className="flex size-6.5 items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-500/20 text-[8px] font-bold text-indigo-300">JD</div>
              <div className="flex size-6.5 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/20 text-[8px] font-bold text-amber-300">AS</div>
              <div className="flex size-6.5 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/20 text-[8px] font-bold text-emerald-300">MK</div>
              <div className="flex size-6.5 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[8px] font-bold text-white/50">+3</div>
            </div>
            <span className="text-[9px] font-semibold text-white/60">Collaborators</span>
          </div>
        </div>

        {/* Action Buttons Mockup */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <div className="flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] py-2 px-3 text-[9px] font-bold uppercase text-white/80 transition-all select-none">
            <Share2 className="size-3 text-indigo-400" />
            Share Link
          </div>
          <div className="flex items-center justify-center gap-1.5 rounded-xl border border-emerald-500/25 bg-emerald-500/10 py-2 px-3 text-[9px] font-bold uppercase text-emerald-400 transition-all select-none">
            <Check className="size-3 text-emerald-400" />
            Saved (PDF)
          </div>
        </div>
      </div>
    </div>
  )
}

const HowItWorksSection = () => {
  return (
    <section className="bg-transparent px-2 py-10 sm:px-0 sm:py-12 lg:py-16">
      {/* Header Info */}
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-amber-300 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-md mb-4">
          <Route className="size-3.5 text-amber-400" />
          <span>How It Works</span>
        </div>
        <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
          A simple flow from idea to itinerary
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-white/50 sm:text-base">
          The experience is designed to feel guided, visual, and light, so planning doesn&apos;t feel like admin work.
        </p>
      </div>

      {/* Vertical alternating timeline flow */}
      <div className="relative mt-16 md:mt-24 space-y-16 md:space-y-24">
        
        {/* Central Vertical Connector Line (Desktop only) */}
        <div className="absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-indigo-500/40 via-amber-500/40 to-emerald-500/10 hidden md:block" />

        {/* Step 1: Tell us your trip vibe */}
        <div className="grid gap-8 items-center md:grid-cols-12">
          {/* Text block */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5 md:text-right flex flex-col md:items-end space-y-3"
          >
            <div className="flex items-center justify-center size-9 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-bold md:self-end">
              01
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">Tell us your trip vibe</h3>
            <p className="text-sm text-white/50 max-w-md md:text-right">
              Choose your destination, budget range, travel group mix, and specify exactly what moments you want more of (e.g. food, history, relaxation).
            </p>
          </motion.div>

          {/* Timeline Center Badge (Desktop only) */}
          <div className="hidden md:flex md:col-span-2 justify-center z-10">
            <div className="size-10 rounded-full bg-[#080b11] border-2 border-indigo-500/80 flex items-center justify-center text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.25)]">
              <MapPinned className="size-4.5" />
            </div>
          </div>

          {/* Illustration Block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-5"
          >
            <StepOneIllustration />
          </motion.div>
        </div>

        {/* Step 2: AI shapes the experience */}
        <div className="grid gap-8 items-center md:grid-cols-12">
          {/* Illustration Block first on desktop to alternate */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-5 order-2 md:order-1"
          >
            <StepTwoIllustration />
          </motion.div>

          {/* Timeline Center Badge (Desktop only) */}
          <div className="hidden md:flex md:col-span-2 justify-center z-10 order-2">
            <div className="size-10 rounded-full bg-[#080b11] border-2 border-amber-500/80 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]">
              <Sparkles className="size-4.5" />
            </div>
          </div>

          {/* Text block */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5 space-y-3 order-1 md:order-3"
          >
            <div className="flex items-center justify-center size-9 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-bold">
              02
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">AI shapes the experience</h3>
            <p className="text-sm text-white/50 max-w-md">
              Trippn uses generative AI to instantly craft a perfectly balanced itinerary, optimizing coordinates for hotels, local food joints, and daily flow.
            </p>
          </motion.div>
        </div>

        {/* Step 3: Explore your result instantly */}
        <div className="grid gap-8 items-center md:grid-cols-12">
          {/* Text block */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5 md:text-right flex flex-col md:items-end space-y-3"
          >
            <div className="flex items-center justify-center size-9 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-bold md:self-end">
              03
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">Explore your result instantly</h3>
            <p className="text-sm text-white/50 max-w-md md:text-right">
              Review your customized roadmaps, check stay prices, find the best times to visit locations, and visualize your escape before booking.
            </p>
          </motion.div>

          {/* Timeline Center Badge (Desktop only) */}
          <div className="hidden md:flex md:col-span-2 justify-center z-10">
            <div className="size-10 rounded-full bg-[#080b11] border-2 border-indigo-500/80 flex items-center justify-center text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.25)]">
              <Compass className="size-4.5" />
            </div>
          </div>

          {/* Illustration Block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-5"
          >
            <StepThreeIllustration />
          </motion.div>
        </div>

        {/* Step 4: Save & share with ease */}
        <div className="grid gap-8 items-center md:grid-cols-12">
          {/* Illustration Block first on desktop to alternate */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-5 order-2 md:order-1"
          >
            <StepFourIllustration />
          </motion.div>

          {/* Timeline Center Badge (Desktop only) */}
          <div className="hidden md:flex md:col-span-2 justify-center z-10 order-2">
            <div className="size-10 rounded-full bg-[#080b11] border-2 border-emerald-500/80 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)]">
              <Share2 className="size-4.5" />
            </div>
          </div>

          {/* Text block */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5 space-y-3 order-1 md:order-3"
          >
            <div className="flex items-center justify-center size-9 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold">
              04
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">Save & share with ease</h3>
            <p className="text-sm text-white/50 max-w-md">
              Save your finalized itineraries securely to your dashboard. Share the live link or export a PDF layout to easily coordinate plans with friends and family.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  )
}

export default HowItWorksSection
