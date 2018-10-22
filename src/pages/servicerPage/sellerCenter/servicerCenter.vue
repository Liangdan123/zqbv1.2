<template>
	<div class="servicerCenter">
		<!--................没有店铺时弹出的弹框.............-->
		<el-dialog 
			:visible.sync="dialogVisible" 
			:close-on-click-modal="false" 
			:close-on-press-escape="false" 
			:show-close="false"
			custom-class="noOpenStore">
			<img :src="urls"/>
			<div>
				<h4 class="">店铺信息未添加，请先添加店铺信息！</h4>
				<el-button class="store-button1 openStore" @click="openStore">
					我要开店
				</el-button>
				<p @click="loginOut">退出</p>
			</div>
		</el-dialog>
	
		<!--................累计金额.............-->
		<div class="count clearfix" >
			<div class="plate bg-f mr-20 ">
				<div class="border-b clearfix">
					<div class="float-l mb-10">
						<span class="color-7F f14">总销售额</span>
						<p class="color-3 font-b f24 mt-10">
							{{total.total_sell_money_yuan||0|money}}
						</p>
					</div>
					<svg width="48" height="48" class="float-r"><use xlink:href="#money"/></svg>													
				</div>
				<div>
					<p class="color-7F f14 mt-10">
						今日销售额
						<span class="color-3">{{total.today_sell_money_yuan||0|money}}</span>
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
				<div>		
					<div v-if="DynamicList.length>0"> 											
						<div class="dynamicLists" 
							v-for="item in DynamicList"> 						
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
			</div>		
			<!--.....................待处理事件..............-->
			<div class="event float-r">
				<h3 class="color-3 f14 shopTitle">待处理事件</h3>
				<div class="clearfix lh cursor" @click="jumpPage('待服务订单')">
					<span class="float-l color-3 f14">待服务订单</span>
					<div class="float-r btn">{{getNum.need_delivery}}</div>
				</div>
				<div class="clearfix lh cursor" @click="jumpPage('服务中订单待操作')">
					<span class="float-l color-3 f14">服务中订单待操作</span>
					<div class="float-r btn">{{getNum.need_complete}}</div>
				</div>
				<div class=" clearfix lh cursor" @click="jumpPage('退款申请')">
					<span class="float-l color-3 f14">退款申请</span>
					<div class="float-r btn">{{getNum.need_refund}}</div>
				</div>
				<div class="clearfix lh cursor" @click="Irregularities">
					<span class="float-l color-3 f14">违规提醒</span>
					<div class="float-r btn">{{getNum.illegal_warn}}</div>
				</div>
			</div>			
		</div>
		<!--.....................四个表格..............-->
		<ECharts
			:chart-data="statisticsData"
			:statistics-key="statisticsTabShow"
			@timeRange="timeRangeChange">
			<el-tabs v-model="statisticsTabShow"  slot="tab">
                <el-tab-pane label="销售额" name="total_sell_money_yuan"></el-tab-pane>
                <el-tab-pane label="订单数" name="total_pay_order_num"></el-tab-pane>
                <el-tab-pane label="访问量" name="total_pv_num"></el-tab-pane>
                <el-tab-pane label="访客量" name="total_uv_num"></el-tab-pane>
            </el-tabs>
		</ECharts>
	</div>
</template>

