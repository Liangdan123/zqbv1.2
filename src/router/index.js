import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import register from '@/pages/loginPage/register'
import reset from '@/pages/loginPage/mobileReset'
import sfz from '@/pages/loginPage/SFZ'
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

//代理商订单和合伙人订单通用
import orderTable from '@/components/order/orderTable'
//代理商
import agent from '@/pages/agentPage/agent'
import agentMarketInfo from '@/pages/agentPage/Marketing/agentMarketInfo'
import agentMemberCenter from '@/pages/agentPage/Marketing/agentMemberCenter'
import agentRoleDep from '@/pages/agentPage/Marketing/agentRoleDep'
import agentUrl from '@/pages/agentPage/Marketing/agentUrl'
import agentMoney from '@/pages/agentPage/moneyManage/agentMoney'

//合伙人
import partner from '@/pages/partner/partner'
import partnerMarketInfo from '@/pages/partner/Marketing/partnerMarketInfo'
import partnerMemberCenter from '@/pages/partner/Marketing/partnerMemberCenter'
import partnerRoleDep from '@/pages/partner/Marketing/partnerRoleDep'
import partnerUrl from '@/pages/partner/Marketing/partnerUrl'
import partnerMoney from '@/pages/partner/moneyManage/partnerMoney'

Vue.use(Router);
const router = new Router({ 

	routes: [{
				path: '/',
				component: login,
				children: [{
					path: '',
					component: register
				}, {
					path: 'reset',
					component: reset
				}, {
					path: 'sfz',
					component: sfz
				}]
			},
			{ //合伙人
				path: '/partner',
				name: "partner",
				component: partner,
				children: [{
						path: 'partnerOrder',
						name: 'partnerOrder',
						component: orderTable,
					},
					{
						path: 'partnerMoney',
						name: 'partnerMoney',
						component: partnerMoney,
					},
					{
						path: 'partnerMarketInfo',
						name: 'partnerMarketInfo',
						component: partnerMarketInfo,
						children: [{
								path: 'partnerMemberCenter',
								name: 'partnerMemberCenter',
								component: partnerMemberCenter,
							}, {
								path: 'partnerRoleDep',
								name: 'partnerRoleDep',
								component: partnerRoleDep,
							},
							{
								path: 'partnerUrl',
								name: 'partnerUrl',
								component: partnerUrl,
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
						path: 'agentOrder',
						name: 'agentOrder',
						component: orderTable,
					},
					{
						path: 'agentMoney',
						name: 'agentMoney',
						component: agentMoney,
					},
					{
						path: 'agentMarketInfo',
						name: 'agentMarketInfo',
						component: agentMarketInfo,
						children: [{
								path: 'agentMemberCenter',
								name: 'agentMemberCenter',
								component: agentMemberCenter,
							}, {
								path: 'agentRoleDep',
								name: 'agentRoleDep',
								component: agentRoleDep,
							},
							{
								path: 'agentUrl',
								name: 'agentUrl',
								component: agentUrl,
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
					{ //资金管理
						path: 'fund',
						name: 'fund',
						component: blank,
						children: [{
							path: 'extractCash',
							name: 'extractCash',
							component: extractCash,
						}]
					},
					{ //商城设置
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
					{//营销管理
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
						}
						]
					}
				]

			}
		] 
})
export default router;
