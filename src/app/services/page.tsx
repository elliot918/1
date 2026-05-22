'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { ArrowRight, Mountain, Scissors, Sprout, Droplets, Leaf, Sun } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const services = [
  {
    icon: Mountain,
    title: 'Création de jardins',
    body: "Conception et réalisation complète de votre jardin, du terrassement à la plantation. Études de sol, choix des espèces, mise en œuvre soignée.",
    photo: '1512917774080-9991f1c4c750',
  },
  {
    icon: Sun,
    title: 'Entretien régulier',
    body: "Tonte, désherbage, débroussaillage et soins saisonniers pour maintenir votre espace vert en parfait état tout au long de l'année.",
    photo: '1501854140801-50d01698950b',
  },
  {
    icon: Scissors,
    title: 'Taille et élagage',
    body: "Taille soignée des haies, arbustes et arbres en respectant les cycles végétaux. Silhouette harmonieuse et croissance saine.",
    photo: '1533038590840-1cde6e668a91',
  },
  {
    icon: Sprout,
    title: 'Amendement des sols',
    body: "Amélioration de la structure et de la fertilité des sols. Apports organiques, compostage, préparation des terres avant plantation.",
    photo: '1416879595882-3373a0480b5b',
  },
  {
    icon: Droplets,
    title: "Systèmes d'arrosage",
    body: "Installation de systèmes d'arrosage automatique adaptés : goutte-à-goutte, asperseurs, programmation selon les besoins des végétaux.",
    photo: '1530836369250-ef72a3f5cda8',
  },
  {
    icon: Leaf,
    title: 'Pratiques respectueuses',
    body: "Engagement pour l'environnement : zéro pesticide, favorisation de la biodiversité, choix d'espèces locales et adaptées au climat.",
    photo: '1441974231531-c6227db76b6e',
  },
]

export default function Services() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const grid = gridRef.current
    if (!grid) return

    const cards = Array.from(grid.querySelectorAll<HTMLElement>('.svc-card'))
    const cleanups: (() => void)[] = []

    cards.forEach(card => {
      const curtain   = card.querySelector<HTMLElement>('.svc-curtain')
      const iconEl    = card.querySelector<SVGElement>('.svc-icon')
      const iconWrap  = card.querySelector<HTMLElement>('.svc-icon-wrap')
      const titleEl   = card.querySelector<HTMLElement>('.svc-title')
      const bodyEl    = card.querySelector<HTMLElement>('.svc-body')

      const enter = () => {
        gsap.to(curtain,  { xPercent: 100, duration: 0.65, ease: 'power3.inOut' })
        gsap.to(iconEl,   { scale: 1.2, duration: 0.4, ease: 'back.out(1.7)' })
        gsap.to(iconWrap, { borderColor: 'rgba(248,245,239,0.4)', duration: 0.3 })
        gsap.to([titleEl, bodyEl], { color: 'var(--off-white)', duration: 0.35 })
      }
      const leave = () => {
        gsap.to(curtain,  { xPercent: 0, duration: 0.55, ease: 'power3.inOut' })
        gsap.to(iconEl,   { scale: 1, duration: 0.3, ease: 'power2.out' })
        gsap.to(iconWrap, { borderColor: 'rgba(111,127,82,0.4)', duration: 0.3 })
        gsap.to([titleEl, bodyEl], { color: 'var(--green-deep)', duration: 0.35 })
      }

      card.addEventListener('mouseenter', enter)
      card.addEventListener('mouseleave', leave)
      cleanups.push(() => {
        card.removeEventListener('mouseenter', enter)
        card.removeEventListener('mouseleave', leave)
      })
    })

    return () => cleanups.forEach(fn => fn())
  }, [])

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="label" style={{ color: 'var(--green-olive)' }}>Prestations</span>
            <h1 className="text-5xl md:text-6xl font-light italic mt-2" style={{ color: 'var(--off-white)' }}>
              Nos services
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="py-24" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <div
            ref={gridRef}
            className="grid md:grid-cols-2 lg:grid-cols-3"
            style={{ border: '1px solid var(--beige-sand)', borderBottom: 'none', borderRight: 'none' }}
          >
            {services.map((s, i) => {
              const Icon = s.icon
              return (
                <Reveal key={s.title} delay={i * 0.07}>
                  <div
                    className="svc-card relative overflow-hidden"
                    style={{
                      borderRight: '1px solid var(--beige-sand)',
                      borderBottom: '1px solid var(--beige-sand)',
                      minHeight: 280,
                    }}
                  >
                    {/* Photo + dark overlay */}
                    <div className="absolute inset-0">
                      <Image
                        src={`https://images.unsplash.com/photo-${s.photo}?w=700&q=85&fit=crop`}
                        alt={s.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0" style={{ background: 'rgba(31,61,43,0.75)' }} />
                    </div>

                    {/* Curtain slides right on hover */}
                    <div
                      className="svc-curtain absolute inset-0 z-10"
                      style={{ background: 'var(--off-white)' }}
                    />

                    {/* Content */}
                    <div className="relative z-20 p-10 flex flex-col gap-5">
                      <div
                        className="svc-icon-wrap w-9 h-9 flex items-center justify-center"
                        style={{ border: '1px solid rgba(111,127,82,0.4)' }}
                      >
                        <Icon
                          size={14}
                          className="svc-icon"
                          style={{ color: 'var(--green-olive)' }}
                        />
                      </div>
                      <h2
                        className="svc-title text-2xl font-light italic"
                        style={{ color: 'var(--green-deep)', fontFamily: 'var(--font-cormorant)' }}
                      >
                        {s.title}
                      </h2>
                      <p
                        className="svc-body text-xs leading-6 font-light"
                        style={{ color: 'rgba(31,61,43,0.65)' }}
                      >
                        {s.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>

          <Reveal className="mt-16 flex flex-wrap gap-4">
            <Link href="/contact" className="btn btn-solid">
              Demander un devis <ArrowRight size={12} />
            </Link>
            <Link href="/realisations" className="btn btn-outline">
              Voir les réalisations
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
