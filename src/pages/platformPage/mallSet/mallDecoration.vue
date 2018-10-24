<template>
	<div class="mallDecoration">
		<div  class="mallDecor_middle" v-loading="mallSetMiddle">
			<img src="../../../assets/image/top.jpg" class="w-100"/>
			<div class="mallPlate" v-for="(item,index) in correscomList" :key="index">
				<!--..................轮播海报一....................-->
				<div v-if="item.component_key==='hbys1'" 
					class="cursor pos-r bg-f mt-10" 
					@click="isShowPlate(index)"
					:class="index_plate===index?'border_b':errorPlate.hbys1 && index===errorIndex?'border-red':''" >
					<!--..................当有数据时执行这里....................-->
					<div v-if="item.data">	
						<el-carousel arrow="never" :interval="4000" height="210px" width="375px"> 		
							<el-carousel-item v-for="(imgNum,i) in item.data.banners" 
								:key="i" 
								style="display: block!important;">
								<img :src="imgNum.image_url" height="100%" width="100%">				
							</el-carousel-item>
						</el-carousel>
					</div>
					<!--..................当没有数据时执行这里....................-->
					<div v-if="!item.data">
						<el-carousel arrow="never" 
							:interval="4000" 
							height="210px" 
							width="375px">
							<el-carousel-item 
								v-for="(img,n) in banner1" 
								:key="n" 
								style="display: block!important;" >								
								<b class="bg_banner1"></b>
							</el-carousel-item>
						</el-carousel>
					</div>
					<mallDecora :mallPlate='item' v-if="index_plate===index"></mallDecora>
				</div>
				<!--..................图片导航....................-->
				<div v-if="item.component_key==='tpdh'" 
					class="cursor pos-r mt-10 tpdh"  
					@click="isShowPlate(index)"
					:class="index_plate===index?'border_b':errorPlate.tpdh && index===errorIndex?'border-red':''">
					
					<!--..................当有数据时执行这里....................-->
					<div v-if="item.data && txtImgSelect===false" 
						class="clearfix imgNavCon"> 
						<div  v-for="(itemImg,i) in item.data.banners" class="float-l">
							<div class="imageTxtcon">
								<img :src="itemImg.image_url" class="imageTxt"/>
								<p class="f12 color-3 imgTitle">{{itemImg.name}}</p>
							</div>
						</div>
					</div>
					<!--..................当没有数据时执行这里....................-->
					<div v-if="!item.data||txtImgSelect===true" class="clearfix imgNavCon">
						<div  v-for="(itemImg,i) in imageNav" class="float-l"> 
							<div class="imageTxtcon">
								<b class="imageTxt"></b>
								<p class="f12 color-3">{{itemImg.title}}</p>
							</div>
						</div>
					</div>	
					<mallDecora  v-if="index_plate===index" 
						:mallPlate='item' 
						:index="index" 
						@changeNum="changeNum" 
						@controlImg="controlImg">						
					</mallDecora>
				</div>	
				<!--..................商品列表....................-->
				<div v-if="item.component_key==='splb1'" 
					class="cursor pos-r bg-f mt-10 splb4" 
					@click="isShowPlate(index)"
					:class="index_plate===index?'border_b':errorPlate.splb1&&index===errorIndex?'border-red':''">	
					<h2 class="f16 color-3 text-c font-n line" v-if="item.data.title_switch==='on'">
						<i class="verticalLine"></i>
						{{!item.data.title?"模块标题":item.data.title}}											
					</h2>
					<!--...................当商品搜索出来有数据时或者是商品已发布时....................-->
					<div v-if="item.list.length!==0" class="pb-20">
						<div v-for="(single,index) in item.list" class="mx-15 mt-20 item clearfix">
							<img :src="single.images[0].image_url" width="134" height="134" class="float-r"/>						
							<div class="clearfix mt-10 item-left float-l">
								<div class="color-3 f14 mt-10 product_name_four">{{single.product_name}}</div>
								<p class="float-l f16 color-red clearfix mt-10">
									<b>￥</b>
									<b v-if="single.product_price_yuan.min==single.product_price_yuan.max">														
										{{single.product_price_yuan.min}}
									</b>
									<b v-else>{{single.product_price_yuan.min}} - {{single.product_price_yuan.max}}</b>
								</p>
								<p class="float-r color-7F f12 mt-10">
									销量：<span>{{single.statistics_product.sell_num}}</span>
								</p>
							</div>							
						</div>	
					</div>
					<!--...................没有搜索出来数据....................-->
					<div v-if="item.list.length===0" class="pb-20">
						<div v-for="item in mulitRow" class="mx-15 mt-20 item clearfix">
							<b  style="height: 134px; width: 134px; background-color: #E5F5FF;float:right"></b>							
							<div class="clearfix item-left float-l mt-10">
								<div class="color-3 f14 mt-10 product_name_four">产品名称</div>
								<p class="float-l f16 color-red clearfix"><b>￥</b><b >888</b></p>																																						
								<p class="float-r color-7F f12">销量：<span>888</span></p>							
							</div>
						</div>
					</div>					
					<!--....................右边.................-->
					<mallDecora v-if="index_plate===index" :mallPlate='item' :shopNum="shopNum"></mallDecora>
				</div>
				<!--..................商品双列....................-->
				<div  v-if="item.component_key==='splb2'" class="cursor pos-r mt-10 splb2" 
					@click="isShowPlate(index)"
					:class="index_plate===index?'border_b':errorPlate.splb2 && index===errorIndex?'border-red':''" >					
					<h2 class="f16 color-3 text-c font-n line" 
						v-if="item.data.title_switch==='on'">
						<i class="verticalLine"></i>
						{{!item.data.title?"模块标题":item.data.title}}											
					</h2>
					<!--...................当商品搜索出来有数据时或者是商品已发布时....................-->
					<div v-if="item.list.length!==0" class="clearfix">
						<div v-for="(single,index) in item.list" 
							class="mb-20 item float-l pl-15">
							<img :src="single.images[0].image_url"  
								width="165" height="165" 
								class="mt-15 display-b"/>
							<div class="color-3 f14 mt-10 product_name_two">{{single.product_name}}</div>
							<div class="clearfix mt-10 line-21">
								<p class="float-l f16 color-red clearfix">
									<b>￥</b>
									<b v-if="single.product_price_yuan.min==single.product_price_yuan.max">														
										{{single.product_price_yuan.min}}
									</b>
									<b v-else>{{single.product_price_yuan.min}} - {{single.product_price_yuan.max}}</b>
								</p>
								<p class="float-r color-7F f12">
									销量：<span>{{single.statistics_product.sell_num}}</span>
								</p>
							</div>
						</div>	
					</div>
					<!--...................没有搜索出来数据....................-->
					<div v-if="item.list.length===0" class="clearfix">
						<div v-for="item in doubleRow" class="float-l pl-15">
							<b class="mt-15 display-b" style="height: 165px; width: 165px; background-color: #E5F5FF;"></b>
							<div class="color-3 f14 mt-10 product_name_two">产品名称</div>
							<div class="clearfix mt-10 line-21">
								<p class="float-l f16 color-red clearfix"><b>￥</b><b >888</b></p>																																						
								<p class="float-r color-7F f12">销量：<span>888</span></p>							
							</div>
						</div>
					</div>		
					<!--....................右边.................-->
					<mallDecora v-if="index_plate===index" :mallPlate='item' :shopNum="shopNum">
					</mallDecora>
				</div>
				<!--..................轮播海报二....................-->
				<div v-if="item.component_key==='hbys2'" 
					class="cursor pos-r bg-f mt-10 hbys2"  
					@click="isShowPlate(index)"
					:class="index_plate===index?'border_b': errorPlate.hbys2 && index===errorIndex?'border-red':''">
					<h2 class="f16 color-3 text-c font-n line" v-if="item.data.title_switch==='on'">
						<i class="verticalLine"></i>{{!item.data.title?"模块标题":item.data.title}}											
					</h2>
					<!--..................当有数据时执行这里....................-->
					<div v-if="item.data.banners" class="mt-10">	
						<el-carousel arrow="never" :interval="4000" height="179px" width="320px" type="card"> 		
							<el-carousel-item v-for="(imgNum,i) in item.data.banners" :key="i" 
								style="display: block!important;">
								<img :src="imgNum.image_url" height="100%" width="100%">				
							</el-carousel-item>
						</el-carousel>
					</div>
					<!--..................当没有数据时执行这里....................-->
					<div v-if="!item.data.banners" class="mt-10">
						<el-carousel arrow="never" :interval="4000" height="179px" width="320px" type="card" >
							<el-carousel-item v-for="(img,n) in banner2" :key="n" style="display: block!important;" >								
								<b class="bg_banner1"></b>
							</el-carousel-item>
						</el-carousel>
					</div>
					<mallDecora :mallPlate='item' v-if="index_plate===index"></mallDecora>
				</div>
				
				<!--..................店铺列表....................-->				
				<div v-if="item.component_key==='dplb1'" 
					class="cursor pos-r bg-f mt-10 dplb1"
					@click="isShowPlate(index)"
					:class="index_plate===index?'border_b': errorPlate.dplb1 && index===errorIndex?'border-red':''">
					<h2 class="f16 color-3 text-c font-n line" v-if="item.data.title_switch==='on'">
						<i class="verticalLine"></i>
						{{!item.data.title?"模块标题":item.data.title}}											
					</h2>
					<!--..................没有店铺列表时....................-->	
					<div v-if="item.shop_list.length===0" >
						<div class="dplb1_plate" v-for="item in 3">
							<div class="dplb1_top clearfix">
								<div class="dplb1_top-left float-l">
									
								</div>
								<div class="dplb1_top-right float-l">
									<h2 >店铺名称</h2>
									<div class="dplb1_top-mess">
										<span>商品200</span>
										<span>收藏200</span>
										<span>服务9.5分</span>
									</div>
								</div>
							</div>
							<div class="clearfix dplb1_bottom-con">
								<div class="dplb1_bottom " v-for="item in 4">
									
								</div>
							</div>
						</div>
					</div>
					<!--.................有店铺列表时....................-->	
					<div v-if="item.shop_list.length!==0">
						<div class="dplb1_plate"  v-for="shop in item.shop_list">
							<div class="dplb1_top clearfix">								
								<img :src="shop.shop_logo" class="dplb1_top-left float-l"/>
								<div class="dplb1_top-right float-l">
									<h2 >店铺名称</h2>
									<div class="dplb1_top-mess">
										<span>商品200</span>
										<span>收藏200</span>
										<span>服务9.5分</span>
									</div>
								</div>
							</div>
						</div>
					</div>										
					<mallDecora :mallPlate='item' v-if="index_plate===index">
						
					</mallDecora>
				</div>
			</div>
		</div>
		<!--.........................保存装修按钮......................-->
		<div class="fixed-frame">
			<div class="btn middle">
				<el-button class="store-button1 float-l px-30" @click="preserveDecore">
					保存装修
				</el-button>
			</div>			
		</div>
	</div>
