class Tools {
    constructor(){}
    
    static getRandomIndexofArray(arr){
        return Math.floor(Math.random() * (0 + arr.length -1));
    }
    
    static shuffle(array){
        if(array){
            var currentIndex = array.length, temporaryValue, randomIndex ;
            
            // While there remain elements to shuffle...
            while (0 !== currentIndex) {
                
                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                
                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
        }
        
    }
    
    static cloneObject(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }

        var temp = obj.constructor(); // give temp the original obj's constructor
        for (var key in obj) {
            temp[key] = cloneObject(obj[key]);
        }

        return temp;
    }
    
}

export {Tools}