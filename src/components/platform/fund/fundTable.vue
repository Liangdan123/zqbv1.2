<template>
	<div class="fundTable" @click="closeSearch">
		<div class="clearfix">
			<searchRole
				class="float-l"></searchRole>
			<search hintMess="输入相关信息进行搜索"
				selectTitle="筛选条件"
				ref="closecondition"
				class="float-r">				
			</search>			
		</div>
		<el-table
			:data="list.data" 
			style="width: 100%"  		
			:empty-text="emptyText"
			v-loading="loading"
			class="mt-20">	
			
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
			<el-table-column  label="操作">				
				<template slot-scope="scope">
					<el-button type="text" size="small" >
						查看详情 
					</el-button>
					<el-button type="text" size="small" v-if="activeName==='1'">
						汇款完成 
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
	import {getFundList} from "@/api/platform"
	export default{
		name:"fundTable",
		filters:{
			role(val){//角色转换
				let role
				switch(val){
					case 2:
						role="代理商"
						break;
					case 3:
						role="合伙人"
						break;
					case 4:
						role="服务商"
						break;
				}
				return role
			},
            money(value,label=''){
                // 金额转换成数字和整数部分
                value = Number(value).toFixed(2).split('.');
                let value_int = Number(value[0]).toLocaleString();// 转换成金额形式
                return `${label} ${value_int}.${value[1]}`;
            },
            fundStatus(status){//提现状态
            	let fundStatus
            	switch(status){
            		case 1:
						fundStatus="等待平台汇款"
						break;
					case 2:
						fundStatus="等待商家确认收款"
						break;
					case 3:
						fundStatus="提现失败"
						break;
					case 4:
						fundStatus="提现完成"
						break;
            	}
            	return fundStatus
            },
		},
		data(){
			return{
				searchCondition:{//搜索条件
					user_id:this.$store.state.user.user.type,
					search:{
						status:this.activeName
					},
					page: 1,
					per_page: 20,
				},
				list:{data:[]},
				loading:true,
				emptyText:"暂无数据",
			}
		},
		mixins:[page],
		props:{
			activeName:{
				default:function(){
					return 1
				}
			},
		},
		watch:{
			activeName(){
				this.searchCondition={
					user_id:this.$store.state.user.user.type,
					search:{
						status:this.activeName
					},
					page: 1,
					per_page: 20,
				};
				this.loading=true;
				this.searchMethod();
			},
		},
		methods:{
			_doSearch(){
				getFundList(this.searchCondition)
				.then(({data})=>{
					this.list=data;
					this.loading=false;
				})
				.catch(({response: {data}})=>{
					this.$message.error(data.errorcmt);
				})
			},
			closeSearch(){//关闭筛选条件
				this.$refs.closecondition.closeSearch()
			},
		}
	}
</script>

<style>
</style>