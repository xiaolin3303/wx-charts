import { drawPieDataPoints, drawLineDataPoints, drawAreaDataPoints, drawColumnDataPoints, drawYAxis, drawXAxis } from './draw'
import { calYAxisData } from './charts-data'
import { fillSeriesColor } from './charts-util';

export default function drawCharts (type, opts, config, context) {
	let series = opts.series;
	let categories = opts.categories;
    series = fillSeriesColor(series, config);

    let { yAxisWidth } = calYAxisData(series, opts, config);
    config.yAxisWidth = yAxisWidth;

    switch (type) {
        case 'line':
            drawYAxis(series, opts, config, context);
            drawXAxis(categories, opts, config, context);
            drawLineDataPoints(series, opts, config, context);
            break;
        case 'column':
            drawYAxis(series, opts, config, context);
            drawXAxis(categories, opts, config, context);
            drawColumnDataPoints(series, opts, config, context);
            break;
        case 'area':
            drawYAxis(series, opts, config, context);
            drawXAxis(categories, opts, config, context);
            drawAreaDataPoints(series, opts, config, context);
            break;
        case 'pie':
            drawPieDataPoints(series, opts, config, context);
            break;
    }
}