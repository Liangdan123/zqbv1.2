<template>
	<div class="accountAdm">
		<el-dialog :visible.sync="dialogVisible" 
			:title="isName"
			:close-on-click-modal="false" 
			@close="closeModel">
			
			
			<el-form :model="ruleForm" 
				:rules="rules" 
				ref="ruleForm" 
				class="demo-ruleForm">
				<el-form-item label="昵称" prop="contact_name">
				    <el-input v-model="ruleForm.contact_name" 
				    	placeholder="最多可输入30个字">
				    	
				    </el-input>
				</el-form-item>
				<el-form-item label="账号" prop="phone" v-if="isName=='添加账号'">
				    <el-input v-model="ruleForm.phone" 
				    	type="number"
				    	placeholder="请输入手机号码作为账号，登录时使用">
				    	
				    </el-input>
				     <b class="kf">@53kf.com</b>
				</el-form-item>
				<el-form-item label="密码" prop="password" v-if="isName=='添加账号'">
				    <el-input v-model="ruleForm.password" 
				    	 type="password"
				    	placeholder="字母、数字或者英文符号，长度6-16位，登录时使用">
				    	
				    </el-input>				   
				</el-form-item>
				<el-form-item>
					<el-button @click="cancel('ruleForm')" class="store-button2 float-r">
				    	取消
				    </el-button>
					<el-button  @click="addEditAccount('ruleForm')" class="store-button1 float-r">
						{{btnName}}
					</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		
		<div class="g-content">
			<!--..................按钮....................-->
			<div class="btn mb-20">			
				<el-button 
					class="store-button2 sale_out" 
					@click="addAccount">
					<i class="iconfont icon-jiahao f12"></i>
					<span>添加账号</span>
				</el-button>	
				<!--<el-button 
					class="store-button2 remove" 
					@click="deleteGoods">
					<i class="iconfont icon-shanchu f12"></i>
					<span>删除商品</span>
				</el-button>-->
			</div>
			<!--..................表格....................-->
			<el-table :data="list.data" 
				style="width: 100%"
				@selection-change="handleSelection" 
				empty-text="子账号为空"
				v-loading="loading">
							
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
							@click="edit(scope.row.contact_name,scope.row.worker_id)">
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
	import {shopWorkerLists,shopAddWorker,shopUpdateWorker,shopDeleteWorkerBatch } from "@/api/servicer"
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
				btnName:"",
				ruleForm:{
					user_id:id,
					contact_name:"",
					phone:"",
					password:"",
				},			
				editForm:{
					user_id:id,
					contact_name:"",
					worker_id:"",
				},
				rules:{
					contact_name:[
					 	{ required: true, message: '请输入昵称', trigger: 'submit' },
            			{ min: 0, max: 30, message: '最多可输入30个字', trigger: 'submit' }
					],
					phone:[{ required: true, message:'请输入账号', trigger: 'submit' }],
					password:[
						{ required: true, message: '请输入密码', trigger: 'submit' },
						{ required: true,min: 6, max: 16, message: '请输入8-16位', trigger: 'submit' }
					],
				},
				deleteItem:{
					user_id:id,
					data:[]
				}
			}
		},
		mixins:[page],
		methods:{
			_doSearch(){
				shopWorkerLists(this.searchCondition)
				.then(({data})=>{
					this.list=data;
					this.loading=false;
				})
			},
			handleSelection(val){
				let changeVal=JSON.parse(JSON.stringify(val));
				let worker_id=changeVal.map((item)=>{
					for(let el in item){
						if(el!="worker_id"){//删除不需要的属性
							delete item[el]
						}
					}
					return item
				});
				this.$set(this.deleteItem,"data",worker_id)
			},
			deleteGoods(){
				shopDeleteWorkerBatch(this.deleteItem)
				.then(({data})=>{           		
            		this._doSearch()
            	})
			},
			addAccount(){
				this.isName="添加账号";
				this.$set(this.ruleForm,"contact_name","")
				this.dialogVisible=true;
				this.btnName="添加";
				this._isTrue(true);
			},
			addEditAccount(formName){//编辑添加子账号
				this.$refs[formName].validate((valid) => {
		          if (valid) {
		            if(this.btnName=="添加"){
		            	this.ruleForm.phone=+this.ruleForm.phone
		            	shopAddWorker(this.ruleForm)
		            	.then(({data})=>{
		            		this.dialogVisible=false;
		            		this._doSearch()
		            	})
		            }else if(this.btnName=="保存"){
		            	this.$set(this.editForm,"contact_name",this.ruleForm.contact_name);
						shopUpdateWorker(this.editForm)
						.then(({data})=>{
		            		this.dialogVisible=false;
		            		this._doSearch()
		            	})
		            }
		          } else {		            
		            return false;
		          }
		        });
			},
			cancel(formName){
				this.$refs[formName].resetFields();
				this.dialogVisible=false;
			},
			closeModel(){
				this.$refs["ruleForm"].resetFields();
			},
			edit(contact_name,worker_id){
				this.isName="编辑账号";
				this.btnName="保存";
				this._isTrue(false)	;
				this.$set(this.ruleForm,"contact_name",contact_name);
				this.$set(this.editForm,"worker_id",worker_id)
				this.dialogVisible=true;
			},
			_isTrue(data){//必填项目修改
				let attrName=["phone","password"];
				let ruleName=Object.keys(this.rules);
				ruleName.forEach((item)=>{
					attrName.forEach((el)=>{
						if(item==el){
							this.rules[item].forEach((elem)=>{
								if(elem.required){
									console.log(88888)
									elem.required=data
								}
							})
						}
					})
				})
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
		.el-dialog__body{
			.el-form-item__label{
				display: block;
				color: #333;
				font-size: 14px;
			}
			.el-form-item__content{
				.el-input__inner{
					width: 400px;
					height: 32px;
					line-height: 32px;
					font-size: 14px;
				}
				.kf{
					position: absolute;
					bottom: 0;
					left: 420px;
					height: 32px;
					line-height: 32px;
					font-weight: normal;		
				}
			}
			.el-form-item:last-child{
				margin-bottom: 0;
				.store-button1{
					margin-right: 10px;
				}
			}
		}
	}
</style>