<template>
  <div class="wrap">
    <div class="apply-content">
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
      <el-form class="form-content" label-width="80px" :model="withdrawalApplyData" :rules="validatorRule" ref="ruleForm">
        <el-form-item label="提现金额" prop="apply_money">
          <el-input  v-model.number="withdrawalApplyData.apply_money" placeholder="提现金额不小于100元">
          </el-input>
        </el-form-item>
        <el-form-item label="开户姓名" prop="open_name">
          <el-input  placeholder="请输入开户的真实姓名" v-model="withdrawalApplyData.open_name">
          </el-input>
        </el-form-item>
        <el-form-item label="开户银行" prop="open_bank">
          <el-input  placeholder="例如“中国银行”" v-model="withdrawalApplyData.open_bank">
          </el-input>
        </el-form-item>
        <el-form-item label="银行卡号" prop="open_number">
          <el-input  placeholder="请输入完整正确的银行卡号" v-model="withdrawalApplyData.open_number">
          </el-input>
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
  // import {getAccountMoney,withdrawalApplyCommit,getVerifyCode} from '@/api/money-management';
  export default {
    name: "MoneyWithdrawal",
    filters: {
      money: function (value) {
        // 金额转换成数字和整数部分
        value = Number(value).toFixed(2).split('.');
        let value_int = Number(value[0]).toLocaleString(); // 转换成金额形式
        return `￥ ${value_int}.${value[1]}`;
      }
    },
    data() {
      // 自定义提现金额校验信息
      let checkApplyMoney = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('提现金额不能为空'));
        }
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value * 100 < 10000) {
            callback(new Error('最低提现金额100元'));
          } else if (value * 100 > this.accountMoneyInfo.balance) {
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
          "open_name": '',
          "open_bank": '',
          "open_number": '',
        },
        validatorRule: {
          apply_money: [{
            validator: checkApplyMoney,
            trigger: 'blur',
          }, ],
          open_name: [{
              required: true,
              message: '请输入开户姓名',
            },
            {
              type: 'string',
              max: 100,
              message: '最多100个字符',
              trigger: 'blur'
            },
          ],
          open_bank: [{
              required: true,
              message: '请输入开户银行',
            },
            {
              type: 'string',
              max: 100,
              message: '最多100个字符',
              trigger: 'blur'
            },
          ],
          open_number: [{
              required: true,
              message: '请输入完整正确的银行卡号',
            },
            {
              type: 'string',
              min: 15,
              max: 19,
              message: '请输入完整正确的银行卡号',
              trigger: 'blur'
            },
          ],
        }
      }
    },
    created() {
        console.log(222)
      // 获取账户资金信息
      // getAccountMoney()
      //     .then(({data})=>{
      //         this.accountMoneyInfo = data;
      //     })
    },
    methods: {
      verifyCodeGet() {
        //获取验证码
        this.verifyCodeSending = true;
        getVerifyCode()
          .then(() => {
            this._countDown()
          })
          .catch(({
            response: {
              data
            }
          }) => {
            this.$message.error(data.errorcmt);
            this.verifyCodeSending = false;
          })
      },
      submitForm(formName = 'ruleForm') {
        // 提交申请
        this.submitDisable = true;
        // 校验表单
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            this.submitDisable = false;
            return false;
          }
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
              this.$message({
                message: '已提交提现申请，申请进度可在提现记录中查看',
                type: 'success'
              });
              this.pageBack()
            })
            .catch(({
              response: {
                data
              }
            }) => {
              this.submitDisable = false;
              this.$message.error(data.errorcmt);
            })
        });
      },
    },
  }

</script>

<style lang="scss" scoped>
  .wrap {
    box-sizing: border-box;
    text-align: center;
  }


  .nav-bar {
    font-size: 16px;
    color: #7F7F7F;
    span:first-child {
      cursor: pointer;
    }
    i {
      padding: 0 5px;
    }
    .link-active {
      color: $color-light;
      font-weight: 700;
    }
  }

  .form-content {
    margin: 0 auto;
    width: 400px;
    p {
      margin-top: 10px;
      font-size: $font-small;
      color: $color-base;
      line-height: 1;
    }
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-enter {
    transform: translateY(-20px);
    opacity: 0;
  }

  .progess {
    display: inline-block;
    margin-bottom: 30px;
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

</style>
