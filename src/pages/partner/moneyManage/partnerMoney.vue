<template>
  <div>
    <!-- 提现记录弹窗 -->
    <el-dialog  :visible.sync="visible2"  :close-on-click-modal="false" class="withdraw" title="提现记录" @close="closeModel">
      <!--<widthDrawTable :list='withList'></widthDrawTable>-->
        <widthDrawTable 
        :list='fundList.data' 
      	:Visible="model"      	
      	@checkDetail="checkDetail"
      	@backDetail="backDetail"
      	@sureFund="sureFund">
      	
      	
      </widthDrawTable>
    </el-dialog>
    <!-- 资金管理头部 -->
   <moneyHeader @Viewlog='Viewlog' @applyFund='openApply'></moneyHeader>
   
    <!-- 表格部分 -->
    <div class="g_content mt-20">
      <el-tabs v-model="activeName" @tab-click="tabSwitch">
        <el-tab-pane label="订单收入" name="1"></el-tab-pane>
        <el-tab-pane label="会员收入" name="2"></el-tab-pane>
      </el-tabs>
      <!-- 会员管理表格 数据父组件提供 -->
      <div class="buttons clearfix mb-20">        
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
	import {getFundList} from "@/api/platform"
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
				fundList:{data:[]},//提现记录列表
				model:true,//控制提现记录
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
				this.$router.push("partnerMoney/WithdrawalApply")
      },
      Viewlog() { //打开提现记录
        //根据身份id查提现记录传入子组件
					this._list()
      },
      _list(){
        //根据身份id查提现记录传入子组件
				let user_id=this.$store.state.user.user.zhixu_id;
				getFundList({user_id})//获取提现记录列表
				.then(({data})=>{
					this.model=true;
					this.fundList=data;
					this.visible2=true;
				})
      },
      closeModel(){
				this.model=true;
			},
			checkDetail(){
				this.model=false;
			},
			backDetail(){
				this.model=true;
			},
			sureFund(){
				this._list()
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
    background:#fff;
    padding:25px;
    box-sizing:border-box;
  }

</style>
