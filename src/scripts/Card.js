class Card {
    constructor(obj) {
        this._name      = obj.name;
        this._strenght  = obj.strenght;
    }
    
    show(){
        console.log('Card : name => ' + this.name + ', strenght => ' + this. strenght);
    }
    
    get name(){
        return this._name;
    }
    set name(newName){
        this._name = newName;
    }
    
    get strenght(){
        return this._strenght;
    }
    set strenght(newStrenght){
        this._strenght = newStrenght;
    }
}
 
export { Card };