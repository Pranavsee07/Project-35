var balloon,balloonImage;
var database;
var position;
var bg;

function preload(){
   bg = loadImage("Images/cityImage.png");
   balloonImage=loadAnimation("Images/1.png, Images/2.png, Images/3.png");
   
  }

//Function to set initial environment
function setup() {
  database = firebase.database();
  createCanvas(1500,700);

  var balloonPosition = database.ref('Balloon/Position');
balloonPosition.on("value", writePosition, readPosition, showError);


  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage);
  balloon.scale=0.5;

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage);
    writePosition(-10,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage);
    writePosition(10,0);
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage);
    writePosition(0,10);
    balloon.scale = balloon.scale -0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage);
   writePosition(0,10);
   balloon.scale = balloon.scale +0.01;
  }

  drawSprites();

  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function readPosition(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;

}

function showError(){
  console.log("There is an error in the database");
}

function writePosition(){
  database.ref('Balloon/Position').set({
    'x': position.x+x,
    'y': position.y+y
  })
}