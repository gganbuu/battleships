export const createCruiser = () => {
    const cruiser = document.createElement("div")
    cruiser.classList.add('ship', 'draggable')
    cruiser.id = "cruiser"
    cruiser.dataset.orientation = "horizontal"
    cruiser.draggable = "true"
    return cruiser 
}