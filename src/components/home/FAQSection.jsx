import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'

const faqs = [
  {
    question: 'How does Trippn generate a trip plan?',
    answer:
      'It uses your destination, duration, budget, travel group, and interests to create a day-by-day plan with a more intentional flow.',
  },
  {
    question: 'Can I use it for family trips or group travel?',
    answer:
      'Yes. The planner already considers traveler count and whether children are joining, so recommendations can lean more family-friendly when needed.',
  },
  {
    question: 'Are the destination images exact matches?',
    answer:
      'Not always. The visuals are there to help users feel the destination mood and activity style, even when the exact place is not shown.',
  },
  {
    question: 'Can I customize the result later?',
    answer:
      'That is the direction the app is heading. The result layout is already being shaped to support add-ons like maps, contacts, budgets, and deeper trip editing.',
  },
]

const FAQSection = () => {
  const [openItem, setOpenItem] = useState(0)

  return (
    <section className="bg-transparent px-2 py-10 sm:px-0 sm:py-12 lg:py-14">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-indigo-300 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-md mb-2">
          <HelpCircle className="size-3.5 text-indigo-400" />
          <span>FAQs</span>
        </div>
        <h2 className="mt-4 font-heading text-3xl font-bold text-white sm:text-4xl">
          Questions users usually ask before they start
        </h2>
      </div>

      <div className="mt-10 space-y-4">
        {faqs.map((item, index) => {
          const isOpen = openItem === index

          return (
            <div
              key={item.question}
              className="overflow-hidden rounded-[22px] border border-white/8 bg-white/[0.02]"
            >
              <button
                type="button"
                onClick={() => setOpenItem(isOpen ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left cursor-pointer"
              >
                <span className="text-base font-medium text-white sm:text-lg">{item.question}</span>
                <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                  <ChevronDown className="size-5 text-indigo-400" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm leading-7 text-white/62 sm:text-base">
                      {item.answer}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default FAQSection
