import axios from "axios"
//登陆页面底图以及logo

export const getMallInfo =()=>axios.get("mall_info")

export const accountInfo=(data)=>axios.post("user/login",data)

export const getPhoneNum=(phone)=>axios.post("user/phone_exists",{phone})//手机号码存在不存在接口

export const getphoneEmailCode=(type,data)=>axios.post("notify/reset_verify_code",{type,data})

export const getPhoneAllMess=(phone,verify_code,new_password)=>axios.post("user/pwd_reset_phone",{phone,verify_code,new_password})

export const getEmailNum=(email)=>axios.post("user/email_exists",{email})//邮箱存在不存在接口

export const getEmailAllMess=(email,verify_code,new_password)=>axios.post("user/pwd_reset_phone",{email,verify_code,new_password})

export const getEmailReset=(email,verify_code,new_password)=>axios.post("user/pwd_reset_email",{email,verify_code,new_password})

export const getRegisterMess=(phone,verify_code,password)=>axios.post("user/register",{phone,verify_code,password})//用户注册页面

export const getRegisterCode=(type,data)=>axios.post("notify/regiser_verify_code",{type,data})

export const loginOut=()=>axios.post("user/logout") //用户退出登录接口

export const imageUpload =(file)=>axios.post("upload_image",file)/*上传图片接口*/

