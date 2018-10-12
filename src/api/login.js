import axios from "axios"
//登陆页面底图以及logo

export const getMallInfo =()=>axios.get("mall_info")

export const accountInfo=(data)=>axios.post("mock/user/login",data)

export const getPhoneAllMess=(phone,verify_code,new_password)=>axios.post("user/pwd_reset_phone",{phone,verify_code,new_password})

export const getRegisterCode=(type,data)=>axios.post("notify/regiser_verify_code",{type,data})

export const loginOut=()=>axios.post("user/logout") //用户退出登录接口

export const imageUpload =(file)=>axios.post("upload_image",file)/*上传图片接口*/

export const getArea =()=>axios.get("mock/region/get")/*地区接口*/

export const loginVerifyCode =(data)=>axios.post("notify/login_verify_code",data)/*注册发送验证码*/





