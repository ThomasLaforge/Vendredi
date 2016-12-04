import {CardInterface} from './Vendredi';

abstract class Card implements CardInterface {

    constructor(public name:string, public strength:number) {}

    show(){
        console.log('Card : name => ' + this.name + ', strength => ' + this. strength);
    }

    draw(nodeDOM : string){
    }

}

export { Card };
