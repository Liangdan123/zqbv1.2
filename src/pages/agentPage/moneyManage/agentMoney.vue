<template>
  <div>
    <!-- 提现收入弹窗 -->
    <el-dialog  :visible.sync="visible"  :close-on-click-modal="false" class="withdraw">
        <WithdrawalApply ref="widthdarw"></WithdrawalApply>
        <div slot="footer" class="dialog-footer">
          <el-button class="store-button1">申请</el-button>
          <el-button class="store-button2">取 消</el-button>
        </div>
    </el-dialog>
    <!-- 资金管理头部 -->
    <moneyHeader :Viewlog='Viewlog'></moneyHeader>
    <!-- 表格部分 -->
    <div class="g_content mt-20">
      <el-tabs v-model="activeName" @tab-click="tabSwitch">
        <el-tab-pane label="订单收入" name="1"></el-tab-pane>
        <el-tab-pane label="会员收入" name="2"></el-tab-pane>
        <el-tab-pane label="角色收入" name="3"></el-tab-pane>
      </el-tabs>
      <!-- 会员管理表格 数据父组件提供 -->
      <div class="buttons clearfix mb-20">
        <el-button class="store-button1 float-l" @click="apply">
          <i class="iconfont icon-Rectangle f12"></i>
          <span class="font-b">申请提现</span>
        </el-button>
        <search :search.sync="searchCondition.search" @searchMethod="searchMethod" @emptyMthod='emptyMthod' ref="isShow" selectTitle='筛选列表'
          hintMess="输入相关信息进行搜索">
        </search>
        <template v-loading="loading">
          <OrderIncome :searchCondition='searchCondition' :list="list" :total="total" @searchMethod="searchMethod" v-if="activeName==1"></OrderIncome>
          <memberIncome :searchCondition='searchCondition' :list="list" :total="total" @searchMethod="searchMethod" v-if="activeName==2"></memberIncome>
          <roleIncome :searchCondition='searchCondition' :list="list" :total="total" @searchMethod="searchMethod" v-if="activeName==3"></roleIncome>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import moneyHeader from "@/components/moneyManage/moneyHeader"
  import OrderIncome from "@/components/moneyManage/OrderIncome"
  import memberIncome from "@/components/moneyManage/memberIncome"
  import roleIncome from "@/components/moneyManage/roleIncome"
  import WithdrawalApply from "@/components/moneyManage/WithdrawalApply"
  import page from '@/utils/page'
  export default {
    data() {
      return {
        activeName: '2',
        list: [],
        searchCondition: {
          page: 1,
          search: {},
          per_page: 20
        },
        visible:true,
        loading:false
      }
    },
    components: {
      moneyHeader,
      OrderIncome,
      memberIncome,
      roleIncome,
      WithdrawalApply
    },
    mixins: [page],
    methods: {
      apply(){
        //打开申请提现的弹窗
        this.visible=true;
      },
      Viewlog() { //打开提现记录

      },
      tabSwitch({
        name
      }) {
        // tab面板切换
        this.searchCondition.page = 1;
        this.searchCondition.search={}
        this.searchCondition.search.status = this.activeName;
        this._doSearch();
      },
      emptyMthod() {
        delete this.searchCondition.search.level //删除等级条件
        this.searchMethod()
      },
      _doSearch() {

      },
    }
  }

</script>

<style lang="scss">
  .withdraw{
    .el-dialog{
      min-width: 900px;
      width:initial;
    }
  }
</style>


<style lang="scss" scoped>
  .g_content {
    position: relative;
    width: 1240px;
    margin: 20px auto 0;
  }

</style>
