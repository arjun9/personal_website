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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const articleUrl = `${siteUrl}/articles/${params.slug}`
  const imageUrl = article.image ? `${siteUrl}${article.image}` : `${siteUrl}/images/portrait.jpeg`

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      type: 'article',
      url: articleUrl,
      title: article.title,
      description: article.description,
      siteName: 'Arjun Verma',
      publishedTime: article.date || new Date().toISOString(),
      authors: [article.author || 'Arjun Verma'],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: article.twitterCard || 'summary_large_image', // Allow article to specify card type
      title: article.title,
      description: article.description,
      creator: '@arjunverma841',
      images: [imageUrl],
    },
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
