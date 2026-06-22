import { createCoordinatesArray } from "../models/createCoordinatesArray.js"
describe("createCoordinatesArray test", () => {
    test("create coordinates length test", () => {
        const object = createCoordinatesArray()
        expect(object.getLength()).toBe(100)
    })
    test("first, second and third elements not sequential", () => {
        const object = createCoordinatesArray()
        expect(object.getIndex(0) != [0,0] &&
               object.getIndex(1) != [0,1] &&
               object.getIndex(2) != [0,2]).toBeTruthy()
    })
    test("shifting element", () => {
        const object = createCoordinatesArray()
        const item = object.getItem()
        expect(object.getLength()).toBe(99)
        expect(object.getArray().some(element => {
            element[0] == item[0] && element[1] == item[1]
        })).toBe(false)
    })
})