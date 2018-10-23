<template>
	<div class="category">
		
		<el-dialog :visible.sync="categoryDialog" 
			:title="dialogTitle" 
			size="tiny"
			custom-class="categoryDialog" 
			:close-on-click-modal="false">
			<productClassify @categorys="categorys" 
				:type="classifyType" 
				:checkStyle="false" 
				:Classify="mallClassify" 
				:classfyId="classifyName">
				<div class="categorylabel" slot="header">
					<!--................选中的分类信息..............-->
					<span class="label_item" v-for="(item,index) in classifyName">
		        		<b class="label_name">{{item.name}}</b>
		        		<svg width="12" height="12" 
		        			@click="deleteCategorys(index,classifyName)" 
		        			class="btn_delete">
		        			<use xlink:href="#delete"/>
		        		</svg>
        			</span>
				</div>
			</productClassify>
			<span slot="footer" class="dialog-footer">
		       <el-button type="primary" @click="setProduct">保存</el-button>
		       <el-button @click="categoryDialog = false">取消</el-button>
    		</span>
		</el-dialog>
		
		<div class="g-content" @click="closeSearch">
			<div class="button">
				<el-button class="store-button2 mb-20"
					@click="batchCategory">
					<i class="iconfont icon-fenlei f12"></i>
					<span>批量分类</span>
				</el-button>	
				
				<search   ref="isShow"
					hintMess="输入商品相关信息进行搜索"
					selectTitle="筛选商品"  
					inputSearch="product_name"
					:search.sync="searchCondition.search" 
					@searchMethod="searchProduct" 
					@emptyMthod="emptyMthod" >
					<template>
						<div class="condition">
							<span class="f12 color-3">商品价格:</span>
							<el-input type="number" 
								class="number" 
								v-model.number="searchCondition.search.product_price_yuan.min"></el-input> 
							到 <el-input type="number"  
								class="number" 
								v-model.number="searchCondition.search.product_price_yuan.max"></el-input>
						</div>

						<div class="classify">
							<span class="f12 color-3">商品分类:</span>
							<el-select v-model="searchCondition.search.mall_category_id" 
								filterable placeholder="请选择"
								class="select"><!--..........TODO..........-->
								<el-option v-for="(item,index) in mallClassify" 
									:key="index" :value="item.id" 
									:label="item.mall_category_name">
									
								</el-option>
							</el-select>
						</div>
						<div class="classify">
							<span class="f12 color-3">商品状态:</span>
							<el-select v-model="searchCondition.search.status" filterable placeholder="请选择">
								<el-option v-for="(item,index) in statusList" 
									:key="index" :value="item.status" 
									:label="item.value"> 
								</el-option>
							</el-select>
						</div>
						
					</template>
				</search>
			</div>
			
			<!--...................表格..........-->
			<el-table :data="list.data" style="width: 100%" 
				@selection-change="handleSelectionChange" 
				:empty-text="emptyText"
				v-loading="loading"
				@sort-change="sortChange">
				
				<el-table-column type="selection" width="36"> </el-table-column>
				<el-table-column prop="images" width="74">
					<template slot-scope="props">
						<img :src="props.row.images[0].image_url" alt="" class="view_img">
					</template>
				</el-table-column>
				<el-table-column prop="product_name" label="商品名称" width="304">
				</el-table-column>
				<el-table-column 
					prop="product_price_yuan.min" 
					label="价格"  
					sortable="custom" 
					width="150">
					<template slot-scope="props">
						<span 
							v-if="props.row.product_price_yuan.min==props.row.product_price_yuan.max " 
							class="product_price">
				          {{props.row.product_price_yuan.min}}
				        </span>
						<span v-else class="product_price">
				        	{{props.row.product_price_yuan.min}} - {{props.row.product_price_yuan.max}}
				       </span>
					</template>
				</el-table-column>
							
				<el-table-column prop="mall_categorys" label="所属分类" width="120">
					<template slot-scope="scope">
						<div v-if='scope.row.mall_categorys.length>0'>
							<p>{{scope.row.mall_categorys[0].mall_category_name}}</p>
							<div v-if='scope.row.mall_categorys.length>1'>
								<p class="toggle" @click="toggleShow(scope.$index)">
									更多分类 
									<img src="../../../assets/image/xiala.png" width="10" height="10">									 
								</p>
								<ul :class="{categoryBox:showIndex===scope.$index} ">									
									<li v-if="index>0" v-for="(value,index) in scope.row.mall_categorys">										
										{{value.mall_category_name}}
									</li>
								</ul>
							</div>
						</div>
					</template>
				</el-table-column>
				
				<el-table-column prop="created_at" label="创建时间"  sortable="custom" width="212">
					
				</el-table-column>			
				<el-table-column prop="status" label="商品状态"   width="182">
					<template slot-scope="props">
						<div v-if="props.row.deleted_at">商品已删除</div>
						<div v-else>
							<p  v-if="props.row.status==='on'">出售中</p>
							<span  v-if="props.row.status==='off'">仓库中</span>
						</div>	
					</template>
				</el-table-column>
				
				<el-table-column prop="time" label="操作" width="116">
					<template slot-scope="scope">
						<el-button type="text" size="small" 
							v-if='scope.row.mall_categorys.length>0' 
							@click="editCategorys(scope.row)">
							编辑分类
						</el-button>
						<el-button type="text" size="small" 
							v-if='scope.row.mall_categorys.length<=0' 
								@click="editCategorys(scope.row)">
							添加分类
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="clearfix" v-if="list.total>list.per_page">
				<el-pagination  @current-change="handleCurrentChange" 
					:current-page.sync="list.current_page" 
					:page-size="list.per_page" 
					layout="total, prev, pager, next" 
					:total="list.total" 
					class="mt-20 float-r">
	
				</el-pagination>
			</div>	
		</div>
	</div>
