<template>
	<div class="LogisticsInfo">
		<div class="small_plate">
			<span class="color-7F f14 display-in">信息来源：</span>
			<em class="color-b f14 display" v-if="split_order_id!==undefined">
				{{logisticsInfo.express_name}} 
			</em>
			<em class="color-b f14 display" v-if="refund_order_id!==undefined">
				{{refundInfo.data.refund_express_name}} 
			</em>
		</div>
		<div class="small_plate">
			<span class="color-7F f14 display-in">快递单号：</span>
			<em class="color-3 f14 display" v-if="split_order_id!==undefined">
				{{logisticsInfo.express_number}}
			</em>
			<em class="color-3 f14 display" v-if="refund_order_id!==undefined">
				{{refundInfo.data.refund_express_number}} 
			</em>
		</div>
		<!--...................快递信息.............-->
		<div class="expressMess mt-10">
			<div class="express_plate">
				<b class="color-3 f14 ">{{shipping_time}}</b>
				<em class="color-3 f14 ml-10">
					{{split_order_id!==undefined?"卖家发货":"买家发货"}}
				</em>
			</div>
			<div v-if="split_order_id!==undefined">
				<div class="express_plate" v-for="item in logisticsInfo.data">
					<b class="color-3 f14 ">{{item.time}}</b>
					<em class="color-3 f14 ml-10">{{item.context}}</em>
				</div>
			</div>
			<div v-if="refund_order_id!==undefined">
				<div class="express_plate" v-for="item in refundInfo.data.data">
					<b class="color-3 f14 ">{{item.time}}</b>
					<em class="color-3 f14 ml-10">{{item.context}}</em>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { logisticsMess,refundLogMess} from "@/api/order"
	import { getExpress} from "@/api/order"
	export default{
		data(){
			return {
			}
		},
		props:["split_order_id","shipping_time","refund_order_id","logisticsInfo","refundInfo"],		
	}
</script>

<style scoped="scoped">
.small_plate{
	line-height: 20px;
} 
.small_plate span{
	width: 70px;
	text-align: right;
}
.small_plate em{
	font-style: normal;
}
.expressMess{
	background-color: #F9F9F9;
	padding:20px;
}
.express_plate{
	line-height: 30px;
}
.express_plate b{
	font-weight: normal;
}
.express_plate em{
	font-style: normal;
}
</style>