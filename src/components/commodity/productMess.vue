<template>
	<div class="pulishCon">
		<p class="productTitle color-3">{{title}}</p>
		<el-form :model="pulishForm" :rules="storeRules" ref="pulishForm">
			<h2 class="color-3 f16 text-l mb-20">基本信息</h2>
			<el-form-item label="商品标题" prop="product_name">
				<el-input v-model="pulishForm.product_name" placeholder="最多可输入30个字" class="login-input2 display-b" style="width: 320px;">
				</el-input>
			</el-form-item>
			<el-form-item label="商品参数" prop="params">
				<productParam :params="pulishForm.params">
				</productParam>
			</el-form-item>

			<el-form-item label="商品规格/价格/库存" prop="specs">
				<specification :spec_item="pulishForm.spec_items" :spec="pulishForm.specs" :product_id="pulishForm.id"
					@editSpec_items="editSpec_items" @editeditSpec="editeditSpec">
				</specification>
			</el-form-item>
			<h2 class="color-3 f16 text-l mb-20">商品分类</h2>
			<el-form-item label="店铺中分类" prop="shop_categorys">
				<checkClassify @categorys="categorys" class="scrollbar" :shop_categorys="pulishForm.shop_categorys"></checkClassify>
			</el-form-item>
			
			<el-form-item label="商城中分类" prop="shop_categorys">
				<checkMallClassify @mallCategorys="mallCategorys" class="scrollbar" :mall_categorys="pulishForm.mall_categorys"></checkMallClassify>
			</el-form-item>
			
			<h2 class="color-3 f14 text-l mb-20 mt-40">商品主图</h2>
			<el-form-item label="" prop="images">
				<moreImg :moreImg="pulishForm.images">
				</moreImg>
				<p class="f12 text-l color-7F">
					请添加3-5张商品主图，建议尺寸为750×750PX，宝贝主图大小不能超过3MB
				</p>
			</el-form-item>

			<h2 class="color-3 f14 text-l mb-20 mt-30">商品详情页</h2>
			<el-form-item label="" prop="product_detail_arr">
				<CommodityDetails :CommodityDetails="pulishForm.product_detail_arr"></CommodityDetails>
			</el-form-item>

			<h2 class="color-3 f14 text-l mb-20 mt-40">配送方式</h2>
			<el-form-item label="" prop="distributes">
				<distribute :distribution.sync="pulishForm.distributes" @setTri="setTri"></distribute>
			</el-form-item>
			<div v-if="$route.path==='/zxh/commodityPage/pulishProduct'" class="text-c">
				<el-button class="store-button1 pulish mb-40" @click="puslishCom(pulishForm)">发布</el-button>
			</div>
			<div v-if="$route.path==='/zxh/commodityPage/sale_commodity'||$route.path==='/zxh/sellerPage/sellerCenter'" class="sale_commodity">
				<div class="btn_con">
					<el-button class="store-button1 float-l px-30" @click="keepPro">保存</el-button>
					<el-button class="store-button2 float-l px-30" @click="cancelPro">取 消</el-button>
					<el-button class="store-button2 float-r px-30" @click="offPro">下架商品</el-button>
				</div>
			</div>
			<div v-if="$route.path==='/zxh/commodityPage/warehouse'" class="sale_commodity">
				<div class="btn_con">
					<el-button class="store-button1 float-l px-30" @click="keepPro">保存</el-button>
					<el-button class="store-button2 float-l px-30" @click="cancelPro">取 消</el-button>
					<el-button class="store-button2 float-r px-30" @click="onPro">商品上架</el-button>
					<el-button class="store-button2 float-r px-30" @click="deletPro">商品删除</el-button>
				</div>
			</div>
		</el-form>
		<!--................接收父集传过来的数据..............-->
		<div class="parentMess" v-if="$route.path==='/zxh/commodityPage/pulishProduct'?false:true">{{parentMess}}</div>
	</div>
</template>

