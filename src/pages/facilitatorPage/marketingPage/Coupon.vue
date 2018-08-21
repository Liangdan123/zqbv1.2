<template>
	<div class="marketing commodity">
		<Navbar></Navbar>
		<!--.....................添加优惠券弹框..................-->
		<el-dialog title="添加优惠券" :visible.sync="dialogVisible" :close-on-click-modal="false">
			<el-form :model="addCoupon" :rules="rules" ref="addCoupon">
				<el-form-item label="优惠券名称：" prop="coupon_name">
					<el-input type="text" v-model="addCoupon.coupon_name" style="width: 320px;">
					</el-input>
					<b class="font-n color-7F ml-10">不超过10个字</b>
				</el-form-item>
				
				<el-form-item label="优惠方式：" prop="true">
					<label class="store_label" @change="fullAmount">
					 	<input type="radio" name="two" class="display-n" :checked="true" style="width: 142px;">							 			
						<em ></em>
						满额减钱
					 </label>
				</el-form-item>
				
				<el-form-item label="面额：" prop="money_yuan">
					<el-input type="number" v-model="addCoupon.money_yuan" style="width: 124px;">
					</el-input>
				</el-form-item>
				<el-form-item label="使用条件：" prop="over_money_yuan">
					<span>满</span>
					<el-input type="number" v-model="addCoupon.over_money_yuan" style="width: 124px;"></el-input>
					<span>元使用</span>
				</el-form-item>
				<el-form-item label="有效期：">
					<el-date-picker v-model="addCoupon.start_time" type="date" placeholder="选择日期" :editable="false">

					</el-date-picker> 到
					<el-date-picker v-model="addCoupon.end_time" type="date" placeholder="选择日期" :editable="false">

					</el-date-picker>
					<span class="color-7F">有效期最长90天</span>
				</el-form-item>
				<el-form-item prop="coupon_num" label="发行量：">
					<el-input type="number" v-model="addCoupon.coupon_num" style="width: 144px;"></el-input>
					<span class="color-3 mr-10">张</span>
					<span class="color-7F">发行量一旦设置便不能再次编辑，请谨慎设置</span>
				</el-form-item>
				<div class="clearfix">
					<el-button class="store-button2 float-r ml-10" @click="cancel">取消</el-button>
					<el-button class="store-button1 float-r" @click="lastAdd('addCoupon')">添加</el-button>
				</div>
			</el-form>
		</el-dialog>
		<!--..........................整体内容........................-->
		<div class="g-content">
			<div class="btn">
				<el-button class="store-button2 add mb-20" @click="add">
					<i class="iconfont icon-tianjia f12"></i>
					<span>添加优惠</span>
				</el-button>
				<el-button class="store-button2 remove mb-20" @click="delet">
					<i class="iconfont icon-shanchu f12 color-red"></i>
					<span class="color-red">删除优惠</span>
				</el-button>
			</div>
			<!--........................表格.......................-->
			<el-table :data="couponTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" 
				empty-text="尚未添加优惠券"  v-loading="loading">
				<el-table-column type="selection">
				</el-table-column>
				<el-table-column prop="coupon_name" label="商品名称">
					<template slot-scope="props">
						<div>{{props.row.coupon_name}}</div>
					</template>
				</el-table-column>
				<el-table-column prop="money_yuan" label="面额">
					<template slot-scope="props">
						<div style="color: #B4282D!important;">￥{{props.row.money_yuan}}</div>
					</template>
				</el-table-column>
				<el-table-column prop="over_money_yuan" label="使用条件">
					<template slot-scope="props">
						<div>满￥{{props.row.over_money_yuan}}</div>
					</template>
				</el-table-column>
				<el-table-column prop="coupon_num" label="发券量">
					<template slot-scope="props">
						<div>{{props.row.coupon_num}}</div>
					</template>
				</el-table-column>,
				<el-table-column prop="receive_num" label="领券量">
					<template slot-scope="props">
						<div>{{props.row.receive_num}}</div>
					</template>
				</el-table-column>
				<el-table-column prop="use_num" label="用券量">
					<template slot-scope="props">
						<div>{{props.row.use_num}}</div>
					</template>
				</el-table-column>
				<el-table-column label="优惠券有效时间">
					<template slot-scope="props">
						<div style="color: #333!important;">{{props.row.start_time}}&#12288;
							<span style="color: #7f7f7f!important;">至</span>&#12288;{{props.row.end_time}}
						</div>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="props">
						<div style="color: #0070C9!important;" @click="onlyDele(props.$index)">删除</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	import Navbar from "@/components/marketing/Navbar"
	import { addCouponAPI, getCouponList, deleteCouponList } from "@/api/marketing"
	import { format } from "@/api/script"
	export default {
		data() {
			return {
				couponTable: [],
				dialogVisible: false,
				addCoupon: {
					shop_id: "",
					coupon_name: "",
					coupon_type: 1,
					money_yuan: "",
					over_money_yuan: "",
					start_time: "",
					end_time: "",
					coupon_num: "",
				},
				rules: {
					coupon_name: [{
						required: true,
						message: '请输入优惠券名称',
						trigger: 'submit'
					},],
					money_yuan: [{
						required: true,
						message: '请输入优惠券面额',
						trigger: 'submit'
					} ],
					over_money_yuan: [{
						required: true,
						message: '请输入满额使用金额',
						trigger: 'submit'
					},],
					start_time: [{
						required: true,
						message: '请输入优惠开始时间',
						trigger: 'submit'
					}],
					end_time: [{
						required: true,
						message: '请输入优惠结束时间',
						trigger: 'submit'
					}],
					coupon_num: [{
						required: true,
						message: '优惠券发行量',
						trigger: 'submit'
					}],
				},
				couponList: {
					shop_id: "",
					shop_id: "",
					status: "",
				},
				deleteLists: {
					shop_id: "",
					data: [],
				},
				loading:true,
			}
		},
		components: {
			Navbar
		},
		created() {
			let shop_id = this.$store.getters.getShop_id;
			let mall_id = this.$store.getters.getMall_id;
			this.couponList = Object.assign({}, this.couponList, {
				shop_id,
				mall_id,
				status: 0
			})
			this.searchMethods(this.couponList);
			this.$set(this.deleteLists, "shop_id", shop_id);
		},
		methods: {
			//获取优惠券列表API
			searchMethods(data) {
				getCouponList(data)
					.then(({
						data
					}) => {
						this.couponTable = data;
						this.loading=false;
					})
					.catch(({response: {data}})=>{
						 this.$message.error(data.errorcmt);
					})	
			},
			fullAmount(){
				this.$set(this.addCoupon,"coupon_type",1);
			},
			handleSelectionChange(val) {
				var arr = [];
				for(var attr of val) {
					arr.push({
						shop_coupon_id: attr.id
					})
				}
				this.$set(this.deleteLists, "data", arr);
			},
			//添加优惠
			add() {
				this.$set(this.addCoupon,"coupon_type",1);
				this.dialogVisible = true;
			},
			//弹框添加
			lastAdd(addCoupon) {
				let shop_id = this.$store.getters.getShop_id;
				this.$set(this.addCoupon, "shop_id", shop_id);				
				this.$refs[addCoupon].validate((valid) => {
					if(valid) {
						if(this.addCoupon.start_time===""||this.addCoupon.end_time===""){
							this.$message.error("请选择完整的有效期");
							return
						}else{
							if(this.addCoupon.start_time.getTime() >this.addCoupon.end_time.getTime()){
								this.$message.error("开始时间发育结束时间");
								return
							}
						};	
						if(+this.addCoupon.money_yuan>+this.addCoupon.over_money_yuan){
							this.$message.error("面额需要小于使用条件");
							return
						}
						if(this.addCoupon.start_time !== "" && this.addCoupon.end_time !== "") {
							//当格式为对象时才调用格式方法
							if(typeof this.addCoupon.start_time === "object" && typeof this.addCoupon.end_time === "object") {
								this.addCoupon.start_time = format(this.addCoupon.start_time);
								this.addCoupon.end_time = format(this.addCoupon.end_time);
							}
							//调用添加优惠券接口
							addCouponAPI(this.addCoupon)
								.then(({data}) => {								
									//添加成功重新调优惠券列表API
									this.searchMethods(this.couponList);
									//关闭弹框
									this.dialogVisible = false;
									//添加成功提示
									this.$message('添加成功');
									//成功了就把原来数据清空
									for(var obj in this.addCoupon) {
										this.addCoupon[obj] = ""
									}
								}).catch(({response: {data}})=>{
									 this.$message.error(data.errorcmt);
								});
						} else {
							this.$message({
								message: '请选择有效期',
								type: 'warning'
							});
						}
					} else {
						return false;
					}
				});
			},
			//弹框取消
			cancel() {
				this.dialogVisible = false;
			},
			delet() {
				if(this.deleteLists.data.length === 0) {
					this.$message({
			          showClose: true,
			          message: '请选择要删除的优惠',
			          type: 'error'
			        });
					return
				};
				this.deleteCouponAPI(this.deleteLists);
			},
			//删除优惠券接口
			deleteCouponAPI(list) {
				this.deleBox(list);
			},
			//删除优惠券列表弹框
			deleBox(list){
				this.$confirm('你是否确定删除该优惠券', '温馨提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				}).then(() => {
					this.delCoupon(list)					
				}).catch((error) => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			//删除优惠券API
			delCoupon(list) {
				deleteCouponList(list)
					.then(({data}) => {											
						this.searchMethods(this.couponList);
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
					})
					.catch(({response: {data}})=>{
						 this.$message.error(data.errorcmt);
					})	
			},
			//单个删除
			onlyDele(index){
				let shop_id = this.$store.getters.getShop_id;
				var deleCoupon={
					shop_id,
					data:[
						{shop_coupon_id:this.couponTable[index].id}
					]
				};
				this.deleBox(deleCoupon)
			}
		}
	}
</script>

<style scoped="scoped">

</style>
<style>
	.marketing .el-input {
		font-size: 12px;
	}
	
	.marketing .el-form-item__label {
		width: 100px;
		text-align: right;
		color: #333;
		font-size: 14px;
		letter-spacing: 0;
	}
	
	.marketing .el-form-item.is-required .el-form-item__label:before {
		content: "";
		margin-right: 0;
	}
	
	.marketing .el-input__inner {
		height: 32px;
		line-height: 32px;
	}
	
	.marketing .el-form-item__error {
		margin-left: 100px;
	}
	
	.marketing .el-table__body,
	.marketing .el-table__footer,
	.marketing .el-table__header {
		table-layout: auto
	}
	
	.marketing .el-table tr th:nth-child(3),
	.marketing .el-table tr th:nth-child(4),
	.marketing .el-table tr th:nth-child(5),
	.marketing .el-table tr th:nth-child(6),
	.marketing .el-table tr th:nth-child(7) {
		width: 10%;
	}
	
	.marketing .el-table tr th:nth-child(2) {
		width: 15%;
	}
	
	.marketing .el-table tr th:nth-child(1) {
		width: 5%;
	}
	
	.marketing .el-table tr th:nth-child(8) {
		width: 20%;
	}
	
	.marketing .el-table tr th:nth-child(9) {
		width: 10%;
	}
	
	.marketing .el-table tr td:nth-child(3),
	.marketing .el-table tr td:nth-child(4),
	.marketing .el-table tr td:nth-child(5),
	.marketing .el-table tr td:nth-child(6),
	.marketing .el-table tr td:nth-child(7) {
		width: 10%;
	}
	
	.marketing .el-table tr td:nth-child(2) {
		width: 15%;
	}
	
	.marketing .el-table tr td:nth-child(1) {
		width: 5%;
	}
	
	.marketing .el-table tr td:nth-child(8) {
		width: 20%;
	}
	
	.marketing .el-table tr td:nth-child(9) {
		width: 10%;
	}
</style>