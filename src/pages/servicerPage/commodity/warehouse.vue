<template>
	<div class="warehouse">
		

		<!--.................查看商品详情弹框....................-->
		<el-dialog :visible.sync="dialogVisible" 
			:close-on-click-modal="false" 
			custom-class="checkBox" 
			:show-close="false">
			<!--...................左右按钮..............-->
			<svg width="30" height="30" class="nextArrow" @click="nextProduct">
				<use xlink:href="#right" v-if="dialogVisible&&index!=list.data.length-1" />
			</svg>
			<svg width="30" height="30" class="prevArrow" @click="prevProduct">
				<use xlink:href="#left" v-if="dialogVisible&&index!=0" />
			</svg>
			<!--...................删除按钮..............-->
			<svg width="26" height="26" 
				class="closebox" 
				@click="dialogVisible = false">
				<use xlink:href="#close" />
			</svg>
			
			<div class="commodityDetail">
				<div class="clearfix btn">
					<p class="title">商品信息</p>
					<el-button class="store-button2 ml-10" @click="onlyDeletePro(checkProductID)">
						<i class="iconfont icon-shanchu f12"></i>
						<span>删除商品</span>
					</el-button>
					<el-button class="store-button2 goOut" @click="editDoods(checkProductID)">
						<i class="iconfont icon-Rectangle f12"></i>
						<span>编辑商品</span>
					</el-button>
					<el-button class="store-button2 goOut" @click="onlyOnPro(checkProductID)">
						<svg width="12" height="13">
							<use xlink:href="#shangjia" />
						</svg>
						<span>上架商品</span>
					</el-button>
				</div>	
				
				<checkProducts 
					:checkProduct="onlyProductMess" 
					:irrList="irrList">
				</checkProducts>				
			</div>			
		</el-dialog>
						
		<!--.................评价详情弹框....................-->
		<el-dialog :visible.sync="assentVisible" 
			:close-on-click-modal="false" 
			custom-class="checkBox" 
			:show-close="false">		
			<svg width="26" height="26" 
				class="closebox" 
				@click="assentVisible = false">
				<use xlink:href="#close" />
			</svg>
			<assess :productId="assessId"></assess>							
		</el-dialog>
		
		<div class="g-content" v-if="!editProductPage" @click="closeSearch">
			<div class="buttons">
				<el-button class="store-button2 sale_out mb-20" @click="onCommodity">
					<svg width="12" height="13">
						<use xlink:href="#shangjia" />
					</svg>
					<span>上架商品</span>
				</el-button>	
				<el-button class="store-button2 remove" @click="deleteProduct">
					<i class="iconfont icon-shanchu f12"></i>
					<span>删除商品</span>
				</el-button>
				
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
								v-model.number="searchCondition.search.product_price_yuan.min"></el-input> 
							到 <el-input type="number"  
								class="number" 
								v-model.number="searchCondition.search.product_price_yuan.max"></el-input>
						</div>
						<div class="condition">
							<span class="f12 color-3">商品销量:</span>
							<el-input type="number"  
								class="number" 
								v-model.number="searchCondition.search.sell_num.min"></el-input> 
							到 <el-input type="number"  
								class="number" v-model.number="searchCondition.search.sell_num.max"></el-input> 
						</div>
						<div class="condition">
							<span class="f12 color-3">下架时间:</span>
							<el-date-picker v-model="onOff" 
								type="daterange" 
								placeholder="选择日期范围" 								
								@change="change" size="small">
						</el-date-picker>
						</div>
						<div class="classify">
							<span class="f12 color-3">商品分类:</span>
							<el-select v-model="searchCondition.search.mall_category_id" 
								filterable placeholder="请选择"
								class="select"><!--..........TODO..........-->
								<el-option v-for="(item,index) in storeClassify" 
									:key="index" :value="item.id" 
									:label="item.mall_category_name">
									
								</el-option>
							</el-select>
						</div>
					</template>
				</search>
			</div>
			<!--...................表格..........-->
			<el-table :data="list.data" style="width: 100%" 
				@selection-change="handleSelection" 
				:empty-text="emptyText" 
				@sort-change="sortChange"
				v-loading="loading">				
				<el-table-column type="selection" width="36"> </el-table-column>
				<el-table-column prop="images" width="74">
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
							@click.stop="editDoods(scope.row.id)">
							编辑商品 
						</el-button>
						<el-button type="text" size="small" class="btn-delete" 
							@click.stop="seeAssess(scope.row.id)">
							查看评价 
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
		<!--................编辑商品..................-->
  		<div v-if="editProductPage">
  			<productMess 
  				@closeEditor="closeEditor" 
  				@seePro="seePro" 
  				:ediorMess="onlyProductMess">
  			</productMess>    								 				
  		</div>
	</div>
</template>

<script>
	import {getMallClassifyList,getProductList,checkProduct} from "@/api/platform"
	import {format}from "@/api/script"
	import page from "@/utils/page"
	import onOffCheck from "@/utils/onOffCheck"
	export default{
		components:{
			"checkProducts":()=>import("@/components/platform/storeManage/checkProducts"),
			"productMess":()=>import("@/components/servicer/sellerCenter/productMess"),
			"assess":()=>import("@/components/servicer/commodity/assess")
		},
		data(){
			return{
				list:{data:[]},//表格全部数据
	 			searchCondition:{//搜索条件
					search:{
						status:"off",
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
				},
				mallClassifyList:[],//商品分类列表
				onOff:[],//下架时间
				emptyText:"暂无数据",
				loading:true,
				checkIrreList:{//违规提醒API信息
					product_id: 0,//默认值
				    page: 1,
				    per_page: 10
				},
				editProductPage:false,//编辑页面显示不显示
				onlyProductMess:{},//商品详情信息
				assentVisible:false,
				assessId:0,
				choiceOffList:{
					"products": [],
					"status": "on"
				},
				dialogVisible:false,
				irrList:{
					data:[]
				},//违规信息
				order:{},//清空排序样式
			}
		},
		created(){
			getMallClassifyList()//商城分类列表
			.then(({data})=>{				
				this.mallClassifyList=data;
				this.loading=false
			});
		},
		computed:{
			storeClassify(){//分类
				let classify=[];
				if(this.mallClassifyList.length===0){return}		
				this.mallClassifyList.forEach(item=>{
					if(item.sub){
						item.sub.map(itemSub=>{
							classify.push({
								mall_category_name:itemSub.mall_category_name,
								id:itemSub.id
							})
						})
					}
				});		
				return classify
			},
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
			closeSearch(){
				this.$refs.isShow.closeSearch()
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
				this.onOff = [];
				this._clearStoreage()
				this.searchMethod();
			},
			change(){//清除时间时Time值会变成undefined；
				if(!this.onOff) {
					this.onOff = [];
				}else{
					let min = format(this.onOff[0]);
					let max = format(this.onOff[1]);
					this.searchCondition.search.onoff_time=Object.assign({},this.searchCondition.search.onoff_time,{
						min,max
					});	
				}
			},
			seeAssess(id){//查看评价
				this.assessId=id;
				this.assentVisible=true;
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
	.warehouse{
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