<template>
	<div>	
		<search @searchMethod="searchMethod"
			@emptyMthod='emptyMthod'
			ref="isShow"
			selectTitle="筛选会员"
			hintMess="输入相关信息进行搜索"
			class="mb-10">			
		</search>
		<div v-loading="memberLoading">
			<el-table :data="list.data" v-loading="memberLoading"  @sort-change="sortChange">
				<el-table-column  label="会员等级" >
					<template slot-scope="scope">
					{{level(scope.row.level)}}
					</template>
				</el-table-column>
				<el-table-column prop="nick_name" label="会员昵称">
				</el-table-column>
				<el-table-column prop="phone"  label="手机号" v-if="activeName==='first'">
				</el-table-column>
				<el-table-column prop="pay_fee_yuan"  label="充值金额" sortable="custom" v-else>
				</el-table-column>
				
				<el-table-column  label="归属角色" v-if="isRole &&activeName==='first'" :key="activeName">
					<template slot-scope="scope">
						{{role(scope.row.cps_type)}}
					</template>
				</el-table-column>
				
				<el-table-column prop="pay_time"  label="充值时间" sortable="custom" v-if="activeName==='second'">
				</el-table-column>
				
				<el-table-column prop="created_at"  label="创建时间" sortable="custom" v-if="activeName==='first'">
				</el-table-column>
				<el-table-column prop="latest_login_time"  label="最后登录时间" sortable="custom" v-else>
				</el-table-column>
			</el-table>
		</div>

		<el-pagination :total="list.total"
			:current-page.sync="list.current_page" 
			:page-size="list.per_page"
			layout="total, prev, pager, next"
			@current-change="handleCurrentChange">
			
		</el-pagination>
	</div>
</template>

<script>
	import {getMemberList,memberRechargeList} from "@/api/platform"
	import page from "@/utils/page"
	export default{
		mixins:[page],
		data(){
			return{
				list:{data:[]},
				memberLoading:true,
			}
		},	
		props:{
			activeName:{//看调用那个接口
				type:String,
				default:function(){
					return "first"
				}
			},
			isRole:{
				type:Boolean,
				default:function(){
					return true
				}
			}
		},
		watch:{
			activeName(val){//监听activeName以重置信息
				this.searchCondition={//搜索条件
					page: 1,
					per_page: 20,
				};
				this.memberLoading=true;
				this._doSearch();
			}
		},
		methods:{
			_doSearch(){//获取会员列表
				if(this.activeName==="first"){
					this.memberList();
				}else if(this.activeName==="second"){
					this.rechargeList()
				}
			},
			memberList(){//会员列表接口
				getMemberList(this.searchCondition)//获取会员列表API
				.then(({data})=>{
					this.list=data;
					this.memberLoading=false;
				})
				.catch(({response: {data}})=>{
					this.$message.error(data.errorcmt);
				})	
			},
			rechargeList(){//获取会员充值
				memberRechargeList(this.searchCondition)//获取会员充值列表API
				.then(({data})=>{
					this.list=data;
					this.memberLoading=false;
				})
				.catch(({response: {data}})=>{
					this.$message.error(data.errorcmt);
				})	
			},
			sortChange(column,prop,time){//创建时间的排序按钮
				switch(true){
					case column.prop==="created_at" && column.order==="ascending":
						this.$set(this.searchCondition,"orderby",{created_at:"asc"})				
						break;
					case column.prop==="created_at" && column.order==="descending":	
						this.$set(this.searchCondition,"orderby",{created_at:"desc"});
						break;
				};
				this.searchMethod();
			},
			level(data){//会员等级
				switch(data){
					case 1:
						return "普通用户"
						break;
					case 2:
						return "普通会员"
						break;
					case 3:
						return "黄金会员"
						break;
					case 4:
						return "钻石会员"
						break
				}
			},
			role(data){//归属角色
				if(this.activeName==='first'){
					switch(data){
						case 1:
							return "平台"
							break;
						case 2:
							return "代理商"
							break;
						case 3:
							return "合伙人"
							break;
						case 4:
							return "服务商"
							break
					}
				}

			},
			emptyMthod(){
				
			},
		}
	}
</script>

<style >

</style>