<template>
	<view class="qiun-columns">
		<view class="qiun-padding" style="font-size: 32upx;">
			<text>【开源不易、改造不易、拿来简单】如本插件解决了您的问题，请一定要回来给个【5星评价】哦，您的支持是我的动力，感谢您的评价！！如遇到问题，请参见官方插件下载页面最后章节【常见问题】或【留言】解决。</text>
		</view>
		<view class="qiun-padding">
			<view class="qiun-tip" @tap="changeData()">修改柱状图数据</view>
		</view>
        <view class="qiun-bg-white qiun-title-bar" >
        	<view class="qiun-title-dot-light">柱状图</view>
        </view>
        <view class="qiun-charts">
        	<!--#ifdef H5 || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO -->
        	<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}"></canvas>
        	<!--#endif-->
        	<!--#ifdef MP-WEIXIN || APP-PLUS -->
        	<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts"></canvas>
        	<!--#endif-->
        </view>
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
			<view class="qiun-title-dot-light">圆弧进度图</view>
		</view>
		<view class="qiun-charts3">
			<!--#ifdef H5 || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO-->
			<canvas canvas-id="canvasGauge1" id="canvasGauge1" class="charts3" :style="{'width':cWidth3*pixelRatio+'px','height':cHeight3*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth3*(pixelRatio-1)/2+'px','margin-top':-cHeight3*(pixelRatio-1)/2+'px'}"></canvas>
			<canvas canvas-id="canvasGauge2" id="canvasGauge2" class="charts3" :style="{'width':cWidth3*pixelRatio+'px','height':cHeight3*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':cWidth3-cWidth3*(pixelRatio-1)/2+'px','margin-top':-cHeight3*(pixelRatio-1)/2+'px'}"></canvas>
			<canvas canvas-id="canvasGauge3" id="canvasGauge3" class="charts3" :style="{'width':cWidth3*pixelRatio+'px','height':cHeight3*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':cWidth3*2-cWidth3*(pixelRatio-1)/2+'px','margin-top':-cHeight3*(pixelRatio-1)/2+'px'}"></canvas>
			<!--#endif-->
			<!--#ifdef MP-WEIXIN || APP-PLUS -->
			<canvas canvas-id="canvasGauge1" id="canvasGauge1" class="charts3"></canvas>
			<canvas canvas-id="canvasGauge2" id="canvasGauge2" class="charts3" style="margin-left: 250upx;"></canvas>
			<canvas canvas-id="canvasGauge3" id="canvasGauge3" class="charts3" style="margin-left: 500upx;"></canvas>
			<!--#endif-->
		</view>
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
			<view class="qiun-title-dot-light">折线图一</view>
		</view>
		<view class="qiun-charts">
			<!--#ifdef H5 || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO-->
			<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}" @touchstart="touchLineA"></canvas>
			<!--#endif-->
			<!--#ifdef MP-WEIXIN || APP-PLUS -->
			<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
			<!--#endif-->
		</view>
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
			<view class="qiun-title-dot-light">折线图二（横屏图表）</view>
		</view>
		<view class="qiun-charts-rotate">
			<!--#ifdef H5 || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO-->
			<canvas canvas-id="canvasLineB" id="canvasLineB" class="charts-rotate" :style="{'width':cWidth2*pixelRatio+'px','height':cHeight2*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth2*(pixelRatio-1)/2+'px','margin-top':-cHeight2*(pixelRatio-1)/2+'px'}" @touchstart="touchLineB"></canvas>
			<!--#endif-->
			<!--#ifdef MP-WEIXIN || APP-PLUS -->
			<canvas canvas-id="canvasLineB" id="canvasLineB" class="charts-rotate" @touchstart="touchLineB"></canvas>
			<!--#endif-->
		</view>
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
			<view class="qiun-title-dot-light">区域图</view>
		</view>
		<view class="qiun-charts">
			<!--#ifdef H5 || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO-->
			<canvas canvas-id="canvasArea" id="canvasArea" class="charts" :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}" @touchstart="touchArea"></canvas>
			<!--#endif-->
			<!--#ifdef MP-WEIXIN || APP-PLUS -->
			<canvas canvas-id="canvasArea" id="canvasArea" class="charts" @touchstart="touchArea"></canvas>
			<!--#endif-->
		</view>
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
			<view class="qiun-title-dot-light">饼状图</view>
		</view>
		<view class="qiun-charts">
			<!--#ifdef H5 || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO-->
			<canvas canvas-id="canvasPie" id="canvasPie" class="charts" :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}"></canvas>
			<!--#endif-->
			<!--#ifdef MP-WEIXIN || APP-PLUS -->
			<canvas canvas-id="canvasPie" id="canvasPie" class="charts"></canvas>
			<!--#endif-->
		</view>
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
			<view class="qiun-title-dot-light">环形图</view>
		</view>
		<view class="qiun-charts">
			<!--#ifdef H5 || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO-->
			<canvas canvas-id="canvasRing" id="canvasRing" class="charts" :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}"></canvas>
			<!--#endif-->
			<!--#ifdef MP-WEIXIN || APP-PLUS -->
			<canvas canvas-id="canvasRing" id="canvasRing" class="charts"></canvas>
			<!--#endif-->
		</view>
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
			<view class="qiun-title-dot-light">雷达图</view>
		</view>
		<view class="qiun-charts">
			<!--#ifdef H5 || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO-->
			<canvas canvas-id="canvasRadar" id="canvasRadar" class="charts" :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}"></canvas>
			<!--#endif-->
			<!--#ifdef MP-WEIXIN || APP-PLUS -->
			<canvas canvas-id="canvasRadar" id="canvasRadar" class="charts"></canvas>
			<!--#endif-->
		</view>
	</view>
