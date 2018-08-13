<template>
	<div class="feedback">
		<emptyNavbar></emptyNavbar>
		<div class="feedbackCon bg-f pos-r">
			<div class="progress clearfix">
				<div class="progress_sec float-l">
					<p class="realNameLine ml-30">
						<span class="circle bg-b"></span>
						<b class="line bg-b"></b>
					</p>
					<div class="progress_txt f14">
						店主实名认证
					</div>
				</div>
				<div class="progress_sec float-l ">
					<p class="realNameLine ml-4">
						<span class="circle bg-b"></span>
						<b class="line bg-b"></b>
					</p>
					<div class="progress_txt f14 progress_two">
						店铺信息填写
					</div>
				</div>
				<div class="progress_sec float-l">
					<p class="realNameLine ml-4 mb">
						<span class="circle bg-b"></span>
					</p>
					<div class="progress_txt  f14 progress_three">
						提交审核
					</div>
				</div>
			</div>
			<div class="pos-a text-c hint">
				<p class="f20 color-3 font-b mb-10">您的开店申请现已提交，请耐心等待</p>
				<p class="f16 color-3 mb-10">审核通过后将以短信的形式通知您</p>
				<el-button class="store-button1 px-30" @click="refreshStatus">
					刷新状态
				</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import emptyNavbar from "@/components/sellerCenter/emptyNavbar"
	import {getChecksStatus} from "@/api/myStore"
	import router from "@/router"
	export default{
		data(){
			return{
				
			}
		},
		components:{emptyNavbar},
		methods:{
			refreshStatus(){
				router.push('/zxh/sellerPage/sellerCenter')
			}
		}
	}
</script>

<style scoped="scoped">
.feedbackCon{
	width: 1200px;
	margin:80px auto 0;
	padding: 60px 20px 20px;
	height: 642px;
}
.progress{
	width: 440px;
	margin-left:auto;
	margin-right: auto;
}
.progress .circle{
	display: inline-block;
	height: 12px;
	width: 12px;
	border-radius: 60%;
	margin-right: 2px;
}
.progress .line{
	display: inline-block;
	height: 4px;
	width: 160px;
	margin-bottom: 3px;
}
.progress_txt{
	color: #0070C9;
}
.progress_two{
	margin-left: -30px;
}
.progress_three{
	margin-left: -15px;
}
.ml-4{
	margin-left: 4px;
}
.hint{
	width: 330px;
	top: 44%;
	left: 50%;
	margin-left: -165px;
	margin-top: -28px;
}
</style>