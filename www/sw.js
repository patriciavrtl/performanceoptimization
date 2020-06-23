self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open('fxcalc-v1')
            .then((cache) => cache.addAll(['index.html', 'manifest.webmanifest']))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.open('fxcalc-v1').then((cache) => {
            return fetch(event.request)
                .then((response) => {
                    cache.put(event.request, response.clone());
                    return response;
                })
                .catch(() => cache.match(event.request));
        })
    );
});