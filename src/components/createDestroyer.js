export const createDestroyer = () => {
    const destroyer = document.createElement("div")
    destroyer.classList.add('ship', 'draggable')
    destroyer.id = "destroyer"
    destroyer.dataset.orientation = "horizontal"
    destroyer.draggable = "true"
    return destroyer 
}