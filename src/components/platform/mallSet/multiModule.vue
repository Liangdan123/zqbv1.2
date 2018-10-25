<template>
	<div class="multiModule">		
		<!--.........................添加标题弹框.....................-->
		<el-dialog title="跳转链接" 
			:visible.sync="dialogFormVisible" 
			:close-on-click-modal="false"
			:modal-append-to-body="false" 
			:lock-scroll="false"  
			style="text-align: left;">
			<el-tabs v-model="activeName">
				<el-tab-pane label="商品链接" name="first">
					<storeList  @productName="classifyCnt" 
						@shop_hidden="shop_hidden" 
						:productChecked="productChecked">						 
					</storeList>
				</el-tab-pane>
				<el-tab-pane label="商品分类" name="second" >
					<productClassify   @categorys="categorys" 
						:type="classifyType" :Classify="mallClassify" 
						choiceRole="mall">						
						<div class="btn clearfix pt-20 pb-20 border-t">
							<el-button class="store-button2 float-r" @click="cancel">
								取消
							</el-button>
							<el-button class="store-button1 float-r mr-10" @click="sureclassify">
								确定
							</el-button>
						</div>
					</productClassify>
				</el-tab-pane>
			</el-tabs>
		</el-dialog>
		<!--.........................添加商品.....................-->
		<el-dialog title="添加商品"  :visible.sync="productVisible" 
			:close-on-click-modal="false" :modal-append-to-body="false" 
			:lock-scroll="false" style="text-align: left;">
				<storeList @productName="addProductList" 
					:productChecked="productChecked" 
					@shop_hidden="shop_hidden" 
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
				 <span>
				 	{{shopRank.title_click_type=="product"?"商品链接"+" -":
					(shopRank.title_click_type=="mall_category"?"商品分类"+" -":"")}}
					{{shopRank.title_click_name}}
				 </span>
				<button class="btn-link" @click="showBomb">
					<svg height="18px" width="18px">
						<use xlink:href="#xianjie"/>
					</svg>
				</button>
			</div>
		</div>
		<!--.........................商品展示数量.....................-->
		<h3 class="color-3 f14 mt-20 font-n">
			商品展示数量
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
		<!--.........................选择商品.....................-->
		<h3 class="color-3 f14 mt-20 font-n">选择商品</h3>
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
			<button class="w-100 btn-add"
				 @click="addProduct" 
				 v-if="disabled">
				<b>+</b>添加商品
				<span>[{{addProductLists.length}}/{{value}}]</span>
			</button>
			<h3 class="color-3 f14 mt-20 font-n mb-20">
				商品自动填充
			</h3>
		</div>	
		<h3 class="color-3 f14 font-n">
			{{radio2==='1'?"选择商品分类":"选择填充商品分类"}}
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
			{{radio2==='1'?"商品排序规则":"填充商品排序规则"}}
		</h3>
		<el-select  v-model="shopRank.product_orderby" 
			placeholder="所有商品" 
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
	import storeList from "@/components/platform/mallSet/storeList"
	import productClassify from "@/components/platform/mallSet/productClassify"
	import storeClassify from "@/utils/storeClassify"
	import {getMallClassifyList} from "@/api/platform"
	export default {
		data() {
			return {
				radio1: "",
				dialogFormVisible:false,
				productChecked:{id:""},
				classifyType:"单选",
				activeName:"first",
				classifyName:{},	
				onMess:{},//保存开关信息
				radio2:"",
				disabled:true,
				productVisible:false,
				addProductLists:[],
				existAddProduct:[],
				commodityOrdery:[//商品排序规则
					{orderby:1,name:"上新"},
					{orderby:2,name:"销量"},
					{orderby:3,name:"人气"},
					{orderby:4,name:"价格升序"},
					{orderby:5,name:"价格降序"},
				
				],
				isShow:false,
				mallClassifyList:[],
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
		components:{storeList,productClassify},		
		mixins:[storeClassify],
		created(){
			this.radio1=this.shopRank.title_switch;//开始模块标题有没有选中
			this.radio2=this.shopRank.select_product_type.toString();//开始选择商品有没有选中
			if(this.shopRank.product_ids){//手动添加的列表（显示之前被保存过的列表）
				let manualList=this.shopRank.product_ids.split(',');
				this.shopList.forEach((item)=>{
					if(manualList.includes(item.product_id)){
						this.addProductLists.push({
							click_id:item.product_id,
							click_image:item.images[0].image_url,
							click_name:item.product_name,
							click_type:"product"
						});
						this.existAddProduct.push(item)
					}					
				})
			};
			getMallClassifyList()//商城分类列表
			.then(({data})=>{
				this.mallClassifyList=data;					
			})
		},
		updated(){
			this.shopRank.title_switch=this.radio1;//模块标题开关
		},
		computed:{
			options(){//根据不同的单双列显示不同的商品数量				
				if(["商品单列","商品列表"].includes(this.title)){
					return [
						{value:1,label:1}, 
						{value:2,label:2},
						{value:3,label:3},
						{value:4,label:4},
						{value:5,label:5},
						{value:6,label:6}, 
						{value:7,label:7}, 
						{value:8,label:8},
						{value:9,label:9},
						{value:10,label:10}
					]
				}else if(this.title==='商品双列'){
					return [
							{value:2,label:2},
							{value:4,label:4},
							{value:6,label:6},
							{value:8,label:8},
							{value:10,label:10}
						]
				}else if(this.title==='商品三列'){
					return [
						{value:3,label:3},
						{ value:6,label:6}, 
						{value:9,label:9},
						{value:12,label:12},
						{value:15,label:15}
					]
				}
			},
			value:{//商品展示数量选择
				get:function(){
					return this.shopRank?this.shopRank.product_num:0
				},
				set:function(num){
					this.shopRank.product_num=num;
				}
			},
			mall_category_id:{//商品分类选择
				get:function(){
					return this.shopRank.mall_category_id!==0?this.shopRank.mall_category_id:undefined
				},
				set:function(num){
					this.shopRank.mall_category_id=num
				}
			}
		},
		methods:{
			changemallClassify(){//商品分类搜索
				this.shopRank.mall_category_id=this.mall_category_id;//商城分类ID搜索列表	
				this.$emit("classifyMethods",this.existAddProduct);//商品ID通过shopRank已经传过去了
			},
			changemallorderby(){//商品排序
				this.$emit("mallorderby",this.existAddProduct)
			},
			changeNum(){//商品展示数量的改变
				if(this.existAddProduct.length>this.value){//手动添加的数量比商品展示数量多时(减掉数量多的)
					let len=this.existAddProduct.length-this.value;
					this.existAddProduct.splice(this.value,len);
					this.addProductLists.splice(this.value,len);
				};
				if(this.value!==0){//当数量为0时不去搜
					this.$emit("showProNum",this.value,this.existAddProduct);//商品展示数量		
				}			
			},
			changeTitle(){//保存标题开关的改变
				this.onMess.title=JSON.parse(JSON.stringify(this.shopRank.title));
			},
			isOnOff(){//模块标题开关
				let arr=["title","title_click_type","title_click_id","title_click_name"];
				if(this.radio1==="on"){				
					arr.map(item=>this.shopRank[item]=[item]);
				}else if(this.radio1==="off"){
					arr.map(item=>this.shopRank[item]=null);
				}
			},
			initStoreClassify(data) { //初始化数据
				for(let val of this[data]) {
					val.checked = false;
				}
			},
			isChecked(data){//传到子集时判断是否事先被选中				
				for(let val of this.mallClassify){		
					if(val.id===data.click_id){val.checked=true;}																
				}
			},
			showBomb(){//添加标题链接的按钮
				this.dialogFormVisible=true;
				this.initStoreClassify("mallClassify");
				if(this.shopRank.title_click_type==="mall_category"){//商品分类中是否选中
					this.classifyName={
						click_name:this.classifyName.click_name,
						click_id:this.classifyName.click_id
					};
					this.isChecked(this.classifyName)//传到子集时判断是否事先被选中
				};	
				this.$set(this.productChecked,"id",{});//开始点击弹框时让他都不选择
				if(this.shopRank.title_click_type==="product"){//商品链接中是否选中
					this.$set(this.productChecked,"id",this.shopRank.title_click_id);
				};			
			},
			classifyCnt(data){//商品链接时传值
				this.shopRank.title_click_id=data.click_id;
				this.shopRank.title_click_name=data.click_name;
				this.shopRank.title_click_type=data.click_type;				
				//模块标题时保存上次编辑信息
				let classifyMess={
					title_click_id:data.click_id,
					title_click_name:data.click_name,
					title_click_type:data.click_type
				};	
				this.onMess=Object.assign({},this.onMess,classifyMess)
			},
			shop_hidden(data){//弹框关闭
				this.dialogFormVisible=data;
				this.productVisible=false
			},
			categorys(val){//商品分类的单选框点击事件
				this.classifyName=val;	
			},
			cancel(){
				this.dialogFormVisible=false;
			},
			sureclassify(){//商品分类
				if (this.classifyName != "") {
					this.shopRank.title_click_id=this.classifyName.click_id;
					this.shopRank.title_click_name=this.classifyName.click_name;
					this.shopRank.title_click_type="mall_category";	
					//模块标题凯时保存上次编辑信息
					let classifyMess={
						title_click_id:this.classifyName.click_id,
						title_click_name:this.classifyName.click_name,
						title_click_type:"mall_category"
					};
					Object.assign(this.onMess,classifyMess);					
				};
				this.dialogFormVisible=false;
			},
			isAuto(){//选择商品
				this.shopRank.select_product_type=parseInt(this.radio2);
				if(this.radio2==="1"){//自动添加
					this.shopRank.product_ids=null;
				}else if(this.radio2==="2"){//手动添加
					if(this.existAddProduct.length!==0){
						let product_ids_arr=this.existAddProduct.map(item=>item.product_id);
						this.shopRank.product_ids=product_ids_arr.join(",");
						this.$emit("manual",this.value,this.existAddProduct)
					}
				}
			},
			addProduct(){//添加商品（弹框弹出）
				if(this.addProductLists.length===this.value){//手动添加数量等于商品展示数量
					this.disabled=true;
					this.$message({message:"已达到商品展示数量",showClose:true})
					return
				}
				this.productVisible=true;
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
			onlyProduct(data){//模块标题(手动添加选择商品)
				if(this.isShow){
					this.isShow=false;
					return
				};
				let changeData=JSON.parse(JSON.stringify(data).replace("id","product_id"));//把id变为product_id
				this.shopList.splice(this.shopList.length-1,1);//删除后面的商品（中间显示）			
				this.shopList.splice(0,0,changeData);//在前面增加商品（中间显示）	
				this.existAddProduct.push(changeData);//保存添加商品信息，为商品数量改变而保存之前的操作
				let product_ids_Arr=this.existAddProduct.map(item=>item.product_id);//手动添加的商品ID
				let change_product_ids=product_ids_Arr.join(",");					
				this.shopRank.product_ids=change_product_ids;//商品ID组合(手动添加组合改变加进来)						
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
<style>
.multiModule .el-radio__inner{
	height: 16px;
	width: 16px;
}
</style>