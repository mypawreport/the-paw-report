const CACHE_NAME = 'paw-report-v219';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/legal.html',
  '/bark.mp3',
  '/bark.wav',
  '/badge-96.png'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS).catch(() => {}))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  // Never cache API calls — always network
  if (event.request.url.includes('base44.app') || event.request.url.includes('api.base44.com') || event.request.url.includes('api.open-meteo.com') || event.request.url.includes('nominatim.openstreetmap.org') || event.request.url.includes('overpass-api.de') || event.request.url.includes('api.usa.gov') || event.request.url.includes('api.stripe.com') || event.request.url.includes('api/')) {
    event.respondWith(fetch(event.request));
    return;
  }
  // NETWORK-FIRST for everything else. Previously this was cache-first (caches.match
  // before fetch), which meant that once the SW cached index.html once, every future
  // app open kept serving that STALE copy forever — no matter how many new versions
  // were deployed to GitHub Pages — until the SW script's own bytes happened to change
  // and trigger a re-install. That silently broke live-updates for anyone with the PWA
  // already installed. Now: always try the network first (so deploys reach users
  // immediately while online), and only fall back to the cached copy if the network
  // request fails (offline support).
  event.respondWith(
    fetch(event.request).then(function(response) {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(function(cache) { cache.put(event.request, copy).catch(() => {}); });
      return response;
    }).catch(function() {
      return caches.match(event.request);
    })
  );
});

self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  event.waitUntil(self.registration.showNotification(data.title || 'The Paw Report', {
    body: data.body || 'Check your walk safety now!',
    icon: '/icon-192.png',
    badge: '/badge-96.png',
    data: { url: data.url || '/' }
  }));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url || '/'));
});
