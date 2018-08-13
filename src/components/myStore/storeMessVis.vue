<template>
	<div class="storeMess_con clearfix">
		<!--......左边......-->
		<div class="storeMess_left float-l">
			<div class="bg-f storeMess_name clearfix border-f4 transition">
				<div class="logo_limit float-l">
					<img :src="storeMess.shop_logo" class="w-100">
				</div>
				<p class="color-3 f16 float-l shop_name ">{{storeMess.shop_name}}</p>
			</div>
			<!--......店长......-->
			<div class="bg-f mt-10 Shopowner border-f4">
				<div class="Shopowner_con clearfix mb-10">
					<div class="float-l right_con">
						<svg width="20" height="20"><use xlink:href="#Shopowner"/></svg>
						<span  class="color-3 f14 font-b">店长</span>
					</div>
					<p class="color-3 f12 float-l ">{{storeMess.shopkeeper_name}}</p>
				</div>
				<div class="Shopowner_con clearfix">
					<div class="float-l right_con">
						<svg width="20" height="20"><use xlink:href="#phone_num"/></svg>
						<span  class="color-3 f14 font-b">联系方式</span>
					</div>
					<p class="color-3 f12 float-l ">{{storeMess.shopkeeper_phone}}</p>
				</div>
			</div>
			<!--......营业时间......-->
			<div class="bg-f mt-10 shop border-f4">
				<div class="Shopowner_con clearfix ">
					<div class="float-l right_con">
						<svg width="20" height="20"><use xlink:href="#shop_hours"/></svg>
						<span  class="color-3 f14 font-b">营业时间</span>
					</div>
					<p class="color-3 f12 float-l ">{{storeMess.shop_start}}<i class="line"></i>{{storeMess.shop_end}}</p>
				</div>
			</div>
			<!--......客服(单)......-->
			<div class="bg-f mt-10 Shopowner border-f4"  v-if="seller">
				<div class="Shopowner_con clearfix mb-10">
					<div class="float-l right_con">
						<svg width="20" height="20"><use xlink:href="#kefu"/></svg>
						<span  class="color-3 f14 font-b">客服</span>
					</div>
					<p class="color-3 f12 float-l ">{{storeMess.kefu_name}}</p>
				</div>
				<div class="Shopowner_con clearfix">
					<div class="float-l right_con">
						<svg width="20" height="20"><use xlink:href="#phone_num"/></svg>
						<span  class="color-3 f14 font-b">客服电话</span>
					</div>
					<p class="color-3 f12 float-l ">{{storeMess.kefu_phone}}</p>
				</div>
			</div>
		</div>
		<!--......右边......-->
		<div class="storeMess_right float-l border-f4 bg-f ">
			<div class="clearfix">
				<div class="shop_Icon float-l">
					<svg width="20" height="20"><use xlink:href="#address"/></svg>
					<span class="color-3 f14 font-b">门店地址</span>
				</div>
				<div class="address float-l color-3 f12">
					 {{storeMess.address}}
				</div>
			</div>
			<!--....地图.....-->
			<storeMap :storeAddress="addressLocation"></storeMap>
		</div>
	</div>
</template>

<script>
	import storeMap from "@/components/func/storeMap"
	import router from '@/router'
	export default{
		components:{
			storeMap
		},
		computed:{
			addressLocation(){		
				let mess=this.storeMess;
				return this.storeMess&&(mess.province+mess.city+mess.area+mess.address)
			},
		},
		props:["storeMess","seller"]
	}
	
</script>

<style lang="scss">
.storeMess_con{
	width: 1240px;
	margin:0 auto;
	/*............左边信息.............*/
	.storeMess_name{
		width: 358px;
		padding:20px;
		border-radius: 4px ;
		&:hover{
			box-shadow: 0px 0px 4px 0px rgba(51,51,51,.2);
		}
		.logo_limit{
			width: 104px;
			height: 104px;
			overflow: hidden;
			img{
				height: 100%;
				width: 100%;
			}
			
		}
		.shop_name{
			line-height: 104px;
			margin-left: 10px;
			font-weight: bold;
		}
	}
	.Shopowner{
		width: 358px;
		padding:20px;
		border-radius: 4px ;
		&:hover{
			box-shadow: 0px 0px 4px 0px rgba(51,51,51,.2);
		}
		.Shopowner_con{
			.right_con{
				width: 84px;
				margin-right:34px;
				text-align:left;
				svg{
					vertical-align: bottom;
				}
			}

			p{
				line-height: 20px;
				margin-top: 2px;
			}
		}
	}
	.shop{
		width: 358px;
		padding:20px;
		border-radius: 4px ;
		&:hover{
			box-shadow: 0px 0px 4px 0px rgba(51,51,51,.2);
		}
		.Shopowner_con{
			.right_con{
				width: 84px;
				margin-right:34px;
				text-align:left;
				svg{
					vertical-align: bottom;
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
	}
	/*............右边信息.............*/
	.storeMess_right{
		width: 788px;
		height: 488px;
		margin-left: 10px;
		padding: 20px;
		&:hover{
			box-shadow: 0px 0px 4px 0px rgba(51,51,51,.2);
		}
		.shop_Icon{
			svg{
				vertical-align: bottom;
			}
		}
		.address_area{
			margin-top: 2px;
			margin-left: 34px;
		}
		.address{
			margin-left: 20px;
			margin-top: 2px;
		}
		#mapContain{
			width: 790px;
			height: 460px;
			margin-top:10px;
		}
	}
}
</style>