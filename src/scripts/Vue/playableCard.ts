let template = `
<div class="fight-card">
    <div class="fight-card-strength">{{card.strength}}</div>
    <div class="fight-card-power">{{card.power ? card.powerName : ''}}</div>
</div>
`

const playableCard = {
    template : template,
    props : ['card']
}

export { playableCard }