export const createBattleShip = () => {
    const battleShip = document.createElement("div")
    battleShip.classList.add('ship', 'draggable')
    battleShip.id = "battleship"
    battleShip.dataset.orientation = "horizontal"
    battleShip.draggable = "true"
    battleShip.dataset.col = "null"
    battleShip.dataset.row = "null"
    return battleShip 
}