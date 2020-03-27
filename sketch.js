var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudimg,cloudgr;
var ob1,ob2,ob3,ob4,ob5,ob6,obstaclegr
var restartimg,restart,gameoverimg,gameover; 
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var count = 0;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
  cloudimg = loadImage("cloud.png")
  ob1 = loadImage("obstacle1.png")
  ob2 = loadImage("obstacle2.png")
  ob3 = loadImage("obstacle3.png")
  ob4 = loadImage("obstacle4.png")
  ob5 = loadImage("obstacle5.png")
  ob6 = loadImage("obstacle6.png")
  restartimg = loadImage("restart.png")
  gameoverimg = loadImage("gameOver.png")                       
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  cloudgr = new Group();
  obstaclegr = new Group();
  restart = createSprite(300,100);
  restart.addImage("restart",restartimg);
  gameover = createSprite(300,140)
  gameover.addImage("gameover",gameoverimg);
  gameover.scale = 0.8;
  restart.scale = 0.6;
  gameover.visible = false;
  restart.visible = false;
  trex.addAnimation("collided",trex_collided);
}

function draw() {
  background(100);
  text("score="+count,500,60);
    if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6 + 3*count/100);
    //scoring
    count = count + Math.round(World.frameRate/60);
    
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    console.log(trex.y);  
     //jump when the space key is pressed
    if(keyDown("space") && trex.y >= 162){
      trex.velocityY = -12 ;
     //playSound("jump.mp3");
    }
  
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
    
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles
    spawnObstacles();
    
    //End the game when trex is touching the obstacle
    if(obstaclegr.isTouching(trex)){
      //playSound("jump.mp3");
      gameState = END;
      //playSound("die.mp3");
    }
    }
  
  else if(gameState === END) {
    gameover.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclegr.setVelocityXEach(0);
    cloudgr.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclegr.setLifetimeEach(-1);
    cloudgr.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }
  
 // console.log(trex.y);
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  drawSprites();
}

function reset(){
  gameState = PLAY;
  
  gameover.visible = false;
  restart.visible = false;
  
  obstaclegr.destroyEach();
  cloudgr.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  count = 0;
  
}
  
  function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,140));
    cloud.addImage(cloudimg);
    cloud.scale = 0.5; 
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    cloudgr.add(cloud);
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
}
  function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,160,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage(ob1);
      break;
        case 2:obstacle.addImage(ob2);
      break;
        case 3:obstacle.addImage(ob3);
      break;
        case 4:obstacle.addImage(ob4);
      break;
        case 5:obstacle.addImage(ob5);
      break;
        case 6:obstacle.addImage(ob6);
      break;
      default:break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    obstaclegr.add(obstacle);
    
  }
  
  } 
