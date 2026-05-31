import React from 'react'
import { FaEnvelope, FaGlobe, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { Compass, Send, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import TrippnLogo from '../TrippnLogo'

const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault()
    alert('Thank you for subscribing! Stay tuned for travel tips and updates.')
  }

  return (
    <footer className="relative border-t border-white/5 bg-[#080b11] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      {/* Background radial glow */}
      <div className="absolute inset-x-0 top-0 -z-10 h-64 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5 transition-all duration-300 hover:opacity-90 group cursor-pointer">
              <img 
                src="/favicon.png"
                alt="Trippn logo" 
                className="h-14 w-14 object-contain drop-shadow-[0_0_12px_rgba(245,158,11,0.25)] transition-all duration-300" 
              />
              <div className="flex flex-col">
                <span className="font-satoshi text-xl font-bold tracking-tight text-white leading-none lowercase">
                  tripp<span className="bg-gradient-to-r from-amber-400 via-orange-400 to-indigo-400 bg-clip-text text-transparent font-extrabold">n</span>
                </span>
                <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-white/40 mt-1.5 leading-none">
                  AI powered travel buddy
                </p>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-white/50">
              Transforming travel ideas into personalized visual itineraries. Plan smarter, travel calmer, and discover the world in style.
            </p>
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-white/60 transition-all duration-300 hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-white"
              >
                <FaInstagram className="size-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-white/60 transition-all duration-300 hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-white"
              >
                <FaGlobe className="size-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-white/60 transition-all duration-300 hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-white"
              >
                <FaLinkedinIn className="size-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Explore Navigation */}
          <div>
            <h3 className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm font-medium text-white/60">
              <li>
                <a href="/#how-it-works" className="hover:text-indigo-400 transition-colors">How it works</a>
              </li>
              <li>
                <a href="/#ai-features" className="hover:text-indigo-400 transition-colors">AI features</a>
              </li>
              <li>
                <a href="/#faqs" className="hover:text-indigo-400 transition-colors">FAQs</a>
              </li>
              <li>
                <a
                  href="https://personal-portfolio-opal-ten.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Developer Portfolio
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources & Support */}
          <div>
            <h3 className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5 text-sm font-medium text-white/60">
              <li>
                <a href="mailto:hello@trippn.app" className="flex items-center gap-2 hover:text-indigo-400 transition-colors">
                  <FaEnvelope className="size-3.5 text-indigo-400" />
                  hello@trippn.app
                </a>
              </li>
              <li>
                <span className="cursor-not-allowed hover:text-indigo-400 transition-colors">Terms of Service</span>
              </li>
              <li>
                <span className="cursor-not-allowed hover:text-indigo-400 transition-colors">Privacy Policy</span>
              </li>
              <li>
                <span className="cursor-not-allowed hover:text-indigo-400 transition-colors">API Status</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Subscriber */}
          <div className="space-y-4">
            <h3 className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-white/40">
              Stay Inspired
            </h3>
            <p className="text-sm text-white/50">
              Subscribe to get curated travel deals, weekly guides, and app updates.
            </p>
            <form onSubmit={handleSubscribe} className="relative flex flex-col gap-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] pl-3.5 pr-11 text-xs text-white placeholder:text-white/30 outline-none transition-all duration-300 focus:border-indigo-500/50 focus:bg-white/[0.07]"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white transition-all duration-300 hover:from-amber-400 hover:to-orange-400 cursor-pointer"
                >
                  <Send className="size-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom copyright section */}
        <div className="mt-12 border-t border-white/6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <p>© {new Date().getFullYear()} Trippn AI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-white/50 cursor-pointer">Security</span>
            <span className="hover:text-white/50 cursor-pointer">System Rules</span>
            <span className="hover:text-white/50 cursor-pointer">Local Guides</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
