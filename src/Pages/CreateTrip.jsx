import { useEffect, useState } from 'react'
import { StepOne, StepTwo, StepThree } from '@/components/Forms'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Check, Sparkles, Plane } from 'lucide-react'
import { generateTripPlan, parseTripPlanResponse } from '@/Services/aiModel'
import { getTripImages } from '@/Services/pexelsService'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import GeneratingSpinner from '@/components/GeneratingSpinner'
import LoginDialog from '../components/LoginDialog'
import CommonLoader from '../components/CommonLoader'
import ApiErrorMessage from '@/components/ApiErrorMessage'
import TravelHudBackdrop from '@/components/TravelHudBackdrop'

// Boarding Pass Preview Ticket
const BoardingPassPreview = ({ data }) => {
  const { destination, travelingFrom, noOfDays, noOfTravelers, budget, interests } = data

  return (
    <div className="relative w-full rounded-[28px] border border-white/8 bg-[#0c121e]/85 backdrop-blur-md p-6 shadow-2xl overflow-hidden flex flex-col justify-between min-h-[480px] select-none group">
      {/* Decorative ticket cutouts */}
      <div className="absolute -left-3.5 top-1/2 -translate-y-1/2 size-7 rounded-full bg-[#080b11] border-r border-white/8" />
      <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 size-7 rounded-full bg-[#080b11] border-l border-white/8" />

      {/* Dashed separator line */}
      <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 border-t border-dashed border-white/8 pointer-events-none" />

      {/* Ticket Top Half */}
      <div className="space-y-6 flex-1 pb-6 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">Boarding Pass</span>
            <div className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <span className="text-[9px] font-mono text-white/30 uppercase">Trippn AI v2.5</span>
        </div>

        {/* Route Visualizer */}
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <span className="block text-[8px] font-bold text-white/30 uppercase tracking-wider">Origin</span>
            <span className="block text-base font-extrabold text-white truncate">
              {travelingFrom ? travelingFrom.split(',')[0].toUpperCase() : 'SELECT CITY'}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center shrink-0">
            <Plane className="size-4 text-indigo-400 rotate-45 animate-pulse" />
            <div className="w-14 h-px border-t border-dashed border-indigo-500/20 mt-1" />
          </div>

          <div className="min-w-0 flex-1 text-right">
            <span className="block text-[8px] font-bold text-white/30 uppercase tracking-wider">Destination</span>
            <span className="block text-base font-extrabold text-amber-400 truncate">
              {destination ? destination.split(',')[0].toUpperCase() : 'GETAWAY'}
            </span>
          </div>
        </div>

        {/* Parameter Fields */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-2 pt-2 text-left">
          <div>
            <span className="block text-[8px] font-bold text-white/30 uppercase tracking-wider">Duration</span>
            <span className="block text-xs font-semibold text-white/80">
              {noOfDays ? `${noOfDays} Days` : 'Not configured'}
            </span>
          </div>
          <div>
            <span className="block text-[8px] font-bold text-white/30 uppercase tracking-wider">Travelers</span>
            <span className="block text-xs font-semibold text-white/80">
              {noOfTravelers ? `${noOfTravelers} Person(s)` : 'Not configured'}
            </span>
          </div>
          <div>
            <span className="block text-[8px] font-bold text-white/30 uppercase tracking-wider">Budget Range</span>
            <span className="block text-xs font-extrabold text-amber-400 uppercase">
              {budget || 'Not configured'}
            </span>
          </div>
          <div>
            <span className="block text-[8px] font-bold text-white/30 uppercase tracking-wider">Style Profile</span>
            <span className="block text-xs font-semibold text-indigo-300 truncate">
              {interests && interests.length > 0 ? interests.slice(0, 2).join(', ') : 'Custom'}
            </span>
          </div>
        </div>
      </div>

      {/* Ticket Bottom Half */}
      <div className="pt-6 space-y-4 flex flex-col justify-end relative z-10">
        {/* Selected Interests tags */}
        <div className="space-y-1.5 text-left">
          <span className="block text-[8px] font-bold text-white/30 uppercase tracking-wider">Interests & Vibes</span>
          <div className="flex flex-wrap gap-1.5 min-h-[44px]">
            {interests && interests.length > 0 ? (
              interests.map((interest) => (
                <span 
                  key={interest} 
                  className="text-[8px] font-bold text-indigo-300 uppercase tracking-wide bg-indigo-500/5 px-2 py-0.5 rounded border border-indigo-500/10"
                >
                  {interest}
                </span>
              ))
            ) : (
              <span className="text-[10px] text-white/20 italic">No vibe tags selected yet</span>
            )}
          </div>
        </div>

        {/* Holographic Barcode */}
        <div className="border-t border-white/5 pt-4 flex flex-col items-center gap-1.5">
          <div className="w-full h-8 bg-[linear-gradient(90deg,currentColor_2px,transparent_2px,currentColor_4px,transparent_4px,currentColor_8px,transparent_8px)] text-white/20 opacity-50" />
          <span className="text-[8px] font-mono text-white/20 tracking-[0.25em] uppercase">
            {destination ? `TRIPPN-${destination.slice(0, 3).toUpperCase()}-ITIN` : 'TRIPPN-BOARDING-PASS'}
          </span>
        </div>
      </div>
    </div>
  )
}

function getGeminiErrorMessage(error) {
  const fallbackMessage = 'We could not generate your trip plan right now. Please try again in a moment.'
  const message = error?.message || ''

  if (!message) {
    return fallbackMessage
  }

  if (message.includes('VITE_GOOGLE_GEMINI_API_KEY')) {
    return 'The Gemini API key is missing. Add `VITE_GOOGLE_GEMINI_API_KEY` to your `.env` file and try again.'
  }

  if (message.includes('Empty Gemini response') || message.includes('Could not find valid JSON')) {
    return 'The AI returned an unreadable trip plan. Please try again so we can generate a cleaner response.'
  }

  return fallbackMessage
}

const CreateTrip = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const queryDest = searchParams.get('dest')
  const [preloader, setPreloader] = useState(true)

  const [steps, setSteps] = useState(1)
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const [tripData, setTripData] = useState({
    travelingFrom: null,
    travelingFromDetails: null,
    destination: queryDest || null,
    destinationDetails: null,
    noOfDays: '',
    noOfTravelers: '',
    hasChildren: false,
    budget: '',
    interests: [],
    cuisinePreferences: [],
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setPreloader(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleNextClick = async () => {
    if (steps < 3) {
      setSteps(steps + 1)
      return
    }

    setApiError('')
    try {
      setLoading(true)
      const response = await generateTripPlan(tripData)
      const parsedTripPlan = parseTripPlanResponse(response)
      const hotelNames = (parsedTripPlan.hotelSuggestions || [])
        .slice(0, 3)
        .map((hotel) => hotel.name)
        .filter(Boolean)

      let tripImages = {
        destinationCover: null,
        restaurantImage: null,
        hotelImages: [],
        activityImages: [],
      }

      try {
        tripImages = await getTripImages(
          tripData.destination,
          hotelNames,
          parsedTripPlan.dailyPlan || []
        )
      } catch (imageError) {
        console.error('Failed to fetch trip images:', imageError)
      }

      navigate('/trip-result', {
        state: {
          tripPlan: parsedTripPlan,
          tripImages,
          tripData,
        },
      })
    } catch (error) {
      setApiError(getGeminiErrorMessage(error))
    } finally {
      setLoading(false)
    }
  }

  const handlePrevClick = () => {
    if (steps > 1) {
      setApiError('')
      setSteps(steps - 1)
    }
  }

  return preloader ? (
    <CommonLoader />
  ) : (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-8 pt-24 sm:px-6 sm:py-12 sm:pt-28 w-full max-w-7xl mx-auto overflow-hidden">
      {/* Reusable Coordinates HUD Backdrop */}
      <TravelHudBackdrop className="opacity-[0.14]" />

      {loading ? (
        <GeneratingSpinner />
      ) : (
        <div className="flex flex-col w-full gap-4 relative z-10 pt-[3vh]">
          {/* Back to Home Button */}
          <div className="flex justify-start w-full">
            <Link 
              to="/" 
              className="inline-flex h-9 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:border-indigo-500/40 hover:bg-indigo-500/10 cursor-pointer"
            >
              <ArrowLeft className="size-4 text-indigo-400" />
              <span>Back to Home</span>
            </Link>
          </div>

          <div className="grid w-full gap-6 xl:grid-cols-[1.18fr_0.82fr] xl:items-start">
          
          {/* Left Column: Form Panel */}
          <div className="w-full xl:min-w-0">
            <div className="w-full min-h-[64vh] sm:min-h-[60vh] rounded-none border-y border-white/8 bg-transparent shadow-none sm:rounded-[32px] sm:border sm:border-white/8 sm:bg-[#0c121e]/90 sm:shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-md overflow-hidden flex flex-col">
              
              {/* Progress bar */}
              <div className="h-2 w-full bg-white/8">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500 transition-all duration-500 ease-out"
                  style={{ width: `${(steps / 3) * 100}%` }}
                />
              </div>

              <div className="relative flex flex-1 flex-col overflow-hidden px-4 py-5 sm:p-6 md:p-10">
                <div
                  className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat opacity-20 sm:block"
                  style={{ backgroundImage: "url('/card-bg.png')" }}
                />
                <div className="absolute inset-0 hidden bg-[linear-gradient(180deg,rgba(8,11,17,0.4)_0%,rgba(8,11,17,0.65)_34%,rgba(8,11,17,0.92)_100%)] sm:block" />
                <div className="relative z-10 flex flex-1 flex-col">
                  
                  {/* Step indicators */}
                  <div className="mb-8 flex items-center justify-center gap-2">
                    {[1, 2, 3].map((s) => (
                      <div
                        key={s}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          s === steps ? 'w-6 bg-indigo-500' : 'w-2 bg-white/20'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="mb-8 flex items-center justify-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 text-sm text-white/64 font-bold uppercase tracking-wider">
                      <Sparkles className="size-4 text-indigo-400" />
                      Step {steps} of 3
                    </div>
                  </div>

                  {apiError ? <ApiErrorMessage message={apiError} /> : null}

                  {steps === 1 && <StepOne tripData={tripData} setTripData={setTripData} />}
                  {steps === 2 && <StepTwo tripData={tripData} setTripData={setTripData} />}
                  {steps === 3 && <StepThree tripData={tripData} setTripData={setTripData} />}
                </div>
              </div>

              {/* Navigation controls footer */}
              <div className="flex items-center justify-between border-t border-white/8 bg-transparent px-4 py-4 sm:bg-black/20 sm:px-5 md:px-8">
                <Button
                  variant="outline"
                  size="lg"
                  className="cursor-pointer rounded-2xl border-white/10 bg-white/[0.03] px-5 text-white hover:border-white/20 hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-40 font-bold uppercase tracking-wider text-xs h-11"
                  onClick={handlePrevClick}
                  disabled={steps === 1 || loading}
                >
                  <ArrowLeft className="size-4" />
                  Previous
                </Button>
                <Button
                  size="lg"
                  className="cursor-pointer rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 text-white shadow-[0_8px_20px_rgba(245,158,11,0.25)] hover:from-amber-400 hover:to-orange-400 hover:shadow-[0_10px_25px_rgba(245,158,11,0.35)] disabled:cursor-not-allowed disabled:opacity-45 font-bold uppercase tracking-wider text-xs h-11"
                  onClick={handleNextClick}
                  disabled={loading}
                >
                  {steps === 3 ? 'Finish' : 'Next'}
                  {steps === 3 ? <Check className="size-4" /> : <ArrowRight className="size-4" />}
                </Button>
              </div>

            </div>
          </div>

          {/* Right Column: Boarding Pass Live Preview */}
          <div className="xl:sticky xl:top-28 w-full">
            <BoardingPassPreview data={tripData} />
          </div>

        </div>
      </div>
      )}
    </div>
  )
}

export default CreateTrip
