import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { LoaderCircle, MapPinned } from 'lucide-react'
import { getPopularDestinationImages } from '../../Services/pexelsService'

const destinations = ['Paris', 'Tokyo', 'Bali', 'Dubai', 'New York']

const PopularDestinationsSection = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

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

  return (
    <section className="rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,#101721_0%,#0a1018_100%)] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)] sm:p-8 lg:p-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.32em] text-cyan-200/70">
            Popular Destinations
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            Sample escapes people keep coming back to
          </h2>
        </div>
        <p className="text-sm text-white/52">
          Images provided by <span className="text-cyan-200">Pexels</span>
        </p>
      </div>

      {loading ? (
        <div className="mt-10 flex min-h-[220px] items-center justify-center rounded-[24px] border border-white/8 bg-white/[0.03]">
          <div className="inline-flex items-center gap-3 text-white/72">
            <LoaderCircle className="size-5 animate-spin text-cyan-300" />
            Loading destination visuals
          </div>
        </div>
      ) : (
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {items.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="group overflow-hidden rounded-[24px] border border-white/8 bg-[#0d1624]"
            >
              {item.image?.imageUrl ? (
                <div className="relative">
                  <img
                    src={item.image.imageUrl}
                    alt={item.image.alt || item.name}
                    className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,8,18,0.05)_0%,rgba(3,8,18,0.2)_44%,rgba(3,8,18,0.84)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-2 text-xs uppercase tracking-[0.22em] text-white/76">
                      <MapPinned className="size-3.5 text-orange-300" />
                      Popular now
                    </div>
                    <h3 className="mt-3 text-xl font-semibold text-white">{item.name}</h3>
                  </div>
                </div>
              ) : (
                <div className="flex h-64 items-end rounded-[24px] bg-[radial-gradient(circle_at_top_left,#285f9f_0%,#10223b_35%,#09111e_62%,#040814_100%)] p-4">
                  <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                </div>
              )}
            </motion.article>
          ))}
        </div>
      )}
    </section>
  )
}

export default PopularDestinationsSection
