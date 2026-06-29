export const createCarrier = () => {
    const carrier = document.createElement("div")
    carrier.classList.add('ship', 'draggable')
    carrier.id = "carrier"
    carrier.dataset.orientation = "horizontal"
    carrier.draggable = "true"
    carrier.dataset.col = "null"
    carrier.dataset.row = "null"
    return carrier 
}