<template>
  <div>
    <!-- 提现记录弹窗 -->
    <el-dialog :visible.sync="visible" :close-on-click-modal="false" class="withdraw" title="提现记录" @close="backDetail">
      <!-- <widthDrawTable :list='fundList.data' :Visible="model" @checkDetail="checkDetail" @backDetail="backDetail"
        @sureFund="sureFund">
      </widthDrawTable> -->
      <widthDrawTable :user_id="user_id" typeKey="3" ref='tixian'></widthDrawTable>
    </el-dialog>
    <!-- 资金管理头部 -->
    <moneyHeader @Viewlog='_list'  @applyFund='openApply'></moneyHeader>
    <!-- 表格部分 -->
    <div class="g_content mt-20">
      <el-tabs v-model="activeName">
        <el-tab-pane label="订单收入" name="1"></el-tab-pane>
        <el-tab-pane label="会员收入" name="2"></el-tab-pane>
      </el-tabs>
      <!-- 会员管理表格 数据父组件提供 -->
      <div class="buttons clearfix mb-20">
        <template v-loading="loading">
          <orderDetailed :user_id="user_id" typeKey="3" v-if="activeName==1" :isSearch='true' :isCompany='true'></orderDetailed>
          <memberDetailed :user_id="user_id" typeKey="3" v-if="activeName==2" :isSearch='true' :isCompany='true'></memberDetailed>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  // import {getFundList} from "@/api/platform" 
  import moneyHeader from "@/components/moneyManage/moneyHeader"
  import orderDetailed from "@/components/platform/fund/orderDetailed"
  import roleDetailed from "@/components/platform/fund/roleDetailed"
  import memberDetailed from "@/components/platform/fund/memberDetailed"
  import WithdrawalApply from "@/components/moneyManage/WithdrawalApply"
  import widthDrawTable from "@/components/moneyManage/widthDrawTable"
  export default {
    data() {
      return {
        activeName: '2',
        disabled: false,
        loading: false,
        visible: false,
      // fundList: {
      //   data: []
        // }, //提现记录列表
        // model: true, //控制提现记录
        // visible2:false,
      }
    },
    components: {
      moneyHeader,
      orderDetailed,
      memberDetailed,
      WithdrawalApply,
      widthDrawTable
    },
    created() {
      this.user_id = this.$store.state.user.user.zhixu_id;
    },
    methods: {
       openApply() {
        this.$router.push("partnerMoney/WithdrawalApply")
      },
      _list() {
        this.visible = true;
      },
      closeModel() {
        this.$refs.tixian.init()
      },
      // _list() { //打开提现记录
      //   //根据身份id查提现记录传入子组件
      //   let user_id = this.$store.state.user.user.zhixu_id;
      //   getFundList({
      //       user_id
      //     }) //获取提现记录列表
      //     .then(({
      //       data
      //     }) => {
      //       this.model = true;
      //       this.fundList = data;
      //       this.visible2 = true;
      //     })
      // },
      // checkDetail() {
      //   this.model = false;
      // },
      // backDetail() {
      //   this.model = true;
      // },
      // sureFund() {
      //   this._list()
      // }
    }
  }

</script>

<style lang="scss">
  .withdraw {
    .el-dialog {
      min-width: 900px;
      width: initial;
    }
  }

</style>


<style lang="scss" scoped>
  .g_content {
    position: relative;
    width: 1240px;
    margin: 20px auto 0;
    background: #fff;
    padding: 25px;
    box-sizing: border-box;
  }

</style>
