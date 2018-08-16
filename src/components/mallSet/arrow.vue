<template>
	<div class="arrow pos-a">
		<div class="arrow_direction transfrom_90" :class="isError?'bg-red':''" @click="indexUp">
			<i class="iconfont icon-zuoyi"></i>
		</div>
		<div class="arrow_direction mt-10 transfrom-90" :class="isError?'bg-red':''" @click="indexDown">
			<i class="iconfont icon-zuoyi"></i>
		</div>
		<div class="arrow_direction mt-10" :class="isError?'bg-red':''" @click="delte">
			<i class="iconfont icon-shanchu1"></i>
		</div>
	</div>
</template>

<script>
	import shareMth from '@/utils/shareMth'
	export default{
		mixins:[shareMth],
		props:["index","mallDecor","isError"],
		methods:{
			indexUp(){
				this.itemIndexUp(this.index,this.mallDecor)
			},
			indexDown(){
				this.itemIndexDown(this.index,this.mallDecor)
			},
			delte(){
                console.log('this.mallDecor:', this.mallDecor)
				this.itemDelte(this.index,this.mallDecor);
			}
		}
	}
</script>

<style>
.mallPlate	.arrow{
	top: 0;
	right:-25px;
}
.mallPlate .arrow_direction{
	background-color: #0070C9;	
	height: 24px;
	width: 24px;
	text-align: center;
	line-height: 24px;
}
.mallPlate  .arrow_direction i{
	color: #fff;
	font-size: 15px;
}
.transfrom_90{
	transform:rotate(90deg);
}
.transfrom-90{
	transform:rotate(-90deg);
}
.mallPlate .bg-red{
	background-color: #B4282D;
}
</style>