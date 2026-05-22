'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Phone, Mail, ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/Reveal'

export default function APropos() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="label" style={{ color: 'var(--green-olive)' }}>L'entreprise</span>
            <h1 className="text-5xl md:text-6xl font-light italic mt-2" style={{ color: 'var(--off-white)' }}>
              À propos
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="py-24" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            {/* Image */}
            <Reveal delay={0.1}>
              <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
                <Image
                  src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=85&fit=crop"
                  alt="S.D.S Espaces Verts"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </Reveal>

            {/* Content — uniquement les infos du brief */}
            <Reveal>
              <span className="label">Dirigeant</span>

              <h2
                className="text-4xl md:text-5xl font-light italic mb-2"
                style={{ color: 'var(--green-deep)' }}
              >
                Betti Sébastien
              </h2>
              <p
                className="text-sm font-light tracking-[0.1em] uppercase mb-10"
                style={{ color: 'var(--green-olive)' }}
              >
                Paysagiste
              </p>

              <div className="divider mb-10" />

              <div
                className="inline-block px-8 py-6 mb-10"
                style={{ background: 'var(--beige-sand)' }}
              >
                <p className="text-xs tracking-[0.15em] uppercase mb-4" style={{ color: 'var(--green-olive)' }}>
                  Activité
                </p>
                <p className="text-base font-light" style={{ color: 'var(--green-deep)' }}>
                  Création et entretien de parcs et jardins
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <a
                  href="tel:0609714976"
                  className="flex items-center gap-3 text-sm font-light hover:opacity-60"
                  style={{ color: 'var(--green-deep)', transition: 'opacity 0.3s' }}
                >
                  <Phone size={14} style={{ color: 'var(--green-olive)' }} />
                  06.09.71.49.76
                </a>
                <a
                  href="mailto:sbetti83@aol.com"
                  className="flex items-center gap-3 text-sm font-light hover:opacity-60"
                  style={{ color: 'var(--green-deep)', transition: 'opacity 0.3s' }}
                >
                  <Mail size={14} style={{ color: 'var(--green-olive)' }} />
                  sbetti83@aol.com
                </a>
              </div>

              <div className="flex flex-wrap gap-4 mt-10">
                <Link href="/contact" className="btn btn-solid">
                  Prendre contact <ArrowRight size={12} />
                </Link>
                <Link href="/services" className="btn btn-outline">
                  Nos services
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
