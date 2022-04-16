


class GenericMeterModel {
  constructor(name) {
    this.history = new CounterHistory();
    this.meter = new MeterModel(this.history,name);
  }
  
  update(value) {
    this.history.addValue(value);
  }
  
  render(g, x=0,y=0) {
    this.meter.render(g, x,y);
  }
  
  setMaxValue(value) {
      this.history.maxValue = value;
  }
}

class FpsMeterModel {
  constructor() {
    this.history = new CounterHistory();
    this.meter = new MeterModel(this.history,"fps");
  }
  
  update(g) {
    this.history.addValue(g.frameRate());
  }
  
  render(g, x=0,y=0) {
    this.meter.render(g, x,y);
  }
}

class ServerUpdateMeterModel {
  constructor() {
      this.metric = new MetricPerSecond();
    this.history = new CounterHistory();
    this.meter = new MeterModel(this.history,"server");
  }
  
  update() {
    this.metric.addValue();
  }
  
  render(g, x=0,y=0) {
    this.history.addValue(this.metric.current());
    this.meter.render(g, x,y);
  }
}

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
        g.rect(0,0, width, height);

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

class CounterHistory {
    constructor() {
        this.size = 100;
        this.values = [];
        this.maxValue = 100;
        this.current = 0;
    }

    addValue(value) {
        this.current = value;

        this.values.push(value);
        if (this.values.length > this.size) {
            this.values.shift();
        }
    }

    average() {
        let total = 0;
        for (let i = 0; i < this.values.length; i++) {
            total += this.values[i];
        }
        return total / this.values.length;
    }

    valueAt(offset) {
        return this.values[this.values.length - offset];
    }
}

class MetricPerSecond {
    constructor() {
        this.values = [];
        this.maxSize = 100;
    }

    addValue() {
        this.values.push(Date.now());
        if (this.values.length > this.maxSize) this.values.shift();
    }

    current() {
        let count = 0;
        let currentTime = Date.now();
        let timeWindow = 1000;
        for (let i = 0; i <= this.values.length; i++) {
            let timestamp = this.values[i];
            if (currentTime - timestamp < timeWindow) {
                count++;
            }
        }
        return count;
    }


}