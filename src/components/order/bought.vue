<template>
	<div class="">
		<!--................物流信息弹窗.................-->
		<el-dialog :visible.sync="expressVisible" title="物流信息">
			<LogisticsInfo :split_order_id="split_order_id" :shipping_time="shipping_time" :logisticsInfo="logisticsOrder">				 				
			</LogisticsInfo>
		</el-dialog>
		
		<ul class="table_title">
			<li>商品</li>
			<li>单价</li>
			<li>数量</li>						
			<li>配送方式</li>
			<li>交易状态</li>
			<li>买家</li>
			<li>实际收款</li>
			<li>操作</li>
		</ul>
		<div v-if="orderLists.length">
			<div class="bought" v-for="(item,index) in orderData.data">
				
				<div class="boughtHead clearfix">
					<div class="float-l" v-if="isShopName">{{item.shop_name}}</div>
					<div class="float-r">
						订单号：<span class="orderNumber">{{item.order_no}}</span>
						创建时间：<span>{{item.created_at}}</span>
					</div>
				</div>	
				
				<div class="clearfix pos-r">				
					<ul class="clearfix top " v-for="(child,i) in item.order_products">
						<li class="item-1" :class="i===(item.order_products.length-1)?'':'border-b'">
							<div class="v_center">
								<img :src="child.spec_url" alt="商品图片">
							</div>
						</li>
						<li class="item-2" :class="i===(item.order_products.length-1)?'':'border-b'">
							<div class="v_center">
								{{child.product_name}}<br>
								<span v-for="i in  child.spec_name.split(';')">
									{{i}}
								</span>
							</div>
						</li>
						<li :class="i===(item.order_products.length-1)?'':'border-b'">
							<div class="v_center">
								{{child.product_fee_yuan}}
							</div>
						</li>
						<li :class="i===(item.order_products.length-1)?'':'border-b'">
							<div class="v_center">{{child.product_num}}</div>
						</li>
						<li :class="i===(item.order_products.length-1)?'':'border-b'">
							<div class="v_center">
								{{child.distribute_type==="express"?"快递配送":child.distribute_type==="shop"?"门店配送":"到店自取"}}
							</div>
						</li>
					</ul>
					<!--...............多个订单数量总和............-->
					<ul class="clearfix pos-a ul_right">						
						<li>
							<div class="v_center" v-if="item.distribute_type==='self'&&item.status===2?false:true">
								{{item.status===1?"未付款":item.status===2?"未发货":item.status===3?"已发货":item.status===4?"交易完成"
								:item.status===5?"交易已取消":item.status===6?"交易已关闭":"交易已删除"}}				
							</div>
							<div class="v_center" v-if="item.distribute_type==='self'&&item.status===2">
								未备货
							</div>
						</li>
						<li>
							<div class="v_center">
								{{item.shipping_info.contact_name}}
							</div>
						</li>
						<li>
							<div class="v_center text-c">
								￥{{item.pay_info.pay_fee_yuan}}<br>
								<span class="color-7F">(快递费: ￥{{item.pay_info. total_shipping_fee_yuan}})</span><br>	
								<span class="color-7F">(优惠券: ￥{{item.pay_info. total_coupon_yuan}})</span>
							</div>
						</li>
						<li>
							<div class="v_center">
								<span class=" color-b cursor" v-if="item.status===3&&item.distribute_type==='express'" @click="checkLogistics(item,index)">
									查看物流
								</span><br>
								<el-button class="store-button3 " v-if="item.status===2" @click="setPro(index)">
									发货
								</el-button><br>
								<span class=" color-b cursor" @click="checkOrder(index)">查看订单</span>							
							</div>
						</li>
					</ul>

				</div>				
			</div>
		</div>
		<!--.................没有订单的时候..............-->
		<div v-if="orderLists.length?false:true" class="color-3 f14 text-c non_order">
			未发现相关的订单
		</div>

		<pagination :pageData="orderData" :pageMess="orderMess" @handleCurrent="handleCurrent" 
			:class="orderLists.length?'':'display-n'" class="mt-20">
			
		</pagination>	
	</div>
</template>

<script>
	import pagination from "@/components/order/pagination"
	import LogisticsInfo from "@/components/order/LogisticsInfo"
	import { logisticsMess} from "@/api/order"
	export default {
		data(){
			return{
				expressVisible:false,
				split_order_id:"",
				shipping_time:"",
				logisticsOrder:{},
			}
		},
		props:{
			orderData:{
				type:Object,
				default:function(){
					return {data:[]}
				}
			},
			orderMess:{
				type:Object,
				default:function(){
					return {}
				}
			},
			orderLists:{
				type:Array,
				default:function(){
					return []
				}
			},
			isShopName:{
				type:Boolean,
				default:function(){
					return false
				}
			}
		},
		components: {
   			pagination,LogisticsInfo
  		},
  		methods:{
  			//分页传过来的事件
  			handleCurrent(val){
  				this.$emit("handleCurrent",val)
  			},
  			//查看订单
  			checkOrder(data){
				this.$emit("showOrder",data);
				if(this.orderData.data[data].distribute_type==="express"&&
				(this.orderData.data[data].status===3||this.orderData.data[data].status===4)){
					let split_order_id=this.orderData.data[data].split_order_id;
					this.checkLoginMess(split_order_id);					
				}
  			},
  			//发货
  			setPro(data){
 				this.$emit("showSetOrder",data)  				
  			},
  			//获取订单物流信息接口
  			checkLoginMess(data){
				logisticsMess(data)
				.then(({data})=>{
					this.logisticsOrder=data;//传给
					this.$emit("showlogist",this.logisticsOrder);
				})
				.catch(({response: {data}})=>{
					this.$message.error(data.errorcmt);
				})
  			},
  			
  			//查看物流
  			checkLogistics(item,index){
				this.expressVisible=true;
  				this.split_order_id=item.split_order_id;
  				this.shipping_time=item.shipping_time;
  				let split_order_id=item.split_order_id;
  				//调用获取订单物流信息接口			
				this.checkLoginMess(split_order_id)
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
			color: #333;
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
		box-shadow:
		 0px -1px 0px 0px rgba(233, 238, 242, 1), 
		-1px 0px 0px 0px rgba(233, 238, 242, 1),
		 1px 0px 0px 0px rgba(233, 238, 242, 1);
		border-bottom: 1px solid #E9EEF2;
		.boughtHead {
			height: 32px;
			background: #EEF6FD;
			color: #62778C;
			line-height: 32px;
			margin-top: 10px;
			padding-left: 20px;
			padding-right:20px;
			text-align:right;
			.orderNumber {
				margin-right: 40px;
			}
		}
		ul {
			height: 86px;

			>li {
				float: left;
				width: 100px;
				padding-left: 20px;
				height: 86px;
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
.non_order{
	border:1px solid #E9EEF2;
	height: 70px;
	line-height: 70px;
}
.border-b{
	border-bottom: 1px solid #E9EEF2;
}
.bought ul.top{
	width: 700px;
}
.bought .ul_right{
	top: 0;
	left: 700px;
}
</style>