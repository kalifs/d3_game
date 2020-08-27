LightsOffGame = function(view, grid){
  this.view = view;
  this.grid = grid;
  var self = this;

  this.initiate = function(){
    this.grid.populate(function(){
      return {on: true}
    })
    this.view.update(this.cellViewUpdate);
    this.view.hideAlert();
    this.view.onCellClick(function(cell){
      self.update(cell);
    })
  }

  this.stop = function(){
    return true;
  }

  this.update = function(cell){
    this.updateCell(cell)
    this.view.update(this.cellViewUpdate);
    this.showVictoryAlert();
  };

  this.updateCell = function(cell){
    this.toggleCell(cell.row, cell.col)
    if(cell.col+1 < this.grid.size){ this.toggleCell(cell.row, cell.col+1) }
    if(cell.col-1 > -1){ this.toggleCell(cell.row, cell.col-1) }
    if(cell.row+1 < this.grid.size){ this.toggleCell(cell.row+1, cell.col) }
    if(cell.row-1 > -1){ this.toggleCell(cell.row-1, cell.col) }
  };

  this.cellViewUpdate = function(cell, element){
    if(cell.on){
      self.view.lightsOn(element);
    }else{
      self.view.lightsOff(element);
    }
  };

  this.toggleCell = function(rowIndex, colIndex){
    this.grid.update(rowIndex, colIndex, function(cell){
      cell.on = !cell.on
      return cell
    })
  }

  this.showVictoryAlert = function(){
    if(this.isVictory()){
      grid.cells.on("click", null)
      view.showAlert("Victory", "victory")
    }
  };

  this.isVictory = function(){
    var isOff = true;
    this.grid.eachCell(function(cell){
      if(cell.on){ isOff = false; }
    })
    return isOff;
  }
}