importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

if (workbox) {
  console.log(`WorkBox Berhasil dimuat`);
} else {
  console.log(`Workbox gagal dimuat`);
}

workbox.precaching.precacheAndRoute(
  [
    { url: "/", revision: "1" },
    { url: "/index.html", revision: "1" },
    { url: "/manifest.json", revision: "1" },
    { url: "/service-worker.js", revision: "1" },
    { url: "/pages/nav.html", revision: "1" },
    { url: "/css/materialize.min.css", revision: "1" },
    { url: "/css/style.css", revision: "1" },
    { url: "/js/materialize.min.js", revision: "1" },
    { url: "/js/main.js", revision: "1" },
    { url: "/js/api.js", revision: "1" },
    { url: "/js/data.js", revision: "1" },
    { url: "/js/db.js", revision: "1" },
    { url: "/js/idb.js", revision: "1" },
    { url: "/js/nav.js", revision: "1" },
    { url: "/js/node.js", revision: "1" },
    { url: "/img/club/default-team-logo.png", revision: "1" },
    { url: "/img/icons/icon-72x72.png", revision: "1" },
    { url: "/img/icons/icon-96x96.png", revision: "1" },
    { url: "/img/icons/icon-128x128.png", revision: "1" },
    { url: "/img/icons/icon-144x144.png", revision: "1" },
    { url: "/img/icons/icon-152x152.png", revision: "1" },
    { url: "/img/icons/icon-192x192.png", revision: "1" },
    { url: "/img/icons/icon-384x384.png", revision: "1" },
    { url: "/img/icons/icon-512x512.png", revision: "1" },
    { url: "/img/ball.png", revision: "1" },
    { url: "/img/bundesliga.jpg", revision: "1" },
    { url: "/img/brazil-serie-a.jpg", revision: "1" },
    { url: "/img/clasemenbola-logo.png", revision: "1" },
    { url: "/img/eredivisi.jpg", revision: "1" },
    { url: "/img/HERO.png", revision: "1" },
    { url: "/img/italy-serie-a.jpg", revision: "1" },
    { url: "/img/ligue-1.jpg", revision: "1" },
    { url: "/img/premier-league.jpg", revision: "1" },
    { url: "/img/primeira-liga.jpg", revision: "1" },
    { url: "/img/primera-division.jpg", revision: "1" },
  ],
  {
    ignoreUrlParametersMatching: [/.*/],
  }
);

workbox.routing.registerRoute(
  new RegExp("https://api.football-data.org/v2/"),
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  /.*(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: "images-cache",
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  new RegExp("/pages/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "pages",
  })
);

workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "google-fonts-stylesheets",
  })
);

self.addEventListener("push", function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  var options = {
    body: body,
    icon: "/img/icons/icon-128x128.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(self.registration.showNotification("ClasemenBola!", options));
});