<script>
	import productParam from "@/components/commodity/productParam"
	import checkClassify from "@/components/commodity/checkClassify"
	import checkMallClassify from "@/components/commodity/checkMallClassify"
	import moreImg from "@/components/func/moreImg"
	import CommodityDetails from "@/components/func/CommodityDetails"
	import specification from "@/components/commodity/specification"
	import distribute from "@/components/commodity/distribute"
	import { createProduct, keepCategoryMess, onoffBatch,deleteBatch } from "@/api/commodity"
	import router from '@/router'
	import * as types from "@/store/mutation-types"
	import { deletes } from '@/api/script'
	import onOffProd from "@/utils/onOffPro"
	import commodityMethod from '@/utils/commodity'
	export default {
		data() {
			return {
				pulishForm: {
					product_name: "",
					params: [{
						param_name: "",
						param_describe: ""
					}],
					spec_items: [],
					specs: [],
					shop_categorys: [],
					mall_categorys:[],
					images: [],
					product_detail_arr: [],
					distributes: [],
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
					spec_items: [{
						type: 'array',
						required: true,
						message: "请输入商品价格",
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
					distributes: [{
						type: 'array',
						required: true,
						message: "请至少选择一种配送方式！",
						trigger: 'submit'
					}]
				},
				editSpec:[],
				existSpec_name:{},
				DistrMode:false,
			}
		},
		props: ["ediorMess","title"],
		mixins: [onOffProd, commodityMethod],
		computed: {
			parentMess() {
				var changeEdior = JSON.parse(JSON.stringify(this.ediorMess));	
				this.existSpec_name= JSON.parse(JSON.stringify(this.ediorMess));
				this.editSpec=this.existSpec_name.specs;
				return this.pulishForm = changeEdior
			},
		},
		components: {
			productParam,
			checkClassify,
			moreImg,
			CommodityDetails,
			specification,
			distribute,
			checkMallClassify
		},
		methods: {
			//商城中分类事件
			mallCategorys(data){
				this.pulishForm.mall_categorys = data;
			},
			//店铺分类事件传值
			categorys(data) {
				this.pulishForm.shop_categorys = data;
			},
			//删除子组建多传的index属性（发布的时候再删，checkClassify子组建）
			deleteIndex(data) {
				for(let i = 0; i < data.length; i++) {
					delete data[i].index
				};
			},
			editSpec_items(data) {
				this.pulishForm.spec_items = data;
			},
			editeditSpec(data) {
				this.pulishForm.specs = data;
			},
			setTri(data) {
				this.pulishForm.distributes = data;
			},
			puslishCom(pulishForm) {
				let shop_id = {shop_id: this.$store.getters.getShop_id};				
				//删除多余的index属性
				this.deleteIndex(this.pulishForm.mall_categorys);
				this.deleteIndex(this.pulishForm.shop_categorys);
				let pulish = Object.assign(pulishForm, shop_id);
				this.$refs.pulishForm.validate((valid) => {
					if(valid) {
						//验证信息；
						this.DistrMode=false;
						//商品参数验证
						let params=this.pulishForm.params.find(item=>item.param_describe===""||item.param_name==="");
						if(params!==undefined){
							this.imgReturn("请填写完商品参数","warning");
							return
						};
						for(var i=0;i<this.pulishForm.specs.length;i++){
							if(this.pulishForm.specs[i].spec_price_yuan<=0){					
								this.imgReturn("商品规格中的价格信息填写错误或未填","warning");
								return
							};
							if(this.pulishForm.specs[i].spec_store<0||this.pulishForm.specs[i].spec_store===""){
								this.imgReturn("商品规格中的库存信息填写错误或未填","warning");
								return
							}
						};
						for(var i=0;i<this.pulishForm.product_detail_arr.length;i++){
							let content=this.pulishForm.product_detail_arr[i].content;
							if(content===""){
								this.imgReturn("请发布商品详情页的文字","warning")
								return
							}
						};
						if(this.pulishForm.images.length<3){
							this.imgReturn("商品主图至少三张","warning")
					        return
						};					
						//配送方式验证
						this.VerificationDis();
						if(this.DistrMode){					
							return
						}
						//API
						createProduct(pulish)
							.then(({data}) => {							
								router.push({path:"/zxh/commodityPage/sale_commodity",query:{name:"success"}})
							})
							.catch(({response:{data}}) => {
								this.imgReturn(data.errorcmt,"warning")
							})

					} else {
						return false
					}
				});
			},
			//配送方式的验证
			VerificationDis(){
				let distributes=this.pulishForm.distributes;
				if(distributes.length===0){
					this.DistrMode=true;
					this.imgReturn("请选择配送方式","warning")
				}else{
					for(let i=0;i<distributes.length;i++){
						if(distributes[i].shipping_set_type==="define"){
							for(let val in distributes[i]){
								if(distributes[i][val]===""){
									this.imgReturn("请填写自定义运费","warning")
									return this.DistrMode=true
								}else if(distributes[i].add_num===0){
									this.imgReturn("增加件数不能为0","warning");
									return this.DistrMode=true
								};

							}
						}
					}					
				}
			},
			//商品主图提示
			imgReturn(data,typeId){
				this.$message({
		          message: data,
		          type: typeId,
		          showClose:true
		        });
			},
			categorys_index(data){
				if(this.pulishForm[data]!==undefined){
					if(this.pulishForm[data].length===0){
						delete this.pulishForm[data]				
					}else{
						for(let i = 0; i < this.pulishForm[data].length; i++) {
							if(this.pulishForm[data][i].shop_category_id!==undefined){
								this.pulishForm[data][i] = {
									id: this.pulishForm[data][i].shop_category_id
								};
							}
							if(this.pulishForm[data][i].id!==undefined){
								this.pulishForm[data][i] = {
									id: this.pulishForm[data][i].id
								};
							}
						}
					};	
				}
			},
			//编辑商品后的保存
			keepPro(pulishForm) {	
				var arr = ["mall_id", "shop_id", "user_id", "spec_items"];
				//调用批量删除对象属性的方法
				deletes(arr, this.pulishForm);				
				this.categorys_index("shop_categorys");
				this.categorys_index("mall_categorys");				
				if(this.pulishForm.images.length) {
					for(let i = 0; i < this.pulishForm.images.length; i++) {
						this.pulishForm.images[i] = {
							id: this.pulishForm.images[i].id,
							image_url: this.pulishForm.images[i].image_url,
						}
					}
				};
				this.specCom(this.pulishForm.specs);			
				if(this.pulishForm.distributes.length) {
					for(let i = 0; i < this.pulishForm.distributes.length; i++) {
						switch(true) {
							case this.pulishForm.distributes[i].shipping_set_type === "seller":
								//调用批量删除的方法
								var seller = ["distribute_template_id", "distribute_unit", "first_num", "first_price_yuan", "add_num", "add_price_yuan"];
								deletes(seller, this.pulishForm.distributes[i]);
								break;
							case this.pulishForm.distributes[i].distribute_type === "self":
								//调用批量删除的方法
								var dis = ["shipping_set_type", "distribute_template_id", "distribute_unit", "first_num", "first_price_yuan", "add_num", "add_price_yuan"];
								deletes(dis, this.pulishForm.distributes[i]);
								break;
							case  this.pulishForm.distributes[i].shipping_set_type === "define":
								if(this.pulishForm.distributes[i].distribute_template_id!==undefined){
									delete this.pulishForm.distributes[i].distribute_template_id;
								}
								break;
						}
						//distributes全部删除
						var distri = ["id", "product_id"];
						deletes(distri, this.pulishForm.distributes[i]);
					}
				};
				if(this.pulishForm.params.length) {
					for(let i = 0; i < this.pulishForm.params.length; i++) {
						delete this.pulishForm.params[i].product_id
					}
				};		
				var delesurplus=["onoff_time","product_price_yuan","sellout_status","sellout_time","sort","wxacode","status"];
				deletes(delesurplus, this.pulishForm);	
				//调编辑商品接口
				this.$refs.pulishForm.validate((valid) => {
					if(valid) {
						this.DistrMode=false;//配送方式验证所需要的
						//商品参数验证
						let params=this.pulishForm.params.find(item=>item.param_describe===""||item.param_name==="");
						if(params!==undefined){
							this.imgReturn("请填写完商品参数","warning");
							return
						};				
						for(var i=0;i<this.pulishForm.specs.length;i++){
							if(this.pulishForm.specs[i].spec_price_yuan<=0){					
								this.imgReturn("商品规格中的价格填写错误","warning");
								return
							};
							if(this.pulishForm.specs[i].spec_url===null){
								this.imgReturn("商品规格中的图片不能为空","warning");
								return
							}
						};
						if(this.pulishForm.images.length<3){
							this.imgReturn("商品主图至少三张","warning")
					        return
						};
						for(var i=0;i<this.pulishForm.product_detail_arr.length;i++){
							let content=this.pulishForm.product_detail_arr[i].content;
							if(content===""){
								this.imgReturn("请发布商品详情页的文字","warning")
								return
							}
						};						
						//配送方式验证
						this.VerificationDis();
						if(this.DistrMode){					
							return
						}
						//API						
						keepCategoryMess(this.pulishForm)
							.then(({data}) => {
								this.imgReturn("保存成功","success")
								this.$emit("seePro", false,data.distributes)
							})
							.catch(({response:{data}}) => {
								this.imgReturn(data.errorcmt,"warning");
								this.specCom(this.editSpec);
								this.pulishForm.spec_items=this.existSpec_name.spec_items;
							})

					} else {
						return false
					}
				});
			},
			specCom(data){	
				if(data.length) {
					for(let i = 0; i < data.length; i++) {					
						if(data[i].id!==undefined){				
							this.pulishForm.specs[i] = {
								id: data[i].id,
								spec_url: data[i].spec_url,
								spec_price_yuan: data[i].spec_price_yuan,
								spec_store: data[i].spec_store,
							};	
							if(data===this.editSpec){
								this.$set(this.pulishForm.specs,i,{
									id: data[i].id,
									spec_url: data[i].spec_url,
									spec_price_yuan: data[i].spec_price_yuan,
									spec_store: data[i].spec_store,
									spec_name:data[i].spec_name
								})
							};//错误的时候把删减的spec_name恢复
						};
					};
				}
			},
			//商品编辑的取消按钮
			cancelPro() {
				var changeEdior = JSON.parse(JSON.stringify(this.ediorMess));
				this.$confirm('你是否确定放弃本次修改编辑', '温馨提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'info '
				}).then(() => {
					this.pulishForm = changeEdior;
					this.$emit("closeEditor")
					this.imgReturn("已放弃本次编辑","success")
				}).catch(() => {
					this.imgReturn("已放弃本次编辑","info");
					this.$emit("closeEditor")
				});
			},
			//下架商品
			offPro() {
				var product = {
					products: [{product_id: this.ediorMess.id}],					
					status: "off"
				};
				this.$confirm('你是否确定下架此商品', '温馨提示', {
					confirmButtonText: '确认',
					cancelButtonText: '取消',
					lockScroll: false
				}).then(() => {
					onoffBatch(product)
						.then(({data}) => {						
							switch(data.status) {
								case "part_success":
									this.imgReturn("部分商品下架失败","warning");
									this.$emit("empty", "尚未出售任何商品");
									break;
								case "all_fail":
									this.$message.error('下架失败');
									break;
								default:
									this.imgReturn("下架成功！可在仓库中的商品进行查看","success");
							}
							this.$emit("seePro", false);
						}).catch(({response:{data}}) => {
							this.imgReturn(data.errorcmt,"warning")							
						})
				}).catch(() => {
					if(event.srcElement.innerText == "取消") {
						return;
					}
				})
			},
			//删除商品
			deletPro(){
				var product = {
					products: [{
						product_id: this.ediorMess.id
					}],
				};
				this.$confirm('你是否确定删除此商品，商品删除后将保存在历史商品记录中.历史商品记录里的商品只能查看，不能做任何编辑操作。', '温馨提示', {
					confirmButtonText: '确认',
					cancelButtonText: '取消',
					lockScroll: false
				}).then(() => {
					deleteBatch(product)
					.then(({data}) => {					
						switch(data.status) {
							case "part_success":
								this.imgReturn("部分商品删除失败","warning");
								this.$emit("empty", "仓库中未发现商品记录");
								this.searchMethods();
								break;
							case "all_fail":
								this.$message.error('删除失败');
								break;
							default:
								this.imgReturn("删除成功！可在历史商品记录中进行查看","success");
								this.$emit("empty", "仓库中未发现商品记录");
								this.$emit("seePro", false);	
						}
					}).catch(({response:{data}}) => {
						this.imgReturn(data.errorcmt,"warning")
					})
				}).catch(() => {
					return;
				})
			},
			//商品上架
			onPro(){
				var onProduct = {
					products: [{
						product_id: this.ediorMess.id
					}],
					status: "on"
				};
				onoffBatch(onProduct).then(({data}) => {			
					if(data.status == "all_success") {
						this.imgReturn("上架成功！可在出售中的商品中进行查看","success");
					} else {
						this.$confirm('商品库存不足！请先添加库存后再次进行上架操作?', '温馨提示', {
							confirmButtonText: '确定',
							showCancelButton: false,
						})
					}
					this.$emit("empty", "仓库中未发现商品记录");
					this.$emit("seePro", false);	
				}).catch(({response:data}) => {
					this.imgReturn(data.errorcmt,"warning")
				})
			}
		}
	}
</script>

<style lang="scss">
	.pulishCon {
		width: 1198px;
		padding: 20px 20px 0px 20px;
		margin-right: auto;
		margin-left: auto;
		margin-top: 110px;
		background: #FFFFFF;
		border: 1px solid #F4F4F4;
		margin-bottom: 60px;
		.productTitle{
			font-size: 20px;
			font-weight: bold;
			margin-bottom: 40px;
		}
		.el-form-item {
			margin-bottom: 20px;
			.el-form-item__label {
				font-size: 12px;
				color: #7F7F7F;
				padding-top: 0;
				padding-bottom: 10px;
				&::before {
					content: "";
					margin-right: 0;
				}
			}
			.el-form-item__content {
				line-height: 32px;
				.el-input {
					.el-input__inner {
						font-size: 12px;
						color: #7F7F7F;
					}
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
				.empty {
					float: left;
					span {
						float: left;
						height: 100px;
						width: 100px;
						border-radius: 2px;
						border: 1px solid #E9EEF2;
					}
				}
			}
		}
		.store-button1.pulish {
			padding-left: 60px;
			padding-right: 60px;
			padding-top: 0;
			padding-bottom: 0;
		}
	}
</style>
<style scoped="scoped">

	.pulishCon .el-form-item .el-input__inner {
		line-height: 32px;
		height: 32px;
	}
	
	.sale_commodity {
		position: fixed;
		z-index: 2000;
		bottom: 0px;
		width: 100%;
		left: 0;
		background-color: #F0F4F7;
		padding-top: 6px;
		padding-bottom: 6px;
		box-shadow: 0 -2px 10px rgba(98, 119, 140, .2);
	}
	
	.btn_con {
		width: 1200px;
		padding-right: 20px;
		padding-left: 20px;
		left: 50%;
		margin-left: -620px;
		margin: 0 auto;
	}
	
	.parentMess {
		display: none;
	}
</style>