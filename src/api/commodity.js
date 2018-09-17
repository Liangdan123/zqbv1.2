import axios from "axios"
export const getClassifyList=(shop_id)=>axios.get("product/shop_category_lists",{params:{shop_id}})

export const SaveShopClassifyList =(existMess)=>axios.post("product/save_shop_category",existMess)

export const onoffBatch =(data)=>axios.put("mock/product/onoff_batch",data)

export const deleteBatch =(data)=>axios.put("product/delete_batch",data)

export const keepCategoryMess=(keepMess)=>axios.put("mock/product/update",keepMess)

export const editspef=(Mess)=>axios.post("product/save_spec",Mess)

export const setProductsCategory =(data)=>axios.post("product/save_product_shop_category_batch",data)//批量设置商品店铺分类

export const setOnlyProductsCategory =(data)=>axios.post("product/save_product_shop_category",data)//设置商品店铺分类(单个)

export const getShippingTem =(data)=>axios.post("shop/distribute_template_lists",data)

export const createProduct =(data)=>axios.post("mock/product/create",data)

export const getMallClassifyList =()=>axios.get("product/mall_category_lists")//获取商城分类列表

export const setMallClassify =(data)=>axios.post("product/save_product_mall_category",data)//设置商城分类

export const setMallClassifyBatch =(data)=>axios.post("product/save_product_mall_category_batch",data)//批量设置商城分类