</template>

<script>
	import wxCharts from '../../components/wx-charts/wxcharts.js';
	var _self;
	var canvaColumn=null;
	var canvaLineA=null;
	var canvaLineB=null;
	var canvaArea=null;
	var Data={
		Column:{categories:['2012', '2013', '2014', '2015', '2016', '2017'],series:[{name: '成交量1',data:[15, 20, 45, 37, 43, 34]},{name: '成交量2',data:[30, 40, 25, 14, 34, 18]}]},
		ColumnB:{categories:['2013', '2014', '2015', '2016', '2017', '2018'],series:[{name: '新成交量3',data:[35, 36, 31, 33, 13, 34]},{name: '新成交量4',data:[18, 27, 21, 34, 14, 38]}]},
		LineA:{categories:['2012', '2013', '2014', '2015', '2016', '2017'],series:[{name: '成交量A',data:[35, 20, 25, 37, 4, 20]},{name: '成交量B',data:[70, 40, 65, 100, 44, 68]},{name: '成交量C',data:[100, 80, 95, 150, 112, 132]}]},
		LineB:{categories:['2012', '2013', '2014', '2015', '2016', '2017'],series:[{name: '成交量A',data:[35, 20, 25, 37, 4, 20]},{name: '成交量B',data:[70, 40, 65, 100, 44, 68]},{name: '成交量C',data:[100, 80, 95, 150, 112, 132]}]},
		Area:{categories:['2012', '2013', '2014', '2015', '2016', '2017'],series:[{name: '成交量A',data:[35, 20, 25, 37, 4, 20]},{name: '成交量B',data:[70, 40, 65, 100, 44, 68]},{name: '成交量C',data:[100, 80, 95, 150, 112, 132]}]},
		Pie:{series:[{ name: '一班', data: 50 }, { name: '二班', data: 30 }, { name: '三班', data: 20 }, { name: '四班', data: 18 }, { name: '五班', data: 8 }]},
		Ring:{series:[{ name: '一班', data: 50 }, { name: '二班', data: 30 }, { name: '三班', data: 20 }, { name: '四班', data: 18 }, { name: '五班', data: 8 }]},
		Radar:{categories: ['维度1', '维度2', '维度3', '维度4', '维度5', '维度6'],series:[{name: '成交量1',data: [90, 110, 165, 195, 187, 172]}, {name: '成交量2',data: [190, 210, 105, 35, 27, 102]}]},
		Gauge1:{series:[{ name: '正确率', data: 0.45 , color:'#2fc25b'}]},
		Gauge2:{series:[{ name: '错误率', data: 0.65 , color:'#f04864'}]},
		Gauge3:{series:[{ name: '完成率', data: 0.85 , color:'#1890ff'}]},
		}
	
	export default {
		data() {
			return {
				cWidth:'',
				cHeight:'',
				cWidth2:'',//横屏图表
				cHeight2:'',//横屏图表
				cWidth3:'',//圆弧进度图
				cHeight3:'',//圆弧进度图
				pixelRatio:1
			}
		},
		onLoad() {
			_self = this;
			//#ifdef H5 || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO
			uni.getSystemInfo({
				success: function (res) {
					if(res.pixelRatio>1){
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						_self.pixelRatio =2;
					}
				}
			});
			//#endif
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
			this.cWidth2=uni.upx2px(700);
			this.cHeight2=uni.upx2px(1100);
			this.cWidth3=uni.upx2px(250);
			this.cHeight3=uni.upx2px(250);
		},
		onReady() {
			this.showColumn("canvasColumn",Data.Column);
			this.showLineA("canvasLineA",Data.LineA);
			this.showLineB("canvasLineB",Data.LineB);
			this.showArea("canvasArea",Data.Area);
			this.showPie("canvasPie",Data.Pie);
			this.showRing("canvasRing",Data.Ring);
			this.showRadar("canvasRadar",Data.Radar);
			this.showRadar("canvasRadar",Data.Radar);
			this.showGauge("canvasGauge1",Data.Gauge1);
			this.showGauge("canvasGauge2",Data.Gauge2);
			this.showGauge("canvasGauge3",Data.Gauge3);
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
			showLineA(canvasId,chartData){
				canvaLineA=new wxCharts({
					canvasId: canvasId,
					type: 'line',
					fontSize:11,
					legend:true,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					categories: chartData.categories,
					animation: false,
					series: chartData.series,
					xAxis: {
						disableGrid:true,
					},
					yAxis: {
						//disabled:true
					},
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					dataLabel: true,
					dataPointShape: true,
					extra: {
						lineStyle: 'straight'
					},
				});
				
			},
			showLineB(canvasId,chartData){
				canvaLineB=new wxCharts({
					canvasId: canvasId,
					type: 'line',
					fontSize:11,
					legend:true,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					rotate:true,//开启图表横屏
					categories: chartData.categories,
					animation: true,
					series: chartData.series,
					xAxis: {
						disableGrid:true,
					},
					yAxis: {
						//disabled:true
					},
					width: _self.cWidth2*_self.pixelRatio,
					height: _self.cHeight2*_self.pixelRatio,
					dataLabel: true,
					dataPointShape: true,
					extra: {
						lineStyle: 'curve'
					},
				});
			},
			showArea(canvasId,chartData){
				canvaArea=new wxCharts({
					canvasId: canvasId,
					type: 'area',
					fontSize:11,
					legend:true,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					categories: chartData.categories,
					animation: true,
					series: chartData.series,
					xAxis: {
						disableGrid:true,
					},
					yAxis: {
						//disabled:true
					},
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					dataLabel: true,
					dataPointShape: true,
				});
			},
			showPie(canvasId,chartData){
				new wxCharts({
					canvasId: canvasId,
					type: 'pie',
					fontSize:11,
					legend:true,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					dataLabel: true,
				   });
			},
			showRing(canvasId,chartData){
				new wxCharts({
					canvasId: canvasId,
					type: 'ring',
					fontSize:11,
					legend:true,
					title: {
						name: '70%',
						color: '#7cb5ec',
						fontSize: 25*_self.pixelRatio
					},
					subtitle: {
						name: '收益率',
						color: '#666666',
						fontSize: 15*_self.pixelRatio
					},
					extra: {
						ringWidth: 40*_self.pixelRatio,//圆环的宽度
						pie: {
						  offsetAngle: -45//圆环的角度
						}
					},
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					disablePieStroke: true,
					dataLabel: true,
				});
				
			},
			showRadar(canvasId,chartData){
				new wxCharts({
					canvasId: canvasId,
					type: 'radar',
					fontSize:11,
					legend:true,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					animation: true,
					categories: chartData.categories,
					series: chartData.series,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						radar: {
							max: 200//雷达数值的最大值
						}
					}
				});
			},
			showGauge(canvasId,chartData){
				new wxCharts({
					canvasId: canvasId,
					type: 'gauge',
					fontSize:11,
					legend:false,
					title: {
						name: chartData.series[0].data*100+'%',
						color: chartData.series[0].color,
						fontSize: 25*_self.pixelRatio
					},
					subtitle: {
						name: chartData.series[0].name,
						color: '#666666',
						fontSize: 15*_self.pixelRatio
					},
					extra: {
						gaugeWidth: 12*_self.pixelRatio,//圆弧的宽度
					},
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth3*_self.pixelRatio,
					height: _self.cHeight3*_self.pixelRatio,
					dataLabel: true,
				});
				
			},
			changeData(){
				//这里只做了柱状图数据动态更新，其他图表同理。
				canvaColumn.updateData({
					series: Data.ColumnB.series,
					categories: Data.ColumnB.categories
				});
			},
			touchLineA(e){
				canvaLineA.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			},
			touchLineB(e){
				canvaLineB.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			},
			touchArea(e){
				canvaArea.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			},
		}
	}
