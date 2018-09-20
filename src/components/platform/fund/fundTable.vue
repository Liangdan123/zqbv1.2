<template>
	<div class="fundTable" @click="closeSearch">
		<!--...............查看详情弹框................-->
		<el-dialog title="查看详情" 
			:visible.sync="detailVisible" 
			:close-on-click-modal="false">
			<div class="checkDetail">
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
						<el-col :span="16">{{fundMessage.apply_money_yuan|money('￥')}}</el-col>
					</el-row>
					<el-row>
						<el-col :span="8">开户姓名：</el-col>
						<el-col :span="16">{{fundMessage.tixian_name}}</el-col>
					</el-row>
					<el-row>
						<el-col :span="8">开户银行：</el-col>
						<el-col :span="16">{{fundMessage.tixian_bank}}</el-col>
					</el-row>
					<el-row>
						<el-col :span="8">银行卡号：</el-col>
						<el-col :span="16">{{fundMessage.tixian_account}}</el-col>
					</el-row>
				</div>
				<div 
					v-if="activeName==='1'"
					class="clearfix">
					<el-button class="store-button1 float-r" 
						@click="fundOperation('汇款成功')">汇款成功</el-button>
					<el-button class="store-button2 float-r mr-10" 
						@click="fundOperation('汇款失败')">汇款失败</el-button>
				</div>				
			</div>
		</el-dialog>
		<!--...............汇款失败弹框................-->
		<el-dialog
			title="汇款失败原因" 
			:visible.sync="fundFailVisible"
			:close-on-click-modal="false"
			:show-close="false"
			custom-class="fundFailVisible">
			<el-input
				type="textarea" 
				placeholder="单个文本框字数请勿超过500"
				:maxlength="500" 
				v-model.trim="remark" >

			</el-input>
			<div class="clearfix mt-20">
				<el-button class="store-button1 float-r" @click="sureCancel('确定')">					
					确定
				</el-button> 						
				<el-button class="store-button2 float-r mr-10" @click="sureCancel('取消')">					
					取消
				</el-button>
			</div>

		</el-dialog>
		
		<!--...............表格及搜索................-->
		<div class="clearfix">
			<searchRole @searchMethod="searchRole" 
				:search.sync="searchCondition.search" 
				class="float-l">
			</searchRole>
			<search 
				hintMess="输入相关信息进行搜索" 
				selectTitle="筛选条件" 
				applyCreate="申请时间" 
				:search.sync="searchCondition.search" 
				@searchMethod="searchInput" 
				@emptyMthod="emptyMthod" 
				ref="closecondition" 
				class="float-r">
			</search>
		</div>
		<el-table :data="list.data" style="width: 100%" 
			:empty-text="emptyText" 
			v-loading="loading" class="mt-20">

			<el-table-column prop="city" label="区域">
			</el-table-column>
			<el-table-column prop="type" label="角色">
				<template slot-scope="scope">
					{{scope.row.type|role}}
				</template>
			</el-table-column>
			<el-table-column prop="contact_name" label="姓名">
			</el-table-column>
			<el-table-column prop="apply_money_yuan" label="提现金额">
				<template slot-scope="scope">
					{{scope.row.apply_money_yuan|money('￥')}}
				</template>
			</el-table-column>
			<el-table-column prop="status" label="申请状态">
				<template slot-scope="scope">
					{{scope.row.status|fundStatus}}
				</template>
			</el-table-column>
			<el-table-column prop="apply_time" label="申请时间">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="checkDetail(scope.$index)">
						查看详情
					</el-button>
					<el-button type="text" size="small" v-if="activeName==='1'" 
						@click="tableSucessFail(scope.$index,'汇款成功')">
						汇款成功
					</el-button>
					<el-button type="text" size="small" v-if="activeName==='1'"
						@click="tableSucessFail(scope.$index,'汇款失败')"
						 class="sucess">
						汇款失败
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<div class="clearfix mt-20">
			<el-pagination :total="list.total" 
				:current-page.sync="list.current_page" 
				:page-size="list.per_page" 
				layout="total, prev, pager, next" 
				@current-change="handleCurrentChange" 
				class="float-r">

			</el-pagination>
		</div>
	</div>
</template>

