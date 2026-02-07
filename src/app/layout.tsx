import type { Metadata, Viewport } from 'next'
import { Inter, Nunito } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const nunito = Nunito({ 
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Duolingo Clone - Learn Languages for Free',
  description: 'The best way to learn a language. Fun, effective, and 100% free.',
  keywords: ['language learning', 'education', 'spanish', 'duolingo clone'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${nunito.variable}`}>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  )
}
