export const createCruiser = () => {
    const cruiser = document.createElement("div")
    cruiser.classList.add('ship', 'draggable')
    cruiser.id = "cruiser"
    cruiser.dataset.orientation = "horizontal"
    cruiser.draggable = "true"
    cruiser.dataset.col = "null"
    cruiser.dataset.row = "null"
    return cruiser 
}