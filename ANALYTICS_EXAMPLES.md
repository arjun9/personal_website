# Google Analytics Usage Examples

This file shows practical examples of how to use the Google Analytics tracking functions in your components and pages.

## Basic Button Tracking

```tsx
import { Button } from '@/components/Button'

// Track button clicks with analytics
<Button 
  trackClick={true} 
  analyticsLabel="contact_form_submit"
  onClick={() => handleSubmit()}
>
  Submit Form
</Button>

// Track navigation buttons
<Button 
  href="/about" 
  trackClick={true} 
  analyticsLabel="nav_about_page"
>
  About
</Button>
```

## Custom Event Tracking

```tsx
import { trackEvent, trackEngagement, trackBusiness } from '@/lib/analytics'

// Track custom events
const handleDownload = (fileName: string) => {
  trackEngagement.download(fileName, 'pdf')
  // Your download logic here
}

// Track form submissions
const handleContactSubmit = (formData: any) => {
  trackEngagement.formSubmit('contact_form', 'contact_page')
  // Your form submission logic here
}

// Track article reads
const handleArticleView = (articleTitle: string) => {
  trackBusiness.articleRead(articleTitle, 'technology')
}

// Track social media clicks
const handleSocialClick = (platform: string) => {
  trackEngagement.socialClick(platform, 'home_page')
}
```

## Page-Specific Tracking

### Home Page
```tsx
// src/app/page.tsx
'use client'
import { useEffect } from 'react'
import { trackBusiness } from '@/lib/analytics'

export default function HomePage() {
  useEffect(() => {
    // Track home page view
    trackBusiness.serviceInquiry('home_page_visit', 'organic')
  }, [])

  return (
    <div>
      {/* Your home page content */}
    </div>
  )
}
```

### Articles Page
```tsx
// src/app/articles/page.tsx
'use client'
import { useEffect } from 'react'
import { trackBusiness } from '@/lib/analytics'

export default function ArticlesPage() {
  useEffect(() => {
    // Track articles page view
    trackBusiness.articleRead('articles_listing', 'content_discovery')
  }, [])

  return (
    <div>
      {/* Your articles listing */}
    </div>
  )
}
```

### Individual Article
```tsx
// src/app/articles/[slug]/page.tsx
'use client'
import { useEffect } from 'react'
import { trackBusiness } from '@/lib/analytics'

export default function ArticlePage({ params }: { params: { slug: string } }) {
  useEffect(() => {
    // Track individual article read
    trackBusiness.articleRead(params.slug, 'article_page')
  }, [params.slug])

  return (
    <div>
      {/* Your article content */}
    </div>
  )
}
```

## Form Tracking

```tsx
// src/components/ContactForm.tsx
'use client'
import { trackEngagement } from '@/lib/analytics'

export default function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Track form submission
    trackEngagement.formSubmit('contact_form', 'contact_page')
    
    // Your form submission logic
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields */}
      <Button 
        type="submit" 
        trackClick={true} 
        analyticsLabel="contact_form_submit_button"
      >
        Send Message
      </Button>
    </form>
  )
}
```

## Navigation Tracking

```tsx
// src/components/Header.tsx
'use client'
import { trackEngagement } from '@/lib/analytics'

export default function Header() {
  const handleNavClick = (page: string) => {
    trackEngagement.linkClick(`nav_${page}`, `/${page}`)
  }

  return (
    <nav>
      <Link href="/" onClick={() => handleNavClick('home')}>
        Home
      </Link>
      <Link href="/about" onClick={() => handleNavClick('about')}>
        About
      </Link>
      <Link href="/articles" onClick={() => handleNavClick('articles')}>
        Articles
      </Link>
      <Link href="/projects" onClick={() => handleNavClick('projects')}>
        Projects
      </Link>
    </nav>
  )
}
```

## Social Media Tracking

