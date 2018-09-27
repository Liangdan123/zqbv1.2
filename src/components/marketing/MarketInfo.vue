<template>
  <div class="mallSetInfo">
    <div class="NavbarOrder" :hidden="!isShow">
      <el-menu :router="true" mode="horizontal" class="clearfix" @select="handleSelect">
        <el-menu-item index="MemberCenter" :class="{active:selected=='MemberCenter'}">
          会员中心
        </el-menu-item>
        <el-menu-item index="RoleDep" :class="{active:selected=='RoleDep'}">
          角色发展
        </el-menu-item>
        <el-menu-item index="cpsUrl" :class="{active:selected=='cpsUrl'}">
          注册链接
        </el-menu-item>
      </el-menu>
    </div>
    <div class="info_content clearfix" v-if="!isShow">
      <router-link to='MemberCenter' class="item-1 item-list fl" append>
        <div>
          <i class="iconfont icon-huiyuanzhongxin"></i>
          <span>会员中心</span>
        </div>
        <p>
          <i class="iconfont icon-huiyuanzhongxin" style="font-size: 110px;"></i>
        </p>
      </router-link>
      <router-link   to='RoleDep' class="item-2 item-list fl" append>
        <div>
          <i class="iconfont icon-huiyuanzhongxin"></i>
          <span>角色发展</span>
        </div>
        <p>
          <i class="iconfont icon-huiyuanzhongxin" style="font-size: 110px;"></i>
        </p>
      </router-link>
      <router-link  to='cpsUrl' class="item-3 item-list fl" append>
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
