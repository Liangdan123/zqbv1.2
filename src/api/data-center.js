import axios from 'axios'
export const getMallStatisticsData = ()=>axios.get("seller/get_mall_statistics");//获取商城所以统计数据
export const getMallPendingEventNum = ()=>axios.get("seller/get_mall_pending_num");//获取商城待处理事件数
export const getShopEntryDetail = (data)=>axios.get("shop/get_entry",{params:data});//获取入驻商家信息
export const getShopApplyDetail = (data)=>axios.get("shop/get_apply",{params:data});//获取开店申请信息
export const getStatisticsByDate = (data)=>axios.post("seller/get_mall_statistics_chart",data);//获取商城统计图表数据
export const getShopEntryLists = (data)=>axios.post("shop/entry_lists",data);//获取商家入驻申请列表
export const getShopApplyLists = (data)=>axios.post("shop/apply_lists",data);//获取开店申请列表
export const setShopEntryStatus= (data)=>axios.post("shop/audit_entry",data);//审核商家入驻情况
export const setShopApplyStatus= (data)=>axios.post("shop/audit",data);//审核开店申请
