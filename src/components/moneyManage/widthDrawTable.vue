<template>
	<div class="mt-10">
		<div class="order-list-wrap" v-if="Visible">
			<el-table class="mt-10" :data="list" style="width: 100%">
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
						<el-button v-if="scope.row.status==2&&role!='1'" 
							@click="withdrawalConfirm(scope.row.tixian_id)" 
							:loading="withdrawalClickId==scope.row.tixian_id" 
							class="store-button1" type="primary" size="mini">
							 确认收款</el-button>
						<p class="u-btn" @click="withdrawalDetailShow(scope.row.tixian_id)"> 查看详情 </p>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<WithdrawDetail v-if="!Visible"
			:tixian_id="tixian_id"></WithdrawDetail>
	</div>
</template>

<script>
	// import {
	//   setWithdrawalStatus,
	//   setRemittanceStatus
	// } from "@/api/money-management";
	export default {
		name: "MoneyWithdrawaklDetail",
		components: {
			"WithdrawDetail":()=>import("@/components/moneyManage/WithdrawDetail")
		},
		filters: {
			money(value=0) {
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
			Visible:{
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
//				Visible: false, // 提现详情dialog开关状态
				withdrawalClickId: '',
				tixian_id:"",
			}
		},
		methods: {
			withdrawalDetailShow(tixian_id) {
//				this.Visible = false;
				this.$emit("checkDetail")
				this.tixian_id=tixian_id;		
			},
			withdrawalConfirm(id) {
				this.withdrawalClickId = id;
				this.$confirm('你是否确认已收款？', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				}).then(() => {
					setWithdrawalStatus({tixian_id: id})						
						.then(() => {
							this.$message({
								message: '确认收款成功',
								type: 'success'
							});
							// 将列表中该条记录设置为已完成状态
							let item_index = this.list.findIndex(({tixian_id}) => tixian_id == id);						
							let data_extend = Object.assign({}, this.list[item_index], {
								status: 4
							});
							this.$set(this.list, item_index, data_extend);
							this.handleClose()
						})
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.order-list-wrap {
		.font-waring {
			font-size: $font-small;
			color: $color-waring;
		}
	}
</style>