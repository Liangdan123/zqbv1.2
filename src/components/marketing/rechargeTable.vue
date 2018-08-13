<template>
	<div class="rechargeTable" v-loading="loading">
		<!--.....................开头...............-->
		<div class="clearfix">
			<div class="float-l">
				<el-button class="store-button2 add"  @click="AddDiscount" >
					<i class="iconfont icon-tianjia f12"></i>
					<span>添加优惠</span>
				</el-button>
				<el-button class="store-button2 remove" @click="delDiscount">
					<i class="iconfont icon-shanchu f12 color-red"></i>
					<span class="color-red">删除优惠</span>
				</el-button>
			</div>
			<span class="float-r color-8 f14">目前最多支持添加9项优惠</span>
		</div>
		<!--..........................添加编辑优惠弹框.................-->
		<el-dialog :title="Boxtitle" :visible.sync="dialogVisible" @close="cancelCoupon">
			<div class="plate clearfix mb-20">
				<span class="left float-l">优惠名称：</span>
				<div class="right float-l color-8"  v-if="deposit.pay_fee_yuan===''&&deposit.give_fee_yuan===''">
					根据优惠规则自动生成
				</div>
				<div class="color-3 f14" v-if="deposit.pay_fee_yuan!==''||deposit.give_fee_yuan!==''">
					冲{{deposit.pay_fee_yuan}}送{{deposit.give_fee_yuan}}
				</div>
			</div>
			<div class="plate clearfix mb-20 ">
				<span class="left float-l">最低存额：</span>	
				<div class="right float-l pos-r">
					<em class="pos-a n color-ff" v-if="empty.pay_fee_yuan">请填写</em>
					<input type="number"  v-model.number="deposit.pay_fee_yuan" :class="{border_ff:border.pay_fee_yuan}" @focus="focusOne" class="input"/>
					&#160;元
					<span :class="sameRules===true?'color-ff':'color-8'" ref="identical">
						（不含小数、不能和已存在的优惠规则相同）
					</span>
				</div>
			</div>
			<div class="plate clearfix">
				<span class="left float-l">赠送金额：</span>
				<div class="right float-l  pos-r">
					<em  class="pos-a  color-ff" v-if="empty.give_fee_yuan">请填写</em>				
					<input type="number" v-model.number="deposit.give_fee_yuan" :class="{border_ff:border.give_fee_yuan}" @focus="focusTwo"  class="input"/>
					&#160;元
				</div>
			</div>
			<div class="clearfix" v-if="Boxtitle==='添加优惠'">
				<el-button class="store-button2 float-r ml-10" @click="cancelCoupon">取消</el-button>
				<el-button class="store-button1 float-r" @click="addEditCoupon">添加</el-button>
			</div>
			<div class="clearfix" v-if="Boxtitle==='编辑优惠'">
				<el-button class="store-button2 float-r ml-10" @click="cancelCoupon">取消</el-button>
				<el-button class="store-button1 float-r" @click="addEditCoupon">保存</el-button>
			</div>
		</el-dialog>
		
		<!--.......................充值优惠管理表格..................-->
		<el-table :data="rechargeList"  style="width: 100%;margin-top:20px"  @selection-change="handleSelectionChange">						
			<div slot="empty">
				<p class="color-3 f14 mt-10 mb-10">尚未添加优惠</p>
				<el-button type="text"class="store-button1 add"  @click="AddDiscount" >
					添加优惠
				</el-button>
			</div>
			<el-table-column type="selection">         
    		</el-table-column>
			<el-table-column label="优惠名称">
				<template slot-scope="props">
					<span>冲{{props.row.pay_fee_yuan}}送{{props.row.give_fee_yuan}}</span>
				</template>
			</el-table-column>
			<el-table-column  label="最低存额" prop="pay_fee_yuan">				
			</el-table-column>
			<el-table-column  label="赠款金额" prop="give_fee_yuan" >				
			</el-table-column>
			<el-table-column  label="创建时间" prop="created_at">				
			</el-table-column>
			<el-table-column  label="操作" style="width: 10%;">
				<template slot-scope="props">
					<div class="cursor" style="color: #0070C9!important;" @click="edit(props.$index)">编辑</div>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import {RechargeDiscount,addDiscount,deleteDiscount,editDiscount} from "@/api/marketing"
	export default{
		data(){
			return {
				rechargeList:[],
				dialogVisible:false,
				deposit:{
					pay_fee_yuan:"",
					give_fee_yuan:"",					
				},
				empty:{
					pay_fee_yuan:false,
					give_fee_yuan:false,
				},
				border:{
					pay_fee_yuan:false,
					give_fee_yuan:false,
				},
				numbers:"",
				num:"",
				sameRules:false,
				addCouponAdd:{
					mall_id:""
				},
				mall_id:"",
				delArray:{
					mall_id:"",
					data:[]				
				},
				Boxtitle:"",
				editObject:{
					mall_id:"",
				},
				loading:true,
			}
		},
		created(){
			let mall_id = this.$store.getters.getMall_id;
			//添加优惠列表条件
			this.$set(this.addCouponAdd, "mall_id", mall_id);
			//添加编辑列表条件
			this.$set(this.editObject, "mall_id", mall_id);
			this.mall_id=mall_id
			this.list(this.mall_id)
		},
		methods:{
			AddDiscount(){
				this.Boxtitle="添加优惠";
				this.dialogVisible=true;
				let arr=["created_at","re_give_id"];
				arr.map(item=>{
					if(this.deposit[item]!==undefined){
						delete this.deposit[item]
					}
				});
			},
			list(mall_id){
				//获取充值优惠列表接口
				RechargeDiscount(mall_id)
				.then(({data})=>{
					this.rechargeList=data;
					this.loading=false;
				})
				.catch(({response:{data}})=>{
					this.$message.error(data.errorcmt);
				})
			},
			//选项
			handleSelectionChange(val){
				let re_give=[];
				for(let list of val){
					re_give.push({
						re_give_id:list.re_give_id
					})
				};
				this.delArray=Object.assign({},this.delArray,{
					mall_id:this.mall_id,
					data:re_give
				});				
			},
			//编辑
			edit(index){
				this.Boxtitle="编辑优惠";
				this.dialogVisible=true;				
				this.deposit=Object.assign({},this.rechargeList[index])
			},
			//添加或者编辑优惠
			addEditCoupon(){
				//条件检查 不通过 return 
				for(let value in this.deposit){
					let regex=/^\d+\.\d+$/;
					switch(true){
						case this.deposit[value]<=0:
							//当为负数的时候
							this.border[value]=true;
						    this.$message({
					          message: '请填正数',
					          type: 'warning'
					       });
						    return
						    break;
						case this.deposit[value]==="":
							//当两个值为空的时候
							if(this.deposit.pay_fee_yuan===""){
								this.empty.pay_fee_yuan=true;
								this.border.pay_fee_yuan=true;
							}
							this.empty[value]=true;
							this.border[value]=true;
							return
							break;
						case regex.test(this.deposit[value])===true:
							if(regex.test(this.deposit.pay_fee_yuan)===true){
								this.border.pay_fee_yuan=true;
							};
							if(regex.test(this.deposit.give_fee_yuan)===true){
								this.border.give_fee_yuan=true;
							};							
							this.sameRules=true
							return
					}
				}				
				//条件通过执行
				for(let value in this.deposit){
					this.empty[value]=false;
					this.border[value]=false;
				}				
				this.sameRules=false;				
				//调添加优惠接口
				if(this.Boxtitle==="添加优惠"){
					Object.assign(this.addCouponAdd,this.deposit);
					this.addCouponAPI(this.addCouponAdd);
				};	
				//调编辑优惠接口
				if(this.Boxtitle==="编辑优惠"){
					this.$set(this.editObject,"re_give_id",this.deposit.re_give_id);
					this.$set(this.editObject,"pay_fee_yuan",this.deposit.pay_fee_yuan)
					this.$set(this.editObject,"give_fee_yuan",this.deposit.give_fee_yuan)
					this.editAPI(this.editObject)
				}
				
			},		
			//添加优惠接口
			addCouponAPI(data){
				addDiscount(data)
				.then((data)=>{
					//添加成功重新获取列表
					this.list(this.mall_id);
					//关闭弹框
					this.dialogVisible=false;
					//清空数据
					this.clear(this.deposit);
					//消息提示
					this.$message({
			        	message: '优惠规则添加成功！',
			        	type: 'success',
			        	showClose:true
			        });
				})
				.catch(({response:{data}})=>{
					this.$message.error(data.errorcmt);
				})
			},
			//编辑优惠接口
			editAPI(data){
				editDiscount(data)
				.then(({data})=>{
					//编辑成功重新获取列表
					this.list(this.mall_id);
					//关闭弹框
					this.dialogVisible=false;
					//清空数据
					this.clear(this.deposit);
					//消息提示
					this.$message({
			        	message: '编辑规则成功！',
			        	type: 'success',
			        	showClose:true
			        });
				})
				.catch(({response: {data}})=>{
					this.$message.error(data.errorcmt);
				})
			},			
			//清空数据的方法
			clear(list){
				for(let value in list){
					list[value]=""
				};
			},
			//取消添加优惠接口
			cancelCoupon(){
				//清空数据
				this.clear(this.deposit);
				this.dialogVisible=false;
				this.border.pay_fee_yuan=false;
				this.border.give_fee_yuan=false;
				this.sameRules=false;
			},
			focusOne(){
				this.empty.pay_fee_yuan=false;				
			},
			focusTwo(){
				this.empty.give_fee_yuan=false;
			},
			//删除优惠接口
			delDiscount(){
				if(this.delArray.data.length===0){
					this.$message({
			            type: 'info',
			            message: '请选择你要删除的优惠'
			        }); 
					return
				};
				this.$confirm("你是否确定删除该优惠？","温馨提示",{
				 	confirmButtonText: '确定',
          			cancelButtonText: '取消',
				})
				 .then(()=>{
				 	//确认删除掉接口
				 	deleteDiscount(this.delArray)
				 	.then((data)=>{
				 		//删除成功重新获取列表
				 		this.list(this.mall_id);
					 	this.$message({
				            type: 'info',
				            message: '已删除'
				        });  
				 	})
				 	.catch(({response:{data}})=>{
				 		 this.$message.error(data.errorcmt);
				 	})
				 })
				 .catch(()=>{
				 	//不确定删除关弹窗
				 	this.$message({
			            type: 'info',
			            message: '已取消删除'
			        });       
				})
			},
		}
	}
