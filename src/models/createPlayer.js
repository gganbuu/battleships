import { createGameBoard } from "./createGameBoard.js"

export const createPlayer = (name) => { 
    const _name = name
    const _gameboard = createGameBoard()

    function getName() {
        return _name
    }

    function getGameBoard() {
        return _gameboard
    }

    return {
        getName,
        getGameBoard
    }
}