import axios from 'axios'
import store from '@/store'
import * as types from '@/store/mutation-types'
import router from '@/router'
import vue from "@/main.js"
// axios 配置
axios.defaults.timeout = 15000
//axios.defaults.headers.common["content-type"]="multipart/form-data"
axios.defaults.baseURL = '/admin/'

// http request 拦截器
axios.interceptors.request.use(function (config) {
	//全部接口加上mall_id
	config.headers['mall-id']=store.getters.getMall_id;
return config
}, function (err) {
return Promise.reject(err)
})

// http response 拦截器
axios.interceptors.response.use( response => {return response},
  
  err => {
    if (err && err.response) {
	    if(err.response.data.errorcmt){//公共报错信息
	    	vue.$message.error(err.response.data.errorcmt)
	    }  	
      switch (err.response.status) {
        case 400:
          err.message = '请求错误'          
          break
        case 401:
          err.message = '未授权，请登录'
//           401 清除token信息并跳转到登录页面
			if(store.state.user.login){
				store.commit(types.LOGOUT);//超过一定时间没操作就退出登录
				router.replace({//跳到登录页面，如果有查询参数也一并带过去
					path:"/",
					query: {redirect: encodeURIComponent(router.currentRoute.fullPath)}
				})
			};
          break
        case 403:
          err.message = '拒绝访问'
          break
        case 404:
          err.message = `请求地址出错: ${err.response.config.url}`
          break
        case 408:
          err.message = '请求超时'
          break
        case 500:
          err.message = '服务器内部错误'
          break
        case 501:
          err.message = '服务未实现'
          break
        case 502:
          err.message = '网关错误'
          break
        case 503:
          err.message = '服务不可用'
          break
        case 504:
          err.message = '网关超时'
          break
        case 505:
          err.message = 'HTTP版本不受支持'
          break
        default:
      }
    }

    return Promise.reject(err)
  })

export default axios