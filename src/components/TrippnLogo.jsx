import React from 'react'

const TrippnLogo = ({ className = "h-10 w-10" }) => {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
        <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
        <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Outer spinning globe outline */}
      <circle cx="50" cy="50" r="42" stroke="url(#logoGrad)" strokeWidth="1.5" strokeDasharray="6 5" opacity="0.5" />
      <circle cx="50" cy="50" r="34" stroke="url(#logoGrad)" strokeWidth="1" strokeDasharray="30 2" opacity="0.2" />
      
      {/* Global lines */}
      <path d="M50 8 A42 42 0 0 0 50 92 Z" stroke="url(#logoGrad)" strokeWidth="1" opacity="0.35" />
      <path d="M50 8 A26 42 0 0 0 50 92 Z" stroke="url(#logoGrad)" strokeWidth="1.2" opacity="0.45" />
      <path d="M8 50 A42 42 0 0 0 92 50 Z" stroke="url(#logoGrad)" strokeWidth="1" opacity="0.3" />
      
      {/* Premium Pin / Map marker */}
      <path d="M50 18 C37 18 31 28 31 41 C31 58 50 78 50 78 C50 78 69 58 69 41 C69 28 63 18 50 18 Z" fill="url(#logoGrad)" filter="url(#logoGlow)" />
      
      {/* Airplane path loop */}
      <path d="M42 40 C38 44 38 48 42 52 C46 56 54 56 58 52 C62 48 62 44 58 40 C54 36 46 36 42 40 Z" stroke="url(#glowGrad)" strokeWidth="1" strokeDasharray="3 3" />
      
      {/* Centered paper airplane */}
      <path d="M49 33 L62 41 L43 46 L49 33 Z" fill="url(#glowGrad)" />
      <path d="M49 33 L43 46 L47 42 L49 33 Z" fill="#ea580c" />
    </svg>
  )
}

export default TrippnLogo
