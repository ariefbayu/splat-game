var logic = {
	_rowCount: 10,
	_cellCount: 10,
	cellData: [],
	completed: false,
	step: 0,
	colors: ["red", "green", "blue", "yellow", "gold", "aqua"],
	initialize: function(rowSize, cellSize){
		this._rowCount = rowSize;
		this._cellCount = cellSize;
		this.cellData = [];
		this.cellData = new Array(rowSize);
		this.completed = false;
		this.step = 0;
		for(row = 0; row < this._rowCount; row++){
			this.cellData[row] = new Array(cellSize);
			for(cell = 0; cell < this._cellCount; cell++){
				this.cellData[row][cell] = Math.floor( Math.random() * this.colors.length );
			}
		}
	},
	getColorAt: function(row, cell){
		return this.colors[ this.cellData[row][cell] ];
	},
	paint: function(colorIdx){
        if(this.completed) return false;
        var currentColor = this.cellData[0][0];
        if(currentColor == colorIdx) return false;

        this.floodFill(0, 0, currentColor, colorIdx);

        this.completed = this.checkBoard(colorIdx);
        if(!this.completed){
            this.step++;
        } else {
			console.log("done!");
        }
    },
    floodFill: function(row, cell, fromColor, toColor){
		if(row >= this._rowCount || row < 0) return false;
        if(cell >= this._cellCount || cell < 0) return false;

        var currentColor = this.cellData[row][cell];
        if(currentColor != fromColor) return false;

        this.cellData[row][cell] = toColor;

        this.floodFill(row, cell-1, fromColor, toColor);
        this.floodFill(row, cell+1, fromColor, toColor);
        this.floodFill(row-1, cell, fromColor, toColor);
        this.floodFill(row+1, cell, fromColor, toColor);
    },
    checkBoard: function(color){
		for(var rowCounter = 0; rowCounter < this._rowCount; rowCounter++){
            for(var cellCounter = 0; cellCounter < this._cellCount; cellCounter++){
                var currentColor = this.cellData[rowCounter][cellCounter];
                if(currentColor != color) return false;
            }
        }
        return true;
    }
}
