
<template>
	<div class="productProp">
		<el-table :data="addSpec "  style="width: 100%">
<			<div slot="empty" height="0"></div>
    		<el-table-column  label="规格名称"></el-table-column>
    		<el-table-column  label="操作"></el-table-column>
		</el-table>
		<div class="w-100 border-f4 addproduct">
			<el-button class="txtbtn">
				<b>+</b> 添加商品规格（0/4）
			</el-button>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				addSpec:[]			
			}
		},
		
	}
</script>

<style scoped="scoped">
	.addproduct{
		box-sizing: border-box;
		border-top: none;
		border-radius: 0;
		height: 40px;
	}

</style>
<style>
	.productProp   .el-table__empty-block{
		min-height: 0;
	}
</style>