import React, { useEffect, useMemo, useState } from 'react'
import { Camera, LoaderCircle } from 'lucide-react'
import { getDestinationGallery } from '../../Services/pexelsService'

const AUTOPLAY_DELAY = 4200

const DestinationCarouselCard = ({ destination, fallbackImage }) => {
  const [slides, setSlides] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadGallery = async () => {
      try {
        setLoading(true)
        setError('')

        const gallery = await getDestinationGallery(destination)

        if (!isMounted) {
          return
        }

        setSlides(gallery)
        setActiveIndex(0)
      } catch (fetchError) {
        if (!isMounted) {
          return
        }

        setError(fetchError.message || 'Unable to load destination images')
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadGallery()

    return () => {
      isMounted = false
    }
  }, [destination])

  useEffect(() => {
    if (slides.length <= 1) {
      return undefined
    }

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length)
    }, AUTOPLAY_DELAY)

    return () => window.clearInterval(timer)
  }, [slides])

  const visibleSlides = useMemo(() => {
    if (slides.length > 0) {
      return slides
    }

    if (fallbackImage?.imageUrl) {
      return [
        {
          id: 'fallback-destination',
          alt: fallbackImage.alt || destination,
          imageUrl: fallbackImage.imageUrl,
          photographer: 'Trippn source',
          photographerUrl: '',
          pexelsUrl: '',
        },
      ]
    }

    return []
  }, [destination, fallbackImage, slides])

  const activeSlide = visibleSlides[activeIndex] || visibleSlides[0]
  const isPexelsSlide = slides.length > 0 && Boolean(activeSlide?.pexelsUrl)

  return (
    <div className="overflow-hidden rounded-[17px] border border-white/8 bg-[linear-gradient(180deg,#101826_0%,#09101a_100%)] shadow-[0_34px_90px_rgba(0,0,0,0.24)]">
      <div className="relative min-h-[590px]">
        {activeSlide?.imageUrl ? (
          <>
            <img
              src={activeSlide.imageUrl}
              alt={activeSlide.alt || destination}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,20,0.04)_0%,rgba(4,10,20,0.16)_24%,rgba(4,10,20,0.38)_52%,rgba(4,10,20,0.86)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.16)_0%,transparent_28%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.12)_0%,transparent_26%)]" />
          </>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#285f9f_0%,#10223b_35%,#09111e_62%,#040814_100%)]" />
        )}

        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-[#09111e]/55 px-4 py-2 text-xs uppercase tracking-[0.28em] text-cyan-100/80 backdrop-blur-xl">
            <Camera className="size-4 text-cyan-300" />
            Destination carousel
          </div>

          {loading ? (
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/20 px-3 py-2 text-xs text-white/72 backdrop-blur-md">
              <LoaderCircle className="size-4 animate-spin text-orange-300" />
              Loading visuals
            </div>
          ) : null}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:gap-5">
            <h2 className="max-w-[18rem] text-3xl font-semibold text-white [text-shadow:0_8px_26px_rgba(0,0,0,0.55)] sm:max-w-[22rem] sm:text-[2.2rem]">
              {destination || 'Destination gallery'}
            </h2>

            <div className="flex items-end justify-between gap-4">
              <div className="flex items-center gap-2">
                {visibleSlides.slice(0, 7).map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    aria-label={`Show image ${index + 1}`}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? 'w-8 bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.55)]'
                        : 'w-2.5 bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>

              <div className="text-right text-xs text-white/78 [text-shadow:0_4px_20px_rgba(0,0,0,0.5)]">
                {isPexelsSlide ? (
                  <p>
                    Images provided by{' '}
                    <a
                      href="https://www.pexels.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-200 transition-colors hover:text-cyan-100"
                    >
                      Pexels
                    </a>
                  </p>
                ) : (
                  <p>Destination cover fallback</p>
                )}
              </div>
            </div>

            {error && !visibleSlides.length ? (
              <p className="text-sm text-orange-200/88 [text-shadow:0_4px_18px_rgba(0,0,0,0.45)]">
                {error}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DestinationCarouselCard
