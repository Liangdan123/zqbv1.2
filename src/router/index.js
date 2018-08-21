import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import register from '@/pages/loginPage/register'
import reset from '@/pages/loginPage/mobileReset'
import sfz from '@/pages/loginPage/SFZ'


import blank from '@/components/blank'

//平台导航
import mallZxh from '@/pages/platformPage/mallZxh'


//平台管理
import join from '@/pages/platformPage/platform/join';
import role from '@/pages/platformPage/platform/role';
import commission from '@/pages/platformPage/platform/commission';
import permission from '@/pages/platformPage/platform/permission';
import message from '@/pages/platformPage/platform/message';
import addrole from '@/pages/platformPage/platform/addrole';
import joinRecord from '@/pages/platformPage/platform/joinRecord';

//合伙人
import agent from '@/pages/agentPage/agent'
import agentOrder from '@/pages/agentPage/order/agentOrder'



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
    }]
  }, {
    path: '/mallZxh',
    name: 'mallZxh',
    component: mallZxh,
    children: [{
      path: 'platform',
      name: 'platform',
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
    }]
  }]
})
export default router;


// router.beforeEach((to, from, next)=>{	
// 	if(store.state.user.login){//已经登录
// 		if(to.path==="/"){//不让通过修改链接直接跳转至登录页面
// 			next(false)
// 		}else{//如果有查询参数那就需要带上查询参数，并且调至从退出登录页面
// 			let toPath=to.path.split("/")[1];
// 			let fromPath=from.path.split("/")[1];
// 			if(store.state.user.user.type === 1){//平台
// 				if(toPath==="mallZxh"){//只能跳至有mallZxh的页面	
// 					if(from.query.redirect){//从401未登录页面出来，或者是手动修改链接
// 						let parsed = parse(decodeURIComponent(from.query.redirect), true);
// 						if(parsed.pathname===to.path){//路径相等时直接跳
// 							next(true);
// 						}else{//发生401页面的路径与登录成功页面跳的不一致时
// 							next({
// 								path:parsed.pathname,
// 								query:parsed.query
// 							})
// 						}
// 					}else{
// 						next(true);	
// 					}									
// 				}else{//不能有不含mallZxh的页面
// 					next(false)
// 				}
// 			}else if(store.state.user.user.type === 2){//商家
// 				let toArr=["zxh","realName","audit","feedbackMess"];				
// 				if(toArr.includes(toPath)){
// 					if(from.query.redirect){//从401未登录页面出来，或者是手动修改链接
// 						let parsed = parse(decodeURIComponent(from.query.redirect), true);
// 						if(parsed.pathname!==to.path){//路径相等时直接跳
// 							next(true);
// 						}else{//发生401页面的路径与登录成功页面跳的不一致时
// 							next({
// 								path:parsed.pathname,
// 								query:parsed.query
// 							})
// 						}
// 					}else{
// 						next(true);	
// 					}	
// 				}else{
// 					next(false)
// 				}
// 			}		
// 		}				
// 	}else if(store.state.user.login===false){//未登录
// 		let arrLoginFalse=["","login_errorPage"]
// 		let loginFalse=to.path.split("/")[1];
// 		if(arrLoginFalse.includes(loginFalse)){//注册、修改密码页面可以跳过去
// 			next(true)
// 		}else{//其余不可以添
// 			next(false)
// 		}

// 	}
// })

// export default router
