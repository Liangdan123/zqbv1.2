<template>
  <div class="tableArrow">
    <!--...................会员管理表格..................-->
    <el-table :data="list" style="width: 100%;margin-top: 20px;" empty-text="暂无会员信息" @sort-change="sortChange">
      <el-table-column prop="nick_name" label="会员昵称">
      </el-table-column>
      <el-table-column prop="balance_yuan" sortable="custom" label="存额余额">
      </el-table-column>
      <el-table-column prop="created_at" sortable="custom" label="创建时间">
      </el-table-column>
      <el-table-column prop="latest_login_time" sortable="custom" label="最后登陆时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="props">
          <span style="color: #0070C9!important;" class="cursor" @click="recharge(props.$index)">充值记录</span>
        </template>
      </el-table-column>
    </el-table>
    <!--...................会员管理分页..................-->
    <el-pagination class="pagination mt-20" v-if="total>searchCondition.per_page" @current-change="handleCurrentChange" :current-page.sync="searchCondition.page"
      :page-size="searchCondition.per_page" layout="total, prev, pager, next" :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import pagination from "@/components/order/pagination"
  import {
    getMemLists,
    getRechargeLists
  } from "@/api/marketing"
  export default {
    data() {
      return {
      
      }
    },
    created() {
      var mall_id = this.$store.getters.getMall_id;
      this.$set(this.orderMess, "mall_id", mall_id);
      this.$set(this.rechargeMess, "mall_id", mall_id);
      this.searchMethods();
    },
    components: {
      pagination,
    },
    methods: {
      //排序
      sortChange(column, prop, order) {
        //用于清空样式（点击搜索，清空时）
        this.order = column;
        switch (true) {
          case column.prop === "balance_yuan" && column.order === "descending":
            this.sortCommon({
              balance: "desc"
            })
            break;
          case column.prop === "balance_yuan" && column.order === "ascending":
            this.sortCommon({
              balance: "asc"
            })
            break;
          case column.prop === "created_at" && column.order === "descending":
            this.sortCommon({
              created_at: "desc"
            })
            break;
          case column.prop === "created_at" && column.order === "ascending":
            this.sortCommon({
              created_at: "asc"
            })
            break;
          case column.prop === "latest_login_time" && column.order === "descending":
            this.sortCommon({
              latest_login_time: "desc"
            })
            break;
          case column.prop === "latest_login_time" && column.order === "ascending":
            this.sortCommon({
              latest_login_time: "asc"
            })
            break;
        }
      },
      sortCommon(data) {
        this.$set(this.orderMess, "orderby", data);
        this.searchMethods()
      },
      inputName() {
        if (this.order_search === "") {
          //当值为空的时候全部显示出列表
          if (this.orderMess.search.nick_name !== undefined) {
            delete this.orderMess.search
          }
        } else {
          this.$set(this.orderMess, "search", {
            nick_name: this.order_search
          });
        };
        //清空排序样式
        if (JSON.stringify(this.order) !== "{}") {
          this.order.column.prop = "";
          this.order.column.order = "";
        };
        this.searchMethods();
      },
      //搜索方法
      searchMethods() {
        if (this.orderMess.page == 1) {
          //页面在第一页搜索手动调接口获取数据列表
          this.orderList(this.orderMess);
        } else {
          //页面在第一页搜索列表就让他回到第一页然后触发handleCurrentChange（）方法（页面更改设置触发）
          this.orderMess.page = 1;
        }
      },
      handleCurrentChange(val) {
        this.$emit("handleCurrent", val)
      },
      //获取会员列表的借口
      orderList(data) {
        getMemLists(data)
          .then(({
            data
          }) => {
            this.orderData = data;
            this.loading = false;
            if (this.orderMess.orderby !== undefined) {
              delete this.orderMess.orderby
            }
          })
          .catch(({
            response: {
              data
            }
          }) => {
            this.$message.error(data.errorcmt);
            if (this.orderMess.orderby !== undefined) {
              delete this.orderMess.orderby
            }
          });
      },
      //充值记录按钮
      recharge(index) {
        this.boxTitle = this.orderData.data[index].nick_name + "的充值记录"; //弹窗标题
        this.dialogVisible = true;
        let xcx_user_id = this.orderData.data[index].xcx_user_id;
        this.$set(this.rechargeMess, "xcx_user_id", xcx_user_id);
        this.searchRecharge();
      },
      searchRecharge() { //搜索方法
        if (this.rechargeMess.page == 1) {
          //页面在第一页搜索手动调接口获取数据列表
          this.rechargeList(this.rechargeMess);
        } else {
          //页面在第一页搜索列表就让他回到第一页然后触发handleCurrentChange（）方法（页面更改设置触发）
          this.rechargeMess.page = 1;
        }
      },
      //充值记录分页
      rechargeCurrent(val) {
        this.$set(this.rechargeMess, "page", val);
        this.rechargeList(this.rechargeMess)
      },
      //充值记录列表接口
      rechargeList(data) {
        getRechargeLists(data)
          .then(({
            data
          }) => {
            this.rechargeData = data;
          })
          .catch(({
            response: {
              data
            }
          }) => {
            this.$message.error(data.errorcmt);
          });
      }
    }
  }

</script>

<style scoped="scoped">
  .search-input {
    height: 32px;
    line-height: 32px;
    background: #FFFFFF;
    border: 1px solid #D6D6D6;
    border-radius: 2px;
  }

  .search-input input {
    width: 206px;
    padding-left: 10px;
    display: block;
    height: 100%;
    border: none;
    outline: none;
    float: left;
  }

</style>
<style>
  .tableArrow .el-table th>.cell {
    color: #62778C;
    font-weight: normal;
  }

  .tableArrow .el-table td>.cell {
    color: #333;
  }

  .tableArrow .el-table.recharge td>.cell,
  .tableArrow .el-table th>.cell {
    white-space: nowrap;
    font-size: 12px;
  }

</style>
