/**
 * grrd's Memo
 * Copyright (c) 2020 Gerard Tyedmers, grrd@gmx.net
 * @license MPL-2.0
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

/*jslint browser:true, long: true, for: true */

(function () {
    "use strict";

    // Localization
    let nLang = 0;
    const lLoc = [{
        code: "en",
        lang: "English",
        style: ["Light mode", "Dark mode", "Automatic"],
        sound: ["Sound: off", "Sound: on"],
        desc: "grrd’s Memo is a HTML5 Game that works offline.",
        help: "Flip the cards and find the pairs. Is your memory good enough to remember?",
        themes_txt: ["Own Images", "Animals", "Flowers", "Masha"],
        cards: "Cards",
        player: "Player",
        players: "Players",
        start: "Play",
        dev: "Developed by Gérard Tyedmers.",
        look: "Have a look at my other games:",
        begin: "begins.",
        has: "has now",
        and: "and",
        win: "wins with",
        win2: "win with",
        pair: "pair",
        pairs: "pairs",
        pairs2: "pairs",
        tries: "tries",
        rank: "rank",
        stats: "lCards pairs revealed in lTries attempts.",
        turn: "lPlayer 's turn.",
        own: "Click on a card to choose your image.",
        ownanz: "lAnz images needed to start the game.",
        ownanz2: "lAnz more images needed to start the game.",
        ownanz3: "lAnz more image needed to start the game.",
        ownanz4: "Press Play to start the game.",
        cancel: "Cancel"
    }, {
        code: "de",
        lang: "Deutsch",
        style: ["Ansicht: Hell", "Ansicht: Dunkel", "Automatisch"],
        sound: ["Ton: aus", "Ton: an"],
        desc: "grrd's Memo ist ein HTML5 Spiel, welches offline funktioniert",
        help: "Dreh die Karten um und finde die Paare. Ist dein Gedächtnis gut genug?",
        themes_txt: ["Eigene Bilder", "Tiere", "Blumen", "Mascha"],
        cards: "Karten",
        player: "Spieler",
        players: "Spieler",
        start: "Play",
        dev: "Entwickelt von Gérard Tyedmers.",
        look: "Schau dir auch meine anderen Spiele an: ",
        begin: "beginnt.",
        has: "hat nun",
        and: "und",
        win: "gewinnt mit",
        win2: "gewinnen mit",
        pair: "Paar",
        pairs: "Paare",
        pairs2: "Paaren",
        tries: "Versuche",
        rank: "Rang",
        stats: "lCards Paare in lTries Versuchen aufgedeckt.",
        turn: "lPlayer ist am Zug.",
        own: "Klick auf eine Karte, um dein Bild zu wählen.",
        ownanz: "Wähle lAnz Bilder, um das Spiel zu beginnen.",
        ownanz2: "Wähle noch lAnz Bilder, um das Spiel zu beginnen.",
        ownanz3: "Wähle noch lAnz Bild, um das Spiel zu beginnen.",
        ownanz4: "Drücke auf Play, um das Spiel zu beginnen.",
        cancel: "Abbrechen"
    }, {
        code: "fr",
        lang: "Français",
        style: ["Mode claire", "Mode sombre", "Automatique"],
        sound: ["Son: muet", "Son: activé"],
        desc: "grrd's Memo est un jeu en HTML5 qui fonctionne hors ligne.",
        help: "Retournez les cartes et trouvez les paires. Votre mémoire est-elle assez bonne?",
        themes_txt: ["Images personnelles", "Animaux", "Fleurs", "Mascha"],
        cards: "Cartes",
        player: "Joueur",
        players: "Joueurs",
        start: "Play",
        dev: "Développé par Gérard Tyedmers.",
        look: "Regardez aussi mes autres jeux: ",
        begin: "commence.",
        has: "a maintenant",
        and: "et",
        win: "gagne avec",
        win2: "gagnent avec",
        pair: "paire",
        pairs: "paires",
        pairs2: "paires",
        tries: "Essais",
        rank: "Rang",
        stats: "lCards paires révélées en lTries essais.",
        turn: "Au tour du lPlayer.",
        own: "Cliquez sur une carte pour choisir votre image.",
        ownanz: "Sélectionnez lAnz images pour commencer le jeu.",
        ownanz2: "Sélectionnez lAnz autres images pour commencer le jeu.",
        ownanz3: "Sélectionnez lAnz autre image pour commencer le jeu.",
        ownanz4: "Appuyez sur la touche Play pour commencer le jeu.",
        cancel: "Annuler"
    }, {
        code: "es",
        lang: "Español",
        style: ["Modo de luz", "Modo oscuro ", "Automático"],
        sound: ["Sonido: mudo", "Sonido: en"],
        desc: "grrd's Memo es un juego HTML5 que funciona fuera de línea.",
        help: "Voltea las cartas y encuentra los pares. ¿Es tu memoria lo suficientemente buena?",
        themes_txt: ["Imágenes personales", "Animales", "Flores", "Masha"],
        cards: "Cartas",
        player: "Jugador",
        players: "Jugadores",
        start: "Play",
        dev: "Desarrollado por Gérard Tyedmers.",
        look: "Echa un vistazo a mis otros juegos:",
        begin: "comienza.",
        has: "tiene ahora",
        and: "y",
        win: "gana con",
        win2: "ganan con",
        pair: "par",
        pairs: "pares",
        pairs2: "pares",
        tries: "intentos",
        rank: "rango",
        stats: "lCards pares revelados en lTries intentos.",
        turn: "Turno del lPlayer",
        own: "Haz clic en una carta para elegir tu imagen.",
        ownanz: "Selecciona lAnz imágenes para iniciar el juego.",
        ownanz2: "Selecciona lAnz imágenes más para empezar el juego.",
        ownanz3: "Selecciona lAnz imagen más para empezar el juego.",
        ownanz4: "Pulsa Play para iniciar el juego.",
        cancel: "Cancelar"
    }];

    const $ = function (id) {
        return document.getElementById(id);
    };
    const iPopupInfo = $("iPopupInfo");
    const iPopupSettings = $("iPopupSettings");
    const iPopupScore = $("iPopupScore");
    const iTitle = $("iTitle");
    const iGame = $("iGame");
    const tScore = $("tScore");
    const lDev = $("lDev");
    const $fullScreen = $("iFullscreen");
    const iSettingsPlay = $("iSettingsPlay");

    const lTitle2Cards = document.getElementsByClassName("title2card");

    // Raster für Karten
    const oGrid = $("grid");
    // Karten-Template
    let oFlipContainer;
    // Liste aller spielbaren Karten für Click-Handler
    const lFlipContainer = oGrid.getElementsByClassName("flip-container");
    // Zähler für Schlaufen
    let nIndex;
    // Liste der aktuell umgedrehten Karten
    let lFlipped = [];
    // Anzahl maximal möglicher Paare
    const nMaxPairs = 24;
    // verfügbare Themen
    const lThemes = ["photo", "animals", "flowers", "mascha"];
    // Ausgewähltes Thema
    let nCurrentTheme = 1;
    // Mascha ein/ausblenden
    let nMaschaClick = 0;
    let nMascha = -1;
    // verfügbare Anzahl Karten
    const lAnzCards = [6, 12, 24, 32, 48];
    // Anzahl Karten fürs aktuelle Spiel
    let nAnzCards = 2;
    // Spieler, der aktuell am Zug ist
    let nCurrentPlayer;
    // Anzahl Spieler
    let nAnzPlayer = 2;
    // Punktestand pro Spieler
    let lScore = [];
    // Versuche pro Spieler
    let lTries = [];
    // Rangliste
    let lScoreBoard = [];
    // Button für eigenes Bild
    let oOwnImg;
    // Anzahl eigene Bilder
    let nAnzOwnImg;
    // rotiert Browser Bilder automatisch?
    let bAutorotate;
    // Style: Light, Dark or Auto
    let nStyle = 1;
    let bLightModeOn;
    // Töne abspielen
    let nSound = 1;
    let lSound = ["sound_off.svg", "sound_on.svg"];

    const localStorageOK = (function () {
        const mod = "modernizr";
        try {
            localStorage.setItem(mod, mod);
            localStorage.removeItem(mod);
            return true;
        } catch (ignore) {
            return false;
        }
    }());

    function toggleFullScreen() {
        const doc = window.document;
        const docEl = doc.documentElement;

        const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        const cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

        if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
            requestFullScreen.call(docEl);
        } else {
            cancelFullScreen.call(doc);
        }
    }

    function setFullScreenIcon() {
        if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
            $("img_fullscreen").src = "images/escfullscreen.svg";
        } else {
            $("img_fullscreen").src = "images/fullscreen.svg";
        }
    }

    // Texte übersetzen
    function fSetLang() {
        if (nLang) {
            document.documentElement.setAttribute("lang", lLoc[nLang].code);
        }
        $("lLang").innerHTML = lLoc[nLang].lang;
        $("lStyle").innerHTML = lLoc[nLang].style[nStyle];
        $("lSound").innerHTML = lLoc[nLang].sound[nSound];
        $("iSound").src = "images/" + lSound[nSound];
        $("lTheme").innerHTML = lLoc[nLang].themes_txt[nCurrentTheme];
        $("lCards").innerHTML = lAnzCards[nAnzCards] + "\xa0" + lLoc[nLang].cards;
        $("lPlayers").innerHTML = nAnzPlayer + "\xa0" + lLoc[nLang].players;
        $("lStart").innerHTML = lLoc[nLang].start;
        lDev.innerHTML = lLoc[nLang].dev;
        $("lInstr").innerHTML = lLoc[nLang].help;
        $("lLook").innerHTML = lLoc[nLang].look;
        $("thRank").innerHTML = lLoc[nLang].rank;
        $("thPlayer").innerHTML = lLoc[nLang].player;
        $("thPairs").innerHTML = lLoc[nLang].pairs;
        $("thTries").innerHTML = lLoc[nLang].tries;
        $("lOwnImg").innerHTML = lLoc[nLang].own;
        $("lOwnImg2").innerHTML = lLoc[nLang].themes_txt[0];
        document.querySelector("meta[name='description']").setAttribute("content", lLoc[nLang].desc);
    }

    // Style setzen
    function fSetStyle() {
        $("lStyle").innerHTML = lLoc[nLang].style[nStyle];
        if (nStyle === 0 || (nStyle === 2 && bLightModeOn)) {
            document.getElementsByTagName('body')[0].classList.add("light");
        } else {
            document.getElementsByTagName('body')[0].classList.remove("light");
        }
    }

    // Mischen eines Arrays
    function fShuffle(lArray) {
        for (nIndex = lArray.length - 1; nIndex > 0; nIndex -= 1) {
            const nIndex2 = Math.floor(Math.random() * (nIndex + 1));
            [lArray[nIndex], lArray[nIndex2]] = [lArray[nIndex2], lArray[nIndex]];
        }
        return lArray;
    }

    // Popup Info
    function fShowPopupInfo() {
        iPopupInfo.classList.remove("popup-init");
        iPopupInfo.classList.remove("popup-hide");
        iPopupInfo.classList.add("popup-show");
    }
    function fHidePopupInfo() {
        iPopupInfo.classList.remove("popup-show");
        iPopupInfo.classList.add("popup-hide");
    }
    // Popup Settings
    function fShowPopupSettings() {
        fCountOwnImg();
        iPopupSettings.classList.remove("popup-init");
        iPopupSettings.classList.remove("popup-hide");
        iPopupSettings.classList.add("popup-show");
    }
    function fHidePopupSettings() {
        if (localStorageOK) {
            localStorage.setItem("s_sound", nSound);
            localStorage.setItem("s_style", nStyle);
            localStorage.setItem("s_lang", nLang);
        }
        iPopupSettings.classList.remove("popup-show");
        iPopupSettings.classList.add("popup-hide");
        setTimeout(function () {
            iPopupSettings.classList.remove("play");
        }, 1000);
    }

    function fShowMascha() {
        nMaschaClick += 1;
        if (nMaschaClick === 3) {
            nMascha = 0;
            if (localStorageOK) {
                localStorage.setItem("s_mascha", "true");
            }
        }
    }

    // Sprache wechseln
    function fChangeLang(event) {
        let nStep = parseInt(event.target.getAttribute("data-step"));
        nLang += nStep;
        if (nLang < 0) {
            nLang = lLoc.length - 1;
        } else if (nLang > lLoc.length - 1) {
            nLang = 0;
        }
        fSetLang();
    }

    // Style wechseln (light, dark, auto)
    function fChangeStyle(event) {
        let nStep = parseInt(event.target.getAttribute("data-step"));
        nStyle += nStep;
        if (nStyle < 0) {
            nStyle = 2;
        } else if (nStyle > 2) {
            nStyle = 0;
        }
        fSetStyle();
    }

    // Sound wechseln
    function fChangeSound() {
        nSound = 1 - nSound;
        $("lSound").innerHTML = lLoc[nLang].sound[nSound];
        $("iSound").src = "images/" + lSound[nSound];
    }

    // Theme wechseln
    function fChangeTheme(event) {
        let iTheme = $("iTheme");
        let nStep = parseInt(event.target.getAttribute("data-step"));
        iTheme.children.item(nCurrentTheme).classList.remove("active");
        nCurrentTheme += nStep;
        if (nCurrentTheme < 0) {
            nCurrentTheme = lThemes.length + nMascha - 1;
        } else if (nCurrentTheme > lThemes.length + nMascha - 1) {
            nCurrentTheme = 0;
        }
        $("lTheme").innerHTML = lLoc[nLang].themes_txt[nCurrentTheme];
        iTheme.children.item(nCurrentTheme).classList.add("active");
    }

    // Anzahl Karten wechseln
    function fChangeAnzCards(event) {
        let iCards = $("iCards");
        let nStep = parseInt(event.target.getAttribute("data-step"));
        if (nAnzCards + nStep >= 0 && nAnzCards + nStep < lAnzCards.length) {
            iCards.children.item(nAnzCards).classList.remove("active");
            nAnzCards += nStep;
            $("lCards").innerHTML = lAnzCards[nAnzCards] + "\xa0" + lLoc[nLang].cards;
            iCards.children.item(nAnzCards).classList.add("active");
        }
    }

    // Anzahl Spieler wechseln
    function fChangeAnzPlayers(event) {
        let iPlayers = $("iPlayers");
        let nStep = parseInt(event.target.getAttribute("data-step"));
        if (nAnzPlayer + nStep > 0 && nAnzPlayer + nStep < 6) {
            iPlayers.children.item(nAnzPlayer - 1).classList.remove("active");
            nAnzPlayer += nStep;
            iPlayers.children.item(nAnzPlayer - 1).classList.add("active");
            if (nAnzPlayer === 1) {
                $("lPlayers").innerHTML = nAnzPlayer + "\xa0" + lLoc[nLang].player;
            } else {
                $("lPlayers").innerHTML = nAnzPlayer + "\xa0" + lLoc[nLang].players;
            }
        }
    }

    // Kartengrösse festlegen
    function fCardSize() {
        let nSize = Math.sqrt((document.documentElement.clientHeight - 40) * document.documentElement.clientWidth / lAnzCards[nAnzCards]) * 0.7;
        oGrid.setAttribute("style", "grid-template-columns: repeat(auto-fill, minmax(" + nSize + "px, 1fr))");
        document.getElementsByTagName("header")[0].setAttribute("style", "display: flex; flex-wrap: wrap;");
        if ($("iStart").getBoundingClientRect().bottom > window.innerHeight) {
            document.getElementsByTagName("header")[0].setAttribute("style", "display: flex; flex-wrap: nowrap;");
        }
    }

    // Karte umdrehen
    function fFlipCard(oCard) {
        // klick auf aufgedeckte Karten
        if (oCard.classList.contains("turned")) {
            // unpassendes Paar wieder umdrehen
            if (lFlipped.length === 2 && lFlipped.includes(oCard)) {
                // aufgedeckte unpassendes Paar wieder umdrehen
                lFlipped[0].classList.remove("turned");
                lFlipped[1].classList.remove("turned");
                lFlipped = [];
            }
            // passende Aufgedeckte Karten nicht spielbar
            return;
        }

        if (lFlipped.length === 2) {
            // aufgedeckte unpassendes Paar wieder umdrehen
            lFlipped[0].classList.remove("turned");
            lFlipped[1].classList.remove("turned");
            lFlipped = [];
        }

        lFlipped.push(oCard);
        lTries[nCurrentPlayer] += 1;

        if (lFlipped.length === 2) {
            // falls 2 Karten umgedreht sind
            if (lFlipped[0].getElementsByClassName("image")[0].src === lFlipped[1].getElementsByClassName("image")[0].src) {
                // falls die zwei Karten gleich sind
                // aktueller Spieler + 1 Punkt
                lScore[nCurrentPlayer] += 1;
                if (lScore[nCurrentPlayer] === 1) {
                    $("iMessage").innerHTML = lLoc[nLang].player + " " + (nCurrentPlayer + 1) + " " + lLoc[nLang].has + " " + lScore[nCurrentPlayer] + " " + lLoc[nLang].pair + ".";
                } else {
                    $("iMessage").innerHTML = lLoc[nLang].player + " " + (nCurrentPlayer + 1) + " " + lLoc[nLang].has + " " + lScore[nCurrentPlayer] + " " + lLoc[nLang].pairs + ".";
                }
                if (nSound) {
                    setTimeout(function () {
                        document.getElementById("ding_sound").play();
                    }, 500);

                }
                // umgedrehte Karten zurücksetzen
                lFlipped = [];
            } else {
                // falls die zwei Karten unterschiedlich sind
                // nächster Spieler am Zug
                nCurrentPlayer += 1;
                if (nCurrentPlayer === nAnzPlayer) {
                    nCurrentPlayer = 0;
                }
                $("iMessage").innerHTML = lLoc[nLang].turn.replace("lPlayer", lLoc[nLang].player + " " + (nCurrentPlayer + 1));
            }
        }

        oCard.classList.toggle("turned");
        if (nSound) {
            document.getElementById("woosh_sound").play();
        }

        if (oGrid.getElementsByClassName("turned").length === lAnzCards[nAnzCards]) {
            // alle Karten aufgedeckt, Spiel beendet
            if (nAnzPlayer === 1) {
                tScore.classList.add("hidden");
                $("lWinner").innerHTML = lLoc[nLang].stats.replace("lCards", (lAnzCards[nAnzCards] / 2)).replace("lTries", (lTries[0] / 2));
            } else {
                const tHeadScore = document.createElement("tbody");
                let tRow;
                let tCell;
                let cWinner = "";
                let nLastComma;

                tScore.classList.remove("hidden");
                lScoreBoard = [];

                tScore.replaceChild(tHeadScore, tScore.getElementsByTagName("tbody")[0]);

                for (nIndex = 0; nIndex < nAnzPlayer; nIndex += 1) {
                    lScoreBoard.push({
                        player: nIndex + 1,
                        pairs: lScore[nIndex],
                        tries: lTries[nIndex] / 2
                    });
                }
                lScoreBoard.sort((a, b) => b.pairs - a.pairs || a.tries - b.tries);

                for (nIndex = 0; nIndex < nAnzPlayer; nIndex += 1) {
                    lScoreBoard[nIndex].rank = nIndex + 1;
                    if (nIndex > 0 && lScoreBoard[nIndex - 1].pairs === lScoreBoard[nIndex].pairs) {
                        lScoreBoard[nIndex].rank = lScoreBoard[nIndex - 1].rank;
                    }
                    if (lScoreBoard[nIndex].rank === 1) {
                        cWinner += ", " + lScoreBoard[nIndex].player;
                    }
                    tRow = tHeadScore.insertRow();
                    tCell = tRow.insertCell(0);
                    tCell.innerHTML = lScoreBoard[nIndex].rank;
                    tCell = tRow.insertCell(1);
                    tCell.innerHTML = lLoc[nLang].player + " " + lScoreBoard[nIndex].player;
                    tCell = tRow.insertCell(2);
                    tCell.innerHTML = lScoreBoard[nIndex].pairs;
                    tCell = tRow.insertCell(3);
                    tCell.innerHTML = lScoreBoard[nIndex].tries;
                }
                nLastComma = cWinner.lastIndexOf(",");

                if (nLastComma > 0) {
                    // mehrere Gewinner
                    cWinner = cWinner.substring(2, nLastComma) + " " + lLoc[nLang].and + cWinner.substring(nLastComma + 1);
                    $("lWinner").innerHTML = lLoc[nLang].players + " " + cWinner + " " + lLoc[nLang].win2 + " " + lScoreBoard[0].pairs + " " + lLoc[nLang].pairs2 + ".";
                } else {
                    // ein Gewinner
                    $("lWinner").innerHTML = lLoc[nLang].player + " " + lScoreBoard[0].player + " " + lLoc[nLang].win + " " + lScoreBoard[0].pairs + " " + lLoc[nLang].pairs2 + ".";
                }
            }
            iPopupScore.classList.remove("popup-init");
            iPopupScore.classList.remove("popup-hide");
            iPopupScore.classList.add("popup-show");
        }
    }

    // Click-Handler für Karten generieren
    function fClickHandler(oCard) {
        return function () {
            fFlipCard(oCard);
        };
    }
    // Click-Handler für Titel-Karten generieren
    function fClickHandlerTitle(oCard) {
        return function () {
            oCard.classList.toggle("turned");
        };
    }
    // Click-Handler für EigeneBilder-Karten generieren
    function fClickHandlerOwnImg(oCard) {
        return function () {
            oOwnImg = oCard;
            $("b_image_input").click();
        };
    }

    // Eigene Bilder zählen
    function fCountOwnImg () {
        nAnzOwnImg = 0;
        iSettingsPlay.classList.add("disabled");
        for (nIndex = 0; nIndex < nMaxPairs; nIndex += 1) {
            if (!$("settingsgrid").children.item(nIndex).src.endsWith("images/back.svg")) {
                nAnzOwnImg += 1;
            }
        }
        if (nAnzOwnImg === 0) {
            // Kein eigenes Bild
            $("lOwnImgAnz").innerHTML = lLoc[nLang].ownanz.replace("lAnz", (lAnzCards[nAnzCards] / 2));
        } else if ((lAnzCards[nAnzCards] / 2) - nAnzOwnImg > 1) {
            // mehrere eigene Bilder zu wenig
            $("lOwnImgAnz").innerHTML = lLoc[nLang].ownanz2.replace("lAnz", ((lAnzCards[nAnzCards] / 2) - nAnzOwnImg));
        } else if ((lAnzCards[nAnzCards] / 2) - nAnzOwnImg === 1) {
            // ein eigenes Bild zu wenig
            $("lOwnImgAnz").innerHTML = lLoc[nLang].ownanz3.replace("lAnz", "1");
        } else {
            // genug eigene Bilder
            $("lOwnImgAnz").innerHTML = lLoc[nLang].ownanz4;
            iSettingsPlay.classList.remove("disabled");
        }
    }

    // returns a promise that resolves to true  if the browser automatically
    // rotates images based on exif data and false otherwise
    function fBrowserAutoRotates () {
        return new Promise((resolve, reject) => {
            // load an image with exif rotation and see if the browser rotates it
            const image = new Image();
            image.onload = () => {
                resolve(image.naturalWidth === 1);
            };
            image.onerror = reject;
            // this jpeg is 2x1 with orientation=6 so it should rotate to 1x2
            image.src = "data:image/jpeg;base64,/9j/4QBiRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAYAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAAAAABIAAAAAQAAAEgAAAAB/9sAQwAEAwMEAwMEBAMEBQQEBQYKBwYGBgYNCQoICg8NEBAPDQ8OERMYFBESFxIODxUcFRcZGRsbGxAUHR8dGh8YGhsa/9sAQwEEBQUGBQYMBwcMGhEPERoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoa/8IAEQgAAQACAwERAAIRAQMRAf/EABQAAQAAAAAAAAAAAAAAAAAAAAf/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAF/P//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAQUCf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Bf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Bf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEABj8Cf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAT8hf//aAAwDAQACAAMAAAAQH//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Qf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Qf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAT8Qf//Z";
        });
    }

    // get Exif-Orientation of Own image
    function fGetOrientation(file, callback) {
        let reader = new FileReader();
        reader.onload = function(e) {

            let view = new DataView(e.target.result);
            if (view.getUint16(0, false) !== 0xFFD8)
            {
                return callback(-2);
            }
            let length = view.byteLength, offset = 2;
            while (offset < length)
            {
                if (view.getUint16(offset+2, false) <= 8) return callback(-1);
                let marker = view.getUint16(offset, false);
                offset += 2;
                if (marker === 0xFFE1)
                {
                    if (view.getUint32(offset += 2, false) !== 0x45786966)
                    {
                        return callback(-1);
                    }

                    let little = view.getUint16(offset += 6, false) === 0x4949;
                    offset += view.getUint32(offset + 4, little);
                    let tags = view.getUint16(offset, little);
                    offset += 2;
                    for (nIndex = 0; nIndex < tags; nIndex += 1)
                    {
                        if (view.getUint16(offset + (nIndex * 12), little) === 0x0112)
                        {
                            return callback(view.getUint16(offset + (nIndex * 12) + 8, little));
                        }
                    }
                }
                else if ((marker & 0xFF00) !== 0xFF00)
                {
                    break;
                }
                else
                {
                    offset += view.getUint16(offset, false);
                }
            }
            return callback(-1);
        };
        reader.readAsArrayBuffer(file);
    }

    function fResizeImage(file) {
        const fileLoader = new FileReader();
        const canvas = document.createElement("canvas");
        let context = null;
        const imageObj = new Image();
        const max_width = 500;
        const max_height = 500;
        const g_exif = {Orientation: undefined};

        //create a hidden canvas object we can use to create the new re-sized image data
        canvas.id = "hiddenCanvas";
        canvas.width = max_width;
        canvas.height = max_height;
        canvas.style.visibility = "hidden";
        document.body.appendChild(canvas);

        //get the context to use
        context = canvas.getContext("2d");

        // check for an image then
        //trigger the file loader to get the data from the image
        if (file.target.files[0].type.match("image.*")) {
            fileLoader.readAsDataURL(file.target.files[0]);
        } else {
            console.log("File is not an image");
        }

        // setup the file loader onload function
        // once the file loader has the data it passes it to the
        // image object which, once the image has loaded,
        // triggers the images onload function
        fileLoader.onload = function () {
            const data = this.result;
            fGetOrientation(file.target.files[0], function(orientation) {
                g_exif.Orientation = orientation;
                imageObj.src = data;
            });
        };

        // set up the images onload function which clears the hidden canvas context,
        // draws the new image then gets the blob data from it
        imageObj.onload = function () {
            let nTop = 0;
            let nLeft = 0;
            let nMin = Math.min(this.width, this.height);
            // Check for empty images
            if (this.width === 0 || this.height === 0) {
                console.log("Image is empty");
            } else {
                if (!bAutorotate) {
                    if (g_exif.Orientation === 5 || g_exif.Orientation === 6) {
                        context.rotate(90 * Math.PI / 180);
                        nLeft = -1 * max_width;
                    }
                    if (g_exif.Orientation === 3 || g_exif.Orientation === 4) {
                        context.rotate(180 * Math.PI / 180);
                        nLeft = -1 * max_width - 4;
                        nTop = -1 * max_height + 4;
                    }
                    if (g_exif.Orientation === 7 || g_exif.Orientation === 8) {
                        context.rotate(270 * Math.PI / 180);
                        nTop = -1 * max_height;
                    }
                }
                context.clearRect(0, 0, max_width, max_height);
                context.drawImage(imageObj, (this.width / 2) - (nMin / 2) , (this.height / 2) - (nMin / 2), (nMin), (nMin), nTop, nLeft, max_width, max_height);
                oOwnImg.src = canvas.toDataURL("image/jpeg");
                if (localStorageOK) {
                    nIndex = [...oOwnImg.parentElement.children].indexOf(oOwnImg);
                    localStorage.setItem("s_image" + nIndex, canvas.toDataURL("image/jpeg"));
                }
                fCountOwnImg();
            }
        };
    }

    // neues Spiel beginnen
    function fStartGame() {
        // fürs aktuelle Spiel gewählte Paare
        let lPairs = [];
        // gemischte Karten fürs aktuelle Spiel
        let lCards = [];

        // Werte initialisieren
        // alte Karten löschen
        oGrid.innerHTML = "";
        // Punktestand initialisieren
        lScore = new Array(nAnzPlayer).fill(0);
        // Versuche initialisieren
        lTries = new Array(nAnzPlayer).fill(0);
        // erster Spieler
        nCurrentPlayer = 0;
        // umgedrehte Karten zurücksetzen
        lFlipped = [];

        $("iMessage").innerHTML = lLoc[nLang].player + " 1 " + lLoc[nLang].begin;

        // Auswahl der Paare fürs neue Spiel
        for (nIndex = 0; nIndex < nMaxPairs; nIndex += 1) {
            if (nCurrentTheme === 0) {
                // eigene Bilder
                if (!$("settingsgrid").children.item(nIndex).src.endsWith("images/back.svg")) {
                    lPairs.push(nIndex);
                }
            } else {
                lPairs.push(nIndex + 1);
            }
        }
        fShuffle(lPairs);
        // Mischen der Karten fürs neue Spiel
        for (nIndex = 0; nIndex < lAnzCards[nAnzCards] / 2; nIndex += 1) {
            lCards.push(lPairs[nIndex]);
            lCards.push(lPairs[nIndex]);
        }
        fShuffle(lCards);
        // generieren der Karten fürs neue Spiel
        for (nIndex = 0; nIndex < lAnzCards[nAnzCards]; nIndex += 1) {
            oFlipContainer = $("iDummy").getElementsByClassName("flip-container")[0].cloneNode(true);
            if (nCurrentTheme === 0) {
                oFlipContainer.getElementsByClassName("image")[0].src = $("settingsgrid").children.item(lCards[nIndex]).src;
            } else {
                oFlipContainer.getElementsByClassName("image")[0].src = "images/" + lThemes[nCurrentTheme] + "/" + lCards[nIndex] + ".jpg";
            }
            oGrid.appendChild(oFlipContainer);
        }

        for (nIndex = 0; nIndex < lFlipContainer.length; nIndex += 1) {
            // Click-Event auf Karten legen
            lFlipContainer[nIndex].onclick = fClickHandler(lFlipContainer[nIndex]);
        }
        fCardSize();

        iTitle.classList.remove("swipe-out-right");
        iGame.classList.remove("swipe-in-left");
        iTitle.classList.add("swipe-out");
        iGame.classList.add("swipe-in");
    }

    function fQuitGame() {
        iTitle.classList.remove("swipe-out");
        iGame.classList.remove("swipe-in");
        iTitle.classList.add("swipe-out-right");
        iGame.classList.add("swipe-in-left");
    }

    function fCloseScore() {
        iPopupScore.classList.remove("popup-show");
        iPopupScore.classList.add("popup-hide");
        setTimeout(function () {
            fQuitGame();
        }, 600);
    }

    function fUrlParam(cKey) {
        let searchParams = new URLSearchParams(window.location.search);
        if (searchParams.has(cKey)) {
            return searchParams.get(cKey);
        } else {
            return false;
        }
    }

    function fStartInit() {
        if (nCurrentTheme === 0) {
            $("collapsable").classList.add("show");
            $("iDown").classList.remove("rotate");
            iPopupSettings.classList.add("play");
            fShowPopupSettings();
        } else {
            fStartGame();
        }
    }

    function fInit() {
        // Localize
        // Example usage - https://grrd01.github.io/TicTacToe/?lang=en
        const cLang = (fUrlParam("lang") || navigator.language || navigator.browserLanguage || (navigator.languages || ["en"])[0]).substring(0, 2).toLowerCase();
        if (cLang === "de") {
            nLang = 1;
        } else if (cLang === "fr") {
            nLang = 2;
        }else if (cLang === "es") {
            nLang = 3;
        }
        if (localStorageOK) {
            nSound = localStorage.getItem("s_sound") === null ? 1 : parseInt(localStorage.getItem("s_sound"));
            nStyle = localStorage.getItem("s_style") === null ? 1 : parseInt(localStorage.getItem("s_style"));
            nLang = localStorage.getItem("s_lang") === null ? nLang : parseInt(localStorage.getItem("s_lang"));
        }
        fSetLang();

        // ServiceWorker initialisieren
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", function () {
                navigator.serviceWorker.register("sw.js").then(function (registration) {
                    console.log("ServiceWorker registration successful with scope: ", registration.scope);
                }, function (err) {
                    console.log("ServiceWorker registration failed: ", err);
                });
            });
        }

        // Event-Handler auf Buttons
        $("iInfo").addEventListener("click", fShowPopupInfo);
        $("iInfoClose").addEventListener("click", fHidePopupInfo);
        $("iSettings").addEventListener("click", fShowPopupSettings);
        $("iSettingsClose").addEventListener("click", fHidePopupSettings);
        $("iSettingsCancel").addEventListener("click", fHidePopupSettings);
        iSettingsPlay.addEventListener("click", fHidePopupSettings);
        iSettingsPlay.addEventListener("click", fStartGame);
        $("iNextLang").addEventListener("click", fChangeLang);
        $("iPrevLang").addEventListener("click", fChangeLang);
        $("iNextStyle").addEventListener("click", fChangeStyle);
        $("iPrevStyle").addEventListener("click", fChangeStyle);
        $("iNextSound").addEventListener("click", fChangeSound);
        $("iPrevSound").addEventListener("click", fChangeSound);
        $("iNextTheme").addEventListener("click", fChangeTheme);
        $("iPrevTheme").addEventListener("click", fChangeTheme);
        $("iCardsUp").addEventListener("click", fChangeAnzCards);
        $("iCardsDown").addEventListener("click", fChangeAnzCards);
        $("iPlayersUp").addEventListener("click", fChangeAnzPlayers);
        $("iPlayersDown").addEventListener("click", fChangeAnzPlayers);
        $("iStart").addEventListener("click", fStartInit);
        $("iClose").addEventListener("click", fQuitGame);
        $("iOK").addEventListener("click", fCloseScore);
        lDev.addEventListener("click", fShowMascha);
        $fullScreen.addEventListener("click", function () {
            toggleFullScreen();
        });
        $("iShowOwnImg").addEventListener("click", function () {
            $("collapsable").classList.toggle("show");
            $("iDown").classList.toggle("rotate");
        });
        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
            bLightModeOn = e.matches;
            //console.log(`light mode is ${bLightModeOn ? '☀ on' : '🌒 off'}.`);
            fSetStyle();
        });
        bLightModeOn = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
        fSetStyle();

        // Full-Screen funktionalität
        if (
            !(
                document.fullscreenEnabled || /* FullScreen supported, Standard syntax */
                document.webkitFullscreenEnabled || /* Chrome, Safari and Opera syntax */
                document.mozFullScreenEnabled ||/* Firefox syntax */
                document.msFullscreenEnabled/* IE/Edge syntax */
            ) || (
                navigator.standalone === true || /* FullScreen not already enabled */
                document.fullscreenElement || /* Standard syntax */
                document.webkitFullscreenElement || /* Chrome, Safari and Opera syntax */
                document.mozFullScreenElement ||/* Firefox syntax */
                document.msFullscreenElement /* IE/Edge syntax */
            )
        ) {
            $fullScreen.parentNode.removeChild($fullScreen);
        }

        // Grid für eigene Bilder aufbauen
        for (nIndex = 1; nIndex < nMaxPairs; nIndex += 1) {
            $("settingsgrid").appendChild(document.getElementsByClassName("ownimg")[0].cloneNode(true));
        }

        if (fUrlParam("mascha") === "true") {
            nMaschaClick = 2;
            fShowMascha();
        }
        if (localStorageOK) {
            if (localStorage.getItem("s_mascha") === "true") {
                nMascha = 0;
            }
            // eigene Bilder aus LocalStorage laden
            for (nIndex = 0; nIndex < nMaxPairs; nIndex += 1) {
                if (localStorage.getItem("s_image" + nIndex) !== null) {
                    $("settingsgrid").children.item(nIndex).src = localStorage.getItem("s_image" + nIndex);
                }
            }
        }

        document.querySelectorAll("tspan").forEach(function (oTspan) {
            oTspan.innerHTML = "grrd's Memo grrd's Memo grrd's Memo grrd's Memo grrd's Memo";
        });

        document.querySelectorAll(".popup-head").forEach(function (oPopupHead) {
            oPopupHead.appendChild(document.getElementsByClassName("title1")[0].cloneNode(true));
            oPopupHead.appendChild(document.getElementsByClassName("title2")[0].cloneNode(true));
        });

        Array.from(lTitle2Cards).forEach(function (lTitle2Card) {
            lTitle2Card.onclick = fClickHandlerTitle(lTitle2Card);
        });
        document.getElementById("b_image_input").addEventListener("change", fResizeImage, false);

        Array.from(document.getElementsByClassName("ownimg")).forEach(function (lOwnImg) {
            lOwnImg.onclick = fClickHandlerOwnImg(lOwnImg);
        });

        document.querySelectorAll(".popup-head .title2card").forEach(function (oCard) {
            oCard.classList.add("turned");
        });

        // Titel-Animation
        setTimeout(function () {
            document.getElementsByClassName("cardM")[0].classList.add("turned");
        }, 500);
        setTimeout(function () {
            document.getElementsByClassName("cardE")[0].classList.add("turned");
        }, 1000);
        setTimeout(function () {
            document.getElementsByClassName("cardM")[0].classList.remove("turned");
        }, 1700);
        setTimeout(function () {
            document.getElementsByClassName("cardE")[0].classList.remove("turned");
        }, 1900);
        setTimeout(function () {
            document.getElementsByClassName("cardM2")[0].classList.add("turned");
        }, 2500);
        setTimeout(function () {
            document.getElementsByClassName("cardM")[0].classList.add("turned");
        }, 3000);
        setTimeout(function () {
            document.getElementsByClassName("cardE")[0].classList.add("turned");
        }, 3700);
        setTimeout(function () {
            document.getElementsByClassName("cardO")[0].classList.add("turned");
        }, 4300);

        bAutorotate = fBrowserAutoRotates();

        fCardSize();
    }

    window.addEventListener("resize", function () {
        fCardSize();
    });
    /* Standard syntax */
    document.addEventListener("fullscreenchange", function() {
        setFullScreenIcon();
    });
    /* Firefox */
    document.addEventListener("mozfullscreenchange", function() {
        setFullScreenIcon();
    });
    /* Chrome, Safari and Opera */
    document.addEventListener("webkitfullscreenchange", function() {
        setFullScreenIcon();
    });
    /* IE / Edge */
    document.addEventListener("msfullscreenchange", function() {
        setFullScreenIcon();
    });

    fInit();

}());
