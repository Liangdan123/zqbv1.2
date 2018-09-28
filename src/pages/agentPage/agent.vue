<template>
  <div class="zxh">
    <div class="navbar">
      <div class="navbar-left display clearfix">
        <svg width="30" height="30">
          <use xlink:href="#logo" />
        </svg>
        <img src="../../assets/image/agent.png" class='logo'/>
      </div>
      <el-menu :default-active='$route.path' :router="true" mode="horizontal">
        <el-menu-item index="/agent/orderTable" :class="{isActive:active=='orderTable'}">
          <i></i>订单管理</el-menu-item>
        <el-menu-item index="/agent/MarketInfo" :class="{isActive:active=='MarketInfo'}">
          <i></i>营销管理</el-menu-item>
        <el-menu-item index="/agent/agentMoney" :class="{isActive:active=='agentMoney'}">
          <i></i>资金管理
        </el-menu-item>
      </el-menu>
      <div class="cont-navbar-right clearfix">
        <div class="navbar-right">
          <i class="iconfont icon-OvalCopy heard"></i>
        </div>
        <div class="pos-a loginOut">
          <div class="clearfix pb-20 plate">
            <div class="hearder float-l">
              <i class="iconfont icon-OvalCopy"></i>
            </div>
            <div class="float-l f14 color-3 ml-10 userName">{{userName||email}}</div>
          </div>
          <div class="exitLogon cursor" @click="loginOut">
            <div class="clearfix hoverBg">
              <i class="iconfont icon-shanchu1 float-l"></i>
              <span class="float-l f14 color-3">退出登录</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-row class="clearfix">
      <transition name="el-fade-in" mode="out-in">
        <router-view v-if="ispay"></router-view>
        <div v-else class='commodity'>
          <div class='saoma text-c'>
            <p class='title'>欢迎您！成功加入证企宝平台的代理商，还差一步就成功了！</p>
            <p class='color-7F mb-20'>扫码付款，请使用微信扫一扫，进行付款</p>
            <p class='price mb-10'>￥{{pay_fee_yuan}}</p>
            <p id="qrcode" class='qrcode '></p>
            <p class='btn' @click='done(true)'>完成支付</p>
          </div>
        </div>
      </transition>
    </el-row>
    <!--....只是单纯让change_my_store起作用...-->
    <div v-show="hide">{{change_my_store}}</div>
  </div>
</template>

<script>
  import navbar from "@/utils/navbar"
  import QRCode from 'qrcodejs2'
  import {
    roleIsPay,
    prepay
  } from "@/api/agent"
  export default {
    mixins: [navbar],
    data() {
      return {
        ispay: true,
        code_url: "",
        pay_fee_yuan: 0,
        qrcode:null
      }
    },
    computed: {
      change_my_store() {
        var path = this.$route.fullPath;
        var arr = path.trim().split("/");
        if (arr.length != 0 && arr[1] != "agent") {
          return;
        }
        if(!this.ispay){
          this.done()
        }
        return this.active = arr[2]
      },
    },
    methods: {
      newqrcode() {
        if(this.qrcode){
          this.qrcode.clear();
          this.qrcode.makeCode(this.code_url)
        }else{
          this.qrcode = new QRCode('qrcode', {
          width: 160,
          height: 160, // 高度       
          text: this.code_url, // 二维码内容        
          render: 'canvas',
          background: '#f0f',
          foreground: '#ff0'
        })
        }
      },
      done(click=false){
         roleIsPay().then(({
          data
        }) => {
          this.ispay = data.is_pay == 1;
          if (data.is_pay == 0) {
            click&&this.$message.error("未支付成功")
            prepay().then(({
              data
            }) => {
              this.code_url = data.code_url;
              this.pay_fee_yuan = data.pay_fee_yuan;
              this.newqrcode()
            })
          }
        })
      }
    }
  }

</script>

<style lang="scss" scoped>
.logo{
  width:50%;
}
  .saoma {
    width: 757px;
    min-height: 479px;
    background-color: #fff;
    border: 1px solid #F4F4F4;
    margin: 0 auto;
    padding: 54px 0;
  }

  .title {
    font-size: 18px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 25px;
  }

  .price {
    font-size: 30px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 42px;
  }

  .qrcode {
    display: inline-block;
  }

  .btn {
    width: 200px;
    height: 40px;
    background: rgba(0, 112, 201, 1);
    border-radius: 2px;
    cursor: pointer;
    display: block;
    margin: 40px auto 0;
    line-height: 40px;
    color:#fff;
    font-size: 14px;
  }

</style>
