import axios from "axios"

export const existStoreMess=(existMess)=>axios.post("mock/shop/save_decoration",existMess)//保存店铺装修信息(服务商)

export const getRoleData=(user_id)=>axios.get("member/get_role_statistics",{params:user_id})//获取角色所属会员统计数据

export const getRoleCPS=(user_id)=>axios.get("mock/platform/get_role_cps",{params:user_id})//获取角色cps链接

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