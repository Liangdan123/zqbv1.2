<template>
	<div class="platformMemberFund" @click="closeSearch">
		<div class="clearfix">
			<search 
				hintMess="输入相关信息进行搜索" 
				selectTitle="筛选条件" 
				inputSearch="keyword"
				:search.sync="searchCondition.search" 
				@searchMethod="searchInput" 
				@emptyMthod="emptyMthod" 
				ref="closecondition" 
				class="float-r">
				
				<div class="condition clearfix mb-10">
                  <span class="float-l grade">会员等级：</span>
            		<el-radio-group 
            			v-model="searchCondition.search.member_type" 
            			class="float-l">    
               			<el-radio :label="1" class="display-b">钻石会员</el-radio>
                  		<el-radio :label="2" class="display-b">黄金会员</el-radio>	                     
                    </el-radio-group>
                </div>
			</search>			
		</div>
		<el-table :data="list.data" 
			style="width: 100%" 
			:empty-text="emptyText" 
			v-loading="loading"
			class="mt-20">
			<el-table-column prop="cps_city" label="区域">
			</el-table-column>
			<el-table-column prop="xcx_nick_name" label="会员昵称">
			</el-table-column>
			<el-table-column prop="xcx_phone" label="手机号">
			</el-table-column>			
			<el-table-column prop="order_fee_yuan" label="会员金额">
				<template slot-scope="scope">
					{{scope.row.order_fee_yuan||0|money}}
				</template>
			</el-table-column>
			<el-table-column prop="created_at" label="创建时间">
			</el-table-column>
			<el-table-column prop="give_fee_yuan" label="佣金收入">
				<template slot-scope="scope">
					{{scope.row.give_fee_yuan||0|money}}
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
	import {memberCommission} from "@/api/platform"
	export default{
		name:"platformMemberFund",
		filters: {
			money(value, label = ''){
				// 金额转换成数字和整数部分
				value = Number(value).toFixed(2).split('.');
				let value_int = Number(value[0]).toLocaleString(); // 转换成金额形式
				return `${label}${value_int}.${value[1]}`;
			},
		},
		data(){
			return{
				searchCondition:{ //搜索条件
					search: {
						type: 1,
					},
					page: 1,
					per_page: 20,
				},
				list:{data:[]},//订单收入列表数据
				emptyText:"暂无数据",
				loading:true,
			}
		},
		mixins: [page],
		methods:{
			searchInput(){
				this.emptyText = "未搜索到相关匹配信息";			
				this.searchMethod();
			},
			emptyMthod(){
				this.emptyText = "未搜索到相关匹配信息";
				delete this.searchCondition.search.member_type
				this.searchMethod();
			},
			closeSearch() { //关闭筛选条件
				this.$refs.closecondition.closeSearch()
			},
			_doSearch(){//搜索角色列表信息
				memberCommission(this.searchCondition)
					.then(({data}) => {									
						this.list = data;
						this.loading = false;
					})
			},
		}
	}
</script>

<style lang="scss">
	.platformMemberFund{
		.el-radio-group{
			margin-top: 8px;
			.el-radio+.el-radio{
				margin-left: 0;
			}
		}			
	}
</style>