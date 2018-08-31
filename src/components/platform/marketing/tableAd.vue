<template>
	<div class="tableAd">
		<div class="clearfix mb-10">
			<div class="button float-l">
				<el-button class="store-button2" v-if="isDistribution">
					<span class="iconfont icon-Rectangle"></span>
					<span>分配广告</span>
				</el-button>
				<el-button class="store-button2 del" @click="batchDel">
					<span class="iconfont icon-shanchu"></span>
					<span>批量删除</span>
				</el-button>
			</div>
			<search :componentList="['input']"
				@searchMethod="searchAd"
				:search.sync="searchCondition.search">
			</search>
		</div>

		<el-table :data="list.data" style="width: 100%"  
			@selection-change="handleSelection"
			v-loading="loading"
			empty-text="emptyText">
			<el-table-column type="selection" width="55">      			
    		</el-table-column>
    		<el-table-column prop="contact_name" label="姓名">
			</el-table-column>
			<el-table-column prop="contact_phone" label="手机号">
			</el-table-column>
			<el-table-column prop="wx_qq" label="QQ">
			</el-table-column>
			<el-table-column prop="created_at" label="创建时间">
			</el-table-column>
			<el-table-column  label="操作">				
				<template slot-scope="scope">
					<el-button type="text" size="small" @click.stop="delt(scope.$index)">
						删除 
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
				class="pagination">
				
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import page from "@/utils/page"
	import {getAdList,deleteAdList} from "@/api/platform"
	export default{
		mixins:[page],
		data(){
			return {
				loading:true,
				list:{data:[]},
				emptyText:"暂无数据",
				time:"",//用于清空样式
				deleteList:{data:[]},
			}
		},
		props:{
			activeName:{
				default:function(){
					return 1
				}
			},
			isDistribution:{
				type:Boolean,
				default:function(){
					return true
				}
			}
		},
		watch:{
			activeName(val){
				this.searchCondition={//搜索条件
					search:{},
					page: 1,
					per_page: 20,
				};
				this.loading=true;
				this._doSearch();
			}
		},
		methods:{
			_doSearch(){//获取广告列表
				this.$set(this.searchCondition.search,"type",Number(this.activeName));
				getAdList(this.searchCondition)
				.then(({data})=>{
					this.list=data;
					this.loading=false;
				})
				.catch(({response: {data}})=>{
					this.$message.error(data.errorcmt);
				})	
			},
			searchAd(){//输入相关信息搜索
				this.emptyText="未搜索到相关匹配信息";
				this.searchMethod();
			},
			handleSelection(val){//选中列表
				let arr=[];
				for(let item of val) {
					arr.push({ad_id: item.ad_id})					
				};
				this.$set(this.deleteList,"data",arr)
			},
			batchDel(){
				if(this.deleteList.data.length == 0) {
					this.$message({showClose: true,message: '请选择要删除的广告',type: 'info'});					
					return;
				}
				this.deleteMethods(this.deleteList);				
			},
			deleteMethods(data){//批量删除广告				
				this.$confirm('你是否确定删除此信息', '温馨提示', {
					confirmButtonText: '确认',
					cancelButtonText: '取消',
					lockScroll: false
				}).then(() => {
					deleteAdList(data)
					.then(({data}) => {	
						switch(data.status) {
							case "part_success":
								this.$message({
									showClose: true,
									message: '部分商品删除失败',
								});
								break;
							case "all_fail":
								this.$message.error('删除失败');
								break;
							default:
								this.$message({
									showClose: true,
									message: '删除成功',
									type: 'success'
								});							
						};
						this._doSearch();
					}).catch(({response: {data}})=>{
						this.$message.error(data.errorcmt);
					})	
				}).catch(() => {
					if(event.srcElement.innerText == "取消") {
						return;
					}
				})
			},
			delt(){//每行中的删除
				
			},
		}
	}
</script>

<style lang="scss">
	.tableAd{
		.button{
			.store-button2.del{
				span{
					color: #B4282D;
				}
			}
		}
	}
</style>