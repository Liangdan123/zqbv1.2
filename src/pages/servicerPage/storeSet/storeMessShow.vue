<template>
	<div class="storeMessShow">
		<!--............店铺信息............-->
		<div class="messcon">
			<div class="messcon_button">
				<el-button class="store-button2 edit mb-10" @click="edit">
					<i class="iconfont icon-Rectangle f12"></i>
					<span class="font-b" >编辑信息</span>
				</el-button>
			</div>
			<!--............店铺信息............-->
			<storeMessVis :storeMess="storeMess" v-loading="loading">
				
			</storeMessVis>		
		</div>
	</div>
</template>

<script>
	import router from '@/router'
	import storeMessVis from "@/components/servicer/storeSet/storeMessVis"
	import * as types from "@/store/mutation-types"
	import {getStoreMessage} from "@/api/platform"
	import {getUserMess} from "@/api/servicer"
	import * as links from "@/links/index"
	export default{
		components: {storeMessVis},
		data(){
			return{
				storeMess:{},//店铺信息
				loading:true,
			}
		},
		created(){
			let getter=this.$store.getters;
			let KeepSucess=getter.getKeepSucess;
			let addSuceess=getter.getAddSuccess;
			if(KeepSucess==true){
				this.HintInfo("保存成功")	       
		        this.$store.commit(types.KEEPSUCESS,false);	//解决不是保存页面跳进来也显示保存成功提示
			};
			if(addSuceess==true){
				this.HintInfo("添加成功")	       
		        this.$store.commit(types.ADDSUCESS,false);	//解决不是保存页面跳进来也显示保存成功提示
			};
			let shop_id=getter.getShop_id
			this._getstoreMess({shop_id})//调用公共方法
		},
		methods:{
			HintInfo(data){
				this.$message({
		        	message: data,
		          	type: 'success'
		       });
			},
			edit(){
				router.replace("/server/storeSetInfo/editStoreMessage")
			},
			_getstoreMess(shop_id){
				//获取店铺信息的方法
				getStoreMessage(shop_id)
				.then(({data})=>{
					this.storeMess=data;
					//没有上传LOGO就显示默认LOGO；
					this.loading=false;
					if(this.storeMess.shop_logo===null){
						this.storeMess.shop_logo=links.IMG
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.storeMessShow{
		margin-top: 120px;
		.messcon{
			width: 1240px;
    		margin: 0 auto;
		}
	}
</style>