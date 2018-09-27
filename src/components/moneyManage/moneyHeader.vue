<template>
  <div>
    <div class="wrap">
      <el-row :gutter="20">
        <el-col :span="span">
          <div class="statisticsItem">
            <p class="itemTitle">订单累计收入</p>
            <p class="money-total">{{mallMoneyStatistics.total_give_order_yuan|money}}</p>
            <p class="money-history">今日收入
              <span>{{mallMoneyStatistics.today_give_order_yuan | money}}</span>
            </p>
            <svg class="item-label" width="48" height="48">
              <use xlink:href="#payOrder" />
            </svg>
          </div>
        </el-col>
        <el-col :span="span">
          <div class="statisticsItem">
            <p class="itemTitle">会员发展累计收入</p>
            <p class="money-total">	{{mallMoneyStatistics.total_give_member_yuan|money}}</p>
            <p class="money-history">今日收入
              <span>{{mallMoneyStatistics.today_give_member_yuan | money}}</span>
            </p>
            <svg class="item-label" width="48" height="48">
              <use xlink:href="#money" />
            </svg>
          </div>
        </el-col>
        <el-col :span="span"  v-if="type==1||type==2">
          <div class="statisticsItem">
            <p class="itemTitle">角色发展累计收入</p>
            <p class="money-total">{{mallMoneyStatistics.total_give_join_yuan | money}}</p>
            <p class="money-history">今日收入
              <span>{{mallMoneyStatistics.today_give_join_yuan | money}}</span>
            </p>
            <svg class="item-label" width="48" height="48">
              <use xlink:href="#visitNum" />
            </svg>
          </div>
        </el-col>
        <el-col :span="span" >
          <div class="statisticsItem">
            <p class="itemTitle">可提现金额</p>
            <p class="money-total">{{fundBalance.balance_yuan|money}}</p>
            <p class="f14 mt-10 money-history">
						<span  @click="Viewlog" class='u-btn'>提现记录</span>
						<el-button class="store-button1 float-r" @click="applyFund">
                <i class="iconfont icon-Rectangle f12"></i>
							申请提现
						</el-button>
					</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import {getFundTotalGive} from "@/api/platform"
  import {getAccountInfo} from "@/api/servicer"
  export default {
    data () {
      return {
        span:8,
        type:null,
        mallMoneyStatistics:{
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
      }
    },
    props:[],
    created(){
      //判断传进来头部有几个模块 合伙人2个 代理商3个  服务商2个  平台4个
      this.type=this.$store.getters.getType; //1平台,2代理商,3合伙人,4服务商\
      this.type=3;
      this.span=this.type==2?6:8//是平台就6 不是就8
			getFundTotalGive({compute_type:3})//获取累计收入
			.then(({data})=>{
				this.mallMoneyStatistics=data
      })
      	let user_id=this.$store.state.user.user.zhixu_id;
			getAccountInfo(user_id)
			.then(({data})=>{
				this.fundBalance=data
			})
    },
    filters: {
      money(value=0) {
        // 金额转换成数字和整数部分
        value = Number(value).toFixed(2).split('.');
        let value_int = Number(value[0]).toLocaleString(); // 转换成金额形式
        return `￥ ${value_int}.${value[1]}`;
      }
    },
    methods: {
      Viewlog(){
        this.$emit('Viewlog')
      },
      applyFund(){
        this.$emit('applyFund')
      }
    }
  }

</script>

<style lang="scss" scoped>
  .wrap {
    padding: 85px 20px 0 20px;
    margin: 0 auto;
    width: 1280px;
    box-sizing: border-box;
  }

  .statisticsItem {
    position: relative;
    padding: 20px 20px 0 20px;
    background: #FFF;
    font-size: $font-title;
    overflow: hidden;
    .itemTitle {
      margin-bottom: 10px;
      font-size: 14px;
      color: $color-base;
      line-height: 1;
    }
    .money-total {
      margin-top: 10px;
      padding-bottom: 20px;
      font-size: $font-title;
      font-weight: 700;
      line-height: 1;
      color: $color-light;
      border-bottom: 1px solid #F0F4F7;
    }
    .money-history {
      margin: 20px 0;
      font-size: $font-normal;
      color: $color-base;
    }
    .item-label {
      position: absolute;
      top: 21px;
      right: 21px;
    }
    .item-bottom {
      display: table;
      margin: 13px 0;
      width: 100%;
      .money-history,
      .btn-apply {
        display: table-cell;
      }
    }
  }
</style>
