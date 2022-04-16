

class MeterModel {
    constructor(counter, title = "", width = 200, height = 100) {
        this.title = title;
        this.counter = counter;
        this.backgroundColor = [100, 100, 100, 100];
        this.foregroundColor = [255, 0, 0, 100];

        this.textColor = [200];

        this.width = width;
        this.height = height;

        this.stroke = true;

        //this.g = canvas.createGraphics(this.width, this.height);

    }

    render(g, x = 0, y = 0) {
        g.push();
        g.translate(x, y);

        let width = this.width;
        let height = this.height;

        //g.noStroke();
        g.fill(this.backgroundColor);
        g.rect(0, 0, width, height);

        g.fill(this.foregroundColor);
        if (!this.stroke) g.noStroke();
        let xstep = width / this.counter.size;
        let ystep = height / this.counter.maxValue;
        for (let i = 0; i < this.counter.size; i++) {
            let value = this.counter.valueAt(i);
            g.rect(width - i * xstep, height - value * ystep, xstep, value * ystep);

        }

        g.fill(this.textColor);
        let textSize = height / 2;
        let textMargin = height / 20;
        g.textSize(textSize);
        g.textAlign(LEFT, TOP);
        g.text(this.title, textMargin, textMargin);
        g.text(`${this.counter.average().toFixed(0)}`, textMargin, textSize + textMargin);
        g.pop();
    }
}

if (typeof(module) !== 'undefined') { module.exports = MeterModel; }
