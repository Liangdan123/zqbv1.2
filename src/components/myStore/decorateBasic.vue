<template>
	<div class="basic">
		<h3>店铺名称</h3>
		<input type="text" v-model="shopMess.shop_name" 
			placeholder="不超过20个字符" maxlength="20" class="shop_name"/>
			
		<h3>店铺LOGO</h3>
		<imageUpload :imageUrl="shopMess.shop_logo" :imageType="imageType" 
			@getImageUrl="updataLogo"></imageUpload>
		<span class="mt-10 display-in">
			图片尺寸建议104×104px<br>格式支持png、jpg
		</span>
	</div>
</template>

<script>
	import imageUpload from "@/components/func/imageUpload"
	import {existStoreMess} from "@/api/myStore"
	import * as types from "@/store/mutation-types"
	export default{
		data(){
			return {	
				imageType:"shop",
				existMess:""
			}
		},
		props:["shopMess"],
		components:{
			imageUpload
		},
		updated(){
			this.upBasicMess();
			this.$emit("passBasicMess",this.existMess);
		},
		methods:{
			updataLogo(data){
				this.shopMess.shop_logo=data.new_url;
			},
			upBasicMess(){
				var id=this.shopMess.id;
				var shop_name=this.shopMess.shop_name;
				var shop_logo=this.shopMess.shop_logo;
				this.existMess={
					id,
					shop_name,
					shop_logo
				};
			},
		},
	}
</script>

<style lang="scss">
	.basic{		
		h3{
			font-family: SourceHanSansCN-Regular;
			font-size: 12px;
			color: #333333;
			letter-spacing: 0;
			font-weight: normal;
			text-align: left;
			margin-top: 20px;
		}
		input.shop_name{
			width: 258px;
			border:1px solid #D6D6D6;
			height: 32px;
			font-size: 12px;
			text-indent: 10px;
			margin-top: 10px;
			color: #7F7F7F;
			&::-webkit-input-placeholder{
				color: #7F7F7F;
			}
		}
		.imageUpload{
			margin-top: 10px;
			height: 104px;
			width: 104px;
			overflow: hidden;
		}
		span{
			font-family: SourceHanSansCN-Regular;
		    font-size: 12px;
		    color: #7F7F7F;
		    letter-spacing: 0;
		    text-align: left;
		    width: 100%;
		}
		.btn-edit{
			position: fixed;
			bottom: 0;
			right: 0;
			height: 50px;
			width: 300px;
			border-top: 1px solid #D6D6D6;
			text-align: left;
			button{
				background: none;
				border: 0;
				cursor: pointer;
				height: 100%;
				width: 49%;
				font-size: 14px;
				color: #333333;

				&:focus{
					 outline: none;
				}
			}
			.btn-edit-save{
				border-left: 1px solid #D6D6D6;
				color: #0070C9;
			}
		}
	}
</style>