</script>
<style scoped="scoped">
	.store-button1.add{
		padding-left: 52px;
		padding-right: 52px;
	}
	.plate span.left{
		width: 70px;
		color: #333;
		font-size: 12px;
	}
	.plate .right em{
		left: 10px;
		top: 50%;
		margin-top: -11px;
	}
	.input{
		position: relative;
		outline: none;
		border: none;
		border: 1px solid #D6D6D6;
		width: 72px;
		height: 32px;
		padding-left: 10px;
		border-radius: 2px;
		z-index: 100;
		background-color: transparent;
	}
	.input:hover{
		cursor: text;
		border: 1px solid #7F7F7F;
	}
	.input:focus{
		border: 1px solid #0070C9;
		cursor: text;
	}
	.color-ff{
		color: #FF5B00;
	}
	.border_ff{
		border: 1px solid #FF5B00;
	}
	.border_ff:focus{
		border: 1px solid #FF5B00;
	}
</style>
<style>
	.rechargeTable .el-table th>.cell {
		color: #62778C;
		font-weight: normal;
	}
	
	.rechargeTable .el-table td>.cell {
		color: #333;
	}
	.rechargeTable .el-table__empty-block{
		min-height: 100px;
	}
	.rechargeTable  .el-table__empty-text{
		top: 43%;
	}
	/*table{
		width: 100% !important;
	}*/
</style>