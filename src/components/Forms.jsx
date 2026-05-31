import GeoapifyAutocomplete from '@/components/GeoapifyAutocomplete'
import {
  Compass,
  Wallet,
  Sparkles,
  Users,
  User,
  Heart,
  Baby,
  Plus,
  Minus,
  Smile,
  Check,
} from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'

const inputClassName =
  'mt-3 h-14 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-base text-white outline-none transition-all duration-300 placeholder:text-white/35 focus:border-indigo-500/50 focus:bg-white/[0.06] focus:ring-4 focus:ring-indigo-500/10'

const interests = [
  'Museums',
  'Outdoor Adventures',
  'Shopping',
  "Children's Entertainment",
  'Off the beat activities',
  'Night Life',
]

const cuisinePreferences = [
  'Ethnic',
  'American',
  'Italian',
  'Mexican',
  'Chinese',
  'Japanese',
  'Indian',
  'Thai',
  'French',
  'Vietnamese',
  'Vegan',
]

const toggleSelection = (currentItems, item) =>
  currentItems.includes(item)
    ? currentItems.filter((entry) => entry !== item)
    : [...currentItems, item]

const StepOne = ({ tripData, setTripData }) => {
  return (
    <div className="mx-auto w-full max-w-2xl text-white">
      <div className="mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-300">
          <Compass className="size-3.5 text-indigo-400" />
          Step 01 — Basics
        </div>
        <h2 className="font-heading text-3xl font-extrabold leading-tight text-white sm:text-4xl">
          Where&apos;s your next adventure?
        </h2>
        <p className="text-sm text-white/50 leading-relaxed">
          Provide your home location and target destination to build visual routes.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-white/40 block">
            Travelling From
          </label>
          <GeoapifyAutocomplete
            value={tripData.travelingFrom ?? ''}
            onChange={(value) => setTripData((prev) => ({ ...prev, travelingFrom: value }))}
            onSelect={(place) =>
              setTripData((prev) => ({
                ...prev,
                travelingFrom: place.formatted || place.city || prev.travelingFrom,
                travelingFromDetails: place,
              }))
            }
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-white/40 block">
            Destination
          </label>
          <GeoapifyAutocomplete
            value={tripData.destination ?? ''}
            onChange={(value) => setTripData((prev) => ({ ...prev, destination: value }))}
            onSelect={(place) =>
              setTripData((prev) => ({
                ...prev,
                destination: place.formatted || place.city || prev.destination,
                destinationDetails: place,
              }))
            }
          />
        </div>

        <div>
          <label htmlFor="days" className="text-xs font-bold uppercase tracking-wider text-white/40 block">
            Number of Days
          </label>
          <input
            id="days"
            type="number"
            min="1"
            max="30"
            value={tripData.noOfDays}
            onChange={(event) =>
              setTripData((prev) => ({ ...prev, noOfDays: event.target.value }))
            }
            placeholder="How many days is your journey?"
            className={inputClassName}
          />
        </div>
      </div>
    </div>
  )
}

