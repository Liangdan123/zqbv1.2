<template>
	<div class="storeLink_nav clearfix">
		<div class="search-input float-r" v-if="componentList.includes('input')">
			<input 
				type="text" 
				v-model="order_search" 
				:placeholder="hintMess" 
				@keyup.enter="inputName"/>
			<el-button class="store-button1" @click="inputName">
				<svg width="16" height="16">
					<use xlink:href="#seacher" />
				</svg>
			</el-button>
		</div>
		<div class="float-r filter pos-r mr-10" v-if="componentList.includes('select')">
			<div class="filter-vis" @click.stop="switchShow=!switchShow">
				<span class="color-3">{{selectTitle}}</span>
				<img src="../../assets/image/arrow-down.png" class="icon-arrow">
			</div>
			<transition name="el-zoom-in-top">
				<div :class="['filter-switch pos-a',switchPosition=='right'?'switch-right':'switch-left']" 
					v-if="switchShow" 
					@click.stop="">
					<p class="color-3">筛选条件</p>
					<slot></slot>
					<div class="condition" v-if="isDate">
						<span class="f12 color-3">{{applyCreate}}:</span>
						<el-date-picker v-model="time" 
							type="daterange" 
							placeholder="选择日期范围" 
							:editable="false" 
							@change="change" 
							size="small">
						</el-date-picker>
					</div>
					<div class="search-select">
						<el-button class="store-button1" @click="Search">
							{{selectTitle}}
						</el-button>
						<el-button class="store-button2" @click="Empty">
							清空条件
						</el-button>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
	import {format}from "@/api/script"
	export default {
		props: {
			applyCreate:{
				default:function(){
					return "创建时间"
				}
			},
			inputSearch:{//模糊查找默认属性
				type:String,
				default:function(){
					return "name"
				}
			},
			isDate:{
				type:Boolean,
				default:function(){
					return true
				}
			},
			search: {
				type: Object,
				default: () => {
					return {}
				}
			},
			componentList: {
				type: Array,
				required: false,
				default() {
					return ['select', 'input']
				},
			},
			selectTitle: {
				type: String,
				required: false,
				default: '筛选订单',
			},
			switchPosition: {
				type: String,
				required: false,
				default: 'left',
			},
			hintMess: {
				type: String,
				default: function() {
					return "输入订单相关信息进行搜索"
				}
			},
			timeType:{
				type: String,
				default: function() {
					return "create_time"
				}
			}
		},
		data() {
			return {
				time: [],
				create_time: {
					min: "",
					max: "",
				},
				apply_time: {
					min: "",
					max: "",
				},
				pay_time: {
					min: "",
					max: "",
				},
				created_at:{
					min: "",
					max: "",
				},
				order_search: "",
				switchShow: false,
			}
		},
		watch: {
		    search(val,aaa){
				let keys=Object.keys(val)//监听搜索条件变化
				keys.includes('create_time')||(this.time=[]);//监听重置时间
				keys.includes(this.inputSearch)||(this.order_search="");
		    }
	   	},
		methods: {
			inputName() {
				//商品名称搜索
				if(this.order_search){
					this.search[this.inputSearch] = this.order_search
				}else{
					delete this.search[this.inputSearch]
				}
				this.$emit("searchMethod")
			},
			//筛选订单的确定按钮
			Search(){
				if(this.isDate){//（申请时间跟创建时间在一起）				
					if(this.time.length && this.time[0] && this.time[1] ){
						let min = format(this.time[0]);
						let max = format(this.time[1]);
						if(this.applyCreate==="创建时间"){
							this._timeType(1,this.timeType,min,max)
						}else if(this.applyCreate==="申请时间"){
							this._timeType(1,"apply_time",min,max)
						}
					};
					if(this.time.length !== 0 && this.time[0]&& this.time[1]){
						if(this.applyCreate==="创建时间"){							
							this._timeType(2,this.timeType)
						}else if(this.applyCreate==="申请时间"){
							this._timeType(2,"apply_time")
						}
					}else{
						if(this.applyCreate==="创建时间"){
							this._timeType(3,this.timeType)
						}else if(this.applyCreate==="申请时间"){
							this._timeType(3,"apply_time")
						}
					}

				}
				this.$emit("searchMethod")
				this.closeSearch();
			},
			_timeType(num,type,min,max){
				switch(num){
					case 1:
						this[type]=Object.assign({}, this[type], {
							min,
							max
						});
						break;
					case 2:
						this.search[type] = this[type];
						break;
					case 3:
						delete this.search[type]
						break;
				};
			},			
			change() {//清除时间时Time值会变成undefined；
				if(!this.time) {
					this.time = [];
				}
			},
			Empty() {
				this.time = [];
				this.order_search = '';
				if(this.applyCreate==="创建时间"){
					delete this.search[this.timeType];
				}else if(this.applyCreate==="申请时间"){
					delete this.search.apply_time;
				}
				delete this.search[this.inputSearch];
				this.$emit("emptyMthod");
				this.closeSearch();
			},
			//关闭搜索弹框
			closeSearch() {
				this.switchShow = false;
			}
		}
	}

</script>

<style scoped lang="scss">
	.storeLink_nav .filter {
		height: 32px;
		line-height: 32px;
		background: #FFFFFF;
		border: 1px solid #D6D6D6;
		border-radius: 2px;
		cursor: pointer;
	}
	
	.search-input {
		height: 32px;
		line-height: 32px;
		width: 260px;
		background: #FFFFFF;
		border: 1px solid #D6D6D6;
		border-radius: 2px;
		input {
			width: 206px;
			padding-left: 10px;
			display: block;
			height: 100%;
			border: none;
			outline: none;
			float: left;
		}
		button {
			width: 44px;
			float: right;
			border-radius: 0;
			padding-left: 0;
			padding-right: 0;
		}
	}
	
	.filter-vis {
		padding-left: 10px;
		padding-right: 8px;
	}
	
	.filter-switch {
		top: 40px;
		background: #FFFFFF;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
		border-radius: 2px;
		padding: 20px;
		min-width: 280px;
	}
	
	.switch-left {
		left: 0;
	}
	
	.switch-right {
		right: 0;
	}
	
	.search-select {
		text-align: right;
		margin-top: 16px;
		.store-button1,
		.store-button2 {
			padding: 0;
			text-align: center;
			height: 24px;
			line-height: 8px;
			width: 60px;
		}
	}
	
	.icon-arrow {
		position: relative;
		top: -1px;
		margin-left: 2px;
		width: 14px;
		vertical-align: middle;
	}
</style>
<style>
	.filter-switch .classify .el-select .el-input__inner {
		width: 184px;
		height: 24px;
		line-height: 24px;
		border-radius: 2px;
		font-size: 12px;
		border: 1px solid #D6D6D6
	}
	
	.filter-switch {
		z-index: 500;
	}
	
	.filter-switch .classify .el-select .el-input__inner:focus {
		border: 1px solid #0070C9;
	}
	
	.search-select .store-button1.el-button span,
	.search-select .store-button2.el-button span {
		font-size: 12px;
	}
	
	.search-input .store-button1.el-button span {
		display: block;
		text-align: center;
		width: 44px;
		height: 100%;
	}
</style>