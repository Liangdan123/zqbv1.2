 <template>
  <div class="panel-content">
    	<div v-show="false">{{isFundMess}}</div>
    	<div v-loading="loading">    		   	
	    	<p class="panel-title">提现进度</p>
				<div class="progress">
					<el-steps :space="200" 
						process-status="wait" 
						:active="fundMessage.status+1" 
						class="step" 
						:align-center="true">
						<el-step title="申请提现" 
							:description="String(fundMessage.apply_time||'')" 
							:class="{last:fundMessage.status=='0',error:fundMessage.status=='3'}">
	
						</el-step>
						<el-step 
							title="提现失败" 
							status="error" v-if="fundMessage.status==3" 
							:description="String(fundMessage.remittance_time||'')">
	
						</el-step>
						<template v-if="fundMessage.status!==3">
							<el-step title="等待平台汇款" 
								:description="String(fundMessage.remittance_time||'')" 
								:class="{last:fundMessage.status=='1'}">
	
							</el-step>
							<el-step title="商家确认收款" v-if="fundMessage.status!==3" 
								:description="String(fundMessage.confirm_time||'')" 
								:class="{last:fundMessage.status=='2'}">
	
							</el-step>
							<el-step title="完成提现" v-if="fundMessage.status!==3" 
								:description="String(fundMessage.confirm_time||'')">
	
							</el-step>
						</template>
					</el-steps>
				</div>
			<p class="panel-title">提现详情</p>
			<div class="fundDetail">
				<el-row>
					<el-col :span="8">提现方式：</el-col>
					<el-col :span="16">{{fundMessage.tixian_type|fundMethod}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">提现金额：</el-col>
					<el-col :span="16">{{fundMessage.apply_money_yuan||0|money('￥')}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">申请人：</el-col>
					<el-col :span="16">{{fundMessage.tixian_name}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="8" v-if='fundMessage.tixian_type==3'>开户银行：</el-col>
					<el-col :span="16">{{fundMessage.tixian_bank}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">{{fundMessage.tixian_type==1?'支付宝账号：':fundMessage.tixian_type==3?'银行卡号：':'微信号：'}}</el-col>
					<el-col :span="16">{{fundMessage.tixian_account}}</el-col>
				</el-row>
			</div>
			<div v-if="isbtn" class="clearfix">
				<el-button class="store-button1 float-r ml-10" 
					v-if="fundMessage.status===2"
					@click="sureFund">
					确认收款
				</el-button>
				<el-button class="store-button2 float-r" @click="goBack">
					返回
				</el-button>
			</div>
			<slot></slot>
		</div>
  </div>
</template>

<script>
import { getFundMess} from "@/api/platform"
import { sureReceivables} from "@/api/servicer"
export default{
	filters: {
		money(value=0, label = '') {
			// 金额转换成数字和整数部分
			value = Number(value).toFixed(2).split('.');
			let value_int = Number(value[0]).toLocaleString(); // 转换成金额形式
			return `${label}${value_int}.${value[1]}`;
		},
	   fundMethod(val) { //角色转换
        let num = +val
        switch (num) {
          case 1:
             return "支付宝"
            break;
          case 2:
             return "微信"
            break;
           case 3:
             return "银行卡"
            break;
        }
      },
	},
	data(){
		return{
			fundMessage:{
				status:0,
				apply_time:"",
				remittance_time:"",
				confirm_time:""
			},//提现信息
			loading:true,
		}
	},
	props:{
		tixian_id:{
			default:function(){
				return ""
			}
		},
		isbtn:{
			default:function(){
				return false
			}
		}
	},
	computed:{
		isFundMess(){
			if(this.tixian_id){
				let tixian_id=this.tixian_id
				getFundMess({tixian_id})//获取提现信息API
				.then(({data})=>{
					this.loading=false
					this.fundMessage=data;
				})
			}
		},
	},
	methods:{
		goBack(){
			this.$emit("backDetail")
		},
		sureFund(){//确认收款
			sureReceivables(this.tixian_id)
			.then(()=>{
				  this.$message({
						message: '确认收款成功',
						type: 'success'
					});
				this.$emit("sureFund")
			})
		},
	}
}


</script>

<style lang="scss">
	.panel-content{
						.panel-title {
					font-weight: bold;
					color: #333;
					font-size: 16px;
				}
				.progress {
					margin-top: 10px;
					margin-bottom: 20px;
					margin-left: auto;
					margin-right: auto;
					.el-steps{
						
						margin-left:50px;
						.el-step__head {
							width: 8px;
							height: 8px;
							margin-top: 12px;
							margin-left: 8px;
							&.is-wait {
								border: 0;
								background: #bfcbd9 !important;
							}
							&.is-error {
								border: 0;
							}
							&.is-finish {
								border: 0;
								border-color: #0070C9;
								background: #0070C9;
								.el-step__line-inner {
									width: 100% !important; // border: 0;
								}
							}
							.el-step__icon {
								display: none;
							}
						}
						.el-step__description {
							margin-left: -30px;
						}
						.el-step__title {
							// display: block;
							font-size: 12px;
						}
						.error {
							.is-finish {
								.el-step__line-inner {
									border-color: #ff4949; // border: 0;
								}
							}
						}
						.last {
							.is-finish {
								.el-step__line-inner {
									border-color: #bfcbd9; // border: 0;
								}
							}
						}
					}
				}
				.fundDetail {
					padding-top: 10px;
					width: 300px;
					.el-row{
						line-height:24px;
						.el-col-8{
							text-align: right;
							color:#7F7F7F;
						}
						.el-col-16{
							color:#333;
						}
					}

				}
	}
</style>

