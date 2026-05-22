'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type Category = 'all' | 'creation' | 'entretien' | 'taille'

const photos = [
  {
    src: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=900&q=85&fit=crop',
    alt: 'Paysage naturel',
    category: 'creation' as Category,
    span: 'md:col-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=85&fit=crop',
    alt: 'Propriété avec jardin',
    category: 'creation' as Category,
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=900&q=85&fit=crop',
    alt: 'Travail de plantation',
    category: 'entretien' as Category,
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=85&fit=crop',
    alt: 'Outil de jardinage',
    category: 'entretien' as Category,
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=85&fit=crop',
    alt: 'Espace vert naturel',
    category: 'taille' as Category,
    span: 'md:col-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=900&q=85&fit=crop',
    alt: 'Végétation soignée',
    category: 'taille' as Category,
    span: '',
  },
]

const filters: { key: Category; label: string }[] = [
  { key: 'all',       label: 'Tout' },
  { key: 'creation',  label: 'Création' },
  { key: 'entretien', label: 'Entretien' },
  { key: 'taille',    label: 'Taille' },
]

export default function Realisations() {
  const [active, setActive] = useState<Category>('all')
  const gridRef = useRef<HTMLDivElement>(null)

  const visible = active === 'all' ? photos : photos.filter(p => p.category === active)

  // Animate grid items in whenever filter changes
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const grid = gridRef.current
    if (!grid) return

    gsap.fromTo(
      grid.querySelectorAll('.photo-item'),
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.55, stagger: 0.07, ease: 'power3.out' }
    )
  }, [active])

  // GSAP hover zoom
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const items = Array.from(grid.querySelectorAll<HTMLElement>('.photo-item'))
    const cleanups: (() => void)[] = []

    items.forEach(item => {
      const img = item.querySelector<HTMLElement>('.photo-img')
      const enter = () => gsap.to(img, { scale: 1.07, duration: 0.7, ease: 'power2.out' })
      const leave = () => gsap.to(img, { scale: 1,    duration: 0.7, ease: 'power2.out' })
      item.addEventListener('mouseenter', enter)
      item.addEventListener('mouseleave', leave)
      cleanups.push(() => {
        item.removeEventListener('mouseenter', enter)
        item.removeEventListener('mouseleave', leave)
      })
    })

    return () => cleanups.forEach(fn => fn())
  }, [active]) // re-bind after filter changes

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="label" style={{ color: 'var(--green-olive)' }}>Portfolio</span>
            <h1 className="text-5xl md:text-6xl font-light italic mt-2" style={{ color: 'var(--off-white)' }}>
              Réalisations
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="py-24" style={{ background: 'var(--off-white)' }}>
        <div className="container">

          {/* Filter bar */}
          <Reveal className="mb-10 flex flex-wrap gap-3">
            {filters.map(f => (
              <button
                key={f.key}
                onClick={() => setActive(f.key)}
                className="text-[0.62rem] tracking-[0.2em] uppercase font-medium px-5 py-2.5 transition-all"
                style={{
                  background: active === f.key ? 'var(--green-deep)' : 'transparent',
                  color:      active === f.key ? 'var(--off-white)'  : 'var(--green-deep)',
                  border:     '1px solid var(--green-deep)',
                  fontFamily: 'var(--font-manrope)',
                  borderRadius: 0,
                  transition: 'background 0.35s var(--ease-premium), color 0.35s var(--ease-premium)',
                }}
              >
                {f.label}
              </button>
            ))}
          </Reveal>

          {/* Photo grid */}
          <div
            ref={gridRef}
            className={`grid gap-4 ${active === 'all' ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'}`}
          >
            {visible.map((p) => (
              <div
                key={p.src}
                className={`photo-item relative overflow-hidden ${active === 'all' ? p.span : ''}`}
                style={{ aspectRatio: '4/3' }}
              >
                <div className="photo-img absolute inset-0" style={{ willChange: 'transform' }}>
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div
                  className="absolute inset-0 flex items-end p-5 opacity-0 hover:opacity-100"
                  style={{
                    background: 'linear-gradient(to top, rgba(31,61,43,0.7), transparent)',
                    transition: 'opacity 0.4s var(--ease-premium)',
                  }}
                >
                  <span className="text-xs font-light tracking-wide" style={{ color: 'var(--off-white)' }}>
                    {p.alt}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Reveal className="mt-16 flex flex-wrap gap-4">
            <Link href="/contact" className="btn btn-solid">
              Demander un devis <ArrowRight size={12} />
            </Link>
            <Link href="/services" className="btn btn-outline">
              Nos services
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
