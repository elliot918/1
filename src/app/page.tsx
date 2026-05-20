'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import {
  Zap, Users, Building2, UserCircle, Clock, Repeat, Leaf,
  Flame, BarChart3, Star, ChevronRight, Phone, Mail, MapPin, Menu,
} from 'lucide-react'

/* Inline social icons (lucide-react omits social brands) */
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

/* ─────────────────────────────────────────────
   Deterministic particles — no Math.random()
───────────────────────────────────────────── */
const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  left: `${((i * 17 + 3) % 97)}%`,
  top: `${((i * 23 + 7) % 91)}%`,
  opacity: 0.12 + (i % 6) * 0.07,
  size: i % 3 === 0 ? 2 : 1,
  duration: 3 + (i % 4),
  delay: (i % 7) * 0.55,
}))

/* ─────────────────────────────────────────────
   Reusable animation helpers
───────────────────────────────────────────── */
const EASE = [0.25, 0.46, 0.45, 0.94] as const

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.75, delay: d, ease: EASE } }),
}

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
      custom={delay}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Gold divider
───────────────────────────────────────────── */
function GoldRule() {
  return (
    <div className="flex items-center gap-4 my-8">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A84C]/60 to-transparent" />
      <div
        className="w-2 h-2 rotate-45 bg-[#C9A84C]"
        style={{ boxShadow: '0 0 8px rgba(201,168,76,0.8)' }}
      />
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A84C]/60 to-transparent" />
    </div>
  )
}

/* ─────────────────────────────────────────────
   Label chip
───────────────────────────────────────────── */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[#C9A84C] text-[10px] tracking-[0.35em] uppercase font-medium">
      {children}
    </span>
  )
}

