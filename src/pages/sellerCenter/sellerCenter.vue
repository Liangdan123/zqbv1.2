<template>
	<div class="allsellerCenter">
		<div class="sellerCenter" @click="isDropdown=false" v-if="isShow">
			<!--................没有店铺时弹出的弹框.............-->
			<el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
				<img :src="urls" class="storeLogo"/>
				<div v-if="status===3||status===2">
					<p class="f14 color-3 mt-30 mb-30">该账号尚未添加店铺信息</p>
					<el-button class="store-button1 openStore" @click="openStore">我要开店</el-button>
				</div>
				<div v-if="status===0">
					<p class="f20 color-3 mt-20 mb-10 font-b">您的开店申请现已提交，请耐心等待</p>
					<span class="f16 color-3 ">审核通过后将以短信的形式通知您</span>
				</div>
			</el-dialog>
			<!--................违规提醒弹框.............-->
			<el-dialog :visible.sync="isIrregularities" :close-on-click-modal="false"  :close-on-press-escape="false" title="商品违规提醒"
				 class="isIr_bg" :modal="false">
				<el-tabs v-model="pintEvent" @tab-click="pintEvents">
					<el-tab-pane label="待处理违规提醒" name="treated" >
						<Irregularities :IrreMess="IrreMess" @editDood="editDood"></Irregularities>
					</el-tab-pane>
	    			<el-tab-pane label="历史违规提醒" name="historical" >
	    				<Irregularities :IrreMess="IrreMess" @editDood="editDood"></Irregularities>
	    			</el-tab-pane>
				</el-tabs>
				<div class="clearfix">
					<pagination class="float-r mt-20" @handleCurrent="handleCurrent" :pageData="IrreMess" :pageMess="IrregularitiesData"></pagination>
				</div>									
			</el-dialog>
			
			<div class="content">
				<!--................累计金额.............-->
				<div class="count clearfix mb-20">
					<div class="plate bg-f mr-20 ">
						<div class="border-b clearfix">
							<div class="float-l mb-10">
								<span class="color-7F f14">总销售额</span>
								<p class="color-3 font-b f24 mt-10">
									￥{{total.total_sell_money_yuan}}
								</p>
							</div>
							<svg width="48" height="48" class="float-r"><use xlink:href="#money"/></svg>													
						</div>
						<div>
							<p class="color-7F f14 mt-10">
								今日销售额
								<span class="color-3">￥{{total.today_sell_money_yuan}}</span>
							</p>
						</div>
					</div>
					<div class="plate bg-f mr-20">
						<div class="border-b clearfix">
							<div class="float-l mb-10">
								<span class="color-7F f14">支付订单数</span>
								<p class="color-3 font-b f24 mt-10">{{total.total_pay_order_num}}</p>																
							</div>
							<svg width="48" height="48" class="float-r"><use xlink:href="#payOrder"/></svg>													
						</div>
						<div>
							<p class="color-7F f14 mt-10">
								今日订单数
								<span class="color-3">{{total.today_pay_order_num}}</span>
							</p>
						</div>
					</div>
					<div class="plate bg-f mr-20">
						<div class="border-b clearfix">
							<div class="float-l mb-10">
								<span class="color-7F f14">访问量</span>
								<p class="color-3 font-b f24 mt-10">
									{{total.total_pv_num}}
								</p>
							</div>
							<svg width="48" height="48" class="float-r"><use xlink:href="#member"/></svg>													
						</div>
						<div>
							<p class="color-7F f14 mt-10">
								今日访客量
								<span class="color-3">{{total.today_pv_num}}</span>
							</p>
						</div>					
					</div>
					<div class="plate bg-f">
						<div class="border-b clearfix">
							<div class="float-l mb-10">
								<span class="color-7F f14">访客量</span>
								<p class="color-3 font-b f24 mt-10">	
									{{total.total_uv_num}}
								</p>
							</div>
							<svg width="48" height="48" class="float-r">
								<use xlink:href="#visitNum"  />
							</svg>
						</div>
						<div>
							<p class="color-7F f14 mt-10">
								今日访客数
								<span class="color-3">{{total.today_uv_num}}</span>
							</p>
						</div>	
					</div>
				</div>
				<!--.....................店铺动态和待处理事件..............-->
				<div class="dynamicEvent clearfix">
					<!--.....................店铺动态..............-->
					<div class="dynamic float-l">
						<h3 class="color-3 f14 shopTitle">店铺动态</h3>
						<div v-if="DynamicList.length>0">
							<div class="dynamicLists" v-for="item in DynamicList">
								<div class="storeItem clearfix">
									<div class="storeItemLf float-l mr-10"><i class="iconfont icon-hebingxingzhuang"></i></div>
									<div class="storeItemRt float-l">
										<div class="top color-3 f14">
											{{item.nick_name}}
											{{item.operate_type===1?"购买了":item.operate_type===2?"确认收货":item.operate_type===3?"申请了"
											:item.operate_type===4?"撤销了":item.operate_type===101?"发布了商品":"装修了店铺"}}
											<span v-if="item.operate_type===1" v-for="child in item.remark.split(';')" class="color-b">
												{{child}}
											</span>
											<span class="color-red">{{item.operate_type===3?"退款":""}}</span>
											<span class="color-b">{{item.operate_type===4?"退款申请":""}}</span>										
										</div>
										<div class="bottom f12 color-7F">{{item.created_at_show}}</div>
									</div>
								</div>						
							</div>
						</div>
						<div v-if="DynamicList.length===0">
							<div v-for="item in empty" class="storeItem">
								{{item.index}}
							</div>
						</div>
					</div>
					<!--.....................待处理事件..............-->
					<div class="event float-r">
						<h3 class="color-3 f14 shopTitle">待处理事件</h3>
						<div class="storeItem clearfix lh cursor" @click="expressJump('express')">
							<span class="float-l color-3 f14">快递配送-待发货订单</span>
							<div class="float-r btn">{{getNum.need_delivery_express}}</div>
						</div>
						<div class="storeItem clearfix lh cursor" @click="expressJump('shop')">
							<span class="float-l color-3 f14">门店配送-待送货订单</span>
							<div class="float-r btn">{{getNum.need_delivery_shop}}</div>
						</div>
						<div class="storeItem clearfix lh cursor" @click="expressJump('self')">
							<span class="float-l color-3 f14">上门自提-待备货订单</span>
							<div class="float-r btn">{{getNum.need_delivery_self}}</div>
						</div>
						<div class="storeItem clearfix lh cursor" @click="lockStore">
							<span class="float-l color-3 f14">库存不足商品</span>
							<div class="float-r btn">{{getNum.sellout_product}}</div>
						</div>
						<div class="storeItem clearfix lh cursor" @click="refund">
							<span class="float-l color-3 f14">退款/售后申请</span>
							<div class="float-r btn">{{getNum.need_refund}}</div>
						</div>
						<div class="storeItem clearfix lh cursor" @click="illegal_warn">
							<span class="float-l color-3 f14">商品违规提醒</span>
							<div class="float-r btn">{{getNum.illegal_warn}}</div>
						</div>
					</div>
				</div>
				<!--.....................销售额订单数访问量访客量..............-->
				<div class="tableFour mt-20 pos-r">
					<!--.....................日期选择..............-->
					<div @click.stop="">
						<el-tabs v-model="activeTime" @tab-click="handleTime" class="pos-a activeTime">
							<el-tab-pane label="本周" name="week"></el-tab-pane>
						    <el-tab-pane label="本月" name="month"></el-tab-pane>			   
						    <el-tab-pane label="全年" name="year"></el-tab-pane>
						</el-tabs>
					</div>
					<el-date-picker  v-model="choiceDate" type="daterange" placeholder="选择日期范围" class="pos-a choiceDate"
						 @change="changeTime" :class="isDropdown?'Dropdown':''">
	      			</el-date-picker>
	          
					<!--.....................表格..............-->
					<el-tabs v-model="activeName" @tab-click="handleClick">
					    <el-tab-pane label="销售额" name="first">
					    	<div v-if="mallDataTitle==='销售额趋势'">
					    		<tableData :mallData="mallData" :mallDataTitle="mallDataTitle" :tabName="tabName"></tableData>
					    	</div>
					    </el-tab-pane>
					    <el-tab-pane label="订单数" name="second">
					    	<div v-if="mallDataTitle==='订单数趋势'">
					    		<tableData :mallData="mallData" :mallDataTitle="mallDataTitle" :tabName="tabName"></tableData>
					    	</div>
					    </el-tab-pane>
					    <el-tab-pane label="访问量" name="third">
					    	<div v-if="mallDataTitle==='访问量趋势'">
					    		<tableData :mallData="mallData" :mallDataTitle="mallDataTitle" :tabName="tabName"></tableData>
					    	</div>
					    </el-tab-pane>
					    <el-tab-pane label="访客量" name="fourth">
					    	<div v-if="mallDataTitle==='访客量趋势'">
					    		<tableData :mallData="mallData" :mallDataTitle="mallDataTitle" :tabName="tabName"></tableData>
					    	</div>
					    </el-tab-pane>
					</el-tabs>
				</div>
			</div>
		</div>
		<!--............................编辑商品.................-->
		<productMess v-if="editPro" :ediorMess="onlyProductMess"  @seePro="seePro" @closeEditor="closeEditor" :title="title"></productMess>
					
	</div>
