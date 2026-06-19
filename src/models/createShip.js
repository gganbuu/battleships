export const createShip = (length, name = "ship") => {
    const _name = name
    let _length = length
    let _hit = 0
    let _sunk = false
    
    // length methods
    function getLength() {
        return _length
    }

    // name methods
    function getName() {
        return _name
    }

    // sunk methods
    function isSunk() {
        return _sunk
    }

    function setSunk() {
        _sunk = true
    }

    // hit methods
    function getHit() {
        return _hit
    }

    function addHit(number) {
        _hit += number ?? 1
        if (_hit == _length) setSunk()

    }

    return {
        getLength,
        getName,
        isSunk,
        getHit,
        addHit
    }
}