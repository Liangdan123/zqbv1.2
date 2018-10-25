<template>
	<div class="shopLink" @click="closeModel">
		<search hintMess="输入店铺相关信息进行搜索" 
			selectTitle="筛选店铺"
			inputSearch="shop_name"
			:search.sync="searchCondition.search"
			ref="storeModel"
			@searchMethod="searchMethod"
			@emptyMthod='emptyMthod'>
			
		</search>
		<div class="shopLink_header">
			<span class="shopLink_header-store">店铺</span>
			<span class="shopLink_header-product">商品</span>
			<span class="shopLink_header-time">创建时间</span>
		</div>
		<div class="store_list" v-if="list.data.length!=0">
			<label class="display-b store_label" 
				v-for="(item,index) in list.data" 
				:key="index" 
				@click="checkedIndex(index)">	
				<input type="radio" name="one" 
					:checked="isTitleShop.name==='title'?isTitleChecked[index]:isShopChecked"/>
				<em></em>
				<img :src="item.shop_logo||shopLogoNull"/>
				<span>{{item.shop_name}}</span>
				<b>{{item.statistics_shop.product_num}}</b>
				<b>{{item.created_at}}</b>
				
			</label>
		</div>
		<div v-if="list.data.length===0" 
			class="color-6 f18" 
			style="text-align: center;line-height: 380px;">
			{{isSearchEmpty?"未搜索到任何相关商品":"未发布任何商品"}}
		</div>
		<div class="pagination clearfix">
			<div class="pagination-l clearfix float-l">
				<el-pagination background 
					layout="total, prev, pager, next" 
					:total="list.total" 
					:page-size="list.per_page" 
					@current-change="handleCurrentChange" 
					:current-page.sync="list.page" 
					class="float-l">
				</el-pagination>
			</div>
			<div class="pagination-r clearfix float-r">
				<el-button class="store-button2 float-r" @click="cancleShop">
					取消
				</el-button>
				<el-button class="store-button1 float-r mr-10" @click="sureShop">
					确定
				</el-button>
			</div>
		</div>
	</div>
</template>

<script>
import page from "@/utils/page"
import * as links from "@/links/index"
import {getStoreList} from "@/api/platform"
export default{
	data(){
		return{
			searchCondition:{
				search:{},		
				page: 1,
				per_page: 10,	
			},
			list:{data:[]},//店铺列表
			shopLogoNull:links.IMG,
			isSearchEmpty:false,//搜索条件用
			shopMessage:{//选中的店铺信息（后台所需要）
				click_type:"shop",
				click_name:"",
				click_id:"",
				click_image:"",
			},
		}
	},
	mixins:[page],
	props:{
		productChecked:{//商品是否选中
			type:Object,
			default:function(){
				return {}
			}
		},
		isTitleShop:{//添加标题链接与添加店铺是一个弹框（为了让两者不矛盾）
			default:function(){
				return {name:"title"}
			}
		}
	},
	computed:{
		isTitleChecked(){//当时添加标题时checked事件用这个
			return	this.list.data.map(item=>{
				if(item.shop_id===this.productChecked.id){
					return true
				}else{
					return false
				}
			})
		},
		isShopChecked(){//当时添加店铺时checked事件用这个
			return false
		},
	},
	methods:{
		_doSearch(){//获取店铺列表
			getStoreList(this.searchCondition)
			.then(({data})=>{
				this.list=data;
				this.loading=false;
			})
		},
		emptyMthod(){//搜索条件的清空
			delete this.searchCondition.search.created_time//删除等级条件
			this.searchMethod()
		},
		closeModel(){
			this.$refs.storeModel.closeSearch()
		},
		checkedIndex(index){//选择店铺
			this.shopMessage={//选中的店铺信息（后台所需要）
				click_type:"shop",
				click_name:this.list.data[index].shop_name,
				click_id:this.list.data[index].shop_id,
				click_image:this.list.data[index].shop_logo,
			};
		},
		cancleShop(){//取消
			this.isSearchEmpty=false;
			this.$emit("shop_hidden");
		},
		sureShop(){//确定
			this.isSearchEmpty=false;
			this.$emit("shop_hidden");
			this.$emit("shopName", this.shopMessage);
		}
	}
}
</script>

<style scoped="scoped">
	.store_list {
		height: 384px;
		overflow-y: auto;
	}
	
	.store_list::-webkit-scrollbar {
		width: 0px;
	}
	.shopLink_header{
		margin-top: 10px;
		background-color: #F0F4F7;
		height: 40px;
		color: #62778C;
		font-size: 12px;
		line-height: 40px;
	}
	.shopLink_header span{
		display: inline-block;
		text-align: center;
	}
	.shopLink_header-store {		
		width: 300px;
		padding-right: 90px;
	}
	.shopLink_header-product{
		width: 210px;
		
	}
	.shopLink_header-time{
		width: 210px;
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
		margin-right: 150px;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.store_label b {
		font-size: 12px;
		color: #333;
		font-weight: normal;
		padding-right: 180px;
	}
</style>