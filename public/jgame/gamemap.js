if (typeof (module) !== 'undefined') { TileMap = require('./tilemap'); }
if (typeof (module) !== 'undefined') { request = require('request'); }


class GameMap {
    constructor() {
        this.mapData = []
        this.tileMap = new TileMap()

        this.tileMapLoaded = false
        this.gameDataLoaded = false
    }

    isLoaded() {
        return this.tileMapLoaded && this.gameDataLoaded
    }


    loadGameMapServerSide() {
        let mapData = this.mapData;

        let platformerKey =
            '1jbsapypHN5FX6k8K7Zs271bY8QSzSMiLkHFi2667nsU';
        let testKey =
            '1wVyI5wAqiorXbmbk-pqoiOcMSMfH-7BjIoVFWcSx-38';
        let mapKey = testKey;
        let url =
            'https://docs.google.com/spreadsheets/d/' + mapKey
            + '/gviz/tq?tqx=out:csv&sheet=live';

        request(url, { csv: true }, (err, res, body) => {
            if (err) { return console.log(err); }

            for (let row = 0; row < mapData.length; row++) {
                mapData[row].splice(0, mapData[row].length);
            }
            mapData.splice(0, mapData.length);

            //console.log(body);
            let data = body;

            // when the HTTP request completes, populate the variable that holds the
            // earthquake data used in the visualization.


            let csv = data;
            let rows = csv.split('\n');
            for (let row = 0; row < rows.length; row++) {
                let cols = rows[row].split(',');
                let datatopush = [];
                for (let col = 0; col < cols.length; col++) {
                    let val = cols[col]
                    //console.log(val)

                    if (val.includes('"')) {
                        val = Math.floor(cols[col].split('"')[1])
                    } else {
                        //console.log("updating...")
                        if (val > 0) val++
                    }
                    if (isNaN(val)) continue
                    datatopush.push(val);
                }
                mapData.push(datatopush);
            }
            console.table(mapData);

        });
    }


    loadGameMap() {
        let mapData = this.mapData;

        let platformerKey =
            '1jbsapypHN5FX6k8K7Zs271bY8QSzSMiLkHFi2667nsU';
        let testKey =
            '1wVyI5wAqiorXbmbk-pqoiOcMSMfH-7BjIoVFWcSx-38';
        let mapKey = testKey;
        let url =
            'https://docs.google.com/spreadsheets/d/' + mapKey
            + '/gviz/tq?tqx=out:csv&sheet=live';

        //url = "mapdata.csv"

        httpGet(url, csv => {
            for (let row = 0; row < mapData.length; row++) {
                mapData[row].splice(0, mapData[row].length);
            }
            mapData.splice(0, mapData.length);

            /*
            let rows = csv.split('\n');
            for (let row = 0; row < rows.length; row++) {
                let cols = rows[row].split(',');
                let datatopush = [];
                for (let col = 0; col < cols.length; col++) {
                    let val = cols[col]
                    //console.log(val)

                    if (val.includes('"')) {
                        val = int(cols[col].split('"')[1])
                    } else {
                        //console.log("updating...")
                        if (val > 0) val++
                    }
                    if (isNaN(val)) continue
                    datatopush.push(val);
                }
                mapData.push(datatopush);
            }
*/

            this.csvToMatrix(csv, mapData)
            //mapData.push(this.csvToMatrix(csv))
            console.table(mapData);
            //console.log(mapData)
            this.gameDataLoaded = true
        });


        let tilemapurl =
            'https://docs.google.com/spreadsheets/d/' + mapKey
            + '/gviz/tq?tqx=out:csv&sheet=tilemap';

        httpGet(tilemapurl, csv => {

            let data = []
            this.csvToMatrix(csv, data);

            console.log(data)
            
            let remoteImage = 'data:image/png;base64,' + data[0][0]
            let tileSize = data[1][0]
            loadImage(remoteImage, tileMapImage => {
                this.tileMapLoaded = true
                this.tileMap.loadImage(tileMapImage, tileSize, tileSize)
                //console.log('loaded')
            })
            
            /*
            let tileSize = Math.floor(csv.split('"')[3])

            this.tileSize = tileSize
            let remoteData = 'data:image/png;base64,' + csv.split('"')[1]
            loadImage(remoteData, tileMapImage => {
                this.tileMapLoaded = true
                this.tileMap.loadImage(tileMapImage, tileSize, tileSize)
                //console.log('loaded')
            })
*/
        });






    }

    csvToMatrix(csv, data) {

        let rows = csv.split('\n');
        for (let row = 0; row < rows.length; row++) {
            let cols = rows[row].split(',');
            let datatopush = [];
            for (let col = 0; col < cols.length; col++) {
                let val = cols[col]
                //console.log(val)

                if (val.includes('"')) {
                    val = cols[col].split('"')[1]
                    if (!isNaN(int(val))) val = int(val)
                } else {
                    //console.log("updating...")
                    //if (val > 0) val++
                }
                //if (isNaN(val)) continue
                datatopush.push(val);
            }
            data.push(datatopush);
        }
        return data
    }

    draw() {
        // draw gameMap
        //if (!this.isLoaded()) return
        let tileSize = this.tileSize
        for (let row = 0; row < this.mapData.length; row++) {
            for (let col = 0; col < this.mapData[row].length; col++) {
                let tilePart = this.mapData[row][col]
                if (tilePart >= 0) {
                    this.tileMap.drawPart(tilePart, col * tileSize, row * tileSize)
                }
            }
        }

    }

}

if (typeof (module) !== 'undefined') { module.exports = GameMap; }
