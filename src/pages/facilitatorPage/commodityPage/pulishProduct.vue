<template>
	<div class="pulishProduct">
		<Navbar></Navbar>
		<productMess :title="title"></productMess>
	</div>
</template>

<script>
	import Navbar from "@/components/commodity/Navbar"
	import productMess from "@/components/commodity/productMess"

	export default{
		data(){
			return{
				title:"发布商品"
			}
		},
		components:{
			Navbar,productMess
		},
	}
</script>

<style lang="scss">

</style>



