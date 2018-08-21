import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import register from '@/pages/loginPage/register'
import reset from '@/pages/loginPage/mobileReset'
import sfz from '@/pages/loginPage/SFZ'


import blank from '@/components/blank'//空白页面

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

