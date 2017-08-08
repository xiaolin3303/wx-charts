import { drawRadarDataPoints, drawCanvas, drawLegend, drawPieDataPoints, drawLineDataPoints, drawAreaDataPoints, drawColumnDataPoints, drawYAxis, drawXAxis, drawYAxisLine } from './draw'
import { calYAxisData, getPieTextMaxLength, calCategoriesData, calLegendData } from './charts-data'
import { fillSeriesColor } from './charts-util';
import Animation from './animation'

export default function drawCharts (type, opts, config, context) {
    let series = opts.series;
    let categories = opts.categories;
    series = fillSeriesColor(series, config);

    let { legendHeight } = calLegendData(series, opts, config);
    config.legendHeight = legendHeight;

    let { yAxisWidth } = calYAxisData(series, opts, config);
    config.yAxisWidth = yAxisWidth;
    if (categories && categories.length) {
        let { xAxisHeight, angle } = calCategoriesData(categories, opts, config);
        config.xAxisHeight = xAxisHeight;
        config._xAxisTextAngle_ = angle;
    }
    if (type === 'pie' || type === 'ring') {
        config._pieTextMaxLength_ = opts.dataLabel === false ? 0 : getPieTextMaxLength(series);
    }

    let duration = opts.animation ? 1000 : 0;
    this.animationInstance && this.animationInstance.stop();
    switch (type) {
        case 'line':
            this.animationInstance = new Animation({
                timing: 'easeIn',
                duration: duration,
                onProcess: (process) => {
                    if (opts.direction == 'vertical') {
                        context.translate(opts.height,0);
                        context.rotate(90 * Math.PI / 180);
                    }

                    drawXAxis(categories, opts, config, context);
                    drawYAxisLine(series, opts, config, context);
                    let { xAxisPoints, calPoints } = drawLineDataPoints(series, opts, config, context, process);
                    this.chartData.xAxisPoints = xAxisPoints;
                    this.chartData.calPoints = calPoints;

                    drawYAxis(series, opts, config, context);
                    drawLegend(opts.series, opts, config, context);
                    drawCanvas(opts, context);
                },
                onAnimationFinish: () => {
                    this.event.trigger('renderComplete');
                }
            });
            break;
        case 'column':
            this.animationInstance = new Animation({
                timing: 'easeIn',
                duration: duration,
                onProcess: (process) => {
                    drawYAxis(series, opts, config, context);
                    drawXAxis(categories, opts, config, context);
                    this.chartData.xAxisPoints = drawColumnDataPoints(series, opts, config, context, process);
                    drawLegend(opts.series, opts, config, context);
                    drawCanvas(opts, context);
                },
                onAnimationFinish: () => {
                    this.event.trigger('renderComplete');
                }
            });
            break;
        case 'area':
            this.animationInstance = new Animation({
                timing: 'easeIn',
                duration: duration,
                onProcess: (process) => {
                    drawYAxis(series, opts, config, context);
                    drawXAxis(categories, opts, config, context);
                    let { xAxisPoints, calPoints } = drawAreaDataPoints(series, opts, config, context, process);
                    this.chartData.xAxisPoints = xAxisPoints;
                    this.chartData.calPoints = calPoints;
                    drawLegend(opts.series, opts, config, context);
                    drawCanvas(opts, context);
                },
                onAnimationFinish: () => {
                    this.event.trigger('renderComplete');
                }
            });
            break;
        case 'ring':
        case 'pie':
            this.animationInstance = new Animation({
                timing: 'easeInOut',
                duration: duration,
                onProcess: (process) => {
                    this.chartData.pieData = drawPieDataPoints(series, opts, config, context, process);
                    drawLegend(opts.series, opts, config, context);
                    drawCanvas(opts, context);
                },
                onAnimationFinish: () => {
                    this.event.trigger('renderComplete');
                }
            });
            break;
        case 'radar':
            this.animationInstance = new Animation({
                timing: 'easeInOut',
                duration: duration,
                onProcess: (process) => {
                    this.chartData.radarData = drawRadarDataPoints(series, opts, config, context, process);
                    drawLegend(opts.series, opts, config, context);
                    drawCanvas(opts, context);
                },
                onAnimationFinish: () => {
                    this.event.trigger('renderComplete');
                }
            });
            break;
    }
}