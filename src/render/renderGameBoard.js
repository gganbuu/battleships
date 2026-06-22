import { createGameBoard } from '../models/createGameBoard.js'

export const renderGameBoard = (component, model) => {
    //render ships on board
    const allShips = model.getAllShips()
    for (let ship of allShips) {
        let coords = model.where(ship.getName())
        for (let coord of coords) {
            let cell = component.querySelector(`[data-col='${coord[0]}'][data-row='${coord[1]}']`)
            cell.classList.remove("empty")
            cell.classList.add("ship")
        }
    }
    
}