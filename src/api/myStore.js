import axios from "axios";

export const imageUpload =(file)=>axios.post("upload_image",file)/*上传图片接口*/

export const createStoreMess=(storeMess)=>axios.post("shop/create",storeMess)

export const getUserMess=()=>axios.get("user/get_shop")

export const getstoreMess=(data)=>axios.get("shop/get",{params:data})

export const keepStoreMess=(keepMess)=>axios.put("shop/update",keepMess)

export const existStoreMess=(existMess)=>axios.post("shop/save_decoration",existMess)

export const getStoreBanner=(shop_id)=>axios.get("shop/get_banner",{params:{shop_id}})

export const getProductList=(shopMess)=>axios.post("product/lists",shopMess)//商品列表信息

export const getfreightTemList=(data)=>axios.post("shop/distribute_template_lists",data)//运费模板列表

export const addFreightTem=(data)=>axios.post("shop/create_distribute_template",data)//添加运费模板

export const editFreightTem=(data)=>axios.put("shop/update_distribute_template",data)//编辑运费模板

export const delFreightTem=(data)=>axios.delete("shop/delete_distribute_template",{data})//编辑运费模板

export const existFreeShipping=(data)=>axios.post("mall_set/save_baoyou",data)//保存订单包邮设置

export const seeFreeShipping=(mall_id)=>axios.get("mall_set/get_baoyou",{params:{mall_id}})//查看订单包邮设置

export const getChecksStatus=()=>axios.get("shop/get_apply_status")//获取开店审核状态

export const submitShop=(data)=>axios.post("shop/apply",data)//提交开店申请

export const getShopStatistics=(data)=>axios.get("seller/get_shop_statistics",{params:data})//获取店铺统计数据
