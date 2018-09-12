<template>
	<div class="serverMemberCenter">
		<div class="content">
			<!--................累计金额.............-->
			<div class="count clearfix">
				<div class="plate bg-f mr-20 ">
					<div class="border-b clearfix">
						<div class="float-l mb-10">
							<span class="color-7F f14">累计充值金额</span>
							<p class="color-3 font-b f24 mt-10">
								{{money.total_recharge_yuan|fund}}
							</p>
						</div>
						<svg width="48" height="48" class="float-r">
							<use xlink:href="#money"  />
						</svg>
					</div>
					<div>
						<p class="color-7F f14 mt-10">
							今日充值金额
							<span class="color-3">{{money.today_recharge_yuan|fund}}</span>
						</p>
					</div>
				</div>
				<div class="plate bg-f mr-20">
					<div class="border-b clearfix">
						<div class="float-l mb-10">
							<span class="color-7F f14">累计会员消费</span>
							<p class="color-3 font-b f24 mt-10">
								{{money.total_consume_yuan|fund}}
							</p>
						</div>
						<svg width="48" height="48" class="float-r">
							<use xlink:href="#member"  />
						</svg>
					</div>
					<div>
						<p class="color-7F f14 mt-10">
							今日会员消费
							<span class="color-3">{{money.today_consume_yuan|fund}}</span>
						</p>
					</div>					
				</div>
				<div class="plate bg-f">
					<div class="border-b clearfix">
						<div class="float-l mb-10">
							<span class="color-7F f14">会员池总余额（含增额）</span>
							<p class="color-3 font-b f24 mt-10">
								{{money.total_balance_yuan|fund}}
							</p>
						</div>
						<svg width="48" height="48" class="float-r">
							<use xlink:href="#money"  />
						</svg>
					</div>
				</div>
			</div>
			
			<div class="tableMess mt-20">
				<el-tabs v-model="activeName">
				    <el-tab-pane label="会员管理" name="first">
				    </el-tab-pane>
				</el-tabs>
				<memberManage :isRole="false"></memberManage>
			</div>
		</div>
	</div>
</template>

<script>
	import {getRoleData} from "@/api/servicer"
	export default{
		components:{
			"memberManage":()=>import("@/components/platform/marketing/memberManage")
		},
		data(){
			return{
				activeName:"first",
				money:{},
			}
		},
		created(){
			let user_id={user_id:this.$store.state.user.user.zhixu_id};
			getRoleData(user_id)
			.then(({data})=>{
				this.money=data
			})
			.catch(({response: {data}})=>{
				 this.$message.error(data.errorcmt);
			})	
		},
		filters:{
			fund(value){
				// 金额转换成数字和整数部分
                value = Number(value).toFixed(2).split('.');
                let value_int = Number(value[0]).toLocaleString();// 转换成金额形式
                return `￥ ${value_int}.${value[1]}`;
			}
		}
	}
</script>

<style lang="scss">
	.serverMemberCenter{
		margin-top: 120px;
		.content{
			box-sizing: border-box;
		    width: 1240px;
		    min-height: 204px;
		    border-radius: 4px;
		    margin: 0 auto;
		    .count{
				.plate{
					float: left;
					padding: 20px;
					width: 360px;
					height: 102px;
					border-radius: 2px;
				}
			}
		    .tableMess{
				padding: 20px;
				background-color: #fff;
			}
		    
		}
	}
</style>