import React, { useEffect, useState } from 'react'
import { Clock3, Compass, MapPinned, Bookmark, Share2, Check, Loader2, AlertTriangle } from 'lucide-react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { db } from '@/Services/firebase'
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore'
import HotelsSection from '../components/trip-result/HotelsSection'
import DestinationCarouselCard from '../components/trip-result/DestinationCarouselCard'
import RoadmapSection from '../components/trip-result/RoadmapSection'
import LoginDialog from '../components/LoginDialog'

const TripResult = () => {
  const { state } = useLocation()
  const { user } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const tripId = searchParams.get('id')

  const [tripPlan, setTripPlan] = useState(state?.tripPlan || null)
  const [tripImages, setTripImages] = useState(state?.tripImages || null)
  const [tripData, setTripData] = useState(state?.tripData || null)
  
  const [dbLoading, setDbLoading] = useState(!!tripId && !state?.tripPlan)
  const [dbError, setDbError] = useState('')

  const [saving, setSaving] = useState(false)
  const [savedId, setSavedId] = useState(null)
  const [wantsToSave, setWantsToSave] = useState(false)
  const [openLogin, setOpenLogin] = useState(false)
  const [shared, setShared] = useState(false)

  // Load trip from Firestore if search param id is present and different from the currently loaded trip
  useEffect(() => {
    if (tripId && tripId !== savedId) {
      const fetchTrip = async () => {
        setDbLoading(true)
        setDbError('')
        try {
          const docRef = doc(db, 'trips', tripId)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            const data = docSnap.data()
            setTripPlan(data.tripPlan)
            setTripImages(data.tripImages)
            setTripData(data.tripData || null)
            setSavedId(tripId)
          } else {
            setDbError('We couldn\'t find this travel plan. It might have been deleted or the link is incorrect.')
          }
        } catch (err) {
          console.error('Error fetching trip:', err)
          setDbError('Failed to load the travel plan. Please check your network connection.')
        } finally {
          setDbLoading(false)
        }
      }
      fetchTrip()
    }
  }, [tripId, savedId])

  // Trigger save trip automatically once user logs in
  useEffect(() => {
    if (user && wantsToSave && tripPlan) {
      handleSaveTrip()
      setWantsToSave(false)
    }
  }, [user, wantsToSave])

  const handleSaveTrip = async () => {
    if (!user) {
      setWantsToSave(true)
      setOpenLogin(true)
      return
    }

    setSaving(true)
    try {
      console.log('Attempting to save trip to Firestore...')
      console.log('User UID:', user.uid)
      
      const docRef = await addDoc(collection(db, 'trips'), {
        userId: user.uid,
        tripPlan,
        tripImages,
        tripData: tripData || { destination: tripPlan.tripSummary?.destination || '' },
        createdAt: serverTimestamp()
      })
      
      console.log('Saved successfully, ID:', docRef.id)
      setSavedId(docRef.id)
      setSearchParams({ id: docRef.id }, { replace: true })
    } catch (err) {
      console.error('Detailed Save Error:', err)
      alert(`Firestore Save Failed!\n\nError Code: ${err.code || 'Unknown'}\nMessage: ${err.message || err}\n\nPlease check your Firestore Security Rules and ensure that the 'trips' collection is writable.`)
    } finally {
      setSaving(false)
    }
  }

  const handleShareTrip = () => {
    const activeId = savedId || tripId
    if (!activeId) return
    const url = `${window.location.origin}/trip-result?id=${activeId}`
    navigator.clipboard.writeText(url)
    setShared(true)
    setTimeout(() => setShared(false), 2000)
  }

  if (dbLoading) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center text-center text-white space-y-6">
        <div className="h-12 w-12 rounded-full border-4 border-orange-500/20 border-t-orange-500 animate-spin" />
        <h2 className="text-2xl font-semibold text-white/90">Retrieving your travel itinerary...</h2>
        <p className="max-w-md text-white/50 text-sm">Please hold on while we fetch the details of your saved adventure.</p>
      </div>
    )
  }

  if (dbError) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center text-center text-white px-4">
        <div className="mb-4 flex size-14 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10 text-red-400">
          <AlertTriangle className="size-6" />
        </div>
        <h1 className="text-3xl font-semibold text-white">Trip Not Found</h1>
        <p className="mt-3 max-w-lg text-white/65">
          {dbError}
        </p>
        <Link
          to="/create-trip"
          className="mt-6 rounded-2xl border border-orange-500/20 bg-orange-500 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-orange-400"
        >
          Create New Trip
        </Link>
      </div>
    )
  }

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

  const isSaved = !!savedId || !!tripId

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 text-white relative">
      <div className="relative overflow-hidden rounded-[30px] border border-white/8 bg-[#07111f] shadow-[0_26px_90px_rgba(0,0,0,0.28)]">
        {tripImages?.destinationCover?.imageUrl ? (
          <img
            src={tripImages.destinationCover.imageUrl}
            alt={tripImages.destinationCover.alt || tripPlan.tripSummary?.destination}
            className="h-[420px] w-full object-cover sm:h-[500px]"
          />
        ) : (
          <div className="h-[420px] w-full bg-[radial-gradient(circle_at_top_left,#285f9f_0%,#10223b_35%,#09111e_62%,#040814_100%)] sm:h-[500px]" />
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

            <div className="mt-6 flex flex-wrap items-center justify-between gap-5">
              <div className="flex flex-wrap gap-3">
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

              {/* Save & Share Actions */}
              <div className="flex items-center gap-3">
                {isSaved ? (
                  <>
                    <button
                      disabled
                      className="inline-flex h-11 items-center gap-2 rounded-2xl border border-emerald-500/25 bg-emerald-500/10 px-5 text-sm font-medium text-emerald-300 backdrop-blur-md"
                    >
                      <Check className="size-4" />
                      <span>Saved to Trips</span>
                    </button>
                    <button
                      onClick={handleShareTrip}
                      className="inline-flex h-11 items-center gap-2 rounded-2xl border border-orange-400/20 bg-orange-500 px-5 text-sm font-medium text-white shadow-[0_10px_24px_rgba(255,132,53,0.22)] transition-all duration-300 hover:bg-orange-400 hover:shadow-[0_14px_30px_rgba(255,132,53,0.3)] cursor-pointer active:translate-y-0.5"
                    >
                      {shared ? <Check className="size-4" /> : <Share2 className="size-4" />}
                      <span>{shared ? 'Link Copied!' : 'Share Itinerary'}</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleSaveTrip}
                    disabled={saving}
                    className="inline-flex h-11 items-center gap-2 rounded-2xl border border-orange-400/20 bg-orange-500 px-5 text-sm font-medium text-white shadow-[0_10px_24px_rgba(255,132,53,0.22)] transition-all duration-300 hover:bg-orange-400 hover:shadow-[0_14px_30px_rgba(255,132,53,0.3)] cursor-pointer active:translate-y-0.5"
                  >
                    {saving ? <Loader2 className="size-4 animate-spin" /> : <Bookmark className="size-4" />}
                    <span>{saving ? 'Saving...' : 'Save to My Trips'}</span>
                  </button>
                )}
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

      <LoginDialog
        open={openLogin}
        onOpenChange={setOpenLogin}
      />
    </section>
  )
}

export default TripResult
