## wx-charts轻量级跨全端图表
- 基于`wx-charts`微信小程序图表改造成，适用于uni-app平台的跨端图表插件，感谢原作者`xiaolin3303`，原插件gitHub地址：<https://github.com/xiaolin3303/wx-charts>

# `【开源不易、改造不易、哪(拿)来简单】如本插件解决了您的问题，请一定要回来给个【5星评价】哦，您的支持是我的动力，感谢您的评价！！如遇到问题，请参见页面最后章节【常见问题】或【留言】解决。`

# `那谁，你需要的【图表拖拽】来啦，老板再也不怕图表很长很长很长啦，支持柱状图、折线图、区域图，赶快下载1.4.3吧，详见demo柱状图`

## `近期更新比较频繁，请各位朋友持续关注更新`

## 更新记录
- [ ] 2019.05.xx 计划加入柱状图、饼图、环形图、雷达图等`ToolTip`事件
- [ ] 2019.04.xx 计划加入`堆叠图`、`条状图`、`仪表盘`
- [ ] 2019.04.22 周一上午计划增加`图表拖拽`图`滚动条`显示当前拖拽进度的功能，敬请关注
- [x] 2019.04.19 增加`图表拖拽`示例，支持的图表有柱状图、折线图和区域图，除头条小程序外，其他各端现已全部支持拖拽功能（头条小程序canvas不支持点击事件），需配合绑定`@touchstart`, `@touchmove`, `@touchend`方法
- [x] 2019.04.18 修复`圆弧进度图`示例中`进度数值`JS计算精度引起的小数位数问题，加`Math.round()`解决，感谢`开发者M_少`发现问题。更正`参数说明`中几个错误描述
- [x] 2019.04.17 增加`自定义显示数据标签文案`示例，请下载1.4.1版本，参见圆环图ring数据事例
- [x] 2019.04.16 新增`圆弧进度图`,图表类型`gauge`，详见demo，感谢作者`2388306191@qq.com`提供思路
- [x] 2019.04.15 支持`横屏模式`，新增`rotate`参数，默认flase，示例见`折线图二`
- [x] 2019.04.14 支持百度、头条小程序，实现彻底跨全端
- [x] 2019.04.12 支持支付宝小程序（开发者工具不显示，上传代码真机预览可以显示）
- [x] 2019.04.01 改造成uni-app跨端组件


## 支持图表类型
- 饼图   `pie`
- 圆环图 `ring`
- 线图   `line`
- 柱状图 `column`
- 区域图 `area`
- 雷达图 `radar`
- 圆弧进度图 `gauge`

## 插件特点
- 改造后的插件可以跨端使用，支持H5、小程序（微信/支付宝/百度/头条）、APP，调用简单方便、性能及体验极佳。
- 虽然没有Echarts及F2图表功能强大，但可以实现一套业务逻辑各端通用，并解决了H5端图表显示模糊等问题。
- 支持单页面多图表，demo中单页10个图表，响应速度超快。
- 支持入场动画及ToolTip动画效果。
- 独特支持`横屏模式`感谢`masterLi`提供需求。

## 为何不用Echarts？
- 相比Echarts及F2的复杂的设置，本插件几乎等于傻瓜式的配置。
- Echarts在跨端使用更复杂，本插件只需要简单的两个`<canvas>`标签轻松区别搞定，代码整洁易维护。
- 本插件打包后的体积相比Echarts小很多很多，所以性能更好。
- 如果您是uni-app初学者，那么强烈建议您使用wx-charts，并且目前可以跨全端通用，减少工作量，增强一致性体验。
- 图表样式均可自定义，懂js的都可以读懂插件源码，直接修改wxcharts.js源码即可。
- 本插件原为我公司产品所用，经过大量测试，反复论证并加以改造而成，请各位放心使用。

