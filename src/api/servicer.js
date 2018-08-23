import axios from "axios"

export const getProductList=(shopMess)=>axios.post("product/lists",shopMess)//获取商品列表(服务商)

export const existStoreMess=(existMess)=>axios.post("shop/save_decoration",existMess)//保存店铺装修信息(服务商)
