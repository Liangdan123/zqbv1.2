<template>
	<div class="NavbarOrder">
		<el-menu :router="true" mode="horizontal" class="clearfix color-7F" @select="handleSelect">
			<el-menu-item index="extractCash" :class="{active:selected=='extractCash'}">
				提现申请
			</el-menu-item>
			<el-menu-item index="orderIncome" :class="{active:selected=='orderIncome'}">
				订单收入
			</el-menu-item>
			<el-menu-item index="memberIncome" :class="{active:selected=='memberIncome'}">
				会员发展收入
			</el-menu-item>
			<el-menu-item index="roleFund" :class="{active:selected=='roleFund'}">
				角色发展收入
			</el-menu-item>
			<el-menu-item index="platformFund" :class="{active:selected=='platformFund'}">
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
