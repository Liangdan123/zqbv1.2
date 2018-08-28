<template>
	<div class="NavbarOrder">
		<el-menu :router="true" mode="horizontal" class="clearfix color-7F" @select="handleSelect">
			<el-menu-item index="discountSet" :class="{active:selected=='discountSet'}">
				优惠设置
			</el-menu-item>
			<el-menu-item index="mallDecoration" :class="{active:selected=='mallDecoration'}">
				会员中心
			</el-menu-item>
			<el-menu-item index="mallcategory" :class="{active:selected=='mallcategory'}">
				广告中心
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
