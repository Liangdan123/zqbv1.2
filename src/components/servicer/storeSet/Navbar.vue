<template>
	<div class="NavbarOrder clearfix">
		<el-menu 
			:router="true"
			mode="horizontal" 
			@select="handleSelect" 						
			class="clearfix color-7F">
 			<el-menu-item index="storeMessShow" 
 				:class="{active:selected=='storeMessShow'}">
 				
 				店铺信息
 			</el-menu-item>
			<el-menu-item 
				index="shop_decoration" 
				:class="{active:selected=='shop_decoration'}">
				店铺装修
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
  import navbar from "@/utils/navbar"
	export default {
		mixins: [navbar]
	}
</script>