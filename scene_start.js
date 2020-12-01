import Scene_play from './scene_play.js';  
class Scene_start extends Phaser.Scene{  
  
  constructor(){
    super({key:"Scene_start"}); 
    this.titleText; 
    this.comingText;  
    this.fondo; 
    this.fondoLunar;  
  }  
  
  create(){  
    let centerW=window.innerWidth/2; 
    let centerH=window.innerHeight/2;   
    
    // Este centro nos ayuda a ppsisionar la nave a raz de la pantalla
    let centerHN=centerH+150; 

    //Agregamos la image  de fondo 
    this.add.sprite(centerW, centerH, 'sky').setScale(3);
    this.fondo=this.add.sprite(-25, -600, "space",'spaceAtlas_1.png').setOrigin(0,0) ; 
    this.fondoLunar=this.add.sprite(200, -960, "space",'spaceAtlas_0.png');
   if (window.innerHeight>720) {
      this.fondo.setScale(2);
      this.fondoLunar.setScale(2);
      }else{
        this.fondo.setScale(1);
        this.fondoLunar.setScale(.6);
      }
    
    this.titleText=this.add.text(centerW/2,centerH/3,"Spacemoon",{font:"10vw Times", fill:"#ffff", fontStyle:'bold'});
    this.comingText=this.add.text(centerW/2+centerW/7,centerH/3+centerH,"Comenzar",{backgroundColor:'#99aaffeb',font:"8vw Courier", fill:"#ffff", fontStyle:'bold'});    
     //this.input.manager.enabled = true;
     this.input.once('pointerup', function(){
        this.scene.add('Scene_play', new Scene_play); 
        this.scene.start('Scene_play'); 
     },this);
  }  
  
  update(time,delta){  

    this.fondo.y+=.5;  
    this.fondoLunar.y+=.5;  
    if(this.fondo.y==0){
      this.fondo.setPosition(-25,-450,0,0);
    } 
    if(this.fondoLunar.y>700 && window.innerHeight<720){
      this.fondoLunar.setPosition(200,-950,0,0);
    }else if(this.fondoLunar.y>2048){
      this.fondoLunar.setPosition(200,-600,0,0);
    }
  } 
}
export default Scene_start; 