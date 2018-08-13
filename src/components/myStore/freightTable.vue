<template>
	<div class="freightTable" v-loading="loading">
		<el-dialog :visible.sync="dialogVisible"  :title=titleMess :close-on-click-modal=false>
			<el-form :model="addTemMess" :rules="addTemRules" ref="addTemMess" >
				<el-form-item label="模板名称：" prop="template_name">
					<el-input type="text" v-model="addTemMess.template_name" placeholder="不超过20个字" style="width: 320px;">
						
					</el-input>			
				</el-form-item>
				<el-form-item label="计价方式：" prop="true">
					<label class="store_label">
					 	<input type="radio" name="two" class="display-n" :checked="true" style="width: 142px;">							 			
						<em ></em>
						按照件数
					 </label>
				</el-form-item>
				
				<el-form-item label="默认运费：" class="pos-r">
					<el-input type="number" v-model.number="addTemMess.first_num"  style="width: 80px;" :class="{'border-red':first_num}"></el-input>
					件内
					<el-input type="number" v-model="addTemMess.first_price_yuan"  style="width: 80px;" :class="{'border-red':first_price_yuan}"></el-input>&#8194;元，
					每增加&#8194;<el-input type="number" v-model.number="addTemMess.add_num"  style="width: 80px;" :class="{'border-red':add_num}"></el-input>&#8194;件，
					增加运费&#8194;<el-input type="number" v-model.number="addTemMess.add_price_yuan"  style="width: 80px;" :class="{'border-red':add_price_yuan}"></el-input>&#8194;元。
					<transition name="el-zoom-in-top">
						<b class="pos-a testMess font-n" v-if="textVis">请输入完整的模板</b>
					</transition>
					
				</el-form-item>

				<div class="clearfix">
					<el-button class="store-button2 float-r ml-10" @click="cancel">取消</el-button>
					<el-button class="store-button1 float-r" v-if="titleMess==='添加运费模板'" @click="addTem('addTemMess')">添加</el-button>
					<el-button class="store-button1 float-r" v-if="titleMess==='编辑运费模板'" @click="addTem('addTemMess')">保存</el-button>
				</div>
			</el-form>
						
		</el-dialog>
		
		<div class="addTemplate clearfix">
			<el-button class="store-button2  mb-20 float-r" @click="add">
				<i class="iconfont icon-tianjia f12"></i>
				<span>添加运费模板</span>
			</el-button>
		</div>
		<div class="temList mb-10" v-for="(item,index) in temData">
			<div class="temListHead clearfix f14">
				<span class="float-l">{{item.template_name}}</span>
				<p class="float-r color-3">
					最后修改日期：&#8194;<span >{{item.updated_at}}</span> 
					<b class="color-b ml-20 font-n cursor" @click="deleteTem(item,index)" v-if="index>0">删除</b>
					<b class="color-b ml-20 font-n cursor" @click="editor(item,index)">编辑</b>				
				</p>			
			</div>
			<div class="temListBox color-3 f14">
				运费：{{item.first_num}}件内 {{item.first_price_yuan}} 元；每增加 {{item.add_num}} 件，增加运费 {{item.add_price_yuan}} 元
			</div>
		</div>
	</div>
</template>

