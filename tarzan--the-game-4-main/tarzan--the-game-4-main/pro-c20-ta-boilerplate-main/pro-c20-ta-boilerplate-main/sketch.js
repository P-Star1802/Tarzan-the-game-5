var PLAY = 1;
var END = 0;
var gameState = PLAY;

var tarzan, tarzan_img, tigerGroup;
var ground, invisibleGround;
var snake, snake_img, tiger, tiger_img, jungle;
var score;
var gameOver_Img, gameOver;


function preload(){
  tarzan_img = loadImage("assets/Tarzan.jpg");
  snake_img = loadImage("assets/Snake.jpg");
  tiger_img = loadImage("assets/Tiger.jpg");
  gameOver_Img = loadImage("assets/gameOver.jpg");

  
}

function setup() {
  createCanvas(600, 200);
  
 tarzan = createSprite(100,150,20,50);
 tarzan.addImage("running",tarzan_img);
 tarzan.scale = 0.08;

  ground = createSprite(200,180,400,20);
  ground.x = ground.width /2;
  ground.velocityX = -4;

  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;


  
  // create enemies group
  tigerGroup = new Group();
  snakeGroup = createGroup();
  
  
  score = 0;
}

function draw() {
  background(180);
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -4;
    //increasing the score
    score = score + Math.round(frameCount/60);
    //making the Tarzan jump
    if(keyDown("space")&& tarzan.y >= 100) {
      tarzan.velocityY = -13;
    }
    // giving gravity to Tarzan
    tarzan.velocityY = tarzan.velocityY + 0.9;
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    spawnTiger();
    if(tigerGroup.isTouching(tarzan)){
      gameState = END; 


    }
    else if(gameState === END){
      //stop the ground
      ground.velocityX = 0;
      tigerGroup.setVelocityXEach(0);
      gameOver = createSprite(200,200,50,50);
      gameOver.addImage("finish", gameOver_Img);
      gameOver.scale = 0.5;  
    }
    
  }
    
 tarzan.collide(invisibleGround);
  
  
  drawSprites();
}

function spawnTiger(){
 if (frameCount % 60 === 0){
  tiger = createSprite(50,180,20,50);
  tiger.addImage("scary",tiger_img);
  tiger.velocityX = -6;

    //assign scale and lifetime to the tiger        
    tiger.scale = 0.5;
    tiger.lifetime = 300;
    
       //adding tiger to the group
   tigerGroup.add(tiger);

      }
      
   
 }

 function spawnSnake(){
  if(frameCount % 80 === 0){
    snake = createSprite(60,180,20,50);
    snake.addImage("bite",snake_img);
    snake.scale = 0.5;
    snake.velocity = -5;

    //assign scale and lifetime to the snake
    snake.scale = 0.5;
    snake.lifetime = 300;

    //adding snake to the group
    snakeGroup.add(snake);
  }
    
    
  }
