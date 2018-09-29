<template>
	<div class="pulishProduct">
		<productMess title="发布商品" buttonType="发布商品">
		
		</productMess>
	</div>
</template>

<script>
	import productMess from "@/components/servicer/sellerCenter/productMess"
	export default{
		data(){
			return{
				title:"发布商品"
			}
		},
	 	components:{productMess},	 	
	}
</script>

<style lang="scss">
	.pulishProduct{
		margin-top: 120px;
	}
</style>