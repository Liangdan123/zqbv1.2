<template>
	<div class="secNavbar clearfix">
		<el-menu :default-active="$route.path" :router="true"
				mode="horizontal" class="clearfix">
 			<el-menu-item index="storeMessShow" class="store_mess">
 				店铺信息
 			</el-menu-item>
			<el-menu-item index="shop_decoration" class="store_decoration">
				店铺装修
			</el-menu-item>
			<el-menu-item index="freightSetting" class="freight_Setting">
				运费设置
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
import router from '@/router'
	export default{
		data(){
			return {
			}
		}
	}
</script>

<style lang="scss">
	.secNavbar{
		position:fixed;
		top: 60px;
		width: 100%;
		background: #FFFFFF;
		box-shadow: 0 2px 2px 0 rgba(51,51,51,0.10);
		background: #FFFFFF;
		z-index: 200;
		min-width: 1140px;
		.el-menu{
			width:236px;
			margin:0 auto;
			background: #FFFFFF;
			.el-menu-item{
				height:40px;
				line-height: 40px;
				font-size: 14px;
				border: none;
				padding: 0 10px;
				transition: all .3s;
			}
			.el-menu-item.is-active{
				color: #7F7F7F;
			}
		}
	}
</style>
