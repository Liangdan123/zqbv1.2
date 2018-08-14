import * as types from "../mutation-types"
import {getClassifyList,getMallClassifyList} from "@/api/commodity"

const state={
	classifyList:[],
	mallClassifyList:[]
}
const getters={
	getClassifyList:(state)=>{
		return state.classifyList
	},
	getMallClassifyList:(state)=>{
		return state.mallClassifyList
	}
}
const mutations={
	[types.CLASSIFYLIST](state,data){
		state.classifyList=data;
	},
	[types.MALLCLASSIFYLIST](state,data){
		state.mallClassifyList=data;
	}
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
	doMallClassifyList({commit}){
		//获取商城分类列表
		getMallClassifyList()		
		.then(({data})=>{
			commit(types.MALLCLASSIFYLIST,data)
		}).catch((error)=>{
		})
	}
}
export default {
	state,getters,mutations,actions
}
