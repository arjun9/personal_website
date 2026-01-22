import { type Metadata } from 'next'
import Image from 'next/image'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getProjectsPageContent } from '@/lib/keystatic'

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

export async function generateMetadata(): Promise<Metadata> {
  const pageContent = await getProjectsPageContent()
  
  return {
    title: pageContent?.title || 'Projects',
    description: pageContent?.description || "Things I've built",
  }
}

export default async function Projects() {
  const pageContent = await getProjectsPageContent()
  
  if (!pageContent) {
    return <div>Loading...</div>
  }

  return (
    <SimpleLayout
      title={pageContent.subtitle}
      intro={pageContent.intro}
    >
      <div className="space-y-16">
        {pageContent.sections?.map((section) => (
          <section key={section.name}>
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {section.name}
            </h2>
            <ul
              role="list"
              className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2"
            >
              {section.items?.map((item) => (
                <Card as="li" key={item.name}>
                  <div className="flex items-center gap-4">
                    <div className="relative z-10 flex h-12 w-12 flex-none overflow-hidden items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                      <Image
                        src={item.logo || ''}
                        alt=""
                        width={48}
                        height={48}
                        unoptimized
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                        <Card.Link href={item.url}>{item.name}</Card.Link>
                      </h3>
                      <p className="relative z-10 flex text-xs text-zinc-400 dark:text-zinc-500">
                        <LinkIcon className="h-4 w-4 flex-none" />
                        <span className="ml-1">{item.linkLabel}</span>
                      </p>
                    </div>
                  </div>
                  <Card.Description className="mt-4">{item.description}</Card.Description>
                </Card>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </SimpleLayout>
  )
}
