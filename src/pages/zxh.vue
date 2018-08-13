<template>
	<div class="zxh">
		<div class="navbar">
			<div  class="navbar-left display">
				<svg width="30" height="30"><use xlink:href="#zhixu" /></svg>
				<img src="../assets/image/weishangcheng.png" />
			</div>
	        <el-menu :default-active='$route.path' :router="true" mode="horizontal">
	        	<el-menu-item index="/zxh/sellerPage/sellerCenter" :class="{isActive:active=='sellerPage'}">
	        		<i></i>卖家中心
	        	</el-menu-item>
	        	
	            <el-menu-item index="/zxh/commodityPage/commodityInfo" :class="{isActive:active=='commodityPage'}">
	            	<i></i>商品管理
	            </el-menu-item>
	            
	            <el-menu-item index="/zxh/orderPage/allOrder" :class="{isActive:active=='orderPage'}"><i></i>订单管理</el-menu-item>
				<el-menu-item index="/zxh/marketingPage/marketInfo" :class="{isActive:active=='marketingPage'}"><i></i>营销管理</el-menu-item>

	            <el-menu-item index="/zxh/my_store_blank/storeInfo" :class="{isActive:active=='my_store_blank'}">
	            	<i></i>店铺设置
	            </el-menu-item>
	           	<!-- ................资金管理还没设计.............-->
	           	<el-menu-item index="/zxh/shop-money-management/" :class="{isActive:active=='shop-money-management'}">
	        		<i></i>资金管理
	        	</el-menu-item>
	        	
	        </el-menu>
	       	<div class="cont-navbar-right clearfix">
				<div class="navbar-right">
					<i class="iconfont icon-OvalCopy heard"></i>
				</div>
				<div class="pos-a loginOut">
					<div class="clearfix pb-20 plate">
						<div class="hearder float-l"><i class="iconfont icon-OvalCopy"></i></div>
						<div class="float-l f14 color-3 ml-10 userName">{{userName||email}}</div>
					</div>	
					<div class="exitLogon cursor" @click="loginOut">
						<div class="clearfix hoverBg">
							<i class="iconfont icon-shanchu1 float-l"></i>
							<span class="float-l f14 color-3">退出登录</span>
						</div>

					</div>
				</div>
			</div>
		</div>
		<el-row class="clearfix">
			<transition name="el-fade-in" mode="out-in">
				<router-view></router-view>
			</transition>
		</el-row>

		<!--....只是单纯让change_my_store起作用...-->
		<div v-show="hide">{{change_my_store}}</div>
	</div>
</template>

<script>
	import router from '@/router'
	export default{
		name:"navbar",
		data(){
			return {
				hide:false,
				active:""
			}
		},
		computed:{
			change_my_store(){
				var path=this.$route.fullPath;
				var arr=path.trim().split("/");
				if(arr.length!=0&&arr[1]!="zxh"){
					return
				}
				return this.active=arr[2]
			},
			userName(){
				return this.$store.getters.getUserName
			},
			email(){
				return this.$store.getters.getEmail
			}
		},
		methods:{
			//退出登录
			loginOut(){
				this.$store.dispatch('doLogout');
			}
		}
	}
</script>

<style lang="scss">
	.zxh{
		width:100%;
		.navbar{
			position:fixed;
			z-index: 800;
			width:100%;
			background:#191919;
			height:60px;
			min-width:1240px;
			.navbar-left{
				float: left;
				margin-left: 20px;
				margin-top: 15px;
				svg{
					vertical-align:middle;
				}
				img{
					width:96px;
					margin-left:20px;
				}
			}
			.el-menu{
				background-color: transparent;
				position: absolute;
				left: 50%;
				margin-left: -252px;
				.el-menu-item{
					height: 60px;
					line-height:60px;
					color: rgba(255,255,255,.6);
					padding:0 0px;
					margin:0 10px;
					font-size:16px;
					border:none;
					position:relative;
					&:hover{
						background-color: transparent;
						color:rgba(255,255,255,1);
					}
					i{
						position:absolute;
						left: 50%;
						bottom: 5px;
						height: 2px;
						width: 0;
						background-color: #008FF2;
						transition:all .3s;
						transform: translateX(-50%) translateY(-50%);
					}
				}
				.el-menu-item.isActive{
					color:rgba(255,255,255,1);
					font-weight: bold;
					i{
						width: 100%;
					}
				}
			}
			.cont-navbar-right{
				float: right;
				margin-right: 20px;
				margin-top: 18px;
				height: 42px;
				padding-left: 10px;
				background-color: #191919;		
				&:hover{
					.loginOut{
						opacity: 1;
						visibility:visible;
					}
				}
				.loginOut{
					width: 172px;
					padding: 24px 24px 10px;
					background-color: #fff;
					top: 60px;
					right: 20px;
					box-shadow: 0 0 4px 0 rgba(51, 51, 51, 0.2);
					opacity: 0;	
					visibility: hidden;
					-webkit-transition: opacity linear .2s;
    				transition: opacity linear .2s;		
    				z-index:3000;   				
					.plate{
						border-bottom:1px solid #F0F4F7;
						.hearder{
							height: 32px;
							width: 32px;
							background-color: #7F7F7F;
							border-radius: 2px;
							line-height:32px;
							text-align: center;
							i{
								color: #D6D6D6;
								font-size: 24px;							
							}
						}
						.userName{
							line-height: 32px;
							width: 130px;
						    white-space: nowrap;
						    text-overflow: ellipsis;
						    overflow: hidden;
						}
					}
					.exitLogon{
						padding-top: 24px;
						padding-bottom: 10px;
						line-height: 32px;
						.hoverBg{
							&:hover{
								background-color:#CCEBFF ;
							}
							i{
								width: 32px;
								height: 32px;
								color: #333;
								font-size: 12px;
								text-align: center;
							}
							span{
								margin-left: 10px;
							}
						}

					}
				}
				.navbar-right{
					width:24px;
					height:24px;
					border-radius: 2px;
					background: #8C8C8C;
					text-align:center;
					line-height:24px;
					i{
						color:#fff;
						font-size:18px;
					}
				}
			}

		}

	}
</style>
