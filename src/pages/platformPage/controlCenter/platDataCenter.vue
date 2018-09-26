<template>
	<div class="platDataCenter"  @click="isDropdown=false">		
		<el-row :gutter="20">
            <el-col :span="6">
                <div class="statisticsItem">
                    <p class="itemTitle">总销售额</p>
                    <p class="money-total">{{mallDataStatistics.total_sell_money_yuan | money('￥')}}</p>
                    <p class="money-history">今日销售额 <span>{{mallDataStatistics.today_sell_money_yuan | money('￥')}}</span></p>
                    <svg
                        class="item-label"
                        width="48"
                        height="48">
                        <use xlink:href="#money"/>
                    </svg>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="statisticsItem">
                    <p class="itemTitle">支付订单数</p>
                    <p class="money-total">{{mallDataStatistics.total_pay_order_num }}</p>
                    <p class="money-history">今日订单数 <span>{{mallDataStatistics.today_pay_order_num}}</span></p>
                    <svg
                        class="item-label"
                        width="48"
                        height="48">
                        <use xlink:href="#money"/>
                    </svg>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="statisticsItem">
                    <p class="itemTitle">访问量</p>
                    <p class="money-total">{{mallDataStatistics.total_pv_num }}</p>
                    <p class="money-history">今日访客量 <span>{{mallDataStatistics.today_pv_num }}</span></p>
                    <svg
                        class="item-label"
                        width="48"
                        height="48">
                        <use xlink:href="#money"/>
                    </svg>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="statisticsItem">
                    <p class="itemTitle">访客量</p>
                    <p class="money-total">{{mallDataStatistics.total_uv_num }}</p>
                    <p class="money-history">今日访客数 <span>{{mallDataStatistics.today_uv_num }}</span></p>
                    <svg width="48" height="48" class="item-label">
                        <use xlink:href="#member"  />
                    </svg>
                </div>
            </el-col>
        </el-row>
		<!--.................待处理事件.............-->
		<div class="panel">
            <p class="title">待处理事件</p>
            <el-row :gutter="26">
                <el-col
                    class="module"
                    :span="12">
                    <router-link :to="{name: 'join'}" tag="div">
						<img src="../../../assets/image/statistics-01.png" width="591" class="module-bg"/>
                        <div class="module-content clearfix">
                            <p class="module-title">加盟申请</p>
                            <p class="module-num">{{pendingEvents.join_num}}</p>
                        </div>
                    </router-link>
                </el-col>
                <el-col
                    class="module"
                    :span="12">
                    <router-link :to="{name:'extractCash'}" tag="div" append>
						<img src="../../../assets/image/statistics-02.png" width="591" class="module-bg"/>
                        <div class="module-content">
                            <p class="module-title">提现申请</p>
                            <p class="module-num">{{pendingEvents.tixian_num}}</p>
                        </div>
                    </router-link>
                </el-col>
            </el-row>
        </div>
        <!--.................商城信息统计.............-->
		<div class="panel">
            <p class="title">商城信息统计</p>
            <el-row :gutter="20">
                <el-col :span="4">
                    <div class="statistics-module">
                        <i class="iconfont icon-product"></i>
                       		商品共计
                        <span>{{mallDataStatistics.total_product_num}}家</span>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="statistics-module">
                        <i class="iconfont icon-huiyuan"></i>
                        	会员共计
                        <span>{{mallDataStatistics.total_member_num}}件</span>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="statistics-module">
                        <i class="iconfont icon-dianpuxinxi"></i>
                        	店铺共计
                        <span>{{mallDataStatistics.total_shop_num}}位</span>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="statistics-module">
                        <i class="iconfont icon-member"></i>
                        	代理商共计
                        <span>{{mallDataStatistics.total_dls_num}}元</span>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="statistics-module">
                        <i class="iconfont icon-hehuoren f18"></i>
                        	合伙人共计
                        <span>{{mallDataStatistics.total_hhr_num}}位</span>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="statistics-module">
                        <i class="iconfont icon-fuwushang"></i>
                        	服务商共计
                        <span>{{mallDataStatistics.total_fws_num}}元</span>
                    </div>
                </el-col>
            </el-row>
        </div>
        <ECharts
        	:chart-data="statisticsData"
        	:statistics-key="statisticsTabShow"
        	@timeRange="timeRangeChange">
        	<el-tabs v-model="statisticsTabShow"  slot="tab">
                <el-tab-pane label="销售额" name="total_sell_money_yuan"></el-tab-pane>
                <el-tab-pane label="订单数" name="total_pay_order_num"></el-tab-pane>
                <el-tab-pane label="访问量" name="total_pv_num"></el-tab-pane>
                <el-tab-pane label="访客量" name="total_uv_num"></el-tab-pane>
            </el-tabs>
        </ECharts>
	</div>
