<template>
	<div class="realName">
		<emptyNavbar></emptyNavbar>
		<div class="realCon bg-f">
			<div class="progress clearfix">
				<div class="progress_sec float-l">
					<p class="realNameLine ml-30">
						<span class="circle bg-b"></span>
						<b class="line bg-D6"></b>
					</p>

					<div class="progress_txt f14">
						店主实名认证
					</div>
				</div>
				<div class="progress_sec float-l ">
					<p class="realNameLine ml-4">
						<span class="circle bg-D6"></span>
						<b class="line bg-D6"></b>
					</p>
					<div class="progress_txt color-D6 f14 progress_two">
						店铺信息填写
					</div>
				</div>
				<div class="progress_sec float-l">
					<p class="realNameLine ml-4">
						<span class="circle bg-D6"></span>
					</p>
					<div class="progress_txt color-D6 f14 progress_three">
						提交审核
					</div>
				</div>
			</div>
			<div class="examineTable">
				<el-form :model="addMessForm" :rules="storeRules" ref="addMessForm">
					<el-form-item label="店长姓名" prop="shopkeeper_name">
				    	<el-input v-model.trim="addMessForm.shopkeeper_name" class="login-input2"></el-input>
				    	<p class="f12 color-7F text">为了保障您的账号安全，请您填写真实姓名</p>
				  	</el-form-item>
				  	<el-form-item label="身份证号码" prop="identity_num">
				    	<el-input v-model.trim="addMessForm.identity_num" class="login-input2"></el-input>
				    	<p class="f12 color-7F text">为了保障您的账号安全，请您填写真实身份证号码</p>
				  	</el-form-item>
				  	<el-form-item label="身份证照片" prop="identity_front_url" class="display-in identity">
				  		<imageUpload :imageUrl="addMessForm.identity_front_url" :imageType="imageType" @getImageUrl="frontalView">
				  		</imageUpload>
				  		<p class="f12 color-7F ">身份证正面</p>
				  	</el-form-item>
				  	<el-form-item label="" prop="identity_back_url" class="display-in identity ml-10">
				  		<imageUpload :imageUrl="addMessForm.identity_back_url" :imageType="imageType" @getImageUrl="reverseView">
				  		</imageUpload>
				  		<p class="f12 color-7F ">身份证背面</p>
				  	</el-form-item>
				  	<el-form-item class="text-c">
				  		<el-button class="store-button1" @click="nextStep('addMessForm')">下一步</el-button>
				  	</el-form-item>
				  	
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	import emptyNavbar from "@/components/sellerCenter/emptyNavbar"
	import imageUpload from "@/components/func/imageUpload"
	import router from "@/router"
	export default{
		data(){
			return{
				addMessForm:{
					shopkeeper_name:"",
					identity_num:"",
					identity_front_url:"",
					identity_back_url:"",
				},
				storeRules:{
					shopkeeper_name:[
						{required: true, message:"请输入店长姓名" ,trigger: 'submit'},
						{min:0,max:30,message:"不超过30个字",trigger: 'submit' }			
					],
					identity_num:[
						{required: true, message:"请输入身份证号码" ,trigger: 'submit'},
						{min:0,max:30,message:"不超过30个字符",trigger: 'submit' }			
					],
					identity_front_url:[
						{required: true, message:"请上传身份证正面图片" ,trigger: 'submit'},
					],
					identity_back_url:[
						{required: true, message:"请上传身份证反面图片" ,trigger: 'submit'},
					],
				},
				imageType:"identity",//图片类型
			}
		},
		components:{emptyNavbar,imageUpload},
		methods:{
			//正面照
			frontalView(data){
				this.addMessForm.identity_front_url=data.new_url
			},
			reverseView(data){
				this.addMessForm.identity_back_url=data.new_url
			},
			nextStep(addMessForm){
				let rule1= /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
				let rule2= /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/;
				this.$refs[addMessForm].validate((valid) => {
		          if (valid) {
					if(!rule1.test(this.addMessForm.identity_num)&&!rule2.test(this.addMessForm.identity_num)){//格式不正确不继续执行
						this.$message.error("请输入正确的格式");
						return
					};
					this.$store.dispatch("doAuditsMess",this.addMessForm);//保存在Vuex里
					router.push("/audit")
		          } else {
		            return false;
		          }
		        });
			},
		}
	}
</script>

<style scoped="scoped">
.realCon{
	width: 1200px;
	margin:80px auto 0;
	padding: 60px 20px 20px;
}
.progress{
	width: 440px;
	margin-left:auto;
	margin-right: auto;
}
.progress .circle{
	display: inline-block;
	height: 12px;
	width: 12px;
	border-radius: 60%;
	margin-right: 2px;
}
.progress .line{
	display: inline-block;
	height: 4px;
	width: 160px;
	margin-bottom: 3px;
}
.progress_txt{
	color: #0070C9;
}
.progress_two{
	margin-left: -30px;
}
.progress_three{
	margin-left: -15px;
}
.bg-D6{
	background-color: #D6D6D6;
}
.color-D6{
	color: #D6D6D6 ;
}
.ml-4{
	margin-left: 4px;
}
.realCon .imageUpload{
	width: 140px;
    height: 100px;
}
.realCon .examineTable{
	margin-top:60px;
	width: 390px;
	margin:60px auto 0;
	
}

</style>
<style>

.realCon .el-form-item__content .el-input{
	width: 300px;
}	
.realCon  .el-form-item__label{
	width: 72px;
	line-height: 40px;
	text-align: right;
	padding: 0;
	color: #333;
	margin-right:10px;
}
.realCon .identity .el-form-item__label{
	line-height: 20px;
}
.realCon .login-input2 .el-input__inner{
	height: 40px;
	line-height: 40px;
}
.realCon .el-form-item.is-required .el-form-item__label::before{
	content: "";
    margin-right: 0;
}
.realCon .el-form-item__content p.text{
	margin-left: 90px;
}
.realCon .imageUpload_con p{
	margin-top:-10px;
}
.realCon .identity .el-form-item__content{
	float: left;
}
.realCon .el-form-item__error{
	width: 100px;
	left:auto;
	top:10%;
	right: -100px;
	text-align: left;
}
.realCon .identity .el-form-item__error{
	left: 0;
	width: auto;
	top: 100%;
}
.realCon .imageUpload .icon-jiahao{
	font-size: 32px;
}
.realCon .imageUpload_con{
	margin-top: -20px;
	margin-left: -14px;
}
</style>