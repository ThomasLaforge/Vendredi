import {observable} from 'mobx'

import { FightCard } from './FightCard';
import { Tools } from './Tools';
import { PlayableCard } from './PlayableCard';
import { DangerCardInterface, FightCardInterface, GameLevel } from './Vendredi';

// Notes:
//  A partir du nombre de cartes à piocher, il est possible de connaitre la force nécessaire pour chaque niveau:
//  - freeCards == 1 : lvl1 => 0, lvl2 => 1, lvl3 => 3
//  - freeCards == 2 : lvl1 => 1, lvl2 => 3, lvl3 => 6
//  - freeCards == 3 : lvl1 => 2, lvl2 => 5, lvl3 => 8
//  - freeCards == 4 : lvl1 => 4, lvl2 => 7, lvl3 => 11
//  - freeCards == 5 : lvl1 => 5, lvl2 => 9, lvl3 => 14

class DangerCard implements DangerCardInterface {

    @observable private readonly _fightCard: FightCard; 
    @observable private readonly _name: string;
    @observable private readonly _freeCards: number;

    constructor(fightCard: FightCard, name: string, freeCards: number) {
        this._fightCard = fightCard
        this._name = name
        this._freeCards = freeCards
    }

    getStrength(lvl: GameLevel) {
        switch (lvl) {
            case GameLevel.FIRST_ROUND:
                switch (this.freeCards) {
                    case 1: return 0;
                    case 2: return 1;
                    case 3: return 2;
                    case 4: return 4;
                    case 5: return 5;
                    default: throw new Error(this.constructor.name + ' => getStrength(FIRST_ROUND) with freeCards > 5 or < 1');
                }

            case GameLevel.SECONDE_ROUND:
                switch (this.freeCards) {
                    case 1: return 1;
                    case 2: return 3;
                    case 3: return 5;
                    case 4: return 7;
                    case 5: return 9;
                    default: throw new Error(this.constructor.name + ' => getStrength(SECONDE_ROUND) with freeCards > 5 or < 1');
                }


            case GameLevel.THIRD_ROUND:
                switch (this.freeCards) {
                    case 1: return 3;
                    case 2: return 6;
                    case 3: return 8;
                    case 4: return 11;
                    case 5: return 14;
                    default: throw new Error(this.constructor.name + ' => getStrength(THIRD_ROUND) with freeCards ' + (this.freeCards > 5 ? '> 5' : '< 1') );

                }
            default: throw new Error(this.constructor.name + ' => getStrength(NOT_VALID_ROUND) level=' + lvl);
        }
    }

    get powerName(){
        return this.fightCard.powerName;
    }

	public get fightCard(): FightCard {
		return this._fightCard;
	}
	public get name(): string {
		return this._name;
	}
	public get freeCards(): number {
		return this._freeCards;
	}


}

export { DangerCard }