<script>
	import page from "@/utils/page"
	import { getFundList,getFundMess,fundOperation } from "@/api/platform"
	export default {
		name: "fundTable",
		filters: {
			role(val) { //角色转换
				let role
				switch(val) {
					case 2:
						role = "代理商"
						break;
					case 3:
						role = "合伙人"
						break;
					case 4:
						role = "服务商"
						break;
				}
				return role
			},
			money(value, label = '') {
				// 金额转换成数字和整数部分
				value = Number(value).toFixed(2).split('.');
				let value_int = Number(value[0]).toLocaleString(); // 转换成金额形式
				return `${label}${value_int}.${value[1]}`;
			},
			fundStatus(status) { //提现状态
				let fundStatus
				switch(status) {
					case 1:
						fundStatus = "等待平台汇款"
						break;
					case 2:
						fundStatus = "等待商家确认收款"
						break;
					case 3:
						fundStatus = "提现失败"
						break;
					case 4:
						fundStatus = "提现完成"
						break;
				}
				return fundStatus
			},
			fundMethod(num){
				let fundMethod
					switch(num) {
					case 1:
						fundMethod = "支付宝"
						break;
					case 2:
						fundMethod = "微信"
						break;
					case 3:
						fundMethod = "银行卡"
						break;
				}
				return fundMethod
			}
		},
		data() {
			return {
				searchCondition: { //搜索条件
					user_id: this.$store.state.user.user.type,
					search: {
						status: this.activeName,
						is_company: 1
					},
					page: 1,
					per_page: 20,
				},
				list: {
					data: []
				},
				loading: true,
				emptyText: "暂无数据",
				detailVisible: false,
				fundMessage:{
					status:0,
					apply_time:"",
					remittance_time:"",
					confirm_time:""
				},//提现信息
				tixian_id:'',
				fundFailVisible:false,//汇款失败原因弹框
				remark:"",//汇款失败原因
			}
		},
		mixins: [page],
		props: {
			activeName: {
				default: function() {
					return 1
				}
			},
		},
		watch: {
			activeName() {									
				this.searchCondition = {
					user_id: this.$store.state.user.user.type,
					search: {
						status: this.activeName,
						is_company: 1
					},
					page: 1,
					per_page: 20,
				};
				this.loading = true;
				this.searchMethod();
			},
		},
		methods: {
			_doSearch() {
				getFundList(this.searchCondition)
					.then(({data}) => {									
						this.list = data;
						this.loading = false;
					})
					.catch(({response: {data}}) => {																								
						this.$message.error(data.errorcmt);
					})
			},
			searchRole() { //角色搜索
				this.emptyText = "未搜索到相关匹配信息";
				this.searchMethod();
			},
			searchInput() { //筛选搜索
				this.emptyText = "未搜索到相关匹配信息";
				this.searchMethod();
			},
			emptyMthod() { //筛选搜索中的清空条件
				this.searchMethod();
			},
			closeSearch() { //关闭筛选条件
				this.$refs.closecondition.closeSearch()
			},
			checkDetail(index) { //查看详情
				this.detailVisible=true;
				this.tixian_id=this.list.data[index].tixian_id;				
				this._getFundMess(this.tixian_id)
			},
			_getFundMess(tixian_id){
				getFundMess({tixian_id})//获取提现信息API
				.then(({data})=>{
					this.fundMessage=data;
				})
				.catch(({response: {data}}) => {																								
					this.$message.error(data.errorcmt);
				})
			},
			fundOperation(data){//弹框里汇款成功失败
				this._successFail(data)
			},
			tableSucessFail(index,data){//表格里汇款成功失败
				this.tixian_id=this.list.data[index].tixian_id;			
				this._successFail(data)
			},
			_successFail(data){//成功失败的组合
				switch(data){
					case "汇款成功":
						let fundData={
							tixian_id:this.tixian_id,
							status:2,
						}
						this._fundOperation(fundData);
						break;
					case "汇款失败":
						this.fundFailVisible=true;						
						break;	
				}
			},
			sureCancel(data){//汇款失败中的确定和取消
				
				switch(data){
					case "确定":
						let fundData={
							tixian_id:this.tixian_id,
							status:3,	
							remark:this.remark
						};						
						this._fundOperation(fundData);
						break;
					case "取消":
						this.fundFailVisible=false;
						this.remark="";
						break;	
				}
			},
			_fundOperation(data){
				fundOperation(data)
				.then(({data})=>{
					this.detailVisible=false;
					this.fundFailVisible=false;
					this.remark="";
				})
				.catch(({response: {data}}) => {																								
					this.$message.error(data.errorcmt);
				})
			}
		}
	}
</script>

<style lang="scss">
	.fundTable {
		.el-table{
			.sucess{
				margin-left: 0;
			}
		}
		.el-dialog--small {
			width: 915px;
			.checkDetail {
				margin-left: 30px;
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
		}
		.el-dialog--small.fundFailVisible{
			width: 500px;
			.el-textarea{
				.el-textarea__inner{
					height: 100px;
				}				
			}
		}
	}
</style>