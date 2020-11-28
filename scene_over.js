export default class Scene_over extends Phaser.Scene{
  constructor(){
    super({key:"Scene_over"}); 
    this.overText; 
    this.tryText;  
    this.final;
  } 
  
  create(){
    let centerW=window.innerWidth/2; 
    let centerH=window.innerHeight/2;   
    
    // Este centro nos ayuda a ppsisionar la nave a raz de la pantalla
    let centerHN=centerH+150; 
    
    //Agregamos la image  de fondo
    this.add.image(centerW, centerH, 'sky').setScale(3);      
    this.overText=this.add.text(centerW/2,centerH/2,"GAME OVER",{font:"10vw Times", fill:"#ffff", fontStyle:'bold'}); 
    
    let message=this.registry.get('message');
    this.final=this.add.text(centerW/2,centerH/2+centerH/4,message,{font:"5vw Courier", fill:"#ffff", fontStyle:'bold'}); 
    
    this.overText=this.add.text(centerW/2+ centerW/7,centerH,"Intentar de nuevo",{font:"5vw Times", fill:"#ffff", fontStyle:'bold'});   

    this.input.once('pointerdown', function(){ 
        
       this.scene.start('Scene_play');  
     },this);
  } 
}