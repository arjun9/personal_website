import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { type ArticleWithSlug, getAllArticles, getArticlesPageContent } from '@/lib/keystatic'
import { formatDate } from '@/lib/formatDate'

function Article({ article }: { article: ArticleWithSlug }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date)}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(article.date)}
      </Card.Eyebrow>
    </article>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const pageContent = await getArticlesPageContent()
  
  return {
    title: pageContent?.title || 'Articles',
    description: pageContent?.description || 'All of my long-form thoughts on programming, leadership, product design and more, collected in chronological order.',
  }
}

export default async function ArticlesIndex() {
  const articles = await getAllArticles()
  const pageContent = await getArticlesPageContent()

  return (
    <SimpleLayout
      title={pageContent?.subtitle || "Writing on software engineering, company building & philosophy"}
      intro={pageContent?.intro || "All of my long-form thoughts on programming, leadership, product design and more, collected in chronological order."}
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {articles.map((article) => (
            <Article key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}
