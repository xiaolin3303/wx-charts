/*!
 * charts for WeChat small app v1.0
 *
 * Contact: https://github.com/xiaolin3303
 * 2016-09-30
 *
 * Designed and built with all the love of Web
 */

var Charts = function(opts) {
	this.opts = opts;
	this.config = {
		yAxisWidth: 50,
		yAxisSplit: 5,
		xAxisHeight: 30,
		padding: 30,
        columePadding: 20,
		fontSize: 20,
		dataPointShape: ['diamond', 'circle', 'triangle', 'rect'],
		colors: ['#7cb5ec', '#f7a35c', '#434348', '#90ed7d', '#f15c80', '#8085e9'],
		colorIndex: 0
	}
	this.chartData = {};
	this.context = wx.createContext();
	this.fillSeriesColor();
	switch (this.opts.type) {
		case 'line':
			this.drawXAxis(this.opts.categories);
			this.drawYAxis(this.opts.series);
			this.drawLineDataPoints(this.opts.series);
			break;
		case 'column':
			this.drawXAxis(this.opts.categories);
			this.drawYAxis(this.opts.series);
			this.drawColumnDataPoints(this.opts.series);
			break;
		case 'area':
			this.drawXAxis(this.opts.categories);
			this.drawYAxis(this.opts.series);
			this.drawAreaDataPoints(this.opts.series);
			break;
		case 'pie':
			this.drawPieDataPoints(this.opts.series);
			break;
	}
	this.draw();
}

