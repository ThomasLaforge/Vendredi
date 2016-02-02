import {Deck} from "./Deck";
import {Tools} from "./Tools";
const PIRATESLIST = require('../datas/pirates_cards.json');

class PirateDeck extends Deck{
    constructor(){
        super();
        console.log('new pirate deck!');
    }
    
    getPirates(nb){
        if(nb > 0){
            let list = PIRATESLIST;
            let arr = [];
            
            if(nb > list.length){
                arr = list;
            }
            else{
                let indexes = [];
                let randomIndex;
                
                while (arr.length < nb) {
                    randomIndex = Tools.getRandomIndexOfArray(list);
                    
                    while(indexes.indexOf(randomIndex) != -1){
                        randomIndex = Tools.getRandomIndexOfArray(list);
                    }
                    
                    indexes.push(randomIndex);
                    arr.push(list[randomIndex]);
                }
            }
            
            return arr;
        }
        else{
            return [];
        }
    }
    
}

export {PirateDeck};