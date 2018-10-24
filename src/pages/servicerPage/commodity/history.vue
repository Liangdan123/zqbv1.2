<template>
	<div class="history">
		<!--...................左右按钮..............-->
		<svg width="30" height="30" class="nextArrow" @click="nextProduct">
			<use xlink:href="#right" v-if="dialogVisible&&index!=list.data.length-1" />
		</svg>
		<svg width="30" height="30" class="prevArrow" @click="prevProduct">
			<use xlink:href="#left" v-if="dialogVisible&&index!=0" />
		</svg>
		<!--.................查看商品详情弹框....................-->
		<el-dialog :visible.sync="dialogVisible" 
			:close-on-click-modal="false" 
			custom-class="checkBox" 
			:show-close="false">
			
			<svg width="26" height="26" 
				class="closebox" 
				@click="dialogVisible = false">
				<use xlink:href="#close" />
			</svg>
			
			<div class="commodityDetail">
				<div class="clearfix btn">
					<p class="title">商品信息</p>
				</div>					
				<checkProducts 
					:checkProduct="onlyProductMess" 
					:irrList="irrList">
				</checkProducts>				
			</div>			
		</el-dialog>
		
		<div class="g-content" @click="closeSearch">
			<div class="button mb-20 clearfix">
				<search ref="isShow"
					hintMess="输入商品相关信息进行搜索"
					selectTitle="筛选商品"  
					inputSearch="product_name"
					:search.sync="searchCondition.search" 
					@searchMethod="searchProduct" 
					@emptyMthod="emptyMthod" >
					<template>
						<div class="condition">
							<span class="f12 color-3">商品价格:</span>
							<el-input type="number" 
								class="number" 
								v-model.number="searchCondition.search.product_price_yuan.min">
							</el-input> 
							到 <el-input type="number"  
								class="number" 
								v-model.number="searchCondition.search.product_price_yuan.max">
							</el-input>
						</div>
						<div class="condition">
							<span class="f12 color-3">商品销量:</span>
							<el-input type="number"  
								class="number" 
								v-model.number="searchCondition.search.sell_num.min"></el-input> 
							到 <el-input type="number"  
								class="number" v-model.number="searchCondition.search.sell_num.max">
							</el-input> 
						</div>
					</template>
				</search>
			</div>
			
			<!--...................表格..........-->
			<el-table :data="list.data" style="width: 100%" 
				:empty-text="emptyText" 
				@sort-change="sortChange"
				v-loading="loading">				
				<el-table-column prop="images" width="110">
					<template slot-scope="props">
						<img :src="props.row.images[0].image_url" alt="" class="view_img">
					</template>
				</el-table-column>
				<el-table-column prop="product_name" label="商品名称" width="304">
					<template slot-scope="props">
						<div class="product_name" @click="checkPro(props.row.id,props.$index)">
							{{props.row.product_name}}
						</div>
					</template>
				</el-table-column>
				<el-table-column 
					prop="product_price_yuan.min" 
					label="价格"  
					sortable="custom" 
					width="150">
					<template slot-scope="props">
						<span 
							v-if="props.row.product_price_yuan.min==props.row.product_price_yuan.max " 
							class="product_price">
				          {{props.row.product_price_yuan.min}}
				        </span>
						<span v-else class="product_price">
				        	{{props.row.product_price_yuan.min}} - {{props.row.product_price_yuan.max}}
				       </span>
					</template>
				</el-table-column>
				<el-table-column prop="statistics_product.sell_num" 
					label="销量" 
					sortable="custom" 
					width="120">
					
				</el-table-column>
				<el-table-column prop="created_at" label="创建时间"  sortable="custom" width="202">					
				</el-table-column>			
				<el-table-column prop="onoff_time" label="下架时间"  sortable="custom" width="192">					
				</el-table-column>	
				<el-table-column prop="time" label="操作" width="116">
					<template slot-scope="scope">
						<el-button type="text" size="small" class="btn-delete" 
							@click.stop="checkPro(scope.row.id,scope.$index)">
							查看详情 
						</el-button>
					</template>
				</el-table-column>
			</el-table>	
			<div class="clearfix" v-if="list.total>list.per_page">
				<el-pagination  @current-change="handleCurrentChange" 
					:current-page.sync="list.current_page" 
					:page-size="list.per_page" 
					layout="total, prev, pager, next" 
					:total="list.total" 
					class="mt-20 float-r">
	
				</el-pagination>
			</div>	
	
		</div>
	</div>
</template>

