'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only on pointer-fine (mouse) devices
    if (!window.matchMedia('(pointer: fine)').matches) return

    const ring = ringRef.current
    const dot  = dotRef.current
    if (!ring || !dot) return

    gsap.set([ring, dot], { xPercent: -50, yPercent: -50, opacity: 0 })

    const onMove = (e: MouseEvent) => {
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.45, ease: 'power3.out', opacity: 1 })
      gsap.to(dot,  { x: e.clientX, y: e.clientY, duration: 0.08, opacity: 1 })
    }

    const onEnter = () => gsap.to(ring, { scale: 2, duration: 0.35, ease: 'power2.out' })
    const onLeave = () => gsap.to(ring, { scale: 1, duration: 0.3,  ease: 'power2.out' })

    const bindHovers = () => {
      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    bindHovers()

    window.addEventListener('mousemove', onMove)

    return () => {
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <>
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 28, height: 28,
          border: '1px solid var(--green-deep)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
        }}
      />
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 5, height: 5,
          background: 'var(--green-deep)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
        }}
      />
    </>
  )
}
