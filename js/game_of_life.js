GameOfLife = function(view, grid){
  this.view = view;
  this.grid = grid;
  var self = this;

  this.initiate = function(){
    this.grid.populate(function(){
      return {live: false, keepLiving: false}
    })
    this.view.update(this.cellViewUpdate);
    this.view.hideAlert();
    this.view.onCellClick(function(cell){
      self.seed(cell);
    })
    this.view.onCellSelect(function(cell){
      self.seed(cell);
    })
  }

  this.seed = function(cell){
    this.grid.update(cell.row, cell.col, function(cell){
      cell.live = !cell.live
      return cell
    })
    this.view.update(this.cellViewUpdate);
  };

  this.cellViewUpdate = function(cell, element){
    if(cell.live){
      self.view.lightsOn(element);
    }else{
      self.view.lightsOff(element);
    }
  }

  this.animate = function(interval){
    this.timer = setInterval(this.update, interval)
  }

  this.pause = function(){
    clearInterval(this.timer)
  }

  this.stop = function(){
    this.pause();
  }

  this.update = function(){
    self.updateWorld()
    self.view.update(self.cellViewUpdate);
  }

  this.updateWorld = function(){
    this.grid.eachCell(function(cell){
      self.updateCell(cell)
    })
    this.grid.eachCell(function(cell){
      cell.live = cell.keepLiving;
      cell.keepLiving = false;
    })
  }

  this.updateCell = function(givenCell){
    var liveNeighbours = this.grid.neighbours(givenCell).filter(function(neighbour){
      return neighbour.live
    }).length;
    this.grid.update(givenCell.row, givenCell.col, function(cell){
      if(cell.live && liveNeighbours < 2){ cell.keepLiving = false }
      if(cell.live && liveNeighbours >=2 && liveNeighbours <= 3){ cell.keepLiving = true }
      if(cell.live && liveNeighbours > 3){ cell.keepLiving = false }
      if(!cell.live && liveNeighbours === 3){ cell.keepLiving = true }
      return cell
    })
  }
}