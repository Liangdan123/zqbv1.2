<template>
  <div class="serverNiche">
      <tableAd  class='g-content' :isDistribution='false'></tableAd>
  </div>
</template>

<script>
  import tableAd from "@/components/platform/marketing/tableAd"
  export default {
    components: {
      tableAd
    },
  }

</script>

<style lang="scss">
  .serverNiche {
    margin-top: 120px;
  }

</style>
