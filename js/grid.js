
Grid = function Grid(size){
  this.size = size;
  this.data = [];
  this.cellSize = 10;

  this.populate = function(callback){
    var cell;
    for(var i=0;i<this.size;i++){
      row = [];
      for(var j=0;j<this.size;j++){
        cell = callback(i,j);
        cell.hasChanged = true;
        cell.row = i;
        cell.col = j;

        row.push(cell);
      }
      this.data.push(row);
    };
    return this;
  };

  this.setCellSize = function(newSize){
    this.cellSize = newSize;
    return this;
  };

  this.eachCell = function(callback){
    this.data.forEach(function(row){
      row.forEach(function(cell){
        callback.call(this, cell);
      })
    });
  };

  this.markAsChanged = function(rowIndex, colIndex){
    this.data[rowIndex][colIndex].hasChanged = false;
  };

  this.update = function(rowIndex, colIndex, updateFunction){
    var cell;
    cell = this.data[rowIndex][colIndex];
    if(cell && updateFunction){
      cell = updateFunction.call(this, cell)
      cell.hasChanged = true
    }
  }

  this.neighbours = function(cell){
    var neighbours = [], row = cell.row, col = cell.col;
    if(this.exist(row-1,col-1)){ neighbours.push(this.data[row-1][col-1]) }
    if(this.exist(row-1,col)){   neighbours.push(this.data[row-1][col  ]) }
    if(this.exist(row-1,col+1)){ neighbours.push(this.data[row-1][col+1]) }
    if(this.exist(row,col-1)){   neighbours.push(this.data[row  ][col-1]) }
    if(this.exist(row,col+1)){   neighbours.push(this.data[row  ][col+1]) }
    if(this.exist(row+1,col-1)){ neighbours.push(this.data[row+1][col-1]) }
    if(this.exist(row+1,col)){   neighbours.push(this.data[row+1][col  ]) }
    if(this.exist(row+1,col+1)){ neighbours.push(this.data[row+1][col+1]) }
    return neighbours;
  }

  this.exist = function(rowIndex, colIndex){
    return rowIndex >= 0 && rowIndex < this.size && colIndex >=0 && colIndex < this.size
  }
}