import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { LoaderCircle, MapPinned, Compass, Star, DollarSign, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getPopularDestinationImages } from '../../Services/pexelsService'

const destinations = ['Paris', 'Tokyo', 'Bali', 'Dubai', 'New York']

const destinationMeta = {
  'Paris': {
    budget: 'Moderate',
    vibe: 'Romantic & Cultured',
    tags: ['Eiffel Tower', 'Louvre', 'Cafe'],
    desc: 'Indulge in world-class art, fashion, gastronomy, and historic streetscapes.'
  },
  'Tokyo': {
    budget: 'Moderate',
    vibe: 'Futuristic & Ancient',
    tags: ['Shibuya Crossing', 'Shrines', 'Sushi'],
    desc: 'Experience neon skyscrapers, ancient shrines, and incredible culinary paths.'
  },
  'Bali': {
    budget: 'Budget-Friendly',
    vibe: 'Tropical & Spiritual',
    tags: ['Ubud Temples', 'Beaches', 'Surfing'],
    desc: 'Unwind amidst lush rice terraces, sacred volcanic peaks, and pristine beaches.'
  },
  'Dubai': {
    budget: 'Luxury',
    vibe: 'Opulent & Modern',
    tags: ['Burj Khalifa', 'Shopping', 'Desert'],
    desc: 'Explore futuristic architectural wonders, luxury shopping, and desert safaris.'
  },
  'New York': {
    budget: 'Moderate',
    vibe: 'Vibrant & Fast-paced',
    tags: ['Times Square', 'Central Park', 'Broadway'],
    desc: 'Dive into the world capital of theater, museums, towering skylines, and diverse food.'
  }
}

