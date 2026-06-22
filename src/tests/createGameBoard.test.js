import { create } from "lodash";
import { createGameBoard } from "../models/createGameBoard.js";
import { createShip } from "../models/createShip.js"


describe("getCoords method tests", () => {
    test("return ship from getCoords", () => {
        const gameboard = createGameBoard()
        gameboard.placeRight("cruiser", [1,3])
        expect(gameboard.getCoords([1,3])).toBe(gameboard.getShip("cruiser"))
        expect(gameboard.getCoords([2,3])).toBe(gameboard.getShip("cruiser"))
        expect(gameboard.getCoords([3,3])).toBe(gameboard.getShip("cruiser"))
    })
})

describe("placeRight method (left to right)", () => {
    test("Place length 3 ship right from point [1,3]", () => {
        const gameboard = createGameBoard()
        gameboard.placeRight("cruiser", [1,3])
        expect(gameboard.where("cruiser")).toStrictEqual([[1,3],[2,3],[3,3]])
    })
    test("Place length 5 ship right from point [4,7]", () => {
        const gameboard = createGameBoard()
        const ship = createShip(5)
        gameboard.placeRight("carrier", [4,7])
        expect(gameboard.where("carrier")).toStrictEqual([[4,7],[5,7],[6,7],[7,7],[8,7]])
    })
    test("Place length 5 ship right from point [6,7] (Error)", () => {
        const gameboard = createGameBoard()
        expect(() => {gameboard.placeRight("carrier", [6,7])}).toThrow("Out of Bounds Error: Co-ordinate is out of bounds")
    })

    test("Place length 2 ship right from point [8,0]", () => {
        const gameboard = createGameBoard()
        gameboard.placeRight("destroyer", [8,0])
        expect(gameboard.where("destroyer")).toStrictEqual([[8,0],[9,0]])
    })

    test("Place length 2 ship right from point [9,0] (Error)", () => {
        const gameboard = createGameBoard()
        expect(() => {gameboard.placeRight("cruiser", [9,0])}).toThrow("Out of Bounds Error: Co-ordinate is out of bounds")
    })

    test("Place two ships on same point [0,0] (error)", () => {
        const gameboard = createGameBoard()
        gameboard.placeRight("cruiser", [0,0])
        expect(() => {gameboard.placeRight("battleship", [0,0])}).toThrow(`Occupied Error: the ship cannot be placed, as that square is already occupied`)
    })
})


describe("placeLeft method (Right to Left)", () => {
    test("Place length 3 ship left from point [1,1] (Error)", () => {
        const gameboard = createGameBoard()
        expect(() => {gameboard.placeLeft("cruiser", [1,1])}).toThrow("Out of Bounds Error: Co-ordinate is out of bounds")
    })
    test("Place length 3 ship left from point [3,1]", () => {
        const gameboard = createGameBoard()
        gameboard.placeLeft("cruiser", [3,1])
        expect(gameboard.where("cruiser")).toStrictEqual([[1,1],[2,1],[3,1]])
    })
    test("Place length 5 ship left from point [5,6]", () => {
        const gameboard = createGameBoard()
        gameboard.placeLeft("carrier", [5,6])
        expect(gameboard.where("carrier")).toStrictEqual([[1,6],[2,6],[3,6],[4,6],[5,6],])
    })

    test("Place two ships on overlapping tiles", () => {
        const gameboard = createGameBoard()
        gameboard.placeLeft("cruiser", [3,1])
        expect(() => {gameboard.placeLeft("destroyer", [2,1])}).toThrow(Error)
    
    })
})


describe("placeDown method (Top to Bottom)", () => {
    test("Place length 3 ship downwards from point [2,3]", () => {
        const gameboard = createGameBoard()
        gameboard.placeDown("cruiser", [2,3])
        expect(gameboard.where("cruiser")).toStrictEqual([[2,1],[2,2],[2,3]])
    })
    test("Place length 3 ship downwards from point [2,2] (Error)", () => {
        const gameboard = createGameBoard()
        expect(()=>{gameboard.placeDown("cruiser", [2,2])}).toThrow("Out of Bounds Error: Co-ordinate is out of bounds")  
    })
    test("Place length 5 ship downwards from point [7,7]", () => {
        const gameboard = createGameBoard()
        gameboard.placeDown("carrier", [7,7])
        expect(gameboard.where("carrier")).toStrictEqual([[7,3],[7,4],[7,5],[7,6],[7,7]])
    })
    test("Place two ships on overlapping tiles", () => {
        const gameboard = createGameBoard()
        gameboard.placeDown("cruiser", [3,3])
        expect(() => {gameboard.placeLeft("battleship", [4,3])}).toThrow(Error)
    
    })
})

describe("placeUp method (Bottom to Top)", () => {
    test("Place length 3 ship up from point [1,3]", () => {
        const gameboard = createGameBoard()
        gameboard.placeUp("cruiser", [1,3])
        expect(gameboard.where("cruiser")).toStrictEqual([[1,3],[1,4],[1,5]])  
    })
    test("Place length 3 ship up from point [1,9] (Error)", () => {
        const gameboard = createGameBoard()
        expect(()=>{gameboard.placeUp("cruiser", [1, 9])}).toThrow(Error)
    })
    test("Place length 3 ship up from point [1,7]", () => {
        const gameboard = createGameBoard()
        gameboard.placeUp("cruiser", [1,7])
        expect(gameboard.where("cruiser")).toStrictEqual([[1,7],[1,8],[1,9]])  
    })
    test("Place two ships on overlapping tiles", () => {
        const gameboard = createGameBoard()
        const ship1 = "cruiser"
        const ship2 = "carrier"
        gameboard.placeRight(ship1, [1,2])
        expect(()=>{gameboard.placeUp(ship2, [1,0])}).toThrow(Error)
    })
})

