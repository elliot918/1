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

const SceneFallback = ({ className }: { className?: string }) => (
  <div
    className={`${className ?? ''} flex items-center justify-center`}
    style={{ background: '#050505' }}
  >
    <div
      className="w-32 h-32 rounded-full border border-white/10 flex items-center justify-center"
      style={{ boxShadow: 'inset 0 0 40px rgba(201,168,76,0.06)' }}
    >
      <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16 opacity-20">
        <circle cx="32" cy="32" r="4" fill="#C9A84C" />
        <circle cx="12" cy="20" r="3" fill="#C9A84C" />
        <circle cx="52" cy="20" r="3" fill="#C9A84C" />
        <circle cx="12" cy="44" r="3" fill="#C9A84C" />
        <circle cx="52" cy="44" r="3" fill="#C9A84C" />
        <line x1="32" y1="32" x2="12" y2="20" stroke="#C9A84C" strokeWidth="1" />
        <line x1="32" y1="32" x2="52" y2="20" stroke="#C9A84C" strokeWidth="1" />
        <line x1="32" y1="32" x2="12" y2="44" stroke="#C9A84C" strokeWidth="1" />
        <line x1="32" y1="32" x2="52" y2="44" stroke="#C9A84C" strokeWidth="1" />
      </svg>
    </div>
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
