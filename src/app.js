import Config from './config';
import { assign } from './util/polyfill/index';
import drawCharts from './components/draw-charts'

let Charts = function(opts) {
    opts.yAxis = opts.yAxis || {};
    opts.xAxis = opts.xAxis || {};
    opts.legend = opts.legend === false ? false : true;
    opts.animation = opts.animation === false ? false : true;
    let config = assign({}, Config);
    config.legendHeight = opts.legend ? config.legendHeight : 0;
    config.yAxisTitleWidth = opts.yAxis.disabled !== true && opts.yAxis.title ? config.yAxisTitleWidth : 0;
    config.pieChartLinePadding = opts.dataLabel === false ? 0 : config.pieChartLinePadding;
    config.pieChartTextPadding = opts.dataLabel === false ? 0 : config.pieChartTextPadding;

    const context = wx.createCanvasContext(opts.canvasId);

    drawCharts(opts.type, opts, config, context);
}

export default Charts;