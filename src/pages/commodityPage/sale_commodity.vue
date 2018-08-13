<template>
	<div class="commodity sale_commodity" @click="closeSearch">
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
					<p class="float-l f18 font-b color-3">商品信息</p>
					<el-button class="store-button2 sale_out mb-20 float-r ml-10" @click="BoxEdtior">
						<span>编辑商品</span>
					</el-button>
					<el-button class="store-button2 sale_out mb-20 float-r" @click="boxOffPro">
						<svg width="12" height="13">
							<use xlink:href="#xiajia" />
						</svg>
						<span>下架商品</span>
					</el-button>
				</div>
				<!--.................查看信息的内容，在组件里....................-->
				<checkProducts :checkProduct="onlyProductMess"></checkProducts>
			</div>
		</el-dialog>

		<!--.................表格主体部分....................-->
		<div class="g-content" v-if="isEdited"  v-loading="loading">
			<div class="buttons">
				<el-button class="store-button2 sale_out mb-20" @click="offCommodity">
					<svg width="12" height="13">
						<use xlink:href="#xiajia" />
					</svg>
					<span>下架商品</span>
				</el-button>				
				<search v-on:searchMthod="search" @emptyMthod="emptyMthod" @searchCondition="searchCondition"  ref="isShow">
					<template>
						<div class="condition">
							<span class="f12 color-3">商品价格:</span>
							<input type="number" v-model.number="searchMess.minPrice" /> 到 <input type="number" v-model.number="searchMess.maxPrice" />
						</div>
						<div class="condition">
							<span class="f12 color-3">商品库存:</span>
							<input type="number" v-model.number="searchMess.minInventory" /> 到 <input type="number" v-model.number="searchMess.maxInventory" />
						</div>
						<div class="condition">
							<span class="f12 color-3">商品销量:</span>
							<input type="number" v-model.number="searchMess.minSale"/> 到 <input type="number" v-model.number="searchMess.maxSale" />
						</div>
						<div class="condition">
							<span class="f12 color-3">发布时间:</span>
							<el-date-picker v-model="searchMess.minTime" type="date" placeholder="选择日期" :editable="false"> </el-date-picker> 到
							<el-date-picker v-model="searchMess.maxTime" type="date" placeholder="选择日期" :editable="false"> </el-date-picker>
						</div>
						<div class="classify">
							<span class="f12 color-3">店铺中分类:</span>
							<el-select v-model="searchMess.classifyId" filterable placeholder="请选择">
								<el-option v-for="(item,index) in storeClassify" :key="index" :value="item.id" :label="item.shop_category_name" :class="item.level===1?'color':''">
								</el-option>
							</el-select>
						</div>
					</template>
				</search>
			</div>
			
			<el-table :data="categoryList.data" style="width: 100%" @selection-change="handleSelectionChange" :empty-text="emptyText" @sort-change="sortChange">
				<el-table-column type="selection" width="36"> </el-table-column>
				<el-table-column prop="images" width="74">
					<template slot-scope="props">
						<img :src="props.row.images[0].image_url" alt="" class="view_img">
					</template>
				</el-table-column>
				<el-table-column prop="product_name" label="商品名称" width="304">
					<template slot-scope="props">
						<div class="product_name" @click="checkProduct(props.$index)">{{props.row.product_name}}</div>
					</template>
				</el-table-column>
				<el-table-column prop="product_price_yuan.min" label="价格"  sortable="custom" width="120">
					<template slot-scope="props">
						<span v-if="props.row.product_price_yuan.min==props.row.product_price_yuan.max " class="product_price">
				          {{props.row.product_price_yuan.min}}
				        </span>
						<span v-else class="product_price">
				        	{{props.row.product_price_yuan.min}} - {{props.row.product_price_yuan.max}}
				       </span>
					</template>
				</el-table-column>
				<el-table-column prop="product_store" label="库存" sortable="custom" width="120"></el-table-column>
				<el-table-column prop="statistics_product.sell_num" label="销量" sortable="custom" width="120"></el-table-column>
				<el-table-column prop="created_at" label="创建时间"  sortable="custom" width="152"></el-table-column>			
				<el-table-column prop="status" label="商品状态"   width="152">
					<template slot-scope="props">
						<div v-if="props.row.sellout_status==='on'">正常出售中</div>
						<div v-if="props.row.sellout_status==='off'">
							<p class="selloutStatus">商品已售罄</p>
							<span class="selloutTime">{{props.row.buhuo_date}}自动下架</span>
						</div>	
					</template>
				</el-table-column>
				
				<el-table-column prop="time" label="操作" width="116">
					<template slot-scope="scope">
						<el-button type="text" size="small" class="btn-delete" @click.stop="editDoods(scope.$index)">
							编辑商品 
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination v-show="total" @current-change="handleCurrentChange" :current-page.sync="shopMess.page" 
				:page-size="shopMess.per_page" layout="total, prev, pager, next" :total="total" class="mt-20">

			</el-pagination>
		</div>
		<!--.................编辑商品部分....................-->
		<productMess v-if="editPro" :ediorMess="onlyProductMess" @seePro="seePro"  @empty="empty" 
			@closeEditor="closeEditor" :title="title">
			
		</productMess>
	</div>

</template>

