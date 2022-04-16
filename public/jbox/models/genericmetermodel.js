class GenericMeterModel {
    constructor(name) {
        this.history = new CounterHistory();
        this.meter = new MeterModel(this.history, name);
    }

    update(value) {
        this.history.addValue(value);
    }

    render(g, x = 0, y = 0) {
        this.meter.render(g, x, y);
    }

    setMaxValue(value) {
        this.history.maxValue = value;
    }
}