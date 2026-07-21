import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'
import { error } from 'console'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://paperplanes.ink'

  const { data: publicLetters } = await supabase
    .from('letters')
    .select('share_token, created_at')
    .eq('is_public', true)

if (error) {
    console.error('Error fetching public letters for sitemap:', error)
  }

  const letterEntries = publicLetters?.map((letter) => ({
    url: `${baseUrl}/letter/${letter.share_token}`,
    lastModified: new Date(letter.created_at),
    changeFrequency: 'never' as const,
    priority: 0.8,
  })) || []

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/feed`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...letterEntries,
  ]
}