</template>

<script>
	import {getMallStatisticsData,getMallPendingEventNum,getStatisticsByDate} from "@/api/platform"
	export default{
		name:"platDataCenter",
		components:{
			'ECharts':()=>import('@/components/servicer/sellerCenter/Echarts')
		},
		filters:{
            money(value,label=''){
                // 金额转换成数字和整数部分
                value = Number(value).toFixed(2).split('.');
                let value_int = Number(value[0]).toLocaleString();// 转换成金额形式
                return `${label} ${value_int}.${value[1]}`;
            },
        },
		data(){
			return{
				mallDataStatistics:{//平台统计数据
				    "total_sell_money_yuan": 0,
				    "today_sell_money_yuan": 0,
				    "total_pay_order_num": 0,
				    "today_pay_order_num": 0,
				    "total_pv_num": 0,
				    "today_pv_num": 0,
				    "total_uv_num": 0,
				    "today_uv_num": 0,
				    "total_pay_split_order_num": 0,
				    "today_pay_split_order_num": 0,
				    "total_shop_num":0,
				    "total_product_num":0,
				    "total_member_num":0,
				    "total_dls_num":0,
				    "total_hhr_num":0,
				    "total_fws_num":0
				},
				pendingEvents:{// 待处理事件
                    "join_num":0,
                    "tixian_num": 0,
                },
                statisticsData:[],//店铺表格统计数据
                statisticsTabShow:"total_sell_money_yuan",
			}
		},
		created(){
			// 获取商城统计数据
            getMallStatisticsData()
                .then(({data})=>{
                    this.mallDataStatistics = data;
                })
            // 获取待处理事件数
            getMallPendingEventNum()
                .then(({data})=>{
                    this.pendingEvents = data;
                })
		},
		methods:{
			timeRangeChange([start_date,end_date]=[]){
				let condition_search={start_date,end_date};
				getStatisticsByDate(condition_search)//获取商城统计数据
					.then(({data:{data}})=>{
                        this.statisticsData = data;
                    })
			}
		}
	}
</script>

<style lang="scss">
.platDataCenter{
    margin: 80px auto 0;
    width: 1240px;
    box-sizing: border-box;
	.el-row{
		.statisticsItem{
			position: relative;
			padding: 20px 20px 0 20px;
		    background: #FFF;
		    font-size: 20px;
		    overflow: hidden;
		    .item-label{
		    	position: absolute;
			    top: 21px;
			    right: 21px;
		    }
		    .itemTitle{
		    	margin-bottom: 10px;
			    font-size: 14px;
			    color: #7f7f7f;
			    line-height: 1;
		    }
		    .money-total{
		    	margin-top: 10px;
			    padding-bottom: 20px;
			    font-size: 20px;
			    font-weight: 700;
			    line-height: 1;
			    color: #333;
			    border-bottom: 1px solid #F0F4F7;
		    }
		    .money-history{
		    	margin: 20px 0;
			    font-size: 14px;
			    color: #7f7f7f;
			    span{
			    	color: #333;
			    }
		    }
		}
		.statistics-module{
			padding: 0 20px;
		    height: 60px;
		    font-size: 14px;
		    color: #333;
		    line-height: 60px;
		    background: #F0F4F7;
		    border-radius: 4px;
		    span{
		    	float: right;
			    font-size: 14px;
			    font-weight: 600;
			    color: #0070C9;
		    }
		}
	}
	.panel{
		margin: 20px 0;
	    padding: 20px;
	    border-radius: 4px;
	    background: #fff;
	    .title{
	    	margin-bottom: 20px;
		    font-size: 16px;
		    line-height: 1;
		    color: #333;
		    font-weight: 600;
	    }
	    .module{
	    	cursor: pointer;
   			position: relative;
   			.module-bg{
   				position: absolute;
    			z-index: 1;
   			}
   			.module-content{
   				position: relative;
    			z-index: 10;
    			.module-title{
    				float: left;
				    margin-left: 120px;
				    font-size: 20px;
				    line-height: 160px;
    				color: #fff;
    			}
    			.module-num{
    				float: right;
				    margin-right: 60px;
				    font-size: 90px;
				    line-height: 160px;
    				color: #fff;
    			}
   			}
	    }
	}
}
</style>