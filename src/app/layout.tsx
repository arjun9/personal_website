import { type Metadata } from 'next'
import { Suspense } from 'react'
import { Inter } from 'next/font/google'

import { Providers } from '@/app/providers'
import { LayoutWrapper } from '@/components/LayoutWrapper'
import GoogleAnalytics from '@/components/GoogleAnalytics'

import '@/styles/tailwind.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s - Arjun Verma',
    default:
      'Arjun Verma - Building software that scales',
  },
  description:
    'Software engineer and entrepreneur based in Gurgaon, India. Co-founder of Hetu Labs, building software solutions for SMBs.',
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
    title: 'Arjun Verma - Building software that scales',
    description: 'Software engineer and entrepreneur based in Gurgaon, India. Co-founder of Hetu Labs, building software solutions for SMBs.',
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
    title: 'Arjun Verma - Building software that scales',
    description: 'Software engineer and entrepreneur based in Gurgaon, India. Co-founder of Hetu Labs, building software solutions for SMBs.',
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
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className={inter.className}>
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
