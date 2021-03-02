var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var cyclist1, cyclist2, cyclist3
function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  opponent1_driving=loadAnimation("images/opponent1.png","images/opponent2.png")
  opponent1_fallen=loadAnimation("images/opponent3.png")
   opponent2_driving=loadAnimation("images/opponent4.png","images/opponent5.png")
  opponent2_fallen=loadAnimation("images/opponent6.png")
   opponent3_driving=loadAnimation("images/opponent7.png","images/opponent8.png")
  opponent3_fallen=loadAnimation("images/opponent9.png")
  
  gameOverImg= loadImage("images/gameOver.png")
  
  bellSound=loadSound("sound/bell.mp3")
}

function setup(){
  
createCanvas(800,300);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  
  gameOver=createSprite(400, 150, 30,10)
  gameOver.addImage(gameOverImg)
  gameOver.visible=false
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  
  if(gameState===PLAY){
    distance=distance+Math.round(getFrameRate()/50)
    if(keyDown("space")){
      bellSound.play()
    }
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  path.velocityX=-(5+distance/50)
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  spawnCyclist()
  if(cyclist1){
    if(cyclist1.isTouching(mainCyclist)){
      cyclist1.addAnimation("opponent1",opponent1_fallen)
      cyclist1.velocityX=0
    cyclist1.lifetime=-1
      mainCyclist.addAnimation("SahilRunning", mainRacerImg2)
      gameState=END
    }
  }
    else if(cyclist2){
    if(cyclist2.isTouching(mainCyclist)){
      cyclist2.addAnimation("opponent2",opponent2_fallen)
      cyclist2.velocityX=0
      cyclist2.lifetime=-1
      mainCyclist.addAnimation("SahilRunning", mainRacerImg2)
      gameState=END
    }
  }
    else if(cyclist3){
    if(cyclist3.isTouching(mainCyclist)){
      cyclist3.addAnimation("opponent3",opponent3_fallen)
      cyclist3.velocityX=0
      cyclist3.lifetime=-1
      mainCyclist.addAnimation("SahilRunning", mainRacerImg2)
      gameState=END
    }
  }
    
  }
  if(gameState===END){
    path.velocityX=0
    gameOver.visible=true
    textSize(30)
    text("Press UP Arrow to restart the game",200,230)
    if(keyDown(UP_ARROW)){
      reset()
    }
  }
}

function spawnCyclist(){
  if(frameCount%200===0){
    x=Math.round(random(1,3))

    switch(x){
      case 1:  cyclist1=createSprite(800, Math.round(random(50,250)))
              cyclist1.velocityX=-(2+distance/50)
              cyclist1.lifetime=400;
              cyclist1.scale=0.07;
              cyclist1.addAnimation("opponent1",opponent1_driving);
              return(cyclist1)
              break;
      case 2:  cyclist2=createSprite(800, Math.round(random(50,250)))
              cyclist2.velocityX=-(2+distance/50)
              cyclist2.lifetime=400;
              cyclist2.scale=0.07;
              cyclist2.addAnimation("opponent2",opponent2_driving);
              return(cyclist2)
              break;
      case 3:  cyclist3=createSprite(800, Math.round(random(50,250)))
              cyclist3.velocityX=-(2+distance/50)
              cyclist3.scale=0.07;
              cyclist3.addAnimation("opponent3",opponent3_driving);
              return(cyclist3)
              break;
    }
  }
  
}

function reset(){
  if(cyclist1){
    cyclist1.destroy()
  }
   if(cyclist2){
    cyclist2.destroy()
  }
   if(cyclist3){
    cyclist3.destroy()
  }
  gameState=PLAY
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  gameOver.visible=false
  distance=0
  
}