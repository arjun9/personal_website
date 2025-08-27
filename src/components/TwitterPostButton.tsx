'use client'

import { useState } from 'react'
import { TwitterPostDialog } from './TwitterPostDialog'

function TwitterIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

interface TwitterPostButtonProps {
  article: {
    title: string
    description: string
    slug: string
  }
}

export function TwitterPostButton({ article }: TwitterPostButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Only show in development environment
  if (process.env.NODE_ENV === 'production') {
    return null
  }

  return (
    <>
      <button
        onClick={() => setIsDialogOpen(true)}
        className="group mb-4 flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-md shadow-blue-500/25 transition hover:bg-blue-600 hover:shadow-blue-500/40"
        title="Post to Twitter (Dev Only)"
      >
        <TwitterIcon className="h-4 w-4" />
        <span className="hidden sm:inline">Tweet</span>
      </button>

      <TwitterPostDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        article={article}
      />
    </>
  )
}
