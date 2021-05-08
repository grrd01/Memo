/**
 * grrd's Memo
 * Copyright (c) 2020 Gerard Tyedmers, grrd@gmx.net
 * @license MPL-2.0
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
!function(){"use strict";let e=0;const t=[{code:"en",lang:"English",style:["Light mode","Dark mode","Automatic"],sound:["Sound: off","Sound: on"],desc:"grrd’s Memo is a HTML5 Game that works offline.",help:"Flip the cards and find the pairs. Is your memory good enough to remember?",themes_txt:["Own Images","Animals","Flowers","Fruits","Masha"],cards:"Cards",player:"Player",players:"Players",start:"Play",dev:"Developed by Gérard Tyedmers.",look:"Have a look at my other games:",begin:"begins.",has:"has now",and:"and",win:"wins with",win2:"win with",pair:"pair",pairs:"pairs",pairs2:"pairs",tries:"tries",rank:"rank",stats:"lCards pairs revealed in lTries attempts.",turn:"lPlayer 's turn.",own:"Click on a card to choose your image.",ownanz:"lAnz images needed to start the game.",ownanz2:"lAnz more images needed to start the game.",ownanz3:"lAnz more image needed to start the game.",ownanz4:"Press Play to start the game.",cancel:"Cancel"},{code:"de",lang:"Deutsch",style:["Ansicht: Hell","Ansicht: Dunkel","Automatisch"],sound:["Ton: aus","Ton: an"],desc:"grrd's Memo ist ein HTML5 Spiel, welches offline funktioniert",help:"Dreh die Karten um und finde die Paare. Ist dein Gedächtnis gut genug?",themes_txt:["Eigene Bilder","Tiere","Blumen","Früchte","Mascha"],cards:"Karten",player:"Spieler",players:"Spieler",start:"Play",dev:"Entwickelt von Gérard Tyedmers.",look:"Schau dir auch meine anderen Spiele an: ",begin:"beginnt.",has:"hat nun",and:"und",win:"gewinnt mit",win2:"gewinnen mit",pair:"Paar",pairs:"Paare",pairs2:"Paaren",tries:"Versuche",rank:"Rang",stats:"lCards Paare in lTries Versuchen aufgedeckt.",turn:"lPlayer ist am Zug.",own:"Klick auf eine Karte, um dein Bild zu wählen.",ownanz:"Wähle lAnz Bilder, um das Spiel zu beginnen.",ownanz2:"Wähle noch lAnz Bilder, um das Spiel zu beginnen.",ownanz3:"Wähle noch lAnz Bild, um das Spiel zu beginnen.",ownanz4:"Drücke auf Play, um das Spiel zu beginnen.",cancel:"Abbrechen"},{code:"fr",lang:"Français",style:["Mode claire","Mode sombre","Automatique"],sound:["Son: muet","Son: activé"],desc:"grrd's Memo est un jeu en HTML5 qui fonctionne hors ligne.",help:"Retournez les cartes et trouvez les paires. Votre mémoire est-elle assez bonne?",themes_txt:["Images personnelles","Animaux","Fleurs","Fruits","Mascha"],cards:"Cartes",player:"Joueur",players:"Joueurs",start:"Play",dev:"Développé par Gérard Tyedmers.",look:"Regardez aussi mes autres jeux: ",begin:"commence.",has:"a maintenant",and:"et",win:"gagne avec",win2:"gagnent avec",pair:"paire",pairs:"paires",pairs2:"paires",tries:"Essais",rank:"Rang",stats:"lCards paires révélées en lTries essais.",turn:"Au tour du lPlayer.",own:"Cliquez sur une carte pour choisir votre image.",ownanz:"Sélectionnez lAnz images pour commencer le jeu.",ownanz2:"Sélectionnez lAnz autres images pour commencer le jeu.",ownanz3:"Sélectionnez lAnz autre image pour commencer le jeu.",ownanz4:"Appuyez sur la touche Play pour commencer le jeu.",cancel:"Annuler"},{code:"es",lang:"Español",style:["Modo de luz","Modo oscuro ","Automático"],sound:["Sonido: mudo","Sonido: en"],desc:"grrd's Memo es un juego HTML5 que funciona fuera de línea.",help:"Voltea las cartas y encuentra los pares. ¿Es tu memoria lo suficientemente buena?",themes_txt:["Imágenes personales","Animales","Flores","Frutas","Masha"],cards:"Cartas",player:"Jugador",players:"Jugadores",start:"Play",dev:"Desarrollado por Gérard Tyedmers.",look:"Echa un vistazo a mis otros juegos:",begin:"comienza.",has:"tiene ahora",and:"y",win:"gana con",win2:"ganan con",pair:"par",pairs:"pares",pairs2:"pares",tries:"intentos",rank:"rango",stats:"lCards pares revelados en lTries intentos.",turn:"Turno del lPlayer",own:"Haz clic en una carta para elegir tu imagen.",ownanz:"Selecciona lAnz imágenes para iniciar el juego.",ownanz2:"Selecciona lAnz imágenes más para empezar el juego.",ownanz3:"Selecciona lAnz imagen más para empezar el juego.",ownanz4:"Pulsa Play para iniciar el juego.",cancel:"Cancelar"},{code:"ru",lang:"русский",style:["светлый","тёмный","автомат"],sound:["Звук: выключен","Звук: включить"],desc:"grrd's Memo - это HTML5-игра, которая работает в автономном режиме.",help:"Переверните карты и найдите пары. Достаточно ли хороша твоя память, чтобы запомнить?",themes_txt:["Собственные фотографии","Животные","Цветы","Фрукты","Маша"],cards:"карты",player:"Игрок",players:"игроки",start:"Play",dev:"Разработано Gérard Tyedmers.",look:"Посмотри на мои другие игры:",begin:"начинает.",has:"теперь имеет",and:"и",win:"выигрывает с",win2:"выигрывают с",pair:"пару",pairs:"пары",pairs2:"парами",tries:"попытки",rank:"место",stats:"lCards пары выявлены в lTries попытках.",turn:"Очередь lPlayer.",own:"Нажмите на карту, чтобы выбрать изображение.",ownanz:"lAnz фотографии, необходимые для начала игры.",ownanz2:"Для начала игры нужно еще lAnz фотографии.",ownanz3:"Еще lAnz фотографии, необходимое для начала игры.",ownanz4:"Нажмите Play, чтобы начать игру.",cancel:"отменять"}],n=String.fromCharCode(160),a=function(e){return document.getElementById(e)},s=a("iPopupInfo"),i=a("iPopupSettings"),r=a("iPopupScore"),l=a("iTitle"),o=a("iGame"),c=a("tScore"),d=a("lDev"),A=a("iFullscreen"),u=a("iSettingsPlay"),m=a("iCollapsable"),g=document.getElementsByClassName("title2card"),p=a("grid");let h;const f=p.getElementsByClassName("flip-container");let w,y=[];const E=24,L=["photo","animals","flowers","fruits","mascha"];let v=1,T=0,b=-1;const M=[6,12,24,32,48];let k,B,S,z,I=2,C=2,Q=[],H=[],P=[],x=!1,_=1,N=1,F=["sound_off.svg","sound_on.svg"];const G=function(){const e="modernizr";try{return localStorage.setItem(e,e),localStorage.removeItem(e),!0}catch(e){return!1}}();function O(){document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement?a("img_fullscreen").src="images/escfullscreen.svg":a("img_fullscreen").src="images/fullscreen.svg"}function D(){e&&document.documentElement.setAttribute("lang",t[e].code),a("lLang").innerHTML=t[e].lang,a("lStyle").innerHTML=t[e].style[_],a("lSound").innerHTML=t[e].sound[N],a("iSound").src="images/"+F[N],a("lTheme").innerHTML=t[e].themes_txt[v],a("lCards").innerHTML=M[I]+n+t[e].cards,a("lPlayers").innerHTML=C+n+t[e].players,a("lStart").innerHTML=t[e].start,d.innerHTML=t[e].dev,a("lInstr").innerHTML=t[e].help,a("lLook").innerHTML=t[e].look,a("thRank").innerHTML=t[e].rank,a("thPlayer").innerHTML=t[e].player,a("thPairs").innerHTML=t[e].pairs,a("thTries").innerHTML=t[e].tries,a("lOwnImg").innerHTML=t[e].own,a("lOwnImg2").innerHTML=t[e].themes_txt[0],document.querySelector("meta[name='description']").setAttribute("content",t[e].desc)}function R(){a("lStyle").innerHTML=t[e].style[_],0===_||2===_&&z?document.getElementsByTagName("body")[0].classList.add("light"):document.getElementsByTagName("body")[0].classList.remove("light")}function U(e){for(w=e.length-1;w>0;w-=1){const t=Math.floor(Math.random()*(w+1));[e[w],e[t]]=[e[t],e[w]]}return e}function j(){for(S=0,u.disabled=!0,w=0;w<E;w+=1)a("settingsgrid").getElementsByTagName("IMG").item(w).src.endsWith("images/back.svg")||(S+=1);0===S?a("lOwnImgAnz").innerHTML=t[e].ownanz.replace("lAnz",M[I]/2):M[I]/2-S>1?a("lOwnImgAnz").innerHTML=t[e].ownanz2.replace("lAnz",M[I]/2-S):M[I]/2-S==1?a("lOwnImgAnz").innerHTML=t[e].ownanz3.replace("lAnz","1"):(a("lOwnImgAnz").innerHTML=t[e].ownanz4,u.disabled=!1)}function q(){a("iTitleFieldset").disabled=!0,document.activeElement.blur(),s.classList.remove("popup-init"),s.classList.remove("popup-hide"),s.classList.add("popup-show")}function W(){a("iTitleFieldset").disabled=!1,s.classList.remove("popup-show"),s.classList.add("popup-hide")}function K(){j(),a("iTitleFieldset").disabled=!0,document.activeElement.blur(),i.classList.remove("popup-init"),i.classList.remove("popup-hide"),i.classList.add("popup-show")}function Y(){G&&(localStorage.setItem("s_memo_sound",N),localStorage.setItem("s_memo_style",_),localStorage.setItem("s_memo_lang",e)),a("iTitleFieldset").disabled=!1,i.classList.remove("popup-show"),i.classList.add("popup-hide"),setTimeout(function(){i.classList.remove("play")},1e3)}function V(){3===(T+=1)&&(b=0,G&&localStorage.setItem("s_memo_mascha","true"))}function J(n){let a=parseInt(n.target.getAttribute("data-step"));(e+=a)<0?e=t.length-1:e>t.length-1&&(e=0),D()}function Z(e){let t=parseInt(e.target.getAttribute("data-step"));(_+=t)<0?_=2:_>2&&(_=0),R()}function X(){N=1-N,a("lSound").innerHTML=t[e].sound[N],a("iSound").src="images/"+F[N]}function $(n){let s=a("iTheme"),i=parseInt(n.target.getAttribute("data-step"));s.children.item(v).classList.remove("active"),(v+=i)<0?v=L.length+b-1:v>L.length+b-1&&(v=0),a("lTheme").innerHTML=t[e].themes_txt[v],s.children.item(v).classList.add("active")}function ee(s){let i=a("iCards"),r=parseInt(s.target.getAttribute("data-step"));I+r>=0&&I+r<M.length&&(i.children.item(I).classList.remove("active"),I+=r,a("lCards").innerHTML=M[I]+n+t[e].cards,i.children.item(I).classList.add("active"))}function te(s){let i=a("iPlayers"),r=parseInt(s.target.getAttribute("data-step"));C+r>0&&C+r<6&&(i.children.item(C-1).classList.remove("active"),C+=r,i.children.item(C-1).classList.add("active"),a("lPlayers").innerHTML=1===C?C+n+t[e].player:C+n+t[e].players)}function ne(){let e=.7*Math.sqrt((document.documentElement.clientHeight-40)*document.documentElement.clientWidth/M[I]);p.setAttribute("style","grid-template-columns: repeat(auto-fill, minmax("+e+"px, 1fr))"),document.getElementsByTagName("header")[0].setAttribute("style","display: flex; flex-wrap: wrap;"),a("iStart").getBoundingClientRect().bottom>window.innerHeight&&document.getElementsByTagName("header")[0].setAttribute("style","display: flex; flex-wrap: nowrap;")}function ae(n){if(n.classList.contains("turned"))return 2===y.length&&y.includes(n)&&(y[0].classList.remove("turned"),y[1].classList.remove("turned"),y=[]),void document.activeElement.blur();if(2===y.length&&(y[0].classList.remove("turned"),y[1].classList.remove("turned"),y=[]),y.push(n),H[k]+=1,2===y.length&&(y[0].getElementsByClassName("image")[0].src===y[1].getElementsByClassName("image")[0].src?(y[0].removeAttribute("tabindex"),y[1].removeAttribute("tabindex"),Q[k]+=1,1===Q[k]?a("iMessage").innerHTML=t[e].player+" "+(k+1)+" "+t[e].has+" "+Q[k]+" "+t[e].pair+".":a("iMessage").innerHTML=t[e].player+" "+(k+1)+" "+t[e].has+" "+Q[k]+" "+t[e].pairs+".",N&&setTimeout(function(){document.getElementById("ding_sound").play()},500),y=[]):((k+=1)===C&&(k=0),a("iMessage").innerHTML=t[e].turn.replace("lPlayer",t[e].player+" "+(k+1)))),n.classList.toggle("turned"),N&&document.getElementById("woosh_sound").play(),document.activeElement.blur(),p.getElementsByClassName("turned").length===M[I]){if(1===C)c.classList.add("hidden"),a("lWinner").innerHTML=t[e].stats.replace("lCards",M[I]/2).replace("lTries",H[0]/2);else{const n=document.createElement("tbody");let s,i,r,l="";for(c.classList.remove("hidden"),P=[],c.replaceChild(n,c.getElementsByTagName("tbody")[0]),w=0;w<C;w+=1)P.push({player:w+1,pairs:Q[w],tries:H[w]/2});for(P.sort((e,t)=>t.pairs-e.pairs||e.tries-t.tries),w=0;w<C;w+=1)P[w].rank=w+1,w>0&&P[w-1].pairs===P[w].pairs&&(P[w].rank=P[w-1].rank),1===P[w].rank&&(l+=", "+P[w].player),(i=(s=n.insertRow()).insertCell(0)).innerHTML=P[w].rank,(i=s.insertCell(1)).innerHTML=t[e].player+" "+P[w].player,(i=s.insertCell(2)).innerHTML=P[w].pairs,(i=s.insertCell(3)).innerHTML=P[w].tries;(r=l.lastIndexOf(","))>0?(l=l.substring(2,r)+" "+t[e].and+l.substring(r+1),a("lWinner").innerHTML=t[e].players+" "+l+" "+t[e].win2+" "+P[0].pairs+" "+t[e].pairs2+"."):a("lWinner").innerHTML=t[e].player+" "+P[0].player+" "+t[e].win+" "+P[0].pairs+" "+t[e].pairs2+"."}a("iGameFieldset").disabled=!0,document.activeElement.blur(),r.classList.remove("popup-init"),r.classList.remove("popup-hide"),r.classList.add("popup-show")}}function se(e){return function(){ae(e)}}function ie(e){const t=new FileReader,n=document.createElement("canvas");let a=null;const s=new Image,i={Orientation:void 0};n.id="hiddenCanvas",n.width=500,n.height=500,n.style.visibility="hidden",document.body.appendChild(n),a=n.getContext("2d"),e.target.files[0].type.match("image.*")&&t.readAsDataURL(e.target.files[0]),t.onload=function(){const t=this.result;!function(e,t){let n=new FileReader;n.onload=function(e){let n=new DataView(e.target.result);if(65496!==n.getUint16(0,!1))return t(-2);let a=n.byteLength,s=2;for(;s<a;){if(n.getUint16(s+2,!1)<=8)return t(-1);let e=n.getUint16(s,!1);if(s+=2,65505===e){if(1165519206!==n.getUint32(s+=2,!1))return t(-1);let e=18761===n.getUint16(s+=6,!1);s+=n.getUint32(s+4,e);let a=n.getUint16(s,e);for(s+=2,w=0;w<a;w+=1)if(274===n.getUint16(s+12*w,e))return t(n.getUint16(s+12*w+8,e))}else{if(65280!=(65280&e))break;s+=n.getUint16(s,!1)}}return t(-1)},n.readAsArrayBuffer(e)}(e.target.files[0],function(e){i.Orientation=e,s.src=t})},s.onload=function(){let e=0,t=0,r=Math.min(this.width,this.height);0!==this.width&&0!==this.height&&(x||(5!==i.Orientation&&6!==i.Orientation||(a.rotate(90*Math.PI/180),t=-500),3!==i.Orientation&&4!==i.Orientation||(a.rotate(180*Math.PI/180),t=-504,e=-496),7!==i.Orientation&&8!==i.Orientation||(a.rotate(270*Math.PI/180),e=-500)),a.clearRect(0,0,500,500),a.drawImage(s,this.width/2-r/2,this.height/2-r/2,r,r,e,t,500,500),B.getElementsByTagName("IMG").item(0).src=n.toDataURL("image/jpeg"),G&&(w=[...B.parentElement.children].indexOf(B),localStorage.setItem("s_memo_image"+w,n.toDataURL("image/jpeg"))),j())}}function re(){let n=[],s=[];for(p.innerHTML="",Q=new Array(C).fill(0),H=new Array(C).fill(0),k=0,y=[],a("iMessage").innerHTML=t[e].player+" 1 "+t[e].begin,w=0;w<E;w+=1)0===v?a("settingsgrid").getElementsByTagName("IMG").item(w).src.endsWith("images/back.svg")||n.push(w):n.push(w+1);for(U(n),w=0;w<M[I]/2;w+=1)s.push(n[w]),s.push(n[w]);for(U(s),w=0;w<M[I];w+=1)(h=a("iDummy").getElementsByClassName("flip-container")[0].cloneNode(!0)).getElementsByClassName("image")[0].src=0===v?a("settingsgrid").getElementsByTagName("IMG").item(s[w]).src:"images/"+L[v]+"/"+s[w]+".jpg",p.appendChild(h);for(w=0;w<f.length;w+=1)f[w].onclick=se(f[w]),f[w].onkeyup=function(e){"Enter"!==e.key&&"Space"!==e.key&&" "!==e.key||ae(e.target)};ne(),l.classList.remove("swipe-out-right"),o.classList.remove("swipe-in-left"),l.classList.add("swipe-out"),o.classList.add("swipe-in")}function le(){l.classList.remove("swipe-out"),o.classList.remove("swipe-in"),l.classList.add("swipe-out-right"),o.classList.add("swipe-in-left")}function oe(){a("iGameFieldset").disabled=!1,r.classList.remove("popup-show"),r.classList.add("popup-hide"),setTimeout(function(){le()},600)}function ce(e){let t=new URLSearchParams(window.location.search);return!!t.has(e)&&t.get(e)}function de(){0===v?(m.classList.add("show"),m.disabled=!1,a("iDown").classList.add("rotate"),i.classList.add("play"),K()):re()}document.onkeydown=function(e){const t=document.activeElement;let n,l;if(i.classList.contains("popup-show"))switch(l=(n=Array.prototype.slice.call(document.querySelectorAll("#iPopupSettings button:not(:disabled, :disabled button, .play .settings button, .playownimg button), #iPopupSettings.play .playownimg button:not(:disabled)"),0)).indexOf(t),e.key){case"ArrowUp":case"ArrowLeft":l>0&&n[n.indexOf(t)-1].focus();break;case"ArrowDown":case"ArrowRight":l<n.length-1&&n[n.indexOf(t)+1].focus();break;case"Escape":Y()}else if(s.classList.contains("popup-show"))switch(l=(n=Array.prototype.slice.call(s.getElementsByTagName("BUTTON"),0)).indexOf(t),e.key){case"ArrowUp":case"ArrowLeft":l>0&&n[n.indexOf(t)-1].focus();break;case"ArrowDown":case"ArrowRight":l<n.length-1&&n[n.indexOf(t)+1].focus();break;case"Escape":W()}else if(r.classList.contains("popup-show"))switch(e.key){case"ArrowUp":case"ArrowLeft":case"ArrowDown":case"ArrowRight":a("iOK").focus();break;case"Escape":oe()}else if(o.classList.contains("swipe-in"))switch(l=(n=Array.prototype.slice.call(document.querySelectorAll("#iClose, #grid .flip-container[tabindex = '0']"),0)).indexOf(t),e.key){case"ArrowUp":case"ArrowLeft":l>0&&n[n.indexOf(t)-1].focus();break;case"ArrowDown":case"ArrowRight":l<n.length-1&&n[n.indexOf(t)+1].focus();break;case"Escape":le()}else switch(l=(n=Array.prototype.slice.call(document.getElementById("iTitleFieldset").getElementsByTagName("BUTTON"),0)).indexOf(t),e.key){case"ArrowUp":case"ArrowLeft":l>0&&n[n.indexOf(t)-1].focus();break;case"ArrowDown":case"ArrowRight":l<n.length-1&&n[n.indexOf(t)+1].focus()}},window.addEventListener("resize",function(){ne()}),document.addEventListener("fullscreenchange",function(){O()}),document.addEventListener("mozfullscreenchange",function(){O()}),document.addEventListener("webkitfullscreenchange",function(){O()}),document.addEventListener("msfullscreenchange",function(){O()}),function(){const t=(ce("lang")||navigator.language||navigator.browserLanguage||(navigator.languages||["en"])[0]).substring(0,2).toLowerCase();"de"===t?e=1:"fr"===t?e=2:"es"===t?e=3:"ru"===t&&(e=4),G&&(N=null===localStorage.getItem("s_memo_sound")?1:parseInt(localStorage.getItem("s_memo_sound")),_=null===localStorage.getItem("s_memo_style")?1:parseInt(localStorage.getItem("s_memo_style")),e=null===localStorage.getItem("s_memo_lang")?e:parseInt(localStorage.getItem("s_memo_lang"))),D(),"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("sw.js").then(function(e){console.log("ServiceWorker registration successful with scope: ",e.scope)},function(e){console.log("ServiceWorker registration failed: ",e)})}),a("iInfo").addEventListener("click",q),a("iInfoClose").addEventListener("click",W),a("iSettings").addEventListener("click",K),a("iSettingsClose").addEventListener("click",Y),a("iSettingsCancel").addEventListener("click",Y),u.addEventListener("click",Y),u.addEventListener("click",re),a("iNextLang").addEventListener("click",J),a("iPrevLang").addEventListener("click",J),a("iNextStyle").addEventListener("click",Z),a("iPrevStyle").addEventListener("click",Z),a("iNextSound").addEventListener("click",X),a("iPrevSound").addEventListener("click",X),a("iNextTheme").addEventListener("click",$),a("iPrevTheme").addEventListener("click",$),a("iCardsUp").addEventListener("click",ee),a("iCardsDown").addEventListener("click",ee),a("iPlayersUp").addEventListener("click",te),a("iPlayersDown").addEventListener("click",te),a("iStart").addEventListener("click",de),a("iClose").addEventListener("click",le),a("iOK").addEventListener("click",oe),d.addEventListener("click",V),A.addEventListener("click",function(){!function(){const e=window.document,t=e.documentElement,n=t.requestFullscreen||t.mozRequestFullScreen||t.webkitRequestFullScreen||t.msRequestFullscreen,a=e.exitFullscreen||e.mozCancelFullScreen||e.webkitExitFullscreen||e.msExitFullscreen;e.fullscreenElement||e.mozFullScreenElement||e.webkitFullscreenElement||e.msFullscreenElement?a.call(e):n.call(t)}()}),a("iShowOwnImg").addEventListener("click",function(){m.classList.toggle("show"),m.disabled=!a("iCollapsable").disabled,a("iDown").classList.toggle("rotate")});try{window.matchMedia("(prefers-color-scheme: light)").addEventListener("change",e=>{z=e.matches,R()})}catch(e){console.log(e.message)}for(z=window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches,R(),(!(document.fullscreenEnabled||document.webkitFullscreenEnabled||document.mozFullScreenEnabled||document.msFullscreenEnabled)||!0===navigator.standalone||document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement)&&A.parentNode.removeChild(A),w=1;w<E;w+=1)a("settingsgrid").appendChild(document.getElementsByClassName("ownimg")[0].cloneNode(!0));if("true"===ce("mascha")&&(T=2,V()),G)for("true"===localStorage.getItem("s_memo_mascha")&&(b=0),w=0;w<E;w+=1)null!==localStorage.getItem("s_memo_image"+w)&&(a("settingsgrid").getElementsByTagName("IMG").item(w).src=localStorage.getItem("s_memo_image"+w));document.querySelectorAll("tspan").forEach(function(e){e.innerHTML="grrd's Memo grrd's Memo grrd's Memo grrd's Memo grrd's Memo"}),document.querySelectorAll(".popup-head").forEach(function(e){e.appendChild(document.getElementsByClassName("title1")[0].cloneNode(!0)),e.appendChild(document.getElementsByClassName("title2")[0].cloneNode(!0))}),Array.from(g).forEach(function(e){var t;e.onclick=(t=e,function(){t.classList.toggle("turned")})}),document.getElementById("b_image_input").addEventListener("change",ie,!1),Array.from(document.getElementsByClassName("ownimg")).forEach(function(e){var t;e.onclick=(t=e,function(){B=t,a("b_image_input").click()})}),document.querySelectorAll(".popup-head .title2card").forEach(function(e){e.classList.add("turned")}),setTimeout(function(){document.getElementsByClassName("cardM")[0].classList.add("turned")},500),setTimeout(function(){document.getElementsByClassName("cardE")[0].classList.add("turned")},1e3),setTimeout(function(){document.getElementsByClassName("cardM")[0].classList.remove("turned")},1700),setTimeout(function(){document.getElementsByClassName("cardE")[0].classList.remove("turned")},1900),setTimeout(function(){document.getElementsByClassName("cardM2")[0].classList.add("turned")},2500),setTimeout(function(){document.getElementsByClassName("cardM")[0].classList.add("turned")},3e3),setTimeout(function(){document.getElementsByClassName("cardE")[0].classList.add("turned")},3700),setTimeout(function(){document.getElementsByClassName("cardO")[0].classList.add("turned")},4300),function(){const e=new Image;e.onload=function(){x=1===e.naturalWidth},e.src="data:image/jpeg;base64,/9j/4QBiRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAYAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAAAAABIAAAAAQAAAEgAAAAB/9sAQwAEAwMEAwMEBAMEBQQEBQYKBwYGBgYNCQoICg8NEBAPDQ8OERMYFBESFxIODxUcFRcZGRsbGxAUHR8dGh8YGhsa/9sAQwEEBQUGBQYMBwcMGhEPERoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoa/8IAEQgAAQACAwERAAIRAQMRAf/EABQAAQAAAAAAAAAAAAAAAAAAAAf/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAF/P//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAQUCf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Bf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Bf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEABj8Cf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAT8hf//aAAwDAQACAAMAAAAQH//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Qf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Qf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAT8Qf//Z"}(),ne()}()}();