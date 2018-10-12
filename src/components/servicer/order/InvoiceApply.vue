<template>
	<el-form  label-width="150px" class='Invoice'>
      	<el-form-item label="发票性质：">{{InvoiceData.type==1?'专票':'普票'}}</el-form-item>
	    <template v-if='InvoiceData.type==1'>
	       <el-form-item label="开户名：">{{InvoiceData.kaihu_name}}</el-form-item>
	        <el-form-item label="开户行：">{{InvoiceData.kaihu_bank}}</el-form-item>
	        <el-form-item label="电话：">{{InvoiceData.kaihu_phone}}</el-form-item>
	        <el-form-item label="账号：">{{InvoiceData.kaihu_account}}</el-form-item>
	        <el-form-item label="纳税人识别地址：">{{InvoiceData.kaihu_address}}</el-form-item>
	    </template>
      	<template v-else>
	       <el-form-item label="公司名称：">{{InvoiceData.company_name}}</el-form-item>
	        <el-form-item label="税号：">{{InvoiceData.tax_num}}</el-form-item>
      	</template>
    </el-form>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		props:["InvoiceData"]
				
	}
</script>

<style>
</style>