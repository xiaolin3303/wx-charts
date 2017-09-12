import { getRadarDataPoints, getRadarCoordinateSeries, getMaxTextListLength, splitPoints, getPieDataPoints, calYAxisData, getXAxisPoints, getDataPoints, fixColumeData, calLegendData } from './charts-data'
import { convertCoordinateOrigin, measureText, calRotateTranslate, createCurveControlPoints } from './charts-util'
import Util from '../util/util'
import drawPointShape from './draw-data-shape'
import { drawPointText, drawPieText, drawRingTitle, drawRadarLabel } from './draw-data-text'
import { drawToolTip, drawToolTipSplitLine } from './draw-tooltip'
import { assign } from '../util/polyfill/index';

function drawYAxisTitle (title, opts, config, context) {
    let startX = config.xAxisHeight + (opts.height - config.xAxisHeight - measureText(title)) / 2;
    context.save();
    context.beginPath();
    context.setFontSize(config.fontSize);
    context.setFillStyle(opts.yAxis.titleFontColor || '#333333');
    context.translate(0, opts.height);
    context.rotate(-90 * Math.PI / 180);
    context.fillText(title, startX, config.padding + 0.5 * config.fontSize);
    context.stroke();
    context.closePath();
    context.restore();
}

export function drawColumnDataPoints (series, opts, config, context, process = 1) {
    let { ranges } = calYAxisData(series, opts, config);
    let { xAxisPoints, eachSpacing } = getXAxisPoints(opts.categories, opts, config);
    let minRange = ranges.pop();
    let maxRange = ranges.shift();
    let endY = opts.height - config.padding - config.xAxisHeight - config.legendHeight;

    context.save();
    if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {    
        context.translate(opts._scrollDistance_, 0);
    }

    series.forEach(function(eachSeries, seriesIndex) {
        let data = eachSeries.data;
        let points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
        points = fixColumeData(points, eachSpacing, series.length, seriesIndex, config, opts);

        // 绘制柱状数据图
        context.beginPath();
        context.setFillStyle(eachSeries.color);
        points.forEach(function(item, index) {
            if (item !== null) { 
                let startX = item.x - item.width / 2 + 1;
                let height = opts.height - item.y - config.padding - config.xAxisHeight - config.legendHeight;
                context.moveTo(startX, item.y);
                context.rect(startX, item.y, item.width - 2, height);
            }
        });
        context.closePath();
        context.fill();
    });
    series.forEach(function(eachSeries, seriesIndex) {
        let data = eachSeries.data;
        let points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
        points = fixColumeData(points, eachSpacing, series.length, seriesIndex, config, opts);
        if (opts.dataLabel !== false && process === 1) {
            drawPointText(points, eachSeries, config, context);
        }
    });
    context.restore();
    return {
        xAxisPoints,
        eachSpacing
    }
}

export function drawAreaDataPoints (series, opts, config, context, process = 1) {
    let { ranges } = calYAxisData(series, opts, config);
    let { xAxisPoints, eachSpacing } = getXAxisPoints(opts.categories, opts, config);
    let minRange = ranges.pop();
    let maxRange = ranges.shift();
    let endY = opts.height - config.padding - config.xAxisHeight - config.legendHeight;
    let calPoints = [];

    context.save();
    if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {    
        context.translate(opts._scrollDistance_, 0);
    }


    if (opts.tooltip && opts.tooltip.textList && opts.tooltip.textList.length && process === 1) {
        drawToolTipSplitLine(opts.tooltip.offset.x, opts, config, context);
    }

    series.forEach(function(eachSeries, seriesIndex) {
        let data = eachSeries.data;
        let points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
        calPoints.push(points);

        let splitPointList = splitPoints(points);

        splitPointList.forEach((points) => {
            // 绘制区域数据
            context.beginPath();
            context.setStrokeStyle(eachSeries.color);
            context.setFillStyle(eachSeries.color);
            context.setGlobalAlpha(0.6);
            context.setLineWidth(2);
            if (points.length > 1) {
                let firstPoint = points[0];
                let lastPoint = points[points.length - 1];
                
                context.moveTo(firstPoint.x, firstPoint.y);
                if (opts.extra.lineStyle === 'curve') {
                    points.forEach(function(item, index) {
                        if (index > 0) {
                            let ctrlPoint = createCurveControlPoints(points, index - 1);
                            context.bezierCurveTo(ctrlPoint.ctrA.x, ctrlPoint.ctrA.y, ctrlPoint.ctrB.x,ctrlPoint.ctrB.y, item.x, item.y);
                        }
                    });
                } else {
                    points.forEach(function(item, index) {
                        if (index > 0) {
                            context.lineTo(item.x, item.y);
                        }
                    });
                }

                context.lineTo(lastPoint.x, endY);
                context.lineTo(firstPoint.x, endY);
                context.lineTo(firstPoint.x, firstPoint.y);
            } else {
                let item = points[0];
                context.moveTo(item.x - eachSpacing / 2, item.y);
                context.lineTo(item.x + eachSpacing / 2, item.y);
                context.lineTo(item.x + eachSpacing / 2, endY);
                context.lineTo(item.x - eachSpacing / 2, endY);
                context.moveTo(item.x - eachSpacing / 2, item.y);
            }
            context.closePath();
            context.fill();
            context.setGlobalAlpha(1);
        });

        if (opts.dataPointShape !== false) {          
            let shape = config.dataPointShape[seriesIndex % config.dataPointShape.length];
            drawPointShape(points, eachSeries.color, shape, context);
        }
    });
    if (opts.dataLabel !== false && process === 1) {
        series.forEach(function(eachSeries, seriesIndex) {
            let data = eachSeries.data;
            let points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
            drawPointText(points, eachSeries, config, context);
        });
    }

    context.restore();

    return {
        xAxisPoints,
        calPoints,
        eachSpacing
    };
}

