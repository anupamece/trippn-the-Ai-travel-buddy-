import React from 'react'
import { BedDouble, Building2 } from 'lucide-react'

const HotelsSection = ({ hotels, hotelImageMap, formatHotelPrice }) => {
  if (!hotels.length) {
    return null
  }

  return (
    <section className="rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,#101826_0%,#0a101b_100%)] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.2)] sm:p-7">
      <div className="flex flex-col gap-4 border-b border-white/8 pb-6">
        <div className="flex items-center gap-2">
          <Building2 className="size-5 text-orange-300" />
          <h2 className="text-2xl font-semibold text-white">Stay options</h2>
        </div>
      </div>

      <div className="mt-6 flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {hotels.map((hotel) => {
          const hotelImage = hotelImageMap.get(hotel.name)

          return (
            <article
              key={hotel.name}
              className="min-w-[290px] flex-1 overflow-hidden rounded-[24px] border border-white/8 bg-[#0c1624]/92 shadow-[0_14px_30px_rgba(0,0,0,0.18)]"
            >
              {hotelImage?.imageUrl ? (
                <img
                  src={hotelImage.imageUrl}
                  alt={hotelImage.alt || hotel.name}
                  className="h-44 w-full object-cover"
                />
              ) : (
                <div className="h-44 w-full bg-[linear-gradient(135deg,#17263c_0%,#0b1323_100%)]" />
              )}

              <div className="space-y-3 p-5">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex size-10 items-center justify-center rounded-full bg-white/6">
                    <BedDouble className="size-4 text-cyan-200" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-white">{hotel.name}</h3>
                    <p className="mt-1 text-sm font-medium text-orange-300">
                      {formatHotelPrice(hotel)}
                    </p>
                  </div>
                </div>
                <p className="text-sm leading-6 text-white/62">{hotel.reason}</p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default HotelsSection
