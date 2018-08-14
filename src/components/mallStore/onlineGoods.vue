<template>
	<div class="onlineGood">
		<!--...................左右移动箭头.............-->
		
		<!--...................违规提醒.............-->
		<el-dialog :visible.sync="irreHintModle" :modal="false" title="违规提醒"  class="irreHint" >
			<el-input  type="textarea"  v-model.trim="txtBox" class="radius-2 scrollbar" >													
			</el-input>
			<div class="clearfix store-button mt-10">
				<el-button class="store-button2 float-r" @click="irreCancel">取 消</el-button>
				<el-button class="store-button1 float-r mr-10" @click="suretxt">确定</el-button>
			</div>
		</el-dialog>
		<!--.................查看商品详情....................-->
		<el-dialog :visible.sync="dialogVisible" size="small" :close-on-click-modal="false" custom-class="checkBox" 
			:show-close="false"  class="checkpro">			
			<svg width="26" height="26" class="closebox" @click="dialogVisible = false">
				<use xlink:href="#close" />
			</svg>
			<!--.................主体内容....................-->
			<div class="commodityMess">			
				<div class="clearfix btn">
					<p class="float-l f18 font-b color-3">商品信息</p>
					<el-button class="store-button2 ml-10" @click="onlyDeletePro(index)">
						<i class="iconfont icon-shanchu f12"></i>
						<span>删除</span>
					</el-button>
					<el-button class="store-button2" @click="onlyOffPro(index)">
						<svg width="12" height="13">
							<use xlink:href="#xiajia" />
						</svg>
						<span>下架商品</span>
					</el-button>
					<el-button class="store-button2 goOut" @click="irreHint(index)">
						<i class="iconfont icon-Rectangle f12"></i>
						<span>违规提醒</span>
					</el-button>
				</div>
				<!--.................查看信息的内容，在组件里....................-->
				<checkProducts :checkProduct="onlyProductMess" :irrList="irrList"></checkProducts>
			</div>
		</el-dialog>
				
		<div class="clearfix mb-20">
			<el-button class="store-button2 sale_out " @click="offCommodity">
				<svg width="12" height="13">
					<use xlink:href="#xiajia" />
				</svg>
				<span>下架商品</span>
			</el-button>
			<el-button class="store-button2 remove" @click="deleteProduct">
				<i class="iconfont icon-shanchu f12"></i>
				<span>删除商品</span>
			</el-button>
			<search :componentList="choiceInput" hintMess="输入商品相关信息进行搜索" @inputSearch="inputSearch"></search>
		</div>
		<!--.................表格主体部分....................-->
		<el-table :data="shopList.data" style="width: 100%" @selection-change="handleSelectionChange" :empty-text="emptyText"
			@sort-change="sortChange">
			<el-table-column type="selection" width="36"> </el-table-column>
			<el-table-column prop="images" width="74">
				<template slot-scope="props">
					<img :src="props.row.images[0].image_url" alt="" class="view_img">
				</template>
			</el-table-column>
			<el-table-column prop="product_name" label="商品名称" width="274">
				<template slot-scope="props">
					<div class="product_name">{{props.row.product_name}}</div>
				</template>
			</el-table-column>
			<el-table-column prop="product_price_yuan.min" label="价格"  sortable="custom" width="120">
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
			<el-table-column prop="created_at" label="创建时间"  sortable="custom" width="156"></el-table-column>					
			<el-table-column prop="status" label="商品状态"   width="142">
				<template slot-scope="props">
					<div v-if="props.row.sellout_status==='on'">正常出售中</div>
					<div v-if="props.row.sellout_status==='off'">
						<p class="selloutStatus">商品已售罄</p>
						<span class="selloutTime">{{props.row.buhuo_date}}自动下架</span>
					</div>	
				</template>
			</el-table-column>
			<el-table-column prop="time" label="操作" width="156">
				<template slot-scope="scope">
					<el-button type="text" size="small"  @click="checkPro(scope.$index)">
						查看商品 
					</el-button>
					<el-button type="text" size="small" class="pl-10" @click="irreHint(scope.$index)">
						违规提醒 
					</el-button>
					<el-button type="text" size="small" @click="onlyOffPro(scope.$index)">
						下架商品 
					</el-button>
					<el-button type="text" size="small" class="pl-10"  @click="onlyDeletePro(scope.$index)">
						删除商品 
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--.................分页....................-->
		<div class="clearfix">
			<el-pagination  @current-change="handleCurrentChange" :current-page.sync="listTerm.page" :total="shopList.total" 
			:page-size="listTerm.per_page" layout="total, prev, pager, next" class="mt-20 float-r">
	
			</el-pagination>
		</div>

	</div>
</template>

