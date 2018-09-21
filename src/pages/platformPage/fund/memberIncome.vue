<template>
	<div class="memberIncome">
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
			<memberTable :activeName="activeName"></memberTable>
		</div>
	</div>
</template>

<script>
	export default{
		name:"memberIncome",
		components:{
			"Navbar":()=>import("@/components/platform/fund/Navbar"),	
			"memberTable":()=>import("@/components/platform/fund/memberTable")
		},
		data(){
			return{
				activeName:"2",
			}
		},
	}
</script>

<style lang="scss">
.memberIncome{
	margin-top: 120px;
}
</style>