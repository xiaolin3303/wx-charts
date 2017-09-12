import Util from '../util/util'

function findRange (num, type, limit) {
    if (isNaN(num)) {
        throw new Error('[wxCharts] unvalid series data!');
    }
    limit = limit || 10;
    type = type ? type : 'upper';
    let multiple = 1;
    while (limit < 1) {
        limit *= 10;
        multiple *= 10;
    }
    if (type === 'upper') {
        num = Math.ceil(num * multiple);
    } else {
        num = Math.floor(num * multiple);
    }
    while (num % limit !== 0) {
        if (type === 'upper') {
            num++;
        } else {
            num--;
        }
    }

    return num / multiple;
}

export function calValidDistance (distance, chartData, config, opts) {

    let dataChartAreaWidth = opts.width - config.padding - chartData.xAxisPoints[0];
    let dataChartWidth = chartData.eachSpacing * opts.categories.length;
    let validDistance = distance;
    if (distance >= 0) {
        validDistance = 0;
    } else if (Math.abs(distance) >= (dataChartWidth - dataChartAreaWidth)) {
        validDistance = dataChartAreaWidth - dataChartWidth;
    }
    return validDistance;
}

export function isInAngleRange(angle, startAngle, endAngle) {
    function adjust (angle) {
        while (angle < 0) {
            angle += 2 * Math.PI;
        }
        while (angle > 2 * Math.PI) {
            angle -= 2 * Math.PI;
        }

        return angle;
    }

    angle = adjust(angle);
    startAngle = adjust(startAngle);
    endAngle = adjust(endAngle);
    if (startAngle > endAngle) {
        endAngle += 2 * Math.PI;
        if (angle < startAngle) {        
            angle += 2 * Math.PI;
        }
    }

    return angle >= startAngle && angle <= endAngle;
}

export function calRotateTranslate(x, y, h) {
    var xv = x;
    var yv = h - y;

    var transX = xv + (h - yv -xv) / Math.sqrt(2);
    transX *= -1;

    var transY = (h -yv) * (Math.sqrt(2) - 1) - (h - yv - xv) / Math.sqrt(2);

    return {
        transX,
        transY
    };
}


export function createCurveControlPoints(points, i) {

    function isNotMiddlePoint (points, i) {
        if (points[i - 1] && points[i + 1]) {
            return points[i].y >= Math.max(points[i - 1].y, points[i + 1].y)
                   || points[i].y <= Math.min(points[i - 1].y, points[i + 1].y);
        } else {
            return false
        }
    }

    const a = 0.2;
    const b = 0.2;
    let pAx = null;
    let pAy = null;
    let pBx = null;
    let pBy = null;
    if(i < 1){
        pAx = points[0].x + (points[1].x-points[0].x) * a;
        pAy = points[0].y + (points[1].y-points[0].y) * a;
    }else{
        pAx = points[i].x + (points[i + 1].x - points[i-1].x) * a;
        pAy = points[i].y + (points[i + 1].y - points[i-1].y) * a;
    }

    if(i > points.length - 3){
        let last =points.length - 1;
        pBx = points[last].x - (points[last].x - points[last - 1].x) * b;
        pBy = points[last].y - (points[last].y - points[last - 1].y) * b;
    }else{
        pBx = points[i + 1].x - (points[i + 2].x-points[i].x) * b;
        pBy = points[i + 1].y - (points[i + 2].y-points[i].y) * b;
    }

    // fix issue https://github.com/xiaolin3303/wx-charts/issues/79
    if (isNotMiddlePoint(points, i + 1)) {
        pBy = points[i + 1].y;
    }
    if (isNotMiddlePoint(points, i)) {
        pAy = points[i].y;
    }

    return {
        ctrA: {x: pAx, y: pAy},
        ctrB: {x: pBx, y: pBy}
    }
}

export function convertCoordinateOrigin (x, y, center) {
    return {
        x: center.x + x,
        y: center.y - y
    }
}

export function avoidCollision (obj, target) {
    if (target) {
        // is collision test
        while (Util.isCollision(obj, target)) {
            if (obj.start.x > 0) {
                obj.start.y--;
            } else if (obj.start.x < 0) {
                obj.start.y++;
            } else {
                if (obj.start.y > 0) {
                    obj.start.y++;
                } else {
                    obj.start.y--;
                }
            }
        }
    }
    return obj;
}

export function fillSeriesColor (series, config) {
    let index = 0;
    return series.map(function(item) {
        if (!item.color) {
            item.color = config.colors[index];
            index = (index + 1) % config.colors.length;
        }
        return item;
    });
}

export function getDataRange (minData, maxData) {
    let limit = 0;
    let range = maxData - minData;
    if (range >= 10000) {
        limit = 1000;
    } else if (range >= 1000) {
        limit = 100;
    } else if (range >= 100) {
        limit = 10;
    } else if (range >= 10) {
        limit = 5;
    } else if (range >= 1) {
        limit = 1;
    } else if (range >= 0.1) {
        limit = 0.1;
    } else {
        limit = 0.01;
    }
    return {
        minRange: findRange(minData, 'lower', limit),
        maxRange: findRange(maxData, 'upper', limit)
    }
}

export function measureText (text, fontSize=10) {
    // wx canvas 未实现measureText方法, 此处自行实现
    text = String(text);
    var text = text.split('');
    var width = 0;
    text.forEach(function(item) {
        if (/[a-zA-Z]/.test(item)) {
            width += 7;
        } else if (/[0-9]/.test(item)) {
            width += 5.5;
        } else if (/\./.test(item)) {
            width += 2.7;
        } else if (/-/.test(item)) {
            width += 3.25;
        } else if (/[\u4e00-\u9fa5]/.test(item)) {
            width += 10;
        } else if (/\(|\)/.test(item)) {
            width += 3.73;
        } else if (/\s/.test(item)) {
            width += 2.5;
        } else if (/%/.test(item)) {
            width += 8;
        } else {
            width += 10;
        }
    });
    return width * fontSize / 10;
}