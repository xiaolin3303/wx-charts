import Config from './config';
import { assign } from './util/polyfill/index';
import drawCharts from './components/draw-charts';
import { drawYAxisLine, drawXAxis, drawLineDataPoints, drawYAxis, drawLegend, drawCanvas } from './components/draw';
import Event from './util/event';
import { findCurrentIndex, findRadarChartCurrentIndex, findPieChartCurrentIndex, getSeriesDataItem, getToolTipData, getXAxisPoints } from  './components/charts-data'

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

    this.offsetXY = {x:0,y:0};
    this.touchStartXY = {x:0,y:0};
    this.distance = 0;
    this.direction = typeof opts.direction == 'undefined' ? 'horizontal' : opts.direction; // 图表显示方向，默认为水平
    this.scrollEnable = typeof opts.scrollEnable == 'undefined' ? false : opts.scrollEnable; // 手指滑动显示更多默认是禁止的

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
            if (this.direction == 'vertical') {
                return findCurrentIndex({ x: y, y: x }, this.chartData.xAxisPoints, this.opts, this.config, this.distance);
            } else {
                return findCurrentIndex({ x: x, y: y }, this.chartData.xAxisPoints, this.opts, this.config, this.distance);
            }
        }
    }
    return -1;
}

Charts.prototype.showToolTip = function (e, option = {}) {
    if (this.opts.type === 'line' || this.opts.type === 'area') {
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

                if (this.scrollEnable) {
                    this.moveCharts.call(this, e, opts);
                } else {
                    drawCharts.call(this, opts.type, opts, this.config, this.context);
                }
            }
        } else {
            if (this.scrollEnable) {
                this.moveCharts.call(this, e, opts);
            } else {
                drawCharts.call(this, opts.type, opts, this.config, this.context);
            }
        }
    }
}

Charts.prototype.setTouchStart = function (e) {
    var touch = e.touches[0];
    this.touchStartXY.x = touch.x;
    this.touchStartXY.y = touch.y;
}

Charts.prototype.setOffset = function (e) {
    if (e.changedTouches && e.changedTouches[0]) {
        var touch = e.changedTouches[0],value;
        if (this.direction == 'horizontal') {
            value = touch.x - this.touchStartXY.x;
        } else {
            value = touch.y - this.touchStartXY.y;
        }

        if (this.disableLeftScroll || this.disableRightScroll) return; // 如果到达边界，则不计算
        if (this.direction == 'horizontal') {
            this.offsetXY.x += touch.x - this.touchStartXY.x;
            this.distance = this.offsetXY.x;
        } else {
            this.offsetXY.y += touch.y - this.touchStartXY.y;
            this.distance = this.offsetXY.y;
        }
    }
}

Charts.prototype.hasReachedLeft = function (categories, opts, config, distance) {
    let xAxisPoints = getXAxisPoints(categories, opts, config);
    return distance > 0 && -distance + config.yAxisWidth + config.yAxisTitleWidth + config.padding <= xAxisPoints.startX;
}

Charts.prototype.moveCharts = function (e,option) {
    if (!this.scrollEnable) return;
    if (e.touches && e.touches.length) {

        var touch = e.touches[0],
            opts = option ? assign(this.opts, option) : this.opts,
            config = this.config,
            series = opts.series,
            categories = opts.categories,
            context = this.context,
            moveDirection, // 判断滑动方向，向右为1，向左为-1
            distance, // 总共滑动距离
            moveDistance = this.direction == 'horizontal' ? touch.x - this.touchStartXY.x : touch.y - this.touchStartXY.y;

        if (moveDistance > 0) {
            moveDirection = 1;
        } else if (moveDistance < 0) {
            moveDirection = -1;
        } else {
            moveDirection = 0;
        }

        if ((this.disableLeftScroll && moveDirection == 1) || (this.disableRightScroll && moveDirection == -1)) {
            distance = 0;
            return;
        } else if (moveDirection == 0){
            distance = 0;
        } else {
            if (this.direction == 'horizontal') {
                distance = this.offsetXY.x + (touch.x - this.touchStartXY.x);
            } else {
                distance = this.offsetXY.y + (touch.y - this.touchStartXY.y);
            }
        }

        if (distance < 0) {
            this.disableRightScroll = true;
            return;
        } else if (moveDirection == 1 && this.hasReachedLeft(categories, opts, config, distance)) {
            this.disableLeftScroll = true;
            return;
        } else if (moveDirection != 0) {
            this.disableLeftScroll = false;
            this.disableRightScroll = false;
        }

        if (distance) {
            this.distance = distance;
        }

        if (this.direction == 'vertical') {
            context.translate(opts.height,0);
            context.rotate(90 * Math.PI / 180);
        }

        drawYAxisLine(series, opts, config, context);

        this.context.translate(this.distance,0);

        drawXAxis(categories, opts, config, context);
        drawLineDataPoints(series, opts, config, context);


        this.context.translate(-this.distance,0);
        drawYAxis(series, opts, config, context);
        drawLegend(opts.series, opts, config, context);

        drawCanvas(opts, context);
    }
}

export default Charts;
