import { getState, setState } from "./state.js";

const state = getState();

document.getElementById("ddUsername").innerText = state.username;

class GameRequest {
    constructor(date, startTime, endTime, duration, gameSelections, level) {
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.duration = duration;
        this.gameSelections = gameSelections;
        this.level = level;
    }
}

class Game {
    constructor(date, startTime, endTime, gameName, location, level) {
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.gameName = gameName;
        this.location = location;
        this.level = level;
    }
}

const gameReqs = state.gameReqs;
const games = state.games;

const levelNames = ["", "Aloittelija", "Keskitaso", "Kilpailullinen"];

function addRequestRow(gameRequest) {
    const durationHours = Math.floor(gameRequest.duration / 60);
    const durationMinutes = gameRequest.duration % 60;

    const newRow = document.createElement("tr");
    const dateCell = document.createElement("td");
    dateCell.appendChild(document.createTextNode(gameRequest.date));
    newRow.appendChild(dateCell);
    const timeCell = document.createElement("td");
    timeCell.appendChild(document.createTextNode(gameRequest.startTime + " - " + gameRequest.endTime));
    newRow.appendChild(timeCell);
    const durationCell = document.createElement("td");
    durationCell.appendChild(document.createTextNode(durationHours + " tuntia " + durationMinutes + " minuuttia"));
    newRow.appendChild(durationCell);
    const gameCell = document.createElement("td");
    gameCell.appendChild(document.createTextNode(gameRequest.gameSelections.join(", ")));
    newRow.appendChild(gameCell);
    const levelCell = document.createElement("td");
    levelCell.appendChild(document.createTextNode(levelNames[gameRequest.level]));
    newRow.appendChild(levelCell);
    document.getElementById("timeList").appendChild(newRow);
}

for (let gameReq of gameReqs) {
    addRequestRow(gameReq);
}

const CHAT_LINK = "https://t.me/+-6b3cWi1FEJjNjRk"

function addGameRow(game) {
    const newRow = document.createElement("tr");
    const dateCell = document.createElement("td");
    dateCell.appendChild(document.createTextNode(game.date));
    newRow.appendChild(dateCell);
    const timeCell = document.createElement("td");
    timeCell.appendChild(document.createTextNode(game.startTime + " - " + game.endTime));
    newRow.appendChild(timeCell);
    const gameCell = document.createElement("td");
    gameCell.appendChild(document.createTextNode(game.gameName));
    newRow.appendChild(gameCell);
    const levelCell = document.createElement("td");
    levelCell.appendChild(document.createTextNode(levelNames[game.level]));
    newRow.appendChild(levelCell);
    const locationCell = document.createElement("td");
    locationCell.appendChild(document.createTextNode(game.location));
    newRow.appendChild(locationCell);
    const chatroomCell = document.createElement("td");
    const chatroomLink = document.createElement("a");
    chatroomLink.setAttribute("href", CHAT_LINK);
    chatroomLink.setAttribute("target", "_blank")
    chatroomLink.appendChild(document.createTextNode("Keskustelu"));
    chatroomCell.appendChild(chatroomLink);
    newRow.appendChild(chatroomCell);
    document.getElementById("gameList").appendChild(newRow);
}

for (let game of games) {
    addGameRow(game);
}

const gameBtns = [
    {buttonId: "addBtnFootball", gameName: "Jalkapallo"},
    {buttonId: "addBtnBasketball", gameName: "Koripallo"},
    {buttonId: "addBtnVolleyball", gameName: "Lentopallo"},
    {buttonId: "addBtnFloorball", gameName: "Sähly"},
    {buttonId: "addBtnTennis", gameName: "Tennis"},
    {buttonId: "addBtnBadminton", gameName: "Sulkapallo"},
    {buttonId: "addBtnSports", gameName: "Muut urheilulajit"},
    {buttonId: "addBtnChess", gameName: "Shakki"},
    {buttonId: "addBtnMonopoly", gameName: "Monopoly"},
    {buttonId: "addBtnBoardGames", gameName: "Muut lautapelit"},
];

let selectedGames = [];

