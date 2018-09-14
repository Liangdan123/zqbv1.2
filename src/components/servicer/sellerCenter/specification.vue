<template>
	<div class="specification">
		<el-table
		:data="spec"
		style="width: 100%">
			<el-table-column label="规格名称" width="498">
				<template slot-scope="scope">
					<input type="text" 
						v-model="scope.row.spec_name" 
						class="login-input2 w-100"
						placeholder="请输入商品名称"/> 
				</template>
			</el-table-column>
			<el-table-column label="单价" width="240">
				<template slot-scope="scope">
					<input type="number" 
						v-model.number="scope.row.spec_price_yuan"
						class="login-input2 w-100"
						placeholder="请设置规格单价"/>
				</template>
			</el-table-column>
			<el-table-column label="原价" width="240">
				<template slot-scope="scope">
					<input type="number" 
						v-model.number="scope.row.init_price_yuan"
						class="login-input2 w-100"
						placeholder="请设置规格原价"/>
				</template>
			</el-table-column>
			<el-table-column label="退款" width="150">
				<template  slot-scope="scope">
					<el-checkbox :checked="ischecked(scope.$index)"
						@change="isRefund(scope.$index)" >
						
					</el-checkbox>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="70">
				<template slot-scope="scope">
					<el-button  
						@click="handleDelete(scope.$index,scope.row)">
						删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="addSpec">
			<button 
				type="button" 
				@click="addSpec" 
				v-if="btn_show" 
				class="addSpec_btn" >
				<b>+</b>添加商品参数({{spec.length}}/20)
			</button>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
			}
		},
		props:{
			spec:{
				default:function(){
					return []
				}
			}
		},
		computed:{
			btn_show(){//添加商品按钮显示不显示
				return this.spec.length<=19?true:false
			},
		},
		methods:{
			ischecked(index){//编辑是显示是否退款
				return this.spec[index].enable_refund===1?true:false
			},
			isRefund(index){//点击退款时()
				if(event.target.checked===true){//当退款选中时改变选中enable_refund状态，并传给父集
					this.spec[index].enable_refund=1
				}else if(event.target.checked===false){
					this.spec[index].enable_refund=0
				}
			},
			handleDelete(index,row){//删除
				this.spec.splice(index,1);
			},
			addSpec(){
				this.spec.push({
		            spec_name: "",
		            init_price_yuan: "",
		            spec_price_yuan: "",
		            enable_refund:0,
				});
			}
		}
	}
</script>

<style lang="scss">
	.specification{
		.el-table{
			border: 1px solid #D6D6D6;
			.el-table__row{
				height: 52px;
				.cell{
					.login-input2{
						height: 32px;
					    line-height: 32px;
					    padding-left: 10px;
					    border: 1px solid #D6D6D6;
					    color: #7F7F7F;
					}
					.el-button{
						background-color: transparent;
					    border: none;
					    outline: none;
					    color: #0070C9;
					    padding-left: 0;
					    padding-right: 0;
					}
				}
			}
		}
		.addSpec{
			text-align: left;
		    padding-left: 18px;
		    border-left: 1px solid #D6D6D6;
		    border-right: 1px solid #D6D6D6;
		    border-bottom: 1px solid #D6D6D6;
		    height: 40px;
		    line-height: 40px;
		    .addSpec_btn{
		    	background-color: transparent;
			    outline: none;
			    border: none;
			    text-align: left;
			    color: #0070C9;
			    cursor: pointer;
			    line-height: 40px;
			    font-size: 12px;
		    }
		}
	}
</style>