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
    var legendWidth = 4;
    var legendMarginRight = 5;
    // var legendMarginRight = 0;
    var arrowWidth = 8;
    var showAtLeftSide = false;
    offset = assign({
        x: 0,
        y: 0
    }, offset);
    offset.y -= 8;

    // 1. set the rect is shown on left or right according half of the window width
    // 2. set the rect width that can shown on window
    // 3. split textLine if it's width is bigger than widthCanShown
    // 4. draw rect, legend and text according splited texts
    let systemInfo, widthCanShow
    try {
      systemInfo = wx.getSystemInfoSync();
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    if (offset.x > systemInfo.windowWidth/2) {
      showAtLeftSide = true;
      widthCanShow = offset.x - 2 * config.toolTipPadding - arrowWidth
    } else {
      widthCanShow = systemInfo.windowWidth - offset.x - 2 * config.toolTipPadding - arrowWidth
    }
    
    // split texts
    let splitedTextList = []
    let splitedTextLineCount = 0
    let maxTextWidth = 0
    for(let i = 0; i < textList.length; i++) {
      let textItem = textList[i]
      let splitedTextItemList = splitItemText(textItem, legendWidth, legendMarginRight, config.toolTipPadding, widthCanShow)
      splitedTextList.push(splitedTextItemList)
      let oneItemTextWidth = splitedTextItemList.map(function (item) {
        return measureText(item.text);
      })
      let maxOneItemWidth = Math.max.apply(null, oneItemTextWidth)
      if (maxOneItemWidth > maxTextWidth) {
        maxTextWidth = maxOneItemWidth
      }
      splitedTextLineCount += splitedTextItemList.length
    }

    var toolTipWidth = getToolTipTotalWith(maxTextWidth, legendWidth, legendMarginRight, config.toolTipPadding)
    var toolTipHeight = 2 * config.toolTipPadding + splitedTextLineCount * config.toolTipLineHeight;

    // draw background rect
    context.beginPath();
    context.setFillStyle(opts.tooltip.option.background || config.toolTipBackground);
    context.setGlobalAlpha(config.toolTipOpacity);
    if (showAtLeftSide) {
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
    let legendLineCount = 0
    splitedTextList.forEach(function (item, index) {
      context.beginPath();
      context.setFillStyle(item[0].color);
      var startX = offset.x + arrowWidth + 2 * config.toolTipPadding;
      var startY = offset.y + (config.toolTipLineHeight - config.fontSize) / 2 + config.toolTipLineHeight * legendLineCount + config.toolTipPadding;
      if (showAtLeftSide) {
          startX = offset.x - toolTipWidth - arrowWidth + 2 * config.toolTipPadding;
      }
      legendLineCount += item.length
      context.fillRect(startX, startY, legendWidth, config.fontSize * item.length);

      context.closePath();
    });

    // draw text list
    legendLineCount = 0
    context.beginPath();
    context.setFontSize(config.fontSize);
    context.setFillStyle('#ffffff');
    splitedTextList.forEach(function (listItem, listIndex) {
      listItem.forEach(function(item, index) {
        var startX = offset.x + arrowWidth + 2 * config.toolTipPadding + legendWidth + legendMarginRight;
        if (showAtLeftSide) {
            startX = offset.x - toolTipWidth - arrowWidth + 2 * config.toolTipPadding + +legendWidth + legendMarginRight;
        }
        var startY = offset.y + (config.toolTipLineHeight - config.fontSize) / 2 + config.toolTipLineHeight * legendLineCount + config.toolTipPadding;
        context.fillText(item.text, startX, startY + config.fontSize);
        legendLineCount++
      })
    });
    context.stroke();
    context.closePath();
}

function splitItemText(textItem, legendWidth, legendMarginRight, toolTipPadding, widthCanShow) {
  let splitedTextItemList = []
  let splitedItem = textItem
  for(;splitedItem.text.length > 0;) {
    let result = getToolTipPartText(splitedItem, legendWidth, legendMarginRight, toolTipPadding, widthCanShow)
    splitedTextItemList.push(result.partTextItem)
    splitedItem = result.remainTextItem
  }
  return splitedTextItemList
}

function getToolTipTotalWith(textItemWidth, legendWidth, legendMarginRight, toolTipPadding) {
  return textItemWidth + legendWidth + legendMarginRight + 4 * toolTipPadding
}

function getToolTipPartText(textItem, legendWidth, legendMarginRight, toolTipPadding, widthCanShow) {
  let textItemWidth = measureText(textItem.text)
  let totalWidth = getToolTipTotalWith(textItemWidth, legendWidth, legendMarginRight, toolTipPadding)
  let itemLen = textItem.text.length

  let color = textItem.color
  let partText, remainText
  let partTextItem, remainTextItem
  if (totalWidth > widthCanShow) {
    let multis = totalWidth/widthCanShow
    let partLen = itemLen / multis
    for (let i = partLen; i > 0; i--) {
      partText = textItem.text.substring(0, i)
      let partTextWidth = measureText(partText)
      let partToolTipTotalWidth = getToolTipTotalWith(partTextWidth, legendWidth, legendMarginRight, toolTipPadding)
      if (partToolTipTotalWidth <= widthCanShow) {
        remainText = textItem.text.substring(i)
        break
      }
    }
  } else {
    partText = textItem.text
    remainText = ""
  }
  partTextItem = {text: partText, color: color}
  remainTextItem = {text: remainText, color: color}
  return {partTextItem, remainTextItem}
}