</template>

<script>
	import {correscomList,existAssembly,getMallShopNum,getcomponentList} from "@/api/platform"
	import mallDecora from "@/components/platform/mallSet/mallDecora"
	import arrow from "@/components/platform/mallSet/arrow"
	import * as links from "@/links/index"
	import {deletes} from "@/api/script"
	export default{
		components:{mallDecora,arrow},
		data(){
			return {
				correscomList:[],//整个模块信息
				banner1:[{index:""},{index:""},{index:""},{index:""}],//banner1没有数据的时候																							
				isPlate:false,
				index_plate:"",
				imageNav:[{img:"",title:"导航一"},{img:"",title:"导航二"},{img:"",title:"导航三"},{img:"",title:"导航四"}],
				txtImgSelect:false,
				onlyList:[{index:""}],
				shopNum:0,//如果为0商品单列、双列、三列、商品列表不显示
				doubleRow:[{one:""},{two:""}],//当商品双列没有数据时
				threeRow:[{one:""},{two:""},{three:""}],//当商品三列没有数据时
				banner2:[{index:""},{index:""},{index:""},{index:""}],//banner2没有数据的时候
				mulitRow:[{index:""},{index:""},{index:""},{index:""},{index:""},{index:""}],//商品列表空的时候
				txtTitle:[{index:""},{index:""}],//文字导航栏
				errorPlate:{
					hbys1:false,
					tpdh:false,
					splb2:false,
					hbys2:false,					
					dplb1:false
				},
				errorIndex:0,//验证错误的顺序（有两种相同样式时有用）
				mallSetMiddle:true,
				autoPlateLoad:true,
			}
		},
		created(){		
			getMallShopNum()//商城商品上架数量
			.then(({data})=>{this.shopNum=data.product_num})			
			this.mallSetMiddle=false;
			//获取商城对应组件列表API
			correscomList()
			.then(({data})=>{
				this.correscomList=data;
				this.mallSetMiddle=false;
				this.correscomList.forEach(item=>{//海报样式二时					
					if(item.component_key==='hbys2'&&!item.data){
						item.data={title_switch:"on"};
					}
				})
			})
			//获取组件列表
			let comListData={component_type:0}
		},	
		methods:{
			isShowPlate(index){//是否显示上下箭头，border,右边版块
				this.index_plate=index;
				let arr1=["hbys1","tpdh","splb2","hbys2"];
				this.isBoolean(arr1,false)
			},
			preserveDecore(){//保存装修
				for(let [index,item] of this.correscomList.entries()){//保存装修错误验证
					switch(item.component_key){
						case 'hbys1':
							if(!item.data){//当没有修改轮播图时
								this.errorTips("hbys1","请设置海报样式",index);
								return
							}	
							for(let bannerIndex of item.data.banners.values()){
								if(!bannerIndex.image_url){//当忘记上传图片地址时
									this.errorTips("hbys1","请上传海报图片",index);
									return
								}
							}
							break
						case 'tpdh':
							if(!item.data){//当没有修改图片导航时
								this.errorTips("tpdh","请设置图片导航",index);
								return
							};
							if(!item.data.banners){
								this.errorTips("tpdh","请添加导航",index);
								return
							};
							if(item.data.banners){
								for(let bannerIndex of item.data.banners.values()){
									switch(true){
										case !bannerIndex.name:
											this.errorTips("tpdh","请填写导航名称",index);
											return
											break;
										case !bannerIndex.click_name:
											this.errorTips("tpdh","请添加导航链接",index);
											return
											break;
										case !bannerIndex.image_url:
											this.errorTips("tpdh","请上传导航图片",index);
											return
											break;
										case item.data.banners.length!==item.data.num:
											this.errorTips("tpdh","导航数量不匹配",index);
											return
											break;											
									}
								}
							};							
							break;
						case 'splb1':
							if(item.data.title_switch==='on'){
								if(!item.data.title){
									this.errorTips("splb1","请输入模块标题",index);
									return
								};								
							};
							break
						case 'splb2':
							if(item.data.title_switch==='on'){
								if(!item.data.title){								
									this.errorTips("splb2","请输入模块标题",index);
									return
								}								
							};
							break;
						case 'hbys2':
							if(item.data.title_switch==='on'){
								if(!item.data.title){								
									this.errorTips("hbys2","请输入模块标题",index);
									return
								}	
							};
							if(item.data.banners.length===0){
								this.errorTips("hbys2","请添加海报",index);
								return
							}
							if(item.data.banners.length!==0){
								for(let bannerIndex of item.data.banners.values()){
									if(!bannerIndex.image_url){//当忘记上传图片地址时
										this.errorTips("hbys2","请上传海报图片",index);
										return
									}
								}
							}																
							break;

					};
				};
				//保存装修接口
				existAssembly(this.correscomList)
				.then(({data})=>{					
					this.$message({
						message: '保存成功',
						type: 'success',
						showClose:'true'
					});
				})
			},
			errorTips(name,tips,index){//错误提示(公共方法)
				this.errorPlate[name]=true;
				this.$message.error(tips);
				this.errorIndex=index;
			},
			isBoolean(isArrt,booleans){//公共方法（中间模块的边框）
				isArrt.map(item=>this.errorPlate[item]=booleans)
			},
			controlImg(){
				this.txtImgSelect=false;
			},
			changeNum(val,index){//图片导航的图片数量改变
				let correscomList=this.correscomList[index];
				if(val==='选项1'){
					this.imageNav.splice(4)
					if(!correscomList.data){//当为null时也把num值加上
						correscomList.data={};
						correscomList.data.num=4;
						this.txtImgSelect=true
					}					
				}else if(val==='选项2'){
					this.imageNav=[
						{img:"",title:"导航一"},
						{img:"",title:"导航二"},
						{img:"",title:"导航三"},
						{img:"",title:"导航四"},
						{img:"",title:"导航五"},
						{img:"",title:"导航六"},
						{img:"",title:"导航七"},
						{img:"",title:"导航八"}
					];
					if(!correscomList.data){//当为null时也把num值加上
						correscomList.data={};
						correscomList.data.num=8;
						this.txtImgSelect=true;
					}
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.mallDecor_middle{
	 	position: absolute;
	    top: 120px;
	    left: 0;
	    right: 0;
	    width: 375px;
	    padding-bottom: 44px;
	    margin: auto;
	    background-color: #fff;
	    -webkit-box-shadow: 0 0 4px 0 rgba(51, 51, 51, 0.2);
	    box-shadow: 0 0 4px 0 rgba(51, 51, 51, 0.2);
	    background-color: #e6e6e6;
	    min-height: 88vh;
	}
	.bg_banner1{
		width: 375px;
		height: 210px;
		display: block;
		background-color: #E5F5FF;
	}
	.border_b{
		border: 1px solid #0070C9;
	}
	.preserveDecore{
		position: fixed;
	    z-index: 2000;
	    bottom: 0px;
	    width: 100%;
	    left: 0;
	    background-color: #F0F4F7;
	    padding-top: 6px;
	    padding-bottom: 6px;
	    -webkit-box-shadow: 0 -2px 10px rgba(98, 119, 140, .2);
	    box-shadow: 0 -2px 10px rgba(98, 119, 140, .2);
	}
	.btn{
		width: 116px;
	}
	.mallDecor_middle .imgNavCon{
		background-color: #fff;
		padding: 10px 0px 0px 0px;
	}
	.mallDecor_middle .imageTxtcon{
		margin-left: 21px;
		margin-right: 21px;
		margin-bottom: 20px;
		text-align: center;
	}
	.mallDecor_middle .imageTxt{
		display: inline-block;
		height: 50px;
		width: 50px;
		background-color:#E5F5FF;
	}
	.verticalLine{
		width: 4px;
		height: 16px;
		display: inline-block;
		background-color:#B4282D;
		margin-right: 5px;
		vertical-align: text-bottom;
	}
	.product_name{
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.product_name_two{
		width: 105px;
		min-height: 37px;
		display: -webkit-box;
	    -webkit-line-clamp: 2;
	    -webkit-box-orient: vertical;
	    overflow: hidden;
	    text-overflow: ellipsis;
	}
	.product_name_three{
		width: 105px;
		min-height: 37px;
		display: -webkit-box;
	    -webkit-line-clamp: 2;
	    -webkit-box-orient: vertical;
	    overflow: hidden;
	    text-overflow: ellipsis;
	}
	.product_name_four{
		width: 176px;
		min-height: 37px;
		display: -webkit-box;
	    -webkit-line-clamp: 2;
	    -webkit-box-orient: vertical;
	    overflow: hidden;
	    text-overflow: ellipsis;
	}
	.line{
		width: 100%;
		border-bottom: 1px solid #D9D9D9;
		padding-bottom: 15px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		
	}
	.imgTitle{
		width: 50px;
		margin-top: 5px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.tpdh{
		min-height: 99px;
		background-color: #fff;
	}
	.splb1{
		min-height: 415px;
		padding-top: 15px;
		padding-bottom: 15px;
		background-color: #fff;
	}
	.splb2{
		min-height: 260px;
		padding-top: 15px;
		padding-bottom: 15px;
		background-color: #fff;
	}
	.splb2 .item{
		width: 165px;
		min-height: 268px;
	}
	.line-21{
		line-height: 21px;
	}
	.dplb1{
		padding-top: 15px;
		padding-bottom: 15px;
		background-color: #fff;
	}
	.dplb1_plate{
		margin-left: 15px;
		margin-right: 15px;
		padding-bottom:15px;
		border-bottom: 1px solid  #D9D9D9;
	}
	.dplb1_top {
		padding-top: 10px;
		padding-bottom: 10px;
	}
	.dplb1_top .dplb1_top-left{
		height: 50px;
		width: 50px;
		background-color:#E5F5FF;
		border-radius: 50%;
		margin-right:10px; 
	}
	.dplb1_top .dplb1_top-right h2{
		font-size: 16px;
		color: #333;
		font-weight: normal;
	}
	.dplb1_top-mess{
		color: #7F7F7F;
		font-size: 12px;
		margin-top: 6px;
	}
	.dplb1_top-mess span{
		padding-right:10px;
	}
	.dplb1_bottom-con{
		margin-left: -9px;
	}
	.dplb1_bottom{
		height:80px;
		width: 80px;
		float: left;
		border-radius: 2px;
		margin-left: 8px;
		background-color:#E5F5FF;
	}
	.hbys2{
		padding-top: 15px;
	}
	.splb4{
		min-height: 180px;
		padding-top: 15px;
	}
	.splb4 .item{
		border: 1px solid #E6E6E6;
		height: 134px;
	}
	.splb4 .item-left{
		width: 176px;
		margin-top: 25px;
		padding-left: 15px;
		padding-right: 15px;
	}
	.py-18{
		padding-top: 18px;
		padding-bottom: 18px;
	}
	.border-red{
		border:1px solid #B4282D;
	}
</style>
<style>
.mallDecoration	.el-dialog--small {
	width: 992px;
}
.mallDecoration .el-tabs__header{
	margin: 0;
}
.mallDecoration .el-carousel__button{
	height: 6px;
	width: 6px;
	border-radius: 50%;
}
.mallDecoration  .el-select.changeNum{
	width: 100%;
}
.mallDecoration  .el-select.changeNum .el-input__inner{
	border-radius: 2px;
	height: 32px;
	line-height: 32px;
}
</style>