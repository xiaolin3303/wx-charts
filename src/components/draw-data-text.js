import { measureText, convertCoordinateOrigin, avoidCollision } from './charts-util'
import Util from '../util/util'

export function drawRingTitle(opts, config, context) {
    let titlefontSize = opts.title.fontSize || config.titleFontSize;
    let subtitlefontSize = opts.subtitle.fontSize || config.subtitleFontSize;
    let title = opts.title.name || '';
    let subtitle = opts.subtitle.name || '';
    let titleFontColor = opts.title.color || config.titleColor;
    let subtitleFontColor = opts.subtitle.color || config.subtitleColor;
    let titleHeight = title ? titlefontSize : 0;
    let subtitleHeight = subtitle ? subtitlefontSize : 0;
    let margin = 5;
    if (subtitle) {
        let textWidth = measureText(subtitle, subtitlefontSize);
        let startX = (opts.width - textWidth) / 2 + (opts.subtitle.offsetX || 0);
        let startY = (opts.height - config.legendHeight + subtitlefontSize) / 2;
        if (title) {
            startY -= (titleHeight + margin) / 2;
        }
        context.beginPath();
        context.setFontSize(subtitlefontSize);
        context.setFillStyle(subtitleFontColor);
        context.fillText(subtitle, startX, startY);
        context.stroke();
        context.closePath();
    }
    if (title) {
        let textWidth = measureText(title, titlefontSize);
        let startX = (opts.width - textWidth) / 2 + (opts.title.offsetX || 0);
        let startY = (opts.height - config.legendHeight + titlefontSize) / 2;
        if (subtitle) {
            startY += (subtitleHeight + margin) / 2;
        }
        context.beginPath();
        context.setFontSize(titlefontSize);
        context.setFillStyle(titleFontColor);
        context.fillText(title, startX, startY);
        context.stroke();
        context.closePath();
    }    
}

export function drawPointText (points, series, config, context) {
    // 绘制数据文案
    let data = series.data;

    context.beginPath();
    context.setFontSize(config.fontSize);
    context.setFillStyle('#666666');
    points.forEach(function(item, index) {
        if (item !== null) {        
            let formatVal = series.format ? series.format(data[index]) : data[index];
            context.fillText(formatVal, item.x - measureText(formatVal) / 2, item.y - 2);
        }
    });
    context.closePath();
    context.stroke();
}

export function drawRadarLabel(angleList, radius, centerPosition, opts, config, context) {
    let radarOption = opts.extra.radar || {};    
    radius += config.radarLabelTextMargin;
    context.beginPath();
    context.setFontSize(config.fontSize);
    context.setFillStyle(radarOption.labelColor || '#666666');
    angleList.forEach((angle, index) => {
        let pos = {
            x: radius * Math.cos(angle),
            y: radius * Math.sin(angle)
        }
        let posRelativeCanvas = convertCoordinateOrigin(pos.x, pos.y, centerPosition);
        let startX = posRelativeCanvas.x;
        let startY = posRelativeCanvas.y;
        if (Util.approximatelyEqual(pos.x, 0)) {
            startX -= measureText(opts.categories[index] || '') / 2;
        } else if (pos.x < 0) {
            startX -= measureText(opts.categories[index] || '');
        }
        context.fillText(opts.categories[index] || '', startX, startY + config.fontSize / 2);
    });
    context.stroke();
    context.closePath();
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
        
        let textWidth = measureText(item.text);
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