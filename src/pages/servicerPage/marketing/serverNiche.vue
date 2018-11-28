<template>
  <div class="serverNiche">
    <div class="g-content">
      <el-tabs v-model="activeName">
        <el-tab-pane label="广告设置" name="1">
          <setAd :activeName="activeName" :isDistribution="false"></setAd>
        </el-tab-pane>
        <el-tab-pane label="添加广告" name="2">
        </el-tab-pane>
        <el-tab-pane label="广告数据" name="3">
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import setAd from "@/components/platform/marketing/setAd"
  export default {
    components: {
      setAd
    },
    data() {
      return {
        activeName: "1",
      }
    },
  }

</script>

<style lang="scss">
  .serverNiche {
    margin-top: 120px;
  }

</style>
