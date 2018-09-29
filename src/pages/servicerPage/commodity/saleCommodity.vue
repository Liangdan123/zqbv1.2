<template>
	<div class="saleCommodity">
			<!--...................上下按钮..............-->
			<!--<svg width="30" height="30" class="next" @click="nextProduct">
				<use xlink:href="#right" v-if="dialogVisible&&index!=categoryList.data.length-1" />
			</svg>
			<svg width="30" height="30" class="prev" @click="prevProduct">
				<use xlink:href="#left" v-if="dialogVisible&&index!=0" />
			</svg>-->
		
		<div class="g-content" v-if="isEdited" @click="closeSearch">
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
					@searchMethod="searchInput" 
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
								<!--<el-option v-for="(item,index) in storeClassify" 
									:key="index" :value="item.id" 
									:label="item.shop_category_name" 
									:class="item.level===1?'color':''">
								</el-option>-->
							</el-select>
						</div>
					</template>
				</search>
			</div>
			
			
		</div>
	</div>
</template>

<script>
	import page from "@/utils/page"
	import storeClassify from '@/utils/storeClassify'
		import {getMallClassifyList} from "@/api/platform"
	export default{
		data(){
			return{
				isEdited:true,//显示表格还是显示页面
	 			searchCondition:{//搜索条件
					search:{
						product_price_yuan:{
							min:"",
							max:"",
						},
						sell_num:{
							min:"",
							max:"",
						}
					},
					page: 1,
					per_page: 20,
				},

			}
		},
		mixins:[page,storeClassify],
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
			})
		},
		methods:{
			_doSearch(){
				
			},
			offCommodity(){
				
			},
			searchInput(){//模糊搜索
				this.emptyText = "未搜索到相关匹配信息";
				this.searchMethod();
			},
			emptyMthod(){//清空
				this.searchMethod();
			},
			closeSearch() { //关闭筛选条件
				this.$refs.isShow.closeSearch()
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
		}
	}
</style>