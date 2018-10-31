<template>
	<div @click="closeSearch">	
		<search @searchMethod="filterMember"
			@emptyMthod='emptyMthod'
			ref="isShow"
			selectTitle="筛选会员"
			hintMess="输入相关信息进行搜索"
			:search.sync="searchCondition.search"
			:timeType="activeName=='first'?'created_at':'pay_time'"
			class="mb-10">	
			<template>
				<div class="condition clearfix mb-10">
			      	<span class="float-l grade">会员等级：</span>
			        <el-radio-group 
			        	v-model="searchCondition.search.level" 
			        	class="float-l">
			        	<el-radio label="1" class="display-b" v-if="isRole">
			        		普通用户
			        	</el-radio>                      
			        	<el-radio label="2" class="display-b">普通会员</el-radio>
			        	<el-radio label="3" class="display-b">黄金会员</el-radio>
			        	<el-radio label="4" class="display-b">钻石会员</el-radio>
			        </el-radio-group>
		        </div>
			</template>
			
		</search>
		<div v-loading="memberLoading">
			<el-table :data="list.data" 
				v-loading="memberLoading"  
				@sort-change="sortChange" 
				:empty-text="emptyText">
				<el-table-column  label="会员等级" >
					<template slot-scope="scope">
						{{scope.row.level|levelString}}
					</template>
				</el-table-column>
				<el-table-column prop="nick_name" label="会员昵称">
				</el-table-column>
				<el-table-column prop="phone"  
					label="手机号" 
					v-if="activeName==='first'">
				</el-table-column>
				<el-table-column prop="pay_fee_yuan"  
					label="充值金额" 
					sortable="custom" 
					v-else>
				</el-table-column>				
				<el-table-column  label="归属角色" 
					v-if="isRole &&activeName==='first'" 
					:key="activeName">
					<template slot-scope="scope">
						{{scope.row.cps_type|roleString}}
					</template>
				</el-table-column>				
				<el-table-column 
					prop="pay_time"  
					label="充值时间" 
					sortable="custom" 
					v-if="activeName==='second'">
				</el-table-column>				
				<el-table-column prop="created_at"  
					label="创建时间" 
					sortable="custom" 
					v-if="activeName==='first'">
				</el-table-column>
				<el-table-column 
					prop="latest_login_time"  
					label="最后登录时间" 
					v-else>
				</el-table-column>
			</el-table>
		</div>
		<div class="clearfix mt-20">
			<el-pagination :total="list.total"
				:current-page.sync="list.current_page" 
				:page-size="list.per_page"
				layout="total, prev, pager, next"
				@current-change="handleCurrentChange"
				v-if="list.total>list.per_page"
				class="pagination">
				
			</el-pagination>
		</div>

	</div>
</template>

<script>
	import {getMemberList,memberRechargeList} from "@/api/platform"
	import page from "@/utils/page"
	export default{
		mixins:[page],
		data(){
			return{
				searchCondition:{//搜索条件
					search:{},
					page: 1,
					per_page: 20,
				},
				list:{data:[]},
				memberLoading:true,
				pay:{},
				emptyText:"暂无数据"
			}
		},	
		props:{
			activeName:{//看调用那个接口
				type:String,
				default:function(){
					return "first"
				}
			},
			isRole:{//判断需不需要归属角色(需要归属角色与不需要归属角色的API也是不一样的)
				type:Boolean,
				default:function(){
					return true
				}
			}
		},
		watch:{
			activeName(val){//监听activeName以重置信息
				this.searchCondition={//搜索条件
					search:{},
					page: 1,
					per_page: 20,
				};
				this.memberLoading=true;
				this._doSearch();
			}
		},
		filters:{
			levelString(val){//会员等级
				return val==1?"普通用户":val==2?"普通会员":val==3?"黄金会员":val==4?"钻石会员":""
			},
			roleString(val){//归属角色
				return val==1?"平台":val==2?"代理商":val==3?"合伙人":val==4?"服务商":""
			}
		},
		methods:{
			_doSearch(){//获取会员列表
				if(this.activeName==="first" && this.isRole){
					this.memberList();
				}else if(this.activeName==="second"){
					this.rechargeList()
				}else if(this.activeName==="first" && !this.isRole){//服务商(营销管理中的会员中心列表)
					let cps_id=this.$store.state.user.user.zhixu_id
					this.$set(this.searchCondition.search,"cps_id",cps_id);
					this.memberList();
				}
			},
			memberList(){//会员列表接口
				getMemberList(this.searchCondition)//获取会员列表API
				.then(({data})=>{
					this.list=data;
					this.memberLoading=false;
				})

			},
			rechargeList(){//获取会员充值
				memberRechargeList(this.searchCondition)//获取会员充值列表API
				.then(({data})=>{
					this.list=data;
					this.memberLoading=false;
				})
			},
			sortChange(column,prop,time){//创建时间的排序按钮
				this.pay=column;//用于清空排序样式
				switch(true){
					case column.prop==="created_at" && column.order==="ascending":
						this.$set(this.searchCondition,"orderby",{created_at:"asc"})				
						break;
					case column.prop==="created_at" && column.order==="descending":	
						this.$set(this.searchCondition,"orderby",{created_at:"desc"});
						break;
					case column.prop==="pay_fee_yuan" && column.order==="ascending":
						this.$set(this.searchCondition,"orderby",{pay_fee:"asc"})				
						break;
					case column.prop==="pay_fee_yuan" && column.order==="descending":	
						this.$set(this.searchCondition,"orderby",{pay_fee:"desc"});
						break;
					case column.prop==="pay_time" && column.order==="ascending":
						this.$set(this.searchCondition,"orderby",{pay_time:"asc"})				
						break;
					case column.prop==="pay_time" && column.order==="descending":	
						this.$set(this.searchCondition,"orderby",{pay_time:"desc"});
						break;					
				};
				this.searchMethod();
			},
			filterMember(){//搜索中的筛选会员
				this._clear();
				this.emptyText="未搜索到相关匹配信息";
				this.searchMethod();
			},
			_clear(){//清空排序样式
				if(JSON.stringify(this.pay)!=="{}"){
					this.pay.column.prop="";				
					this.pay.column.order="";
					if(JSON.stringify(this.searchCondition.orderby)!=="{}"){
						delete this.searchCondition.orderby
					}
				};
			},
			emptyMthod(){//清空条件			
				this._clear();
				this.emptyText="暂无数据";
				delete this.searchCondition.search.level//删除等级条件
				this.searchMethod();
			},
		}
	}
</script>

<style scoped="scoped">
.pagination{
	float: right;
}
.grade{
    line-height: 25px;
    margin-right: 10px;
}
.el-radio{
    line-height: 25px;
    margin: 0;
}
</style>