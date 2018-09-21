<template>
	<div class="orderIncome">
		<Navbar></Navbar>
		<div class="g-content">
			<el-tabs v-model="activeName">
				<el-tab-pane label="代理商" name="2">
			    </el-tab-pane>
			    <el-tab-pane label="合伙人" name="3">		    	
			    </el-tab-pane>
			    <el-tab-pane label="服务商" name="4">		    	
			    </el-tab-pane>
			</el-tabs>
			<roleTable :activeName="activeName"></roleTable>
		</div>
	</div>
</template>

<script>
	export default{
		name:"orderIncome",
		components:{
			"Navbar":()=>import("@/components/platform/fund/Navbar"),
			"roleTable":()=>import("@/components/platform/fund/roleTable")
		},
		data(){
			return{
				activeName:"2",
			}
		},
	}
</script>

<style lang="scss">
	.orderIncome{
		margin-top:120px;
	}
</style>