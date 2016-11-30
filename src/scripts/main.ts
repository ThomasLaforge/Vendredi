// Jquery et bootstrap
var bootstrap = require('bootstrap/dist/js/bootstrap');
// jQuery.fn.render = Transparency.jQueryPlugin;

// ES6 modules Style
import { Game 	}         from	'./ts/Game';
import { Player }         from	'./ts/Player';
import { UserInterface }  from	'./ts/UserInterface';

let pseudo   = 'Thomas';
let myPlayer = new Player(pseudo);
let game     = new Game(myPlayer, 1);
// let UI       = new UserInterface(game);

// // Watchers

// watch(game, () => { 
//   if ( game.isGameOver() ){
//       console.log('The game is over !');
//       UI.showGameOver();
//       $('body').unbind();
//   }
//   else {
//       UI.updateMainInfos();
//   }
// });

// watch(game, "_fight", () => {
//   if(game.fight){
//     UI.updateFightZone();
//   }
// });

// Interface

// $('a[data-toggle="popover"]').popover({
//     animated: 'fade',
//     placement: 'bottom',
//     html: true
// });

var app = new Vue({
    el: '#pv',
    data: {
        PV: game.player.PV 
    }
})