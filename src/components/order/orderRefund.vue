<template>
	<div class="orderRefund">
		<!--.................退货退款或仅退款标题.................-->
		<div class="orderTitle clearfix bg-fo">
			<div class="float-l" :class="[width,checkOrder.refund_status===13||checkOrder.refund_status===3?'width_50':'']" >
				1.买家申请退款
			</div>
			<div class="float-l" :class="[width,checkOrder.refund_status===1||checkOrder.refund_status===11?'bg-color':'']" 
				v-if="checkOrder.refund_status!==13&&checkOrder.refund_status!==3">			
				2.卖家处理退款申请
			</div>
			<div class="float-l" :class="[width,checkOrder.refund_status===4||checkOrder.refund_status===14||checkOrder.refund_status===5?'bg-color':'']"
				 v-if="checkOrder.refund_status!==13&&checkOrder.refund_status!==3">
				{{checkOrder.refund_type===1?"3.退款完成":"3.等待买家发货"}}
			</div>
			<div class="width_20 float-l"  :class="checkOrder.refund_status===15?'bg-color':''"  
				v-if="checkOrder.refund_type===2&&checkOrder.refund_status!==13">
				4.等待卖家收货
			</div>
			<div class="width_20 float-l" :class="checkOrder.refund_status===16||checkOrder.refund_status===17?'bg-color':''"  
				v-if="checkOrder.refund_type===2&&checkOrder.refund_status!==13">
				5.退款完成
			</div>
			<div class="bg-color width_50 float-l" v-if="checkOrder.refund_status===13||checkOrder.refund_status===3">
				2.商家已拒绝
			</div>
		</div>
		<div class="orderCon">
			<!--.................退款详情.................-->
			<div class="plate mt-40">
				<p class="color-3 f16 mb-20">退款详情</p>
				<div class="small_plate">
					<span class="color-7F f14 display-in">买&#12288;&#12288;家：</span>
					<em class="color-3 f14 display em">{{checkOrder.contact_name}}</em>
				</div>
				<div class="small_plate">
					<span class="color-7F f14 display-in">退款编号：</span>
					<em class="color-3 f14 display em">{{checkOrder.refund_order_no}}</em>
				</div>
				<div class="small_plate">
					<span class="color-7F f14 display-in">申请时间：</span>
					<em class="color-3 f14 display em">{{checkOrder.created_at}}</em>
				</div>
				<div class="small_plate">
					<span class="color-7F f14 display-in">退款方式：</span>
					<em class="color-3 f14 display em">
						{{checkOrder.refund_type===1?"仅退款":"退货退款"}}
					</em>
				</div>
				<div class="small_plate">
					<span class="color-7F f14 display-in">退款状态：</span>
					<em class="color-3 f14 display em" v-if="checkOrder.refund_type===1">
						{{checkOrder.refund_status===1?"等待商家同意":checkOrder.refund_status===2?"买家撤销退款":checkOrder.refund_status===3?
						"商家已拒绝":checkOrder.refund_status===4?"等待退款到账":checkOrder.refund_status===5?"已退款":"退款失败"}}	
					</em>
					<em class="color-3 f14 display em" v-if="checkOrder.refund_type===2">
						{{checkOrder.refund_status===11?"等待商家同意":checkOrder.refund_status===12?"买家撤销退款":checkOrder.refund_status===13?"商家已拒绝":checkOrder.refund_status===14?
						"等待买家发货":checkOrder.refund_status===15?"等待商家收货":checkOrder.refund_status===16?"等待退款到账":checkOrder.refund_status===17?"已退款":"退款失败"}}		
					</em>
				</div>
				<div class="small_plate">
					<span class="color-7F f14 display-in">退款金额：</span>
					<em class="color-3 f14 display em">{{checkOrder.refund_fee_yuan}}</em>
				</div>
			</div>
			<!--.................退款商品.................-->
			<div class="plate mt-40">
				<p class="color-3 f16 mb-20">退款原因</p>
				<div class="small_plate remark scrollbar">
					{{checkOrder.refund_remark}}
				</div>
			</div>
			<!--.................退款原因.................-->
			<div class="plate mt-40">
				<p class="color-3 f16 mb-20">退款商品</p>
				<productTable :productMess="checkOrder.products"></productTable>
			</div>
			<!--.................物流信息.................-->
			<div class="plate mt-40" v-if="checkOrder.refund_type===2&&(checkOrder.refund_status==15||checkOrder.refund_status===16)">
				<p class="color-3 f16 mb-20">物流信息</p>			
				<!--<LogisticsInfo :refund_order_id="checkOrder.refund_order_id" :express_code="checkOrder.refund_express_code"
				:express_number="checkOrder.refund_express_number" :shipping_time="checkOrder.shipping_time">
					
				</LogisticsInfo>-->
				<LogisticsInfo :refund_order_id="checkOrder.refund_order_id" :shipping_time="checkOrder.shipping_time" :refundInfo="refundInfo">
				 
					
				</LogisticsInfo>
			</div>
			<div class="clearfix mt-20" v-if="checkOrder.refund_status===1||checkOrder.refund_status===11">		
				<el-button class="store-button2 float-r ml-10" @click="disAgress">拒绝</el-button>
				<el-button class="store-button1 float-r" @click="agree">同意</el-button>				
			</div>
			<div class="clearfix">
				<el-button class="store-button3 mt-20 display-b float-r" @click="refConfirm"
					v-if="checkOrder.refund_status===16||checkOrder.refund_status===14||checkOrder.refund_status===15">
					确认收货
				</el-button>
			</div>

		</div>
	</div>
