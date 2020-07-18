// Karten-Template
var oFlipContainer;
// Liste aller spielbaren Karten für Click-Handler
var lFlipContainer = document.getElementById("grid").getElementsByClassName("flip-container");
// Zähler für Schlaufen
var nIndex;
// Liste der aktuell umgedrehten Karten
var lFlipped = [];
// Anzahl maximal möglicher Paare
var nMaxPairs = 24;
// Ausgewähltes Thema
var cCurrentTheme = "animals";
// fürs aktuelle Spiel gewählte Paare
var lPairs = [];
// Anzahl Karten fürs aktuelle Spiel
var nAnzCards = 24;
// gemischte Karten fürs aktuelle Spiel
var lCards = [];
// Spieler, der aktuell am Zug ist
var nCurrentPlayer = 0;
// Anzahl Spieler
var nAnzPlayer = 2;
// Punktestand pro Spieler
var lScore = [0, 0];

// Mischen eines Arrays
function fShuffle(lArray) {
    for (let i = lArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lArray[i], lArray[j]] = [lArray[j], lArray[i]];
    }
    return lArray;
}

function fStartGame() {
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
        console.log(nIndex);
    }


    for (nIndex = 0; nIndex < lFlipContainer.length; nIndex += 1) {
        // Click-Event auf Karten legen
        lFlipContainer[nIndex].onclick = function(ignore) {

            if (lFlipped.length === 2) {
                // Karten wieder umdrehen
                lFlipped[0].classList.remove("turned");
                lFlipped[1].classList.remove("turned");
                // umgedrehte Karten zurücksetzen
                lFlipped = [];
            }

            lFlipped.push(this);

            if (lFlipped.length === 2) {
                console.log(lFlipped[0]);
                console.log(lFlipped[0].querySelectorAll("div div:nth-child(2) img")[0].src);
                console.log(lFlipped[1]);
                console.log(lFlipped[1].querySelectorAll("div div:nth-child(2) img")[0].src);
                // falls 2 Karten umgedreht sind
                if (lFlipped[0].getElementsByClassName("image")[0].src === lFlipped[1].getElementsByClassName("image")[0].src) {
                    // falls die zwei Karten gleich sind
                    // aktueller Spieler + 1 Punkt
                    lScore[nCurrentPlayer] += 1;
                    // umgedrehte Karten zurücksetzen
                    lFlipped = [];
                } else {
                    // falls die zwei Karten unterschiedlich sind

                    // nächster Spieler am Zug
                    nCurrentPlayer += 1;
                    if (nCurrentPlayer > nAnzPlayer) {
                        nCurrentPlayer = 0;
                    }
                }
            }

            this.classList.toggle("turned");
        }
    }
}

fStartGame();



