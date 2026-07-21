import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://paperplanes.ink'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard',
        '/login',
        '/write',
        '/edit/',
        '/api/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}