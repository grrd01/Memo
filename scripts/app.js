/**
 * grrd's Memo
 * Copyright (c) 2020 Gerard Tyedmers, grrd@gmx.net
 * @license MPL-2.0
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

/*jslint browser:true, long: true, devel: true, for: true, this: true */

(function () {
    "use strict";

    // Localization
    var nLang = 0;
    const lLoc = [{
        desc: "grrd’s Memo is a HTML5 Game that works offline.",
        help: "Flip the cards and find the pairs. Is your memory good enough to remember?",
        themes: "Theme",
        themes_txt: ["Animals", "Flowers", "Masha"],
        cards: "Cards",
        players: "Players",
        start: "Start",
        dev: "Developed by Gérard Tyedmers.",
        look: "Have a look at my other games:",
        and: "and",
        begin: "begins.",
        play: "plays",
        has: "has now",
        win: "wins with",
        pair: "pair.",
        pairs: "pairs.",
        pairs2: "pairs.",
        draw: "draw",
        player: "Player",
        turn: "'s turn.",
        won: "has won!",
        score: "Score:",
        draw2: "This game ends in a draw."
    }, {
        desc: "grrd's Tic Tac Toe ist ein HTML5 Spiel, welches offline funktioniert",
        help: "Dreh die Karten um und finde die Paare. Ist dein Gedächtnis gut genug?",
        themes: "Thema",
        themes_txt: ["Tiere", "Blumen", "Mascha"],
        cards: "Karten",
        players: "Spieler",
        start: "Start",
        dev: "Entwickelt von Gérard Tyedmers.",
        look: "Schau dir auch meine anderen Spiele an: ",
        and: "und",
        begin: "beginnt.",
        play: "spielt",
        has: "hat nun",
        win: "gewinnt mit",
        pair: "Paar.",
        pairs: "Paare.",
        pairs2: "Paaren.",
        draw: "unentschieden",
        player: "Spieler",
        turn: "ist am Zug.",
        won: "hat gewonnen!",
        score: "Resultat:",
        draw2: "Diese Partie endet unentschieden."
    }];

    const $ = function (id) {
        return document.getElementById(id);
    };
    const iPopupInfo = $("iPopupInfo");
    const iPopupScore = $("iPopupScore");
    const iTitle = $("iTitle");
    const iGame = $("iGame");

    // Karten-Template
    let oFlipContainer;
    // Liste aller spielbaren Karten für Click-Handler
    const lFlipContainer = $("grid").getElementsByClassName("flip-container");
    // Zähler für Schlaufen
    let nIndex;
    // Liste der aktuell umgedrehten Karten
    let lFlipped = [];
    // Anzahl maximal möglicher Paare
    let nMaxPairs = 24;
    // verfügbare Themen
    const lThemes = ["animals", "flowers", "mascha"]
    // Ausgewähltes Thema
    let nCurrentTheme = 0;
    // verfügbare Themen
    const lAnzCards = [6, 12, 24, 32, 48]
    // Anzahl Karten fürs aktuelle Spiel
    let nAnzCards = 2;
    // Spieler, der aktuell am Zug ist
    let nCurrentPlayer;
    // Anzahl Spieler
    let nAnzPlayer = 2;
    // Punktestand pro Spieler
    let lScore = [];



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

    // Theme wechseln
    function fChangeTheme(event) {
        let nStep = parseInt(event.target.getAttribute("data-step"));
        if (nCurrentTheme + nStep >= 0 && nCurrentTheme + nStep < lThemes.length) {
            nCurrentTheme += nStep;
            $("lTheme").innerHTML = lLoc[nLang].themes_txt[nCurrentTheme];
        }
    }

    // Anzahl Karten wechseln
    function fChangeAnzCards(event) {
        let nStep = parseInt(event.target.getAttribute("data-step"));
        if (nAnzCards + nStep >= 0 && nAnzCards + nStep < lAnzCards.length) {
            nAnzCards += nStep;
            $("lCards").innerHTML = lAnzCards[nAnzCards];
        }
    }

    // Anzahl Spieler wechseln
    function fChangeAnzPlayers(event) {
        let nStep = parseInt(event.target.getAttribute("data-step"));
        if (nAnzPlayer + nStep > 0 && nAnzPlayer + nStep < 6) {
            nAnzPlayer += nStep;
            $("lPlayers").innerHTML = nAnzPlayer;
        }
    }

    // Kartengrösse festlegen
    function fCardSize() {
        let nSize = Math.sqrt((document.documentElement.clientHeight - 40) * document.documentElement.clientWidth / lAnzCards[nAnzCards]) * 0.7;
        $("grid").setAttribute("style", "grid-template-columns: repeat(auto-fill, minmax(" + nSize + "px, 1fr))");

    }

    // Karte umdrehen
    function fFlipCard(oCard) {
        if (oCard.classList.contains("turned")) {
            // Aufgedeckte Karten nicht spielbar
            return;
        }

        if (lFlipped.length === 2) {
            // Karten wieder umdrehen
            lFlipped[0].classList.remove("turned");
            lFlipped[1].classList.remove("turned");
            // umgedrehte Karten zurücksetzen
            lFlipped = [];
        }

        lFlipped.push(oCard);

        if (lFlipped.length === 2) {
            // falls 2 Karten umgedreht sind
            if (lFlipped[0].getElementsByClassName("image")[0].src === lFlipped[1].getElementsByClassName("image")[0].src) {
                // falls die zwei Karten gleich sind
                // aktueller Spieler + 1 Punkt
                lScore[nCurrentPlayer] += 1;
                if (lScore[nCurrentPlayer] === 1) {
                    $("iMessage").innerHTML = lLoc[nLang].player + " " +  (nCurrentPlayer + 1) + " " + lLoc[nLang].has + " " + lScore[nCurrentPlayer] + " " + lLoc[nLang].pair;
                } else {
                    $("iMessage").innerHTML = lLoc[nLang].player + " " +  (nCurrentPlayer + 1) + " " + lLoc[nLang].has + " " + lScore[nCurrentPlayer] + " " + lLoc[nLang].pairs;
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
                $("iMessage").innerHTML = lLoc[nLang].player + " " + (nCurrentPlayer + 1) + " " + lLoc[nLang].turn;
            }
        }

        oCard.classList.toggle("turned");

        if (document.getElementsByClassName("turned").length === lAnzCards[nAnzCards]) {
            let nWinner = lScore.indexOf(Math.max(...lScore));
            let nWinnerScore = (Math.max(...lScore));
            $("lWinner").innerHTML = lLoc[nLang].player + " " + (nWinner + 1) + " " + lLoc[nLang].win + " " + nWinnerScore + " " + lLoc[nLang].pairs2;

            iPopupScore.classList.remove("popup-init");
            iPopupScore.classList.remove("popup-hide");
            iPopupScore.classList.add("popup-show");
        }
    }

    // neues Spiel beginnen
    function fStartGame() {
        // fürs aktuelle Spiel gewählte Paare
        let lPairs = [];
        // gemischte Karten fürs aktuelle Spiel
        let lCards = [];

        // Werte initialisieren
        // alte Karten löschen
        $("grid").innerHTML = "";
        // Punktestand initialisieren
        lScore = new Array(nAnzPlayer).fill(0);
        // erster Spieler
        nCurrentPlayer = 0;
        $("iMessage").innerHTML = lLoc[nLang].player + " 1 " + lLoc[nLang].begin;

        // Auswahl der Paare fürs neue Spiel
        for (nIndex = 0; nIndex < nMaxPairs; nIndex += 1) {
            lPairs.push(nIndex + 1);
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
            oFlipContainer = document.getElementsByClassName("dummy")[0].getElementsByClassName("flip-container")[0].cloneNode(true);
            oFlipContainer.getElementsByClassName("image")[0].src = "images/" + lThemes[nCurrentTheme] + "/" + lCards[nIndex] + ".jpg";
            $("grid").appendChild(oFlipContainer);
        }

        for (nIndex = 0; nIndex < lFlipContainer.length; nIndex += 1) {
            // Click-Event auf Karten legen
            lFlipContainer[nIndex].onclick = function(ignore) {
                fFlipCard(this);
            }
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
        iPopupScore.classList.remove("popup-show");
        iPopupScore.classList.add("popup-hide");
    }

    function urlQuery(query) {
        query = query.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var expr = "[\\?&]" + query + "=([^&#]*)";
        var regex = new RegExp(expr);
        var results = regex.exec(window.location.href);
        if (results !== null) {
            return results[1];
        } else {
            return false;
        }
    }

    function fInit() {
        // Localize
        // Example usage - https://grrd01.github.io/TicTacToe/?lang=en
        const cLang = (urlQuery("lang") || navigator.language || navigator.browserLanguage || (navigator.languages || ["en"])[0]).substring(0, 2).toLowerCase();
        if (cLang === "de") {
            nLang = 1;
        } else if (cLang === "fr") {
            nLang = 2;
        }
        if (nLang) {
            document.documentElement.setAttribute("lang", cLang);
        }
        $("lThemeLabel").innerHTML = lLoc[nLang].themes + ": ";
        $("lCardsLabel").innerHTML = lLoc[nLang].cards + ": ";
        $("lPlayersLabel").innerHTML = lLoc[nLang].players + ": ";
        $("lDev").innerHTML = lLoc[nLang].dev;
        $("lInstr").innerHTML = lLoc[nLang].help;
        $("lLook").innerHTML = lLoc[nLang].look;
        document.querySelector("meta[name='description']").setAttribute("content", lLoc[nLang].desc);

        $("iInfo").addEventListener("click", fShowPopupInfo);
        $("iInfoClose").addEventListener("click", fHidePopupInfo);
        $("iNextTheme").addEventListener("click", fChangeTheme);
        $("iPrevTheme").addEventListener("click", fChangeTheme);
        $("iCardsUp").addEventListener("click", fChangeAnzCards);
        $("iCardsDown").addEventListener("click", fChangeAnzCards);
        $("iPlayersUp").addEventListener("click", fChangeAnzPlayers);
        $("iPlayersDown").addEventListener("click", fChangeAnzPlayers);
        $("iStart").addEventListener("click", fStartGame);
        $("iClose").addEventListener("click", fQuitGame);
        $("iOK").addEventListener("click", fQuitGame);
    }

    window.addEventListener("resize", function () {
        fCardSize();
    });

    fInit();

}());





