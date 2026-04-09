import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const GeneratingSpinner = () => {
  const loadingStatements = [
    'Studying your destination, travel style, and pace...',
    'Matching experiences to your interests and budget...',
    'Building your personalized itinerary...',
    'Finalizing your itinerary...',
  ]

  const [activeStatementIndex, setActiveStatementIndex] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveStatementIndex((currentIndex) =>
        currentIndex === loadingStatements.length - 1 ? 0 : currentIndex + 1
      )
    }, 2200)

    return () => window.clearInterval(interval)
  }, [loadingStatements.length])

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="mx-auto flex w-full max-w-xl flex-col items-center rounded-[32px] border border-white/12 bg-slate-950/30 px-6 py-10 text-center text-white shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:px-8">
        <div className="mb-5 flex size-28 items-center justify-center rounded-full border border-fuchsia-300/14 bg-fuchsia-300/8 shadow-[0_0_45px_rgba(217,70,239,0.14)]">
          <div className="relative flex size-20 items-center justify-center">
            <div className="size-20 animate-spin rounded-full border-[7px] border-[#221126] border-t-fuchsia-400 border-r-violet-300/90 border-b-[#140d16] border-l-pink-300/85 shadow-[0_0_34px_rgba(217,70,239,0.2)]" />
            <div className="absolute size-8 rounded-full bg-[#101014]" />
          </div>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-300/20 bg-fuchsia-300/10 px-4 py-2 text-sm text-fuchsia-100/90">
          <Sparkles className="size-4 text-fuchsia-300" />
          Generating your trip plan
        </div>

        <div className="mt-5 flex min-h-[4.5rem] max-w-lg items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={loadingStatements[activeStatementIndex]}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.36, ease: 'easeOut' }}
              className="text-xl font-semibold text-white sm:text-2xl"
            >
              {loadingStatements[activeStatementIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default GeneratingSpinner
