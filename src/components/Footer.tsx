import Link from 'next/link'

const links = [
  { href: '/',             label: 'Accueil' },
  { href: '/services',    label: 'Services' },
  { href: '/realisations', label: 'Réalisations' },
  { href: '/a-propos',   label: 'À propos' },
  { href: '/contact',    label: 'Contact' },
]

export function Footer() {
  return (
    <footer className="py-12" style={{ background: 'var(--green-deep)' }}>
      <div className="container flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <p className="text-sm font-light tracking-wide" style={{ color: 'var(--beige-sand)' }}>
            S.D.S Espaces Verts
          </p>
          <p className="text-xs font-light mt-1" style={{ color: 'rgba(232,221,200,0.5)' }}>
            Betti Sébastien · Paysagiste
          </p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-[0.6rem] tracking-[0.2em] uppercase font-medium hover:opacity-50"
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
