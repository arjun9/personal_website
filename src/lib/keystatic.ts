import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

// Create a reader instance
export const reader = createReader(process.cwd(), keystaticConfig);

// Types for our content
export interface ArticleWithSlug {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  image?: string | null;
  content: () => Promise<any>;
}

// Type for ArticleLayout component (without content function)
export interface ArticleLayoutProps {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  image?: string | null;
}

// Function to get all articles with slugs
export async function getAllArticles(): Promise<ArticleWithSlug[]> {
  const articles = await reader.collections.articles.all();
  
  return articles
    .map(article => ({
      slug: article.slug,
      title: article.entry.title,
      description: article.entry.description,
      author: article.entry.author,
      date: article.entry.date || new Date().toISOString(),
      image: article.entry.image,
      content: article.entry.content,
    }))
    .sort((a, z) => +new Date(z.date) - +new Date(a.date));
}

// Function to get a single article
export async function getArticle(slug: string) {
  return await reader.collections.articles.read(slug);
}

// Singleton getters
export async function getAboutContent() {
  return await reader.singletons.about.read();
}

export async function getArticlesPageContent() {
  return await reader.singletons.articlesPage.read();
}

export async function getProductsPageContent() {
  return await reader.singletons.productsPage.read();
}

export async function getProjectsPageContent() {
  return await reader.singletons.projectsPage.read();
}

export async function getHomePageContent() {
  return await reader.singletons.homePage.read();
}

export async function getNavigationContent() {
  return await reader.singletons.navigation.read();
}
