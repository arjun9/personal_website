import Image from 'next/image'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import {
  GitHubIcon,
  LinkedInIcon,
  ToptalIcon,
} from '@/components/SocialIcons'
// These are now loaded from Keystatic content
import { getHomePageContent, getProjectsPageContent } from '@/lib/keystatic'

// Skills to display as badges
const SKILLS = ['System Design', 'Distributed Systems', 'Rust', 'Node.js', 'AWS']

function SkillBadge({ skill }: { skill: string }) {
  return (
    <span className="rounded-full bg-gradient-to-r from-zinc-100 to-zinc-50 px-4 py-1.5 text-sm font-medium text-zinc-700 shadow-sm ring-1 ring-zinc-200/50 transition-all duration-300 hover:shadow-md hover:ring-zinc-300 dark:from-zinc-800 dark:to-zinc-800/80 dark:text-zinc-300 dark:ring-zinc-700/50 dark:hover:ring-zinc-600">
      {skill}
    </span>
  )
}

function LinkIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  )
}

function CodeIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M17.25 6.75 21 12l-3.75 5.25M6.75 6.75 3 12l3.75 5.25M14.25 3.75l-4.5 16.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
      />
    </svg>
  )
}

function BriefcaseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        stroke="currentColor"
      />
    </svg>
  )
}

function ArrowDownIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
    readonly impact?: string | null;
    readonly url: string | null;
    readonly logo: string | null;
    readonly startDate: string | null;
    readonly endDate: string | null;
  }[] | null;
  resumeUrl: string | null;
  photos: readonly (string | null)[] | null;
}

function WorkExperienceRole({ work }: { work: NonNullable<HomePageContent['workExperience']>[0] }) {
  const startLabel = work.startDate || ''
  const endLabel = work.endDate || ''
  const endDate = work.endDate === 'Present' ? new Date().getFullYear().toString() : (work.endDate || '')

  return (
    <li className="group relative flex gap-4 rounded-2xl p-3 transition-all duration-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
      <div className="relative flex h-12 w-12 flex-none items-center justify-center overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-zinc-900/5 transition-all duration-300 group-hover:shadow-md group-hover:ring-amber-500/20 dark:bg-zinc-800 dark:ring-zinc-700/50 dark:group-hover:ring-amber-500/30">
        <Image src={work.logo || ''} alt="" width={48} height={48} className="transition-transform duration-300 group-hover:scale-105" unoptimized />
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="w-full flex-none text-sm font-semibold text-zinc-900 transition-colors duration-300 group-hover:text-amber-700 dark:text-zinc-100 dark:group-hover:text-amber-400">
          <a href={work.url || '#'} className='cursor-pointer inline-flex items-center gap-1' target='_blank'>
            {work.company}
            <svg className="h-3.5 w-3.5 text-zinc-400 opacity-0 transition-all duration-300 group-hover:opacity-100 dark:text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </dd>
        <dt className="sr-only">Role</dt>
        <dd className="text-sm text-zinc-600 dark:text-zinc-400">
          {work.title}
        </dd>
        <dt className="sr-only">Date</dt>
        <dd
          className="ml-auto text-xs font-medium text-zinc-400 dark:text-zinc-500"
          aria-label={`${startLabel} until ${endLabel}`}
        >
          <time dateTime={work.startDate || ''}>{startLabel}</time>{' '}
          <span aria-hidden="true">—</span>{' '}
          <time dateTime={endDate}>{endLabel}</time>
        </dd>
        {work.impact && (
          <>
            <dt className="sr-only">Impact</dt>
            <dd className="mt-1 w-full text-xs font-medium text-emerald-600 dark:text-emerald-400">
              {work.impact}
            </dd>
          </>
        )}
      </dl>
    </li>
  )
}

