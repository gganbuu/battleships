export const createShip = (length, name = "ship") => {
    const _name = name
    let _length = length
    let _hit = 0
    let _sunk = false

    let _anchorCoord = null;
    let _orientation = null; 
    
    
    // name methods
    function getName() {
        return _name
    }

    // length methods
    function getLength() {
        return _length
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

    // anchor methods
    function getAnchor() {
        return _anchorCoord 
    }

    function setAnchor(newAnchorCoord) {
        _anchorCoord = newAnchorCoord
    }


    // orientation methods
    function getOrientation() {
        return _orientation
    }

    function setOrientation(newOrientation) {
        _orientation = newOrientation
    }

    return {
        getLength,
        getName,
        isSunk,
        getHit,
        addHit,
        getAnchor,
        setAnchor,
        getOrientation,
        setOrientation
    }
}