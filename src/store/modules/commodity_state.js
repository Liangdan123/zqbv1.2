import * as types from "../mutation-types"
import {getClassifyList,getMallClassifyList} from "@/api/commodity"

const state={
	classifyList:[],
}
const getters={
	getClassifyList:(state)=>{
		return state.classifyList
	},
}
const mutations={
	[types.CLASSIFYLIST](state,data){
		state.classifyList=data;
	},
}
const actions={
	doClassifyList({commit},shop_id){
		//获取店铺分类列表
		getClassifyList(shop_id)
		.then(({data})=>{
			commit(types.CLASSIFYLIST,data)
		}).catch((error)=>{
		})
	},
}
export default {
	state,getters,mutations,actions
}
