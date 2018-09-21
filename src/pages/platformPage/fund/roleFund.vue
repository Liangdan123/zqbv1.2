<template>
	<div class="roleFund">
		<Navbar></Navbar>
		<div class="g-content">
			<el-tabs v-model="activeName">
				<el-tab-pane label="代理商" name="2">
			    </el-tab-pane>
			</el-tabs>
			<memberTable :activeName="activeName"
				:memberShow="false"></memberTable>
		</div>		
	</div>
</template>

<script>
	export default{
		name:"roleFund",
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
	.roleFund{
		margin-top: 120px;
	}
</style>