import { getNavigationContent } from '@/lib/keystatic'
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
  
  try {
    const navigationData = await getNavigationContent()
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
  } catch (error) {
    console.warn('Failed to load navigation data, using defaults:', error)
    // Fallback to default navigation
    navigation = [
      { label: 'About', href: '/about', order: 1 },
      { label: 'Articles', href: '/articles', order: 2 },
      { label: 'FOSS', href: '/projects', order: 3 },
      { label: 'Products', href: '/products', order: 4 },
    ]
  }

  return <ConditionalLayout navigation={navigation}>{children}</ConditionalLayout>
}
