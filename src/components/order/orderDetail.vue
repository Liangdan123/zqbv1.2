<template>
	<div class="orderDetai clearfix">
		<div class="plate mb-40">
			<div class="small_plate">
				<span class="color-7F f14 display-in">订单编号：</span>
				<em class="color-3 f14 display em">{{checkOrder.split_no}}</em>
			</div>
			<div class="small_plate">
				<span class="color-7F f14 display-in">订单状态：</span>				
				<em class="color-3 f14 display em" >
					{{checkOrder.status===1?"未付款":checkOrder.status===2?"未服务":checkOrder.status===3?"已发货":checkOrder.status===4?					
					"交易完成":checkOrder.status===5?"交易已取消":checkOrder.status===6?"交易已关闭":"交易已删除"}}
				</em>
			</div>
			<div class="small_plate " :class="checkOrder.status!==1&&checkOrder.status!==5&&checkOrder.status!==6?'mb-20':''">
				<span class="color-7F f14 display-in">创建时间：</span>
				<em class="color-3 f14 display em">{{checkOrder.created_at}}</em>
			</div>
			<!--.............未付款时不显示..............-->
			<div class="small_plate  mb-20" v-if="checkOrder.status===1||checkOrder.status===5||checkOrder.status===6?false:true">
				<span class="color-7F f14 display-in">付款方式：</span>
				<em class="color-3 f14 display em">
					{{pay_info.pay_type==="weixin"?"微信支付":"余额支付"}}
				</em>
			</div>
			<div class="small_plate">
				<span class="color-7F f14 display-in">商品合计：</span>
				<em class="color-3 f14 display em">					
					{{(pay_info.total_product_fee_yuan||0).toFixed(2)}}
				</em>
			</div>
			<div class="small_plate">
				<span class="color-7F f14 display-in">运费合计：</span>
				<em class="color-3 f14 display em">
					{{(pay_info.total_shipping_fee_yuan||0).toFixed(2)}}
				</em>
			</div>
			<div class="small_plate">
				<span class="color-7F f14 display-in">优惠券：</span>
				<em class="color-3 f14 display em">
					{{(pay_info.total_coupon_yuan||0).toFixed(2)}}
				</em>
			</div>
			<div class="small_plate">
				<span class="color-7F f14 display-in">订单合计：</span>
				<em class="color-3 f14 display em">
					{{(pay_info.pay_fee_yuan||0).toFixed(2)}}
				</em>
			</div>			
		</div>
		<!--.................订单进度模块.................-->
		<div class="plate mb-40" v-if="type=='订单详情'">
			<p class="color-3 f16 font-b mb-20">订单进度</p>
			<div class="progress clearfix">
				<div class="progress_sec float-l">
					<p class="circleLine ml-20">
						<span class="circle bg-b"></span>
						<b class="line bg-b"></b>
					</p>
					<div class="progress_txt color-b">
						<span class="f14">创建订单</span><br>
						<span class="f14">{{checkOrder.created_at}}</span><br>
					</div>
				</div>
				<div class="progress_sec float-l mr_fu_12">
					<p class="circleLine ml-20">
						<span class="circle bg-b"></span>
						<b class="line" :class="checkOrder.status===1?'bg-9e':'bg-b'" v-if="checkOrder.status!==5&&checkOrder.status!==6"></b>
					</p>										
					<div class="progress_txt color-b mr_fu_12">
						<span class="f14">
							{{checkOrder.status===5?"买家取消订单":checkOrder.status===6?"买家未付款订单自动取消":"等待买家付款"}}
						</span><br>
						<span class="f14" v-if="checkOrder.status===1?false:true">
							{{checkOrder.status===5?checkOrder.cancel_time:checkOrder.status===6?checkOrder.close_time:checkOrder.pay_time}}
						</span><br>
					</div>
				</div>
				<div class="progress_sec float-l mr_fu_12" v-if="checkOrder.status!==5&&checkOrder.status!==6">
					<p class="circleLine ml-20">
						<span class="circle" :class="checkOrder.status===1?'bg-9e':'bg-b'"></span>
						<b class="line" :class="checkOrder.status!==1&&checkOrder.status!==2?'bg-b':'bg-9e'"></b>
					</p>
					<div class="progress_txt mr_fu_12">
						<span class="f14" :class="checkOrder.status===1?'color-6':'color-b'">
						等待卖家服务
						</span><br>
						<span class="f14 color-b " v-if="checkOrder.status!==1&&checkOrder.status!==2">
							{{checkOrder.shipping_time}}
						</span><br>
					</div>
				</div>
				<div class="progress_sec float-l mr_fu_12" v-if="checkOrder.status!==5&&checkOrder.status!==6">
					<p class="circleLine ml-20">
						<span class="circle" :class="checkOrder.status!==1&&checkOrder.status!==2?'bg-b':'bg-9e'"></span>
						<b class="line" :class="checkOrder.status===4?'bg-b':'bg-9e'"></b>
					</p>
					<div class="progress_txt mr_fu_12">
						<span class="f14" :class="checkOrder.status!==1&&checkOrder.status!==2?'color-b':'color-6'">
							等待买家验收
						</span><br>
						<span class="f14 color-b" v-if="checkOrder.status===4">
							{{checkOrder.confirm_time}}
						</span><br>
					</div>
				</div>
				<div class="progress_sec float-l mr_fu_12" v-if="checkOrder.status!==5&&checkOrder.status!==6">
					<p class="circleLine ml-20">
						<span class="circle" :class="checkOrder.status===4?'bg-b':'bg-9e'"></span>
					</p>
					<div class="progress_txt mr_fu_12">
						<span class="f14" :class="checkOrder.status===4?'color-b':'color-6'">完成订单</span><br>
						<span class="f14 color-b" v-if="checkOrder.status===4">
							{{checkOrder.confirm_time}}
						</span><br>	
					</div>
				</div>
			</div>
		</div>
		<!--.................买家信息模块.................-->
		<div class="plate  mb-40">
			<p class="color-3 f16 font-b mb-20">买家信息</p>
			<div class="small_plate">
				<span class="color-7F f14 display-in">买&#12288;&#12288;家：</span>
				<em class="color-3 f14 display em">
					{{shipping_info.contact_name}}
				</em>
			</div>
			<div class="small_plate">
				<span class="color-7F f14 display-in">联系方式：</span>
				<em class="color-3 f14 display em">
					{{shipping_info.contact_phone}}
				</em>
			</div>
			<div class="small_plate" v-if="checkOrder.distribute_type==='self'?false:true">
				<span class="color-7F f14 display-in">买家地址：</span>
				<em class="color-3 f14 display em" >
					{{shipping_info.province}}&#12288;{{shipping_info.city}}&#12288;{{shipping_info.area}}
					&#12288;{{shipping_info.address}}
				</em>
			</div>
		</div>
		<!--.................商品信息模块（订单详情，发货）.................-->
		<div class="plate mb-40">
			<p class="color-3 f16 font-b mb-20">商品信息</p>
			<productTable :productMess="checkOrder.order_products" :type='type' @select='handleSelectionChange' :status='checkOrder.status'></productTable>
			<div class="float-r btn mt-20" v-if="type==='订单服务'&&checkOrder.status==2">
				<el-button class="store-button1" @click="sureSetPro">开始服务</el-button>
				<el-button class="store-button2" @click="cancelPro">取消</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import {setProduct} from "@/api/order"
	import productTable from "@/components/order/productTable"
	export default{
		data(){
			return{
				expressMess:[],
				express_code:"",
				order_products:[]
			}
		},
		props:{
//			订单信息
			checkOrder:{
				type:Object,
				default:function(){
					return {}
				}
			},
//			判断是发货还是订单详情弹框
			type:{
				type:String,
				default:function(){
					return ""
				}
			},
			pay_info:{
				type:Object,
				default:function(){
					return {}
				}
			},
			shipping_info:{
				type:Object,
				default:function(){
					return {}
				}
			}
		},
		components:{
			productTable
		},
		methods:{
			//发货表单
			handleSelectionChange(val){
				this.order_products=val;
			},
			PromptMess(data,type){
				this.$message({
		        	message: data,
		        	type: type,
		        	showClose:true
		        });
			},
			//确定发货
			sureSetPro(){
				//点击时候订单的长度
				let choiceLen=this.order_products.length;
				if(choiceLen.length==0){
					this.$message.success("未选中任何商品");
					return;		
				}
				//原订单的长度
				let orderLen=this.checkOrder.order_products.length;
				//获取订单商品数组
				let order_products=[];
				if(this.order_products.length===0){
					order_products=this.checkOrder.order_products.map(item=>({order_product_id:item.order_product_id}));
				}else{
					order_products=this.order_products.map(item=>({order_product_id:item.order_product_id}))
				}
				let setProMess={
					split_order_id:this.checkOrder.split_order_id,
					order_products
				};
				//卖家发货API
				setProduct(setProMess)
				.then(({data})=>{		
					this.$message.success("发货成功")				
					this.$emit("closeBox",true)
				}).catch(()=>{
					this.$emit("closeBox",false);
				})
			},
			cancelPro(){
				this.$emit("closeBox",false)
			}
		}
	}
