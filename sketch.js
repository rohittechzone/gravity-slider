
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;
 
var engine;
var world;
var boxes = [];
 
var ground;
var gSlider;
 
function setup() {
    createCanvas(400, 400);

    engine = Engine.create();
    world = engine.world;
    Engine.run(engine);
    
    gSlider = createSlider(0, 100, 50);
    gSlider.position(40, 365);
    gSlider.input = map(engine.world.gravity, gSlider.min, gSlider.max, 0, 1);

    ground = new Ground(200,340,400,20)
}
 
function mousePressed() {
    if (mouseY < 350) {
        boxes.push(new Box(mouseX, mouseY, random(15,45), random(15,45)));
    }
}
 
function draw() { 

    background(255,20,147);
    var fVal = gSlider.value();
    for(var i = 0; i < boxes.length; i++){
        boxes[i].show();
    }
    
    fill(255);
    textSize(24);
    text("Gravity: "+ fVal,190,380);
    ground.display();
}
 

function Box(x, y, w, h, options) {

    var options = {
     friction: 0.8,
     restitution : 0.6,
    }
      this.body = Bodies.rectangle(x, y, w, h, options);
      this.w = w;
      this.h = h;
      World.add(world, this.body);

    this.show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        strokeWeight(1);
        stroke(255);
        fill(63,224,208);
        rect(0,0,this.w,this.h);
        pop();
    }
}