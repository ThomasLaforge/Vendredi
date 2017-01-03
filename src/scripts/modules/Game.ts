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
import { GameDifficulty, GameLevel, FightCardPower, AgingCardPower, PirateMission, PlayableCardPowerType } from './Vendredi';

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
            this.fightDeck.shuffle();
        }

        this.pirateDeck    = new PirateDeck();
        this.pirates       = this.pirateDeck.drawCards(2);
        this.actualPirate  = null;

        this.level         = GameLevel.FIRST_ROUND;
        this.arrayOfRemovedCards  = [];
        this.drawDangerCard();
        this.fight         = null;
        this.gameOver      = false;
	}

    loseOnePV(){
        this.player.losePV(1);
    }
    losePV(pvToLose : number){
        this.player.losePV(pvToLose);
    }

	isGameOver(){
        return this.gameOver || this.player.isDead();
    }

    drawFightCard(free:boolean = false) : PlayableCard {
        if(!free){
            if ( this.fight.freeCards > 0 ){            
                this.fight.freeCards--;
            }
            else{
                this.losePV(this.fight.costOfCardsNotFree);
            }
        }

        if ( this.fightDeck.isEmpty() ){
            // On ajoute une carte vieillissement dans la défausse
            let newArrayAgingCard = this.agingDeck.drawCards(1);
            this.fightDeck.discard( newArrayAgingCard );
            // On ajoute la défausse au deck et on mélange
            this.fightDeck.discardToDeck();
        }

        return this.fightDeck.drawOneCard();
    }

    drawDangerCard() : void{

        if ( this.dangerDeck.isEmpty() ){
            this.level++;
            // shuffle discard who becomes the deck
            this.dangerDeck.discardToDeck();
        }
        
        if ( this.level <= GameLevel.THIRD_ROUND ){
            this.dangerChoiceCards = this.dangerDeck.drawCards( 2 );
        }
        else {
            this.nextPirate();
        }

    }

    nextPirate() : void {
        this.actualPirate = this.actualPirate ? this.pirates[ this.pirates.indexOf( this.actualPirate ) + 1 ] : this.pirates[0];
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
                    // TODO : set strength and freeCards with all danger cards to fight.
                    let newStrength = 0;
                    let newFreeCards = 0;
                    this.dangerDeck.discardToDeck();
                    this.dangerDeck.getAllCards().forEach( (card : DangerCard) => {
                        newStrength += card.getStrength( GameLevel.THIRD_ROUND );
                        newFreeCards += card.freeCards;
                    });
                    card.strength = newStrength;
                    card.freeCards = newFreeCards;
                    this.fight = new PirateFight( card );
                    break;
                    
                case PirateMission.ADD_TWO_DANGER_POINT_BY_AGING_CARD_IN_FIGHT_ADDED_TO_FIGHT_DECK:
                    let currentAgingDeckLength = this.agingDeck.length();
                    let initialLength = (new AgingDeck(this.difficulty)).length(); 
                    card.strength = ( initialLength - currentAgingDeckLength ) * 2;
                    console.log('ADD_TWO_DANGER_POINT_BY_AGING_CARD_IN_FIGHT_ADDED_TO_FIGHT_DECK', card)
                    this.fight = new PirateFight( card )
                    break;
            
                default:
                    this.fight = new PirateFight( card )
                    break;
            }
        }
        else{
            throw new Error("Type of card to fight is not PirateCard or Danger !");
        }
        
        // Discard other(s) cards of danger choice phase
        if(this.dangerChoiceCards){
            this.dangerDeck.discard(this.dangerChoiceCards.filter(c => c != card))
            this.dangerChoiceCards = null;
        }
        this.addPlayableCardToFight();
    }

    addPlayableCardToFight(free:boolean = false){
        let playableCard = this.drawFightCard(free);
        this.fight.addFightCard( playableCard );
        if(playableCard instanceof AgingCard){
            if(playableCard.power != null){
                switch (playableCard.power) {
                    case AgingCardPower.LOSE_ONE_PV:
                        this.player.losePV(1);
                        break;
                    case AgingCardPower.LOSE_TWO_PV:
                        this.player.losePV(2);                   
                        break;
                }

                this.fight.useCard(playableCard)
            }
        }
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
            this.fightDeck.discard( this.fight.getAllCardsToDiscard() );
        }

        this.resetFight();
    }

    // TODO : Check if it works well...
    endFightLost( cardsToDelete : Array<PlayableCard> ){
        if(this.fight instanceof DangerFight){        
            // Delete cards from game
            this.discard( cardsToDelete );

            // put back cards of fight in differents decks
            // danger card
            this.dangerDeck.discard( [ this.fight.cardToFight ] );
            // fight cards
            this.fightDeck.discard( this.fight.getAllCardsToDiscard() );
            this.resetFight();
        }
        else { // = If lost pirate fight => game is over
            this.gameOver = true;
        }
    }

    resetFight() : void {
        this.fight = null;
        if(this.level > GameLevel.THIRD_ROUND){
            this.startFight(this.actualPirate)
        }
    }

    discard( arrayOfCards : Array<PlayableCard> ) : void {
        arrayOfCards.forEach( card => {
            this.arrayOfRemovedCards.push( card.initialState );
        })
    }

    discardFightCard(arrayOfPlayableCards: Array<PlayableCard>){
        this.fight.discard(arrayOfPlayableCards);
        this.fightDeck.discard(arrayOfPlayableCards);
    }

    usePower( card : FightCard, assignedCards:Array<PlayableCard>): void {
        console.log('game:usePower', card, assignedCards)
        let usePower:boolean = true;

        if ( card.power ) {
            // Two Step powers => care if power is changed. When card will be discard, the initial card must be discard and not the transformed card.
            if(assignedCards.length > 0){
                switch( card.power ) {
                    case FightCardPower.COPY_ONE:
                        usePower = false;                        
                        if(assignedCards.length === 1 && assignedCards[0] instanceof FightCard){
                            let cardToCopy = <FightCard>assignedCards[0];
                            card.changePower( cardToCopy.power );
                            card.strength = cardToCopy.strength;
                        }
                        break;
                    case FightCardPower.DESTROY:
                        // Transform this card into a 0 strength cards without any power
                        if(assignedCards.length === 1){
                            assignedCards[0].destroy()
                        }
                        else{
                            usePower = false;
                        }
                        break;
                    case FightCardPower.SORT_THREE_CARDS:
                        // To fix: not addCard method and care about cardsInOrder + 3 first cards have been removed.
                        if(assignedCards.length === 3){
                            this.fightDeck.addCardOnTop(assignedCards);                            
                        }
                        else{
                            usePower = false;
                        }
                        break;
                    case FightCardPower.UNDER_THE_DECK:
                        if(assignedCards.length === 1){
                            this.fightDeck.addCardsToTheEnd(assignedCards)
                            this.discardFightCard(assignedCards);                            
                        }
                        else{
                            usePower = false;
                        }
                        break;
                    case FightCardPower.SWAP_ONE:
                        if(assignedCards.length === 1){
                            this.discardFightCard(assignedCards);
                            this.addPlayableCardToFight(true);
                        }
                        else{
                            usePower = false;
                        }
                        break;
                    case FightCardPower.SWAP_TWO:
                        // When = false swap two cards, u can swap one then chose to swap one another time or not => so swap one, then change power to swap one
                        if(assignedCards.length <= 2){
                            this.discardFightCard(assignedCards);
                            
                            this.addPlayableCardToFight(true);
                            if(assignedCards.length > 1){
                                this.addPlayableCardToFight(true);                        
                            }
                            else{
                                card.changePower( FightCardPower.SWAP_ONE );
                            }
                        }
                        else{
                            usePower = false;
                        }
                        break;
                }
            }
            else{
                usePower = false;
            }

            // One shot powers
            switch( card.power  ) {
                case FightCardPower.GET_TWO_PV:
                    this.player.addPV(2);
                    break;
                case FightCardPower.GET_ONE_PV:
                    this.player.addPV(1);
                    break;
                case FightCardPower.GET_ONE_CARD:
                    this.fight.addFreeCards(1);
                    break;
                case FightCardPower.GET_TWO_CARDS:
                    this.fight.addFreeCards(2);
                    break;
            }

            // then useCard in fight
            if( card instanceof FightCard && card.power != FightCardPower.SWAP_TWO && usePower ){
                this.fight.useCard(card);
            }
        }
        else{
            console.log('game->usePower() : not a card with power attribute', card)
        }
    }

    // History
    save() : GameSaveStateState{
        let stateToSave : GameSaveStateState;
        console.log('saving game state', stateToSave);
        return stateToSave;
    }

    load(gameSaveState : GameSaveStateState){
        console.log('loading game state', gameSaveState);
    }

//Region : Getters / Setters
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
