<template>
	<div class="accountAdm">
		<el-dialog :visible.sync="dialogVisible" 
			:title="isName"
			:close-on-click-modal="false" 
			:show-close="false">
			<el-form model="ruleForm" 
				:rules="rules" 
				ref="ruleForm" 
				label-width="400px" 
				class="demo-ruleForm">
				<el-form-item label="昵称" prop="contact_name">
				    <el-input v-model="ruleForm.contact_name" 
				    	placeholder="最多可输入30个字">
				    	
				    </el-input>
				</el-form-item>
			</el-form>
		</el-dialog>
		
		<div class="g-content">
			<!--..................按钮....................-->
			<div class="btn mb-20">			
				<el-button 
					class="store-button2 sale_out" 
					>
					<i class="iconfont icon-jiahao f12"></i>
					<span>添加账号</span>
				</el-button>	
				<el-button 
					class="store-button2 remove" 
					>
					<i class="iconfont icon-shanchu f12"></i>
					<span>删除商品</span>
				</el-button>
			</div>
			<!--..................表格....................-->
			<el-table :data="list.data" 
				style="width: 100%"
				@selection-change="handleSelection" 
				empty-text="子账号为空"
				v-loading="loading"
				@sort-change="sortChange">
				
				<el-table-column type="selection" width="36"> 
				</el-table-column>
				
				<el-table-column 
					prop="contact_name" 
					label="昵称">
				</el-table-column>
				
				<el-table-column 
					prop="account" 
					label="账号">
				</el-table-column>
				
				<el-table-column 
					prop="created_at" 
					label="创建时间">
				</el-table-column>
				
				<el-table-column 
					label="操作">					
					<template slot-scope="scope">
						<el-button type="text" size="small" 
							class="btn-delete" 
							>
							编辑 
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!--..................分页....................-->
			<div class="clearfix" v-if="list.total>list.per_page">
				<el-pagination  @current-change="handleCurrentChange" 
					:current-page.sync="list.current_page" 
					:page-size="list.per_page" 
					layout="total, prev, pager, next" 
					:total="list.total" 
					class="mt-20 float-r">
	
				</el-pagination>
			</div>	
		</div>
	</div>
</template>

<script>
	import {shopWorkerLists} from "@/api/servicer"
	import page from "@/utils/page"
	export default{	
		data(){
			let id=this.$store.state.user.user.zhixu_id;
			return{
				searchCondition:{
					user_id:id,
					page: 1,
					per_page: 20,
				},
				list:{data:[]},//表格全部数据
				loading:true,
				dialogVisible:false,
				isName:"",
				ruleForm:{
					contact_name:"",
				},
				rules:{
					contact_name:[
					 	{ required: true, message: '请输入昵称', trigger: 'submit' },
            			{ min: 0, max: 30, message: '最多可输入30个字', trigger: 'submit' }
					]
				}
			}
		},
		mixins:[page],
		methods:{
			_doSearch(){
				console.log(1111)
				shopWorkerLists(this.searchCondition)
				.then(({data})=>{
					this.list=data;
					this.loading=false;
				})
			},
			handleSelection(){
				
			},
			sortChange(){
				
			}
		}
	}
</script>

<style lang="scss">
	.accountAdm{
		margin-top: 120px;
		.btn{
			.store-button2.sale_out{
				span{
					color:#111111;	
				}						
			}
			.store-button2.remove{
				span{
					color:#B4282D;	
				}						
			}
		}
	}
</style>