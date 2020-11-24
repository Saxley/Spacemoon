
class Scene_play extends Phaser.Scene{
  constructor(){
    super({key:"Scene_play"}); 
    this.nave;  
    //Enemigo
    this.meteoro;  
    this.lluvia; 
    this.meteo; 
    this.v=0; 
    
    //Detecta colision
    this.choques=this.choque;  
    
    //texto delta,impacto,valor[cantidad de impactos]
    this.del; 
    this.impacto; 
    this.valor;
  } 
  preload(){  
    alert('Escena cargada');
  } 
  choque(){ 
    var vD;
    var destruction={ 
      d:300,
      l:-300,
      R:false
    }  
    if(!destruction.R){  
        destruction.R=true; 
        vD=destruction.d;
      }else{ 
        destruction.R=false; 
        vD=destruction.l;
      } 
    
    this.impacto.setText('impactos:'+(this.valor+1));   
    this.meteoro.setVelocity(vD,100);
  } 
  lluvia(){     
    let centerW=window.innerWidth/2; 
    let centerH=window.innerHeight/2;  
    this.meteoro= this.physics.add.image(centerW,centerH-400,'meteoro','meteoroAtlas_0.png').setScale(.15).setInteractive();   
    
     this.input.enableDebug(this.meteoro, 0xff0000); 
     this.meteoro.setBounce(1);   
     this.physics.add.overlap(this.meteoro,this.nave, this.choques, null, this);  
    this.setCollideWorldBounds(true); 

    var valor=this.v++;
    this.meteo.setText('tiempo meteorologico: '+valor);
  }
  create(){  
    //Localizamos los centros
    let centerW=window.innerWidth/2; 
    let centerH=window.innerHeight/2;  
    // Este centro nos ayuda a ppsisionar la nave a raz de la pantalla
    let centerHN=centerH+150; 

    //Agregamos la image  de fondo
    this.add.image(centerW, centerH, 'sky').setScale(3);     
    
    /*Meteoro::Enemigo  
    this.meteoro= this.physics.add.image(centerW,centerH-400,'meteoro','meteoroAtlas_0.png').setScale(.15).setInteractive();   

     this.input.enableDebug(this.meteoro, 0xff0000); 
     this.meteoro.setBounce(1);  
     */
    this.time.addEvent({ delay: 5000, callback: this.lluvia, callbackScope: this, repeat: (2000 / 100) - 1 });
     
    //player:: Jugador que puede mover la nave con presionar sobre la misma 
    this.nave= this.physics.add.sprite(centerW, centerHN, 'nave','naveAtlas_0.png').setInteractive({draggable:true});
   this.input.enableDebug(this.nave, 0x00ff00);
  
   this.nave.on('drag', function (pointer, dragX, dragY) {
        this.x = dragX;
        this.y = dragY;
    });   
   this.nave.setCollideWorldBounds(true);
   
   this.nave.setBounce(.5);
   
   
  
  //Textos
  this.impacto= this.add.text(10, 40, 'impactos: 0', { fontSize: '12px', fill: '#000' }); 
  this.meteo= this.add.text(10, 60, 'tiempo meteorologico: 0', { fontSize: '12px', fill: '#000' }); 
  this.valor=0;
   this.del = this.add.text(10, 10, 'del: 0', { fontSize: '12px', fill: '#000' });
  }   
  
  update(time,delta){
    this.nave.setVelocity(50,-100);
    this.del.setText('del:'+delta+'\nTime:'+time);
  }
}  
export default Scene_play;