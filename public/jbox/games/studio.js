
class Studio extends Cartridge {
    constructor() {
        super()
        this.keyboard = new Keyboard()
        this.gameMap = new GameMap()

        this.showTileMap = false
        this.showGameMap = false
    }

    preload() {
        this.gameMap.loadGameMap()
    }

    processInput() {

    }
    
    update() {
        if (!this.gameMap.isLoaded()) return        
    }

    draw() {
        background(51); //p5
        if (!this.gameMap.isLoaded()) return

        this.gameMap.draw()

        if (this.showTileMap)
            this.gameMap.tileMap.draw(0,0)

        this.gameMap.tileMap.drawSelectedPart(0,0)
        
        debug.draw()
    }

    mousePressed(x,y) {
        if (this.showTileMap) {
            this.gameMap.tileMap.mouseClicked(x,y)
            return
        }

        let scriptkey = 'AKfycbwTh4x8aWvBrpyPae4T6OZPmcv1G0lXiSn8ll_xBHqeYlq8qvDvGHdeAOZpnZRg1CLy2g'
        let url = 'https://script.google.com/macros/s/' + scriptkey + '/exec?name=Test';

        
        let val = this.gameMap.tileMap.selectedPart
    
    
        //console.log(val)
    
        let rows = this.gameMap.mapData.length
        let cols = this.gameMap.mapData[0].length
    
        let tileSize = 16
    
        let mapWidth = tileSize * cols
        let mapHeight = tileSize * rows
    
        if (x < 0 || x > mapWidth) return
        if (y < 0 || y > mapHeight) return
        
        
        let col = int((x / ( tileSize * cols) ) * cols)
        let row = int((y / ( tileSize * rows) ) * rows)
    
        let cur = this.gameMap.mapData[row][col] 
        this.gameMap.mapData[row][col] = val
        let set = this.gameMap.mapData[row][col] 
    
        console.log(`row:${row} col:${col} x:${x} y:${y} rows:${rows} cols:${cols} cur:${cur} val:${val} set:${set}`)
    
       
        let postData = { x: col, y: row, val: val };
        console.log(postData)
        postData = JSON.stringify(postData)
    
        $.post( url, { postData}, function( data ) {}, "json"); //jquery        
    }

    keyPressed(keyCode) {
        console.log(keyCode)
        if (keyCode == 84) {
            console.log(`toggle map ${this.showTileMap}`)
            if (this.showTileMap)
                this.showTileMap = false
            else
                this.showTileMap = true
        }        
    }
}