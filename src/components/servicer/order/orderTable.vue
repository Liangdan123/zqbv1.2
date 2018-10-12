<template>
  <div class="orderTable commodity" @click="closeSearch">
    <!--..............订单详情弹框..................-->
    <el-dialog title="合伙人列表" :visible.sync="Visible" size="tiny" :close-on-click-modal="false" v-if='type==2'>
      <el-table class="table mt-20" :data="partner" style="width: 100%">
          <el-table-column prop="is_company" label="性质">
               <template slot-scope="scope">
              {{scope.row.is_company==1?'企业':'个人'}}
            </template>
          </el-table-column>
          <el-table-column prop="contact_name" label="姓名"></el-table-column>
          <el-table-column prop="phone" label="联系方式"></el-table-column>
        </el-table>
        <el-pagination class="pagination mt-20" v-if="dialogtotal>dialogsearch.per_page" @current-change="handleChange"  :current-page.sync="dialogsearch.page" :page-size="dialogsearch.per_page" layout="total, prev, pager, next" :total="dialogtotal"> </el-pagination>
    </el-dialog>
    <div class="g-content">
      <!--.....................tab........................-->
      <el-tabs v-model="tabForShow" @tab-click="tabSwitch">
        <el-tab-pane label="未完成" name="1"></el-tab-pane>
        <el-tab-pane label="已完成" name="2"></el-tab-pane>
      </el-tabs>
      <!--.....................搜索框........................-->
      <div class="buttons clearfix mb-20">
        <searchRole :search.sync="searchCondition.search" :inputType="['is_company', 'business_range']" @searchMethod="searchMethod"></searchRole>
        <search :search.sync="searchCondition.search" inputSearch='order_search' @searchMethod="searchMethod"
          @emptyMthod='searchMethod' ref="isShow" selectTitle='筛选条件' hintMess="输入相关信息进行搜索">
        </search>
        <!-- 表格 -->
        <el-table class="table mt-20" v-loading="tableDataLoading" :data="list" style="width: 100%">
          <el-table-column prop="order_no" label="订单号"></el-table-column>
          <el-table-column prop="shop_name" label="服务商"></el-table-column>
          <el-table-column prop="fws_contact_name" label="姓名"></el-table-column>
          <el-table-column prop="created_at" label="创建时间" sortable></el-table-column>
          <el-table-column prop="pay_info.pay_fee_yuan" label="订单金额" sortable></el-table-column>
          <el-table-column prop="status" label="订单状态">
            <template slot-scope="scope">
              {{status[scope.row.status-1]}}
            </template>
          </el-table-column>
          <el-table-column width="120" label="操作" v-if='type==2'>
            <span slot-scope="scope" class="u-btn" @click="check(scope.row.split_order_id)">查看合伙人</span>
          </el-table-column>
        </el-table>
        <el-pagination class="pagination mt-20" v-if="total>searchCondition.per_page" @current-change="handleCurrentChange"
          :current-page.sync="searchCondition.page" :page-size="searchCondition.per_page" layout="total, prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import { dlsLists,hhrLists } from "@/api/agent"     
  import page from "@/utils/page"
  export default {
    name: "allOrder",
    data() {
      return {
        Visible: false, //弹框显示
        tableDataLoading: false,
        tabForShow: "1",
        searchCondition: {
          page: 1,
          search: {
            type: "1",
            is_company: 1
          },
          per_page: 1
        },
        type: 2, //:1平台,2代理商,3合伙人,4服务商
        partner:[],
        list: [],
        dialogsearch:{
          split_order_id:null,
          page:1,
          per_page:8,
        },
        dialogtotal:0,
        status: ['待付款', '待发货', '待收货', '交易成功', '已取消', '已关闭', '已删除']
      }
    },
    mixins: [page],
    created() {
      // this.type = this.$store.getters.getType //获取用户身份
      this.searchCondition.search.type = this.tabForShow;
    },
    methods: {
      check(split_order_id) {
        this.$set(this.dialogsearch, "page", 1);
        this.$set(this.dialogsearch, "split_order_id", split_order_id);
         hhrLists(this.dialogsearch)
          .then(({
            data
          }) => {
            this.partner = data.data;
            this.dialogtotal = data.total;
            this.Visible = true;
          })
      },
      handleChange(val){
        this.$set(this.dialogsearch, "page", val);
        hhrLists(this.dialogsearch)
        .then(({
          data
        }) => {
          this.partner = data.data;
          this.dialogtotal = data.total;
        })
      },
      closeSearch() {
        this.$refs.isShow.closeSearch();
      },
      tabSwitch({
        name
      }) {
        // tab面板切换
        this.searchCondition.page = 1;
        this.searchCondition.search = {};
        this.searchCondition.search.type = this.tabForShow;
        this.searchMethod();
      },
      _doSearch() {
        // 调用列表api
        this.tableDataLoading = true;
        dlsLists(this.searchCondition)
          .then(({
            data
          }) => {
            this.tableDataLoading = false;
            this.list = data.data;
            this.total = data.total;
          })
      }
    }
  }

</script>

<style lang="scss">
  .orderTable {
    .el-dialog {
      min-width: 711px !important;
    }
  }

</style>
