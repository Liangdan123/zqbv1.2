<template>
	<div class="category commodity" @click="closeSearch">
		<Navbar></Navbar>
		<svg width="30" height="30" class="next" @click="nextProduct">
			<use xlink:href="#right" v-if="dialogVisible&&index!=categoryList.data.length-1" />
		</svg>
		<svg width="30" height="30" class="prev" @click="prevProduct">
			<use xlink:href="#left" v-if="dialogVisible&&index!=0" />
		</svg>
		<!--.................查看商品详情....................-->
		<el-dialog :visible.sync="dialogVisible" size="small" :close-on-click-modal="false" custom-class="checkBox" :show-close="false" class="check">
			<svg width="26" height="26" class="closebox" @click="dialogVisible = false">
				<use xlink:href="#close" />
			</svg>
			<!--.................主体内容....................-->
			<div class="commodityMess" style="padding-top: 0;">
				<!--.................标题....................-->
				<div class="clearfix mb-20">
					<p class="float-l f18 font-b color-3">商品信息</p>
				</div>
				<!--.................查看信息的内容，在组件里....................-->
				<checkProducts :checkProduct="onlyProductMess"></checkProducts>
			</div>
		</el-dialog>
		<!--.................编辑和添加分类弹框....................-->
		<el-dialog :visible.sync="categoryDialog" :title="dialogTitle" size="tiny" custom-class="categoryDialog" :close-on-click-modal="false">						
			<el-tabs v-model="activeName">
				<el-tab-pane label="商城分类" name="mall">
					<mallClassifyVue @onlyMallCategorys="onlyMallCategorys"  :Classify="mallClassify" >
						<div v-show="false">{{new Date().getTime()}}</div>
					</mallClassifyVue>
				</el-tab-pane>
				<el-tab-pane label="店铺分类" name="store">
					<productClassify @categorys="categorys" :type="classifyType" :checkStyle="false" :Classify="storeClassify" :classfyId="classifyName">
						<div class="categorylabel" slot="header">
							<!--................选中的分类信息..............-->
							<span class="label_item" v-for="(item,index) in classifyName">
				        		<b class="label_name">{{item.name}}</b>
				        		<svg width="12" height="12" @click="deleteCategorys(index,classifyName,'shop')" class="btn_delete">
				        			<use xlink:href="#delete"/>
				        		</svg>
		        			</span>
						</div>
					</productClassify>
				</el-tab-pane>
			</el-tabs>
			<span slot="footer" class="dialog-footer">
		       <el-button type="primary" @click="setProduct">保存</el-button>
		       <el-button @click="categoryDialog = false">取消</el-button>
    		</span>
		</el-dialog>
		<div class="g-content" v-if="!isEdited">
			<div class="buttons">
				<el-button class="store-button2  mb-20" @click="batchCategory">
					<i class="iconfont icon-fenlei f12"></i>
					<span>批量分类</span>
				</el-button>
				<!--.........................搜索条件...................-->
				<search v-on:searchMthod="search" v-on:emptyMthod="empty" v-on:searchCondition="searchCondition"  ref="isShow">
					<template>
						<div class="condition clearfix">
							<span class="f12 color-3 float-l">商品类型:</span>
							<div class=" float-l">
						        <label class="display-b store_label" v-for="(item,index) in shopType" :key="index" @change="classification(item,index)">
						        	<input type="radio" name="classified"  class="display-n" :checked="shopType[index].value">
						        	<em></em>{{item.name}}
						        </label>
							</div>
						</div>
						<div class="condition">
							<span class="f12 color-3">商品价格:</span>
							<input type="number" v-model.number="searchMess.minPrice" /> 到 <input type="number" v-model.number="searchMess.maxPrice" />
						</div>
						<div class="condition">
							<span class="f12 color-3">创建时间:</span>
							<el-date-picker v-model="searchMess.minPubTime" type="date" placeholder="选择日期" :editable="false"> </el-date-picker> 到
							<el-date-picker v-model="searchMess.maxPubTime" type="date" placeholder="选择日期" :editable="false"> </el-date-picker>
						</div>						
						<div class="classify">
							<span class="f12 color-3">商城分类:</span>
							<el-select v-model="searchMess.mallClassifyId" filterable placeholder="请选择" >
								<el-option v-for="(item,index) in mallClassify" :key="index" :value="item.id" :label="item.mall_category_name" :class="item.level===1?'color':''"> </el-option>
							</el-select>
						</div>						
						<div class="classify ">
							<span class="f12 color-3">店铺分类:</span>
							<el-select v-model="searchMess.classifyId" filterable placeholder="请选择" >
								<el-option v-for="(item,index) in storeClassify" :key="index" :value="item.id" :label="item.shop_category_name" :class="item.level===1?'color':''"> </el-option>
							</el-select>
						</div>
						<div class="classify ">
							<span class="f12 color-3">商品状态:</span>
							<el-select v-model="searchMess.statused" filterable placeholder="请选择">
								<el-option v-for="(item,index) in statusList" :key="index" :value="item.status" :label="item.value"> </el-option>
							</el-select>
						</div>
					</template>
				</search>
			</div>
			
			<el-table :data="categoryList.data" style="width: 100%" @selection-change="handleSelectionChange" :empty-text="emptyText"
				 @sort-change="sortChange"   v-loading="loading">
				<el-table-column type="selection" width="40"> </el-table-column>
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
				<el-table-column prop="product_price_yuan.min" label="价格" sortable="custom" width="140">
					<template slot-scope="props">
						<span v-if="props.row.product_price_yuan.min==props.row.product_price_yuan.max " class="product_price">
					         {{props.row.product_price_yuan.min}}
					    </span>
						<span v-else class="product_price">
					        {{props.row.product_price_yuan.min}} - {{props.row.product_price_yuan.max}}
					   </span>
					</template>
				</el-table-column>
				<el-table-column prop="shop_categorys" label="商城分类" width="110">
					<template slot-scope="scope">
						<div v-if='scope.row.mall_categorys.length>0'>
							<p>{{scope.row.mall_categorys[0].mall_category_name}}</p>
						</div>
					</template>
				</el-table-column>
				
				<el-table-column prop="shop_categorys" label="店铺分类" width="110">
					<template slot-scope="scope">
						<div v-if='scope.row.shop_categorys.length>0'>
							<p>{{scope.row.shop_categorys[0].shop_category_name}}</p>
							<div v-if='scope.row.shop_categorys.length>1'>
								<p class="toggle" @click="toggleShow(scope.$index)">更多分类 <img src="../../assets/image/xiala.png" width="10" height="10"></p>
								<ul :class="{categoryBox:showIndex===scope.$index} ">
									<li v-if="index>0" v-for="(value,index) in scope.row.shop_categorys">{{value.shop_category_name}}</li>
								</ul>
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="created_at" label="创建时间" sortable="custom" width="152"></el-table-column>
				<el-table-column prop="status" label="状态" width="152">
					<template slot-scope="scope">
						<span v-if='scope.row.status=="on"'>出售中</span>
						<span v-else class="color-7F">仓库中</span>
					</template>
				</el-table-column>
				<el-table-column prop="shop_categorys" label="操作" width="116">
					<template slot-scope="scope">
						<el-button type="text" size="small" v-if='scope.row.shop_categorys.length>0||scope.row.mall_categorys.length>0' @click="editCategorys(scope.row)">
							编辑分类
						</el-button>
						<el-button type="text" size="small" v-if='scope.row.shop_categorys.length<=0&&scope.row.mall_categorys.length<=0' @click="editCategorys(scope.row)">
							添加分类
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination v-show="total" @current-change="handleCurrentChange" :current-page.sync="shopMess.page" :page-size="shopMess.per_page" layout="total, prev, pager, next" 
				:total="total" class="mt-20">
				
			</el-pagination>
		</div>
		<div v-else>
		</div>
	</div>
	</div>
