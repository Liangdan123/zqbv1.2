<template>
	<div class="specialAd">
		<div class="g-content">
			<el-tabs v-model="activeName">
			    <el-tab-pane label="广告设置" name="1">
						<setAd ></setAd>
			    </el-tab-pane>
			    <el-tab-pane label="添加广告" name="2">		    	
			    </el-tab-pane>
			    <el-tab-pane label="广告数据" name="3">
							<tableAd ></tableAd>
			    </el-tab-pane>
			</el-tabs>
		</div>
		
	</div>
</template>

<script>
	export default{
		components:{
			"tableAd":()=>import('@/components/platform/marketing/tableAd'),
			"setAd":()=>import('@/components/platform/marketing/setAd'),
		},
		data(){
			return{
				activeName:"3",
			}
		},
	}
</script>

<style lang="scss">
	.specialAd{
		margin-top: 120px;
	}
</style>