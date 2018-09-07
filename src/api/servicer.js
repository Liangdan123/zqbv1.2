import axios from "axios"

export const existStoreMess=(existMess)=>axios.post("shop/save_decoration",existMess)//保存店铺装修信息(服务商)

export const getRoleData=(user_id)=>axios.get("member/get_role_statistics",{params:user_id})//获取角色所属会员统计数据

export const getRoleCPS=(user_id)=>axios.get("mock/platform/get_role_cps",{params:user_id})//获取角色cps链接

export const getServerAdList=(data)=>axios.post("mock/ad_data/distribute_lists",data)//获取服务商分配广告数据列表

export const deleteServerAdList=(data)=>axios.delete("mock/ad_data/delete_distribute_batch",{data})//批量删除服务商分配广告数据
