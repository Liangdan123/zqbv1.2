<template>
	<div class="storeLink commodity" @click="closeSearch">
		<search v-on:searchMthod="search" v-on:emptyMthod="empty" v-on:searchCondition="searchCondition" ref="isShow">
			<template>
				<div class="condition">
					<span class="f12 color-3">商品价格:</span>
					<input type="number" v-model.number="searchMess.minPrice" /> 到 <input type="number" v-model.number="searchMess.maxPrice" />
				</div>
				<div class="classify ">
					<span class="f12 color-3">{{$route.path==='/mallZxh/mallSetInfo/mallDecoration'?'商城中分类':'店铺中分类:'}}</span>
					<el-select v-model="searchMess.classifyId" filterable placeholder="请选择">
						<!--...................我的店铺.......................-->
						<div v-if="$route.path==='/zxh/my_store_blank/shop_decoration'">
							<el-option v-for="(item,index) in storeClassify" :key="index" :value="item.id" :label="item.shop_category_name" :class="item.level===1?'color':''"></el-option>
						</div>
						<!--.....................商城..............-->
						<div v-if="$route.path==='/mallZxh/mallSetInfo/mallDecoration'">
							<el-option v-for="(item,index) in mallClassify" :key="index" :value="item.id" :label="item.mall_category_name" :class="item.level===1?'color':''"></el-option>
						</div>-
					</el-select>
				</div>
			</template>
		</search>
		<div class="store_list">
			<div v-if="this.list.length!=0">
				<label class="display-b store_label" v-for="(item,index) in list" :key="index" @click="checkedIndex(index)">
					<input type="radio" name="one" :checked="isChecked[index]"/>
					<em></em>
					<b v-if="item.images.length">
						<img :src="item.images[0].image_url"/>
					</b>
					
					<span :class="{ml:item.images.length===0}">{{item.product_name}}</span>
					<b v-if="item.product_price_yuan.min==item.product_price_yuan.max" class="">														
						{{item.product_price_yuan.min}}
					</b>
					<b v-else>{{item.product_price_yuan.min}} - {{item.product_price_yuan.max}}</b>
			</label>
			</div>
			<div v-if="this.list.length===0&&isSearchEmpty===false" class="color-6 f18" style="text-align: center;line-height: 380px;">
				未发布任何商品
			</div>
			<div v-if="this.list.length===0&&isSearchEmpty===true" class="color-6 f18" style="text-align: center;line-height: 380px;">
				未搜索到任何相关商品
			</div>
		</div>
		<div class="pagination clearfix">
			<div class="pagination-l clearfix float-l">
				<el-pagination background layout="total, prev, pager, next" :total=total :page-size=perPage @current-change="handleCurrentChange" 
					:current-page.sync="shopMess.page" class="float-l">
				</el-pagination>
			</div>
			<div class="pagination-r clearfix float-r">
				<el-button class="store-button2 float-r" @click="cancleShop">取消</el-button>
				<el-button class="store-button1 float-r mr-10" @click="sureShop">确定</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import {getProductList} from "@/api/servicer"	
	import search from "@/components/func/search"
	import commodityMethod from '@/utils/commodity'
	import storeClassify from '@/utils/storeClassify'
	import {getMallClassifyList,getClassifyList} from "@/api/platform"
	export default {
		data() {
			return {
				total: parseInt(""),
				perPage: parseInt(""),
				list: [],
				searchMess: {
					classifyId: "",
					minPrice: "",
					maxPrice: "",
				},
				shopMess: {
					mall_id: "",
					per_page: 10,
					page: 1
				},
				switchShow: false,
				searchValue: "",
				listShow: true,
				produce_name: "",
				banner_click_id: "",
				deleteAttrApi: [],
				searchCon: {},
				isSearchEmpty:false,
				banner_url:"",
				onlyProduct:{},//单个商品链接
				mallClassifyList:[],
				classifyList:[],
			}
		},
		props:["productChecked"],
		created() {
			//我的店铺商品数据
			let mall_id = this.$store.getters.getMall_id;
			this.$set(this.shopMess, "mall_id", mall_id);
			let shop_id = this.$store.getters.getShop_id;
			if(this.$route.fullPath==='/zxh/my_store_blank/shop_decoration'){//店铺设置中才需要传shop_id,商城不需要				
				this.$set(this.shopMess, "shop_id", shop_id);
				this.deleteAttrApi= ["product_price_yuan","shop_category_id"]
			};													
			if(this.$route.fullPath==='/mallZxh/mallSetInfo/mallDecoration'){//商城
				this.deleteAttrApi= ["product_price_yuan","mall_category_id"]
			};
			this.productList(this.shopMess);
			let status=this.$store.getters.getType
			if(status === 1){
				getMallClassifyList()//商城分类列表
				.then(({data})=>{
					this.mallClassifyList=data;					
				}).catch((error)=>{
				})
			}
			if(status === 2){
				getClassifyList(shop_id)//商家分类列表
				.then(({data})=>{
					this.classifyList=data;
				}).catch((error)=>{
				})	
			}
		},
		mixins: [storeClassify, commodityMethod],
		components: {
			search
		},
		computed:{
			isChecked(){	
				return	this.list.map(item=>{
					if(item.id===this.productChecked.id){
						return true
					}else{
						return false
					}
				})
			},
		},
		methods: {
			search() {//搜索										
				this.switchShow = false;
				this.ProductMenthods("maxPrice", "minPrice", "product_price_yuan", "最高价格小于最低价格");					
				if(this.searchMess.classifyId !== "") {
					if(this.$route.fullPath==='/zxh/my_store_blank/shop_decoration'){//我的店铺
						this.searchCon.shop_category_id = this.searchMess.classifyId;
					}else if(this.$route.fullPath==='/mallZxh/mallSetInfo/mallDecoration'){//商城
						this.searchCon.mall_category_id = this.searchMess.classifyId;
					}
					
				};							
				this.isSearchEmpty=true;	
				this.shopMess.search=Object.assign({},this.shopMess.search,this.searchCon);//不要用this.$set因为不会把原来的数据合并	
				this.searchMethods();
			},
			ProductMenthods(maxNum, minNum, val, data) {
				var max =this.searchMess[maxNum];
				var min =this.searchMess[minNum];
				if(max !=="" && min !=="") {					
					if(min > max) {
						this.$message.error(data);
						this.isEmptyError = true
					} else {
						this.searchCon[val] = {
							"max": max,
							"min": min
						}
					}
				};
				if(max=== "" && min !==""){
					this.searchCon[val] = {
							"min": min,
					}
				};
				if(max!== "" && min===""){
					this.searchCon[val] = {
							"max": max,
					}
				};
			},
			empty() {
				//调用批量删除清空的方法
				var attr=["classifyId","minPrice","maxPrice"];	
				this.clear(attr, this.searchMess);
				//清除传给Api的条件		
				if(this.shopMess.search!==undefined){
					this.deleteAttrApi.map(item => {
						if(this.shopMess.search[item] !== undefined) {					
							return delete this.shopMess.search[item]
						};
					});
				};
				if(this.$route.fullPath==='/zxh/my_store_blank/shop_decoration'){//我的店铺
					delete this.searchCon.shop_category_id;
				}else if(this.$route.fullPath==='/mallZxh/mallSetInfo/mallDecoration'){//商城
					delete this.searchCon.mall_category_id;
				};				
				delete this.searchCon.product_price_yuan;
				this.isSearchEmpty=false;
				this.searchMethods(); //清空属性重新掉接口
			},
			searchCondition(val) {//input框搜索
				if(val!==undefined){
					this.shopMess.search=Object.assign({},this.shopMess.search,val);	
				}else{
					delete this.shopMess.search.product_name;
				}
				this.isSearchEmpty=true;
				//页面改变时调用接口，页面不变手动调接口
				this.searchMethods();
			},
			//关闭弹窗
			closeSearch() {
				this.$refs.isShow.closeSearch();
			},
			sureShop() {//确定
				this.isSearchEmpty=false;
				this.$emit("shop_hidden", false);
				if(this.$route.fullPath==='/zxh/my_store_blank/shop_decoration'){//我的店铺
					var productCnt = {banner_click_type: "product",banner_click_name: this.produce_name,banner_click_id: this.banner_click_id};																							
				}else if(this.$route.fullPath==='/mallZxh/mallSetInfo/mallDecoration'){//商城
					var productCnt = {click_type:"product",click_name:this.produce_name,click_id:this.banner_click_id,click_image:this.banner_url};			
				}
				if(this.produce_name) {
					this.$emit("productName", productCnt);
					this.$emit("onlyProduct",this.onlyProduct)
				}
			},
			cancleShop() {
				this.isSearchEmpty=false;
				this.$emit("shop_hidden", false);
			},
			checkedIndex(index) {
				this.banner_click_id = this.list[index].id;
				this.produce_name = this.list[index].product_name;
				this.banner_url=this.list[index].images[0].image_url;//商品图片链接
				this.onlyProduct=this.list[index];//整个商品信息传过去
			}
		}
	}
