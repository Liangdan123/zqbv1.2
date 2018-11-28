import Vue from 'vue'
import Router from 'vue-router'
import parse from 'url-parse'
import login from '@/pages/login'
import signIn from '@/pages/loginPage/signIn'
import reset from '@/pages/loginPage/mobileReset'
import register from '@/pages/loginPage/register'
import blank from '@/components/func/blank' //空白页面
import store from '@/store'
//平台导航
import mallZxh from '@/pages/platformPage/mallZxh'

//平台管理中的平台管理
import join from '@/pages/platformPage/manage/join';
import role from '@/pages/platformPage/manage/role';
import commission from '@/pages/platformPage/manage/commission';
import permission from '@/pages/platformPage/manage/permission';
import message from '@/pages/platformPage/manage/message';
import addrole from '@/pages/platformPage/manage/addrole';
import joinRecord from '@/pages/platformPage/manage/joinRecord';

//平台管理中的资金管理
import extractCash from '@/pages/platformPage/fund/extractCash'
import orderIncome from '@/pages/platformPage/fund/orderIncome'
import memberIncome from '@/pages/platformPage/fund/memberIncome'
import roleFund from '@/pages/platformPage/fund/roleFund'
import platformFund from '@/pages/platformPage/fund/platformFund'

//平台中的商城设置
import mallSetInfo from "@/pages/platformPage/mallSet/mallSetInfo"
import mallMess from "@/pages/platformPage/mallSet/mallMess"
import mallMessSet from "@/pages/platformPage/mallSet/mallMessSet"
import mallDecoration from "@/pages/platformPage/mallSet/mallDecoration"
import mallcategory from "@/pages/platformPage/mallSet/mallcategory"

//平台中的营销管理
import marketingInfo from "@/pages/platformPage/marketing/marketingInfo"
import discountSet from "@/pages/platformPage/marketing/discountSet"
import memberCenter from "@/pages/platformPage/marketing/memberCenter"
import specialAd from "@/pages/platformPage/marketing/specialAd"
import demand from "@/components/platform/marketing/demand"

//平台中的店铺管理
import storeManage from "@/pages/platformPage/storeManage/storeManage"
import storeMessage from "@/pages/platformPage/storeManage/storeMessage"

//平台中的监控中心
import platDataCenter from "@/pages/platformPage/controlCenter/platDataCenter"

//平台中的订单管理
import nonPayment from "@/pages/platformPage/order/nonPayment"
import CancelOrder from "@/pages/platformPage/order/CancelOrder"
//服务商导航
import server from "@/pages/servicerPage/servers"
//服务商的资金管理
import fundManage from "@/pages/servicerPage/fund/fundManage"
import withdrawalapply from "@/pages/servicerPage/fund/withdrawalapply"

//服务商的营销管理
import serverMarketInfo from "@/pages/servicerPage/marketing/serverMarketInfo"
import serverMemberCenter from "@/pages/servicerPage/marketing/serverMemberCenter"
import serverMemberDev from "@/pages/servicerPage/marketing/serverMemberDev"
import serverNiche from "@/pages/servicerPage/marketing/serverNiche"

//服务商的店铺设置
import storeSetInfo from "@/pages/servicerPage/storeSet/storeSetInfo"
import storeMessShow from "@/pages/servicerPage/storeSet/storeMessShow"
import editStoreMessage from "@/pages/servicerPage/storeSet/editStoreMessage"
import storedecoration from "@/pages/servicerPage/storeSet/storedecoration"

//服务商的商品管理
import commodityInfo from "@/pages/servicerPage/commodity/commodityInfo"
import pulishProduct from "@/pages/servicerPage/commodity/pulishProduct"
import saleCommodity from "@/pages/servicerPage/commodity/saleCommodity"
import warehouse from "@/pages/servicerPage/commodity/warehouse"
import historyProdcut from "@/pages/servicerPage/commodity/history"
import category from "@/pages/servicerPage/commodity/category"

//服务商的卖家中心
import servicerCenter from "@/pages/servicerPage/sellerCenter/servicerCenter"
import openStore from "@/pages/servicerPage/sellerCenter/openStore"
import Irregularities from "@/pages/servicerPage/sellerCenter/Irregularities"

//服务商的订单管理(平台)
import serverAllOrder from "@/pages/servicerPage/order/serverAllOrder"
import UnshippedOrder from "@/pages/servicerPage/order/UnshippedOrder"
import PendingOrder from "@/pages/servicerPage/order/PendingOrder"
import CompletedOrder from "@/pages/servicerPage/order/CompletedOrder"
import refundOrder from "@/pages/servicerPage/order/refundOrder"


