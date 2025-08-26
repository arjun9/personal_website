import { type Metadata } from 'next'

import { Providers } from '@/app/providers'
import { ConditionalLayout } from '@/components/ConditionalLayout'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: '%s - Arjun Verma',
    default:
      'Arjun Verma - Software engineer, founder, and amateur philosopher',
  },
  description:
    'I’m Arjun, a software engineer and entrepreneur based in Gurgaon, India. I’m the founder and CTO of Hetu Labs, where we develop technologies that empower SMBs to grow their business online.',
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
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
      <body>
        <Providers>
          <ConditionalLayout>{children}</ConditionalLayout>
        </Providers>
      </body>
    </html>
  )
}
