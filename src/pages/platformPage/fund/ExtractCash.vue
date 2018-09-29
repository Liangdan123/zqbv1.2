<template>
	<div class="extractCash">
		<Navbar></Navbar>
		<!--.................收入统计................-->
		<div class="incomeStatistics">
			<el-row :gutter="20">
				<el-col :span="8">
                    <div class="statisticsItem">
                        <p class="itemTitle">订单累计累计收入</p>
                        <p class="money-total">{{mallMoneyStatistics.total_give_order_yuan||0 | money}}</p>
                        <p class="money-history">今日订单收入 <span>{{mallMoneyStatistics.today_give_order_yuan||0 | money}}</span></p>
                        <svg
                            class="item-label"
                            width="48"
                            height="48">
                            <use xlink:href="#money"/>
                        </svg>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="statisticsItem">
                        <p class="itemTitle">会员发展累计收入</p>
                        <p class="money-total">{{mallMoneyStatistics.total_give_member_yuan||0 | money}}</p>
                        <p class="money-history">今日会员发展收入 <span>{{mallMoneyStatistics.today_give_member_yuan||0 | money}}</span></p>
                        <svg width="48" height="48" class="item-label">
                            <use xlink:href="#member"  />
                        </svg>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="statisticsItem">
                        <p class="itemTitle">角色发展累计收入</p>
                        <p class="money-total">{{mallMoneyStatistics.total_give_join_yuan||0 | money}}</p>
                        <p class="money-history">今日角色发展收入 <span>{{mallMoneyStatistics.today_give_join_yuan||0 | money}}</span></p>
                        <svg
                            class="item-label"
                            width="48"
                            height="48">
                            <use xlink:href="#money"/>
                        </svg>
                    </div>
                </el-col>
			</el-row>
		</div>
		<div class="g-content">
			<el-tabs v-model="activeName">
				<el-tab-pane label="待处理" name="1">
			    </el-tab-pane>
			    <el-tab-pane label="已处理" name="2,3,4">		    	
			    </el-tab-pane>
			</el-tabs>
			<fundTable
				:activeName="activeName">
				
			</fundTable>
		</div>
	</div>
</template>

<script>
	import {getFundTotalGive} from "@/api/platform"
	export default{
		name:"ExtractCash",
		components:{
			"Navbar":()=>import("@/components/platform/fund/Navbar"),
			"fundTable":()=>import("@/components/platform/fund/fundTable")
		},
		filters:{
			 money(value=0){
                // 金额转换成数字和整数部分
                value = Number(value).toFixed(2).split('.');
                let value_int = Number(value[0]).toLocaleString();// 转换成金额形式
                return `￥ ${value_int}.${value[1]}`;
            },
		},
		data(){
			return{
				mallMoneyStatistics:{
					"total_give_order_yuan": 0,
				    "total_give_member_yuan": 0,
				    "total_give_join_yuan": 0,
				    "today_give_order_yuan": 0,
				    "today_give_member_yuan": 0,
				    "today_give_join_yuan": 0,
				    "total_sell_order_yuan":0,
				    "today_sell_order_yuan":0
				},
				activeName:'1',
			}
		},
		created(){
			let compute_type={compute_type:1}
			getFundTotalGive(compute_type)//获取累计收入
			.then(({data})=>{
				this.mallMoneyStatistics=data
			})
		},
	}
</script>

<style lang="scss">
	.extractCash{
		margin-top: 120px;
		.incomeStatistics{
			width: 1240px;
			margin-left: auto;
			margin-right: auto;
			margin-bottom: 20px;
			.statisticsItem{
				position: relative;
			    padding: 20px 20px 0 20px;
			    background: #FFF;
			    font-size: 20px;
			    overflow: hidden;
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
			    .item-label{
			    	position: absolute;
				    top: 21px;
				    right: 21px;
			    }
			}
		}
	}
</style>