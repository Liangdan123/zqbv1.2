<template>
	<div class="memberCenter">
		<div class="content">
			<!--................累计金额.............-->
			<member :money="money"></member>
			<!--................会员管理与充值优惠管理切换.............-->
			<div class="content-con mt-20">
				<el-tabs v-model="activeName" >
				    <el-tab-pane label="会员管理" name="first">
				    	<tableArrow></tableArrow>
				    </el-tab-pane>
				</el-tabs>
			</div>
		</div>
	</div>
</template>

<script>
		import {getMemMoney} from "@/api/marketing"
		import tableArrow from "@/components/marketing/tableArrow"
		import member from "@/components/marketing/member"
		export default{
			components: {tableArrow,member},
			data(){
				return{
					money:{},
					activeName:"first",					
				}
			},
			created(){
				var mall_id=this.$store.getters.getMall_id;
				//调用获取会员统计数据API
				getMemMoney(mall_id)
				.then(({data})=>{
					this.money=data;					
				})
				.catch(({response: {data}})=>{
					 this.$message.error(data.errorcmt);
				})	
			}						
		}
</script>

<style scoped="scoped">
	.memberCenter{
		margin-top: 120px;
	}
	.content{
		box-sizing: border-box;
	    width: 1240px;
	    min-height: 204px;
	    border-radius: 4px;
	    margin: 0 auto;
	}
	.plate{
		float: left;
		padding: 20px;
		width: 360px;
		height: 102px;
		border-radius: 2px;
	}
	.border-b{
		border-bottom: 1px solid #F0F4F7;
	}
	.content-con{
		padding: 20px;
		background-color: #fff;
	}
</style>