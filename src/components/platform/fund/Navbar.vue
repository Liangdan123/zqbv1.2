<template>
	<div class="NavbarOrder">
		<el-menu :router="true" mode="horizontal" class="clearfix color-7F" @select="handleSelect">
			<el-menu-item index="extractCash" :class="{active:selected=='extractCash'}">
				提现申请
			</el-menu-item>
			<el-menu-item index="role" :class="{active:selected=='role'}">
				订单收入
			</el-menu-item>
			<el-menu-item index="commission" :class="{active:selected=='commission'}">
				会员发展收入
			</el-menu-item>
			<el-menu-item index="permission" :class="{active:selected=='permission'}">
				角色发展收入
			</el-menu-item>
			<el-menu-item index="message" :class="{active:selected=='message'}">
				平台收入
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
