<template>
	<div class="autoPlate">
		<el-menu :unique-opened="onlyPlate" @open="handleOpen">
			<el-submenu index="0">
				<template slot="title">
					<span>导航</span>
				</template>
				<div class="NavigationCon">
					<div v-for="(item,i) in Navigation"  class="Navigation float-l" @click="selectPlate(item,i)">	
						<img :src="item.component_thumb_url" width="120" height="80" 
							:class="['display-b',calculation(item.component_key,i)>=2?'gray':'']"/>
						<span class="mt-10 display-in">{{item.component_name}}({{calculation(item.component_key,i)}}/2)</span>
						<div :class="['hoverPlate',calculation(item.component_key,i)>=2?'isDisable':'']">
							添加模块
						</div>
						
					</div>
				</div>
			</el-submenu>
			<el-submenu index="1">
				<template slot="title">
					<span>商品</span>
				</template>
				<div class="NavigationCon">
					<div v-for="(item,i) in commodity" class="Navigation float-l" @click="selectPlate(item,i)">	
						<img :src="item.component_thumb_url" width="120" height="80" 
							:class="['display-b',calculation(item.component_key,i)>=2?'gray':'']"/>
						<span class="mt-10 display-in">{{item.component_name}}({{calculation(item.component_key,i)}}/2)</span>
						<div :class="['hoverPlate',calculation(item.component_key,i)>=2?'isDisable':'']">
							添加模块
						</div>
					</div>
				</div>
			</el-submenu>
			<el-submenu index="2">
				<template slot="title">
					<span>海报</span>
				</template>
				<div class="NavigationCon">
					<div v-for="(item,i) in poster" class="Navigation float-l" @click="selectPlate(item,i)">	
						<img :src="item.component_thumb_url" width="120" height="80" 
							:class="['display-b',calculation(item.component_key,i)>=2?'gray':'']"/>
						<span class="mt-10 display-in">{{item.component_name}}({{calculation(item.component_key,i)}}/2)</span>
						<div :class="['hoverPlate',calculation(item.component_key,i)>=2?'isDisable':'']">
							添加模块
						</div>
					</div>
				</div>
			</el-submenu>
		</el-menu>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				onlyPlate:true,
				plateMess:[],//版块数据
				addPlate:[],//添加的模块
			}		
		},
		props:{
			componentList:{
				type:Array,
				default:function(){//自定义列表
					return []
				}
			},
			correscomList:{//整个列表
				type:Array,
				default:function(){
					return []
				}
			}
		},
		computed:{
			Navigation(){//导航列表
				if(this.componentList.length!==0){
					let index=this.componentList.findIndex((item)=>item.component_type===1);		
					return this.componentList[index].components
				}

			},
			commodity(){//商品列表
				if(this.componentList.length!==0){
					let index=this.componentList.findIndex((item)=>item.component_type===2);											
					return this.componentList[index].components
				}
			},
			poster(){//海报
				if(this.componentList.length!==0){
					let index=this.componentList.findIndex((item)=>item.component_type===3);											
					return this.componentList[index].components
				}
			},
		},
		methods:{
			handleOpen(key){//选择导航,商品，海报
				this.plateMess=this.componentList[key]
			},
			selectPlate(item,i){//选择导航,商品，海报的顺序
				let {component_key} = item;
				let len = this.correscomList.filter(item=>item.component_key===component_key).length;
				if(len>=2){this.$message({showClose: true, message: '已经达到添加上限'});return}             				
				this.addPlate=this.plateMess.components[i];//需要添加给中间模块的东西		
				this.$emit("addPlate",this.addPlate);
				
			},
			calculation(data,i){//中间项目已经有的长度
				if(this.correscomList.length!==0){
					let filterItem=this.correscomList.filter(item=>item.component_key===data);					
					return filterItem.length
				}				
			}
		}
	}
</script>

<style scoped="scoped">
.NavigationCon{
	padding: 10px 10px;
}
.Navigation{
	position: relative;
	padding: 10px;
	text-align: center;	
	cursor: pointer;
}
.hoverPlate{
	position: absolute;
	top: 10px;
	left: 10px;
	right: 10px;
	height: 0px;
	line-height: 80px;
	overflow: hidden;
	color: #fff;
	background-color: rgba(0,0,0,.6);
	transition: all .2s;
}
.Navigation:hover .hoverPlate{
	height: 80px;
}
.Navigation:hover .hoverPlate.isDisable{
	height: 0px;
}
.gray { 
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);  
    filter: grayscale(100%);	
    filter: gray;
}
</style>
<style>
	.mallDecoration .autoPlate {
		position: fixed;
		top: 102px;
		left: 0;
		bottom: 44px;
		width: 300px;
		background-color: #fff;
		border-left: 1px solid #D6D6D6;
		z-index: 100;
		overflow-y: auto;
	}	
	.mallDecoration .el-menu{
		background-color: #fff;
	}
	.mallDecoration .autoPlate::-webkit-scrollbar {
		width: 0px;
	}
	.mallDecoration .el-submenu .el-submenu__title{
		color: #333;
	}
	.mallDecoration .el-submenu.is-opened .el-submenu__title{
		color: #0070C9;
		background-color: #E6E6E6;
	}
	.mallDecoration .el-submenu .el-menu-item:hover, .mallDecoration .el-submenu__title:hover{
		background-color: #fff;
		color: #0070C9;
	}


</style>