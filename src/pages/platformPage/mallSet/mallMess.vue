<template>
	<div class="mallMess info_content">
		<div class="edit_button" @click="edit">
			<el-button class="store-button2 edit mb-10" >
				<i class="iconfont icon-Rectangle f12"></i>
				<span class="font-b" >编辑信息</span>
			</el-button>
		</div>
		<!--.......................主要内容...............-->
		<div class="mallMessCon commonCon pt-20 pb-20">
			<div class="logoName mb-20">
				<img class="logo" :src="mallMess.mall_logo">
				<span class="ml-10">{{mallMess.mall_name}}</span>
			</div>
			<p class="hr"></p>
			<div class="Shopowner_con clearfix mt-20">
				<div class="float-l right_con">
					<svg width="20" height="20"><use xlink:href="#kefu"/></svg>
					<span  class="color-3 f14 font-b">商城客服</span>
				</div>
				<p class="color-3 float-l f14 color-3">{{mallMess.kefu_name}}</p>
			</div>
			<div class="Shopowner_con clearfix mt-20">
				<div class="float-l right_con">
					<svg width="20" height="20"><use xlink:href="#phone_num"/></svg>
					<span  class="color-3 f14 font-b">客服电话</span>
				</div>
				<p class="color-3 float-l f14 color-3">{{mallMess.mall_name}}</p>
			</div>
		</div>

	</div>
</template>

<script>
	import {getMallMess} from "@/api/mallSet"
	import router from '@/router'
	export default{
		name:"mallMess",
		data(){
			return{
				mallMess:{}
			}
		},
		created(){
			getMallMess()
			.then(({data})=>{
				this.mallMess=data
			})
			.catch(({response:{data}})=>{
				this.$message.error(data.errorcmt)
			});
			let hintMess=this.$store.getters.getmallMessExist;
			if(hintMess===true){//编辑商品时的保存成功
				this.$store.dispatch("doMallMessExist",false);
				this.$message({
					showClose: true,
		        	message: '保存成功',
		        	type: 'success'
				});
			}
		},
		methods:{
			edit(){
				router.replace("/mallZxh/mallSetInfo/mallMessSet")
			}
		}
	}
</script>

<style scoped="scoped">	
	.edit_button{
		width: 1240px;
		margin:0 auto;
		text-align:left;
	}
	.edit_button .edit{
		width: 92px;
		height: 32px;
	}
	.mallMessCon .logo{
		height: 104px;
		width: 104px;
	}
	.mallMessCon .hr{
		width: 400px;
		height: 1px;
		background-color: #E6E6E6;
	}
	.right_con{
		width: 84px;
	    margin-right: 28px;
	    text-align: left;
	}
	.right_con svg{
		vertical-align: bottom;
	}
</style>