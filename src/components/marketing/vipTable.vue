<template>
  <div class="tableArrow">
    <!--...................会员管理表格..................-->
    <el-table :data="list" style="width: 100%;margin-top: 20px;" empty-text="暂无会员信息" @sort-change="sortChange">
      <el-table-column prop="nick_name" label="会员等级">
      </el-table-column>
      <el-table-column prop="nick_name" label="会员昵称">
      </el-table-column>
      <el-table-column prop="tel" label="手机号">
      </el-table-column>
      <el-table-column prop="created_at" sortable="custom" label="创建时间">
      </el-table-column>
    </el-table>
    <!--...................会员管理分页..................-->
    <el-pagination class="pagination mt-20" v-if="total>searchCondition.per_page" @current-change="handleCurrentChange" :current-page.sync="searchCondition.page"
      :page-size="searchCondition.per_page" layout="total, prev, pager, next" :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import {
    getMemLists,
    getRechargeLists
  } from "@/api/marketing"
  export default {
    data() {
      return {
        order: null
      }
    },
    props: {
      searchCondition: {
        defalut: () => {
          return {
            page: 1,
            search: {},
            per_page: 20
          }
        }
      },
      list: {
        defalut: () => {
          return []
        }
      },
      total: {
        defalut: 0
      }
    },
    methods: {
      //排序
      sortChange(column, prop, order) {
        //用于清空样式（点击搜索，清空时）
        this.order = column;
        if (column.prop !== "created_at") {
          return;
        }
        if (column.order === "descending") {
          this.sortCommon({
            created_at: "desc"
          })
        } else {
          this.sortCommon({
            created_at: "asc"
          })
        }
      },
      sortCommon(data) {
        this.$set(this.searchCondition, "orderby", data);
        this.$emit("searchMethod")
      },
      handleCurrentChange(val) {
        this.$emit("handleCurrent", val)
      },
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
    color: $color-light;
  }

  .tableArrow .el-table.recharge td>.cell,
  .tableArrow .el-table th>.cell {
    white-space: nowrap;
    font-size: 12px;
  }

</style>
