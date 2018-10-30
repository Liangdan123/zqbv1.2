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
		<!--.................查看商品详情弹框....................-->
		<el-dialog :visible.sync="dialogVisible" 
			size="small" 
			:close-on-click-modal="false" 
			custom-class="checkBox" 
			:show-close="false">			
			<svg width="26" height="26" 
				class="closebox" 
				@click="dialogVisible = false">
				<use xlink:href="#close" />
			</svg>
			<!--.................查看商品详情弹框主体内容....................-->
			<div class="commodityDetail">
				<div class="clearfix btn">
					<p class="title">商品信息</p>
					<el-button class="store-button2 ml-10" @click="onlyDeletePro(checkProductID)">
						<i class="iconfont icon-shanchu f12"></i>
						<span>删除</span>
					</el-button>
					<el-button class="store-button2" @click="onlyOffPro(checkProductID)">
						<svg width="12" height="13">
							<use xlink:href="#xiajia" />
						</svg>
						<span>下架商品</span>
					</el-button>
					
					<!--<el-button class="store-button2 ml-10" @click="modelOnlyDeletePro">
						<i class="iconfont icon-shanchu f12"></i>
						<span>删除</span>
					</el-button>-->
					<!--<el-button class="store-button2" @click="modelOnlyOffPro">
						<svg width="12" height="13">
							<use xlink:href="#xiajia" />
						</svg>
						<span>下架商品</span>
					</el-button>-->
					<el-button class="store-button2 goOut" @click="modelIrreHint">
						<i class="iconfont icon-Rectangle f12"></i>
						<span>违规提醒</span>
					</el-button>
				</div>
				
				<checkProducts 
					:checkProduct="onlyProductMess" 
					:irrList="irrList">
					
				</checkProducts>				
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
		<el-table 
			:data="list.data" 
			style="width: 100%" 
			@selection-change="handleSelection" 
			:empty-text="emptyText"
			@sort-change="sortChange">
			<el-table-column type="selection" width="36"> </el-table-column>
			<el-table-column prop="images" width="74">
				<template slot-scope="props">
					<img :src="props.row.images[0].image_url" alt="" class="view_img">
				</template>
			</el-table-column>
			<el-table-column 
				prop="product_name" 
				label="商品名称" 
				width="274">
				<template slot-scope="props">
					<div class="product_name">
						{{props.row.product_name}}
					</div>
				</template>
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
			<el-table-column 
				prop="statistics_product.sell_num" 
				label="销量" 
				sortable="custom" 
				width="150"></el-table-column>
			<el-table-column 
				prop="created_at" 
				label="创建时间"  
				sortable="custom" 
				width="216"></el-table-column>					
			<el-table-column prop="status" label="商品状态"   width="142">
				<template slot-scope="props">
					<div v-if="props.row.status==='on' && !props.row.deleted_at">正常出售中</div>
					<div v-if="props.row.deleted_at">商品已删除</div>
					<div v-if="props.row.status==='off' && !props.row.deleted_at">商品已下架</div>
				</template>
			</el-table-column>
			<el-table-column prop="time" label="操作" width="156">
				<template slot-scope="scope">
					<el-button type="text" size="small"  
						@click="checkPro(scope.row.id)">
						查看商品 
					</el-button>
					<el-button type="text" size="small" class="pl-10" 
						@click="tableIrreHint(scope.row.id)">
						违规提醒 
					</el-button>
					<el-button type="text" size="small" 
						@click="onlyOffPro(scope.row.id)">
						下架商品 
					</el-button>
					<el-button type="text" size="small" class="pl-10"  
						@click="onlyDeletePro(scope.row.id)">
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
	import {getProductList,onoffBatch,deleteBatch,subIrrehint,checkIrrehint,checkProduct} from "@/api/platform"
	import page from "@/utils/page"
	import onOffCheck from "@/utils/onOffCheck"
	import checkProducts from "@/components/platform/storeManage/checkProducts"
	export default{
		components:{checkProducts},		
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
				choiceOffList:{products:[]},//下架，删除列表
				dialogVisible:false,//商品详情弹框
				irreHintModel:false,//违规提醒弹窗
				product_id:0,//违规的商品ID
				checkProductID:0,//下架的商品ID
				txtBox:"",
				checkIrreList:{//违规提醒API信息
					product_id: 0,//默认值
				    page: 1,
				    per_page: 10
				},
				irrList:{
					data:[]
				},//违规信息列表
				onlyProductMess:{},//商品详情信息
			}
		},
		mixins:[page,onOffCheck],
		props:["shop_id"],
		methods:{
			_doSearch(){//获取商ping列表
				getProductList(this.searchCondition)
				.then(({data})=>{
					this.list=data;
					this.loading=false;
				})
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
			modelIrreHint(){//模块里的违规提醒
				this._irreHint(this.checkProductID);
			},
			tableIrreHint(product_id){
				this._irreHint(product_id);
			},
			_irreHint(product_id){//违规提醒
				this.dialogVisible=false;
				this.product_id=product_id;
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
					product_id:this.product_id,
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
		.el-dialog__wrapper{
			.checkBox{
				width: 1056px;
				.el-dialog__header{
					padding: 0;

				}
				.el-dialog__body{
					.btn{
						p.title{
							float: left;
							font-size: 18px;
							color: #333;
							font-weight: bold;
						}
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
		}
	}
</style>