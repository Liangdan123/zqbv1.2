<template>
  <div class="zxh">
    <div class="navbar">
      <div class="navbar-left display clearfix">
        <svg width="30" height="30">
          <use xlink:href="#logo" />
        </svg>
        <img src="../../assets/image/agent.png" />
      </div>
      <el-menu :default-active='$route.path' :router="true" mode="horizontal">
        <el-menu-item index="/agent/agentOrder":class="{isActive:active=='agentOrder'}">
          <i></i>订单管理</el-menu-item>
        <el-menu-item index="/agent/marketInfo" :class="{isActive:active=='marketInfo'}">
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
        <router-view></router-view>
      </transition>
    </el-row>
    <!--....只是单纯让change_my_store起作用...-->
    <div v-show="hide">{{change_my_store}}</div>
  </div>
</template>

<script>
  import navbar from "@/utils/navbar"
  export default {
    mixins: [navbar],
    computed: {
      change_my_store() {
        var path = this.$route.fullPath;
        var arr = path.trim().split("/");
        if (arr.length != 0 && arr[1] != "agent") {
          return
        }
        return this.active = arr[2]
      }
    }
  }

</script>
