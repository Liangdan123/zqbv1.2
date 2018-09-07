import * as types from "../mutation-types"

import {getUserMess} from "@/api/platform"

const state={
	keepSucess:false,
	shop_id:"",
	addSuccess:false
}

const getters={
	getKeepSucess:(state)=>{
		return state.keepSucess
	},
	getShop_id:(state)=>{
		return state.shop_id
	},
	getAddSuccess:(state)=>{
		return state.existSuccess
	}
}

const mutations={
	[types.KEEPSUCESS](state,booleans){
		state.keepSucess=booleans;
	},
	[types.ADDSUCESS](state,booleans){
		state.addSuccess=booleans;
	},
	[types.GETSHOPID](state,shop_id){
		state.shop_id=shop_id;
	},
}

const actions={
	doGetUserMess({commit}){
		getUserMess()
		.then(({data})=>{
			//没有数据时长度为0
			let len=data.length;
			if(len > 0) {
				let shop_id = data[0].shop_id;					
				commit(types.GETSHOPID, shop_id);
			};
		})
		.catch((error)=>{
			console.log("error:",error)
		})
	},
}
export default {
	state,getters,mutations,actions
}