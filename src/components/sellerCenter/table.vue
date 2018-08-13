<template>
	<div>
		<span v-show=false>{{getxAxisData}}</span>
		<span v-show=false>{{getSeriesData}}</span>
		<div id="chartColumn" style="width:100%; height:400px;"></div>
	</div>
</template>

<script>
	// 引入 ECharts 主模块
	var echarts = require('echarts/lib/echarts');
	// 引入柱状图
	require('echarts/lib/chart/bar');
	// 引入提示框和标题组件
	require('echarts/lib/component/tooltip');
	require('echarts/lib/component/title');

	export default {
		data() {
			return {
				chartColumn: null,
				xAxisData:[],
				seriesData:[],
			}
		},
		props:{
			mallData:{
				type:Object,
				default:function(){
					return {}
				}

			},
			mallDataTitle:{
				type:String,
				default:function(){
					return ""
				}
			},
			tabName:{
				type:String,
				default:function(){
					return ""
				}
			}
		},
		computed:{
			//柱形横排名字
			getxAxisData(){
				this.xAxisData=[];
				switch(true){					
					case this.tabName==="week"&&this.mallData.data!==undefined:						
						this.commonTimeMt()
						return this.xAxisData
						break
					case this.tabName==="month"&&this.mallData.data!==undefined:
						//获取最终结尾的数字
						this.commonTimeMt()
						return this.xAxisData
						break;
					case this.tabName==="year":	
						this.commonTimeMt()
						return this.xAxisData
						break;
					case this.tabName.indexOf("timeTable")===0&&this.mallData.data!==undefined:
						this.commonTimeMt();
						return this.xAxisData
						break;
				};
			},
			//柱形数据
			getSeriesData(){
				this.seriesData=[];
				switch(true){
					case this.mallDataTitle==="销售额趋势"&&this.mallData.data!==undefined:
						this.commonMenth("total_sell_money_yuan")
						return  this.seriesData
						break;
					case this.mallDataTitle==="订单数趋势"&&this.mallData.data!==undefined:
						this.commonMenth("total_pay_order_num")
						return  this.seriesData
						break;
					case this.mallDataTitle==="访问量趋势"&&this.mallData.data!==undefined:
						this.commonMenth("total_pv_num")
						return  this.seriesData
						break;
					case this.mallDataTitle==="访客量趋势"&&this.mallData.data!==undefined:
						this.commonMenth("total_uv_num")
						return  this.seriesData
						break;
				}
			}
		},
		methods: {
			commonMenth(data){
				for(let i=0;i<this.mallData.data.length;i++){
					let con=this.mallData.data[i][data];
					this.seriesData.splice(i,0,con)
				}
			},
			commonTimeMt(name,Num){
				for(let i=0;i<this.mallData.data.length;i++){					
					if(this.mallData.type==='day'){
						let con=this.mallData.data[i].statistics_date.split("-")[2]+"日";
						this.xAxisData.splice(i,0,con);			
					};
					if(this.mallData.type==='month'){
						let con=this.mallData.data[i].statistics_date.split("-")[1]+"月";
						this.xAxisData.splice(i,0,con);	
					};
					if(this.mallData.type==='year'){
						let con=this.mallData.data[i].statistics_date+"年";
						this.xAxisData.splice(i,0,con);	
					}
				};
			},
			drawColumnChart() {
				this.chartColumn = echarts.init(document.getElementById('chartColumn'));
				this.chartColumn.setOption({
					color: ['#008FF2'],
					title: {
						text: this.mallDataTitle
					},
					tooltip: {},
					xAxis: {
						data:this.getxAxisData
					},
					yAxis: {},
					series: [{
						name: '销量',
						type: 'bar',
						barWidth:"40%",
						data:this.getSeriesData
					}]
				});
			},
		},
		mounted: function() {
			if(this.mallData.data!==undefined){
				this.drawColumnChart()
			}
			
		},
		updated: function() {
			this.drawColumnChart()
		}
	}
</script>

<style scoped>
	.chart-container {
		width: 100%;
		float: left;
	}	
	.el-col {
		padding: 30px 20px;
	}
</style>