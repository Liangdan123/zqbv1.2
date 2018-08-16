import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import register from '@/pages/loginPage/register'
import reset from '@/pages/loginPage/mobileReset'
import sfz from '@/pages/loginPage/SFZ'
import zxh from '@/pages/zxh'
import storeInfo from '@/pages/myStorePage/storeInfo'
import addMess from '@/pages/myStorePage/addMess'
import storeMessShow from '@/pages/myStorePage/storeMessShow'
import freightSetting from '@/pages/myStorePage/freightSetting'
import shop_decoration from '@/pages/myStorePage/shop_decoration'
import my_store_blank from '@/pages/myStorePage/my_store_blank'
import commodityInfo from '@/pages/commodityPage/commodityInfo'
import category_mgmt from '@/pages/commodityPage/category_mgmt'
import sale_commodity from '@/pages/commodityPage/sale_commodity'
import pulishProduct from '@/pages/commodityPage/pulishProduct'
import warehouse from '@/pages/commodityPage/warehouse'
import history from '@/pages/commodityPage/history'
import category from '@/pages/commodityPage/category'
import allOrder from '@/pages/order/allOrder'
import UnshippedOrder from '@/pages/order/UnshippedOrder'
import PendingOrder from '@/pages/order/PendingOrder'
import CompletedOrder from '@/pages/order/CompletedOrder'
import cancelledOrder from '@/pages/order/cancelledOrder'
import refundOrder from '@/pages/order/refundOrder'
import marketInfo from '@/pages/marketingPage/marketInfo'
import Coupon from '@/pages/marketingPage/Coupon'
import sellerCenter from '@/pages/sellerCenter/sellerCenter'
import realName from '@/pages/sellerCenter/realName'
import audit from '@/pages/sellerCenter/auditPage'
import feedbackMess from '@/pages/sellerCenter/feedbackMess'
import mallZxh from '@/pages/mallZxh'
import mallSetInfo from "@/pages/mallSet/mallSetInfo"
import mallMess from "@/pages/mallSet/mallMess"
import mallMessSet from "@/pages/mallSet/mallMessSet"
import mallDecoration from "@/pages/mallSet/mallDecoration"
import mallcategory from "@/pages/mallSet/mallcategory"
import ShopMoneyManagement from '@/pages/moneyManagement/ShopMoneyManagement'
import WithdrawalApply from '@/pages/moneyManagement/WithdrawalApply'
import MallMoneyManagement from '@/pages/moneyManagement/MallMoneyManagement'
import mallMarketInfo from "@/pages/mallMarketing/mallMarketInfo"
import memberCenter from '@/pages/mallMarketing/memberCenter'
import mallAllOrder from '@/pages/mallOrder/mallAllOrder'
import mallNonPayment from '@/pages/mallOrder/mallNonPayment'
import mallUnshipOrder from '@/pages/mallOrder/mallUnshipOrder'
import mallPendingOrder from '@/pages/mallOrder/mallPendingOrder'
import mallCompletedOrder from '@/pages/mallOrder/mallCompletedOrder'
import mallCancelOrder from '@/pages/mallOrder/mallCancelOrder'
import mallRefundOrder from '@/pages/mallOrder/mallRefundOrder'
import mallStoreMana from "@/pages/mallStore/mallStoreMana"
import mallStoreMess from "@/pages/mallStore/mallStoreMess"
import MallDataCenter from '@/pages/mallDataCenter/mallDataCenter';
import ShopEntry from '@/pages/mallDataCenter/ShopEntry';
import ShopApply from '@/pages/mallDataCenter/ShopApply';
import ShopWithdrawal from '@/pages/mallDataCenter/ShopWithdrawal';
import join from '@/pages/platform/join';
import role from '@/pages/platform/role';
import commission from '@/pages/platform/commission';
import permission from '@/pages/platform/permission';
import message from '@/pages/platform/message';
import addrole from '@/pages/platform/addrole';
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
      path: 'my_store_blank',
      component: my_store_blank,
      name: "my_store_blank",
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
      component: my_store_blank,
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
      component: my_store_blank,
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
      }, ]
    }, {
      path: 'marketingPage',
      name: 'marketingPage',
      component: my_store_blank,
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
      component: my_store_blank,
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
    path: '/realName',
    name: 'realName',
    component: realName,
  }, {
    path: '/audit',
    name: 'audit',
    component: audit,
  }, {
    path: '/feedbackMess',
    name: 'feedbackMess',
    component: feedbackMess,
  }, {
    path: '/mallZxh',
    name: 'mallZxh',
    component: mallZxh,
    children: [{
      path: 'platform',
      name: 'platform',
      component: my_store_blank,
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
      component: my_store_blank,
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
