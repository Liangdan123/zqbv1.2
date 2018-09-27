<template>
  <div>
    <div class="wrap">
      <el-row :gutter="20">
        <el-col :span="span">
          <div class="statisticsItem">
            <p class="itemTitle">订单累计收入</p>
            <p class="money-total">{{2000 | money}}</p>
            <p class="money-history">今日收入
              <span>{{4| money}}</span>
              <span class="float-r u-btn" v-if="type!=1" @click="Viewlog">提现记录</span>
            </p>
            <svg class="item-label" width="48" height="48">
              <use xlink:href="#payOrder" />
            </svg>
          </div>
        </el-col>
        <el-col :span="span">
          <div class="statisticsItem">
            <p class="itemTitle">会员发展累计收入</p>
            <p class="money-total">{{100 | money}}</p>
            <p class="money-history">今日收入
              <span>{{3| money}}</span>
               <span class="float-r u-btn" v-if="type!=1" @click="Viewlog">提现记录</span>
            </p>
            <svg class="item-label" width="48" height="48">
              <use xlink:href="#money" />
            </svg>
          </div>
        </el-col>
        <el-col :span="span"  v-if="type==1||type==2">
          <div class="statisticsItem">
            <p class="itemTitle">角色发展累计收入</p>
            <p class="money-total">{{33.33 | money}}</p>
            <p class="money-history">今日收入
              <span>{{6| money}}</span>
              <span class="float-r u-btn" v-if="type!=1" @click="Viewlog">提现记录</span>
            </p>
            <svg class="item-label" width="48" height="48">
              <use xlink:href="#visitNum" />
            </svg>
          </div>
        </el-col>
        <el-col :span="span" >
          <div class="statisticsItem">
            <p class="itemTitle">平台累计收入</p>
            <p class="money-total">{{33.33 | money}}</p>
            <p class="money-history">今日收入
              <span>{{6| money}}</span>
            </p>
            <svg class="item-label" width="48" height="48">
              <use xlink:href="#member" />
            </svg>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        span:8,
        type:null
      }
    },
    props:[],
    created(){
      //判断传进来头部有几个模块 合伙人2个 代理商3个  服务商2个  平台4个
      this.type=this.$store.getters.getType; //1平台,2代理商,3合伙人,4服务商\
      this.type=2;
      this.span=this.type==2?6:8//是平台就6 不是就8
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
      span:first-child {
        color: $color-light;
      }
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
