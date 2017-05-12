import Config from './config';
import { assign } from './util/polyfill/index';
import drawCharts from './components/draw-charts';
import Event from './util/event';
import { findCurrentIndex, findRadarChartCurrentIndex, findPieChartCurrentIndex, getSeriesDataItem, getToolTipData } from  './components/charts-data'

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
    // store calcuated chart data
    // such as chart point coordinate
    this.chartData = {};
    this.event = new Event();

    drawCharts.call(this, opts.type, opts, config, this.context);
}

Charts.prototype.updateData = function (data = {}) {
    this.opts.series = data.series || this.opts.series;
    this.opts.categories = data.categories || this.opts.categories;

    this.opts.title = assign({}, this.opts.title, data.title || {});
    this.opts.subtitle = assign({}, this.opts.subtitle, data.subtitle || {});

    drawCharts.call(this, this.opts.type, this.opts, this.config, this.context);
}

Charts.prototype.stopAnimation = function () {
    this.animationInstance && this.animationInstance.stop();
}

Charts.prototype.addEventListener = function (type, listener) {
    this.event.addEventListener(type, listener);
}

Charts.prototype.getCurrentDataIndex = function (e) {
    if (e.touches && e.touches.length) {
        let {x, y} = e.touches[0];
        if (this.opts.type === 'pie' || this.opts.type === 'ring') {
            return findPieChartCurrentIndex({ x, y }, this.chartData.pieData);
        } else if (this.opts.type === 'radar') {
            return findRadarChartCurrentIndex({ x, y }, this.chartData.radarData, this.opts.categories.length);
        } else {
            return findCurrentIndex({ x, y }, this.chartData.xAxisPoints, this.opts, this.config);
        }
    }
    return -1;
}

Charts.prototype.showToolTip = function (e, option = {}) {
    if (this.opts.type === 'line' || this.opts.type === 'area' || this.opts.type === 'column') {
        let index = this.getCurrentDataIndex(e);
        let opts = assign({}, this.opts, {animation: false});
        if (index > -1) {
            let seriesData = getSeriesDataItem(this.opts.series, index);
            if (seriesData.length === 0) {
                drawCharts.call(this, opts.type, opts, this.config, this.context);
            } else {        
                let { textList, offset } = getToolTipData(seriesData, this.chartData.calPoints, index);
                opts.tooltip = {
                    textList,
                    offset,
                    option
                };
                drawCharts.call(this, opts.type, opts, this.config, this.context);
            }
        } else {
            drawCharts.call(this, opts.type, opts, this.config, this.context);
        }
    }
}

export default Charts;