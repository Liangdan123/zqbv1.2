<template>
	<div class="NavbarOrder">
		<el-menu :router="true" mode="horizontal" class="clearfix color-7F" @select="handleSelect">
			<el-menu-item index="discountSet" :class="{active:selected=='discountSet'}">
				优惠设置
			</el-menu-item>
			<el-menu-item index="memberCenter" :class="{active:selected=='memberCenter'}">
				会员中心
			</el-menu-item>
			<el-menu-item index="specialAd" :class="{active:selected=='specialAd'}">
				广告中心
			</el-menu-item>
				<el-menu-item index="demand" :class="{active:selected=='demand'}">
				需求列表
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
