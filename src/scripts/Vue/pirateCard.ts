let template = `
<div class="pirate-card">
    <div class="pirate-card-info-zone">
        <div class="pirate-card-nbFreeCards">{{pirate.freeCards ? pirate.freeCards : '*'}}</div>
        <div class="pirate-card-name">{{pirate.name}}</div>
        <div class="pirate-card-strength">{{pirate.strength ? pirate.strength : '*'}}</div>
    </div>
    <div class="pirate-card-mission">{{pirate.mission ? pirate.missionName() : '...'}}</div>
</div>
`;

const pirateCard = { 
    template: template, 
    props : ['pirate'] 
}

export { pirateCard }