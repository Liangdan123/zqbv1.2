<template>
	<div class="category">
		<div class="g-content" @click="closeSearch">
			<div class="button">
				<el-button class="store-button2 mb-20">
					<i class="iconfont icon-fenlei f12"></i>
					<span>批量分类</span>
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
						<div class="classify">
							<span class="f12 color-3">商品状态:</span>
							<el-select v-model="searchCondition.search.status" filterable placeholder="请选择">
								<el-option v-for="(item,index) in statusList" :key="index" :value="item.status" :label="item.value"> 
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
				v-loading="loading"
				@sort-change="sortChange">
				
				<el-table-column type="selection" width="36"> </el-table-column>
				<el-table-column prop="images" width="74">
					<template slot-scope="props">
						<img :src="props.row.images[0].image_url" alt="" class="view_img">
					</template>
				</el-table-column>
				<el-table-column prop="product_name" label="商品名称" width="304">
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
							
				<el-table-column prop="mall_categorys" label="所属分类" width="120">
					<template slot-scope="scope">
						<div v-if='scope.row.mall_categorys.length>0'>
							<p>{{scope.row.mall_categorys[0].mall_category_name}}</p>
							<div v-if='scope.row.mall_categorys.length>1'>
								<p class="toggle" @click="toggleShow(scope.$index)">
									更多分类 
									<img src="../../../assets/image/xiala.png" width="10" height="10">									 
								</p>
								<ul :class="{categoryBox:showIndex===scope.$index} ">									
									<li v-if="index>0" v-for="(value,index) in scope.row.mall_categorys">										
										{{value.mall_category_name}}
									</li>
								</ul>
							</div>
						</div>
					</template>
				</el-table-column>
				
				<el-table-column prop="created_at" label="创建时间"  sortable="custom" width="212">
					
				</el-table-column>			
				<el-table-column prop="status" label="商品状态"   width="182">
					<template slot-scope="props">
						<div v-if="props.row.deleted_at">商品已删除</div>
						<div v-else>
							<p  v-if="props.row.status==='on'">出售中</p>
							<span  v-if="props.row.status==='off'">仓库中</span>
						</div>	
					</template>
				</el-table-column>
				
				<el-table-column prop="time" label="操作" width="116">
					<template slot-scope="scope">
						<!--<el-button type="text" size="small" class="btn-delete" 
							@click.stop="editDoods(scope.row.id)">
							编辑商品 
						</el-button>
						<el-button type="text" size="small" class="btn-delete" 
							@click.stop="seeAssess(scope.row.id)">
							查看评价 
						</el-button>-->
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
	import {getMallClassifyList,getProductList} from "@/api/platform"
	export default{
		data(){
			return{
				list:{data:[]},//表格全部数据
	 			searchCondition:{//搜索条件
					search:{
						status:"on",
						product_price_yuan:{
							min:"",
							max:"",
						},					
					},
					page: 1,
					per_page: 20,
				},
				statusList: [{
					"status": "on",
					"value": "出售中"
				}, {
					"status": "off",
					"value": "仓库中"
				}],
				mallClassifyList:[],//商品分类列表
				emptyText:"暂无数据",				
				order:{},//清空排序样式
				index:0,//查看商品的顺序				
				loading:true,
				showIndex:"",
			}
		},
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
		created(){
			getMallClassifyList()//商城分类列表
			.then(({data})=>{				
				this.mallClassifyList=data;
			});
		},
		mixins:[page],
		methods:{
			_doSearch(){
				getProductList(this.searchCondition)
				.then(({data})=>{
					this.list=data;
					this.loading=false;
				})
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
				this._clearStoreage()
				this.searchMethod();
			},
			closeSearch() { //关闭筛选条件
				this.$refs.isShow.closeSearch()
			},
			sortChange(){//排序
				
			},
			handleSelection(){//选择批量分类
				
			},
			toggleShow(index) {//下拉框看见与看不见
				index === this.showIndex?this.showIndex = "":this.showIndex = index;
			},
		}
	}
</script>

<style lang="scss">
	.category{
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
			.store-button2{
				span{
					color:#333;	
				}						
			}
			.el-table{
				overflow:visible;
				.el-table__body-wrapper{
					overflow: inherit;
				}
				.toggle{
					color: #7F7F7F;
					cursor: pointer;
					position: relative;
				}
				.toggle+ul {
					display: none;
				}
				.toggle+.categoryBox {
					display: block;
					position: absolute;
					background: #fff;
					width: 184px;
					box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.04), 0 2px 4px 0 rgba(0, 0, 0, 0.12);
					border-radius: 2px;
					z-index: 1000;
					padding: 10px;
				}
				.el-button+.el-button{
					margin-left: 0;
				}
			}			
		}
	}
</style>