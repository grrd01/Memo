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
        desc: "grrd’s Memo is a HTML5 Game that works offline.",
        help: "Flip the cards and find the pairs. Is your memory good enough to remember?",
        themes_txt: ["Animals", "Flowers", "Masha"],
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
        turn: "'s turn."
    }, {
        desc: "grrd's Memo ist ein HTML5 Spiel, welches offline funktioniert",
        help: "Dreh die Karten um und finde die Paare. Ist dein Gedächtnis gut genug?",
        themes_txt: ["Tiere", "Blumen", "Mascha"],
        cards: "Karten",
        player: "Spieler",
        players: "Spieler",
        start: "Start",
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
        turn: "ist am Zug."
    }];

    const $ = function (id) {
        return document.getElementById(id);
    };
    const iPopupInfo = $("iPopupInfo");
    const iPopupScore = $("iPopupScore");
    const iTitle = $("iTitle");
    const iGame = $("iGame");
    const tScore = $("tScore");
    const lDev = $("lDev");

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
    let nMaxPairs = 24;
    // verfügbare Themen
    const lThemes = ["animals", "flowers", "mascha"];
    // Ausgewähltes Thema
    let nCurrentTheme = 0;
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

    function fShowMascha() {
        nMaschaClick += 1;
        if (nMaschaClick === 3) {
            nMascha = 0;
        }
    }

    // Theme wechseln
    function fChangeTheme(event) {
        let nStep = parseInt(event.target.getAttribute("data-step"));
        if (nCurrentTheme + nStep >= 0 && nCurrentTheme + nStep < lThemes.length + nMascha) {
            nCurrentTheme += nStep;
            $("lTheme").innerHTML = lLoc[nLang].themes_txt[nCurrentTheme];
            $("iTheme").src = "images/" + lThemes[nCurrentTheme] + ".svg";
        }
    }

    // Anzahl Karten wechseln
    function fChangeAnzCards(event) {
        let nStep = parseInt(event.target.getAttribute("data-step"));
        if (nAnzCards + nStep >= 0 && nAnzCards + nStep < lAnzCards.length) {
            nAnzCards += nStep;
            $("lCards").innerHTML = lAnzCards[nAnzCards];
            $("iCards").src = "images/cards" + lAnzCards[nAnzCards] + ".svg";
        }
    }

    // Anzahl Spieler wechseln
    function fChangeAnzPlayers(event) {
        let nStep = parseInt(event.target.getAttribute("data-step"));
        if (nAnzPlayer + nStep > 0 && nAnzPlayer + nStep < 6) {
            nAnzPlayer += nStep;
            $("lPlayers").innerHTML = nAnzPlayer;
            $("iPlayers").src = "images/player" + nAnzPlayer + ".svg";
            if (nAnzPlayer === 1) {
                $("lPlayersLabel").innerHTML = lLoc[nLang].player;
            } else {
                $("lPlayersLabel").innerHTML = lLoc[nLang].players;
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
    // Click-Handler für Karten generieren
    function fClickHandlerTitle(oCard) {
        return function () {
            oCard.classList.toggle("turned");
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
            oFlipContainer = $("iDummy").getElementsByClassName("flip-container")[0].cloneNode(true);
            oFlipContainer.getElementsByClassName("image")[0].src = "images/" + lThemes[nCurrentTheme] + "/" + lCards[nIndex] + ".jpg";
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

    function fInit() {
        // Localize
        // Example usage - https://grrd01.github.io/TicTacToe/?lang=en
        const cLang = (fUrlParam("lang") || navigator.language || navigator.browserLanguage || (navigator.languages || ["en"])[0]).substring(0, 2).toLowerCase();
        if (cLang === "de") {
            nLang = 1;
        } else if (cLang === "fr") {
            nLang = 2;
        }
        if (nLang) {
            document.documentElement.setAttribute("lang", cLang);
        }
        $("lTheme").innerHTML = lLoc[nLang].themes_txt[nCurrentTheme];
        $("lCardsLabel").innerHTML = lLoc[nLang].cards;
        $("lPlayersLabel").innerHTML = lLoc[nLang].players;
        $("lStart").innerHTML = lLoc[nLang].start;
        lDev.innerHTML = lLoc[nLang].dev;
        $("lInstr").innerHTML = lLoc[nLang].help;
        $("lLook").innerHTML = lLoc[nLang].look;
        $("thRank").innerHTML = lLoc[nLang].rank;
        $("thPlayer").innerHTML = lLoc[nLang].player;
        $("thPairs").innerHTML = lLoc[nLang].pairs;
        $("thTries").innerHTML = lLoc[nLang].tries;
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
        $("iOK").addEventListener("click", fCloseScore);
        lDev.addEventListener("click", fShowMascha);

        if (fUrlParam("mascha") === "true") {
            nMascha = 0;
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

        document.querySelectorAll(".popup-head .title2card").forEach(function (oCard) {
            oCard.classList.add("turned");
        });

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

        fCardSize();
    }

    window.addEventListener("resize", function () {
        fCardSize();
    });

    fInit();

}());
