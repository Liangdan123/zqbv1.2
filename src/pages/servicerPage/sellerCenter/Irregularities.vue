<template>
	<div class="Irregularities">
		<!--...............主体内容..........-->
		<div v-if="!editProductPage">		
			<el-breadcrumb separator=">">
				<el-breadcrumb-item :to="{path:'/server/sellercenter/servicerCenter'}">
					卖家中心
				</el-breadcrumb-item>
		  		<el-breadcrumb-item class="irr_product">
		  			{{is_read==="1"?"违规商品":"历史违规商品"}}
		  		</el-breadcrumb-item>
	  		</el-breadcrumb>
	  		<div class="g-content">
		  		<el-tabs v-model="is_read">
					<el-tab-pane label="违规商品" name="1" >				
					</el-tab-pane>
					<el-tab-pane label="历史违规商品" name="2" >				
					</el-tab-pane>
				</el-tabs>
				<!--.........表格主体部分............-->
				<el-table  :data="list.data" 
					style="width: 100%"
					v-loading="loading">
					<el-table-column label="商品名称">
						<template slot-scope="scope">
					 		<div class="float-l mr-10 mt-10 mb-10">
					 			<img :src="scope.row.product_image_url" 
					 				width="50" 
					 				height="50"/>
					 		</div>
					 		<div class="float-l prodcutName  mt-10 mb-10">
					 			{{scope.row.product_name}}
					 		</div>           	       				  	       						       					       			 					       			
						</template>
					</el-table-column>
					<el-table-column label="违规提醒" prop="illegal_content">						
					</el-table-column>
					<el-table-column label="提醒时间" prop="created_at">						
					</el-table-column>	
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button 
								type="text" 
								size="small" 
								class="btn-delete" 
								@click="editDoods(scope.$index)">
								编辑商品 
							</el-button>					
							<el-button 
								type="text" 
								size="small" 
								class="btn-delete" 
								@click="violation(scope.$index)">
								违规提醒 
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="clearfix mt-20">
					<el-pagination :total="list.total"
						:current-page.sync="list.current_page" 
						:page-size="list.per_page"
						layout="total, prev, pager, next"
						@current-change="handleCurrentChange"
						class="pagination float-r">
						
					</el-pagination>
				</div>
	  		</div> 
  		</div>
  		<!--................编辑商品..................-->
  		<div v-if="editProductPage">
  			<productMess 
  				@closeEditor="closeEditor" 
  				@seePro="seePro" 
  				:ediorMess="onlyProductMess"></productMess>    								 				
  		</div>
  		<!--................违规提醒弹框............-->
  		<el-dialog title="违规提醒" 
  			:visible.sync="readModel" 
  			:modal="false">
			<p>{{read.illegal_content}}</p>
			<div class="clearfix">
				<el-button class="store-button2 float-r px-30" 
					@click="keepCancelPro">
					取 消
				</el-button>
				<el-button 
					class="store-button1 float-r px-30 mr-10" 
					@click="keepCancelPro">
					保存
				</el-button>				
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import page from "@/utils/page"
	import {getIrregularities,checkIrregularities,isRead} from "@/api/servicer"
	import {checkProduct} from "@/api/platform"
	 export default{	 	
	 	name:"Irregularities",
	 	components:{
	 		"productMess":()=>import("@/components/servicer/sellerCenter/productMess")
	 	},
		mixins:[page],
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
				list:{},//列表的全部数据
				readModel:false,
				read:{ },
				illegal_id:"",//商品违规提醒记录id
				onlyProductMess:{},//商品数据详情
				editProductPage:false,//编辑页面显示不显示
	 		} 		
	 	},
	 	created(){
	 		this._initialSearch();
	 	},
	 	watch:{
			is_read(val){//监听事件变化
				this._initialSearch();
				this.loading=true;
				this.searchMethod();
			}
		},
	 	methods:{
		 	_initialSearch(){//初始化条件
	 			let shop_id=this.$store.state.servicer.shop_id;
				let is_read=Number(this.is_read);
				this.searchCondition={//搜索条件
					shop_id,
					search:{is_read},					
					page: 1,
					per_page: 20,
				};
		 	},
	 		_doSearch(){//数据API
	 			getIrregularities(this.searchCondition)
				.then(({data})=>{
					this.list=data;
					this.loading=false;
				})
	 		},
	 		editDoods(index){//编辑商品
	 			let product_id=this.list.data[index].product_id;
	 			this.illegal_id=this.list.data[index].illegal_id;
	 			checkProduct(product_id)//获取商品详情API接口
				.then(({data})=>{
					this.onlyProductMess=data;
					this.editProductPage=true;
				})
	 		},
	 		violation(index){//违规提醒
	 			let illegal_id=this.list.data[index].illegal_id;				
				checkIrregularities(illegal_id)
				.then(({data})=>{
					this.read=data;
					this.readModel=true
				})
	 		},
	 		keepCancelPro(){//违规提醒弹窗的取消，保存（只是用于看）
	 			this.readModel=false;
	 		},
	 		closeEditor(){//取消按钮（productMess）	 			
				this.editProductPage=false;
	 		},
	 		seePro(){//保存成功所发生的事情
				isRead(this.illegal_id)//保存成功就成为历史违规提醒
			  	.then(({data})=>{
			  		this.searchMethod();//重新掉列表接口
			  		this.editProductPage=false;
			  	})	 			
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
		.el-table{
			.el-table__body-wrapper{
				.prodcutName{
					width: 84px;		
					line-height: 50px;	
					overflow: hidden; 										
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}
	}
</style>