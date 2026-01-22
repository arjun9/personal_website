'use client'

import Link from 'next/link'
import clsx from 'clsx'
import { trackEngagement } from '@/lib/analytics'

const variantStyles = {
  primary:
    'bg-gradient-to-r from-emerald-500 to-teal-500 font-semibold text-white shadow-lg shadow-emerald-500/25 hover:from-emerald-600 hover:to-teal-600 hover:shadow-emerald-500/40 active:from-emerald-700 active:to-teal-700 dark:shadow-emerald-500/20 dark:hover:shadow-emerald-500/30',
  secondary:
    'bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70 border border-zinc-200 dark:border-zinc-700',
}

type ButtonProps = {
  variant?: keyof typeof variantStyles
  trackClick?: boolean
  analyticsLabel?: string
} & (
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
  | React.ComponentPropsWithoutRef<typeof Link>
)

export function Button({
  variant = 'primary',
  className,
  trackClick = false,
  analyticsLabel,
  ...props
}: ButtonProps) {
  className = clsx(
    'group inline-flex items-center gap-2 justify-center rounded-full py-2.5 px-5 text-sm outline-offset-2 transition-all duration-300 active:transition-none active:scale-95',
    variantStyles[variant],
    className,
  )

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (trackClick && analyticsLabel) {
      trackEngagement.buttonClick(analyticsLabel)
    }
    // Call the original onClick if it exists
    if (props.onClick) {
      props.onClick(e as any)
    }
  }

  return typeof props.href === 'undefined' ? (
    <button 
      className={className} 
      onClick={handleClick}
      {...props} 
    />
  ) : (
    <Link 
      className={className} 
      onClick={handleClick}
      {...props} 
    />
  )
}
