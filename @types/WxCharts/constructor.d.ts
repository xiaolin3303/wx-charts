declare class WxCharts {
	constructor(options: WxChartsOptions);

	/**
	 * 更新图表数据
	 */
	updateData(data: WxChartsUpdateData): void;

	/**
	 * 停止当前正在进行的动画效果，直接展示渲染的最终结果
	 */
	stopAnimation(): void;

	/**
	 * 添加事件监听
	 * @param type
	 * @param listener
	 */
	addEventListener(type: string, listener: Function): void;

	/**
	 * 获取图表中点击时的数据序列编号(-1表示未找到对应的数据区域)
	 * @param event 微信小程序标准事件，需要手动的去绑定touch事件
	 */
	getCurrentDataIndex(event: object): number;

	/**
	 * 图表中展示数据详细内容
	 * @param event
	 * @param options
	 */
	showToolTip(event: object, options?: WxChartsTooltipOptions): void;
}

interface WxChartsTooltipOptions {
	/**
	 * tooltip背景色
	 */
	background?: string;
}

interface WxChartsUpdateData {

	/**
	 * same as WxChartsOptions.categories
	 */
	categories?: string[];

	series?: WxChartsSeries[];

	title?: WxChartsTitle;

	subtitle?: WxChartsSubtitle;
}