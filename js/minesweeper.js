Minesweeper = function(view, grid){
  this.view = view;
  this.grid = grid;
  var self = this;

  this.initiate = function(){
    var totalCells = this.grid.size * this.grid.size,
        cellsPlaced = 0;
    this.totalMines =  totalCells / 10
    this.grid.populate(function(){
      if(cellsPlaced < totalCells && (Math.random() * totalCells) < self.totalMines){
        return {mine: true, revealed: false}
      }else{
        return {mine: false, revealed: false}
      }
    })
    this.view.update(this.cellViewUpdate);
    this.view.hideAlert();
  }

  this.cellViewUpdate =  function(cell, element){
    if(cell.revealed){
      self.view.lightsOn(element);
    }else{
      self.view.lightsOff(element);
    }
  };
}