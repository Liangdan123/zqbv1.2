<template>
	<div class="storeLink_nav clearfix">
		<div class="search-input float-r" v-if="componentList.includes('input')">
			<input type="text" v-model="order_search" :placeholder="hintMess" @keyup.enter="inputName" />
			<el-button class="store-button1" @click="inputName">
				<svg width="16" height="16">
					<use xlink:href="#seacher" />
				</svg>
			</el-button>
		</div>
		<div class="float-r filter pos-r mr-10" v-if="componentList.includes('select')">
			<div class="filter-vis" @click.stop="switchShow=!switchShow">
				<span class="color-3" >{{selectTitle}}</span>
				<img src="../../assets/image/arrow-down.png" class="icon-arrow">
			</div>
			<transition name="el-zoom-in-top">
				<div :class="['filter-switch pos-a',switchPosition=='right'?'switch-right':'switch-left']" v-if="switchShow" @click.stop="">
					<p class="color-3">筛选条件</p>

					<slot></slot>
					<div class="condition">
						<span class="f12 color-3">创建时间:</span>
						<el-date-picker v-model="time" type="daterange" placeholder="选择日期范围" :editable="false" @change="change">
							
						</el-date-picker>
					</div>
					<div class="search-select">
						<el-button class="store-button1" @click="Search">{{selectTitle}}</el-button>
						<el-button class="store-button2" @click="Empty">清空条件</el-button>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
	import { getProductList } from "@/api/commodity"
	export default {
        props: {
            componentList: {
                type: Array,
                required: false,
                default(){
                    return ['select','input']
				},
            },
            selectTitle: {
                type: String,
                required: false,
                default:'筛选订单',
            },
            switchPosition: {
                type: String,
                required: false,
                default:'left',
            },
            hintMess:{
            	type:String,
            	default:function(){
            		return "输入订单相关信息进行搜索"
            	}
            }
        },
		data() {
			return {
				time:[],
				created_time: {
					min: "",
					max: "",
				},
				order_search: "",
				switchShow: false,
			}
		},
		methods: {
			inputName() {
				//商品名称搜索
				let order_search = this.order_search;
				this.$emit("inputSearch", order_search)
			},
			//筛选订单的确定按钮
			Search() {
				if(this.time.length && this.time[0] !== null && this.time[1] !== null) {
					let min = this.format(this.time[0]);
					let max = this.format(this.time[1]);
					this.created_time = Object.assign({}, this.created_time, {
						min,
						max
					});
				};
				if(this.time.length!==0 && this.time[0] !== null && this.time[1] !== null) {
					this.$emit("searchMthod", this.created_time)
				} else {
					this.$emit("searchMthod")
				};
				this.closeSearch();
			},
			//清除时间时Time值会变成undefined；
			change(){
				if(this.time===undefined){
					this.time=[];
				}
			},
			Empty() {
				this.time =[];
				this.order_search='';
				this.$emit("emptyMthod");
			},
			//格式化时间
			format(data) {
				let m = data.getMonth() + 1;
				let d = data.getDate();
				let n = data.getFullYear();
				let date = data.getFullYear() + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
				return date
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
	.switch-left{
		left: 0;
	}

	.switch-right{
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
	.icon-arrow{
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