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
        </div>
      </Container>

      {/* Work & Writing Section */}
      <Container className="mt-20 sm:mt-28">
        <div className="grid gap-12 sm:grid-cols-2 lg:gap-16">
          {/* Recent Work */}
          <section className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                Work Experience
              </h2>
              <svg className="h-5 w-5 text-zinc-400 dark:text-zinc-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
              </svg>
            </div>
            <ul className="mt-6 space-y-5">
              {homeContent.workExperience?.map((work, index) => (
                <li key={index}>
                  <a 
                    href={work.url || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 rounded-lg p-3 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                  >
                    <div className="flex h-12 w-12 flex-none items-center justify-center overflow-hidden rounded-xl bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition-all group-hover:scale-110 group-hover:shadow-lg dark:bg-zinc-800 dark:ring-white/10">
                      <Image 
                        src={work.logo || ''} 
                        alt={work.company || ''} 
                        width={48} 
                        height={48}
                        className="h-9 w-9 object-contain"
                        unoptimized
                      />
                    </div>
                    <div className="flex-auto min-w-0">
                      <p className="text-sm font-semibold text-zinc-900 transition-colors group-hover:text-emerald-600 dark:text-zinc-100 dark:group-hover:text-emerald-400">
                        {work.company}
                      </p>
                      <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">
                        {work.title}
                      </p>
                      <p className="mt-1 font-mono text-xs text-zinc-400 dark:text-zinc-500">
                        {work.startDate}–{work.endDate === 'Present' ? 'now' : work.endDate}
                      </p>
                    </div>
                    <svg className="h-5 w-5 flex-none text-zinc-400 transition-all group-hover:translate-x-1 group-hover:text-emerald-600 dark:text-zinc-500 dark:group-hover:text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
            {homeContent.resumeUrl && (
              <div className="mt-6 border-t border-zinc-100 pt-6 dark:border-zinc-700/40">
                <a 
                  href={homeContent.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-50 px-4 py-2.5 text-sm font-medium text-zinc-900 transition-all hover:bg-zinc-100 dark:bg-zinc-800/50 dark:text-zinc-100 dark:hover:bg-zinc-800"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                  Download Resume
                </a>
              </div>
            )}
          </section>

          {/* Recent Writing */}
          <section className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                Recent Writing
              </h2>
              <svg className="h-5 w-5 text-zinc-400 dark:text-zinc-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
              </svg>
            </div>
            <ul className="mt-6 space-y-3">
              {articles.map((article) => (
                <li key={article.slug}>
                  <ArticleLink article={article} />
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-zinc-100 pt-6 dark:border-zinc-700/40">
              <Link 
                href="/articles"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-50 px-4 py-2.5 text-sm font-medium text-zinc-900 transition-all hover:bg-zinc-100 dark:bg-zinc-800/50 dark:text-zinc-100 dark:hover:bg-zinc-800"
              >
                View all articles
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </section>
        </div>
      </Container>

      {/* Contact Section */}
      <Container className="mt-20 sm:mt-28">
        <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-8 dark:border-zinc-700/40 dark:bg-zinc-800/50 sm:p-10">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Let's build something together
            </h2>
            <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
              Interested in backend architecture, performance optimization, or scalable systems?
            </p>
          </div>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="mailto:arjun.verma.av9@gmail.com"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-zinc-800/5 transition-all hover:scale-105 hover:bg-zinc-800 hover:shadow-xl active:scale-100 dark:bg-emerald-500 dark:text-zinc-900 dark:shadow-emerald-500/20 dark:hover:bg-emerald-400"
            >
              <svg className="h-4 w-4 transition-transform group-hover:-rotate-12" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              Get in touch
            </a>
            {homeContent.socialLinks?.map((social, index) => {
              const IconComponent = getIconForPlatform(social.platform)
              const platformLabel = social.platform.charAt(0).toUpperCase() + social.platform.slice(1)
              return (
                <a
                  key={index}
                  href={social.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900 shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition-all hover:scale-105 hover:bg-zinc-100 hover:shadow-lg active:scale-100 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-white/10 dark:hover:bg-zinc-700"
                >
                  <IconComponent className="h-4 w-4 fill-zinc-500 transition-all group-hover:scale-110 group-hover:fill-zinc-900 dark:fill-zinc-400 dark:group-hover:fill-zinc-100" />
                  {platformLabel}
                </a>
              )
            })}
          </div>
        </div>
      </Container>

    </>
  )
}
