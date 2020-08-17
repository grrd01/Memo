/**
 * grrd's Memo
 * Copyright (c) 2020 Gerard Tyedmers, grrd@gmx.net
 * @license MPL-2.0
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
var CACHE_NAME="grrds-Memo-cache",CACHE_VERSION="v0.1",CACHE=CACHE_NAME+"-"+CACHE_VERSION,urlsToCache=["index.html","images/2player.svg","images/4inarow.svg","images/back.svg","images/cards.svg","images/dice.svg","images/favicon.ico","images/info.svg","images/mail.svg","images/next.svg","images/ok.svg","images/photo.svg","images/prev.svg","images/puzzle.svg","images/tictactoe.svg","images/x.svg","scripts/app.js","styles/app.css"];self.addEventListener("install",function(e){"use strict";e.waitUntil(caches.open(CACHE).then(function(e){return console.log("Opened cache"),e.addAll(urlsToCache)}))}),self.addEventListener("fetch",function(e){"use strict";e.respondWith(caches.match(e.request).then(function(s){if(s)return s;var t=e.request.clone();return fetch(t).then(function(s){if(!s||200!==s.status||"basic"!==s.type)return s;var t=s.clone();return caches.open(CACHE).then(function(s){s.put(e.request,t)}),s})}))}),self.addEventListener("activate",function(e){"use strict";e.waitUntil(caches.keys().then(function(e){return Promise.all(e.map(function(e){if(0===e.indexOf(CACHE_NAME)&&-1===e.indexOf(CACHE_VERSION))return console.log(e+" deleted"),caches.delete(e)}))}))});