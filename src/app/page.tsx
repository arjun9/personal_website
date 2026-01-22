import Image from 'next/image'
import Link from 'next/link'

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
const SKILLS = ['System Design', 'Startups', 'AI/ML', 'Rust', 'Ruby', 'Node.js', 'Next.js', 'AWS', 'K8s']

function SkillBadge({ skill }: { skill: string }) {
  return (
    <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
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
        className="stroke-zinc-400 dark:stroke-zinc-500"
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

function SocialLink({
  icon: Icon,
  label,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>
  label: string
}) {
  return (
    <Link className="group flex items-center gap-2 rounded-lg border border-zinc-200 px-4 py-3 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:border-zinc-600 dark:hover:bg-zinc-800/50" {...props}>
      <Icon className="h-6 w-6 fill-zinc-700 transition group-hover:fill-zinc-900 dark:fill-zinc-300 dark:group-hover:fill-zinc-100" />
      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</span>
    </Link>
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
  photos: readonly (string | null)[] | null;
}

function WorkExperienceRole({ work }: { work: NonNullable<HomePageContent['workExperience']>[0] }) {
  const startLabel = work.startDate || ''
  const endLabel = work.endDate || ''
  const endDate = work.endDate === 'Present' ? new Date().getFullYear().toString() : (work.endDate || '')

  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-12 w-12 flex-none overflow-hidden items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <Image src={work.logo || ''} alt="" width={48} height={48} unoptimized />
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          <a href={work.url || '#'} className='cursor-pointer' target='_blank'>{work.company}</a>
        </dd>
        <dt className="sr-only">Role</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          {work.title}
        </dd>
        <dt className="sr-only">Date</dt>
        <dd
          className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
          aria-label={`${startLabel} until ${endLabel}`}
        >
          <time dateTime={work.startDate || ''}>{startLabel}</time>{' '}
          <span aria-hidden="true">—</span>{' '}
          <time dateTime={endDate}>{endLabel}</time>
        </dd>
      </dl>
    </li>
  )
}

function Resume({ workExperience, resumeUrl }: { workExperience: HomePageContent['workExperience'], resumeUrl: string | null }) {
  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {workExperience?.map((work, workIndex) => (
          <WorkExperienceRole key={workIndex} work={work}/>
        ))}
      </ol>
      <a href={resumeUrl || '#'} target='_blank'>
        <Button  variant="secondary" className="group mt-6 w-full">
          Download CV
          <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
        </Button>
      </a>
    </div>
  )
}

interface ProjectItem {
  name: string | null
  description: string | null
  url: string | null
  linkLabel: string | null
  logo: string | null
}

interface ProjectSection {
  name: string | null
  items: readonly ProjectItem[] | null
}

function Projects({ sections }: { sections: readonly ProjectSection[] | null }) {
  if (!sections) return null

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <CodeIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Projects</span>
      </h2>
      <div className="mt-6 space-y-8">
        {sections.map((section) => (
          <div key={section.name}>
            <ul role="list" className="mt-3 space-y-4">
              {section.items?.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.url || '#'}
                    target="_blank"
                    className="group flex items-start gap-3"
                  >
                    <div className="relative flex h-10 w-10 flex-none items-center justify-center overflow-hidden rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                      <Image
                        src={item.logo || ''}
                        alt=""
                        width={40}
                        height={40}
                        unoptimized
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-zinc-900 group-hover:text-green-600 dark:text-zinc-100 dark:group-hover:text-green-400">
                        {item.name}
                      </p>
                      <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                        {item.description}
                      </p>
                      <p className="mt-1 flex items-center text-xs text-zinc-400 dark:text-zinc-500">
                        <LinkIcon className="h-3 w-3 flex-none" />
                        <span className="ml-1">{item.linkLabel}</span>
                      </p>
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
      <Container className="mt-9">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-mono text-2xl tracking-tight text-zinc-100">
            <span className="text-zinc-600 dark:text-zinc-400">Arjun Verma</span>
            <span className="mx-3 text-zinc-400 dark:text-zinc-600">|</span>
            <span className="text-emerald-600 dark:text-emerald-400">while</span>
            <span className="text-zinc-400 dark:text-zinc-500">(</span>
            <span className="text-amber-500 dark:text-amber-300">alive</span>
            <span className="text-zinc-400 dark:text-zinc-500">)</span>
            <span className="text-zinc-400 dark:text-zinc-500"> {'{'} </span>
            <span className="text-sky-600 dark:text-sky-400">build</span>
            <span className="text-zinc-400 dark:text-zinc-500">();</span>
            <span className="text-zinc-400 dark:text-zinc-500"> {'}'}</span>
          </h1>

          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
            <strong className="text-zinc-800 dark:text-zinc-200">Engineering leader</strong> with 10+ years building high-performance distributed systems. Led platform engineering at{' '}
            <a href="https://payu.in" target="_blank" className="font-medium text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400">PayU</a>, redesigned communication infrastructure at{' '}
            <a href="https://urbancompany.com" target="_blank" className="font-medium text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400">Urban Company</a>, and now run{' '}
            <a href="https://hetu-labs.com" target="_blank" className="font-medium text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400">Hetu Labs</a> — a tech consultancy helping startups scale.
          </p>

          {/* Skills Badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {SKILLS.map((skill) => (
              <SkillBadge key={skill} skill={skill} />
            ))}
          </div>

          {/* Social Links */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <SocialLink
              href="https://github.com/arjun9"
              target="_blank"
              aria-label="View GitHub profile"
              icon={GitHubIcon}
              label="GitHub"
            />
            <SocialLink
              href="https://linkedin.com/in/arjun-verma"
              target="_blank"
              aria-label="Connect on LinkedIn"
              icon={LinkedInIcon}
              label="LinkedIn"
            />
            <SocialLink
              href="https://www.toptal.com/developers/resume/arjun-verma"
              target="_blank"
              aria-label="View Toptal profile"
              icon={ToptalIcon}
              label="Toptal Developer"
            />
          </div>

          {/* CTA Button */}
          <div className="mt-8">
            <Button
              href="https://calendly.com/arjun-verma"
              target="_blank"
              className="px-6 py-3"
            >
              Schedule a Call
            </Button>
          </div>
        </div>
      </Container>

      {/* Work and Projects Sections */}
      <Container className="mt-16 md:mt-20">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-x-16">
          <Resume workExperience={homeContent.workExperience} resumeUrl={homeContent.resumeUrl} />
          <Projects sections={projectsContent?.sections || null} />
        </div>
      </Container>
    </>
  )
}
