import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getQuotationByReference } from '@/lib/storage';
import { QuotationClient } from './QuotationClient';

export function generateStaticParams() {
  return [
    { ref: 'SD-QT-2026-1042' },
    { ref: 'SD-QT-2026-1043' },
  ];
}

export default async function QuotationPage({
  params,
}: {
  params: Promise<{ ref: string }>;
}) {
  const { ref } = await params;
  const quotation = getQuotationByReference(ref);

  if (!quotation) {
    notFound();
  }

  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-500">Loading Quotation Details...</div>}>
      <QuotationClient initialQuotation={quotation} />
    </Suspense>
  );
}
