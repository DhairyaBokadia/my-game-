var ground, stone, stone_img,cannon ,cannon_img, castle,castle_img;
var boat1_img,boat2_img,boat3_img,cannonBall_img,cannon_img,cannonBall_grp,boat_grp,shoot_sound,destroy_sound,background_img,scene;
var rand, gamestate, gameover,gameover_img, score;

function preload(){
 stone_img=loadImage("stone.png")
 cannon_img=loadImage("cannon.png")
 boat1_img=loadImage("boat1.png")
 boat2_img=loadImage("boat2.png")
 boat3_img=loadImage("boat3.png")
 castle_img=loadImage("castle.png")
 cannonBall_img=loadImage("cannon ball.png")
 gameover_img=loadImage("game over.png")
 shoot_sound=loadSound("cannon shooting.wav")
 destroy_sound=loadSound("bomb.wav")
 background_img=loadImage("background.jpg")
}

function setup (){
  createCanvas(displayWidth-30,displayHeight-150);
  scene=createSprite(width/2,height/2)
  scene.scale=1.2
  scene.addImage(background_img);
  ground=createSprite(width/2,height,width,20);
  ground.visible=false;

  stone = createSprite(width/3,ground.y-50,10,10);
  stone.addImage(stone_img)
  //stone.debug=true
  stone.setCollider("circle",0,0,50)

  cannon=createSprite(width/3,stone.y-50,10,10)
  cannon.addImage(cannon_img)
  cannon.scale=0.5
  //cannon.debug=true

  castle=createSprite(170,ground.y-270)
  castle.addImage(castle_img)
  castle.scale=1.2

  gameover=createSprite(width/2,height/2,40,40)
  gameover.addImage(gameover_img)
  gameover.visible=false;

  cannonBall_grp=new Group ();
  boat_grp=new Group();

  score=0;

  gamestate="play";
}

function draw (){
  background("lightblue");

  scene.velocityX=-3;

  if (scene.x<0) {
    scene.x=width/2;
  }

  

  if (gamestate=="play") {
    spawnBoats();

    if(keyWentDown("space")){
      spawnCannonball();
      shoot_sound.play ();
    }

    if (cannonBall_grp.isTouching(boat_grp)) {
      boat_grp.destroyEach();
      cannonBall_grp.destroyEach();
      destroy_sound.play ()
      score=score+5;
    }
  }

  else if(gamestate=="end"){
      console.log("end")
      boat_grp.setVelocityXEach(0)
      boat_grp.setLifetimeEach(-1)
      gameover.visible=true;
      text("press space to restart",width/4,height/4)
      castle.visible=false;
  }

 if (boat_grp.isTouching(castle)) {
   gamestate="end"
 }

 if(keyWentDown("space")&&gamestate=="end"){
    restart();
}

  cannon.collide(stone);
  stone.collide(ground);

  drawSprites();
  textSize(40)
  fill ("red")
  text ("score :"+score,width/2,50)
}

function restart() {
  gamestate="play";
  score=0;
  gameover.visible=false;
  boat_grp.destroyEach();
  castle.visible=true;
}

function spawnBoats(){
  if (frameCount%300==0){
    var boat=createSprite(width,cannon.y,10,10);
    boat.velocityX=-(4+score/5)
    //boat.debug=true
    rand=Math.round(random(1,3))
    switch(rand){
      case 1:boat.addImage(boat1_img)
      break;

      case 2:boat.addImage(boat2_img);
      boat.scale=0.5
      break;

      case 3:boat.addImage(boat3_img);
      boat.scale=0.5
      break;

      default:break
    }
    boat.lifetime = -width/boat.velocityX;
    boat_grp.add(boat)
  }
  
}

function spawnCannonball(){
  var cannonBall=createSprite(cannon.x+150,cannon.y-50)
  cannonBall.velocityX=4
  cannonBall.addImage(cannonBall_img)
  cannonBall.scale=0.2
  //cannonBall.debug=true
  cannonBall_grp.add(cannonBall)
}

