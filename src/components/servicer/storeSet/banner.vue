<template>
	<div class="decoration_banner">
		<el-carousel arrow="never" :interval="4000" height="320px" width="375px" indicator-position="none"> 		
			<el-carousel-item 
				v-for="(item,index) in banner" 
				:key="index"> 
				 	
				<img :src="item.banner_url" height="100%" width="100%">				
			</el-carousel-item>
		</el-carousel>
	</div>
</template>

<script>
	export default{
		props:{
			banner:{
				default:function(){
					return []
				}
			}
		}
	}
</script>

<style lang="scss">
	.decoration_banner{
		background-color:#E6E6E6;
		.el-carousel__item{
			display: block!important;
		}
	}
</style>