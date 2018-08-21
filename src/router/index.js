import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import register from '@/pages/loginPage/register'
import reset from '@/pages/loginPage/mobileReset'
import sfz from '@/pages/loginPage/SFZ'
import zxh from '@/pages/facilitatorPage/zxh'

import parse from 'url-parse'
import store from '@/store'

import storeInfo from '@/pages/facilitatorPage/myStorePage/storeInfo'
import addMess from '@/pages/facilitatorPage/myStorePage/addMess'
import storeMessShow from '@/pages/facilitatorPage/myStorePage/storeMessShow'
import freightSetting from '@/pages/facilitatorPage/myStorePage/freightSetting'
import shop_decoration from '@/pages/facilitatorPage/myStorePage/shop_decoration'
import blank from '@/components/blank'

import commodityInfo from '@/pages/facilitatorPage/commodityPage/commodityInfo'
import category_mgmt from '@/pages/facilitatorPage/commodityPage/category_mgmt'
import sale_commodity from '@/pages/facilitatorPage/commodityPage/sale_commodity'
import pulishProduct from '@/pages/facilitatorPage/commodityPage/pulishProduct'
import warehouse from '@/pages/facilitatorPage/commodityPage/warehouse'
import history from '@/pages/facilitatorPage/commodityPage/history'
import category from '@/pages/facilitatorPage/commodityPage/category'

import allOrder from '@/pages/facilitatorPage/order/allOrder'
import UnshippedOrder from '@/pages/facilitatorPage/order/UnshippedOrder'
import PendingOrder from '@/pages/facilitatorPage/order/PendingOrder'
import CompletedOrder from '@/pages/facilitatorPage/order/CompletedOrder'
import cancelledOrder from '@/pages/facilitatorPage/order/cancelledOrder'
import refundOrder from '@/pages/facilitatorPage/order/refundOrder'

import marketInfo from '@/pages/facilitatorPage/marketingPage/marketInfo'
import Coupon from '@/pages/facilitatorPage/marketingPage/Coupon'

import sellerCenter from '@/pages/facilitatorPage/sellerCenter/sellerCenter'


//平台导航
import mallZxh from '@/pages/platformPage/mallZxh'
import mallSetInfo from "@/pages/platformPage/mallSet/mallSetInfo"
import mallMess from "@/pages/platformPage/mallSet/mallMess"
import mallMessSet from "@/pages/platformPage/mallSet/mallMessSet"
import mallDecoration from "@/pages/platformPage/mallSet/mallDecoration"
import mallcategory from "@/pages/platformPage/mallSet/mallcategory"

//资金管理
import ShopMoneyManagement from '@/pages/moneyManagement/ShopMoneyManagement'
import WithdrawalApply from '@/pages/moneyManagement/WithdrawalApply'
import MallMoneyManagement from '@/pages/moneyManagement/MallMoneyManagement'

//会员中心
import mallMarketInfo from "@/pages/platformPage/mallMarketing/mallMarketInfo"
import memberCenter from '@/pages/platformPage/mallMarketing/memberCenter'

//商城订单管理
import mallAllOrder from '@/pages/platformPage/mallOrder/mallAllOrder'
import mallNonPayment from '@/pages/platformPage/mallOrder/mallNonPayment'
import mallUnshipOrder from '@/pages/platformPage/mallOrder/mallUnshipOrder'
import mallPendingOrder from '@/pages/platformPage/mallOrder/mallPendingOrder'
import mallCompletedOrder from '@/pages/platformPage/mallOrder/mallCompletedOrder'
import mallCancelOrder from '@/pages/platformPage/mallOrder/mallCancelOrder'
import mallRefundOrder from '@/pages/platformPage/mallOrder/mallRefundOrder'


//商城店铺管理
import mallStoreMana from "@/pages/platformPage/mallStore/mallStoreMana"
import mallStoreMess from "@/pages/platformPage/mallStore/mallStoreMess"

