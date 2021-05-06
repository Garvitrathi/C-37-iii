var rock, stoneimage, monkey, monkey_running, banana, bananaimage,
  jungle, jungleimage, ground;

var foodgroup, stonegroup;
var monkeyimg;
var gameState = 1;


function preload() {
  bananaimage = loadImage("banana.png");
  stoneimage = loadImage("stone.png");
  jungleimage = loadImage("jungle.jpg");
  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png",
    "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  monkeyimg = loadImage("Monkey_01.png");
}


function setup() {
createCanvas(displayWidth-100,displayHeight-180);

  jungle = createSprite(displayWidth/2,displayHeight,displayWidth,100);
  jungle.addImage(jungleimage);
  jungle.x = jungle.width/2;
  jungle.velocityX = -2;
  jungle.scale = 2.5 ;

  monkey = createSprite(95, 510, 20, 20);
  monkey.addAnimation("running monkey", monkey_running);
  monkey.scale = 0.15;
  // monkey.velocityX = 2;

  ground = createSprite(displayWidth/2,displayHeight-250,width,10);
  ground.visible = false;

  score = 0;

  foodgroup = new Group();
  stonegroup = new Group();
  
  // camera.position.x = jungle.width ;
  // camera.position.y = monkey.y ; 
}

function draw() {
  background(220);
  console.log(displayWidth+":"+displayHeight);
  console.log(monkey.y);
  stroke("white");
  textSize(20);
  fill("white");
  text("score:" + score, 150, 35);
  
  if(gameState === 2){
    jungle.velocityX = 0 ; 
    console.log("GAME HAS ENDED");
    foodgroup.setVelocityXEach(0)
    stonegroup.setVelocityXEach(0);
    monkey.pause();
  }

  if(jungle.x<200){
    jungle.x = jungle.width/2;
  }

  if (keyDown("space") && monkey.y >= 466) {
    monkey.velocityY = -8;
  }

  monkey.velocityY = monkey.velocityY + 0.2;
  monkey.collide(ground);

  

  if (monkey.isTouching(stonegroup)) {
    gameState = 2 ;
    
  }

  if (World.frameCount % 80 === 0) {
    food();
  }

  if (World.frameCount % 300 === 0) {
    obstacle();
  }

  drawSprites();


}

function food() {
  banana = createSprite(displayWidth-150, random(250, 340), 20, 20);
  banana.addImage(bananaimage);
  banana.scale = 0.08;
  banana.velocityX = -3;
  banana.lifetime = displayWidth;

  foodgroup.add(banana);
}

function obstacle() {
  rock = createSprite(displayWidth-150, 480, 20, 20);
  rock.addImage(stoneimage);
  rock.velocityX = -2;
  rock.lifetime = displayWidth;
  rock.scale = 0.25;

  stonegroup.add(rock);
}

