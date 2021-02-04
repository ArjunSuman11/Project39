class Player {
  constructor(){
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.rank = null;
  }
  //getting the playerCount
  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }
  //updating the count in db
  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }
  //updating the player idex in db
  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance
    });
  }
  //static function for reading of data of all players
  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }
  //reading into db to get the carsatEnd
  getCarsatEnd(){
    database.ref("CarsatEnd").on("value", (data)=>{
      this.rank = data.val();
    });

  }

  //referring to whole db for updating Carsat end and rank.
  static updateCarsatEnd(rank){
    database.ref("/").update({
      CarsatEnd : rank
    });
  }
}


