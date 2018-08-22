<template>
	<div class="mallSetInfo">
		<mallSetHeader v-if="!isShow"></mallSetHeader>
		<div class="info_content clearfix" v-if="isShow">
			<router-link :to="{name:'mallMess'}" class="item-1 item-list fl">
				<div>
					<i class="iconfont icon-dianpuxinxi"></i>
					<span>商城信息</span>
				</div>
				<p><i class="iconfont icon-dianpuxinxi"></i></p>
			</router-link>
			<router-link :to="{name:'mallDecoration'}" class="item-list item-2 fl">
				<div>
					<i class="iconfont icon-dianpuzhuangxiu"></i>
					<span>商城装修</span>
				</div>
				<p><i class="iconfont icon-dianpuzhuangxiu"></i></p>
			</router-link>
			<router-link :to="{name:'mallcategory'}" class="item-list item-3 fl">
				<div>
					<i class="iconfont icon-shangpinfenlei"></i>
					<span>商城分类设置</span>
				</div>
				<p><i class="iconfont icon-shangpinfenlei"></i></p>
			</router-link>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
//	import mallSetHeader from "@/components/mallSet/mallSetHeader"
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
				return arr.length===3?true:false
			}
		},
//		components: {mallSetHeader}					
	}
</script>

<style>

</style>