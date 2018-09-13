<template>
    <div class="chart">
       <div class="select-wrap">
           <div class="tableFour mt-20 pos-r ">
               <slot name="tab"></slot>
               <div class="selector-right">
                   <el-tabs
                       class="pos-a activeTime"
                       v-model="statisticsType"
                       @tab-click="changeStatisticsType">
                           <el-tab-pane label="本周" name="isoWeek"></el-tab-pane>
                           <el-tab-pane label="本月" name="month"></el-tab-pane>
                           <el-tab-pane label="全年" name="year"></el-tab-pane>
                   </el-tabs>
               </div>
               <el-date-picker
                   class="pos-a choiceDate"
                   v-model="timeRange"
                   type="daterange"
                   placeholder="选择日期范围"
                   @change="selectTimeRange">
               </el-date-picker>
           </div>
           <text class="hidden">{{chartDataByFilter}}{{xAxisDataByDefine}}</text>
       </div>
        <Chart :options="polar"/>
    </div>
</template>

<script>
    import Vue from 'vue'
    import ECharts from 'vue-echarts/components/ECharts.vue'
    import 'echarts/lib/chart/bar'
    import 'echarts/lib/component/tooltip'

    export default {
        name: "ECharts",
        components: {
            Chart: ECharts
        },
        props: {
            chartData: {
                type: Array,
                required: true,
                default: [],
            },
            statisticsKey: {
                type: String,
                required: true,
                default: '',
            },
        },
        computed: {
            chartDataByFilter() {
                let data =  this.chartData.map((v)=>{
                    return v[this.statisticsKey]
                });
                let data_change = this.polar.series[0];
                data_change.data = data;
                this.$set(this.polar,'series',[data_change]);
                return data;
            },
            xAxisDataByDefine(){
                // 自定义时间段的X轴数据采用后端返回
                 let date_arr = this.chartData.map(({statistics_date})=>statistics_date);
                 if(!this.statisticsType){
                     this.$set(this.polar,'xAxis',Object.assign({},this.polar.xAxis,{data:date_arr}));
                 }
            }
        },
        data() {
            return {
                timeRange:[],
                statisticsType:'isoWeek',
                polar: {
                    tooltip:{},
                    color:'#008FF2',
                    grid:{
                        left:50,
                        right:30,
                        top:30,
                        bottom:50,
                    },
                    xAxis: {
                        type: 'category',
                        axisTick:{
                            alignWithLabel:true
                        },
                        axisLine: {
                            lineStyle:{
                                color:'#D6D6D6'
                            }
                        },
                        axisLabel :{
                            color:'#7f7f7f',
                            interval:0,
                        },
                        data: this._xAxisDataInit()
                    },
                    yAxis: {
                        type: 'value',
                        axisTick:{
                            show:false
                        },
                        axisLabel :{
                            color:'#7f7f7f',
                        },
                        axisLine: {
                            show:false
                        },
                        splitLine: {
                            lineStyle: {
                                type: 'dashed'
                            }
                        }
                    },
                    series: [{
                        data: '',
                        barWidth:'32',
                        type: 'bar'
                    }],
                    backgroundColor:'#fff'
                }
            }
        },
        methods: {
            selectTimeRange(e){
                // 显示时间段改变
                if(!e) return
                this.timeRange = [...e.split(' - ')];
                if(this.timeRange[0]==this.timeRange[1]){
                    this.$message.warning('开始时间和结束时间不能同一天');
                    this.timeRange = [];
                    return;
                }
                // 改变时间段以后 原来的统计数据清空 否则会有原始数据闪现
                this.chartData.splice(0);

                // 自定义时间段 关闭快捷标签点亮
                this.statisticsType = '';
                this._emitDate(...e.split(' - '));
            },
            changeStatisticsType({name}){
                // 快捷时间标签选择
                // 改变时间段以后 原来的统计数据清空 否则会有原始数据闪现
                this.chartData.splice(0);
                let xAxisData = this._xAxisDataInit(name);
                this.$set(this.polar,'xAxis',Object.assign({},this.polar.xAxis,{data:xAxisData}));
                this.timeRange = [];
            },
            _xAxisDataInit(type = 'isoWeek',) {
                // 生成本月、本周、本月X轴数据
                let start_date, end_date;
                let start_date_fill, fill_length;
                start_date = this.$moment().startOf(type);
                end_date = this.$moment().endOf(type);
                start_date_fill = +start_date.format('DD');
                switch (type) {
                    case 'isoWeek':
                        fill_length = 7;
                        break;
                    case 'month':
                        fill_length = +end_date.format('DD');
                        break;
                    case 'year':
                        fill_length = 12;
                        start_date_fill =1;
                        break;
                };
                start_date = start_date.format('YYYY-MM-DD');
                end_date = end_date.format('YYYY-MM-DD');
                let label = type=='year'?'月':'日';
                this._emitDate(start_date,end_date);
                return this._arrayFill(start_date_fill, fill_length,label)
            },
            _arrayFill(start, len,label) {
                // 生成连续元素数组
                return this.$_.range(start,start+len).map(x=>(String(x)+label))
            },
            _emitDate(...range){
                // 选择的时间回传给父级
                this.$emit('timeRange',range)
            }
        }

    }
</script>

<style lang="scss" >
    .chart{
        position: relative;
        background: #fff;
        .select-wrap{
            .selector-right{
                .el-tabs__active-bar{
                    background: transparent;
                }
            }
        }
        .echarts{
            width: 100%;
        }
        .tableFour{
            padding:20px 20px 40px;
            background-color: #fff;
        }
        .activeTime{
            right: 250px;
            top: 20px;
            z-index:100;
        }
        .activeTime .el-tabs__header{
            border-bottom: none;
        }
        .activeTime  .el-tabs__active-bar{
            background-color: transparent;
        }
        .choiceDate{
            right: 20px;
            top: 22px;
            z-index: 100;
        }
        .choiceDate .el-input__icon+.el-input__inner{
            height: 32px;
            line-height: 32px;
        }
        .hidden{
            font-size: 0;
        }
    }
</style>