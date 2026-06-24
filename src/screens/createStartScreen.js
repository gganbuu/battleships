import { createDestroyer } from "../components/createDestroyer.js"
import {createCruiser } from "../components/createCruiser.js"
import { createStartGameBoardComponent } from "../components/createStartGameBoardComponent.js"
import { createPlayer } from "../models/createPlayer.js"

export const createStartScreen = () => {
    const main = document.querySelector(".main-container")
    
    //temporary createPlayer
    const player = createPlayer("player")

    
    // selection container
    const configurationContainer = document.createElement("div")
    configurationContainer.classList.add("configuration-container")
    main.appendChild(configurationContainer)


    
    // gameboard container
    const gameBoardContainer = createStartGameBoardComponent()
    configurationContainer.appendChild(gameBoardContainer)

    // ships container
    const shipsContainer = document.createElement("div")
    shipsContainer.classList.add("ships-container")
    configurationContainer.appendChild(shipsContainer)
    
    // ships
    const destroyer = createDestroyer()
    shipsContainer.appendChild(destroyer)

    const cruiser = createCruiser()
    shipsContainer.appendChild(cruiser)
    

    //draggables event listeners
    const draggables = document.querySelectorAll('.draggable')
    let dragged = null;

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', (e) => { //styling
            draggable.classList.add('dragging')
            dragged = e.target
        })

        draggable.addEventListener('dragend', () => { //styling
            draggable.classList.remove('dragging')
        })

        draggable.addEventListener("contextmenu", (e) => { //right click rotation
            e.preventDefault()
            let target = e.target
            let orientation = e.target.dataset.orientation

            if (target.parentNode.classList.includes("game-cell")) { //only allow rotation within the gameboard
                

                

                //plan 
                // check if the rotation is legal, if not break
                //      if  
                // remove target's position from gameboard ---- player.getGameBoard().remove(target.id) // remove targets position
                // if dragged.orientation is horizontal
                //      do placedown
                //  else, place right
            
            
            
            
            
            }   
        })

    })

    //dropzone event listeners
    const dropzones = gameBoardContainer.querySelectorAll(".game-cell")
    dropzones.forEach(dropzone => {
        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault()
            let target = e.target
            let col = target.dataset.col 
            let row = target.dataset.row

            // console.log(`[${col},${row}]`)
        })

        dropzone.addEventListener('drop', (e) => {
            e.preventDefault()
            let target = e.target
            let col = Number(target.dataset.col) 
            let row = Number(target.dataset.row)
            let className = target.className

            if (className.includes("game-cell")) { // check if ship is being dragged into gamecell div
                try {
                    player.getGameBoard().remove(dragged.id)// remove ship if position already exists

                    player.getGameBoard().placeRight(dragged.id, [col,row]) // place ship in new position 
                    dragged.parentNode.removeChild(dragged)
                    target.appendChild(dragged)
                    dragged.classList.add("absolute")
                    
                    //debugging functions
                    checkDestroyer()
                    checkCruiser()
                }
                catch (error) { console.error("Error: " + error.message)}  
            } 
        })
    })

    shipsContainer.addEventListener("dragover", (e) => {
        e.preventDefault()
    })

    shipsContainer.addEventListener("drop", (e) => {
        e.preventDefault()
        let target = e.target
        let className = target.className 
        if (className.includes("ships-container")) {
            player.getGameBoard().remove(dragged.id)
            dragged.parentNode.removeChild(dragged)
            target.appendChild(dragged)
            dragged.classList.remove("absolute")

            checkDestroyer()
            checkCruiser()
        }
    })


    // debugging functions

    const checkDestroyer = () => {
        console.log("destroyer = " + player.getGameBoard().where("destroyer"))
    }

    const checkCruiser = () => {
        console.log("cruiser = " + player.getGameBoard().where("cruiser"))
    }
}   




 



















