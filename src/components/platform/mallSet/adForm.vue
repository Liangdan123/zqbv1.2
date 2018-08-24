<template>
	<div class="adForm">
		<div class="adForm-con clearfix">
			<div class="adForm-left">
				<el-radio-group v-model="formStyle">
					<el-radio :label="1">样式一</el-radio>
					<el-radio :label="2">样式二</el-radio>
				</el-radio-group>
			</div>
			<div class="adForm-right">
				<div v-if="formStyle===1"
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
				<div v-if="formStyle===2"
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
			<el-button class="store-button2 float-r">取消</el-button>
			<el-button class="store-button1 float-r mr-10" >确定</el-button>
		</div>
	</div>
</template>

<script>
	import imageUpload from "@/components/func/imageUpload"
	export default {
		data() {
			return {
				formStyle: 1,
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
				styleOneImg:"",
				styleTwoImg:"",
			}
		},
		methods:{
			oneUploadImg(data){
				this.styleOneImg=data.new_url
			},
			twoUploadImg(data){
				this.styleTwoImg=data.new_url
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