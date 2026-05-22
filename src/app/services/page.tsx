'use client'

import Link from 'next/link'
import { ArrowRight, Mountain, Scissors, Sprout, Droplets, Leaf, Sun } from 'lucide-react'
import { Reveal } from '@/components/Reveal'

const services = [
  {
    icon: Mountain,
    title: 'Création de jardins',
    body: 'Conception et réalisation complète de votre jardin, du terrassement à la plantation. Études de sol, choix des espèces, mise en œuvre soignée.',
  },
  {
    icon: Sun,
    title: 'Entretien régulier',
    body: 'Tonte, désherbage, débroussaillage et soins saisonniers pour maintenir votre espace vert en parfait état tout au long de l\'année.',
  },
  {
    icon: Scissors,
    title: 'Taille et élagage',
    body: 'Taille soignée des haies, arbustes et arbres en respectant les cycles végétaux. Silhouette harmonieuse et croissance saine.',
  },
  {
    icon: Sprout,
    title: 'Amendement des sols',
    body: 'Amélioration de la structure et de la fertilité des sols. Apports organiques, compostage, préparation des terres avant plantation.',
  },
  {
    icon: Droplets,
    title: 'Systèmes d\'arrosage',
    body: 'Installation de systèmes d\'arrosage automatique adaptés : goutte-à-goutte, asperseurs, programmation selon les besoins des végétaux.',
  },
  {
    icon: Leaf,
    title: 'Pratiques respectueuses',
    body: 'Engagement pour l\'environnement : zéro pesticide, favorisation de la biodiversité, choix d\'espèces locales et adaptées au climat.',
  },
]

export default function Services() {
  return (
    <>
      {/* Page header */}
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

      {/* Cards grid */}
      <section className="py-24" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <div
            className="grid md:grid-cols-2 lg:grid-cols-3"
            style={{ border: '1px solid var(--beige-sand)', borderBottom: 'none', borderRight: 'none' }}
          >
            {services.map((s, i) => {
              const Icon = s.icon
              return (
                <Reveal key={s.title} delay={i * 0.07}>
                  <div
                    className="p-10 flex flex-col gap-5"
                    style={{ borderRight: '1px solid var(--beige-sand)', borderBottom: '1px solid var(--beige-sand)' }}
                  >
                    <div
                      className="w-9 h-9 flex items-center justify-center"
                      style={{ border: '1px solid rgba(111,127,82,0.4)' }}
                    >
                      <Icon size={14} style={{ color: 'var(--green-olive)' }} />
                    </div>
                    <h2
                      className="text-2xl font-light italic"
                      style={{ color: 'var(--green-deep)', fontFamily: 'var(--font-cormorant)' }}
                    >
                      {s.title}
                    </h2>
                    <p className="text-xs leading-6 font-light" style={{ color: 'rgba(31,61,43,0.65)' }}>
                      {s.body}
                    </p>
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
