<template>
	<div class="mallDecora">		
		<!--..................轮播海报一....................-->
		<div v-if="mallPlate.component_key==='hbys1'">
			<h2 class="mt-20 pb-20 f20 color-3 border-e9-b">轮播海报</h2>
			<BannerEditor :banner="banner" @passBanner="passBanner"></BannerEditor>
			
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
			<imgNav :banner="banner" :length="length" @passimgNav="passimgNav" @addNav="addNav"></imgNav>
			<div v-show="false">{{isChecked}}</div>
		</div>
		<!--..................商品单列....................-->
		<div v-if="mallPlate.component_key==='splb1'">
			<h2 class="mt-20 pb-20 f20 color-3">商品单列</h2>	
			<multiModule :shopRank="mallPlate.data" :shopList="mallPlate.list"  @showProNum="showProNum" title='商品单列'
				@auto="auto" @manual="manual" @classifyMethods="classifyMethods" @mallorderby="mallorderby">							
			</multiModule>
		</div>
		<div v-if="mallPlate.component_key==='splb2'">
			<h2 class="mt-20 pb-20 f20 color-3">商品双列</h2>	
			<multiModule :shopRank="mallPlate.data" :shopList="mallPlate.list"  @showProNum="showProNum" title='商品双列'
				@auto="auto" @manual="manual" @classifyMethods="classifyMethods" @mallorderby="mallorderby">							
			</multiModule>
		</div>
		<div v-if="mallPlate.component_key==='splb3'">
			<h2 class="mt-20 pb-20 f20 color-3">商品三列</h2>	
			<multiModule :shopRank="mallPlate.data" :shopList="mallPlate.list"  @showProNum="showProNum" title='商品三列'
				@auto="auto" @manual="manual" @classifyMethods="classifyMethods" @mallorderby="mallorderby">							
			</multiModule>
		</div>
		<!--..................轮播海报er....................-->
		<div v-if="mallPlate.component_key==='hbys2'">
			<h2 class="mt-20 pb-20 f20 color-3">轮播海报</h2>
			<BannerEditor :banner="banner" :allBanner="mallPlate.data" @passBanner="passBanner" title="hbys2">					
			</BannerEditor>
		</div>
		<div v-if="mallPlate.component_key==='splb4'">
			<h2 class="mt-20 pb-20 f20 color-3">商品列表</h2>
			<multiModule :shopRank="mallPlate.data" :shopList="mallPlate.list"  @showProNum="showProNum" title='商品列表'
				@auto="auto" @manual="manual" @classifyMethods="classifyMethods" @mallorderby="mallorderby">							
			</multiModule>
		</div>
		<div v-if="mallPlate.component_key==='wzdh'">
			<h2 class="mt-20 pb-20 f20 color-3 border-e9-b">文字导航</h2>
			<txtNav :banner=banner @passtxtNav="passtxtNav"  @addNav="addNav"></txtNav>
		</div>
	</div>
</template>

<script>
	import BannerEditor from "@/components/myStore/BannerEditor"
	import imgNav  from "@/components/mallset/imgNav"
	import txtNav  from "@/components/mallset/txtNav"
	import multiModule  from "@/components/mallset/multiModule"
	import {getProductList} from "@/api/myStore"
	export default{
		data(){
			return{	
				banner:[],				
				options:[{value: '选项1',label: 4},{value: '选项2',label: 8}],					         							
				value:"",
				length:4,
				searchMess:{search:{},page: 1,per_page: 10},//商品列表搜索信息
				needNum:0,
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
			if(this.mallPlate.data!==null){
				if(this.mallPlate.data.banners!==undefined){//如果有轮播图时			
					this.banner=this.mallPlate.data.banners
				}				
			};			
		},
		components:{BannerEditor,imgNav,multiModule,txtNav},
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
			auto(num){//自动选择(商品单列)
				this.$set(this.searchMess,'per_page',num);		
				this.productList(this.searchMess);//掉接口
			},
			manual(num,existAddProduct){//手动选择
				this.$set(this.searchMess,'per_page',num);
				this.productList(this.searchMess,existAddProduct);//掉接口
			},
			showProNum(data,existAddProduct){//商品展示数量
				this.$set(this.searchMess,'per_page',data);
				this.productList(this.searchMess,existAddProduct);//掉接口
				this.mallPlate.data.product_num=data;//传给父集的商品展示数量
				this.needNum=data;
			},
			classifyMethods(existAddProduct){//商品分类排序			
				this.$set(this.searchMess.search,'mall_category_id',this.mallPlate.data.mall_category_id);
				this.productList(this.searchMess,existAddProduct);//掉接口
			},
			mallorderby(existAddProduct){//商品排序规则
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
				this.productList(this.searchMess,existAddProduct);//掉接口
			},
			productList(data,existAddProduct) {//商城列表搜索API
				getProductList(data)
				.then(({data}) => {	
					if(data.data.length<this.needNum){//上架商品数量小于要展示的商品数量
						this.$message({message:`商城商品数量仅有${data.data.length}个`,showClose: true,});
						this.mallPlate.data.product_num=data.data.length;//传给父集的商品展示数量（当商城商品数量没有商品所需要展示的数量那么多时）
					};
					let ids_Arr=data.data.map(item=>item.id);		
					let product_ids=ids_Arr.join(",");
					this.mallPlate.data.product_ids=product_ids;//商品ID组合					
					this.mallPlate.list=data.data;//展示商品（中间区域）
					if(existAddProduct!==undefined){
						if(existAddProduct.length!==0){//添加商品时（并且商品展示数量改变）
							let startDelte=this.mallPlate.list.length-existAddProduct.length;
							this.mallPlate.list.splice(startDelte,existAddProduct.length);//splice是包含当前位置														
							existAddProduct.forEach(item=>{this.mallPlate.list.unshift(item)});	
							let change_ids_Arr=this.mallPlate.list.map(item=>item.id);
							let change_product_ids=change_ids_Arr.join(",");
							this.mallPlate.data.product_ids=change_product_ids;//商品ID组合(手动添加组合改变加进来)
						}
					}
				})
				.catch(({response:{data}})=>{
					this.$message.error(data.errorcmt);
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
