Platform = function(){
  this.games = {
    "game_of_life": GameOfLife,
    "lights_off": LightsOffGame,
    "minesweeper": Minesweeper
  }

  this.loadGame = function(){
    d3.selectAll("[data-on]").style({"display": "none"})
    if(this.currentGame){
      d3.selectAll("[data-on=all],[data-on="+this.currentGameName+"]").style({"display": "initial"})
    }
  }

  this.pickGame = function(){
    var gameName = d3.select("#games")[0][0].value
    this.currentGameName = gameName;
    this.currentGame = this.games[gameName];
    this.loadGame();
    this.changeGridSize(this.getGridSize());
  }


  this.findCellSize = function(gridSize){
    var body = d3.select("body"),
        bHeight = body.style("height"),
        bWidth = body.style("width"),
        maxSize = d3.min([parseInt(bHeight),parseInt(bWidth)]) - 30

    return maxSize / gridSize
  }

  this.changeGridSize = function(newGridSize){
    if(this.game){ this.game.stop() }
    d3.select("#currentGridSize").html(newGridSize);
    this.startGame(parseInt(newGridSize));
  }

  this.getGridSize = function(){
    return parseInt(d3.select('#gridSize').property('value'))
  }

  this.toggleAnimation = function(button){
    if(button.value === "Animate"){
      this.game.animate(400);
      button.value = "Pause"
    }else{
      this.game.pause();
      button.value = "Animate"
    }
  }

  this.startGame = function(){
    var grid, game, gridSize;

    gridSize = this.getGridSize();

    new GridView(new Grid(0)).update();
    grid = new Grid(gridSize).setCellSize(this.findCellSize(gridSize));
    this.game = new this.currentGame(new GridView(grid), grid);

    this.game.initiate();
  }
}

window.platform = new Platform();
window.onload = function(){ platform.pickGame() }