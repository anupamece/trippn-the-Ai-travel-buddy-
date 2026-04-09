import React from 'react'

const CommonLoader = ({
  label = 'Loading',
  sublabel = 'Please wait while we prepare the next experience.',
  size = 'md',
  fullScreen = true,
}) => {
  const spinnerSizeClass =
    size === 'sm'
      ? 'size-12 border-[5px]'
      : size === 'lg'
        ? 'size-20 border-[7px]'
        : 'size-16 border-[6px]'

  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? 'min-h-screen w-full bg-[#0f0f0f]' : 'w-full py-8'
      }`}
    >
      <div className="flex flex-col items-center text-center text-white">
        <div className="relative flex size-24 items-center justify-center">
          <div
            className={`${spinnerSizeClass} animate-spin rounded-full border-[#2a170d] border-t-orange-500 border-r-orange-400/90 border-b-[#140d09] border-l-orange-300/85 shadow-[0_0_30px_rgba(255,132,53,0.16)]`}
          />
          <div className="absolute size-7 rounded-full bg-[#0f0f0f]" />
        </div>

        <div className="mt-5">
          <h3 className="text-xl font-semibold tracking-[0.01em] text-white">{label}</h3>
          <p className="mt-2 text-sm leading-6 text-white/58">{sublabel}</p>
        </div>
      </div>
    </div>
  )
}

export default CommonLoader
