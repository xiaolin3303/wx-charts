import Config from './config';
import { assign } from './util/polyfill/index';
import { drawCanvas, drawLegend } from './components/draw'
import drawCharts from './components/draw-charts'

let Charts = function(opts) {
    opts.yAxis = opts.yAxis || {};
    opts.legend = opts.legend === false ? false : true;
    let config = assign({}, Config);
    config.legendHeight = opts.legend ? 30 : 0;
    config.yAxisTitleWidth = opts.yAxis.title ? 30 : 0;    

	const context = wx.createContext();

    drawCharts(opts.type, opts, config, context);
    drawLegend(opts.series, opts, config, context)
    drawCanvas(opts, context);
}

export default Charts;