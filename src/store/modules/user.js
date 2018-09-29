import * as types from "../mutation-types"
import {getArea} from '@/api/login.js'
import Store from "../../utils/store.js"
import router from '@/router'
import {loginOut} from '@/api/login'
export const AREA = 'AREA'
const state={
	login:false,
	manualLogout:false,
	user:{
		zhixu_id:"",
		company_id:"",
		phone:"",
		email:"",
		login_name:"",
		type:"",
		mall_id:"",
		type:"",
	},
	loginUrl:{
		background:"",
		logo:""
	},
	area:[],
	resetSuccess:false,
	registerSuccess:false
}
const getters={
	getUserName:(state)=>{
		return state.user.login_name
	},
	getEmail:(state)=>{
		return state.user.email
	},
	getLoginUrl:(state)=>{
		return state.loginUrl
	},
	getResetSuccess:(state)=>{
		return state.resetSuccess
	},
	getRegisterSuccess:(state)=>{
		return state.registerSuccess
	},
	getMall_id:(state)=>{
		return state.user.mall_id
	},
	getType:(state)=>{
		return state.user.type
	},
	getPhone:(state)=>{
		return state.user.phone
	},
	getArea:(state)=>{
		return state.area
	},
}

const mutations={
	[types.LOGIN](state,user){
		state.login=true;
		state.manualLogout=false;
		state.user=user
	},
	[types.LOGOUT](state,user){
		state.login=false;
		state.manualLogout=true;
		state.user={};
		Store.remove('vuex');
	},
	[types.LOGINURL](state,data){
		state.loginUrl=data;
	},
	[types.RESETSUCCESS](state,booleans){
		state.resetSuccess=booleans
	},
	[types.REGISTERSUCCESS](state,booleans){
		state.registerSuccess=booleans
	},
	[AREA](state,area){
		state.area=area
	},
}
const actions={
	//登陆成功
	doLogin({ commit,dispatch},user){	
		//type=1是平台管理后台，type=2是商家管理后台
		// if(user.type===2){			
		// 	commit(types.LOGIN,user);//登录成功的一系列的信息
		// 	router.replace("/zxh/sellerPage/sellerCenter");			
		// }else if(user.type===1){
		// 	commit(types.LOGIN,user);//登录成功的一系列的信息			
		// 	router.replace("/mallZxh/data-center");						
		// }
		commit(types.LOGIN,user);//登录成功的一系列的信息
		getArea().then(({data})=>{
			commit(AREA,data);
		})
		router.replace("server/serverOrder/serverAllOrder")
	},
	//退出登录
	doLogout({commit}){
		commit(types.LOGOUT);
		router.replace('/');
		loginOut()
		.then(({data})=>{
			commit(types.LOGOUT);
			router.replace('/');			
		})
		.catch(({response: {status, data}})=>{
		})
	},
	//重置密码成功（手机和邮箱）
	doResetSuccess({commit},booleans){
		commit(types.RESETSUCCESS,booleans)
	},
	//注册成功
	doRegisterSuccess({commit},booleans){
		commit(types.REGISTERSUCCESS,booleans)
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}
