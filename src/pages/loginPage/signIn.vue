<template lang="html">
  <div class="box">
    <div class="text-c"><span class="label">登录</span></div>
    <input v-model.trim="login_name" placeholder="请输入手机号" class="w-100  border-b mt-30" />
    <div class="border-b ">
      <input type="password" placeholder="请输入密码" v-model.trim="password" />
      <router-link to="reset" class="float-r cursor forget">忘记密码</router-link>
    </div>
    <div class="display-n" :class="{error:warn}">{{msg}}</div>
    <div>
      <el-button class=" btn mr-20 f14" @click="login"> 登 录 </el-button>
      	还没有账号？
      <router-link to="register" class="color-main f14">立即注册</router-link>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {getUserMess} from "@/api/servicer"
  import {accountInfo} from "@/api/login";       
  import router from "@/router";
  export default {
    data() {
      return {
        warn: false,
        errmsg: {
          401: "请输入正确的手机号",
          402: "请输入你的密码"
        },
        msg: "",
        login_name: "",
        password: "",
      };
    },
    methods: {
      login() {
        this.msg = "";
        this.warn = false;
        var patt1 = /^[1][3,4,5,7,8][0-9]{9}$/;
        switch (true) {
          //点击登陆用户账号和密码为空时弹出的信息
          //15657935526
          case this.login_name == "" || !patt1.test(this.login_name):
            this.warn = true;
            this.msg = this.errmsg[401];
            break;
          case this.password == "":
            this.warn = true;
            this.msg = this.errmsg[402];
            break;
          case this.password.length < 6:
            this.warn = true;
            this.msg = "密码至少6位数字母或者数字组合";
            break;
         default:
            accountInfo({login_name:this.login_name,password:this.password})
              //与后台交成功时的操作
              .then(({data}) => {                             
                this.doLogin(data);
              })
              .catch(({ response: {data}}) => {                         
                //与后台交互时出现的错误信息
                this.warn = true;
                this.msg = data.errorcmt;
              });
            break;
        }
      },
      doLogin(data) {
        //登陆成功时执行的函
        this.$store.dispatch("doLogin", data);            
      }
    },
    computed: {
      sentPhoneCode() {
        return this.time > 0 ? "重新发送(" + this.time + "s)" : "获取验证";
      }
    }
  };
</script>

<style lang="scss" scoped>
  .label {
    font-size: 20px;
    color: #333333;
  }
  .border-b {
    margin-bottom: 20px;
    border: 0;
    border-bottom: 1px solid #25A7FF;
    line-height: 40px;
    &:focus {
      outline: 0;
    }
    .forget {
      font-size: 16px;
      color: #25A7FF;
      display: inline-block;
    }
    input {
      border: 0;
      box-sizing: border-box;
      &:focus {
        outline: 0;
      }
    }
  }
  .btn {
    width: 140px;
    height: 40px;
    background: linear-gradient(-115.2deg, rgba(11, 184, 255, 1), rgba(0, 101, 255, 1));
    border-radius: 20px;
    color: #ffffff;
  }
  .error {
    display: inline-block;
    color: #ff0000;
    font-size: 14px;
    margin-bottom: 20px;
  }
</style>
