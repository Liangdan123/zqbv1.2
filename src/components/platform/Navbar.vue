<template>
	<div class="NavbarOrder clearfix">
		<el-menu :router="true" mode="horizontal" class="clearfix color-7F" @select="handleSelect">
			<el-menu-item index="join" :class="{active:selected=='join'}">
				加盟申请
			</el-menu-item>
			<el-menu-item index="role" :class="{active:selected=='role'}">
				角色管理
			</el-menu-item>
			<el-menu-item index="commission" :class="{active:selected=='commission'}">
				佣金设置
			</el-menu-item>
			<el-menu-item index="permission" :class="{active:selected=='permission'}">
				权限设置
			</el-menu-item>
			<!--
					<el-menu-item index="" :class="{active:selected==''}">
						消息设置
					</el-menu-item> -->
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
