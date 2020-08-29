/**
 * grrd's Memo
 * Copyright (c) 2020 Gerard Tyedmers, grrd@gmx.net
 * @license MPL-2.0
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
!function(){"use strict";let e=0;const t=[{desc:"grrd’s Memo is a HTML5 Game that works offline.",help:"Flip the cards and find the pairs. Is your memory good enough to remember?",themes_txt:["Animals","Flowers","Masha"],cards:"Cards",players:"Players",start:"Play",dev:"Developed by Gérard Tyedmers.",look:"Have a look at my other games:",and:"and",begin:"begins.",play:"plays",has:"has now",win:"wins with",pair:"pair.",pairs:"pairs.",pairs2:"pairs.",tries:"lCards pairs revealed in lTries attempts.",draw:"draw",player:"Player",turn:"'s turn.",won:"has won!",score:"Score:",draw2:"This game ends in a draw."},{desc:"grrd's Tic Tac Toe ist ein HTML5 Spiel, welches offline funktioniert",help:"Dreh die Karten um und finde die Paare. Ist dein Gedächtnis gut genug?",themes_txt:["Tiere","Blumen","Mascha"],cards:"Karten",players:"Spieler",start:"Start",dev:"Entwickelt von Gérard Tyedmers.",look:"Schau dir auch meine anderen Spiele an: ",and:"und",begin:"beginnt.",play:"spielt",has:"hat nun",win:"gewinnt mit",pair:"Paar.",pairs:"Paare.",pairs2:"Paaren.",tries:"lCards Paare in lTries Versuchen aufgedeckt.",draw:"unentschieden",player:"Spieler",turn:"ist am Zug.",won:"hat gewonnen!",score:"Resultat:",draw2:"Diese Partie endet unentschieden."}],s=function(e){return document.getElementById(e)},n=s("iPopupInfo"),a=s("iPopupScore"),i=s("iTitle"),r=s("iGame"),l=document.getElementsByClassName("title2card"),o=s("grid");let d;const c=o.getElementsByClassName("flip-container");let u,m=[],p=24;const g=["animals","flowers","mascha"];let h=0;const f=[6,12,24,32,48];let L,y=2,w=2,T=[],E=[];function v(e){for(u=e.length-1;u>0;u-=1){const t=Math.floor(Math.random()*(u+1));[e[u],e[t]]=[e[t],e[u]]}return e}function M(){n.classList.remove("popup-init"),n.classList.remove("popup-hide"),n.classList.add("popup-show")}function C(){n.classList.remove("popup-show"),n.classList.add("popup-hide")}function N(n){let a=parseInt(n.target.getAttribute("data-step"));h+a>=0&&h+a<g.length&&(h+=a,s("lTheme").innerHTML=t[e].themes_txt[h],s("iTheme").src="images/"+g[h]+".svg")}function B(e){let t=parseInt(e.target.getAttribute("data-step"));y+t>=0&&y+t<f.length&&(y+=t,s("lCards").innerHTML=f[y],s("iCards").src="images/cards"+f[y]+".svg")}function k(e){let t=parseInt(e.target.getAttribute("data-step"));w+t>0&&w+t<6&&(w+=t,s("lPlayers").innerHTML=w,s("iPlayers").src="images/player"+w+".svg")}function H(){let e=.7*Math.sqrt((document.documentElement.clientHeight-40)*document.documentElement.clientWidth/f[y]);o.setAttribute("style","grid-template-columns: repeat(auto-fill, minmax("+e+"px, 1fr))"),document.getElementsByTagName("header")[0].setAttribute("style","display: flex; flex-wrap: wrap;"),s("iStart").getBoundingClientRect().bottom>window.innerHeight&&document.getElementsByTagName("header")[0].setAttribute("style","display: flex; flex-wrap: nowrap;")}function b(n){return function(){!function(n){if(!n.classList.contains("turned")&&(2===m.length&&(m[0].classList.remove("turned"),m[1].classList.remove("turned"),m=[]),m.push(n),E[L]+=1,2===m.length&&(m[0].getElementsByClassName("image")[0].src===m[1].getElementsByClassName("image")[0].src?(T[L]+=1,1===T[L]?s("iMessage").innerHTML=t[e].player+" "+(L+1)+" "+t[e].has+" "+T[L]+" "+t[e].pair:s("iMessage").innerHTML=t[e].player+" "+(L+1)+" "+t[e].has+" "+T[L]+" "+t[e].pairs,m=[]):((L+=1)===w&&(L=0),s("iMessage").innerHTML=t[e].player+" "+(L+1)+" "+t[e].turn)),n.classList.toggle("turned"),o.getElementsByClassName("turned").length===f[y])){let n=T.indexOf(Math.max(...T)),i=Math.max(...T);s("lWinner").innerHTML=1===w?t[e].tries.replace("lCards",f[y]/2).replace("lTries",E[0]/2):t[e].player+" "+(n+1)+" "+t[e].win+" "+i+" "+t[e].pairs2,a.classList.remove("popup-init"),a.classList.remove("popup-hide"),a.classList.add("popup-show")}}(n)}}function P(){let n=[],a=[];for(o.innerHTML="",T=new Array(w).fill(0),E=new Array(w).fill(0),L=0,m=[],s("iMessage").innerHTML=t[e].player+" 1 "+t[e].begin,u=0;u<p;u+=1)n.push(u+1);for(v(n),u=0;u<f[y]/2;u+=1)a.push(n[u]),a.push(n[u]);for(v(a),u=0;u<f[y];u+=1)(d=document.getElementsByClassName("dummy")[0].getElementsByClassName("flip-container")[0].cloneNode(!0)).getElementsByClassName("image")[0].src="images/"+g[h]+"/"+a[u]+".jpg",o.appendChild(d);for(u=0;u<c.length;u+=1)c[u].onclick=b(c[u]);H(),i.classList.remove("swipe-out-right"),r.classList.remove("swipe-in-left"),i.classList.add("swipe-out"),r.classList.add("swipe-in")}function S(){i.classList.remove("swipe-out"),r.classList.remove("swipe-in"),i.classList.add("swipe-out-right"),r.classList.add("swipe-in-left")}function A(){a.classList.remove("popup-show"),a.classList.add("popup-hide"),setTimeout(function(){S()},600)}window.addEventListener("resize",function(){H()}),function(){const n=(function(e){let t=new URLSearchParams(window.location.search);return!!t.has(e)&&t.get(e)}("lang")||navigator.language||navigator.browserLanguage||(navigator.languages||["en"])[0]).substring(0,2).toLowerCase();"de"===n?e=1:"fr"===n&&(e=2),e&&document.documentElement.setAttribute("lang",n),s("lTheme").innerHTML=t[e].themes_txt[h],s("lCardsLabel").innerHTML=t[e].cards,s("lPlayersLabel").innerHTML=t[e].players,s("lStart").innerHTML=t[e].start,s("lDev").innerHTML=t[e].dev,s("lInstr").innerHTML=t[e].help,s("lLook").innerHTML=t[e].look,document.querySelector("meta[name='description']").setAttribute("content",t[e].desc),s("iInfo").addEventListener("click",M),s("iInfoClose").addEventListener("click",C),s("iNextTheme").addEventListener("click",N),s("iPrevTheme").addEventListener("click",N),s("iCardsUp").addEventListener("click",B),s("iCardsDown").addEventListener("click",B),s("iPlayersUp").addEventListener("click",k),s("iPlayersDown").addEventListener("click",k),s("iStart").addEventListener("click",P),s("iClose").addEventListener("click",S),s("iOK").addEventListener("click",A),document.querySelectorAll("tspan").forEach(function(e){e.innerHTML="grrd's Memo grrd's Memo grrd's Memo grrd's Memo grrd's Memo"}),document.querySelectorAll(".popup-head").forEach(function(e){e.appendChild(document.getElementsByClassName("title1")[0].cloneNode(!0)),e.appendChild(document.getElementsByClassName("title2")[0].cloneNode(!0))}),Array.from(l).forEach(function(e){var t;e.onclick=(t=e,function(){t.classList.toggle("turned")})}),document.querySelectorAll(".popup-head .title2card").forEach(function(e){e.classList.add("turned")}),setTimeout(function(){document.getElementsByClassName("cardM")[0].classList.add("turned")},500),setTimeout(function(){document.getElementsByClassName("cardE")[0].classList.add("turned")},1e3),setTimeout(function(){document.getElementsByClassName("cardM")[0].classList.remove("turned")},1700),setTimeout(function(){document.getElementsByClassName("cardE")[0].classList.remove("turned")},1900),setTimeout(function(){document.getElementsByClassName("cardM2")[0].classList.add("turned")},2500),setTimeout(function(){document.getElementsByClassName("cardM")[0].classList.add("turned")},3e3),setTimeout(function(){document.getElementsByClassName("cardE")[0].classList.add("turned")},3700),setTimeout(function(){document.getElementsByClassName("cardO")[0].classList.add("turned")},4300),H()}()}();