<template>
	<div class="warehouse commodity" @click="closeSearch">
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
					<el-button class="store-button2 sale_out mb-20 float-r ml-10" @click="BoxDeletePro">
						<span class="color-red">删除商品</span>
					</el-button>
					<el-button class="store-button2 sale_out mb-20 float-r ml-10" @click="BoxEdtior">
						<span>编辑商品</span>
					</el-button>
					<el-button class="store-button2 sale_out mb-20 float-r" @click="boxOnPro">
						<svg width="12" height="13">
							<use xlink:href="#xiajia" />
						</svg>
						<span>商品上架</span>
					</el-button>
				</div>
				<!--.................查看信息的内容，在组件里....................-->
				<checkProducts :checkProduct="onlyProductMess"></checkProducts>
			</div>
		</el-dialog>

		<!--.................表格主体部分....................-->
		<div class="g-content" v-if="isEdited"  v-loading="loading">
			<div class="buttons">
				<el-button class="store-button2 onCommodity mb-20" @click="onCommodity">
					<svg width="12" height="13">
						<use xlink:href="#shangjia" />
					</svg>
					<span>上架商品</span>
				</el-button>
				<el-button class="store-button2 remove mb-20" @click="deleteProduct">
					<i class="iconfont icon-shanchu f12"></i>
					<span>删除商品</span>
				</el-button>
				<search v-on:searchMthod="search" v-on:emptyMthod="emptyMthod" v-on:searchCondition="searchCondition"  ref="isShow">
					<template>
						<div class="condition">
							<span class="f12 color-3">商品价格:</span>
							<input type="number" v-model.number="searchMess.minPrice" /> 到 
							<input type="number" v-model.number="searchMess.maxPrice" />
						</div>
						<div class="condition">
							<span class="f12 color-3">商品库存:</span>
							<input type="number" v-model.number="searchMess.minInventory" /> 到 
							<input type="number" v-model.number="searchMess.maxInventory" />
						</div>
						<div class="condition">
							<span class="f12 color-3">商品销量:</span>
							<input type="number" v-model.number="searchMess.minSale"/> 到
							<input type="number" v-model.number="searchMess.maxSale" />
						</div>
						<div class="condition">
							<span class="f12 color-3">发布时间:</span>
							<el-date-picker v-model="searchMess.minPubTime" type="date" placeholder="选择日期" :editable="false"> 
							</el-date-picker> 到
							<el-date-picker v-model="searchMess.maxPubTime" type="date" placeholder="选择日期" :editable="false">
								
							</el-date-picker>
						</div>
						<div class="condition">
							<span class="f12 color-3">下架时间:</span>
							<el-date-picker v-model="searchMess.minOffTime" type="date" placeholder="选择日期" :editable="false">
								
							</el-date-picker> 到
							<el-date-picker v-model="searchMess.maxOffTime" type="date" placeholder="选择日期" :editable="false"> 
							</el-date-picker>
						</div>
						<div class="classify ">
							<span class="f12 color-3">店铺中分类:</span>
							<el-select v-model="searchMess.classifyId" filterable placeholder="请选择">
								<el-option v-for="(item,index) in storeClassify" :key="index" :value="item.id" :label="item.shop_category_name" :class="item.level===1?'color':''"> </el-option>
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
				<el-table-column prop="product_name" label="商品名称" width="305">
					<template slot-scope="props">
						<div class="product_name" @click="checkProduct(props.$index)">{{props.row.product_name}}</div>
					</template>
				</el-table-column>
				<el-table-column prop="product_price_yuan.min" label="价格" sortable="custom" width="120">
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
				<el-table-column prop="created_at" label="创建时间" sortable="custom" width="152"></el-table-column>
				<el-table-column prop="onoff_time" label="下架时间" sortable="custom" width="152"></el-table-column>
				<el-table-column prop="time" label="操作" width="116">
					<template slot-scope="scope">
						<el-button type="text" size="small" class="btn-delete" @click="editDoods(scope.$index)">
							编辑商品
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination v-show="total" @current-change="handleCurrentChange" :current-page.sync="shopMess.page" :page-size="shopMess.per_page" 
				layout="total, prev, pager, next" :total="total" class="mt-20">
				
			</el-pagination>
		</div>
		<!--.................编辑商品部分....................-->
		<productMess v-if="editPro" :ediorMess="onlyProductMess" @seePro="seePro" @empty="empty" 
			@closeEditor="closeEditor" :title="title">			
		</productMess>
	</div>
	</div>
</template>

