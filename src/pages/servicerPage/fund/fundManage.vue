<template>
	<div class="fundManage">
		<!--................累计金额.............-->
		<div class="count clearfix" v-loading="loadTotal">
			<div class="plate bg-f mr-20 ">
				<div class="border-b clearfix">
					<div class="float-l mb-10">
						<span class="color-7F f14">总销售额</span>
						<p class="color-3 font-b f24 mt-10">
							{{total.total_sell_money_yuan|money}}
						</p>
					</div>
					<svg width="48" height="48" class="float-r"><use xlink:href="#money"/></svg>													
				</div>
				<div>
					<p class="color-7F f14 mt-10">
						今日销售额
						<span class="color-3">{{total.today_sell_money_yuan|money}}</span>
					</p>
				</div>
			</div>
			<div class="plate bg-f mr-20">
				<div class="border-b clearfix">
					<div class="float-l mb-10">
						<span class="color-7F f14">支付订单数</span>
						<p class="color-3 font-b f24 mt-10">{{total.total_pay_order_num}}</p>																
					</div>
					<svg width="48" height="48" class="float-r"><use xlink:href="#payOrder"/></svg>													
				</div>
				<div>
					<p class="color-7F f14 mt-10">
						今日订单数
						<span class="color-3">{{total.today_pay_order_num}}</span>
					</p>
				</div>
			</div>
			<div class="plate bg-f mr-20">
				<div class="border-b clearfix">
					<div class="float-l mb-10">
						<span class="color-7F f14">访问量</span>
						<p class="color-3 font-b f24 mt-10">
							{{total.total_pv_num}}
						</p>
					</div>
					<svg width="48" height="48" class="float-r"><use xlink:href="#member"/></svg>													
				</div>
				<div>
					<p class="color-7F f14 mt-10">
						今日访客量
						<span class="color-3">{{total.today_pv_num}}</span>
					</p>
				</div>					
			</div>
			<div class="plate bg-f">
				<div class="border-b clearfix">
					<div class="float-l mb-10">
						<span class="color-7F f14">访客量</span>
						<p class="color-3 font-b f24 mt-10">	
							{{total.total_uv_num}}
						</p>
					</div>
					<svg width="48" height="48" class="float-r">
						<use xlink:href="#visitNum"  />
					</svg>
				</div>
				<div>
					<p class="color-7F f14 mt-10">
						今日访客数
						<span class="color-3">{{total.today_uv_num}}</span>
					</p>
				</div>	
			</div>
		</div>
		
	</div>
</template>

<script>
	import {getRoleData} from "@/api/servicer"
	export default{
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="scss">
	.fundManage{
		margin-top: 80px;
	}
</style>