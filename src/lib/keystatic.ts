import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

// Create a reader instance
export const reader = createReader(process.cwd(), keystaticConfig);

// Singleton getters
export async function getAboutContent() {
  return await reader.singletons.about.read();
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

export async function getSiteSettingsContent() {
  return await reader.singletons.siteSettings.read();
}