/* ═══════════════════════════════════════════
   PAGE
═══════════════════════════════════════════ */
export default function TarifsPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <div
      className="min-h-screen bg-[#050505] text-white overflow-x-hidden"
      style={{ fontFamily: 'var(--font-inter)' }}
    >

      {/* ═══ NAVIGATION ═══ */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#050505]/70 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full border border-[#C9A84C]/60 flex items-center justify-center"
              style={{ boxShadow: '0 0 12px rgba(201,168,76,0.4)' }}
            >
              <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
            </div>
            <span
              className="font-bold tracking-[0.18em] text-xs uppercase"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Drone de Ciel{' '}
              <span className="text-[#C9A84C]">|</span>{' '}
              <span className="text-white/50 font-normal">Made In France</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {['Nos prestations', "L'équipe", 'Nos réalisations'].map((l) => (
              <a
                key={l}
                href="#"
                className="text-white/40 text-[11px] tracking-[0.22em] uppercase hover:text-[#C9A84C] transition-colors duration-300"
              >
                {l}
              </a>
            ))}
            <a
              href="#contact"
              className="relative text-[11px] tracking-[0.22em] uppercase font-semibold bg-[#C9A84C] text-black px-5 py-2.5 overflow-hidden group transition-all hover:bg-[#E8D5A3]"
            >
              Prenons contact
            </a>
          </div>

          <button className="md:hidden text-white/40 hover:text-white">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Parallax background */}
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <Image
            src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80&auto=format"
            alt="Vue aérienne nocturne"
            fill
            className="object-cover opacity-25"
            priority
          />
        </motion.div>

        {/* Layered gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/30 to-[#050505]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-[#050505]/80" />

        {/* Gold ambient glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 70%)',
          }}
        />

        {/* Particles */}
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#C9A84C] pointer-events-none animate-float-particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              '--p-opacity': p.opacity,
              '--p-duration': `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            } as React.CSSProperties}
          />
        ))}

        {/* Hero content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <Label>Nos tarifs et nos prestations</Label>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.55, ease: EASE }}
            className="mt-5 font-black leading-[0.92] tracking-tight"
            style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(3.5rem, 10vw, 8rem)' }}
          >
            Spectacle de{' '}
            <span className="text-gold-gradient animate-shimmer">drones</span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-6 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-6 text-lg md:text-2xl text-white/50 font-light tracking-wide italic"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Combinez féérie et technologie
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-[#C9A84C] text-black font-bold text-[11px] tracking-[0.3em] uppercase hover:bg-[#E8D5A3] transition-all duration-300 animate-glow-pulse"
            >
              Prenons contact
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#offre"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/15 text-white/50 text-[11px] tracking-[0.3em] uppercase hover:border-[#C9A84C]/60 hover:text-[#C9A84C] transition-all duration-300"
            >
              Découvrir l'offre
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-white/20 text-[9px] tracking-[0.4em] uppercase">Défiler</span>
          <div className="w-px h-10 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-b from-[#C9A84C] to-transparent animate-scroll" />
          </div>
        </motion.div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="border-y border-white/[0.06] bg-black/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-white/[0.06]">
          {[
            { n: '100 – 800', unit: 'drones', label: 'par spectacle' },
            { n: '13', unit: 'minutes', label: 'durée moyenne' },
            { n: '15 – 25', unit: 'scènes', label: 'par chorégraphie' },
            { n: '10', unit: 'semaines', label: 'de préparation' },
          ].map((s, i) => (
            <FadeUp key={i} delay={i * 0.1} className="text-center px-6">
              <div
                className="text-[2.6rem] font-black leading-none text-gold-gradient"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                {s.n}
              </div>
              <div className="mt-1 text-white/70 text-sm font-medium">{s.unit}</div>
              <div className="mt-0.5 text-white/25 text-[10px] tracking-widest uppercase">{s.label}</div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ═══ INTRO / TECH ═══ */}
      <section id="offre" className="py-28 md:py-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 xl:gap-24 items-center">

            {/* Text */}
            <div>
              <FadeUp>
                <Label>Notre expertise</Label>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h2
                  className="mt-4 text-4xl md:text-5xl xl:text-6xl font-bold leading-[1.05]"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  Une offre adaptée{' '}
                  <br />
                  <em className="not-italic text-gold-gradient">à tous les budgets</em>
                </h2>
              </FadeUp>
              <GoldRule />
              <FadeUp delay={0.2}>
                <p className="text-white/55 leading-relaxed text-[15px]">
                  Drone de ciel s'appuie sur des technologies de pointe pour créer des spectacles de
                  drones féériques qui sauront provoquer l'émerveillement de votre public.
                </p>
              </FadeUp>
              <FadeUp delay={0.3}>
                <p className="mt-4 text-white/55 leading-relaxed text-[15px]">
                  Des logiciels 3D permettent aux techniciens de Drone de ciel de concevoir des scènes
                  graphiques saisissantes et réalistes pour laisser libre court à votre imagination.
                </p>
              </FadeUp>
              <FadeUp delay={0.4}>
                <p className="mt-4 text-white/55 leading-relaxed text-[15px]">
                  Les drones utilisés sont équipés de leds et peuvent représenter tous les tableaux
                  souhaités.
                </p>
              </FadeUp>
            </div>

            {/* Image */}
            <FadeUp delay={0.2} className="relative">
              <div className="relative aspect-[4/3] overflow-hidden group">
                <Image
                  src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=900&q=80&auto=format"
                  alt="Drone de pointe en vol"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />
                {/* Caption */}
                <div className="absolute bottom-0 inset-x-0 p-6">
                  <Label>Technologie de pointe</Label>
                  <p
                    className="mt-1 text-white text-xl font-semibold"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    Logiciels 3D & Drones LED
                  </p>
                </div>
                {/* Gold corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#C9A84C]/60" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#C9A84C]/60" />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══ AUDIENCES ═══ */}
      <section className="py-28 md:py-36 bg-gradient-to-b from-black/40 via-black/20 to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <FadeUp>
              <Label>Pour qui</Label>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2
                className="mt-4 text-4xl md:text-5xl xl:text-6xl font-bold"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Un spectacle pour chaque occasion
              </h2>
            </FadeUp>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                Icon: Building2,
                tag: 'Corporate',
                title: 'Entreprises',
                body: "Les entreprises pourront utiliser l'offre de spectacles de Drone de ciel pour afficher leur logo, un slogan ou toute autre marque.",
                img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=700&q=80&auto=format',
              },
              {
                Icon: Users,
                tag: 'Événements publics',
                title: 'Collectivités publiques et associations',
                body: "Malgré le contexte écologique actuel et les restrictions qui pèsent sur la tenue de feux pyrotechniques historiques, les spectacles de drones de Drone de ciel permettent de répondre aux besoins des collectivités publiques lors de différents évènements.",
                img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=700&q=80&auto=format',
              },
              {
                Icon: UserCircle,
                tag: 'Privatif',
                title: 'Particuliers',
                body: 'Drone de ciel a conçu des spectacles pré-conçus pour proposer des prestations à des tarifs contenus. Notre objectif est de permettre à tous les publics de profiter de la féérie et de la magie des spectacles de drones.',
                img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=700&q=80&auto=format',
              },
            ].map((card, i) => (
              <FadeUp key={i} delay={i * 0.15}>
                <div className="group relative overflow-hidden border border-white/[0.07] hover:border-[#C9A84C]/40 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden flex-shrink-0">
                    <Image
                      src={card.img}
                      alt={card.title}
                      fill
                      className="object-cover opacity-55 group-hover:opacity-75 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="text-[#C9A84C] text-[9px] tracking-[0.3em] uppercase border border-[#C9A84C]/40 bg-black/40 backdrop-blur-sm px-3 py-1">
                        {card.tag}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-7 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 border border-[#C9A84C]/30 flex items-center justify-center flex-shrink-0">
                        <card.Icon className="w-4 h-4 text-[#C9A84C]" />
                      </div>
                      <h3
                        className="text-lg font-semibold leading-tight"
                        style={{ fontFamily: 'var(--font-playfair)' }}
                      >
                        {card.title}
                      </h3>
                    </div>
                    <p className="text-white/45 text-sm leading-relaxed">{card.body}</p>

                    {/* Bottom gold line on hover */}
                    <div className="mt-auto pt-6">
                      <div className="h-px w-0 group-hover:w-full bg-gradient-to-r from-[#C9A84C]/60 to-transparent transition-all duration-700" />
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SUR-MESURE / PERSONNALISATION ═══ */}
      <section className="py-28 md:py-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 xl:gap-24 items-center">

            {/* Image with floating badges */}
            <FadeUp delay={0.1} className="order-2 md:order-1">
              <div className="relative">
                <div className="relative aspect-square overflow-hidden group">
                  <Image
                    src="https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=900&q=80&auto=format"
                    alt="Spectacle de drones lumineux"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent" />
                  <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#C9A84C]/60" />
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#C9A84C]/60" />
                </div>

                {/* Floating stat cards */}
                <div className="absolute -bottom-6 -right-4 md:right-6 flex gap-3">
                  {[
                    { val: '∞', lbl: 'Répétitions possibles' },
                    { val: '0', lbl: "Risque d'incendie" },
                  ].map((badge, i) => (
                    <div
                      key={i}
                      className="bg-[#050505]/90 backdrop-blur-md border border-white/10 px-5 py-4"
                      style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
                    >
                      <div
                        className="text-2xl font-black text-[#C9A84C]"
                        style={{ fontFamily: 'var(--font-playfair)' }}
                      >
                        {badge.val}
                      </div>
                      <div className="text-white/40 text-[10px] mt-0.5 whitespace-nowrap">
                        {badge.lbl}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Text */}
            <div className="order-1 md:order-2">
              <FadeUp>
                <Label>Sur-mesure</Label>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h2
                  className="mt-4 text-4xl md:text-5xl xl:text-6xl font-bold leading-[1.05]"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  Votre univers,{' '}
                  <br />
                  <em className="not-italic text-gold-gradient">dans le ciel</em>
                </h2>
              </FadeUp>
              <GoldRule />
              <FadeUp delay={0.2}>
                <p className="text-white/55 leading-relaxed text-[15px]">
                  Chez Drone De Ciel, nous travaillons avec du matériel technologique innovant qui
                  nécessite des investissements importants ; les tarifs permettent ainsi de vous
                  garantir des spectacles de drones de haute qualité et un accompagnement de tous
                  les instants.
                </p>
              </FadeUp>
              <FadeUp delay={0.3}>
                <p className="mt-4 text-white/55 leading-relaxed text-[15px]">
                  Pour proposer des prix contenus, nous pouvons élaborer un spectacle personnalisé
                  sur la base de figures pré-conçues spécialement pour les évènements particuliers
                  (anniversaires, mariages, etc). Nos tarifs peuvent ainsi s'adapter à votre budget.
                </p>
              </FadeUp>
              <FadeUp delay={0.4}>
                <p className="mt-4 text-white/55 leading-relaxed text-[15px]">
                  Vous souhaitez transporter votre public dans votre univers, mettre en avant votre
                  marque ou votre expertise, contactez-nous pour que nous puissions étudier votre
                  demande et vous faire une offre de spectacle de drones lumineux sur-mesure.
                </p>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ KEY SPECS ═══ */}
      <section className="py-28 md:py-36 bg-gradient-to-b from-black/50 to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <FadeUp>
              <Label>Quelques informations clés</Label>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2
                className="mt-4 text-4xl md:text-5xl xl:text-6xl font-bold"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                L'excellence en chiffres
              </h2>
            </FadeUp>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                Icon: Zap,
                title: 'Chorégraphies personnalisées',
                body: 'Création de chorégraphies personnalisées',
              },
              {
                Icon: BarChart3,
                title: '100 à 800 drones',
                body: '100 à 800 drones par spectacle',
              },
              {
                Icon: Clock,
                title: '10 semaines de préparation',
                body: "10 semaines de préparation (y compris les demandes d'autorisation)",
              },
              {
                Icon: Star,
                title: '15 à 25 scènes',
                body: '15 à 25 scènes par chorégraphie',
              },
              {
                Icon: Clock,
                title: '13 minutes',
                body: "Durée moyenne d'un spectacle : 13 minutes",
              },
              {
                Icon: Flame,
                title: "Zéro risque d'incendie",
                body: "La technologie employée permet d'écarter tout risque d'incendie.",
              },
              {
                Icon: Repeat,
                title: 'Spectacle répétable',
                body: 'Le spectacle peut être répété plusieurs fois',
              },
              {
                Icon: Leaf,
                title: 'Éco-responsable',
                body: 'Les drones sont réutilisables, sans émission et recyclables.',
              },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 0.07}>
                <div className="group relative p-7 border border-white/[0.06] hover:border-[#C9A84C]/35 bg-white/[0.015] hover:bg-white/[0.04] transition-all duration-400 h-full">
                  {/* Top accent line */}
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/0 group-hover:via-[#C9A84C]/60 to-transparent transition-all duration-500" />

                  <div className="w-10 h-10 border border-[#C9A84C]/25 group-hover:border-[#C9A84C]/60 flex items-center justify-center mb-5 transition-colors duration-300">
                    <item.Icon className="w-5 h-5 text-[#C9A84C]" />
                  </div>
                  <h3
                    className="text-white text-base font-semibold mb-2"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-white/35 text-[13px] leading-relaxed">{item.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VIDEO BAND ═══ */}
      <section className="relative h-[50vh] overflow-hidden my-16">
        <Image
          src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=80&auto=format"
          alt="Ciel étoilé — spectacle de drones"
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <FadeUp>
            <blockquote
              className="text-center px-6 max-w-3xl"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              <p className="text-2xl md:text-4xl font-bold italic leading-snug text-white/80">
                "Notre objectif est de permettre à{' '}
                <span className="text-gold-gradient not-italic font-black">tous les publics</span>{' '}
                de profiter de la féérie et de la magie des spectacles de drones."
              </p>
              <div className="mt-6 inline-flex items-center gap-3">
                <div className="h-px w-12 bg-[#C9A84C]/60" />
                <span className="text-[#C9A84C] text-[10px] tracking-[0.35em] uppercase">
                  Drone de Ciel
                </span>
                <div className="h-px w-12 bg-[#C9A84C]/60" />
              </div>
            </blockquote>
          </FadeUp>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section id="contact" className="relative py-36 md:py-48 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80&auto=format"
            alt="Spectacle nocturne"
            fill
            className="object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
        </div>

        {/* Rotating ring decoration */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none">
          <div
            className="absolute inset-0 rounded-full border border-[#C9A84C]/[0.07] animate-spin-slow"
          />
          <div
            className="absolute inset-12 rounded-full border border-[#C9A84C]/[0.05]"
            style={{ animationDuration: '20s', animation: 'spin-slow 20s linear infinite reverse' }}
          />
          {/* Gold ambient */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 65%)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <FadeUp>
            <Label>Passons à l'action</Label>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h2
              className="mt-6 text-4xl md:text-6xl xl:text-7xl font-black leading-[1.02]"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Faites briller votre{' '}
              <br className="hidden md:block" />
              évènement avec un{' '}
              <br className="hidden md:block" />
              <span className="text-gold-gradient animate-shimmer">spectacle de drones</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="mt-6 text-white/40 text-lg max-w-lg mx-auto">
              Contactez-nous pour étudier votre demande et vous faire une offre sur-mesure.
            </p>
          </FadeUp>
          <FadeUp delay={0.45}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:contact@dronedeciel.com"
                className="group inline-flex items-center gap-3 px-10 py-5 bg-[#C9A84C] text-black font-bold text-[11px] tracking-[0.3em] uppercase hover:bg-[#E8D5A3] transition-all duration-300 animate-glow-pulse"
              >
                Prenons contact
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="tel:+33629586558"
                className="inline-flex items-center gap-3 px-10 py-5 border border-white/12 text-white/50 text-[11px] tracking-[0.3em] uppercase hover:border-[#C9A84C]/50 hover:text-[#C9A84C] transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
                +33 (0)6 29 58 65 58
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-white/[0.05] bg-[#020202] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">

          {/* Top grid */}
          <div className="grid md:grid-cols-4 gap-12 mb-14">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div
                  className="w-5 h-5 rounded-full border border-[#C9A84C]/50 flex items-center justify-center"
                  style={{ boxShadow: '0 0 10px rgba(201,168,76,0.3)' }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                </div>
                <span
                  className="font-bold tracking-[0.15em] text-[11px] uppercase"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  Drone de Ciel{' '}
                  <span className="text-[#C9A84C]">|</span>{' '}
                  <span className="text-white/40 font-normal">Made In France</span>
                </span>
              </div>
              <p className="text-white/25 text-xs leading-relaxed">
                Spectacles de drones féériques alliant technologie de pointe et magie visuelle, pour
                tous vos évènements.
              </p>
            </div>

            {/* Links */}
            <div>
              <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-semibold mb-5">
                Navigation
              </p>
              <ul className="space-y-3">
                {["L'équipe", 'Vidéos', 'Prenons contact', 'Ils parlent de nous', 'FAQ'].map(
                  (l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-white/25 text-sm hover:text-[#C9A84C] transition-colors duration-200"
                      >
                        {l}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-semibold mb-5">
                Contact
              </p>
              <ul className="space-y-4">
                {[
                  { Icon: Phone, text: '+33 (0)6 29 58 65 58', href: 'tel:+33629586558' },
                  { Icon: Mail, text: 'contact@dronedeciel.com', href: 'mailto:contact@dronedeciel.com' },
                  { Icon: MapPin, text: '23 Route de Ternant\n01500 AMBUTRIX, France', href: '#' },
                ].map(({ Icon, text, href }, i) => (
                  <li key={i}>
                    <a
                      href={href}
                      className="flex items-start gap-3 text-white/30 text-sm hover:text-white/60 transition-colors group"
                    >
                      <Icon className="w-4 h-4 text-[#C9A84C]/70 group-hover:text-[#C9A84C] mt-0.5 shrink-0 transition-colors" />
                      <span className="whitespace-pre-line">{text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-semibold mb-5">
                Suivez-nous
              </p>
              <div className="flex gap-3">
                {[IconInstagram, IconFacebook, IconLinkedin, IconYoutube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 border border-white/[0.08] flex items-center justify-center text-white/25 hover:border-[#C9A84C]/50 hover:text-[#C9A84C] transition-all duration-300"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

          {/* Bottom row */}
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-white/15 text-[11px] tracking-wide">
              © 2026 DRONE DE CIEL | Made In France
            </p>
            <p className="text-white/15 text-[11px] tracking-wide">www.dronedeciel.show</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
