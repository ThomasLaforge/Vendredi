import {CardInterface} from './Vendredi';

abstract class Card implements CardInterface {

    constructor(public name:string, public strength:number) {}

    abstract show() : void

}

export { Card };
