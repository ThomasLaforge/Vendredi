import {Game} from './Game'
import {SaveSlot} from './SaveSlot'
import {User} from './User'

class GameSaveManager {

    /**
     * localStorage : Not safe cause user can check and modify. But sufficient for the moment
     * 
     * Keys : user's pseudo
     * Values : array of SaveSlot with all SaveState
     *  
     */

    private _user:User;
    private _game:Game;
    private _currentSaveSlot:SaveSlot;

    constructor(user?:User, currentSaveSlot?:SaveSlot ){
        this.user = user ? user : new User();

        if(currentSaveSlot){
            this.currentSaveSlot = currentSaveSlot;
            this.game = this.currentSaveSlot.currentState.buildGame();
        }
        else{
            this.newGame();
        }
    }

    newGame():boolean{
        let created:false;

        return created;
    }

    getAllUsers(){
        let res: Array<string> = []
        
        for(let i = 0; i < localStorage.length;i++){
            res.push(localStorage.key(i));
        }

        return res
    }
    

    get currentSaveSlot(){
        return this.currentSaveSlot
    }
    set currentSaveSlot(newCurrentSaveSlot:SaveSlot){
        this._currentSaveSlot = newCurrentSaveSlot
    }
    get game(){
        return this._game;
    }
    set game(newgame){
        this._game = newgame;
    }
    get user(): User {
		return this._user;
	}

	set user(value: User) {
		this._user = value;
	}
}

export { GameSaveManager }