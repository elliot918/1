'use client'

import { Suspense, lazy, Component, type ReactNode } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

/* Error boundary so a failed fetch doesn't crash the whole page */
class SplineErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}

/* Premium drone SVG — shown while Spline loads or if it fails */
const SceneFallback = ({ className }: { className?: string }) => (
  <div
    className={`${className ?? ''} flex items-center justify-center bg-transparent`}
  >
    <svg
      viewBox="0 0 320 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: 'min(380px, 90%)', height: 'auto' }}
    >
      {/* Shadow */}
      <ellipse cx="160" cy="258" rx="56" ry="7" fill="#1A1917" fillOpacity="0.06" />

      {/* Arms */}
      <line x1="160" y1="130" x2="60"  y2="72"  stroke="#1A1917" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="160" y1="130" x2="260" y2="72"  stroke="#1A1917" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="160" y1="150" x2="60"  y2="208" stroke="#1A1917" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="160" y1="150" x2="260" y2="208" stroke="#1A1917" strokeWidth="2.5" strokeLinecap="round" />

      {/* Motor housings */}
      {([[60,72],[260,72],[60,208],[260,208]] as [number,number][]).map(([cx,cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="20" fill="#F8F5F0" stroke="#1A1917" strokeWidth="1.2" />
          <circle cx={cx} cy={cy} r="4.5" fill="#9E8060" />
          {/* Static propeller lines */}
          <line x1={cx-22} y1={cy} x2={cx+22} y2={cy} stroke="#1A1917" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.2" />
          <line x1={cx} y1={cy-22} x2={cx} y2={cy+22} stroke="#1A1917" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.2" />
        </g>
      ))}

      {/* Body */}
      <rect x="136" y="116" width="48" height="48" rx="6" fill="#1A1917" />
      <rect x="142" y="122" width="36" height="36" rx="4" fill="#F8F5F0" fillOpacity="0.05" />

      {/* Camera gimbal */}
      <circle cx="160" cy="168" r="9"   fill="#2A2926" />
      <circle cx="160" cy="168" r="4.5" fill="#1A1917" />
      <circle cx="160" cy="168" r="2"   fill="#9E8060" />

      {/* LED */}
      <circle cx="160" cy="130" r="2.5" fill="#9E8060" fillOpacity="0.9" />
    </svg>
  </div>
)

export function SplineScene({ scene, className }: SplineSceneProps) {
  const fallback = <SceneFallback className={className} />
  return (
    <SplineErrorBoundary fallback={fallback}>
      <Suspense fallback={fallback}>
        <Spline scene={scene} className={className} />
      </Suspense>
    </SplineErrorBoundary>
  )
}
