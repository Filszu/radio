import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://partyvote.ciac.me',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      
    },
    {
      url: 'https://partyvote.ciac.me/profile',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
      
    },
    {
      url: 'https://partyvote.ciac.me/party/radio-elektron',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: 'https://partyvote.ciac.me/login',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ]
}