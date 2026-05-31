import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plane, Globe } from 'lucide-react'
import TravelHudBackdrop from './TravelHudBackdrop'

const loadingStatuses = [
  'Packing your digital bags...',
  'Pinning local hot spots...',
  'Checking hotel balconies...',
  'Consulting the AI travel guides...',
  'Plotting optimal daily rhythms...',
  'Readying your boarding pass...'
]

const TravelPreloader = () => {
  const [statusIndex, setStatusIndex] = useState(0)

  useEffect(() => {
    const statusInterval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % loadingStatuses.length)
    }, 1800)

    return () => clearInterval(statusInterval)
  }, [])

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        transition: { duration: 0.5, ease: "easeInOut" } 
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#080b11] text-white select-none overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 size-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 size-72 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

      {/* Reusable Travel HUD Backdrop */}
      <TravelHudBackdrop />

      {/* Animated Illustration Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85, y: -25 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="relative flex size-44 md:scale-[1.65] md:my-12 items-center justify-center"
      >
        {/* Outer orbital track */}
        <div className="absolute size-40 rounded-full border border-dashed border-indigo-500/15" />
        
        {/* Outer Orbit Spinner (Counter Clockwise) */}
        <div 
          className="absolute inset-0 animate-spin" 
          style={{ animationDuration: '8s', animationDirection: 'reverse' }}
        >
          {/* Small glowing trail dot */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-2 rounded-full bg-amber-400 shadow-[0_0_10px_#fb923c]" />
        </div>

        {/* Inner orbital track */}
        <div className="absolute size-28 rounded-full border border-indigo-500/20" />

        {/* Inner Orbit Spinner (Clockwise) with Plane */}
        <div 
          className="absolute inset-0 animate-spin" 
          style={{ animationDuration: '3.5s' }}
        >
          {/* SVG Plane flying along the circle */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 -translate-y-1/2 transform -rotate-45">
            <Plane className="size-6 text-indigo-400 fill-indigo-400/20 drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
          </div>
        </div>

        {/* Core Pulsing Centerpiece (Globe/Compass) */}
        <div className="relative size-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.15)] animate-pulse">
          <Globe className="size-7 text-indigo-400" />
        </div>
      </motion.div>

      {/* Text Branding & Loading Updates */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.05 }}
        className="mt-8 text-center space-y-3.5 z-10 px-4 md:mt-12"
      >
        <div>
          <h1 className="font-satoshi text-3xl font-bold tracking-tight text-white leading-none lowercase">
            tripp<span className="bg-gradient-to-r from-amber-400 via-orange-400 to-indigo-400 bg-clip-text text-transparent font-extrabold">n</span>
          </h1>
          <p className="text-[0.55rem] sm:text-[0.65rem] font-semibold tracking-[0.18em] text-white/40 mt-2 leading-none uppercase">
            AI powered travel buddy
          </p>
        </div>

        {/* Animated Status Text Fading */}
        <div className="h-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={statusIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="text-xs font-medium text-white/50 tracking-wide"
            >
              {loadingStatuses[statusIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Modern progress track */}
        <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden mx-auto border border-white/5">
          <motion.div 
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
              repeat: Infinity
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default TravelPreloader
