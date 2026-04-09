import React from 'react'
import { FaEnvelope, FaGlobe, FaInstagram, FaLinkedinIn, FaMapMarkerAlt } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,#11161f_0%,#090d13_100%)] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)] sm:p-8 lg:p-10">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/8 px-4 py-2 text-sm text-cyan-100/82">
            <FaMapMarkerAlt className="size-4 text-cyan-300" />
            Trippn
          </div>
          <h2 className="mt-5 max-w-md text-3xl font-semibold text-white">
            Travel planning with more style, less friction.
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-7 text-white/58 sm:text-base">
            We&apos;re building a calmer way to explore ideas, generate itineraries, and shape
            better trips from the very first screen.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-white/44">
            Explore
          </h3>
          <div className="mt-5 space-y-3 text-sm text-white/64">
            <a href="#how-it-works" className="block transition-colors hover:text-white">
              How it works
            </a>
            <a href="#ai-features" className="block transition-colors hover:text-white">
              AI features
            </a>
            <a href="#faqs" className="block transition-colors hover:text-white">
              FAQs
            </a>
            <a href="#contact" className="block transition-colors hover:text-white">
              Contact us
            </a>
          </div>
        </div>

        <div id="contact">
          <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-white/44">
            Connect
          </h3>
          <div className="mt-5 space-y-3 text-sm text-white/64">
            <a href="mailto:hello@trippn.app" className="flex items-center gap-2 hover:text-white">
              <FaEnvelope className="size-4 text-cyan-200" />
              hello@trippn.app
            </a>
            <div className="flex items-center gap-3 pt-3">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 p-3 text-white/68 transition-colors hover:text-white">
                <FaInstagram className="size-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 p-3 text-white/68 transition-colors hover:text-white">
                <FaGlobe className="size-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 p-3 text-white/68 transition-colors hover:text-white">
                <FaLinkedinIn className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
