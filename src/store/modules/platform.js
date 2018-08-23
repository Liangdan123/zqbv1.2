import * as types from "../mutation-types"

const state={
	mallMessExist:false,
}

const getters={
	getmallMessExist:(state)=>{
		return state.mallMessExist
	}
}

const mutations={
	[types.MALLMESSEXIST](state,data){
		state.mallMessExist=data
	}
}

const actions={
	doMallMessExist({commit},data){
		commit(types.MALLMESSEXIST, data);	
	},
}
export default {
	state,getters,mutations,actions
}