<template>
	<div class="refundOrder commodity" @click="closeSearch">
		<Navbar v-if="this.typeChoice===4"></Navbar>
    	<platformNavbar v-if="this.typeChoice===1"></platformNavbar>

		<!--..............查看退款详情..................-->
		<el-dialog :visible.sync="dialogVisible" 
			:close-on-click-modal="false" 
			:show-close="false" class="order">
			<!--............弹框左右按钮............-->
			<div v-if="activeName!=='first'">
				<svg width="30" height="30" class="next" @click="nextProduct">
					<use xlink:href="#right" v-if="dialogVisible&&index!=orderLists.length-1" />
				</svg>
				<svg width="30" height="30" class="prev" @click="prevProduct">
					<use xlink:href="#left" v-if="dialogVisible&&index!=0" />
				</svg>
			</div>
			<svg width="26" height="26" class="closebox cursor" 
				@click="dialogVisible=false">
					<use xlink:href="#close" />
			</svg>
			<!--..............查看退款详情内容（弹框）..................-->
			<orderRefund :checkOrder="onlyOrderMess" 
				@DisAgreeAPI="DisAgreeAPI" 
				:refundInfo="refundInfo">
			</orderRefund>
		</el-dialog>
		<div class="g-content">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="全部订单" name="1">
					<refundeBought :orderData="orderData" 
						:orderMess="orderMess" 
						@showOrder="showOrder" 
						:orderLists="orderLists" 
						v-loading="loading"
						@againList='searchMethods'
						@searchMthod="searchMethods"   
						ref="one">
					</refundeBought>
				</el-tab-pane>
				<el-tab-pane label="退款申请" name="2">
					<refundeBought :orderData="orderData" 
						:orderMess="orderMess" 
						@showOrder="showOrder"
						@againList='searchMethods'
						@searchMthod="searchMethods"
						v-loading="loading"  
						ref="two" 
						:orderLists="orderLists">
					</refundeBought>
				</el-tab-pane>
				<el-tab-pane label="已退款" name="3">
					<refundeBought :orderData="orderData" 
						:orderMess="orderMess" @showOrder="showOrder" 
						@searchMthod="searchMethods" 
						v-loading="loading"   
						ref="four" 
						:orderLists="orderLists">
					</refundeBought>
				</el-tab-pane>
				<el-tab-pane label="已拒绝" name="4">
					<refundeBought 
						:orderData="orderData"						
						:orderMess="orderMess" 
						@showOrder="showOrder"
						@searchMthod="searchMethods"
						v-loading="loading"   
						ref="five"  
						:orderLists="orderLists">
						
					</refundeBought>
				</el-tab-pane>
			</el-tabs>
			<!--...............分页...................-->
			 <el-pagination :total="orderData.total" 
			 	:current-page.sync="orderMess.page" 
			 	:page-size="orderMess.per_page" 
			 	v-if='orderData.total>orderMess.per_page'
	      		class="mt-20" 
	      		@current-change="handleCurrent" 
	      		layout="total, prev, pager, next">
	    	</el-pagination>
		</div>
	</div>
</template>

<script>
  	import Navbar from "@/components/servicer/order/Navbar"
  	import platformNavbar from "@/components/platform/order/Navbar"
	import {refundList,refundGet} from "@/api/order"					
	import refundeBought from "@/components/servicer/order/refundeBought"
	import orderRefund from "@/components/servicer/order/orderRefund"
	import {refundLogMess} from "@/api/order"			
	export default {
		data() {
			let type=this.$store.state.user.user.type;
			return {
				activeName: "1",
				orderMess: {
					search: {
						type: 0,
					},
					page: 1,
					per_page: 20
				},
				orderData: {}, ////退款订单全部数据（包括页码）
				orderLists: [], //退款订单列表数据
				dialogVisible: false,
				index: 0,
				tab: "",
				onlyOrderMess: {}, //退款订单详情
				refundInfo: {},
				loading: true,
				typeChoice:type,//登录的是服务商还是平台
			}
		},
		created() {
			if(this.typeChoice===4){//服务商时的列表（平台是不需要）
				let shop_id = this.$store.getters.getShop_id;
				this.$set(this.orderMess, "shop_id", shop_id);
			};						
			//查询参数处理		
			if (JSON.stringify(this.$route.query) !== "{}") {
				this.activeName = "2";
				this.$set(this.orderMess,"search",{type:1})
			};
			this.searchMethods();
		},
		components: {Navbar,refundeBought,orderRefund,platformNavbar},											
		methods: {
			//切换列表
			handleClick(tab, event) {
				this.tab = tab;
				this.loading = true;
				this.orderMess.search = {}; //切换时把条件也切换
				switch (tab.name) {
					case  "1":
						this.$set(this.orderMess.search, "type", 0);
						break;
					case  "2":
						this.$set(this.orderMess.search, "type", 1);
						break;
					case  "3":
						this.$set(this.orderMess.search, "type", 3);
						break;
					case  "4":
						this.$set(this.orderMess.search, "type", 4);
						break;
				}
				this.searchMethods();
			},
			//查看退款详情的同意框
			DisAgreeAPI() {
				this.dialogVisible = false;
				this.searchMethods();
			},
			//搜索方法
			searchMethods() {
				if (this.orderMess.page == 1) {
					//页面在第一页搜索手动调接口获取数据列表
					this.orderList(this.orderMess);
				} else {
					//页面在第一页搜索列表就让他回到第一页然后触发handleCurrentChange()方法（页面更改设置触发）
					this.orderMess.page = 1;
				}
			},
			//获取退款订单列表
			orderList(data) {
				refundList(data)
					.then(({data}) => {											
						this.orderData = data; //获取退款订单列表的全部数据；
						this.orderLists = data.data; //退款订单列表中的列表；
						this.loading = false;
					})
			},
			//分页
			handleCurrent(val) {
				this.$set(this.orderMess, "page", val);
				//调用列表接口
				this.orderList(this.orderMess);
			},
			//查看退款详情
			showOrder(data){
				this.index = data; //data是列表下标
				this.dialogVisible = true;
				this.seeOrder(data); //调用获取退款订单详情
			},
			nextProduct() {
				if (this.index < this.orderLists.length - 1) {
					this.index++;
					this.seeOrder(this.index);
				};
			},
			prevProduct() {
				if (this.index > 0) {
					this.index--;
					this.seeOrder(this.index);
				};
			},
			//调用获取退款订单详情API
			seeOrder(index) {
				let refund_order_id = this.orderLists[index].refund_order_id;
				refundGet(refund_order_id)
					.then(({data}) => {								
						this.onlyOrderMess = data; //退款订单详情
					})
			},
			//关闭搜索弹框
			closeSearch() {
				switch ( this.tab.name) {
					case "first":
						this.$refs.one.closeSearch()
						break;
					case  "second":
						this.$refs.two.closeSearch()
						break;
					case "third":
						this.$refs.three.closeSearch()
						break;
					case "fourth":
						this.$refs.four.closeSearch()
						break;
					case "fifth":
						this.$refs.five.closeSearch()
						break;
					default:
						this.$refs.one.closeSearch()
				}
			},
		}
	}
</script>

<style>
	.el-tabs__content {
		overflow: inherit;
	}
</style>