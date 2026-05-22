'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/Reveal'

const photos = [
  {
    src: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=900&q=85&fit=crop',
    alt: 'Paysage naturel',
    span: 'md:col-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=85&fit=crop',
    alt: 'Propriété avec jardin',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=900&q=85&fit=crop',
    alt: 'Travail de plantation',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=85&fit=crop',
    alt: 'Outil de jardinage',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=85&fit=crop',
    alt: 'Espace vert naturel',
    span: 'md:col-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=900&q=85&fit=crop',
    alt: 'Végétation soignée',
    span: '',
  },
]

export default function Realisations() {
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
          <div className="grid md:grid-cols-3 gap-4">
            {photos.map((p, i) => (
              <Reveal key={p.src} delay={i * 0.07} className={p.span}>
                <div className="relative overflow-hidden group" style={{ aspectRatio: '4/3' }}>
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    className="object-cover"
                    style={{ transition: 'transform 0.7s var(--ease-premium)' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div
                    className="absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100"
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
              </Reveal>
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
