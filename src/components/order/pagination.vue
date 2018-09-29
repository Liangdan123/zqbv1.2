<template>
	<div>
		<el-pagination :total="pageData.total" 
			:current-page.sync="pageMess.page" 
			:page-size="pageMess.per_page"  
			@current-change="handleCurrentChange" 
			layout="total, prev, pager, next">
			
		</el-pagination> 
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		props:{
			//获取总数据
			pageData:{
				type:Object,
				default:function(){
					return {}
				}
			},			
			pageMess:{//获取当前页码，一般是搜索条件，传给后台的数据
				type:Object,
				default:function(){
					return {}
				}
			}
		},
		methods:{
			handleCurrentChange(val){
				this.$emit("handleCurrent",val)
			}
		}
	}
</script>

<style>
</style>