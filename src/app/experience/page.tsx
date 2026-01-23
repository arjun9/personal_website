import { type Metadata } from 'next'
import Image from 'next/image'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { getHomePageContent } from '@/lib/keystatic'

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
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
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

interface Experience {
  company: string
  title: string
  logo: string
  start: string
  end: string
  url?: string
}

interface Achievement {
  title: string
  description: string
  metrics?: string
}

const experiences: (Experience & { achievements?: Achievement[] })[] = [
  {
    company: 'Hetu Labs',
    title: 'Co-Founder & CTO',
    logo: '/images/logos/workExperience/0/logo.png',
    start: '2023',
    end: 'Present',
    url: 'https://www.hetu-labs.com',
    achievements: [
      {
        title: 'AI-Powered Backend Systems',
        description: 'Building next-generation intelligent systems applying lessons from payment platforms and distributed architecture',
        metrics: 'Leading technical vision and architecture',
      },
      {
        title: 'SMB Empowerment Platform',
        description: 'Developing technologies that enable small and medium businesses to scale their online presence',
        metrics: 'Exploring AI/ML agents for automation',
      },
    ],
  },
  {
    company: 'Urban Company',
    title: 'Lead Communications Platform',
    logo: '/images/logos/workExperience/1/logo.jpg',
    start: '2022',
    end: '2023',
    url: 'https://www.linkedin.com/company/urbancompany/',
    achievements: [
      {
        title: 'Chat Latency Optimization',
        description: 'Architected and implemented a comprehensive latency reduction initiative across the real-time communications platform',
        metrics: '300ms → <75ms, 32% → 47% adoption',
      },
      {
        title: 'Real-time Platform Scalability',
        description: 'Led the redesign of the communications infrastructure to handle millions of concurrent connections',
        metrics: 'Supported 10M+ daily messages',
      },
      {
        title: 'WebSocket Infrastructure',
        description: 'Built a highly available WebSocket gateway with automatic failover and connection pooling',
        metrics: '99.95% uptime achieved',
      },
    ],
  },
  {
    company: 'PayU Payments',
    title: 'Lead R&D Platform',
    logo: '/images/logos/workExperience/2/logo.png',
    start: '2016',
    end: '2022',
    url: 'https://www.linkedin.com/company/payu/',
    achievements: [
      {
        title: 'Transaction Processing in Rust',
        description: 'Rewrote the critical transaction processing cycle from Ruby to Rust, achieving unprecedented performance improvements',
        metrics: '500x TPS increase: 30 → 15,000 TPS/host',
      },
      {
        title: 'Payment Gateway Reliability',
        description: 'Designed and implemented a fault-tolerant payment processing system handling billions in transactions',
        metrics: '99.999% uptime, ₹100B+ processed annually',
      },
      {
        title: 'Distributed Event System',
        description: 'Built a high-throughput event streaming platform using Kafka for payment state management',
        metrics: '1M+ events/second processing capacity',
      },
      {
        title: 'API Performance Optimization',
        description: 'Led performance engineering initiatives across payment APIs, reducing response times and improving throughput',
        metrics: 'P99 latency reduced by 85%',
      },
    ],
  },
]

export const metadata: Metadata = {
  title: 'Experience',
  description:
    '10+ years building high-scale backend systems for payments, real-time platforms, and distributed systems.',
}

export default async function Experience() {
  const homeContent = await getHomePageContent()

  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          Building systems that scale.
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          Over the past decade, I&apos;ve architected and built high-performance backend systems
          that process billions of transactions, serve millions of users, and run at massive scale.
          Here&apos;s a timeline of my professional journey.
        </p>
      </header>

      <div className="mt-16 sm:mt-20">
        <div className="space-y-20">
          {experiences.map((experience, experienceIndex) => (
            <div
              key={experienceIndex}
              className="group relative flex flex-col items-start"
            >
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                <Image
                  src={experience.logo}
                  alt={experience.company}
                  width={64}
                  height={64}
                  className="h-12 w-12 rounded-full object-contain"
                  unoptimized
                />
              </div>

              <div className="flex-auto pl-0 pt-6 sm:pl-20 sm:pt-0 sm:-mt-16">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                    {experience.url ? (
                      <a
                        href={experience.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition hover:text-emerald-600 dark:hover:text-emerald-400"
                      >
                        {experience.company}
                      </a>
                    ) : (
                      experience.company
                    )}
                  </h2>
                  <div className="mt-2 flex items-center gap-4 text-sm">
                    <p className="font-medium text-zinc-900 dark:text-zinc-100">
                      {experience.title}
                    </p>
                    <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                      {experience.start} – {experience.end === 'Present' ? 'now' : experience.end}
                    </span>
                  </div>
                </div>

                {experience.achievements && (
                  <div className="space-y-6">
                    {experience.achievements.map((achievement, achievementIndex) => (
                      <div
                        key={achievementIndex}
                        className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
                      >
                        <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
                          {achievement.title}
                        </h3>
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                          {achievement.description}
                        </p>
                        {achievement.metrics && (
                          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20">
                            <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
                              <path
                                d="M2 6l3 3 5-5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            {achievement.metrics}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {homeContent?.resumeUrl && (
        <div className="mt-16 flex justify-center">
          <a
            href={homeContent.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-900 outline-offset-2 transition hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 active:transition-none dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70"
          >
            Download CV
            <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
          </a>
        </div>
      )}
    </Container>
  )
}

