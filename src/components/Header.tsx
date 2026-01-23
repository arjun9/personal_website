'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import clsx from 'clsx'

import { Container } from '@/components/Container'

export interface NavigationItem {
  label: string
  href: string
  order: number
}

function SunIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M8 12.25A4.25 4.25 0 0 1 12.25 8v0a4.25 4.25 0 0 1 4.25 4.25v0a4.25 4.25 0 0 1-4.25 4.25v0A4.25 4.25 0 0 1 8 12.25v0Z" />
      <path
        d="M12.25 3v1.5M21.5 12.25H20M18.791 18.791l-1.06-1.06M18.791 5.709l-1.06 1.06M12.25 20v1.5M4.5 12.25H3M6.77 6.77 5.709 5.709M6.77 17.73l-1.061 1.061"
        fill="none"
      />
    </svg>
  )
}

function MoonIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function NavItem({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  let isActive = usePathname() === href

  return (
    <li>
      <Link
        href={href}
        className={clsx(
          'relative block px-3 py-2 transition',
          isActive
            ? 'text-green-500 dark:text-green-400'
            : 'hover:text-green-500 dark:hover:text-green-400',
        )}
      >
        {children}
        {isActive && (
          <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-green-500/0 via-green-500/40 to-green-500/0 dark:from-green-400/0 dark:via-green-400/40 dark:to-green-400/0" />
        )}
      </Link>
    </li>
  )
}

function DesktopNavigation({ 
  navigation,
  ...props 
}: React.ComponentPropsWithoutRef<'nav'> & {
  navigation: NavigationItem[]
}) {
  return (
    <nav {...props}>
      <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
        {navigation.map((item) => (
          <NavItem key={item.href} href={item.href}>
            {item.label}
          </NavItem>
        ))}
      </ul>
    </nav>
  )
}

function ThemeToggle() {
  let { resolvedTheme, setTheme } = useTheme()
  let otherTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
  let [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <button
      type="button"
      aria-label={mounted ? `Switch to ${otherTheme} theme` : 'Toggle theme'}
      className="group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
      onClick={() => setTheme(otherTheme)}
    >
      <SunIcon className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-green-50 [@media(prefers-color-scheme:dark)]:stroke-green-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-green-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-green-600" />
      <MoonIcon className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 [@media_not_(prefers-color-scheme:dark)]:fill-green-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-green-500" />
    </button>
  )
}

function AvatarContainer({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={clsx(
        className,
        'h-12 w-12 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 backdrop-blur dark:bg-zinc-800/90',
      )}
      {...props}
    />
  )
}

function Avatar({
  className,
  avatarImage,
  showRing = false,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof Link>, 'href'> & {
  avatarImage: string
  showRing?: boolean
}) {
  return (
    <Link
      href="/"
      aria-label="Home"
      className={clsx(className, 'pointer-events-auto')}
      {...props}
    >
      <Image
        src={avatarImage}
        alt="arjun_verma"
        width={44}
        height={44}
        sizes="2.75rem"
        className={clsx(
          'h-11 w-11 rounded-full bg-zinc-100 object-cover dark:bg-zinc-800',
          showRing && 'p-0.5 ring-2 ring-emerald-600 dark:ring-emerald-400',
        )}
        priority
      />
    </Link>
  )
}

export function Header({ 
  navigation, 
  avatarImage 
}: { 
  navigation: NavigationItem[]
  avatarImage: string 
}) {
  return (
    <header className="pointer-events-none relative z-50 flex flex-none flex-col">
      <div className="top-0 z-10 h-16 pt-3">
        <Container className="w-full">
          <div className="relative flex gap-4">
            <div className="flex flex-1">
              <AvatarContainer>
                <Avatar avatarImage={avatarImage} showRing />
              </AvatarContainer>
            </div>
            <div className="flex flex-1 justify-end md:justify-center">
              <DesktopNavigation 
                navigation={navigation}
                className="pointer-events-auto hidden md:block" 
              />
            </div>
            <div className="flex justify-end md:flex-1">
              <div className="pointer-events-auto">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  )
}
