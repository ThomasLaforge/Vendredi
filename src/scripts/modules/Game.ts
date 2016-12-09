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
import { GameDifficulty, GameLevel, FightCardPower, AgingCardPower, PirateMission } from './Vendredi';

class Game {

    private _fightDeck     : FightDeck;
    private _dangerDeck    : DangerDeck;
    private _agingDeck     : AgingDeck;
    private _pirateDeck    : PirateDeck;
    private _gameOver      : boolean;
    private _pirates       : Array<PirateCard>;
    private _actualPirate  : PirateCard;
    private _level         : number;
    private _arrayOfRemovedCards  : Array<PlayableCard>;
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
        this.pirates       = this.pirateDeck.drawCards( 2 );
        this.actualPirate = this.pirates[0];

        this.level         = GameLevel.FIRST_ROUND;
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

    drawFightCard() : PlayableCard {
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

        let newCardDraw:PlayableCard = this.fightDeck.drawOneCard();
        // check if a power is to use now
        if(newCardDraw instanceof AgingCard){
            switch (newCardDraw.power) {
                case AgingCardPower.LOSE_ONE_PV:
                    this.player.losePV(1);
                case AgingCardPower.LOSE_TWO_PV:
                    this.player.losePV(2);                   
                case AgingCardPower.STOP:
                    this.fight.forceToStop();
                default:
                    newCardDraw.usePower();
            }
            // Vue is already checking if game over
            
        }

        return newCardDraw;
    }

    drawDangerCard(){
        let arr:Array<DangerCard> = [];

        if ( this.dangerDeck.isEmpty() ){
            this.level++;
            // shuffle discard who becomes the deck
            this.dangerDeck.discardToDeck();
        }
        
        if(this.level < 4){
            arr = ( this.dangerDeck.drawCards( 2 ) );
        }

        this.dangerChoiceCards = arr;
        return this.dangerChoiceCards //Optional
    }

    startFight( card:DangerCard|PirateCard ){
        if(card instanceof DangerCard){
            this.fight = new DangerFight( card, this.level );
        }
        else if(card instanceof PirateCard){
            switch (card.mission) {
                case PirateMission.EACH_PAYED_CARD_COST_TWO:
                    this.fight = new PirateFight( card, 2 );
                    break;

                case PirateMission.FIGHT_ALL_DANGER_CARDS:
                    this.fight = new PirateFight( card, null, this.dangerDeck );
                    break;
                    
                case PirateMission.ADD_TWO_DANGER_POINT_BY_AGING_CARD_IN_FIGHT_ADDED_TO_FIGHT_DECK:
                    let arrayOfAgingCardInFightDeck = this.fightDeck.getAllCards().filter( playableCard => {
                        return playableCard instanceof AgingCard
                    });
                    this.fight = new PirateFight( card, null, null, arrayOfAgingCardInFightDeck.length )
                    break;
            
                default:
                    this.fight = new PirateFight( card )
                    break;
            }
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
        this.drawDangerCard();
    }

    endFightWon(){
        if(this.fight instanceof DangerFight ){
            console.log('Game : danger fight won');
            this.fight.arrayFightCard.push( this.fight.cardToFight.fightCard );
            let arrayOfCardsToDiscard = this.fight.arrayFightCard.slice();
            this.fightDeck.addToDiscard( arrayOfCardsToDiscard );
        }

        this.resetFight();
    }

    endFightLost( cardsToDelete : Array<PlayableCard> ){
        if(this.fight instanceof DangerFight){        
            // Delete cards from game
            this.discard( cardsToDelete );

            // put back cards of fight in differents decks
            // danger card
            this.dangerDeck.discard( [ this.fight.cardToFight ] );
            // fight cards
            this.fightDeck.discard( this.fight.getAllFightCards() );
            this.resetFight();
        }
        else{ // = If lost pirate fight => game is over
            this.gameOver = true;
        }
    }

    resetFight() : void {
        this.fight = null;
    }

    discard( arrayOfCards : Array<PlayableCard> ) : void {
        arrayOfCards.forEach( card => {
            this.arrayOfRemovedCards.push( card );
        })
    }

    usePower( card : FightCard): void {
        if ( card.power ) {
            let p:FightCardPower = card.power;
            switch( card.power ) {
                case FightCardPower.GET_TWO_PV:
                    this.player.addPV( 2 );
                    break;
                case FightCardPower.GET_ONE_PV:
                    this.player.addPV( 1 );
                    break;
                case FightCardPower.GET_ONE_CARD:
                    this.fight.addFreeCards(1);
                    break;
                case FightCardPower.GET_TWO_CARDS:
                    this.fight.addFreeCards(2);
                    break;
                default:
                    console.log('game->usePower() : not a oneshot power', p)
                    break;
            }
            this.fight.useCard(card);
        }
        else{
            console.log('game->usePower() : not a card with power attribute', card)
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
