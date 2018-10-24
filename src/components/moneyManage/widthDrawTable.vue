<template>
  <div class="mt-10">
    <div class="order-list-wrap" v-if="Visible">
      <el-table class="mt-10 fundList" :data="list.data" style="width: 100%">
        <el-table-column label="提现金额">
          <template slot-scope="scope">
            <span class="font-waring">{{ scope.row.apply_money_yuan||0 | money}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="apply_time" label="创建时间">
        </el-table-column>
        <el-table-column prop="tixian_type" label="提现方式">
          <template slot-scope="scope">
            {{scope.row.tixian_type|type}}
          </template>
        </el-table-column>
        <el-table-column label="提现状态">
          <template slot-scope="scope">
            <span :class="{'font-waring':scope.row.status==3}">{{ scope.row.status | withdrawalStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" width="120">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status==2" @click="withdrawalConfirm(scope.row.tixian_id)" class="store-button1"
              type="primary">
              确认收款</el-button>
            <p class="u-btn" @click="withdrawalDetailShow(scope.row.tixian_id)"> 查看详情 </p>
          </template>
        </el-table-column>
      </el-table>
      <div class="clearfix mt-20">
        <el-pagination :total="list.total" v-if='list.total>searchCondition.per_page' :current-page.sync="searchCondition.page"
          :page-size="searchCondition.per_page" layout="total, prev, pager, next" @current-change="handleCurrentChange"
          class="float-r">
        </el-pagination>
      </div>
    </div>
    <WithdrawDetail v-if="!Visible" :tixian_id="tixian_id" @backDetail="backDetail" @sureFund="sureFund" isbtn="true"></WithdrawDetail>
  </div>
</template>

<script>
  import page from "@/utils/page"
  import {
    sureReceivables
  } from "@/api/servicer"
  import {
    getFundList
  } from "@/api/platform"
  export default {
    name: "MoneyWithdrawaklDetail",
    components: {
      "WithdrawDetail": () => import("@/components/moneyManage/WithdrawDetail")
    },
    filters: {
      money(value = 0) {
        // 金额转换成数字和整数部分
        value = Number(value).toFixed(2).split('.');
        let value_int = value[0].toLocaleString(); // 转换成金额形式
        return `￥ ${value_int}.${value[1]}`;
      },
      type(val) { //角色转换
        let num = +val
        switch (num) {
          case 1:
             return "支付宝"
            break;
          case 2:
             return "微信"
            break;
           case 3:
             return "银行卡"
            break;
        }
      },
      withdrawalStatus(status) {
        let status_text = {
          1: function () {
            return '等待平台汇款'
          },
          2: function () {
            return '等待商家确认收款'
          },
          3: function () {
            return '提现失败'
          },
          4: function () {
            return '提现完成'
          },
        };
        return status_text[status]()
      },
    },
    props: ["user_id", "typeKey"],
    data() {
      return {
        withdrawalClickId: '',
        tixian_id: "",
        Visible: true,
        list: {
          data: []
        },
        searchCondition: { //搜索条件
          user_id: "",
          search: {
            type: "",
          },
          page: 1,
          per_page: 20,
        },
      }
    },
    watch: {
      user_id(val) { //蒋父集传过来的值赋值给searchCondition；
        this.$set(this.searchCondition, "user_id", val);
        this.searchMethod();
      },
      typeKey() {
        this.$set(this.searchCondition, "search", {
          type: this.typeKey
        });
        this.searchMethod();
      }
    },
    created() {
      this.$set(this.searchCondition, "user_id", this.user_id);
      this.$set(this.searchCondition, "search", {
        type: this.typeKey
      });
    },
    mixins: [page],
    methods: {
      _doSearch() { //搜索角色列表信息
        getFundList(this.searchCondition)
          .then(({
            data
          }) => {
            this.list = data;
          })
      },
      init() {
        console.log(11111);
        this.searchMethod();
        this.Visible = true;
      },
      withdrawalDetailShow(tixian_id) {
        this.tixian_id = tixian_id;
        this.Visible = false;
      },
      backDetail() {
        this.Visible = true;
      },
      sureFund() { //确认收款
        this._doSearch()
        this.Visible = true;
      },
      withdrawalConfirm(tixian_id) {
        this.$confirm('你是否确认已收款？', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(() => {
            sureReceivables(tixian_id)
              .then(() => {
                this.$message({
                  message: '确认收款成功',
                  type: 'success'
                });
                this.sureFund();
              })
          })
          .catch(() => {
            this.$message({
              message: '已取消',
              type: 'info'
            });
          })
      }
    },
  }

</script>

<style lang="scss">
  .order-list-wrap {
    .el-table.fundList {
      .el-table__body-wrapper {
        tr {
          height: 70px;

          .store-button1 {
            height: 24px;
            font-size: 10px;
            padding: 0 4px;
          }
        }
      }
    }
  }

</style>
