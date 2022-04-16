if (typeof(module) !== 'undefined') { MeterModel = require('./metermodel'); }
if (typeof(module) !== 'undefined') { CounterHistory = require('./counterhistory'); }


class FpsMeterModel {
    constructor() {
        this.history = new CounterHistory();
        this.meter = new MeterModel(this.history, "fps");
    }

    update(g) {
        this.history.addValue(g.frameRate());
    }

    render(g, x = 0, y = 0) {
        this.meter.render(g, x, y);
    }
}

if (typeof(module) !== 'undefined') { module.exports = FpsMeterModel; }
