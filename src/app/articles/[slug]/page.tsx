import { type Metadata } from 'next'
import Image from 'next/image'
import Markdoc from '@markdoc/markdoc'
import React from 'react'

import { ArticleLayout } from '@/components/ArticleLayout'
import { getArticle, getAllArticles } from '@/lib/keystatic'

export async function generateStaticParams() {
  const articles = await getAllArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticle(params.slug)
  
  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

  return {
    title: article.title,
    description: article.description,
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug)
  
  if (!article) {
    return <div>Article not found</div>
  }

  const { node } = await article.content()
  const errors = Markdoc.validate(node)
  if (errors.length) {
    console.error(errors)
    throw new Error('Invalid content')
  }
  const renderable = Markdoc.transform(node)

  const articleMeta = {
    slug: params.slug,
    title: article.title,
    description: article.description,
    author: article.author,
    date: article.date || new Date().toISOString(),
    image: article.image,
  }

  return (
    <ArticleLayout article={articleMeta}>
      {article.image && (
        <Image
          src={article.image}
          alt={article.title}
          width={800}
          height={400}
          className="w-full rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
        />
      )}
      {Markdoc.renderers.react(renderable, React)}
    </ArticleLayout>
  )
}
