import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import Markdoc from '@markdoc/markdoc'
import React from 'react'

import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@/components/SocialIcons'
import { getAboutContent } from '@/lib/keystatic'

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-green-500 dark:text-zinc-200 dark:hover:text-green-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-green-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

// Helper function to get the appropriate icon for social platform
function getSocialIcon(platform: string) {
  switch (platform) {
    case 'twitter':
      return TwitterIcon
    case 'instagram':
      return InstagramIcon
    case 'github':
      return GitHubIcon
    case 'linkedin':
      return LinkedInIcon
    case 'email':
      return MailIcon
    default:
      return MailIcon
  }
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const aboutContent = await getAboutContent()
  
  return {
    title: aboutContent?.title || 'About',
    description: aboutContent?.description || "I'm Arjun Verma. I live in India, where I build for the future.",
  }
}

export default async function About() {
  const aboutContent = await getAboutContent()
  
  if (!aboutContent) {
    return <div>Loading...</div>
  }

  // Parse the markdoc content
  const { node } = await aboutContent.content()
  const errors = Markdoc.validate(node)
  if (errors.length) {
    console.error(errors)
    throw new Error('Invalid content')
  }
  const renderable = Markdoc.transform(node)

  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={aboutContent.image || '/images/image.jpeg'}
              alt=""
              width={320}
              height={320}
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            {aboutContent.subtitle}
          </h1>
          <Prose className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400 prose prose-zinc dark:prose-invert">
            {Markdoc.renderers.react(renderable, React)}
          </Prose>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <div className="flex gap-6">
              {aboutContent.socialLinks
                ?.filter(link => link.platform !== 'email')
                .map((link, index) => {
                  const Icon = getSocialIcon(link.platform)
                  return (
                    <SocialLink
                      key={index}
                      href={link.url || '#'}
                      aria-label={link.label || ''}
                      icon={Icon}
                    > </SocialLink>
                  )
                })}
            </div>
            {aboutContent.socialLinks
              ?.filter(link => link.platform === 'email')
              .map((link, index) => (
                <SocialLink
                  key={index}
                  href={link.url || '#'}
                  icon={MailIcon}
                  className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
                >
                  {link.label || ''}
                </SocialLink>
              ))}
          </ul>
        </div>
      </div>
    </Container>
  )
}
