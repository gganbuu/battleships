import { createDestroyer } from "../components/createDestroyer.js"
import { createCruiser } from "../components/createCruiser.js"
import { createCarrier } from "../components/createCarrier.js"
import { createSubmarine } from "../components/createSubmarine.js"
import { createBattleShip } from "../components/createBattleShip.js"

export const createShipsContainer = () => {
    const container = document.createElement("div")
    container.classList.add("ships-container")
    
    const cruiserLot = document.createElement("div")
    cruiserLot.classList.add("cruiser-lot")

    const battleshipLot = document.createElement("div")
    battleshipLot.classList.add("battleship-lot")

    const submarineLot = document.createElement("div")
    submarineLot.classList.add("submarine-lot")

    const carrierLot = document.createElement("div")
    carrierLot.classList.add("carrier-lot")

    const destroyerLot = document.createElement("div")
    destroyerLot.classList.add("destroyer-lot")

    container.appendChild(destroyerLot)
    container.appendChild(cruiserLot)
    container.appendChild(submarineLot)
    container.appendChild(battleshipLot)
    container.appendChild(carrierLot)

    const destroyer = createDestroyer()
    destroyerLot.appendChild(destroyer)

    const cruiser = createCruiser()
    cruiserLot.appendChild(cruiser)

    const submarine = createSubmarine()
    submarineLot.appendChild(submarine)

    const battleShip = createBattleShip()
    battleshipLot.appendChild(battleShip)

    const carrier = createCarrier()
    carrierLot.appendChild(carrier)

    return container
}