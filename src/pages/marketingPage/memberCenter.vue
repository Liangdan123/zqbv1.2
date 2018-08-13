<template>
	<div class="memberCen commodity">
		<Navbar></Navbar>
		<div class="content">
			<!--................累计金额.............-->
			<div class="count clearfix">
				<div class="plate bg-f mr-20 ">
					<div class="border-b clearfix">
						<div class="float-l mb-10">
							<span class="color-7F f14">累计充值金额（不含增额）</span>
							<p class="color-3 font-b f24 mt-10">
								￥{{money.total_recharge_yuan}}
							</p>
						</div>
						<svg width="48" height="48" class="float-r">
							<use xlink:href="#money"  />
						</svg>
					</div>
					<div>
						<p class="color-7F f14 mt-10">
							今日充值金额
							<span class="color-3">￥{{money.today_recharge_yuan}}</span>
						</p>
					</div>
				</div>
				<div class="plate bg-f mr-20">
					<div class="border-b clearfix">
						<div class="float-l mb-10">
							<span class="color-7F f14">累计会员消费（含增额）</span>
							<p class="color-3 font-b f24 mt-10">
								￥{{money.total_consume_yuan}}
							</p>
						</div>
						<svg width="48" height="48" class="float-r">
							<use xlink:href="#member"  />
						</svg>
					</div>
					<div>
						<p class="color-7F f14 mt-10">
							今日会员消费
							<span class="color-3">￥{{money.today_consume_yuan}}</span>
						</p>
					</div>					
				</div>
				<div class="plate bg-f">
					<div class="border-b clearfix">
						<div class="float-l mb-10">
							<span class="color-7F f14">会员池总余额（含增额）</span>
							<p class="color-3 font-b f24 mt-10">
								￥{{money.total_balance_yuan}}
							</p>
						</div>
						<svg width="48" height="48" class="float-r">
							<use xlink:href="#money"  />
						</svg>
					</div>
				</div>
			</div>
			<!--................会员管理与充值优惠管理切换.............-->
			<div class="content-con mt-20">
				<el-tabs v-model="activeName" @tab-click="handleClick">
				    <el-tab-pane label="会员管理" name="first">
				    	<tableArrow></tableArrow>
				    </el-tab-pane>
				    <el-tab-pane label="充值优惠管理" name="second">
				    	<rechargeTable></rechargeTable>				    	
				    </el-tab-pane>
				</el-tabs>
			</div>
		</div>
	</div>
</template>

<script>
		import Navbar from "@/components/marketing/Navbar"
		import {getMemMoney} from "@/api/marketing"
		import tableArrow from "@/components/marketing/tableArrow"
		import rechargeTable from "@/components/marketing/rechargeTable"
		export default{
			data(){
				return{
					money:{},
					activeName:"first",
				}
			},
			created(){
				var mall_id=this.$store.getters.getMall_id;
				//调用获取会员统计数据API
				getMemMoney(mall_id)
				.then(({data})=>{
					this.money=data
				})
				.catch(({response: {data}})=>{
					 this.$message.error(data.errorcmt);
				})	
			},
			components: {
				Navbar,tableArrow,rechargeTable
			},
			methods:{
				handleClick(){
					
				}
			}
		}
</script>

<style scoped="scoped">
	.content{
		box-sizing: border-box;
	    width: 1240px;
	    min-height: 204px;
	    border-radius: 4px;
	    margin: 0 auto;
	}
	.plate{
		float: left;
		padding: 20px;
		width: 360px;
		height: 102px;
		border-radius: 2px;
	}
	.border-b{
		border-bottom: 1px solid #F0F4F7;
	}
	.content-con{
		padding: 20px;
		background-color: #fff;
	}
</style>