import React from 'react'

const TravelHudBackdrop = ({ className = "" }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none select-none overflow-hidden -z-10 ${className}`}>
      {/* Travel Vector HUD Grid */}
      <svg className="absolute inset-0 size-full opacity-[0.06] text-indigo-400" xmlns="http://www.w3.org/2000/svg">
        {/* Concentric Radar Circles */}
        <circle cx="50%" cy="50%" r="20%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
        <circle cx="50%" cy="50%" r="35%" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="50%" cy="50%" r="48%" stroke="currentColor" strokeWidth="1" strokeDasharray="8 8" />
        
        {/* Radar Crosshairs */}
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="50%" y1="0" x2="50%" y2="100%" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        
        {/* Curved dashed paths */}
        <path d="M 100 150 Q 350 250 500 550" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 4" fill="none" />
        <path d="M 750 200 Q 550 450 250 650" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 4" fill="none" />
        <path d="M 250 150 C 400 80 680 380 850 250" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" fill="none" opacity="0.7" />
      </svg>

      {/* Floating Radar Coordinates */}
      <div className="absolute inset-0 opacity-[0.25] text-[9px] font-mono text-indigo-300">
        <div className="absolute top-[18%] left-[10%] tracking-widest animate-pulse">CDG [48.8566° N, 2.3522° E] PARIS</div>
        <div className="absolute bottom-[22%] left-[8%] tracking-widest animate-pulse" style={{ animationDelay: '0.8s' }}>DPS [8.4095° S, 115.1889° E] BALI</div>
        <div className="absolute top-[22%] right-[12%] tracking-widest animate-pulse" style={{ animationDelay: '1.2s' }}>HND [35.6762° N, 139.6503° E] TOKYO</div>
        <div className="absolute bottom-[20%] right-[8%] tracking-widest animate-pulse" style={{ animationDelay: '0.4s' }}>JFK [40.7128° N, 74.0060° W] NYC</div>
        <div className="absolute top-[48%] left-[78%] tracking-widest animate-pulse" style={{ animationDelay: '1.6s' }}>DXB [25.2048° N, 55.2708° E] DUBAI</div>
      </div>
    </div>
  )
}

export default TravelHudBackdrop
