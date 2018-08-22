import * as types from "../mutation-types"
import Store from "../../utils/store.js"
import router from '@/router'
import {getMallInfo,loginOut} from '@/api/login'
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
	}
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
	}
}
const actions={
	//登陆成功
	doLogin({ commit,dispatch},user){	
		//type=1是平台管理后台，type=2是商家管理后台
		if(user.type===2){			
			commit(types.LOGIN,user);//登录成功的一系列的信息
			router.replace("/zxh/sellerPage/sellerCenter");			
		}else if(user.type===1){
			commit(types.LOGIN,user);//登录成功的一系列的信息			
			router.replace("/mallZxh/data-center");						
		}
	},
	//退出登录
	doLogout({commit}){
		commit(types.LOGOUT);
		router.replace('/');
		loginOut()
		.then(({data})=>{
			commit(types.MESSLENGTH,"");
			commit(types.LOGOUT);
			router.replace('/');			
		})
		.catch(({response: {status, data}})=>{
		})
	},
	//获取登陆页面logo和底图
	doLoginURL({commit}){
		getMallInfo()
		.then(({data})=>{
			commit(types.LOGINURL,data);
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
