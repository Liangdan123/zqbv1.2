<template>
  <div class="specialAd">
    <div class="warp">
      <el-tabs v-model="activeName">
        <el-tab-pane label="广告设置" name="1">
        </el-tab-pane>
        <el-tab-pane label="添加广告" name="2">
        </el-tab-pane>
        <el-tab-pane label="广告数据" name="3">
        </el-tab-pane>
        <setAd v-if='activeName==1' class='g-content'></setAd>
        <addAd v-if='activeName==2'></addAd>
        <tableAd v-if='activeName==3' class='g-content'></tableAd>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
      "tableAd": () => import('@/components/platform/marketing/tableAd'),
      "setAd": () => import('@/components/platform/marketing/setAd'),
      "addAd": () => import('@/components/platform/marketing/addAd'),
    },
    data() {
      return {
        activeName: "2",
      }
    },
  }

</script>

<style lang="scss" scoped>
  .specialAd {
    margin-top: 120px;
  }

  .warp {
    width: 1240px;
    margin: 120px auto 0;
  }

</style>
