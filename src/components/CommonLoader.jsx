import React from 'react'

const CommonLoader = ({
  label = 'Loading',
  sublabel = 'Please wait while we prepare the next experience.',
  size = 'md',
  fullScreen = true,
}) => {
  const spinnerSizeClass =
    size === 'sm'
      ? 'size-12 border-4'
      : size === 'lg'
        ? 'size-20 border-[6px]'
        : 'size-16 border-[5px]'

  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? 'min-h-screen w-full bg-[#080b11]' : 'w-full py-8'
      }`}
    >
      <div className="flex flex-col items-center text-center text-white">
        <div className="relative flex size-24 items-center justify-center">
          <div
            className={`${spinnerSizeClass} animate-spin rounded-full border-indigo-500/20 border-t-indigo-500`}
          />
        </div>

        <div className="mt-5">
          <h3 className="text-xl font-semibold tracking-[0.01em] text-white">{label}</h3>
          <p className="mt-2 text-sm leading-6 text-white/50">{sublabel}</p>
        </div>
      </div>
    </div>
  )
}

export default CommonLoader
