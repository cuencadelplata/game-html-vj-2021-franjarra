const CACHE_NAME = 'offline';
const OFFLINE_URL = 'offline.html';


const recursos_Cachear = ['files/index.html'];

//self.addEventListener('install', function(event) {
  //console.log('[ServiceWorker] Install');
  
  //event.waitUntil((async () => {
    //const cache = await caches.open(CACHE_NAME);
    // Setting {cache: 'reload'} in the new request will ensure that the response
    // isn't fulfilled from the HTTP cache; i.e., it will be from the network.
    //await cache.add(new Request(OFFLINE_URL, {cache: 'reload'}));
  //})());
  
  //self.skipWaiting();
//});

self.addEventListener('install', (event) => {
  console.log('[Service Worker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
          console.log('[Servicio Worker] Almacena todo en caché: contenido e intérprete de la aplicación');
      return cache.addAll(recursos_Cachear);
    })
  );
});


self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil((async () => {
    // Enable navigation preload if it's supported.
    // See https://developers.google.com/web/updates/2017/02/navigation-preload
    if ('navigationPreload' in self.registration) {
      await self.registration.navigationPreload.enable();
    }
  })());

  // Tell the active service worker to take control of the page immediately.
  self.clients.claim();
});


self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((r) => {
          console.log('[Servicio Worker] Obteniendo recurso: '+event.request.url);
      return r || fetch(event.request).then((response) => {
                return caches.open(CACHE_NAME).then((cache) => {
          console.log('[Servicio Worker] Almacena el nuevo recurso: '+event.request.url);
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});