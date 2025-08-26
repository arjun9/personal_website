import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export interface NavigationItem {
  label: string
  href: string
  order: number
}

export function Layout({ 
  children, 
  navigation 
}: { 
  children: React.ReactNode
  navigation: NavigationItem[]
}) {
  return (
    <>
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>
      <div className="relative flex w-full flex-col">
        <Header navigation={navigation} />
        <main className="flex-auto">{children}</main>
        <Footer navigation={navigation} />
      </div>
    </>
  )
}
