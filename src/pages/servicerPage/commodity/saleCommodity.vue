<template>
	<div class="saleCommodity">
		<!--...................上下按钮..............-->
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
					<el-button class="store-button2 ml-10" @click="modelOnlyOffPro">
						<svg width="12" height="13">
							<use xlink:href="#xiajia" />
						</svg>
						<span>下架商品</span>
					</el-button>
					<el-button class="store-button2 goOut" >
						<i class="iconfont icon-Rectangle f12"></i>
						<span>编辑商品</span>
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
				<el-button class="store-button2 sale_out mb-20" @click="offCommodity">
					<svg width="12" height="13">
						<use xlink:href="#xiajia" />
					</svg>
					<span>下架商品</span>
				</el-button>				
				<search   ref="isShow"
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
				@sort-change="sortChange">
				
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
				<el-table-column prop="created_at" label="创建时间"  sortable="custom" width="212">
					
				</el-table-column>			
				<el-table-column prop="status" label="商品状态"   width="182">
					<template slot-scope="props">
						<div v-if="props.row.deleted_at">商品已删除</div>
						<div v-else>
							<p  v-if="props.row.status==='on'">上架</p>
							<span  v-if="props.row.status==='off'">下架</span>
						</div>	
					</template>
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
  				:ediorMess="onlyProductMess"></productMess>    								 				
  		</div>
	</div>
</template>

<script>
	import page from "@/utils/page"
	import onOffCheck from "@/utils/onOffCheck"
	import {getMallClassifyList,getProductList,checkProduct} from "@/api/platform"
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
				mallClassifyList:[],//商品分类列表
				emptyText:"暂无数据",
				choiceOffList:{
					"products": [],
					"status": "off"
				},
				dialogVisible:false,
				onlyProductMess:{},//商品详情信息
				irrList:{
					data:[]
				},//违规信息
				checkIrreList:{//违规提醒API信息
					product_id: 0,//默认值
				    page: 1,
				    per_page: 10
				},
				checkProductID:0,//下架的商品ID
				editProductPage:false,//编辑页面显示不显示
				order:{},//清空排序样式
				index:0,//查看商品的顺序
				assentVisible:false,
				assessId:0,
			}
		},
		mixins:[page,onOffCheck],
		computed:{
			storeClassify(){//分类
				let classify=[];	
				if(this.mallClassifyList.length!==0){
					this.mallClassifyList.forEach(item=>{
						if(item.sub){
							item.sub.map(itemSub=>{
								classify.push({
									mall_category_name:itemSub.mall_category_name,
									id:itemSub.id
								})
							})
						}
					})
				};
				return classify
			},
		},
		mounted(){
			if(JSON.stringify(this.$route.query)!=="{}"){
				if(this.$route.query.name==="success"){
						this.$message({
				          message: '发布成功',
				          type: 'success',
				          showClose:true
				        });
				}
			}
		},
		created(){
			getMallClassifyList()//商城分类列表
			.then(({data})=>{				
				this.mallClassifyList=data;
			});
		},
		methods:{
			_doSearch(){
				getProductList(this.searchCondition)
				.then(({data})=>{
					this.list=data;
				})
			},
			offCommodity(){//下架
				if(this.choiceOffList.products.length == 0) {
					this.$message({  type: 'info', message: '请选择你要下架的商品' }); 			          			           			       
					return;
				}
				this._offBatch(this.choiceOffList)
			},
			onlyOffPro(index){//弹框中的下架
				let offPro = {
					products: [{product_id: this.list.data[index].id}],					
					status: "off"
				};
				this._offBatch(offPro);
			},
			searchProduct(){//模糊搜索
				this.emptyText = "未搜索到相关匹配信息";
				let searchProduct=this.searchCondition.search.product_price_yuan;
				let searchSell=this.searchCondition.search.sell_num;
				if(searchProduct.min&&searchProduct.max){
					if(+searchProduct.min>+searchProduct.max){
						this.$message("最高价格小于最低价格");
						return;
					}
				}
				if(searchSell.min&&searchSell.max){
					if(+searchSell.min>+searchSell.max){
						this.$message("最高销量小于最低销量");
						return;
					}
				}		
				this.searchMethod();
			},
			emptyMthod(){//清空
				this.searchCondition={
					search:{
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
				}
				this.searchMethod();
			},
			closeSearch() { //关闭筛选条件
				this.$refs.isShow.closeSearch()
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
				};
			},
			_sortCommon(data){
				this.$set(this.searchCondition,"orderby",data);
				this.searchMethod();
			},
			seeAssess(id){//查看评价
				this.assessId=id;
				this.assentVisible=true;
			},

		}
	}
</script>

<style lang="scss">
	.saleCommodity{
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