<script>
	import search from "@/components/order/searchOrder"
	import {getProductList} from "@/api/myStore"
	import checkProducts from "@/components/commodity/checkProducts"
	import {checkProduct,onoffBatch,deleteBatch} from "@/api/commodity"
	import {subIrrehint,checkIrrehint} from "@/api/mallStore"
	export default{
		components:{search,checkProducts},
		data(){
			return{
				choiceInput:["input"],
				listTerm:{
					search:{},
					page: 1,
    				per_page: 20,
				},//商品列表条件
				shopList:{},//商品列表
				emptyText:"尚未出售任何商品",
				onlyProductMess:{},//商品详情
				dialogVisible:false,
				index:0,//查看商品顺序
				irreHintModle:false,
				txtBox:"",
				irrIndex:0,//违规提醒顺序
				checkIrreList:{//违规提醒API信息
					product_id: 0,//默认值
				    page: 1,
				    per_page: 10
				},
				irrList:{
					data:[]
				},//违规信息列表
				deleteOffList:{products:[]},//上架，删除列表
				order:{},//排序信息
			}
		},
		props:{
			shop_id:{
				type:Object,
				default:function(){
					return {}
				}
			},
		},
		created(){
			this.listTerm=Object.assign({},this.listTerm,{
				shop_id:this.shop_id.shop_id,
				search:{ status: "on"}
			});
			this.searchMethods();
		},
		methods:{
			inputSearch(val){//搜索
				this.emptyText = "未搜索到相关商品";
				if(val!==""){	
					this.$set(this.listTerm,"search",{product_name:val})
				}else if(val===""){
					delete this.listTerm.search.product_name
				}
				//清空排序样式
				if(JSON.stringify(this.order)!=="{}"){
					this.order.column.prop="";				
					this.order.column.order="";
				};
				this.searchMethods();
			},
			offCommodity(){//下架商品
				if(this.deleteOffList.products.length===0){
					this.$message({showClose: true,message: '请选择要下架的商品',type: 'info'});	
					return;
				}
				let offList={
					products:this.deleteOffList.products,
					status:"off"
				}
				this.offBatch(offList)
			},
			deleteProduct(){//删除商品
				if(this.deleteOffList.products.length===0){
					this.$message({showClose: true,message: '请选择要删除的商品',type: 'info'});	
					return;
				}
				this.deletePro(this.deleteOffList)
			},
			handleSelectionChange(list){//选中商品
				let arr = [];
				for(let val of list) {
					arr.push({product_id: val.id})					
				}
				this.$set(this.deleteOffList, "products", arr);	
			},
			sortChange(column,prop,order){//升降序接口
				this.order=column;
				switch(true){
					case column.prop==="product_price_yuan.min"&&column.order==="descending":				
						this.sortCommon({product_price:"desc"})
						break;
					case column.prop==="product_price_yuan.min"&&column.order==="ascending":				
						this.sortCommon({product_price:"asc"})
						break;
					case column.prop==="product_store"&&column.order==="descending":				
						this.sortCommon({product_store:"desc"})
						break;
					case column.prop==="product_store"&&column.order==="ascending":				
						this.sortCommon({product_store:"asc"})
						break;
					case column.prop==="statistics_product.sell_num"&&column.order==="descending":				
						this.sortCommon({sell_num:"desc"})
						break;
					case column.prop==="statistics_product.sell_num"&&column.order==="ascending":				
						this.sortCommon({sell_num:"asc"})
						break;
					case column.prop==="created_at"&&column.order==="descending":				
						this.sortCommon({create_time:"desc"})
						break;
					case column.prop==="created_at"&&column.order==="ascending":				
						this.sortCommon({create_time:"asc"})
						break;
				}
			},
			sortCommon(data){
				this.$set(this.listTerm,"orderby",data);
				this.searchMethods()
			},
			handleCurrentChange(){//分页点击
				this.$set(this.listTerm, "page", val);
				this.productList(this.listTerm);
			},
			searchMethods() { //搜索方法
				if(this.listTerm.page == 1) {
					//页面在第一页搜索手动调接口获取数据列表
					this.productList(this.listTerm)
				} else {
					//页面在第一页搜索列表就让他回到第一页然后触发handleCurrentChange（）方法（页面更改设置触发）
					this.listTerm.page = 1;
				}
			},
			productList(data){//商品列表接口
				getProductList(data)
				.then(({data})=>{
					this.shopList=data
				})
				.catch(({response:{data}})=>{
					this.$message.error(data.errorcmt)
				})
			},
			checkPro(index){//查看商品
				this.index = index;
				//原先的id变成了product_id
				let list = this.shopList.data;
				let product_id = list[index].id;					
				checkProduct(product_id)//查看商品API
				.then(({data}) => {				
					if(this.dialogVisible == false){this.dialogVisible = true;};									
					//调用默认运费物流API
					this.onlyProductMess = data;
				}).catch(({response: {data}})=>{
					this.$message.error(data.errorcmt);
				});
				
				this.checkIrreList.product_id=product_id
				checkIrrehint(this.checkIrreList)//违规提醒列表
				.then(({data})=>{
					this.irrList=data;
				})
				.catch(({data:{response}})=>{
					this.$message.error(data.errorcmt)
				})
				
				
			},
			irreHint(index){//违规提醒
				this.dialogVisible=false;
				this.irrIndex=index;
				this.irreHintModle=true;
			},
			suretxt(){//违规提醒信息
				if(this.txtBox===""){
					this.$message.error({showClose: true, message: '请填写违规信息'});                           
					return
				};
				let hintMess={
					product_id:this.shopList.data[this.irrIndex].id,
					illegal_content:this.txtBox
				};
				subIrrehint(hintMess)
				.then(({data})=>{
					this.irreHintModle=false;
					this.searchMethods();
					this.txtBox="";
					this.$message({showClose: true, message: '提交成功', type: 'success'});                                
				})
				.catch(({data:{response}})=>{
					this.txtBox="";
					this.$message.error(data.errorcmt)
				})
			},
			irreCancel(){//关闭违规提醒
				this.irreHintModle=false;
				this.txtBox="";
			},
			onlyOffPro(index){//下架一个商品
				let offPro = {
					products: [{product_id: this.shopList.data[index].id}],					
					status: "off"
				};
				this.offBatch(offPro);
			},
			offBatch(data){//商品下架
				this.$confirm('你是否确定下架此商品', '温馨提示', {
					confirmButtonText: '确认',
					cancelButtonText: '取消',
					lockScroll: false,
					customClass:"offBatch"
				}).then(() => {
					onoffBatch(data)
						.then(({data}) => {					
							switch(data.status) {
								case "part_success":
									this.$message({
										showClose: true,
										message: '部分商品下架失败',
										type: 'warn'
									});
									this.emptyText = "尚未出售任何商品";
									this.searchMethods();
									break;
								case "all_fail":
									this.$message.error('下架失败');
									break;
								default:
									this.searchMethods();
							}
							//如果是弹框里的下架商品，成功就把弹框关掉
							if(this.dialogVisible === true) {
								this.dialogVisible = false
							}
						}).catch(({response: {data}})=>{
							this.$message.error(data.errorcmt);
						})	
				}).catch(() => {
					if(event.srcElement.innerText == "取消") {
						return;
					}
				})
			},
			onlyDeletePro(index){
				let deletePro = {
					products: [{product_id: this.shopList.data[index].id}]
				};
				this.deletePro(deletePro);
			},
			deletePro(data){
				this.$confirm('你是否确定删除此商品，商品删除后将保存在历史商品记录中.历史商品记录里的商品只能查看，不能做任何编辑操作。', '温馨提示',{
					confirmButtonText: '确认',
					cancelButtonText: '取消',
					lockScroll: false,
					customClass:"offBatch"
				}).then(() => {
					deleteBatch(data)
					.then(({data}) => {											
						switch(data.status) {
							case "part_success":
								this.$message({
									showClose: true,
									message: '部分商品删除失败',
									type: 'warn'
								});
								this.emptyText = "仓库中未发现商品记录";
								this.searchMethods();
								break;
							case "all_fail":
								this.$message.error('删除失败');
								break;
							default:
								this.emptyText = "仓库中未发现商品记录";
								this.searchMethods();
								if(this.dialogVisible === true) {this.dialogVisible = false}																	
						}
					}).catch(({response: {data}})=>{
						this.$message.error(data.errorcmt);
					})	
				}).catch(() => {
					return;
				})
			}
		}
	}