//代理商订单和合伙人订单通用
import orderTable from '@/components/servicer/order/orderTable'

//代理商订单和合伙人营销管理通用
import MarketInfo from '@/components/marketing/MarketInfo'
import MemberCenter from '@/components/marketing/MemberCenter'
import RoleDep from '@/components/marketing/RoleDep'
import cpsUrl from '@/components/marketing/cpsUrl'
//代理商
import agent from '@/pages/agentPage/agent'
import agentMoney from '@/pages/agentPage/moneyManage/agentMoney'
import agentWithdrawalApply from '@/pages/agentPage/moneyManage/WithdrawalApply'

//合伙人
import partner from '@/pages/partner/partner'
import partnerMoney from '@/pages/partner/moneyManage/partnerMoney'
import partnerWithdrawalApply from '@/pages/partner/moneyManage/WithdrawalApply'

Vue.use(Router);
const router = new Router({ 
	routes: [{
				path: '/',
				component: login,
				children: [{
					path: '',
					component: signIn
				}, {
					path: 'reset',
					component: reset
				}, {
					path: 'register',
					component: register
				}]
			},
			{ //合伙人
				path: '/partner',
				name: "partner",
				component: partner,
				children: [{
						path: 'orderTable',
						component: orderTable,
					},
					{
						path: 'partnerMoney',
						name: 'partnerMoney',
						component: partnerMoney,
					},
					{
						path: 'partnerMoney/WithdrawalApply',
						name: 'partnerWithdrawalApply',
						component: partnerWithdrawalApply,
					},
					{
						path: 'MarketInfo',
						name: 'MarketInfo',
						component: MarketInfo,
						children: [{
								path: 'MemberCenter',
								component: MemberCenter,
							}, {
								path: 'RoleDep',
								component:RoleDep,
							},
							{
								path: 'cpsUrl',
								component: cpsUrl,
							}
						]
					}
				]
			},
			{//代理商
				path: '/agent',
				name: "agent",
				component: agent,
				children: [{
						path: 'orderTable',
						component: orderTable,
					},
					{
						path: 'agentMoney',
						name: 'agentMoney',
						component: agentMoney,
					},
					{
						path: 'agentMoney/WithdrawalApply',
						name: 'agentWithdrawalApply',
						component: agentWithdrawalApply,
					},
					{
						path: 'MarketInfo',
						component: MarketInfo,
						children: [{
								path: 'MemberCenter',
								component: MemberCenter,
							}, {
								path: 'RoleDep',
								component: RoleDep,
							},
							{
								path: 'cpsUrl',
								component: cpsUrl,
							}
						]
					}
				]
			}, { //平台管理
				path: '/mallZxh',
				name: 'mallZxh',
				component: mallZxh,
				children: [{ //平台管理
						path: 'manage',
						name: 'manage',
						component: blank,
						children: [{
							path: 'join',
							name: 'join',
							component: join,
						}, {
							path: 'role',
							name: 'role',
							component: role,
						}, {
							path: 'commission',
							name: 'commission',
							component: commission,
						}, {
							path: 'permission',
							name: 'permission',
							component: permission,
						}, {
							path: 'message',
							name: 'message',
							component: message,
						}, {
							path: 'addrole',
							name: 'addrole',
							component: addrole,
						}, {
							path: 'joinRecord',
							name: 'joinRecord',
							component: joinRecord,
						}]
					},
					{ //资金管理(平台管理)
						path: 'fund',
						name: 'fund',
						component: blank,
						children: [{
							path: 'extractCash',
							name: 'extractCash',
							component: extractCash,
							},{								
								path: 'orderIncome',
								name: 'orderIncome',
								component: orderIncome,
							},{								
								path: 'memberIncome',
								name: 'memberIncome',
								component: memberIncome,
							},{								
								path: 'roleFund',
								name: 'roleFund',
								component: roleFund,
							},{								
								path: 'platformFund',
								name: 'platformFund',
								component: platformFund,
							}
							
						]
					},
					{ //商城设置(平台管理)
						path: 'mallSetInfo',
						name: 'mallSetInfo',
						component: mallSetInfo,
						children: [{
								path: 'mallMess',
								name: 'mallMess',
								component: mallMess,
							},
							{
								path: 'mallMessSet',
								name: 'mallMessSet',
								component: mallMessSet,
							},
							{
								path: 'mallDecoration',
								name: 'mallDecoration',
								component: mallDecoration,
							},
							{
								path: 'mallcategory',
								name: 'mallcategory',
								component: mallcategory,
							}
						]
					},
					{//营销管理(平台管理)
						path: 'marketingInfo',
						name: 'marketingInfo',
						component: marketingInfo,
						children:[{
							path: 'discountSet',
							name: 'discountSet',
							component: discountSet,
						},{
							path: 'memberCenter',
							name: 'memberCenter',
							component: memberCenter,
						},{							
							path: 'specialAd',
							name: 'specialAd',
							component: specialAd,
						},{							
							path: 'demand',
							name: 'demand',
							component: demand,
						}]
						
					},{//店铺管理（平台）						
						path:'storeManage',
						name:'storeManage',
						component: storeManage,
					},{//店铺信息（平台）					
						path:'storeMessage',
						name:'storeMessage',
						component:storeMessage,						
					},
					{//监控中心（平台）
						path:'controlCenter',	
						name: 'controlCenter',
						component:blank,
						children:[
							{
								path: 'platDataCenter',
								name: 'platDataCenter',
								component: platDataCenter,	
							},
						]
					},
					{//订单管理（平台）
						path: 'platformOrder',
						name: 'platformOrder',
						component: blank,
						children:[
							{
								path: 'serverAllOrder',
								name:"serverAllOrder",
								component: serverAllOrder,	
							},
							{
								path: 'UnshippedOrder',
								component: UnshippedOrder,	
							},
							{								
								path: 'nonPayment',
								component: nonPayment,
							},
							{
								path: 'PendingOrder',
								component: PendingOrder,	
							},
							{
								path: 'CompletedOrder',
								component: CompletedOrder,		
							},
							{
								path: 'CancelOrder',
								component: CancelOrder,		
							},
							{
								path: 'refundOrder',
								component: refundOrder,	
							}
							
						]
					}
				]

			},{//服务商
				path: '/server',
				name: 'server',
				component: server,
				children:[
					{//营销管理(服务商)
						path: 'serverMarketInfo',
						name: 'serverMarketInfo',
						component: serverMarketInfo,
						children:[{
							path: 'serverMemberCenter',
							name: 'serverMemberCenter',
							component: serverMemberCenter,
						},
						{						
							path: 'serverMemberDev',
							name: 'serverMemberDev',
							component: serverMemberDev,
						},{						
							path: 'serverNiche',
							name: 'serverNiche',
							component: serverNiche,
						},
						],					
					},{//店铺设置（服务商）
						path: 'storeSetInfo',
						name: 'storeSetInfo',
						component: storeSetInfo,
						children:[
							{
								path: 'storeMessShow',
								name: 'storeMessShow',
								component: storeMessShow,
							},{
								path: 'editStoreMessage',
								name: 'editStoreMessage',
								component: editStoreMessage,
							},{								
								path: 'storedecoration',
								name: 'storedecoration',
								component: storedecoration,
							}
						]
					},
					{//卖家中心（服务商）		
						path: 'sellercenter',
						name: 'sellercenter',
						component: blank,
						children:[
							{
								path: 'servicerCenter',
								name: 'servicerCenter',
								component: servicerCenter,	
							},{								
								path: 'openStore',
								name: 'openStore',
								component: openStore,	
							},{							
								path: 'Irregularities',
								name: 'Irregularities',
								component: Irregularities,	
							}
						]
					},
					{//资金管理（服务商）					
						path: 'fundManage',
						name: 'fundManage',
						component: fundManage,	
					},
					{
						path: 'fundManage/withdrawalapply',
						name: 'withdrawalapply',
						component: withdrawalapply,		
					},
					{ //订单管理（服务商）
						path: 'serverOrder',
						name: 'serverOrder',
						component: blank,
						children: [
							{
								path: 'serverAllOrder',						
								component: serverAllOrder,	
							},
							{
								path: 'UnshippedOrder',
								component: UnshippedOrder,	
							},
							{
								path: 'PendingOrder',
								component: PendingOrder,	
							},
							{
								path: 'CompletedOrder',
								component: CompletedOrder,	
							},{
								path: 'refundOrder',
								component: refundOrder,	
							}
						]
					},
					{//服务商的商品管理						
						path: 'commodityInfo',
						name: 'commodityInfo',
						component: commodityInfo,						
						children: [
							{
								path: 'pulishProduct',
								name: 'pulishProduct',
								component: pulishProduct,	
							},{
								path: 'saleCommodity',
								name: 'saleCommodity',
								component: saleCommodity,	
							},{								
								path: 'warehouse',
								name: 'warehouse',
								component: warehouse,	
							},{								
								path: 'historyProdcut',
								name: 'historyProdcut',
								component: historyProdcut,	
							},{
								path: 'category',
								name: 'category',
								component: category,	
							}
						]
					}
				]
			}
		] 
})

