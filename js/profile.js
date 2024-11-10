import { getState, setState, clearState } from "./state.js"

/**
 * 
 * @param {String} className 
 * @param {String} content
 */
function setElementContent(className, content) {
    for (const element of document.getElementsByClassName(className)) {
        element.textContent = content;
    }
}

const state = getState();

setElementContent("profile-title", `Profiilisi, ${state.username}`)

/**
 * @type {HTMLButtonElement}
 */
const closeAccountBtn = document.getElementsByClassName("close-account-btn")[0]

closeAccountBtn.onclick = () => {
    clearState();
    location.reload();
}

/**
 * @type {HTMLFormElement}
 */
const profileForm = document.getElementsByClassName("profile-form")[0]

profileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameElement = document.getElementById("formNameInput")
    setState(
        { 
            ...getState(),
            username: nameElement.value
        }
    )
})

/**
 * @type {HTMLButtonElement}
 */
const backBtn = document.getElementsByClassName("back-btn")[0]
backBtn.onclick = () => {
    history.back();
}
