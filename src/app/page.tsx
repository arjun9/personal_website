import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

// Force dynamic rendering to pick up Keystatic content changes
export const dynamic = 'force-dynamic'
import { Container } from '@/components/Container'
import {
  GitHubIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@/components/SocialIcons'
import { type ArticleWithSlug, getAllArticles, getHomePageContent } from '@/lib/keystatic'
import { formatDate } from '@/lib/formatDate'
import Markdoc from '@markdoc/markdoc'

function SocialLink({
  icon: Icon,
  label,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>
  label: string
}) {
  return (
    <Link 
      className="group flex items-center gap-2 text-sm text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100" 
      {...props}
    >
      <Icon className="h-5 w-5 flex-none fill-zinc-500 transition group-hover:fill-zinc-900 dark:fill-zinc-400 dark:group-hover:fill-zinc-100" />
      <span className="font-mono text-xs">{label}</span>
    </Link>
  )
}

function ArticleLink({ article }: { article: ArticleWithSlug }) {
  return (
    <Link 
      href={`/articles/${article.slug}`}
      className="group block"
    >
      <article className="flex items-baseline gap-4">
        <time 
          dateTime={article.date} 
          className="flex-none font-mono text-xs text-zinc-400 dark:text-zinc-500 tabular-nums"
        >
          {formatDate(article.date).split(',')[0]}
        </time>
        <h3 className="text-sm text-zinc-600 transition group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-100">
          {article.title}
        </h3>
      </article>
    </Link>
  )
}

function TechStack() {
  const techs = [
    { name: 'Rust', color: 'text-orange-600 dark:text-orange-400' },
    { name: 'Ruby', color: 'text-red-600 dark:text-red-400' },
    { name: 'Python', color: 'text-yellow-600 dark:text-yellow-400' },
    { name: 'Go', color: 'text-cyan-600 dark:text-cyan-400' },
  ]
  
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs">
      {techs.map((tech) => (
        <span key={tech.name} className={clsx('transition-colors', tech.color)}>
          {tech.name}
        </span>
      ))}
    </div>
  )
}

interface HomePageContent {
  title: string | null;
  description: string | null;
  mainHeading: string | null;
  intro: (() => Promise<any>) | null;
  visionStatement: string | null;
  visionLinkUrl: string | null;
  visionLinkText: string | null;
  socialLinks: readonly {
    readonly platform: 'twitter' | 'instagram' | 'github' | 'linkedin';
    readonly url: string | null;
    readonly ariaLabel: string | null;
  }[] | null;
  workExperience: readonly {
    readonly company: string | null;
    readonly title: string | null;
    readonly url: string | null;
    readonly logo: string | null;
    readonly startDate: string | null;
    readonly endDate: string | null;
  }[] | null;
  resumeUrl: string | null;
  newsletterTitle: string | null;
  newsletterDescription: string | null;
  photos: readonly (string | null)[] | null;
}

