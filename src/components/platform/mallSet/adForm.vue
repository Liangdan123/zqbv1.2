<template>
	<div class="adForm">
		<div class="adForm-con clearfix mb-20">
			<div class="adForm-left">
				<el-radio-group v-model="formData.click_style">
					<el-radio :label="1">样式一</el-radio>
					<el-radio :label="2">样式二</el-radio>
				</el-radio-group>
			</div>
			<div class="adForm-right">
				<div v-if="formData.click_style===1"
					 class="adForm-right_one">
					<imageUpload :imageUrl="styleOneImg"
								imageType="mall"
								@getImageUrl="oneUploadImg">
					</imageUpload>
					<p class="f12 color-7F">图片尺寸宽度建议750px，格式支持png,jpg</p>
					<el-form label-width="100px" 							 
						     :model="styleOne">
						<el-form-item label="姓名:">
							<el-input v-model="styleOne.name"
								      placeholder="请输入姓名">
							</el-input>
						</el-form-item>
						<el-form-item label="手机号:">
							<el-input v-model="styleOne.phone"
								      placeholder="请输入手机号">
							</el-input>
						</el-form-item>
						<el-form-item label="QQ:">
							<el-input v-model="styleOne.qq"
								      placeholder="请输入微信号/QQ">
							</el-input>
						</el-form-item>
					</el-form>
				</div>
				<div v-if="formData.click_style===2"
					class="adForm-right_two">
					<imageUpload :imageUrl="styleTwoImg"
								 imageType="mall"
								 @getImageUrl="twoUploadImg">
					</imageUpload>
					<el-form label-width="100px" 							 
						     :model="styleTwo">
						<el-form-item label="姓名:">
							<el-input v-model="styleTwo.name"
								      placeholder="请输入姓名">
							</el-input>
						</el-form-item>
						<el-form-item label="手机号:">
							<el-input v-model="styleTwo.phone"
								      placeholder="请输入手机号">
							</el-input>
						</el-form-item>
						<el-form-item label="QQ:">
							<el-input v-model="styleTwo.qq"
								      placeholder="请输入微信号/QQ">
							</el-input>
						</el-form-item>
					</el-form>
					<p class="f12 color-7F">图片尺寸宽度建议750px，格式支持png,jpg</p>
				</div>
			</div>
		</div>
		<div class="pagination-r clearfix float-r">
			<el-button class="store-button2 float-r" @click="cancel">取消</el-button>
			<el-button class="store-button1 float-r mr-10" @click="sureForm">确定</el-button>
		</div>
	</div>
</template>

<script>
	import imageUpload from "@/components/func/imageUpload"
	export default {
		data() {
			return {
				styleOne:{
					name:"",
					phone:"",
					qq:""
				},
				styleTwo:{
					name:"",
					phone:"",
					qq:""
				},
				imgOne:"",//图片1
				imgTwo:"",//图片2
				oneStyle:1,
			}
		},
		created(){

		},
		props:{
			formData:{
				type:Object,
				default:function(){
					return {
						click_type: "form",
	                    click_style: 1,
	                    click_image_url: "", 
					}
				}
			},
			click_style:{//用于那个弹框里有信息
				type:Number,
				default:function(){
					return 0
				}
			},
			index:{//用于固定banner
				type:Number,
				default:function(){
					return 0
				}
			}
		},
		computed:{
			styleOneImg(){//样式一的图片	
				if(this.formData.click_image_url){
					console.log("this.index111111111:",this.index)
					console.log("this.formData.sort111111111:",this.formData.sort)
					if(this.index===this.formData.sort){//固定banner顺序
						if(this.click_style===this.formData.click_style){//固定样式
							this.imgOne=this.formData.click_image_url
						}
					}
				}
				return this.imgOne
			},
			styleTwoImg(){//样式二的图片	
				if(this.formData.click_image_url){
					console.log("this.index222222222:",this.index)
					console.log("this.formData.sort2222222222:",this.formData.sort)
					if(this.index===this.formData.sort){
						if(this.click_style===this.formData.click_style){
							this.imgTwo=this.formData.click_image_url //TODO（编辑的时候）(当图片顺序为0时不加载)
						}
					}

				};
				return this.imgTwo
			},
		},
		methods:{
			oneUploadImg(data){
				this.imgOne=JSON.parse(JSON.stringify(data.new_url)) ;
			},
			twoUploadImg(data){
				console.log(2222)
				this.imgTwo=JSON.parse(JSON.stringify(data.new_url)) ;
			},
			cancel(){
				this.$emit("shop_hidden", false);
				this.imgOne="";
				this.imgTwo="";
			},
			sureForm(){//表单确定按钮
				if(Number(this.formData.click_style)===1){
					if(!this.styleOneImg){//没上传图片提示
						this.$message.error("请上传图片");
						return
					};
					var form_url=this.styleOneImg;
				}else if(Number(this.formData.click_style)===2){
					if(!this.styleTwoImg){//没上传图片提示下
						this.$message.error("请上传图片");
						return
					};
					var form_url=this.styleTwoImg;
				}
//				let formMess={click_type:"form",click_style:this.formStyle,click_image_url:form_url};
				if(this.formData.click_image_url){
					this.$message.error("请上传图片");
					return
				}
				this.$emit("shop_hidden", false);
//				this.$emit("setFormMess",formMess);
			}
		}
	}
</script>

<style lang="scss">
	.adForm-con {
		border: 1px #E9EEF2 solid;
		border-right: none;
		.adForm-left {
			height: 100%;
			float: left;

			.el-radio-group {
				padding: 20px 93px 0 25px;
				.el-radio {
					display: block;
				}
				.el-radio+.el-radio {
					margin-left: 0;
					margin-top: 20px;
				}
			}
		}
		.adForm-right{
			float: left;
			padding-left: 116px;
			padding-top: 25px;
			border-left: 1px #E9EEF2 solid;
			.adForm-right_one{
				.imageUpload{
					width: 375px;
					height: 146px;
				}
				p{
					line-height: 30px;
				}
				.el-input{
					width: 200px;
				}
				.el-form{
					margin-top: 20px;
				}
			}
			.adForm-right_two{
				position: relative;
				width: 375px;
				height: 530px;
				.imageUpload{
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 490px;
					.imageUpload_con{
						margin-top: -130px;
					}
				}
				.el-form{
					position: absolute;
					bottom: 50px;
				}
				p{
					position: absolute;
					left: 0;
					bottom: 10px;
				}
			}
		}
	}
</style>