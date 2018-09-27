<template>
	<div class="platformOrderFund" @click="closeSearch">
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
			</search>			
		</div>
		<el-table :data="list.data" 
			style="width: 100%" 
			:empty-text="emptyText" 
			v-loading="loading"
			class="mt-20">
			<el-table-column prop="fws_city" label="区域">
			</el-table-column>
			<el-table-column prop="fws_shop_name" label="店铺名称">
			</el-table-column>
			<el-table-column prop="split_no" label="订单号">
			</el-table-column>			
			<el-table-column prop="order_fee_yuan" label="订单金额">
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
	import {orderCommission} from "@/api/platform"
	import page from "@/utils/page"
	export default{
		name:"platformOrderFund",
		filters: {
			money(value=0, label = ''){
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
				this.searchMethod();
			},
			closeSearch() { //关闭筛选条件
				this.$refs.closecondition.closeSearch()
			},
			_doSearch(){//搜索角色列表信息
				orderCommission(this.searchCondition)
					.then(({data}) => {									
						this.list = data;
						this.loading = false;
					})
			},
		}
	}
</script>

<style>

</style>