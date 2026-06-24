import { createCells } from "./createCells.js"

export const createGameBoardComponent = (name) => {
    const container = document.createElement("div")
    container.classList.add("gameboard-container")

    const nameContainer = createNameContainer(name)
    container.appendChild(nameContainer)

    const grid = document.createElement("div")
    grid.classList.add("gameboard-grid")
    createCells(grid)

    container.appendChild(grid)
    return container
}

const createNameContainer = (name) => {
    const nameContainer = document.createElement("div")
    nameContainer.classList.add("gameboard-name-container")
    
    const title = document.createElement("h2")
    title.textContent = `${name}'s fleet`
    nameContainer.appendChild(title)
    return nameContainer
}

