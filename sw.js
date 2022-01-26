/**
 * grrd's Memo
 * Copyright (c) 2020 Gerard Tyedmers, grrd@gmx.net
 * @license MPL-2.0
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

/*jslint devel: true, browser: true, long: true */ /*global self fetch */

const CACHE_NAME = "grrds-Memo-cache";
const CACHE_VERSION = "v4.3";
const CACHE = CACHE_NAME + "-" + CACHE_VERSION;

const urlsToCache = [
    "index.html",

    "images/animals/1.jpg",
    "images/animals/2.jpg",
    "images/animals/3.jpg",
    "images/animals/4.jpg",
    "images/animals/5.jpg",
    "images/animals/6.jpg",
    "images/animals/7.jpg",
    "images/animals/8.jpg",
    "images/animals/9.jpg",
    "images/animals/10.jpg",
    "images/animals/11.jpg",
    "images/animals/12.jpg",
    "images/animals/13.jpg",
    "images/animals/14.jpg",
    "images/animals/15.jpg",
    "images/animals/16.jpg",
    "images/animals/17.jpg",
    "images/animals/18.jpg",
    "images/animals/19.jpg",
    "images/animals/20.jpg",
    "images/animals/21.jpg",
    "images/animals/22.jpg",
    "images/animals/23.jpg",
    "images/animals/24.jpg",

    "images/flowers/1.jpg",
    "images/flowers/2.jpg",
    "images/flowers/3.jpg",
    "images/flowers/4.jpg",
    "images/flowers/5.jpg",
    "images/flowers/6.jpg",
    "images/flowers/7.jpg",
    "images/flowers/8.jpg",
    "images/flowers/9.jpg",
    "images/flowers/10.jpg",
    "images/flowers/11.jpg",
    "images/flowers/12.jpg",
    "images/flowers/13.jpg",
    "images/flowers/14.jpg",
    "images/flowers/15.jpg",
    "images/flowers/16.jpg",
    "images/flowers/17.jpg",
    "images/flowers/18.jpg",
    "images/flowers/19.jpg",
    "images/flowers/20.jpg",
    "images/flowers/21.jpg",
    "images/flowers/22.jpg",
    "images/flowers/23.jpg",
    "images/flowers/24.jpg",

    "images/fruits/1.jpg",
    "images/fruits/2.jpg",
    "images/fruits/3.jpg",
    "images/fruits/4.jpg",
    "images/fruits/5.jpg",
    "images/fruits/6.jpg",
    "images/fruits/7.jpg",
    "images/fruits/8.jpg",
    "images/fruits/9.jpg",
    "images/fruits/10.jpg",
    "images/fruits/11.jpg",
    "images/fruits/12.jpg",
    "images/fruits/13.jpg",
    "images/fruits/14.jpg",
    "images/fruits/15.jpg",
    "images/fruits/16.jpg",
    "images/fruits/17.jpg",
    "images/fruits/18.jpg",
    "images/fruits/19.jpg",
    "images/fruits/20.jpg",
    "images/fruits/21.jpg",
    "images/fruits/22.jpg",
    "images/fruits/23.jpg",
    "images/fruits/24.jpg",

    "images/4inarow.svg",
    "images/animals.svg",
    "images/back.svg",
    "images/bulp.svg",
    "images/cards6.svg",
    "images/cards12.svg",
    "images/cards24.svg",
    "images/cards32.svg",
    "images/cards48.svg",
    "images/dice.svg",
    "images/down.svg",
    "images/escfullscreen.svg",
    "images/favicon.ico",
    "images/flowers.svg",
    "images/fruits.svg",
    "images/fullscreen.svg",
    "images/info.svg",
    "images/language.svg",
    "images/mail.svg",
    "images/mascha.svg",
    "images/next.svg",
    "images/ok.svg",
    "images/photo.svg",
    "images/player1.svg",
    "images/player2.svg",
    "images/player3.svg",
    "images/player4.svg",
    "images/player5.svg",
    "images/prev.svg",
    "images/puzzle.svg",
    "images/settings.svg",
    "images/sound_off.svg",
    "images/sound_on.svg",
    "images/tictactoe.svg",
    "images/x.svg",
    "scripts/app.js",
    "styles/app.css",
    "sounds/woosh.mp3",
    "sounds/woosh.ogg",
    "sounds/ding.mp3",
    "sounds/ding.ogg"
];

self.addEventListener("install", function (event) {
    "use strict";
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE).then(function (cache) {
            console.log("Opened cache");
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function (event) {
    "use strict";
    event.respondWith(
        caches.match(event.request).then(function (response) {
            // Cache hit - return response
            if (response) {
                return response;
            }

            // IMPORTANT: Clone the request. A request is a stream and
            // can only be consumed once. Since we are consuming this
            // once by cache and once by the browser for fetch, we need
            // to clone the response.
            const fetchRequest = event.request.clone();

            return fetch(fetchRequest).then(
                function (response) {
                    // Check if we received a valid response
                    if (!response || response.status !== 200 || response.type !== "basic") {
                        return response;
                    }

                    // IMPORTANT: Clone the response. A response is a stream
                    // and because we want the browser to consume the response
                    // as well as the cache consuming the response, we need
                    // to clone it so we have two streams.
                    const responseToCache = response.clone();

                    caches.open(CACHE).then(function (cache) {
                        cache.put(event.request, responseToCache);
                    });

                    return response;
                }
            );
        })
    );
});

self.addEventListener("activate", function (event) {
    "use strict";
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(cacheNames.map(function (cacheName) {
                if (cacheName.indexOf(CACHE_NAME) === 0 && cacheName.indexOf(CACHE_VERSION) === -1) {
                    console.log(cacheName + " deleted");
                    return caches.delete(cacheName);
                }
            }));
        })
    );
});
