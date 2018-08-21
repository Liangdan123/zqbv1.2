<template>
	<div class="freightSetting ">
		<secNavbar></secNavbar>
		<div class="content bg-f">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="运费模板设置" name="first">
					<freightTable></freightTable>
				</el-tab-pane>
				<el-tab-pane label="订单包邮设置" name="second">
					<orderShippingSet></orderShippingSet>
				</el-tab-pane>				
			</el-tabs>
		</div>
	</div>
</template>

<script>
	import secNavbar from "@/components/myStore/secNavbar"
	import freightTable from "@/components/myStore/freightTable"
	import orderShippingSet from "@/components/myStore/orderShippingSet"
	
	export default {
		data() {
			return {
				activeName:"first"
			}
		},
		components: {
			secNavbar,freightTable,orderShippingSet
		},
		methods:{
			handleClick(tab, event){
			},
		}
	}
</script>

<style lang="scss">
	.freightSetting {
		margin-top: 120px;
		.el-menu-item {
			color: #7F7F7F;
		}
		.freight_Setting {
			color: #0070C9;
			font-weight: bold;
		}
		.content {
			width: 1200px;
			padding: 20px;
			margin: 0 auto;
		}
	}
</style>