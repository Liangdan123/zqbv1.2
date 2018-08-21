<template>
	<div class="refundOrder commodity" @click="closeSearch"> 
		<Navbar></Navbar>	
		<!--............弹框左右按钮............-->
		<div v-if="activeName!=='first'">
			<svg width="30" height="30" class="next" @click="nextProduct">
				<use xlink:href="#right" v-if="dialogVisible&&index!=orderLists.length-1" />
			</svg>
			<svg width="30" height="30" class="prev" @click="prevProduct">
				<use xlink:href="#left" v-if="dialogVisible&&index!=0" />
			</svg>
		</div>

		<!--..............查看退款详情..................-->
		<el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false" :show-close="false" class="order">
			<svg width="26" height="26" class="closebox cursor" @click="dialogVisible = false">
				<use xlink:href="#close" />
			</svg>
			<!--..............查看退款详情内容（弹框）..................-->
			<orderRefund :checkOrder="onlyOrderMess" @DisAgreeAPI="DisAgreeAPI" :refundInfo="refundInfo">				
			</orderRefund>
			
		</el-dialog>
		
		<div class="g-content">
			<el-tabs v-model="activeName"  @tab-click="handleClick">
				<el-tab-pane label="全部订单" name="first">
					<refundeBought :orderData="orderData" :orderMess="orderMess" @showOrder="showOrder"  :orderLists="orderLists" v-loading="loading"
						@searchMthod="searchMthod" @inputSearch="inputSearch" @emptyMthod="emptyMthod" @againList="againList" ref="one" @showlogist="showlogist">
						
						
					</refundeBought>
				</el-tab-pane>
			    <el-tab-pane label="退款申请" name="second">
			    	<refundeBought :orderData="orderData" :orderMess="orderMess"  @showOrder="showOrder" @searchMthod="searchMthod" v-loading="loading"
			    		@inputSearch="inputSearch" @emptyMthod="emptyMthod" ref="two" @againList="againList" :orderLists="orderLists">
						
					</refundeBought>
			    </el-tab-pane>
			    <el-tab-pane label="退款中" name="third">
			    	<refundeBought :orderData="orderData" :orderMess="orderMess"  @showOrder="showOrder" @searchMthod="searchMthod" @inputSearch="inputSearch"
			    		  @emptyMthod="emptyMthod" ref="three"  @againList="againList" :orderLists="orderLists" @showlogist="showlogist" v-loading="loading">
			    		
						
					</refundeBought>
			    </el-tab-pane>
			    <el-tab-pane label="已退款" name="fourth">
			    	<refundeBought :orderData="orderData" :orderMess="orderMess"  @showOrder="showOrder" @searchMthod="searchMthod" v-loading="loading"
			    		 @inputSearch="inputSearch" @emptyMthod="emptyMthod" ref="four" @againList="againList" :orderLists="orderLists">
			    		
						
					</refundeBought>
			    </el-tab-pane>
			    <el-tab-pane label="商家已拒绝" name="fifth">
			    	<refundeBought :orderData="orderData":orderMess="orderMess"  @showOrder="showOrder" @searchMthod="searchMthod" v-loading="loading"
			    		@inputSearch="inputSearch" @emptyMthod="emptyMthod" ref="five" @againList="againList" :orderLists="orderLists">
						
					</refundeBought>
			    </el-tab-pane>
			</el-tabs>
			<!--...............分页...................-->
			<pagination :pageData="orderData" :pageMess="orderMess" @handleCurrent="handleCurrent" 
			:class="orderLists.length?'':'display-n'" class="mt-20">
			
			</pagination>
		</div>
	</div>
</template>

