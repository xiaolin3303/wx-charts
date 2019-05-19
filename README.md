## uCharts高性能跨全端图表
- 适用于uni-app平台的跨全端图表插件，顾名`uCharts`。
- 基于`wx-charts`微信小程序图表改造成，感谢原作者`xiaolin3303`。
- 原插件gitHub地址：<https://github.com/xiaolin3303/wx-charts>


## uCharts官方网站
- https://www.ucharts.cn(已注册，备案中，现无法访问)
- 后续将在官网提供在线示例及参数说明指引等，以帮助大家方便使用。

# `uCharts的发展，离不开各位的支持和帮助！最近很多热心朋友提出很多问题及解决方案，更好的完善uCharts，以帮助更多朋友解决问题，在此感谢大家的付出和贡献！`

## 引用方法
`import uCharts from '../../components/u-charts/u-charts.js';`


# `亲们，文档在下面等你哦`


# [在线文档(参见API章节)（其他说明完善中）](https://www.kancloud.cn/qiun/ucharts/content)

# [在线文档(参见API章节)（其他说明完善中）](https://www.kancloud.cn/qiun/ucharts/content)

# [在线文档(参见API章节)（其他说明完善中）](https://www.kancloud.cn/qiun/ucharts/content)


## 快速体验

一套代码编到7个平台，依次扫描二维码，亲自体验uCharts图表跨平台效果！

IOS因demo比较简单无法上架，请自行编译；百度小程序和头条小程序审核较严格，可能一时半会不能上线了，大家可以暂时在小程序IDE中自行编译测试。

