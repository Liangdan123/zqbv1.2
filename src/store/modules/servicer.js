import * as types from "../mutation-types"

import {getUserMess} from "@/api/servicer"

const state={
	keepSucess:false,
	shop_id:"",
	addSuccess:false,
	closeStore:true,//改变开店店铺信息头部
	messLength:"",
}

const getters={
	getKeepSucess:(state)=>{
		return state.keepSucess
	},
	getMessLength:(state)=>{
		return state.messLength
	},
	getShop_id:(state)=>{
		return state.shop_id
	},
	getAddSuccess:(state)=>{
		return state.addSuccess
	}
}

const mutations={
	[types.KEEPSUCESS](state,booleans){
		state.keepSucess=booleans;
	},
	[types.MESSLENGTH](state,len){
		state.messLength=len;
	},
	[types.ADDSUCESS](state,booleans){
		state.addSuccess=booleans;
	},
	[types.GETSHOPID](state,shop_id){
		state.shop_id=shop_id;
	},
	[types.CLOSESTORE](state,data){
		state.closeStore=data;
	}
}

const actions={
	doGetUserMess({commit}){
		getUserMess()//获取服务商店铺
		.then(({data})=>{
			//没有数据时长度为0
			let len=data.length;
			commit(types.MESSLENGTH,len);
			console.log("data.length:",data.length)
			if(len > 0) {
				let shop_id = data[0].shop_id;	
				console.log("shop_id:",shop_id)
				commit(types.GETSHOPID, shop_id);
			};
		})
	},
	doCloseStore({commit},data){//改变开店店铺信息头部
		commit(types.CLOSESTORE, data);	
	}
}
export default {
	state,getters,mutations,actions
}