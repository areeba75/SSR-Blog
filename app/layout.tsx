// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
// import Navbar from '@/components/Navbar'
// import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NewsHub Pro - Real-time Global News',
  description: 'Stay informed with the latest breaking news from around the world. Powered by Next.js 13+ and real-time APIs.',
  keywords: 'news, breaking news, headlines, current events, world news',
  authors: [{ name: 'Areeba' }],
  openGraph: {
    title: 'NewsHub Pro',
    description: 'Real-time global news powered by Next.js',
    type: 'website',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 min-h-screen`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
