import type { Metadata, Viewport } from 'next';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { MobileStickyBar } from '@/components/common/MobileStickyBar';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Sangam Diagnostics | Accuracy | Clarity | Reliable Results',
  description:
    'NABL Accredited Diagnostic Laboratory (Certificate MC-7078). Book Basic Health Package at ₹999, Full Body Health Checkup at ₹1,399, Hair Fall Screening & 100+ diagnostic tests. Free home sample collection in Delhi, Greater Noida, and NCR. Call 7982348151.',
  keywords: [
    'Sangam Diagnostics',
    'blood test at home',
    'basic health package 999',
    'full body checkup delhi',
    'blood test greater noida',
    'NABL laboratory kamla nagar',
    'lipid profile test',
    'CBC test price',
    'thyroid profile test',
    'LFT KFT test',
  ],
  authors: [{ name: 'Sangam Diagnostics' }],
  metadataBase: new URL('https://sangamdiagnostics.in'),
  openGraph: {
    title: 'Sangam Diagnostics — Stay Healthy, Stay Ahead',
    description:
      'NABL Accredited Laboratory (MC-7078). Comprehensive Basic Health Package at ₹999 with 9 core test categories. Free Home Sample Collection. Fast 12-14 hr report turnaround.',
    url: 'https://sangamdiagnostics.in',
    siteName: 'Sangam Diagnostics',
    images: [
      {
        url: '/images/basic-health-package-poster.jpeg',
        width: 1200,
        height: 630,
        alt: 'Sangam Diagnostics Basic Health Package Offer ₹999',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/icons/icon-192x192.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#0b3866',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

import { Suspense } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${plusJakarta.variable}`}>
      <body className="font-sans bg-slate-50 text-slate-900 antialiased min-h-screen flex flex-col selection:bg-[#00a896] selection:text-white">
        <CartProvider>
          <Suspense fallback={<div className="h-20 bg-white border-b border-slate-100" />}>
            <Header />
          </Suspense>
          <main className="flex-1 pb-16 md:pb-0">{children}</main>
          <Footer />
          <MobileStickyBar />
        </CartProvider>
      </body>
    </html>
  );
}
