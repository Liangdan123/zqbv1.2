<template>
	<div class="Irregularities">
		<el-breadcrumb separator=">">
			<el-breadcrumb-item :to="{path:'/server/sellercenter/servicerCenter'}">卖家中心</el-breadcrumb-item>
	  		<el-breadcrumb-item class="irr_product">
	  			{{is_read==="1"?"违规商品":"历史违规商品"}}
	  		</el-breadcrumb-item>
  		</el-breadcrumb>
  		<div class="g-content">
	  		<el-tabs v-model="is_read" @tab-click="pintEvents">
				<el-tab-pane label="违规商品" name="1" >				
				</el-tab-pane>
				<el-tab-pane label="历史违规商品" name="2" >				
				</el-tab-pane>
			</el-tabs>
  		</div> 		
	</div>
</template>

<script>
	import page from "@/utils/page"
	 export default{	 	
	 	name:"Irregularities",
//		mixins:[page],
	 	data(){
	 		return{
	 			is_read:"1",
	 			searchCondition:{//搜索条件
	 				shop_id:"",
					search:{
						is_read:1,
					},
					page: 1,
					per_page: 20,
				},
				loading:true,
	 		} 		
	 	},
	 	watch:{
			is_read(val){//监听事件变化
				let shop_id=this.$store.state.servicer.shop_id;
				let is_read=Number(this.is_read);
				this.searchCondition={//搜索条件
					shop_id,
					search:{is_read},					
					page: 1,
					per_page: 20,
				};
				this.loading=true;
				this._doSearch();
			}
		},
	 	methods:{
	 		pintEvents(){//tab切换
	 			
	 		},
	 		_doSearch(){//数据API
	 			
	 		},
	 	}
	 }
</script>

<style lang="scss">
	.Irregularities{
		margin-top: 80px;
		width: 1240px;
		margin-left: auto;
		margin-right: auto;
		.el-breadcrumb{
			margin-top: 10px;
			margin-bottom: 10px;
			.irr_product{
				.el-breadcrumb__item__inner{
					color: #333;
				}				
			}
		}
		
	}
</style>