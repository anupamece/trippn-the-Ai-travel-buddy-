import { Button } from '@/components/ui/button'
import { motion, useReducedMotion } from 'framer-motion'
import {
  BadgeDollarSign,
  Compass,
  CreditCard,
  MapPinned,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  const prefersReducedMotion = useReducedMotion()

  const advantages = [
    {
      icon: BadgeDollarSign,
      title: 'Budget Friendly',
      description: 'Build memorable trips with smarter planning that keeps costs under control.',
    },
    {
      icon: CreditCard,
      title: 'Effortless Payment',
      description: 'Organize bookings and payment-friendly travel flows in one smooth experience.',
    },
    {
      icon: Compass,
      title: 'Smart Itineraries',
      description: 'Map each day with less stress and more time to enjoy the journey.',
    },
    {
      icon: ShieldCheck,
      title: 'Reliable Planning',
      description: 'Keep your travel details clear, secure, and easy to manage on the go.',
    },
    {
      icon: MapPinned,
      title: 'Destination Ready',
      description: 'Explore routes, stays, and local highlights with a more guided approach.',
    },
  ]

  const cardsContainerVariants = {
    hidden: {},
    show: {
      transition: prefersReducedMotion
        ? { staggerChildren: 0 }
        : { staggerChildren: 0.18, delayChildren: 0.12 },
    },
  }

  const cardVariants = {
    hidden: (index) =>
      prefersReducedMotion
        ? { opacity: 0 }
        : {
            opacity: 0,
            x: -180,
            y: 14,
            scale: 0.78,
            rotateZ: -8 + index * 1.7,
            rotateY: 18,
            filter: 'blur(7px)',
          },
    show: (index) =>
      prefersReducedMotion
        ? { opacity: 1 }
        : {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotateZ: 0,
            rotateY: 0,
            filter: 'blur(0px)',
            transition: {
              type: 'spring',
              stiffness: 165,
              damping: 16,
              mass: 0.62 + index * 0.03,
            },
          },
  }


//   const navigate=useNavigate()
  return (
    <section className="relative isolate overflow-hidden">
      <div className="relative min-h-[84vh] overflow-hidden rounded-[24px] border border-white/6 bg-[#151515]/88 shadow-[0_24px_80px_rgba(0,0,0,0.26)]">
        <div
          className="absolute inset-0 scale-[1.02] bg-cover bg-center blur-[0.6px]"
          style={{ backgroundImage: "url('/hero-bg.png')" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,18,18,0.36)_0%,rgba(18,18,18,0.72)_42%,rgba(18,18,18,0.96)_100%)]" />

        <div className="relative z-10 flex min-h-[84vh] flex-col justify-start px-1 pb-10 pt-[30vh] sm:px-2 lg:px-3">
          <div className="max-w-3xl p-6 sm:p-8 lg:p-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-sm text-orange-100/90">
              <Sparkles className="size-4 text-orange-400" />
              Your next escape starts here
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <span className="mt-1 block h-[4.8rem] w-[4px] rounded-full bg-orange-500 shadow-[0_0_18px_rgba(255,132,53,0.28)] sm:h-[5.8rem] lg:h-[6.6rem]" />
                <h1 className="max-w-2xl text-4xl font-semibold leading-[0.96] text-white sm:text-5xl lg:text-6xl">
                  Plan Your
                  <br />
                  Next Trip
                </h1>
              </div>
              <p className="max-w-2xl text-base text-white/62 sm:text-lg">
                Discover, organize, and shape elegant travel plans with a calmer, more premium experience.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/create-trip">
                <Button className="h-12 rounded-2xl bg-orange-500 px-6 text-base text-white shadow-[0_12px_35px_rgba(255,132,53,0.22)] hover:bg-orange-400">
                  Create New Trip
                </Button>
              </Link>
              <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/62">
                <MapPinned className="size-4 text-orange-400" />
                Plan faster. Travel better.
              </div>
            </div>
          </div>

          <motion.div
            className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5"
            variants={cardsContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.22 }}
          >
            {advantages.map(({ icon: Icon, title, description }, index) => (
              <motion.div
                key={title}
                custom={index}
                variants={cardVariants}
                style={{ transformPerspective: 1000, transformOrigin: 'left center' }}
                className="rounded-[22px] border border-white/8 bg-[#1b1b1b]/96 p-5 shadow-[0_14px_36px_rgba(0,0,0,0.2)] transition-transform duration-300 will-change-transform hover:-translate-y-1"
              >
                <div className="mb-4 flex size-12 items-center justify-center rounded-2xl border border-orange-400/20 bg-orange-500/10 text-orange-300">
                  <Icon className="size-5" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
                <p className="text-sm text-white/58">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
