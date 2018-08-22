<template>
	<div class="imageUpload pos-r">
		<img :src="imageUrl" v-if="hasImage"/>
		<input type="file" accept="image/jpeg,image/jpg,image/png" @change="imageUpload" ref="input"/>
		<div class="background transition" v-if="hasImage"></div>
		<div :class="['imageUpload_con',hasImage?'changePosition':'']">			
			<!--<svg width="40" height="32" v-if="hasIcon"><use xlink:href="#updown" /></svg>-->
			<span class="iconfont icon-jiahao" v-if="hasIcon"></span>			
			<i class="iconfont icon-zhongxinshangchuan IconAgain transition" v-if="hasImage"></i>			
			<p v-if="hasImage" class="againUpdata transition">重新上传</p>			
			<!--<p v-else class="color-3 clickUpdata">点击上传</p>-->
		</div>
	</div>
</template>

<script>
	import {imageUpload} from "@/api/login"


	export default{
		data(){
			return {}
		},
		props:["imageUrl","imageType","index"],
		computed:{
			hasImage(){
				return this.imageUrl ? true:false
			},
			hasIcon(){
				return this.imageUrl ? false:true
			}
		},
		methods:{
			imageUpload(event){				
				let file=event.target.files[0];				
				let supportedTypes=['image/jpg', 'image/jpeg', 'image/png'];
				//图片大小不超过3M
				let imageSize=1024*1024*3;
				if(file && supportedTypes.indexOf(file.type)>=0 &&file.size<imageSize){					
					var formData = new FormData();
					formData.append('photo', file);
					formData.append('type', this.imageType);
					imageUpload(formData)
					.then(({data})=>{
						let old_new={
							new_url:data.path,
							old_url:this.imageUrl,
							index:this.index
						};
						this.$emit("getImageUrl",old_new);
					})
					.catch(({response:{data}})=>{
						this.$message.error(data.errorcmt);							
					})
					//清空值，以可以上传重复的图片
					this.$refs.input.value="";
				}else{
					this.$message.error("文件格式只支持png、jpg,并且图片须在3MB以内")
				}
				
			}
		}
	}
</script>

<style>
	.imageUpload{
		border-radius: 2px;
		text-align: center;
		border:1px dashed  #D6D6D6;
		overflow: hidden;
	}
	.imageUpload img{
		width: 100%;
		height: 100%;
		z-index: 50;
	}

	.imageUpload input{
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		opacity: 0;
		filter:alpha(opacity=0);		
		z-index: 500;
		cursor: pointer;
	}
	.imageUpload_con{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%)
	}
	.imageUpload .icon-jiahao{
		display: inline-block;
		font-size: 48px;
		color: #D6D6D6;
	}
	.imageUpload_con p{
		margin-top: 6px;
	}
	.imageUpload .againUpdata{
		color: #fff;
		opacity: 0;
		filter:alpha(opacity=0);
	}
	.imageUpload .IconAgain{
		color: #fff;
		font-size: 32px;
		opacity: 0;
		filter:alpha(opacity=0);
	}
	.background{
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background:rgba(0,0,0,0.6);
		opacity: 0;
		filter:alpha(opacity=0);
	}
	.imageUpload:hover{
		border: 1px solid #D6D6D6;
	}
	.imageUpload:active{
		border: 1px solid #0070C9;
	}
	.imageUpload:hover .IconAgain,.imageUpload:hover .againUpdata,.imageUpload:hover .background{
		opacity: 1;
	}
	.imageUpload:active .IconAgain,.imageUpload:active .againUpdata{
		color: #008FF2;
	}
</style>