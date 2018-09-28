<template>
	<div class="orderDetailed" >		
		<search :search.sync="searchCondition.search" 
			@searchMethod="searchMethod" 
			@emptyMthod='searchMethod' ref="isShow" 
			selectTitle='筛选列表'
          	hintMess="输入相关信息进行搜索"         
          	inputSearch='keyword' 
          	v-if="isSearch"
           class='mb-20' >
        </search>
		<el-table
			:data="list.data" 
			style="width: 100%" >
			<el-table-column prop="fws_shop_name" label="服务商">
			</el-table-column>
			<el-table-column prop="fws_is_company" label="性质">
					<template slot-scope="scope">
					{{scope.row.fws_is_company==0?'个人':'企业'}}
				</template>
			</el-table-column>
			<el-table-column prop="split_no" label="订单号">
			</el-table-column>
			<el-table-column prop="order_fee_yuan" label="订单金额">
				<template slot-scope="scope">
					{{scope.row.give_order_yuan||0|money}}
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
			<el-pagination :total="list.total"  v-if='list.total>searchCondition.per_page'
				:current-page.sync="searchCondition.page" 
				:page-size="searchCondition.per_page" 
				layout="total, prev, pager, next" 
				@current-change="handleCurrentChange" 
				class="float-r">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import page from "@/utils/page"
	import {orderCommission} from "@/api/platform"
	export default{
		name:"orderDetailed",
		props:["user_id","typeKey","isSearch",'isCompany'],
		data(){
			return{
				searchCondition: { //搜索条件
					user_id:"",
					search: {
						type:"",
					},
					page: 1,
					per_page: 2,
				},
				list:{data:[]},
				loading:true,
			}
		},
		filters: {
			money(value, label = ''){
				// 金额转换成数字和整数部分
				value = Number(value).toFixed(2).split('.');
				let value_int = Number(value[0]).toLocaleString(); // 转换成金额形式
				return `${label}${value_int}.${value[1]}`;
			},
		},
		watch:{
			user_id(val){//蒋父集传过来的值赋值给searchCondition；
				this.$set(this.searchCondition,"user_id",val);
				this.searchMethod();
			},
			typeKey(){
				this.$set(this.searchCondition,"search",{type:this.typeKey});
				this.searchMethod();
			}
		},
		created () {
			this.$set(this.searchCondition,"user_id",this.user_id);
			this.$set(this.searchCondition,"search",{type:this.typeKey});
		},
		mixins: [page],
		methods:{
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