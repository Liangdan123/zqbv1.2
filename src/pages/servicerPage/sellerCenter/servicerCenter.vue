<template>
	<div class="servicerCenter">
			<!--................没有店铺时弹出的弹框.............-->
			<el-dialog 
				:visible.sync="dialogVisible" 
				:close-on-click-modal="false" 
				:close-on-press-escape="false" 
				:show-close="false"
				custom-class="noOpenStore">
				<img :src="urls"/>
				<div>
					<h4 class="">店铺信息未添加，请先添加店铺信息！</h4>
					<el-button class="store-button1 openStore" @click="openStore">
						我要开店
					</el-button>
					<p @click="loginOut">退出</p>
				</div>
			</el-dialog>
	</div>
</template>

<script>
	import * as links from "@/links/index"
	import {getUserMess} from "@/api/servicer"
	import router from "@/router"
	export default{
		data(){
			return {
				dialogVisible:false,
				urls:links.IMG,//弹窗图片链接
			}
		},
		created(){
			getUserMess()//获取服务商店铺
			.then(({data})=>{
				if(data.length===0){
					this.dialogVisible=true
				}
			})
			.catch(({response: {data}})=>{
				this.$message.error(data.errorcmt);
			})
		},
		methods:{
			openStore(){//我要开店按钮
				this.$store.dispatch("doCloseStore",false);
				router.push("/server/sellercenter/openStore")
			},
			loginOut(){//退出按钮
				this.$store.dispatch('doLogout');
			}
		}
	}
</script>

<style lang="scss">
.servicerCenter{
	.noOpenStore{
		width: 600px;
		text-align:center;
		img{
			width: 104px;
			height: 104px;
		}
		h4{
			color: #333;
			font-weight: normal;
			font-size: 14px;
			margin-top: 20px;
			margin-bottom: 10px;
		}
		p{
			color: #0070C9;
			display: block;
			margin-top: 10px;		
			cursor: pointer;	
		}
	}
}
</style>