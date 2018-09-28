<template>
	<div class="mt-10">
		<div class="order-list-wrap" v-if="Visible">
			<el-table class="mt-10 fundList" :data="list" style="width: 100%">
				<el-table-column label="提现金额">
					<template slot-scope="scope">
						<span class="font-waring">{{ scope.row.apply_money_yuan | money}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="apply_time" label="创建时间">
				</el-table-column>
				<el-table-column prop="tixian_type" label="提现方式">
					<template slot-scope="scope">
						{{scope.row.tixian_type|type}}
					</template>
				</el-table-column>
				<el-table-column label="提现状态">
					<template slot-scope="scope">
						<span :class="{'font-waring':scope.row.status==3}">{{ scope.row.status | withdrawalStatus}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="address" label="操作" width="120">
					<template slot-scope="scope">							 
						<el-button 
							v-if="scope.row.status==2" 
							@click="withdrawalConfirm(scope.row.tixian_id)" 
							class="store-button1" type="primary">
						 	确认收款</el-button>
							 
						<p class="u-btn" @click="withdrawalDetailShow(scope.row.tixian_id)"> 查看详情 </p>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<WithdrawDetail v-if="!Visible"
			:tixian_id="tixian_id"
			@backDetail="backDetail"
			@sureFund="sureFund"
			isbtn="true"></WithdrawDetail>
		
	</div>
</template>

<script>
	import { sureReceivables} from "@/api/servicer"
	export default {
		name: "MoneyWithdrawaklDetail",
		components: {
			"WithdrawDetail":()=>import("@/components/moneyManage/WithdrawDetail")
		},
		filters: {
			money(value) {
				// 金额转换成数字和整数部分
				value = Number(value).toFixed(2).split('.');
				let value_int = value[0].toLocaleString(); // 转换成金额形式
				return `￥ ${value_int}.${value[1]}`;
			},
			type(val) { //角色转换
				let num=+val
				let role
				switch(num) {
					case 1:
						role = "支付宝"
						break;
					case 2:
						role = "微信"
						break;
					case 3:
						role = "银行卡"
						break;
				}
				return role
			},
			withdrawalStatus(status) {
				let status_text;
				switch(status) {
					case 1:
						status_text = '等待平台汇款';
						break;
					case 2:
						status_text = '等待商家确认收款';
						break;
					case 3:
						status_text = '提现失败';
						break;
					case 4:
						status_text = '提现完成';
						break;
				}
				return status_text
			},
		},
		props: {
			list: { // 提现列表数据
				type: Array,
				required: true,
				default:function(){
					return []
				},
			},
			Visible:{// 提现详情dialog开关状态
				required: true,
				default:function(){
					return true
				}
			}
		},
		created() {
			this.role = this.$store.getters.getType;
		},
		data() {
			return {
				role: 2,
				withdrawalClickId: '',
				tixian_id:"",
			}
		},
		methods: {
			withdrawalDetailShow(tixian_id) {
				this.$emit("checkDetail");//显示那个弹框
				this.tixian_id=tixian_id;		
			},
			backDetail(){
				this.$emit("backDetail")
			},
			sureFund(){//确认收款
				this.$emit("sureFund")
			},
			withdrawalConfirm(tixian_id) {
				this.$confirm('你是否确认已收款？', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				}).then(() => {
					sureReceivables({tixian_id})						
						.then(() => {
							this.$message({
								message: '确认收款成功',
								type: 'success'
							});
							this.$emit("sureFund")//父集重新拉记录列表
						})
				})
				.catch(()=>{
						this.$message({
							message: '已取消',
							type: 'info'
						});
				})
			}
		},
	}
</script>

<style lang="scss" >
	.order-list-wrap {
		.el-table.fundList{			
			.el-table__body-wrapper{
				tr{
					height: 70px;				
					.store-button1{
						height: 24px;
						font-size: 10px;			
						padding: 0 4px;
					}
				}
			}
		}
	}
</style>