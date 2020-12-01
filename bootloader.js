class Bootloader extends Phaser.Scene{
  constructor(){
    super({key: "Bootloader"});
  }  
  preload(){ 
    this.load.on('complete',()=>{
       this.scene.start("Scene_play");
    });  
    this.load.on('complete',()=>{
       this.scene.start("Scene_start");
    });  
    this.load.on('complete',()=>{
       this.scene.start("Scene_over");
    });  
    //meteoro
    this.load.image('sky', './src/assets/sky.png');

   this.load.atlas('space', './src/assets/spaceAtlas.png', './src/assets/spaceAtlas.json');  
    
    this.load.atlas('meteoro', './src/assets/asteroide-min.png','./src/assets/meteoroAtlas.json'); 
   //nave
    this.load.atlas('nave', './src/assets/naveAtlas.png', './src/assets/naveAtlas.json'); 
    //humo
    this.load.atlas('humoAtlas', './src/assets/humoAtlas.png', './src/assets/humoAtlas.json');
    this.load.json('humoAtlas_Anim', './src/assets/humoAtlas_anim.json'); 
    //audios 
    this.load.audio("choque", './src/assets/sounds/explocion.wav');
    this.load.audio("normal", './src/assets/sounds/musicNormal.wav');
    this.load.audio("final", './src/assets/sounds/MusicFinal.wav');
  }
} 
export default Bootloader;