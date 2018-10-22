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

export const getProductList=(shopMess)=>axios.post("product/lists",shopMess)//获取商品列表

export const getCouponConfig=()=>axios.get("coupon/get_config")//营销管理中获取优惠券配置

export const existCouponConfig=(data)=>axios.post("coupon/save_config",data)//营销管理中保存优惠券配置

export const getMemberNum=()=>axios.get("member/get_statistics")//获取会员统计数据

export const getMemberList=(data)=>axios.post("member/lists",data)//获取会员列表

export const getApplication=(join_id)=>axios.get("platform/get_application",{params:{join_id}})//获取角色申请信息

export const updateApplication=(data)=>axios.put("platform/update_application",data)//修改角色申请信息

export const auditApplication=(data)=>axios.post("platform/audit_application",data)//审核角色申请信息

export const memberRechargeList=(data)=>axios.post("member/recharge_lists",data)//获取会员充值列表

export const getAdList=(data)=>axios.post("ad_data/lists",data)//获取广告数据列表

export const deleteAdList=(data)=>axios.delete("ad_data/delete_batch",{data})//批量删除广告数据

export const getRoleList=(data)=>axios.post("platform/role_lists",data)//获取角色列表（例如：服务商）

export const getRole=(user_id)=>axios.get("platform/get_role",{params:{user_id}})//获取角色信息

export const getAppllyList=(data)=>axios.post("platform/application_lists",data)//获取角色申请列表

export const applyRole=(data)=>axios.post("platform/add_application",data)//角色申请

export const distributeAd=(data)=>axios.post("ad_data/distribute_batch",data)//批量分配广告数据

export const getStoreList=(data)=>axios.post("shop/lists",data)//获取店铺列表

export const getStoreMessage=(data)=>axios.get("shop/get",{params:data})//获取店铺信息

export const getStoreStatistics=(data)=>axios.get("shop/get_shop_statistics",{params:data})//获取店铺统计数据

export const onoffBatch =(data)=>axios.put("product/onoff_batch",data)//批量商品上下架

export const deleteBatch =(data)=>axios.put("product/delete_batch",data)//批量商品删除

export const subIrrehint=(data)=>axios.post("product/commit_illegal",data) //提交违规提醒

export const checkIrrehint=(data)=>axios.post("product/illegal_lists",data) //违规提醒列表

export const checkProduct =(product_id)=>axios.get("product/get",{params:{product_id}})//查看商品

export const getMallStatisticsData = ()=>axios.get("seller/get_mall_statistics");//获取商城所以统计数据

export const getMallPendingEventNum = ()=>axios.get("seller/get_mall_pending_num");//获取商城待处理事件数

export const getStatisticsByDate = (data)=>axios.post("seller/get_mall_statistics_chart",data);//获取商城统计图表数据

export const getFundTotalGive = (data)=>axios.get("fund/total_give",{params:data});//获取累计收入

export const getFundList=(data)=>axios.post("fund/tixian_lists",data)//获取提现列表

export const getFundMess=(data)=>axios.get("fund/get_tixian",{params:data})//获取提现信息

export const fundOperation=(data)=>axios.post("fund/remittance",data)//提现申请汇款操作

export const orderCommission=(data)=>axios.post("fund/give_order_lists",data)//获取订单佣金列表

export const memberCommission=(data)=>axios.post("fund/give_member_lists",data)//获取会员发展佣金列表

export const roleCommission=(data)=>axios.post("fund/give_join_lists",data)//获取角色加盟佣金列表

export const getRoleCPS=(user_id)=>axios.get("platform/get_role_cps",{params:{user_id}})//获取角色cps链接

export const blacklist=(data)=>axios.put("platform/blacklist_operate_batch",data)//批量黑名单操作

export const getRoleRate=()=>axios.get("platform/get_role_rate")//获取角色分佣

export const saveRoleRate=(data)=>axios.post("platform/save_role_rate",data)//保存角色分佣

export const getMemberRate=()=>axios.get("platform/get_member_rate")//获取会员分佣

export const saveMemberRate=(data)=>axios.post("platform/save_member_rate",data)//保存会员分佣

export const getSpecialOrderRate=()=>axios.get("platform/get_special_order_rate")//获取订单分佣（非会员消费）

export const saveSpecialOrderRate=(data)=>axios.post("platform/save_special_order_rate",data)//保存订单分佣（非会员消费）

export const getOrderExtRate=()=>axios.get("platform/get_order_ext_rate")//获取订单分佣（会员消费额外）

export const saveOrderExtRate=(data)=>axios.post("platform/save_order_ext_rate",data)//保存订单分佣（会员消费）

export const saveOrderRate=(data)=>axios.post("platform/save_order_rate",data)//保存订单分佣（会员消费）

export const getOrderRate=()=>axios.get("platform/get_order_rate")//-获取订单分佣（会员消费）

export const get_mall_rate=()=>axios.get("platform/get_mall_rate")//获取商城佣金比率

export const save_mall_rate=(data)=>axios.post("platform/save_mall_rate",data)//-获取订单分佣（会员消费）

export const platformLists=(data)=>axios.post("platform/platform_lists",data)//-获取平台用户列表

export const addPlatform=(data)=>axios.post("platform/add_platform",data)//-添加平台用户

export const savePermission=(data)=>axios.put("platform/save_permission",data)//设置平台用户权限

export const getPlatform=(user_id)=>axios.get("platform/get_platform",{param:{user_id}})//获取平台用户信息

export const deletePlatform=(data)=>axios.delete("platform/delete_platform_batch",{param:data})//批量删除平台用户

export const deleteMessage=(data)=>axios.delete("platform/delete_message_batch",{param:data})//批量删除平台用户

export const message_lists=(data)=>axios.post("platform/message_lists",data)//获取消息列表

export const addMessage=(data)=>axios.post("platform/add_message",data)//添加消息

export const updateMessage=(data)=>axios.put("platform/update_message",data)//编辑消息

export const getMessage=(message_id)=>axios.get("platform/get_message",{param:{message_id}})//编辑消息

export const keepCategoryMess=(keepMess)=>axios.put("product/update",keepMess)//编辑商品

export const createProduct =(data)=>axios.post("product/create",data)//发布商品