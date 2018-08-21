<template>
	<div class="history commodity" @click="closeSearch">
		<Navbar></Navbar>	
		<svg width="30" height="30" class="next" @click="nextProduct">
			<use xlink:href="#right" v-if="dialogVisible&&index!=categoryList.data.length-1" />
		</svg>
		<svg width="30" height="30" class="prev" @click="prevProduct">
			<use xlink:href="#left" v-if="dialogVisible&&index!=0" />
		</svg>
		<!--.................查看商品详情....................-->
		<el-dialog :visible.sync="dialogVisible" size="small" :close-on-click-modal="false" custom-class="checkBox" :show-close="false" class="checkpro">
			<svg width="26" height="26" class="closebox" @click="dialogVisible = false">
				<use xlink:href="#close" />
			</svg>
			<!--.................主体内容....................-->
			<div class="commodityMess">
				<!--.................标题....................-->
				<div class="clearfix">
					<p class="float-l f18 font-b color-3 pb-20">商品信息</p>
				</div>
				<!--.................查看信息的内容，在组件里....................-->
				<checkProducts :checkProduct="onlyProductMess"></checkProducts>
			</div>		
		</el-dialog>		
		<div class="g-content"  v-loading="loading">
			<div class="buttons clearfix mb-20">
				<search v-on:searchMthod="search" v-on:emptyMthod="emptyMthod" v-on:searchCondition="searchCondition" ref="isShow">
					<template>
						<div class="condition">
							<span class="f12 color-3">商品价格:</span>
							<input type="number" v-model.number="searchMess.minPrice" /> 到 <input type="number" v-model.number="searchMess.maxPrice" />
						</div>
						<div class="condition">
							<span class="f12 color-3">商品销量:</span>
							<input type="number" v-model.number="searchMess.minSale"/> 到 <input type="number" v-model.number="searchMess.maxSale" />
						</div>
						<div class="condition">
							<span class="f12 color-3">发布时间:</span>
							<el-date-picker v-model="searchMess.minPubTime" type="date" placeholder="选择日期" :editable="false"> </el-date-picker> 到
							<el-date-picker v-model="searchMess.maxPubTime" type="date" placeholder="选择日期" :editable="false"> </el-date-picker>
						</div>
						<div class="condition">
							<span class="f12 color-3">下架时间:</span>
							<el-date-picker v-model="searchMess.minOffTime" type="date" placeholder="选择日期" :editable="false"> </el-date-picker> 到
							<el-date-picker v-model="searchMess.maxOffTime" type="date" placeholder="选择日期" :editable="false"> </el-date-picker>
						</div>
					</template>
				</search>
			</div>
			<el-table :data="categoryList.data" style="width: 100%" :empty-text="emptyText" @sort-change="sortChange">
				<el-table-column prop="images" width="70">
					<template slot-scope="props">
						<img :src="props.row.images[0].image_url" alt="" class="view_img">
					</template>
				</el-table-column>
				<el-table-column prop="product_name" label="商品名称" width="348">
					<template slot-scope="props">
						<div class="product_name" @click="checkProduct(props.$index)">{{props.row.product_name}}</div>
					</template>
				</el-table-column>
				<el-table-column prop="product_price_yuan.min" label="价格" sortable="custom" width="166">
					<template slot-scope="props">
							
						<span v-if="props.row.product_price_yuan.min==props.row.product_price_yuan.max " class="product_price">
					         {{props.row.product_price_yuan.min}}
					    </span>
							<span v-else class="product_price">
					        {{props.row.product_price_yuan.min}} - {{props.row.product_price_yuan.max}}
					    </span>
						
					</template>
				</el-table-column>
				<el-table-column prop="statistics_product.sell_num" label="销量" sortable="custom" width="166"></el-table-column>
				<el-table-column prop="created_at" label="创建时间" sortable="custom" width="166"></el-table-column>
				<el-table-column prop="onoff_time" label="下架时间" sortable="custom" width="166"></el-table-column>
				<el-table-column prop="time" label="操作" width="116">
					<template slot-scope="props">
						<el-button type="text" size="small" class="btn-delete" @click="checkProduct(props.$index)">
							查看详情
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination v-show="total" @current-change="handleCurrentChange" :current-page.sync="shopMess.page" :page-size="shopMess.per_page" layout="total, prev, pager, next" :total="total"> </el-pagination>
		</div>
	</div>
	</div>
