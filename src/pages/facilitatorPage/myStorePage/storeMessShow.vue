<template>
	<div class="storeMess">
		<secNavbar></secNavbar>
		<!--............店铺时的店铺信息............-->
		<div class="messcon" >
			<div class="edit_button">
				<el-button class="store-button2 edit mb-10" @click="edit">
					<i class="iconfont icon-Rectangle f12"></i>
					<span class="font-b" >编辑信息</span>
				</el-button>
			</div>
			<!--............店铺信息............-->
			<storeMessVis :storeMess="storeMess" :seller="seller"  v-loading="loading"></storeMessVis>			
		</div>
	</div>
</template>

<script>
	import secNavbar from "@/components/myStore/secNavbar"
	import router from '@/router'
	import {getstoreMess} from "@/api/myStore"
	import * as links from "@/links/index"
	import * as types from "@/store/mutation-types"
	import storeMessVis from "@/components/myStore/storeMessVis"
	export default{
		name:"storeMess",
		data(){
			return {
				fromPath:"",
				storeMess:"",
				seller:true,//客服与客服电话显示与不显示
				loading:true,
			}
		},
		created(){
			let getter=this.$store.getters;
			let mall_id=getter.getMall_id;
			this.$store.dispatch("doGetUserMess");
			var AddSucess=getter.getAddSucess;
			if(AddSucess==true){
				this.HintInfo("添加成功")
		    	this.$store.commit(types.ADDSUCESS,false);
			}
			var KeepSucess=getter.getKeepSucess;
			if(KeepSucess==true){
				this.HintInfo("保存成功")
		       //解决不是保存页面跳进来也显示保存成功提示
		        this.$store.commit(types.KEEPSUCESS,false);	
			};						
			let shop_id={
				shop_id:getter.getShop_id
			};
			//获取店铺信息(创建店铺信息时就有shop_id);
			this.getstoreMess(shop_id)
		},
		components:{
			secNavbar,
			storeMessVis
		},
		methods:{
			HintInfo(data){
				this.$message({
		        	message: data,
		          	type: 'success'
		       });
			},
			addMess(){
				router.replace("/zxh/blank/addMess")
			},
			edit(){
				router.replace("/zxh/blank/addMess")
			},
			getstoreMess(shop_id){
				//获取店铺信息的方法
				getstoreMess(shop_id)
				.then(({data})=>{
					this.storeMess=data;
					//没有上传LOGO就显示默认LOGO；
					this.loading=false;
					if(this.storeMess.shop_logo===null){
						this.storeMess.shop_logo=links.IMG
					}
				})
				.catch(({response: {data}})=>{
					this.$message.error(data.errorcmt);
				})	
			}
		}
	}
</script>

<style lang="scss">
	.storeMess{
		margin-top: 120px;
		.el-menu-item{
			color: #7F7F7F;
		}
		.store_mess{
			color: #0070C9;
			font-weight: bold;
		}
		.edit_button{
			width: 1240px;
			margin:0 auto;
			text-align:left;
			.edit{
				width: 92px;
				height: 32px;
			}
		}
	}
</style>
