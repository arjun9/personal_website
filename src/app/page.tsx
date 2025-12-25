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
      className="group flex items-center gap-2 rounded-lg px-2 py-1 text-sm text-zinc-500 transition-all hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100" 
      {...props}
    >
      <Icon className="h-5 w-5 flex-none fill-zinc-500 transition-all group-hover:scale-110 group-hover:fill-zinc-900 dark:fill-zinc-400 dark:group-hover:fill-zinc-100" />
      <span className="font-mono text-xs">{label}</span>
    </Link>
  )
}

function ArticleLink({ article }: { article: ArticleWithSlug }) {
  return (
    <Link 
      href={`/articles/${article.slug}`}
      className="group block rounded-lg p-3 transition-all hover:bg-white hover:shadow-md dark:hover:bg-zinc-800"
    >
      <article className="flex items-start gap-3">
        <div className="flex-auto min-w-0">
          <h3 className="text-sm font-medium text-zinc-900 transition-colors group-hover:text-emerald-600 dark:text-zinc-100 dark:group-hover:text-emerald-400">
            {article.title}
          </h3>
          <time 
            dateTime={article.date} 
            className="mt-1 block font-mono text-xs text-zinc-500 dark:text-zinc-400 tabular-nums"
          >
            {formatDate(article.date)}
          </time>
        </div>
        <svg className="h-5 w-5 flex-none text-zinc-400 transition-all group-hover:translate-x-1 group-hover:text-emerald-600 dark:text-zinc-500 dark:group-hover:text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </article>
    </Link>
  )
}

function TechStack() {
  const techs = [
    { name: 'Ruby/Rails', years: '10y', color: 'text-red-600 dark:text-red-400', hoverColor: 'hover:text-red-700 dark:hover:text-red-300' },
    { name: 'Kafka', years: '10y', color: 'text-zinc-600 dark:text-zinc-300', hoverColor: 'hover:text-zinc-800 dark:hover:text-zinc-100' },
    { name: 'AWS', years: '8y', color: 'text-amber-600 dark:text-amber-400', hoverColor: 'hover:text-amber-700 dark:hover:text-amber-300' },
    { name: 'Rust', years: '4y', color: 'text-orange-600 dark:text-orange-400', hoverColor: 'hover:text-orange-700 dark:hover:text-orange-300' },
    { name: 'AI/ML', years: '3y', color: 'text-purple-600 dark:text-purple-400', hoverColor: 'hover:text-purple-700 dark:hover:text-purple-300' },
  ]
  
  return (
    <div className="flex flex-wrap gap-2 text-sm">
      {techs.map((tech) => (
        <span key={tech.name} className="group flex items-center gap-1.5 rounded-full px-3 py-1.5 ring-1 ring-zinc-900/5 transition-all hover:bg-zinc-100 hover:ring-zinc-900/10 dark:ring-white/10 dark:hover:bg-zinc-800 dark:hover:ring-white/20">
          <span className={clsx('font-medium transition-colors', tech.color, tech.hoverColor)}>{tech.name}</span>
          <span className="font-mono text-xs text-zinc-400 transition-colors group-hover:text-zinc-500 dark:text-zinc-500 dark:group-hover:text-zinc-400">{tech.years}</span>
        </span>
      ))}
    </div>
  )
}

function ToptalLink() {
  return (
    <a 
      href="https://www.toptal.com/resume/arjun-verma"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-2 rounded-lg px-2 py-1 text-sm text-zinc-500 transition-all hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
    >
      <svg className="h-5 w-5 flex-none fill-zinc-500 transition-all group-hover:scale-110 group-hover:fill-zinc-900 dark:fill-zinc-400 dark:group-hover:fill-zinc-100" viewBox="0 0 24 24">
        <path d="M20.227 10.038L10.188 0l-2.04 2.04 3.773 3.769-8.155 8.153L13.807 24l2.039-2.039-3.772-3.771 8.16-8.152h-.007z"/>
      </svg>
      <span className="font-mono text-xs">Toptal Developer</span>
    </a>
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
                width={80}
                height={80}
                className="rounded-full bg-zinc-100 object-cover dark:bg-zinc-800"
                priority
              />
              <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-500 dark:border-zinc-900" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl">
                {homeContent.mainHeading || 'Arjun Verma'}
              </h1>
              <p className="mt-1.5 font-mono text-sm text-zinc-600 dark:text-zinc-400">
                Backend Architect · Systems Engineer
              </p>
            </div>
          </div>

          {/* Intro */}
          <div className="mt-8 text-base leading-7 text-zinc-600 dark:text-zinc-400 [&_a]:font-medium [&_a]:text-emerald-600 [&_a]:underline [&_a]:decoration-emerald-600/30 [&_a]:underline-offset-2 [&_a]:transition hover:[&_a]:decoration-emerald-600 dark:[&_a]:text-emerald-400 dark:[&_a]:decoration-emerald-400/30 dark:hover:[&_a]:decoration-emerald-400">
            {introContent}
          </div>

          {/* Tech Stack */}
          <div className="mt-6">
            <TechStack />
          </div>

          {/* Social Links */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
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
            <ToptalLink />
          </div>

          {/* Connect Button */}
          <div className="mt-8">
            <a
              href="mailto:arjun.verma.av9@gmail.com"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-zinc-800/5 transition-all hover:scale-105 hover:bg-zinc-800 hover:shadow-xl active:scale-100 dark:bg-emerald-500 dark:text-zinc-900 dark:shadow-emerald-500/20 dark:hover:bg-emerald-400"
            >
              <svg className="h-4 w-4 transition-transform group-hover:-rotate-12" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              Connect with me
            </a>
          </div>
        </div>
      </Container>

      {/* Work & Writing Section */}
      <Container className="mt-12 sm:mt-16">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Recent Work */}
          <section className="rounded-lg border border-zinc-100 p-4 dark:border-zinc-700/40">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Work Experience
            </h2>
            <ul className="mt-4 space-y-3">
              {homeContent.workExperience?.map((work, index) => (
                <li key={index}>
                  <a 
                    href={work.url || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded p-2 transition hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                  >
                    <div className="flex h-8 w-8 flex-none items-center justify-center overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-800 dark:ring-white/10">
                      <Image 
                        src={work.logo || ''} 
                        alt={work.company || ''} 
                        width={32} 
                        height={32}
                        className="h-6 w-6 object-contain"
                        unoptimized
                      />
                    </div>
                    <div className="flex-auto min-w-0">
                      <p className="text-xs font-medium text-zinc-900 group-hover:text-emerald-600 dark:text-zinc-100 dark:group-hover:text-emerald-400">
                        {work.company}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-500">
                        {work.title}
                      </p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* Recent Writing */}
          <section className="rounded-lg border border-zinc-100 p-4 dark:border-zinc-700/40">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Recent Writing
            </h2>
            <ul className="mt-4 space-y-3">
              {articles.map((article) => (
                <li key={article.slug}>
                  <Link 
                    href={`/articles/${article.slug}`}
                    className="group block rounded p-2 transition hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                  >
                    <h3 className="text-xs font-medium text-zinc-900 group-hover:text-emerald-600 dark:text-zinc-100 dark:group-hover:text-emerald-400">
                      {article.title}
                    </h3>
                    <time 
                      dateTime={article.date} 
                      className="mt-0.5 block text-xs text-zinc-500 dark:text-zinc-500"
                    >
                      {formatDate(article.date)}
                    </time>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Container>

    </>
  )
}
