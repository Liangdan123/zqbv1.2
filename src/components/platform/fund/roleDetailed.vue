<template>
	<div class="roleDetailed" >		
		<!-- <div v-show="false">{{condition}}</div> -->
		   <search :search.sync="searchCondition.search" 
		   	@searchMethod="searchMethod" 
		   	@emptyMthod='searchMethod' 
		   	ref="isShow" 
		   	selectTitle='筛选列表'
          	hintMess="输入相关信息进行搜索" 
          	class='mb-20' 
          	inputSearch='keyword' 
          	v-if="isSearch">
        </search>
		<el-table
			:data="list.data" 
			v-loading="loading"
			style="width: 100%" >

			<el-table-column prop="join_contact_name" label="发展商姓名">
			</el-table-column>
			
			<el-table-column prop="join_type" label="角色发展">
				<template slot-scope="scope">
					{{scope.row.cps_type|identity}}
				</template>
			</el-table-column>
					<el-table-column prop="join_is_company" label="性质" v-if='isCompany'>
					<template slot-scope="scope">
					{{scope.row.fws_is_company==0?'个人':'企业'}}
				</template>
			</el-table-column>
			<el-table-column prop="join_company_name" label="公司名称">
			</el-table-column>

			<el-table-column prop="join_fee_yuan" label="加盟费">
				<template slot-scope="scope">
					{{scope.row.join_fee_yuan||0|money}}
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
				v-if='list.total>list.per_page'
				:current-page.sync="list.page" 
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
	import {roleCommission} from "@/api/platform"
	export default{
		name:"roleDetailed",
		props:["user_id","typeKey",'isSearch','isCompany'],
		data(){
			return{
				searchCondition: { //搜索条件
					user_id:"",
					search: {
						type:2,
					},
					page: 1,
					per_page: 20,
				},
				list:{data:[]},
				loading:true,
			}
		},
		filters: {
			money(value=0, label = ''){
				// 金额转换成数字和整数部分
				value = Number(value).toFixed(2).split('.');
				let value_int = Number(value[0]).toLocaleString(); // 转换成金额形式
				return `${label}${value_int}.${value[1]}`;
			},
			identity(val){
				let num=+val;
				let type;
				switch(num){
					case 1:
						type= "平台";
						break;
					case 2:
						type="代理商";
						break;
					case 3:
						type="合伙人";
						break;
					case 4:
						type="服务商"
				};
				return type
			}
		},
		watch:{
			user_id(val){//蒋父集传过来的值赋值给searchCondition；
				this.$set(this.searchCondition,"user_id",val);
				this.searchMethod();
			}
		},
		created () {
			this.$set(this.searchCondition,"user_id",this.user_id);
		},
		mixins: [page],
		methods:{
			_doSearch(){//搜索角色列表信息
				roleCommission(this.searchCondition)
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