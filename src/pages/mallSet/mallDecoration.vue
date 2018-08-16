<template>
	<div class="mallDecoration">
		<div  class="mallDecor_middle" v-loading="mallSetMiddle">
			<img src="../../assets/image/top.jpg" class="w-100"/>
			<div class="mallPlate" v-for="(item,index) in correscomList" :key="index">
				<!--..................轮播海报一....................-->
				<div v-if="item.component_key==='hbys1'" class="cursor pos-r bg-f mt-10" @click="isShowPlate(index)"
					:class="index_plate===index?'border_b':errorPlate.hbys1 && index===errorIndex?'border-red':''" >	
					<!--..................当有数据时执行这里....................-->
					<div v-if="item.data!==null">	
						<el-carousel arrow="never" :interval="4000" height="210px" width="375px"> 		
							<el-carousel-item v-for="(imgNum,i) in item.data.banners" :key="i" style="display: block!important;">
								<img :src="imgNum.image_url" height="100%" width="100%">				
							</el-carousel-item>
						</el-carousel>
					</div>
					<!--..................当没有数据时执行这里....................-->
					<div v-if="item.data===null">
						<el-carousel arrow="never" :interval="4000" height="210px" width="375px">
							<el-carousel-item v-for="(img,n) in banner1" :key="n" style="display: block!important;" >								
								<b class="bg_banner1"></b>
							</el-carousel-item>
						</el-carousel>
					</div>
					<mallDecora :mallPlate='item' v-if="index_plate===index"></mallDecora>
					<!--......................上移下移删除箭头......................-->
					<arrow v-if="index_plate===index||(errorPlate.hbys1&&index===errorIndex)" :index="index" :mallDecor="correscomList" 
						:isError="errorPlate.hbys1&&index===errorIndex">						
					</arrow>						
				</div>
				<!--..................图片导航....................-->
				<div v-if="item.component_key==='tpdh'" class="cursor pos-r mt-10 tpdh"  @click="isShowPlate(index)"
					:class="index_plate===index?'border_b':errorPlate.tpdh && index===errorIndex?'border-red':''">
					
					<!--..................当有数据时执行这里....................-->
					<div v-if="item.data!==null && txtImgSelect===false" class="clearfix imgNavCon"> 
						<div  v-for="(itemImg,i) in item.data.banners" class="float-l">
							<div class="imageTxtcon">
								<img :src="itemImg.image_url" class="imageTxt"/>
								<p class="f12 color-3 imgTitle">{{itemImg.name}}</p>
							</div>
						</div>
					</div>
					<!--..................当没有数据时执行这里....................-->
					<div v-if="item.data===null || txtImgSelect===true" class="clearfix imgNavCon">
						<div  v-for="(itemImg,i) in imageNav" class="float-l"> 
							<div class="imageTxtcon">
								<b class="imageTxt"></b>
								<p class="f12 color-3">{{itemImg.title}}</p>
							</div>
						</div>
					</div>	
					<mallDecora  v-if="index_plate===index" :mallPlate='item' :index="index" @changeNum="changeNum" @controlImg="controlImg">						
					</mallDecora>
					<!--......................上移下移删除箭头......................-->
					<arrow v-if="index_plate===index||(errorPlate.tpdh&&index===errorIndex)" :index="index" :mallDecor="correscomList"
						:isError="errorPlate.tpdh && index===errorIndex">
						
					</arrow>	
				</div>
				<!--..................商品单列....................-->
				<div  v-if="item.component_key==='splb1'&&shopNum!==0" class="cursor pos-r mt-10 splb1"  @click="isShowPlate(index)"
					:class="index_plate===index?'border_b': errorPlate.splb1 && index===errorIndex?'border-red':''">	
					<h2 class="f16 color-3 text-c font-n line" v-if="item.data.title_switch==='on'">
						<i class="verticalLine"></i>{{item.data.title===null?"模块标题":item.data.title}}											
					</h2>
					<!--...................当商品搜索出来有数据时或者是商品已发布时....................-->
					<div v-if="item.list.length!==0">
						<div v-for="(single,index) in item.list" class="px-15 mb-20">
							<img :src="single.images[0].image_url" width="345" height="345" class="mt-15 display-b"/>
							<div class="color-3 f14 mt-10 product_name">{{single.product_name}}</div>
							<div class="clearfix mt-10">
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
					<div v-if="item.list.length===0">
						<div  class="px-15">
							<b class="mt-15 display-b" style="height: 345px; width: 345px; background-color: #E5F5FF;"></b>
							<div class="color-3 f14 mt-10 product_name">产品名称</div>
							<div class="clearfix mt-10">
								<p class="float-l f16 color-red clearfix"><b>￥</b><b >888</b></p>																																						
								<p class="float-r color-7F f12">销量：<span>888</span></p>							
							</div>
						</div>
					</div>					
					<!--....................右边.................-->
					<mallDecora v-if="index_plate===index" :mallPlate='item' :shopNum="shopNum"></mallDecora>
					<!--....................上下删除箭头.................-->
					<arrow v-if="index_plate===index||(errorPlate.splb1&&index===errorIndex)" :index="index" :mallDecor="correscomList"
						:isError="errorPlate.splb1&&index===errorIndex">
						
					</arrow>	
				</div>
				<!--..................商品双列....................-->
				<div  v-if="item.component_key==='splb2'&&shopNum!==0" class="cursor pos-r mt-10 splb2" @click="isShowPlate(index)"
					:class="index_plate===index?'border_b': errorPlate.splb2 && index===errorIndex?'border-red':''" >			
					<h2 class="f16 color-3 text-c font-n line" v-if="item.data.title_switch==='on'">
						<i class="verticalLine"></i>{{item.data.title===null?"模块标题":item.data.title}}											
					</h2>
					<!--...................当商品搜索出来有数据时或者是商品已发布时....................-->
					<div v-if="item.list.length!==0" class="clearfix">
						<div v-for="(single,index) in item.list" class="mb-20 item float-l pl-15">
							<img :src="single.images[0].image_url"  width="165" height="165" class="mt-15 display-b"/>
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
					<!--....................上下删除箭头.................-->
					<arrow v-if="index_plate===index||(errorPlate.splb2&&index===errorIndex)" :index="index" :mallDecor="correscomList"
					:isError="errorPlate.splb2&&index===errorIndex">
					</arrow>	
				</div>
				<!--..................商品三列....................-->
				<div  v-if="item.component_key==='splb3'&&shopNum!==0" class="cursor pos-r mt-10 splb3" @click="isShowPlate(index)"
				:class="index_plate===index?'border_b': errorPlate.splb3 && index===errorIndex?'border-red':''"	>
					<h2 class="f16 color-3 text-c font-n line" v-if="item.data.title_switch==='on'">
						<i class="verticalLine"></i>{{item.data.title===null?"模块标题":item.data.title}}											
					</h2>
					<!--...................当商品搜索出来有数据时或者是商品已发布时....................-->
					<div v-if="item.list.length!==0" class="clearfix">
						<div v-for="(single,index) in item.list" class="mb-20 item float-l pl-15">
							<img :src="single.images[0].image_url"  width="105" height="105" class="mt-15 display-b"/>
							<div class="color-3 f14 mt-10 product_name_two">{{single.product_name}}</div>
							<div class="clearfix mt-10 line-21">
								<p class="float-l f16 color-red clearfix">
									<b>￥</b>
									<b v-if="single.product_price_yuan.min==single.product_price_yuan.max">														
										{{single.product_price_yuan.min}}
									</b>
									<b v-else>{{single.product_price_yuan.min}}-{{single.product_price_yuan.max}}</b>
								</p>
							</div>
						</div>	
					</div>
					<!--...................没有搜索出来数据....................-->
					<div v-if="item.list.length===0" class="clearfix">
						<div v-for="item in threeRow" class="float-l pl-15">
							<b class="mt-15 display-b" style="height: 105px; width: 105px; background-color: #E5F5FF;"></b>
							<div class="color-3 f14 mt-10 product_name_three">产品名称</div>
							<div class="clearfix mt-10 line-21">
								<p class="float-l f16 color-red clearfix"><b>￥</b><b >888</b></p>													
							</div>
						</div>
					</div>		
					<!--....................右边.................-->
					<mallDecora v-if="index_plate===index" :mallPlate='item' :shopNum="shopNum"></mallDecora>
					<!--....................上下删除箭头.................-->
					<arrow v-if="index_plate===index||(errorPlate.splb3&&index===errorIndex)" :index="index" :mallDecor="correscomList"
					:isError="errorPlate.splb3&&index===errorIndex" >
						
					</arrow>	
				</div>
				<!--..................轮播海报二....................-->
				<div v-if="item.component_key==='hbys2'" class="cursor pos-r bg-f mt-10 hbys2"  @click="isShowPlate(index)"
					 :class="index_plate===index?'border_b': errorPlate.hbys2 && index===errorIndex?'border-red':''">
					<h2 class="f16 color-3 text-c font-n line" v-if="item.data.title_switch==='on'">
						<i class="verticalLine"></i>{{item.data.title===undefined?"模块标题":item.data.title}}											
					</h2>
					<!--..................当有数据时执行这里....................-->
					<div v-if="item.data.banners!==undefined" class="mt-10">	
						<el-carousel arrow="never" :interval="4000" height="179px" width="320px" type="card"> 		
							<el-carousel-item v-for="(imgNum,i) in item.data.banners" :key="i" style="display: block!important;">
								<img :src="imgNum.image_url" height="100%" width="100%">				
							</el-carousel-item>
						</el-carousel>
					</div>
					<!--..................当没有数据时执行这里....................-->
					<div v-if="item.data.banners===undefined" class="mt-10">
						<el-carousel arrow="never" :interval="4000" height="179px" width="320px" type="card" >
							<el-carousel-item v-for="(img,n) in banner2" :key="n" style="display: block!important;" >								
								<b class="bg_banner1"></b>
							</el-carousel-item>
						</el-carousel>
					</div>
					<mallDecora :mallPlate='item' v-if="index_plate===index"></mallDecora>
					<!--......................上移下移删除箭头......................-->
					<arrow v-if="index_plate===index||(errorPlate.hbys2&&index===errorIndex)"  :index="index" :mallDecor="correscomList"
					:isError="errorPlate.hbys2&&index===errorIndex">		
					</arrow>	
				</div>
				<!--..................商品列表....................-->
				<div v-if="item.component_key==='splb4'" class="cursor pos-r bg-f mt-10 splb4" @click="isShowPlate(index)"
					:class="index_plate===index?'border_b': errorPlate.splb4 && index===errorIndex?'border-red':''">
					
					<h2 class="f16 color-3 text-c font-n line" v-if="item.data.title_switch==='on'">
						<i class="verticalLine"></i>{{item.data.title===null||item.data.title===undefined?"模块标题":item.data.title}}											
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
					<!--....................上下删除箭头.................-->
					<arrow v-if="index_plate===index||(errorPlate.splb4&&index===errorIndex)" :index="index" :mallDecor="correscomList"
						:isError="errorPlate.splb4&&index===errorIndex">
					</arrow>	
				</div>
				<!--..................文字导航....................-->
				<div v-if="item.component_key==='wzdh'" class="cursor pos-r bg-f mt-10 wzdh"  @click="isShowPlate(index)"
					:class="index_plate===index?'border_b': errorPlate.wzdh && index===errorIndex?'border-red':''">
					<!--..................当有数据时执行这里....................-->
					<div v-if="item.data!==null" class="px-15">
						<div v-for="(itemTxt,txtSort) in item.data.banners" class="py-18" 
							:class="(txtSort+1)!==item.data.banners.length?'border-e9-b':''">
							<div class="clearfix">
								<span class="float-l">{{itemTxt.name}}</span>
								<i class="iconfont icon-shangyi1 color-7F float-r"></i>
							</div>
						</div>
					</div>
					<div v-if="item.data===undefined||item.data===null" class="px-15">
						<div v-for="(item,txtSort) in txtTitle" class="py-18" :class="(txtSort+1)!==txtTitle.length?'border-e9-b':''">
							<div class="clearfix">
								<span class="float-l color-3 f14">导航名字</span>
								<div class="float-r"><i class="iconfont icon-shangyi1 color-7F"></i></div>								
							</div>
						</div>
					</div>
					<!--....................右边.................-->
					<mallDecora v-if="index_plate===index" :mallPlate='item' :shopNum="shopNum"></mallDecora>
					<!--....................上下删除箭头.................-->
					<arrow v-if="index_plate===index||(errorPlate.wzdh&&index===errorIndex)" :index="index" :mallDecor="correscomList"
						:isError="errorPlate.wzdh && index===errorIndex">
					</arrow>	
				</div>
			</div>
		</div>
		<!--.........................自定义模块......................-->
		<autoPlate :componentList="componentList" :correscomList="correscomList" @addPlate="addPlate" v-loading="autoPlateLoad">
			
		</autoPlate>
		<!--.........................保存装修按钮......................-->
		<div class="preserveDecore">
			<div class="btn middle">
				<el-button class="store-button1 float-l px-30" @click="preserveDecore">保存装修</el-button>
			</div>			
		</div>
	</div>
