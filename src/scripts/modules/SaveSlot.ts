import { Game } from './Game'
import { State } from './State'

class SaveSlot {

    private _stateList: Array<State>
    private _startDate: number
    private _lastAction: number
    private _currentState: State

    constructor(stateList:Array<State> = [], startDate = Date.now(), lastAction = Date.now(), currentState:State = null ){
        this.stateList = stateList;
        this.orderStateListByDate();
        this.startDate = startDate;
        this.lastAction = lastAction;
        if(!currentState){
            if(stateList.length > 0){
                this.currentState = this.stateList[ this.stateList.length - 1 ]
            }
        }
    }

    undo() : Game {
        
    }
    redo() : Game {
        return ;
    }

    orderStateListByDate(){
        let newList: Array<State>;
        this.stateList = newList;
    }

    get stateList(){
        return this._stateList;
    }
    set stateList(newStateList){
        this.stateList = newStateList;
    }
    get startDate(){
        return this._startDate;
    }
    set startDate(newstartDate){
        this.startDate = newstartDate;
    }
    get lastAction(){
        return this._lastAction;
    }
    set lastAction(newlastAction){
        this.lastAction = newlastAction;
    }
    get currentState(){
        return this._currentState;
    }
    set currentState(newcurrentState){
        this.currentState = newcurrentState;
    }
}

export {SaveSlot}