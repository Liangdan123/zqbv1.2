<template>
  <div class="wrap">
    <div class="g-content">
      <ul class="progess clearfix">
        <li class="detail-item item-active">
          <div>
            <i class="icon-dot active"></i>
          </div>
          <div class="detail-content">申请提现</div>
        </li>
        <li class="detail-item">
          <div>
            <i class="icon-line"></i>
            <i class="icon-dot"></i>
          </div>
          <div class="detail-content">等待平台汇款</div>
        </li>
        <li class="detail-item">
          <div>
            <i class="icon-line"></i>
            <i class="icon-dot"></i>
          </div>
          <div class="detail-content">商家确认收款</div>
        </li>
        <li class="detail-item">
          <div>
            <i class="icon-line"></i>
            <i class="icon-dot"></i>
          </div>
          <div class="detail-content">完成提现</div>
        </li>
      </ul>
      <el-form class="form-content" label-width="90px" :model="withdrawalApplyData" :rules="validatorRule" ref="ruleForm">
        <el-form-item label="提现金额：" prop="apply_money">
          <el-input class="radius" v-model.number="withdrawalApplyData.apply_money">
          </el-input>
          <p>最大可提现金额:{{accountMoneyInfo.balance_yuan||0 | money}}元，
            提现手续费比例{{this.accountMoneyInfo.tixian_rate}}%
          </p>
        </el-form-item>
        <el-form-item label="提现方式：" prop="tixian_type" class="tixian_type">
          <el-radio-group v-model="withdrawalApplyData.tixian_type">
            <el-radio :label="1">支付宝账户</el-radio>
            <el-radio :label="2">微信账户</el-radio>
            <el-radio :label="3">银行卡账户</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="姓名：" prop="tixian_name" v-if="[1,2].includes(withdrawalApplyData.tixian_type)" :rules="{
                		required:true,message: '姓名不能为空', trigger: 'blur'
                	}">
          <el-input class="radius" placeholder="请填写真实姓名" v-model="withdrawalApplyData.tixian_name">
          </el-input>
        </el-form-item>

        <el-form-item label="开户姓名：" prop="tixian_name" v-if="withdrawalApplyData.tixian_type===3" :rules="{
                		required:true, message: '开户姓名不能为空', trigger: 'blur'
                	}">
          <el-input class="radius" placeholder="请填写真实姓名" v-model="withdrawalApplyData.tixian_name">
          </el-input>
        </el-form-item>

        <el-form-item label="开户银行" prop="tixian_bank" :rules="{required:true, message: '请输入开户银行', trigger:'blur'}" v-if="withdrawalApplyData.tixian_type===3">
          <el-input class="radius" placeholder="例如:“中国银行”" v-model="withdrawalApplyData.tixian_bank">
          </el-input>
        </el-form-item>

        <el-form-item label="银行卡号" prop="tixian_account" :rules="{required:true, message:'请输入银行卡号',trigger:'blur' }"
          v-if="withdrawalApplyData.tixian_type===3">
          <el-input class="radius" placeholder="请填写卡号18位数" v-model="withdrawalApplyData.tixian_account">
          </el-input>
        </el-form-item>

        <el-form-item label="账户：" prop="tixian_account" v-if="withdrawalApplyData.tixian_type===1" :rules="{
                		required:true,message: '账户不能为空', trigger: 'blur'
                	}">
          <el-input class="radius" placeholder="请填写支付宝账户" v-model="withdrawalApplyData.tixian_account">
          </el-input>
        </el-form-item>

        <el-form-item label="微信号：" prop="tixian_account" v-if="withdrawalApplyData.tixian_type===2" :rules="{
                		required:true,message: '账户不能为空', trigger: 'blur'
                	}">
          <el-input class="radius" v-model="withdrawalApplyData.tixian_account" placeholder="请填写转账微信号">
          </el-input>
        </el-form-item>

        <el-form-item label="身份验证：" prop="verify_code">
          <el-col :span="12">
            <el-input class="radius" placeholder="短信验证码" v-model="withdrawalApplyData.verify_code">
            </el-input>
          </el-col>
          <el-col :span="11">
            <el-button type="primary" class="btn-code radius" :disabled="verifyCodeSending" @click="verifyCodeGet">
              {{verifyTip}}
            </el-button>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button :loading="submitDisable" :disabled="submitDisable" class="radius submit" type="primary" @click="submitForm('ruleForm')">
            提交申请
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {
    getVerifyCode,
    withdrawalApplyCommit,
    getAccountMoney
  } from "@/api/servicer"
  export default {
    name: "MoneyWithdrawal",
    filters: {
      money: function (value = 0) {
        // 金额转换成数字和整数部分
        value = Number(value).toFixed(2).split('.');
        let value_int = Number(value[0]).toLocaleString(); // 转换成金额形式
        return `￥ ${value_int}.${value[1]}`;
      }
    },
    data() {
      // 自定义提现金额校验信息
      let checkApplyMoney = (rule, value, callback) => {
        console.log("value", value)
        if (!value) {
          return callback(new Error('提现金额不能为空'));
        }
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < this.accountMoneyInfo.min_tixian_yuan) {
            callback(new Error(`最低提现金额${this.accountMoneyInfo.min_tixian_yuan}元`));
          } else if (value > this.accountMoneyInfo.balance) {
            callback(new Error('提现金额大于账户可提现余额'));
          } else {
            callback()
          }

        }
      };
      return {
        submitDisable: false,
        verifyCodeSending: false,
        verifyTip: '获取验证码',
        //账户金额信息
        accountMoneyInfo: {
          "balance": 0,
          "balance_yuan": 0,
          "tixian_rate": 0
        },

        // 申请提交字段
        withdrawalApplyData: {
          "apply_money": '',
          "tixian_rate": '',
          "deduct_money": '',
          "money": '',
          "tixian_type": 1,
          "tixian_name": '',
          "tixian_account": '',
          "tixian_bank": '',
          "verify_code": ''
        },
        validatorRule: {
          apply_money: [{
            validator: checkApplyMoney,
            trigger: 'blur'
          }],
          verify_code: [{
              required: true,
              message: '请输入短信验证码',
            },
            {
              len: 6,
              message: '请正确输入6位短信验证码',
              trigger: 'blur'
            },
          ],
        }
      }
    },
    created() {
      let user_id = this.$store.state.user.user.zhixu_id;
      getAccountMoney(user_id)
        .then(({
          data
        }) => {
          this.accountMoneyInfo = data;
        })
    },
    methods: {
      verifyCodeGet() {
        //获取验证码
        // 先校验填写完成才发送验证码
        this.verifyCodeSending = true;
        let fields = this.$refs['ruleForm'].fields.filter(field => field.prop !== 'verify_code')
        Promise.all(fields.map(item => { //Promise.all是为了强制验证全部
            let status = Promise.resolve();
            item.validate('', (valid) => {
              if (valid) status = Promise.reject()
            })
            return status
          }))
          .then(res => {
            getVerifyCode()
              .then(() => {
                this._countDown()
              })
              .catch(({
                response: {
                  data
                }
              }) => {
                this.verifyCodeSending = false;
              })
          })
          .catch(res => {
            this.verifyCodeSending = false;
          })

      },
      _countDown() {
        // 倒计时
        let timer, count = 60;
        down.apply(this);

        function down() {
          count--;
          this.verifyTip = `${count}s后重新发送`;
          if (count) {
            timer = setTimeout(down.bind(this), 1000)
          } else {
            clearTimeout(timer);
            this.verifyTip = '重新发送';
            this.verifyCodeSending = false
          }
        }
      },
      submitForm(formName) {
        this.submitDisable = true;
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            this.submitDisable = false;
            return false;
          };
          let {
            tixian_rate
          } = this.accountMoneyInfo;
          let {
            apply_money
          } = this.withdrawalApplyData;
          // 提现金额转为分
          apply_money = apply_money * 100;
          // 计算手续费
          let deduct_money = apply_money * tixian_rate / 100;
          // 扣去手续费后剩余的钱
          let money = apply_money - deduct_money;
          let data_extend = {
            apply_money,
            tixian_rate,
            deduct_money,
            money
          };
          let data_post = Object.assign({}, this.withdrawalApplyData, data_extend);
          withdrawalApplyCommit(data_post)
            .then(({
              data
            }) => {
              this.$emit("JumpPage"); //用于跳转页面
              this.$message({
                message: '已提交提现申请，申请进度可在提现记录中查看',
                type: 'success'
              });
            })
            .catch(() => {
              this.submitDisable = false;
            })
        })
      }
    }

  }

