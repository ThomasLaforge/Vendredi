// // import { playableCard } from './playableCard'
// import { dangerCard } from './dangerCard'
// import { modal } from './components/modal'

// let template = `
// <div>
//     <modal 
//         :show.sync="show" 
//         :on-close="close" 
//     >
//         <h2>Liste des cartes dans la défausse</h2>
//         <playable-card v-if="type === 'playable'" v-for="card in cards" 
//             :card="card"
//         />
//         <danger-card v-if="type === 'danger'" v-for="danger in cards" 
//             :danger="danger"
//         />
//     </modal>
// </div>
// `

// const discard = {
//     template : template,
//     props : ['cards', 'show', 'type'],
//     components : {
//         playableCard,
//         dangerCard,
//         modal
//     },
//     methods : {
//         close : function(){
//             this.cardAssigned = [];
//             this.$emit('switchShowDiscard');
//         }
//     }
// }

// export { discard }