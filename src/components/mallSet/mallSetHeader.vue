<template>
	<div class="Navbar clearfix">
		<el-menu :router="true" mode="horizontal" class="clearfix" @select="handleSelect">
			<el-menu-item index="mallMess" :class="{active:selected=='mallMess'||selected=='mallMessSet'}">
				商城信息 
			</el-menu-item>
			<el-menu-item index="mallDecoration" :class="{active:selected=='mallDecoration'}">
				商城装修
			</el-menu-item>
			<el-menu-item index="mallcategory" :class="{active:selected=='mallcategory'}">
				商城分类设置
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
