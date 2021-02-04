//creating the variables
var canvas, backgroundImage;
var carImg1, carImg2, carImg3, carImg4, trackImg;
var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var alertRank = 1;

var form, player, game;

var cars, car1, car2, car3, car4;


function preload(){
    carImg1=loadImage("images/car1.png");
    carImg2=loadImage("images/car2.png");
    carImg3=loadImage("images/car3.png");
    carImg4=loadImage("images/car4.png");
    trackImg=loadImage("images/track.jpg");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  //bringing in the play state when playerCount is 4
  if(playerCount === 4){
    game.update(1);
  }
  //when shifting to play state , dont want anything from 0 game State to interrupt with this State
  if(gameState === 1){
    clear();
    game.play();
  }
  //when shifting from playState from 1 to 2
  if(gameState === 2){
    game.end();
  }

}
