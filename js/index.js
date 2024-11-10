import { getState, setState } from "./state.js";

const state = getState();

document.getElementById("ddUsername").innerText = state.username;

class GameTime {
    constructor(date, startTime, endTime, duration, game) {
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.duration = duration;
        this.game = game;
    }
}

const gameTimes = [];

document.getElementById("addButton").onclick = () => {
    // Hakee syötetyt arvot ja lisää ne listaan
    const date = document.getElementById("dateInput").value;
    const startTime = document.getElementById("startTimeInput").value;
    const endTime = document.getElementById("endTimeInput").value;
    const durationHours = document.getElementById("durationHoursInput").value;
    const durationMinutes = document.getElementById("durationMinsInput").value;
    const game = document.getElementById("gameInput").value;
    gameTimes.push(new GameTime(date, startTime, endTime, (parseInt(durationHours) * 60) + parseInt(durationMinutes), game));

    // Lisää uuden rivin taulukkoon
    const newRow = document.createElement("tr");
    const dateCell = document.createElement("td");
    dateCell.appendChild(document.createTextNode(date));
    newRow.appendChild(dateCell);
    const timeCell = document.createElement("td");
    timeCell.appendChild(document.createTextNode(startTime + " - " + endTime));
    newRow.appendChild(timeCell);
    const durationCell = document.createElement("td");
    durationCell.appendChild(document.createTextNode(durationHours + " tuntia " + durationMinutes + " minuuttia"));
    newRow.appendChild(durationCell);
    const gameCell = document.createElement("td");
    gameCell.appendChild(document.createTextNode(game));
    newRow.appendChild(gameCell);
    document.getElementById("timeList").appendChild(newRow);
};

document.getElementById("gamesTab").onclick = () => {
    if (gameTimes.length > 0) {
        const i = Math.floor(Math.random() * gameTimes.length);
        const randomDuration = gameTimes[i].duration + Math.floor(Math.random() * 61);
        document.getElementById("foundDate").innerText = gameTimes[i].date;
        document.getElementById("foundTime").innerText = gameTimes[i].startTime + " - " + gameTimes[i].endTime;
        document.getElementById("foundDuration").innerText = Math.floor(randomDuration / 60) + " tuntia " + (randomDuration % 60) + " minuuttia"
        document.getElementById("foundGame").innerText = gameTimes[i].game;
    };
};

document.getElementById("inviteButton").onclick = async () => {
    await new Promise(r => setTimeout(r, 10000));
    alert("Matti Meikäläinen hyväksyi kutsusi!");
};