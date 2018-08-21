<template>
	<div class="mallSetInfo">
		<mallMarketHeader v-if="!isShow"></mallMarketHeader>
		<div class="info_content clearfix" v-if="isShow">
			<router-link :to="{name:'memberCenter'}" class="item-1 item-list fl">
				<div>
					<i class="iconfont icon-huiyuanzhongxin"></i>
					<span>会员中心</span>
				</div>
				<p><i class="iconfont icon-huiyuanzhongxin" style="font-size: 110px;"></i></p>
			</router-link>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>

	import mallMarketHeader from "@/components/mallMarking/mallMarketHeader"
	export default {
		name: "mallMarkrtInfo",
		components: {mallMarketHeader},				
		data() {
			return {
			}
		},
		computed:{
			isShow(){
				let path=this.$route.fullPath;
				let arr=path.trim().split("/");
				return arr.length===3?true:false
			}
		},			
	}
</script>

<style>
</style>