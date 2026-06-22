export const createGameBoardComponent = () => {
    const gameBoardComponent = document.createElement("div")
    gameBoardComponent.classList.add("game-board")
    createGameCells(gameBoardComponent)
    return gameBoardComponent
}

const createGameCells = (gameboard) => {
    for (let i = 9; i >= 0; i--) {
        for (let j = 0; j <= 9; j++) {
            const gameCell = document.createElement('div')
            gameCell.classList.add("game-cell")
            gameCell.classList.add("empty")
            gameCell.dataset.row = i
            gameCell.dataset.col = j
            gameboard.appendChild(gameCell)
        }
    }
}

