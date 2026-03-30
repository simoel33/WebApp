import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://sqlitesynchonizer.com'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin-space/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}