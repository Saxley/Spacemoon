import Scene_play from './scene_play.js';  
class Scene_start extends Phaser.Scene{  
  
  constructor(){
    super({key:"Scene_start"}); 
    this.titleText; 
    this.comingText;  
  }  
  
  create(){ 
    let centerW=window.innerWidth/2; 
    let centerH=window.innerHeight/2;   
    
    // Este centro nos ayuda a ppsisionar la nave a raz de la pantalla
    let centerHN=centerH+150; 

    //Agregamos la image  de fondo
    this.add.image(centerW, centerH, 'sky').setScale(3);      
    this.titleText=this.add.text(centerW/2,centerH/3,"Spacemoon",{font:"10vw Times", fill:"#ffff", fontStyle:'bold'});
    this.comingText=this.add.text(centerW/2+centerW/7,centerH/3+centerH,"Comenzar",{backgroundColor:'#99aaffeb',font:"8vw Courier", fill:"#ffff", fontStyle:'bold'});    
     //this.input.manager.enabled = true;
     this.input.once('pointerup', function(){
        this.scene.add('Scene_play', new Scene_play); 
        this.scene.start('Scene_play'); 
     },this);
  }
}
export default Scene_start; 