const PopularDestinationsSection = () => {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  
  // Tokyo (index 1) is active by default
  const defaultIndex = 1
  const activeIndex = hoveredIndex !== null ? hoveredIndex : defaultIndex

  useEffect(() => {
    let isMounted = true

    const loadDestinations = async () => {
      try {
        const result = await getPopularDestinationImages(destinations)

        if (isMounted) {
          setItems(result)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadDestinations()

    return () => {
      isMounted = false
    }
  }, [])

  const handlePlanTrip = (destName) => {
    // Navigate to create-trip and pass destination as query parameter
    navigate(`/create-trip?dest=${encodeURIComponent(destName)}`)
  }

  return (
    <section className="bg-transparent px-2 py-10 sm:px-0 sm:py-12 lg:py-14">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-indigo-300 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-md mb-2">
            <Compass className="size-3.5 text-indigo-400" />
            <span>Popular Destinations</span>
          </div>
          <h2 className="mt-4 font-heading text-3xl font-bold text-white sm:text-4xl">
            Sample escapes people keep coming back to
          </h2>
        </div>
        <p className="text-xs text-white/40 font-medium">
          Images provided by <span className="text-indigo-400">Pexels</span>
        </p>
      </div>

      {loading ? (
        <div className="mt-6 flex min-h-[360px] items-center justify-center rounded-[32px] border border-white/8 bg-[#0c121e]/40 backdrop-blur-sm">
          <div className="inline-flex items-center gap-3 text-white/72">
            <LoaderCircle className="size-5 animate-spin text-indigo-400" />
            Loading destination visuals
          </div>
        </div>
      ) : (
        <>
          {/* Desktop Accordion Grid (Hidden on Mobile) */}
          <div className="hidden md:flex gap-4 h-[440px] w-full mt-6">
            {items.map((item, index) => {
              const isActive = activeIndex === index
              const meta = destinationMeta[item.name] || { budget: 'Moderate', vibe: 'Exploration', tags: [], desc: '' }
              const coverUrl = item.image?.imageUrl

              return (
                <div
                  key={item.name}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`relative h-full rounded-[28px] overflow-hidden border transition-all duration-700 ease-in-out cursor-pointer shadow-2xl flex-shrink-0 ${
                    isActive 
                      ? 'flex-[3.5] border-indigo-500/30' 
                      : 'flex-1 border-white/6 hover:border-white/15'
                  }`}
                  style={{ minWidth: '80px' }}
                >
                  {/* Card Background Image */}
                  {coverUrl ? (
                    <img
                      src={coverUrl}
                      alt={item.name}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                      style={{ transform: isActive ? 'scale(1.05)' : 'scale(1)' }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#285f9f_0%,#10223b_35%,#040814_100%)]" />
                  )}

                  {/* Gradient Overlay */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-t transition-opacity duration-700" 
                    style={{ 
                      backgroundImage: isActive 
                        ? 'linear-gradient(to top, rgba(8,11,17,0.92) 0%, rgba(8,11,17,0.5) 45%, rgba(8,11,17,0.1) 100%)'
                        : 'linear-gradient(to top, rgba(8,11,17,0.85) 0%, rgba(8,11,17,0.2) 100%)'
                    }}
                  />

                  {/* Collapsed View (Vertical Title) */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-500"
                    style={{ opacity: isActive ? 0 : 1 }}
                  >
                    <span className="text-lg font-bold text-white/50 tracking-[0.18em] uppercase transform rotate-90 whitespace-nowrap">
                      {item.name}
                    </span>
                  </div>

                  {/* Expanded View Content */}
                  <div 
                    className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end h-full transition-all duration-700"
                    style={{ 
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateY(0)' : 'translateY(20px)',
                      pointerEvents: isActive ? 'auto' : 'none'
                    }}
                  >
                    <div className="space-y-4">
                      {/* Floating Meta tags */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400">
                          <DollarSign className="size-3" />
                          {meta.budget}
                        </span>
                        <span className="text-[10px] font-semibold text-white/60 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                          {meta.vibe}
                        </span>
                      </div>

                      {/* Title & Desc */}
                      <div>
                        <h3 className="text-3xl font-extrabold text-white tracking-tight">{item.name}</h3>
                        <p className="mt-2 text-xs leading-relaxed text-white/64 max-w-md">
                          {meta.desc}
                        </p>
                      </div>

                      {/* Action block */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/5">
                        <div className="flex gap-1.5">
                          {meta.tags.map((tag) => (
                            <span key={tag} className="text-[9px] font-bold text-indigo-300 uppercase tracking-wide bg-indigo-500/5 px-2 py-0.5 rounded border border-indigo-500/10">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <button
                          onClick={() => handlePlanTrip(item.name)}
                          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 text-xs font-bold uppercase tracking-wider text-white shadow-[0_4px_15px_rgba(245,158,11,0.2)] hover:scale-102 hover:from-amber-400 hover:to-orange-400 active:translate-y-0.5 cursor-pointer transition-all duration-300"
                        >
                          <span>Plan Trip</span>
                          <ArrowRight className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Touch-Scrollable Mobile View (Hidden on Desktop) */}
          <div className="md:hidden flex gap-4 overflow-x-auto pb-4 pt-2 snap-x scrollbar-none scroll-smooth">
            {items.map((item) => {
              const meta = destinationMeta[item.name] || { budget: 'Moderate', vibe: 'Exploration', tags: [], desc: '' }
              const coverUrl = item.image?.imageUrl

              return (
                <div
                  key={item.name}
                  className="relative w-[280px] h-[360px] rounded-[24px] overflow-hidden border border-white/8 bg-[#090e18] flex-shrink-0 snap-center shadow-lg"
                >
                  {coverUrl ? (
                    <img
                      src={coverUrl}
                      alt={item.name}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#285f9f_0%,#10223b_35%,#040814_100%)]" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  {/* Content details at the bottom of mobile card */}
                  <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end h-full">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-amber-400">
                          {meta.budget}
                        </span>
                        <span className="text-[8px] font-semibold text-white/50 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                          {meta.vibe}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">{item.name}</h3>
                        <p className="mt-1 text-[10px] leading-relaxed text-white/60">
                          {meta.desc}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/5">
                        <span className="text-[8px] font-bold text-indigo-300 uppercase tracking-wide bg-indigo-500/5 px-1.5 py-0.5 rounded border border-indigo-500/10">
                          #{meta.tags[0] || 'Travel'}
                        </span>
                        <button
                          onClick={() => handlePlanTrip(item.name)}
                          className="inline-flex h-8 items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-3 text-[10px] font-bold uppercase tracking-wider text-white shadow-md active:translate-y-0.5 cursor-pointer"
                        >
                          <span>Plan</span>
                          <ArrowRight className="size-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </section>
  )
}

export default PopularDestinationsSection
