interface WxChartsOptions {
	/**
	 * 微信小程序canvas-id
	 */
	canvasId: string;

	/**
	 * canvas宽度，单位为px
	 */
	width: number;

	/**
	 * canvas高度，单位为px
	 */
	height: number;

	/**
	 * 图表类型
	 */
	type: WxChartsType;

	/**
	 * 坐标轴配置
	 */
	xAxis: WxChartsXAxis;
	yAxis: WxChartsYAxis;

	series: WxChartsSeries[]

	/**
	 * (饼图、圆环图不需要) 数据类别分类
	 */
	categories?: string[];

	/**
	 * 标题配置 (only for ring chart)
	 */
	title?: WxChartsTitle;

	/**
	 * 子标题（(only for ring chart)）
	 */
	subtitle?: WxChartsSubtitle;

	/**
	 * default true 是否动画展示
	 */
	animation?: boolean;

	/**
	 * default true 是否显示图表下方各数据集合的name
	 */
	legend?: boolean;

	/**
	 * default true 是否在图表中显示数据内容值
	 */
	dataLabel?: boolean;

	/**
	 * default true 是否在图表中显示数据点图形标识
	 */
	dataPointShape?: boolean;

	/**
	 * default false 不绘制饼图（圆环图）各区块的白色分割线
	 */
	disablePieStroke?: boolean;

	extra?: WxChartsExtra;

	config?: WxChartsExtendConfig;

	/**
	 * 线图的线宽
	 */
	lineWidth?: Number
}

interface WxChartsExtendConfig {

}

/**
 * 图标数据
 */
interface WxChartsSeries {
	/**
	 * (饼图、圆环图为number) 数据，如果传入null图表该处出现断点
	 */
	data: any[];

	/**
	 * 数据点颜色
	 */
	color: string;

	/**
	 * 数据名称
	 */
	name: string;

	/**
	 * 自定义显示数据内容，返回处理后的数据
	 */
	format<T>(value: T): T;
}

interface WxChartsExtra {
	/**
	 * ringChart圆环宽度，单位为px
	 */
	ringWidth?: number;

	/**
	 * (仅对line, area图表有效) 可选值：curve曲线，straight直线 (default)
	 */
	lineStyle?: WxChartsLineStyle;

	/**
	 * 柱状图相关配置
	 */
	column?: WxChartsExtraColumn;

	/**
	 * legend文案颜色
	 */
	legendTextColor: string;

	/**
	 * 雷达图相关配置
	 */
	radar?: WxChartsExtraRadar;
}

interface WxChartsExtraRadar {
	/**
	 * 默认为series data的最大值，数据区间最大值，用于调整数据显示的比例
	 */
	max: number;

	/**
	 * 默认为#666666, 各项标识文案的颜色
	 */
	labelColor: string;

	/**
	 * 默认为#cccccc, 雷达图网格颜色
	 */
	gridColor: string;
}

interface WxChartsExtraColumn {
	/**
	 * 柱状图每项的图形宽度，单位为px
	 */
	width: number;
}

declare enum WxChartsLineStyle {
	CURVE = 'curve',
	STRAIGHT = 'straight'
}

interface WxChartsXAxis {
	/**
	 * 坐标轴网格颜色，例如#7cb5ec
	 */
	gridColor: string;

	/**
	 * 坐标轴数据点颜色
	 */
	fontColor: string;

	/**
	 * default false 不绘制某坐标轴网格
	 */
	disableGrid: boolean;

	/**
	 * 可选值calibration(刻度) 默认为包含样式
	 */
	type: string;
}

interface WxChartsYAxis {
	/**
	 * 自定义Y轴文案显示
	 */
	format: Function;

	/**
	 * Y轴起始值
	 */
	min: number;

	/**
	 * Y轴终止值
	 */
	max: number;

	/**
	 * Y轴title
	 */
	title: string;

	/**
	 * Y轴title颜色
	 */
	titleFontColor: string;

	/**
	 * 不绘制Y轴
	 */
	disabled: boolean;

	/**
	 * Y轴网格颜色
	 */
	gridColor: string;
}

declare enum WxChartsType {
	PIE = 'pie',
	LINE = 'line',
	COLUMN = 'column',
	AREA = 'area',
	RING = 'ring',
	RADAR = 'radar'
}

interface WxChartsTitle {
	/**
	 * 标题内容
	 */
	name: string;

	/**
	 * 标题字体大小（可选，单位为px）
	 */
	fontSize: number;

	/**
	 * 标题颜色（可选）
	 */
	color: string;

	/**
	 * 标题横向位置偏移量，单位px，默认0
	 */
	offsetX: number;
}

interface WxChartsSubtitle {
	/**
	 * 副标题内容
	 */
	name: string;

	/**
	 * 副标题横向位置偏移量，单位px，默认0
	 */
	offsetX: number;

	/**
	 * 副标题字体大小（可选，单位为px）
	 */
	fontSize: number;

	/**
	 * 副标题颜色（可选）
	 */
	color: string;
}