import { createGameBoardComponent } from '../components/createGameBoardComponent.js'
import { createPlayer } from '../models/createPlayer.js'
import { createGameBoard } from '../models/createGameBoard.js'
import { renderGameBoard } from '../render/renderGameBoard.js'
import { createCoordinatesArray } from '../models/createCoordinatesArray.js'
import { createEndGameModal } from '../components/createEndGameModal.js'

export const createGameScreen = () => { //player and computer
    // select main container
    const main = document.querySelector('.main-container')
    
    // computer coordinate bank
    const computerCoordsBank = createCoordinatesArray() 
    
    // temp gameboard setups
    const playerUser = createPlayer("user")
    const computerUser = createPlayer("computer")

    const playerBoard = playerUser.getGameBoard()
    const computerBoard = computerUser.getGameBoard()
    playerBoard.tempSetPlace()
    computerBoard.tempSetPlace()
    

    const handleTurn = (e) => {
        let target = e.target
        let col = target.dataset.col
        let row = target.dataset.row

        if (computerBoard.getAttacks([col,row]) === undefined) {
            handleComputerReceiveAttack([col, row])
            setTimeout(() => handleCheckSunk(playerUser), 1000)
            handlePlayerReceiveAttack()
            setTimeout(() => handleCheckSunk(computerUser), 1000)
        }
    }

    const handleComputerReceiveAttack = ([col, row]) => {
    // get the click event's target cell coordinates
    const target = computerBoardComponent.querySelector(`[data-col='${col}'][data-row='${row}']`)
    // enter receiveattack function with cell coords
    computerBoard.receiveAttack([col,row])

    // check return on getattack function with cell coords
        if (computerBoard.getAttacks([col,row]) == "h") {
            target.classList.remove("empty")
            target.classList.add("hit")
        } else {
            target.classList.remove("empty")
            target.classList.add("miss")
        }

    }

    const handlePlayerReceiveAttack = () => {
        const [col, row] = computerCoordsBank.getItem()
        const target = playerBoardComponent.querySelector(`[data-col='${col}'][data-row='${row}']`)

        playerBoard.receiveAttack([col,row])
         if (playerBoard.getAttacks([col,row]) == "h") {
            target.classList.remove("empty")
            target.classList.add("hit")
        } else {
            target.classList.remove("empty")
            target.classList.add("miss")
        }
    }
    
    const handleCheckSunk = (user) => {
        if (user.getGameBoard().allSunk()) {
            let winner
            let loser = user.getName()
            loser == "computer" ? winner = playerUser.getName() : winner = "computer"
            alert(`All of ${loser}'s fleet has been sunk! \n ${winner} has won!`)
        }
    }




    // creating gameboard ui components
    const playerBoardComponent = createGameBoardComponent(playerUser.getName())
    const computerBoardComponent = createGameBoardComponent(computerUser.getName())


    const computerBoardGrid = computerBoardComponent.querySelector(".gameboard-grid")
    computerBoardGrid.addEventListener("click", handleTurn)


    // modal testing
    const endGameModal = createEndGameModal(playerUser, computerUser)
    main.appendChild(endGameModal)
    endGameModal.classList.toggle("hidden")

    

    //render UI components for player
    renderGameBoard(playerBoardComponent, playerBoard)

    main.appendChild(playerBoardComponent)
    main.appendChild(computerBoardComponent)

}

