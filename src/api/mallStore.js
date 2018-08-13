import axios from 'axios'

export const getStoreList=(data)=>axios.post("shop/lists",data) //获取店铺列表