/* RRO Observation Checklist service worker.
   Caches the whole app on first open so it runs with no signal.
   When you change any file, bump VERSION so phones pick up the new copy. */
var VERSION = "rro-v3";
var FILES = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "fonts/Montserrat.woff2",
  "fonts/OpenSans.woff2",
  "icon-192.png",
  "icon-512.png",
  "icon-maskable-512.png",
  "apple-touch-icon.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(FILES); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

/* Cache first: the app opens instantly and offline. A new VERSION replaces the cache. */
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  var url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(function (hit) {
      if (hit) return hit;
      return fetch(e.request).then(function (res) {
        if (res.ok) { var copy = res.clone(); caches.open(VERSION).then(function (c) { c.put(e.request, copy); }); }
        return res;
      }).catch(function () {
        if (e.request.mode === "navigate") return caches.match("index.html");
      });
    })
  );
});
