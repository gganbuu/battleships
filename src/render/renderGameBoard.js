import { createGameBoard } from '../models/createGameBoard.js'

export const renderGameBoard = (component, model) => {
    const grid = model.getGrid()
    

    for (let i = 0; i <= 9; i++) {
        for (let j = 0; j <= 9; j++) {
            let cell = component.querySelector(`.game-cell[data-col='${j}'][data-row='${i}']`)
                     
            // case for empty grid cell
            if (grid[i][j] == null) {
                cell.classList.remove("ship")
                cell.classList.add("empty")
                cell.dataset.contains = "null"
            } else {  // case for ship occupied
                cell.classList.add("ship")
                cell.classList.remove("empty")
                cell.dataset.contains = grid[i][j].getName()
            }

        }
    }


    //loop through all of 
}

//render ships on board
    // const allShips = model.getAllShips()
    // for (let ship of allShips) {
    //     let coords = model.where(ship.getName())
    //     for (let coord of coords) {
    //         let cell = component.querySelector(`[data-col='${coord[0]}'][data-row='${coord[1]}']`)
    //         cell.classList.remove("empty")
    //         cell.classList.add("ship")
    //     }
    // }


//ss
// const allShips = model.getAllShips()
//     for (let ship of allShips) {
//         let coords = model.where(ship.getName())
        
//         if (coords.length > 0) {
//             for (let coord of coords) {
//                 let cell = component.querySelector(`[data-col='${coord[0]}'][data-row='${coord[1]}']`)
//                 cell.classList.remove("empty")
//                 cell.classList.add("ship")
//             }
//         }
//     }