<template>
  <div class="login pos-r">
    <div v-show="isReset">
      <router-link to="/" class="f14 padding-n mb-20 color-main display-b float-r">
        <<返回登录
      </router-link> 
    </div>	 
    <div class="">
      <input type="text" placeholder="请输入手机号" 
      	v-model.trim="mobile_phone"
      	 @blur="verify" class="border-b w-100" />
      <div class="border-b">
        <input type="text" placeholder="手机验证码" v-model.trim="verify_code" />
        <el-button @click="sentCode" :disabled="disabled || time>0 " 
        	round plain class="sentCode disabled1 float-r">
        	{{sentPhoneCode}}
        </el-button>
      </div>
      <input type="password" placeholder="设置密码" 
      	v-model.trim="newPassword" class="border-b  
      	w-100" />
      <div class="display-n" :class="{error:warn}">
        {{msg}}
      </div>
      <el-button class="btn done mr-20 f14" @click="done"> 完成 </el-button>
      {{isReset?'还没有账号？':'已有账号'}}
      <router-link to="register" class="color-main f14 " v-if='isReset'>立即注册</router-link>
      <router-link to="/" class="color-main f14 ml-10" v-else>返回登录</router-link>
    </div>
  </div>
  </div>
</template>

<script>
  import {
    getPhoneNum,
    getRegisterMess,
    getRegisterCode,
    getPhoneAllMess,
    loginVerifyCode
  } from '@/api/login'
  import router from '@/router'
  export default {
    name: 'forgetMess',
    data() {
      return {
        warn: false,
        msg: "",
        mobile_phone: "",
        time: 0,
        verify_code: "",
        newPassword: "",
        msg: ""
      }
    },
    props: {
      isReset: {
        type: Boolean,
        default: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      seconds: {
        type: Number,
        default: 60
      }
    },
    computed: {
      sentPhoneCode() {
        return this.time > 0 ? "重新发送(" + this.time + "s)" : "获取验证"
      }
    },
    methods: {
      verify() {
        this.warn = false;
        var patt1 = /^[1][3,4,5,7,8][0-9]{9}$/;
        switch (true) {
          case this.mobile_phone == "":
            this.warn = true;
            this.msg = "请输入你的手机号";
            return false;
            break;
          case !patt1.test(this.mobile_phone):
            this.warn = true;
            this.msg = "请输入正确的手机号";
            return false;
            break;
        }
        return true;
      },
      done() {
        if(!this.verify()){
          return
        }
        switch (true) {
          case this.verify_code == "":
            this.warn = true;
            this.msg = "请输入验证码";
            return;
            break;
          case this.newPassword == "":
            this.warn = true;
            this.msg = "请输入新密码";
            return;
            break;
          case this.newPassword.length < 6:
            this.warn = true;
            this.msg = "密码至少6位数";
            return;
            break;
        }
        if (this.isReset) {
          this.resetMess() //点击重置密码
        } else {
          this.initReset() //初始密码设置
        }
      },
      initReset() {
        accountInfo({login_name:this.mobile_phone,password:this.newPassword,verify_code:this.verify_code})
          //与后台交成功时的操作
          .then(({
            data
          }) => {
            console.log("绑定");
            this.$store.dispatch("doLogin", data);
          })
          .catch(({
            response: {
              data
            }
          }) => { //与后台交互时出现的错误信息
            this.msg = data.errorcmt;
          })
      },
      resetMess() {
        getPhoneAllMess(this.mobile_phone, this.verify_code, this.newPassword)
          .then(({
            data
          }) => {
            this.warn = true;
            this.msg = "重置成功,请返回登录";
          })
          .catch(({
            response: {
              data
            }
          }) => { //发送验证失败
            this.warn = true;
            this.msg = data.errorcmt;
          })
      },
      async sentCode() {
          if(!this.verify()){
          	return
        	}
        //点击发送验证码
        this.msg = "";
        let post_data = {
          "type": "phone",
          "data": this.mobile_phone
        };
        if (this.isReset) {
          let {data} = await getRegisterCode(post_data);          
        } else {
          let {data} = await loginVerifyCode(post_data);         
        }
        if (data&&data.msg == 'success') {
          this.time = this.seconds;
          this.timer();
        }
      },
      timer() {//60s      
        if (this.time > 0) {
          this.time--;
          setTimeout(this.timer, 1000)
        }
      },
    },
  }

</script>

<style lang="scss" scoped>
  .error {
    display: block;
    color: #FF0000;
    font-size: 14px;
    margin-bottom: 20px;
  }

  .sentCode {
    width: 80px;
    height: 27px;
    border-radius: 14px;
    border: 1px solid #0299FF;
    color: #0299FF;
    line-height: 27px;
    padding: 0;
  }

  .border-b {
    margin-bottom: 20px;
    border: 0;
    border-bottom: 1px solid #25A7FF;
    line-height: 40px;
    font-size: 14px;

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

</style>