</script>

<style scoped="scoped">
	em.em{
		font-style: normal;
	}
	.small_plate span{
		width: 70px;
		text-align: right;
	}
	.small_plate{
		line-height: 20px;
	}
	.progress .circle{
		display: inline-block;
		height: 8px;
		width: 8px;
		border-radius: 60%;
		margin-right: 4px;
	}
	.progress .line{
		display: inline-block;
		height: 2px;
		width: 160px;
		margin-bottom: 3px;
	}
	.progress_txt{
		line-height: 20px;
		width:86px;
		text-align: center;
	}
	.mr_fu_12{
		margin-left: -12px;
	}
	.bg-9e{
		background-color: #E9EEF2;
	}
	.color-6{
		color: #62778C;
	}
	.orderDetai .el-table__row{
		height: 86px;
	}
	.product_name{
		color: #333;
		display: inline-block;
		overflow: hidden;
		width: 84px;
    	text-overflow: ellipsis;
    	white-space: nowrap;
	}
	.spec_name{
		width: 84px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.spec_name span{
		margin-left: 4px;
	}
</style>
<style>
	.orderDetai .el-table{
		color: #333;
	}
	.orderDetai th{
		background-color: #F0F4F7;
	}
	.orderDetai .el-table__header-wrapper thead div{
		color: #62778C;
	}
	.orderDetai .el-table__row{
		height: 86px;
	}
	.orderDetai .el-select{
		width: 160px;
	}
	.orderDetai .el-input.expressNum{
		width: 320px;
	}
	.orderDetai .el-select .el-input__inner,.orderDetai .el-input.expressNum .el-input__inner{
		height: 32px;
		line-height: 32px;
		border-radius: 2PX;
	}
	.orderDetai .btn .el-button{
		padding-right:0;
		padding-left:0;
		width: 72px;
	}
</style>