//监控中心
import MallDataCenter from '@/pages/platformPage/mallDataCenter/mallDataCenter';
import ShopEntry from '@/pages/platformPage/mallDataCenter/ShopEntry';
import ShopApply from '@/pages/platformPage/mallDataCenter/ShopApply';
import ShopWithdrawal from '@/pages/platformPage/mallDataCenter/ShopWithdrawal';

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
    path: '/zxh',
    name: 'zxh',
    component: zxh,
    children: [{
      path: 'store',
      component: blank,
      name: "blank",
      children: [{
        path: 'storeInfo',
        component: storeInfo,
        name: "storeInfo"
      }, {
        path: 'addMess',
        component: addMess,
        name: "addMess"
      }, {
        path: 'storeMessShow',
        component: storeMessShow,
        name: "storeMessShow"
      }, {
        path: 'shop_decoration',
        component: shop_decoration,
        name: "shop_decoration"
      }, {
        path: 'freightSetting',
        component: freightSetting,
        name: "freightSetting"
      }]
    }, {
      path: 'commodityPage',
      name: 'commodity',
      component: blank,
      children: [{
        path: 'commodityInfo',
        component: commodityInfo,
        name: "commodityInfo"
      }, {
        path: 'category_mgmt',
        component: category_mgmt,
        name: "category_mgmt"
      }, {
        path: "sale_commodity",
        component: sale_commodity,
        name: "sale_commodity"
      }, {
        path: "pulishProduct",
        component: pulishProduct,
        name: "pulishProduct"
      }, {
        path: "warehouse",
        component: warehouse,
        name: "warehouse"
      }, {
        path: "history",
        component: history,
        name: "history"
      }, {
        path: "category",
        component: category,
        name: "category"
      }]
    }, {
      path: 'orderPage',
      name: 'orderPage',
      component: blank,
      children: [{
        path: 'allOrder',
        component: allOrder,
        name: "allOrder"
      }, {
        path: 'UnshippedOrder',
        component: UnshippedOrder,
        name: "UnshippedOrder"
      }, {
        path: 'PendingOrder',
        component: PendingOrder,
        name: "PendingOrder"
      }, {
        path: 'CompletedOrder',
        component: CompletedOrder,
        name: "CompletedOrder"
      }, {
        path: 'cancelledOrder',
        component: cancelledOrder,
        name: "cancelledOrder"
      }, {
        path: 'refundOrder',
        component: refundOrder,
        name: "refundOrder"
      }]
    }, {
      path: 'marketingPage',
      name: 'marketingPage',
      component: blank,
      children: [{
        path: 'marketInfo',
        component: marketInfo,
        name: "marketInfo"
      }, {
        path: 'Coupon',
        component: Coupon,
        name: "Coupon"
      }]
    }, {
      path: 'sellerPage',
      name: 'sellerPage',
      component: blank,
      children: [{
        path: 'sellerCenter',
        component: sellerCenter,
        name: "sellerCenter"
      }]
    }, {
      path: 'shop-money-management',
      name: 'ShopMoneyManagement',
      component: ShopMoneyManagement,
    }, {
      path: 'shop-money-management/withdrawalapply',
      name: 'WithdrawalApply',
      component: WithdrawalApply,
    }, ]
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
    }, {
      path: 'mallSetInfo',
      name: 'mallSetInfo',
      component: mallSetInfo,
      children: [{
        path: 'mallMess',
        component: mallMess,
        name: "mallMess"
      }, {
        path: 'mallMessSet',
        component: mallMessSet,
        name: "mallMessSet"
      }, {
        path: 'mallDecoration',
        component: mallDecoration,
        name: "mallDecoration"
      }, {
        path: 'mallcategory',
        name: 'mallcategory',
        component: mallcategory,
      }]
    }, {
      path: 'mallMarketInfo',
      name: 'mallMarketInfo',
      component: mallMarketInfo,
      children: [{
        path: 'memberCenter',
        component: memberCenter,
        name: "memberCenter"
      }]
    }, {
      path: 'mallOrder',
      name: 'mallOrder',
      component: blank,
      children: [{
        path: 'mallAllOrder',
        name: 'mallAllOrder',
        component: mallAllOrder,
      }, {
        path: 'mallNonPayment',
        component: mallNonPayment,
        name: "mallNonPayment"
      }, {
        path: 'mallUnshipOrder',
        component: mallUnshipOrder,
        name: "mallUnshipOrder"
      }, {
        path: 'mallPendingOrder',
        component: mallPendingOrder,
        name: "mallPendingOrder"
      }, {
        path: 'mallCompletedOrder',
        component: mallCompletedOrder,
        name: "mallCompletedOrder"
      }, {
        path: 'mallCancelOrder',
        component: mallCancelOrder,
        name: "mallCancelOrder"
      }, {
        path: 'mallRefundOrder',
        component: mallRefundOrder,
        name: "mallRefundOrder"
      }]
    }, {
      path: 'mallStoreMana',
      component: mallStoreMana,
      name: "mallStoreMana"
    }, {
      path: 'mallStoreMess',
      component: mallStoreMess,
      name: "mallStoreMess"
    }, {
      path: 'mall-money-management',
      name: 'MallMoneyManagement',
      component: MallMoneyManagement,
      children: []
    }, {
      path: 'data-center',
      name: 'MallDataCenter',
      component: MallDataCenter
    }, {
      path: 'data-center/shop-entry',
      name: 'ShopEntry',
      component: ShopEntry
    }, {
      path: 'data-center/shop-apply',
      name: 'ShopApply',
      component: ShopApply
    }, {
      path: 'data-center/shop-withdrawal',
      name: 'ShopWithdrawal',
      component: ShopWithdrawal
    }]
  }, ],
})
export default router;