function Resume({ workExperience }: { workExperience: HomePageContent['workExperience'] }) {
  return (
    <div className="rounded-2xl border border-zinc-100 bg-white/50 p-6 shadow-sm backdrop-blur-sm dark:border-zinc-700/40 dark:bg-zinc-800/30">
      <h2 className="flex items-center gap-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-500/10">
          <BriefcaseIcon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        </span>
        <span>Work Experience</span>
      </h2>
      <ol className="mt-6 space-y-5">
        {workExperience?.map((work, workIndex) => (
          <WorkExperienceRole key={workIndex} work={work}/>
        ))}
      </ol>
    </div>
  )
}

interface ProjectItem {
  name: string | null
  description: string | null
  url: string | null
  linkLabel: string | null
  logo: string | null
  features?: readonly string[] | null
  pricing?: readonly { plan: string; price: string }[] | null
}

interface ProjectSection {
  name: string | null
  items: readonly ProjectItem[] | null
}

function RocketIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Projects({ sections }: { sections: readonly ProjectSection[] | null }) {
  if (!sections) return null

  return (
    <div className="rounded-2xl border border-zinc-100 bg-white/50 p-6 shadow-sm backdrop-blur-sm dark:border-zinc-700/40 dark:bg-zinc-800/30">
      <h2 className="flex items-center gap-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-500/10">
          <RocketIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        </span>
        <span>Product</span>
      </h2>
      <div className="mt-4 space-y-3">
        {sections.map((section) => (
          <div key={section.name}>
            <ul role="list" className="space-y-3">
              {section.items?.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.url || '#'}
                    target="_blank"
                    className="group relative block rounded-xl p-4 transition-all duration-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                  >
                    {/* Header with logo and name */}
                    <div className="flex items-start gap-4">
                      <div className="relative flex h-14 w-14 flex-none items-center justify-center overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-zinc-900/5 transition-all duration-300 group-hover:shadow-md group-hover:ring-emerald-500/20 dark:bg-zinc-800 dark:ring-zinc-700/50 dark:group-hover:ring-emerald-500/30">
                        <Image
                          src={item.logo || ''}
                          alt=""
                          width={56}
                          height={56}
                          className="transition-transform duration-300 group-hover:scale-105"
                          unoptimized
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-base font-semibold text-zinc-900 transition-colors duration-300 group-hover:text-emerald-600 dark:text-zinc-100 dark:group-hover:text-emerald-400">
                            {item.name}
                          </p>
                          <svg className="h-4 w-4 text-zinc-400 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 dark:text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                        <p className="mt-1 text-sm leading-snug text-zinc-500 dark:text-zinc-400">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Pricing badges */}
                    {item.pricing && item.pricing.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.pricing.map((tier) => (
                          <span
                            key={tier.plan}
                            className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                          >
                            <span>{tier.plan}</span>
                            <span className="font-semibold">{tier.price}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Features list */}
                    {item.features && item.features.length > 0 && (
                      <div className="mt-4 space-y-1.5">
                        {item.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                            <svg className="h-4 w-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Link label */}
                    <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                      <LinkIcon className="h-3 w-3" />
                      <span>{item.linkLabel}</span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default async function Home() {
  const [homeContent, projectsContent] = await Promise.all([
    getHomePageContent(),
    getProjectsPageContent()
  ])

  if (!homeContent) {
    throw new Error('Home page content not found')
  }

  return (
    <>
      {/* Hero Section */}
      <Container className="mt-16 sm:mt-24">
        <div className="relative mx-auto max-w-3xl text-center">
          {/* Decorative gradient background */}
          <div className="absolute -top-20 left-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-transparent blur-3xl dark:from-emerald-500/10 dark:via-teal-500/5" />
          
          {/* Name */}
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            Hello, I&apos;m
          </p>
          
          <h1 className="mt-4 text-5xl font-bold tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl dark:text-zinc-100">
            Arjun Verma
          </h1>
          
          {/* Code tagline */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-zinc-100/80 px-4 py-2 font-mono text-sm backdrop-blur-sm dark:bg-zinc-800/80">
            <span className="text-emerald-600 dark:text-emerald-400">while</span>
            <span className="text-zinc-400">(</span>
            <span className="text-amber-500">alive</span>
            <span className="text-zinc-400">)</span>
            <span className="text-zinc-400">{'{'}</span>
            <span className="text-sky-600 dark:text-sky-400">build</span>
            <span className="text-zinc-400">( );</span>
            <span className="text-zinc-400">{'}'}</span>
          </div>

          <p className="mt-8 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            <strong className="font-semibold text-zinc-800 dark:text-zinc-200">Engineering leader</strong> with 10+ years building high-performance distributed systems. Led platform engineering at{' '}
            <a href="https://payu.in" target="_blank" className="font-semibold text-emerald-600 underline decoration-emerald-600/30 underline-offset-2 transition hover:decoration-emerald-600 dark:text-emerald-400 dark:decoration-emerald-400/30 dark:hover:decoration-emerald-400">PayU</a>, redesigned communication infrastructure at{' '}
            <a href="https://urbancompany.com" target="_blank" className="font-semibold text-emerald-600 underline decoration-emerald-600/30 underline-offset-2 transition hover:decoration-emerald-600 dark:text-emerald-400 dark:decoration-emerald-400/30 dark:hover:decoration-emerald-400">Urban Company</a>, and now run{' '}
            <a href="https://hetu-labs.com" target="_blank" className="font-semibold text-emerald-600 underline decoration-emerald-600/30 underline-offset-2 transition hover:decoration-emerald-600 dark:text-emerald-400 dark:decoration-emerald-400/30 dark:hover:decoration-emerald-400">Hetu Labs</a> — a tech consultancy helping startups scale.
          </p>

          {/* Skills Badges */}
          <div className="mt-10 flex flex-wrap justify-center gap-2.5">
            {SKILLS.map((skill) => (
              <SkillBadge key={skill} skill={skill} />
            ))}
          </div>

          {/* Social Links - Compact Icon Bar */}
          <div className="mt-8 flex justify-center gap-5">
            <a
              href="https://github.com/arjun9"
              target="_blank"
              className="group rounded-full p-2 transition-all duration-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              aria-label="View GitHub profile"
            >
              <GitHubIcon className="h-6 w-6 fill-zinc-500 transition-all duration-300 group-hover:fill-emerald-600 group-hover:scale-110 dark:fill-zinc-400 dark:group-hover:fill-emerald-400" />
            </a>
            <a
              href="https://linkedin.com/in/arjun-verma"
              target="_blank"
              className="group rounded-full p-2 transition-all duration-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              aria-label="Connect on LinkedIn"
            >
              <LinkedInIcon className="h-6 w-6 fill-zinc-500 transition-all duration-300 group-hover:fill-emerald-600 group-hover:scale-110 dark:fill-zinc-400 dark:group-hover:fill-emerald-400" />
            </a>
            <a
              href="https://www.toptal.com/developers/resume/arjun-verma"
              target="_blank"
              className="group rounded-full p-2 transition-all duration-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              aria-label="View Toptal profile"
            >
              <ToptalIcon className="h-6 w-6 fill-zinc-500 transition-all duration-300 group-hover:fill-emerald-600 group-hover:scale-110 dark:fill-zinc-400 dark:group-hover:fill-emerald-400" />
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button
              href="https://calendly.com/arjun-verma"
              target="_blank"
              className="px-8 py-3.5 text-base"
            >
              <span>Schedule a Call</span>
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
            <Button
              href={homeContent.resumeUrl || '#'}
              target="_blank"
              variant="secondary"
              className="px-8 py-3.5 text-base"
            >
              <span>Download CV</span>
              <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition-transform duration-300 group-hover:translate-y-0.5 group-hover:stroke-zinc-600 dark:group-hover:stroke-zinc-300" />
            </Button>
          </div>
        </div>
      </Container>

      {/* Work and Projects Sections */}
      <Container className="mt-16 md:mt-20">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-x-16">
          <Resume workExperience={homeContent.workExperience} />
          <Projects sections={projectsContent?.sections || null} />
        </div>
      </Container>
    </>
  )
}
