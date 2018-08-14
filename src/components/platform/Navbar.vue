<template>
	<div class="NavbarOrder clearfix">
		<el-menu :router="true" mode="horizontal" class="clearfix color-7F" @select="handleSelect">
			<el-menu-item index="allOrder" :class="{active:selected=='allOrder'}">
				加盟申请
			</el-menu-item>
			<el-menu-item index="" :class="{active:selected==''}">
				角色管理
			</el-menu-item>
			<el-menu-item index="" :class="{active:selected==''}">
				佣金设置
			</el-menu-item>
			<el-menu-item index="" :class="{active:selected==''}">
				权限设置
			</el-menu-item>
			<el-menu-item index="" :class="{active:selected==''}">
				消息设置
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
