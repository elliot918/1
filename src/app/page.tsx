'use client'

import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { LenisProvider } from '@/components/LenisProvider'
import { Phone, Mail, ArrowRight, Scissors, Droplets, Leaf, Mountain, Sprout, ChevronDown } from 'lucide-react'

/* ─── Fade-in wrapper ─── */
function FadeIn({
  children,
  delay = 0,
  className = '',
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
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Section label ─── */
function Label({ text }: { text: string }) {
  return (
    <span
      className="inline-block text-xs tracking-[0.25em] uppercase mb-6"
      style={{ color: 'var(--green-olive)' }}
    >
      {text}
    </span>
  )
}

/* ─── Divider ─── */
function Divider() {
  return (
    <div className="flex items-center gap-4 my-2">
      <div className="h-px flex-1" style={{ background: 'var(--beige-sand)' }} />
      <div className="w-1 h-1 rounded-full" style={{ background: 'var(--green-olive)' }} />
      <div className="h-px flex-1" style={{ background: 'var(--beige-sand)' }} />
    </div>
  )
}

/* ─── Nav ─── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const fg = scrolled ? 'var(--green-deep)' : 'var(--off-white)'
  const bg = scrolled ? 'rgba(248,245,239,0.95)' : 'transparent'

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-5 flex items-center justify-between transition-all duration-500"
      style={{ background: bg, backdropFilter: scrolled ? 'blur(12px)' : 'none' }}
    >
      <a href="#" className="text-sm tracking-[0.2em] uppercase font-light transition-colors duration-500" style={{ color: fg }}>
        S.D.S Espaces Verts
      </a>
      <div className="hidden md:flex items-center gap-8">
        {['#services', '#realisations', '#apropos', '#contact'].map((href, i) => (
          <a
            key={href}
            href={href}
            className="text-xs tracking-[0.2em] uppercase font-light transition-all duration-500 hover:opacity-60"
            style={{ color: fg }}
          >
            {['Services', 'Réalisations', 'À propos', 'Contact'][i]}
          </a>
        ))}
      </div>
    </nav>
  )
}

/* ─── Hero ─── */
function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative h-screen min-h-[600px] overflow-hidden flex items-center justify-center">
      <motion.div className="absolute inset-0 scale-110" style={{ y }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: 'easeOut' }}
        >
          <Image
            src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1920&q=85&fit=crop"
            alt="Jardin paysager de luxe"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </motion.div>

      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(31,61,43,0.55) 0%, rgba(31,61,43,0.3) 50%, rgba(31,61,43,0.65) 100%)' }}
      />

      <motion.div style={{ opacity }} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xs tracking-[0.3em] uppercase mb-6"
          style={{ color: 'var(--beige-sand)' }}
        >
          S.D.S Espaces Verts
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-light italic"
          style={{ color: 'var(--off-white)', fontFamily: 'var(--font-cormorant)' }}
        >
          Création et entretien<br />de jardins durables
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="w-16 h-px mx-auto my-8"
          style={{ background: 'var(--beige-sand)' }}
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#contact"
            className="px-8 py-4 text-sm tracking-[0.15em] uppercase transition-opacity hover:opacity-80"
            style={{ background: 'var(--green-deep)', color: 'var(--off-white)' }}
          >
            Demander un devis
          </a>
          <a
            href="#services"
            className="px-8 py-4 text-sm tracking-[0.15em] uppercase border transition-all hover:bg-white/10"
            style={{ borderColor: 'var(--off-white)', color: 'var(--off-white)' }}
          >
            Découvrir les services
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: 'var(--beige-sand)' }}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase">Défiler</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ─── Introduction ─── */
function Introduction() {
  return (
    <section id="intro" className="py-32 px-6" style={{ background: 'var(--off-white)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <Label text="Notre engagement" />
            <h2 className="text-4xl md:text-5xl font-light italic mb-8" style={{ color: 'var(--green-deep)' }}>
              Un regard sensible<br />sur chaque espace
            </h2>
            <Divider />
            <p className="mt-8 text-base leading-relaxed font-light" style={{ color: 'var(--green-deep)', opacity: 0.75 }}>
              Chez S.D.S Espaces Verts, chaque jardin est une œuvre vivante. Nous conjuguons savoir-faire technique
              et sensibilité esthétique pour concevoir des espaces qui respirent, qui évoluent avec les saisons,
              et qui s'inscrivent harmonieusement dans leur environnement.
            </p>
            <p className="mt-4 text-base leading-relaxed font-light" style={{ color: 'var(--green-deep)', opacity: 0.75 }}>
              Du petit jardin privé au grand parc, notre approche reste la même : écouter, concevoir, réaliser
              avec soin et accompagner dans la durée.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=85&fit=crop"
                alt="Allée de jardin paysager"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

/* ─── Services ─── */
const services = [
  {
    icon: Mountain,
    title: 'Création de jardins',
    description: 'Conception et réalisation complète de votre jardin, du terrassement à la plantation. Nous donnons vie à vos espaces extérieurs selon vos envies et votre budget.',
  },
  {
    icon: Scissors,
    title: 'Entretien régulier',
    description: 'Prestations d\'entretien sur mesure pour maintenir votre jardin dans un état impeccable tout au long de l\'année. Tonte, désherbage, débroussaillage.',
  },
  {
    icon: Scissors,
    title: 'Taille et élagage',
    description: 'Taille soignée de vos haies, arbustes et arbres. Nous respectons les cycles végétaux pour favoriser une croissance saine et une silhouette harmonieuse.',
  },
  {
    icon: Sprout,
    title: 'Amendement des sols',
    description: 'Analyse et amélioration de la qualité de vos sols pour offrir à vos plantes les meilleures conditions de développement. Compostage, apport organique.',
  },
  {
    icon: Droplets,
    title: 'Systèmes d\'arrosage',
    description: 'Installation et programmation de systèmes d\'arrosage automatique économes en eau. Goutte-à-goutte, asperseurs, gestion intelligente selon la météo.',
  },
  {
    icon: Leaf,
    title: 'Pratiques respectueuses',
    description: 'Engagement fort pour l\'environnement : zéro pesticide, favorisation de la biodiversité, choix d\'espèces locales et résistantes à la sécheresse.',
  },
]

function Services() {
  return (
    <section id="services" className="py-32 px-6" style={{ background: 'var(--green-deep)' }}>
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-20">
          <Label text="Nos services" />
          <h2 className="text-4xl md:text-6xl font-light italic" style={{ color: 'var(--off-white)' }}>
            Des prestations complètes,<br />au service de votre jardin
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'rgba(248,245,239,0.08)' }}>
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <FadeIn key={service.title} delay={i * 0.08}>
                <div className="p-10 group" style={{ background: 'var(--green-deep)' }}>
                  <div
                    className="w-10 h-10 flex items-center justify-center mb-6 rounded-full"
                    style={{ border: '1px solid rgba(111,127,82,0.4)' }}
                  >
                    <Icon size={16} style={{ color: 'var(--green-olive)' }} />
                  </div>
                  <h3
                    className="text-2xl font-light italic mb-4"
                    style={{ color: 'var(--beige-sand)', fontFamily: 'var(--font-cormorant)' }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed font-light" style={{ color: 'rgba(248,245,239,0.55)' }}>
                    {service.description}
                  </p>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─── Approche ─── */
function Approche() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ minHeight: '70vh' }}>
      <motion.div className="absolute inset-0 scale-110" style={{ y }}>
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=85&fit=crop"
          alt="Jardin naturel paysager"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, rgba(31,61,43,0.88) 0%, rgba(31,61,43,0.5) 100%)' }}
      />

      <div className="relative z-10 flex items-center min-h-[70vh] px-6 py-32">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <Label text="Notre approche" />
            <h2 className="text-4xl md:text-5xl font-light italic mb-8" style={{ color: 'var(--off-white)' }}>
              L'art du jardin<br />dans sa globalité
            </h2>
            <div className="h-px w-12 mb-8" style={{ background: 'var(--green-olive)' }} />
            <p className="text-base leading-relaxed font-light mb-4" style={{ color: 'rgba(248,245,239,0.8)' }}>
              Notre philosophie repose sur une écoute attentive de vos besoins et une lecture précise du terrain.
              Chaque intervention est pensée dans le respect du vivant : nous privilégions les essences locales,
              limitons l'usage de l'eau et favorisons la biodiversité.
            </p>
            <p className="text-base leading-relaxed font-light" style={{ color: 'rgba(248,245,239,0.8)' }}>
              De la première esquisse au suivi saisonnier, nous sommes à vos côtés pour que votre jardin
              devienne un véritable prolongement de votre intérieur.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="space-y-8">
              {[
                ['01', 'Écoute & conception', 'Nous analysons votre espace et vos envies pour créer un projet sur mesure.'],
                ['02', 'Réalisation soignée', 'Chaque détail est exécuté avec précision et respect des végétaux.'],
                ['03', 'Suivi dans le temps', 'Nous assurons un accompagnement durable pour que votre jardin s\'épanouisse.'],
              ].map(([num, title, desc]) => (
                <div key={num} className="flex gap-6">
                  <span className="text-3xl font-light shrink-0" style={{ color: 'var(--green-olive)', fontFamily: 'var(--font-cormorant)' }}>{num}</span>
                  <div>
                    <h4 className="text-xl font-light mb-1" style={{ color: 'var(--beige-sand)', fontFamily: 'var(--font-cormorant)' }}>{title}</h4>
                    <p className="text-sm font-light leading-relaxed" style={{ color: 'rgba(248,245,239,0.65)' }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

/* ─── Réalisations ─── */
const photos = [
  { src: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80&fit=crop', alt: 'Jardin planté' },
  { src: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&q=80&fit=crop', alt: 'Conception de jardin' },
  { src: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=80&fit=crop', alt: 'Plantation soignée' },
  { src: 'https://images.unsplash.com/photo-1526397751294-331021109fbd?w=800&q=80&fit=crop', alt: 'Art de la taille' },
  { src: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&q=80&fit=crop', alt: 'Arbre remarquable' },
  { src: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80&fit=crop', alt: 'Chemin de jardin' },
]

function Realisations() {
  return (
    <section id="realisations" className="py-32 px-6" style={{ background: 'var(--off-white)' }}>
      <div className="max-w-6xl mx-auto">
        <FadeIn className="mb-20">
          <Label text="Réalisations" />
          <h2 className="text-4xl md:text-6xl font-light italic" style={{ color: 'var(--green-deep)' }}>
            Des espaces créés<br />avec passion
          </h2>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {photos.map((photo, i) => (
            <FadeIn key={photo.src} delay={i * 0.06}>
              <div className={`relative overflow-hidden group ${i === 0 ? 'col-span-2 md:col-span-1' : ''} aspect-square`}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4"
                  style={{ background: 'linear-gradient(to top, rgba(31,61,43,0.7), transparent)' }}
                >
                  <span className="text-sm font-light" style={{ color: 'var(--off-white)' }}>{photo.alt}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── À propos ─── */
function APropos() {
  return (
    <section id="apropos" className="py-32 px-6" style={{ background: 'var(--beige-sand)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeIn delay={0.1}>
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=85&fit=crop"
                alt="Paysage naturel verdoyant"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </FadeIn>

          <FadeIn>
            <Label text="À propos" />
            <h2 className="text-4xl md:text-5xl font-light italic mb-6" style={{ color: 'var(--green-deep)' }}>
              Betti Sébastien,<br />paysagiste passionné
            </h2>
            <Divider />
            <p className="mt-8 text-base leading-relaxed font-light" style={{ color: 'var(--green-deep)', opacity: 0.8 }}>
              Fort d'une expérience de terrain et d'une passion profonde pour le végétal, Betti Sébastien fonde
              S.D.S Espaces Verts avec une conviction : chaque jardin mérite une attention singulière.
            </p>
            <p className="mt-4 text-base leading-relaxed font-light" style={{ color: 'var(--green-deep)', opacity: 0.8 }}>
              Artisan du paysage, il intervient auprès de particuliers et de professionnels dans le respect
              des végétaux, du sol et de l'environnement. Son approche combine exigence technique et sens
              esthétique pour des résultats durables et harmonieux.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a
                href="tel:0609714976"
                className="flex items-center gap-2 text-sm tracking-wide transition-opacity hover:opacity-60"
                style={{ color: 'var(--green-deep)' }}
              >
                <Phone size={14} />
                <span>06.09.71.49.76</span>
              </a>
              <a
                href="mailto:sbetti83@aol.com"
                className="flex items-center gap-2 text-sm tracking-wide transition-opacity hover:opacity-60"
                style={{ color: 'var(--green-deep)' }}
              >
                <Mail size={14} />
                <span>sbetti83@aol.com</span>
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

/* ─── Contact ─── */
function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  const inputBase = "w-full px-0 py-3 bg-transparent border-b text-sm font-light outline-none placeholder:font-light"

  return (
    <section id="contact" className="py-32 px-6" style={{ background: 'var(--off-white)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20">
          <FadeIn>
            <Label text="Contact" />
            <h2 className="text-4xl md:text-5xl font-light italic mb-8" style={{ color: 'var(--green-deep)' }}>
              Parlons de<br />votre projet
            </h2>
            <Divider />
            <p className="mt-8 text-base leading-relaxed font-light mb-12" style={{ color: 'var(--green-deep)', opacity: 0.7 }}>
              Vous souhaitez créer ou faire entretenir votre jardin ? Contactez-nous pour un devis gratuit et
              sans engagement. Nous intervenons dans le Var et ses alentours.
            </p>
            <div className="space-y-6">
              <a href="tel:0609714976" className="flex items-center gap-4 group">
                <div className="w-10 h-10 flex items-center justify-center rounded-full" style={{ background: 'var(--beige-sand)' }}>
                  <Phone size={14} style={{ color: 'var(--green-deep)' }} />
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase mb-0.5" style={{ color: 'var(--green-olive)' }}>Téléphone</p>
                  <p className="text-base font-light group-hover:opacity-60 transition-opacity" style={{ color: 'var(--green-deep)' }}>06.09.71.49.76</p>
                </div>
              </a>
              <a href="mailto:sbetti83@aol.com" className="flex items-center gap-4 group">
                <div className="w-10 h-10 flex items-center justify-center rounded-full" style={{ background: 'var(--beige-sand)' }}>
                  <Mail size={14} style={{ color: 'var(--green-deep)' }} />
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase mb-0.5" style={{ color: 'var(--green-olive)' }}>Email</p>
                  <p className="text-base font-light group-hover:opacity-60 transition-opacity" style={{ color: 'var(--green-deep)' }}>sbetti83@aol.com</p>
                </div>
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: 'var(--beige-sand)' }}>
                  <Leaf size={24} style={{ color: 'var(--green-olive)' }} />
                </div>
                <h3 className="text-2xl font-light italic mb-3" style={{ color: 'var(--green-deep)' }}>Message envoyé</h3>
                <p className="text-sm font-light" style={{ color: 'var(--green-deep)', opacity: 0.65 }}>
                  Nous vous répondrons dans les plus brefs délais.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <input
                  type="text"
                  placeholder="Votre nom"
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className={inputBase}
                  style={{ borderColor: 'rgba(31,61,43,0.2)', color: 'var(--green-deep)' }}
                />
                <input
                  type="email"
                  placeholder="Votre email"
                  required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className={inputBase}
                  style={{ borderColor: 'rgba(31,61,43,0.2)', color: 'var(--green-deep)' }}
                />
                <input
                  type="tel"
                  placeholder="Votre téléphone (optionnel)"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className={inputBase}
                  style={{ borderColor: 'rgba(31,61,43,0.2)', color: 'var(--green-deep)' }}
                />
                <textarea
                  placeholder="Décrivez votre projet..."
                  required
                  rows={4}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className={`${inputBase} resize-none`}
                  style={{ borderColor: 'rgba(31,61,43,0.2)', color: 'var(--green-deep)' }}
                />
                <button
                  type="submit"
                  className="flex items-center gap-3 text-sm tracking-[0.15em] uppercase px-8 py-4 transition-opacity hover:opacity-80"
                  style={{ background: 'var(--green-deep)', color: 'var(--off-white)' }}
                >
                  Envoyer le message
                  <ArrowRight size={14} />
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="py-12 px-6" style={{ background: 'var(--green-deep)' }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-sm font-light tracking-wide" style={{ color: 'var(--beige-sand)' }}>S.D.S Espaces Verts</p>
          <p className="text-xs font-light mt-1" style={{ color: 'rgba(232,221,200,0.5)' }}>Betti Sébastien · Paysagiste</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {[['#intro', 'Introduction'], ['#services', 'Services'], ['#realisations', 'Réalisations'], ['#apropos', 'À propos'], ['#contact', 'Contact']].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="text-xs tracking-[0.15em] uppercase transition-opacity hover:opacity-50"
              style={{ color: 'var(--beige-sand)' }}
            >
              {label}
            </a>
          ))}
        </div>
        <p className="text-xs font-light" style={{ color: 'rgba(232,221,200,0.4)' }}>
          © {new Date().getFullYear()} S.D.S Espaces Verts
        </p>
      </div>
    </footer>
  )
}

/* ─── Sticky phone (mobile only) ─── */
function StickyPhone() {
  return (
    <a
      href="tel:0609714976"
      className="fixed bottom-6 right-6 z-50 md:hidden flex items-center gap-2 px-5 py-3 shadow-xl transition-opacity hover:opacity-90"
      style={{ background: 'var(--green-deep)', color: 'var(--off-white)' }}
      aria-label="Appeler S.D.S Espaces Verts"
    >
      <Phone size={16} />
      <span className="text-sm font-light tracking-wide">06.09.71.49.76</span>
    </a>
  )
}

/* ─── Root ─── */
export default function Home() {
  return (
    <LenisProvider>
      <Nav />
      <main>
        <Hero />
        <Introduction />
        <Services />
        <Approche />
        <Realisations />
        <APropos />
        <Contact />
      </main>
      <Footer />
      <StickyPhone />
    </LenisProvider>
  )
}
