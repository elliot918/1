'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { Phone, Mail, ChevronDown, ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/* ─── Hero ─── */
function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef     = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Ken Burns entry
    gsap.fromTo(imgRef.current, { scale: 1.1 }, { scale: 1, duration: 8, ease: 'power1.out' })

    // Parallax on scroll
    gsap.to(imgRef.current, {
      yPercent: 28,
      ease: 'none',
      scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
    })

    // Content fades out while scrolling
    gsap.to(contentRef.current, {
      opacity: 0,
      yPercent: -8,
      ease: 'none',
      scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: '55% top', scrub: true },
    })

    // Animate in headline
    gsap.fromTo(
      '.hero-line',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.15, delay: 0.4, ease: 'power3.out' }
    )
    gsap.fromTo(
      '.hero-btns',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.8, delay: 1.1, ease: 'power3.out' }
    )
  }, [])

  return (
    <section ref={sectionRef} className="relative h-screen min-h-[600px] overflow-hidden flex items-center justify-center">
      <div ref={imgRef} className="absolute inset-0" style={{ willChange: 'transform' }}>
        <Image
          src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1920&q=85&fit=crop"
          alt="Jardin paysager de luxe"
          fill priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(31,61,43,0.5) 0%, rgba(31,61,43,0.25) 50%, rgba(31,61,43,0.6) 100%)' }}
      />

      <div ref={contentRef} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="hero-line label" style={{ color: 'var(--beige-sand)' }}>
          S.D.S Espaces Verts
        </p>
        <h1
          className="hero-line text-5xl md:text-7xl lg:text-8xl font-light italic mt-2"
          style={{ color: 'var(--off-white)', opacity: 0 }}
        >
          Création et entretien<br />de jardins durables
        </h1>
        <div
          className="hero-line w-12 h-px mx-auto my-8"
          style={{ background: 'var(--beige-sand)', opacity: 0 }}
        />
        <div className="hero-btns flex flex-col sm:flex-row gap-4 justify-center" style={{ opacity: 0 }}>
          <Link href="/contact" className="btn btn-solid">Demander un devis</Link>
          <Link href="/services" className="btn btn-ghost">Découvrir les services</Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: 'var(--beige-sand)' }}>
        <span className="text-[0.6rem] tracking-[0.25em] uppercase">Défiler</span>
        <ChevronDown size={14} className="animate-bounce" />
      </div>
    </section>
  )
}

