<template>
	<view class="qiun-columns">
		<view class="qiun-padding" style="font-size: 32upx;">
			<text>【开源不易、改造不易、哪(拿)来简单】如本插件解决了您的问题，请一定要回来给个【5星评价】哦，您的支持是我的动力，感谢您的评价！！如遇到问题，请先参见页面最后章节【常见问题】解决，如没有您的问题，请在页面最下面【撰写评论】，尽量不要在【问答】中提问（因有可能会漏掉您的问题）。</text>
		</view>
		<view class="qiun-padding">
			<view class="qiun-tip" @tap="changeData()">修改柱状图数据</view>
		</view>
        <view class="qiun-title-bar" style="background-color: #E5FDC3;">
        	<view class="qiun-title-dot-light">柱状图</view>
        </view>
        <view class="qiun-charts" style="background-color: #E5FDC3;">
        	<!--#ifdef H5 || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO -->
        	<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" style="background-color: #E5FDC3;" :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}"></canvas>
        	<!--#endif-->
        	<!--#ifdef MP-WEIXIN || APP-PLUS -->
        	<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" style="background-color: #E5FDC3;"></canvas>
        	<!--#endif-->
        </view>
		<view class="qiun-padding">
			<view class="qiun-tip" @tap="changeGaugeData()">更新仪表盘数据</view>
		</view>
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
			<view class="qiun-title-dot-light">仪表盘</view>
		</view>
		<view class="qiun-charts">
			<!--#ifdef H5 || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO-->
			<canvas canvas-id="canvasGauge" id="canvasGauge" class="charts" :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}"></canvas>
			<!--#endif-->
			<!--#ifdef MP-WEIXIN || APP-PLUS -->
			<canvas canvas-id="canvasGauge" id="canvasGauge" class="charts"></canvas>
			<!--#endif-->
		</view>
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
			<view class="qiun-title-dot-light">圆弧进度图</view>
		</view>
		<view class="qiun-charts3">
			<!--#ifdef H5 || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO-->
			<canvas canvas-id="canvasArcbar1" id="canvasArcbar1" class="charts3" :style="{'width':cWidth3*pixelRatio+'px','height':cHeight3*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth3*(pixelRatio-1)/2+'px','margin-top':-cHeight3*(pixelRatio-1)/2+'px'}"></canvas>
			<canvas canvas-id="canvasArcbar2" id="canvasArcbar2" class="charts3" :style="{'width':cWidth3*pixelRatio+'px','height':cHeight3*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':cWidth3-cWidth3*(pixelRatio-1)/2+'px','margin-top':-cHeight3*(pixelRatio-1)/2+'px'}"></canvas>
			<canvas canvas-id="canvasArcbar3" id="canvasArcbar3" class="charts3" :style="{'width':cWidth3*pixelRatio+'px','height':cHeight3*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':cWidth3*2-cWidth3*(pixelRatio-1)/2+'px','margin-top':-cHeight3*(pixelRatio-1)/2+'px'}"></canvas>
			<!--#endif-->
			<!--#ifdef MP-WEIXIN || APP-PLUS -->
			<canvas canvas-id="canvasArcbar1" id="canvasArcbar1" class="charts3"></canvas>
			<canvas canvas-id="canvasArcbar2" id="canvasArcbar2" class="charts3" style="margin-left: 250upx;"></canvas>
			<canvas canvas-id="canvasArcbar3" id="canvasArcbar3" class="charts3" style="margin-left: 500upx;"></canvas>
			<!--#endif-->
		</view>
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
			<view class="qiun-title-dot-light">折线图一（可横向拖拽带滚动条）</view>
			<!-- 使用图表拖拽功能时，建议给canvas增加disable-scroll=true属性，在拖拽时禁止屏幕滚动 -->
		</view>
		<view class="qiun-charts">
			<!--#ifdef H5 || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO-->
			<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}" @touchstart="touchLineA" @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
			<!-- 使用图表拖拽功能时，建议给canvas增加disable-scroll=true属性，在拖拽时禁止屏幕滚动 -->
			<!--#endif-->
			<!--#ifdef MP-WEIXIN || APP-PLUS -->
			<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart="touchLineA" @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
			<!-- 使用图表拖拽功能时，建议给canvas增加disable-scroll=true属性，在拖拽时禁止屏幕滚动 -->
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
			<canvas canvas-id="canvasArea" id="canvasArea" class="charts" :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}" @touchstart="touchArea" ></canvas>
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
	var canvaGauge=null;
	/*下面是服务器返回的数据格式，现已改成从服务器获取数据，以供有些朋友不知道怎么从后台获取数据后调用
	var Data={
		Column:{categories:['2012', '2013', '2014', '2015', '2016', '2017'],series:[{name: '成交量1',data:[15, {value:20,color:'#f04864'},45, 37, 43, 34]},{name: '成交量2',data:[30, {value:40,color:'#facc14'}, 25, 14, 34, 18]}]},
		ColumnB:{categories:['2013', '2014', '2015', '2016', '2017', '2018'],series:[{name: '新成交量3',data:[35, 36, 31, 33, 13, 34]},{name: '新成交量4',data:[18, 27, 21, 34, 14, 38]}]},
		LineA:{categories:['2012', '2013', '2014', '2015', '2016', '2017'],series:[{name: '成交量A',data:[35, 20, 25, 37, 4, 20]},{name: '成交量B',data:[70, 40, 65, 100, 44, 68]},{name: '成交量C',data:[100, 80, 95, 150, 112, 132]}]},
		LineB:{categories:['2012', '2013', '2014', '2015', '2016', '2017'],series:[{name: '成交量A',data:[35, 20, 25, 37, 4, 20]},{name: '成交量B',data:[70, 40, 65, 100, 44, 68]},{name: '成交量C',data:[100, 80, 95, 150, 112, 132]}]},
		Area:{categories:['2012', '2013', '2014', '2015', '2016', '2017'],series:[{name: '成交量A',data:[100, 80, 95, 150, 112, 132],color:'#facc14'},{name: '成交量B',data:[70, 40, 65, 100, 44, 68],color:'#2fc25b'},{name: '成交量C',data:[35, 20, 25, 37, 4, 20],color:'#1890ff'}]},
		Pie:{series:[{ name: '一班', data: 50 }, { name: '二班', data: 30 }, { name: '三班', data: 20 }, { name: '四班', data: 18 }, { name: '五班', data: 8 }]},
		Ring:{series:[{ name: '一班', data: 50 ,format:()=> {return '一班:50人'}}, { name: '二班', data: 30 ,format:()=> {return '二班:30人'}}, { name: '三班', data: 20 ,format:()=> {return '三班:20人'}}, { name: '四班', data: 18 ,format:()=> {return '四班:18人'}}, { name: '五班', data: 8 ,format:()=> {return '五班:8人'}}]},
		Radar:{categories: ['维度1', '维度2', '维度3', '维度4', '维度5', '维度6'],series:[{name: '成交量1',data: [90, 110, 165, 195, 187, 172]}, {name: '成交量2',data: [190, 210, 105, 35, 27, 102]}]},
		Arcbar1:{series:[{ name: '正确率', data: 0.29 , color:'#2fc25b'}]},
		Arcbar2:{series:[{ name: '错误率', data: 0.65 , color:'#f04864'}]},
		Arcbar3:{series:[{ name: '完成率', data: 0.85 , color:'#1890ff'}]},
		Gauge:{categories:[{value:0.2,color:'#2fc25b'},{value:0.8,color:'#f04864'}，{value:1,color:'#1890ff'}],series:[{ name: '完成率', data: 0.85 }]},
		}
	*/
   
	export default {
		data() {
			return {
				cWidth:'',
				cHeight:'',
				cWidth2:'',//横屏图表
				cHeight2:'',//横屏图表
				cWidth3:'',//圆弧进度图
				cHeight3:'',//圆弧进度图
				arcbarWidth:'',//圆弧进度图，进度条宽度,此设置可使各端宽度一致
				gaugeWidth:'',//仪表盘宽度,此设置可使各端宽度一致
				pixelRatio:1,
				serverData:''
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
			this.arcbarWidth=uni.upx2px(24);
			this.gaugeWidth=uni.upx2px(30);
			this.getServerData();
		},
		onReady() {
		},
		methods: {
			getServerData(){
				uni.request({
					url: 'https://www.easy-mock.com/mock/5cc586b64fc5576cba3d647b/uni-wx-charts/chartsdata',
					data:{
					},
					success: function(res) {
						console.log(res.data.data)
						//下面这个根据需要保存后台数据，我是为了模拟更新柱状图，所以存下来了
						_self.serverData=res.data.data;
						let Column={categories:[],series:[]};
						let LineA={categories:[],series:[]};
						let LineB={categories:[],series:[]};
						let Area={categories:[],series:[]};
						let Pie={series:[]};
						let Ring={series:[]};
						let Radar={categories:[],series:[]};
						let Arcbar1={series:[]};
						let Arcbar2={series:[]};
						let Arcbar3={series:[]};
						let Gauge={categories:[],series:[]};
						//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						Column.categories=res.data.data.Column.categories;
						//这里的series数据是后台做好的，如果您的数据没有和前面我注释掉的格式一样，请自行拼接数据
						Column.series=res.data.data.Column.series;
						LineA.categories=res.data.data.LineA.categories;
						LineA.series=res.data.data.LineA.series;
						LineB.categories=res.data.data.LineB.categories;
						LineB.series=res.data.data.LineB.series;
						Area.categories=res.data.data.Area.categories;
						Area.series=res.data.data.Area.series;
						Pie.series=res.data.data.Pie.series;
						Ring.series=res.data.data.Ring.series;
						//自定义文案示例，需设置format字段
						for(let i = 0 ;i < Ring.series.length;i++){
							Ring.series[i].format=()=>{return Ring.series[i].name+Ring.series[i].data};
						}
						Radar.categories=res.data.data.Radar.categories;
						Radar.series=res.data.data.Radar.series;
						Arcbar1.series=res.data.data.Arcbar1.series;
						Arcbar2.series=res.data.data.Arcbar2.series;
						Arcbar3.series=res.data.data.Arcbar3.series;
						Gauge.categories=res.data.data.Gauge.categories;
						Gauge.series=res.data.data.Gauge.series;
						//实例化图表前，请先检查您的数据是否为空，空数据会造成客户端卡死
						if(Column.categories.length>0 && Column.series.length>0){
							_self.showColumn("canvasColumn",Column);
						}
						if(LineA.categories.length>0 && LineA.series.length>0){
							_self.showLineA("canvasLineA",LineA);
						}
						if(LineB.categories.length>0 && LineB.series.length>0){
							_self.showLineB("canvasLineB",LineB);
						}
						if(Area.categories.length>0 && Area.series.length>0){
							_self.showArea("canvasArea",Area);
						}
						if(Pie.series.length>0){
							_self.showPie("canvasPie",Pie);
						}
						if(Ring.series.length>0){
							_self.showRing("canvasRing",Ring);
						}
						if(Radar.categories.length>0 && Radar.series.length>0){
							_self.showRadar("canvasRadar",Radar);
						}
						if(Arcbar1.series.length>0){
							_self.showArcbar("canvasArcbar1",Arcbar1);
						}
						if(Arcbar2.series.length>0){
							_self.showArcbar2("canvasArcbar2",Arcbar2);
						}
						if(Arcbar3.series.length>0){
							_self.showArcbar3("canvasArcbar3",Arcbar3);
						}
						if(Gauge.categories.length>0 && Gauge.series.length>0){
							_self.showGauge("canvasGauge",Gauge);
						}
					},
					fail: () => {
						console.log("数据获取失败！")
					},
				});
			},
			showColumn(canvasId,chartData){
				canvaColumn=new wxCharts({
					canvasId: canvasId,
					type: 'column',
					legend:true,
					fontSize:11,
					background:'#E5FDC3',
					pixelRatio:_self.pixelRatio,
					animation: true,
					categories: chartData.categories,
					series: chartData.series,
					xAxis: {
						disableGrid:true,
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
					series: chartData.series,
					animation: false,
					enableScroll: true,//开启图表拖拽功能
					xAxis: {
						disableGrid:false,
						type:'grid',
						gridType:'dash',
						itemCount:4,//可不填写，配合enableScroll图表拖拽功能使用，x轴单屏显示数据的数量，默认为5个
						scrollShow:true,//新增是否显示滚动条，默认false
						//scrollBackgroundColor:'#F7F7FF',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条背景颜色,默认为 #EFEBEF
						//scrollColor:'#DEE7F7',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条颜色,默认为 #A6A6A6
					},
					yAxis: {
						//disabled:true
						gridType:'dash',
						splitNumber:8,
						min:0,
						max:180,
						format:(val)=>{return val.toFixed(0)+'元'}//如不写此方法，Y轴刻度默认保留两位小数
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
					animation: false,
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
					animation: false,
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
						fontSize: 25*_self.pixelRatio,
						offsetY:-20*_self.pixelRatio,//新增参数，自定义调整Y轴文案距离
					},
					subtitle: {
						name: '收益率',
						color: '#666666',
						fontSize: 15*_self.pixelRatio,
						offsetY:30*_self.pixelRatio,//新增参数，自定义调整Y轴文案距离
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
					animation: false,
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
					animation: false,
					dataLabel: true,
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
			showArcbar(canvasId,chartData){
				new wxCharts({
					canvasId: canvasId,
					type: 'arcbar',
					fontSize:11,
					legend:false,
					title: {
						name: Math.round(chartData.series[0].data*100)+'%',
						color: chartData.series[0].color,
						fontSize: 25*_self.pixelRatio
					},
					subtitle: {
						name: chartData.series[0].name,
						color: '#666666',
						fontSize: 15*_self.pixelRatio
					},
					extra: {
						arcbar:{
							type:'default',
							width: _self.arcbarWidth*_self.pixelRatio,//圆弧的宽度
						}
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
			showArcbar2(canvasId,chartData){
				new wxCharts({
					canvasId: canvasId,
					type: 'arcbar',
					fontSize:11,
					legend:false,
					title: {
						name: Math.round(chartData.series[0].data*100)+'%',
						color: chartData.series[0].color,
						fontSize: 25*_self.pixelRatio
					},
					subtitle: {
						name: chartData.series[0].name,
						color: '#666666',
						fontSize: 15*_self.pixelRatio
					},
					extra: {
						arcbar:{
							type:'default',
							width: _self.arcbarWidth*_self.pixelRatio,//圆弧的宽度
							backgroundColor:'#ffe3e8',
							startAngle:1.25,
							endAngle:0.75
						}
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
			showArcbar3(canvasId,chartData){
				new wxCharts({
					canvasId: canvasId,
					type: 'arcbar',
					fontSize:11,
					legend:false,
					title: {
						name: Math.round(chartData.series[0].data*100)+'%',
						color: chartData.series[0].color,
						fontSize: 25*_self.pixelRatio
					},
					subtitle: {
						name: chartData.series[0].name,
						color: '#666666',
						fontSize: 15*_self.pixelRatio
					},
					extra: {
						arcbar:{
							type:'circle',//整圆类型进度条图
							width: _self.arcbarWidth*_self.pixelRatio,//圆弧的宽度
							startAngle:0.5//整圆类型只需配置起始角度即可
						}
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
			showGauge(canvasId,chartData){
				canvaGauge = new wxCharts({
					canvasId: canvasId,
					type: 'gauge',
					fontSize:11,
					legend:false,
					title: {
						name: Math.round(chartData.series[0].data*100)+'%',
						color: chartData.categories[1].color,
						fontSize: 25*_self.pixelRatio,
						offsetY:50*_self.pixelRatio,//新增参数，自定义调整Y轴文案距离
					},
					subtitle: {
						name: chartData.series[0].name,
						color: '#666666',
						fontSize: 15*_self.pixelRatio,
						offsetY:-50*_self.pixelRatio,//新增参数，自定义调整Y轴文案距离
					},
					extra: {
						gauge:{
							type:'default',
							width: _self.gaugeWidth*_self.pixelRatio,//仪表盘背景的宽度
							startAngle:0.75,
							endAngle:0.25,
							startNumber:0,
							endNumber:100,
							splitLine:{
								fixRadius:0,
								splitNumber:10,
								width: _self.gaugeWidth*_self.pixelRatio,//仪表盘背景的宽度
								color:'#FFFFFF',
								childNumber:5,
								childWidth:_self.gaugeWidth*0.4*_self.pixelRatio,//仪表盘背景的宽度
							},
							pointer:{
								width: _self.gaugeWidth*0.8*_self.pixelRatio,//指针宽度
								color:'auto'
							}
						}
					},
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					dataLabel: true,
				});
			},
			changeGaugeData(){
				let series=[{name: "完成率",data: Math.random()}];//这里是随机数据，生产环境请从服务器获取，注意series数据类型为数组
				//这里我借用之前的categories数据，判断一下新数据的title.color，没有写死在程序里，以便于自定义
				let newTitleColor;
				for(let i=0;i<_self.serverData.Gauge.categories.length;i++){
					if(series[0].data<=_self.serverData.Gauge.categories[i].value){
						newTitleColor=_self.serverData.Gauge.categories[i].color;
						break;
					}
				}
				
				canvaGauge.updateData({
					series: series,//这里给了新数值
					categories: _self.serverData.Gauge.categories,
					title: {
						name:Math.round(series[0].data*100)+'%',
						color: newTitleColor,
						fontSize: 25*_self.pixelRatio,
						offsetY:50*_self.pixelRatio,//新增参数，自定义调整Y轴文案距离
					},
					subtitle:{
						name: '更新数据',
						color: '#666666',
						fontSize: 15*_self.pixelRatio,
						offsetY:-50*_self.pixelRatio,//新增参数，自定义调整Y轴文案距离
					}
				});
			},
			changeData(){
				//这里只做了柱状图数据动态更新，其他图表同理，数据是我之前获取的数据，您可以重新获取数据，更新前，也需要检查下数据是否为空，否则不要更新。
				if(_self.serverData.ColumnB.categories.length>0 && _self.serverData.ColumnB.series.length>0){
					canvaColumn.updateData({
						series: _self.serverData.ColumnB.series,
						categories: _self.serverData.ColumnB.categories
					});
				}
			},
			touchLineA(e){
				canvaLineA.scrollStart(e);
			},
			moveLineA(e) {
				canvaLineA.scroll(e);
			},
			touchEndLineA(e) {
				canvaLineA.scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
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
