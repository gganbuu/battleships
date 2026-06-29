export const createSubmarine = () => {
    const submarine = document.createElement("div")
    submarine.classList.add('ship', 'draggable')
    submarine.id = "submarine"
    submarine.dataset.orientation = "horizontal"
    submarine.draggable = "true"
    submarine.dataset.col = "null"
    submarine.dataset.row = "null"
    return submarine 
}