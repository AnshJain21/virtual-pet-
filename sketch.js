var dog,sadDog,happyDog, database;
var foodS,foodStock;







function preload(){
sadDog=loadImage("dogImg.png");
happyDog=loadImage(" dogImg1.png");
}

function setup() {
  
  createCanvas(500,500);

  database = firebase.database();

  
   dog = createSprite(250,260,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  foodStock.set(20);

  

}

function draw() {
  background(46,139,87);
 
   textSize(20)
   fill(255)
   text("Note: Press UP ARROW to feed Drago Milk",50,50)
   text("Food Remaining:"+foodS,150,150)
 
 

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(happyDog)
  }

  if(keyWentUp(UP_ARROW)){
    
    dog.addImage(sadDog)
  }

  if(foodS==0){
    foodS=20
  }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  
}


function writeStock(x){

if(x<=0){
  x=0
}else{
  x=x-1
}


  database.ref('/').update({
Food:x
  })
}
