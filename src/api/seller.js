import axios from 'axios'
export const getMallData =()=>axios.get("seller/get_mall_statistics")//获取商城统计数据

export const getshopDynamics=(data)=>axios.post("seller/operate_log_lists",data)//获取店铺动态列表

export const getDynamicsNum=(data)=>axios.get("seller/get_shop_pending_num",{params:data})//获取店铺待处理事件数量

export const getMallNum=(data)=>axios.post("seller/get_mall_statistics_chart",data)//获取商城统计图数据

export const getStoreData =(shop_id)=>axios.get("seller/get_shop_statistics",{params:{shop_id}})//获取商城统计数据

export const getStoreNum=(data)=>axios.post("seller/get_shop_statistics_chart",data)//获取店铺统计图数据

export const getIrregularities=(data)=>axios.post("product/seller_illegal_lists",data)//获取违规提醒列表(商户)

export const checkIrregularities=(illegal_id)=>axios.post("product/check_illegal",{illegal_id})//查看违规提醒(商户)

export const is_read=(illegal_id)=>axios.put("product/operate_illegal",{illegal_id})//处理违规提醒(商户)

