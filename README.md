# wx-charts
微信小程序图表工具，charts for WeChat small app

基于canvas绘制，体积小巧

**支持图表类型**
- 饼图 `pie`
- 线图 `line`
- 柱状图 `column`
- 区域图 `area`

# 参数说明
`opts` Object

`opts.canvasId` String **required** 微信小程序canvas-id

`opts.width` Number **required** canvas宽度，单位为px

`opts.height` Number **required** canvas高度，单位为px

`opts.type` String **required** 图表类型，可选值为`pie`, `line`, `column`, `area`

`opts.categories` Array **required** *(饼图不需要)* 数据类别分类

`opts.yAxisFormat` Function Y轴显示自定义格式内容

`opts.dataLabel` Boolean default `true` 是否在图表中显示数据内容值

`opts.series` Array **required** 数据列表

**数据列表每项结构定义**

`dataItem` Object

`dataItem.data` Array **required** *(饼图为Number)* 数据

`dataItem.color` String 例如`#7cb5ec` 不传入则使用系统默认配色方案

`dataItem.name` String 数据名称

`dateItem.format` Function 自定义显示数据内容

# Example

### pie chart

```javascript
var Charts = require('charts.js');
new Charts({
    canvasId: 'pieCanvas',
    type: 'pie',
    series: [{
        data: 15,
    }, {
        data: 35,
    }, {
        data: 78,
    }, {
        data: 63,
    }],
    width: 640,
    height: 400,
    dataLabel: false
});
```
![pieChart](https://raw.githubusercontent.com/xiaolin3303/wx-charts/master/example/pie.png)

### line chart

```javascript
new Charts({
    canvasId: 'lineCanvas',
    type: 'line',
    categories: ['2016-08', '2016-09', '2016-10', '2016-11', '2016-12', '2017'],
    series: [{
        data: [15, 20, 45, 37, 4, 80],
        format: function (val) {
            return val.toFixed(2) + '万';
        }
    }, {
        data: [70, 40, 65, 100, 34, 18],
        format: function (val) {
            return val.toFixed(2) + '万';
        }
    }],
    yAxisFormat: function (val) {
        return val + '万';
    },
    width: 640,
    height: 400
});
```

![lineChart](https://raw.githubusercontent.com/xiaolin3303/wx-charts/master/example/line.png)

### columnChart

```javascript
new Charts({
    canvasId: 'columnCanvas',
    type: 'column',
    categories: ['2016-08', '2016-09', '2016-10', '2016-11', '2016-12', '2017'],
    series: [{
        data: [15, 20, 45, 37, 4, 80],
        format: function (val) {
            return val.toFixed(2) + '万';
        }
    }, {
        data: [70, 40, 65, 100, 34, 18],
        format: function (val) {
            return val.toFixed(2) + '万';
        }
    }, {
        data: [70, 40, 65, 100, 34, 18],
        format: function (val) {
            return val.toFixed(2) + '万';
        }
    }, {
        data: [70, 40, 65, 100, 34, 18],
        format: function (val) {
            return val.toFixed(2) + '万';
        }
    }],
    yAxisFormat: function (val) {
        return val + '万';
    },
    width: 640,
    height: 400,
    dataLabel: false
});
```

![columnChart](https://raw.githubusercontent.com/xiaolin3303/wx-charts/master/example/column.png)

### areaChart

```javascript
new Charts({
    canvasId: 'areaCanvas',
    type: 'area',
    categories: ['2016-08', '2016-09', '2016-10', '2016-11', '2016-12', '2017'],
    series: [{
        data: [70, 40, 65, 100, 34, 18],
        format: function (val) {
            return val.toFixed(2) + '万';
        }
    }, {
        data: [15, 20, 45, 37, 4, 80],
        format: function (val) {
            return val.toFixed(2) + '万';
        }
    }],
    yAxisFormat: function (val) {
        return val + '万';
    },
    width: 640,
    height: 400
});
```

![areaChart](https://raw.githubusercontent.com/xiaolin3303/wx-charts/master/example/area.png)

# TodoList

- [ ] add legend
- [ ] add animation
