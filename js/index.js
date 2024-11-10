import { getState, setState } from "./state.js";

const state = getState();

document.getElementById("ddUsername").innerText = state.username;

class GameRequest {
    constructor(date, startTime, endTime, duration, game) {
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.duration = duration;
        this.game = game;
    }
}

class Game {
    constructor(date, startTime, endTime, game, location) {
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.game = game;
        this.location = location;
    }
}

const gameReqs = state.gameReqs;
const games = state.games;

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
    gameCell.appendChild(document.createTextNode(gameRequest.game));
    newRow.appendChild(gameCell);
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
    gameCell.appendChild(document.createTextNode(game.game));
    newRow.appendChild(gameCell);
    const locationCell = document.createElement("td");
    locationCell.appendChild(document.createTextNode(game.location));
    newRow.appendChild(locationCell);
    const chatroomCell = document.createElement("td");
    const chatroomLink = document.createElement("a");
    chatroomLink.setAttribute("href", CHAT_LINK);
    chatroomLink.appendChild(document.createTextNode("Keskustelu"));
    chatroomCell.appendChild(chatroomLink);
    newRow.appendChild(chatroomCell);
    document.getElementById("gameList").appendChild(newRow);
}

for (let game of games) {
    addGameRow(game);
}

document.getElementById("addButton").onclick = () => {
    const date = document.getElementById("dateInput").value;
    const startTime = document.getElementById("startTimeInput").value;
    const endTime = document.getElementById("endTimeInput").value;
    const durationHours = document.getElementById("durationHoursInput").value;
    const durationMinutes = document.getElementById("durationMinsInput").value;
    const game = document.getElementById("gameInput").value;

    const gameRequest = new GameRequest(date, startTime, endTime, (parseInt(durationHours) * 60) + parseInt(durationMinutes), game);
    gameReqs.push(gameRequest);
    setState({...getState(), gameReqs});
    addRequestRow(gameRequest);
};

var randomGameReq = null;

function initSearch() {
    const requestedGameCard = document.getElementById("requestedGameCard");
    if (gameReqs.length > 0) {
        randomGameReq = gameReqs[Math.floor(Math.random() * gameReqs.length)]
        document.getElementById("foundDateTime").innerText = randomGameReq.date + " klo " + randomGameReq.startTime + " - " + randomGameReq.endTime;
        document.getElementById("foundGame").innerText = randomGameReq.game;
        document.getElementById("requestedGameCard").hidden = false;
    } else {
        requestedGameCard.hidden = true;
    }
}

initSearch();

document.getElementById("gamesTab").onclick = initSearch;

async function invite(game) {
    await new Promise(r => setTimeout(r, 10000));
    games.push(game);
    setState({...getState(), games});
    addGameRow(game);
    alert("Matti Meikäläinen hyväksyi kutsusi!");
}

/**
 * @type {HTMLButtonElement}
 */
const inviteButton = document.getElementById("inviteButton");

inviteButton.onclick = async () => {
    inviteButton.disabled = true;
    inviteButton.innerText = "Odottaa hyväksyntää..";
    await invite(new Game(randomGameReq.date, randomGameReq.startTime, randomGameReq.endTime, randomGameReq.game, "Otahalli"));
    inviteButton.innerText = "Liitytty peliin!";
};

document.getElementById("unreqInviteButton").onclick = async () => {
    await invite(new Game("2024-11-21", "16:00", "17:30", "Jalkapallo", "Otahalli"));
};