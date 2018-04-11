import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../../lib/mobxInjector'

import {Game} from '../../modules/Game'
// import {GameFight} from '../../modules/GameFight'

import Button from 'material-ui/Button';
import Genetic from 'genetic-js-no-ww'
import { GameLevel } from '../../modules/Vendredi';
import {DangerFight} from '../../modules/DangerFight';


class GeneticTrainer {
    public trainer: any

    constructor(notificationFunction: Function){
        this.trainer = Genetic.create();
        
        this.trainer.optimize = Genetic.Optimize.Maximize;
        
        this.trainer.select1 = Genetic.Select1.Tournament2;
        this.trainer.select2 = Genetic.Select2.FittestRandom;

        this.trainer.seed = function() {
            let a = Math.random() // 
            let b = Math.random()
            let c = Math.random()
            let d = Math.random()
            let e = Math.random()

            let weights = [a, b, c, d, e]
            return weights
        };
        
        this.trainer.mutate = function(entity: number[]) {
            // allow chromosomal drift with this range (-0.05, 0.05)
            var drift = ((Math.random()-0.5)*2)*0.05;
            
            var i = Math.floor(Math.random()*entity.length);
            entity[i] += drift;
            
            return entity;
        };
        
        this.trainer.crossover = function(mother: number[], father: number[]) {
            // crossover via interpolation
            function lerp(a, b, p) {
                return a + (b-a)*p;
            }
            
            var len = mother.length;
            var i = Math.floor(Math.random()*len);
            var r = Math.random();
            var son = [].concat(father);
            var daughter = [].concat(mother);
            
            son[i] = lerp(father[i], mother[i], r);
            daughter[i] = lerp(mother[i], father[i], r);
            
            return [son, daughter];
        };
            
        this.trainer.fitness = (entity) => {
            // let game = new Game();
            // game.fight = new DangerFight(game.dangerDeck.drawOneCard(), game.level)
            // let deckEmpty = false

            // while(!game.isGameOver() && game.level === GameLevel.FIRST_ROUND && !deckEmpty){
            //     if(game.shouldAiDraw(entity[0], entity[1], entity[2], entity[3], entity[4])){
            //         game.drawFightCard()
            //     }
            //     else {
            //         game.autoStopFight()
            //         // game .autoResolveFight();
            //         if(game.dangerDeck.isEmpty()){
            //             deckEmpty = true
            //         }
            //         else {
            //             game.fight = new DangerFight(game.dangerDeck.drawOneCard(), game.level)
            //         }
            //     }
            // }
            // return game.level + game.robinson.PV;
        }

        this.trainer.generation = function(pop, generation, stats) {};

        this.trainer.notification = notificationFunction
    }
}

interface TrainerProps extends DefaultProps {
}

interface TrainerState {
    trainer: GeneticTrainer
    trainingResult: any
    game: Game
}

@inject(injector)
@observer
class Trainer extends React.Component <TrainerProps, TrainerState> {

    constructor(props: TrainerProps){
        super(props)
        this.state = {
            trainer: new GeneticTrainer( 
                        (pop, gen, stats, isFinished) => {
                            // this.setState({ trainingResult: this.state.trainer.getResult() })
                            console.log('current generation', pop, gen, stats, isFinished)
                        }
                    ),
            trainingResult: null,
            game: new Game()
        }
    }

    onClick = () => {
        var config = {
            iterations: 1000, 
            size: 250, 
            crossover: 0.9, 
            mutation: 0.2, 
            skip: 20
		};
		this.state.trainer.trainer.evolve(config)
    }

    render() {
        return ( 
            <div className="trainer">
                Trainer : 
                <div>res: {this.state.trainingResult}</div>
                <Button onClick={this.onClick}>Train</Button>
            </div>
        );
    }
}

export default Trainer;
