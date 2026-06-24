import { createGameBoard } from "./createGameBoard.js"

export const createPlayer = (name) => { 
    const _name = name
    const _gameboard = createGameBoard()

    function getName() {
        return _name
    }

    function setName(newName) {
        _name = newName
    }

    function getGameBoard() {
        return _gameboard
    }

    return {
        getName,
        setName,
        getGameBoard
    }
}