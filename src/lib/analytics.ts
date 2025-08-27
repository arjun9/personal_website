// Google Analytics utility functions for custom event tracking

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string,
      config?: Record<string, any>
    ) => void
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track page views manually (if needed)
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
      page_title: title || document.title,
      page_location: window.location.origin + url,
    })
  }
}

// Track user engagement events
export const trackEngagement = {
  // Track button clicks
  buttonClick: (buttonName: string, page?: string) => {
    trackEvent('click', 'button', buttonName, undefined)
  },

  // Track form submissions
  formSubmit: (formName: string, page?: string) => {
    trackEvent('submit', 'form', formName, undefined)
  },

  // Track link clicks
  linkClick: (linkText: string, destination: string) => {
    trackEvent('click', 'link', `${linkText} -> ${destination}`, undefined)
  },

  // Track scroll depth
  scrollDepth: (depth: number, page?: string) => {
    trackEvent('scroll', 'engagement', `depth_${depth}`, depth)
  },

  // Track time on page
  timeOnPage: (seconds: number, page?: string) => {
    trackEvent('timing', 'engagement', page || 'unknown', seconds)
  },

  // Track downloads
  download: (fileName: string, fileType: string) => {
    trackEvent('download', 'file', `${fileName}.${fileType}`, undefined)
  },

  // Track video interactions
  videoInteraction: (action: 'play' | 'pause' | 'complete', videoName: string) => {
    trackEvent(action, 'video', videoName, undefined)
  },

  // Track social media clicks
  socialClick: (platform: string, page?: string) => {
    trackEvent('click', 'social', platform, undefined)
  },

  // Track newsletter signups
  newsletterSignup: (source: string) => {
    trackEvent('sign_up', 'newsletter', source, undefined)
  },

  // Track contact form submissions
  contactSubmit: (formType: string) => {
    trackEvent('submit', 'contact', formType, undefined)
  },
}

// Track business events
export const trackBusiness = {
  // Track product views
  productView: (productName: string, category?: string) => {
    trackEvent('view_item', 'ecommerce', productName, undefined)
  },

  // Track project views
  projectView: (projectName: string, category?: string) => {
    trackEvent('view_item', 'portfolio', projectName, undefined)
  },

  // Track article reads
  articleRead: (articleTitle: string, category?: string) => {
    trackEvent('read', 'content', articleTitle, undefined)
  },

  // Track service inquiries
  serviceInquiry: (serviceName: string, source: string) => {
    trackEvent('generate_lead', 'service', `${serviceName} - ${source}`, undefined)
  },
}

// Debug function for development
export const debugAnalytics = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Google Analytics Debug Info:')
    console.log('GA_MEASUREMENT_ID:', GA_MEASUREMENT_ID)
    console.log('gtag available:', typeof window !== 'undefined' && !!window.gtag)
    console.log('Current page:', typeof window !== 'undefined' ? window.location.href : 'N/A')
  }
}
