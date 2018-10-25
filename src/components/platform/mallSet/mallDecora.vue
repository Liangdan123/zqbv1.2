<template>
	<div class="mallDecora">		
		<!--..................轮播海报一....................-->
		<div v-if="mallPlate.component_key==='hbys1'">
			<h2 class="mt-20 pb-20 f20 color-3 border-e9-b">轮播海报</h2>
			<BannerEditor :banner="banner" choicePlate="mall" @passBanner="passBanner"></BannerEditor>
			
		</div>
		<!--..................图片导航....................-->
		<div v-if="mallPlate.component_key==='tpdh'">
			<h2 class="mt-20 pb-20 f20 color-3">图片导航</h2>
			<div class="border-e9-b pb-20">
				<h3 class="f14 color-3 font-n">导航数量</h3>
				<el-select  v-model="value" placeholder="请选择" @change="changeNum" class="changeNum mt-10">
					<el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value">                     
					</el-option>
				</el-select>
			</div>
			<imgNav :banner="banner" :length="length" @passimgNav="passimgNav" @addNav="addNav">
				
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
		<!--..................轮播海报....................-->
		<div v-if="mallPlate.component_key==='hbys2'">
			<h2 class="mt-20 pb-20 f20 color-3">轮播海报</h2>
			<BannerEditor :banner="banner" 
				:allBanner="mallPlate.data" 
				choicePlate="mall" 
				@passBanner="passBanner" 
				title="hbys2">	
				
			</BannerEditor>
		</div>
		<!--..................店铺列表....................-->
		<div v-if="mallPlate.component_key==='dplb1'">
			<h2 class="mt-20 pb-20 f20 color-3">店铺列表</h2>
			<shopList :shopRank="mallPlate.data"
				@showShopNum="showShopNum"></shopList>
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
				length:4,
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
				if(this.mallPlate.data!==null&&this.mallPlate.component_key==='tpdh'){//如果有轮播图时
					if(this.mallPlate.data.num!==undefined){//有数据传过来时
						if(this.mallPlate.data.num===4){
							this.value='选项1'
						}else if(this.mallPlate.data.num===8){						
							this.value='选项2'
						}
					}				
				}
			}
		},
		created(){
			if(!this.mallPlate.data){return};	
			if(this.mallPlate.data.banners){//如果有轮播图时			
				this.banner=this.mallPlate.data.banners
			};
			this.$set(this.searchMess,"per_page",this.mallPlate.data.product_num);
			if(this.mallPlate.data.mall_category_id!==0){
				this.$set(this.searchMess,"search",{
					mall_category_id:this.mallPlate.data.mall_category_id
				});
			};	
			this.orderdy();
					
		},
		components:{BannerEditor,imgNav,multiModule,txtNav,shopList},
		methods:{
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
				if(this.value==='选项1'){
					this.length=4;	
				}else if(this.value==='选项2'){
					this.length=8;		
				}
				this.$emit("changeNum",this.value,this.index)
			},
			manual(num,existAddProduct){//手动选择
				this.$set(this.searchMess,'per_page',num);
				this._productList(this.searchMess,existAddProduct);//掉接口
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
			mallorderby(existAddProduct){//商品排序规则
				this.orderdy();
				this._productList(this.searchMess,existAddProduct);//掉接口
			},
			orderdy(){
				switch(true){
					case this.mallPlate.data.product_orderby===1:
						this.$set(this.searchMess,"orderby",{onoff_time:'desc'});
						break
					case this.mallPlate.data.product_orderby===2:
						this.$set(this.searchMess,"orderby",{sell_num:'desc'});
						break
					case this.mallPlate.data.product_orderby===3:
						this.$set(this.searchMess,"orderby",{browse_num:'desc'});
						break
					case this.mallPlate.data.product_orderby===4:
						this.$set(this.searchMess,"orderby",{product_price:'asc'});
						break
					case this.mallPlate.data.product_orderby===5:
						this.$set(this.searchMess,"orderby",{product_price:'desc'});
						break
				};
			},
			_shopList(data,existAddShop){
				getStoreList(data)
				.then(({data})=>{
					if(data.data.length<this.shopNumChild){//上架商品数量小于要展示的商品数量
						this.$message({message:`商城店铺数量仅有${data.data.length}个`,showClose: true,});
						this.mallPlate.data.shop_num=data.data.length;//传给父集的商品展示数量（当商城商品数量没有商品所需要展示的数量那么多时）
					};
					this.mallPlate.list=data.data;//展示商品（中间区域）
					if(!existAddShop){return}
					if(existAddShop.length===0){return}
					//添加店铺时（并且商品展示数量改变）
					let startDelte=this.mallPlate.list.length-existAddShop.length;
					this.mallPlate.list.splice(startDelte,existAddShop.length);//splice是包含当前位置	(减去已经存在的商品)
					existAddShop.forEach(item=>{this.mallPlate.list.unshift(item)});//添加上已经存在的商品（商品列表中）
				})
			},
			_productList(data,existAddProduct) {//商城列表搜索API
				getProductList(data)
				.then(({data}) => {
					if(data.data.length<this.needNum){//上架商品数量小于要展示的商品数量
						this.$message({message:`商城商品数量仅有${data.data.length}个`,showClose: true,});
						this.mallPlate.data.product_num=data.data.length;//传给父集的商品展示数量（当商城商品数量没有商品所需要展示的数量那么多时）
					};
					this.mallPlate.list=data.data;//展示商品（中间区域）
					if(!existAddProduct){return	}	
					if(existAddProduct.length===0){return}
					//添加商品时（并且商品展示数量改变）
					let startDelte=this.mallPlate.list.length-existAddProduct.length;
					this.mallPlate.list.splice(startDelte,existAddProduct.length);//splice是包含当前位置	(减去已经存在的商品)
					existAddProduct.forEach(item=>{this.mallPlate.list.unshift(item)});//添加上已经存在的商品（商品列表中）														
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
