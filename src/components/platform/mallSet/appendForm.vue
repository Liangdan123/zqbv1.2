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
				<div v-if="formData.click_style==1"
					class="adForm-right_one">
					<imageUpload 
						:imageUrl="formImage[1]"
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
				<div v-if="formData.click_style==2"
					class="adForm-right_two">
					<imageUpload :imageUrl="formImage[2]"
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
				images:{
					1:'',
					2:''
				},
				flag:true,
			}
		},
		computed:{
			formImage:{
				get(){
					if(this.flag&&this.formData.click_image_url){//当没有链接时这里不会执行
						this.$set(this.images,this.formData.click_style,this.formData.click_image_url);
						this.flag = false;
					};
					return this.images
				},
				set(value){
					this.images = Object.assign({},this.images,value);					
				}
			},
		},
		methods:{
			oneUploadImg({new_url}){			
				this.formImage={1:new_url}
			},
			twoUploadImg({new_url}){
				this.formImage={2:new_url}
			},		
			cancel(){				
				this.$emit("shop_hidden", false);			
				this.images = {1:'',2:''};			
				this.flag = true;
				this.$emit('resetData');//为了banner初始化				
			},
			sureForm(){//表单确定按钮
				if(Number(this.formData.click_style)===1){
					if(!this.images[1]){//没上传图片提示
						this.$message.error("请上传图片");
						return
					};
					var form_url=this.images[1];
			}else if(Number(this.formData.click_style)===2){
				if(!this.images[2]){//没上传图片提示下
					this.$message.error("请上传图片");
					return
				};
				var form_url=this.images[2];
			}
			let formMess={click_type:"form",click_style:this.formData.click_style,click_image_url:form_url};
			this.$emit("shop_hidden", false);
			this.$emit("setFormMess",formMess);//选数据
			},
			
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
					overflow-y:scroll;
					input,.background{
						position: fixed;
					    top: 136px;
					    left: 320px;
						width: 357px;
						height: 148px;
					}
					img{
						min-height: 100%;
						height: auto;
					}
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
				/*width: 375px;
				height: 530px;				*/
				.imageUpload{
					/*position: absolute;
					top: 0;
					left: 0;*/
					/*width: 100%;
					height: 490px;*/
					width: 375px;
					height: 530px;		
					overflow-y:scroll;
					input,.background{
						position: fixed;
					    top: 136px;
					    left: 320px;
						width: 375px;
    					height: 530px;
					}
					.imageUpload_con{
						margin-top: -80px;
						p{
							bottom: auto;
						}
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