let _platJumpPage=function(pageArray){
//	console.log("pageArray:",pageArray)
		let navbarArray=pageArray.split(",");	
		
		let jumpPage=Math.min.apply(null,navbarArray);
		switch(jumpPage){//登录先跳进权限取值最小的的页面
			case 1:
				router.replace("/mallZxh/controlCenter/platDataCenter");
				break;
			case 2:
				router.replace("/mallZxh/storeManage");
				break;
			case 3:
				router.replace("/mallZxh/platformOrder/serverAllOrder");
				break;
			case 4:
				router.replace("/mallZxh/marketingInfo");
				break;
			case 5:
				router.replace("/mallZxh/mallSetInfo");
				break;
			case 6:
				router.replace("/mallZxh/fund/extractCash");
				break;
			case 7:
				router.replace("/mallZxh/manage/join");
				break;
		}
};


let _parseJump=function(next,from,to){
		let parsed = parse(decodeURIComponent(from.query.redirect), true);
		if(parsed.pathname===to.path){//路径相等时直接跳
			next(true);
		}else{//发生401页面的路径与登录成功页面跳的不一致时
			next({
				path:parsed.pathname,
				query:parsed.query
			})
		}
}

router.beforeEach((to, from, next)=>{
	if(store.state.user.login){//已经登录		
		if(to.path==="/"){//跳首页
			if(from.path===to.path){//输入网址跳进来(并且已经登录过)
				switch(store.state.user.user.type){
					case 1:		
						console.log("store.state.user.user.is_admin：",store.state.user.user.is_admin)
						if(store.state.user.user.is_admin==1||!store.state.user.user.is_admin){
							next({ path: '/mallZxh/controlCenter/platDataCenter'})
						}else{			
							_platJumpPage(store.state.user.user.permission);//不是主账号平台首次登录的页面
						}
						break;
					case 2:
						next({ path: '/agent/agentMoney'})
						break;
					case 3:
						next({ path: '/partner/partnerMoney'})
						break;
					case 4:
						next({ path: '/server/sellercenter/servicerCenter'})
						break;
				}
			}else{//缩减路径跳进来
				next(false)
			}
		}else{//如果有查询参数那就需要带上查询参数，并且调至从退出登录页面(跳主体页面)
			
			let toPath=to.path.split("/")[1];
			//平台
			if(store.state.user.user.type === 1){
				if(toPath==="mallZxh"){//只能跳至有mallZxh的页面					
					if(from.query.redirect){//从401未登录页面出来，或者是手动修改链接	
						_parseJump(next,from,to)
					}else{
						if(to.path==="/mallZxh/storeMessage"){//到商城的店铺信息没有shop_id的话会报错
							if(to.fullPath.includes("shop_id")){
								next(true)
							}else{
								next(false)
							}																
						}else{
							next(true);
						}
					}
				}else{
					next(false)
				}
			}else if(store.state.user.user.type === 2){//代理商
				if(toPath==="agent"){
					if(from.query.redirect){//从401未登录页面出来，或者是手动修改链接
						_parseJump(next,from,to)
					}else{
						next(true);	
					}
				}else{
					next(false)
				}
			}else if(store.state.user.user.type === 3){//合伙人
				if(toPath==="partner"){
					if(from.query.redirect){//从401未登录页面出来，或者是手动修改链接
						_parseJump(next,from,to)
					}else{
						next(true);	
					}
				}else{
					next(false)
				}
			}else if(store.state.user.user.type === 4){//服务商
				if(toPath==="server"){
					if(from.query.redirect){//从401未登录页面出来，或者是手动修改链接
						_parseJump(next,from,to)
					}else{
						next(true);	
					}
				}else{
					next(false)
				}
			}
		}		
	}else{//未登录
		let arrLoginFalse=["","register"]
		let loginFalse=to.path.split("/")[1];
		if(arrLoginFalse.includes(loginFalse)){
			next(true)
		}else{
			next({ path: '/'})//回到登录页面让他登录
		}
	};
})


export default router;
