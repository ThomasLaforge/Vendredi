import { Deck }         from './Deck';
import { Card }         from './Card';
import { PlayableCard }         from './PlayableCard';
import { Fight }        from './Fight';
import { FightDeck }    from './FightDeck';
import { DangerFight }  from './DangerFight';
import { PirateFight }  from './PirateFight';
import { FightCard }    from './FightCard';
import { DangerDeck }   from './DangerDeck';
import { DangerCard }   from './DangerCard';
import { AgingDeck }    from './AgingDeck';
import { AgingCard }    from './AgingCard';
import { PirateDeck }   from './PirateDeck';
import { PirateCard }   from './PirateCard';
import { Player }        from './Player';
import { GameDifficulty, GameLevel, FightCardPower } from './Vendredi';

class Game {

    private _fightDeck     : FightDeck;
    private _dangerDeck    : DangerDeck;
    private _agingDeck     : AgingDeck;
    private _pirateDeck    : PirateDeck;
    private _gameOver      : boolean;
    private _pirates       : Array<PirateCard>;
    private _actualPirate  : PirateCard;
    private _level         : number;
    private _arrayOfRemovedCards  : Array<PlayableCard|DangerCard>;
    private _fight         : Fight;
    private _dangerChoiceCards : Array<DangerCard>;

	constructor( private _player : Player, private _difficulty = GameDifficulty.EASY ){
        this.player        = _player;
        this.difficulty    = _difficulty;

        // Si la difficulté est de 4 alors la partie commence avec 18 PV au lieu de 20 => on perd 2 PV
        if(this.difficulty === 4){
            this.player.losePV(2);
        }

        this.fightDeck     = new FightDeck();
        this.dangerDeck    = new DangerDeck();
        this.agingDeck     = new AgingDeck( this.difficulty );
        if(this.difficulty > 1){
            this.fightDeck.addCard(this.agingDeck.drawCards(1));
        }

        this.pirateDeck    = new PirateDeck();
        this.pirates       = this.pirateDeck.getPirates( 2 );
        this.actualPirate = this.pirates[0];

        this.level         = GameLevel.FirstRound;
        this.arrayOfRemovedCards  = [];
        this.drawDangerCard();
        this.fight         = null;
        this.gameOver      = false;
	}

    loseOnePV(){
        this.player.losePV(1);
    }

	isGameOver(){
        return this.gameOver || this.player.isDead();
    }

    drawFightCard(){
        if ( this.fight.getNumberOfCards() >= this.fight.cardToFight.freeCards ){
            this.loseOnePV();
            console.log('lose One PV', this.player.PV)
        }
        if ( this.fightDeck.isEmpty() ){
            // On ajoute une carte vieillissement dans la défausse
            let newAgingCard = this.agingDeck.drawCards( 1 );
            this.fightDeck.addToDiscard( newAgingCard );
            // On ajoute la défausse au deck et on mélange
            this.fightDeck.discardToDeck();
        }

        return this.fightDeck.drawOneCard();
    }

    drawDangerCard(){
        let arr:Array<DangerCard> = []; //Tableau de cartes danger à renvoyer. Vide si fin de l'entrainement.

        if ( this.dangerDeck.isEmpty() ){
            // on monte le niveau d'un cran
            this.level++;
            // on mélange la défausse de carte danger qui devient la pioche
            this.dangerDeck.discardToDeck();
        }
        
        if(this.level < 4){
            // On pioche deux cartes
            arr = ( this.dangerDeck.drawCards( 2 ) );
        }
        

        this.dangerChoiceCards = arr;
    }

    startFight( card:DangerCard|PirateCard ){
        if(card instanceof DangerCard){
            this.fight = new DangerFight( card, this.level );
        }
        else if(card instanceof PirateCard){
            this.fight = new PirateFight( card );
        }
        else{
            throw new Error("Type of card to fight is not PirateCard or Danger !");
        }
        // Each fight start with one card played
        this.addCardToFight();
    }

    addCardToFight(){
        let fightCard = this.drawFightCard();
        this.fight.addFightCard( fightCard );
    }

