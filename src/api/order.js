import axios from "axios";
export const getOrderList=(orderList)=>axios.post("order/lists",orderList)//平台获取订单列表接口

export const getShopOrderList=(orderList)=>axios.post("order/seller_lists",orderList)//商家获取订单列表接口

export const getOrderMess=(split_order_id)=>axios.get("order/get",{params:{split_order_id}})//获取订单详情接口

export const getExpress=()=>axios.get("common/express_lists")//获取快递公司信息

export const setProduct=(data)=>axios.post("order/delivery",data)//卖家发货接口

export const logisticsMess=(split_order_id)=>axios.get("order/get_express",{params:{split_order_id}})//获取物流信息接口

export const refundList=(refundList)=>axios.post("refund/lists",refundList)//获取退款订单列表

export const refundAgree=(refund_order_id)=>axios.put("refund/agree",{refund_order_id})//卖家同意退款接口

export const refundDisagree=(refund_order_id)=>axios.put("refund/refuse",{refund_order_id})//卖家拒绝退款接口

export const refundGet=(refund_order_id)=>axios.get("refund/get",{params:{refund_order_id}})//获取退款订单详情

export const refundLogMess=(refund_order_id)=>axios.get("refund/get_express",{params:{refund_order_id}})//获取退款物流信息接口

export const refundConfirm=(refund_order_id)=>axios.put("refund/confirm",{refund_order_id})//卖家确认收货接口


