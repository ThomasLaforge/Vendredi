import {DEFAULT_USER_PSEUDO} from './Configuration'

class User {

    private _pseudo:string;
    private _password:string;
    private _createDate:number;    

    constructor(pseudo = DEFAULT_USER_PSEUDO, pass = '', date?:number){
        this.pseudo     = pseudo;
        this.password   = pass;
        this.createDate = pseudo && date ? date : null;
    }

    get password(): string {
		return this._password;
	}
    set password(value: string) {
		this._password = value;
	}
    get createDate(): number {
		return this._createDate;
	}
    set createDate(value: number) {
		this._createDate = value;
	}
    get pseudo(): string {
		return this._pseudo;
	}
    set pseudo(value: string) {
		this._pseudo = value;
	}
    
}

export {User}