describe("remove ship method", () => {
    test("removing ship from gameboard", () => {
        const gameboard = createGameBoard()
        const ship = "cruiser"
        gameboard.placeRight(ship, [3,3])
        gameboard.remove(ship)
        expect(gameboard.where(ship)).toBe(false)
    })
    test("removing ship from gameboard (with other ships remaining)", () => {
        const gameboard = createGameBoard()
        const ship1 = "cruiser"
        const ship2 = "carrier"
        gameboard.placeRight(ship1, [3,3])
        gameboard.placeRight(ship2, [3,4])
        gameboard.remove(ship1)
        expect(gameboard.where(ship1)).toBe(false)
    })
})

describe("getAttacks method", () => {
    test("getAttack on coords that have not been attacked", () => {
        const gameboard = createGameBoard()
        const ship = "cruiser"
        gameboard.placeRight(ship, [3,3])
        gameboard.receiveAttack([3,4])

        expect(gameboard.getAttacks([3,3])).toBe(undefined)
        expect(gameboard.getAttacks([3,4])).toBe("m")
    })

    test("getAttack on coords that have not been attacked", () => {
        const gameboard = createGameBoard()
        const ship = "cruiser"
        gameboard.placeRight(ship, [3,3])
        gameboard.receiveAttack([3,3])

        expect(gameboard.getAttacks([3,3])).toBe("h")
        expect(gameboard.getAttacks([3,4])).toBe(undefined)
    })

})

describe("receive attack method", () => { 
    test("receive attack on ship", () => {
        const gameboard = createGameBoard()
        const ship = "cruiser"
        gameboard.placeRight(ship, [3,3])
        gameboard.receiveAttack([3,3])

        expect(gameboard.getShip(ship).getHit()).toBe(1)
        expect(gameboard.getAttacks([3,3])).toBe("h")
        expect(gameboard.getShip(ship).isSunk()).toBe(false)
    })

    test("receive attack on NO ship", () => {
        const gameboard = createGameBoard()
        const ship = "cruiser"
        gameboard.placeRight(ship, [3,3])
        gameboard.receiveAttack([3,4])

        expect(gameboard.getAttacks([3,4])).toBe("m")
        expect(gameboard.getShip(ship).isSunk()).toBe(false)
    })

    test("multiple attacks on a ship", () => {
        const gameboard = createGameBoard()
        const ship = "cruiser"
        gameboard.placeRight(ship, [3,3])
        gameboard.receiveAttack([3,3])
        gameboard.receiveAttack([4,3])

        expect(gameboard.getAttacks([3,3])).toBe("h")
        expect(gameboard.getAttacks([4,3])).toBe("h")
        expect(gameboard.getShip(ship).isSunk()).toBe(false)
    })

    test("multiple attacks sinking a ship", () => {
        const gameboard = createGameBoard()
        const ship = "cruiser"
        gameboard.placeRight(ship, [3,3])
        gameboard.receiveAttack([3,3])
        gameboard.receiveAttack([4,3])
        gameboard.receiveAttack([5,3])

        expect(gameboard.getAttacks([3,3])).toBe("h")
        expect(gameboard.getAttacks([4,3])).toBe("h")
        expect(gameboard.getAttacks([5,3])).toBe("h")
        expect(gameboard.getShip(ship).getHit()).toBe(3)
        expect(gameboard.getShip(ship).isSunk()).toBe(true)
    })

    test("attacks on multiple ships", () => {
        const gameboard = createGameBoard()
        const ship1 = "cruiser"
        gameboard.placeRight(ship1, [3,3])
        gameboard.receiveAttack([3,3])
        gameboard.receiveAttack([4,3])

        const ship2 = "carrier"
        gameboard.placeUp(ship2, [8,0])
        gameboard.receiveAttack([8,1])
        gameboard.receiveAttack([8,2])

        
        expect(gameboard.getShip(ship1).getHit()).toBe(2)
        expect(gameboard.getShip(ship2).getHit()).toBe(2)
        expect(gameboard.getShip(ship1).isSunk()).toBe(false)
        expect(gameboard.getShip(ship2).isSunk()).toBe(false)
        
    })
})

describe("allSunk method + private ships list", () => {
    test("calling allSunk after creating gameboard (false)", () => {
        const gameboard = createGameBoard()
        expect(gameboard.allSunk()).toBe(false)
    })
    
    test("calling allSunk when ship has been damaged", () => {
       const gameboard = createGameBoard()
       gameboard.getShip("carrier").addHit(5)
       expect(gameboard.allSunk()).toBe(false)
    })

    test("calling allSunk when all ships damaged to sunk threshhold", () => {
        const gameboard = createGameBoard()
        gameboard.getShip("carrier").addHit(5)
        gameboard.getShip("destroyer").addHit(2)
        gameboard.getShip("cruiser").addHit(3)
        gameboard.getShip("battleship").addHit(4)
        gameboard.getShip("submarine").addHit(3)

        expect(gameboard.allSunk()).toBe(true)
        
    })

})