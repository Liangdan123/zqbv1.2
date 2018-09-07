<template>
	<div class="mallSetInfo">
		<Navbar v-if="!isShow"></Navbar>
		<div class="info_content clearfix" v-if="isShow">
			<router-link :to="{name:'serverMemberCenter'}" class="item-1 item-list fl">
				<div>
					<i class="iconfont icon-huiyuanzhongxin"></i>
					<span>会员中心</span>
				</div>
				<p><i class="iconfont icon-huiyuanzhongxin"></i></p>
			</router-link>
			<router-link :to="{name:'serverMemberDev'}" class="item-list item-2 fl">
				<div>
					<i class="iconfont icon-huiyuanzhongxin"></i>
					<span>会员发展</span>
				</div>
				<p><i class="iconfont icon-huiyuanzhongxin"></i></p>
			</router-link>
			<router-link :to="{name:'serverNiche'}" class="item-list item-3 fl">
				<div>
					<i class="iconfont icon-guanggaozhongxin"></i>
					<span>商机</span>
				</div>
				<p><i class="iconfont icon-guanggaozhongxin"></i></p>
			</router-link>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	import Navbar from "@/components/servicer/marketing/Navbar"
	export default {
		name: "mallSetInfo",
		data() {
			return {
			}
		},
		computed:{
			isShow(){
				let path=this.$route.fullPath;
				let arr=path.trim().split("/");
				console.log("arr.length",arr.length)
				return arr.length===3?true:false
			}
		},
		components: {Navbar}					
	}
</script>

<style>

</style>