/* ─── Introduction ─── */
function Introduction() {
  return (
    <section className="py-32" style={{ background: 'var(--off-white)' }}>
      <div className="container">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <span className="label">Création · Entretien · Espaces verts</span>
            <h2 className="text-4xl md:text-5xl font-light italic mb-8" style={{ color: 'var(--green-deep)' }}>
              Parcs et jardins<br />réalisés avec soin
            </h2>
            <div className="divider mb-8" />
            <p className="text-sm leading-7 font-light" style={{ color: 'var(--green-deep)', opacity: 0.72 }}>
              S.D.S Espaces Verts assure la création et l'entretien de parcs et jardins — de la plantation
              à la taille, de l'arrosage à l'amendement des sols. Chaque prestation est réalisée avec soin
              et professionnalisme.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link href="/services" className="btn btn-outline">
                Nos services <ArrowRight size={12} />
              </Link>
              <Link href="/contact" className="btn btn-solid">
                Contact
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
              <Image
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=85&fit=crop"
                alt="Outil de jardinage"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ─── Services teaser ─── */
const serviceTeaser = [
  { title: 'Création de jardins',     desc: 'Conception et réalisation complète, du terrassement à la plantation.' },
  { title: 'Entretien régulier',      desc: 'Tonte, désherbage, débroussaillage tout au long de l\'année.' },
  { title: 'Taille et élagage',       desc: 'Taille soignée des haies, arbustes et arbres selon les cycles végétaux.' },
  { title: 'Systèmes d\'arrosage',    desc: 'Installation de systèmes automatiques économes en eau.' },
  { title: 'Amendement des sols',     desc: 'Amélioration de la qualité des sols pour favoriser la croissance.' },
  { title: 'Pratiques respectueuses', desc: 'Zéro pesticide, biodiversité, espèces locales adaptées.' },
]

function ServicesTeaser() {
  return (
    <section className="py-32" style={{ background: 'var(--green-deep)' }}>
      <div className="container">
        <Reveal className="mb-16">
          <span className="label" style={{ color: 'var(--green-olive)' }}>Nos prestations</span>
          <h2 className="text-4xl md:text-5xl font-light italic" style={{ color: 'var(--off-white)' }}>
            Six services,<br />un seul interlocuteur
          </h2>
        </Reveal>

        <div
          className="grid md:grid-cols-2 lg:grid-cols-3"
          style={{ borderTop: '1px solid rgba(248,245,239,0.08)', borderLeft: '1px solid rgba(248,245,239,0.08)' }}
        >
          {serviceTeaser.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div
                className="p-8"
                style={{ borderRight: '1px solid rgba(248,245,239,0.08)', borderBottom: '1px solid rgba(248,245,239,0.08)' }}
              >
                <h3
                  className="text-xl font-light italic mb-3"
                  style={{ color: 'var(--beige-sand)', fontFamily: 'var(--font-cormorant)' }}
                >
                  {s.title}
                </h3>
                <p className="text-xs leading-6 font-light" style={{ color: 'rgba(248,245,239,0.5)' }}>
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Link href="/services" className="btn btn-ghost">
            Voir tous les services <ArrowRight size={12} />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Approche (parallax) ─── */
function Approche() {
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    gsap.to(imgRef.current, {
      yPercent: 18,
      ease: 'none',
      scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
    })
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ minHeight: '60vh' }}>
      <div ref={imgRef} className="absolute inset-0 scale-110" style={{ willChange: 'transform' }}>
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=85&fit=crop"
          alt="Jardin paysager"
          fill className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0" style={{ background: 'rgba(31,61,43,0.75)' }} />

      <div className="relative z-10 flex items-center min-h-[60vh] py-28">
        <div className="container">
          <div className="max-w-xl">
            <Reveal>
              <span className="label">Notre approche</span>
              <h2 className="text-4xl md:text-5xl font-light italic mb-6" style={{ color: 'var(--off-white)' }}>
                Chaque espace,<br />une attention singulière
              </h2>
              <div style={{ height: '1px', width: '3rem', background: 'var(--green-olive)', margin: '1.5rem 0' }} />
              <p className="text-sm leading-7 font-light mb-8" style={{ color: 'rgba(248,245,239,0.75)' }}>
                Création et entretien de parcs et jardins, avec des pratiques respectueuses de l'environnement :
                espèces locales, arrosage raisonné, zéro pesticide.
              </p>
              <Link href="/a-propos" className="btn btn-ghost">
                À propos <ArrowRight size={12} />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Contact rapide ─── */
function ContactRapide() {
  return (
    <section className="py-24" style={{ background: 'var(--beige-sand)' }}>
      <div className="container">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <span className="label">Contact</span>
            <h2 className="text-4xl md:text-5xl font-light italic mb-6" style={{ color: 'var(--green-deep)' }}>
              Parlons de<br />votre projet
            </h2>
            <div className="divider mb-8" />
            <div className="flex flex-col gap-4 mt-6">
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
          </Reveal>

          <Reveal delay={0.15} className="flex flex-col items-start gap-4">
            <Link href="/contact" className="btn btn-solid">
              Demander un devis <ArrowRight size={12} />
            </Link>
            <Link href="/realisations" className="btn btn-outline">
              Voir les réalisations
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ─── Root ─── */
export default function Home() {
  return (
    <>
      <Hero />
      <Introduction />
      <ServicesTeaser />
      <Approche />
      <ContactRapide />
    </>
  )
}
