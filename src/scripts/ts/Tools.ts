import {Card} from './Card';

class Tools {
    constructor(){}
    
    static getRandomIndexofArray(arr:Array<any>){
        return Math.floor(Math.random() * (0 + arr.length -1));
    }
    
    static shuffle(array : Array<Card>){
        if(array){
            var currentIndex = array.length, temporaryValue:Card, randomIndex:number ;
            
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
    
    static cloneObject(obj:Object) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }

        var temp = obj.constructor(); // give temp the original obj's constructor
        for (var key in obj) {
            temp[key] = Tools.cloneObject(obj[key]);
        }

        return temp;
    }
    
}

export {Tools}