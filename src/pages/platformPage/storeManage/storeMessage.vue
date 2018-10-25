<template>
	<div class="storeMessage">
		<el-breadcrumb separator=">" class="mb-20">
			<el-breadcrumb-item :to="{ path: '/mallZxh/storeManage'}">
				店铺管理
			</el-breadcrumb-item>
	  		<el-breadcrumb-item>{{storeMessage.shop_name}}</el-breadcrumb-item>
  		</el-breadcrumb>
		<div class="g-content">
			<div class="mallStoreCon">
	  			<el-tabs  v-model="activeName">
	  				<el-tab-pane label="店铺信息" name="storeInfo"> 
	  					<storeMessageSub :storeMessage="storeMessage"
	  						:statistics="statistics"
	  						v-loading="loading">
	  						
	  					</storeMessageSub>
	  				</el-tab-pane>
	  				<el-tab-pane label="在售商品" name="sellgoods"> 
	  					<onlineGoods :shop_id="shop_id.shop_id"></onlineGoods>
	  				</el-tab-pane>
	  			</el-tabs>
	  		</div>
		</div>
	</div>
</template>

<script>
	import {getStoreMessage,getStoreStatistics} from "@/api/platform"
	import * as links from "@/links/index"
	import storeMessageSub from "@/components/platform/storeManage/storeMessage"
	import onlineGoods from "@/components/platform/storeManage/onlineGoods"
	export default{
		components:{storeMessageSub,onlineGoods},
		data(){
			return{
				storeMessage:{},//店铺信息
				statistics:{},//店铺统计数据
				loading:true,
				activeName:"storeInfo",
				shop_id:"",
			}
		},
		created(){
			if(JSON.stringify(this.$route.query)!=="{}"){
				this.shop_id=this.$route.query;
				this.shop_id.shop_id=Number(this.shop_id.shop_id)
				getStoreMessage(this.shop_id)//获取店铺信息
				.then(({data})=>{
					this.storeMessage=data;
					this.loading=false;
					if(this.storeMessage.shop_logo===null){
						this.storeMessage.shop_logo=links.IMG
					}
				})
				getStoreStatistics(this.shop_id)//获取店铺统计数据
				.then(({data})=>{
					this.statistics=data;
					this.loading=false
				})			
			};
		},
	}
</script>

<style lang="scss">
	.storeMessage{
		margin-top: 80px;
		.el-breadcrumb{
			width: 1240px;
			margin-left: auto;
			margin-right: auto;
			.el-breadcrumb__item__inner{
				color:#7F7F7F;
				font-size: 16px;
				font-weight: bold;
			}
			.el-breadcrumb__item:last-child{
				.el-breadcrumb__item__inner{
					color:#333;
				}			
			}
		}

	}
</style>