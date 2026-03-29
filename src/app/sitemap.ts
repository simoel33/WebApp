import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  const locales = ['en', 'ar', 'es', 'fr', 'zh']

  const routes = [
    '',
    '/admin-space',
    '/admin-space/dashboard'
  ]

  const sitemapEntries: MetadataRoute.Sitemap = []

  // Add entries for each locale and route combination
  locales.forEach(locale => {
    routes.forEach(route => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1.0 : 0.8,
      })
    })
  })

  return sitemapEntries
}