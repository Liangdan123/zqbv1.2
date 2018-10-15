<template>
	<div class="NavbarOrder">
		<el-menu :router="true" mode="horizontal" class="clearfix color-7F" @select="handleSelect">
			<el-menu-item index="serverAllOrder" :class="{active:selected=='serverAllOrder'}">
				全部订单
			</el-menu-item>
			<el-menu-item index="nonPayment" :class="{active:selected=='nonPayment'}">
				未付款订单
			</el-menu-item>
			<el-menu-item index="UnshippedOrder" :class="{active:selected=='UnshippedOrder'}">
				未服务订单
			</el-menu-item>
			<el-menu-item index="PendingOrder" :class="{active:selected=='PendingOrder'}">
				服务中订单
			</el-menu-item>
			<el-menu-item index="CompletedOrder" :class="{active:selected=='CompletedOrder'}">
				已完成订单
			</el-menu-item>
			<el-menu-item index="CancelOrder" :class="{active:selected=='CancelOrder'}">
				取消的订单
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
