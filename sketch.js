const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraints = Matter.Constraint;
const Body = Matter.Body;

let engine;
let world;

var tower;
var angle, cannon;
var cannonball;
var balls = [];

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");

}


function setup() {
  canvas = createCanvas(windowWidth,windowHeight);

  engine = Engine.create();
  world = engine.world;
  angle = -PI/30;

  ground = new Ground(0, height - 1, width * 2, 1);
  tower = new Tower(150,375,160,310);
  cannon = new Cannon(180,110,110,50,angle);
  cannonball = new CannonBall(cannon.x+10,cannon.y+35);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  //Use a new keyword to create a tower object.(challenge 4)
}

function draw() 
{
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);
  ground.display();

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
  }


 //display tower(challenge 4)
  tower.display();
  cannon.display();
  cannonball.display();
 
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
  }
}

//function to show the ball
function showCannonBalls(ball, index) {
  ball.display();
  if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
    Matter.World.remove(world, ball.body);
    balls.splice(index, 1);
  }
}



function keyReleased() {
  if (keyCode === DOWN_ARROW) { 
    balls[balls.length - 1].shoot();
  }
}
