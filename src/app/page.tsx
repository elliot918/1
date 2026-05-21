'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { SplineScene } from '@/components/ui/splite'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { ShaderAnimation } from '@/components/ui/shader-animation'
import { Typewriter } from '@/components/ui/typewriter'
import { Spotlight } from '@/components/ui/spotlight'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal'
import { HeroParallax } from '@/components/ui/hero-parallax'
import { TracingBeam } from '@/components/ui/tracing-beam'
import {
  Zap, Users, Building2, UserCircle, Clock, Repeat, Leaf,
  Flame, BarChart3, Star, ChevronRight, Phone, Mail, MapPin,
  Menu,
} from 'lucide-react'
import { useInView } from 'framer-motion'

/* ─────────────────────────────────────────
   Social icons
───────────────────────────────────────── */
const IconInstagram = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" />
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
    <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
)
const IconYoutube = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
)

/* ─────────────────────────────────────────
   Animation constants — Emil Kowalski
   • Strong ease-out only, no ease-in
   • UI buttons: 120ms  |  scroll reveals: 550ms
   • scale starts 0.97, not 0
───────────────────────────────────────── */
const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1]
const EASE_FAST: [number, number, number, number] = [0.16, 1, 0.3, 1]

function FadeUp({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduced = useReducedMotion()
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: reduced ? 0 : 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: reduced ? 0.15 : 0.55, delay: reduced ? 0 : delay, ease: EASE_OUT }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function Press({ children, className, href }: { children: React.ReactNode; className?: string; href: string }) {
  const reduced = useReducedMotion()
  return (
    <motion.a
      href={href}
      whileTap={reduced ? {} : { scale: 0.97 }}
      transition={{ duration: 0.12, ease: EASE_FAST }}
      className={className}
    >
      {children}
    </motion.a>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="inline-block text-[#9E8060] text-[9px] tracking-[0.4em] uppercase font-medium">{children}</span>
}
function Rule() {
  return <div className="my-10 w-10 h-px bg-[#9E8060]/60" />
}

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */

// 15 drone/aerial photos for HeroParallax
const dronePhotos = [
  { title: 'Formation nocturne',    link: '#', thumbnail: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80&auto=format' },
  { title: 'Spectacle entreprise',  link: '#', thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80&auto=format' },
  { title: 'Féérie sur la ville',   link: '#', thumbnail: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80&auto=format' },
  { title: 'Spectacle collectivité',link: '#', thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80&auto=format' },
  { title: 'Mariage de rêve',       link: '#', thumbnail: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80&auto=format' },
  { title: 'Drone en vol',          link: '#', thumbnail: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&q=80&auto=format' },
  { title: 'Vue aérienne',          link: '#', thumbnail: 'https://images.unsplash.com/photo-1519745218970-66e87a0f5f70?w=600&q=80&auto=format' },
  { title: 'Chorégraphie lumière',  link: '#', thumbnail: 'https://images.unsplash.com/photo-1533697688619-1beae60d8f0e?w=600&q=80&auto=format' },
  { title: 'Spectacle de nuit',     link: '#', thumbnail: 'https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=600&q=80&auto=format' },
  { title: 'Formation diamant',     link: '#', thumbnail: 'https://images.unsplash.com/photo-1519241047957-be31d7379a5d?w=600&q=80&auto=format' },
  { title: 'Spectacle outdoor',     link: '#', thumbnail: 'https://images.unsplash.com/photo-1534198258704-d2aa2a41a2d2?w=600&q=80&auto=format' },
  { title: 'Cérémonie privée',      link: '#', thumbnail: 'https://images.unsplash.com/photo-1529411286940-367a28e1a321?w=600&q=80&auto=format' },
  { title: 'Logo en altitude',      link: '#', thumbnail: 'https://images.unsplash.com/photo-1551871812-10ecc21ffa2f?w=600&q=80&auto=format' },
  { title: 'Sunset formation',      link: '#', thumbnail: 'https://images.unsplash.com/photo-1487887235947-a955ef187fcc?w=600&q=80&auto=format' },
  { title: 'Made in France',        link: '#', thumbnail: 'https://images.unsplash.com/photo-1509812329878-1faba51a30d2?w=600&q=80&auto=format' },
]

function StickyImg({ src, label }: { src: string; label: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <img src={src} alt={label} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <span className="absolute bottom-4 left-4 text-[#E8E2D8]/70 text-[10px] tracking-[0.32em] uppercase">{label}</span>
    </div>
  )
}

// StickyScroll prestations content
const prestations = [
  {
    title: 'Spectacles d\'entreprise',
    description: 'Utilisez les spectacles de drones pour afficher votre logo, un slogan ou toute autre communication de marque lors de vos événements corporate. Un impact visuel inoubliable pour vos clients et collaborateurs.',
    content: <StickyImg src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80&auto=format" label="Entreprises" />,
  },
  {
    title: 'Collectivités et associations',
    description: 'Remplacez les feux d\'artifice par des spectacles écologiques et sans risque, conformes aux nouvelles réglementations environnementales. Des animations féeriques pour tous vos événements publics.',
    content: <StickyImg src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80&auto=format" label="Collectivités" />,
  },
  {
    title: 'Particuliers et mariages',
    description: 'Des formules pré-conçues pour des moments inoubliables lors de mariages, anniversaires et événements privés. La magie des drones accessible à tous les budgets.',
    content: <StickyImg src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80&auto=format" label="Particuliers & Mariages" />,
  },
  {
    title: 'Création sur-mesure',
    description: 'Nous concevons des chorégraphies entièrement personnalisées pour transporter votre public dans votre univers. De la conception à la réalisation, un accompagnement total.',
    content: <StickyImg src="https://images.unsplash.com/photo-1487887235947-a955ef187fcc?w=600&q=80&auto=format" label="Sur-mesure" />,
  },
]

/* ═══════════════════════════════════════════
   PAGE
═══════════════════════════════════════════ */
export default function TarifsPage() {
  const reduced = useReducedMotion()

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E8E2D8] overflow-x-hidden" style={{ fontFamily: 'var(--font-inter)' }}>

      {/* ── NAV ── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#0A0A0A]/85 backdrop-blur-2xl border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#E8E2D8]" style={{ fontFamily: 'var(--font-playfair)' }}>
            Drone de Ciel <span className="text-[#9E8060]">·</span>{' '}
            <span className="text-[#E8E2D8]/30 font-normal tracking-[0.2em]">Made In France</span>
          </span>
          <div className="hidden md:flex items-center gap-10">
            {['Nos prestations', "L'équipe", 'Nos réalisations'].map(l => (
              <a key={l} href="#" className="text-[#E8E2D8]/30 text-[10px] tracking-[0.22em] uppercase hover:text-[#E8E2D8]/70 transition-colors duration-200">{l}</a>
            ))}
            <Press href="#contact" className="border border-white/15 text-[#E8E2D8]/50 text-[10px] tracking-[0.22em] uppercase px-5 py-2.5 hover:bg-white hover:text-[#0A0A0A] transition-colors duration-200 cursor-pointer">
              Prenons contact
            </Press>
          </div>
          <button className="md:hidden text-[#E8E2D8]/40 hover:text-[#E8E2D8]"><Menu className="w-5 h-5" /></button>
        </div>
      </nav>

      {/* ── HERO — Spotlight + Aurora + ShaderAnimation + Typewriter ── */}
      <AuroraBackground className="h-screen overflow-hidden">
        {/* Spotlight effect */}
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="#C9A84C"
        />

        <ShaderAnimation className="absolute inset-0 opacity-35 pointer-events-none" />

        <div className="relative z-10 h-full flex flex-col justify-center px-10 lg:px-24 xl:px-36 pt-16 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE_OUT }}
          >
            <Label>Nos tarifs et nos prestations</Label>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: reduced ? 0 : 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.38, ease: EASE_OUT }}
            className="mt-6 font-bold text-[#E8E2D8] leading-[0.9]"
            style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(3.2rem, 7.5vw, 7rem)', minHeight: '1.9em' }}
          >
            <Typewriter words={['Spectacle de drones', 'Féerie dans le ciel', 'Made in France']} typingSpeed={70} deletingSpeed={35} pauseDuration={2400} />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.75, ease: EASE_OUT }}
            className="mt-7 text-[15px] text-[#E8E2D8]/30 italic tracking-wide max-w-md"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Combinez féérie et technologie
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0, ease: EASE_OUT }}
            className="mt-10 flex flex-col sm:flex-row gap-3"
          >
            <Press href="#contact" className="group inline-flex items-center gap-2.5 bg-[#E8E2D8] text-[#0A0A0A] text-[10px] tracking-[0.28em] uppercase font-bold px-8 py-4 hover:bg-white transition-colors duration-150 cursor-pointer">
              Prenons contact
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-150" />
            </Press>
            <Press href="#offre" className="inline-flex items-center gap-2 border border-white/[0.10] text-[#E8E2D8]/30 text-[10px] tracking-[0.28em] uppercase px-8 py-4 hover:border-white/20 hover:text-[#E8E2D8]/60 transition-all duration-150 cursor-pointer">
              Découvrir
            </Press>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.6, ease: EASE_OUT }}
          className="absolute bottom-10 left-10 lg:left-24 xl:left-36 flex items-center gap-3 z-10"
        >
          <div className="w-8 h-px bg-[#9E8060]/50" />
          <span className="text-[#E8E2D8]/20 text-[8px] tracking-[0.45em] uppercase">Défiler</span>
        </motion.div>
      </AuroraBackground>

      {/* ── HERO PARALLAX — 15 photos de drones ── */}
      <div className="bg-[#0A0A0A]">
        <HeroParallax products={dronePhotos} />
      </div>

      {/* ── TRACING BEAM wraps all detail sections ── */}
      <TracingBeam className="max-w-none w-full px-0">

        {/* ── STATS ── */}
        <section className="border-t border-b border-white/[0.05] bg-[#0D0D0D]">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.05]">
            {[
              { n: '100 – 800', label: 'drones par spectacle' },
              { n: '13 min',    label: 'durée moyenne' },
              { n: '15 – 25',  label: 'scènes par chorégraphie' },
              { n: '10 sem.',  label: 'de préparation' },
            ].map((s, i) => (
              <FadeUp key={i} delay={i * 0.06} className="px-8 md:px-14 py-16 text-center">
                <div className="text-[2.4rem] md:text-[2.8rem] font-bold leading-none text-[#E8E2D8]" style={{ fontFamily: 'var(--font-playfair)' }}>{s.n}</div>
                <div className="mt-3 text-[#E8E2D8]/28 text-[9px] tracking-[0.35em] uppercase">{s.label}</div>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* ── OFFRE ADAPTÉE — ContainerScroll + Spline ── */}
        <section id="offre" className="bg-[#0A0A0A]">
          <ContainerScroll
            titleComponent={
              <div className="text-center px-8">
                <Label>Notre expertise</Label>
                <h2
                  className="mt-5 font-bold text-[#E8E2D8] leading-[1.04]"
                  style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2rem, 4vw, 3.4rem)' }}
                >
                  Une offre adaptée<br />à tous les budgets
                </h2>
                <p className="mt-5 text-[#E8E2D8]/35 text-[14px] leading-[1.85] max-w-xl mx-auto">
                  Drone de ciel s'appuie sur des technologies de pointe pour créer des spectacles
                  féériques qui sauront provoquer l'émerveillement de votre public.
                </p>
              </div>
            }
          >
            <SplineScene
              scene="https://prod.spline.design/DQNn6KoBM5YFGYXD/scene.splinecode"
              className="w-full h-full"
            />
          </ContainerScroll>
        </section>

        {/* ── STICKY SCROLL — Prestations ── */}
        <section className="py-24 border-t border-white/[0.05] bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto px-8 mb-14">
            <FadeUp><Label>Nos prestations</Label></FadeUp>
            <FadeUp delay={0.08}>
              <h2
                className="mt-5 font-bold text-[#E8E2D8] max-w-lg"
                style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2rem, 4vw, 3.4rem)' }}
              >
                Un spectacle pour chaque occasion
              </h2>
            </FadeUp>
          </div>
          <div className="max-w-7xl mx-auto px-8">
            <StickyScroll content={prestations} />
          </div>
        </section>

        {/* ── SUR-MESURE / VOTRE UNIVERS ── */}
        <section className="py-36 md:py-52 border-t border-white/[0.05]">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid md:grid-cols-2 gap-16 xl:gap-28 items-center">
              <FadeUp delay={0.08} className="order-2 md:order-1">
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
              <div className="order-1 md:order-2 max-w-xl">
                <FadeUp><Label>Sur-mesure</Label></FadeUp>
                <FadeUp delay={0.08}>
                  <h2 className="mt-5 font-bold leading-[1.04] text-[#E8E2D8]" style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2rem, 4vw, 3.4rem)' }}>
                    Votre univers,<br />dans le ciel
                  </h2>
                </FadeUp>
                <Rule />
                <FadeUp delay={0.12}><p className="text-[#E8E2D8]/42 leading-[1.9] text-[15px]">Chez Drone De Ciel, nous travaillons avec du matériel technologique innovant qui nécessite des investissements importants ; les tarifs permettent ainsi de vous garantir des spectacles de drones de haute qualité et un accompagnement de tous les instants.</p></FadeUp>
                <FadeUp delay={0.18}><p className="mt-5 text-[#E8E2D8]/42 leading-[1.9] text-[15px]">Pour proposer des prix contenus, nous pouvons élaborer un spectacle personnalisé sur la base de figures pré-conçues spécialement pour les évènements particuliers (anniversaires, mariages, etc). Nos tarifs peuvent ainsi s'adapter à votre budget.</p></FadeUp>
                <FadeUp delay={0.24}><p className="mt-5 text-[#E8E2D8]/42 leading-[1.9] text-[15px]">Vous souhaitez transporter votre public dans votre univers, mettre en avant votre marque ou votre expertise, contactez-nous pour que nous puissions étudier votre demande et vous faire une offre de spectacle de drones lumineux sur-mesure.</p></FadeUp>
              </div>
            </div>
          </div>
        </section>

        {/* ── SPECS ── */}
        <section className="py-36 md:py-52 border-t border-white/[0.05] bg-[#0D0D0D]">
          <div className="max-w-7xl mx-auto px-8">
            <div className="mb-20">
              <FadeUp><Label>Quelques informations clés</Label></FadeUp>
              <FadeUp delay={0.08}>
                <h2 className="mt-5 font-bold text-[#E8E2D8]" style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2rem, 4vw, 3.4rem)' }}>L'excellence en chiffres</h2>
              </FadeUp>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04]">
              {([
                { Icon: Zap,       title: 'Chorégraphies personnalisées', body: 'Création de chorégraphies personnalisées selon vos besoins.' },
                { Icon: BarChart3, title: '100 à 800 drones',             body: '100 à 800 drones par spectacle pour des effets à grande échelle.' },
                { Icon: Clock,     title: '10 semaines de préparation',   body: "10 semaines de préparation, y compris les demandes d'autorisation." },
                { Icon: Star,      title: '15 à 25 scènes',               body: '15 à 25 scènes par chorégraphie pour un spectacle complet.' },
                { Icon: Clock,     title: '13 minutes',                   body: "Durée moyenne d'un spectacle : 13 minutes d'émerveillement." },
                { Icon: Flame,     title: "Zéro risque d'incendie",       body: "La technologie employée permet d'écarter tout risque d'incendie." },
                { Icon: Repeat,    title: 'Spectacle répétable',          body: 'Le spectacle peut être répété plusieurs fois sans contrainte.' },
                { Icon: Leaf,      title: 'Éco-responsable',              body: 'Les drones sont réutilisables, sans émission et recyclables.' },
              ] as const).map((item, i) => (
                <FadeUp key={i} delay={i * 0.04}>
                  <div className="group bg-[#0D0D0D] px-8 py-10 hover:bg-[#141414] transition-colors duration-200 h-full">
                    <item.Icon className="w-4 h-4 text-[#9E8060] mb-8" strokeWidth={1.5} />
                    <h3 className="text-[#E8E2D8] font-semibold text-[13px] mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>{item.title}</h3>
                    <p className="text-[#E8E2D8]/28 text-[12px] leading-[1.75]">{item.body}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── QUOTE ── */}
        <section className="py-36 md:py-52 border-t border-white/[0.05]">
          <div className="max-w-3xl mx-auto px-8 text-center">
            <FadeUp>
              <div className="text-[#9E8060]/70 text-7xl leading-none mb-10 select-none" style={{ fontFamily: 'var(--font-playfair)' }}>&ldquo;</div>
              <blockquote className="text-[1.6rem] md:text-[2rem] font-bold italic leading-[1.5] text-[#E8E2D8]/55" style={{ fontFamily: 'var(--font-playfair)' }}>
                Notre objectif est de permettre à tous les publics de profiter de la féérie et de la magie des spectacles de drones.
              </blockquote>
              <div className="mt-12 flex items-center justify-center gap-6">
                <div className="h-px w-10 bg-[#9E8060]/50" />
                <span className="text-[#9E8060] text-[9px] tracking-[0.4em] uppercase">Drone de Ciel</span>
                <div className="h-px w-10 bg-[#9E8060]/50" />
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── CTA ── */}
        <section id="contact" className="py-36 md:py-52 border-t border-white/[0.05] bg-[#0D0D0D]">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div className="max-w-xl">
                <FadeUp><Label>Passons à l'action</Label></FadeUp>
                <FadeUp delay={0.08}>
                  <h2 className="mt-5 font-bold leading-[1.02] text-[#E8E2D8]" style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}>
                    Faites briller votre évènement avec un spectacle de drones
                  </h2>
                </FadeUp>
                <Rule />
                <FadeUp delay={0.12}><p className="text-[#E8E2D8]/32 leading-[1.9] text-[15px] max-w-[55ch]">Contactez-nous pour étudier votre demande et vous faire une offre sur-mesure.</p></FadeUp>
              </div>
              <FadeUp delay={0.1} className="flex flex-col gap-4">
                <Press href="mailto:contact@dronedeciel.com" className="group inline-flex items-center gap-3 bg-[#E8E2D8] text-[#0A0A0A] font-bold text-[10px] tracking-[0.28em] uppercase px-8 py-5 hover:bg-white transition-colors duration-150 cursor-pointer">
                  Prenons contact
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" />
                </Press>
                <Press href="tel:+33629586558" className="inline-flex items-center gap-3 border border-white/[0.10] text-[#E8E2D8]/38 text-[10px] tracking-[0.28em] uppercase px-8 py-5 hover:border-white/20 hover:text-[#E8E2D8]/65 transition-all duration-150 cursor-pointer">
                  <Phone className="w-4 h-4" strokeWidth={1.5} />
                  +33 (0)6 29 58 65 58
                </Press>
              </FadeUp>
            </div>
          </div>
        </section>

      </TracingBeam>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/[0.05] bg-[#070707] pt-16 pb-10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-4 gap-14 mb-16">
            <div>
              <p className="text-[10px] font-bold tracking-[0.25em] uppercase mb-6 text-[#E8E2D8]" style={{ fontFamily: 'var(--font-playfair)' }}>
                Drone de Ciel <span className="text-[#9E8060]">·</span>{' '}
                <span className="text-[#E8E2D8]/25 font-normal">Made In France</span>
              </p>
              <p className="text-[#E8E2D8]/22 text-[12px] leading-[1.8] max-w-[36ch]">Spectacles de drones féériques alliant technologie de pointe et magie visuelle, pour tous vos évènements.</p>
            </div>
            <div>
              <p className="text-[#E8E2D8]/22 text-[9px] tracking-[0.38em] uppercase mb-6">Navigation</p>
              <ul className="space-y-3.5">
                {["L'équipe", 'Vidéos', 'Prenons contact', 'Ils parlent de nous', 'FAQ'].map(l => (
                  <li key={l}><a href="#" className="text-[#E8E2D8]/22 text-[13px] hover:text-[#E8E2D8]/55 transition-colors duration-150">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[#E8E2D8]/22 text-[9px] tracking-[0.38em] uppercase mb-6">Contact</p>
              <ul className="space-y-4">
                {[
                  { Icon: Phone,  text: '+33 (0)6 29 58 65 58',                    href: 'tel:+33629586558' },
                  { Icon: Mail,   text: 'contact@dronedeciel.com',                  href: 'mailto:contact@dronedeciel.com' },
                  { Icon: MapPin, text: '23 Route de Ternant\n01500 AMBUTRIX, France', href: '#' },
                ].map(({ Icon, text, href }, i) => (
                  <li key={i}>
                    <a href={href} className="flex items-start gap-3 text-[#E8E2D8]/22 text-[13px] hover:text-[#E8E2D8]/50 transition-colors duration-150">
                      <Icon className="w-4 h-4 text-[#9E8060]/45 mt-0.5 shrink-0" strokeWidth={1.5} />
                      <span className="whitespace-pre-line">{text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[#E8E2D8]/22 text-[9px] tracking-[0.38em] uppercase mb-6">Suivez-nous</p>
              <div className="flex gap-2.5">
                {[IconInstagram, IconFacebook, IconLinkedin, IconYoutube].map((Icon, i) => (
                  <motion.a key={i} href="#" whileTap={reduced ? {} : { scale: 0.92 }} transition={{ duration: 0.12, ease: EASE_FAST }} className="w-9 h-9 border border-white/[0.07] flex items-center justify-center text-[#E8E2D8]/18 hover:border-white/15 hover:text-[#E8E2D8]/45 transition-all duration-150 cursor-pointer">
                    <Icon />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
          <div className="h-px bg-white/[0.04]" />
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-[#E8E2D8]/14 text-[10px] tracking-wide">© 2026 DRONE DE CIEL · Made In France</p>
            <p className="text-[#E8E2D8]/14 text-[10px] tracking-wide">www.dronedeciel.show</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