</template>

<script>
	import {getStoreData,getshopDynamics,getDynamicsNum,getStoreNum,getIrregularities,is_read} from "@/api/seller"
	import {getUserMess,getChecksStatus} from "@/api/myStore"
	import { format } from "@/api/script"
	import tableData from "@/components/sellerCenter/table"
	import router from "@/router"
	import * as links from "@/links/index"
	import * as types from "@/store/mutation-types"
	import  Irregularities from "@/components/sellerCenter/Irregularities"
	import pagination from "@/components/order/pagination"
	import productMess from "@/components/commodity/productMess"
	export default{
		data(){
			return{
				total:{},
				setDynamic:{
				    shop_id: "",
				    page: 1,
				    per_page: 5
				},
				DynamicList:[],
				empty:[
					{index:""},
					{index:""},
					{index:""},				
					{index:""},			
					{index:""},	
					{index:""}
				],
				DynamicNum:{shop_id: ""},				
				getNum:{},
				clearNumTime:"",
				clearDynamicTime:"",
				activeName:"first",
				activeTime:"week",
				choiceDate:[],
				timeDate:{shop_id: "",  start_date: "", end_date: ""},									  				   				
				now:"",
				year:"",
				month:"",
				mallData:{},//商城数据
				mallDataTitle:"销售额趋势",
				tabName:"week",
				isDropdown:false,
				index:0,
				dialogVisible:false,
				urls:links.IMG,//弹窗图片链接
				status:"",
				isIrregularities:false,//违规提醒弹框是否显示
				pintEvent:"treated",
				IrregularitiesData:{
					shop_id:"",
				    search:{is_read:1},				    
				    page: 1,
				    per_page: 20
				},
				IrreMess:{data:[]},//商品违规获取的信息	
				isShow:true,
				editPro:false,//商品违规获取的信息	
				title:"编辑商品",
				onlyProductMess:{},
				illegal_id:""
			}
		},
		created(){	
			//审核状态
			getChecksStatus()
			.then(({data})=>{
				this.status=data.auth_status;//审核状态
				switch(true){
					case data.auth_status===1:
						this.hasShopId();//审核通过一定是有店铺信息的
						break;
					case data.auth_status===0||data.auth_status===2||data.auth_status===3:
						this.dialogVisible=true;//未审核，待审核，不通过审核弹框弹出
						break;
				}
			})
			.catch(({response: {data}})=>{
				 this.$message.error(data.errorcmt);
			})
		},		
		components:{
			tableData,Irregularities,pagination,productMess
		},
		beforeRouteLeave(to, from, next){
			next(true);
			clearInterval(this.clearNumTime);
			clearInterval(this.clearDynamicTime);
		},
		methods:{			
			//获取shop_id
			hasShopId(){
				this.dialogVisible=false;//长度大于0时关闭弹窗						
				getUserMess()
				.then(({data})=>{				
					let len=data.length;//没有数据时长度为0
					this.$store.commit(types.MESSLENGTH,len);//保存shop_id		
					let shop_id = data[0].shop_id;							
					this.IrregularitiesData.shop_id=shop_id;//传给违规提醒接口数据				
					this.$store.commit(types.GETSHOPID, shop_id);
					this.hasStoreMess(shop_id);					
				})
				.catch(({response: {data}})=>{
				})
			},	
			hasStoreMess(shop_id){
				this.$set(this.timeDate,"shop_id",shop_id)			
				this.StoreData(shop_id)//调用获取商城数据接口
				this.$set(this.setDynamic,"shop_id",shop_id);
				//时时调用动态列表接口
				var that=this
				this.shopDynamicsAPI(this.setDynamic);				
	//			this.clearDynamicTime=setInterval(function(){that.shopDynamicsAPI(that.setDynamic)},10000);		
				this.$set(this.DynamicNum,"shop_id",shop_id);
				//时时调用获取店铺待处理事件数量接口
				this.DynamicsNumAPI(this.DynamicNum);				
	//			this.clearNumTime=setInterval(function(){that.DynamicsNumAPI(that.DynamicNum)},10000);		
				//默认本周表格数据
				this.timeDate.start_date=this.selfWeek(0);
				//本周结束时间
				this.timeDate.end_date=this.selfWeek(-6);
				this.storeAPI(this.timeDate);
				//时间框显示时间
				this.visitPicked();
			},
			openStore(){//开店信息
				router.push("/realName")
			},
			//调用获取商城数据接口
			StoreData(data){				
				getStoreData(data)
				.then(({data})=>{this.total=data})									
				.catch(({response: {data}})=>{
					this.$message.error(data.errorcmt);
				})
			},
			//库存不足按钮
			lockStore(){
				if(this.getNum.sellout_product>0){router.push({path:"/zxh/commodityPage/sale_commodity",query:{number:0}})}				
			},
			//退款售后申请
			refund(){
				if(this.getNum.need_refund>0){router.push({path:"/zxh/orderPage/refundOrder",query:{name:"refund"}})};				
			},
			//点击快递配送
			expressJump(data){
				if(this.getNum.need_delivery_shop>0||this.getNum.need_delivery_self>0||this.getNum.need_delivery_express>0){
					this.routerJump(data);
				}				
			},
			illegal_warn(){//违规提醒事件
				this.isIrregularities=true;
				this.searchMethods();
			},
			pintEvents(){//违规处理切换	
				if(this.pintEvent==="treated"){
					this.IrregularitiesData.search=Object.assign({},this.IrregularitiesData.search,{is_read:1});
					this.searchMethods();
				}else if(this.pintEvent==="historical")	{		
					this.IrregularitiesData.search=Object.assign({},this.IrregularitiesData.search,{is_read:2});
					this.searchMethods();
				}
			},
			searchMethods(){//违规提醒列表方法
				if (this.IrregularitiesData.page == 1) {
				    //页面在第一页搜索手动调接口获取数据列表
				    this.illegal_list(this.IrregularitiesData);
				} else {
				    //页面在第一页搜索列表就让他回到第一页然后触发handleCurrentChange（）方法（页面更改设置触发）
				    this.IrregularitiesData.page = 1;
				}				
		    },
		    handleCurrent(val){//分页事件
		    	this.$set(this.IrregularitiesData, "page", val);		    	
				this.illegal_list(this.IrregularitiesData);//调用列表接口
		    },
			illegal_list(mess){//违规列表接口
				getIrregularities(mess)
				.then(({data})=>{this.IrreMess=data})			
				.catch(({response: {data}})=>{
					this.$message.error(data.errorcmt);
				})
			},	
			editDood(data,illegal_id){//违规提醒中的编辑商品按钮
				this.onlyProductMess=data;
				this.isShow=false;
				this.editPro=true;
				this.illegal_id=illegal_id;
			},
			seePro(data,message){//下架商品,保存商品
				if(message){// 更新数据
				  	this.$set(this.onlyProductMess,'distributes',message);
				  	if(this.pintEvent==="treated"){
				  		let illegal_id=this.illegal_id
				  		is_read(illegal_id)//保存成功就成为历史违规提醒
					  	.then(({data})=>{
					  		this.searchMethods();//重新掉列表接口
					  	})
					  	.catch(({response:{data}})=>{
					  		this.$message.error(data.errorcmt);
					  	})
				  	}
				};
				this.isShow=true;
				this.editPro=false;				
			},
			closeEditor(){//商品编辑的取消按钮
				this.isShow=true;
				this.editPro=false;
				this.searchMethods();
			},
			routerJump(data){
				router.push({path:"/zxh/orderPage/UnshippedOrder",query:{name:data}})
			},
			visitPicked(){
				this.isDropdown=true;
				this.$set(this.choiceDate, 0, new Date(this.timeDate.start_date))
				this.$set(this.choiceDate, 1, new Date(this.timeDate.end_date))				
			},
			shopDynamicsAPI(data){
				//获取动态列表接口
				getshopDynamics(data)
				.then(({data})=>{
					this.DynamicList=data;
				})
				.catch(({response: {data}})=>{
					this.$message.error(data.errorcmt);
				})	
			},
			DynamicsNumAPI(data){
				//获取店铺待处理事件数量API
				getDynamicsNum(data)
				.then(({data})=>{
					this.getNum=data
				})
				.catch(({response: {data}})=>{
					this.$message.error(data.errorcmt);
				})	
			},
			handleClick(tab){
				switch(true){
					case tab.name==="first":
						this.mallDataTitle="销售额趋势";
						break;
					case tab.name==="second":
						this.mallDataTitle="订单数趋势";
						break;
					case tab.name==="third":
						this.mallDataTitle="访问量趋势";
						break;
					case tab.name==="fourth":
						this.mallDataTitle="访客量趋势";
						break;
				}
			},
			//点击切换
			handleTime(tab){
				//本周
				if(tab.name==="week"){
					//本周开始时间
					this.timeDate.start_date=this.selfWeek(0);
					//本周结束时间
					this.timeDate.end_date=this.selfWeek(-6);
					this.visitPicked();
					this.storeAPI(this.timeDate);
				};
				//本月
				if(tab.name==="month"){
					this.commonTime();
					this.timeDate.start_date=this.year+"-"+(this.month<10?('0'+this.month):this.month)+"-"+"01";
					this.timeDate.end_date=this.selfMonth();
					this.storeAPI(this.timeDate);
					//时间框显示时间
					this.visitPicked();
					
				};
				//全年
				if(tab.name==="year"){
					this.commonTime();
					this.timeDate.start_date=this.year+"-"+"01"+"-"+"01";
					this.timeDate.end_date=this.year+"-"+"12"+"-"+"31";
					this.storeAPI(this.timeDate);
					//时间框显示时间
					this.visitPicked();
				};
				this.tabName=tab.name
			},
			//本周方法
			selfWeek(n){
				//调用时间公共方法
				this.commonTime();
				var date=this.now.getDate();
				var day=this.now.getDay();
				if(day!==0){n=n+(day-1);}else{n=n+day;};				
				if(day){					
					if(this.month>1){//这个判断是为了解决跨年的问题
						this.month=this.month;
					}else{//这个判断是为了解决跨年的问题,月份是从0开始的									
						this.year=this.year-1;
						this.month=12;
					}
				};
				this.now.setDate(this.now.getDate()-n);	
				this.year=this.now.getFullYear();
				this.month=this.now.getMonth()+1;
				date=this.now.getDate();
				let s=this.year+"-"+(this.month<10?('0'+this.month):this.month)+"-"+(date<10?('0'+date):date);
				return s;
			},
			//时间公共方法
			commonTime(){				
				this.now=new Date();				
				this.year = this.now.getFullYear();			
    			this.month = this.now.getMonth()+1;
			},
			//本月方法(末尾)
			selfMonth(){
				//调用时间公共方法
				this.commonTime();
    			var d = new Date(this.year, this.month, 0);//0表示月底				
				var s=this.year+"-"+(this.month<10?("0"+this.month):this.month)+"-"+d.getDate()
    			return s;
			},
			//获取店铺统计图数据API
			storeAPI(data){
				getStoreNum(data)
				.then(({data})=>{
					this.mallData=data;
				})
				.catch(({response: {data}})=>{
					this.$message.error(data.errorcmt);
				})	
			},
			changeTime(){
				if((this.choiceDate[0]!==null||this.choiceDate[1]!==null)&&this.isDropdown===false){
					this.timeDate.start_date=format(this.choiceDate[0]);
					this.timeDate.end_date=format(this.choiceDate[1]);					
					this.index++;//使表格的computed有用
					this.tabName="timeTable"+this.index;
					this.storeAPI(this.timeDate);
					this.activeTime="";
				};
			},
		}
	}
