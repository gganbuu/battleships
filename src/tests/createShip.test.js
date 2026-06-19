import { createShip } from '../models/createShip'

describe("createShip test cases", () => {
    test("getLength method", () => {
        const battleShip = createShip("ship", 3)
        expect(battleShip.getLength()).toBe(3)
    })

    test("getHit method", () => {
        const battleship = createShip("ship", 3)
        expect(battleship.getHit()).toBe(0)
    })

    test("addHit method", () => {
        const battleship = createShip("ship",3)
        battleship.addHit()
        expect(battleship.getHit()).toBe(1)
    })

    test("isSunk method (false)", () => {
        const battleShip = createShip("ship",3)
        battleShip.addHit(2)
        expect(battleShip.isSunk()).toBe(false)
    })

    test("isSunk method (true)", () => {
        const battleShip = createShip("ship",3)
        battleShip.addHit(3)
        expect(battleShip.isSunk()).toBe(true)
    })




})