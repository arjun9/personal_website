import { getNavigationContent, getSiteSettingsContent } from '@/lib/keystatic'
import { ConditionalLayout } from '@/components/ConditionalLayout'

export interface NavigationItem {
  label: string
  href: string
  order: number
}

interface LayoutWrapperProps {
  children: React.ReactNode
}

export async function LayoutWrapper({ children }: LayoutWrapperProps) {
  let navigation: NavigationItem[] = []
  let avatarImage = '/images/avatarImage.png' // Default fallback
  
  try {
    const [navigationData, siteSettings] = await Promise.all([
      getNavigationContent(),
      getSiteSettingsContent()
    ])
    
    // Handle navigation data
    if (navigationData?.headerNavigation) {
      // Create a new array from the readonly array, map to ensure order is number, and sort it
      navigation = [...navigationData.headerNavigation]
        .map(item => ({
          label: item.label,
          href: item.href,
          order: item.order || 0
        }))
        .sort((a, b) => a.order - b.order)
    }
    
    // Handle avatar image
    if (siteSettings?.avatarImage) {
      avatarImage = siteSettings.avatarImage
    }
  } catch (error) {
    console.warn('Failed to load content data, using defaults:', error)
    // Fallback to empty navigation (single page site)
    navigation = []
  }

  return <ConditionalLayout navigation={navigation} avatarImage={avatarImage}>{children}</ConditionalLayout>
}
