if (typeof(module) !== 'undefined') { MeterModel = require('./metermodel'); }
if (typeof(module) !== 'undefined') { CounterHistory = require('./counterhistory'); }
if (typeof(module) !== 'undefined') { MetricPerSecond = require('./metricpersecond'); }


class ServerUpdateMeterModel {
    constructor() {
        this.metric = new MetricPerSecond();
        this.history = new CounterHistory();
        this.meter = new MeterModel(this.history, "server");
    }

    update() {
        this.metric.addValue();
    }

    render(g, x = 0, y = 0) {
        this.history.addValue(this.metric.current());
        this.meter.render(g, x, y);
    }
}

if (typeof(module) !== 'undefined') { module.exports = ServerUpdateMeterModel; }
