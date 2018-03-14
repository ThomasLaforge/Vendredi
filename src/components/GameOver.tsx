import * as React from 'react';

interface GameOverProps {
    onSelect?: Function
    playerName: string
}

interface GameOverState {
}

export default class GameOver extends React.Component<GameOverProps, GameOverState> {
    constructor(props: GameOverProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <img className="game-over-img" src="../../images/game_over.png"></img>
                <div className="game-over-sum-up">
                    <h3>Dommage { this.props.playerName }}, voici le résumé de votre partie :</h3>
                    <h4>Votre deck :</h4>
                    <h4>Phase combat :</h4>
                    <h4>Phase pirate :</h4>
                </div>
            </div>
        );
    }
}