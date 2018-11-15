<template>
	<div class="mallDecora">		
		<!--..................轮播海报一....................-->
		<div v-if="mallPlate.component_key==='hbys1'">
			<h2 class="mt-20 pb-20 f20 color-3 border-e9-b">轮播海报</h2>
			<BannerEditor 
				:banner="banner" 
				choicePlate="mall" 
				@passBanner="passBanner">
				
			</BannerEditor>
			
		</div>
		<!--..................图片导航....................-->
		<div v-if="mallPlate.component_key==='tpdh'">
			<h2 class="mt-20 pb-20 f20 color-3">图片导航</h2>
			<div class="border-e9-b pb-20">
				<h3 class="f14 color-3 font-n">导航数量</h3>
				<el-select  v-model="value" 
					placeholder="请选择" 
					@change="changeNum" 
					class="changeNum mt-10">
					<el-option  v-for="item in options" 
						:key="item.value" 
						:label="item.label" 
						:value="item.value">                     
					</el-option>
				</el-select>
			</div>
			<imgNav :banner="banner" 
				:length="length" 
				@passimgNav="passimgNav" 
				@addNav="addNav">
				
			</imgNav>
			<div v-show="false">{{isChecked}}</div>
		</div>
		<!--..................商品单列....................-->
		<div v-if="mallPlate.component_key==='splb1'">
			<h2 class="mt-20 pb-20 f20 color-3">商品展示</h2>	
			<multiModule 
				:shopRank="mallPlate.data" 
				:shopList="mallPlate.list" 
				 @showProNum="showProNum" title='商品单列'
			 	@manual="manual" 
			 	@classifyMethods="classifyMethods" 
			 	@mallorderby="mallorderby">
			 	
			</multiModule>
		</div>
		<div v-if="mallPlate.component_key==='splb2'">
			<h2 class="mt-20 pb-20 f20 color-3">商品双列</h2>	
			<multiModule :shopRank="mallPlate.data" 
				:shopList="mallPlate.list"  
				@showProNum="showProNum" 
				title='商品双列'
			 	@manual="manual" 
			 	@classifyMethods="classifyMethods" 
			 	@mallorderby="mallorderby">		
			 	
			</multiModule>
		</div>
		<div v-if="mallPlate.component_key==='splb3'">
			<h2 class="mt-20 pb-20 f20 color-3">商品三列</h2>	
			<multiModule :shopRank="mallPlate.data" 
				:shopList="mallPlate.list"  
				@showProNum="showProNum" title='商品三列'
			 	@manual="manual" 
			 	@classifyMethods="classifyMethods"
			  	@mallorderby="mallorderby">	
			  	
			</multiModule>
		</div>
		<!--..................轮播海报二....................-->
		<div v-if="mallPlate.component_key==='hbys2'">
			<h2 class="mt-20 pb-20 f20 color-3">轮播海报</h2>
			<BannerEditor :banner="banner" 
				:allBanner="mallPlate.data" 
				choicePlate="mall" 
				@passBanner="passBanner" 
				title="hbys2"
				:isForm="false">	
				
			</BannerEditor>
		</div>
		<!--..................店铺列表....................-->
		<div v-if="mallPlate.component_key==='dplb1'">
			<h2 class="mt-20 pb-20 f20 color-3">店铺列表</h2>
			<shopList :shopRank="mallPlate.data"
				@showShopNum="showShopNum"
				:shopList="mallPlate.shop_list" 
				@storeClassifyMethods="storeClassifyMethods"
				@shopMallorderby="shopMallorderby"
				@shopManual="shopManual">
			</shopList>
		</div>
	</div>
</template>

