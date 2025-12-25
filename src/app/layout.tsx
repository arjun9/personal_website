import { type Metadata } from 'next'
import { Suspense } from 'react'
import { JetBrains_Mono, Inter } from 'next/font/google'

import { Providers } from '@/app/providers'
import { LayoutWrapper } from '@/components/LayoutWrapper'
import GoogleAnalytics from '@/components/GoogleAnalytics'

import '@/styles/tailwind.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s - Arjun Verma',
    default:
      'Arjun Verma - Software engineer, founder, and amateur philosopher',
  },
  description:
    'I\'m Arjun, a software engineer and entrepreneur based in Gurgaon, India. I\'m the founder and CTO of Hetu Labs, where we develop technologies that empower SMBs to grow their business online.',
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    title: 'Arjun Verma - Software engineer, founder, and amateur philosopher',
    description: 'I\'m Arjun, a software engineer and entrepreneur based in Gurgaon, India. I\'m the founder and CTO of Hetu Labs, where we develop technologies that empower SMBs to grow their business online.',
    siteName: 'Arjun Verma',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/portrait.jpeg`,
        width: 1200,
        height: 630,
        alt: 'Arjun Verma',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arjun Verma - Software engineer, founder, and amateur philosopher',
    description: 'I\'m Arjun, a software engineer and entrepreneur based in Gurgaon, India. I\'m the founder and CTO of Hetu Labs, where we develop technologies that empower SMBs to grow their business online.',
    creator: '@arjunverma841',
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/images/portrait.jpeg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`h-full antialiased ${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="font-sans bg-white dark:bg-zinc-900">
        <Suspense fallback={null}>
          <GoogleAnalytics 
            GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
          />
        </Suspense>
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  )
}
