<template>
	<div class="discountSet">
		<div class="g-content">
			<div class="gift clearfix">
				<span class="gift-txt">1.赠送金额，按购买金额放大相应的倍数</span>
				<el-button class="store-button1 gift-btn">设置</el-button>
			</div>
			<div class="gift clearfix">
				<span class="gift-txt">2.抵扣金额，按百分比设置</span>
				
			</div>
		</div>
	</div>
</template>

<script>
	import {getCouponConfig} from "@/api/platform"
	export default{
		data(){
			return{
				loading:true,
				discoutData:{},
			}
		},
		created(){
			getCouponConfig()
			.then(({data})=>{
				this.discoutData=data
			})
			.catch(({reponse:{data}})=>{
				this.$message.error(data.errorcmt);
			})

		},
	}
</script>


<style lang="scss">
	.discountSet{
		>.g-content{
			margin-top: 120px;
			.gift{
				.gift-txt{
					float: left;
					color: #333;
					font-size: 12px;
					font-weight: bold;
					line-height: 32px;
				}
				.gift-btn{
					float: right;
				}
			}
		}
	}
</style>
