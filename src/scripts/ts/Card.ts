class Card {
    private name;
    protected strength;
    protected costToDelete;

    constructor(obj) {
        this.name      = obj.name;
        this.strength  = obj.strength;
        this.costToDelete = 1;
    }

    show(){
        console.log('Card : name => ' + this.name + ', strength => ' + this. strength);
    }

    draw(nodeDOM){
    }

    getStrength(){
        return this.strength;
    }

    getCostToDelete(){
        return this.costToDelete();
    }
}

export { Card };
