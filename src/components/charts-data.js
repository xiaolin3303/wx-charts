import { getDataRange } from './charts-util'
import Util from '../util/util'
import { measureText, convertCoordinateOrigin, isInAngleRange } from './charts-util'

function dataCombine(series) {
    return series.reduce(function(a, b) {
        return (a.data ? a.data : a).concat(b.data);
    }, []);
}

export function getSeriesDataItem(series, index) {
    let data = [];
    series.forEach((item) => {
        if (item.data[index] !== null && typeof item.data[index] !== 'undefined') {
            let seriesItem = {};
            seriesItem.color = item.color;
            seriesItem.name = item.name;
            seriesItem.data = item.format ? item.format(item.data[index]) : item.data[index];
            data.push(seriesItem);
        }
    });

    return data;
}

export function getChartDataAreaBoundary (xAxisPoints) {
    return {
        leftBorder: xAxisPoints[0],
        rightBorder: xAxisPoints[xAxisPoints.length - 1]
    }
}

export function getMaxTextListLength(list) {
    let lengthList = list.map(item => measureText(item));
    return Math.max.apply(null, lengthList);
}

export function getRadarCoordinateSeries(length) {
    let eachAngle = 2 * Math.PI / length;
    let CoordinateSeries = [];
    for (let i = 0; i < length; i++) {
        CoordinateSeries.push(eachAngle * i);
    }

    return CoordinateSeries.map(item => -1 * item + Math.PI / 2);
}

export function getToolTipData(seriesData, calPoints, index, categories, option = {}) {
    let textList = seriesData.map(item => {
        return {
            text: option.format ? option.format(item, categories[index]) : `${item.name}: ${item.data}`,
            color: item.color
        }
    });
    let validCalPoints = [];
    let offset = {
        x: 0,
        y: 0
    };
    calPoints.forEach(points => {
        if (typeof points[index] !== 'undefined' && points[index] !== null) {
            validCalPoints.push(points[index]);
        }
    });
    validCalPoints.forEach(item => {
        offset.x = Math.round(item.x);
        offset.y += item.y;
    })

    offset.y /= validCalPoints.length;
    return { textList, offset };
}

export function findCurrentIndex (currentPoints, xAxisPoints, opts, config, offset = 0) {
    let currentIndex = -1;
    if (isInExactChartArea(currentPoints, opts, config)) {
        xAxisPoints.forEach((item, index) => {
            if (currentPoints.x + offset > item) {
                currentIndex = index;
            }
        });
    }

    return currentIndex;
}

export function isInExactChartArea (currentPoints, opts, config) {
    return currentPoints.x < opts.width - config.padding
        && currentPoints.x > config.padding + config.yAxisWidth + config.yAxisTitleWidth
        && currentPoints.y > config.padding
        && currentPoints.y < opts.height - config.legendHeight - config.xAxisHeight - config.padding
}

export function findRadarChartCurrentIndex (currentPoints, radarData, count) {
    let eachAngleArea = 2 * Math.PI / count;
    let currentIndex = -1;
    if (isInExactPieChartArea(currentPoints, radarData.center, radarData.radius)) {
        let angle = Math.atan2(radarData.center.y - currentPoints.y, currentPoints.x - radarData.center.x);
        angle =  -1 * angle;
        if (angle < 0) {
            angle += 2 * Math.PI;
        }

        function fixAngle (angle) {
            if (angle < 0) {
                angle += 2 * Math.PI;
            }
            if (angle > 2 * Math.PI) {
                angle -= 2 * Math.PI;
            }
            return angle;
        }
        let angleList = radarData.angleList.map(item => {
            item = fixAngle(-1 * item);

            return item;
        });

        angleList.forEach((item, index) => {
            let rangeStart = fixAngle(item - eachAngleArea / 2);
            let rangeEnd = fixAngle(item + eachAngleArea / 2);
            if (rangeEnd < rangeStart) {
                rangeEnd += 2 * Math.PI;
            }
            if ((angle >= rangeStart && angle <= rangeEnd)
                || (angle + 2 * Math.PI >= rangeStart && angle + 2 * Math.PI <= rangeEnd)) {
                currentIndex = index;
            }
        });
    }

    return currentIndex;
}

