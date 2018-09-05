<template>
	<div class="onlineGoods">
		<!--...................违规提醒.............-->
		<el-dialog 
			:visible.sync="irreHintModel" 
			:modal="false" 
			title="违规提醒"  
			:close-on-click-modal="false"
			class="irreHint" >
			<el-input  type="textarea"  v-model.trim="txtBox" class="radius-2 scrollbar" >													
			</el-input>
			<div class="clearfix store-button mt-10">
				<el-button class="store-button2 float-r" @click="irreCancel">取 消</el-button>
				<el-button class="store-button1 float-r mr-10" @click="suretxt">确定</el-button>
			</div>
		</el-dialog>
		<!--..............商品上下架按钮搜索............-->
		<div class="clearfix mb-20">
			<div class="float-l">
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
			</div>
			<search :componentList="choiceInput" 
				hintMess="输入商品相关信息进行搜索" 
				@searchMethod="inputSearch"
				:search.sync="searchCondition.search"
				inputSearch="product_name"
				class="float-r">			
			</search>
		</div>
		<!--.................表格主体部分....................-->
		<el-table :data="list.data" style="width: 100%" @selection-change="handleSelection" :empty-text="emptyText"
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
			<el-table-column prop="product_price_yuan.min" label="价格"  sortable="custom" width="150">
				<template slot-scope="props">
					<span v-if="props.row.product_price_yuan.min==props.row.product_price_yuan.max " class="product_price">
			          {{props.row.product_price_yuan.min}}
			        </span>
					<span v-else class="product_price">
			        	{{props.row.product_price_yuan.min}} - {{props.row.product_price_yuan.max}}
			       </span>
				</template>
			</el-table-column>
			<el-table-column prop="statistics_product.sell_num" label="销量" sortable="custom" width="150"></el-table-column>
			<el-table-column prop="created_at" label="创建时间"  sortable="custom" width="216"></el-table-column>					
			<el-table-column prop="status" label="商品状态"   width="142">
				<template slot-scope="props">
					<div v-if="props.row.status==='on'">正常出售中</div>
					<div v-if="props.row.status==='off'">
						<p v-if="props.row.deleted_at">商品已删除</p>
						<p v-else>商品已下架</p>
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
		<div class="clearfix mt-20">
			<el-pagination :total="list.total"
				:current-page.sync="list.current_page" 
				:page-size="list.per_page"
				layout="total, prev, pager, next"
				@current-change="handleCurrentChange"
				class="pagination float-r">
				
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import {getProductList,onoffBatch,deleteBatch,subIrrehint} from "@/api/platform"
	import page from "@/utils/page"
	export default{
		mixins:[page],
		data(){
			return{
				searchCondition:{//搜索条件
					shop_id:this.shop_id,
					search:{},					
					page: 1,
					per_page: 20,					
				},
				list:{},
				loading:true,
				emptyText:"暂无商品",
				choiceInput:["input"],
				order:{},//清空排序样式
				deleteOffList:{products:[]},//下架，删除列表
				dialogVisible:false,
				irreHintModel:false,//违规提醒弹窗
				irrIndex:0,//违规提醒顺序
				txtBox:"",
				checkIrreList:{//违规提醒API信息
					product_id: 0,//默认值
				    page: 1,
				    per_page: 10
				},
			}
		},
		props:["shop_id"],
		methods:{
			_doSearch(){//获取商ping列表
				getProductList(this.searchCondition)
				.then(({data})=>{
					this.list=data;
					this.loading=false;
				})
				.catch(({response: {data}})=>{
					this.$message.error(data.errorcmt);
				})	
			},
			handleSelection(val){//选中列表
				let arr = [];
				for(let item of val) {
					arr.push({product_id: item.id})					
				}
				this.$set(this.deleteOffList, "products", arr);	
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
					case column.prop==="statistics_product.sell_num"&&column.order==="descending":				
						this._sortCommon({sell_num:"desc"})
						break;
					case column.prop==="statistics_product.sell_num"&&column.order==="ascending":				
						this._sortCommon({sell_num:"asc"})
						break;
					case column.prop==="created_at"&&column.order==="descending":				
						this._sortCommon({create_time:"desc"})
						break;
					case column.prop==="created_at"&&column.order==="ascending":				
						this._sortCommon({create_time:"asc"})
						break;
				}
			},
			_sortCommon(data){
				this.$set(this.searchCondition,"orderby",data);
				this.searchMethod();
			},
			checkPro(index){//查看商品
				
			},
			irreHint(index){//违规提醒
				this.dialogVisible=false;
				this.irrIndex=index;
				this.irreHintModel=true;
			},
			irreCancel(){//违规取消
				this.irreHintModel=false;
				this.txtBox="";
			},
			suretxt(){//违规确定
				if(this.txtBox===""){
					this.$message.error({showClose: true, message: '请填写违规信息'});                           
					return
				};
				let hintMess={
					product_id:this.list.data[this.irrIndex].id,
					illegal_content:this.txtBox
				};
				subIrrehint(hintMess)
				.then(({data})=>{
					this.irreHintModel=false;
					this.searchMethod();
					this.txtBox="";
					this.$message({showClose: true, message: '提交成功', type: 'success'});                                
				})
				.catch(({data:{response}})=>{
					this.txtBox="";
					this.$message.error(data.errorcmt)
				})
			},
			onlyOffPro(index){//下架商品
				let offPro = {
					products: [{product_id: this.list.data[index].id}],					
					status: "off"
				};
				this._offBatch(offPro);
			},
			onlyDeletePro(index){//删除商品
				let deletePro = {
					products: [{product_id: this.list.data[index].id}]
				};				
				this._deletePro(deletePro);
			},
			offCommodity(){//下架按钮
				if(this.deleteOffList.products.length===0){
					this.$message({showClose: true,message: '请选择要下架的商品',type: 'info'});	
					return;
				};
				let offList={
					products:this.deleteOffList.products,
					status:"off"
				}
				this._offBatch(offList)
			},
			_offBatch(data){//公共下架
				this.$confirm('你是否确定下架此商品', '温馨提示', {
					confirmButtonText: '确认',
					cancelButtonText: '取消',
					lockScroll: false,
					customClass:"offBatch"
				}).then(() => {
					onoffBatch(data)
					.then(({data}) => {					
						this._hint(data.status,"off")
						this.searchMethod();
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
			_hint(status,effect){//提示信息
				switch(status) {
					case "part_success":
						this.$message({
							showClose: true,
							message:effect==='off'?"部分商品下架失败":"部分商品删除失败",
							type:'warning'
						});															
						break;
					case "all_fail":
						this.$message.error(effect==='off'?'下架失败':'删除失败');
						break;								
				}
				this.emptyText=effect==='off'?"尚未出售任何商品":"仓库中未发现商品记录";
			},
			deleteProduct(){//删除按钮
				if(this.deleteOffList.products.length===0){
					this.$message({showClose: true,message: '请选择要删除的商品',type: 'info'});	
					return;
				}
				this._deletePro(this.deleteOffList)
			},
			_deletePro(data){//公共删除
				this.$confirm('你是否确定删除此商品，商品删除后将保存在历史商品记录中.历史商品记录里的商品只能查看，不能做任何编辑操作。', '温馨提示',{
					confirmButtonText: '确认',
					cancelButtonText: '取消',
					lockScroll: false,
					customClass:"offBatch"
				}).then(() => {
					deleteBatch(data)
					.then(({data}) => {											
						this._hint(data.status,"delete")
						if(this.dialogVisible === true) {this.dialogVisible = false}	
						this.searchMethod();
					}).catch(({response: {data}})=>{
						this.$message.error(data.errorcmt);
					})	
				}).catch(() => {
					return;
				})
			},
			inputSearch(){//搜索
				this._clear();
				this.emptyText="未搜索到相关匹配信息";
				this.searchMethod();
			},
			_clear(){//清空排序样式
				if(JSON.stringify(this.order)!=="{}"){
					this.order.column.prop="";				
					this.order.column.order="";
					if(JSON.stringify(this.searchCondition.orderby)!=="{}"){
						delete this.searchCondition.orderby
					}
				};
			},
		}
	}
</script>

<style lang="scss">
	.onlineGoods{
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
		.sale_out{
			span{
				color: #B4282D;
			}
		}
		.remove{
			span{
				color: #B4282D;
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
</style>