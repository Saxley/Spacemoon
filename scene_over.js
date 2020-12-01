export default class Scene_over extends Phaser.Scene{
  constructor(){
    super({key:"Scene_over"}); 
    this.overText; 
    this.tryText;  
    this.final;  
    this.fondo; 
    this.fondoLunar; 
  } 
  
  create(){
    let centerW=window.innerWidth/2; 
    let centerH=window.innerHeight/2;   
    
    // Este centro nos ayuda a ppsisionar la nave a raz de la pantalla
    let centerHN=centerH+150; 
    
    //Agregamos la image  de fondo
    
    this.fondo=this.add.sprite(-25, -400, "space",'spaceAtlas_1.png').setOrigin(0,0) ; 
    this.fondoLunar=this.add.sprite(200, -500, "space",'spaceAtlas_0.png');
   if (window.innerHeight>720) {
      this.fondo.setScale(2);
      this.fondoLunar.setScale(2);
      }else{
        this.fondo.setScale(1);
        this.fondoLunar.setScale(.6);
      }  
      
    this.overText=this.add.text(centerW/2,centerH/2,"GAME OVER",{font:"10vw Times", fill:"#ffff", fontStyle:'bold'}); 
    
    let message=this.registry.get('message');
    this.final=this.add.text(centerW/2,centerH/2+centerH/4,message,{font:"5vw Courier", fill:"#ffff", fontStyle:'bold'}); 
    
    this.overText=this.add.text(centerW/2+ centerW/7,centerH,"Intentar de nuevo",{font:"5vw Times", fill:"#ffff", fontStyle:'bold'});   

    this.input.once('pointerdown', function(){ 
        
       this.scene.start('Scene_play');  
     },this);
  }
  update(time,delta){
    this.fondo.y+=.5;  
    this.fondoLunar.y+=.25;  
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