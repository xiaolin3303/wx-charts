import Config from './config';
import { assign } from './util/polyfill/index';
import drawCharts from './components/draw-charts';
import Event from './util/event';

let Charts = function(opts) {
    opts.title = opts.title || {};
    opts.subtitle = opts.subtitle || {};
    opts.yAxis = opts.yAxis || {};
    opts.xAxis = opts.xAxis || {};
    opts.extra = opts.extra || {};
    opts.legend = opts.legend === false ? false : true;
    opts.animation = opts.animation === false ? false : true;
    let config = assign({}, Config);
    config.yAxisTitleWidth = opts.yAxis.disabled !== true && opts.yAxis.title ? config.yAxisTitleWidth : 0;
    config.pieChartLinePadding = opts.dataLabel === false ? 0 : config.pieChartLinePadding;
    config.pieChartTextPadding = opts.dataLabel === false ? 0 : config.pieChartTextPadding;

    this.opts = opts;
    this.config = config;
    this.context = wx.createCanvasContext(opts.canvasId);
    this.event = new Event();

    drawCharts.call(this, opts.type, opts, config, this.context);
}

Charts.prototype.updateData = function (data = {}) {
    this.opts.series = data.series || this.opts.series;
    this.opts.categories = data.categories || this.opts.categories;
    drawCharts.call(this, this.opts.type, this.opts, this.config, this.context);
}

Charts.prototype.stopAnimation = function () {
    this.animationInstance && this.animationInstance.stop();
}

Charts.prototype.addEventListener = function (type, listener) {
    this.event.addEventListener(type, listener);
}

export default Charts;