</script>

<style lang="scss" scoped>
  .g-content {
    overflow: hidden;

    .progess {
      transform: translateX(50%);
      margin: 60px 0 60px -50%;

      .icon-dot {
        display: inline-block;
        margin: 0 6px;
        width: 12px;
        height: 12px;
        background: #D6D6D6;
        border-radius: 100%;
        vertical-align: middle;
      }

      .icon-line {
        display: inline-block;
        width: 160px;
        height: 4px;
        background: #D6D6D6;
        vertical-align: middle;
        border-radius: 10px;
      }

      .detail-item {
        float: left;
        text-align: right;
        font-size: 14px;
        color: #D6D6D6;

        &.item-active {
          color: #0070C9;

          .icon-dot,
          .icon-line {
            background: #0070C9;
          }
        }

        .detail-content {
          display: inline-block;
          transform: translateX(36%);

          .time {
            margin: 4px 0;
            font-size: $font-small;
            line-height: 1;
          }
        }
      }
    }

    .form-content {
      margin: 0 auto;
      width: 410px;

      p {
        margin-top: 10px;
        font-size: $font-small;
        color: $color-base;
        line-height: 1;
      }

      .btn-code {
        margin-left: 10px;
        width: 100%;
      }

      .submit {
        margin-top: 20px;
        width: 100%;
      }

      .el-form-item {
        .el-form-item__content {
          .el-radio-group {
            .el-radio {
              display: block;
              margin-bottom: 4px;
            }

            .el-radio+.el-radio {
              margin-left: 0;
            }
          }
        }

        .el-form-item__content.tixian_type {
          padding-top: 0;
        }
      }

      .el-form-item.tixian_type {
        .el-form-item__label {
          padding-top: 0;
        }
      }
    }
  }

</style>
