<template>
  <div class="commodity">
    <div class="g-content">
      <url :urlArr='urlArr' v-loading="show"></url>
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
        urlArr:[],
        show:true
      }
    },
  created(){
			getRoleCPS(this.$store.state.user.user.zhixu_id)
			.then(({data})=>{
				  this.urlArr = [{
          "type": "角色发展链接",
          'url': data.role_cps_url
        }, {
          "type": "会员发展链接",
          'url': data.member_cps_url
        }];
        this.show=false;
			})
			.catch(({response: {data}})=>{
				 this.$message.error(data.errorcmt);
			})	
		}
  };
</script>