export default async function Home() {
  const [articles, homeContent] = await Promise.all([
    getAllArticles().then(articles => articles.slice(0, 3)),
    getHomePageContent()
  ])

  if (!homeContent) {
    throw new Error('Home page content not found')
  }

  // Render intro content if it exists
  let introContent = null
  if (homeContent.intro) {
    try {
      const { node } = await homeContent.intro()
      const errors = Markdoc.validate(node)
      if (errors.length) {
        console.error('Markdoc validation errors:', errors)
      }
      const renderable = Markdoc.transform(node)
      introContent = Markdoc.renderers.react(renderable, React)
    } catch (error) {
      console.error('Error rendering intro content:', error)
      introContent = "Backend architect who loves building things that scale."
    }
  }

  const getSocialLabel = (platform: string) => {
    switch (platform) {
      case 'twitter': return '@hitch_hike_engg'
      case 'github': return 'arjun9'
      case 'linkedin': return 'in/arjun-verma'
      default: return platform
    }
  }

  const getIconForPlatform = (platform: string) => {
    switch (platform) {
      case 'twitter': return TwitterIcon
      case 'github': return GitHubIcon
      case 'linkedin': return LinkedInIcon
      default: return TwitterIcon
    }
  }

  return (
    <>
      {/* Hero Section */}
      <Container className="mt-16 sm:mt-24">
        <div className="max-w-2xl">
          {/* Avatar and Name */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <Image
                src="/images/avatarImage.png"
                alt="Arjun Verma"
                width={72}
                height={72}
                className="rounded-full bg-zinc-100 object-cover dark:bg-zinc-800"
                priority
              />
              <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-500 dark:border-zinc-900" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-3xl">
                {homeContent.mainHeading || 'Arjun Verma'}
              </h1>
              <p className="mt-1 font-mono text-sm text-zinc-500 dark:text-zinc-400">
                Backend Architect · Systems Engineer
              </p>
            </div>
          </div>

          {/* Intro */}
          <div className="mt-8 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 [&_a]:text-emerald-600 [&_a]:underline [&_a]:decoration-emerald-600/30 [&_a]:underline-offset-2 [&_a]:transition hover:[&_a]:decoration-emerald-600 dark:[&_a]:text-emerald-400 dark:[&_a]:decoration-emerald-400/30 dark:hover:[&_a]:decoration-emerald-400">
            {introContent}
          </div>

          {/* Tech Stack */}
          <div className="mt-6">
            <TechStack />
          </div>

          {/* Social Links */}
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {homeContent.socialLinks?.map((social, index) => {
              const IconComponent = getIconForPlatform(social.platform)
              return (
                <SocialLink
                  key={index}
                  href={social.url || '#'}
                  icon={IconComponent}
                  label={getSocialLabel(social.platform)}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              )
            })}
          </div>
        </div>
      </Container>

      {/* Work & Writing Section */}
      <Container className="mt-20 sm:mt-28">
        <div className="grid gap-16 sm:grid-cols-2 sm:gap-12">
          {/* Recent Work */}
          <section>
            <h2 className="flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
              <span className="font-mono text-emerald-500">01</span>
              <span>Work</span>
            </h2>
            <ul className="mt-6 space-y-4">
              {homeContent.workExperience?.map((work, index) => (
                <li key={index}>
                  <a 
                    href={work.url || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4"
                  >
                    <div className="flex h-10 w-10 flex-none items-center justify-center overflow-hidden rounded-lg bg-zinc-50 ring-1 ring-zinc-900/5 dark:bg-zinc-800 dark:ring-white/5">
                      <Image 
                        src={work.logo || ''} 
                        alt={work.company || ''} 
                        width={40} 
                        height={40}
                        className="h-8 w-8 object-contain"
                        unoptimized
                      />
                    </div>
                    <div className="flex-auto">
                      <p className="text-sm font-medium text-zinc-900 transition group-hover:text-emerald-600 dark:text-zinc-100 dark:group-hover:text-emerald-400">
                        {work.company}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {work.title}
                      </p>
                    </div>
                    <span className="flex-none font-mono text-xs text-zinc-400 dark:text-zinc-500">
                      {work.startDate}–{work.endDate === 'Present' ? 'now' : work.endDate}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            {homeContent.resumeUrl && (
              <a 
                href={homeContent.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
                Download CV
              </a>
            )}
          </section>

          {/* Recent Writing */}
          <section>
            <h2 className="flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
              <span className="font-mono text-emerald-500">02</span>
              <span>Writing</span>
            </h2>
            <ul className="mt-6 space-y-4">
              {articles.map((article) => (
                <li key={article.slug}>
                  <ArticleLink article={article} />
                </li>
              ))}
            </ul>
            <Link 
              href="/articles"
              className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
              All articles
            </Link>
          </section>
        </div>
      </Container>

    </>
  )
}
