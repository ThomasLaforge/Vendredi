let template = `
<div>
    <img class="game-over-img" src="../../images/game_over.png"></img>
    <div class="game-over-sum-up">
        <h3>Dommage {{ playerName }}, voici le résumé de votre partie :</h2>
        <h4>Votre deck :</h4>
        <h4>Phase combat :</h4>
        <h4>Phase pirate :</h4>
    </div>
</div>
`

const gameOver = {
    template : template,
    props : ['playerName']
}

export { gameOver }