<script>
	import Navbar from "@/components/commodity/Navbar"
	import search from '@/components/commodity/search'
	import storeClassify from '@/utils/storeClassify'
	import commodityMethod from '@/utils/commodity'
	import { checkProduct } from "@/api/commodity"
	import checkProducts from "@/components/commodity/checkProducts"
	import productMess from "@/components/commodity/productMess"
	import onOffProd from "@/utils/onOffPro"
	export default {
		name: "sale_commodity",
		data() {
			return {
				total: parseInt(""),
				list: [],
				isEdited: true,
				dialogVisible: false,
				index: 0,
				emptyText: "尚未出售任何商品",
				changeList: {
					"products": [],
					"status": "off"
				},
				searchMess:{
					classifyId: "",
					minPrice: "",
					maxPrice: "",
					minInventory: "",
					maxInventory: "",
					minTime: "",
					maxTime: "",
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
				listLength: 0,
				onlyProductMess: {},
				editPro: false,
				product_name:"",
				
				searchCon:{},
				isEmptyError:false,
				deleteAttrApi:["product_price_yuan","product_store","sell_num","publish_time","shop_category_id"],
				isRturn:{
					status: "on",
				},
				order:{},
				title:"编辑商品",
				loading:true,
			}
		},
		mixins: [storeClassify, commodityMethod, onOffProd],
		created() {
			//我的店铺商品数据
			let mall_id = this.$store.getters.getMall_id;
			let shop_id = this.$store.getters.getShop_id;
			this.$set(this.shopMess, "mall_id", mall_id);
			this.$set(this.shopMess, "shop_id", shop_id);
			this.$set(this.shopMess, "search", {
				status: "on",
				sellout_status:"all"
			});
			if(JSON.stringify(this.$route.query)!=="{}"){
				switch(true){
					case this.$route.query.number===0:
						this.searchMess.minInventory=0;
						this.searchMess.maxInventory=0;
						this.shopMess.search=Object.assign({},this.shopMess.search,{
							product_store:{
								max:0,
								min:0
							}
						});
						break;
					case this.$route.query.name==="success":
						this.$message({
				          message: '发布成功',
				          type: 'success',
				          showClose:true
				        });
				}
			};		
			this.searchMethods();
		},
		components: {
			Navbar,search,checkProducts,productMess			
		},
		methods: {
			//获取商品链接列表的方法（共用）
			searchCondition(val) {							
				if(val!==undefined){
					this.shopMess.search=Object.assign({},this.shopMess.search,val);	
				}else{
					delete this.shopMess.search.product_name;
				};
				this.emptyText = "未搜索到相关商品";
				//清空排序样式
				if(JSON.stringify(this.order)!=="{}"){
					this.order.column.prop="";				
					this.order.column.order="";
				};
				this.searchMethods();
			},
			search() { //筛选商品				
				this.switchShow = false;
				//调用公共方法
				this.NumberMenthods("maxPrice","minPrice","product_price_yuan","最高价格小于最低价格");
				this.NumberMenthods("maxInventory","minInventory","product_store","最高库存小于最低库存");
				this.NumberMenthods("maxSale","minSale","sell_num","最高销量小于最低销量");	
				if(this.searchMess.classifyId != "") {
					this.searchCon.shop_category_id = this.searchMess.classifyId
				};				
				//调用公共方法
				this.timeMenthods("minTime","maxTime","publish_time","最小时间小于最大时间");
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
				this.searchMethods();

			},	
			//清空条件
			emptyMthod() { 
				let arr =["classifyId","minPrice","maxPrice","minInventory","maxInventory","minTime",
						"maxTime","minSale","maxSale"];
				//调用批量删除清空的方法
				this.clear(arr,this.searchMess);
				//清除传给Api的条件	
				if(this.shopMess.search!==undefined){
					this.deleteAttrApi.map(item =>{
						if(this.shopMess.search[item]!==undefined){
							return delete this.shopMess.search[item]
						};
					});
				};
				delete this.searchCon.shop_category_id;
				//清空排序样式
				if(JSON.stringify(this.order)!=="{}"){
					this.order.column.prop="";				
					this.order.column.order="";
				};
				this.searchMethods();	
			},
			closeSearch(){
				if(this.isEdited !==false){
					this.$refs.isShow.closeSearch()
				};				
			},
			handleSelectionChange(list) { //选中
				let arr = [];
				for(let val of list) {
					arr.push({
						product_id: val.id
					})
				}
				this.$set(this.changeList, "products", arr);
			},
			offCommodity() { //下架
				if(this.changeList.products.length == 0) {
					this.$message({
			            type: 'info',
			            message: '请选择你要下架的商品'
			        }); 
					return;
				}
				this.offBatch(this.changeList)
			},
			//混合选项里(onOffPro)
			checkProduct(index) {
				this.checkPro(index)
			},
			//弹出框的下架商品
			boxOffPro() {
				var offPro = {
					products: [{
						product_id: this.onlyProductMess.id
					}],
					status: "off"
				}
				//调用上下架的方法（混合选项里）
				this.offBatch(offPro)
			},
			//编辑商品
			editDoods(data) {
				this.isEdited = false;
				this.editPro = true;
				//获取商品需要查询的ID
				let product_id = this.categoryList.data[data].id;
				this.seeProduct(product_id).then((res)=>{this.onlyProductMess = res;})				
			},
			closeEditor(){
				this.isEdited = true;
				this.editPro = false;
			},
			//弹出框编辑商品
			BoxEdtior() {
				this.isEdited = false;
				this.editPro = true;
				this.dialogVisible = false;
			},
			//子集传过来的数据改变目前显示的页面
			seePro(data,message) {
				this.editPro = data;
				this.isEdited = !data;
				// 更新数据
				if(message){
				  this.$set(this.onlyProductMess,'distributes',message)
				}
				//编辑商品的方法(混合选项)
				this.searchMethods();
			},
			//子集传过来的数据（productMess）
			empty(data){
				this.emptyText = data;
			}
		}
	}
</script>
<style lang="scss">
	.sale_commodity{
		.checkpro{
			.el-dialog__header{
				padding:0;
			}
			.el-dialog__body {
				padding:20px;
			}
		}

	}
</style>