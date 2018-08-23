<template>
	<div class="NavbarOrder">
		<el-menu :router="true" mode="horizontal" class="clearfix color-7F" @select="handleSelect">
			<el-menu-item index="mallMess" :class="{active:selected=='mallMess'}">
				商城信息
			</el-menu-item>
			<el-menu-item index="role" :class="{active:selected=='role'}">
				商城装修
			</el-menu-item>
			<el-menu-item index="commission" :class="{active:selected=='commission'}">
				商城分类设置
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