</script>

<style lang="scss">
	.onlineGood{
		.sale_out{
			float: left;
			span{
				color: #B4282D;
			}
		}
		.remove{
			float: left;
			span{
				color: #B4282D;
			}
		}
		.search-input{
			float: right;
		}
		.el-table__header-wrapper{
			thead{
				div{
					background-color:#F0F4F7;
					color: #62778C;
					font-size: 12px;
				}
			} 
		}
		.el-table{
			.el-table__body-wrapper{
				td{
					height: 70px;
					.cell{
						color: #333;
						font-size:12px;
						img{
							width: 50px;
							height: 50px;
						}
						.product_price{
							color: #B4282D;
						}
						.el-button+.el-button{
							margin-left: auto;
						}
					}
					
				}

			}		
		}
		.checkpro{
			.el-dialog--small{
				width: 1056px;
				.el-dialog__header{
					padding: 0;
				}
				.el-dialog__body{
					padding: 20px;
					.store-button2{
						float: right;
						span{
							color:#B4282D;	
						}						
					}
					.goOut{
						span{
							color:#333333;	
						}	
					}
				}
			}
		}
		.irreHint.el-dialog__wrapper{
			.el-dialog--small{
				width: 600px;	
				.radius-2 {
					textarea{
						resize: none;
						height: 120px;
						font-size: 12px;
					}
					.el-textarea__inner{
						color: #333;
						border:1px solid #D6D6D6;
						border-radius: 2px;
					}
					
				}
			}
		}
	}
	.el-message-box.offBatch{
		width: 600px;
		.el-message-box__btns{
			display:block;			
			overflow:hidden;
			.el-button{
				float: right;
			}
			.el-button--primary{
				background-color: #0070C9;
				margin-right: 10px;
			}
		}
	}
</style>