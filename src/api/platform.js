import axios from "axios"

export const getMallMess =()=>axios.get("mall/get")//获取商城信息

export const editMallMess =(mallMess)=>axios.put("mall/update",mallMess)//编辑商城信息

export const correscomList=()=>axios.get("mall/mall_component_lists")//获取商城对应组件列表

export const existAssembly=(data)=>axios.post("mall/save_mall_component",data)//保存商城对应组件数据

export const getMallShopNum=()=>axios.get("product/get_num")//商城商品上架数量

export const getcomponentList=(data)=>axios.post("mall/component_lists",data)//获取组件列表

export const existMallClassified =(data)=>axios.post("product/save_mall_category",data)//保存商城分类信息

export const getMallClassifyList =()=>axios.get("product/mall_category_lists")//获取商城分类列表

export const getClassifyList=(shop_id)=>axios.get("product/shop_category_lists",{params:{shop_id}})//获取店铺分类列表

export const getProductList=(shopMess)=>axios.post("product/lists",shopMess)//商品列表信息