</template>

<script>
	import Navbar from "@/components/commodity/Navbar"
	import search from '@/components/commodity/search'
	import commodityMethod from '@/utils/commodity'
	import onOffProd from "@/utils/onOffPro"
	import checkProducts from "@/components/commodity/checkProducts"
	import {checkProduct} from "@/api/commodity"
			
	export default {
		name: "history",
		data() {
			return {
				total: parseInt(""),
				list: [],
				isEdited: true,
				dialogVisible: false,
				index: 0,
				emptyText: "历史商品记录为空",
				searchMess:{
					minPrice: "",
					maxPrice: "",
					minPubTime: "",
					maxPubTime: "",
					minOffTime: "",
					maxOffTime: "",
					minSale: "",
					maxSale: "",
				},
				shopMess: {
					mall_id: "",
					shop_id: "",
					per_page: 20,
					page: 1,
					search: {}
				},
				categoryList: {},
				onlyProductMess:{},
				product_name:"",
				
				searchCon:{},
				isEmptyError:false,
				deleteAttrApi:["product_price_yuan","sell_num","publish_time","onoff_time"],
				isRturn:{
					is_history: true,
				},
				order:{},
				loading:true
			}
		},
		mixins: [commodityMethod, onOffProd],
		created() {
			//我的店铺商品数据
			let mall_id = this.$store.getters.getMall_id;
			let shop_id = this.$store.getters.getShop_id;
			this.$set(this.shopMess, "mall_id", mall_id);
			this.$set(this.shopMess, "shop_id", shop_id);
			this.$set(this.shopMess, "search", {
				is_history: true,
				sellout_status:"all",
				status:"all"
			});
			//调用商品列表借口
			this.searchMethods();
		},
		components: {Navbar,search,checkProducts},	
		methods: {
			//获取商品链接列表的方法（共用）
			searchCondition(val) {
				if(val!==undefined){
					this.shopMess.search=Object.assign({},this.shopMess.search,val);	
				}else{
					delete this.shopMess.search.product_name;
				}
				this.emptyText = "未搜索到相关商品";
				//清空排序样式
				if(JSON.stringify(this.order)!=="{}"){
					this.order.column.prop="";				
					this.order.column.order="";
				};
				this.searchMethods()
			},
			closeSearch(){
				if(this.isEdited !==false){
					this.$refs.isShow.closeSearch()
				};	
			},
			search() { //筛选商品				
				this.switchShow = false;
				//调用公共方法
				this.NumberMenthods("maxPrice","minPrice","product_price_yuan","最高价格小于最低价格");
				this.NumberMenthods("maxSale","minSale","sell_num","最高销量小于最低销量");
				//调用公共方法
				this.timeMenthods("minPubTime","maxPubTime","publish_time","最小时间小于最大时间");
				this.timeMenthods("minOffTime","maxOffTime","onoff_time","最小时间小于最大时间");
				if(this.isEmptyError) {
					return;
				};
				this.shopMess.search=Object.assign({},this.shopMess.search,this.searchCon)			
				this.emptyText = "未搜索到相关商品";
				//清空排序样式
				if(JSON.stringify(this.order)!=="{}"){
					this.order.column.prop="";				
					this.order.column.order="";
				};
				this.searchMethods()
			},	
			emptyMthod() { //清空
				let arr =["minPrice","maxPrice","minPubTime","maxPubTime","minOffTime","maxOffTime","minSale","maxSale"];	
				//调用批量清空
				this.clear(arr,this.searchMess);
				//清除传给Api的条件
				if(this.shopMess.search!==undefined){
					this.deleteAttrApi.map(item =>{
						if(this.shopMess.search[item]!==undefined){
							return delete this.shopMess.search[item]
						};
					})
				};
				delete this.searchCon.shop_category_id;
				//清空排序样式
				if(JSON.stringify(this.order)!=="{}"){
					this.order.column.prop="";				
					this.order.column.order="";
				};
				this.searchMethods()
			},
			//混合选项里(onOffPro)，商品详情的API
			checkProduct(index) {
				this.checkPro(index)
			},
		}
	}
</script>
<style lang="scss">
	.history{
		.checkpro{
			.el-dialog__header{
				padding:0;
			}
			.el-dialog__body{
				padding:20px;
			}
		}
	}
</style>