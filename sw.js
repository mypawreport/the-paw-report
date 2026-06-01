const CACHE = 'paw-v4';
const PRECACHE = ['./', './index.html', './manifest.json', './sw.js'];

// Install - precache core files
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate - clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => clients.claim())
  );
});

// Fetch - cache first for assets, network first for navigation
self.addEventListener('fetch', e => {
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(() => caches.match('./index.html'))
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(resp => {
      if (resp && resp.status === 200 && e.request.url.startsWith(self.location.origin)) {
        const clone = resp.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
      }
      return resp;
    }))
  );
});

// Push notifications
self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : { title: '🐾 Paw Report', body: 'Check conditions before your walk!' };
  e.waitUntil(
    self.registration.showNotification(data.title || '🐾 Paw Report', {
      body: data.body || 'Walking conditions have changed.',
      icon: 'https://base44.app/api/apps/6a1c6fbdd48b351a9eb7455e/files/mp/public/6a1c6fbdd48b351a9eb7455e/18986cbf5_icon-192.png',
      badge: 'https://base44.app/api/apps/6a1c6fbdd48b351a9eb7455e/files/mp/public/6a1c6fbdd48b351a9eb7455e/18986cbf5_icon-192.png',
      vibrate: [200, 100, 200],
      tag: 'paw-alert',
      data: { url: self.registration.scope }
    })
  );
});

// Notification click
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow(e.notification.data?.url || self.registration.scope));
});

// Background sync
self.addEventListener('sync', e => {
  if (e.tag === 'paw-sync') {
    e.waitUntil(Promise.resolve());
  }
});

// Periodic background sync
self.addEventListener('periodicsync', e => {
  if (e.tag === 'paw-check') {
    e.waitUntil(Promise.resolve());
  }
});
