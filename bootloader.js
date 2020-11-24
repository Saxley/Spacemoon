class Bootloader extends Phaser.Scene{
  constructor(){
    super({key: "Bootloader"});
  }  
  preload(){ 
    this.load.on('complete',()=>{
       this.scene.start("Scene_play");
    });  
    //meteoro
    this.load.image('sky', './src/assets/sky.png');
    this.load.atlas('meteoro', './src/assets/asteroide-min.png','./src/assets/meteoroAtlas.json'); 
   //nave
    this.load.atlas('nave', './src/assets/naveAtlas.png', './src/assets/naveAtlas.json'); 
    //humo
    this.load.atlas('humoAtlas', './assets/humoAtlas.png', './assets/humoAtlas.json');
    this.load.json('humoAtlasAnim', './assets/humoAtlas_anim.json');
  }
} 
export default Bootloader;