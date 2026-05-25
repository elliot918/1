'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/services',    label: 'Services' },
  { href: '/realisations', label: 'Réalisations' },
  { href: '/a-propos',   label: 'À propos' },
  { href: '/contact',    label: 'Contact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const check = () => setScrolled(window.scrollY > 70)
    check()
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [])

  const showBg = scrolled || !isHome
  const fg = showBg ? 'var(--green-deep)' : 'var(--off-white)'
  const bg = showBg ? 'rgba(248,245,239,0.95)' : 'transparent'

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 min-h-[70px] flex items-center"
      style={{
        background: bg,
        backdropFilter: showBg ? 'blur(12px)' : 'none',
        transition: 'background 0.5s var(--ease-premium), backdrop-filter 0.5s',
      }}
    >
      <div className="container flex items-center justify-between">
        <Link
          href="/"
          className="text-lg tracking-[0.3em] uppercase font-semibold"
          style={{ color: fg, transition: 'color 0.5s var(--ease-premium)' }}
        >
          S.D.S Espaces Verts
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="nav-link text-[0.65rem] tracking-[0.22em] uppercase font-medium relative"
              style={{
                color: fg,
                transition: 'color 0.5s var(--ease-premium)',
                fontFamily: 'var(--font-manrope)',
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
