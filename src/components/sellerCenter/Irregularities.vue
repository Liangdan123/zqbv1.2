<template>
	<div class="Irregularities">
		<el-table  :data="IrreMess.data" style="width: 100%">
			<el-table-column label="商品名称">
				<template slot-scope="scope">
			 		<div class="float-l mr-10 mt-10 mb-10"><img :src="scope.row.product_image_url" width="50" height="50"/></div>
			 		<div class="float-l prodcutName  mt-10 mb-10">{{scope.row.product_name}}</div>           	       				  	       						       					       			 					       			
				</template>
			</el-table-column>
			<el-table-column label="违规提醒" prop="illegal_content"></el-table-column>
			<el-table-column label="提醒时间" prop="created_at"></el-table-column>	
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button type="text" size="small" class="btn-delete" @click="editDoods(scope.$index)">编辑商品 </el-button>					
					<el-button type="text" size="small" class="btn-delete" @click="violation(scope.$index)">违规提醒 </el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="违规提醒" :visible.sync="readModel" :modal="false">
			<p>{{read.illegal_content}}</p>
			<div class="clearfix">
				<el-button class="store-button2 float-r px-30" @click="keepCancelPro">取 消</el-button>
				<el-button class="store-button1 float-r px-30 mr-10" @click="keepCancelPro">保存</el-button>				
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import productMess from "@/components/commodity/productMess"
	import { onoffBatch, checkProduct} from "@/api/commodity"
	import { checkIrregularities} from "@/api/seller"
	export default{
		data(){
			return{
				read:{ },
				readModel:false,
			}
		},
		props:{
			IrreMess:{
				type:Object,
				default:function(){
					return {}
				}
			}
		},
		methods:{
			editDoods(index){
				let product_id=this.IrreMess.data[index].product_id;
				let illegal_id=this.IrreMess.data[index].illegal_id;			
				checkProduct(product_id)//获取商品详情API接口
				.then(({data})=>{
					this.$emit("editDood",data,illegal_id);//显示编辑商品
				})
				.catch(({response:{data}})=>{
					this.$message.error(data.errorcmt);
				})
			},	
			violation(index){
				let illegal_id=this.IrreMess.data[index].illegal_id;				
				checkIrregularities(illegal_id)
				.then(({data})=>{
					this.read=data;
					this.readModel=true
				})
				.catch(({response:{data}})=>{
					this.$message.error(data.errorcmt);
				})									
			},
			keepCancelPro(){
				this.readModel=false;
				this.$emit("keepCancel")
			},
		}
	}
</script>

<style scoped="scoped">
	.prodcutName{	
		width: 84px;		
		line-height: 50px;	
		overflow: hidden; 										
		text-overflow: ellipsis;
		white-space: nowrap;
	}

</style>
<style>
	.Irregularities > .el-table th > .cell{
		color:#62778C;
		font-size: 12px;
	}
	.sellerCenter .Irregularities .el-dialog__wrapper .el-dialog--small{
		width: 600px;
		top:30%!important;
	}
	.Irregularities .el-table_1_column_14 .cell{
		width: 299px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
