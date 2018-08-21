<template>
	<div class="mallStore">
		<search :componentList="choiceInput" hintMess="输入店铺相关信息进行搜索" @inputSearch="inputSearch" class="mb-20"></search>
		<el-table v-loading="loading" :data="storeListMess.data" style="width: 100%" :empty-text="emptyText">
			<el-table-column prop="shop_logo" width="70">
				<template slot-scope="props">
					<img :src="props.row.shop_logo" width="50" height="50">
				</template>
			</el-table-column>
			<el-table-column prop="shop_name" label="店铺名称"></el-table-column>
			<el-table-column prop="shopkeeper_name" label="店长"></el-table-column>
			<el-table-column prop="shopkeeper_phone" label="联系方式"></el-table-column>	
			<el-table-column prop="created_at" label="开店时间"></el-table-column>
			<el-table-column prop="product_num" label="在售商品(件)"></el-table-column>
			<el-table-column  label="操作">
				<template slot-scope="scope">
					<el-button type="text" size="small" class="btn-delete" @click="storeDetail(scope.$index)">
						店铺详情
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--.................页码..........-->
		<div class="clearfix">
			<el-pagination  class="mt-20 float-r"  @current-change="handleCurrentChange" :current-page.sync="storeListMess.page" 
			:page-size="storeListMess.per_page" layout="total, prev, pager, next" :total="storeListMess.total">
									
			</el-pagination>
		</div>
		
	</div>
</template>

<script>
	import search from "@/components/order/searchOrder"
	import { getStoreList } from "@/api/mallStore"
	import * as links from "@/links/index"
	import router from "@/router"
	export default{
		name:"mallStoreMana",
		components:{search},
		data(){
			return{
				choiceInput:["input"],
				loading:true,//页面加载
				selectMess:{
					search:{},
					page: 1,
    				per_page:20,
				},
				storeListMess:{},
				emptyText:"尚未创建店铺",
			}
		},
		created(){
			this.searchMethods();
		},
		methods:{
			inputSearch(val){//搜索信息
				this.emptyText = "未搜索到相关商品";
				if(val!==""){	
					this.$set(this.selectMess,"search",{shop_name:val})
				}else if(val===""){
					delete this.selectMess.search.shop_name
				};
				this.searchMethods()
			},
			searchMethods() { //搜索方法
				if(this.selectMess.page == 1) {
					//页面在第一页搜索手动调接口获取数据列表
					this.getMallStore(this.selectMess)
				} else {
					//页面在第一页搜索列表就让他回到第一页然后触发handleCurrentChange（）方法（页面更改设置触发）
					this.selectMess.page = 1;
				}
			},
			getMallStore(data){
				getStoreList(data)//获取店铺列表API
				.then(({data})=>{
					this.storeListMess=data;
					this.storeListMess.data.forEach((item)=>{
						if(item.shop_logo===null){//如果没有上传LOGO图片时
							item.shop_logo = links.IMG
						}
					})
					this.loading=false;
				})
				.catch(({response:{data}})=>{
					this.$message.error(data.errorcmt)
				})
			},
			storeDetail(index){//点击店铺详情
				let id=this.storeListMess.data[index].shop_id
				router.push({path:"/mallZxh/mallStoreMess",query:{shop_id:id}})
			},
			handleCurrentChange(val){//点击分页
				this.$set(this.selectMess, "page", val);
				//调用没有搜索条件的方法，点击了搜索后自动会把搜索条件加上
				this.getMallStore(this.selectMess);
			},
			closeModel(){//关闭弹框
				console.log("asdfads")
				this.dialogVisible=false;
			}
		}
	}
</script>

<style lang="scss">
.mallStore{
	width: 1200px;
	padding: 20px;
	background-color: #fff;
	margin-top: 80px;
	margin-left: auto;
	margin-right: auto;
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
		color: #333;
		td{
			height: 70px;
		}
	}
}
</style>