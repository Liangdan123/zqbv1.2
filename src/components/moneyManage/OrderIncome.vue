<template>
  <div >
    <!--...................会员管理表格..................-->
    <el-table :data="list" style="width: 100%;margin-top: 20px;" empty-text="暂无收入信息" >
      <el-table-column prop="type" label="服务商"></el-table-column>
      <el-table-column prop="is_company" label="性质"></el-table-column>
      <el-table-column prop="no" label="订单号" width='200'></el-table-column>
      <el-table-column prop="price" label="订单金额" ></el-table-column>
      <el-table-column prop="created_at" label="创建时间"></el-table-column>
      <el-table-column prop="income"  label="佣金收入"></el-table-column>
    </el-table>
    <!--...................会员管理分页..................-->
    <el-pagination class="pagination mt-20" v-if="total>searchCondition.per_page" @current-change="handleCurrentChange" :current-page.sync="searchCondition.page"
      :page-size="searchCondition.per_page" layout="total, prev, pager, next" :total="total">
    </el-pagination>
  </div>
</template>

<script>
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
      handleCurrentChange(val) {
        this.$emit("handleCurrent", val)
      },
    }
  }

</script>