![](https://github.com/16cheng/uCharts/blob/master/example/uni-app/static/qrcode.png?raw=true)


# `【开源不易、改造不易、哪(拿)来简单】如本插件解决了您的问题，请一定要回来给个【5星评价】哦，您的支持是我的动力，感谢您的评价！！如遇到问题，请先参见页面最后章节【常见问题】解决，如没有您的问题，请在页面最下面【撰写评论】，尽量不要在【问答】中提问（因有可能会漏掉您的问题）。`

## 新增`堆叠图`，`温度计式图表`


## [更新记录](https://www.kancloud.cn/qiun/ucharts/content/%E6%9B%B4%E6%96%B0%E8%AE%B0%E5%BD%95.md)

## 未来计划
- [ ] 2019.xx.xx 计划太多~~~~轮子不好造啊~~~~
- [ ] 2019.08.xx 计划搭建`uCharts官方网站`，以供初学者快速上手uCharts
- [ ] 2019.07.xx 计划重建各端demo，以供初学者快速上手uCharts
- [ ] 2019.07.xx 计划加入柱状图、饼图、环形图、雷达图等`ToolTip`事件
- [ ] 2019.06.xx 计划加入`组件内使用示例`
- [ ] 2019.06.xx 计划加入`堆叠图`、`条状图`、`分时图`
- [ ] 2019.06.xx 计划加入`渐变颜色填充`功能
- [ ] 2019.05.xx 推迟计划加入`第二种仪表盘样式`,增加[《亲手教您如何改造uCharts，打造您的专属图表》](https://github.com/16cheng/uCharts/wiki/%E4%BA%B2%E6%89%8B%E6%95%99%E6%82%A8%E5%A6%82%E4%BD%95%E6%94%B9%E9%80%A0wx-charts)教程。
- [ ] 2019.05.xx 计划修改X轴刻度标签`抽稀策略`，以适应K线图及不需要文案旋转的需求
- [ ] 2019.05.xx 计划加入`辅助线（标记线）`功能，支持`柱状图、折线图、区域图、K线图`
- [ ] 2019.05.xx 完善K线图及其辅助功能。
- [ ] 2019.05.xx 计划修复折线图样式为曲线时，个别情况下曲线超出x轴的问题。
- [ ] 2019.05.21 计划新增堆叠图，温度计图。

## 支持图表类型
- 饼图   `pie`
- 圆环图 `ring`
- 线图   `line`（直线、曲线）
- 柱状图 `column`（分组、堆叠、温度计）
- 区域图 `area`（直线、曲线）
- 雷达图 `radar`
- 圆弧进度图 `arcbar`
- 仪表盘 `gauge`
- K线图  `candle`(完善中)
- 条状图 `bar`(开发中)
- 混合图 `mix`（支持point、line直线曲线、column、area直线曲线）


## 插件特点
- 改造后的插件可以跨端使用，支持H5、小程序（微信/支付宝/百度/头条）、APP，调用简单方便、性能及体验极佳。
- 虽然没有Echarts及F2图表功能强大，但可以实现一套业务逻辑各端通用，并解决了支付宝小程序图表显示模糊等问题。
- 支持单页面多图表，demo中单页10个图表，响应速度超快。
- 支持入场动画及ToolTip动画效果。
- 独特支持`横屏模式`感谢`masterLi`提供需求。

## 为何不用Echarts？
- 相比Echarts及F2的复杂的设置，本插件几乎等于傻瓜式的配置。
- Echarts在跨端使用更复杂，本插件只需要简单的两个`<canvas>`标签轻松区别搞定，代码整洁易维护。
- Echarts在IOS端图表显示错位，只能引用网页解决。
- 本插件打包后的体积相比Echarts小很多很多，所以性能更好。
- 如果您是uni-app初学者，那么强烈建议您使用uCharts，并且目前可以跨全端通用，减少工作量，增强一致性体验。
- 图表样式均可自定义，懂js的都可以读懂插件源码，直接修改wxcharts.js源码即可。
- 本插件经过大量测试，反复论证并加以改造而成，请各位放心使用。

## uni-app图表选型参考流程

![](https://github.com/16cheng/uCharts/blob/master/example/uni-app/static/xuanxing.png?raw=true)

## 亲手教您如何改造uCharts，打造您的专属图表
- 为何要改造uCharts?
- 并不是所有图表插件直接拿来就可以满足客户需求，如果您的UI设计师设计一个图表，如下图:

![](https://github.com/16cheng/uCharts/blob/master/example/uni-app/static/example.gif?raw=true)

- 您会发现这个图表即使在echarts里也不是很好实现，那么就需要我们自己动手去实现。下面就让我们一起来完成，本文旨在抛砖引玉，希望各位朋友能够更好的应用uCharts来完成您的项目，如果您有更好的设计，请提交您的PR到github[uCharts跨端图表](https://github.com/16cheng/uCharts)，帮助更多朋友，感谢您的付出及贡献！

## [uCharts跨端图表改造教程（暂未完成，请关注）](https://github.com/16cheng/uCharts/wiki/%E4%BA%B2%E6%89%8B%E6%95%99%E6%82%A8%E5%A6%82%E4%BD%95%E6%94%B9%E9%80%A0wx-charts)


## 图表示例
![](https://github.com/16cheng/uCharts/blob/master/example/uni-app/static/stack.gif?raw=true)
![](https://github.com/16cheng/uCharts/blob/master/example/uni-app/static/meter.gif?raw=true)
![](https://github.com/16cheng/uCharts/blob/master/example/uni-app/static/mix.gif?raw=true)
![](https://github.com/16cheng/uCharts/blob/master/example/uni-app/static/candle.gif?raw=true)
![](https://github.com/16cheng/uCharts/blob/master/example/uni-app/static/yibiaopan.gif?raw=true)
![](https://github.com/16cheng/uCharts/blob/master/example/uni-app/static/arcbar.gif?raw=true)
![](https://github.com/16cheng/uCharts/blob/master/example/uni-app/static/column.gif?raw=true)
![](https://github.com/16cheng/uCharts/blob/master/example/uni-app/static/column2.gif?raw=true)
![](https://github.com/16cheng/uCharts/blob/master/example/uni-app/static/lineA.gif?raw=true)
![](https://github.com/16cheng/uCharts/blob/master/example/uni-app/static/lineA-scroll.gif?raw=true)
![](https://github.com/16cheng/uCharts/blob/master/example/uni-app/static/dashLine.gif?raw=true)
![](https://github.com/16cheng/uCharts/blob/master/example/uni-app/static/area.gif?raw=true)
![](https://github.com/16cheng/uCharts/blob/master/example/uni-app/static/pie.gif?raw=true)
![](https://github.com/16cheng/uCharts/blob/master/example/uni-app/static/ring.gif?raw=true)
![](https://github.com/16cheng/uCharts/blob/master/example/uni-app/static/radar.gif?raw=true)
![](https://github.com/16cheng/uCharts/blob/master/example/uni-app/static/lineB.gif?raw=true)


## 常见问题

各位遇到问题请先参考以下问题，如果仍不能解决，请留言。

### 通用问题
- 如果用在您的项目上图表不显示，请先运行demo页面，如果demo页面也无法显示，请查看全局样式是否定义了`canvas的样式`，如有请取消。
- 如发现实例化图表后，`客户端卡死`的状况，请在实例化图表前（即调用`showColumn(canvasId,chartData)`前）检查传入图表数组（`chartData.categories`和`chartData.series`）是否为空，如果为空则不要实例化图表。后续将在源码中解决此问题。
- 图表`背景颜色`问题，很多朋友设置图表背景颜色时候，只修改了view和canvas的css,忘记了修改实例化参数中的`background:'#FFFFFF'`，导致图表画板右侧有一道白条（这个是图表配置中的右边距），所以特修改了demo中的`柱状图`的背景颜色供大家参考。

### 支付宝、百度、头条问题
- 在高分屏模式下，如果发现图表已显示，但位置不正确，请检查上级`view`容器的`样式`，为了解决高分屏canvas模糊问题，使用了css的`transform`，所以请修改上级样式使canvas容器缩放至相应位置。
- 如果将canvas放在多级<view>组件下，遇到ToolTip不显示或点击区域不正确，请在`touch`事件中增加以下代码解决。
```javascript
//#ifdef MP-ALIPAY || MP-BAIDU || MP-TOUTIAO
e.mp.currentTarget.offsetTop+=uni.upx2px(510);
//#endif
```
> `uni.upx2px(510);`是canvas组件的上级<view>组件的高度

### 组件问题
- 很多小伙伴们自行把本插件做成组件来调用，做成组件需要注意，如果涉及到v-if切换显示图表组件，第二次可能会变空白，这里有两个建议：
1、建议用v-show替代v-if切换显示图表组件。
2、建议参考demo，不要将canvas做到组件里使用，即直接写在主页面中。
### 初步解决`组件内使用问题`，感谢`342805357@qq.com`提出组件问题解决方案，增加`opts.$this`参数，组件使用时实例化前请传递this。后续会增加组件使用示例，请关注。

# `支付宝小程序IDE中不显示，但运行到真机是可以显示的，请真机测试。`