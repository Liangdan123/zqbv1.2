<template>
	<div class="market clearfix">
		<el-menu :router="true" mode="horizontal" class="clearfix" @select="handleSelect">
			<el-menu-item index="Coupon" :class="{active:selected=='memberCenter'}">
				会员中心
			</el-menu-item>

		</el-menu>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				selected: ""
			}
		},
		created() {
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
	.market {
		position: fixed;
		top: 60px;
		width: 100%;
		background: #FFFFFF;
		box-shadow: 0 2px 2px 0 rgba(51, 51, 51, 0.10);
		background: #FFFFFF;
		z-index: 100;
		min-width: 1140px;
		.el-menu {
			width: 125px;
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