function updateSelectionUI() {
    // Update chips
    const chipContainer = document.getElementById("addedGames");
    chipContainer.innerHTML = "";
    for (let selection of selectedGames) {
        const chip = document.createElement("span");
        chip.setAttribute("class", "bg-light border rounded-pill px-3 d-inline-flex align-items-center me-2");
        chip.appendChild(document.createTextNode(selection));
        const removeBtn = document.createElement("button");
        removeBtn.setAttribute("type", "button");
        removeBtn.setAttribute("class", "btn-close ms-2");
        removeBtn.setAttribute("aria-label", "Poista");
        removeBtn.onclick = () => {
            selectedGames = selectedGames.filter((gameName) => gameName !== selection);
            updateSelectionUI();
        };
        chip.appendChild(removeBtn);
        chipContainer.appendChild(chip);
    }

    // Disable or enable buttons
    for (let gameBtn of gameBtns) {
        document.getElementById(gameBtn.buttonId).disabled = selectedGames.includes(gameBtn.gameName);
    }
}

for (let gameBtn of gameBtns) {
    const addBtn = document.getElementById(gameBtn.buttonId);
    addBtn.onclick = () => {
        selectedGames.push(gameBtn.gameName);
        updateSelectionUI();
    };
}

document.getElementById("addBtnOther").onclick = () => {
    const gameName = document.getElementById("gameInput").value;
    selectedGames.push(gameName);
    updateSelectionUI();
};

document.getElementById("addButton").onclick = () => {
    const date = document.getElementById("dateInput").value;
    const startTime = document.getElementById("startTimeInput").value;
    const endTime = document.getElementById("endTimeInput").value;
    const durationHours = document.getElementById("durationHoursInput").value;
    const durationMinutes = document.getElementById("durationMinsInput").value;
    const duration = (parseInt(durationHours) * 60) + parseInt(durationMinutes);
    const gameSelections = selectedGames.slice();
    const level = parseInt(document.getElementById("levelSelector").value);

    const gameRequest = new GameRequest(date, startTime, endTime, duration, gameSelections, level);
    gameReqs.push(gameRequest);
    setState({...getState(), gameReqs});
    addRequestRow(gameRequest);
};

var randomGameReq = null;
var randomGameSelection = null;

function initSearch() {
    const requestedGames = document.getElementById("requestedGames");
    if (gameReqs.length > 0) {
        randomGameReq = gameReqs[Math.floor(Math.random() * gameReqs.length)];
        const numberOfSelections = randomGameReq.gameSelections.length;
        randomGameSelection = randomGameReq.gameSelections[Math.floor(Math.random() * numberOfSelections)];
        document.getElementById("foundDateTime").innerText = randomGameReq.date + " klo " + randomGameReq.startTime + " - " + randomGameReq.endTime;
        document.getElementById("foundGame").innerText = randomGameSelection;
        document.getElementById("foundLevel").innerText = levelNames[randomGameReq.level];
        requestedGames.hidden = false;
    } else {
        requestedGames.hidden = true;
    }
}

initSearch();

document.getElementById("gamesTab").onclick = initSearch;

async function invite(button, game) {
    button.disabled = true;
    button.innerText = "Odottaa hyväksyntää..";
    await new Promise(r => setTimeout(r, 10000));
    games.push(game);
    setState({...getState(), games});
    addGameRow(game);
    button.innerText = "Liitytty peliin!";
    alert("Matti Meikäläinen hyväksyi kutsusi!");
}

/**
 * @type {HTMLButtonElement}
 */
const inviteButton = document.getElementById("inviteButton");

inviteButton.onclick = async () => {
    await invite(inviteButton, new Game(randomGameReq.date, randomGameReq.startTime, randomGameReq.endTime, randomGameSelection, "Otahalli", randomGameReq.level));
};

{
    /**
     * 
     * @param {HTMLElement} element 
     * @param {number} columnIndex 
     */
    function filterTable(element, columnIndex) {
        const filter = element.value.toLowerCase();
        const table = document.querySelector('.signups-table');
        const rows = table.querySelectorAll('tbody tr');
    
        rows.forEach(row => {
            const cell = row.cells[columnIndex];
            if (cell && cell.textContent.toLowerCase().includes(filter)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }
    const elements = document.getElementsByClassName("filter-input");

    for (let index = 0; index < elements.length; index++) {
        /**
         * @type {HTMLElement}
         */
        const element = elements[index];
        element.addEventListener("keyup", () => filterTable(element, index))
    }
}



