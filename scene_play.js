import Scene_over from './scene_over.js'; 
class Scene_play extends Phaser.Scene{
  constructor(){
    super({key:"Scene_play"}); 
    //Usamos 3 imagenes como fondo
    this.fondo;
    this.fondoSpace;
    this.fondoLunar; 
    
    this.nave;   
    this.prss=false; 
    this.mover;
    this.dataAnim;
    this.humo; 
    this.t=0;
    //Enemigo
    this.meteoro;  
    this.lluvia; 
    this.meteo; 
    this.v=0; 
    this.meteorologia; 
    this.tiempo=3000;
    //Detecta colision
    this.choques=this.choque;  
    this.R=false;
    //texto delta,impacto,valor[cantidad de impactos]
    this.del; 
    this.impacto; 
    this.valor=0; 
    
    //Tiempo 
    this.sec=0; 
    this.ts=0; 
    this.ms$=0; 
    
    //Mensaje 
    this.message='Todos los tripulantes \n han muerto';  
    
    //Audios
    this.audioChoque;
    this.musicFondo;
    this.musicFinal; 
    this.changeMusic;
    this.change=false;
  } 
  
  choque(){ 
    this.audioChoque.play();
    let a=this.nave.frame.name;   
    a=a.split('naveAtlas_'); 
    a=parseInt(a[1][0]);   
    if(a<6){
    a++;  
    }
    //Animacion humo 
    this.humo.active=true;  
    this.humo.x=this.nave.x; 
    this.humo.y=this.nave.y; 
    this.humo.visible=true;
    this.dataAnim = this.cache.json.get('humoAtlas_Anim');  
    this.anims.fromJSON(this.dataAnim);

    this.humo.anims.play('humoAtlasAnim');
    
    //vamos al sig sprite
   this.nave.setFrame('naveAtlas_'+a+'.png'); 
   //redimensionamos el area de colision
   this.nave.setSize(this.nave.width,this.nave.height);
     
   //this.input.enableDebug(this.nave, 0x00ff00);
   this.valor+=Math.round(100/7); 
    var valor=100-this.valor; 
    if(valor==2){ 
      valor=0; 
    }
    var vD;
    var destruction={ 
      d:300,
      l:-300
    }   
    
    //direccion del meteorito
    if(!this.R){  
        this.R=true; 
        vD=destruction.d;
      }else{ 
        this.R=false; 
        vD=destruction.l;
      } 
    
    this.impacto.setText('Estado de la nave:'+valor+'%');   
    this.meteoro.setVelocity(vD,1000); 
    this.meteoro.destroy();   
    
    //Condicion el estado de la nave si el valor es 0 terminara la partida y reseteara todos los valores a su estado inicial
    if(valor==0){  
      this.ts=0;
      this.ms$=0;
      this.t=0;
      this.v=0; 
      this.valor=0; 
      this.sec=0;
      this.registry.set('message', this.message);
      this.scene.start('Scene_over'); 
      this.change=false;
      this.musicFinal.stop();
      this.musicFondo.stop();
    } 
  }  
  
  lluvia(){     
    let centerW=window.innerWidth/2; 
    let centerH=window.innerHeight/2;    
    let pronostico=['Lluvia moderada', 'Lluvia intensa', 'Ojo de la tormenta'];
    //Generamos numeros aleatorios
    let random=Phaser.Math.Between(2, 15)*.01; 
    let posRandom=Phaser.Math.Between(0, 400); 
    
    //Agregamos el meteoro
    this.meteoro= this.physics.add.image(posRandom,centerH-600,'meteoro','meteoroAtlas_0.png').setScale(random).setInteractive();    
    
    //Si random es mayor a .10 los meteoros rotan.
    if(random<.10){
      this.meteoro.angle=Phaser.Math.Between(0, 360);
      this.meteoro.setVelocity(500,200); 
    }
    
    //Fisicas para la escena
     this.physics.world.setBoundsCollision(true,true,true,false)
    // this.input.enableDebug(this.meteoro, 0xFFFF00); 
     this.meteoro.setBounce(1);    
     
     //Colision del meteoro con los objetos
     this.physics.add.overlap(this.meteoro,this.nave, this.choques, null, this);  
    this.meteoro.setCollideWorldBounds(true);

    this.v++; 
    var i;
    var valor=this.v; 
    if(valor>10 && valor<20){ 
        i=1;  
    }else if(valor > 20){
        i=2; 
    }else{
        i=0;
    }
    this.meteo.setText('Tiempo meteorológico: '+pronostico[i]);  
  }  
  
  meteorologia(){  
    this.time.addEvent({ delay: this.tiempo, callback: this.lluvia, callbackScope: this, repeat: (20000 / 100) - 1 });
  } 
  
