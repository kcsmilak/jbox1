
class AnimationRibbon {
    constructor(path, frameWidth) {
        this.image = null
        this.frame = 0
        this.frames = 0
        this.loaded = false
        this.frameImage = null
        this.load(path, frameWidth)
    }

    load(path, frameWidth) {
        this.loaded = false
        loadImage(path, image => { //p5
            this.image = image
            this.frame = 0
            this.frames = image.width / frameWidth
            //this.frameImage = createGraphics(frameWidth, frameHeight)
            this.loaded = true
        })
    }

    update() {
        this.frame = (this.frame + 1) % this.frames
    }

    draw(g, flip = false) {
        if (!this.loaded) return
        let frameSize = this.image.width / this.frames
        g.push() //p5
        if (flip) {
            g.translate(frameSize,0)
            g.scale(-1,1)
        }
        //scale(2)
        g.copy(this.image,this.frame * frameSize,0,frameSize,frameSize,0,0,frameSize,frameSize) //p5
        g.pop() //p5
    }
    
}

if (typeof(module) !== 'undefined') { module.exports = AnimationRibbon; }
