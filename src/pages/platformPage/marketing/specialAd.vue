<template>
	<div class="specialAd">
		<div class="g-content">
			<el-tabs v-model="activeName" @tab-click="handleClick">
			    <el-tab-pane label="广告一" name="1">
			    </el-tab-pane>
			    <el-tab-pane label="广告二" name="2">		    	
			    </el-tab-pane>
			    <el-tab-pane label="广告三" name="3">
			    </el-tab-pane>
			    <el-tab-pane label="广告四" name="4">		    	
			    </el-tab-pane>
			    <el-tab-pane label="广告五" name="5">		    	
			    </el-tab-pane>
			</el-tabs>
			<tableAd :activeName="activeName"></tableAd>
		</div>
		
	</div>
</template>

<script>
	import tableAd from "@/components/platform/marketing/tableAd"
	export default{
		components:{tableAd},
		data(){
			return{
				activeName:"1",
			}
		},
		methods:{
			handleClick(){
				
			}
		}
	}
</script>

<style lang="scss">
	.specialAd{
		margin-top: 120px;
	}
</style>