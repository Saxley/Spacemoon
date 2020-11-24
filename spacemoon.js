import Bootloader from './bootloader.js'; 
import Scene_play from './scene_play.js'; 
const config={ 
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,  
      //parent: 'juego',
      physics: {
        default: 'arcade',
          arcade: {
            gravity: {
              y:300
            },
            debug: false
          }
        },
        scene: [
          Bootloader,
          Scene_play
        ]
};  
let game = new Phaser.Game(config);