</template>

<script>
	import productTable from "@/components/order/productTable"
	import LogisticsInfo from "@/components/order/LogisticsInfo"
	import {refundAgree,refundDisagree,refundConfirm} from "@/api/order"
	export default{
		data(){
			return{
				
			}
		},
		props:{
//			退款订单信息
			checkOrder:{
				type:Object,
				default:function(){
					return {}
				}
			},
			refundInfo:{
				type:Object,
				default:function(){
					
				}
			}
		},
		computed:{
			width(){
				return this.checkOrder.refund_type===1?'width_33':this.checkOrder.refund_status===13||this.checkOrder.refund_status===3?'width_50':'width_20'
			},
		},
		components:{
			productTable,LogisticsInfo
		},
		methods:{
			//同意退款
			agree(){
				let refund_order_id=this.checkOrder.refund_order_id;
				//调用同意退款接口(接口未好)
				refundAgree(refund_order_id)
				.then(({data})=>{ 	
					this.$emit("DisAgreeAPI")
				})
				.catch(({response: {data}})=>{
					this.$message.error(data.errorcmt);
				})	
			},
			//不同意退款
			disAgress(){
				let refund_order_id=this.checkOrder.refund_order_id;
				//调用拒绝退款接口(接口未好)
    			refundDisagree(refund_order_id)
				.then(({data})=>{ 
					this.$emit("DisAgreeAPI")
				})
				.catch(({response: {data}})=>{
					this.$message.error(data.errorcmt);
				})	
			},
			//确认收货
			refConfirm(){
				let refund_order_id=this.checkOrder.refund_order_id;
				//调用确认收货接口(接口未好)
				refundConfirm(refund_order_id)
				.then(({data})=>{ 					
				})
				.catch(({response: {data}})=>{
					this.$message.error(data.errorcmt);
				})	
			}
		}
	}
</script>

<style scoped="scoped">
	.orderTitle{
		height: 40px;
		line-height: 40px;
	}
	.width_33{
		width: 33.33%;		
	}
	.width_20{
		width: 20%;
	}
	.width_50{
		width: 50%;
	}
	.width_33,.width_20,.width_50{
		text-align: center;
		color: #62778C;
		font-size: 14px;
	}
	.bg-color{
		background-color: #0070C9;
		color: #fff;
	}
	.small_plate span{
		width: 70px;
		text-align: right;
	}
	.small_plate{
		line-height: 24px;
	}
	em.em{
		font-style: normal;
	}
	.small_plate.remark{
		height: 100px;
		background-color: #FAFAFA;
		padding: 10px;
		color: #333333;
	}
</style>
<style>
	.orderRefund .el-table{
		color: #333;
	}
	.orderRefund th{
		background-color: #F0F4F7;
	}
	.orderRefund .el-table__header-wrapper thead div{
		color: #62778C;
	}
	.orderRefund .el-table__row{
		height: 86px;
	}
	.orderRefund .btn .el-button{
		padding-right:0;
		padding-left:0;
		width: 72px;
	}
</style>