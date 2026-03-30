import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sqlitesynchonizer.com'
  const locales = ['en', 'ar', 'es', 'fr', 'zh', 'ru']

  const sitemapEntries: MetadataRoute.Sitemap = []

  // Add root domain entry
  sitemapEntries.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1.0,
  })

  // Add entries for each locale
  locales.forEach(locale => {
    sitemapEntries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    })
  })

  return sitemapEntries
}