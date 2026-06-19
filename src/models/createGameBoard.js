import { createShip } from "./createShip"

export const createGameBoard = (rows = 10, cols = 10) => {
    let _grid = createGrid(rows, cols)
    const _ships = createAllShips()
    const _attacks = []
    
    function createAllShips() {
        return array = [
            createShip(5,"carrier"),
            createShip(4, "battleship"),
            createShip(3, "cruiser"),
            createShip(2, "destroyer"),
        ]
    }

    function getShip(name) {
        return _ships.find(element => element.getName() == name)
        
    }

    function createGrid(rows, cols) {
        return Array.from({length: rows}, () => Array(cols).fill(null))
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
        
        if (col + shipLength-1 > 9) throw new Error("Out of Bounds Error: Co-ordinate is out of bounds")
        
        for (let i = col; i < col+shipLength; i++) {
            if (!checkCoords([i,row])) { 
                _grid[row][i] = ship
            } else {
                throw new Error("Occupied Error: the ship cannot be placed, as that square is already occupied")

            }
        }
    }

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

    function placeDown(name, coords) {
        const ship = getShip(name)
        if (ship == undefined) throw new Error("Name Error: Ship with name provided does NOT exist")

        const [col, row] = [coords[0], coords[1]]

        const shipLength = ship.getLength()
        
        if (row - shipLength < 0) throw new Error("Out of Bounds Error: Co-ordinate is out of bounds")
        
        for (let i = row; i > row-shipLength; i--) {
            if (!checkCoords([col,i])) { 
                _grid[i][col] = ship
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


    // check  + get coords methods
    function checkCoords(coords) {
        const [col, row] = [coords[0], coords[1]]

        if (_grid[row][col] == null ) return false
        
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


    //where method --> takes name of ship
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
        return (array1[0] == array2[0] && array[1] == array[1])
    }

    function getAttacks(coords) {
        return _attacks.find(move => strictEqual(move.coords,coords))
                       .outcome
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
    }
}