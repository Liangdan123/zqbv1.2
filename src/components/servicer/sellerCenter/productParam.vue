<template>
	<div class="productParam">
		<el-table :data="params" style="width: 100%">
			<el-table-column label="参数名称">
				<template slot-scope="scope">
					<input type="text" 
						v-model="scope.row.param_name" 
						class="login-input2 w-100"
						placeholder="最多可输入100个字"/> 
						
				</template>
			</el-table-column>
			<el-table-column label="参数描述" >
				<template slot-scope="scope">
					<input type="text" 
						v-model="scope.row.param_describe" 
						class="login-input2 w-100"
						placeholder="最多可输入225个字" />
						 
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button  @click="handleDelete(scope.$index, scope.row)">
						删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="addParam_div">
			<button 
				type="button" 
				@click="addParam" 
				v-if="btn_show" 
				class="addParam" >
				<b>+</b>添加商品参数({{params.length}}/20)
			</button>
		</div>

	</div>
</template>

<script>
	export default{
		computed:{
			btn_show(){
				return this.params.length<=19?true:false
			}
		},
		props:{
			params:{
				type: Array,
				default:function(){
					return []
				}					
			}			
		},
		methods:{
			handleDelete(index,row){
				this.params.splice(index,1);
			},
			addParam(){
				this.params.push({
					param_name:"",
					param_describe:""
				});
			}
		}
	}
</script>


<style >
.productParam .el-table__row{
	height: 52px;
}
.productParam .el-button{
	background-color: transparent;
	border: none;
	outline: none;
	color: #0070C9;
	padding-left: 0;
	padding-right: 0;
}
.productParam .el-button:hover{
	background-color: transparent;
}
.productParam .addParam_div{
	text-align: left;
	padding-left: 18px;
	border-left: 1px solid #D6D6D6;
	border-right: 1px solid #D6D6D6;
	border-bottom: 1px solid #D6D6D6;
	height: 40px;
	line-height: 40px;
}
.productParam .addParam{
	background-color: transparent;
	outline: none;
	border: none;
	text-align: left;
	color: #0070C9;
	cursor: pointer;
	line-height: 40px;
	font-size: 12px;
}
.productParam .el-table__body, 
.productParam  .el-table__footer,
.productParam  .el-table__header{
	table-layout:auto
}
.productParam .el-table{
	border: 1px solid #D6D6D6;
}
.productParam .el-table tr th:nth-child(2),
.productParam .el-table tr td:nth-child(2){
	width: 60%;
}
.productParam .el-table tr th:nth-child(3),
.productParam .el-table tr td:nth-child(3){
	width: 8%;
	text-align: right;
}
.productParam .login-input2{
	height: 32px;	 
	line-height: 32px;
	padding-left: 10px; 
	border: 1px solid  #D6D6D6; color: #7F7F7F;
}
.productParam .el-table th>.cell{
	font-size: 12px;
	color: #62778C;
}
</style>

