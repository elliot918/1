'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { SplineScene } from '@/components/ui/splite'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { ShaderAnimation } from '@/components/ui/shader-animation'
import { Typewriter } from '@/components/ui/typewriter'
import {
  Zap, Users, Building2, UserCircle, Clock, Repeat, Leaf,
  Flame, BarChart3, Star, ChevronRight, Phone, Mail, MapPin, Menu,
} from 'lucide-react'

/* ── Social icons ── */
const IconInstagram = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
)
const IconFacebook = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)
const IconLinkedin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)
const IconYoutube = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
)

/* ── Animation helpers ── */
const EASE = [0.25, 0.46, 0.45, 0.94] as const

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
      transition={{ duration: 0.75, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* Bronze label */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[#9E8060] text-[10px] tracking-[0.35em] uppercase">
      {children}
    </span>
  )
}

/* Short bronze rule */
function Rule() {
  return <div className="my-10 w-12 h-px bg-[#9E8060]" />
}

/* ═══════════════════════════════════════════
   PAGE
═══════════════════════════════════════════ */
export default function TarifsPage() {
  return (
    <div
      className="min-h-screen bg-[#0A0A0A] text-[#E8E2D8] overflow-x-hidden"
      style={{ fontFamily: 'var(--font-inter)' }}
    >

      {/* ═══ NAV ═══ */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <span
            className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#E8E2D8]"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Drone de Ciel{' '}
            <span className="text-[#9E8060]">|</span>{' '}
            <span className="text-[#E8E2D8]/35 font-normal">Made In France</span>
          </span>

          <div className="hidden md:flex items-center gap-10">
            {['Nos prestations', "L'équipe", 'Nos réalisations'].map((l) => (
              <a
                key={l}
                href="#"
                className="text-[#E8E2D8]/35 text-[11px] tracking-[0.2em] uppercase hover:text-[#E8E2D8] transition-colors duration-200"
              >
                {l}
              </a>
            ))}
            <a
              href="#contact"
              className="border border-white/20 text-[#E8E2D8]/60 text-[11px] tracking-[0.2em] uppercase px-5 py-2.5 hover:bg-white hover:text-[#0A0A0A] transition-all duration-300"
            >
              Prenons contact
            </a>
          </div>

          <button className="md:hidden text-[#E8E2D8]/40 hover:text-[#E8E2D8]">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* ═══ HERO — Aurora + Typewriter (pleine largeur, sans drone) ═══ */}
      <AuroraBackground className="h-screen flex overflow-hidden">

        {/* Full-width: ShaderAnimation + text */}
        <div className="w-full flex flex-col justify-center px-10 lg:px-32 xl:px-48 pt-16 relative">

          {/* Shader subtle overlay */}
          <ShaderAnimation className="absolute inset-0 opacity-50 pointer-events-none" />

          {/* Content */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              <Label>Nos tarifs et nos prestations</Label>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.05, delay: 0.45, ease: EASE }}
              className="mt-5 font-bold leading-[0.88] text-[#E8E2D8]"
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
                minHeight: '2.2em',
              }}
            >
              <Typewriter
                words={['Spectacle de drones', 'Féerie dans le ciel', 'Made in France']}
              />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.85 }}
              className="mt-6 text-[15px] text-[#E8E2D8]/35 italic tracking-wide"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Combinez féérie et technologie
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.15 }}
              className="mt-10 flex flex-col sm:flex-row gap-3"
            >
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 bg-[#E8E2D8] text-[#0A0A0A] text-[11px] tracking-[0.25em] uppercase font-bold px-8 py-4 hover:bg-white transition-colors duration-300"
              >
                Prenons contact
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#offre"
                className="inline-flex items-center gap-2 border border-white/[0.12] text-[#E8E2D8]/35 text-[11px] tracking-[0.25em] uppercase px-8 py-4 hover:border-white/25 hover:text-[#E8E2D8]/70 transition-all duration-300"
              >
                Découvrir
              </a>
            </motion.div>
          </div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-10 left-10 lg:left-20 flex items-center gap-3 z-10"
          >
            <div className="w-8 h-px bg-[#9E8060]" />
            <span className="text-[#E8E2D8]/20 text-[9px] tracking-[0.4em] uppercase">Défiler</span>
          </motion.div>
        </div>

      </AuroraBackground>

      {/* ═══ STATS ═══ */}
      <section className="border-t border-b border-white/[0.06] bg-[#111111]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06]">
          {[
            { n: '100 – 800', label: 'drones par spectacle' },
            { n: '13 min',    label: 'durée moyenne' },
            { n: '15 – 25',   label: 'scènes par chorégraphie' },
            { n: '10 sem.',   label: 'de préparation' },
          ].map((s, i) => (
            <FadeUp key={i} delay={i * 0.08} className="px-8 md:px-12 py-14 text-center">
              <div
                className="text-[2.2rem] md:text-[2.6rem] font-bold leading-none text-[#E8E2D8]"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                {s.n}
              </div>
              <div className="mt-2.5 text-[#E8E2D8]/30 text-[10px] tracking-[0.3em] uppercase">
                {s.label}
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ═══ INTRO / TECH ═══ */}
      <section id="offre" className="py-36 md:py-52">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-20 xl:gap-36 items-center">
            <div>
              <FadeUp><Label>Notre expertise</Label></FadeUp>
              <FadeUp delay={0.1}>
                <h2
                  className="mt-4 font-bold leading-[1.04] text-[#E8E2D8]"
                  style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
                >
                  Une offre adaptée<br />à tous les budgets
                </h2>
              </FadeUp>
              <Rule />
              <FadeUp delay={0.2}>
                <p className="text-[#E8E2D8]/45 leading-[1.85] text-[15px]">
                  Drone de ciel s'appuie sur des technologies de pointe pour créer des spectacles de
                  drones féériques qui sauront provoquer l'émerveillement de votre public.
                </p>
              </FadeUp>
              <FadeUp delay={0.3}>
                <p className="mt-5 text-[#E8E2D8]/45 leading-[1.85] text-[15px]">
                  Des logiciels 3D permettent aux techniciens de Drone de ciel de concevoir des scènes
                  graphiques saisissantes et réalistes pour laisser libre court à votre imagination.
                </p>
              </FadeUp>
              <FadeUp delay={0.4}>
                <p className="mt-5 text-[#E8E2D8]/45 leading-[1.85] text-[15px]">
                  Les drones utilisés sont équipés de leds et peuvent représenter tous les tableaux
                  souhaités.
                </p>
              </FadeUp>
            </div>

            <FadeUp delay={0.2}>
              <div className="relative w-full" style={{ height: 'clamp(420px, 55vw, 640px)' }}>
                <SplineScene
                  scene="https://prod.spline.design/DQNn6KoBM5YFGYXD/scene.splinecode"
                  className="w-full h-full"
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══ AUDIENCES ═══ */}
      <section className="py-36 md:py-52 border-t border-white/[0.06] bg-[#111111]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-20">
            <FadeUp><Label>Pour qui</Label></FadeUp>
            <FadeUp delay={0.1}>
              <h2
                className="mt-4 font-bold text-[#E8E2D8] max-w-2xl"
                style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                Un spectacle pour chaque occasion
              </h2>
            </FadeUp>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                Icon: Building2,
                title: 'Entreprises',
                body: "Les entreprises pourront utiliser l'offre de spectacles de Drone de ciel pour afficher leur logo, un slogan ou toute autre marque.",
                img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=700&q=80&auto=format',
              },
              {
                Icon: Users,
                title: 'Collectivités publiques et associations',
                body: "Malgré le contexte écologique actuel et les restrictions qui pèsent sur la tenue de feux pyrotechniques historiques, les spectacles de drones de Drone de ciel permettent de répondre aux besoins des collectivités publiques lors de différents évènements.",
                img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=700&q=80&auto=format',
              },
              {
                Icon: UserCircle,
                title: 'Particuliers',
                body: 'Drone de ciel a conçu des spectacles pré-conçus pour proposer des prestations à des tarifs contenus. Notre objectif est de permettre à tous les publics de profiter de la féérie et de la magie des spectacles de drones.',
                img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=700&q=80&auto=format',
              },
            ].map((card, i) => (
              <FadeUp key={i} delay={i * 0.12}>
                <div className="group bg-[#0A0A0A]">
                  <div className="relative aspect-[5/4] overflow-hidden mb-7">
                    <Image
                      src={card.img}
                      alt={card.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-700"
                    />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <card.Icon className="w-4 h-4 text-[#9E8060] shrink-0" />
                    <h3
                      className="text-[#E8E2D8] font-semibold text-base"
                      style={{ fontFamily: 'var(--font-playfair)' }}
                    >
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-[#E8E2D8]/35 text-sm leading-[1.8]">{card.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SUR-MESURE ═══ */}
      <section className="py-36 md:py-52 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-20 xl:gap-36 items-center">

            <FadeUp delay={0.1} className="order-2 md:order-1">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&q=80&auto=format"
                  alt="Vue aérienne de nuit"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover hover:scale-[1.03] transition-transform duration-700"
                />
              </div>
            </FadeUp>

            <div className="order-1 md:order-2">
              <FadeUp><Label>Sur-mesure</Label></FadeUp>
              <FadeUp delay={0.1}>
                <h2
                  className="mt-4 font-bold leading-[1.04] text-[#E8E2D8]"
                  style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
                >
                  Votre univers,<br />dans le ciel
                </h2>
              </FadeUp>
              <Rule />
              <FadeUp delay={0.2}>
                <p className="text-[#E8E2D8]/45 leading-[1.85] text-[15px]">
                  Chez Drone De Ciel, nous travaillons avec du matériel technologique innovant qui
                  nécessite des investissements importants ; les tarifs permettent ainsi de vous
                  garantir des spectacles de drones de haute qualité et un accompagnement de tous
                  les instants.
                </p>
              </FadeUp>
              <FadeUp delay={0.3}>
                <p className="mt-5 text-[#E8E2D8]/45 leading-[1.85] text-[15px]">
                  Pour proposer des prix contenus, nous pouvons élaborer un spectacle personnalisé
                  sur la base de figures pré-conçues spécialement pour les évènements particuliers
                  (anniversaires, mariages, etc). Nos tarifs peuvent ainsi s'adapter à votre budget.
                </p>
              </FadeUp>
              <FadeUp delay={0.4}>
                <p className="mt-5 text-[#E8E2D8]/45 leading-[1.85] text-[15px]">
                  Vous souhaitez transporter votre public dans votre univers, mettre en avant votre
                  marque ou votre expertise, contactez-nous pour que nous puissions étudier votre
                  demande et vous faire une offre de spectacle de drones lumineux sur-mesure.
                </p>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SPECS ═══ */}
      <section className="py-36 md:py-52 border-t border-white/[0.06] bg-[#111111]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-20">
            <FadeUp><Label>Quelques informations clés</Label></FadeUp>
            <FadeUp delay={0.1}>
              <h2
                className="mt-4 font-bold text-[#E8E2D8]"
                style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                L'excellence en chiffres
              </h2>
            </FadeUp>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.05]">
            {[
              { Icon: Zap,       title: 'Chorégraphies personnalisées', body: 'Création de chorégraphies personnalisées' },
              { Icon: BarChart3, title: '100 à 800 drones',             body: '100 à 800 drones par spectacle' },
              { Icon: Clock,     title: '10 semaines de préparation',   body: "10 semaines de préparation (y compris les demandes d'autorisation)" },
              { Icon: Star,      title: '15 à 25 scènes',               body: '15 à 25 scènes par chorégraphie' },
              { Icon: Clock,     title: '13 minutes',                   body: "Durée moyenne d'un spectacle : 13 minutes" },
              { Icon: Flame,     title: "Zéro risque d'incendie",       body: "La technologie employée permet d'écarter tout risque d'incendie." },
              { Icon: Repeat,    title: 'Spectacle répétable',          body: 'Le spectacle peut être répété plusieurs fois' },
              { Icon: Leaf,      title: 'Éco-responsable',              body: 'Les drones sont réutilisables, sans émission et recyclables.' },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 0.05}>
                <div className="group bg-[#111111] px-8 py-10 hover:bg-[#181818] transition-colors duration-300 h-full">
                  <item.Icon className="w-5 h-5 text-[#9E8060] mb-7" />
                  <h3
                    className="text-[#E8E2D8] font-semibold text-sm mb-2"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[#E8E2D8]/30 text-xs leading-relaxed">{item.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ QUOTE ═══ */}
      <section className="py-36 md:py-48 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <FadeUp>
            <div
              className="text-[#9E8060] text-6xl leading-none mb-8 select-none"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              &ldquo;
            </div>
            <blockquote
              className="text-2xl md:text-[2rem] font-bold italic leading-[1.45] text-[#E8E2D8]/60"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Notre objectif est de permettre à tous les publics de profiter de la
              féérie et de la magie des spectacles de drones.
            </blockquote>
            <div className="mt-10 flex items-center justify-center gap-5">
              <div className="h-px w-12 bg-[#9E8060]" />
              <span className="text-[#9E8060] text-[10px] tracking-[0.35em] uppercase">
                Drone de Ciel
              </span>
              <div className="h-px w-12 bg-[#9E8060]" />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section id="contact" className="py-36 md:py-52 border-t border-white/[0.06] bg-[#111111]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <FadeUp><Label>Passons à l'action</Label></FadeUp>
              <FadeUp delay={0.1}>
                <h2
                  className="mt-4 font-bold leading-[1.02] text-[#E8E2D8]"
                  style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
                >
                  Faites briller votre évènement avec un spectacle de drones
                </h2>
              </FadeUp>
              <Rule />
              <FadeUp delay={0.2}>
                <p className="text-[#E8E2D8]/35 leading-[1.85]">
                  Contactez-nous pour étudier votre demande et vous faire une offre sur-mesure.
                </p>
              </FadeUp>
            </div>

            <FadeUp delay={0.2} className="flex flex-col gap-4">
              <a
                href="mailto:contact@dronedeciel.com"
                className="group inline-flex items-center gap-3 bg-[#E8E2D8] text-[#0A0A0A] font-bold text-[11px] tracking-[0.25em] uppercase px-8 py-5 hover:bg-white transition-colors duration-300"
              >
                Prenons contact
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="tel:+33629586558"
                className="inline-flex items-center gap-3 border border-white/[0.12] text-[#E8E2D8]/40 text-[11px] tracking-[0.25em] uppercase px-8 py-5 hover:border-white/25 hover:text-[#E8E2D8]/70 transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
                +33 (0)6 29 58 65 58
              </a>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-white/[0.06] bg-[#080808] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-14">

            <div>
              <p
                className="text-[11px] font-bold tracking-[0.2em] uppercase mb-5 text-[#E8E2D8]"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Drone de Ciel{' '}
                <span className="text-[#9E8060]">|</span>{' '}
                <span className="text-[#E8E2D8]/25 font-normal">Made In France</span>
              </p>
              <p className="text-[#E8E2D8]/25 text-xs leading-relaxed">
                Spectacles de drones féériques alliant technologie de pointe et magie visuelle,
                pour tous vos évènements.
              </p>
            </div>

            <div>
              <p className="text-[#E8E2D8]/25 text-[10px] tracking-[0.3em] uppercase mb-5">Navigation</p>
              <ul className="space-y-3">
                {["L'équipe", 'Vidéos', 'Prenons contact', 'Ils parlent de nous', 'FAQ'].map((l) => (
                  <li key={l}>
                    <a href="#" className="text-[#E8E2D8]/25 text-sm hover:text-[#E8E2D8]/60 transition-colors duration-200">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[#E8E2D8]/25 text-[10px] tracking-[0.3em] uppercase mb-5">Contact</p>
              <ul className="space-y-4">
                {[
                  { Icon: Phone,  text: '+33 (0)6 29 58 65 58',               href: 'tel:+33629586558' },
                  { Icon: Mail,   text: 'contact@dronedeciel.com',             href: 'mailto:contact@dronedeciel.com' },
                  { Icon: MapPin, text: '23 Route de Ternant\n01500 AMBUTRIX, France', href: '#' },
                ].map(({ Icon, text, href }, i) => (
                  <li key={i}>
                    <a href={href} className="flex items-start gap-3 text-[#E8E2D8]/25 text-sm hover:text-[#E8E2D8]/50 transition-colors">
                      <Icon className="w-4 h-4 text-[#9E8060]/50 mt-0.5 shrink-0" />
                      <span className="whitespace-pre-line">{text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[#E8E2D8]/25 text-[10px] tracking-[0.3em] uppercase mb-5">Suivez-nous</p>
              <div className="flex gap-3">
                {[IconInstagram, IconFacebook, IconLinkedin, IconYoutube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 border border-white/[0.08] flex items-center justify-center text-[#E8E2D8]/20 hover:border-white/20 hover:text-[#E8E2D8]/50 transition-all duration-300"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="h-px bg-white/[0.05]" />

          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-[#E8E2D8]/15 text-[11px] tracking-wide">© 2026 DRONE DE CIEL | Made In France</p>
            <p className="text-[#E8E2D8]/15 text-[11px] tracking-wide">www.dronedeciel.show</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