<script>
	import {getfreightTemList,addFreightTem,editFreightTem,delFreightTem} from "@/api/myStore"
	export default{
		data(){
			return{
				listData:{
					mall_id:"",
					shop_id:""
				},
				temData:[],
				dialogVisible:false,
				titleMess:"",
				addTemMess:{
					shop_id:"",
					template_name:"",
					distribute_unit:"num",
					first_num:"",
					first_price_yuan:"",
					add_num:"",
					add_price_yuan:""
				},
				addTemRules:{
					template_name:[
						{ required: true, message: '请输入模板名称', trigger: 'submit' },
						{ min: 0, max:20, message: '长度在 0 到 20 个字符', trigger: 'submit'}
					],
				},
				textVis:false,				
				first_num:false,
				first_price_yuan:false,
				add_num:false,
				add_price_yuan:false,
				distribute_template_id:"",
				loading:true,
			}
		},
		created(){
			let mall_id = this.$store.getters.getMall_id;
			let shop_id = this.$store.getters.getShop_id;
			this.$set(this.listData, "mall_id", mall_id);
			this.$set(this.listData, "shop_id", shop_id);
			this.$set(this.addTemMess, "shop_id", shop_id);
			this.freightTemList(this.listData);
		},
		methods:{
			add(){
				this.dialogVisible=true;
				this.titleMess="添加运费模板";
				let arr=["template_name","first_num","first_price_yuan","add_num","add_price_yuan"]
				arr.map(item=>this.addTemMess[item]="")
			},
			handleCurrent(){
				
			},
			editor(item,index){
				this.dialogVisible=true;
				this.titleMess="编辑运费模板";
				this.distribute_template_id=item.distribute_template_id;
				this.addTemMess=Object.assign({},this.temData[index]);				
			},
			addTem(addTemMess){
				this.$refs[addTemMess].validate((valid) => {
		        	if (valid) {		        		
		        		if(this.addTemMess.add_num===0){
		        			this.$message.error("增加的件数不能为0");
							return
						};
			        	let Arr=["first_num","first_price_yuan","add_num","add_price_yuan"]
			        	let testAttr=[];
						Arr.map(item=>{
							if(this.addTemMess[item]===""){
								return testAttr.push(item)
							}
						});						
			        	if(testAttr.length===0){
			        		this.textVis=false;		        		
			        		Arr.map(item=>this[item]=false);
			        		//条件符合调接口
			        		if(this.titleMess==="添加运费模板"){
			        			this.addfreight(this.addTemMess);			        			
			        		}else if(this.titleMess==="编辑运费模板"){
			        			let onlyTemMess=JSON.parse(JSON.stringify(this.addTemMess));
			        			delete onlyTemMess.shop_id;
			        			onlyTemMess.distribute_template_id=this.distribute_template_id;		        			
			        			this.editotFreight(onlyTemMess)
			        		}
			        		
			        	}else{
			        		this.textVis=true;		 
			        		Arr.map(item=>{
			        			if(this.addTemMess[item]===""){
			        				return this[item]=true;
			        			}else{
			        				return this[item]=false;
			        			}
			        		})
			        	}		        		
		        	} else {		            	
		            	return false;
		       		}
		        });
			},
			//添加模板API
			addfreight(data){
				addFreightTem(data)
        		.then(({data})=>{
        			this.dialogVisible=false;
        			this.hintInfo("添加成功！","success")
        			this.freightTemList(this.listData);
        			this.clearData();
        		})
        		.catch(({response:{data}})=>{
        			this.$message.error(data.errorcmt);
        		})	
			},
			//编辑模板API
			editotFreight(data){
				editFreightTem(data)
				.then(({data})=>{
					this.dialogVisible=false;
					this.hintInfo("编辑成功！","success")
        			this.freightTemList(this.listData);
        			this.clearData();
        			
				})
				.catch(({response:{data}})=>{
        			this.$message.error(data.errorcmt);
        		})	
			},
			//清空数据
			clearData(){
				let Arr=["template_name","first_num","first_price_yuan","add_num","add_price_yuan"];
				Arr.map(item=>this.addTemMess[item]="")				
			},
			hintInfo(data,types){
				this.$message({
					message: data,
          			type: types
				});
			},
			cancel(){
				this.dialogVisible=false;
			},
			freightTemList(data){
				getfreightTemList(data)
				.then(({data})=>{
					this.temData=data;
					this.loading=false;
				})
				.catch(({response:data})=>{
					this.$message.error(data.errorcmt);
				})
			},
			//删除模板
			deleteTem(item,index){
				let  distribute_template_id={
					distribute_template_id:item.distribute_template_id
				};
				this.$confirm('你是否确定删除该运费模板？', '温馨提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		       }).then(() => {
			      	delFreightTem(distribute_template_id)
					.then(({data})=>{
						this.freightTemList(this.listData);
						this.hintInfo("删除成功！","success")
					})
					.catch(({response:{data}})=>{
						this.$message.error(data.errorcmt);
					})
		        }).catch(() => {
					this.hintInfo("已取消删除！","info")    
		        });

			}
		}
	}
</script>

<style lang="scss">
	.freightTable{
		.temList{
			-webkit-box-shadow: 0px -1px 0px 0px #e9eef2, -1px 0px 0px 0px #e9eef2, 1px 0px 0px 0px #e9eef2;
		    box-shadow: 0px -1px 0px 0px #e9eef2, -1px 0px 0px 0px #e9eef2, 1px 0px 0px 0px #e9eef2;
		    border-bottom: 1px solid #E9EEF2;
		    
		    .temListHead{
		    	height: 32px;
			    background: #EEF6FD;
			    color: #62778C;
			    line-height: 32px;
			    padding-left: 20px;
			    padding-right: 20px;
		    }
		    .temListBox{
		    	border-left: 1px solid #E9EEF2;
		    	border-right: 1px solid #E9EEF2;
		    	padding:20px;
		    }
		}
		.el-dialog--small{
			width: 900px;
			.el-form-item.is-required {
				.el-form-item__label:before{
					content: "";
					margin-right: 0;
				}
			}
			.testMess{
				left: 0;
				top: 30px;
				font-size: 12px;
				color: #ff4949;
			}
			.border-red{
				.el-input__inner{
					border: 1px solid #ff4949;
				}				
			}
		}
	}
</style>