export function drawLineDataPoints (series, opts, config, context, process = 1) {
    let { ranges } = calYAxisData(series, opts, config);
    let { xAxisPoints, eachSpacing } = getXAxisPoints(opts.categories, opts, config);
    let minRange = ranges.pop();
    let maxRange = ranges.shift();
    let calPoints = [];

    context.save();
    if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {    
        context.translate(opts._scrollDistance_, 0);
    }

    if (opts.tooltip && opts.tooltip.textList && opts.tooltip.textList.length && process === 1) {
        drawToolTipSplitLine(opts.tooltip.offset.x, opts, config, context);
    }


    series.forEach(function(eachSeries, seriesIndex) {
        let data = eachSeries.data;
        let points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
        calPoints.push(points);
        let splitPointList = splitPoints(points);

        splitPointList.forEach((points, index) => {
            context.beginPath();
            context.setStrokeStyle(eachSeries.color);
            context.setLineWidth(2);
            if (points.length === 1) {
                context.moveTo(points[0].x, points[0].y);
                context.arc(points[0].x, points[0].y, 1, 0, 2 * Math.PI);
            } else {
                context.moveTo(points[0].x, points[0].y);
                if (opts.extra.lineStyle === 'curve') {
                    points.forEach(function(item, index) {
                        if (index > 0) {
                            let ctrlPoint = createCurveControlPoints(points, index - 1);
                            context.bezierCurveTo(ctrlPoint.ctrA.x, ctrlPoint.ctrA.y, ctrlPoint.ctrB.x,ctrlPoint.ctrB.y, item.x, item.y);
                        }
                    });
                } else {
                    points.forEach(function(item, index) {
                        if (index > 0) {
                            context.lineTo(item.x, item.y);
                        }
                    });
                }
                context.moveTo(points[0].x, points[0].y);
            }
            context.closePath();
            context.stroke();
        });

        if (opts.dataPointShape !== false) {        
            let shape = config.dataPointShape[seriesIndex % config.dataPointShape.length];
            drawPointShape(points, eachSeries.color, shape, context);
        }
    });
    if (opts.dataLabel !== false && process === 1) {
        series.forEach(function(eachSeries, seriesIndex) {
            let data = eachSeries.data;
            let points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
            drawPointText(points, eachSeries, config, context);
        });
    }

    context.restore();
    
    return {
        xAxisPoints,
        calPoints,
        eachSpacing
    };
}

export function drawToolTipBridge (opts, config, context, process) {
    context.save();
    if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {    
        context.translate(opts._scrollDistance_, 0);
    }    
    if (opts.tooltip && opts.tooltip.textList && opts.tooltip.textList.length && process === 1) {
        drawToolTip(opts.tooltip.textList, opts.tooltip.offset, opts, config, context);
    }
    context.restore();
}