</template>

<script>
	import {correscomList,existAssembly,getMallShopNum,getcomponentList} from "@/api/mallSet"
	import mallDecora from "@/components/mallSet/mallDecora"
	import arrow from "@/components/mallSet/arrow"
	import autoPlate from "@/components/mallSet/autoPlate"
	import {deletes} from "@/api/script"
	export default{
		components:{mallDecora,arrow,autoPlate},
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
					splb1:false,
					splb2:false,
					splb3:false,
					hbys2:false,
					splb4:false,
					wzdh:false
				},
				errorIndex:0,//验证错误的顺序（有两种相同样式时有用）
				componentList:[],//获取组件列表数据
				mallSetMiddle:true,
				autoPlateLoad:true,
			}
		},
		created(){		
			getMallShopNum()//商城商品上架数量
			.then(({data})=>{this.shopNum=data.product_num})
			.catch(({response:{data}})=>{
				this.$message.error(data.errorcmt)
			});
			//获取商城对应组件列表API
			correscomList()
			.then(({data})=>{
				this.correscomList=data;
				this.mallSetMiddle=false;
				this.correscomList.forEach(item=>{					
					if(item.component_key==='hbys2'&&item.data===null){item.data={title_switch:"on"};}//海报样式二时			
				})
			})
			.catch(({response:{data}})=>{
				this.$message.error(data.errorcmt)
			});
			//获取组件列表
			let comListData={component_type:0}
			getcomponentList(comListData)
			.then(({data})=>{
				this.componentList=data;
				this.autoPlateLoad=false;
			})
			.catch(({response:{data}})=>{
				this.$message.error(data.errorcmt)
			})
		},	
		methods:{
			addPlate(data){//自定义添加模块
				let attrs=["component_thumb_url","component_name","remark","component_form"];
				let editData=JSON.parse(JSON.stringify(data));//改变内存地址
				deletes(attrs, editData);//删除多余对象
				editData.sort=this.correscomList.length;//顺序	
				switch(true){//开始时的展示数量
					case data.component_key==="splb1":
						var num=1;break;						
					case data.component_key==="splb2":
						var num=2;break;						
					case data.component_key==="splb3":
						var num=3;break;						
					case data.component_key==="splb4":
						var num=6;break;						
				};
				if(data.component_key==="splb1"||data.component_key==="splb2"||
					data.component_key==="splb3"||data.component_key==="splb4"){
					editData.data={
						mall_category_id:0,
						product_ids:null,
						product_num:num,
						product_orderby:1,
						select_product_type:1,
						title:null,
						title_click_id:null,
						title_click_name:null,
						title_click_type:null,
						title_switch:"on",					
					}
					editData.list=[];
				}else if(data.component_key==="hbys2"){
					editData.data={title_switch:"on"}
				} else{
					editData.data=null;
				};				
				this.correscomList.push(editData);//向中间模块添加			
			},
			isShowPlate(index){//是否显示上下箭头，border,右边版块
				this.index_plate=index;
				let arr1=["hbys1","tpdh","splb1","splb2","splb3","hbys2","splb4","wzdh"];
				this.isBoolean(arr1,false)
			},
			preserveDecore(){//保存装修
				for(let [index,item] of this.correscomList.entries()){//保存装修错误验证
					switch(true){
						case item.component_key==='hbys1':
							if(item.data===null){//当没有修改轮播图时
								this.errorTips("hbys1","请设置海报样式",index);
								return
							}else if(item.data!==null){
								for(let bannerIndex of item.data.banners.values()){
									if(bannerIndex.image_url===undefined){//当忘记上传图片地址时
										this.errorTips("hbys1","请上传海报图片",index);
										return
									}
								}
							};
							break
						case item.component_key==='tpdh':
							if(item.data===null){//当没有修改图片导航时
								this.errorTips("tpdh","请设置图片导航",index);
								return
							}else if(item.data!==null){
								if(item.data.banners===undefined){
									this.errorTips("tpdh","请添加导航",index);
									return
								}else if(item.data.banners!==undefined){
									for(let bannerIndex of item.data.banners.values()){
										switch(true){
											case bannerIndex.name===undefined:
												this.errorTips("tpdh","请填写导航名称",index);
												return
												break;
											case bannerIndex.click_name===undefined:
												this.errorTips("tpdh","请添加导航链接",index);
												return
												break;
											case bannerIndex.image_url===undefined:
												this.errorTips("tpdh","请上传导航图片",index);
												return
												break;
											case item.data.banners.length!==item.data.num:
												this.errorTips("tpdh","导航数量不匹配",index);
												return
												break;											
										}
									}
								}								
							}
							break;	
						case item.component_key==='splb1':
							if(item.data.title_switch==='on'){
								if(item.data.title===null||item.data.title===''||item.data.title===undefined){
									this.errorTips("splb1","请输入模块标题",index);
									return
								}								
							};
							let dataAttr=item.data.product_ids.split(",");//下架或者删除的商品也在商城首页时的情况	
							let listAttr=item.list.map(item=>item.product_id);	
							if(dataAttr.length!==listAttr.length){//只下架商品，未补充下架商品的数量
								this.errorTips("splb1","该模块部分商品未上架,请手动更改",index);
								return
							};
							if(listAttr.includes(undefined)){listAttr=[];}															
							let splb1Union=new Set([...dataAttr,...listAttr]);
							if(dataAttr.length!==splb1Union.size){//下架商品，并补充下架商品的数量
								this.errorTips("splb1","该模块部分商品未上架,请手动更改",index);
								return
							}
							break;
						case item.component_key==='splb2':
							if(item.data.title_switch==='on'){
								if(item.data.title===null||item.data.title===''||item.data.title===undefined){								
									this.errorTips("splb2","请输入模块标题",index);
									return
								}								
							};
							let splb2DataAttr=item.data.product_ids.split(",");			
							let splb2ListAttr=item.list.map(item=>item.product_id);
							if(splb2DataAttr.length!==splb2ListAttr.length){//只下架商品，未补充下架商品的数量
								this.errorTips("splb2","该模块部分商品未上架,请手动更改",index);
								return
							};
							if(splb2ListAttr.includes(undefined)){splb2ListAttr=[];}			
							let splb2Union=new Set([...splb2DataAttr,...splb2ListAttr]);
							if(splb2DataAttr.length!==splb2Union.size){
								this.errorTips("splb2","该模块部分商品未上架,请手动更改",index);
								return
							}
							break;
						case item.component_key==='splb3':
							if(item.data.title_switch==='on'){
								if(item.data.title===null||item.data.title===''||item.data.title===undefined){
									this.errorTips("splb3","请输入模块标题",index);
									return
								};								
							};
							let splb3DataAttr=item.data.product_ids.split(",");			
							let splb3ListAttr=item.list.map(item=>item.product_id);
							if(splb3DataAttr.length!==splb3ListAttr.length){
								this.errorTips("splb3","该模块部分商品未上架,请手动更改",index);
								return
							}
							if(splb3ListAttr.includes(undefined)){splb3ListAttr=[];}	
							let splb3Union=new Set([...splb3DataAttr,...splb3ListAttr]);
							if(splb3DataAttr.length!==splb3Union.size){
								this.errorTips("splb3","该模块部分商品未上架,请手动更改",index);
								return
							}
							break;
						case item.component_key==='hbys2':
							if(item.data.title_switch==='on'){
								if(item.data.title===null||item.data.title===''||item.data.title===undefined){								
									this.errorTips("hbys2","请输入模块标题",index);
									return
								}	
							};
							if(item.data.banners.length===0){this.errorTips("hbys2","请添加海报",index);return}
							if(item.data.banners.length!==0){
								for(let bannerIndex of item.data.banners.values()){
									if(bannerIndex.image_url===undefined){//当忘记上传图片地址时
										this.errorTips("hbys2","请上传海报图片",index);return										
									}
								}
							}																
							break;
						case item.component_key==='splb4':
							if(item.data.title_switch==='on'){
								if(item.data.title===null||item.data.title===''||item.data.title===undefined){
									this.errorTips("splb4","请输入模块标题",index);
									return
								};								
							};
							let splb4DataAttr=item.data.product_ids.split(",");			
							let splb4ListAttr=item.list.map(item=>item.product_id);
							if(splb4DataAttr.length!==splb4ListAttr.length){//只下架商品，未补充下架商品的数量
								this.errorTips("splb4","该模块部分商品未上架,请手动更改",index);
								return
							};
							if(splb4ListAttr.includes(undefined)){splb4ListAttr=[];}	
							let splb4Union=new Set([...splb4DataAttr,...splb4ListAttr]);
							if(splb4DataAttr.length!==splb4Union.size){
								this.errorTips("splb4","该模块部分商品未上架,请手动更改",index);
								return
							}
							break
						case item.component_key==='wzdh':
							if(item.data===null){
								this.errorTips("wzdh","请设置文字导航",index);
								return
							}else if(item.data!==null){
								if(item.data.banners!==undefined){
									for(let bannerIndex of item.data.banners.values()){
										if(bannerIndex.name===undefined){
											this.errorTips("wzdh","请填写导航名称",index);
											return
										}else if(bannerIndex.click_name===undefined){
											this.errorTips("wzdh","请添加导航链接",index);
											return
										}
									}
								}	
							}
							break;
					};
				};
				//保存装修接口
				existAssembly(this.correscomList)
				.then(({data})=>{					
					this.$message({message: '保存成功', type: 'success',showClose:'true'});
				})
				.catch(({response:{data}})=>{
					this.$message.error(data.errorcmt)
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
				if(val==='选项1'){
					this.imageNav=[{img:"",title:"导航一"},{img:"",title:"导航二"},{img:"",title:"导航三"},{img:"",title:"导航四"}];
					if(this.correscomList[index].data===null){//当为null时也把num值加上
						this.correscomList[index].data={};
						this.correscomList[index].data.num=4;
						this.txtImgSelect=true
					}					
				}else if(val==='选项2'){
					this.imageNav=[{img:"",title:"导航一"},{img:"",title:"导航二"},{img:"",title:"导航三"},{img:"",title:"导航四"},
					{img:"",title:"导航五"},{img:"",title:"导航六"},{img:"",title:"导航七"},{img:"",title:"导航八"}];
					if(this.correscomList[index].data===null){//当为null时也把num值加上
						this.correscomList[index].data={};
						this.correscomList[index].data.num=8;
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
	    top: 110px;
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
		min-height: 258px;
	}
	.line-21{
		line-height: 21px;
	}
	.splb3{
		padding-top: 15px;
		padding-bottom: 15px;
		background-color: #fff;
	}
	.splb3 .item{
		width: 105px;
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
	.wzdh{
		min-height: 98px;
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