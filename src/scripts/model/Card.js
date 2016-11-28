class Card {
    constructor(obj) {
        this._name      = obj.name;
        this._strength  = obj.strength;
        this._costToDelete = 1;
    }

    show(){
        console.log('Card : name => ' + this.name + ', strength => ' + this. strength);
    }

    draw(nodeDOM){
    }

    get name(){
        return this._name;
    }
    set name(newName){
        this._name = newName;
    }

    get strength(){
        return this._strength;
    }
    set strength(newStrength){
        this._strength = newStrength;
    }

    get costToDelete(){
        return this._costToDelete;
    }
    set costToDelete( newCostToDelete ){
        this._costToDelete = newCostToDelete;
    }
}

export { Card };