export function findPieChartCurrentIndex (currentPoints, pieData) {
    let currentIndex = -1;
    if (isInExactPieChartArea(currentPoints, pieData.center, pieData.radius)) {
        let angle = Math.atan2(pieData.center.y - currentPoints.y, currentPoints.x - pieData.center.x);
        angle = -angle;
        for (let i = 0, len = pieData.series.length; i < len; i++) {
            let item = pieData.series[i];
            if (isInAngleRange(angle, item._start_, item._start_ + item._proportion_ * 2 * Math.PI)) {
                currentIndex = i;
                break;
            }
        }
    }

    return currentIndex;
}

export function isInExactPieChartArea (currentPoints, center, radius) {
    return Math.pow(currentPoints.x - center.x, 2) + Math.pow(currentPoints.y - center.y, 2) <= Math.pow(radius, 2);
}

export function splitPoints(points) {
    let newPoints = [];
    let items = [];
    points.forEach((item, index) => {
        if (item !== null) {
            items.push(item);
        } else {
            if (items.length) {
                newPoints.push(items);
            }
            items = [];
        }
    });
    if (items.length) {
        newPoints.push(items);
    }

    return newPoints;
}

export function calLegendData(series, opts, config) {
    if (opts.legend === false) {
        return {
            legendList: [],
            legendHeight: 0
        }
    }
    let padding = 5;
    let marginTop = 8;
    let shapeWidth = 15;
    let legendList = [];
    let widthCount = 0;
    let currentRow = [];
    series.forEach((item) => {
        let itemWidth = 3 * padding + shapeWidth + measureText(item.name || 'undefined');
        if (widthCount + itemWidth > opts.width) {
            legendList.push(currentRow);
            widthCount = itemWidth;
            currentRow = [item];
        } else {
            widthCount += itemWidth;
            currentRow.push(item);
        }
    });
    if (currentRow.length) {
        legendList.push(currentRow);
    }

    return {
        legendList,
        legendHeight: legendList.length * (config.fontSize + marginTop) + padding
    }
}

export function calCategoriesData(categories, opts, config) {
    let result = {
        angle: 0,
        xAxisHeight: config.xAxisHeight
    };
    let { eachSpacing } = getXAxisPoints(categories, opts, config);

    // get max length of categories text
    let categoriesTextLenth = categories.map((item) => {
        return measureText(item);
    });

    let maxTextLength = Math.max.apply(this, categoriesTextLenth);

    if ( maxTextLength + 2 * config.xAxisTextPadding > eachSpacing) {
        result.angle = 45 * Math.PI / 180;
        result.xAxisHeight = 2 * config.xAxisTextPadding + maxTextLength * Math.sin(result.angle);
    }

    return result;
}

export function getRadarDataPoints(angleList, center, radius, series, opts, process = 1 ) {
    let radarOption = opts.extra.radar || {};
    radarOption.max = radarOption.max || 0;
    let maxData = Math.max(radarOption.max, Math.max.apply(null, dataCombine(series)));

    let data = [];
    series.forEach(each => {
        let listItem = {};
        listItem.color = each.color;
        listItem.data = [];
        each.data.forEach((item, index) => {
            let tmp = {};
            tmp.angle = angleList[index];

            tmp.proportion = item / maxData;
            tmp.position = convertCoordinateOrigin(radius * tmp.proportion * process * Math.cos(tmp.angle), radius * tmp.proportion * process * Math.sin(tmp.angle), center);
            listItem.data.push(tmp);
        });

        data.push(listItem);
    });

    return data;
}

export function getPieDataPoints(series, process = 1) {
    var count = 0;
    var _start_ = 0;
    series.forEach(function(item) {
        item.data = item.data === null ? 0 : item.data;
        count += item.data;
    });
    series.forEach(function(item) {
        item.data = item.data === null ? 0 : item.data;
        item._proportion_ = item.data / count * process;
    });
    series.forEach(function(item) {
        item._start_ = _start_;
        _start_ += 2 * item._proportion_ * Math.PI;
    });

    return series;
}

