import React from 'react'
import { motion } from 'framer-motion'
import { BrainCircuit, CalendarRange, Hotel, ScanSearch, WandSparkles } from 'lucide-react'

const features = [
  {
    icon: BrainCircuit,
    title: 'Preference-aware planning',
    description: 'Balances budget, trip length, interests, and traveler mix without generic filler.',
  },
  {
    icon: CalendarRange,
    title: 'Daily rhythm suggestions',
    description: 'Builds morning-to-evening flow so the trip feels realistic instead of overloaded.',
  },
  {
    icon: Hotel,
    title: 'Stay matching',
    description: 'Surfaces hotel ideas that fit the destination mood and spending range you chose.',
  },
  {
    icon: ScanSearch,
    title: 'Visual discovery',
    description: 'Pairs plans with image-led inspiration so users can feel the trip before they book.',
  },
]

const AIFeaturesSection = () => {
  return (
    <section className="border-t border-white/8 bg-transparent px-2 py-10 sm:px-0 sm:py-12 lg:py-14">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.32em] text-orange-200/70">AI Features</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            Smart enough to feel interactive, not robotic
          </h2>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-300/16 bg-orange-400/8 px-4 py-2 text-sm text-orange-100/82">
          <WandSparkles className="size-4 text-orange-300" />
          Intelligent planning layer
        </div>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature, index) => {
          const Icon = feature.icon

          return (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="group rounded-[24px] border border-white/8 bg-white/[0.03] p-5 transition-colors duration-300 hover:border-cyan-300/30 hover:shadow-[0_0_0_1px_rgba(103,232,249,0.18),0_18px_40px_rgba(0,0,0,0.18)]"
            >
              <div className="flex size-13 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] transition-all duration-300 group-hover:border-cyan-300/24 group-hover:bg-cyan-300/10">
                <motion.div whileHover={{ rotate: 10 }}>
                  <Icon className="size-5 text-cyan-200" />
                </motion.div>
              </div>
              <h3 className="mt-6 text-lg font-semibold text-white">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/60">{feature.description}</p>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}

export default AIFeaturesSection