</template>

<script>
	import page from "@/utils/page"
	import {getMallClassifyList,getProductList} from "@/api/platform"
	import {setProductsCategory,setOnlyProductsCategory} from "@/api/servicer"
	import storeClassify from '@/utils/storeClassify'
	export default{
		components:{
			"productClassify":()=>import("@/components/servicer/commodity/productClassify")
		},	
		data(){
			return{
				list:{data:[]},//表格全部数据
	 			searchCondition:{//搜索条件
					search:{
						status:"on",
						product_price_yuan:{
							min:"",
							max:"",
						},					
					},
					page: 1,
					per_page: 20,
				},
				statusList: [{
					"status": "on",
					"value": "出售中"
				}, {
					"status": "off",
					"value": "仓库中"
				}],
				mallClassifyList:[],//商品分类列表
				emptyText:"暂无数据",				
				order:{},//清空排序样式
				index:0,//查看商品的顺序				
				loading:true,
				showIndex:"",				
				classifyType: "多选",
				categoryDialog:false,
				classifyName: [],
				dialogTitle: "添加分类",
				changeProduct: {//添加、编辑分类
					product_id: "",
					mall_categorys: []
				},
				changeList: {//批量分类
					products: [],
					mall_categorys: []
				},
			}
		},
		created(){
			getMallClassifyList()//商城分类列表
			.then(({data})=>{				
				this.mallClassifyList=data;
			});
		},
		mixins:[page,storeClassify],
		methods:{
			_doSearch(){
				let type=this.$store.getters.getType;
				let shop_id=this.$store.getters.getShop_id
				if(type===4){
					this.searchCondition=Object.assign({},this.searchCondition,{shop_id})
				};
				getProductList(this.searchCondition)
				.then(({data})=>{
					this.list=data;
					this.loading=false;
				})
			},
			searchProduct(){//模糊搜索
				this.emptyText = "未搜索到相关匹配信息";
				let searchProduct=this.searchCondition.search.product_price_yuan;
				let searchSell=this.searchCondition.search.sell_num;
				if(searchProduct.min&&searchProduct.max){
					if(+searchProduct.min>+searchProduct.max){
						this.$message("最高价格小于最低价格");
						return;
					}
				}
				this._clearStoreage()
				this.searchMethod();
			},
			_clearStoreage(){//清空排序样式
				if(JSON.stringify(this.order)!=="{}"){
					this.order.column.prop="";				
					this.order.column.order="";
				};
				if(this.searchCondition.orderby){//删除排序
					delete this.searchCondition.orderby
				};
			},
			emptyMthod(){//清空
				this.searchCondition={
					search:{
						product_price_yuan:{
							min:"",
							max:"",
						},
						sell_num:{
							min:"",
							max:"",
						},						
					},
					page: 1,
					per_page: 20,
				}
				this._clearStoreage()
				this.searchMethod();
			},
			closeSearch() { //关闭筛选条件
				this.$refs.isShow.closeSearch()
			},
			sortChange(column,prop,time){//排序
				this.order=column;
				switch(true){
					case column.prop==="product_price_yuan.min"&&column.order==="descending":				
						this._sortCommon({product_price:"desc"})
						break;
					case column.prop==="product_price_yuan.min"&&column.order==="ascending":				
						this._sortCommon({product_price:"asc"})
						break;
					
					case column.prop==="created_at"&&column.order==="descending":				
						this._sortCommon({create_time:"desc"})
						break;
					case column.prop==="created_at"&&column.order==="ascending":				
						this._sortCommon({create_time:"asc"})
						break;					
				};
			},
			_sortCommon(data){
				this.$set(this.searchCondition,"orderby",data);
				this.searchMethod();
			},
			toggleShow(index) {//下拉框看见与看不见
				index === this.showIndex?this.showIndex = "":this.showIndex = index;
			},
			deleteCategorys(index, arr) { //删除分类
				if(this.mallClassify.length != 0) {
					let data = this.mallClassify[arr[index].index];
					data.checked = false;
					this.$set(this.mallClassify, arr[index].index, data);
				}
				arr.splice(index, 1)
			},
			editCategorys(product){//点击编辑、添加分类
				this.$set(this.changeProduct, "product_id", product.id);
				this.categoryDialog = true;
				this.initMallClassify();
				this.classifyName = [];
				if(product.mall_categorys.length<=0){
					this.dialogTitle = "添加分类";		
				}else{
					this.dialogTitle = "编辑分类"
					let newArr = [];
					if(product.mall_categorys.length === 0 && this.mallClassify=== 0){return};
					product.mall_categorys.forEach(item=>{
						if((item.level==1&&item.is_final==1)||item.level==2){
							let index = "";
							this.mallClassify.forEach((inside,i)=>{
								if(inside.id==item.mall_category_id){
									inside.checked = true;
									index = i;
								}
							})
							newArr.push({
					            id: item.mall_category_id,
					            index: index,
					            name: item.mall_category_name
					        })
						}
					});	
					//传到子集时要被选中
					this.classifyName = newArr;
					var filters=this.classifyName.map(item=>item.id);
					//事先选中的状态
					this.isChecked(filters)
				}
			},
			handleSelectionChange(list) { //选中
				let arr = [];
				for(let val of list) {
					arr.push({
						product_id: val.id
					})
				};
				this.$set(this.changeList, "products", arr);
			},
			isChecked(data){
				//传到子集时判断是否事先被选中
				for(let val of this.mallClassify){
					if(data.includes(val.id)){
						val.checked=true
					}
				}
			},	
			initMallClassify() { //初始化数据(开始都不选中)
				for(let val of this.mallClassify) {
					val.checked = false;
				}
			},
			batchCategory(){//批量分类按钮
				if(this.changeList.products.length===0){
					this.$message("请选择分类商品")
					return
				};
				this.categoryDialog = true;
				this.dialogTitle = "批量分类"
				this.classifyName = [];
				this.initMallClassify();
			},
			categorys(data) {//选择的分类
				this.classifyName = data;
			},
			setProduct(){//分类中的保存
				if(this.mallClassify.length===0){
					this.categoryDialog = false;
					return;
				};		
				if(this.classifyName.length === 0){//分类去掉（批量、单一都在）
					this.$set(this.changeList, "mall_categorys", []);
					this.$set(this.changeProduct, "mall_categorys", []);	
				}else{//分类选择（批量、单一都在）
					let idArr = [];	
					this.classifyName.forEach(item=>{
						idArr.push({mall_category_id:item.id})
					})								
					this.$set(this.changeList, "mall_categorys", idArr);
					this.$set(this.changeProduct, "mall_categorys", idArr);	
				};
				if(this.dialogTitle == "批量分类") {	//批量分类中的按钮
					setProductsCategory(this.changeList)
					.then(({data}) => {	
						this.categoryDialog = false;
						this.searchMethod();			
					})				
				}else{//编辑、添加分类中的保存按钮						
					setOnlyProductsCategory(this.changeProduct)
					.then(({data}) => {	
						this.categoryDialog = false;
						this.searchMethod();			
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.category{
		margin-top: 120px;
		.g-content{
			.storeLink_nav{
				float: right;
				.condition{
					line-height: 36px;
					.el-input.number{
						width: 100px;						
						.el-input__inner{
							 height: 30px;
						}
					}
				}
				.classify{
					.el-input__inner{
						width: 220px;
						height: 30px;
					}
				}
			}
			.store-button2{
				span{
					color:#333;	
				}						
			}
			.el-table{
				overflow:visible;
				.el-table__body-wrapper{
					overflow: inherit;
				}
				.toggle{
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
				.el-button+.el-button{
					margin-left: 0;
				}
			}			
		}
	}
</style>