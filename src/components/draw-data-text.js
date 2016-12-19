import { mesureText, convertCoordinateOrigin, avoidCollision } from './charts-util'
import Util from '../util/util'

export function drawPointText (points, series, config, context) {
    // 绘制数据文案
    let data = series.data;

    context.beginPath();
    context.setFontSize(config.fontSize);
    context.setFillStyle('#666666');
    points.forEach(function(item, index) {
        let formatVal = series.format ? series.format(data[index]) : data[index];
        context.fillText(formatVal, item.x - mesureText(formatVal) / 2, item.y - 2);
    });
    context.closePath();
    context.stroke();
}

export function drawPieText (series, opts, config, context, radius, center) {
    let lineRadius = radius + config.pieChartLinePadding;
    let textRadius = lineRadius + config.pieChartTextPadding;
    let textObjectCollection = [];
    let lastTextObject = null;

    let seriesConvert = series.map((item) => {
        let arc = 2 * Math.PI - (item._start_ + 2 * Math.PI * item._proportion_ / 2);
        let text = item.format ? item.format(+item._proportion_.toFixed(2)) : `${Util.toFixed(item._proportion_ * 100)}%`;
        let color = item.color;
        return { arc, text, color };
    });
    seriesConvert.forEach((item) => {
        // line end
        let orginX1 = Math.cos(item.arc)  * lineRadius;
        let orginY1 = Math.sin(item.arc)  * lineRadius;

        // line start
        let orginX2 = Math.cos(item.arc)  * radius;
        let orginY2 = Math.sin(item.arc)  * radius;
        
        // text start
        let orginX3 = orginX1 >= 0 ? orginX1 + config.pieChartTextPadding : orginX1 - config.pieChartTextPadding ;
        let orginY3 = orginY1;
        
        let textWidth = mesureText(item.text);
        let startY = orginY3;
        
        if (lastTextObject && Util.isSameXCoordinateArea(lastTextObject.start, {x: orginX3})) {
            if (orginX3 > 0) {
                startY = Math.min(orginY3, lastTextObject.start.y);
            } else if (orginX1 < 0) {
                startY = Math.max(orginY3, lastTextObject.start.y);
            } else {
                if (orginY3 > 0) {
                    startY = Math.max(orginY3, lastTextObject.start.y);
                } else {
                    startY = Math.min(orginY3, lastTextObject.start.y);
                }
            }
        }

        if (orginX3 < 0) {
            orginX3 -= textWidth;
        }

        let textObject = {
            lineStart: {
                x: orginX2,
                y: orginY2
            },
            lineEnd: {
                x: orginX1,
                y: orginY1
            },
            start: {
                x: orginX3,
                y: startY
            },
            width: textWidth,
            height: config.fontSize,
            text: item.text,
            color: item.color
        }

        lastTextObject = avoidCollision(textObject, lastTextObject);
        textObjectCollection.push(lastTextObject);
    });

    textObjectCollection.forEach((item) => {
        let lineStartPoistion = convertCoordinateOrigin(item.lineStart.x, item.lineStart.y, center);
        let lineEndPoistion = convertCoordinateOrigin(item.lineEnd.x, item.lineEnd.y, center);
        let textPosition = convertCoordinateOrigin(item.start.x, item.start.y, center);
        context.setLineWidth(1);
        context.setFontSize(config.fontSize);
        context.beginPath();
        context.setStrokeStyle(item.color);
        context.setFillStyle(item.color);
        context.moveTo(lineStartPoistion.x, lineStartPoistion.y);
        let curveStartX = item.start.x < 0 ? textPosition.x + item.width : textPosition.x;
        let textStartX = item.start.x < 0 ? textPosition.x - 5 : textPosition.x + 5;
        context.quadraticCurveTo(lineEndPoistion.x, lineEndPoistion.y, curveStartX, textPosition.y);
        context.moveTo(lineStartPoistion.x, lineStartPoistion.y);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(textPosition.x + item.width, textPosition.y);
        context.arc(curveStartX, textPosition.y, 2, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
        context.beginPath();
        context.setFillStyle('#666666');
        context.fillText(item.text, textStartX, textPosition.y + 3);
        context.closePath();
        context.stroke();

        context.closePath();
    });
}