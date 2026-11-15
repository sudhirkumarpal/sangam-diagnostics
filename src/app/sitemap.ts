import { MetadataRoute } from 'next';
import { INITIAL_PACKAGES, INITIAL_TESTS } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sangamdiagnostics.in';

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/packages',
    '/packages/basic-health-package',
    '/tests',
    '/offers',
    '/track',
    '/reports',
    '/about',
    '/contact',
    '/faq',
    '/sample-collection',
    '/locations',
    '/health-information',
    '/privacy-policy',
    '/terms',
    '/refund-cancellation',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: '2026-10-24',
    changeFrequency: 'weekly',
    priority: route === '' || route === '/packages/basic-health-package' ? 1.0 : 0.8,
  }));

  const packageRoutes: MetadataRoute.Sitemap = INITIAL_PACKAGES.map((pkg) => ({
    url: `${baseUrl}/packages/${pkg.slug}`,
    lastModified: '2026-10-24',
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const testRoutes: MetadataRoute.Sitemap = INITIAL_TESTS.map((test) => ({
    url: `${baseUrl}/tests/${test.slug}`,
    lastModified: '2026-10-24',
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...packageRoutes, ...testRoutes];
}