</script>

<style scoped="scoped">
	.sellerCenter{
		margin-top: 80px;
	}
	.content{
		box-sizing: border-box;
	    width: 1240px;
	    min-height: 204px;
	    border-radius: 4px;
	    margin: 0 auto;
	}
	.plate{
		float: left;
		padding: 20px;
		width: 255px;
		height: 102px;
		border-radius: 2px;
	}
	.border-b{
		border-bottom: 1px solid #F0F4F7;
	}
	.dynamic{
		padding: 20px;
		width: 885px;
		background-color: #fff;
		height: 354px;
	}
	.shopTitle{
		padding-bottom: 18px;
		border-bottom: 1px solid #F0F4F7;
	}
	.storeItem{
		height: 30px;
		padding-top: 11px;
		padding-bottom: 11px;
		border-bottom: 1px solid #F0F4F7;
	}
	.storeItemRt{
		width: 845px;
	}	
	.storeItemRt .top{
		white-space: nowrap;
	    overflow: hidden;
	    text-overflow: ellipsis;
	}
	.storeItem:hover{
		background-color:#F8FAFC ;
	}
	.storeItemLf{
		position: relative;
		height: 30px;
		width: 30px;
		border-radius: 50%;
		background-color: #0070C9;
	}
	.storeItemLf i{
		position: absolute;
		color: #fff;
		font-size: 24px;
		left: 50%;
		top: 50%;
		margin-top: -12px;
		margin-left: -12px;
	}
	.event{
		width: 255px;
		padding: 20px;
		height: 354px;
		background-color: #fff;
	}
	.lh{
		line-height: 33px;
	}
	.btn{
		width: 48px;
		height: 24px;
		border-radius: 12px;
		background-color: #008FF2;
		text-align: center;
		color: #fff;
		line-height: 24px;
		margin-top:4px;
	}
	.tableFour{
		padding:20px 20px 40px;
		background-color: #fff;
	}
	.sellerCenter .storeLogo{
		width: 104px;
		height: 104px;
	}
	.sellerCenter .openStore{
		border-radius: 2px;
		padding-left: 50px;
		padding-right: 50px;
	}
	.isIr_bg.el-dialog__wrapper{
		background-color: #fff;
		top: 50px;
		z-index: 1000!important;
	}
	.allsellerCenter .pulishCon{
		margin-top: 70px;
	}
</style>
<style>
	.activeTime{
		right: 250px;
		top: 20px;
		z-index:100;
	}
	.activeTime .el-tabs__header{
		border-bottom: none;
	}
	.activeTime  .el-tabs__active-bar{
		background-color: transparent;
	}
	.choiceDate{
		right: 20px;
		top: 22px;
		z-index: 100;
	}
	.choiceDate .el-input__icon+.el-input__inner{
		height: 32px;
		line-height: 32px;
	}
	.sellerCenter .el-dialog--small{
		width: 600px;
		text-align: center;
	}
	.sellerCenter .isIr_bg.el-dialog__wrapper .el-dialog--small{
		width: 1240px;
		text-align: initial;
		top: 0!important;
		
	}
</style>