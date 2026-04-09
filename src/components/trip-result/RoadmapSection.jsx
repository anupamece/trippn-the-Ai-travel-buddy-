import React from 'react'
import {
  CalendarDays,
  Compass,
  Image as ImageIcon,
  MoonStar,
  Sun,
  Sunset,
  UtensilsCrossed,
} from 'lucide-react'

const activityIconMap = {
  morning: Sun,
  afternoon: Compass,
  evening: MoonStar,
}

const foodAccentMap = {
  breakfast: 'from-[#f6c453]/30 to-transparent',
  lunch: 'from-[#f97316]/25 to-transparent',
  dinner: 'from-[#38bdf8]/25 to-transparent',
}

const RoadmapSection = ({
  dailyPlan,
  childrenTravelling,
  formatMealBudget,
  roadmapImages = [],
  activityImages = [],
}) => {
  return (
    <section className="rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,#101826_0%,#0a101b_100%)] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.2)] sm:p-7">
      <div className="flex flex-col gap-4 border-b border-white/8 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/18 bg-cyan-400/10 px-3 py-2 text-xs uppercase tracking-[0.28em] text-cyan-100/80">
            <CalendarDays className="size-4 text-cyan-300" />
            Roadmap
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
            Day-by-day adventures
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/62 sm:text-base">
            The trip reads like a story, from first
            coffee to late-night experiences.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:min-w-[220px]">
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-white/42">Days</p>
            <p className="mt-2 text-2xl font-semibold text-white">{dailyPlan.length || '-'}</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-white/42">Style</p>
            <p className="mt-2 text-sm font-medium text-white/85">
              {childrenTravelling ? 'Family-aware' : 'Curated'}
            </p>
          </div>
        </div>
      </div>

      <div className="relative mt-8 space-y-8 before:absolute before:bottom-3 before:left-[1.05rem] before:top-3 before:w-px before:bg-[linear-gradient(180deg,rgba(56,189,248,0.75),rgba(255,255,255,0.08),rgba(249,115,22,0.65))] sm:before:left-[1.2rem]">
        {dailyPlan.map((dayPlan, index) => {
          const dayActivityImageSet =
            activityImages.find((imageSet) => imageSet.day === dayPlan.day)?.activities || []

          return (
            <article key={`${dayPlan.day}-${dayPlan.title}-${index}`} className="relative pl-10 sm:pl-14">
              <div className="absolute left-0 top-1 flex size-9 items-center justify-center rounded-full border border-cyan-300/30 bg-[#08111d] shadow-[0_0_0_6px_rgba(8,17,29,0.95)] sm:size-10">
                <span className="text-sm font-semibold text-cyan-200">{dayPlan.day}</span>
              </div>

              <div className="overflow-hidden rounded-[26px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_100%)] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.2)] backdrop-blur-sm sm:p-6">
                {roadmapImages.length > 0 ? (
                  <div className="relative mb-5 overflow-hidden rounded-[22px] border border-white/8">
                    <img
                      src={roadmapImages[index % roadmapImages.length]?.imageUrl}
                      alt={roadmapImages[index % roadmapImages.length]?.alt || dayPlan.title}
                      className="h-44 w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,20,0.1)_0%,rgba(4,10,20,0.26)_45%,rgba(4,10,20,0.8)_100%)]" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.28em] text-cyan-100/72">
                          Visual moodboard
                        </p>
                        <p className="mt-1 text-lg font-semibold text-white">{dayPlan.title}</p>
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/20 px-3 py-2 text-xs uppercase tracking-[0.22em] text-white/76 backdrop-blur-md">
                        <ImageIcon className="size-4 text-orange-300" />
                        Day scene
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mb-5 flex h-36 items-end justify-between rounded-[22px] border border-white/8 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.26)_0%,transparent_30%),linear-gradient(135deg,#18314d_0%,#0d1726_55%,#0a101b_100%)] p-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-cyan-100/72">
                        Visual moodboard
                      </p>
                      <p className="mt-1 text-lg font-semibold text-white">{dayPlan.title}</p>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/20 px-3 py-2 text-xs uppercase tracking-[0.22em] text-white/76 backdrop-blur-md">
                      <ImageIcon className="size-4 text-orange-300" />
                      Scenic cue
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-4 border-b border-white/8 pb-5 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.32em] text-cyan-200/70">
                      Day {dayPlan.day}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{dayPlan.title}</h3>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-black/10 px-4 py-3 text-sm text-white/64">
                    {(dayPlan.activities || []).length} activities
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  {(dayPlan.activities || []).map((activity, activityIndex) => {
                    const timeKey = activity.time?.toLowerCase?.() || 'afternoon'
                    const ActivityIcon = activityIconMap[timeKey] || Sunset
                    const activityImage = dayActivityImageSet[activityIndex]?.image

                    return (
                      <div
                        key={`${activity.time}-${activity.name}-${activityIndex}`}
                        className="rounded-[22px] border border-white/8 bg-[#0c1624]/90 p-4 transition-transform duration-300 hover:-translate-y-0.5"
                      >
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
                          {activityImage?.imageUrl ? (
                            <div className="relative overflow-hidden rounded-[18px] border border-white/8 lg:w-[210px] lg:min-w-[210px]">
                              <img
                                src={activityImage.imageUrl}
                                alt={activityImage.alt || activity.name}
                                className="h-40 w-full object-cover"
                              />
                              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,20,0.08)_0%,rgba(4,10,20,0.1)_45%,rgba(4,10,20,0.6)_100%)]" />
                              <div className="absolute bottom-3 right-3 rounded-full border border-white/12 bg-black/25 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-white/80">
                                Pexels visual
                              </div>
                            </div>
                          ) : null}

                          <div className="min-w-0 flex-1">
                            <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/8 bg-white/[0.04] px-3 py-2 text-xs uppercase tracking-[0.24em] text-white/70">
                              <ActivityIcon className="size-4 text-orange-300" />
                              {activity.time || 'Plan'}
                            </div>

                            <h4 className="mt-4 text-lg font-semibold text-white">
                              {activity.name}
                            </h4>
                            <p className="mt-2 text-sm leading-6 text-white/62">
                              {activity.details}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {(dayPlan.food || []).length > 0 ? (
                  <div className="mt-6">
                    <div className="mb-3 flex items-center gap-2 text-sm text-orange-200/88">
                      <UtensilsCrossed className="size-4" />
                      Food moments
                    </div>
                    <div className="grid gap-3 lg:grid-cols-3">
                      {dayPlan.food.map((meal, mealIndex) => (
                        <div
                          key={`${meal.meal}-${meal.suggestion}-${mealIndex}`}
                          className="rounded-[20px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_100%)] p-4"
                        >
                          <div
                            className={`mb-3 h-1.5 w-full rounded-full bg-gradient-to-r ${
                              foodAccentMap[meal.meal?.toLowerCase?.()] ||
                              'from-white/35 to-transparent'
                            }`}
                          />
                          <p className="text-xs uppercase tracking-[0.24em] text-white/44">
                            {meal.meal}
                          </p>
                          <p className="mt-2 text-sm font-medium leading-6 text-white/84">
                            {meal.suggestion}
                          </p>
                          <p className="mt-3 text-xs text-white/50">{formatMealBudget(meal)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default RoadmapSection
