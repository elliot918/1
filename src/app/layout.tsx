import type { Metadata } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import Script from 'next/script'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { StickyPhone } from '@/components/StickyPhone'
import { SmoothScroll } from '@/components/SmoothScroll'
import { Cursor } from '@/components/Cursor'
import './globals.css'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
})

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'S.D.S Espaces Verts — Création et entretien de jardins',
  description:
    'S.D.S Espaces Verts, création et entretien de parcs et jardins. Betti Sébastien, paysagiste. 06.09.71.49.76',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${manrope.variable}`}>
      <body>
        <Script id="scroll-progress" strategy="afterInteractive">{`
          var bar=document.createElement('div');
          bar.style.cssText='position:fixed;top:60px;left:0;height:3px;width:0%;background:#1F3D2B;z-index:9999;pointer-events:none';
          document.body.appendChild(bar);
          window.addEventListener('scroll',function(){
            var p=window.scrollY/(document.body.scrollHeight-window.innerHeight)*100;
            bar.style.width=p+'%';
          });
        `}</Script>
        <SmoothScroll />
        <Cursor />
        <Nav />
        <main>{children}</main>
        <Footer />
        <StickyPhone />
      </body>
    </html>
  )
}
