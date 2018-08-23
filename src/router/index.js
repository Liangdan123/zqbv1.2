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

//合伙人

//代理商

import agent from '@/pages/agentPage/agent'
import agentOrder from '@/pages/agentPage/order/agentOrder'
import marketInfo from '@/pages/agentPage/Marketing/MarketInfo'
import memberCenter from '@/pages/agentPage/Marketing/memberCenter'
import roleDep from '@/pages/agentPage/Marketing/roleDep'
import url from '@/pages/agentPage/Marketing/url'
import agentMoney from '@/pages/agentPage/moneyManage/agentMoney'

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
	}, {
		path: '/agent',
		name: "agent",
		component: agent,
		children: [{
			path: 'agentOrder',
			name: 'agentOrder',
			component: agentOrder,
		}, 
		{
	      path: 'agentMoney',
	      name: 'agentMoney',
	      component: agentMoney,
	    }, 
		{
			path: 'marketInfo',
			name: 'marketInfo',
			component: marketInfo,
			children: [{
				path: 'memberCenter',
				name: 'memberCenter',
				component: memberCenter,
			}, {
		          path: 'roleDep',
		          name: 'roleDep',
		          component: roleDep,
		        },
		        {
		          path: 'url',
		          name: 'url',
		          component: url,
		        }
			]
		}]
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
		{//资金管理
			path: 'fund',
			name: 'fund',
			component: blank,
			children:[
				{
					path: 'extractCash',
					name: 'extractCash',
					component: extractCash,
				}
			]
		},
		{//商城设置
			path: 'mallSetInfo',
			name: 'mallSetInfo',
			component: mallSetInfo,
			children:[]			
		}
		]
		
	}]
})
export default router;
