import axios from "axios"

export const dlsLists=(data)=>axios.post("mock/order/dls_lists",data)//获取订单列表 

export const hhrLists=(data)=>axios.post("mock/order/hhr_lists",data)//获取查看合伙人列表 

export const roleIsPay=()=>axios.get("mock/join_pay/is_pay")//获取角色是否已支付加盟费 

export const prepay=()=>axios.get("mock/join_pay/prepay")//微信预支付