<script>
	import page from "@/utils/page"
	import onOffCheck from "@/utils/onOffCheck"
	import {format}from "@/api/script"
	import {getProductList,checkProduct} from "@/api/platform"
	export default{
		components:{
			"checkProducts":()=>import("@/components/platform/storeManage/checkProducts"),
		},
		data(){
			return{
				list:{data:[]},//表格全部数据
	 			searchCondition:{//搜索条件
					search:{
						status:"all",
						is_history: true,
						product_price_yuan:{
							min:"",
							max:"",
						},
						sell_num:{
							min:"",
							max:"",
						},	
					},					
					page: 1,
					per_page: 20,
				},
				emptyText:"暂无数据",
				loading:true,
				checkIrreList:{//违规提醒API信息
					product_id: 0,//默认值
				    page: 1,
				    per_page: 10
				},
				onlyProductMess:{},//商品详情信息
				dialogVisible:false,
				irrList:{
					data:[]
				},//违规信息
				order:{},//清空排序样式
			}
		},
		mixins:[page,onOffCheck],
		methods:{
			_doSearch(){
				let type=this.$store.getters.getType;
				let shop_id=this.$store.getters.getShop_id
				if(type===4){
					this.searchCondition=Object.assign({},this.searchCondition,{shop_id})
				};
				getProductList(this.searchCondition)
				.then(({data})=>{
					this.list=data;
					this.loading=false;
				})
			},
			searchProduct(){//搜索的
				this.emptyText = "未搜索到相关匹配信息";
				let searchProduct=this.searchCondition.search.product_price_yuan;
				let searchSell=this.searchCondition.search.sell_num;
				let time=this.searchCondition.search.onoff_time
				if(searchProduct.min&&searchProduct.max){
					if(+searchProduct.min>+searchProduct.max){
						this.$message("最高价格小于最低价格");
						return;
					}
				};
				if(searchSell.min&&searchSell.max){
					if(+searchSell.min>+searchSell.max){
						this.$message("最高销量小于最低销量");
						return;
					}
				};
				this._clearStoreage()
				this.searchMethod();
			},
			_clearStoreage(){//清空排序样式
				if(JSON.stringify(this.order)!=="{}"){
					this.order.column.prop="";				
					this.order.column.order="";
				};
				if(this.searchCondition.orderby){//删除排序
					delete this.searchCondition.orderby
				};
			},
			emptyMthod(){
	 			this.searchCondition={//搜索条件
					search:{
						product_price_yuan:{
							min:"",
							max:"",
						},
						sell_num:{
							min:"",
							max:"",
						},	
						onoff_time:{
							min:"",
							max:"",
						}
					},					
					page: 1,
					per_page: 20,
				};
				this.deleteTime = [];
				this._clearStoreage()
				this.searchMethod();
			},
			sortChange(column,prop,time){//排序搜索
				this.order=column;
				switch(true){
					case column.prop==="product_price_yuan.min"&&column.order==="descending":				
						this._sortCommon({product_price:"desc"})
						break;
					case column.prop==="product_price_yuan.min"&&column.order==="ascending":				
						this._sortCommon({product_price:"asc"})
						break;
					case column.prop==="statistics_product.sell_num"&&column.order==="descending":				
						this._sortCommon({sell_num:"desc"})
						break;
					case column.prop==="statistics_product.sell_num"&&column.order==="ascending":				
						this._sortCommon({sell_num:"asc"})
						break;
					case column.prop==="created_at"&&column.order==="descending":				
						this._sortCommon({create_time:"desc"})
						break;
					case column.prop==="created_at"&&column.order==="ascending":				
						this._sortCommon({create_time:"asc"})
						break;
					case column.prop==="onoff_time"&&column.order==="descending":				
						this._sortCommon({onoff_time:"desc"})
						break;
					case column.prop==="onoff_time"&&column.order==="ascending":				
						this._sortCommon({onoff_time:"asc"})
						break;
				};
			},
			_sortCommon(data){
				this.$set(this.searchCondition,"orderby",data);
				this.searchMethod();
			},
		}
	}
</script>

<style lang="scss">
	.history{
		margin-top: 120px;
		.g-content{
			.storeLink_nav{
				float: right;
				.condition{
					line-height: 36px;
					.el-input.number{
						width: 100px;						
						.el-input__inner{
							 height: 30px;
						}
					}
				}
				.classify{
					.el-input__inner{
						width: 220px;
						height: 30px;
					}
				}
			}
			.store-button2.remove{
				span{
					color:#B4282D;	
				}						
			}
			.el-table{
				.el-button+.el-button{
					margin-left: 0;
				}
			}			
		}
		.el-dialog__wrapper{
			.checkBox{
				width: 1056px;
				.el-dialog__header{
					padding: 0;

				}
				.el-dialog__body{
					.btn{
						p.title{
							float: left;
							font-size: 18px;
							color: #333;
							font-weight: bold;
						}
						.store-button2{
							float: right;
							span{
								color:#B4282D;	
							}						
						}
						.goOut{
							span{
								color:#333333;	
							}	
						}
					}

				}
			}
		}
	}
</style>