</script>

<style scoped>
	.commodity {
		margin-top: 0;
	}
	
	.storeLink_nav {
		background-color: #F0F4F7;
		padding-top: 5px;
		padding-bottom: 5px;
		padding-right: 20px;
		height: 32px;
	}
	
	.storeLink_nav .filter {
		height: 32px;
		line-height: 32px;
		background: #FFFFFF;
		border: 1px solid #D6D6D6;
		border-radius: 2px;
		cursor: pointer;
	}
	
	.search-input input {
		width: 206px;
		padding-left: 10px;
		display: block;
		height: 100%;
		border: none;
		outline: none;
		float: left;
	}
	
	.search-input button {
		width: 44px;
		float: right;
		border-radius: 0;
		padding-left: 0;
		padding-right: 0;
	}
	
	.search-input button img {
		width: 18px;
	}
	
	.filter-vis {
		padding-left: 10px;
		padding-right: 8px;
	}
	
	.filter-switch {
		top: 40px;
		left: 0;
		background: #FFFFFF;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
		border-radius: 2px;
		padding: 20px;
	}
	
	.filter-switch .price {
		white-space: nowrap;
	}
	
	.filter-switch .price input {
		border: 1px solid #D6D6D6;
		border-radius: 2px;
		width: 72px;
		padding-left: 10px;
		height: 24px;
		transition: all 4s;
		font-size: 12px;
	}
	
	.filter-switch .price input:focus {
		border: 1px solid #0070C9;
		outline: none;
	}
	
	.filter-switch .classify span,
	.filter-switch .price span {
		display: inline-block;
		width: 64px;
		margin-right: 10px;
	}
	
	.filter-switch .classify .el-select {
		width: 189px;
	}
	
	.search-input {
		height: 32px;
		line-height: 32px;
		width: 260px;
		background: #FFFFFF;
		border: 1px solid #D6D6D6;
		border-radius: 2px;
	}
	
	.store_list {
		height: 384px;
		overflow-y: auto;
	}
	
	.store_list::-webkit-scrollbar {
		width: 0px;
	}
	
	.store_label {
		padding: 10px 20px;
		height: 50px;
		white-space: nowrap;
		position: relative;
		cursor: pointer;
	}
	
	.store_label input {
		display: none;
	}
	
	.store_label em {
		display: inline-block;
		width: 16px;
		height: 16px;
		background: #ffffff;
		border: 1px solid #D6D6D6;
		border-radius: 50%;
	}
	
	input[type="radio"]:checked+em {
		width: 10px;
		height: 10px;
		border: 4px solid #0070C9;
		border-radius: 50%;
	}
	
	.store_label img {
		height: 50px;
		width: 50px;
		overflow: hidden;
		margin-left: 20px;
		margin-right: 20px;
	}
	
	.store_label span {
		display: inline-block;
		font-family: SourceHanSansCN-Regular;
		font-size: 12px;
		color: #333333;
		width: 192px;
		margin-right: 236px;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.store_label b {
		font-size: 12px;
		color: #FF5B00;
		font-weight: normal;
	}
	
	.pagination {
		padding-top: 20px;
		padding-bottom: 20px;
		border-top: 1px solid #D6D6D6;
	}
	
	.pagination .total {
		font-family: MicrosoftYaHei;
		color: #475669;
		line-height: 28px;
		margin-right: 10px;
	}
	
	.store-button1,
	.store-button2 {
		padding-left: 24px;
		padding-right: 24px;
	}
	
	.el-select-dropdown__item {
		color: #333;
		font-size: 12px;
	}
	
	.el-select-dropdown__item.color {
		color: #7F7F7F;
	}
	
	.el-select-dropdown__item.selected {
		color: #fff;
	}
	
	.el-select-dropdown__item.selected.hover {
		color: #fff;
	}
	
	.search-select {
		text-align: right;
		margin-top: 16px;
	}
	
	.search-select .store-button1,
	.search-select .store-button2 {
		height: 24px;
		line-height: 8px;
		padding-left: 0;
		padding-right: 0;
		width: 60px;
	}
	
	.ml {
		margin-left: 95px;
	}
</style>
<style>
	.storeLink .el-pager li.active {
		background-color: #0070C9;
		border-color: #0070C9;
	}
	
	.filter-switch {
		z-index: 50;
	}
	
	.filter-switch .classify .el-select .el-input__inner {
		height: 26px;
		line-height: 26px;
		border-radius: 2px;
		font-size: 12px;
	}
	
	.filter-switch .classify .el-select .el-input__inner:focus {
		border: 1px solid #0070C9;
	}
	
	.search-select .store-button1.el-button span,
	.search-select .store-button2.el-button span {
		font-size: 12px;
	}
	
	.search-input .store-button1.el-button span {
		display: block;
		text-align: center;
		width: 44px;
		height: 100%;
	}
</style>