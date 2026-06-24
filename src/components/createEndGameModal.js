import { createPlayer } from '../models/createPlayer.js'

export const createEndGameModal = (winner, loser) => {
    const container = document.createElement("div")
    container.classList.add('modal')

    const content = document.createElement("div")
    content.classList.add('modal-content')
    container.appendChild(content)

    const h2 = document.createElement("h2") 
    h2.classList.add("modal-title")
    h2.textContent = `${winner.getName()} has won!`
    content.appendChild(h2)

    content.appendChild(document.createElement("br"))

    const p = document.createElement("p") 
    p.classList.add("modal-title")
    p.textContent = `${loser.getName()}'s fleet has been sunk!`
    content.appendChild(p)

    content.appendChild(document.createElement("br"))

    const button = document.createElement("button")
    button.classList.add("restart-button")
    button.textContent = "restart"
    content.appendChild(button)

    container.classList.toggle("hidden")
    return container
}

