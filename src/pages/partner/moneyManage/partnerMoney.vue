<template>
  <div>
    <!-- 提现收入弹窗 -->
    <el-dialog  :visible.sync="visible"  :close-on-click-modal="false" class="withdraw" @close="close" >
        <WithdrawalApply ref="widthdarw" @close="close" @repeat="disabled=false"></WithdrawalApply>
        <div slot="footer" class="dialog-footer">
          <el-button class="store-button1" :disabled="disabled" @click="apply">申请</el-button>
          <el-button class="store-button2" @click="visible=false">取 消</el-button>
        </div>
    </el-dialog>
    <!-- 提现记录弹窗 -->
    <el-dialog  :visible.sync="visible2"  :close-on-click-modal="false" class="withdraw" title="提现记录">
      <widthDrawTable :list='withList'></widthDrawTable>
    </el-dialog>
    <!-- 资金管理头部 -->
    <moneyHeader @Viewlog='Viewlog'></moneyHeader>
    <!-- 表格部分 -->
    <div class="g_content mt-20">
      <el-tabs v-model="activeName" @tab-click="tabSwitch">
        <el-tab-pane label="订单收入" name="1"></el-tab-pane>
        <el-tab-pane label="会员收入" name="2"></el-tab-pane>
      </el-tabs>
      <!-- 会员管理表格 数据父组件提供 -->
      <div class="buttons clearfix mb-20">
        <el-button class="store-button1 float-l" @click="openApply">
          <i class="iconfont icon-Rectangle f12"></i>
          <span class="font-b">申请提现</span>
        </el-button>
        <search 
        	:search.sync="searchCondition.search" 
        	@searchMethod="searchMethod" 
        	@emptyMthod='emptyMthod' 
        	ref="isShow" 
        	selectTitle='筛选列表'
          hintMess="输入相关信息进行搜索">
        </search>
        <template v-loading="loading">
          <OrderIncome 
          	:searchCondition='searchCondition' 
          	:list="list" :total="total" 
          	@searchMethod="searchMethod" 
          	v-if="activeName==1"></OrderIncome>
          <memberIncome 
          	:searchCondition='searchCondition' 
          	:list="list" :total="total" 
          	@searchMethod="searchMethod" 
          	v-if="activeName==2"></memberIncome>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import moneyHeader from "@/components/moneyManage/moneyHeader"
  import OrderIncome from "@/components/moneyManage/OrderIncome"
  import memberIncome from "@/components/moneyManage/memberIncome"
  import WithdrawalApply from "@/components/moneyManage/WithdrawalApply"
  import widthDrawTable from "@/components/moneyManage/widthDrawTable"
  import page from '@/utils/page'
  export default {
    data() {
      return {
        activeName: '2',
        list: [],
        disabled:false,
        searchCondition: {
          page: 1,
          search: {},
          per_page: 20
        },
        visible:false,
        visible2:false,
        loading:false,
        withList:[]
      }
    },
    components: {
      moneyHeader,
      OrderIncome,
      memberIncome,
      WithdrawalApply,
      widthDrawTable
    },
    mixins: [page],
    methods: {
      openApply(){
        //打开申请提现的弹窗
        this.disabled=false;
        this.visible=true;
      },
      apply(){
        this.disabled=true;
        this.$refs.widthdarw.submitForm()//调用子组件验证方法
      },
      Viewlog() { //打开提现记录
        //根据身份id查提现记录传入子组件
        this.withList=[]
        this.visible2=true;
      },
      close(){
        this.disabled=false;
        this.visible=false;
        this.$refs.widthdarw.cancel()//关闭弹窗回调 调用子组件的清除方法
      },
      tabSwitch({name }) {            
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
