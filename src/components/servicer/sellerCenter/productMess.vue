<template>
	<div class="productMess">
		<div class="g-content">
			
			<p class="productTitle">{{title}}</p>
			<el-form :model="pulishForm" :rules="storeRules" ref="pulishForm">
				<h2 class="title_one ">基本信息</h2>
				<el-form-item label="商品标题" prop="product_name">
					<el-input v-model="pulishForm.product_name" placeholder="最多可输入30个字" 
						class="login-input2 product_name" style="width: 320px;">
					</el-input>
				</el-form-item>
				
				<el-form-item label="商品参数" prop="params">
		
					<productParam :params="pulishForm.params">
					</productParam>
				</el-form-item>

				<el-form-item label="商品规格" prop="specs">
					<specification :spec="pulishForm.specs">
					</specification>
				</el-form-item>

				<el-form-item label="商品分类" prop="mall_categorys">
					<checkMallClassify :mall_categorys="pulishForm.mall_categorys" 
						@mallCategorys="mallCategorys" class="scrollbar">
					</checkMallClassify>
				</el-form-item>
				<h2 class="title_one">商品主图</h2>

				<el-form-item prop="images">
					<moreImg :moreImg="pulishForm.images">
					</moreImg>
					<p class="f12 text-l color-7F">
						请添加3-5张商品主图，建议尺寸为750×750PX，宝贝主图大小不能超过3MB
					</p>
				</el-form-item>
				<h2 class="title_one">商品详情页</h2>

				<el-form-item prop="product_detail_arr">
					<CommodityDetails :CommodityDetails="pulishForm.product_detail_arr">
					</CommodityDetails>
				</el-form-item>
			</el-form>
			<!--................接收父集传过来的数据（编辑时商品能够显示出来）..............-->
			<div class="parentMess" v-if="title==='编辑商品'?true:false">
				{{parentMess}}
			</div>
		</div>
		<!--............各种类型按钮.........-->
		<div class="fixed-frame">
			<div class="btn_con clearfix" v-if="buttonType==='出售中的商品'">
				<el-button class="store-button1 float-l px-30" @click="pulishExist">保存</el-button>
				<el-button class="store-button2 float-l px-30" @click="cancelPro">取 消</el-button>
				<el-button class="store-button2 float-r px-30" @click="offPro">下架商品</el-button>
			</div>
			<div class="btn_pulish " v-if="buttonType==='发布商品'">
				<el-button class="store-button1" @click="pulishExist">发布</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import {deletes} from '@/api/script'	
	import {keepCategoryMess,createProduct,onoffBatch} from "@/api/platform"							
	import {isRead} from "@/api/servicer"
	export default {
		components: {
			"productParam": () =>
				import ("@/components/servicer/sellerCenter/productParam"),
			"specification": () =>
				import ("@/components/servicer/sellerCenter/specification"),
			"checkMallClassify": () =>
				import ("@/components/servicer/sellerCenter/checkMallClassify"),
			"moreImg": () =>
				import ("@/components/servicer/sellerCenter/moreImg"),
			"CommodityDetails": () =>
				import ("@/components/servicer/sellerCenter/CommodityDetails")
		},

		data() {
			return {
				pulishForm:{
					product_name: "",
					params: [{
						param_name: "",
						param_describe: ""
					}],
					specs: [{
						spec_name: "",
						init_price_yuan: "",
						spec_price_yuan: "",
						enable_refund: 0,
					}, ],
					mall_categorys: [],
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
				existSpec_name: {},
				DistrMode: false,
			}
		},
		props: {
			title: {
				default: function() {
					return "编辑商品"
				}
			},
			ediorMess: {//编辑父集传过来的信息
				default: function() {
					return {}
				}
			},
			buttonType: {
				default: function() {
					return "出售中的商品"
				}
			},
		},
		computed: {
			parentMess() {
				this.existSpec_name = JSON.parse(JSON.stringify(this.ediorMess));
				return this.pulishForm = this.existSpec_name
			},
		},
		methods: {
			mallCategorys(data) {
				this.pulishForm.mall_categorys = data;
			},
			//删除子组建多传的index属性（发布的时候再删）
			_deleteIndex(data) { //发布商品分类时的共用方法
				for (let i = 0; i < data.length; i++) {
					delete data[i].index
				};
			},
			_categorys_index(data) { //编辑时商品分类方法				
				if (this.pulishForm[data]) {
					if (this.pulishForm[data].length === 0) {
						delete this.pulishForm[data]
					} else {
						for (let i = 0; i < this.pulishForm[data].length; i++) {
							if (this.pulishForm[data][i].mall_category_id) {
								this.pulishForm[data][i] = {
									id: this.pulishForm[data][i].mall_category_id
								};
							}
							if (this.pulishForm[data][i].shop_category_id) {
								this.pulishForm[data][i] = {
									id: this.pulishForm[data][i].shop_category_id
								};
							}
						}
					};
				}
			},
			_imgReturn(data, typeId) { //商品主图提示
				this.$message({
					message: data,
					type: typeId,
					showClose: true
				});
			},
			cancelPro() { //商品编辑的取消按钮
				var changeEdior = JSON.parse(JSON.stringify(this.ediorMess));
				this.$confirm('你是否确定放弃本次修改编辑', '温馨提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'info '
				}).then(() => {
					this.pulishForm = changeEdior;
					this.$emit("closeEditor")
					this._imgReturn("已放弃本次编辑", "success")
				}).catch(() => {
					this._imgReturn("已放弃本次编辑", "info");
					this.$emit("closeEditor")
				});
			},
			offPro() {
				var product = {
					products: [{
						product_id: this.ediorMess.id
					}],
					status: "off"
				};
				this.$confirm('你是否确定下架此商品', '温馨提示', {
					confirmButtonText: '确认',
					cancelButtonText: '取消',
					lockScroll: false
				}).then(() => {
					onoffBatch(product)
						.then(({data}) => {													
							switch (data.status) {
								case "part_success":
									this._imgReturn("部分商品下架失败", "warning");
									this.$emit("empty", "尚未出售任何商品");
									break;
								case "all_fail":
									this.$message.error('下架失败');
									break;
								default:
									this._imgReturn("下架成功！可在仓库中的商品进行查看", "success");
							};
							this.$emit("seePro");
						})
				}).catch(() => {
					if (event.srcElement.innerText == "取消") {
						return;
					}
				})
			},
			pulishExist(pulishForm) { //发布保存按钮在一起				
				if (this.title === "编辑商品") {
					let arr = ["mall_id", "shop_id", "user_id"];
					deletes(arr, this.pulishForm); //调用批量删除对象属性的方法	
					this._categorys_index("mall_categorys");
					this.pulishForm.images.map((item, index) => //图片数组
						(item = {
							id: item.id,
							image_url: item.image_url
						})
					);
					let delesurplus = ["onoff_time", "product_price_yuan",
						"sort", "status"
					];
					deletes(delesurplus, this.pulishForm);
				} else if (this.title === "发布商品") {
					//删除多余的index属性
					if(this.pulishForm.mall_categorys){
						this._deleteIndex(this.pulishForm.mall_categorys);
					}
					
					this.pulishForm = Object.assign({}, this.pulishForm, {
						shop_id: this.$store.getters.getShop_id
					})
				};
				this.$refs.pulishForm.validate((valid) => {
					if (valid) {
						for (let item of this.pulishForm.params) {
							if (!item.param_describe || !item.param_name) {
								this._imgReturn("请填写完商品参数", "warning");
								return
							}
						};
						for (let item of this.pulishForm.specs) {
							if (!item.spec_name || !item.init_price_yuan || !item.spec_price_yuan) {
								this._imgReturn("请填写完商品规格", "warning");
								return
							}
						};
						if (this.pulishForm.images.length < 3) {
							this._imgReturn("商品主图至少三张", "warning")
							return
						};
						for (let item of this.pulishForm.product_detail_arr) {
							if (!item.content) {
								this._imgReturn("请发布商品详情页的文字", "warning");
								return
							}
						};
						if (this.title === "编辑商品") {//根据名字不同调的接口不同
							this._edit(this.pulishForm)
						} else if (this.title === "发布商品") {
							this._pulish(this.pulishForm)
						}
					} else {
						return false
					}
				})
			},
			_edit(data) {
				keepCategoryMess(data) //编辑商品API
					.then(({data}) => {											
						this._imgReturn("保存成功", "success")
						this.$emit("seePro")
					})
			},
			_pulish(data){
				createProduct(data)//发布商品API
				.then(({data}) => {	
					this.$router.push({path:"/server/commodityInfo/saleCommodity",query:{name:"success"}})
				})
			},
		}
	}
</script>

<style lang="scss">
	.productMess {
		margin-bottom: 66px;
		.g-content {
			.productTitle {
				color: #333;
				font-size: 20px;
				font-weight: bold;
				margin-bottom: 40px;
			}
			.el-form {
				.title_one {
					color: #333;
					font-size: 16px;
					text-align: left;
					margin-bottom: 20px;
				}
				.el-form-item__content {
					.product_name {
						width: 320px;
						display: block;
					}
					.checkClassify {
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
				.el-form-item__label {
					font-size: 12px;
					color: #7F7F7F;
					padding-top: 0;
					padding-bottom: 10px;
				}
			}
			.parentMess {
				display: none;
			}
		}
		.fixed-frame {
			.btn_con {
				width: 1200px;
				padding-right: 20px;
				padding-left: 20px;
				left: 50%;
				margin-left: -620px;
				margin: 0 auto;
			}
			.btn_pulish{
				text-align: center;
				.store-button1{
					padding-left: 50px;
					padding-right: 50px;
				}
			}
		}
	}
</style>