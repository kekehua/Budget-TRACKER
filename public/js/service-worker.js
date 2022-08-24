const APP_PREFIX = 'BudgetTracker';
const VERSION = 'v1.0';
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [
    './index.html',
    './css/styles.css',
    './js/index.js',
    './js/db.js',
    './manifest.json',
    './icons/icon-512x512.png',
    './icons/icon-384x384.png',
    './icons/icon-192x192.png',
    './icons/icon-152x152.png',
    './icons/icon-144x144.png',
    './icons/icon-128x128.png',
    './icons/icon-96x96.png',
    './icons/icon-72x72.png'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function (cache) {
            return cache.addAll(FILES_TO_CACHE)
        })
    )
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (keyList) {
            let cacheKeeplist = keyList.filter(function (key) {
                return key.indexOf(APP_PREFIX);
            });
            cacheKeeplist.push(CACHE_NAME);

            return Promise.all(keyList.map(function (key, i) {
                if (cacheKeeplist.indexOf(key) === -1) {
                    console.log('deleting cache : ' + keyList[i] );
                    return caches.delete(keyList[i]);
                }
            }));
        })
    )
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (request) {
            if (request) { // if cache is available, respond with cache
                return request
            } else {       // if there are no cache, try fetching request
                return fetch(e.request)
            }

        })
    )
});