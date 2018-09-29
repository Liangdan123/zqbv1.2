<template>
	<div class="orderDetailed" @click="closeSearch">		
		<search :search.sync="searchCondition.search" 
			@searchMethod="searchMethod" 
			@emptyMthod='searchMethod' ref="isShow" selectTitle='筛选列表'
          hintMess="输入相关信息进行搜索" class='mb-20' inputSearch='keyword' v-if="isSearch">
        </search>
		<el-table
			:data="list.data" 
			v-loading="loading"
			style="width: 100%" >
			<el-table-column prop="xcx_nick_name" label="会员">
			</el-table-column>
			
			<el-table-column prop="member_type" label="会员等级" v-if="memberLevel">
				<template slot-scope="scope">
					{{scope.row.member_type==1?'黄金会员':'钻石会员'}}
				</template>
			</el-table-column>
			
			<el-table-column prop="cps_contact_name" label="发展商" v-if="isContact">
			</el-table-column>
			<el-table-column prop="cps_is_company" label="性质" v-if='isCompany'>
				<template slot-scope="scope">
					{{scope.row.fws_is_company==0?'个人':'企业'}}
				</template>
			</el-table-column>
			<el-table-column prop="cps_type" label="身份属性" v-if="isCpsType">
				<template slot-scope="scope">
					{{scope.row.cps_type|identity}}
				</template>
			</el-table-column>
			
			<el-table-column prop="xcx_phone" label="手机号" v-if="isPhone">
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
	import {memberCommission} from "@/api/platform"
	export default{
		name:"memberDetailed",
		props:{
			user_id:{
				default:function(){
					return ""
				},
			},
			typeKey:{
				default:function(){
					return 4
				},
			},
			isSearch:{
				default:function(){
					return false
				},
			},
			isCompany:{
				default:function(){
					return false
				},
			},
			memberLevel:{
				default:function(){
					return false
				},
			},
			isContact:{
				default:function(){
					return true
				},
			},
			isCpsType:{
				default:function(){
					return true
				}
			},
			isPhone:{
				default:function(){
					return false
				},
			}
		},
		data(){
			return{
				searchCondition: { //搜索条件
					user_id:"",
					search: {
						type:"",
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
				memberCommission(this.searchCondition)
					.then(({data}) => {									
						this.list = data;
						this.loading = false;
					})
			},
			closeSearch(){
				this.$refs.isShow.closeSearch()
			}
		}
	}
</script>

<style>
</style>