<template>
	<div class="clearfix moreImg">
		<div v-for="(item,index) in moreImg" class="float-l clearfix" :key="index">
			<div class="img float-l mr-20 pos-r">
				<img :src="item.image_url" class="w-100">
				<div class="arrow_mask pos-a px-10">
					<i class="iconfont icon-zuoyi f14" @click="indexUp(index)"></i>
					<i class="iconfont icon-youyi f14" @click="indexDown(index)"></i>
					<i class="iconfont icon-shanchu1 f13" @click="delte(index)"></i>
				</div>
			</div>
		</div>
		<imgUpload :imageType="imageType" @getImageUrl="getPath" v-if="imgShow"></imgUpload>
		<div v-for="item in empty" class="empty clearfix">
			<span class="ml-20">{{item.index_name}}</span>
		</div>
	</div>
</template>

<script>
	import imgUpload from "@/components/func/imageUpload"
	import shareMth from '@/utils/shareMth'
	export default{
		data(){
			return{	
				imageType:"product",
				imgShow:true,
			}
		},
		props:{
		  	moreImg: {
		      type: Array,
		      default: function () {
		        return []
		      }
	    	},
		},
		mixins:[shareMth],
		components: {
			imgUpload
		},
		computed:{
			//减少空图片的长度（当父集传过来的时候）
			empty(){
				let len = this.moreImg.length;
				let arr;
				if(len<=4){
					arr = new Array(4-len);
					arr.fill({index_name:""})
				}	
				return arr
			}
		},
		methods:{
			getPath(data){
				var pulishImg=this.moreImg
				pulishImg.push({
					image_url:data.new_url
				});
				if(pulishImg.length>=5){
					this.imgShow=false;
				}
			},
			indexUp(index){
				this.itemIndexUp(index,this.moreImg);
			},
			indexDown(index){
				this.itemIndexDown(index,this.moreImg);
				this.$emit("indexDown",index,this.moreImg)
			},
			delte(index){
				this.itemDelte(index,this.moreImg);
				var pulishImg=this.moreImg
				if(pulishImg.length<5){
					this.imgShow=true;
				};
			},
		}
	}
		
</script>

<style lang="scss">
.moreImg{
	.img{
		width: 100px;
		height: 100px;
		overflow: hidden;
		cursor: pointer;
		img{
			width: 100%;
		}
		.arrow_mask{
			bottom: 0;
			width: 80px;
			padding-left: 10px;
			padding-right: 10px;
			height: 0px;
			overflow: hidden;
			background-color: rgba(0,0,0,.6);
			transition: all .2s;
			i{
				color: #fff;
				float: left;
				&:active{
					color: #008FF2;
				}
			}
			i.icon-shanchu1{
				&:active{
					color: #FD3B32;
				}
			}
			i.icon-youyi{
				margin: 0 16px;
			}
		}
		&:hover{
			.arrow_mask{
				height: 32px;
			}
		}
	}
	.imageUpload{
		float: left;
		width: 100px;
		height: 100px;
		.imageUpload_con{
			margin-top: -16px;
			margin-left: -15px;
			.iconfont{
				font-size: 32px;
			}
			p{
				margin-top: 0;
			}

		}
	}
	
}

</style>
<style scoped="scoped">
	.length{
		display: none;
	}
</style>