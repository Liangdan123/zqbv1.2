<template>
	<div class="NavbarOrder clearfix">
		<el-menu :router="true" mode="horizontal" class="clearfix color-7F" @select="handleSelect">
			<el-menu-item index="allOrder" :class="{active:selected=='allOrder'}">
				全部订单
			</el-menu-item>
			<el-menu-item index="UnshippedOrder" :class="{active:selected=='UnshippedOrder'}">
				未发货订单
			</el-menu-item>
			<el-menu-item index="PendingOrder" :class="{active:selected=='PendingOrder'}">
				已发货订单
			</el-menu-item>
			<el-menu-item index="CompletedOrder" :class="{active:selected=='CompletedOrder'}">
				已完成订单
			</el-menu-item>
			<el-menu-item index="refundOrder" :class="{active:selected=='refundOrder'}">
				退款售后订单
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

