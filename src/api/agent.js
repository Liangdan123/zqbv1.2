import axios from "axios"

export const dlsLists=(data)=>axios.post("order/dls_lists",data)//获取订单列表 

export const hhrLists=(data)=>axios.post("order/hhr_lists",data)//获取查看合伙人列表 

export const roleIsPay=()=>axios.get("join_pay/is_pay")//获取角色是否已支付加盟费 

export const prepay=()=>axios.get("join_pay/prepay")//微信预支付

