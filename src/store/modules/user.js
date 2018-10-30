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

let platJumpPage=function(pageArray){
		let navbarArray=pageArray.split(",");
		let jumpPage=Math.min.apply(null,navbarArray);
		switch(jumpPage){//登录先跳进权限取值最小的的页面
			case 1:
				router.replace("/mallZxh/controlCenter/platDataCenter");
				break;
			case 2:
				router.replace("/mallZxh/storeManage");
				break;
			case 3:
				router.replace("/mallZxh/platformOrder/serverAllOrder");
				break;
			case 4:
				router.replace("/mallZxh/marketingInfo");
				break;
			case 5:
				router.replace("/mallZxh/mallSetInfo");
				break;
			case 6:
				router.replace("/mallZxh/fund/extractCash");
				break;
			case 7:
				router.replace("/mallZxh/manage/join");
				break;
		}
}

const actions={
	//登陆成功
	doLogin({ commit,dispatch},user){	
		commit(types.LOGIN,user);//登录成功的一系列的信息
		getArea()/*地区接口*/
		.then(({data})=>{
			commit(AREA,data);
		});
		
		switch(user.type){
			case 1://登录的是平台跳转
				if(user.is_admin===1){
					router.replace("/mallZxh/controlCenter/platDataCenter");
				}else if(user.is_admin===0){
					platJumpPage(user.permission);
				};			
				break;
			case 2:
				router.replace("/agent/agentMoney");
				break;

			case 3:
				router.replace("/partner/partnerMoney");
				break;
			case 4:
				
				router.replace("/server/sellercenter/servicerCenter");
				break;
		}
		
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
