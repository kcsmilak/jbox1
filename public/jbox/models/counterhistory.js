

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

if (typeof(module) !== 'undefined') { module.exports = CounterHistory; }
