import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/collector', '/api/'],
      },
    ],
    sitemap: 'https://sangamdiagnostics.in/sitemap.xml',
  };
}
