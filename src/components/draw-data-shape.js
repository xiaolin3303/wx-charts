export default function drawPointShape (points, color, shape, context) {
    context.beginPath();
    context.setStrokeStyle("#ffffff");
    context.setLineWidth(2);
    context.setFillStyle(color);

    if (shape === 'diamond') {
        points.forEach(function(item, index) {
            context.moveTo(item.x, item.y - 9);
            context.lineTo(item.x - 9, item.y);
            context.lineTo(item.x, item.y + 9);
            context.lineTo(item.x + 9, item.y);
            context.lineTo(item.x, item.y - 9);
        });
    } else if (shape === 'circle') {
        points.forEach(function(item, index) {
            context.moveTo(item.x + 7, item.y)
            context.arc(item.x, item.y, 8, 0, 2 * Math.PI, false)
        });
    } else if (shape === 'rect') {
        points.forEach(function(item, index) {
            context.moveTo(item.x - 7, item.y - 7);
            context.rect(item.x - 7, item.y - 7, 14, 14);
        });
    } else if (shape === 'triangle') {
        points.forEach(function(item, index) {
            context.moveTo(item.x, item.y - 9);
            context.lineTo(item.x - 9, item.y + 9);
            context.lineTo(item.x + 9, item.y + 9);
            context.lineTo(item.x, item.y - 9);
        });
    }
    context.closePath();
    context.fill();
    context.stroke();
}