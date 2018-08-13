import * as types from "../mutation-types"

import {getUserMess,keepStoreMess,existStoreMess} from "@/api/myStore"
const state={
	shop_id:"",
	messLength:"",
	keepSucess:false,
	addSucess:false,
	shopList:{},//商品列表信息
	bannerInfo:{},//店铺装修banner保存
	keepdesc:false ,//店铺装修弹框显示不显示
	auditsMess:{},//审核信息
}
const getters={
	getShop_id:(state)=>{
		return state.shop_id
	},
	getMessLength:(state)=>{
		return state.messLength
	},
	getKeepSucess:(state)=>{
		return state.keepSucess
	},
	getAddSucess:(state)=>{
		return state.addSucess
	},
	getkeepdesc:(state)=>{
		return state.keepdesc
	},
	getAuditsMess:(state)=>{
		return state.auditsMess
	}
}
const mutations={
	[types.GETSHOPID](state,shop_id){
		state.shop_id=shop_id;
	},
	[types.MESSLENGTH](state,len){
		state.messLength=len;
	},
	[types.KEEPSUCESS](state,booleans){
		state.keepSucess=booleans;
	},
	[types.KEEPDESC](state,booleans){
		state.keepdesc=booleans;
	},
	[types.AUDITSMESS](state,data){
		state.auditsMess=data
	}
}
const actions={
	//获取用户店铺信息
	doGetUserMess({commit}){
		getUserMess()
		.then(({data})=>{
			//没有数据时长度为0
			let len=data.length;
			commit(types.MESSLENGTH,len);
			if(len > 0) {
				let shop_id = data[0].shop_id;					
				commit(types.GETSHOPID, shop_id);
			};
		})
		.catch((error)=>{
			console.log("error:",error)
		})
	},
	doAuditsMess({commit},data){
		commit(types.AUDITSMESS, data);
	}
}
export default {
	state,getters,mutations,actions
}