```tsx
// src/components/SocialIcons.tsx
'use client'
import { trackEngagement } from '@/lib/analytics'

export default function SocialIcons() {
  const handleSocialClick = (platform: string, url: string) => {
    trackEngagement.socialClick(platform, 'social_sidebar')
    // Open social media link
    window.open(url, '_blank')
  }

  return (
    <div className="social-icons">
      <button 
        onClick={() => handleSocialClick('twitter', 'https://twitter.com/yourhandle')}
        className="twitter-icon"
      >
        Twitter
      </button>
      <button 
        onClick={() => handleSocialClick('linkedin', 'https://linkedin.com/in/yourprofile')}
        className="linkedin-icon"
      >
        LinkedIn
      </button>
      <button 
        onClick={() => handleSocialClick('github', 'https://github.com/yourusername')}
        className="github-icon"
      >
        GitHub
      </button>
    </div>
  )
}
```

## Scroll Depth Tracking

```tsx
// src/components/ScrollTracker.tsx
'use client'
import { useEffect, useState } from 'react'
import { trackEngagement } from '@/lib/analytics'

export default function ScrollTracker() {
  const [maxScrollDepth, setMaxScrollDepth] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = Math.round((scrollTop / docHeight) * 100)
      
      // Track scroll depth at 25%, 50%, 75%, and 100%
      if (scrollPercent >= 25 && maxScrollDepth < 25) {
        trackEngagement.scrollDepth(25)
        setMaxScrollDepth(25)
      } else if (scrollPercent >= 50 && maxScrollDepth < 50) {
        trackEngagement.scrollDepth(50)
        setMaxScrollDepth(50)
      } else if (scrollPercent >= 75 && maxScrollDepth < 75) {
        trackEngagement.scrollDepth(75)
        setMaxScrollDepth(75)
      } else if (scrollPercent >= 100 && maxScrollDepth < 100) {
        trackEngagement.scrollDepth(100)
        setMaxScrollDepth(100)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [maxScrollDepth])

  return null // This component doesn't render anything
}
```

## Time on Page Tracking

```tsx
// src/components/TimeTracker.tsx
'use client'
import { useEffect, useRef } from 'react'
import { trackEngagement } from '@/lib/analytics'

export default function TimeTracker() {
  const startTime = useRef(Date.now())

  useEffect(() => {
    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime.current) / 1000)
      trackEngagement.timeOnPage(timeSpent)
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  return null // This component doesn't render anything
}
```

## Debug and Testing

```tsx
// src/components/DebugAnalytics.tsx
'use client'
import { debugAnalytics } from '@/lib/analytics'

export default function DebugAnalytics() {
  if (process.env.NODE_ENV === 'development') {
    return (
      <button 
        onClick={debugAnalytics}
        className="fixed bottom-4 right-4 bg-red-500 text-white p-2 rounded"
      >
        Debug Analytics
      </button>
    )
  }
  
  return null
}
```

## Integration in Layout

```tsx
// src/app/layout.tsx
import ScrollTracker from '@/components/ScrollTracker'
import TimeTracker from '@/components/TimeTracker'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        <ScrollTracker />
        <TimeTracker />
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  )
}
```

## Best Practices

1. **Consistent Naming**: Use consistent naming conventions for your analytics labels
2. **Meaningful Categories**: Group related events into meaningful categories
3. **Avoid Over-tracking**: Don't track every single user interaction
4. **Privacy First**: Ensure you're not collecting personally identifiable information
5. **Test in Development**: Use the debug functions to verify tracking is working
6. **Document Events**: Keep a log of all events you're tracking

## Event Naming Convention

- **Page Views**: `page_view`
- **Button Clicks**: `button_click`
- **Form Submissions**: `form_submit`
- **Link Clicks**: `link_click`
- **Downloads**: `file_download`
- **Social Interactions**: `social_click`
- **Content Engagement**: `content_read`, `content_share`

## Categories

- **engagement**: User interactions with UI elements
- **navigation**: Page navigation and routing
- **content**: Content consumption and interaction
- **business**: Business-related actions and conversions
- **technical**: Technical events and errors
