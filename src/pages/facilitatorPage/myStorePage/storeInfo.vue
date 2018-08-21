<template>
	<div>
		<div class="info_content clearfix">
			<router-link :to="{name:'storeMessShow'}" class="item-1 item-list fl">
				<div>
					<i class="iconfont icon-dianpuxinxi"></i>
					<span>店铺信息</span>
				</div>
				<p><i class="iconfont icon-dianpuxinxi"></i></p>
			</router-link>
			<router-link :to="{name:'shop_decoration'}" class="item-2 item-list fl">
				<div>
					<i class="iconfont icon-dianpuzhuangxiu"></i>
					<span>店铺装修</span>
				</div>
				<p><i class="iconfont icon-dianpuzhuangxiu"></i></p>
			</router-link>
			<router-link :to="{name:'freightSetting'}" class="item-3 item-list fl">
				<div>
					<i class="iconfont icon-freight"></i>
					<span>运费设置</span>
				</div>
				<p><i class="iconfont icon-freight"></i></p>
			</router-link>
		</div>
	</div>
</template>

<script>
	import * as types from "@/store/mutation-types"
	import {getUserMess} from "@/api/myStore"	
	import router from '@/router'
	export default {
		name: "my_store",
		data() {
			return {
			}
		},
	}
</script>