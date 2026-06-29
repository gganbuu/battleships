import { createShip } from "./createShip.js"

export const createGameBoard = (rows = 10, cols = 10) => {
    let _grid = createGrid(rows, cols)
    const _ships = createAllShips()
    const _attacks = []
    
    function createAllShips() {
        return [
            createShip(5,"carrier"),
            createShip(4, "battleship"),
            createShip(3, "cruiser"),
            createShip(3, "submarine"),
            createShip(2, "destroyer")
        ]
    }

    function getShip(name) {
        return _ships.find(element => element.getName() == name)
        
    }

    function getAllShips() {
        return _ships
    }

    function createGrid(rows, cols) {
        return Array.from({length: rows}, () => Array(cols).fill(null))
    }

    function resetAll() {
        // remove all references to ships in gameboard
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++ ) {
                _grid[i][j] = null
            }
        }

        // remove orientation and anchors in ships
        _ships.forEach(ship => {
            ship.setAnchor(null)
            ship.setOrientation(null)
        })
    }

    function getGrid() {
        return _grid
    }

    //place methods
    // note that coords are expected to be received in [x,y] format but 
    // are flipped in this function as createGrid creates rows and columns (matrix)
    function placeRight(name, coords) {
        const ship = getShip(name)
        if (ship == undefined) throw new Error("Name Error: Ship with name provided does NOT exist")
        
        
        const [col, row] = [coords[0], coords[1]]

        const shipLength = ship.getLength()
        
        if (col + shipLength-1 > 9) throw new Error(`Out of Bounds Error: Ship is out of bounds`)
        
        // check if space is occupied
        for (let i = col; i < col+shipLength; i++) {
            if (checkCoords([i,row])) { 
               throw new Error("Occupied Error: the ship cannot be placed, as that square is already occupied")
            }
        }

        // condition if ship element already exists in the grid
        if (ship.getAnchor != null) (remove(name))

        for (let j = col; j < col+shipLength; j++) {
            _grid[row][j] = ship
        }

        ship.setAnchor([col,row])
        ship.setOrientation("h")

    }

    function placeDown(name, coords) {
        const ship = getShip(name)
        if (ship == undefined) throw new Error("Name Error: Ship with name provided does NOT exist")
        

        const [col, row] = [coords[0], coords[1]]

        const shipLength = ship.getLength()
        
        if (row - (shipLength-1) < 0) throw new Error("Out of Bounds Error: Ship is out of bounds")
        
        // check if space is occupied
        for (let i = row; i > row-shipLength; i--) {
            if (checkCoords([col,i])) { 
                throw new Error("Occupied Error: the ship cannot be placed, as that square is already occupied")
            } 
        }

        if (ship.getAnchor != null) (remove(name))

        for (let j = row; j > row-shipLength; j--) {
            _grid[j][col] = ship
        }

        ship.setAnchor([col,row])
        ship.setOrientation("v")
    }


    // check  + get coords methods
    function checkCoords(coords) {
        const [col, row] = [coords[0], coords[1]]

        if (row < 0 ||
            row > 9 ||
            col < 0 ||
            col > 9) return true
            

        if (_grid[row][col] === null) return false
        

        
        return true
    }

    function getCoords(coords) {
        const [col, row] = [coords[0], coords[1]]
        return _grid[row][col]
    }

    function setCoords(coords, value) {
        const [col, row] = [coords[0], coords[1]]
        _grid[row][col] = value
    }

    //checkrotate method
    function checkRotate(name, newOrientation) {
        const ship = getShip(name)
        const length = ship.getLength()
        const coords = ship.getAnchor()
        const [col, row] = [coords[0],coords[1]] 

        if (newOrientation == "v") {
            for (let i = row-1; i >= row-(length-1); i--) {
                if (checkCoords([col,i])) return false 
            }
        } else {
            for (let j = col+1; j <= col+length-1; j++) {
                if (checkCoords([j,row])) return false
            }
        }
        return true
    }

    //rotate method
    function rotate(name) {
        const ship = getShip(name)
        const coords = ship.getAnchor()
        let newOrientation
        ship.getOrientation() == "v" ? newOrientation = "h": newOrientation = "v"; 
        
        if (checkRotate(name, newOrientation)) {
            remove(name)
            if (newOrientation == "v") {
                placeDown(name, coords)
            } else { 
                placeRight(name, coords)
            }
        } else {throw Error("Ship cannot be rotated as it collides with another ship or is out of bounds")}

    }

        


    //where method --> takes name of ship and returns all positions where ship object matching the name is reference
    function where(name) {
        const ship = getShip(name)
        if (ship == undefined) throw new Error("Name Error: Ship with name provided does NOT exist")
        
        const array = []
        _grid.forEach((row, rIndex) => {
            row.forEach((col, cIndex) => {
                if (col == ship) {
                    array.push([cIndex,rIndex])
                }
            })
        })
        if (array.length == 0) return false

        return array
    }

    //remove shipc
    function remove(name) {
        const ship = getShip(name)
        if (ship == undefined) throw new Error("Name Error: Ship with name provided does NOT exist")
        
        ship.setAnchor(null)
        ship.setOrientation(null)

        _grid.forEach((row, rIndex) => {
            row.forEach((col, cIndex) => {
                if (col == ship) {
                    _grid[rIndex][cIndex] = null
                }
            })
        })
    }

    //attack methods
    function getAllAttacks() {
        return _attacks
    }

    function strictEqual(array1, array2) {
        return (array1[0] == array2[0] && array1[1] == array2[1])
    }

    function getAttacks(coords) {
        const search = _attacks.find(move => strictEqual(move.coords,coords))
        if (search == undefined) {
            return undefined
        } else {return search.outcome}

    }

    function receiveAttack(coords) {
        const position = getCoords(coords)

        if (position == null) {
            _attacks.push({"coords": coords, "outcome": "m"})
        }
        else {
            _attacks.push({"coords": coords, "outcome": "h"})
            position.addHit()
        }

    }

    function allSunk() {
        return _ships.every(element => element.isSunk() == true)
    }

    function randomPlaceAll() {

    }

    

    function tempSetPlace() {
        placeRight("cruiser",[3,0])
        placeUp("carrier",[3,2])
        placeUp("battleship",[5,2])
        placeUp("submarine",[5,7])
        placeUp("destroyer", [3,8])
    }

    return {
        getGrid,
        placeRight,
        placeLeft,
        placeDown,
        placeUp,
        getCoords,
        where,
        remove,
        getAllAttacks,
        getAttacks,
        receiveAttack,
        allSunk,
        getShip,
        tempSetPlace,
        getAllShips,
        checkRotate,
        rotate,
        resetAll,
    }
}

// unused functions
function placeLeft(name, coords) {
    const ship = getShip(name)
    if (ship == undefined) throw new Error("Name Error: Ship with name provided does NOT exist")

    const [col, row] = [coords[0], coords[1]]

    const shipLength = ship.getLength()
    
    if (col - shipLength < 0) throw new Error("Out of Bounds Error: Co-ordinate is out of bounds")
    
    for (let i = col; i > col-shipLength; i--) {
        if (!checkCoords([i,row])) { 
            _grid[row][i] = ship
        } else {
            throw new Error("Occupied Error: the ship cannot be placed, as that square is already occupied")

        }
    }
}

function placeUp(name, coords) {
    const ship = getShip(name)
    if (ship == undefined) throw new Error("Name Error: Ship with name provided does NOT exist")


    const [col, row] = [coords[0], coords[1]]

    const shipLength = ship.getLength()
    
    if (row + shipLength-1 > 9) throw new Error("Out of Bounds Error: Co-ordinate is out of bounds")
    
    for (let i = row; i < row+shipLength; i++) {
        if (!checkCoords([col,i])) { 
            _grid[i][col] = ship
        } else {
            throw new Error("Occupied Error: the ship cannot be placed, as that square is already occupied")

        }
    }
}