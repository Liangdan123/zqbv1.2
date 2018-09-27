<template>
	<div class="orderTable" @click="closeSearch">
		<el-dialog
			:close-on-click-modal="false"
			:visible.sync="detailedFailVisible"
			:title="name">
			
			<memberDetailed :user_id="user_id" 
				:typeKey="+activeName"
				v-if="memberShow">
								
			</memberDetailed>
			<roleDetailed v-if="!memberShow"
				:user_id="user_id" >
				
			</roleDetailed>
		</el-dialog>
		<div class="clearfix">
			<searchRole @searchMethod="searchRole" 
				:search.sync="searchCondition.search"
				:inputType="inputType"
				class="float-l">
			</searchRole>
			<search 
				hintMess="输入相关信息进行搜索" 
				selectTitle="筛选条件" 
				inputSearch="order_search"
				:componentList="['input']"
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
			<el-table-column prop="city" label="区域">
			</el-table-column>
			<el-table-column prop="contact_name" label="姓名">
			</el-table-column>
			
			<el-table-column prop="shop_name" label="店铺名称" v-if="+activeName===4">
			</el-table-column>
			
			<el-table-column prop="company_name" label="公司名称" 
				v-if="+searchCondition.search.is_company===1">
				
			</el-table-column>
			
			<el-table-column prop="member_yuan" label="会员总额">
				<template slot-scope="scope">
					{{scope.row.member_yuan||0|money}}
				</template>
			</el-table-column>
			
			<el-table-column prop="give_order_yuan" label="佣金总额">
				<template slot-scope="scope">
					{{scope.row.give_order_yuan||0|money}}
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="checkDetail(scope.$index)">
						查看明细
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
	import {getRoleList} from "@/api/platform"
	import page from "@/utils/page"
	export default{
		name:"memberTable",
		props: {
			activeName: {
				default: function() {
					return 1
				}
			},
			memberShow:{
				default:function(){
					return true
				}
			}
		},
		filters: {
			money(value=0, label = ''){
				// 金额转换成数字和整数部分
				value = Number(value).toFixed(2).split('.');
				let value_int = Number(value[0]).toLocaleString(); // 转换成金额形式
				return `${label}${value_int}.${value[1]}`;
			},
		},
		components:{
			"memberDetailed":()=>import("@/components/platform/fund/memberDetailed"),
			"roleDetailed":()=>import("@/components/platform/fund/roleDetailed"),
		},
		data(){
			return{
				searchCondition: { //搜索条件
					search: {
						type: +this.activeName,
						is_company: 1
					},
					page: 1,
					per_page: 20,
				},
				loading:false,
				list:{data:[]},//角色列表数据
				emptyText:"暂无数据",
				detailedFailVisible:false,
				user_id:"",//获得佣金用户id
				name:"",//订单收入明细的信命
			}
		},
		mixins: [page],
		watch:{
			activeName(){
				this.searchCondition={ //搜索条件
					search: {
						type: +this.activeName,
						is_company: 1
					},
					page: 1,
					per_page: 20,
				};
				this.loading = true;
				this.searchMethod();
			},
		},
		computed:{
			inputType(){
				let num=+this.activeName;
				let type;
				switch(num){
					case 2:
						type= ["is_company"];
						break;
					case 3:
						type= ["is_company","business_range"];
						break;
					case 4:
						type= ["is_company","business_range"];
						break;
				};
				return type
			}
		},
		methods:{
			_doSearch(){//搜索角色列表信息
				getRoleList(this.searchCondition)
					.then(({data}) => {									
						this.list = data;
						this.loading = false;
					})
			},
			checkDetail(index){//查看明细按钮
				this.detailedFailVisible=true;//订单明细弹框
				this.user_id=this.list.data[index].user_id;
				if(this.memberShow){//会员发展收入与角色发展收入做出区分
					this.name=this.list.data[index].contact_name+"的会员发展收入明细"	
				}else if(!this.memberShow){
					this.name=this.list.data[index].contact_name+"的角色发展收入明细"	
				}
				
			},
			searchRole(){//角色搜索
				this.emptyText = "未搜索到相关匹配信息";
				this.searchMethod();
			},
			searchInput(){//模糊搜索
				this.emptyText = "未搜索到相关匹配信息";
				this.searchMethod();
			},
			emptyMthod(){//清空
				this.searchMethod();
			},
			closeSearch() { //关闭筛选条件
				this.$refs.closecondition.closeSearch()
			},
		}
	
	}
</script>

<style lang="scss">
	.orderTable{
		.el-dialog--small{
			width: 1046px;
		}
	}
</style>