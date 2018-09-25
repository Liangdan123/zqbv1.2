<template>
  <div class="wrap">
    <div class="apply-content">
      <div class="text-c">
          <el-steps :space="150" align-center process-status="wait"  :active="1" class="step">
              <el-step title="申请提现"></el-step>
              <el-step title="等待平台汇款"></el-step>
              <el-step title="商家确认收款"></el-step>
              <el-step title="完成提现"></el-step>
          </el-steps>
      </div>
      <h3 class="color-3 ml-20 mb-20">提现申请</h3>
      <el-form class="form-content" label-width="100px" :model="applyData" :rules="validatorRule" ref="ruleForm">
        <el-form-item label="提现金额：" prop="apply_money">
          <el-input v-model.number="applyData.apply_money" placeholder="提现金额不小于100元">
          </el-input>
        </el-form-item>
        <el-form-item label="提现方式：" prop="type">
          <el-radio-group v-model="applyData.type" class="float-l" @change="clear">
            <el-radio :label="1" class="display-b">支付宝账户</el-radio>
            <el-radio :label="2" class="display-b">微信账户</el-radio>
            <el-radio :label="3" class="display-b">银行卡账户</el-radio>
          </el-radio-group>
        </el-form-item>
        <template v-if="applyData.type!=3">
          <el-form-item label="姓名：" prop="open_name">
            <el-input placeholder="请输入真实姓名" v-model="applyData.open_name">
            </el-input>
          </el-form-item>
          <el-form-item label="账户：" prop="zfb_pwd" v-if="applyData.type==1">
            <el-input placeholder="请填写支付宝账户" v-model="applyData.zfb_pwd">
            </el-input>
          </el-form-item>
          <el-form-item label="微信号：" prop="wx_pwd" v-else>
            <el-input placeholder="请填写转账微信号" v-model="applyData.wx_pwd">
            </el-input>
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item label="开户姓名：" prop="open_name">
            <el-input placeholder="请输入开户的真实姓名" v-model="applyData.open_name">
            </el-input>
          </el-form-item>
          <el-form-item label="开户银行：" prop="open_bank">
            <el-input placeholder="例如“中国银行”" v-model="applyData.open_bank">
            </el-input>
          </el-form-item>
          <el-form-item label="银行卡号：" prop="open_number">
            <el-input placeholder="请输入完整正确的银行卡号" v-model="applyData.open_number">
            </el-input>
          </el-form-item>
        </template>
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
        //账户金额信息
        accountMoneyInfo: {
          "balance": 0,
          "balance_yuan": 0,
        },
        // 申请提交字段
        applyData: {
          "apply_money": '',
          'type': 3,
          //   "open_name": '',
          //   "open_bank": '',
          //   "open_number": '',
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
              max: 10,
              message: '最多10个字符',
              trigger: 'blur'
            },
          ],
          zfb_pwd: [{
            required: true,
            message: '请填写支付宝账户',
            trigger: 'blur'
          }],
          wx_pwd: [{
            required: true,
            message: '请填写转账微信号',
            trigger: 'blur'
          }],
          open_bank: [{
            required: true,
            message: '请输入开户银行',
            trigger: 'blur'
          }],
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
      //   getAccountMoney()
      //     .then(({data})=>{
      //         this.accountMoneyInfo = data;
      //     })
    },
    methods: {
      cancel() {
        this.$refs['ruleForm'].resetFields(); //清除报错
      },
      clear(){
        let money=this.applyData.apply_money;
        let type=this.applyData.type;
         this.$refs['ruleForm'].resetFields();
        this.applyData={
            apply_money:money,
            type:type,
        }
      },
      submitForm(formName = 'ruleForm') {
        // 提交申请校验表单
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            this.$emit("repeat")
            return false;
          }
          let {
            apply_money
          } = this.applyData;
          apply_money = apply_money * tixian_rate / 100;
          let data_extend = {
            apply_money
          };
          let data_post = Object.assign({}, this.applyData, data_extend);
          withdrawalApplyCommit(data_post)
            .then(({
              data
            }) => {
              this.$message({
                message: '已提交提现申请，申请进度可在提现记录中查看',
                type: 'success'
              });
              //处理完成 关闭弹窗
              this.$emit('close')
            })
        });
      },
    },
  }

</script>

<style lang="scss" scoped>
  .wrap {
    box-sizing: border-box; // text-align: center;
  }

  .el-radio {
    line-height: 36px;
    margin: 0;
  }

  .form-content {
    width: 400px;
    margin-left: 20px;
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

</style>

<style lang="scss" >
.apply-content{
  .el-step__head{
  width:8px;
  height: 8px;
  margin-top:12px;
  margin-left:8px;
  &.is-wait{
   border:0;
    background:#D6D6D6 !important;
  }
  &.is-finish{
   border:0;
   .el-step__line-inner{
      border:0;
    }
  }
}


.el-step__icon {
    display: none;
}
.el-step__title {
    color: #333 !important;
    font-size: 12px;
}
}
</style>
