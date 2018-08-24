<template>
  <div class="commodity">
    <div class="g-content">
      <url :urlArr='urlArr' v-loading="show"></url>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        urlArr:[],
        show:true
      }
    },
    created () {
      //请求代理商的链接给urlArr赋值
        let data = {
          "type": 2,
          "member_cps_url": "http://zqb.71baomu.com/reg/member?cps_id=1",
          "role_cps_url": "http://zqb.71baomu.com/reg/role?cps_id=1"
        };
        this.urlArr = [{
          "type": "角色发展链接",
          'url': data.role_cps_url
        }, {
          "type": "会员发展链接",
          'url': data.member_cps_url
        }];
        this.show=false;
    }
  };
</script>

