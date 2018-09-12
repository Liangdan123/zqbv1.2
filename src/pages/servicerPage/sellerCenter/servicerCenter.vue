<template>
	<div class="servicerCenter">
		<!--................没有店铺时弹出的弹框.............-->
		<el-dialog 
			:visible.sync="dialogVisible" 
			:close-on-click-modal="false" 
			:close-on-press-escape="false" 
			:show-close="false"
			custom-class="noOpenStore">
			<img :src="urls"/>
			<div>
				<h4 class="">店铺信息未添加，请先添加店铺信息！</h4>
				<el-button class="store-button1 openStore" @click="openStore">
					我要开店
				</el-button>
				<p @click="loginOut">退出</p>
			</div>
		</el-dialog>
	
		<!--................累计金额.............-->
		<div class="count clearfix mb-20">
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
	import * as links from "@/links/index"
	import {getUserMess,getStoreData} from "@/api/servicer"
	import {getStoreStatistics} from "@/api/platform"
	import router from "@/router"
	export default{
		data(){
			return {
				dialogVisible:false,
				urls:links.IMG,//弹窗图片链接
				total:{},
			}
		},
		created(){
			this.getUser();//获取服务商店铺
			
		},
		filters:{
            money(value,label=''){
                // 金额转换成数字和整数部分
                value = Number(value).toFixed(2).split('.');
                let value_int = Number(value[0]).toLocaleString();// 转换成金额形式
                return `${label} ${value_int}.${value[1]}`;
            },
        },
		methods:{
			getUser(){
				getUserMess()//获取服务商店铺
				.then(({data})=>{
					if(data.length===0){//没有店铺弹出弹框让其开店
						this.dialogVisible=true
					}else if(data.length>0){//有店铺时获取店铺数据（卖家中心的数据）
						let shop_id = data[0].shop_id;	
						this.getServicerMess({shop_id})
					}
				})
				.catch(({response: {data}})=>{
					this.$message.error(data.errorcmt);
				})
			},
			getServicerMess(data){
				getStoreStatistics(data)
				.then(({data})=>{
					this.total=data
				})
				.catch(({response: {data}})=>{
					this.$message.error(data.errorcmt);
				})
			},
			openStore(){//我要开店按钮
				this.$store.dispatch("doCloseStore",false);
				router.push("/server/sellercenter/openStore")
			},
			loginOut(){//退出按钮
				this.$store.dispatch('doLogout');
			}
		}
	}
</script>

<style lang="scss">
.servicerCenter{
	margin-top: 80px;
	.noOpenStore{
		width: 600px;
		text-align:center;
		img{
			width: 104px;
			height: 104px;
		}
		h4{
			color: #333;
			font-weight: normal;
			font-size: 14px;
			margin-top: 20px;
			margin-bottom: 10px;
		}
		p{
			color: #0070C9;
			display: block;
			margin-top: 10px;		
			cursor: pointer;	
		}
	}
	.count{
		width: 1240px;
		margin: 0 auto;
		.plate{
			float: left;
			padding: 20px;
			width: 255px;
			height: 102px;
			border-radius: 2px;
		}
	}
	
}
</style>