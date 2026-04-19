const CACHE_NAME = "scanner-v3";

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll([
        "./",
        "./index.html",
        "./manifest.json"
      ])
    )
  );
});

self.addEventListener("fetch", event => {

  // 🔥 NEVER cache Apps Script calls
  if (event.request.url.includes("script.google.com")) {
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
