var backImage, player_running, obstacleImage, bananaImage;
var player, invisibleground, banana, obstacle, score;

function preload() {
  backImage = loadImage("jungle.jpg");

  player_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  foodImage = loadImage("banana.png");

  obstacleImage = loadImage("stone.png");

}


function setup() {
  createCanvas(700, 300);

  Background = createSprite(700, 30, 20, 20);
  Background.addImage(backImage);
  Background.velocityX = -2;
  Background.x = Background.width / 2;

  player = createSprite(110, 235, 20, 20);
  player.addAnimation("running", player_running);
  player.scale = 0.07;

  invisibleground = createSprite(350, 260, 700, 10);
  invisibleground.visible = false;

  score = 0;



  foodGroup = createGroup();
  obstacleGroup = createGroup();
}

function draw() {
  background(220);
  player.collide(invisibleground);
  if (keyDown("space") && player.y >= 200) {
    player.velocityY = -12;
  }

  
  if (Background.x < 200) {
    Background.x = Background.width / 2;
  }

  player.velocityY = player.velocityY + 0.8;
  if (foodGroup.isTouching(player)) {
    foodGroup.destroyEach();
    score = score + 2;
    sizechange();
  }
  if (obstacleGroup.isTouching(player)) {
    player.scale = 0.07;
  }

  food();
  obstacles();
  drawSprites();
  textSize(20);
  stroke("white");
  fill("white");
  text("Score:" + score, 500, 50);
}

function food() {
  if (World.frameCount % 200 === 0) {
    banana = createSprite(700, 180, 10, 10);
    banana.velocityX = -4;
    banana.addImage(foodImage);
    banana.scale = 0.04;
    banana.lifetime = 200;
    foodGroup.add(banana);
  }
}

function obstacles() {
  if (World.frameCount % 100 === 0) {
    obstacle = createSprite(700, 240, 10, 10);
    obstacle.velocityX = -7;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
  }
}

function sizechange() {
  switch (score) {
    case 10:
      player.scale = 0.12;
      break;
    case 20:
      player.scale = 0.14;
      break;
    case 30:
      player.scale = 0.16;
      break;
    case 40:
      player.scale = 0.18;
      break;
    default:
      break;
  }

}