Charts.prototype.fillSeriesColor = function() {
	var me = this;
	this.opts.series.map(function(item) {
		if (!item.color) {
			item.color = me.config.colors[me.config.colorIndex];
			me.config.colorIndex = (me.config.colorIndex + 1) % me.config.colors.length;
		}
	});
}
Charts.prototype.findRange = function(num, type) {
	type = type ? type : 'upper';
	var limit = 5;
	var range = num;
	while (range % limit !== 0) {
		if (type === 'upper') {
			range++;
		} else {
			range--;
		}
	}

	return range;
}
Charts.prototype.mesureText = function(text) {
	var text = text.split('');
	var width = 0;
	text.forEach(function(item) {
		if (/[a-zA-Z]/.test(item)) {
			width += 14;
		} else if (/[0-9]/.test(item)) {
			width += 11;
		} else if (/\./.test(item)) {
			width += 5.4;
		} else if (/-/.test(item)) {
			width += 6.5;
		} else if (/[\u4e00-\u9fa5]/.test(item)) {
			width += 20;
		}
	});
	return width;
}
Charts.prototype.getDataPoints = function(data, minRange, maxRange, xAxisPoints, eachSpacing) {
	var me = this;
	var points = [];
	var validHeight = this.opts.height - 2 * this.config.padding - this.config.xAxisHeight;
	data.forEach(function(item, index) {
		var point = {};
		point.x = xAxisPoints[index] + Math.round(eachSpacing / 2);
		var height = validHeight * (item - minRange) / (maxRange - minRange);
		point.y = me.opts.height - me.config.xAxisHeight - Math.round(height) - me.config.padding;

		points.push(point);
	});

	return points;
}
Charts.prototype.drawPointText = function(points, series) {
	// 绘制数据文案
    if (this.opts.dataLabel ===  false) {
        return;
    }
	var context = this.context;
	var me = this;
	var data = series.data;

	context.beginPath();
	context.setFontSize(me.config.fontSize);
	context.setFillStyle('#666666');
	points.forEach(function(item, index) {
		var formatVal = series.format ? series.format(data[index]) : data[index];
		context.fillText(formatVal, item.x - me.mesureText(formatVal) / 2, item.y - 10);
	});
	context.closePath();
	context.stroke();
}
Charts.prototype.drawPointShape = function(points, color, index) {
	var context = this.context;
	var shape = this.config.dataPointShape[index % this.config.dataPointShape.length];
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
	context.fill()
	context.stroke()
}
Charts.prototype.fixColumeData = function (points, eachSpacing, columnLen, index) {
    var me = this;    
    return points.map(function (item) {
        item.width = (eachSpacing - 2 * me.config.columePadding) / columnLen;
        item.x = item.x - eachSpacing / 2 + me.config.columePadding + (index + 0.5)* item.width;

        item.width = Math.round(item.width);
        item.x = Math.round(item.x);

        return item;
    })
}
Charts.prototype.getPieDataPoints = function (series) {
	var count = 0;
	var _start_ = 0;
	series.forEach(function (item) {
		count += item.data;
	});
	series.forEach(function (item) {
		item._proportion_ = item.data / count;
	});
	series.forEach(function (item) {
		item._start_ = _start_;
		_start_ += 2 * item._proportion_ * Math.PI;
	});

	return series;
}
Charts.prototype.drawPieDataPoints = function(series) {
	var context = this.context;	
	series = this.getPieDataPoints(series);
	var centerPosition = {
		x: this.opts.width / 2,
		y: this.opts.height / 2
	}
	var radius = Math.min(centerPosition.x, centerPosition.y);
    context.setStrokeStyle('#ffffff');
    context.setLineWidth(2)
	series.forEach(function (eachSeries) {
	    context.beginPath();
	    context.setFillStyle(eachSeries.color); 
	    context.moveTo(centerPosition.x, centerPosition.y);
	    context.arc(centerPosition.x, centerPosition.y, radius, eachSeries._start_, 2 * eachSeries._proportion_ * Math.PI);
	    context.closePath();
	    context.fill()

	    context.beginPath();
	    context.moveTo(centerPosition.x, centerPosition.y);
	    context.arc(centerPosition.x, centerPosition.y, radius, eachSeries._start_, 0);
	    context.lineTo(centerPosition.x, centerPosition.y);
	    context.stroke();
	    context.closePath();
	    context.stroke();
	    context.beginPath();
	    context.moveTo(centerPosition.x, centerPosition.y);
	    context.arc(centerPosition.x, centerPosition.y, radius, eachSeries._start_ + 2 * eachSeries._proportion_ * Math.PI, 0);
	    context.moveTo(centerPosition.x, centerPosition.y);
	    context.stroke();
	    context.closePath();
	});

}
Charts.prototype.drawAreaDataPoints = function(series) {
	var context = this.context;
	var me = this;
	var data = series[0].data;
	var spacingValid = this.opts.width - 2 * this.config.padding - this.config.yAxisWidth;
	var eachSpacing = Math.floor(spacingValid / data.length);
	var endY = this.opts.height - this.config.padding - this.config.xAxisHeight;

	series.forEach(function(eachSeries, seriesIndex) {
		var data = eachSeries.data;
		var points = me.getDataPoints(data, me.chartData.minRange, me.chartData.maxRange, me.chartData.xAxisPoints, eachSpacing);

		// 绘制区域数据
		var firstPoint = points[0];
		var lastPoint = points[points.length - 1];
		context.beginPath();
		context.setStrokeStyle(eachSeries.color);
		context.setFillStyle(eachSeries.color);
		context.setGlobalAlpha(0.6);
		context.setLineWidth(4);
		context.moveTo(firstPoint.x, firstPoint.y);
		points.forEach(function(item, index) {
			if (index > 0) {
				context.lineTo(item.x, item.y);
			}
		});

		context.lineTo(lastPoint.x, endY);
		context.lineTo(firstPoint.x, endY);
		context.lineTo(firstPoint.x, firstPoint.y);
		context.closePath();
		context.fill();
		context.setGlobalAlpha(1);

		me.drawPointShape(points, eachSeries.color, seriesIndex);
	});
	series.forEach(function(eachSeries, seriesIndex) {
		var data = eachSeries.data;
		var points = me.getDataPoints(data, me.chartData.minRange, me.chartData.maxRange, me.chartData.xAxisPoints, eachSpacing);
		me.drawPointText(points, eachSeries);	
	});	
}
Charts.prototype.drawColumnDataPoints = function(series) {
	var context = this.context;
	var me = this;
	var data = series[0].data;
	var spacingValid = this.opts.width - 2 * this.config.padding - this.config.yAxisWidth;
	var eachSpacing = Math.floor(spacingValid / data.length);
	
    series.forEach(function(eachSeries, seriesIndex) {
		var data = eachSeries.data;
		var points = me.getDataPoints(data, me.chartData.minRange, me.chartData.maxRange, me.chartData.xAxisPoints, eachSpacing);
        points = me.fixColumeData(points, eachSpacing, series.length, seriesIndex);
        
        // 绘制柱状数据图
		context.beginPath();
		context.setFillStyle(eachSeries.color);
		points.forEach(function(item, index) {
            var startX = item.x - item.width / 2 + 1;
            var height = me.opts.height - item.y - me.config.padding - me.config.xAxisHeight;	
            context.moveTo(startX, item.y);
			context.rect(startX, item.y, item.width - 2, height);
		});
		context.closePath();
		context.fill();
	});
    series.forEach(function(eachSeries, seriesIndex) {
		var data = eachSeries.data;
		var points = me.getDataPoints(data, me.chartData.minRange, me.chartData.maxRange, me.chartData.xAxisPoints, eachSpacing);
        points = me.fixColumeData(points, eachSpacing, series.length, seriesIndex);
		me.drawPointText(points, eachSeries);
    });
}
Charts.prototype.drawLineDataPoints = function(series) {
	var context = this.context;
	var me = this;
	var data = series[0].data;
	var spacingValid = this.opts.width - 2 * this.config.padding - this.config.yAxisWidth;
	var eachSpacing = Math.floor(spacingValid / data.length);

	series.forEach(function(eachSeries, seriesIndex) {
		var data = eachSeries.data;
		var points = me.getDataPoints(data, me.chartData.minRange, me.chartData.maxRange, me.chartData.xAxisPoints, eachSpacing);

		// 绘制数据线
		context.beginPath();
		context.setStrokeStyle(eachSeries.color);
		context.setLineWidth(4);
		context.moveTo(points[0].x, points[0].y);
		points.forEach(function(item, index) {
			if (index > 0) {
				context.lineTo(item.x, item.y);
			}
		});
		context.moveTo(points[0].x, points[0].y);
		context.closePath();
		context.stroke()

		me.drawPointShape(points, eachSeries.color, seriesIndex);
	});
	series.forEach(function(eachSeries, seriesIndex) {
		var data = eachSeries.data;
		var points = me.getDataPoints(data, me.chartData.minRange, me.chartData.maxRange, me.chartData.xAxisPoints, eachSpacing);
		me.drawPointText(points, eachSeries);	
	});	
}
Charts.prototype.getYAxisTextList = function(data) {
	var minData = Math.min.apply(this, data);
	var maxData = Math.max.apply(this, data);
	var minRange = this.findRange(minData, 'lower');
	var maxRange = this.findRange(maxData, 'upper');
	this.chartData.minRange = minRange;
	this.chartData.maxRange = maxRange;

	var range = [];
	var eachRange = (maxRange - minRange) / this.config.yAxisSplit;

	for (var i = 0; i <= this.config.yAxisSplit; i++) {
		range.push(minRange + eachRange * i);
	}
	return range.reverse();
}
Charts.prototype.drawYAxis = function(series) {
	var me = this;
	var context = this.context;
	var data = series.reduce(function(a, b) {
		return (a.data ? a.data : a).concat(b.data);
	}, []);

	var spacingValid = this.opts.height - 2 * this.config.padding - this.config.xAxisHeight;
	var eachSpacing = Math.floor(spacingValid / this.config.yAxisSplit);
	var startX = this.config.padding + this.config.yAxisWidth;
	var endX = this.opts.width - this.config.padding;
	var startY = this.config.padding;
	var endY = this.opts.height - this.config.padding - this.config.xAxisHeight;

	var points = [];
	var ranges = this.getYAxisTextList(data);
	for (var i = 0; i < this.config.yAxisSplit; i++) {
		points.push(this.config.padding + eachSpacing * i);
	}

	context.beginPath();
	context.setStrokeStyle("#cccccc")
	context.setLineWidth(1)
	points.forEach(function(item, index) {
		context.moveTo(startX, item);
		context.lineTo(endX, item);
	});
	context.closePath();
	context.stroke();
	context.beginPath();
	context.setFontSize(this.config.fontSize);
	context.setFillStyle('#666666')
	ranges.forEach(function(item, index) {
		var pos = points[index] ? points[index] : endY;
		var formatVal = me.opts.yAxisFormat ? me.opts.yAxisFormat(item) : item;
		context.fillText(formatVal, me.config.padding, pos + 10);
	});
	context.closePath();
	context.stroke()

}
Charts.prototype.drawXAxis = function(categories) {
	var me = this;
	var context = this.context;
	var spacingValid = this.opts.width - 2 * this.config.padding - this.config.yAxisWidth;
	var eachSpacing = Math.floor(spacingValid / categories.length);

	var points = [];
	var startX = this.config.padding + this.config.yAxisWidth;
	var endX = this.opts.width - this.config.padding;
	var startY = this.opts.height - this.config.padding - this.config.xAxisHeight;
	var endY = this.opts.height - this.config.padding;
	categories.forEach(function(item, index) {
		points.push(startX + index * eachSpacing);
	});
	points.push(endX);
	this.chartData.xAxisPoints = points;

	context.beginPath();
	context.setStrokeStyle("#cccccc")
	context.setLineWidth(1)
	context.moveTo(startX, startY);
	context.lineTo(endX, startY);
	points.forEach(function(item, index) {
		context.moveTo(item, startY);
		context.lineTo(item, endY)
	});
	context.closePath();
	context.stroke();

	context.beginPath();
	context.setFontSize(this.config.fontSize);
	context.setFillStyle('#666666')
	categories.forEach(function(item, index) {
		var offset = eachSpacing / 2 - me.mesureText(item) / 2;
		context.fillText(item, points[index] + offset, startY + 28);
	});
	context.closePath();
	context.stroke()
}
Charts.prototype.draw = function() {
	var context = this.context;

	wx.drawCanvas({
		canvasId: this.opts.canvasId,
		actions: context.getActions()
	})
}
module.exports = Charts;
