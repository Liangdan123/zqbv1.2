<template>
	<div class="NavbarOrder">
		<el-menu :router="true" mode="horizontal" class="clearfix color-7F" @select="handleSelect">
			<el-menu-item index="discountSet" :class="{active:selected=='serverMemberCenter'}">
				会员中心
			</el-menu-item>
			<el-menu-item index="serverMemberDev" :class="{active:selected=='serverMemberDev'}">
				会员发展
			</el-menu-item>
			<el-menu-item index="serverNiche" :class="{active:selected=='serverNiche'}">
				商机
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
