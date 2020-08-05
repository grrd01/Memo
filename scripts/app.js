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
    const lThemes = ["animals", "flowers"]
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
            $("lTheme").innerHTML = lThemes[nCurrentTheme];
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
                console.log("Spieler " +  (nCurrentPlayer + 1) + " hat nun " + lScore[nCurrentPlayer] + " Paare.");
                // umgedrehte Karten zurücksetzen
                lFlipped = [];
            } else {
                // falls die zwei Karten unterschiedlich sind

                // nächster Spieler am Zug
                nCurrentPlayer += 1;
                if (nCurrentPlayer === nAnzPlayer) {
                    nCurrentPlayer = 0;
                }
            }
        }

        oCard.classList.toggle("turned");

        if (document.getElementsByClassName("turned").length === lAnzCards[nAnzCards]) {
            let nWinner = lScore.indexOf(Math.max(...lScore));
            let nWinnerScore = (Math.max(...lScore));
            console.log("Spieler " + (nWinner + 1) + " gewinnt mit " + nWinnerScore + " Paaren.");
            fStartGame()
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

        iTitle.classList.remove("swipe-out-right");
        iGame.classList.remove("swipe-in-left");
        iTitle.classList.add("swipe-out");
        iGame.classList.add("swipe-in");
    }

    function fInit() {
        $("iInfo").addEventListener("click", fShowPopupInfo);
        $("iInfoClose").addEventListener("click", fHidePopupInfo);
        $("iNextTheme").addEventListener("click", fChangeTheme);
        $("iPrevTheme").addEventListener("click", fChangeTheme);
        $("iCardsUp").addEventListener("click", fChangeAnzCards);
        $("iCardsDown").addEventListener("click", fChangeAnzCards);
        $("iPlayersUp").addEventListener("click", fChangeAnzPlayers);
        $("iPlayersDown").addEventListener("click", fChangeAnzPlayers);
        $("iStart").addEventListener("click", fStartGame);
    }

    fInit();

}());





