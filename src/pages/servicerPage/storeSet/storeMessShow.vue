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
			getUserMess()//获取服务商shop_id
			.then(({data})=>{			
				let shop_id = data[0].shop_id;					
				//获取店铺信息(创建店铺信息时就有shop_id);
				this._getstoreMess({shop_id})
			})
			.catch(({response: {data}})=>{
				this.$message.error(data.errorcmt);
			})	
		},
		methods:{
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
				.catch(({response: {data}})=>{
					this.$message.error(data.errorcmt);
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