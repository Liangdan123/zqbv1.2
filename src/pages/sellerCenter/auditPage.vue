<template>
	<div class="audit">
		<emptyNavbar></emptyNavbar>
		<!--....................进度条..................-->
		<div class="auditCon bg-f">
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
						<b class="line bg-D6"></b>
					</p>
					<div class="progress_txt f14 progress_two">
						店铺信息填写
					</div>
				</div>
				<div class="progress_sec float-l">
					<p class="realNameLine ml-4">
						<span class="circle bg-D6"></span>
					</p>
					<div class="progress_txt color-D6 f14 progress_three">
						提交审核
					</div>
				</div>
			</div>
		</div>
		<storeMess></storeMess>
	</div>
</template>

<script>
	import emptyNavbar from "@/components/sellerCenter/emptyNavbar"
	import storeMess from "@/components/sellerCenter/storeMessVue"
	export default{
		data(){
			return {
				
			}
		},
		components:{emptyNavbar,storeMess},
	}
</script>

<style scoped="scoped">
.auditCon{
	width: 1200px;
	margin:80px auto 0;
	padding: 60px 20px 20px;
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
.bg-D6{
	background-color: #D6D6D6;
}
.color-D6{
	color: #D6D6D6 ;
}
.ml-4{
	margin-left: 4px;
}
</style>