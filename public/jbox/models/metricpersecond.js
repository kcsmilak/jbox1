








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

if (typeof(module) !== 'undefined') { module.exports = MetricPerSecond; }
