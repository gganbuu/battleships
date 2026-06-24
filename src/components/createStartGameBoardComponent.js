import { createCells } from "./createCells.js"

export const createStartGameBoardComponent = () => {
    const grid = document.createElement("div")
    grid.classList.add("gameboard-grid")
    createCells(grid)
    return grid 
}