

class TileMap {
    constructor() {
        this.tileWidth = 0
        this.tileHeight = 0
        this.tileMapImage = null
        this.selectedPart = 0
        this.simpleCoordinates = true

        this.margin = 0

    }

    loadImage(tileMapImage, tileWidth, tileHeight) {
        this.tileMapImage = tileMapImage
        this.tileWidth = tileWidth
        this.tileHeight = tileHeight
        this.tilesWide = tileMapImage.width / tileWidth
        this.tilesHigh = tileMapImage.height / tileHeight
        console.log(`loaded: w:${this.tilesWide} h:${this.tilesHigh}`)
    }

    draw(g, x, y) {
        // draw the tile map (one tile at a time)
        //image(this.tileMapImage, x, y)


        // add outline an number to map

        let i = 0
        for (let ry = 0; ry < this.tilesHigh; ry += 1) {
            for (let rx = 0; rx < this.tilesWide; rx += 1) {

                if (this.simpleCoordinates)
                    i = rx + ry * 100 + 1
                else
                    i++

                this.drawPart(g, i, x + rx * this.tileWidth, y + ry * this.tileHeight)

                g.push()
                if (this.selectedPart == i) {
                    //g.fill(0, 0, 0, 255)
                    g.stroke('white')
                    

                } else {
                    g.stroke('black')
                    
                }
                g.fill(255, 255, 255, 0)
                g.rect(x + rx * this.tileWidth, y + ry * this.tileHeight, this.tileWidth, this.tileHeight) //p5
                g.pop() //p5

                g.push()
                g.textSize(7)
                g.fill(255, 255, 255)
                g.strokeWeight(0.2)
                g.stroke(255)
                g.text(`${i}`, x + rx * this.tileWidth + 1, y + ry * this.tileHeight + 7)
                g.pop()
            }
        }
    }

    drawPart(g, partNumber, x, y) {

        if (partNumber <= 0) return

        let margin = 0
        let padding = 0

        let sx = 0
        let sy = 0

        if (this.simpleCoordinates) {
            sx = margin + int((partNumber - 1) % 100) * (this.tileWidth + padding)
            sy = margin + int((partNumber - 1) / 100) * (this.tileHeight + padding)
        } else {
            sx = (partNumber % this.tilesWide) * this.tileWidth
            sy = int(partNumber / this.tilesWide) * this.tileHeight
        }
        g.image(this.tileMapImage, x, y, this.tileWidth, this.tileHeight, sx, sy, this.tileWidth, this.tileHeight)
    }

    drawSelectedPart(g, x, y) {
        this.drawPart(g, this.selectedPart, x, y)
    }

    mouseClicked(x, y) {
        if (x < 0 || y < 0) return
        if (x > this.tileMapImage.width || y > this.tileMapImage.height) return
        //console.log(`clicked in tileMap`)
        let col = int(x / this.tileMapImage.width * this.tilesWide)
        let row = int(y / this.tileMapImage.height * this.tilesHigh)

        if (this.simpleCoordinates)
            this.selectedPart = row * 100 + col + 1
        else
            this.selectedPart = row * this.tilesWide + col


        console.log(`x:${x} y:${y} w:${this.tileMapImage.width} h:${this.tileMapImage.height} r:${row} c:${col} s:${this.selectedPart}`)
    }


}

class TileMapSelector {
    constructor(tileMap) {
        this.tileMap = tileMap
    }

    draw(g, x, y) {
        this.tileMap.draw(g, x, y)
    }
}

if (typeof (module) !== 'undefined') { module.exports = TileMap; }