</script>

<style>
page{background:#F2F2F2;}
.qiun-padding{padding:2%; width:96%;}
.qiun-wrap{display:flex; flex-wrap:wrap;}
.qiun-rows{display:flex; flex-direction:row !important;}
.qiun-columns{display:flex; flex-direction:column !important;}
.qiun-common-mt{margin-top:10upx;}
.qiun-bg-white{background:#FFFFFF;}
.qiun-title-bar{width:96%; padding:10upx 2%; flex-wrap:nowrap;}
.qiun-title-dot-light{border-left: 10upx solid #0ea391; padding-left: 10upx; font-size: 32upx;color: #000000}
/* 通用样式 */
.qiun-charts{width: 750upx; height:500upx;background-color: #FFFFFF;}
.charts{width: 750upx; height:500upx;background-color: #FFFFFF;}
/* 横屏样式 */
.qiun-charts-rotate{width: 700upx; height:1100upx;background-color: #FFFFFF;padding: 25upx;}
.charts-rotate{width: 700upx; height:1100upx;background-color: #FFFFFF;}
/* 圆弧进度样式 */
.qiun-charts3{width: 750upx; height:250upx;background-color: #FFFFFF;position:relative;}
.charts3{position: absolute;width: 250upx; height:250upx;background-color: #FFFFFF;}

.qiun-tip {display:block; width:auto; overflow:hidden; padding:15upx; height:30upx; line-height:30upx; margin:10upx; background:#ff9933; font-size:30upx; border-radius:8upx;justify-content:center; text-align:center;border: 1px solid #dc7004;color: #FFFFFF;}
</style>
