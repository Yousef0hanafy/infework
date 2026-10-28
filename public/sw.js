// Infeworks Progressive Web App Service Worker
const CACHE_NAME = "infeworks-pwa-v3";
const RUNTIME_CACHE_NAME = `${CACHE_NAME}-assets`;
const STATIC_ASSETS = [
  "/offline.html",
  "/manifest.webmanifest",
  "/pwa-192x192.png",
  "/pwa-512x512.png",
  "/maskable-icon-512x512.png",
  "/apple-touch-icon.png",
  "/favicon.png",
  "/logo.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => {
        return Promise.all(
          keys.map((key) => {
            if (
              key.startsWith("infeworks-pwa-") &&
              key !== CACHE_NAME &&
              key !== RUNTIME_CACHE_NAME
            ) {
              return caches.delete(key);
            }
          }),
        );
      })
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Always bypass caching for API, Supabase, non-GET, or chrome-extension requests
  if (
    request.method !== "GET" ||
    url.origin !== self.location.origin ||
    request.headers.has("authorization") ||
    url.pathname.startsWith("/_serverFn") ||
    url.pathname.startsWith("/admin") ||
    url.pathname.startsWith("/api") ||
    url.hostname.includes("supabase")
  ) {
    return;
  }

  // Network-first with cache fallback for navigation & pages
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        const offline = await caches.match("/offline.html");
        return (
          offline ||
          new Response("Offline", {
            status: 503,
            headers: { "Content-Type": "text/plain" },
          })
        );
      }),
    );
    return;
  }

  // Cache only public static assets; server functions must always reach the network.
  if (!/^\/(?:assets|images|hero|fonts)\//.test(url.pathname)) return;

  // Stale-while-revalidate for static assets (images, css, js, fonts)
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then(async (networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            await caches
              .open(RUNTIME_CACHE_NAME)
              .then(async (cache) => {
                await cache.put(request, responseToCache);
                const keys = await cache.keys();
                await Promise.all(
                  keys.slice(0, Math.max(0, keys.length - 180)).map((key) => cache.delete(key)),
                );
              })
              .catch(() => {});
          }
          return networkResponse;
        })
        .catch(() => cachedResponse || Response.error());
      // Extend lifetime while the background refresh is pending, even on a cache hit.
      event.waitUntil(fetchPromise.then(() => {}));

      return cachedResponse || fetchPromise;
    }),
  );
});
