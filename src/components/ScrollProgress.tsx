'use client'

import { useEffect, useRef } from 'react'

export function ScrollProgress() {
  const barRef  = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar  = barRef.current
    const wrap = wrapRef.current
    if (!bar || !wrap) return

    /* ── Positionne le wrapper juste sous le bas du nav ────────── */
    const placeBar = () => {
      const nav = document.querySelector<HTMLElement>('nav')
      if (nav) {
        const navBottom = nav.getBoundingClientRect().bottom
        wrap.style.top = `${navBottom}px`
      }
    }

    /* ── Calcul exact 0 → 100 % ────────────────────────────────── */
    const update = () => {
      const max      = document.documentElement.scrollHeight - window.innerHeight
      const raw      = max > 0 ? window.scrollY / max : 0
      const progress = raw < 0 ? 0 : raw > 1 ? 1 : raw
      bar.style.transform = `scaleX(${progress})`
    }

    const tick = () => { placeBar(); update() }

    tick()
    window.addEventListener('scroll', update,   { passive: true })
    window.addEventListener('resize', tick,     { passive: true })

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', tick)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'fixed',
        top: 0,          /* sera écrasé par useEffect */
        left: 0,
        width: '100%',
        height: '3px',
        zIndex: 49,      /* sous le nav (z-50) */
        pointerEvents: 'none',
      }}
    >
      <div
        ref={barRef}
        style={{
          width: '100%',
          height: '100%',
          background: '#1F3D2B',
          transformOrigin: 'left center',
          transform: 'scaleX(0)',
          willChange: 'transform',
        }}
      />
    </div>
  )
}
