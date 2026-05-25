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
  const wrapperRef = useRef<HTMLDivElement>(null)
  const videoRef   = useRef<HTMLVideoElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const video   = videoRef.current
    const wrapper = wrapperRef.current
    if (!video || !wrapper) return

    // ── Entrance animations ──────────────────────────────────────
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

    // ── Text fade (GSAP ScrollTrigger — OK for CSS animations) ───
    const textTween = gsap.to(contentRef.current, {
      opacity: 0, yPercent: -6, ease: 'none',
      scrollTrigger: {
        trigger: wrapper,
        start: 'top top',
        end: '20% top',   // fade complete after 40 vh of scroll
        scrub: true,
      },
    })

    // ── Video scrub ──────────────────────────────────────────────
    // Uses getBoundingClientRect() directly — immune to Lenis async lag.
    // Lenis calls window.scrollTo({ behavior:'instant' }) which fires a
    // native 'scroll' event synchronously; rect.top is always current.
    const scrubVideo = () => {
      const rect       = wrapper.getBoundingClientRect()
      const vh         = window.innerHeight
      const scrolled   = Math.max(0, -rect.top)          // px past viewport top
      const scrollable = rect.height - vh                 // total range = 100 vh
      const progress   = Math.min(1, scrolled / scrollable)

      if (isFinite(video.duration) && video.duration > 0) {
        video.currentTime = progress * video.duration
      }
    }

    // Run once in case page is already scrolled (e.g. back navigation)
    scrubVideo()
    window.addEventListener('scroll', scrubVideo, { passive: true })

    return () => {
      window.removeEventListener('scroll', scrubVideo)
      textTween.scrollTrigger?.kill()
      textTween.kill()
    }
  }, [])

  return (
    <div ref={wrapperRef} style={{ height: '200vh' }}>
      <section className="sticky top-0 h-screen overflow-hidden flex items-center justify-center" style={{ minHeight: 600 }}>
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
          <source src="/videos/hero.mov" type="video/quicktime" />
        </video>

        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(31,61,43,0.48) 0%, rgba(31,61,43,0.22) 50%, rgba(31,61,43,0.58) 100%)' }}
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
          <div className="hero-btns flex flex-col sm:flex-row gap-6 justify-center items-center" style={{ opacity: 0 }}>
            <Link href="/contact" className="btn btn-ghost">
              Demander un devis
            </Link>
            <Link
              href="/services"
              className="flex items-center gap-3 text-[0.7rem] tracking-[0.18em] uppercase font-medium"
              style={{
                color: 'var(--off-white)',
                fontFamily: 'var(--font-manrope)',
                transition: 'opacity 0.35s var(--ease-premium)',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Découvrir les services <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: 'var(--beige-sand)' }}>
          <span className="text-[0.6rem] tracking-[0.25em] uppercase">Défiler</span>
          <ChevronDown size={14} className="animate-bounce" />
        </div>
      </section>
    </div>
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
  {
    title: 'Création de jardins',
    desc: 'Conception et réalisation complète, du terrassement à la plantation.',
    photo: '1512917774080-9991f1c4c750',
  },
  {
    title: 'Entretien régulier',
    desc: "Tonte, désherbage, débroussaillage tout au long de l'année.",
    photo: '1501854140801-50d01698950b',
  },
  {
    title: 'Taille et élagage',
    desc: 'Taille soignée des haies, arbustes et arbres selon les cycles végétaux.',
    photo: '1533038590840-1cde6e668a91',
  },
  {
    title: "Systèmes d'arrosage",
    desc: "Installation de systèmes automatiques économes en eau.",
    photo: '1530836369250-ef72a3f5cda8',
  },
  {
    title: 'Amendement des sols',
    desc: 'Amélioration de la qualité des sols pour favoriser la croissance.',
    photo: '1416879595882-3373a0480b5b',
  },
  {
    title: 'Pratiques respectueuses',
    desc: 'Zéro pesticide, biodiversité, espèces locales adaptées.',
    photo: '1441974231531-c6227db76b6e',
  },
]

function ServicesTeaser() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const grid = gridRef.current
    if (!grid) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.service-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.75, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: grid, start: 'top 85%', once: true },
        }
      )
    }, grid)

    const cards = Array.from(grid.querySelectorAll<HTMLElement>('.service-card'))
    const cleanups: (() => void)[] = []

    cards.forEach(card => {
      const img = card.querySelector<HTMLElement>('.sc-img')
      const overlay = card.querySelector<HTMLElement>('.sc-overlay')

      const enter = () => {
        gsap.to(img, { scale: 1.08, duration: 0.7, ease: 'power2.out' })
        gsap.to(overlay, { opacity: 1, duration: 0.45, ease: 'power2.out' })
      }
      const leave = () => {
        gsap.to(img, { scale: 1, duration: 0.7, ease: 'power2.out' })
        gsap.to(overlay, { opacity: 0, duration: 0.45, ease: 'power2.out' })
      }

      card.addEventListener('mouseenter', enter)
      card.addEventListener('mouseleave', leave)
      cleanups.push(() => {
        card.removeEventListener('mouseenter', enter)
        card.removeEventListener('mouseleave', leave)
      })
    })

    return () => {
      ctx.revert()
      cleanups.forEach(fn => fn())
    }
  }, [])

  return (
    <section className="py-32" style={{ background: 'var(--green-deep)' }}>
      <div className="container">
        <Reveal className="mb-16">
          <span className="label" style={{ color: 'var(--green-olive)' }}>Nos prestations</span>
          <h2 className="text-4xl md:text-5xl font-light italic" style={{ color: 'var(--off-white)' }}>
            Six services,<br />un seul interlocuteur
          </h2>
        </Reveal>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-1">
          {serviceTeaser.map((s) => (
            <div
              key={s.title}
              className="service-card relative overflow-hidden"
              style={{ minHeight: '420px' }}
            >
              <div className="sc-img absolute inset-0" style={{ willChange: 'transform' }}>
                <Image
                  src={`https://images.unsplash.com/photo-${s.photo}?w=800&q=85&fit=crop`}
                  alt={s.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Base dark overlay */}
              <div className="absolute inset-0" style={{ background: 'rgba(31,61,43,0.48)' }} />

              {/* Hover overlay */}
              <div
                className="sc-overlay absolute inset-0"
                style={{ background: 'rgba(31,61,43,0.42)', opacity: 0 }}
              />

              {/* Text content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <h3
                  className="text-2xl font-light italic mb-2"
                  style={{ color: 'var(--off-white)', fontFamily: 'var(--font-cormorant)' }}
                >
                  {s.title}
                </h3>
                <p className="text-[0.7rem] leading-6 font-light" style={{ color: 'rgba(248,245,239,0.72)' }}>
                  {s.desc}
                </p>
              </div>
            </div>
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
          src="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=1920&q=85&fit=crop"
          alt="Paysage naturel"
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
