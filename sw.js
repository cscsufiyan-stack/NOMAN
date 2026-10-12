const CACHE_NAME = "noman-app-shell-v2";
self.addEventListener("install", event => { self.skipWaiting(); });
self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith("noman-app-shell-") && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
// Deliberately do not cache app/API/Firebase responses; keep existing live data behavior unchanged.
self.addEventListener("fetch", event => {});
