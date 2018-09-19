import axios from "axios"

export const getMallMess =()=>axios.get("mall/get")//获取商城信息

export const editMallMess =(mallMess)=>axios.put("mall/update",mallMess)//编辑商城信息

export const correscomList=()=>axios.get("mall/mall_component_lists")//获取商城对应组件列表

export const existAssembly=(data)=>axios.post("mall/save_mall_component",data)//保存商城对应组件数据

export const getMallShopNum=()=>axios.get("product/get_num")//商城商品上架数量

export const getcomponentList=(data)=>axios.post("mall/component_lists",data)//获取组件列表

export const existMallClassified =(data)=>axios.post("product/save_mall_category",data)//保存商城分类信息

export const getMallClassifyList =()=>axios.get("product/mall_category_lists")//获取商城分类列表

export const getClassifyList=(shop_id)=>axios.get("product/shop_category_lists",{params:{shop_id}})//获取店铺分类列表

export const getProductList=(shopMess)=>axios.post("mock/product/lists",shopMess)//获取商品列表

export const getCouponConfig=()=>axios.get("coupon/get_config")//营销管理中获取优惠券配置

export const existCouponConfig=(data)=>axios.post("coupon/save_config",data)//营销管理中保存优惠券配置

export const getMemberNum=()=>axios.get("member/get_statistics")//获取会员统计数据

export const getMemberList=(data)=>axios.post("mock/member/lists",data)//获取会员列表

export const memberRechargeList=(data)=>axios.post("mock/member/recharge_lists",data)//获取会员充值列表

export const getAdList=(data)=>axios.post("mock/ad_data/lists",data)//获取广告数据列表

export const deleteAdList=(data)=>axios.delete("mock/ad_data/delete_batch",{data})//批量删除广告数据

export const getRoleList=(data)=>axios.post("mock/platform/role_lists",data)//获取角色列表（例如：服务商）

export const distributeAd=(data)=>axios.post("mock/ad_data/distribute_batch",data)//批量分配广告数据

export const getStoreList=(data)=>axios.post("mock/shop/lists",data)//获取店铺列表

export const getStoreMessage=(data)=>axios.get("mock/shop/get",{params:data})//获取店铺信息

export const getStoreStatistics=(data)=>axios.get("mock/shop/get_shop_statistics",{params:data})//获取店铺统计数据

export const onoffBatch =(data)=>axios.put("mock/product/onoff_batch",data)//批量商品上下架

export const deleteBatch =(data)=>axios.put("mock/product/delete_batch",data)//批量商品删除

export const subIrrehint=(data)=>axios.post("mock/product/commit_illegal",data) //提交违规提醒

export const checkIrrehint=(data)=>axios.post("mock/product/illegal_lists",data) //违规提醒列表

export const checkProduct =(product_id)=>axios.get("mock/product/get",{params:{product_id}})//查看商品

export const getMallStatisticsData = ()=>axios.get("mock/seller/get_mall_statistics");//获取商城所以统计数据

export const getMallPendingEventNum = ()=>axios.get("mock/seller/get_mall_pending_num");//获取商城待处理事件数

export const getStatisticsByDate = (data)=>axios.post("mock/seller/get_mall_statistics_chart",data);//获取商城统计图表数据

export const getFundTotalGive = (data)=>axios.get("mock/fund/total_give",{params:data});//获取累计收入

export const getFundList=(data)=>axios.post("mock/fund/tixian_lists",data)//获取提现列表

