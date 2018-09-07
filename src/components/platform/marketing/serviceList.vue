<template>
	<div class="serviceList">
		<div class="clearfix mb-20">
			<searchRole :inputType=searchArray 
				:search.sync="searchCondition.search"
				@searchMethod="searchRole"
				class="float-l"></searchRole>
				
			<search :componentList="['input']"
				:search.sync="searchCondition.search"
				@searchMethod="searchInput"				
				class="float-r"></search>
		</div>
		
		<el-table style="width: 100%"
			:data="list.data"
			@selection-change="handleSelection"
			v-loading="loading"
			:empty-text="emptyText">>
			<el-table-column type="selection" width="55">      			
    		</el-table-column>
    		<el-table-column prop="city" label="所属区域">
			</el-table-column>
			<el-table-column prop="contact_name" label="姓名">
			</el-table-column>
			<el-table-column prop="phone" label="电话">
			</el-table-column>
			<el-table-column prop="company_name" label="公司名称" 
				v-if="searchCondition.search.is_company===1" s>
			</el-table-column>
			<el-table-column prop="created_at" label="创建时间">
			</el-table-column>
		</el-table>
		
		<div class="clearfix mt-20">
			<el-pagination :total="list.total"
				:current-page.sync="list.current_page" 
				:page-size="list.per_page"
				layout="total, prev, pager, next"
				@current-change="handleCurrentChange"
				class="pagination float-l">
				
			</el-pagination>
			<el-button class="store-button1 float-r" 
				@click="sureDistri">确认分配</el-button>
		</div>
	</div>
</template>

<script>
	import page from "@/utils/page"
	import {getRoleList,distributeAd} from "@/api/platform"
	export default{
		data(){
			return{
				searchArray:['is_company','business_range'],
				searchCondition:{//搜索条件
					search:{
						type:4,
						is_company:1,
					},
					page: 1,
					per_page: 20,					
				},
				list:{data:[]},//全区列表数据
				emptyText:"暂无数据",
				loading:true,
				distribute:{//分配API所需数据
					data:this.ad_ids,
					user:""
				},
			}
		},
		props:{
			ad_ids:{
				type:Array,
				default:function(){
					return []
				}
			},
			closeMood:{
				type:Function,
				default:()=>{}
			},
		},
		mixins:[page],
		methods:{
			_doSearch(){//获取服务商列表
				getRoleList(this.searchCondition)
				.then(({data})=>{
					this.list=data;
					this.loading=false;
				})
				.catch(({response: {data}})=>{
					this.$message.error(data.errorcmt);
				})	
			},
			handleSelection(val){//选中列表
				let arr=[];
				for(let item of val) {
					arr.push(item.user_id)					
				};
				let userJoin=arr.join(",");
				this.$set(this.distribute,"user",userJoin)				
			},
			searchRole(){//搜索角色
				this.emptyText="未搜索到相关匹配信息";
				this._doSearch();
			},
			searchInput(){
				this.emptyText="未搜索到相关匹配信息";
				this._doSearch();
			},
			sureDistri(){
				if(!this.distribute.user){
					this.$message({showClose: true,message: '请选择服务商',type: 'info'});					
					return;
				}
				distributeAd(this.distribute)
				.then((data)=>{
					this.$message({showClose: true,message: '分配成功',type: 'success'});	
					this._doSearch();
					this.closeMood()
				})
				.catch(({response: {data}})=>{
					this.$message.error(data.errorcmt);
				})	
				
			}
		}
	} 
</script>

<style>
</style>