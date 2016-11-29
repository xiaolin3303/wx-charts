# wx-charts
微信小程序图表工具，charts for weixin small app

基于canvas绘制，体积小巧

**支持图表类型**
- 饼图 `pie`
- 线图 `line`
- 柱状图 `column`
- 区域图 `area`

# 参数说明
`opts` Object

`opts.canvasId` String **required** 微信小程序canvas-id

`opts.width` Number **required** canvas宽度 单位为px

`opts.height` Number **required** canvas高度 单位为px

`opts.type` String **required** 图表类型，可选值为`pie`, 'line', 'column', 'area'

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

# example

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
