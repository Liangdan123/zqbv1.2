<template>
  <div class="panel-content">
    <p class="panel-title">提现进度</p>
    <div>
      <div class="dialog-content">
        <el-steps :space="250" align-center process-status="wait" :active="detailData.status+1" class="step ml-20" :align-center="true">
          <el-step title="申请提现" :description="detailData.apply_time" :class="{last:detailData.status=='0',error:detailData.status=='3'}">
          	
          </el-step>
          <el-step title="提现失败" status="error" v-if="detailData.status==3" :description="detailData.remittance_time">
          	
          </el-step>
          <template v-if="detailData.status!==3">
            <el-step title="等待平台汇款" :description="detailData.remittance_time+222222" :class="{last:detailData.status=='1'}">
            	
            </el-step>
            <el-step title="商家确认收款" v-if="detailData.status!==3" :description="detailData.confirm_time" :class="{last:detailData.status=='2'}">
            	
            </el-step>
            <el-step title="完成提现" v-if="detailData.status!==3" :description="detailData.confirm_time">
            	
            </el-step>
          </template>
        </el-steps>
        <p class="panel-title">提现详情</p>
        <ul class="panel-detail">
          <li>
            <label>提现方式：</label>{{detailData.type}}</li>
          <li>
            <label>提现金额：</label>{{detailData.apply_money_yuan | money}}</li>
          <li>
            <label>开户姓名：</label>{{detailData.open_name}}</li>
          <template v-if="detailData.type=='银行卡'">
            <li>
              <label>开户银行：</label>{{detailData.open_bank}}</li>
            <li>
              <label>银行卡号：</label>{{detailData.open_number}}</li>
          </template>
          <template v-if="detailData.type=='微信'">
            <li>
              <label>姓名：</label>{{detailData.open_bank}}</li>
            <li>
              <label>微信号：</label>{{detailData.open_number}}</li>
          </template>
          <template v-if="detailData.type=='支付宝'">
            <li>
              <label>姓名：</label>{{detailData.open_bank}}</li>
            <li>
              <label>账号：</label>{{detailData.open_number}}</li>
          </template>
        </ul>
        <div v-if="detailData.status==3">
          <p class="panel-title">提现失败原因</p>
          <p class="remark">{{detailData.remark}}</p>
        </div>
        <p v-if="role=='1'" class="panel-title">卖家信息</p>
        <ul v-if="role=='1'" class="panel-detail">
          <li>
            <label>店铺名称：</label>{{detailData.shop_name }}</li>
          <li>
            <label>店&emsp;&emsp;长：</label>{{detailData.shopkeeper_name}}</li>
          <li>
            <label>联系方式：</label>{{detailData.shopkeeper_phone}}</li>
        </ul>
      </div>
    </div>
    <div v-if="role=='shop'" class="dialog-footer">
      <el-button type="primary" @click="withdrawalConfirm(detailData.tixian_id)" :loaging="submitDisable" v-if="detailData.status==2">
        确认收款
      </el-button>
      <el-button type="primary" @click="withdrawalConfirm(detailData.tixian_id)" :loaging="submitDisable">
        返回
      </el-button>
    </div>
    <div v-if="detailData.status==1&&role=='1'" class="dialog-footer">
      <el-button @click="mallRemittance(2)" :disabled="submitDisable" :loading="btnLoadingIndex==2" class="store-button1" type="primary">
        汇款成功
      </el-button>
      <el-button @click="remittanceRejectConfirm" :disabled="submitDisable" :loading="btnLoadingIndex==3" class="store-button2">
        汇款失败
      </el-button>
    </div>
  </div>
</template>

<script>
  // import {
  //   getWithdrawalDetail,
  // } from "@/api/money-management";
  export default {
    props: {
      detailData: {
        defalut: () => {
          return {
            status: 1,
          }
        }
      },
      role: {
        defalut: "2"
      }
    },
    filters: {
      money(value) {
        // 金额转换成数字和整数部分
        if (!value) {
          value = 0;
        }
        value = Number(value).toFixed(2).split('.');
        let value_int = value[0].toLocaleString(); // 转换成金额形式
        return `￥ ${value_int}.${value[1]}`;
      },
    },
    data() {
      return {
        rejectRemark: '', // 汇款失败的原因
        btnLoadingIndex: '',
        submitDisable: false, //按钮是否禁止点击
      }
    },
    methods: {
      withdrawalConfirm(id) {
        this.$emit('withdrawalConfirm', id)
      },
      mallRemittance(status) {
        this.submitDisable = true;
        this.btnLoadingIndex = status;
        let data_post = {
          "tixian_id": this.withdrawalClickId,
          "status": status,
        };
        this.rejectRemark && Object.assign(data_post, {
          remark: this.rejectRemark
        });
        setRemittanceStatus(data_post)
          .then(() => {
            // 设置成功 将表格中的数据设置为对应的状态
            let item_index = this.list.findIndex(({
              tixian_id
            }) => tixian_id == this.withdrawalClickId);
            this.list.splice(item_index, 1);
            this.$message.success('提现申请处理成功,可在历史记录中查看相关信息 ');
            this.handleClose()
          })
      },
      remittanceRejectConfirm() {
        this.$prompt(' ', '汇款失败原因', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValidator: (val) => Boolean(val),
          inputErrorMessage: '请输入汇款失败原因',
          inputPlaceholder: '请输入汇款失败原因'
        }).then(({
          value
        }) => {
          this.rejectRemark = value;
          this.mallRemittance(3)
        })
      }
    }
  }

</script>

<style scoped lang='scss'>
  /*进度条*/

  .panel-content {
    padding: 0 30px;
  }

  .dialog-footer {
    text-align: right;
  }

  .panel-title {
    margin: 40px 0 20px 0;
    font-size: $font-normal;
    color: $color-light;
  }

  .panel-detail {
    margin-left: 30px;
    li {
      margin-bottom: 6px;
      font-size: 14px;
      color: #333;
    }
    label {
      color: #7F7F7F;
      vertical-align: middle;
      i {
        padding: 0 1em;
      }
    }
  }

  .remark {
    width: 700px;
    font-size: 14px;
    color: #7F7F7F;
  }

</style>

<style lang="scss">
  .panel-content {
    .el-step__head {
      width: 8px;
      height: 8px;
      margin-top: 12px;
      margin-left: 8px;
      &.is-wait {
        border: 0;
        background: #bfcbd9 !important;
      }
      &.is-error {
        border: 0;
      }
      &.is-finish {
        border:0;
        border-color:#0070C9;
        background: #0070C9;
        .el-step__line-inner {
          width: 100% !important; // border: 0;
        }
      }
      .el-step__icon {
        display: none;
      }
    }
    .el-step__description {
      margin-left: -30px;
    }
    .el-step__title {
      // display: block;
      font-size: 12px;
    }
    .error {
      .is-finish {
        .el-step__line-inner {
          border-color: #ff4949; // border: 0;
        }
      }
    }
    .last {
      .is-finish {
        .el-step__line-inner {
          border-color: #bfcbd9; // border: 0;
        }
      }
    }
  }

</style>
