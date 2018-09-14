<template>
	<div class="productMess">
		<div class="g-content">
			<p class="productTitle">{{title}}</p>
		</div>
		<el-form>
		
		</el-form>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		props:{
			title:{
				default:function(){
					return "编辑商品"
				}
			}
		}
	}
</script>

<style lang="scss">
	.productMess{
		.g-content{
			.productTitle{
				color: #333;
				font-size: 20px;
				font-weight: bold;
				margin-bottom: 40px
			}
		}
	}
</style>