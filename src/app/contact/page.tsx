'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Phone, Mail, ArrowRight, Leaf } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import gsap from 'gsap'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const formRef   = useRef<HTMLFormElement>(null)
  const submitRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const formEl = formRef.current
    if (!formEl) return

    const cleanups: (() => void)[] = []
    formEl.querySelectorAll<HTMLElement>('input, textarea').forEach(input => {
      const line = input.parentElement?.querySelector<HTMLElement>('.field-line')
      if (!line) return

      const onFocus = () =>
        gsap.to(line, { scaleX: 1, duration: 0.4, ease: 'power3.out', transformOrigin: 'left' })
      const onBlur = () => {
        if (!(input as HTMLInputElement).value)
          gsap.to(line, { scaleX: 0, duration: 0.3, ease: 'power3.in', transformOrigin: 'right' })
      }

      input.addEventListener('focus', onFocus)
      input.addEventListener('blur',  onBlur)
      cleanups.push(() => {
        input.removeEventListener('focus', onFocus)
        input.removeEventListener('blur',  onBlur)
      })
    })

    return () => cleanups.forEach(fn => fn())
  }, [sent])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const btn = submitRef.current
    if (!btn) return setSent(true)

    gsap.timeline()
      .to(btn, { scale: 0.94, duration: 0.12, ease: 'power2.in' })
      .to(btn, { scale: 1.04, duration: 0.12, ease: 'power2.out' })
      .to(btn, { scale: 1,    duration: 0.08, onComplete: () => setSent(true) })
  }

  const fieldClass = "w-full px-0 py-3 bg-transparent text-sm font-light outline-none placeholder:font-light placeholder:opacity-50"
  const fieldStyle = { color: 'var(--green-deep)' }

  function Field({ children }: { children: React.ReactNode }) {
    return (
      <div className="relative">
        {children}
        {/* Static bottom border */}
        <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: 'rgba(31,61,43,0.2)' }} />
        {/* Animated overlay line */}
        <div
          className="field-line absolute bottom-0 left-0 h-px w-full"
          style={{ background: 'var(--green-deep)', transform: 'scaleX(0)', transformOrigin: 'left' }}
        />
      </div>
    )
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="label" style={{ color: 'var(--green-olive)' }}>Nous joindre</span>
            <h1 className="text-5xl md:text-6xl font-light italic mt-2" style={{ color: 'var(--off-white)' }}>
              Contact
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="pb-24" style={{ background: 'var(--off-white)', paddingTop: '80px' }}>
        <div className="container">
          <div className="grid md:grid-cols-2 gap-20">
            {/* Info */}
            <Reveal>
              <span className="label">Coordonnées</span>
              <h2 className="text-3xl md:text-4xl font-light italic mb-8" style={{ color: 'var(--green-deep)' }}>
                Parlons de<br />votre projet
              </h2>
              <div className="divider mb-10" />

              <div className="flex flex-col gap-6">
                <a href="tel:0609714976" className="flex items-center gap-5 group">
                  <div
                    className="w-10 h-10 flex items-center justify-center shrink-0"
                    style={{ border: '1px solid var(--beige-sand)', background: 'var(--beige-sand)' }}
                  >
                    <Phone size={13} style={{ color: 'var(--green-deep)' }} />
                  </div>
                  <div>
                    <p className="text-[0.6rem] tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--green-olive)' }}>
                      Téléphone
                    </p>
                    <p className="text-sm font-light group-hover:opacity-60" style={{ color: 'var(--green-deep)', transition: 'opacity 0.3s' }}>
                      06.09.71.49.76
                    </p>
                  </div>
                </a>

                <a href="mailto:sbetti83@aol.com" className="flex items-center gap-5 group">
                  <div
                    className="w-10 h-10 flex items-center justify-center shrink-0"
                    style={{ border: '1px solid var(--beige-sand)', background: 'var(--beige-sand)' }}
                  >
                    <Mail size={13} style={{ color: 'var(--green-deep)' }} />
                  </div>
                  <div>
                    <p className="text-[0.6rem] tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--green-olive)' }}>
                      Email
                    </p>
                    <p className="text-sm font-light group-hover:opacity-60" style={{ color: 'var(--green-deep)', transition: 'opacity 0.3s' }}>
                      sbetti83@aol.com
                    </p>
                  </div>
                </a>
              </div>

              <div className="mt-12">
                <Link href="/services" className="btn btn-outline">
                  Voir nos services
                </Link>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={0.15}>
              {sent ? (
                <div className="flex flex-col items-start justify-center h-full gap-4">
                  <div className="w-12 h-12 flex items-center justify-center" style={{ background: 'var(--beige-sand)' }}>
                    <Leaf size={18} style={{ color: 'var(--green-olive)' }} />
                  </div>
                  <h3 className="text-2xl font-light italic" style={{ color: 'var(--green-deep)' }}>
                    Message envoyé
                  </h3>
                  <p className="text-sm font-light" style={{ color: 'rgba(31,61,43,0.6)' }}>
                    Nous vous répondrons dans les plus brefs délais.
                  </p>
                  <button onClick={() => setSent(false)} className="btn btn-outline mt-4">
                    Nouveau message
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8">
                  <Field>
                    <input
                      type="text" placeholder="Votre nom" required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className={fieldClass} style={fieldStyle}
                    />
                  </Field>
                  <Field>
                    <input
                      type="email" placeholder="Votre email" required
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className={fieldClass} style={fieldStyle}
                    />
                  </Field>
                  <Field>
                    <input
                      type="tel" placeholder="Votre téléphone (optionnel)"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      className={fieldClass} style={fieldStyle}
                    />
                  </Field>
                  <Field>
                    <textarea
                      placeholder="Décrivez votre projet..." required rows={4}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className={`${fieldClass} resize-none`} style={fieldStyle}
                    />
                  </Field>
                  <button ref={submitRef} type="submit" className="btn btn-solid self-start">
                    Envoyer le message <ArrowRight size={12} />
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