export function drawXAxis (categories, opts, config, context) {
    let { xAxisPoints, startX, endX, eachSpacing } = getXAxisPoints(categories, opts, config);
    let startY = opts.height - config.padding - config.xAxisHeight - config.legendHeight;
    let endY = startY + config.xAxisLineHeight;

    context.save();
    if (opts._scrollDistance_ && opts._scrollDistance_ !== 0) {
        context.translate(opts._scrollDistance_, 0);
    }

    context.beginPath();
    context.setStrokeStyle(opts.xAxis.gridColor || "#cccccc");

    if (opts.xAxis.disableGrid !== true) {
        if (opts.xAxis.type === 'calibration') {
            xAxisPoints.forEach(function(item, index) {
                if (index > 0) {                
                    context.moveTo(item - eachSpacing / 2, startY);
                    context.lineTo(item - eachSpacing / 2, startY + 4);
                }
            });
        } else {
            xAxisPoints.forEach(function(item, index) {
                context.moveTo(item, startY);
                context.lineTo(item, endY);
            });
        }
    }
    context.closePath();
    context.stroke();

    // 对X轴列表做抽稀处理
    let validWidth = opts.width - 2 * config.padding - config.yAxisWidth - config.yAxisTitleWidth;
    let maxXAxisListLength = Math.min(categories.length, Math.ceil(validWidth / config.fontSize / 1.5));
    let ratio = Math.ceil(categories.length / maxXAxisListLength);

    categories = categories.map((item, index) => {
        return index % ratio !== 0 ? '' : item;
    });

    if (config._xAxisTextAngle_ === 0) {
        context.beginPath();
        context.setFontSize(config.fontSize);
        context.setFillStyle(opts.xAxis.fontColor || '#666666');
        categories.forEach(function(item, index) {
            let offset = eachSpacing / 2 - measureText(item) / 2;
            context.fillText(item, xAxisPoints[index] + offset, startY + config.fontSize + 5);
        });
        context.closePath();
        context.stroke();
    } else {
        categories.forEach(function(item, index) {
            context.save();
            context.beginPath();
            context.setFontSize(config.fontSize);
            context.setFillStyle(opts.xAxis.fontColor || '#666666');
            let textWidth = measureText(item);
            let offset = eachSpacing / 2 - textWidth;
            let { transX, transY }  = calRotateTranslate(xAxisPoints[index] + eachSpacing / 2, startY + config.fontSize / 2 + 5, opts.height);
            context.rotate(-1 * config._xAxisTextAngle_);
            context.translate(transX, transY);
            context.fillText(item, xAxisPoints[index] + offset, startY + config.fontSize + 5);
            context.closePath();
            context.stroke();
            context.restore();
        });
    }

    context.restore();
}

export function drawYAxisGrid (opts, config, context) {
    let spacingValid = opts.height - 2 * config.padding - config.xAxisHeight - config.legendHeight;    
    let eachSpacing = Math.floor(spacingValid / config.yAxisSplit);
    let yAxisTotalWidth = config.yAxisWidth + config.yAxisTitleWidth;    
    let startX = config.padding + yAxisTotalWidth;
    let endX = opts.width - config.padding;

    let points = [];
    for (let i = 0; i < config.yAxisSplit; i++) {
        points.push(config.padding + eachSpacing * i);
    }
    points.push(config.padding + eachSpacing * config.yAxisSplit + 2);

    context.beginPath();
    context.setStrokeStyle(opts.yAxis.gridColor || "#cccccc")
    context.setLineWidth(1);
    points.forEach(function(item, index) {
        context.moveTo(startX, item);
        context.lineTo(endX, item);
    });
    context.closePath();
    context.stroke();
}
 
