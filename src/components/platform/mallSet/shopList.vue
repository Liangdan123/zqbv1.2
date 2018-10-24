<template>
	<div class="shopList">
		<!--.........................店铺链接弹框.....................-->
		<el-dialog title="店铺链接" 
			:visible.sync="dialogFormVisible" 
			:close-on-click-modal="false"
			:modal-append-to-body="false" 
			:lock-scroll="false"  
			style="text-align: left;">
			
				<shopLink @shop_hidden="shop_hidden" 
					@shopName="shopName">					
											 
				</shopLink>
				
		</el-dialog>
		<!--.........................添加商品.....................-->
		<el-dialog title="添加商品"  :visible.sync="productVisible" 
			:close-on-click-modal="false" :modal-append-to-body="false" 
			:lock-scroll="false" style="text-align: left;">
				<storeList @productName="addProductList" 
					:productChecked="productChecked" 
					@shop_hidden="product_hidden" 
					@onlyProduct="onlyProduct">						 
				</storeList>
		</el-dialog>
		
		<!--.........................模块标题部分.....................-->
		<h3 class="color-3 f14 font-n">模块标题</h3>
		<el-radio-group v-model="radio1" class="mt-10" @change="isOnOff">
			<el-radio label="on">开</el-radio>
			<el-radio label="off">关</el-radio>
		</el-radio-group>
		<!--.........................添加标题链接部分.....................-->
		<div class="mt-10 border-e9-b pb-20" v-if="radio1==='on'">
			<el-input type="text" v-model="shopRank.title"  
				placeholder="请输入模块标题(必填)" class="login-input2" 
				@change="changeTitle">
			</el-input>
			<p class="jump mt-10 color-3">添加标题链接</p>
			<div class="link">
				 <span v-if="shopRank.title_click_name">
					店铺名称-{{shopRank.title_click_name}}
				 </span>
				<button class="btn-link" @click="showBomb">
					<svg height="18px" width="18px">
						<use xlink:href="#xianjie"/>
					</svg>
				</button>
			</div>
		</div>
		<!--.........................店铺展示数量.....................-->
		<h3 class="color-3 f14 mt-20 font-n">
			店铺展示数量
		</h3>
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
		<!--.........................选择店铺.....................-->
		<h3 class="color-3 f14 mt-20 font-n">选择店铺</h3>
		<el-radio-group v-model="radio2" 
			class="mt-10  mb-20" 
			@change="isAuto">
			<el-radio label="1">自动选择</el-radio>
			<el-radio label="2">手动添加</el-radio>
		</el-radio-group>	
		<div v-if="radio2==='2'">
			<div v-for="(item,index) in addProductLists">
				<div class="addProductItem clearfix">
					<img :src="item.click_image" width="60" height="60" class="float-l"/>
					<span class="ml-10 float-l color-3">{{item.click_name}}</span>
				</div>
			</div>
			<button class="w-100 btn-add mb-10"
				 @click="addshop" 
				 v-if="disabled">
				<b>+</b>添加商品
				<span>[{{addProductLists.length}}/{{value}}]</span>
			</button>
		</div>
		<h3 class="color-3 f14 font-n">
			选择店铺业务范围
		</h3>
		<el-select  v-model="mall_category_id" 
			placeholder="所有商品" 
			@change="changemallClassify" 
			class="changeNum mt-10">
			<el-option  v-for="item in mallClassify" 
				:key="item.id" 
				:label="item.mall_category_name" 
				:value="item.id" 
				:class="item.level===1?'color':''">                     
			</el-option>
		</el-select>
		<h3 class="color-3 f14 mt-20 font-n">
			店铺排序规则
		</h3>
		<el-select  v-model="shopRank.product_orderby" 
			placeholder="请选择排序规则" 
			@change="changemallorderby" 
			class="changeNum mt-10">
			
			<el-option  v-for="item in commodityOrdery" 
			:key="item.orderby" 
			:label="item.name" 
			:value="item.orderby">   
			
			</el-option>
		</el-select>
	</div>
</template>

