class Card {
    constructor(name, strenght) {
        this._name = name;
        this._strenght = strenght;
    }
    
    get name(){
        return this._name;
    }
    
    set name(newName){
        this._name = newName;
    }
}
 
export { Card };