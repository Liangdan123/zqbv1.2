<template>
  <div class="mallSetInfo">
    <div class="NavbarOrder" :hidden="!isShow">
      <el-menu :router="true" mode="horizontal" class="clearfix" @select="handleSelect">
        <el-menu-item index="agentMemberCenter" :class="{active:selected=='agentMemberCenter'}">
          会员中心
        </el-menu-item>
        <el-menu-item index="agentRoleDep" :class="{active:selected=='agentRoleDep'}">
          角色发展
        </el-menu-item>
        <el-menu-item index="agentUrl" :class="{active:selected=='agentUrl'}">
          注册链接
        </el-menu-item>
      </el-menu>
    </div>
    <div class="info_content clearfix" v-if="!isShow">
      <router-link :to="{name:'agentMemberCenter'}" class="item-1 item-list fl">
        <div>
          <i class="iconfont icon-huiyuanzhongxin"></i>
          <span>会员中心</span>
        </div>
        <p>
          <i class="iconfont icon-huiyuanzhongxin" style="font-size: 110px;"></i>
        </p>
      </router-link>
      <router-link :to="{name:'agentRoleDep'}" class="item-2 item-list fl">
        <div>
          <i class="iconfont icon-huiyuanzhongxin"></i>
          <span>角色发展</span>
        </div>
        <p>
          <i class="iconfont icon-huiyuanzhongxin" style="font-size: 110px;"></i>
        </p>
      </router-link>
      <router-link :to="{name:'agentUrl'}" class="item-3 item-list fl">
        <div>
          <i class="iconfont icon-zhucelianjie"></i>
          <span>注册链接</span>
        </div>
        <p>
          <i class="iconfont icon-zhucelianjie" style="font-size: 110px;"></i>
        </p>
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

  import navbar from "@/utils/navbar"
  export default {
    name: "mallMarkrtInfo",
    mixins: [navbar],
    data() {
      return {}
    },
    computed: {
      isShow() {
        let path = this.$route.fullPath;
        let arr = path.trim().split("/");
        return arr.length === 4 ? true : false;
      }
    }
  }
</script>
