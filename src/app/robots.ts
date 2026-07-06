import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: [
      'https://tckilaclama.com/sitemap.xml',
      'https://tckilaclama.com/geo-sitemap.xml'
    ],
  };
}
