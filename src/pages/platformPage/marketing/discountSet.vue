<template>
	<div class="discountSet">
		<div class="g-content">
			<div class="gift clearfix">
				<span class="gift-txt">1.赠送金额，按购买金额放大相应的倍数</span>
				<el-button  
					v-if="fundTableVis"
					@click="setFund" 
					class="store-button1 gift-btn">设置</el-button>
				<el-button 
					v-if="!fundTableVis" 
					@click="existFund" 
					class="store-button1 gift-btn"
					>保存</el-button>
			</div>
			<!--..............赠送金额表格....................-->
			<div v-loading="oneLoading">
				<div v-show="fundTableVis" >
					<el-table :data="donation">
						<el-table-column prop="name" label="赠送金额" width="350px">
						</el-table-column>
						<el-table-column prop="num" label="倍数" width="853px">
						</el-table-column>
					</el-table>
				</div>
				<div v-show="!fundTableVis">
					<el-table :data="donation">
						<el-table-column prop="name" label="赠送金额" width="350px">
						</el-table-column>
						<el-table-column  label="倍数" width="853px">
							<template slot-scope="scope">
								<el-input v-model.number.trim="scope.row.num"></el-input>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
			<div class="gift clearfix mt-20">
				<span class="gift-txt">2.抵扣金额，按百分比设置</span>
			</div>
			<!--..............抵扣金额表格....................-->
			<div v-loading="twoLoading">
				<div v-show="fundTableVis" >
					<el-table :data="deductible">
						<el-table-column prop="name" label="名称" width="350px">
						</el-table-column>
						<el-table-column prop="num" label="比例(%)" width="853px">
						</el-table-column>
					</el-table>
				</div>
				<div v-show="!fundTableVis" >
					<el-table :data="deductible">
						<el-table-column prop="name" label="名称" width="350px">
						</el-table-column>
						<el-table-column  label="倍数" width="853px">
							<template slot-scope="scope">
								<el-input v-model.number.trim="scope.row.num"></el-input>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { getCouponConfig,existCouponConfig} from "@/api/platform"

	export default {
		data() {
			return {
				oneLoading: true,
				twoLoading:true,
				discoutData: {},
				fundTableVis: true,
				donation:[],//赠送金额表格数据(保存数据时)
				deductible:[],//抵扣金额表格数据(保存数据时)
				order_bei:{},
				diamond_bei:{},
				gold_bei:{},
				deduct_rate:{},
				existFundMess:{},//最后保存的信息
			}
		},
		created() {
			this.CouponConfig();
		},
		methods:{
			CouponConfig(){//获取金额API
				getCouponConfig()
				.then(({data}) => {
					this.oneLoading=false;
					this.twoLoading=false;
					this.discoutData = data;
					this.donation=[//赠送金额表格数据
						{
							name:"订单消费",
							num:data.order_bei
						},{
							name:"购买钻石会员",
							num:data.diamond_bei							
						},{
							name:"购买黄金会员",
							num:data.gold_bei								
						}
					];
					this.deductible=[//抵扣金额表格数据
						{
							name:"抵扣金额",
							num:data.deduct_rate
						}
					]
				})
				.catch(({reponse: {data}}) => {																				
					this.$message.error(data.errorcmt);
				})
			},
			setFund(){//设置按钮
				this.fundTableVis=false;				
			},
			existFund(){//保存按钮
				this.donation.forEach((item)=>{
					switch(true){
						case item.name==="订单消费":
							this.order_bei={order_bei:item.num}
							break;
						case item.name==="购买钻石会员":
							this.diamond_bei={diamond_bei:item.num}
							break;
						case item.name==="购买黄金会员":
							this.gold_bei={gold_bei:item.num}
							break;
					}
				});
				this.deduct_rate={deduct_rate:this.deductible[0].num};			
				this.existFundMess=Object.assign({},this.existFundMess,this.order_bei,this.diamond_bei,this.gold_bei,this.deduct_rate);
				this.existFundConfig(this.existFundMess);		
			},
			existFundConfig(data){//保存优惠券配置API
				console.log("data:",data)
				existCouponConfig(data)
				.then(({})=>{
			        this.$message({
			        	message: '保存成功',
			        	type: 'success',
			        	showClose:true
			        });
					this.fundTableVis=true;
					this.CouponConfig();
				})
				.catch(({reponse: {data}}) => {																				
					this.$message.error(data.errorcmt);
				})
			}
		},


	}
</script>

<style lang="scss">
	.discountSet {
		>.g-content {
			margin-top: 120px;
			.gift {
				.gift-txt {
					float: left;
					color: #333;
					font-size: 12px;
					font-weight: bold;
					line-height: 32px;
				}
				.gift-btn {
					float: right;
					margin-bottom: 4px;
				}
			}
			.el-table{
				.el-input__inner{
					width: 235px;
					height: 24px;
				}
			}
		}
	}
</style>