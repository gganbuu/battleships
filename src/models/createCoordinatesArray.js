export const createCoordinatesArray = () => {
    const _array = createCoordinates()

    function getLength() {
        return _array.length
    }

    function getItem() {
        return _array.shift()
    }

    function getIndex(index) {
        return _array[index]
    }

    function getArray() {
        return _array
    }
    function createCoordinates() {
        const array = []

        //create the array 
        for (let i = 0; i <= 9; i++) {
            for (let j = 0; j <= 9; j++) {
                array.push([i,j])
            }
        }

        //return shuffle the array
        return shuffle(array)
    }

    function shuffle(array) {
        const shuffled = [...array]; 
  
        for (let i = shuffled.length - 1; i > 0; i--) {
            // Pick a random index from 0 to i
            const j = Math.floor(Math.random() * (i + 1));
            
            // Swap elements shuffled[i] and shuffled[j]
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        return shuffled;
    }



    
    return {
        getLength,
        getIndex,
        getArray,
        getItem
    }
}