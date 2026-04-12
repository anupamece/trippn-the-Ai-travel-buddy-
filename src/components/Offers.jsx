import React, { useEffect, useState } from 'react'
import { Gift, LoaderCircle, Sparkles } from 'lucide-react'
import { getPopularDestinationImages } from '@/Services/pexelsService'

const destinations = [
  { name: 'Bali', discount: 'Up to 30% off' },
  { name: 'Paris', discount: 'Up to 22% off' },
  { name: 'Dubai', discount: 'Up to 28% off' },
  { name: 'Tokyo', discount: 'Up to 18% off' },
]

const Offers = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const loadOffers = async () => {
      try {
        const images = await getPopularDestinationImages(destinations.map((destination) => destination.name))

        if (!isMounted) {
          return
        }

        setItems(
          destinations.map((destination) => ({
            ...destination,
            image: images.find((image) => image.name === destination.name)?.image || null,
          }))
        )
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadOffers()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <aside className="overflow-hidden rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,#161616_0%,#0f0f0f_100%)] shadow-[0_20px_60px_rgba(0,0,0,0.22)] sm:rounded-[32px] sm:shadow-[0_26px_90px_rgba(0,0,0,0.26)]">
      <div className="relative overflow-hidden border-b border-white/8 px-4 pb-5 pt-5 sm:px-7 sm:pb-6 sm:pt-7">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-18"
          style={{ backgroundImage: "url('/card-bg.png')" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,18,18,0.55)_0%,rgba(18,18,18,0.8)_100%)]" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/18 bg-orange-500/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-orange-100/88">
            <Gift className="size-4 text-orange-300" />
            Offers & rewards
          </div>
          <h2 className="mt-5 max-w-sm text-3xl font-semibold leading-tight text-white">
            Unlock Exciting Offers and rewards while travelling
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/58">
            Explore destination-linked perks and dummy referral savings while planning your next
            escape.
          </p>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {loading ? (
          <div className="flex min-h-[320px] items-center justify-center rounded-[24px] border border-white/8 bg-white/[0.03] text-white/72">
            <div className="inline-flex items-center gap-3">
              <LoaderCircle className="size-5 animate-spin text-orange-300" />
              Loading offers
            </div>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {items.map((item) => (
              <article
                key={item.name}
                className="overflow-hidden rounded-[24px] border border-white/8 bg-[#131313]"
              >
                {item.image?.imageUrl ? (
                  <div className="relative">
                    <img
                      src={item.image.imageUrl}
                      alt={item.image.alt || item.name}
                      className="h-40 w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,7,0.08)_0%,rgba(7,7,7,0.18)_42%,rgba(7,7,7,0.88)_100%)]" />
                    <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/25 px-3 py-2 text-[11px] uppercase tracking-[0.22em] text-white/82">
                      <Sparkles className="size-3.5 text-orange-300" />
                      Referral perk
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <div className="flex items-end justify-between gap-3">
                        <div>
                          <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                          <p className="mt-1 text-sm text-white/62">Book through our referrals</p>
                        </div>
                        <div className="rounded-2xl border border-orange-400/24 bg-orange-500/14 px-3 py-2 text-right">
                          <p className="text-[10px] uppercase tracking-[0.22em] text-orange-100/68">
                            Dummy offer
                          </p>
                          <p className="mt-1 text-sm font-semibold text-orange-200">
                            {item.discount}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-40 items-end bg-[radial-gradient(circle_at_top_left,#3e220f_0%,#1b1410_42%,#111111_100%)] p-4">
                    <div className="flex w-full items-end justify-between gap-3">
                      <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                      <span className="rounded-2xl border border-orange-400/24 bg-orange-500/14 px-3 py-2 text-sm font-semibold text-orange-200">
                        {item.discount}
                      </span>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </aside>
  )
}

export default Offers
