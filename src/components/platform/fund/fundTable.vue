<template>
	<div class="fundTable" @click="closeSearch">
		<!--...............查看详情弹框................-->
		<el-dialog title="查看详情" 
			:visible.sync="detailVisible" 
			:close-on-click-modal="false">
			<div class="checkDetail">				
				<WithdrawDetail :tixian_id="tixian_id">
					<template>
						<div
							v-if="activeName==='1'"
							class="clearfix">
							<el-button class="store-button1 float-r" 
								@click="fundOperation('汇款成功')">汇款成功</el-button>
							<el-button class="store-button2 float-r mr-10" 
								@click="fundOperation('汇款失败')">汇款失败</el-button>
						</div>	
					</template>
				</WithdrawDetail>
			
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
				inputSearch="keyword"
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
		},
		components: {
			"WithdrawDetail":()=>import("@/components/moneyManage/WithdrawDetail")
		},
		data() {
			return {
				searchCondition: { //搜索条件
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
						if(!this.remark){
							this.$message("请输入失败原因");
							return
						};
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