<script>
	import Navbar from "@/components/order/Navbar"
	import {refundList,refundGet} from "@/api/order"
	import refundeBought from  "@/components/order/refundeBought"
	import orderRefund from  "@/components/order/orderRefund"
	import pagination from "@/components/order/pagination"
	import {refundLogMess} from "@/api/order"
	export default {
		data(){
			return {
				activeName:"first",
				orderMess:{
					mall_id: "",
					shop_id: "",
				    search: {
				        type: 0,
				    },
				    page: 1,
				    per_page: 20
				},
				orderData:{},////退款订单全部数据（包括页码）
				orderLists:[],//退款订单列表数据
				dialogVisible:false,
				index:0,
				tab:"",
				onlyOrderMess:{},//退款订单详情
				refundInfo:{
					data:{
						refund_express_name:""
					}
				},
				loading:true,
			}
		},
		created(){
			let mall_id = this.$store.getters.getMall_id;
			this.$set(this.orderMess, "mall_id", mall_id);
			let shop_id=this.$store.getters.getShop_id;
			this.$set(this.orderMess, "shop_id", shop_id);
			//查询参数处理		
			if(JSON.stringify(this.$route.query)!=="{}"){
				this.activeName="second";				
			};
			this.searchMethods();
		},
		components:{
			Navbar,refundeBought,pagination,orderRefund
		},
		methods:{
			//切换列表
			handleClick(tab, event){
				this.tab=tab;
				this.loading=true;
				switch(true){
					case tab.name==="first":
						this.orderMess.search={};//切换时把条件也切换
						this.$set(this.orderMess.search, "type", 0);
						this.searchMethods();
						break;
					case tab.name==="second":
						this.orderMess.search={};
						this.$set(this.orderMess.search, "type", 1);
						this.searchMethods();
						break;
					case tab.name==="third":
						this.orderMess.search={};
						this.$set(this.orderMess.search, "type",2);
						this.searchMethods();
						break;
					case tab.name==="fourth":
						this.orderMess.search={};
						this.$set(this.orderMess.search, "type",3);
						this.searchMethods();
						break;
					case tab.name==="fifth":
						this.orderMess.search={};
						this.$set(this.orderMess.search, "type",4);
						this.searchMethods();
						break;						
				}
				
			},
			//查看订单的物流信息
			showlogist(data){
				this.refundInfo=data
			},
			//查看退款详情的同意框
			DisAgreeAPI(){
				this.dialogVisible=false;	
				this.searchMethods();				
			},
			//拒绝或者同意后重新拉取列表
			againList(){
				this.searchMethods();
			},
			//搜索方法
			searchMethods(){
				if (this.orderMess.page == 1) {
			    //页面在第一页搜索手动调接口获取数据列表
				    this.orderList(this.orderMess);
				} else {
				    //页面在第一页搜索列表就让他回到第一页然后触发handleCurrentChange（）方法（页面更改设置触发）
				    this.orderMess.page = 1;
				}
			},
			//获取退款订单列表
			orderList(data){		
				refundList(data)
				.then(({data})=>{
					this.orderData=data;//获取退款订单列表的全部数据；
	    			this.orderLists=data.data;//退款订单列表中的列表；
	    			this.loading=false;
				})
				.catch(({response: {data}})=>{
					this.$message.error(data.errorcmt);
				})	
			},
			//分页
			handleCurrent(val){		
				this.$set(this.orderMess, "page", val);
				//调用列表接口
				this.orderList(this.orderMess);
			},
			//查看退款详情
			showOrder(data){
				this.index=data;//data是列表下标
				this.dialogVisible=true;
				this.seeOrder(data);//调用获取退款订单详情
			},
			nextProduct(){
				if(this.index < this.orderLists.length - 1) {
					this.index++;
					this.seeOrder(this.index);
					//如果有物流就调用物流接口
					if(this.orderData.data[this.index].refund_status===15){
						//退款订单详情里的物流
						let refund_order_id=this.orderData.data[this.index].refund_order_id;
						this.checkRefund(refund_order_id)
					};
					
				};
				
			},
			prevProduct(){
				if(this.index > 0) {
					this.index--;
					this.seeOrder(this.index);
					//如果有物流就调用物流接口
					if(this.orderData.data[this.index].refund_status===15){
						//退款订单详情里的物流
						let refund_order_id=this.orderData.data[this.index].refund_order_id;
						this.checkRefund(refund_order_id)
					};					
				};
			},
			//查看退款物流API
			checkRefund(data){
				refundLogMess(data)
			    .then((data)=>{
			    	this.refundInfo=data;
			    })
			    .catch(({response: {data}})=>{
			    	this.$message.error(data.errorcmt);
			    })
			},
			
			//调用获取退款订单详情API
			seeOrder(index){
				let refund_order_id=this.orderLists[index].refund_order_id;
				refundGet(refund_order_id)
				.then(({data})=>{
					this.onlyOrderMess = data;//退款订单详情
				})
				.catch(({response: {data}})=>{
					this.$message.error(data.errorcmt);
				})	
				
			},
			//搜索条件按照条件获取订单列表
			searchMthod(data){
				if(data!==undefined){
					this.$set(this.orderMess.search,"create_time",data);
				}else if(data===undefined){					
					delete this.orderMess.search.create_time
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
				};			
				this.searchMethods()
			},
			emptyMthod(){
				if(this.orderMess.search.create_time!=undefined){
					delete this.orderMess.search.create_time
				};
				this.searchMethods()
			},
			//关闭搜索弹框
			closeSearch(){
				switch(true){
					case this.tab.name==="first":
						this.$refs.one.closeSearch()
						break;
					case this.tab.name==="second":
						this.$refs.two.closeSearch()
						break;
					case this.tab.name==="third":
						this.$refs.three.closeSearch()
						break;
					case this.tab.name==="fourth":
						this.$refs.four.closeSearch()
						break;
					case this.tab.name==="fifth":
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
	.el-tabs__content{
		overflow: inherit;
	}
</style>