import {observable} from 'mobx'

import {Game} from './Game'

export class UIStore {
    public btndisabled: boolean;
    
    constructor(){
        this.btndisabled = true;
    }
}

export class Store {

    @observable private _uiStore: UIStore;
    @observable private _gameStore: Game;

    constructor(){
        this.gameStore = new Game()
        this.uiStore = new UIStore()
    }

	public get uiStore(): UIStore {
		return this._uiStore;
	}
	public set uiStore(value: UIStore) {
		this._uiStore = value;
	}
	public get gameStore(): Game {
		return this._gameStore;
	}
	public set gameStore(value: Game) {
		this._gameStore = value;
	}
    

}