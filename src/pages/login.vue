<template>
<div class="login pos-a  pos-all">
  <div class="login-con pos-a">
		<img src="../assets/image/login.png" alt="">
    <!--...................注册登录........................-->
    <el-col class="login-box">
      <router-view>
      </router-view>
    </el-col>
  </div>
</div>
</template>

<script>
import register from "@/pages/loginPage/register";
import router from "@/router";
export default {
  name: "login",
  data() {
    return {};
  },
  components:{register}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.login {
  width: 100%;
  margin: 0 auto;
  > img {
    width: 100%;
    height: 100%;
  }
  .login-con {
    width: 800px;
    height: 380px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0px 8px 20px 0px rgba(182, 215, 255, 1);
    > img {
      float: left;
    }
    .login-box {
      width: 400px;
      height: 100%;
      padding: 50px;
      background: #fff;
    }
  }
}
</style>
