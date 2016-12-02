import { mesureText } from './charts-util'

export default function drawPointText (points, series, config, context) {
    // 绘制数据文案
    let data = series.data;

    context.beginPath();
    context.setFontSize(config.fontSize);
    context.setFillStyle('#666666');
    points.forEach(function(item, index) {
        let formatVal = series.format ? series.format(data[index]) : data[index];
        context.fillText(formatVal, item.x - mesureText(formatVal) / 2, item.y - 10);
    });
    context.closePath();
    context.stroke();
}