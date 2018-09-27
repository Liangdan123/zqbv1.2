import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import login from '@/pages/login'
import signIn from '@/pages/loginPage/signIn'
import reset from '@/pages/loginPage/mobileReset'
import register from '@/pages/loginPage/register'
import blank from '@/components/func/blank' //空白页面

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

//平台中的店铺管理
import storeManage from "@/pages/platformPage/storeManage/storeManage"
import storeMessage from "@/pages/platformPage/storeManage/storeMessage"

//平台中的监控中心
import platDataCenter from "@/pages/platformPage/controlCenter/platDataCenter"


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

//服务商的卖家中心
import servicerCenter from "@/pages/servicerPage/sellerCenter/servicerCenter"
import openStore from "@/pages/servicerPage/sellerCenter/openStore"
import Irregularities from "@/pages/servicerPage/sellerCenter/Irregularities"


//代理商订单和合伙人订单通用
import orderTable from '@/components/order/orderTable'
//代理商订单和合伙人营销管理通用
import MarketInfo from '@/components/marketing/MarketInfo'
import MemberCenter from '@/components/marketing/MemberCenter'
import RoleDep from '@/components/marketing/RoleDep'
import cpsUrl from '@/components/marketing/cpsUrl'
//代理商
import agent from '@/pages/agentPage/agent'
import agentMoney from '@/pages/agentPage/moneyManage/agentMoney'
//合伙人
import partner from '@/pages/partner/partner'
import partnerMoney from '@/pages/partner/moneyManage/partnerMoney'

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
						path: 'MarketInfo',
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
					{
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
						}
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
					}
				]
			}
		] 
})



export default router;
