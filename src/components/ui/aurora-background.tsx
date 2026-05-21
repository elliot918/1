'use client'

import { type ReactNode } from 'react'

interface AuroraBackgroundProps {
  children?: ReactNode
  className?: string
}

export function AuroraBackground({ children, className }: AuroraBackgroundProps) {
  return (
    <div className={`relative bg-[#0A0A0A] overflow-hidden ${className ?? ''}`}>
      {/* Aurora blobs */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div
          className="aurora-blob"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 20% 30%, rgba(158,128,96,0.18) 0%, transparent 70%)',
            animation: 'aurora-drift-1 18s ease-in-out infinite alternate',
          }}
        />
        <div
          className="aurora-blob"
          style={{
            background:
              'radial-gradient(ellipse 60% 45% at 75% 60%, rgba(120,90,55,0.14) 0%, transparent 70%)',
            animation: 'aurora-drift-2 22s ease-in-out infinite alternate',
          }}
        />
        <div
          className="aurora-blob"
          style={{
            background:
              'radial-gradient(ellipse 55% 40% at 50% 80%, rgba(180,145,100,0.10) 0%, transparent 65%)',
            animation: 'aurora-drift-3 26s ease-in-out infinite alternate',
          }}
        />
        <div
          className="aurora-blob"
          style={{
            background:
              'radial-gradient(ellipse 80% 35% at 10% 70%, rgba(100,75,45,0.10) 0%, transparent 70%)',
            animation: 'aurora-drift-1 30s ease-in-out infinite alternate-reverse',
          }}
        />
      </div>

      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}