const StepTwo = ({ tripData, setTripData }) => {
  const travelersOptions = [
    { label: 'Solo', count: '1', icon: User, desc: 'Single traveler' },
    { label: 'Couple', count: '2', icon: Users, desc: 'Two partners' },
    { label: 'Family', count: '4', icon: Heart, desc: 'Family group' },
    { label: 'Group', count: '6', icon: Smile, desc: 'Friends circle' },
  ]

  const budgetOptions = [
    {
      value: 'budget',
      label: 'Budget Friendly',
      icon: Wallet,
      desc: 'Keep costs low. Enjoy street food, free attractions, and local hostels.',
    },
    {
      value: 'moderate',
      label: 'Moderate Comfort',
      icon: Compass,
      desc: 'Balanced spending. Cozy boutique stays, dine-in meals, and guided sights.',
    },
    {
      value: 'luxury',
      label: 'Luxury Escape',
      icon: Sparkles,
      desc: 'No expense spared. High-end stays, fine dining, and private tours.',
    },
  ]

  const handleDecrement = () => {
    const val = parseInt(tripData.noOfTravelers) || 1
    if (val > 1) {
      setTripData((prev) => ({ ...prev, noOfTravelers: String(val - 1) }))
    }
  }

  const handleIncrement = () => {
    const val = parseInt(tripData.noOfTravelers) || 1
    setTripData((prev) => ({ ...prev, noOfTravelers: String(val + 1) }))
  }

  const activeTravelerPreset = travelersOptions.find(
    (opt) => opt.count === String(tripData.noOfTravelers)
  )

  return (
    <div className="mx-auto w-full max-w-3xl text-white">
      <div className="mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-300">
          <Users className="size-3.5 text-indigo-400" />
          Step 02 — Companions & Budget
        </div>
        <h2 className="font-heading text-3xl font-extrabold leading-tight text-white sm:text-4xl">
          Who&apos;s traveling and what&apos;s the budget?
        </h2>
        <p className="text-sm text-white/50 leading-relaxed">
          Tell us about your budget level and custom traveler composition.
        </p>
      </div>

      <div className="space-y-8">
        
        {/* TRAVELERS SECTION */}
        <div className="space-y-4">
          <label className="text-xs font-bold uppercase tracking-wider text-white/40 block">
            Companions
          </label>
          
          {/* Preset Grid Selector */}
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
            {travelersOptions.map((opt) => {
              const Icon = opt.icon
              const isSelected = String(tripData.noOfTravelers) === opt.count
              return (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => setTripData((prev) => ({ ...prev, noOfTravelers: opt.count }))}
                  className={`flex flex-col items-center p-4 rounded-2xl border transition-all duration-300 text-center cursor-pointer ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-500/10 text-white shadow-[0_0_15px_rgba(99,102,241,0.15)]'
                      : 'border-white/6 bg-white/[0.02] text-white/60 hover:border-white/12 hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon className={`size-5 mb-2 ${isSelected ? 'text-indigo-400' : 'text-white/40'}`} />
                  <span className="text-xs font-bold uppercase tracking-wide block">{opt.label}</span>
                  <span className="text-[0.62rem] text-white/40 mt-1 block">{opt.desc}</span>
                </button>
              )
            })}
          </div>

          {/* Precision Stepper Controller */}
          <div className="flex items-center gap-4 border border-white/6 bg-white/[0.02] p-3 rounded-2xl justify-between max-w-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-white/50 pl-2">
              Exact Count:
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleDecrement}
                className="flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/70 hover:bg-white/[0.08] active:scale-95 cursor-pointer"
              >
                <Minus className="size-4" />
              </button>
              <span className="text-lg font-extrabold text-white w-8 text-center">
                {tripData.noOfTravelers || 1}
              </span>
              <button
                type="button"
                onClick={handleIncrement}
                className="flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/70 hover:bg-white/[0.08] active:scale-95 cursor-pointer"
              >
                <Plus className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* BUDGET CARDS SECTION */}
        <div className="space-y-4 pt-2">
          <label className="text-xs font-bold uppercase tracking-wider text-white/40 block">
            Budget Profile
          </label>
          <div className="grid gap-4 md:grid-cols-3">
            {budgetOptions.map((opt) => {
              const Icon = opt.icon
              const isSelected = tripData.budget === opt.value
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setTripData((prev) => ({ ...prev, budget: opt.value }))}
                  className={`flex flex-col items-start p-5 rounded-[22px] border text-left transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-500/10 text-white shadow-[0_0_20px_rgba(99,102,241,0.18)]'
                      : 'border-white/6 bg-white/[0.02] text-white/60 hover:border-white/12 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className={`mb-4 flex size-10 items-center justify-center rounded-xl border ${
                    isSelected ? 'border-indigo-500/30 bg-indigo-500/20 text-indigo-400' : 'border-white/10 bg-white/[0.04] text-white/45'
                  }`}>
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight">{opt.label}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/40">{opt.desc}</p>
                </button>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}

const StepThree = ({ tripData, setTripData }) => {
  return (
    <div className="mx-auto w-full max-w-3xl text-white">
      <div className="mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-300">
          <Sparkles className="size-3.5 text-indigo-400" />
          Step 03 — Preferences
        </div>
        <h2 className="font-heading text-3xl font-extrabold leading-tight text-white sm:text-4xl">
          Fine-tune your adventure vibe
        </h2>
        <p className="text-sm text-white/50 leading-relaxed">
          Select travel activities and culinary styles.
        </p>
      </div>

      <div className="space-y-8">
        
        {/* Interests Pills */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white/40">Select Interests</h3>
          <div className="flex flex-wrap gap-2.5">
            {interests.map((interest) => {
              const isSelected = tripData.interests.includes(interest)
              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() =>
                    setTripData((prev) => ({
                      ...prev,
                      interests: toggleSelection(prev.interests, interest),
                    }))
                  }
                  className={`inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-2xl border text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-600 text-white shadow-[0_0_12px_rgba(99,102,241,0.2)]'
                      : 'border-white/8 bg-white/[0.02] text-white/60 hover:border-white/15 hover:bg-white/[0.04]'
                  }`}
                >
                  {isSelected && <Check className="size-4 shrink-0" />}
                  <span>{interest}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Cuisine Pills */}
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white/40">Cuisine Preferences</h3>
          <div className="flex flex-wrap gap-2.5">
            {cuisinePreferences.map((cuisine) => {
              const isSelected = tripData.cuisinePreferences.includes(cuisine)
              return (
                <button
                  key={cuisine}
                  type="button"
                  onClick={() =>
                    setTripData((prev) => ({
                      ...prev,
                      cuisinePreferences: toggleSelection(prev.cuisinePreferences, cuisine),
                    }))
                  }
                  className={`inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-2xl border text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'border-amber-500 bg-amber-500 text-white shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                      : 'border-white/8 bg-white/[0.02] text-white/60 hover:border-white/15 hover:bg-white/[0.04]'
                  }`}
                >
                  {isSelected && <Check className="size-4 shrink-0" />}
                  <span>{cuisine}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Kids traveling panel */}
        <div className="pt-4">
          <button
            type="button"
            onClick={() =>
              setTripData((prev) => ({ ...prev, hasChildren: !prev.hasChildren }))
            }
            className={`flex items-center w-full gap-4 p-5 rounded-2xl border transition-all duration-300 text-left cursor-pointer ${
              tripData.hasChildren
                ? 'border-amber-500 bg-amber-500/10 text-white shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                : 'border-white/8 bg-white/[0.02] text-white/60 hover:border-white/12 hover:bg-white/[0.04]'
            }`}
          >
            <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl border ${
              tripData.hasChildren ? 'border-amber-500/30 bg-amber-500/20 text-amber-400' : 'border-white/10 bg-white/[0.04] text-white/40'
            }`}>
              <Baby className="size-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold uppercase tracking-wide text-white">Children Travelling</h3>
              <p className="text-xs text-white/40 mt-1">Check this if children are part of your travel companions to customize family-friendly experiences.</p>
            </div>
            <div className="ml-auto flex items-center">
              <div className={`w-10 h-6 rounded-full p-1 transition-colors duration-300 ${
                tripData.hasChildren ? 'bg-amber-500' : 'bg-white/10'
              }`}>
                <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
                  tripData.hasChildren ? 'translate-x-4' : 'translate-x-0'
                }`} />
              </div>
            </div>
          </button>
        </div>

      </div>
    </div>
  )
}

export { StepOne, StepTwo, StepThree }
