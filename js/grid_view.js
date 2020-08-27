GridView = function(grid){
  this.grid = grid;
  this.cells = null;
  var self = this;

  this.update = function(changeCallback){
    var tr = d3.select("table").selectAll("tr").data(grid.data)
    tr.enter().append("tr")
    this.cells = tr.selectAll("td").data(function(d,i){ return d })
    updates = this.cells.enter();
    updates.append("td").style("width", grid.cellSize + "px").style("height", grid.cellSize + "px");

    changed = this.cells.filter(function(cellData){ return cellData.hasChanged; })

    changed.each(function(cell){
      changeCallback.call(null, cell, this);
      self.grid.markAsChanged(cell.row, cell.col)
    })

    tr.exit().remove();
    this.cells.exit().remove();
    return this;
  };

  this.showAlert = function(message, className){
    var classes = {}
    classes[className] = true
    d3.select("table").selectAll("p").data([message]).enter()
      .append("p").text(function(d){ return d} )
      .style({"top": (grid.size-1)/2*grid.cellSize + "px"})
      .classed(classes)
  };

  this.hideAlert = function(){
    d3.select("table").selectAll("p").data([]).exit().remove();
  }

  this.onCellClick = function(callback){
    var self = this;
    this.cells.on("click", function(data){
      callback.call(self, data);
    })
  };

  this.onCellSelect = function(callback){
    var active = false, prevCell = null;
    this.cells.on("mousedown", function(data){
      active = true
    });
    this.cells.on("mousemove", function(data){
      if(active){
        callback.call(self, data)
      }
    })
    this.cells.on("mouseup", function(data){
      active = false;
    })
  }

  this.lightsOn = function(element){
    d3.select(element).transition().style("background-color", "#CCE359")
  };

  this.lightsOff = function(element){
    d3.select(element).interrupt().transition().style("background-color", "#44415E")
  }
}