  changeMusic(){
      this.musicFondo.stop(); 
      this.musicFinal.play(); 
  }  
  mover(){ 
  
     this.input.on('pointermove', (pointer)=>{ 
       if(this.prss){
        this.nave.x = pointer.x;
        this.nave.y = pointer.y;  
       } 
       
     }, this); 
  }
  create(){   
    
    //audio
    this.audioChoque=this.sound.add('choque'); 
    this.musicFondo = this.sound.add('normal',{loop:true});  
    this.musicFinal = this.sound.add('final',{loop:true});   

    this.musicFondo.play(); 
    
    //Localizamos los centros
    let centerW=window.innerWidth/2; 
    let centerH=window.innerHeight/2;   
    
    // Este centro nos ayuda a ppsisionar la nave a raz de la pantalla
    let centerHN=centerH+150; 

    //Agregamos la image  de fondo
   this.fondo= this.add.sprite(centerW, centerH, 'sky').setScale(3);     
   this.fondoSpace=this.add.sprite(-25, -600, "space",'spaceAtlas_1.png').setOrigin(0,0) ;  
   //Se agrega la luna pero se modifica su visibilidad a falso
    this.fondoLunar=this.add.sprite(200, -200, "space",'spaceAtlas_0.png');   
  //Analizando la pantalla, dependiendo del tamaño de la pantalla sera el tamaño de las imagenes
   if (window.innerHeight>720) {
       this.fondoSpace.setScale(2);
        this.fondoLunar.setScale(2);
      }else{
        this.fondoSpace.setScale(1);
        this.fondoLunar.setScale(.6);
      } 
    this.fondoLunar.visible=false;
      
    this.meteorologia();
    //player:: Jugador que puede mover la nave con presionar sobre la misma   
    
    this.nave= this.physics.add.sprite(centerW, centerHN, 'nave','naveAtlas_0.png'); 
    this.humo = this.add.sprite(0,0,'humoAtlas', 'humoAtlas_0.png'); 
    this.humo.active=false; 
    this.humo.visible=false;
    //Agregamos interactividad
    this.nave.setInteractive();
    //Agregamos drag
   /*this.nave.on('drag', function (pointer, dragX, dragY) {
        this.x = dragX;
        this.y = dragY;
    }); */   
    
    //Mouse control
    this.nave.on('pointerdown', function () { 
      this.prss=true;
    },this);
    this.nave.on('pointerup', function () { 
      this.prss=false;
    },this); 
   this.nave.setCollideWorldBounds(true);
   this.nave.setBounce(.5);
   
  //Textos 
  //Texto dedicado a mostrar el estado de la nave
  this.impacto= this.add.text(10, 40, 'Estado de la nave:100%', { fontSize: '14px', fill: '#fff' }); 
  //Texto dedicado a mostrar el tiempo meteorológico espacial
  this.meteo= this.add.text(10, 25, 'Tiempo meteorológico: Estable', { fontSize: '14px', fill: '#fff' }); 
  //Texto dedicado a mostrar el tiempo
   this.del = this.add.text(10, 10, '',{ fontSize: '14px', fill: '#fff' }); 
  }   
  
  update(time,delta){     
  //Se le da movimiento al fondo
   this.fondo.y+=2;
   this.fondoSpace.y+=.5;   
   //Cuando el fondo del espacio llega a 0 la imagen toma la pocision indicada nuevamente
    if(this.fondoSpace.y==0){
      this.fondoSpace.setPosition(-25,-450,0,0);
    }  
  //GAME OVER::Si los minutos llegan a 2 se pasa a la escena GameOver
  if(this.ms$==2){  
      if(this.valor===100){ 
        this.message='Eres el rey de la constelación';
        }else{
        this.message='Has cumplido la mision. \nExito con un '+(100-this.valor)+'%'; 
        }
      this.ts=0;
      this.ms$=0;
      this.t=0;
      this.v=0; 
      this.valor=0; 
      this.sec=0;
      this.registry.set('message', this.message);
      this.scene.start('Scene_over');  
      this.change=false;
      this.musicFinal.stop();
      this.musicFondo.stop();
    } 
    
  //Se evalua la cantidad de colisiones
   if (this.valor<50){ 
       this.nave.setVelocityY(-100);
     }else{ 
       this.meteoro.angle+=10;
       this.nave.setVelocityY(-500);  
       if(this.nave.x>10 && this.nave.x<150){ 
         this.nave.setVelocityX(100);
       }else if(this.nave.x<300 && this.nave>100){
         this.nave.setVelocityX(-100);
       }
     }   
  //Se evalua el tiempo de la animacion de humo
   if(Boolean(this.humo)){ 
     if(this.t==0){
     this.t=time+500;
     }
     this.humo.setScale(2); 
     this.humo.setAlpha(.8); 
     if(time>this.t){ 
       this.humo.anims.stop(); 
       this.humo.active=false;
       this.humo.visible=false;
       this.t=0; 
     } 
   }    
   
   //Variable que almacena 60 segundos.
   var secTemp=this.sec;  
   
   //Se hace visible el fondo de la luna y se avalua el tipo de pantalla para mostrar un tamaño adecuado
   if(this.ms$==1 && secTemp>30){  
     this.fondoLunar.visible=true; 
      this.fondoLunar.y+=.2;  
     if(this.fondoLunar.y>700 && window.innerHeight<720){
        this.fondoLunar.setPosition(200,-950,0,0);
      }else if(this.fondoLunar.y>2048){
        this.fondoLunar.setPosition(200,-600,0,0);
      }  
   }  
   
   //Se le asigna un valor a this.sec basado en el tiempo de actualización, obteniendo 60 segundos
   this.sec = Math.floor((time/1000) % 60);
   
   if(secTemp!=this.sec){ 
     //Se le agrega uno a this.ts el cual es el encargado de almacenar los minutos temporales
     this.ts++;
   }    
   
   //Cuando this.ts llega a 60 se aumenta el minutero this.ms$ en uno y this.ts vuelve a su valor inicial 0
   if(this.ts==60){ 
     this.ts=0;
     this.ms$++;
   }  
   
   //Se imprime el tiempo  
    this.del.setText('Tiempo:'+this.ms$+':'+this.ts+' min');   
    
   // Se destruyen los meteoritos
    if(Boolean(this.meteoro)){ 
      if(this.meteoro.y>window.innerHeight)this.meteoro.destroy();
    }     
    
  // Analiza el puntaje y el tiempo para cambiar la musica.
    if(this.change==false){  
      if(this.valor>50 || this.ms$==1 && this.ts>20){
       this.change=true;
       this.changeMusic(); 
      }
    }  
    this.mover();
  } 

}  
export default Scene_play;