<script>
	import * as links from "@/links/index"
	import {getUserMess,getStoreData,getshopDynamics,getDynamicsNum} from "@/api/servicer"
	import {getStoreStatistics} from "@/api/platform"
	import router from "@/router"
	export default{
		name:"servicerCenter",
		components:{
			'ECharts':()=>import('@/components/servicer/sellerCenter/Echarts')
		},
		data(){
			return {
				dialogVisible:false,
				urls:links.IMG,//弹窗图片链接
				total:{},
				statisticsData:[],// 店铺表格统计数据
				statisticsTabShow:'total_sell_money_yuan',
				DynamicList:[],//店铺动态列表
				empty:[//店铺动态没有数据时
					{index:""},
					{index:""},
					{index:""},				
					{index:""},			
					{index:""},	
					{index:""}
				],
				clearNumTime:"",
				clearDynamicTime:"",
				getNum:{},
				loadDynamic:true,
				loadUntreated:true,
				loadTotal:true,
				shopId:"",
				shopLength:"",
			}
		},
		created(){
			this.shopLength=this.$store.getters.getMessLength;
			if(this.shopLength===0){//没有店铺弹出弹框让其开店
				this.dialogVisible=true
				return 
			}
			this._shopId();			
			setTimeout(this.getUser(),5000)//获取服务商店铺
		},
		beforeRouteLeave(to, from, next){
			clearInterval(this.clearNumTime);
			clearInterval(this.clearDynamicTime);
			next(true);
		},
		filters:{
            money(value=0,label=''){
                // 金额转换成数字和整数部分
                value = Number(value).toFixed(2).split('.');
                let value_int = Number(value[0]).toLocaleString();// 转换成金额形式
                return `${label} ${value_int}.${value[1]}`;
            },
        },
		methods:{
			_shopDynamicsAPI(data){//店铺动态
				getshopDynamics(data)//获取动态列表接口
				.then(({data})=>{
					this.DynamicList=data;
					this.loadDynamic=false;
				})
			},
			_DynamicsNumAPI(data){//待处理事件				
				getDynamicsNum(data)//获取店铺待处理事件数量API
				.then(({data})=>{
					this.getNum=data;
					this.loadUntreated=false;
				})
			},
			jumpPage(val){//点击待处理事件的列表
				switch(val){
					case "待服务订单":
						this.$router.push("/server/serverOrder/UnshippedOrder");
						break;
					case "服务中订单待操作":
						this.$router.push("/server/serverOrder/PendingOrder");
						break;
					case "退款申请":
						this.$router.push({path:"/server/serverOrder/refundOrder",query:{name:"refund"}})
						break;
				}
			},
			Irregularities(){//违规提醒
				this.$router.push("/server/sellercenter/Irregularities")
			},
			getUser(){
				console.log("this.shopId:",this.shopId)
				let shop_id=this.shopId;
				this.getServicerMess({shop_id})//获取店铺统计数据
				let setDynamic={
					shop_id, 
					page: 1,
					per_page: 5
				};
				this._shopDynamicsAPI(setDynamic);//店铺动态
//				this.clearDynamicTime=setInterval(()=>{this._shopDynamicsAPI(setDynamic)},10000);																		
				this._DynamicsNumAPI({shop_id})//待处理事件						
//				this.clearNumTime=setInterval(()=>{this._DynamicsNumAPI({shop_id})},10000);
			},
			_shopId(){
				getUserMess()//获取服务商店铺
				.then(({data})=>{	
					this.shopId=data[0].shop_id;	
				})				
			},
			getServicerMess(data){//获取店铺统计数据
				getStoreStatistics(data)
				.then(({data})=>{
					this.total=data;
					this.loadTotal=false;
				})
				.catch(({response: {data}})=>{
					this.$message.error(data.errorcmt);
				})
			},
			openStore(){//我要开店按钮
				this.$store.dispatch("doCloseStore",false);
				router.push("/server/sellercenter/openStore")
			},
			loginOut(){//退出按钮
				this.$store.dispatch('doLogout');
			},
			timeRangeChange([start_date,end_date]=[]){//时间改变时重新掉接口				
//				if(!this.shopLength||this.shopLength==0){return}
//				let shop_id=this.$store.state.servicer.shop_id;
//				let condition_search={
//					shop_id,start_date,end_date
//				};
//				getStoreData(condition_search)
//				    .then(({data:{data}})=>{
//                      this.statisticsData = data;
//                  })
			},
		}
	}
</script>

<style lang="scss">
.servicerCenter{
	margin-top: 80px;
	.noOpenStore{
		width: 600px;
		text-align:center;
		img{
			width: 104px;
			height: 104px;
		}
		h4{
			color: #333;
			font-weight: normal;
			font-size: 14px;
			margin-top: 20px;
			margin-bottom: 10px;
		}
		p{
			color: #0070C9;
			display: block;
			margin-top: 10px;		
			cursor: pointer;	
		}
	}
	.count{
		width: 1240px;
		margin-left: auto;
		margin-right: auto;
		margin-top: 20px;
		.plate{
			float: left;
			padding: 20px;
			width: 255px;
			height: 102px;
			border-radius: 2px;
		}
	}
	.dynamicEvent{
		width: 1240px;
		margin-top: 20px;
		margin-left: auto;
		margin-right: auto;
		.dynamic{			
			padding: 20px;
		    width: 885px;
		    background-color: #fff;
		    height: 354px;
		    .shopTitle{
		    	padding-bottom: 18px;
    			border-bottom: 1px solid #F0F4F7;
		    }
		    .storeItem{
		    	padding-top:11px;
		    	padding-bottom: 11px;
    			border-bottom: 1px solid #F0F4F7;
    			&:hover{
    				background-color:#F8FAFC ;
    			}
    			.storeItemLf{
    				position: relative;
				    height: 30px;
				    width: 30px;
				    border-radius: 50%;
				    background-color: #0070C9;
				    i{
				    	position: absolute;
					    color: #fff;
					    font-size: 24px;
					    left: 50%;
					    top: 50%;
					    margin-top: -12px;
					    margin-left: -12px;
				    }
    			}
    			.storeItemRt{
    				width: 845px;
    				.top{
    					white-space: nowrap;
					    overflow: hidden;
					    text-overflow: ellipsis;
    				}
    			}
		    }
		}
		.event{
			width: 255px;
		    padding: 20px;
		    height: 354px;
		    background-color: #fff;
        	.shopTitle{
				padding-bottom: 18px;
				border-bottom: 1px solid #F0F4F7;
			}
		    .lh{
		    	line-height: 33px;				
			    padding-top: 11px;
			    padding-bottom: 11px;
			    border-bottom: 1px solid #F0F4F7;
			    &:hover{
    				background-color:#F8FAFC ;
    			}
			    .btn{
			    	width: 48px;
				    height: 24px;
				    border-radius: 12px;
				    background-color: #008FF2;
				    text-align: center;
				    color: #fff;
				    line-height: 24px;
				    margin-top: 4px;
			    }
		    }
		}
	}
	.chart{
		width: 1240px;
		margin-left: auto;
		margin-right: auto;
		.echarts{
			width: 1240px;
		}
		
	}
	
}
</style>