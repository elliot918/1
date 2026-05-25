import Link from 'next/link'

const links = [
  { href: '/',              label: 'Accueil' },
  { href: '/services',     label: 'Services' },
  { href: '/realisations', label: 'Réalisations' },
  { href: '/a-propos',    label: 'À propos' },
  { href: '/contact',     label: 'Contact' },
]

export function Footer() {
  return (
    <footer className="mt-24 py-10" style={{ background: 'var(--green-deep)' }}>
      <div className="container flex flex-col items-center gap-8 text-center">
        <p
          className="text-base tracking-[0.28em] uppercase font-semibold"
          style={{ color: 'var(--beige-sand)' }}
        >
          S.D.S Espaces Verts
        </p>

        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-[0.6rem] tracking-[0.22em] uppercase font-medium hover:opacity-50"
              style={{ color: 'var(--beige-sand)', transition: 'opacity 0.3s' }}
            >
              {label}
            </Link>
          ))}
        </nav>

        <p className="text-[0.6rem] font-light" style={{ color: 'rgba(232,221,200,0.35)' }}>
          © {new Date().getFullYear()} S.D.S Espaces Verts
        </p>
      </div>
    </footer>
  )
}