<script>
	import {getMallClassifyList} from "@/api/platform"
	import storeList from "@/components/platform/mallSet/storeList"
	import shopLink from "@/components/platform/mallSet/shopLink"
	export default{
		components:{shopLink,storeList},		
		data(){
			return{
				radio1: "",
				options:[{value:3,label:3},{ value:6,label:6}],//店铺展示数量
				radio2:"",
				addProductLists:[],//类似addProductLists
				mallClassifyList:[],//商城分类
				commodityOrdery:[//商品排序规则
					{orderby:1,name:"上新"},
					{orderby:2,name:"销量"},
					{orderby:3,name:"人气"},
					{orderby:4,name:"价格升序"},
					{orderby:5,name:"价格降序"},				
				],
				onMess:{},//保存开关信息
				dialogFormVisible:false,
				productChecked:{id:""},
				disabled:true,//是否可以点击添加店铺按钮
				productVisible:false,//添加商品
			}
		},
		props:{
			shopRank:{//视图右边模块
				type:Object,
				default(){
					return {}
				}
			},
			shopList:{//视图左边模块
				type:Array,
				default(){
					return []
				}
			},
			title:{
				type:String,
				default(){
					return ""
				}
			}
		},
		created(){
			this.radio1=this.shopRank.title_switch;//开始模块标题有没有选中
			this.radio2=this.shopRank.select_shop_type.toString();//自动选择还是手动添加店铺
			getMallClassifyList()//商城分类列表
			.then(({data})=>{				
				this.mallClassifyList=data;
				this.loading=false
			});
		},
		computed:{
			mall_category_id:{//商品分类选择
				get:function(){
					return this.shopRank.mall_category_id!==0?this.shopRank.mall_category_id:undefined
				},
				set:function(num){
					this.shopRank.mall_category_id=num
				}
			},
			mallClassify(){
				let classify=[];	
				if(this.mallClassifyList.length===0){return}		
				this.mallClassifyList.forEach(item=>{
					classify.push({
						mall_category_name:item.mall_category_name,
						id:item.id,
						level:item.level
					})
				})
				return classify
			},
			value:{//商品展示数量选择
				get:function(){
					return this.shopRank?this.shopRank.shop_num:0
				},
				set:function(num){
					this.shopRank.shop_num=num;
				}
			},
		},
		methods:{
			isOnOff(){//模块标题	
				let arr=["title","title_click_type","title_click_id","title_click_name"];
				if(this.radio1==="on"){				
					arr.map(item=>this.shopRank[item]=this.onMess[item]);
				}else if(this.radio1==="off"){
					arr.map(item=>this.shopRank[item]=null);
				}
			},
			changeTitle(){//添加标题链接
				this.onMess.title=JSON.parse(JSON.stringify(this.shopRank.title));
			},
			showBomb(){//点击弹出标题链接
				this.dialogFormVisible=true;
				this.$set(this.productChecked,"id",{});//开始点击弹框时让他都不选择
				//商品链接中是否选中
				this.$set(this.productChecked,"id",this.shopRank.title_click_id);
			},
			changeNum(){//店铺展示数量TODO
//				if(this.existAddProduct.length>this.value){//手动添加的数量比商品展示数量多时(减掉数量多的)
//					let len=this.existAddProduct.length-this.value;
//					this.existAddProduct.splice(this.value,len);
//					this.addProductLists.splice(this.value,len);
//				};
//				if(this.value!==0){//当数量为0时不去搜
//					this.$emit("showProNum",this.value,this.existAddProduct);//商品展示数量		
//				}	
			},
			isAuto(){//手动自己添加
				
			},
			changemallClassify(){//店铺业务范围，即商城分类一级
				
			},
			changemallorderby(){//商品排序规则
				
			},
			shop_hidden(){//关闭标题链接弹窗
				this.dialogFormVisible=false
			},
			shopName(data){//添加标题链接
				this.shopRank.title_click_id=data.click_id;
				this.shopRank.title_click_name=data.click_name;
				this.shopRank.title_click_type=data.click_type;	
				let classifyMess={
					title_click_id:data.click_id,
					title_click_name:data.click_name,
					title_click_type:data.click_type
				};
				this.onMess=Object.assign({},this.onMess,classifyMess)		
			},
			addProductList(data){//添加商品弹框的确定按钮事件
				if(this.addProductLists.length!==0){//判断是否之前有添加此类商品
					let judgeCom=this.addProductLists.map(item=>item.click_id);
					if(judgeCom.includes(data.click_id)){
						this.$message({message:"商品已经添加过",showClose: true,});
						this.isShow=true
						return
					};				
				}
				this.addProductLists.push(data);//添加商品后的展示图片
			},
			onlyProduct(){
				
			},
			product_hidden(data){//添加商品弹框关闭
				this.productVisible=false
			},
			addshop(){//点击添加店铺按钮
				if(this.addProductLists.length===this.value){//手动添加数量等于商品展示数量
					this.disabled=true;
					this.$message({message:"已达到商品展示数量",showClose:true})
					return
				}
				this.productVisible=true;
			}
		}
	}
</script>

<style scoped="scoped">
div.link{
	padding: 0 0 0 10px;
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    color: #333333;
    border: 1px solid #D6D6D6;
    border-radius: 2px;
    margin-top: 8px;
    text-align: left;
}
div.link span{
	display: inline-block;
    max-width: 208px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
button.btn-link{
	float: right;
	height: 32px;
	width: 32px;
   	border:none;
    border-left: 1px solid #d6d6d6;
    background-color: transparent;
    outline: none;
    cursor: pointer;
}
button.btn-add{
    height: 32px;
    line-height: 32px;
    color: #333;
    text-align: center;
    border: 1px solid #d6d6d6;
    border-radius: 2px;
    background: none;
    cursor: pointer;
    outline: none;
}
button.btn-add b{
	font-size: 20px;
	vertical-align: bottom;
	margin-right: 5px;
}
.addProductItem{
	background-color: #F9F9F9;
	margin-bottom: 10px;
}
.addProductItem span{
	width: 180px;
	padding-top: 15px;
	display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
