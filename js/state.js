/**
 * Module for handling state across the application. Can be included in other pages than profile too, see sample usage in profile.html!
 */

// Some example data that could be persisted, can be changed
class Game {

}

class State {

    /**
     * 
     * @param {string} username 
     * @param {Game} games 
     */
    constructor(username, games) {
        this.username = username;
        this.games = games;
    }
    
    /**
     * 
     * @param {string} obj 
     * @returns 
     */
    static fromJSON(obj) {
        const parsed = JSON.parse(obj)
        const instance = new State;
        for (const attr of Object.entries(parsed)) {
            instance[attr[0]] = attr[1];
        }
        return instance;
    };
}

const LOCAL_STORAGE_KEY = "state";

const defaultState = new State("Testaaja", [])

function initState() {
    const stateString = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (typeof stateString !== "string") {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultState))
    }
}

initState();

/**
 * 
 * @param {State} newState 
 */
export function setState(newState) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
    location.reload();
}

/**
 * 
 * @returns {State}
 */
export function getState() {
    return State.fromJSON(localStorage.getItem(LOCAL_STORAGE_KEY));
}

export function clearState() {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
}