export function drawYAxis (series, opts, config, context) {
    if (opts.yAxis.disabled === true) {
        return;
    }
    let { rangesFormat } = calYAxisData(series, opts, config);
    let yAxisTotalWidth = config.yAxisWidth + config.yAxisTitleWidth;

    let spacingValid = opts.height - 2 * config.padding - config.xAxisHeight - config.legendHeight;
    let eachSpacing = Math.floor(spacingValid / config.yAxisSplit);
    let startX = config.padding + yAxisTotalWidth;
    let endX = opts.width - config.padding;
    let startY = config.padding;
    let endY = opts.height - config.padding - config.xAxisHeight - config.legendHeight;

    // set YAxis background
    context.setFillStyle(opts.background || '#ffffff');
    if (opts._scrollDistance_ < 0) {    
        context.fillRect(0, 0, startX, endY + config.xAxisHeight + 5);
    }
    context.fillRect(endX, 0, opts.width, endY + config.xAxisHeight + 5);

    let points = [];
    for (let i = 0; i <= config.yAxisSplit; i++) {
        points.push(config.padding + eachSpacing * i);
    }

    context.stroke();
    context.beginPath();
    context.setFontSize(config.fontSize);
    context.setFillStyle(opts.yAxis.fontColor || '#666666')
    rangesFormat.forEach(function(item, index) {
        let pos = points[index] ? points[index] : endY;
        context.fillText(item, config.padding + config.yAxisTitleWidth, pos + config.fontSize / 2);
    });
    context.closePath();
    context.stroke();

    if (opts.yAxis.title) {  
        drawYAxisTitle(opts.yAxis.title, opts, config, context);
    }
}

