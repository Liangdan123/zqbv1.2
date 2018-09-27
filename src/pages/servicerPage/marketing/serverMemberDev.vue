<template>
  <div class="serverMemberDev">
    <div class="g-content">
      <url name="会员充值链接" :urlArr="urlArr"></url>
    </div>
  </div>
</template>

<script>
  import {
    getRoleCPS
  } from "@/api/platform"
  export default {
    data() {
      return {
        urlArr: [],
      }
    },
    created() {
      let user_id = {
        user_id: this.$store.state.user.user.zhixu_id
      };
      getRoleCPS(user_id)
        .then(({
          data
        }) => {
          this.urlArr = [{
            "type": "会员发展链接",
            'url': data.member_cps_url
          }]
        })
        .catch(({
          response: {
            data
          }
        }) => {
          this.$message.error(data.errorcmt);
        })
    }
  }

</script>

<style lang="scss">
  .serverMemberDev {
    margin-top: 120px;
  }

</style>