## 图表示例
![](https://github.com/16cheng/uni-wx-charts/blob/master/example/uni-app/static/gauge.gif?raw=true)
![](https://github.com/16cheng/uni-wx-charts/blob/master/example/uni-app/static/column.gif?raw=true)
![](https://github.com/16cheng/uni-wx-charts/blob/master/example/uni-app/static/tuozhuai.gif?raw=true)
![](https://github.com/16cheng/uni-wx-charts/blob/master/example/uni-app/static/lineA.gif?raw=true)
![](https://github.com/16cheng/uni-wx-charts/blob/master/example/uni-app/static/area.gif?raw=true)
![](https://github.com/16cheng/uni-wx-charts/blob/master/example/uni-app/static/pie.gif?raw=true)
![](https://github.com/16cheng/uni-wx-charts/blob/master/example/uni-app/static/ring.gif?raw=true)
![](https://github.com/16cheng/uni-wx-charts/blob/master/example/uni-app/static/radar.gif?raw=true)
![](https://github.com/16cheng/uni-wx-charts/blob/master/example/uni-app/static/lineB.gif?raw=true)
## 引用方法
`import wxCharts from '../../components/wx-charts/wxcharts.js';`

## &lt; template &gt; 模板
```html
<template>
	<view>
		<view class="qiun-charts">
			<!--#ifdef H5 || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO-->
			<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}"></canvas>
			<!--#endif-->
			<!--#ifdef MP-WEIXIN || APP-PLUS -->
			<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts"></canvas>
			<!--#endif-->
		</view>
	</view>
<template>
```
> 通过cWidth、cHeight、pixelRatio三个参数解决H5端canvas组件在高分屏下模糊的问题

## &lt; script &gt;模板
```javascript
<script>
	import wxCharts from '../../components/wx-charts/wxcharts.js';
	var _self;
	var canvaColumn=null;
	//这里的Data为测试使用，生产环境请从服务器获取
	var Data={
		Column:{categories:['2012', '2013', '2014', '2015', '2016', '2017'],series:[{name: '成交量1',data:[15, 20, 45, 37, 43, 34]},{name: '成交量2',data:[30, 40, 25, 14, 34, 18]}]}
		}
	export default {
		data() {
			return {
				cWidth:'',
				cHeight:'',
				pixelRatio:1
			}
		},
		onLoad() {
			_self = this;
			//#ifdef H5 || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO
			uni.getSystemInfo({
				success: function (res) {
					if(res.pixelRatio>1){
						_self.pixelRatio =2;
						//正常这里_self.pixelRatio给2就行，如果要求高可用下行
						//_self.pixelRatio =res.pixelRatio;
					}
				}
			});
			//#endif
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
		},
		onReady() {
			this.showColumn("canvasColumn",Data.Column);
		},
		methods: {
			showColumn(canvasId,chartData){
				canvaColumn=new wxCharts({
					canvasId: canvasId,
					type: 'column',
					legend:true,
					fontSize:11,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					rotate:false,//新增横屏模式（非必填参数，默认false）
					animation: true,
					categories: chartData.categories,
					series: chartData.series,
					xAxis: {
						disableGrid:true
					},
					yAxis: {
						//disabled:true
					},
					dataLabel: true,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						column: {
						  width: _self.cWidth*_self.pixelRatio*0.45/chartData.categories.length
						}
					  }
				});
			},
			changeData(){
				//这里只做了柱状图数据动态更新，其他图表同理。
				canvaColumn.updateData({
					series: Data.ColumnB.series,
					categories: Data.ColumnB.categories
				});
			},
		}
	}
</script>
```
> - `var canvaColumn=null;`不是必须定义的变量，如果需要动态更新数据或者需要交互显示ToolTip则需要定义。
> - 如果在H5端使用，`cWidth`和`cHeight`是必须定义的（当然你也可以用别的变量名），需要注意的是要和当前canvas中的样式定义的数值相等，即uni-app中的upx数值相等。
> - `pixelRatio`参数是解决了H5端高分屏canvas模糊而设置的，非H5端给1即可，H5端正常给2就可以，当然如果项目需求较高，设置为当前设备的像素比也没问题。

## &lt; style &gt;模板
```css
<style>
.charts{width: 750upx; height:500upx;background-color: #FFFFFF;}
</style>
```

## 参数说明

| 属性 | 类型 | 默认 |说明|
| :------ | :-----: | :-----: | :------------ |
|opts |Object| | |
|opts.canvasId | String|required|微信小程序canvas-id|
|opts.width |Number |required| canvas宽度，单位为px`H5端高分屏需要乘像素比`|
|opts.height| Number| required |canvas高度，单位为px`H5端高分屏需要乘像素比`|
|`opts.pixelRatio`| Number| required |`新增参数，像素比，默认为1，非H5端引用无需设置`|
|`opts.rotate`| Boolean| 默认false |`新增参数，横屏模式，默认为false`|
|`opts.fontSize`| Number | 默认13px |`新增参数，全局默认字体大小（可选，单位为px，默认13px）高分屏不必乘像素比，自动根据pixelRatio计算`|
|opts.background| String | |canvas背景颜色（如果页面背景颜色不是白色请设置为页面的背景颜色，默认#ffffff）|
|opts.enableScroll |Boolean | |是否开启图表可拖拽滚动 默认false 支持line, area，`新增支持column`图表类型(需配合绑定@touchstart, @touchmove,  @touchend方法)|
|opts.title| Object| | (only for ring chart)|
|opts.title.name| String | |标题内容|
|opts.title.fontSize| Number |  |标题字体大小（可选，单位为px）|
|opts.title.color| String| | 标题颜色（可选）|
|opts.title.offsetX |Number| 默认0px | 标题横向位置偏移量，单位px，默认0|
|opts.subtitle| Object| | (only for ring chart)|
|opts.subtitle.name| String| | 副标题内容|
|opts.subtitle.offsetX| Number| 默认0px | 副标题横向位置偏移量，单位px，默认0|
|opts.subtitle.fontSize| Number| | 副标题字体大小（可选，单位为px）|
|opts.subtitle.color| String| | 副标题颜色（可选）|
|opts.animation| Boolean |默认为 true |是否动画展示|
|opts.legend| Boolen |默认为 true| 是否显示图表下方各类别的标识|
|opts.type|String |required| 图表类型，可选值为pie, line, column, area, ring, radar, 新增`gauge`|
|opts.categories| Array| required |(饼图、圆环图不需要) 数据类别分类|
|opts.dataLabel| Boolean |默认为 true |是否在图表中显示数据内容值|
|opts.dataPointShape| Boolean |默认为 true| 是否在图表中显示数据点图形标识|
|opts.disablePieStroke |Boolean |默认为 false| 不绘制饼图（圆环图）各区块的白色分割线|
|opts.xAxis |Object | |X轴配置|
|`opts.xAxis.itemCount`| Number| 默认为 5 | `新增参数，X轴可见区域刻度数量，配合拖拽滚动使用（即仅在启用enableScroll时有效）`|
|opts.xAxis.gridColor| String| 默认为 #cccccc | X轴网格颜色 例如#7cb5ec|
|opts.xAxis.fontColor| String| 默认为 #666666 | X轴数据点颜色 例如#7cb5ec|
|opts.xAxis.disableGrid |Boolean| 默认为 false| 不绘制X轴网格|
|opts.xAxis.type |String | |可选值calibration(刻度) 默认为包含样式|
|opts.yAxis |Object | |Y轴配置|
|opts.yAxis.format |Function| | 自定义Y轴文案显示|
|opts.yAxis.min| Number| | Y轴起始值|
|opts.yAxis.max| Number | |Y轴终止值|
|opts.yAxis.title| String | |Y轴title|
|opts.yAxis.gridColor |String | 默认为 #cccccc| Y轴网格颜色 例如#7cb5ec |
|opts.yAxis.fontColor| String | 默认为 #666666 | Y轴数据点颜色 例如#7cb5ec|
|opts.yAxis.titleFontColor |String | 默认为 #333333 | Y轴title颜色 例如#7cb5ec|
|opts.yAxis.disabled |Boolean |默认为 false| 不绘制Y轴|

###其他非通用配置项

| 属性 | 类型 | 默认 |说明|
| :------ | :-----: | :-----: | :------------ |
|opts.extra| Object| |其他非通用配置项|
|opts.extra.ringWidth| Number | |ringChart圆环宽度，单位为px|
|`opts.extra.gaugeWidth`| Number | |`新增参数，圆弧进度图弧线宽度，单位为px`|
|opts.extra.lineStyle| String| straight | (仅对line, area图表有效) 可选值：curve曲线，straight直线 (default)|
|opts.extra.column| Object | |柱状图相关配置|
|opts.extra.column.width |Number| | 柱状图每项的图形宽度，单位为px|
|opts.extra.legendTextColor |String | 默认为 #cccccc | legend文案颜色 例如#7cb5ec|
|opts.extra.radar| Object | |雷达图相关配置|
|opts.extra.radar.max| Number|默认为 series |data的最大值，数据区间最大值，用于调整数据显示的比例|
|opts.extra.radar.labelColor |String|默认为 #666666|各项标识文案的颜色|
|opts.extra.radar.gridColor |String| 默认为 #cccccc| 雷达图网格颜色|
|opts.extra.pie| Object| | 饼图、圆环图相关配置|
|opts.extra.pie.offsetAngle| Number| 默认为0| 起始角度偏移度数，顺时针方向，起点为3点钟位置（比如要设置起点为12点钟位置，即逆时针偏移90度，传入-90即可）|
|opts.series |Array |required |数据列表|

###数据列表每项结构定义

| 属性 | 类型 | 默认 |说明|
| :------ | :-----: | :-----: | :------------ |
|dataItem|  Object| | |
|dataItem.data| Array |required |(饼图、圆环图为Number) 数据，如果传入null图表该处出现断点|
|dataItem.color |String | |例如#7cb5ec 不传入则使用系统默认配色方案|
|dataItem.name |String | |数据名称|
|dateItem.format| Function| | 自定义显示数据内容|

## 方法 & 事件

### 方法
- `updateData(data)` 更新图表数据，data: object，data.categories(可选，具体见参数说明)，data.series(可选，具体见参数说明)，data.title(可选，具体见参数说明)，data.subtitle(可选，具体见参数说明)
- `stopAnimation() `停止当前正在进行的动画效果，直接展示渲染的最终结果
- `addEventListener(type, listener) `添加事件监听，type: String事件类型，listener: function 处理方法
- `getCurrentDataIndex(e) `获取图表中点击时的数据序列编号(-1表示未找到对应的数据区域), e: Object微信小程序标准事件，需要手动的去绑定touch事件，具体可参考wx-charts-demo中column图示例
- `showToolTip(e, options?)` 图表中展示数据详细内容(目前仅支持line和area图表类型)，e: Object微信小程序标准事件，options: Object可选，tooltip的自定义配置，支持option.background，默认为#000000; option.format, function类型，接受两个传入的参数，seriesItem(Object, 包括seriesItem.name以及seriesItem.data)和category，可自定义tooltip显示内容。具体可参考wx-charts-demo中line图示例
- `scrollStart(e)`, `scroll(e)`, `scrollEnd(e)`设置支持图表拖拽系列事件(支持line, area, column)，具体参考wx-charts-demo中ScrollLine图示例

### 事件
- `renderComplete` 图表渲染完成（如果有动画效果，则动画效果完成时触发）

### 如何使用事件
```javascript
let chart = new wxCharts(...);
chart.addEventListener('renderComplete', () => {
    // your code here
});
```


## 常见问题

各位遇到问题请先参考以下问题，如果仍不能解决，请留言。

### 通用问题
- 如果用在您的项目上图表不显示，请先运行demo页面，如果demo页面也无法显示，请查看全局样式是否定义了`canvas的样式`，如有请取消。
- 如发现实例化图表后，`客户端卡死`的状况，请在实例化图表前（即调用`showColumn(canvasId,chartData)`前）检查传入图表数组（`chartData.categories`和`chartData.series`）是否为空，如果为空则不要实例化图表。后续将在源码中解决此问题。

### H5、支付宝、百度、头条问题
- 在高分屏模式下，如果发现图表已显示，但位置不正确，请检查上级`view`容器的`样式`，为了解决高分屏canvas模糊问题，使用了css的`transform`，所以请修改上级样式使canvas容器缩放至相应位置。
- 如果将canvas放在多级<view>组件下，遇到ToolTip不显示或点击区域不正确，请在`touch`事件中增加以下代码解决。
```javascript
//#ifdef H5
e.mp.currentTarget.offsetTop+=uni.upx2px(510);
//#endif
```
> `uni.upx2px(510);`是canvas组件的上级<view>组件的高度

### 组件问题
- 很多小伙伴们自行把本插件做成组件来调用，做成组件需要注意，如果涉及到v-if切换显示图表组件，第二次可能会变空白，这里有两个建议：1、建议用v-show替代v-if切换显示图表组件。2、建议参考demo，不要将canvas做到组件里使用，即直接写在主页面中。
## `如果跨端使用，最好不要做到组件里`