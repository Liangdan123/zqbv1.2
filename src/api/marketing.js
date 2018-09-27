import axios from 'axios'
export const addCouponAPI =(data)=>axios.post("coupon/create",data)//添加店铺优惠券

export const getCouponList =(data)=>axios.post("coupon/lists",data)//店铺优惠券列表

export const deleteCouponList =(data)=>axios.delete("coupon/delete__batch",{data})//删除优惠券列表

export const getRechargeLists =(data)=>axios.post("member/recharge_lists",data)//获取会员充值记录列表

export const RechargeDiscount =(mall_id)=>axios.get("member/give_lists",{params:{mall_id}})//获取充值优惠列表接口

export const addDiscount =(data)=>axios.post("member/add_give",data)//添加优惠接口

export const deleteDiscount =(data)=>axios.delete("member/delete_give_batch",{data})//删除优惠接口

export const editDiscount =(data)=>axios.put("member/update_give",data)//编辑优惠接口
