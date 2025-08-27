'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

// Extend Window interface to include gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string,
      config?: Record<string, any>
    ) => void
    dataLayer: any[]
  }
}

interface GoogleAnalyticsProps {
  GA_MEASUREMENT_ID?: string
}

export default function GoogleAnalytics({ 
  GA_MEASUREMENT_ID
}: GoogleAnalyticsProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (GA_MEASUREMENT_ID && typeof window !== 'undefined' && window.gtag) {
      // Track page views for dynamic routes
      const url = pathname + searchParams.toString()
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
        page_title: document.title,
        page_location: window.location.origin + url,
      })
    }
  }, [pathname, searchParams, GA_MEASUREMENT_ID])

  if (!GA_MEASUREMENT_ID) {
    return null
  }

  return (
    <>
      {/* Google Analytics 4 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href,
            send_page_view: false, // We'll handle page views manually for dynamic routes
          });
        `}
      </Script>
    </>
  )
}
