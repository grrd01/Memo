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

    // Karten-Template
    let oFlipContainer;
    // Liste aller spielbaren Karten für Click-Handler
    const lFlipContainer = document.getElementById("grid").getElementsByClassName("flip-container");
    // Zähler für Schlaufen
    let nIndex;
    // Liste der aktuell umgedrehten Karten
    let lFlipped = [];
    // Anzahl maximal möglicher Paare
    let nMaxPairs = 24;
    // Ausgewähltes Thema
    let cCurrentTheme = "animals";
    // Anzahl Karten fürs aktuelle Spiel
    let nAnzCards = 24;
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

        if (document.getElementsByClassName("turned").length === nAnzCards) {
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
        document.getElementById("grid").innerHTML = "";
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
        for (nIndex = 0; nIndex < nAnzCards / 2; nIndex += 1) {
            lCards.push(lPairs[nIndex]);
            lCards.push(lPairs[nIndex]);
        }
        fShuffle(lCards);
        // generieren der Karten fürs neue Spiel
        for (nIndex = 0; nIndex < nAnzCards; nIndex += 1) {
            oFlipContainer = document.getElementsByClassName("dummy")[0].getElementsByClassName("flip-container")[0].cloneNode(true);
            oFlipContainer.getElementsByClassName("image")[0].src = "images/" + cCurrentTheme + "/" + lCards[nIndex] + ".jpg";
            document.getElementById("grid").appendChild(oFlipContainer);
        }

        for (nIndex = 0; nIndex < lFlipContainer.length; nIndex += 1) {
            // Click-Event auf Karten legen
            lFlipContainer[nIndex].onclick = function(ignore) {
                fFlipCard(this);
            }
        }
    }

    fStartGame();

}());





