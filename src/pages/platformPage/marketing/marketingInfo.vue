<template>
  <div class="mallSetInfo">
    <Navbar v-if="!isShow"></Navbar>
    <div class="info_content clearfix" v-if="isShow">
      <router-link :to="{name:'discountSet'}" class="item-1 item-list fl">
        <div>
          <i class="iconfont icon-dianpuyouhuiquan"></i>
          <span>优惠设置</span>
        </div>
        <p><i class="iconfont icon-dianpuyouhuiquan"></i></p>
      </router-link>
      <router-link :to="{name:'memberCenter'}" class="item-list item-2 fl">
        <div>
          <i class="iconfont icon-huiyuanzhongxin"></i>
          <span>会员中心</span>
        </div>
        <p><i class="iconfont icon-huiyuanzhongxin"></i></p>
      </router-link>
      <router-link :to="{name:'specialAd'}" class="item-list item-3 fl">
        <div>
          <i class="iconfont icon-guanggaozhongxin"></i>
          <span>广告中心</span>
        </div>
        <p><i class="iconfont icon-guanggaozhongxin"></i></p>
      </router-link>
      <router-link :to="{name:'specialAd'}" class="item-list item-4 fl">
        <div>
          <i class="iconfont icon-guanggaozhongxin"></i>
          <span>需求列表</span>
        </div>
        <p><i class="iconfont icon-guanggaozhongxin"></i></p>
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import Navbar from "@/components/platform/marketing/Navbar"
  export default {
    name: "mallSetInfo",
    data() {
      return {}
    },
    computed: {
      isShow() {
        let path = this.$route.fullPath;
        let arr = path.trim().split("/");
        return arr.length === 3 ? true : false
      }
    },
    components: {
      Navbar
    }
  }

</script>

<style>

</style>
