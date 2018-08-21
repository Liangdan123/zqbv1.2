<template>
	<div class="allOrder commodity"  @click="closeSearch">
		<Navbar></Navbar>
		<!--............弹框左右按钮............-->
		<svg width="30" height="30" class="next" @click="nextProduct">
			<use xlink:href="#right" v-if="dialogVisible&&index!=orderLists.length-1" />
		</svg>
		<svg width="30" height="30" class="prev" @click="prevProduct">
			<use xlink:href="#left" v-if="dialogVisible&&index!=0" />
		</svg>

		<!--..............订单详情弹框..................-->
		<el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false" :show-close="false" class="order" :title="type">
			<svg width="26" height="26" class="closebox cursor" @click="dialogVisible = false">
				<use xlink:href="#close" />
			</svg>
			<el-button class="productSet" v-if="type==='订单详情'&&orderLists[index].status===2" @click="setPro">商品发货</el-button>
			<!--.................主体内容....................-->
			<orderDetail :checkOrder="onlyOrderMess" :pay_info="pay_info" :shipping_info="shipping_info" :type="type" @closeBox="closeBox">

			</orderDetail>
		</el-dialog>

		<div class="g-content">
			<!--.....................搜索框........................-->
			<div class="buttons clearfix mb-20">
				<search @searchMthod="searchMthod" @inputSearch="inputSearch" @emptyMthod="emptyMthod" ref="isShow">
				</search>
			</div>
			<!--........................表格...............-->
			<bought :orderData="orderData" :orderMess="orderMess" @handleCurrent="handleCurrent" @showOrder="showOrder" :orderLists="orderLists"
				@showSetOrder="showSetOrder">

			</bought>
		</div>
	</div>
</template>

<script>
	import Navbar from "@/components/order/Navbar"
	import search from "@/components/order/searchOrder"
	import bought from "@/components/order/bought"
	import order from "@/utils/order"
	import orderDetail from "@/components/order/orderDetail"

	export default {
		name: "allOrder",
		data() {
			return {
				created_time: "",
				orderMess: {
					page: 1,
					search: {
						type: 1,
					},
					per_page: 20,
				},
				orderData: {}, //订单全部数据（包括页码）
				orderLists: [
					{status:""}
				], //订单列表数据
				dialogVisible: false, //弹框显示
				index: 0,
				onlyOrderMess: {}, //订单详情信息
				type: "", //传到子集的标题
				pay_info:{},
				shipping_info:{},
			}
		},
		components: {
			Navbar,search,bought,orderDetail			
		},
		mixins: [order],
		created() {
			let shop_id = this.$store.getters.getShop_id;
			this.orderMess.search=Object.assign({},this.orderMess.search,{shop_id:shop_id})
			this.searchMethods(this.orderMess)
		},
		methods:{
			//分页传过来的事件（每次改变页面调用接口,子集的子集）
			handleCurrent(val) {
				var search = this.orderMess.search;
				this.$set(this.orderMess, "page", val);
				//调用列表接口
				this.orderList(this.orderMess);
			},
			//确定或取消发货时关闭弹窗（发货）
			closeBox(data){
				this.searchMethods();//发货后重新拉取列表
				this.dialogVisible=data
			},
			//点击商品发货
			setPro(){
				this.type="发货"
			},
			//搜索条件按照条件获取订单列表
			searchMthod(data){
				if(data!==undefined){
					this.$set(this.orderMess.search,"create_time",data);
				}else if(data===undefined){
					delete this.orderMess.search.create_time;
				}
				//调用订单列表API的方法
				this.searchMethods()
			},
			//搜索里的输入框搜索
			inputSearch(data){
				if(data===""){
					//当值为空的时候全部显示出列表
					if(this.orderMess.search.order_search!==undefined){
						delete this.orderMess.search.order_search
					}
				}else{
					this.$set(this.orderMess.search,"order_search",data);
				}				
				this.searchMethods()
			},
			//清空条件
			emptyMthod(){
				if(this.orderMess.search.create_time!=undefined){
					delete this.orderMess.search.create_time
				}
				this.searchMethods()
			}
		}
	}
</script>
<style lang="scss">
	.table_title {
		width: 1200px;
		height: 40px;
		background: #eef1f6;
		color: #62778C;
		overflow: hidden;
		>li {
			float: left;
			width: 100px;
			height: 40px;
			line-height: 40px;
			padding-left: 20px;
			&:first-child {
				width: 250px;
				padding-left: 90px;
			}
			&:last-child {
				margin-left: 20px;
			}
		}
	}
	
	.bought {
		.boughtHead {
			height: 32px;
			background: #EEF6FD;
			color: #62778C;
			line-height: 32px;
			margin-top: 10px;
			padding-left: 20px;
			.orderNumber {
				margin-right: 40px;
			}
		}
		ul {
			height: 70px;
			>li {
				float: left;
				width: 100px;
				padding-left: 20px;
				height: 70px;
				position: relative;
				img {
					height: 50px;
					width: 50px;
				}
			}
			>.item-1 {
				width: 50px;
			}
			>.item-2 {
				width: 250px;
			}
			>.item-3 {
				width: 118px;
			}
		}
	}
</style>
<style scoped="scoped">
	.productSet{
		position: absolute;
		top: 20px;
		right: 20px;
	}
</style>