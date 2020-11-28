import Bootloader from './bootloader.js'; 
import Scene_start from './scene_start.js';
import Scene_over from './scene_over.js'; 
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
          Scene_over,
          Scene_start
        ]
};  
let game = new Phaser.Game(config);