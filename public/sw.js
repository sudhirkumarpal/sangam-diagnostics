const CACHE_NAME = 'sangam-diagnostics-v1';
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/offline.html',
  '/images/basic-health-package-poster.jpeg',
  '/images/full-body-health-checkup.jpeg',
  '/images/hair-fall-screening-package.jpeg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // CRITICAL SECURITY RULE: Do NOT cache private reports, patient prescriptions, quotations, or administrative APIs
  const url = new URL(event.request.url);
  if (
    url.pathname.startsWith('/api/reports') ||
    url.pathname.startsWith('/api/bookings') ||
    url.pathname.startsWith('/api/prescriptions') ||
    url.pathname.startsWith('/api/quotations') ||
    url.pathname.startsWith('/api/auth') ||
    url.pathname.startsWith('/reports') ||
    url.pathname.startsWith('/quotation') ||
    url.pathname.startsWith('/prescription-upload') ||
    url.pathname.startsWith('/admin')
  ) {
    return; // Pass through directly to network
  }

  // Safe public assets
  if (event.request.method === 'GET') {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        return (
          cached ||
          fetch(event.request).catch(() => {
            if (event.request.headers.get('accept')?.includes('text/html')) {
              return caches.match('/offline.html');
            }
          })
        );
      })
    );
  }
});
