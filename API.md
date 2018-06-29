## 参数说明 opts Object

- opts.canvasId String required 微信小程序canvas-id

- opts.width Number required canvas宽度，单位为px

- opts.height Number required canvas高度，单位为px

- opts.background String canvas背景颜色（如果页面背景颜色不是白色请设置为页面的背景颜色，默认#ffffff）

- opts.enableScroll Boolean 是否开启图表可拖拽滚动 默认false 支持line, area图表类型(需配合绑定scrollStart, scroll, scrollEnd方法)

- opts.title Object (only for ring chart)

    - opts.title.name String 标题内容

    - opts.title.fontSize Number 标题字体大小（可选，单位为px）

    - opts.title.color String 标题颜色（可选）

    - opts.title.offsetX Number 标题横向位置偏移量，单位px，默认0

- opts.subtitle Object (only for ring chart)

    - opts.subtitle.name String 副标题内容

    - opts.subtitle.offsetX Number 副标题横向位置偏移量，单位px，默认0

    - opts.subtitle.fontSize Number 副标题字体大小（可选，单位为px）

    - opts.subtitle.color String 副标题颜色（可选）

- opts.animation Boolean default true 是否动画展示

- opts.legend Boolen default true 是否显示图表下方各类别的标识

- opts.type String required 图表类型，可选值为pie, line, column, area, ring, radar

- opts.categories Array required (饼图、圆环图不需要) 数据类别分类

- opts.dataLabel Boolean default true 是否在图表中显示数据内容值

- opts.dataPointShape Boolean default true 是否在图表中显示数据点图形标识

- opts.disablePieStroke Boolean default false 不绘制饼图（圆环图）各区块的白色分割线

- opts.xAxis Object X轴配置

    - opts.xAxis.disabled Boolean 不绘制x坐标轴，包括文字，当两个图表共用同一x坐标轴时可用

    - opts.xAxis.gridColor String 例如#7cb5ec default #cccccc X轴网格颜色

    - opts.xAxis.fontColor String 例如#7cb5ec default #666666 X轴数据点颜色

    - opts.xAxis.disableGrid Boolean default false 不绘制X轴网格

    - opts.xAxis.type String 可选值calibration(刻度) 默认为包含样式

    - [新增] opts.xAxis.labelFontNumber Number 可选值，默认1.5，可调整x轴数据稀疏度

    - [新增] opts.xAxis.disabledLabelRotate Boolean 可选值，是否倾斜显示x轴文字

- opts.yAxis Object Y轴配置

    - opts.yAxis.format Function 自定义Y轴文案显示

    - opts.yAxis.min Number Y轴起始值

    - opts.yAxis.max Number Y轴终止值

    - opts.yAxis.title String Y轴title

    - opts.yAxis.gridColor String 例如#7cb5ec default #cccccc Y轴网格颜色

    - opts.yAxis.fontColor String 例如#7cb5ec default #666666 Y轴数据点颜色

    - opts.yAxis.titleFontColor String 例如#7cb5ec default #333333 Y轴title颜色

    - opts.yAxis.disabled Boolean default false 不绘制Y轴

- opts.extra Object 其他非通用配置项

    - opts.extra.ringWidth Number ringChart圆环宽度，单位为px

    - opts.extra.lineStyle String (仅对line, area图表有效) 可选值：curve曲线，straight直线 (default)
    
    - [新增] opts.extra.area.line Boolean 区域图area点之间加连线

    - [新增] opts.extra.line.areaStyle Boolean 折线图line显示区域，为快捷设置方式，若需调整颜色，可在opts.series数据项设置

    - opts.extra.column Object 柱状图相关配置

        - opts.extra.column.width Number 柱状图每项的图形宽度，单位为px

    - opts.extra.legendTextColor String 例如#7cb5ec default #cccccc legend文案颜色

    - opts.extra.radar Object 雷达图相关配置

        - opts.extra.radar.max Number, 默认为series data的最大值，数据区间最大值，用于调整数据显示的比例

        - opts.extra.radar.labelColor String, 默认为#666666, 各项标识文案的颜色

        - opts.extra.radar.gridColor String, 默认为#cccccc, 雷达图网格颜色

    - opts.extra.pie Object 饼图、圆环图相关配置

        - opts.extra.pie.offsetAngle Number, 默认为0, 起始角度偏移度数，顺时针方向，起点为3点钟位置（比如要设置起点为12点钟位置，即逆时针偏移90度，传入-90即可）

- opts.series Array required 数据列表

    - 数据列表每项结构定义 dataItem Object

    - dataItem.data Array required (饼图、圆环图为Number) 数据，如果传入null图表该处出现断点

    - dataItem.color String 例如#7cb5ec 不传入则使用系统默认配色方案

    - dataItem.name String 数据名称

    - dateItem.format Function 自定义显示数据内容

    - [新增] dateItem.symbol String 折线图line／区域图area数据点的形状，可选值：'diamond', 'circle', 'triangle', 'rect'

    - [新增] dataItem.areaStyle Object 画折线区域

        - [新增] dataItem.areaStyle.color 折线区域颜色，可不设置，值可为十六进制/rgba()
