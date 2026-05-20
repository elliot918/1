'use client'

import { type ReactNode } from 'react'

interface AuroraBackgroundProps {
  children?: ReactNode
  className?: string
}

export function AuroraBackground({ children, className }: AuroraBackgroundProps) {
  return (
    <div className={`relative bg-[#F8F5F0] overflow-hidden ${className ?? ''}`}>
      {/* Aurora blobs */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div
          className="aurora-blob"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 20% 30%, rgba(209,193,168,0.45) 0%, transparent 70%)',
            animation: 'aurora-drift-1 18s ease-in-out infinite alternate',
          }}
        />
        <div
          className="aurora-blob"
          style={{
            background:
              'radial-gradient(ellipse 60% 45% at 75% 60%, rgba(228,215,195,0.40) 0%, transparent 70%)',
            animation: 'aurora-drift-2 22s ease-in-out infinite alternate',
          }}
        />
        <div
          className="aurora-blob"
          style={{
            background:
              'radial-gradient(ellipse 55% 40% at 50% 85%, rgba(193,175,150,0.30) 0%, transparent 65%)',
            animation: 'aurora-drift-3 26s ease-in-out infinite alternate',
          }}
        />
        <div
          className="aurora-blob"
          style={{
            background:
              'radial-gradient(ellipse 80% 35% at 10% 70%, rgba(220,207,188,0.25) 0%, transparent 70%)',
            animation: 'aurora-drift-1 30s ease-in-out infinite alternate-reverse',
          }}
        />
      </div>

      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}
