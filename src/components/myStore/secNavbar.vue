<template>
	<div class="Navbar clearfix">
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

