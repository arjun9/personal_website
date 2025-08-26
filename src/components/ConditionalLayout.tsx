'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { Layout } from '@/components/Layout'

export interface NavigationItem {
  label: string
  href: string
  order: number
}

interface ConditionalLayoutProps {
  children: React.ReactNode
  navigation: NavigationItem[]
}

export function ConditionalLayout({ children, navigation }: ConditionalLayoutProps) {
  const pathname = usePathname()
  const isKeystatic = pathname?.startsWith('/keystatic')
  
  // Update body classes based on the route
  useEffect(() => {
    if (isKeystatic) {
      document.body.className = 'h-full'
    } else {
      document.body.className = 'flex h-full bg-zinc-50 dark:bg-black'
    }
  }, [isKeystatic])
  
  // If we're on a Keystatic route, don't wrap with the main layout
  if (isKeystatic) {
    return <div className="h-full w-full">{children}</div>
  }
  
  // For all other routes, use the main layout
  return (
    <div className="flex w-full">
      <Layout navigation={navigation}>{children}</Layout>
    </div>
  )
}
