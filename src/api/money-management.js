import axios from 'axios'
export const getShopIncomeList = (data)=>axios.post("fund/order_lists",data);//获取销售明细
export const getWithdrawalList = (data)=>axios.post("fund/tixian_lists",data);//获取提现列表
export const withdrawalApplyCommit = (data)=>axios.post("fund/commit_tixian",data);//提交提现申请
export const getRechargeList = (data)=>axios.post("member/recharge_lists",data);//取会员充值记录列表
export const getShopFundStatistics = ()=>axios.get("fund/get_statistics");// 资金统计
export const getMallFundStatistics = ()=>axios.get("member/get_statistics");// 获取会员统计数据
export const getWithdrawalDetail = (id)=>axios.get("fund/get_tixian",{params:id});// 查看提现信息
export const setWithdrawalStatus = (data)=>axios.post("fund/confirm",data);// 提现申请确认收款
export const setRemittanceStatus = (data)=>axios.post("fund/remittance",data);// 提现申请汇款操作
export const getAccountMoney = ()=>axios.get("fund/get_account");// 获取账户资金信息
export const getVerifyCode = ()=>axios.get("notify/tixian_verify_code");// 申请提现发送验证码