<script>
	import Navbar from "@/components/commodity/Navbar"
	import search from '@/components/commodity/search'
	import storeClassify from '@/utils/storeClassify'
	import commodityMethod from '@/utils/commodity'
	import productMess from "@/components/commodity/productMess"
	import checkProducts from "@/components/commodity/checkProducts"
	import { onoffBatch, checkProduct, deleteBatch,getShippingTem } from "@/api/commodity"
	import onOffProd from "@/utils/onOffPro"
	export default {
		name: "warehouse",
		data() {
			return {
				total: parseInt(""),
				list: [],
				isEdited: true,
				dialogVisible: false,
				index: 0,
				emptyText: "仓库中未发现商品记录",
				changeList: {
					"products": [],
					"status": "on"
				},
				searchMess:{
					classifyId: "",
					minPrice: "",
					maxPrice: "",
					minInventory: "",
					maxInventory: "",
					minPubTime: "",
					maxPubTime: "",
					minOffTime: "",
					maxOffTime: "",
					minSale:"",
					maxSale:"",
				},
				shopMess: {
					mall_id: "",
					shop_id: "",
					per_page: 20,
					page: 1,
					search: {}
				},
				categoryList: {},
				onlyProductMess: {},
				editPro: false,
				product_name:"",
				
				searchCon:{},
				isEmptyError:false,
				deleteAttrApi:["product_price_yuan","product_store","sell_num","publish_time","shop_category_id","onoff_time"],
				isRturn:{
					status: "off",
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
				status: "off",
				sellout_status:"all"
			});
			this.searchMethods();
		},
		components: {
			Navbar,
			search,
			checkProducts,
			productMess
		},
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
				this.timeMenthods("minPubTime","maxPubTime","publish_time","最小时间小于最大时间");
				this.timeMenthods("minOffTime","maxOffTime","onoff_time","最小时间小于最大时间");
				if(this.isEmptyError) {
					return;
				};			
				this.shopMess.search=Object.assign({},this.shopMess.search,this.searchCon);
				//清空排序样式
				if(JSON.stringify(this.order)!=="{}"){
					this.order.column.prop="";				
					this.order.column.order="";
				};
				this.emptyText = "未搜索到相关商品"				
				this.searchMethods()
			},			
			//清空条件
			emptyMthod() { 
				let arr =["classifyId","minPrice","maxPrice","minInventory","maxInventory","minPubTime",
						"maxPubTime","minOffTime","maxOffTime","minSale","maxSale"];
				this.clear(arr,this.searchMess);			
				//清除传给Api的条件	
				if(this.shopMess.search!==undefined){
					this.deleteAttrApi.map(item =>{
						if(this.shopMess.search[item]!==undefined){
							return delete this.shopMess.search[item]
						};
					})
				}
				delete this.searchCon.shop_category_id;
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
			handleSelectionChange(list) { //选中
				let arr = [];
				for(let val of list) {
					arr.push({product_id: val.id})					
				}
				this.$set(this.changeList, "products", arr);
			},
			onCommodity() { //上架
				if(this.changeList.products.length == 0) {
					return;
				}
				this.onProduct(this.changeList);
			},
			boxOnPro() { //弹出框的商品上架
				var OnPro = {
					products: [{
						product_id: this.onlyProductMess.id
					}],
					status: "on"
				}
				this.onProduct(OnPro);
			},
			//删除商品
			deleteProduct() {
				if(this.changeList.products.length == 0) {
					this.$message({showClose: true,message: '请选择要删除的商品',type: 'info'});					
					return;
				}
				var list = {
					"products": []
				};
				list.products = this.changeList.products;
				this.deletePro(list)
			},
			//弹出框的删除商品
			BoxDeletePro() {
				var deletePro = {
					products: [{
						product_id: this.onlyProductMess.id
					}],
				}
				this.deletePro(deletePro)
			},
			checkProduct(index) {
				//调用查看商品API
				this.checkPro(index)
			},
			//编辑商品
			editDoods(data) {
				this.isEdited = false;
				this.editPro = true;
				//获取商品需要查询的ID
				let product_id = this.categoryList.data[data].id
				let {getShop_id:shop_id,getMall_id:mall_id} = this.$store.getters;
				let data_filter_before = {};
				this.seeProduct(product_id).then((res)=>{
                    data_filter_before = res;
				    return getShippingTem({shop_id,mall_id})
				})
				.then(({data})=>{
				    for(let item of data_filter_before.distributes){
                        if(item.shipping_set_type == 'template'){
                            let item_find = data.find(({distribute_template_id})=>distribute_template_id==item.distribute_template_id)||{};
                            let {add_num, add_price_yuan, distribute_template_id, first_num, first_price_yuan, template_name, distribute_unit} = item;
                            let {add_num:add_num_n, add_price_yuan:add_price_yuan_n, first_num:first_num_n, first_price_yuan:first_price_yuan_n,  distribute_unit:distribute_unit_n} = item_find;
                            if(Object.keys(item_find).length==0||add_num!==add_num_n||add_price_yuan!==add_price_yuan_n|| first_num!==first_num_n|| first_price_yuan!==first_price_yuan_n||  distribute_unit!==distribute_unit_n){
                                item.shipping_set_type = 'define';
                                delete item.distribute_template_id
                            }
                        }
					}
                    this.onlyProductMess = data_filter_before;
				})
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
			//子集传过来的数据（productMess）
			seePro(data) {
				this.editPro = data;
				this.isEdited = !data;
				//编辑商品的方法(混合选项)
				this.searchMethods();
			},
			//子集传过来的数据（productMess）
			empty(data) {
				this.emptyText = data;
			}
		}
	}
</script>

<style lang="scss">
	.warehouse {
		.checkpro{
			.el-dialog__header{
				padding:0;
			}
			.el-dialog__body{
				padding:20px;
			}
		}
		.remove {
			span {
				color: #B4282D;
			}
			&:hover {
				background: #B4282D;
				border-color: #B4282D;
				span {
					color: #FFFFFF;
				}
			}
			&:active {
				background: #821D20;
				border-color: #821D20;
				span {
					color: #FFFFFF;
				}
			}
		}
		.onCommodity svg {
			vertical-align: baseline;
		}
	}
</style>
