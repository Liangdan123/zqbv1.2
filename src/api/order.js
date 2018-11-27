import axios from "axios";
export const getOrderList=(orderList)=>axios.post("order/lists",orderList)//平台获取订单列表接口

export const getShopOrderList=(orderList)=>axios.post("order/seller_lists",orderList)//商家获取订单列表接口

export const getOrderMess=(split_order_id)=>axios.get("order/get",{params:{split_order_id}})//获取订单详情接口

export const complete=(ops_id)=>axios.put("order/complete_schedule",{ops_id})//进度完工 规格记录id

export const getSchedule=(order_product_id)=>axios.get("order/get_schedule",{params:{order_product_id}})//查看进度

export const getInvoice=(split_order_id)=>axios.get("order/get_invoice",{params:{split_order_id}})//查看开票信息

export const setProduct=(data)=>axios.post("order/delivery",data)//卖家发货接口(就是开始服务接口)

export const refundPartlists=(split_order_id)=>axios.get("refund/part_product_lists",{params:{split_order_id}})//获取部分退款商品列表

export const refundList=(refundList)=>axios.post("refund/lists",refundList)//获取退款订单列表

export const refundAgree=(refund_order_id)=>axios.put("refund/agree",{refund_order_id})//卖家同意退款接口

export const refundDisagree=(refund_order_id)=>axios.put("refund/refuse",{refund_order_id})//卖家拒绝退款接口

export const refundGet=(refund_order_id)=>axios.get("refund/get",{params:{refund_order_id}})//获取退款订单详情

export const applyRefundPart=(data)=>axios.post("refund/part_create",data)//提交部分退款申请


export const tousuInfo=(split_order_id)=>axios.get("order/get_tousu",{params:{split_order_id}})//提交部分退款申请

export const operateTousu=(split_order_id)=>axios.put("order/operate_tousu",{split_order_id})//提交部分退款申请




