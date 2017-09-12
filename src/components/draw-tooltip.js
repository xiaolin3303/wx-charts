import { measureText } from './charts-util'
import { assign } from '../util/polyfill/index';

export function drawToolTipSplitLine(offsetX, opts, config, context) {
    let startY = config.padding;
    let endY = opts.height - config.padding - config.xAxisHeight - config.legendHeight;
    context.beginPath();
    context.setStrokeStyle('#cccccc');
    context.setLineWidth(1);
    context.moveTo(offsetX, startY);
    context.lineTo(offsetX, endY);
    context.stroke();
    context.closePath();
}

export function drawToolTip(textList, offset, opts, config, context) {
    let legendWidth = 4;
    let legendMarginRight = 5;
    let arrowWidth = 8;
    let isOverRightBorder = false;
    offset = assign({
        x: 0,
        y: 0
    }, offset);
    offset.y -= 8;
    let textWidth = textList.map((item) => {
        return measureText(item.text);
    });

    let toolTipWidth = legendWidth + legendMarginRight + 4 * config.toolTipPadding + Math.max.apply(null, textWidth);
    let toolTipHeight = 2 * config.toolTipPadding + textList.length * config.toolTipLineHeight;

    // if beyond the right border
    if (offset.x - Math.abs(opts._scrollDistance_) + arrowWidth + toolTipWidth > opts.width) {
        isOverRightBorder = true;
    }

    // draw background rect
    context.beginPath();
    context.setFillStyle(opts.tooltip.option.background || config.toolTipBackground);
    context.setGlobalAlpha(config.toolTipOpacity);
    if (isOverRightBorder) {
        context.moveTo(offset.x, offset.y + 10);
        context.lineTo(offset.x - arrowWidth, offset.y + 10 - 5);
        context.lineTo(offset.x - arrowWidth, offset.y + 10 + 5);
        context.moveTo(offset.x, offset.y + 10);
        context.fillRect(offset.x - toolTipWidth - arrowWidth, offset.y, toolTipWidth, toolTipHeight);
    } else {    
        context.moveTo(offset.x, offset.y + 10);
        context.lineTo(offset.x + arrowWidth, offset.y + 10 - 5);
        context.lineTo(offset.x + arrowWidth, offset.y + 10 + 5);
        context.moveTo(offset.x, offset.y + 10);
        context.fillRect(offset.x + arrowWidth, offset.y, toolTipWidth, toolTipHeight);
    }

    context.closePath();
    context.fill();
    context.setGlobalAlpha(1);

    // draw legend
    textList.forEach((item, index) => {
        context.beginPath();
        context.setFillStyle(item.color);
        let startX = offset.x + arrowWidth + 2 * config.toolTipPadding;
        let startY = offset.y + (config.toolTipLineHeight - config.fontSize) / 2 + config.toolTipLineHeight * index + config.toolTipPadding;
        if (isOverRightBorder) {
            startX = offset.x - toolTipWidth - arrowWidth + 2 * config.toolTipPadding;
        }
        context.fillRect(startX, startY, legendWidth, config.fontSize);
        context.closePath();
    });

    // draw text list
    context.beginPath();
    context.setFontSize(config.fontSize);
    context.setFillStyle('#ffffff');
    textList.forEach((item, index) => {
        let startX = offset.x + arrowWidth + 2 * config.toolTipPadding + legendWidth + legendMarginRight;
        if (isOverRightBorder) {
            startX = offset.x - toolTipWidth - arrowWidth + 2 * config.toolTipPadding +  + legendWidth + legendMarginRight;
        }
        let startY = offset.y + (config.toolTipLineHeight - config.fontSize) / 2 + config.toolTipLineHeight * index + config.toolTipPadding;
        context.fillText(item.text, startX, startY + config.fontSize);
    });
    context.stroke();
    context.closePath();
}