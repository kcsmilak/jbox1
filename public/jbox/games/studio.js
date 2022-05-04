

class View {
    constructor(g) {
        this.g = g
        this.zoom = 0.25
        this.x = 0
        this.y = 0
        this.width = g.width
        this.height = g.height
    }

    draw(g) {
        this.x = g.width - this.width * this.zoom
        this.y = g.height - this.height * this.zoom
        g.image(this.g, this.x, this.y, this.width * this.zoom, this.height * this.zoom) //p5
    }

}

class TileSetView extends View {
    constructor(g, tileSet) {
        super(g)
        this.tileSet = tileSet
    }

    draw(g) {
        this.g.background(100)
        this.tileSet.draw(this.g, 0, 0)
        super.draw(g)
    }

    mouseClicked(x,y) {
        x = ( x - this.x ) / this.zoom
        y = ( y - this.y ) / this.zoom
        this.tileSet.mouseClicked(x, y)
    }
}


class Studio extends Cartridge {
    constructor() {
        super()
        this.keyboard = new Keyboard()
        this.gameMap = new GameMap()

        this.showTileMap = true
        this.showGameMap = true

        this.tileSetView = null
        this.tileMapView = null

    }

    preload() {
        this.gameMap.loadGameMap()
    }

    processInput() {

    }

    update() {
        if (!this.gameMap.isLoaded()) return
    }

    draw(g) {

        if (!this.tileSetView) {
            this.tileSetView = new TileSetView(g.createGraphics(700, 300), this.gameMap.tileMap)
        }

        g.background(51); //p5
        if (!this.gameMap.isLoaded()) return

        if (this.showGameMap) {
            this.gameMap.draw(g, 0, 0)
        }

        if (this.showTileMap) {

            this.tileSetView.draw(g)
        }

        this.gameMap.tileMap.drawSelectedPart(g, 0, 0)

        debug.draw()
    }

    mousePressed(x, y) {
        if (this.showTileMap) {
            this.tileSetView.mouseClicked(x,y)
            //this.gameMap.tileMap.mouseClicked(x, y)
            return
        }

        let scriptkey = 'AKfycbwTh4x8aWvBrpyPae4T6OZPmcv1G0lXiSn8ll_xBHqeYlq8qvDvGHdeAOZpnZRg1CLy2g'
        let url = 'https://script.google.com/macros/s/' + scriptkey + '/exec?name=Test';


        let val = this.gameMap.tileMap.selectedPart


        //console.log(val)

        let rows = this.gameMap.mapData.length
        let cols = this.gameMap.mapData[0].length

        let tileSize = 32

        let mapWidth = tileSize * cols
        let mapHeight = tileSize * rows

        if (x < 0 || x > mapWidth) return
        if (y < 0 || y > mapHeight) return


        let col = int((x / (tileSize * cols)) * cols)
        let row = int((y / (tileSize * rows)) * rows)

        let cur = this.gameMap.mapData[row][col]
        this.gameMap.mapData[row][col] = val
        let set = this.gameMap.mapData[row][col]

        console.log(`row:${row} col:${col} x:${x} y:${y} rows:${rows} cols:${cols} cur:${cur} val:${val} set:${set}`)


        let postData = { x: col, y: row, val: val };
        console.log(postData)
        postData = JSON.stringify(postData)

        $.post(url, { postData }, function(data) { }, "json"); //jquery        
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