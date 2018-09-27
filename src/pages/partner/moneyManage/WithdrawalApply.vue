<template>
	<div class="parterwithdrawalapply">
		<div class="nav-bar">
           <span @click="pageBack">资金管理</span>
           <i>></i>
           <span class="link-active">申请提现</span>
      </div>
       <WithdrawalApply @JumpPage="JumpPage"></WithdrawalApply>
	</div>
</template>

<script>
	export default{
		components:{"WithdrawalApply":()=>import("@/components/moneyManage/WithdrawalApply")},
		methods:{
			pageBack() {
				// 回到上一页
				this.$router.back()
			},
			JumpPage(){
				this.pageBack();
			}
		}
	}
</script>

<style lang="scss">
	.parterwithdrawalapply{
		margin-top: 80px;
		.nav-bar{
			width: 1240px;
			margin-left: auto;
			margin-right: auto;
			margin-bottom: 20px;
			font-size: 16px;
    		color: #7F7F7F;
    		span{
    			&:first-child{
    				cursor: pointer;
    			}
    		}
    		.link-active{
    			color: #333;
    			font-weight: 700;
    		}
		}
	}
</style>