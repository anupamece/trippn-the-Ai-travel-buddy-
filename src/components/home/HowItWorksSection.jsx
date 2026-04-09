import React from 'react'
import { motion } from 'framer-motion'
import { Compass, MapPinned, Sparkles } from 'lucide-react'

const steps = [
  {
    id: '01',
    icon: MapPinned,
    title: 'Tell us your trip vibe',
    description:
      'Choose your destination, budget, travel group, and the kind of moments you want more of.',
  },
  {
    id: '02',
    icon: Sparkles,
    title: 'AI shapes the experience',
    description:
      'Trippn turns your preferences into a balanced travel plan with hotels, meals, and daily flow.',
  },
  {
    id: '03',
    icon: Compass,
    title: 'Explore your result instantly',
    description:
      'Review the roadmap, compare stay ideas, and get a more visual feel for the destination.',
  },
]

const HowItWorksSection = () => {
  return (
    <section className="rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,#121b28_0%,#0a111b_100%)] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)] sm:p-8 lg:p-10">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.32em] text-cyan-200/70">How It Works</p>
        <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
          A simple flow from idea to itinerary
        </h2>
        <p className="mt-4 text-sm leading-7 text-white/62 sm:text-base">
          The experience is designed to feel guided, visual, and light, so planning doesn&apos;t
          feel like admin work.
        </p>
      </div>

      <div className="relative mt-10 grid gap-6 lg:grid-cols-3">
        {steps.map((step, index) => {
          const Icon = step.icon

          return (
            <motion.article
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.12 }}
              className="relative overflow-hidden rounded-[24px] border border-white/8 bg-white/[0.03] p-5"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-cyan-300/0 via-cyan-300/55 to-cyan-300/0" />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white/38">{step.id}</span>
                <div className="flex size-12 items-center justify-center rounded-2xl border border-cyan-300/18 bg-cyan-300/10">
                  <Icon className="size-5 text-cyan-200" />
                </div>
              </div>
              <h3 className="mt-8 text-xl font-semibold text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/60">{step.description}</p>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}

export default HowItWorksSection
