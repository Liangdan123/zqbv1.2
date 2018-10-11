import axios from "axios"

export const existStoreMess=(existMess)=>axios.post("mock/shop/save_decoration",existMess)//保存店铺装修信息(服务商)

export const getRoleData=(user_id)=>axios.get("mock/member/get_role_statistics",{params:user_id})//获取角色所属会员统计数据


export const getServerAdList=(data)=>axios.post("mock/ad_data/distribute_lists",data)//获取服务商分配广告数据列表

export const deleteServerAdList=(data)=>axios.delete("mock/ad_data/delete_distribute_batch",{data})//批量删除服务商分配广告数据

export const getUserMess=()=>axios.get("mock/user/get_shop")//获取服务商店铺

export const editStoreMess=(editMess)=>axios.put("mock/shop/update",editMess)//编辑我的店铺

export const createStoreMess=(storeMess)=>axios.post("mock/shop/create",storeMess)//创建店铺信息

export const getStoreBanner=(shop_id)=>axios.get("mock/shop/get_banner",{params:{shop_id}})//获取店铺轮播图
													
export const getStoreData =(shop_id)=>axios.get("mock/seller/get_shop_statistics",{params:{shop_id}})//获取店铺统计图表(服务商)

export const getshopDynamics=(data)=>axios.post("mock/seller/operate_log_lists",data)//获取店铺动态列表(卖家中心)

export const getDynamicsNum=(data)=>axios.get("mock/seller/get_shop_pending_num",{params:data})//获取店铺待处理事件数量

export const getIrregularities=(data)=>axios.post("mock/product/seller_illegal_lists",data)//获取违规提醒列表(商户)

export const checkIrregularities=(illegal_id)=>axios.post("mock/product/check_illegal",{illegal_id})//查看违规提醒(商户)

export const isRead=(illegal_id)=>axios.put("mock/product/operate_illegal",{illegal_id})//处理违规提醒(商户)

export const getAccountInfo=(user_id)=>axios.get("mock/fund/get_account",{params:{user_id}})//获取账户信息

export const getVerifyCode = ()=>axios.get("notify/tixian_verify_code");// 申请提现发送验证码

export const withdrawalApplyCommit = (data)=>axios.post("mock/fund/commit_tixian",data);//提交提现申请

export const getAccountMoney = (user_id)=>axios.get("mock/fund/get_account",{params:{user_id}});// 获取账户资金信息

export const sureReceivables = (tixian_id)=>axios.post("mock/fund/confirm",{tixian_id});// 提现申请确认收款

export const getOrderConsumeList = (data)=>axios.post("mock/fund/sell_order_lists",data);// 获取订单消费收入列表

export const getAssessList = (data)=>axios.post("mock/product/comment_lists",data);//获取商品评价列表

export const backAssess = (data)=>axios.post("mock/product/comment_back",data);//评价回复

export const setProductsCategory =(data)=>axios.post("mock/product/save_product_mall_category_batch",data)//批量设置商品商城分类

export const setOnlyProductsCategory =(data)=>axios.post("mock/product/save_product_mall_category",data)//设置商品店铺分类(单个)