</template>

<script>
	import Navbar from "@/components/commodity/Navbar"
	import search from '@/components/commodity/search'
	import storeClassify from '@/utils/storeClassify'
	import commodityMethod from '@/utils/commodity'
	import productClassify from '@/components/myStore/productClassify'
	import mallClassifyVue from '@/components/mallSet/mallClassify'
	import checkProducts from "@/components/commodity/checkProducts"
	import onOffProd from "@/utils/onOffPro"
	import {checkProduct,SaveShopClassifyList,setProductsCategory,setOnlyProductsCategory,setMallClassify,setMallClassifyBatch} from "@/api/commodity"
	import {getMallClassifyList,getClassifyList} from "@/api/commodity"
	export default {
		name: "category",
		data() {
			return {
				shopType:[
					{
						name:"全部商品",
						value:true
					},
					{
						name:"未分类商品",
						value:false
					},
					{
						name:"已分类商品",
						value:false
					},
				],
				classifyType: "多选",
				classifyName: [],
				mallclassifyName:{},
				showIndex: "",
				total: parseInt(""),
				list: [],
				statusList: [{
					"status": "on",
					"value": "出售中"
				}, {
					"status": "off",
					"value": "仓库中"
				}],
				isEdited: false,
				dialogVisible: false,
				categoryDialog: false,
				dialogTitle: "添加分类",
				index: 0,
				emptyText: "仓库中未发现商品记录",
				changeList: {
					products: [],
					shop_categorys: []
				},
				changeProduct: {
					product_id: "",
					shop_categorys: []
				},
				mallProduct:{
					product_id:"",
					mall_categorys:[]
				},
				mallBatchClassify:{
					products:[],
					mall_categorys:[]
				},
				searchMess:{
					classifyId: "",
					statused: "on",
					minPrice: "",
					maxPrice: "",
					minPubTime: "",
					maxPubTime: "",
					mallClassifyId:""
				},
				shopMess: {
					mall_id: "",
					shop_id: "",
					per_page: 20,
					page: 1,
					search: {
						status:"on"
					}
				},
				categoryList: {},
				onlyProductMess: {},				
				searchCon:{},
				deleteAttrApi:["product_price_yuan","shop_category_id","publish_time","status"],
				isEmptyError:false,
				isRturn:{},
				order:{},
				activeName:"mall",
				loading:true,
				mallClassifyList:[],
				classifyList:[],
			}
		},
		mixins: [storeClassify, commodityMethod,onOffProd],
		created() {
			//我的店铺商品数据
			this.searchMethods();			
			let mall_id = this.$store.getters.getMall_id;
			let shop_id = this.$store.getters.getShop_id;
			this.$set(this.shopMess, "mall_id", mall_id);
			this.$set(this.shopMess, "shop_id", shop_id);
			getMallClassifyList()//商城分类列表
			.then(({data})=>{
				this.mallClassifyList=data;					
			}).catch((error)=>{
			})
			getClassifyList(shop_id)//商家分类列表
			.then(({data})=>{
				this.classifyList=data;
			}).catch((error)=>{
			})
		},
		components: {
			Navbar,search,productClassify,checkProducts	,mallClassifyVue		
		},
		methods: {
			//商品类型搜索
			classification(data,index){
				this.shopType.map(item=>item.value=false);//先是全部不选中				
				switch(true){
					case data.name==="全部商品":
						if(this.searchCon.has_shop_category!==undefined){
							delete this.searchCon.has_shop_category;
							if(this.shopMess.search.has_shop_category!==undefined){//删除商品分类的搜索条件
								delete this.shopMess.search.has_shop_category;
							}
						};
						break;
					case data.name==="未分类商品":
						this.searchCon.has_shop_category=1;
						break;
					case data.name==="已分类商品":
						this.searchCon.has_shop_category=2;
						break;
				};
				this.shopType[index].value=true;//事先那个被选中
			},
			closeSearch(){
				this.$refs.isShow.closeSearch()
			},
			initStoreClassify(data) { //初始化数据
				for(let vals of this[data]){
					vals.checked = false;
				}
			},
			isChecked(data,types){
				//传到子集时判断是否事先被选中
				for(let val of this[types]){
					if(data.includes(val.id)){
						val.checked=true
					}
				}
			},
			isMallChecked(data){//如果事先有分类被选中就显示选中
				for(let val of this.mallClassify){
					if(val.id===data.mall_category_id){
						val.checked=true;
						this.$set(this.mallProduct.mall_categorys,0,{mall_category_id:val.id});//如果有相等的值，把数据赋值然后传给后台（没点击的时候）
					}
				}
			},
			//点击编辑、添加分类
			editCategorys(product) {	
				this.categoryDialog = true;//弹框出现
				this.$set(this.mallProduct,"product_id",product.id);//商城分类设置				
				this.$set(this.changeProduct, "product_id", product.id);			
				this.initStoreClassify("storeClassify");//初始化都没有被选中
				this.initStoreClassify("mallClassify");//初始化都没有被选中
				this.dialogTitle = "添加分类";	
				
				if(product.shop_categorys.length!=0){//店铺分类(编辑分类)
					this.dialogTitle = "编辑分类"
					this.classifyName = [];
				    if (this.storeClassify != 0) {
				      for (let key in product.shop_categorys) {		      
				        if (product.shop_categorys[key].is_final != 0 && product.shop_categorys[key].level != 1) {
				          let index = "";
				          for (let i = 0; i < this.storeClassify.length; i++) {
				            if (this.storeClassify[i].id == product.shop_categorys[key].shop_category_id) {
				              this.storeClassify[i].checked = true;
				              index = i;
				            }
				          }
						this.classifyName.push({
				            id: product.shop_categorys[key].shop_category_id,
				            index: index,
				            name: product.shop_categorys[key].shop_category_name
				          })
				        }
				      }
				    };    
					//传到子集时要被选中
					var filters=this.classifyName.map(item=>item.id);
					//事先选中的状态
					this.isChecked(filters,"storeClassify")//判断商城分类是否事先选中
				}else{//添加分类
					this.classifyName = [];
				}
				if(product.mall_categorys.length!=0){//商城分类
					this.dialogTitle = "编辑分类";
					if(this.mallClassify.length != 0){
						this.isMallChecked(product.mall_categorys[0])
					}
				}

			},						
			//批量分类按钮
			batchCategory() {
				if(this.changeList.products.length == 0) {
					this.$message("请选择批量分类的商品")
					return;
				};
				this.categoryDialog = true;
				this.dialogTitle = "批量分类"
				this.classifyName = [];
				this.initStoreClassify("storeClassify");//初始化都没有被选中
				this.initStoreClassify("mallClassify");//初始化都没有被选中
				this.mallProduct.mall_categorys=[];//点击批量分类时把分类中的数据清空
				this.mallBatchClassify.mall_categorys=[];//点击批量分类时把分类中的数据清空
			},
			deleteCategorys(index, arr,strings) { //删除分类				
				if(strings==="mall"){
					this.deleteMallStore(index, arr,"mallClassify")
				}else if(strings==="shop"){
					this.deleteMallStore(index, arr,"storeClassify")
				};
			},
			deleteMallStore(index,arr,Classify){ //删除分类的方法
				if(this[Classify].length != 0) {
					let data = this[Classify][arr[index].index];
					data.checked = false;
					this.$set(this[Classify], arr[index].index, data);
				};
				arr.splice(index, 1);
			},
			categorys(data) {
				this.classifyName = data;
			},
			onlyMallCategorys(data){
				this.$set(this.mallProduct.mall_categorys,0,data);
				this.$set(this.mallBatchClassify.mall_categorys,0,data)
			},
			toggleShow(index) {
				if(index === this.showIndex) {
					this.showIndex = ""
				} else {
					this.showIndex = index;
				}
			},
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
				this.searchMethods();
			},
											
			search() { //筛选商品
				this.switchShow = false;
				this.NumberMenthods("maxPrice","minPrice","product_price_yuan","最高价格小于最低价格");
				if(this.searchMess.classifyId != "") {
					this.searchCon.shop_category_id = this.searchMess.classifyId;
				};
				if(this.searchMess.mallClassifyId != ""){
					this.searchCon.mall_category_id = this.searchMess.mallClassifyId;
				};
				this.timeMenthods("minPubTime","maxPubTime","publish_time","最小时间小于最大时间");
				if(this.searchMess.statused != "") {
					this.searchCon.status = this.searchMess.statused;
				};
				if(this.isEmptyError) {
					return;
				};				
				this.shopMess.search=Object.assign({},this.shopMess.search,this.searchCon);								
				this.emptyText = "未搜索到相关商品";
				//清空排序样式
				if(JSON.stringify(this.order)!=="{}"){
					this.order.column.prop="";				
					this.order.column.order="";
				};
				this.searchMethods()
			},												
			empty() { //清空
				let arr=["classifyId","statused","minPrice","maxPrice","minPubTime","maxPubTime","mallClassifyId"];
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
				delete this.searchCon.has_shop_category;
				this.searchCon.status="all";
				this.$set(this.shopMess,"search",{status:"all"})
				//清空排序样式
				if(JSON.stringify(this.order)!=="{}"){
					this.order.column.prop="";				
					this.order.column.order="";
				};
				//清空然后掉接口重新拉取列表
				this.searchMethods()
			},
			handleSelectionChange(list) { //选中
				let arr = [];
				for(let val of list) {
					arr.push({product_id: val.id})					
				};
				
				this.$set(this.changeList, "products", arr);//店铺分类
				this.$set(this.mallBatchClassify,"products",arr);//商城分类
			},
			checkProduct(index) {
				this.index = index;
				let list = this.categoryList.data; 
				let product_id = list[index].id;
				checkProduct(product_id)
					.then(({data}) => {				
						if(this.dialogVisible == false) {
							this.dialogVisible = true;
						};
						this.onlyProductMess = data;
					})
					.catch(({response: {data}})=>{
						 this.$message.error(data.errorcmt);
					})	
			},
			nextProduct() {
				if(this.index < this.categoryList.data.length - 1) {
					this.index++;
					this.checkProduct(this.index)
				};
			},
			prevProduct() {
				if(this.index > 0) {
					this.index--;
					this.checkProduct(this.index)
				};
			},
			//分类中的保存
			setProduct() {					
				//编辑、添加分类中的保存按钮
				if(this.activeName==="mall"){//商城分类
					if(this.mallClassify.length===0){
						this.categoryDialog = false;
						return;
					}//当没有商城分类时下面不执行
					if(this.mallProduct.mall_categorys.length == 0){
						this.$message("请选择分类")
						return;
					};
					if(this.dialogTitle == "编辑分类"){	
						this.MallClassify(this.mallProduct);//商城分类API接口							

					};
					if(this.dialogTitle == "批量分类"){
						this.batchMallClassify(this.mallBatchClassify)//批量商城分类API接口	
					}
		
				}else if(this.activeName==="store"){//店铺分类
					if(this.storeClassify.length===0){
						this.categoryDialog = false;
						return;
					}//当没有店铺分类时下面不执行
					if(this.classifyName.length == 0) {
						this.$message("请选择分类")
						return;
					}
					let idArr = [];
					for(let val of this.classifyName) {
						idArr.push({
							shop_category_id: val.id
						})
					};		
					this.$set(this.changeList, "shop_categorys", idArr);
					this.$set(this.changeProduct, "shop_categorys", idArr);
					//批量分类中的按钮
					if(this.dialogTitle == "批量分类") {	
						this.productsCategory(this.changeList)//店铺分类API接口		
						return;
					}
					this.onlyProductsCategory(this.changeProduct);//批量店铺分类API接口	
				}
			},
			//设置商城分类
			MallClassify(data){
				setMallClassify(data)
				.then(({data}) => {	
					this.categoryDialog = false;
					this.hints("商城分类设置成功","success")
					this.searchMethods();
				}).catch(({response: {data}})=>{
					 this.$message.error(data.errorcmt);
				})					
			},
			//店铺批量分类
			productsCategory(data){
				setProductsCategory(data)
				.then(({data}) => {	
					this.categoryDialog = false;
					this.hints("店铺批量分类设置成功","success")
					this.searchMethods();			
				}).catch(({response: {data}})=>{
					 this.$message.error(data.errorcmt);
				})	
			},

			//设置店铺分类
			onlyProductsCategory(data){
				setOnlyProductsCategory(data)
				.then(({data}) => {	
					this.hints("店铺分类设置成功","success")
					this.categoryDialog = false;
					this.searchMethods();			
				}).catch(({response: {data}})=>{
					 this.$message.error(data.errorcmt);
				})	
			},
			//批量商城分类
			batchMallClassify(data){
				setMallClassifyBatch(data)
				.then(({data}) => {	
					this.hints("批量商城分类设置成功","success")
					this.categoryDialog = false;
					this.searchMethods();			
				}).catch(({response: {data}})=>{
					 this.$message.error(data.errorcmt);
				})	
			},
			hints(data,types){
				this.$message({
		        	message: data,
		        	type: types
		        });
			},
			
		}
	}
</script>

<style lang="scss">
	.category {
		.Classify {
			min-height: 300px!important;
		}
		.el-table{
			overflow:visible;
			.el-table__body-wrapper{
				overflow: inherit;
			}
		}
		.btn_delete {
			margin-left: 10px;
			cursor: pointer;
		}
		.toggle {
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
		.check {
			.el-dialog__header{
				padding:0;
			}
		}

		.el-dialog__body {
			padding:20px;
			.Classify {
				border-bottom: 1px solid #E9EEF2;
			}
		}
	}
</style>


