'use client'

import { Phone } from 'lucide-react'

export function StickyPhone() {
  return (
    <a
      href="tel:0609714976"
      className="btn btn-solid fixed bottom-6 right-6 z-50 md:hidden shadow-lg"
      aria-label="Appeler S.D.S Espaces Verts"
    >
      <Phone size={14} />
      <span>06.09.71.49.76</span>
    </a>
  )
}