    stopFight(){
        this.fight.finish();
        let result = this.fight.getResult();
        if( result >= 0 ) {
            this.endFightWon();
        }
        else{
            this.player.losePV(Math.abs(result));
        }
    }

    endFightWon(){
        if(this.fight instanceof DangerFight ){
            console.log('Game : danger fight won');
            this.fight.arrayFightCard.push( this.fight.cardToFight.fightCard );
            let arrayOfCardsToDiscard = this.fight.arrayFightCard.slice();
            this.fightDeck.addToDiscard( arrayOfCardsToDiscard );
        }

        this.resetFight();
        this.drawDangerCard();
    }

    endFightLost( cardsToDelete : Array<DangerCard|FightCard|AgingCard> ){
        if(this.fight instanceof DangerFight){        
            // Delete cards from game
            this.discard( cardsToDelete );
            //remove this card from fight.arrayFightCard
            //this.fight.arrayFightCard

            // put back cards of fight in differents decks
            // danger card
            this.dangerDeck.discard( [ this.fight.cardToFight ] );
            // fight cards
            this.fightDeck.discard( this.fight.getAllFightCards() );
            this.resetFight();
        }
        else{
            this.gameOver = true;
        }
    }

    resetFight() : void {
        this.fight = null;
    }

    discard( arrayOfCards : Array<PlayableCard> ) : void{
        this.arrayOfRemovedCards.concat( arrayOfCards );
    }

    usePower( selectedCard : DangerCard|FightCard): void {
        let card : FightCard|DangerCard;
        card = selectedCard instanceof DangerCard ? selectedCard.fightCard : selectedCard;

        if ( card.power ) {
            switch( card.power ) {
                case FightCardPower.GetTwoPV:
                    this.player.addPV( 2 );
                    break;
                case FightCardPower.GetOnePV:
                    this.player.addPV( 1 );
                    break;
                case FightCardPower.GetOneCard:
                    this.addCardToFight();
                    break;
                case FightCardPower.GetTwoCard:
                    this.addCardToFight();
                    break;
                default:
                    console.log("use power not coded for the moment");
                    break;
            }
            this.fight.useCard(card);
        }
    }

    get player(){
        return this._player;
    }
    set player(newPlayer){
        this._player = newPlayer;
    }
    get difficulty(){
        return this._difficulty;
    }
    set difficulty(newDifficulty){
        this._difficulty = newDifficulty;
    }
    get fightDeck() {
        return this._fightDeck;
    }
    set fightDeck(newfightDeck){
        this._fightDeck = newfightDeck;   
    }
    get dangerDeck() {
        return this._dangerDeck;
    }
    set dangerDeck(newdangerDeck){
        this._dangerDeck = newdangerDeck;
    }
    get agingDeck() {
        return this._agingDeck;
    }
    set agingDeck(newagingDeck){
        this._agingDeck = newagingDeck;   
    }
    get pirateDeck() {
        return this._pirateDeck;
    }
    set pirateDeck(newpirateDeck){
        this._pirateDeck = newpirateDeck;
    }
    get gameOver() {
        return this._gameOver;
    }
    set gameOver(newgameOver){
        this._gameOver = newgameOver;
    }
    get pirates() {
        return this._pirates;
    }
    set pirates(newpirates){
        this._pirates = newpirates;
    }
    get actualPirate() {
        return this._actualPirate;
    }
    set actualPirate(newactualPirate){
        this._actualPirate = newactualPirate;   
    }
    get level() {
        return this._level;
    }
    set level(newlevel){
        this._level = newlevel;
    }
    get arrayOfRemovedCards() {
        return this._arrayOfRemovedCards;
    }
    set arrayOfRemovedCards(newarrayOfRemovedCards){
        this._arrayOfRemovedCards = newarrayOfRemovedCards;   
    }
    get fight() {
        return this._fight;
    }
    set fight(newfight){
        this._fight = newfight;
    }
    get dangerChoiceCards(){
        return this._dangerChoiceCards;
    }
    set dangerChoiceCards(newdangerChoiceCards){
        this._dangerChoiceCards = newdangerChoiceCards;
    }

}

export { Game }
