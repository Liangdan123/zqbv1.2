<template>
	<div class="storeMessageSub">
		<div class="storeInfo clearfix">
			<div class="plate  mr-20 ">
				<div class="border-b clearfix">
					<div class="float-l mb-10">
						<span class="color-7F f14">总销售额</span>
						<p class="color-3 font-b f24 mt-10">{{statistics.total_sell_money_yuan|fund}}</p>						
					</div>
					<svg width="48" height="48" class="float-r"><use xlink:href="#money"/></svg>													
				</div>
				<div>
					<p class="color-7F f14 mt-10">
						今日销售额&#8197;<span class="color-3">{{statistics.today_sell_money_yuan|fund}}</span>							
					</p>
				</div>
			</div>
			<div class="plate mr-20">
				<div class="border-b clearfix">
					<div class="float-l mb-10">
						<span class="color-7F f14">支付订单数</span>
						<p class="color-3 font-b f24 mt-10">{{statistics.total_pay_order_num}}</p>																
					</div>
					<svg width="48" height="48" class="float-r"><use xlink:href="#payOrder"/></svg>													
				</div>
				<div>
					<p class="color-7F f14 mt-10">
						今日订单数&#8197;<span class="color-3">{{statistics.today_pay_order_num}}</span>													
					</p>
				</div>
			</div>
			<div class="plate mr-20">
				<div class="border-b clearfix">
					<div class="float-l mb-10">
						<span class="color-7F f14">访问量</span>
						<p class="color-3 font-b f24 mt-10">{{statistics.total_pv_num}}</p>													
					</div>
					<svg width="48" height="48" class="float-r"><use xlink:href="#member"/></svg>													
				</div>
				<div>
					<p class="color-7F f14 mt-10">
						今日访客量&#8197;<span class="color-3">{{statistics.today_pv_num}}</span>												
					</p>
				</div>					
			</div>
			<div class="plate">
				<div class="border-b clearfix">
					<div class="float-l mb-10">
						<span class="color-7F f14">访客量</span>
						<p class="color-3 font-b f24 mt-10">{{statistics.total_uv_num}}</p>													
					</div>
					<svg width="48" height="48" class="float-r">
						<use xlink:href="#visitNum"  />
					</svg>
				</div>
				<div>
					<p class="color-7F f14 mt-10">
						今日访客数&#8197;<span class="color-3">{{statistics.today_uv_num}}</span>							
					</p>
				</div>	
			</div>
		</div>
		<!--.......................店铺信息.........................-->
		<div class="storeMess mt-20">
			<div class="storeMess_name clearfix">			
				<img :src="storeMessage.shop_logo" class="w-100">
				<p class="shop_name ">{{storeMessage.shop_name}}</p>
			</div>
			<div class="Shopowner_con clearfix">
				<div class="float-l right_con">
					<svg width="20" height="20"><use xlink:href="#Shopowner"/></svg>
					<span  class="color-3 f14 font-b">店长</span>
				</div>
				<p class="color-3 f12 float-l ">{{storeMessage.shopkeeper_name}}</p>
			</div>
			<div class="Shopowner_con clearfix">
				<div class="float-l right_con">
					<svg width="20" height="20"><use xlink:href="#phone_num"/></svg>
					<span  class="color-3 f14 font-b">联系方式</span>
				</div>
				<p class="color-3 f12 float-l ">{{storeMessage.shopkeeper_phone}}</p>
			</div>
			<div class="Shopowner_con clearfix ">
				<div class="float-l right_con">
					<svg width="20" height="20"><use xlink:href="#shop_hours"/></svg>
					<span  class="color-3 f14 font-b">营业时间</span>
				</div>
				<p class="color-3 f12 float-l ">
					{{storeMessage.shop_start}}<i class="line"></i>{{storeMessage.shop_end}}
				</p>
			</div>
			<div class="Shopowner_con clearfix ">
				<div class="float-l right_con">
					<svg width="20" height="20"><use xlink:href="#address"/></svg>
					<span  class="color-3 f14 font-b">门店地址</span>
				</div>
				<p class="color-3 f12 float-l ">{{storeMessage.address}}</p>
			</div>
			<!--....地图.....-->
			<storeMap :storeAddress="addressLocation" 
				class="mt-10"></storeMap>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			storeMessage:{
				type:Object,
				default:function(){
					return {}
				}
			},
			statistics:{
				type:Object,
				default:function(){
					return {}
				}
			}
		},
		filters:{
			fund(value){
				// 金额转换成数字和整数部分
                value = Number(value).toFixed(2).split('.');
                let value_int = Number(value[0]).toLocaleString();// 转换成金额形式
                return `￥ ${value_int}.${value[1]}`;
			}
		},
		computed:{
			addressLocation(){		
				let mess=this.storeMessage;
				return this.storeMessage&&(mess.province+mess.city+mess.area+mess.address)
			},
		},
	}
</script>

<style lang="scss">
	.storeMessageSub{
		.storeInfo{
			.plate{
				height: 102px;
			    float: left;
			    padding: 20px;
			    width: 245px;			   
			    border-radius: 2px;
			    background-color: #F9F9F9;
			    .border-b{
			    	border-bottom: 1px solid #D9D9D9;
			    }
			}
		}
		.storeMess{
			.storeMess_name{
				img{
					width: 104px;
					height: 104px;
				}
				.shop_name{
					display: inline-block;
					font-size: 16px;
					color: #333;
					margin-left: 10px;
				}
			}
			.Shopowner_con{
				margin-top: 20px;
				.right_con{
					width: 84px;
				    margin-right: 34px;
				    text-align: left;
				    svg{
				    	vertical-align: text-bottom;
				    }
				}
				p{
					line-height: 20px;
    				margin-top: 2px;
	    			.line{
						display: inline-block;
						width: 8px;
						height: 2px;
						background-color: #333;
						margin-bottom: 4px;
						margin-left: 6px;
						margin-right: 6px;
					}
				}
			}
			#mapContain{
				width: 790px;
				height: 460px;
			}
		}
	}

</style>