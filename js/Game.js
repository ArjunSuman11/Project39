class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    car3 = createSprite(500,200);
    car4 = createSprite(700,200);
    cars = [car1, car2, car3, car4];

    car1.addImage(carImg1);
    car2.addImage(carImg2);
    car3.addImage(carImg3);
    car4.addImage(carImg4);
  }

  play(){
    form.hide();
    Player.getPlayerInfo();
    player.getCarsatEnd();
    //Game Starts
    if(allPlayers !== undefined){
      background("black");
      image(trackImg, 0, -displayHeight*4 , displayWidth, displayHeight*5)
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        //Identifying the currently active player
        if (index === player.index){
          fill("red");
          ellipse(x, y, 60 ,60);
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
      }

    }
    //moving the player
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    //cars at end and rank of player
    if(player.distance>3670){
      gameState=2;
      player.rank++;
      Player.updateCarsatEnd(player.rank);
      
    }
    drawSprites();
  }
  
  end(){
      console.log("end");
      console.log("rank: " + player.rank);
    if(alertRank){
      swal({
        title : "Game Over",
        text : "Your Rank : " + player.rank,
        icon : "success",
        button : "Okay"
      })
      alertRank = 0;
    }
      
  }
}
