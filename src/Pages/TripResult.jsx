import React from 'react'
import { Clock3, Compass, MapPinned } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import HotelsSection from '../components/trip-result/HotelsSection'
import DestinationCarouselCard from '../components/trip-result/DestinationCarouselCard'
import RoadmapSection from '../components/trip-result/RoadmapSection'

const TripResult = () => {
  const { state } = useLocation()
  const tripPlan = state?.tripPlan
  const tripImages = state?.tripImages

  if (!tripPlan) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center text-center text-white">
        <h1 className="text-3xl font-semibold text-white">No trip plan yet</h1>
        <p className="mt-3 max-w-lg text-white/65">
          Generate a trip first and then we&apos;ll show your destination cover and hotel
          suggestions here.
        </p>
        <Link
          to="/create-trip"
          className="mt-6 rounded-2xl border border-cyan-300/20 bg-cyan-300 px-5 py-3 text-sm font-medium text-slate-950 transition-colors hover:bg-cyan-200"
        >
          Create Trip
        </Link>
      </div>
    )
  }

  const hotels = (tripPlan.hotelSuggestions || []).slice(0, 3)
  const dailyPlan = Array.isArray(tripPlan.dailyPlan) ? tripPlan.dailyPlan : []
  const hotelImageMap = new Map(
    (tripImages?.hotelImages || []).map((hotel) => [hotel.name, hotel.image])
  )
  const roadmapImages = [
    tripImages?.destinationCover,
    tripImages?.restaurantImage,
    ...(tripImages?.hotelImages || []).map((hotel) => hotel.image),
  ].filter(Boolean)
  const activityImages = Array.isArray(tripImages?.activityImages) ? tripImages.activityImages : []

  const shortOverview = (() => {
    if (!tripPlan.overview) {
      return 'A personalized stay guide shaped around your destination and travel style.'
    }

    const firstSentence = tripPlan.overview.split(/(?<=[.!?])\s+/)[0]
    return firstSentence.length > 180 ? `${firstSentence.slice(0, 177)}...` : firstSentence
  })()

  const formatHotelPrice = (hotel) => {
    const symbol = hotel.currencySymbol || tripPlan.tripSummary?.currencySymbol || ''
    const from = hotel.pricePerNightFrom
    const to = hotel.pricePerNightTo

    if (typeof from === 'number' && typeof to === 'number' && from > 0 && to > 0) {
      return `${symbol}${from.toLocaleString()} - ${symbol}${to.toLocaleString()} / night`
    }

    return hotel.priceRangeLabel || 'Price unavailable'
  }

  const formatMealBudget = (meal) => {
    const symbol = meal.currencySymbol || tripPlan.tripSummary?.currencySymbol || ''
    const from = meal.estimatedPerPersonFrom
    const to = meal.estimatedPerPersonTo

    if (typeof from === 'number' && typeof to === 'number' && from > 0 && to > 0) {
      return `${symbol}${from.toLocaleString()} - ${symbol}${to.toLocaleString()} pp`
    }

    return 'Local pricing varies'
  }

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 text-white">
      <div className="relative overflow-hidden rounded-[30px] border border-white/8 bg-[#07111f] shadow-[0_26px_90px_rgba(0,0,0,0.28)]">
        {tripImages?.destinationCover?.imageUrl ? (
          <img
            src={tripImages.destinationCover.imageUrl}
            alt={tripImages.destinationCover.alt || tripPlan.tripSummary?.destination}
            className="h-[380px] w-full object-cover sm:h-[460px]"
          />
        ) : (
          <div className="h-[380px] w-full bg-[radial-gradient(circle_at_top_left,#285f9f_0%,#10223b_35%,#09111e_62%,#040814_100%)] sm:h-[460px]" />
        )}

        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(5,11,24,0.16)_0%,rgba(5,11,24,0.34)_34%,rgba(5,11,24,0.92)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.26)_0%,transparent_32%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.2)_0%,transparent_28%)]" />

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 lg:p-10">
          <div className="max-w-4xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/12 bg-[#09111e]/55 px-4 py-2 text-sm text-white/88 shadow-[0_12px_32px_rgba(0,0,0,0.22)] backdrop-blur-xl">
              <MapPinned className="size-4 text-orange-300" />
              Tailored itinerary preview
            </div>

            <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white [text-shadow:0_16px_40px_rgba(0,0,0,0.45)] sm:text-5xl lg:text-6xl">
              {tripPlan.tripSummary?.destination || 'Your Trip'}
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-white/88 sm:text-lg sm:leading-8">
              {shortOverview}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm text-white/88 backdrop-blur-md">
                {tripPlan.tripSummary?.duration || `${dailyPlan.length} day journey`}
              </div>
              <div className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm text-white/88 backdrop-blur-md">
                {tripPlan.tripSummary?.travellers || 'Personalized for your group'}
              </div>
              <div className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm text-white/88 backdrop-blur-md">
                {tripPlan.tripSummary?.budget || 'Flexible budget'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <HotelsSection
        hotels={hotels}
        hotelImageMap={hotelImageMap}
        formatHotelPrice={formatHotelPrice}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="space-y-6 xl:min-w-0">
          <RoadmapSection
            dailyPlan={dailyPlan}
            childrenTravelling={tripPlan.tripSummary?.childrenTravelling}
            formatMealBudget={formatMealBudget}
            roadmapImages={roadmapImages}
            activityImages={activityImages}
          />
        </div>

        <aside className="space-y-6 xl:sticky xl:top-28 xl:self-start">
          <DestinationCarouselCard
            destination={tripPlan.tripSummary?.destination}
            fallbackImage={tripImages?.destinationCover}
          />
        </aside>
      </div>
    </section>
  )
}

export default TripResult
