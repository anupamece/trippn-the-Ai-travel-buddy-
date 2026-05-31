import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { db } from '@/Services/firebase'
import { collection, query, where, getDocs, orderBy, deleteDoc, doc } from 'firebase/firestore'
import { motion } from 'framer-motion'
import { Compass, Trash2, Calendar, Users, Briefcase, MapPin, Loader2, ArrowRight } from 'lucide-react'

const MyTrips = () => {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    // If auth finishes loading and there is no user, redirect to home
    if (!authLoading && !user) {
      navigate('/')
      return
    }

    if (user) {
      const fetchUserTrips = async () => {
        setLoading(true)
        try {
          const q = query(
            collection(db, 'trips'),
            where('userId', '==', user.uid)
          )
          const querySnapshot = await getDocs(q)
          const fetchedTrips = []
          querySnapshot.forEach((doc) => {
            fetchedTrips.push({ id: doc.id, ...doc.data() })
          })
          // Sort in memory by createdAt descending to avoid composite index requirements
          fetchedTrips.sort((a, b) => {
            const timeA = a.createdAt?.seconds || 0
            const timeB = b.createdAt?.seconds || 0
            return timeB - timeA
          })
          setTrips(fetchedTrips)
        } catch (err) {
          console.error('Error fetching user trips:', err)
          alert(`Firestore Load Failed!\n\nError Code: ${err.code || 'Unknown'}\nMessage: ${err.message || err}`)
        } finally {
          setLoading(false)
        }
      }
      fetchUserTrips()
    }
  }, [user, authLoading, navigate])

  const handleDeleteTrip = async (id, e) => {
    e.stopPropagation() // Prevent card click navigation
    e.preventDefault()

    if (!window.confirm('Are you sure you want to delete this trip itinerary?')) {
      return
    }

    setDeletingId(id)
    try {
      await deleteDoc(doc(db, 'trips', id))
      setTrips((prev) => prev.filter((trip) => trip.id !== id))
    } catch (err) {
      console.error('Error deleting trip:', err)
    } finally {
      setDeletingId(null)
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  }

  if (authLoading || (loading && trips.length === 0)) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center text-center text-white space-y-6">
        <div className="h-12 w-12 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
        <h2 className="text-2xl font-semibold text-white/90">Loading your saved journeys...</h2>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pt-24 sm:pt-28 pb-16 text-white flex flex-col gap-6">
      {/* Back to Home Button */}
      <div className="flex justify-start w-full">
        <Link 
          to="/" 
          className="inline-flex h-9 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:border-indigo-500/40 hover:bg-indigo-500/10 cursor-pointer"
        >
          <ArrowRight className="size-4 text-indigo-400 rotate-180" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Header Section */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-5 border-b border-white/10 pb-6">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-4.5 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
            <Compass className="size-4 animate-spin-slow" />
            Travel Dashboard
          </div>
          <h1 className="font-heading text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-white/90 to-amber-400 bg-clip-text text-transparent sm:text-5xl">
            My Saved Adventures
          </h1>
          <p className="mt-2 text-sm text-white/50">
            Explore, manage, and share your custom AI-generated itineraries.
          </p>
        </div>

        <Link
          to="/create-trip"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_6px_25px_rgba(245,158,11,0.25)] transition-all duration-300 hover:scale-102 hover:from-amber-400 hover:to-orange-400 hover:shadow-[0_8px_30px_rgba(245,158,11,0.35)] active:translate-y-0.5 self-start md:self-auto"
        >
          Plan Another Trip
          <ArrowRight className="size-4" />
        </Link>
      </div>

      {/* Empty State */}
      {trips.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[32px] border border-white/8 bg-[#0c121e]/85 p-12 text-center shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-md"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.06)_0%,transparent_60%)] pointer-events-none" />
          <div className="relative z-10 flex flex-col items-center max-w-lg mx-auto">
            <div className="mb-6 flex size-20 items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-amber-400 shadow-[0_14px_30px_rgba(0,0,0,0.15)]">
              <Compass className="size-10 text-indigo-400 animate-spin-slow" />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">No travel plans yet</h3>
            <p className="mt-3 text-white/50 text-xs leading-relaxed sm:text-sm">
              You haven&apos;t saved any AI travel itineraries yet. Design a custom plan fitted around your budget, companions, and interests!
            </p>
            <Link
              to="/create-trip"
              className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500 to-orange-500 px-6 text-xs font-bold uppercase tracking-wider text-white shadow-[0_6px_25px_rgba(245,158,11,0.25)] transition-all duration-300 hover:from-amber-400 hover:to-orange-400 hover:shadow-[0_8px_30px_rgba(245,158,11,0.35)]"
            >
              Plan Your First Trip
            </Link>
          </div>
        </motion.div>
      ) : (
        /* Trips Grid */
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {trips.map((trip) => {
            const summary = trip.tripPlan?.tripSummary
            const coverUrl = trip.tripImages?.destinationCover?.imageUrl
            const fallbackBg = 'linear-gradient(135deg, #121825 0%, #080b11 100%)'
            const duration = summary?.duration || 'Multi-day'
            const travellers = summary?.travellers || 'Personalized'
            const budget = summary?.budget || 'Flexible'
            const destination = summary?.destination || trip.tripData?.destination || 'Custom Journey'

            return (
              <motion.div
                key={trip.id}
                variants={cardVariants}
                className="group relative overflow-hidden rounded-[26px] border border-white/8 bg-[#0c121e]/85 shadow-[0_16px_45px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/25 hover:shadow-[0_20px_50px_rgba(99,102,241,0.08)] flex flex-col h-[400px] backdrop-blur-md"
              >
                {/* Trip Cover Image & Overlay */}
                <Link to={`/trip-result?id=${trip.id}`} className="relative h-48 w-full overflow-hidden block">
                  {coverUrl ? (
                    <img
                      src={coverUrl}
                      alt={destination}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
                    />
                  ) : (
                    <div
                      style={{ background: fallbackBg }}
                      className="h-full w-full transition-transform duration-500 group-hover:scale-108"
                    />
                  )}
                  {/* Subtle glass overlay inside image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c121e] via-[#0c121e]/30 to-transparent" />
                  
                  {/* Floating Action: Delete Trip */}
                  <button
                    onClick={(e) => handleDeleteTrip(trip.id, e)}
                    disabled={deletingId === trip.id}
                    className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-xl border border-red-500/25 bg-black/40 text-red-400 backdrop-blur-md transition-all duration-300 hover:bg-red-500 hover:text-white cursor-pointer z-10"
                    title="Delete itinerary"
                  >
                    {deletingId === trip.id ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Trash2 className="size-4.5" />
                    )}
                  </button>

                  <div className="absolute bottom-3 left-4 right-4 flex items-center gap-1.5 text-xs text-amber-400 font-bold">
                    <MapPin className="size-3.5 shrink-0" />
                    <span className="truncate uppercase tracking-wider">{destination}</span>
                  </div>
                </Link>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors duration-300 line-clamp-1">
                      {destination}
                    </h3>
                    <p className="mt-2 text-xs text-white/50 line-clamp-2 leading-relaxed">
                      {trip.tripPlan?.overview || 'A personalized travel roadmap detailing key attractions, local food recommendations, and stays.'}
                    </p>
                  </div>

                  {/* Trip details grid */}
                  <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/6 pt-4 text-center">
                    <div className="flex flex-col items-center">
                      <Calendar className="size-4 text-amber-400 mb-1" />
                      <span className="text-[0.68rem] text-white/40 uppercase tracking-wider block">Days</span>
                      <span className="text-xs font-semibold text-white/90 truncate max-w-full block mt-0.5">{duration.split(' ')[0]} Days</span>
                    </div>
                    <div className="flex flex-col items-center border-x border-white/6">
                      <Users className="size-4 text-amber-400 mb-1" />
                      <span className="text-[0.68rem] text-white/40 uppercase tracking-wider block">People</span>
                      <span className="text-xs font-semibold text-white/90 truncate max-w-full block mt-0.5">{travellers.split(' ')[0]}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Briefcase className="size-4 text-amber-400 mb-1" />
                      <span className="text-[0.68rem] text-white/40 uppercase tracking-wider block">Budget</span>
                      <span className="text-xs font-semibold text-white/90 truncate max-w-full block mt-0.5">{budget}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <Link
                    to={`/trip-result?id=${trip.id}`}
                    className="mt-4 flex w-full h-10 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] text-sm font-medium text-white transition-all duration-300 hover:border-indigo-500/40 hover:bg-indigo-500/10 cursor-pointer"
                  >
                    <span>View Itinerary</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      )}
    </div>
  )
}

export default MyTrips
