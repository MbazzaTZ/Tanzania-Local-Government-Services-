const CACHE_NAME = "localgovtz-pwa-v1";
const OFFLINE_URL = "/offline.html";

//  Core assets to pre-cache during installation
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/offline.html",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/icons/maskable-icon.png"
];

//  Install Event  Cache essential assets
self.addEventListener("install", (event) => {
  console.log("[ServiceWorker] Install event: caching offline page and core assets");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

//  Activate Event  Clear old caches
self.addEventListener("activate", (event) => {
  console.log("[ServiceWorker] Activating new service worker...");
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => {
        if (key !== CACHE_NAME) {
          console.log("[ServiceWorker] Removing old cache:", key);
          return caches.delete(key);
        }
      }))
    )
  );
  self.clients.claim();
});

//  Fetch Event  Serve from cache, fallback to network or offline.html
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests (POST, PUT, etc.)
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone response and store it in cache for future use
        const clonedResponse = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, clonedResponse);
        });
        return response;
      })
      .catch(async () => {
        // Try cache first
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }

        // Return offline fallback page for HTML navigation requests
        if (event.request.headers.get("accept")?.includes("text/html")) {
          return caches.match(OFFLINE_URL);
        }

        return new Response("Offline", {
          status: 503,
          statusText: "Service Unavailable",
          headers: { "Content-Type": "text/plain" }
        });
      })
  );
});

//  Listen for skipWaiting() trigger from app updates
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
