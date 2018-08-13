<template>
	<div class="NavbarOrder clearfix">
		<el-menu :router="true" mode="horizontal" class="clearfix color-7F" @select="handleSelect">
			<el-menu-item index="allOrder" :class="{active:selected=='allOrder'}">
				全部订单
			</el-menu-item>
			<!--<el-menu-item index="nonPayment" :class="{active:selected=='nonPayment'}">
				未付款订单
			</el-menu-item>-->
			<el-menu-item index="UnshippedOrder" :class="{active:selected=='UnshippedOrder'}">
				未发货订单
			</el-menu-item>
			<el-menu-item index="PendingOrder" :class="{active:selected=='PendingOrder'}">
				已发货订单
			</el-menu-item>
			<el-menu-item index="CompletedOrder" :class="{active:selected=='CompletedOrder'}">
				已完成订单
			</el-menu-item>
			<!--<el-menu-item index="cancelledOrder" :class="{active:selected=='cancelledOrder'}">
				取消的订单
			</el-menu-item>-->
			<el-menu-item index="refundOrder" :class="{active:selected=='refundOrder'}">
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
	.NavbarOrder {
		position: fixed;
		top: 60px;
		width: 100%;
		background: #FFFFFF;
		box-shadow: 0 2px 2px 0 rgba(51, 51, 51, 0.10);
		background: #FFFFFF;
		z-index: 100;
		min-width: 1140px;
		.el-menu {
			width:462px;
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
