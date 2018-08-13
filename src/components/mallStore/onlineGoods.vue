<template>
	<div class="onlineGood">
		<!--...................左右移动箭头.............-->
		
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
					<el-button class="store-button2 ml-10">
						<i class="iconfont icon-shanchu f12"></i>
						<span>删除</span>
					</el-button>
					<el-button class="store-button2">
						<svg width="12" height="13">
							<use xlink:href="#xiajia" />
						</svg>
						<span>下架商品</span>
					</el-button>
					<el-button class="store-button2 goOut" >
						<i class="iconfont icon-Rectangle f12"></i>
						<span>违规提醒</span>
					</el-button>
				</div>
				<!--.................查看信息的内容，在组件里....................-->
				<checkProducts :checkProduct="onlyProductMess"></checkProducts>
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
					<el-button type="text" size="small" class="pl-10">
						违规提醒 
					</el-button>
					<el-button type="text" size="small" class="">
						下架商品 
					</el-button>
					<el-button type="text" size="small" >
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
	import {checkProduct} from "@/api/commodity"
	export default{
		components:{search,checkProducts},
		data(){
			return{
				choiceInput:["input"],
				listTerm:{
					page: 1,
    				per_page: 20,
				},//商品列表条件
				shopList:{},//商品列表
				emptyText:"尚未出售任何商品",
				onlyProductMess:{},//商品详情
				dialogVisible:false,
				index:0,//所在顺序
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
			inputSearch(){//搜索
				
			},
			offCommodity(){//下架商品
				
			},
			deleteProduct(){//删除商品
				
			},
			handleSelectionChange(){//选中商品
				
			},
			sortChange(){//升降序接口
				
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
			deleteShop(){//弹框中的删除商品
				
			},
			boxOffPro(){//弹框中的下架商品
				
			},
			checkPro(index){//查看商品
				this.index = index;
				//原先的id变成了product_id
				let list = this.shopList.data;
				let product_id = list[index].id;				
				checkProduct(product_id)
				.then(({data}) => {				
					if(this.dialogVisible == false){
						this.dialogVisible = true;				
					};				
					//调用默认运费物流API
					this.onlyProductMess = data;
				}).catch(({response: {data}})=>{
					this.$message.error(data.errorcmt);
				})	
			},
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
	}
</style>