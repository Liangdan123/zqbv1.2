<template>
	<div class="mallMessSet commonCon mt-130 pt-20 pb-20" v-loading="loading">
		<h2 class="f20 color-3">商城信息</h2>
		<h3  class="f16 color-3 mt-40 mb-20">基本信息</h3>
		<el-form :model="mallMess" :rules="mallMessRules" ref="mallMess">
			<el-form-item label="商城LOGO" prop="mall_logo" class="mb-10">
				<imageUpload :imageUrl="mallMess.mall_logo" :imageType="imageType" @getImageUrl="updataLogo" class="display-b mt-10"></imageUpload>
				<b class="display-b color-7F f12 mt-10">图片尺寸建议24×24</b>
				<b class="display-b color-7F f12 mb-20">格式支持png、jpg</b>
			</el-form-item>
			<el-form-item label="商城名称" prop="mall_name">
				<el-input v-model="mallMess.mall_name" class="login-input2 mt-10"></el-input>	    			    		
			</el-form-item>
			<h3  class="f16 color-3 mt-40 mb-20">商城客服</h3>
			<el-form-item label="客服名称" prop="kefu_name">
				<el-input v-model="mallMess.kefu_name" class="login-input2 mt-10"></el-input>	    			    		
			</el-form-item>
			<el-form-item label="客服电话" prop="kefu_phone">
				<el-input v-model="mallMess.kefu_phone" class="login-input2 mt-10"></el-input>	    			    		
			</el-form-item>
		</el-form>
		<p class="color-7F f12">注：此处店铺客服用来接待电话咨询，在线咨询客服接待需要在公众号后台进行添加客服微信。</p>
		<div  class="fixed-frame">
			<div class="storeButton">
				<el-button class="store-button1" @click="keepPro('mallMess')">保 存</el-button>
				<el-button class="store-button2"  @click="cancelPro">取 消</el-button>
			</div>

		</div>
	</div>
</template>

<script>
	import {getMallMess,editMallMess} from "@/api/platform"
	import router from '@/router'
	import imageUpload from "@/components/func/imageUpload"
	export default{
		name:"mallMessSet",
		data(){
			return{
				mallMess:{
					mall_logo: "",
					mall_name: "",				    
				    kefu_name: "",
				    kefu_phone: ""
				},
				mallMessRules:{
					mall_logo:[{required: true,message:'请上传Logo',trigger:'submit'}],
					mall_name:[{required: true,message:'请输入商城名称',trigger:'submit'}],
					kefu_name:[{required: true,message:'请输入客服名称',trigger:'submit'}],
					kefu_phone:[{required: true,message:'请输入客服电话',trigger:'submit'}],
				},													
				imageType:"mall",
				cancelMess:{},//取消时候需要用到
				loading:true,
			}
		},
		created(){
			getMallMess()
			.then(({data})=>{
				this.mallMess=data;
				this.cancelMess=JSON.parse(JSON.stringify(data));
				this.loading=false;
			})
			.catch(({response:{data}})=>{
				this.$message.error(data.errorcmt);
			})
		},
		methods:{
			updataLogo(data){
				this.mallMess.mall_logo=data.new_url
			},
			keepPro(mallMess){//保存
				this.$refs[mallMess].validate((valid) => {
			        if (valid) {
			           editMallMess(this.mallMess)
			           .then((data)=>{			           		
			           		this.$store.dispatch("doMallMessExist",true);
			           		router.replace("/mallZxh/mallSetInfo/mallMess")
			           })
			           .catch(({response:{data}})=>{
			        		this.$message.error(data.errorcmt);
			           })
			        } else {		           
			            return false;
			        }
		        });
			},
			cancelPro(){//取消
				this.$confirm('你是否确定放弃本次编辑', '温馨提示', {
		        	confirmButtonText: '确定',
		        	cancelButtonText: '取消',
		       	}).then(()=>{
		        	//确认放弃，还原为未改之前	   
		        	this.mallMess=this.cancelMess;		 
		        	router.replace("/mallZxh/mallSetInfo/mallMess")								
			    }).catch(()=>{
		        	if(event.srcElement.innerText=="取消"){
		        		this.$message({ type: 'info', message: '未放弃本次编辑' });				           
					}
		        })
			},
		},
		components:{imageUpload},				
	}
</script>

<style scoped="scoped">
	.imageUpload{
		height: 104px;
		width: 104px;
	}
	.storeButton{
		width: 1240px;
		margin: 0 auto;		
	}
</style>
<style>
	.mallMessSet .el-form-item__label{
		float: inherit;
	}
	.mallMessSet .el-form-item__content b{
		line-height:18px ;
	}
	.mallMessSet .el-form-item.is-required .el-form-item__label:before{
		content: '';
		margin-right: 0;
	}
	.mallMessSet .el-input__inner{
		width: 320px;
	}
</style>