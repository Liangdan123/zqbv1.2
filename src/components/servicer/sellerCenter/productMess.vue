<template>
	<div class="productMess">
		<div class="g-content">
			<p class="productTitle">{{title}}</p>
			<el-form
			:model="pulishForm" 
			:rules="storeRules"
			ref="pulishForm">
				<h2 class="title_one ">基本信息</h2>
				<el-form-item label="商品标题" prop="product_name">
					<el-input 
						v-model="pulishForm.product_name" 
						placeholder="最多可输入30个字" 
						class="login-input2 product_name" 
						style="width: 320px;">
					</el-input>
				</el-form-item>
				<el-form-item 
					label="商品参数" 
					prop="params">
					<productParam 
						:params="pulishForm.params">
					</productParam>
				</el-form-item>
				<el-form-item label="商品规格" prop="specs">
					<specification 
						:spec="pulishForm.specs">
						
					</specification>
				</el-form-item>					
				<el-form-item label="商品分类" prop="mall_categorys">
					<checkMallClassify
						:mall_categorys="pulishForm.mall_categorys"
						@mallCategorys="mallCategorys" 	
						class="scrollbar">
						
					</checkMallClassify>-
				</el-form-item>
					
			</el-form>
			
			
		</div>

	</div>
</template>

<script>
	export default{
		components:{
			"productParam":()=>import("@/components/servicer/sellerCenter/productParam"),
			"specification":()=>import("@/components/servicer/sellerCenter/specification"),
			"checkMallClassify":()=>import("@/components/servicer/sellerCenter/checkMallClassify"),
		},
		data(){
			return{
				pulishForm:{
					product_name: "",
					params: [{
						param_name: "",
						param_describe: ""
					}],
					specs: [
						{
				            spec_name: "",
				            init_price_yuan: "",
				            spec_price_yuan: "",
				            enable_refund:1,
						},
					],
					mall_categorys:[],
					images: [],
					product_detail_arr: [],
				},
				storeRules: {
					product_name: [{
							required: true,
							message: '请输入商品标题',
							trigger: 'submit'
						},
						{
							min: 0,
							max: 30,
							message: '最多可输入30个字',
							trigger: 'submit'
						}
					],
					params: [{
						type: 'array',
						required: true,
						message: "请输入参数名称/参数描述",
						trigger: 'submit'
					}],
					specs: [{
						type: 'array',
						required: true,
						message: "请输入商品价格",
						trigger: 'submit'
					}],
					images: [{
						type: 'array',
						required: true,
						message: "至少上传三张商品主图！",
						trigger: 'submit'
					}],
					product_detail_arr: [{
						type: 'array',
						required: true,
						message: "商品详情页内容不能为空！！",
						trigger: 'submit'
					}],
				},
			}
		},
		props:{
			title:{
				default:function(){
					return "编辑商品"
				}
			}
		},
		methods:{
			mallCategorys(data){
				this.pulishForm.mall_categorys = data;
			},
		}
	}
</script>

<style lang="scss">
	.productMess{
		.g-content{
			.productTitle{
				color: #333;
				font-size: 20px;
				font-weight: bold;
				margin-bottom: 40px;
			}
			.el-form{
				.title_one{
					color: #333;
					font-size: 16px;
					text-align: left;
					margin-bottom: 20px;
				}
				.el-form-item__content{
					.product_name{
						width: 320px;
						display: block;
					}
					.checkClassify{
						width: 310px;
					    height: 180px;
					    font-size: 12px;
					    padding-left: 10px;
					    margin-top: 26px;
					    color: #333333;
					    border: 1px solid #D6D6D6;
					    border-radius: 2px;
					}
				}
				.el-form-item__label{
					font-size: 12px;
				    color: #7F7F7F;
				    padding-top: 0;
				    padding-bottom: 10px;	
				}
			}
		}
	}
</style>