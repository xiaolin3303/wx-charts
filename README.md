# wx-charts
微信小程序图表工具，charts for WeChat small app

基于canvas绘制，体积小巧

**持续优化更新中，请保持关注~ 有任何问题欢迎在[Issues](https://github.com/xiaolin3303/wx-charts/issues)中讨论**

# 支持图表类型
- 饼图   `pie`
- 圆环图 `ring`
- 线图   `line`
- 柱状图 `column`
- 区域图 `area`

代码分析 [Here](https://segmentfault.com/a/1190000007649376)

# 更新记录 

- [ ] 动画性能优化
- [x] 新增更新数据、终止进行中的动画方法，渲染完成事件回调 2017-02-17
- [x] 新增圆环图title, subtitle 2017-01-10
- [x] x轴文案碰撞避让 2016-12-30
- [x] add pie chart dataLabel  2016-12-19
- [x] add animation  2016-12-05
- [x] build with `rollup` 2016-12-02
- [x] add legend  2016-11-29

# 如何使用
1、直接引用编译好的文件 `dist/wxcharts.js` 或者 `dist/wxcharts-min.js`

2、自行编译

```
git clone https://github.com/xiaolin3303/wx-charts.git
npm install rollup -g
npm install
rollup -c 或者 rollup --config rollup.config.prod.js
```
[实际项目中如何具体使用wx-charts](https://github.com/xiaolin3303/wx-charts/issues/28) 或者 访问[wx-charts-demo](https://github.com/xiaolin3303/wx-charts-demo)查看在微信开发工具中直接运行的例子

# 参数说明
`opts` Object

`opts.canvasId` String **required** 微信小程序canvas-id

`opts.width` Number **required** canvas宽度，单位为px

`opts.height` Number **required** canvas高度，单位为px

`opts.title` Object (only for ring chart)

`opts.title.name` String 标题内容

`opts.title.fontSize` Number 标题字体大小（可选，单位为px）

`opts.title.color` String 标题颜色（可选）

`opts.subtitle` Object (only for ring chart)

`opts.subtitle.name` String 副标题内容

`opts.subtitle.fontSize` Number 副标题字体大小（可选，单位为px）

`opts.subtitle.color` String 副标题颜色（可选）

`opts.animation` Boolean default `true` 是否动画展示

`opts.legend` Boolen default `true` 是否显示图表下方各类别的标识

`opts.type` String **required** 图表类型，可选值为`pie`, `line`, `column`, `area`, `ring`

`opts.categories` Array **required** *(饼图、圆环图不需要)* 数据类别分类

`opts.dataLabel` Boolean default `true` 是否在图表中显示数据内容值

`opts.dataPointShape` Boolean default `true` 是否在图表中显示数据点图形标识

`opts.disablePieStroke` Boolean default `false` 不绘制饼图（圆环图）各区块的白色分割线

`opts.xAxis` Object X轴配置

`opts.xAxis.gridColor` String 例如`#7cb5ec` default `#cccccc` X轴网格颜色

`opts.xAxis.fontColor` String 例如`#7cb5ec` default `#666666` X轴数据点颜色

`opts.xAxis.disableGrid` Boolean default `false` 不绘制X轴网格

`opts.xAxis.type` String 可选值`calibration(刻度)` 默认为包含样式

`opts.yAxis` Object Y轴配置

`opts.yAxis.format` Function 自定义Y轴文案显示

`opts.yAxis.min` Number Y轴起始值

`opts.yAxis.max` Number Y轴终止值

`opts.yAxis.title` String Y轴title

`opts.yAxis.gridColor` String 例如`#7cb5ec` default `#cccccc` Y轴网格颜色

`opts.yAxis.fontColor` String 例如`#7cb5ec` default `#666666` Y轴数据点颜色

`opts.yAxis.titleFontColor` String 例如`#7cb5ec` default `#333333` Y轴title颜色

`opts.yAxis.disabled` Boolean default `false` 不绘制Y轴

`opts.extra` Object 其他非通用配置项

`opts.extra.ringWidth` Number `ringChart`圆环宽度，单位为`px`

`opts.series` Array **required** 数据列表

**数据列表每项结构定义**

`dataItem` Object

`dataItem.data` Array **required** *(饼图、圆环图为Number)* 数据，如果传入`null`图表该处出现断点

`dataItem.color` String 例如`#7cb5ec` 不传入则使用系统默认配色方案

`dataItem.name` String 数据名称

`dateItem.format` Function 自定义显示数据内容

# 方法

`updateData(data)` 更新图表数据，data: `object`，data.categories(可选，具体见参数说明)，data.series(可选，具体见参数说明)

`stopAnimation()` 停止当前正在进行的动画效果，直接展示渲染的最终结果

`addEventListener(type, listener)` 添加事件监听，`type`: `String`事件类型，`listener`: `function` 处理方法

# 事件

`renderComplete` 图表渲染完成（如果有动画效果，则动画效果完成时触发）

# 如何使用事件

```javascript
let chart = new wxCharts(...);
chart.addEventListener('renderComplete', () => {
    // your code here
});
```

# Example

### pie chart

```javascript
var wxCharts = require('wxcharts.js');
new wxCharts({
    canvasId: 'pieCanvas',
    type: 'pie',
    series: [{
        name: 'cat1',
        data: 50,
    }, {
        name: 'cat2',
        data: 30,
    }, {
        name: 'cat3',
        data: 1,
    }, {
        name: 'cat4',
        data: 1,
    }, {
        name: 'cat5',
        data: 46,
    }],
    width: 360,
    height: 300,
    dataLabel: true
});
```
![pieChart](https://raw.githubusercontent.com/xiaolin3303/wx-charts/master/example/pie.png)
![pieChart](https://raw.githubusercontent.com/xiaolin3303/wx-charts/master/example/pie.gif)

### ring chart

```javascript
new wxCharts({
    canvasId: 'ringCanvas',
    type: 'ring',
    series: [{
        name: '成交量1',
        data: 15,
    }, {
        name: '成交量2',
        data: 35,
    }, {
        name: '成交量3',
        data: 78,
    }, {
        name: '成交量4',
        data: 63,
    }],
    width: 320,
    height: 200,
    dataLabel: false
});
```
![pieChart](https://raw.githubusercontent.com/xiaolin3303/wx-charts/master/example/ring.png)
![pieChart](https://raw.githubusercontent.com/xiaolin3303/wx-charts/master/example/ring.gif)

### line chart

```javascript
new wxCharts({
    canvasId: 'lineCanvas',
    type: 'line',
    categories: ['2012', '2013', '2014', '2015', '2016', '2017'],
    series: [{
        name: '成交量1',
        data: [0.15, 0.2, 0.45, 0.37, 0.4, 0.8],
        format: function (val) {
            return val.toFixed(2) + '万';
        }
    }, {
        name: '成交量2',
        data: [0.30, 0.37, 0.65, 0.78, 0.69, 0.94],
        format: function (val) {
            return val.toFixed(2) + '万';
        }
    }],
    yAxis: {
        title: '成交金额 (万元)',
        format: function (val) {
            return val.toFixed(2);
        },
        min: 0
    },
    width: 320,
    height: 200
});
```

![lineChart](https://raw.githubusercontent.com/xiaolin3303/wx-charts/master/example/line.png)
![lineChart](https://raw.githubusercontent.com/xiaolin3303/wx-charts/master/example/line.gif)

### columnChart

```javascript
new wxCharts({
    canvasId: 'columnCanvas',
    type: 'column',
    categories: ['2012', '2013', '2014', '2015', '2016', '2017'],
    series: [{
        name: '成交量1',
        data: [15, 20, 45, 37, 4, 80]
    }, {
        name: '成交量2',
        data: [70, 40, 65, 100, 34, 18]
    }],
    yAxis: {
        format: function (val) {
            return val + '万';
        }
    },
    width: 320,
    height: 200
});
```

![columnChart](https://raw.githubusercontent.com/xiaolin3303/wx-charts/master/example/column.png)
![columnChart](https://raw.githubusercontent.com/xiaolin3303/wx-charts/master/example/column.gif)

### areaChart

```javascript
new wxCharts({
    canvasId: 'areaCanvas',
    type: 'area',
    categories: ['2016-08', '2016-09', '2016-10', '2016-11', '2016-12', '2017'],
    series: [{
        name: '成交量1',
        data: [70, 40, 65, 100, 34, 18],
        format: function (val) {
            return val.toFixed(2) + '万';
        }
    }, {
        name: '成交量2',
        data: [15, 20, 45, 37, 4, 80],
        format: function (val) {
            return val.toFixed(2) + '万';
        }
    }],
    yAxis: {
        format: function (val) {
            return val + '万';
        }
    },
    width: 320,
    height: 200
});
```

![areaChart](https://raw.githubusercontent.com/xiaolin3303/wx-charts/master/example/area.png)
![areaChart](https://raw.githubusercontent.com/xiaolin3303/wx-charts/master/example/area.gif)

# 测试 
1. iPhone 6s, IOS 9.3.5
2. 小米4, ANDORID 6.0.1

兼容性问题请在[Issue](https://github.com/xiaolin3303/wx-charts/issues)中提出

# 一些问题的说明汇总
- [wx-charts自适应屏幕宽度的问题](https://github.com/xiaolin3303/wx-charts/issues/4)
- [项目中如何具体使用wxCharts](https://github.com/xiaolin3303/wx-charts/issues/28)
