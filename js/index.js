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

document.getElementById("gamesTab").onclick = () => {
    if (gameReqs.length > 0) {
        const i = Math.floor(Math.random() * gameReqs.length);
        const randomDuration = gameReqs[i].duration + Math.floor(Math.random() * 61);
        document.getElementById("foundDate").innerText = gameReqs[i].date;
        //document.getElementById("foundTime").innerText = gameTimes[i].startTime + " - " + gameTimes[i].endTime;
        //document.getElementById("foundDuration").innerText = Math.floor(randomDuration / 60) + " tuntia " + (randomDuration % 60) + " minuuttia"
        document.getElementById("foundGame").innerText = gameReqs[i].game;
    };
};

document.getElementById("inviteButton").onclick = async () => {
    await new Promise(r => setTimeout(r, 10000));
    alert("Matti Meikäläinen hyväksyi kutsusi!");
};