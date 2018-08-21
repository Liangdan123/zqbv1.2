<template>
	<div class="mallStoreMess">		
		<el-breadcrumb separator=">" class="mb-20">
			<el-breadcrumb-item :to="{ path: '/mallZxh/mallStoreMana'}">店铺管理</el-breadcrumb-item>
	  		<el-breadcrumb-item>活动管理</el-breadcrumb-item>
  		</el-breadcrumb>
  		<div class="mallStoreCon">
  			<el-tabs  v-model="activeName">
  				<el-tab-pane label="店铺信息" name="storeInfo"> 
  					<mallStoreMess  :storeMess="storeMess" :statistics="statistics" v-loading="loading"></mallStoreMess>
  				</el-tab-pane>
  				<el-tab-pane label="在售商品" name="sellgoods"> 
  					<onlineGoods :shop_id="shop_id"></onlineGoods>
  				</el-tab-pane>
  			</el-tabs>
  		</div>
	</div>
</template>

<script>
	import {getstoreMess,getShopStatistics,getProductList} from "@/api/myStore"
	import mallStoreMess from "@/components/mallStore/mallStoreMess"
	import onlineGoods from "@/components/mallStore/onlineGoods"
	import * as links from "@/links/index"
	export default{
		components:{mallStoreMess,onlineGoods},
		data(){
			return{
				storeMess:{},//店铺信息
				activeName:"storeInfo",
				statistics:{},//店铺统计数据
				loading:true,//数据加载
				categoryList:{},//商品列表
				shop_id:"",
			}
		},
		created(){
			if(JSON.stringify(this.$route.query)!=="{}"){
				this.shop_id=this.$route.query;
				getstoreMess(this.shop_id)//获取店铺信息
				.then(({data})=>{
					this.storeMess=data;
					if(this.storeMess.shop_logo===null){
						this.storeMess.shop_logo=links.IMG
					}
				})
				.catch(({response:{data}})=>{
					this.$message.error(data.errorcmt)
				});
				getShopStatistics(this.shop_id)//获取店铺统计数据
				.then(({data})=>{
					this.statistics=data;
					this.loading=false
				})
				.catch(({response:{data}})=>{
					this.$message.error(data.errorcmt)
				});				
			};
		},
	}
</script>

<style lang="scss">
	.mallStoreMess{
		width: 1240px;
		margin-top: 80px;
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
		.el-breadcrumb__separator{
			color:#979797;
		}
		.mallStoreCon{
			padding: 20px;
			background-color: #fff;
			.el-tabs__header{
				margin: 0 0 20px;
			}
		}
	}
</style>