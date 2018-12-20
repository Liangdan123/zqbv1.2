<template>
	<div class="NavbarOrder clearfix">
		<el-menu 
			:router="true"
			mode="horizontal" 
			@select="handleSelect" 						
			class="clearfix color-7F">
 			<el-menu-item index="storeMessShow" 
 				:class="{active:selected=='storeMessShow'||selected=='editStoreMessage'}">				
 				店铺信息
 			</el-menu-item>
			<el-menu-item 
				index="storedecoration" 
				:class="{active:selected=='storedecoration'}">
				店铺装修
			</el-menu-item>
			<el-menu-item 
				index="accountAdm" 
				:class="{active:selected=='accountAdm'}">
				账号管理
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