export function drawLegend (series, opts, config, context) {
    if (!opts.legend) {
        return;
    }
    // each legend shape width 15px
    // the spacing between shape and text in each legend is the `padding`
    // each legend spacing is the `padding`
    // legend margin top `config.padding`
    let { legendList, legendHeight } = calLegendData(series, opts, config);
    let padding = 5;
    let marginTop = 8;
    let shapeWidth = 15;
    legendList.forEach((itemList, listIndex) => {
        let width = 0;
        itemList.forEach(function (item) {
            item.name = item.name || 'undefined';
            width += 3 * padding + measureText(item.name) + shapeWidth;
        });
        let startX = (opts.width - width) / 2 + padding;
        let startY = opts.height - config.padding - config.legendHeight + listIndex * (config.fontSize + marginTop) + padding + marginTop;

        context.setFontSize(config.fontSize);
        itemList.forEach(function (item) {
            switch (opts.type) {
                case 'line':
                    context.beginPath();
                    context.setLineWidth(1);
                    context.setStrokeStyle(item.color);
                    context.moveTo(startX - 2, startY + 5);
                    context.lineTo(startX + 17, startY + 5);
                    context.stroke();
                    context.closePath();
                    context.beginPath();
                    context.setLineWidth(1);
                    context.setStrokeStyle('#ffffff');
                    context.setFillStyle(item.color);
                    context.moveTo(startX + 7.5, startY + 5);
                    context.arc(startX + 7.5, startY + 5, 4, 0, 2 * Math.PI);
                    context.fill();
                    context.stroke();
                    context.closePath();
                    break;
                case 'pie':
                case 'ring':
                    context.beginPath();
                    context.setFillStyle(item.color);
                    context.moveTo(startX + 7.5, startY + 5);
                    context.arc(startX + 7.5, startY + 5, 7, 0, 2 * Math.PI);
                    context.closePath();
                    context.fill();
                    break;
                default:
                    context.beginPath();
                    context.setFillStyle(item.color);
                    context.moveTo(startX, startY);
                    context.rect(startX, startY, 15, 10);
                    context.closePath();
                    context.fill();
            }
            startX += padding + shapeWidth;
            context.beginPath();
            context.setFillStyle(opts.extra.legendTextColor || '#333333');
            context.fillText(item.name, startX, startY + 9);
            context.closePath();
            context.stroke();
            startX += measureText(item.name) + 2 * padding; 
        });
    });
}
export function drawPieDataPoints (series, opts, config, context, process = 1) {
    let pieOption = opts.extra.pie || {};
    series = getPieDataPoints(series, process);
    let centerPosition = {
        x: opts.width / 2,
        y: (opts.height - config.legendHeight) / 2
    }
    let radius = Math.min(
        centerPosition.x - config.pieChartLinePadding - config.pieChartTextPadding - config._pieTextMaxLength_,
        centerPosition.y - config.pieChartLinePadding - config.pieChartTextPadding
    );
    if (opts.dataLabel) {
        radius -= 10;
    } else {
        radius -= 2 * config.padding;
    }
    series = series.map((eachSeries) => {
        eachSeries._start_ += (pieOption.offsetAngle || 0) * Math.PI / 180;
        return eachSeries;
    });
    series.forEach(function(eachSeries) {
        context.beginPath();
        context.setLineWidth(2);
        context.setStrokeStyle('#ffffff');
        context.setFillStyle(eachSeries.color);
        context.moveTo(centerPosition.x, centerPosition.y);
        context.arc(centerPosition.x, centerPosition.y, radius, eachSeries._start_, eachSeries._start_ + 2 * eachSeries._proportion_ * Math.PI);
        context.closePath();
        context.fill();
        if (opts.disablePieStroke !== true) {        
            context.stroke();
        }
    });

    if (opts.type === 'ring') {
        let innerPieWidth = radius * 0.6;
        if (typeof opts.extra.ringWidth === 'number' && opts.extra.ringWidth > 0) {
            innerPieWidth = Math.max(0, radius - opts.extra.ringWidth);
        }
        context.beginPath();
        context.setFillStyle(opts.background || '#ffffff');
        context.moveTo(centerPosition.x, centerPosition.y);
        context.arc(centerPosition.x, centerPosition.y, innerPieWidth, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
    }

    if (opts.dataLabel !== false && process === 1) {
        // fix https://github.com/xiaolin3303/wx-charts/issues/132
        let valid = false;
        for (let i = 0, len = series.length; i < len; i++) {
            if (series[i].data > 0) {
                valid = true;
                break;
            }
        }

        if (valid) {
            drawPieText(series, opts, config, context, radius, centerPosition);
        }
    }

    if (process === 1 && opts.type === 'ring') {
        drawRingTitle(opts, config, context);
    }

    return {
        center: centerPosition,
        radius,
        series
    }
}

export function drawRadarDataPoints (series, opts, config, context, process = 1) {
    let radarOption = opts.extra.radar || {};    
    let coordinateAngle = getRadarCoordinateSeries(opts.categories.length);
    let centerPosition = {
        x: opts.width / 2,
        y: (opts.height - config.legendHeight) / 2
    }

    let radius = Math.min(
        centerPosition.x - (getMaxTextListLength(opts.categories) + config.radarLabelTextMargin),
        centerPosition.y - config.radarLabelTextMargin
    );

    radius -= config.padding;

    // draw grid
    context.beginPath();
    context.setLineWidth(1);
    context.setStrokeStyle(radarOption.gridColor || "#cccccc");
    coordinateAngle.forEach(angle => {
        let pos = convertCoordinateOrigin(radius * Math.cos(angle), radius * Math.sin(angle), centerPosition);
        context.moveTo(centerPosition.x, centerPosition.y);
        context.lineTo(pos.x, pos.y);
    });
    context.stroke();
    context.closePath();

    // draw split line grid
    for (let i = 1; i <= config.radarGridCount; i++) {
        let startPos = {};
        context.beginPath();
        context.setLineWidth(1);
        context.setStrokeStyle(radarOption.gridColor || "#cccccc");
        coordinateAngle.forEach((angle, index) => {
            let pos = convertCoordinateOrigin(radius / config.radarGridCount * i * Math.cos(angle), radius / config.radarGridCount * i * Math.sin(angle), centerPosition);
            if (index === 0) {
                startPos = pos;
                context.moveTo(pos.x, pos.y);
            } else {            
                context.lineTo(pos.x, pos.y);
            }
        });
        context.lineTo(startPos.x, startPos.y);
        context.stroke();
        context.closePath();
    }

    let radarDataPoints = getRadarDataPoints(coordinateAngle, centerPosition, radius, series, opts, process);
    radarDataPoints.forEach((eachSeries, seriesIndex) => {
        // 绘制区域数据
        context.beginPath();
        context.setFillStyle(eachSeries.color);
        context.setGlobalAlpha(0.6);
        eachSeries.data.forEach((item, index) => {
            if (index === 0) {            
                context.moveTo(item.position.x, item.position.y);
            } else {
                context.lineTo(item.position.x, item.position.y);
            }
        });
        context.closePath();
        context.fill();
        context.setGlobalAlpha(1);

        if (opts.dataPointShape !== false) {        
            let shape = config.dataPointShape[seriesIndex % config.dataPointShape.length];
            let points = eachSeries.data.map(item => {
                return item.position;
            });
            drawPointShape(points, eachSeries.color, shape, context);
        }
    });
    // draw label text
    drawRadarLabel(coordinateAngle, radius, centerPosition, opts, config, context);

    return {
        center: centerPosition,
        radius,
        angleList: coordinateAngle
    }
}

export function drawCanvas (opts, context) {
    context.draw();
}