<script>
	import BannerEditor from "@/components/platform/mallSet/BannerEditor"
	import imgNav  from "@/components/platform/mallset/imgNav"
	import txtNav  from "@/components/platform/mallset/txtNav"
	import multiModule  from "@/components/platform/mallset/multiModule"
	import shopList from "@/components/platform/mallset/shopList"
	import {getProductList,getStoreList} from "@/api/platform"
	export default{
		data(){
			return{	
				banner:[],				
				options:[{value: '选项1',label: 4},{value: '选项2',label: 8}],					         							
				value:"",
				searchMess:{//商品列表搜索信息
					search:{},
					orderby:{},
					page: 1,
					per_page: 20
				},
				searchShopMess:{//店铺列表搜索信息
					search:{},
					orderby:{},
					page: 1,
					per_page: 20
				},
				needNum:0,
				shopNumChild:0,
			}
		},
		props:{
			mallPlate:{//整个模块的数据
				type:Object,
				default(){
					return {
						data:{
							banners:[]
						}
					}
				}
			},
			index:{//图片导航的数量
				type:Number,
				default(){
					return 0
				}
			},
			shopNum:{
				type:Number,
				default(){
					return 0
				}
			}
		},
		computed:{
			isChecked(){//如果有值时(图片导航，component_key==='tpdh')
				if(this.mallPlate.data&&this.mallPlate.component_key==='tpdh'){//如果有轮播图时
					if(this.mallPlate.data.num){//有数据传过来时
						if(this.mallPlate.data.num===4){
							this.value='选项1'
						}else if(this.mallPlate.data.num===8){						
							this.value='选项2'
						}
					}				
				}
			},
			length(){//图片导航数量的值
				if(this.value==='选项1'){
					return 4
				}else if(this.value==='选项2'){
					return 8	
				}else{
					return 0
				}
			}
		},
		created(){
			if(!this.mallPlate.data){return};	
			if(this.mallPlate.data.banners){//如果有轮播图时			
				this.banner=this.mallPlate.data.banners
			};			
			this._storeShopOrdery(this.searchMess,"product_num","product_orderby","prodcut")//商品排序规则
			this._storeShopOrdery(this.searchShopMess,"shop_num","shop_orderby","shop")//店铺排序规则
		},
		components:{BannerEditor,imgNav,multiModule,txtNav,shopList},
		methods:{
			_storeShopOrdery(searchCondition,shopProductNum,shopProductorderby,shopProduct){//商品或店铺排序规则	
				this.$set(searchCondition,"per_page",this.mallPlate.data[shopProductNum]);			
				if(this.mallPlate.data.mall_category_id!==0){
					let search= shopProduct==="prodcut"?"mall_category_id":"business_range";//商品和店铺列表搜索属性名不一致
					this.$set(searchCondition,"search",{
						[search]:this.mallPlate.data.mall_category_id
					});
				};					
				this._orderdy(this.mallPlate.data[shopProductorderby]);//商品排序规则	
			},
			passBanner(data){//轮播海报一
				this.mallPlate.data=data;															
			},
			addNav(index,data){//图片导航(点击图片链接的确定)
				Object.assign(this.mallPlate.data.banners[index],data) 
			},
			passimgNav(data){//图片导航
				let mergeBannerNum={banners:data.banners,num:this.length}//num,banner合并	
				this.mallPlate.data=Object.assign({},mergeBannerNum);				
				this.$emit("controlImg")
			},
			passtxtNav(data){
				this.mallPlate.data=Object.assign({},data);	
			},
			changeNum(){//图片导航的图片数量改变	
				this.$emit("changeNum",this.value,this.index)
			},
			manual(num,existAddProduct){//手动选择(商品)
				this.$set(this.searchMess,'per_page',num);
				this._productList(this.searchMess,existAddProduct);//掉接口
			},
			shopManual(num,existAddShop){//手动选择(店铺)
				this.$set(this.searchShopMess,'per_page',num);
				this._shopList(this.searchShopMess,existAddShop);//掉接口
			},
			showProNum(data,existAddProduct){//商品展示数量
				this.$set(this.searchMess,'per_page',data);				
				this._productList(this.searchMess,existAddProduct);//调接口								
				this.needNum=data;//商品需要展示的数量
			},
			showShopNum(data,existAddShop){//店铺展示数量
				this.$set(this.searchShopMess,'per_page',data);	
				this._shopList(this.searchShopMess,existAddShop);//调接口	
				this.shopNumChild=data;//店铺需要展示的数量
			},
			classifyMethods(existAddProduct){//商品分类排序			
				this.$set(this.searchMess.search,'mall_category_id',this.mallPlate.data.mall_category_id);				
				this._productList(this.searchMess,existAddProduct);//调接口
			},
			storeClassifyMethods(existAddShop){//店铺业务范围
				this.$set(this.searchShopMess.search,'business_range',this.mallPlate.data.mall_category_id);	
				this._shopList(this.searchShopMess,existAddShop);//调接口
			},
			mallorderby(existAddProduct){//商品排序规则
				this._orderdy(this.mallPlate.data.product_orderby);				
				this._productList(this.searchMess,existAddProduct);//掉接口
			},
			shopMallorderby(existAddShop){//店铺排序规则
				this._orderdy(this.mallPlate.data.shop_orderby);
				this._shopList(this.searchShopMess,existAddShop);//掉接口
			},
			_orderdy(data){//商品店铺排序规则在一起
				switch(data){//子集通过值直接传过来
					case 1:
						this.$set(this.searchMess,"orderby",{onoff_time:'desc'});
						this.$set(this.searchShopMess,"orderby",{created_at:'desc'});
						break
					case 2:
						this.$set(this.searchMess,"orderby",{sell_num:'desc'});
						this.$set(this.searchShopMess,"orderby",{product_num:'desc'});
						break
					case 3:
						this.$set(this.searchMess,"orderby",{browse_num:'desc'});
						this.$set(this.searchShopMess,"orderby",{collection_num:'desc'});
						break
					case 4:
						this.$set(this.searchMess,"orderby",{product_price:'asc'});
						this.$set(this.searchShopMess,"orderby",{score:'desc'});
						break
					case 5:
						this.$set(this.searchMess,"orderby",{score:'desc'});
						break
				};
			},
			_shopList(data,existAddShop){
				getStoreList(data)
				.then(({data})=>{
					this._commonList(data.data,this.shopNumChild,"店铺","shop_list",existAddShop,"shop_num");//共用方法	
				})
			},
			_commonList(mallPlateData,num,name,list,existAdd,shopProductNum){//添加店铺与商品在一起
				if(mallPlateData.length<num){//上架商品数量小于要展示的商品数量
					this.$message({message:`商城${name}数量仅有${mallPlateData.length}个`,showClose: true,});
					this.mallPlate.data[shopProductNum]=mallPlateData.length;//传给父集的商品店铺展示数量（当商城商品数量没有商品所需要展示的数量那么多时）
				};					
				this.mallPlate[list]=mallPlateData;//展示商品（中间区域）
				if(!existAdd){return}
				if(existAdd.length===0){return}
				//添加店铺时（并且商品展示数量改变）
				let startDelte=this.mallPlate[list].length-existAdd.length;
				this.mallPlate[list].splice(startDelte,existAdd.length);//splice是包含当前位置(减去已经存在的商品)
				existAdd.forEach(item=>{this.mallPlate[list].unshift(item)});//添加上已经存在的商品（商品列表中）
			},
			_productList(data,existAddProduct) {//商城列表搜索API
				getProductList(data)
				.then(({data}) => {
					this._commonList(data.data,this.needNum,"商品","list",existAddProduct,"product_num");//共用方法	
				})
			},
		}
	}
</script>

<style scoped="scoped">
.mallPlate	.mallDecora{		
    position: fixed;
    top: 102px;
    right: 0;
    bottom: 44px;
    width: 260px;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #fff;
    border-left: 1px solid #D6D6D6;
    z-index: 200;
    overflow-y: auto;
}
.mallPlate	.mallDecora::-webkit-scrollbar {
	width: 0px;
}
</style>
