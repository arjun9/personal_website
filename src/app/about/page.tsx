import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpeg'

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
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
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

export const metadata: Metadata = {
  title: 'About',
  description:
    'I’m Arjun Verma. I live in India, where I build for the future.',
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            I’m Arjun Verma. I live in India, where I build for the
            future.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              I’ve loved making things for as long as I can remember.
              I wrote my first program when I was 8 years old,
              creating all sorts of shapes and patterns in&nbsp;
              <a href="https://en.wikipedia.org/wiki/Logo_(programming_language)" className="font-semibold underline decoration-teal-500">
                Logo
              </a> on my mom's old Compaq Deskpro.
              It was more than a pastime; it was a portal to a world of endless possibilities.
            </p>
            <p>
              My journey wasn't initially steered towards entrepreneurship.
              I guess the seed of entrepreneurship was planted in my mind,
              at the age of 15, while watching &nbsp;
              <a href="https://en.wikipedia.org/wiki/Pirates_of_Silicon_Valley" className="font-semibold underline decoration-teal-500">
                Pirates of Silicon Valley
              </a> &&nbsp;
              <a href="https://en.wikipedia.org/wiki/Triumph_of_the_Nerds" className="font-semibold underline decoration-teal-500">
                Triumph of the Nerds
              </a>, at a friend's house.
              The inspiring stories of simple hackers transforming
              the world with nothing but a laptop had a profound impact on me.
            </p>
            <p>
            Today, I live in Gurgaon with my dogo, &nbsp;
            <a href="https://instagram.com/thegoldenboy_greg" className="font-semibold underline decoration-teal-500">
              Greg
            </a>, and Garima, (my partner of seven years who has now become my wife).
            I'm still pursuing my lifelong dream:&nbsp;
            <span className="font-semibold underline decoration-blue-500">to create value that transcends the ordinary</span>. And with every step,
            I continue to carry the spirit of that 8-year-old who saw a world of possibilities in every pixel and line of code.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <div className="flex gap-6">
              <SocialLink
                href="https://twitter.com/hitch_hike_engg"
                aria-label="Follow on Twitter"
                icon={TwitterIcon}
              />
              <SocialLink
                href="https://instagram.com/hitch_hike_engg"
                aria-label="Follow on Instagram"
                icon={InstagramIcon}
              />
              <SocialLink
                href="https://github.com/arjun9"
                aria-label="Follow on GitHub"
                icon={GitHubIcon}
              />
              <SocialLink
                href="https://www.linkedin.com/in/arjun-verma-895133103/"
                aria-label="Follow on LinkedIn"
                icon={LinkedInIcon}
              />
            </div>
            <SocialLink
              href="mailto:arjun.verma8412@gmail.com"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              arjun.verma8412@gmail.com
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
