import {observable} from 'mobx'

import { Game } from './Game'
import { State } from './State'
import { StateJson } from './Vendredi'

class SaveSlot {

    /*
    *   StateList / Timeline:
    *
    *   Start       State 1        State2       State 3       Last State/End
    *     |------------|-------------|-------------|-----------------|
    *
    *   History = [ Start , State 1, State 2, State 3, End]
    *   
    *   Undo Redo case. 
    *       if undo redo without new State => No problemo
    *       if undo and add new State => this State become last element => remove State after in Timeline:
    *           Ex : Undo to State 1 and change action => Delete all after State 1
    *   Start       State 1      New State       
    *     |------------|-------------|
    *
    */

    @observable private _stateList: State[]
    @observable private _startDate: number
    @observable private _lastAction: number
    @observable private _currentState: State

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

    orderStateListByDate(){
        let newList: Array<State>;
        this.stateList = newList;
    }

    addState(state : State|StateJson):boolean{
        // Set state as a State object if not already is
        let added = false;
        let newState:State = !(state instanceof State) ? new State(state) : state;
        if(newState !== this.currentState){
            added = true;
            let indexOfCurrentState = this.stateList.indexOf(this.currentState);
            // Remove all states after currentState 
            // NB : if state is equal to last state then it will be removed and add again. 
            //      Not sure about perfs between check if it's copy of last state (then don't add) vs always splice... 
            this.stateList.splice(indexOfCurrentState, this.stateList.length - indexOfCurrentState, newState )
        }

        return added;
    }

    removeState(stateToRemove : State|StateJson|number, removeAllStateAfter = true) : boolean{
        let deleted = false;
        let indexOfStateToRemove:number;
        if(stateToRemove instanceof State){
            indexOfStateToRemove = this.stateList.indexOf(stateToRemove);
        }
        else if(!Number.isNaN(<any>stateToRemove)){
            indexOfStateToRemove = <number>stateToRemove;
        }
        else{
            indexOfStateToRemove = this.stateList.indexOf(new State(stateToRemove));
        }

        if(indexOfStateToRemove !== -1){
            let deleted = true;
            let nbToDelete = removeAllStateAfter ? this.stateList.length - indexOfStateToRemove : 1;
            this.stateList.splice(indexOfStateToRemove, nbToDelete);
        }

        return deleted;
    }

    undo() : Game|null {
        // Check if state can be undo
        let indexOfCurrentState = this.stateList.indexOf(this.currentState);
        if(indexOfCurrentState === -1 || indexOfCurrentState < 1){
            return null;
        }
        let indexOfNewState = indexOfCurrentState - 1;
        this.currentState = this.stateList[ indexOfNewState ]
        // Load game with this new state
        let newState = new State(this.currentState);
        return newState.buildGame();
    }

    redo() : Game|null {
        // Check if state can be redo
        let indexOfCurrentState = this.stateList.indexOf(this.currentState);
        if(indexOfCurrentState === -1 || indexOfCurrentState > (this.stateList.length - 1) - 1 ){
            return null;
        }
        let indexOfNewState = indexOfCurrentState + 1;
        this.currentState = this.stateList[ indexOfNewState ]
        // Load game with this new state
        let newState = new State(this.currentState);
        return newState.buildGame();
    }

    restart(){
        this.currentState = this.initialState();
        this.stateList = [this.currentState];
        this.startDate = Date.now();
        this.lastAction = Date.now();
    }

    initialState(){
        if(this.stateList.length === 0){
            Error('SaveSlot : stateList is empty')
        }
        return this.stateList[0];
    }

    lastState(){
        if(this.stateList.length === 0){
            Error('SaveSlot : stateList is empty')
        }
        return this.stateList[this.stateList.length - 1]
    }

    isFinished():boolean{
        return this.isWon() || this.isLost();
    }
    isWon():boolean{
        return this.lastState().buildGame().isWon()
    }
    isLost():boolean{
        return this.lastState().buildGame().isGameOver()
    }

// Getter/Setters
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
// 
}

export {SaveSlot}