<template>
  <div>    
    <!-- 提现记录弹窗 -->   
    <el-dialog  :visible.sync="visible2"  :close-on-click-modal="false" class="withdraw" title="提现记录">
      <widthDrawTable :list='withList'></widthDrawTable>
    </el-dialog>
    
    <!-- 资金管理头部 -->
    <moneyHeader @Viewlog='Viewlog' @applyFund='openApply'></moneyHeader>
    <!-- 表格部分 -->
    <div class="g_content mt-20">
      <el-tabs v-model="activeName" @tab-click="tabSwitch">
        <el-tab-pane label="订单收入" name="1"></el-tab-pane>
        <el-tab-pane label="会员收入" name="2"></el-tab-pane>
        <el-tab-pane label="角色收入" name="3"></el-tab-pane>
      </el-tabs>
      <!-- 会员管理表格 数据父组件提供 -->
      <div class="buttons clearfix mb-20">
        <template v-loading="loading">
		    	<orderDetailed :user_id="user_id" typeKey="2" v-if="activeName==1" :isSearch='true'></orderDetailed>
		    	<memberDetailed :user_id="user_id" typeKey="2" v-if="activeName==2" :isSearch='true'></memberDetailed>
		    	<roleDetailed :user_id="user_id"  v-if="activeName==3" :isSearch='true'></roleDetailed>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import moneyHeader from "@/components/moneyManage/moneyHeader"
  import orderDetailed from "@/components/platform/fund/orderDetailed"
  import roleDetailed from "@/components/platform/fund/roleDetailed"
  import memberDetailed from "@/components/platform/fund/memberDetailed"
  import WithdrawalApply from "@/components/moneyManage/WithdrawalApply"
  import widthDrawTable from "@/components/moneyManage/widthDrawTable"
  import page from '@/utils/page'
  import {orderCommission} from "@/api/platform"
  export default {
    data() {
      return {
        activeName: '1',
        list: [],
        disabled:false,
        visible:false,
        visible2:false,
        loading:false,
        withList:[],
        user_id:null
      }
    },
    components: {
      moneyHeader,
      orderDetailed,
      WithdrawalApply,
      widthDrawTable,
      memberDetailed,
      roleDetailed
    },
    // mixins: [page],
    created () {
      this.user_id=this.$store.state.user.user.zhixu_id;
    },
    methods: {
      openApply(){
				this.$router.push("agentMoney/WithdrawalApply")
      },
      Viewlog() { //打开提现记录
        //根据身份id查提现记录传入子组件
        this.withList=[]
        this.visible2=true;
      },
      tabSwitch({name}){    
        // tab面板切换
        // this.searchMethod()
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
    background:#fff;
    padding:25px;
    box-sizing:border-box;
  }

</style>
