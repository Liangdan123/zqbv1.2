<template>
	<div class="fundManage">
		<!--..............提现记录弹窗...........-->
		<el-dialog  :visible.sync="cashRecordModel"  
			:close-on-click-modal="false" 
			class="withdraw" 
			title="提现记录"
			@close="closeModel">
	    	<widthDrawTable 	    		
	    		:Visible="model"
	    		:typeKey="4"
	    		:user_id="user_id"
	    		@backDetail="backDetail"
	    		@checkDetail="checkDetail"
	    		@sureFund="sureFund">
	    		
	    	</widthDrawTable>
	    </el-dialog>
		
		<!--................累计金额.............-->
		<div class="count clearfix" v-loading="loadTotal">
			<div class="plate bg-f mr-20 ">
				<div class="border-b clearfix">
					<div class="float-l mb-10">
						<span class="color-7F f14">订单消费累计收入</span>
						<p class="color-3 font-b f24 mt-10">
							{{total.total_sell_order_yuan||0|money}}
						</p>
					</div>
					<svg width="48" height="48" class="float-r">
						<use xlink:href="#money"/>
					</svg>													
				</div>
				<div>
					<p class="color-7F f14 mt-10">
						今日收入
						<span class="color-3">{{total.today_sell_order_yuan||0|money}}</span>
					</p>
				</div>
			</div>
			<div class="plate bg-f mr-20">
				<div class="border-b clearfix">
					<div class="float-l mb-10">
						<span class="color-7F f14">订单佣金累计收入</span>
						<p class="color-3 font-b f24 mt-10">{{total.total_give_order_yuan||0|money}}</p>																
					</div>
					<svg width="48" height="48" class="float-r"><use xlink:href="#payOrder"/></svg>													
				</div>
				<div>
					<p class="color-7F f14 mt-10">
						今日收入
						<span class="color-3">{{total.today_give_order_yuan||0|money}}</span>
					</p>
				</div>
			</div>
			<div class="plate bg-f mr-20">
				<div class="border-b clearfix">
					<div class="float-l mb-10">
						<span class="color-7F f14">会员发展累计收入</span>
						<p class="color-3 font-b f24 mt-10">
							{{total.total_give_member_yuan||0|money}}
						</p>
					</div>
					<svg width="48" height="48" class="float-r"><use xlink:href="#member"/></svg>													
				</div>
				<div>
					<p class="color-7F f14 mt-10">
						今日收入
						<span class="color-3">{{total.today_give_member_yuan||0|money}}</span>
					</p>
				</div>					
			</div>
			<div class="plate bg-f">
				<div class="border-b clearfix">
					<div class="float-l mb-10">
						<span class="color-7F f14">可提现金额</span>
						<p class="color-3 font-b f24 mt-10">	
							{{fundBalance.balance_yuan||0|money}}
						</p>
					</div>
					<svg width="48" height="48" class="float-r">
						<use xlink:href="#visitNum"  />
					</svg>
				</div>
				<div>
					<p class="color-7F f14 mt-10">
						<b @click="cashRecord" class="cashRecord">提现记录</b>
						<el-button class="store-button1 float-r" @click="applyFund">
							申请提现
						</el-button>
					</p>
				</div>	
			</div>
		</div>	
		<!-- 表格部分 -->
		<div class="g-content mt-20">
			<el-tabs v-model="activeName" @tab-click="tabSwitch">
		        <el-tab-pane label="订单消费收入" name="1"></el-tab-pane>
		        <el-tab-pane label="订单佣金收入" name="2"></el-tab-pane>
		        <el-tab-pane label="会员收入" name="3"></el-tab-pane>
		    </el-tabs>
		    <!-- 会员管理表格 数据父组件提供 -->
		    <div class="buttons clearfix mb-20">
			   	<orderConsume v-if="activeName==1" :user_id="user_id">
			   		
			   	</orderConsume>
			   	<platformOrderFund :user_id="user_id" 
			   		:isArea="false" 
			   		typeKey="4" 
			   		:isNature="true"
			   		v-if="activeName==2"> 
			   					   		
			   	</platformOrderFund>
			    <memberDetailed :user_id="user_id" 
			    	:isPhone="false"
			    	v-if="activeName==3" 
			    	:memberLevel="false" 
			    	:typeKey="4"
			    	:isSearch='true' 
			    	:isContact="true" 
			    	:isCpsType="false">
					    	
			    </memberDetailed>
		    </div>
		</div>
	</div>
</template>

<script>
	import {getFundTotalGive} from "@/api/platform"
	import {getAccountInfo} from "@/api/servicer"
	export default{
		filters:{
            money(value=0,label=''){
                // 金额转换成数字和整数部分
                value = Number(value).toFixed(2).split('.');
                let value_int = Number(value[0]).toLocaleString();// 转换成金额形式
                return `${label} ${value_int}.${value[1]}`;
            },
        },
        components:{
        	"widthDrawTable":()=>import("@/components/moneyManage/widthDrawTable"),
			"orderConsume":()=>import("@/components/servicer/fund/orderConsume"),
        	"platformOrderFund":()=>import("@/components/platform/fund/platformOrderFund"),
        	"memberDetailed":()=>import("@/components/platform/fund/memberDetailed")
        },
		data(){
			return{
				total:{
				    "total_give_order_yuan": 0,
				    "total_give_member_yuan": 0,
				    "total_give_join_yuan": 0,
				    "today_give_order_yuan": 0,
				    "today_give_member_yuan": 0,
				    "today_give_join_yuan": 0,
				    "total_sell_order_yuan":0,
				    "today_sell_order_yuan":0
				},
				fundBalance:{
					"balance": 0,
					"balance_yuan":0,
					"tixian_rate": 0
				},
				loadTotal:false,
				cashRecordModel:false,
				list:{data:[]},
				model:true,//控制提现记录
				activeName: '1',
				user_id:"",
			}
		},
		created(){
			let compute_type={compute_type:3}
			getFundTotalGive(compute_type)//获取累计收入
			.then(({data})=>{
				this.total=data
			});
			this.user_id=this.$store.state.user.user.zhixu_id;
			getAccountInfo(this.user_id)//获取账户信息
			.then(({data})=>{
				this.fundBalance=data
			})

		},
		methods:{
			applyFund(){//申请提现按钮
				this.$router.push("fundManage/withdrawalapply")
			},
			closeModel(){
				this.model=true;
			},
			checkDetail(){
				this.model=false;
			},
			backDetail(){
				this.model=true;
			},
			sureFund(){
				this._list();
			},
			cashRecord(){
				this._list();
			},
			_list(){
				let user_id={
					user_id:this.user_id,
					search:{
						type:4
					},
					page: 1,
    				per_page:20
				};
				this.cashRecordModel=true
				this.model=true;
			},
			tabSwitch(){//表格切换
				
			}
		}
	}
</script>

<style lang="scss">
	.fundManage{
		margin-top: 80px;
		.count{
			width: 1240px;
			margin-left: auto;
			margin-right: auto;
			margin-top: 20px;
			.plate{
				float: left;
				padding: 20px;
				width: 255px;
				height: 102px;
				border-radius: 2px;
				.cashRecord{
					font-weight: normal;
					color: #007DE3;
					cursor: pointer;
				}
			}
		}
	}
</style>