<template>
	<div class="warehouse">
		<div class="g-content" v-if="!editProductPage" @click="closeSearch">
			<div class="buttons">
				<el-button class="store-button2 sale_out mb-20" @click="onCommodity">
					<svg width="12" height="13">
						<use xlink:href="#shangjia" />
					</svg>
					<span>上架商品</span>
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
			
			
			
			
		</div>
	</div>
</template>

<script>
	import {getMallClassifyList,getProductList,checkProduct} from "@/api/platform"
	import {format}from "@/api/script"
	import page from "@/utils/page"
	import onOffCheck from "@/utils/onOffCheck"
	export default{
		components:{},
		data(){
			return{
				editProductPage:false,//编辑页面显示不显示
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
			}
		},
		created(){
			getMallClassifyList()//商城分类列表
			.then(({data})=>{				
				this.mallClassifyList=data;
			});
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
		mixins:[page,onOffCheck],
		methods:{
			_doSearch(){
				getProductList(this.searchCondition)
				.then(({data})=>{
					this.list=data;
				})
			},
			closeSearch(){
				this.$refs.isShow.closeSearch()
			},
			onCommodity(){//上架
				
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
				}
				if(searchSell.min&&searchSell.max){
					if(+searchSell.min>+searchSell.max){
						this.$message("最高销量小于最低销量");
						return;
					}
				}	
				this.searchMethod();
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
				this.searchMethod();
			},
			change(){//清除时间时Time值会变成undefined；
				if(!this.onOff) {
					this.onOff = [];
				}else{
					let min = format(this.onOff[0]);
					let max = format(this.onOff[1]);
					this.searchCondition.search.onoff_time =Object.assign({},this.searchCondition.search.onoff_time,{
						min,max
					});	
				}
			},
			sortChange(column,prop,time){//排序搜索
				
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
			.el-table{
				.el-button+.el-button{
					margin-left: 0;
				}
			}
		}
	}
</style>