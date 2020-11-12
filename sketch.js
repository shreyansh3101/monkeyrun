
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var floor1
var food
var PLAY=1
var END=0
var gameState=PLAY;
function preload(){

  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600)
  
monkey=createSprite(50,250)
monkey.addAnimation("running", monkey_running) 
monkey.scale=0.08
  
foodGroup=createGroup()
obstacleGroup=createGroup()
floor1=createSprite(300,300,1100,10)  
score=0
food=0
}


function draw() {
background("white")
  
 if (gameState===PLAY){
   
 floor1.velocityX=-5   
 if (keyDown("space") && monkey.y>=270){
    
  monkey.velocityY=-16  
    
  }  
   
score=Math.round(ceil(frameCount/frameRate()))   
if (floor1.x<0){
  floor1.x=300
}     
monkey.velocityY=monkey.velocityY+0.8    
spawnFruit()
spawnObstacles()
   

if (monkey.isTouching(foodGroup)){
  
 foodGroup.destroyEach()
  food=food+1
  
}    
  
if (monkey.isTouching(obstacleGroup)){
  
gameState=END;

  
}

   
 }
  
if (gameState===END){
  
floor1.velocityX=0
obstacleGroup.setVelocityXEach(0)
foodGroup.setVelocityXEach(0) 
obstacleGroup.setLifetimeEach(-1)
foodGroup.setLifetimeEach(-1)
  
}
 
  
 
//console.log(monkey.y)  
 

monkey.collide(floor1)
  
drawSprites()
  text("survival time- "+score,500,50)
  text("banana eaten- "+food,100,50)
  if (gameState===END){
    fill("blue");
    textFont("Courier New");
    textSize(30);
    text ("game over",300,100)
  }
}

function spawnFruit(){
  
if (frameCount%80===0){
  
banana=createSprite(600,Math.round(random(120,200)))  
banana.addImage(bananaImage) 
  banana.scale=0.1
  banana.velocityX=-3
  banana.lifetime=300
 foodGroup.add(banana)
}
  
  
}

function spawnObstacles(){
if (frameCount%300===0){  
obstacle=createSprite(500,280)   
obstacle.addImage(obstacleImage)  
obstacle.scale=0.1
obstacle.velocityX=-4
  obstacle.lifetime=300
obstacleGroup.add(obstacle)
}
}


