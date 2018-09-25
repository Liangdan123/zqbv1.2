<template>
	<div class="withdrawalapply">
		<div class="nav-bar">
           <span @click="pageBack">资金管理</span>
           <i>></i>
           <span class="link-active">申请提现</span>
       </div>
       <div class="g-content">
       	
       </div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			pageBack() {
	            // 回到上一页
	            this.$router.back()
	        },
		}

	}
</script>

<style lang="scss">
	.withdrawalapply{
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