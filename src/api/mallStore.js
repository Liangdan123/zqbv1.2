import axios from 'axios'

export const getStoreList=(data)=>axios.post("shop/lists",data) //获取店铺列表

export const subIrrehint=(data)=>axios.post("product/commit_illegal",data) //提交违规提醒

export const checkIrrehint=(data)=>axios.post("product/illegal_lists",data) //提交违规提醒