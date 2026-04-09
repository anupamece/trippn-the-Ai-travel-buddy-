import GeoapifyAutocomplete from '@/components/GeoapifyAutocomplete'
import { Compass, WalletCards, Users } from 'lucide-react'
import React from 'react'

const inputClassName =
  'mt-3 h-14 w-full rounded-2xl border border-white/10 bg-white/6 px-4 text-base text-white outline-none transition-all duration-300 placeholder:text-white/35 focus:border-cyan-300/40 focus:bg-white/8 focus:ring-4 focus:ring-cyan-300/10'

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
      <div className="mb-8 space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100/90">
          <Compass className="size-4 text-cyan-300" />
          Step 01 - Trip basics
        </div>

        <h2 className="max-w-xl text-3xl font-semibold leading-tight text-white sm:text-4xl">
          Where&apos;s your next adventure?
        </h2>
        <p className="max-w-xl text-base text-white/68 sm:text-lg">
          Enter your destination and how many days you&apos;re planning to travel.
        </p>
      </div>

      <div className="space-y-6">

        <div>
          <label htmlFor="destination" className="text-sm font-medium tracking-wide text-white/80">
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
          <label htmlFor="destination" className="text-sm font-medium tracking-wide text-white/80">
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
          <label htmlFor="days" className="text-sm font-medium tracking-wide text-white/80">
            Number of Days
          </label>
          <input
            id="days"
            type="number"
            min="1"
            value={tripData.noOfDays}
            onChange={(event) =>
              setTripData((prev) => ({ ...prev, noOfDays: event.target.value }))
            }
            placeholder="How many days are you planning?"
            className={inputClassName}
          />
        </div>
      </div>
    </div>
  )
}

const StepTwo = ({ tripData, setTripData }) => {
  return (
    <div className="mx-auto w-full max-w-2xl text-white">
      <div className="mb-8 space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100/90">
          <Users className="size-4 text-cyan-300" />
          Step 02 - Travelers and budget
        </div>

        <h2 className="max-w-xl text-3xl font-semibold leading-tight text-white sm:text-4xl">
          Who&apos;s joining the trip?
        </h2>
        <p className="max-w-xl text-base text-white/68 sm:text-lg">
          Tell us how many travelers are coming and what budget range you want to plan around.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="travelers" className="text-sm font-medium tracking-wide text-white/80">
            Number of Travellers
          </label>
          <input
            id="travelers"
            type="number"
            min="1"
            value={tripData.noOfTravelers}
            onChange={(event) =>
              setTripData((prev) => ({
                ...prev,
                noOfTravelers: event.target.value,
              }))
            }
            placeholder="How many people are travelling?"
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="budget" className="text-sm font-medium tracking-wide text-white/80">
            Budget
          </label>
          <select
            id="budget"
            value={tripData.budget}
            onChange={(event) =>
              setTripData((prev) => ({ ...prev, budget: event.target.value }))
            }
            className={inputClassName}
          >
            <option value="" className="bg-slate-950 text-white">
              Select a budget range
            </option>
            <option value="budget" className="bg-slate-950 text-white">
              Budget Friendly
            </option>
            <option value="moderate" className="bg-slate-950 text-white">
              Moderate Comfort
            </option>
            <option value="luxury" className="bg-slate-950 text-white">
              Luxury Escape
            </option>
          </select>
        </div>
      </div>
    </div>
  )
}

const StepThree = ({ tripData, setTripData }) => {
  return (
    <div className="mx-auto w-full max-w-3xl text-white">
      <div className="mb-8 space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-300/20 bg-fuchsia-300/10 px-4 py-2 text-sm text-fuchsia-100/90">
          <WalletCards className="size-4 text-fuchsia-300" />
          Step 03 - Preferences
        </div>
        <h2 className="max-w-2xl text-3xl font-semibold leading-tight text-white sm:text-4xl">
          Personalize the trip experience
        </h2>
        <p className="max-w-2xl text-base text-white/68 sm:text-lg">
          Choose your interests, cuisine preferences, and let us know if children are travelling
          with you.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-white">Checkbox your interests.</h3>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {interests.map((interest) => (
              <label
                key={interest}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-white/85 transition-colors hover:bg-white/8"
              >
                <input
                  type="checkbox"
                  checked={tripData.interests.includes(interest)}
                  onChange={() =>
                    setTripData((prev) => ({
                      ...prev,
                      interests: toggleSelection(prev.interests, interest),
                    }))
                  }
                  className="size-4 rounded border-white/20 bg-transparent accent-cyan-300"
                />
                <span className="text-sm sm:text-base">{interest}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white">Checkbox your cuisine preferences.</h3>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {cuisinePreferences.map((cuisine) => (
              <label
                key={cuisine}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-white/85 transition-colors hover:bg-white/8"
              >
                <input
                  type="checkbox"
                  checked={tripData.cuisinePreferences.includes(cuisine)}
                  onChange={() =>
                    setTripData((prev) => ({
                      ...prev,
                      cuisinePreferences: toggleSelection(prev.cuisinePreferences, cuisine),
                    }))
                  }
                  className="size-4 rounded border-white/20 bg-transparent accent-fuchsia-300"
                />
                <span className="text-sm sm:text-base">{cuisine}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <label className="flex items-center gap-3 rounded-2xl border border-amber-300/25 bg-amber-300/10 px-4 py-4 text-amber-50">
          <input
            type="checkbox"
            checked={tripData.hasChildren}
            onChange={(event) =>
              setTripData((prev) => ({ ...prev, hasChildren: event.target.checked }))
            }
            className="size-4 rounded border-amber-100/40 bg-transparent accent-amber-300"
          />
          <span className="text-sm sm:text-base">Check if children are travelling with you</span>
        </label>
      </div>
    </div>
  )
}

export  {StepOne,StepTwo,StepThree};
