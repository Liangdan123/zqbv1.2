<template>
	<div>
		<el-table  :data="productMess" style="width: 100%">
			<el-table-column label="商品">
	       		<template slot-scope="scope">
	       			<div class="float-l mr-10 ">
	       				<img :src="scope.row.spec_url" width="50" height="50"/>
	       			</div>
	       			<div class="float-l" style="width: 84px;">
	       				<div class="product_name" >
	       					{{scope.row.product_name}}
	       				</div>
	       				<div class="spec_name">
		       				<span v-for="item in scope.row.spec_name.split(';')" class="color-7F">
		       					{{item}}
		       				</span>
	       				</div>

	       			</div>
	       		</template>
			</el-table-column>
			<el-table-column label="单价" prop="spec_price_yuan"></el-table-column>
			<el-table-column label="数量" prop="product_num"></el-table-column>
			<el-table-column label="配送方式">
				<template slot-scope="scope">
					<div>
						{{scope.row.distribute_type==="express"?"快递配送":scope.row.distribute_type==="shop"?"门店配送":"到店自取"}}
					</div>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		props:{
			productMess:{
				type:Array,
				default:function(){
					return []	
				}				
			}
		}
	}
</script>

<style scoped="scoped">
	.el-table__row{
		height: 86px;
	}
	.product_name{
		height: 24px;
		overflow: hidden;
		width: 84px;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    color:#333;
	}
	.spec_name{
		width: 84px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.spec_name span{
		margin-left: 4px;
	}
</style>