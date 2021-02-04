class Form {
//creating the constructor for the input, buttons, elements
  constructor() {
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h2');
    this.title = createElement('h2');
    this.reset = createButton("Reset");
  }
  //hide () for using @line 40, 41
  hide(){
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }
  //writing the display function to get the output
  display(){
    this.title.html("Car Racing Game");
    this.title.position(displayWidth/2 - 50, 0);

    this.input.position(displayWidth/2 - 40 , displayHeight/2 - 80);
    this.button.position(displayWidth/2 + 30, displayHeight/2);

    this.reset.position(100, 50);
    this.reset.mousePressed(
      ()=>{
        player.updateCount(0);
        game.update(0);
        Player.updateCarsatEnd(0);
        
        database.ref("/").child("players").remove();

      }
    )

      //if button is pressed , then the game updates and follows with the given code
    this.button.mousePressed(
      ()=>{
        this.input.hide();  //button & form
        this.button.hide();
        player.name = this.input.value();
        playerCount+=1;
        player.index = playerCount;
        player.update();
        player.updateCount(playerCount);
        this.greeting.html("Hello " + player.name)
        this.greeting.position(displayWidth/2 - 70, displayHeight/4);
      }
    );

  }
}
