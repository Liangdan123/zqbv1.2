<template>
	<div class="MallNavbarOrder clearfix">
		<el-menu :router="true" mode="horizontal" class="clearfix color-7F" @select="handleSelect">
			<el-menu-item index="mallAllOrder" :class="{active:selected=='mallAllOrder'}">
				全部订单
			</el-menu-item>
			<el-menu-item index="mallNonPayment" :class="{active:selected=='mallNonPayment'}">
				待付款订单
			</el-menu-item>
			<el-menu-item index="mallUnshipOrder" :class="{active:selected=='mallUnshipOrder'}">
				待发货订单
			</el-menu-item>
			<el-menu-item index="mallPendingOrder" :class="{active:selected=='mallPendingOrder'}">
				已发货订单
			</el-menu-item>
			<el-menu-item index="mallCompletedOrder" :class="{active:selected=='mallCompletedOrder'}">
				已完成订单
			</el-menu-item>
			<el-menu-item index="mallCancelOrder" :class="{active:selected=='mallCancelOrder'}">
				取消的订单
			</el-menu-item>
			<el-menu-item index="mallRefundOrder" :class="{active:selected=='mallRefundOrder'}">
				退款售后订单
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
	export default {
		name: "navbar",
		data() {
			return {
				selected: ""
			}
		},
		created(){
			this.selected = this.$route.name;			
		},
		methods: {
			handleSelect(index) {
				this.selected = index;
			}
		}
	}
</script>
<style lang="scss">
	.MallNavbarOrder {
		position: fixed;
		top: 60px;
		width: 100%;
		background: #FFFFFF;
		box-shadow: 0 2px 2px 0 rgba(51, 51, 51, 0.10);
		background: #FFFFFF;
		z-index: 100;
		min-width: 1140px;
		.el-menu {
			width:640px;
			margin: 0 auto;
			background: #FFFFFF;
			.el-menu-item {
				height: 40px;
				line-height: 40px;
				font-size: 14px;
				border: none;
				padding: 0 10px;
				transition: all 0.3s;
				&.active {
					color: #0070C9;
				}
			}
		}
	}
</style>
