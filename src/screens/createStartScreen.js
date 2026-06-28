import { createDestroyer } from "../components/createDestroyer.js"
import { createCruiser } from "../components/createCruiser.js"
import { createStartGameBoardComponent } from "../components/createStartGameBoardComponent.js"
import { createPlayer } from "../models/createPlayer.js"
import { renderGameBoard } from "../render/renderGameBoard.js"

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
            handleRotateInGameCell(e, dragged, player)
            renderGameBoard(gameBoardContainer, player.getGameBoard())
            checkDestroyer(player)
            checkCruiser(player)
        })

    })

    //dropzone event listeners
    const dropzones = gameBoardContainer.querySelectorAll(".game-cell")
    dropzones.forEach(dropzone => {
        dropzone.addEventListener('dragover', (e) => { //remove default drag over behaviour
            e.preventDefault()
        })

        dropzone.addEventListener('drop', (e) => {
            handleDropInGameCell(e, dragged, player)
            renderGameBoard(gameBoardContainer, player.getGameBoard())
            checkDestroyer(player)
            checkCruiser(player)
        })
    })

    shipsContainer.addEventListener("dragover", (e) => {
        e.preventDefault()
    })

    shipsContainer.addEventListener("drop", (e) => {
        handleDropInShipsContainer(e, dragged, player)
        renderGameBoard(gameBoardContainer, player.getGameBoard())
        checkDestroyer(player)
        checkCruiser(player)
    })

}   

//handle rotate
const handleRotateInGameCell = (e, dragged, player) => {
    e.preventDefault()
    let target = e.target
    let orientation = e.target.dataset.orientation

    if (target.parentNode.classList.contains("game-cell")) { //only allow rotation within the gameboard
        let gameboard = player.getGameBoard()
        let ship = gameboard.getShip(target.id)
        try {
            gameboard.rotate(target.id)
        } catch (error) {
            console.error(error.message)
            return
        }

        target.style.transformOrigin = "25px 25px"      
        if (target.dataset.orientation == "horizontal") {
            target.style.transform = "rotate(90deg)"
            target.dataset.orientation = "vertical"
        } else {
            target.style.transform = "rotate(0deg)"
            target.dataset.orientation = "horizontal"
        }
    }

}


//handleDropInGameCell
const handleDropInGameCell = (e, dragged, player) => {
    e.preventDefault()
    let target = e.target
    let col = Number(target.dataset.col) 
    let row = Number(target.dataset.row)
    let className = target.className

    if (className.includes("game-cell")) { 
        dragged.dataset.col = col
        dragged.dataset.row = row
        let orientation = dragged.dataset.orientation
        let gameboard = player.getGameBoard()
        let ship = gameboard.getShip(dragged.id)
        let length = ship.getLength()

        if (orientation == "horizontal") {
            try {
                gameboard.placeRight(dragged.id,[col,row])
            } catch (error) {
                console.error(error.message)
                return
            }
        } else {
            try {
                gameboard.placeDown(dragged.id,[col,row])
            } catch (error) {
                console.error(error.message)
                return
            }
        }
        dragged.parentNode.removeChild(dragged)
        target.appendChild(dragged)
        dragged.classList.add("absolute")
    }
}

//handleDropInShipsContainer
const handleDropInShipsContainer = (e, dragged, player) => {
    e.preventDefault()
    // get target
    let target = e.target
    let className = target.className 

    // get dragged data
    let orientation = dragged.dataset.orientation
    let col = Number(dragged.dataset.col)
    let row = Number(dragged.dataset.row)

    //get player data
    let gameboard = player.getGameBoard()
    let ship = gameboard.getShip(dragged.id)
    let length = ship.getLength()

    if (className.includes("ships-container")) {
        gameboard.remove(dragged.id)

        dragged.dataset.col = null
        dragged.dataset.row = null

        
        dragged.parentNode.removeChild(dragged)
        target.appendChild(dragged)
        dragged.classList.remove("absolute")

        dragged.style.transformOrigin = "25px 25px"      
        if (dragged.dataset.orientation == "vertical") {
            dragged.style.transform = "rotate(0deg)"
            dragged.dataset.orientation = "horizontal"
        }
    }
}


// debugging functions
const checkDestroyer = (player) => {
    console.log("destroyer = " + player.getGameBoard().where("destroyer"))
}

const checkCruiser = (player) => {
    console.log("cruiser = " + player.getGameBoard().where("cruiser"))
}




 



















