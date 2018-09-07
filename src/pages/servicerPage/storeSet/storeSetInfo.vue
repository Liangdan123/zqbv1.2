<template>
	<div>
		<Navbar v-if="!isShow"></Navbar>
		<div class="info_content clearfix" v-if="isShow">
			<router-link :to="{name:'storeMessShow'}" class="item-1 item-list fl">
				<div>
					<i class="iconfont icon-dianpuxinxi"></i>
					<span>店铺信息</span>
				</div>
				<p><i class="iconfont icon-dianpuxinxi"></i></p>
			</router-link>
			<router-link :to="{name:'storedecoration'}" class="item-2 item-list fl">
				<div>
					<i class="iconfont icon-dianpuzhuangxiu"></i>
					<span>店铺装修</span>
				</div>
				<p><i class="iconfont icon-dianpuzhuangxiu"></i></p>
			</router-link>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	import Navbar from "@/components/servicer/storeSet/Navbar"
	import router from '@/router'
	export default {
		name: "my_store",
		components: {Navbar},
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