export function getPieTextMaxLength(series) {
    series = getPieDataPoints(series);
    let maxLength = 0;
    series.forEach((item) => {
        let text = item.format ? item.format(+item._proportion_.toFixed(2)) : `${Util.toFixed(item._proportion_ * 100)}%`;
        maxLength = Math.max(maxLength, measureText(text));
    });

    return maxLength;
}

export function fixColumeData(points, eachSpacing, columnLen, index, config, opts) {
    return points.map(function(item) {
        if (item === null) {
            return null;
        }
        item.width = (eachSpacing - 2 * config.columePadding) / columnLen;
        
        if (opts.extra.column && opts.extra.column.width && +opts.extra.column.width > 0) {
            // customer column width
            item.width = Math.min(item.width, +opts.extra.column.width);
        } else {
            // default width should less tran 25px
            // don't ask me why, I don't know
            item.width = Math.min(item.width, 25);
        }
        item.x += (index + 0.5 - (columnLen) / 2) * item.width;

        return item;
    });
}

export function getXAxisPoints(categories, opts, config) {
    let yAxisTotalWidth = config.yAxisWidth + config.yAxisTitleWidth;
    let spacingValid = opts.width - 2 * config.padding - yAxisTotalWidth;
    let dataCount = opts.enableScroll ? Math.min(5, categories.length) : categories.length;
    let eachSpacing = spacingValid / dataCount;

    let xAxisPoints = [];
    let startX = config.padding + yAxisTotalWidth;
    let endX = opts.width - config.padding;
    categories.forEach(function(item, index) {
        xAxisPoints.push(startX + index * eachSpacing);
    });
    if (opts.enableScroll === true) {
        xAxisPoints.push(startX + categories.length * eachSpacing);
    } else {    
        xAxisPoints.push(endX);
    }

    return { xAxisPoints, startX, endX, eachSpacing };
}

export function getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process = 1) {
    let points = [];
    let validHeight = opts.height - 2 * config.padding - config.xAxisHeight - config.legendHeight;
    data.forEach(function(item, index) {
        if (item === null) {
            points.push(null);
        } else {        
            let point = {};
            point.x = xAxisPoints[index] + Math.round(eachSpacing / 2);
            let height = validHeight * (item - minRange) / (maxRange - minRange);
            height *= process;
            point.y = opts.height - config.xAxisHeight - config.legendHeight - Math.round(height) - config.padding;
            points.push(point);
        }
    });

    return points;
}

export function getYAxisTextList(series, opts, config) {
    let data = dataCombine(series);
    // remove null from data
    data = data.filter((item) => {
        return item !== null;
    });
    let minData = Math.min.apply(this, data);
    let maxData = Math.max.apply(this, data);
    if (typeof opts.yAxis.min === 'number') {
        minData = Math.min(opts.yAxis.min, minData);
    }
    if (typeof opts.yAxis.max === 'number') {
        maxData = Math.max(opts.yAxis.max, maxData);
    }

    // fix issue https://github.com/xiaolin3303/wx-charts/issues/9
    if (minData === maxData) {
        let rangeSpan = maxData || 1;
        minData -= rangeSpan;
        maxData += rangeSpan;
    }

    let dataRange = getDataRange(minData, maxData);
    let minRange = dataRange.minRange;
    let maxRange = dataRange.maxRange;

    let range = [];
    let eachRange = (maxRange - minRange) / config.yAxisSplit;

    for (var i = 0; i <= config.yAxisSplit; i++) {
        range.push(minRange + eachRange * i);
    }
    return range.reverse();
}

export function calYAxisData(series, opts, config) {

    let ranges = getYAxisTextList(series, opts, config);
    let yAxisWidth = config.yAxisWidth;
    let rangesFormat = ranges.map(function(item) {
        item = Util.toFixed(item, 2);
        item = opts.yAxis.format ? opts.yAxis.format(Number(item)) : item;
        yAxisWidth = Math.max(yAxisWidth, measureText(item) + 5);
        return item;
    });
    if (opts.yAxis.disabled === true) {
        yAxisWidth = 0;
    }

    return { rangesFormat, ranges, yAxisWidth };
}