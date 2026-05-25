'use client'

import { useEffect, useRef } from 'react'

export function ScrollProgress() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const barRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const bar  = barRef.current
    if (!wrap || !bar) return

    /* ── Colle le wrapper sous le bas du nav ─────────────────── */
    const positionUnderNav = () => {
      const nav = document.querySelector<HTMLElement>('nav')
      wrap.style.top = nav ? `${nav.getBoundingClientRect().bottom}px` : '0px'
    }

    /* ── Calcul exact 0 → 1 ──────────────────────────────────── */
    const update = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress  = maxScroll > 0 ? window.scrollY / maxScroll : 0
      // clamp strict entre 0 et 1 sans Math.min pour éviter toute troncature
      bar.style.transform = `scaleX(${progress < 0 ? 0 : progress > 1 ? 1 : progress})`
    }

    const onResize = () => { positionUnderNav(); update() }

    positionUnderNav()
    update()

    window.addEventListener('scroll', update,   { passive: true })
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'fixed',
        left: 0,
        width: '100%',
        height: '3px',
        zIndex: 9998,          /* sous le nav (z-50 = 50) mais au-dessus du reste */
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
