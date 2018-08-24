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
      还没有账号？<router-link to="sfz" class="color-main f14">立即注册</router-link>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {
    accountInfo,
    getRegisterMess,
    weixin,
    getPhoneNum,
  } from "@/api/login";
  import router from "@/router";
  export default {
    data() {
      return {
        unregistered: false,
        warn: false,
        errmsg: {
          401: "请输入正确的手机号",
          402: "请输入你的密码"
        },
        msg: "",
        disabled: false,
        verify_code: "",
        login_name: "",
        activeName: "2",
        password: "",
        time: 0
      };
    },
    methods: {
      verify() {
        this.warn = false;
        var patt1 = /^[1][3,4,5,7,8][0-9]{9}$/;
        switch (true) {
          case this.login_name == "":
            this.warn = true;
            this.msg = this.errmsg[401];
            break;
          case !patt1.test(this.login_name):
            this.warn = true;
            this.msg = "请输入正确的手机号";
            break;
          case patt1.test(this.login_name):
            getPhoneNum(this.login_name).then(({
              data
            }) => {
              if (data.status != 3) {
                this.unregistered = true;
              } else {
                this.unregistered = false;
              }
            });
        }
      },
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
          case this.unregistered == false:
            accountInfo({login_name:this.login_name,password:this.password})
              //与后台交成功时的操作
              .then(({
                data
              }) => {
                this.doLogin(data);
              })
              .catch(({
                response: {
                  data
                }
              }) => {
                //与后台交互时出现的错误信息
                this.warn = true;
                this.msg = data.errorcmt;
              });
            break;
          case this.unregistered == true:
            if (this.verify_code == "") {
              this.warn = true;
              this.msg = "请输出验证码";
              return;
            }
            getRegisterMess(this.login_name, this.verify_code, this.password)
              //与后台交成功时的操作
              .then(data => {
                this.warn = true;
                this.doLogin(data);
              })
              .catch(({
                response: {
                  data
                }
              }) => {
                //与后台交互时出现的错误信息
                this.warn = true;
                this.msg = data.errorcmt;
              });
            break;
        }
      },
      sentCode() {
        //点击发送验证码
        this.msg = "";
        this.warn = false;
      },
      timer() {
        //60s
        if (this.time > 0) {
          this.time--;
          setTimeout(this.timer, 1000);
        }
      },
      doLogin(data) {
        //登陆成功时执行的函数
        console.log(1111111111)
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
