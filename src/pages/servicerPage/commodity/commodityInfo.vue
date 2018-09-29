<template>
	<div>
		<Navbar v-if="!isShow"></Navbar>
		<div class="info_content clearfix" v-if="isShow">
			<router-link :to="{name:'pulishProduct'}" class="item-1 item-list fl">
				<div>
					<i class="iconfont icon-dianpuxinxi"></i>
					<span>发布商品</span>
				</div>
				<p><i class="iconfont icon-dianpuxinxi"></i></p>
			</router-link>
			<router-link :to="{name:'saleCommodity'}" class="item-list item-2 fl">
				<div>
					<i class="iconfont icon-sale"></i>
					<span>出售中的商品</span>
				</div>
				<p><i class="iconfont icon-sale"></i></p>
			</router-link>
			<router-link :to="{name:'warehouse'}" class="item-list item-3 fl">
				<div>
					<i class="iconfont icon-cangku"></i>
					<span>仓库中的商品</span>
				</div>
				<p><i class="iconfont icon-cangku"></i></p>
			</router-link>
			<router-link :to="{name:'history'}" class="item-4 item-list fl">
				<div>
					<i class="iconfont icon-lishishangpin"></i>
					<span>历史商品记录</span>
				</div>
				<p><i class="iconfont icon-lishishangpin"></i></p>
			</router-link>
			<router-link :to="{name:'category'}" class="item-list item-5 fl">
				<div>
					<i class="iconfont icon-shangpinfenlei"></i>
					<span>商品分类</span>
				</div>
				<p><i class="iconfont icon-shangpinfenlei"></i></p>
			</router-link>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: "commodityInfo",
		components: {
			"Navbar": () =>import("@/components/servicer/commodity/Navbar")				
		},
		computed: {
			isShow() {
				let path=this.$route.fullPath;
				console.log("path:",path)
				let arr=path.trim().split("/");
				console.log("arr:",arr.length)
				return arr.length===3?true:false
			}
		},
	}
</script>

<style>

</style>