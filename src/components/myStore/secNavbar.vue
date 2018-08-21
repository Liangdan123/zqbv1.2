<template>
	<div class="NavbarOrder  clearfix">
		<el-menu :default-active="$route.path" :router="true"
				mode="horizontal" class="clearfix color-7F">
 			<el-menu-item index="storeMessShow" class="store_mess" :class="{active:selected=='storeMessShow'}">
 				店铺信息
 			</el-menu-item>
			<el-menu-item index="shop_decoration" class="store_decoration" :class="{active:selected=='shop_decoration'}">
				店铺装修
			</el-menu-item>
			<el-menu-item index="freightSetting" class="freight_Setting" :class="{active:selected=='freightSetting'}">
				运费设置
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
import router from '@/router'
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

