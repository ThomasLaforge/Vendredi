import {CardInterface} from './Vendredi';

abstract class Card implements CardInterface {

    constructor(public name:string, public strength:number) {}

    show() : void {
        console.log(this.constructor.name, this)
    }

}

export { Card };
