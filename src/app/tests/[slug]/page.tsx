import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { INITIAL_TESTS } from '@/lib/data';
import { TestDetailClient } from './TestDetailClient';

export function generateStaticParams() {
  return INITIAL_TESTS.map((t) => ({ slug: t.slug }));
}

export default async function TestDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const test = INITIAL_TESTS.find((t) => t.slug === slug);

  if (!test) {
    notFound();
  }

  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-500">Loading Test Details...</div>}>
      <TestDetailClient test={test} />
    </Suspense>
  );
}
