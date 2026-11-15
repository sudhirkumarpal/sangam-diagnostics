import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { INITIAL_PACKAGES } from '@/lib/data';
import { PackageDetailClient } from './PackageDetailClient';

const SLUG_ALIASES: Record<string, string> = {
  'basic-health-checkup-799': 'basic-health-package',
  'advance-health-checkup-1499': 'advanced-health-package',
  'hair-fall-screening-men': 'hair-treatment-screening-men',
  'hair-fall-screening-women': 'hair-treatment-screening-women',
  'silver-health-package-1000': 'basic-health-package',
  'full-body-package-1000': 'basic-health-package',
  'standard-health-checkup-999': 'basic-health-package',
  'platinum-health-package-1199': 'advanced-health-package',
  'full-body-health-checkup': 'advanced-health-package',
};

export function generateStaticParams() {
  const primary = INITIAL_PACKAGES.map((p) => ({ slug: p.slug }));
  const aliases = Object.keys(SLUG_ALIASES).map((slug) => ({ slug }));
  return [...primary, ...aliases];
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const canonicalSlug = SLUG_ALIASES[slug] || slug;
  const pkg = INITIAL_PACKAGES.find((p) => p.slug === canonicalSlug);

  if (!pkg) {
    notFound();
  }

  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-500">Loading Package Details...</div>}>
      <PackageDetailClient pkg={pkg} />
    </Suspense>
  );
}
