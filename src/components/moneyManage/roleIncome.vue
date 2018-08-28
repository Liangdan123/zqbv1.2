<template>
  <div >
    <!--...................会员管理表格..................-->
    <el-table :data="list" style="width: 100%;margin-top: 20px;" empty-text="暂无收入信息" @sort-change="sortChange">
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="is_company" label="角色发展"></el-table-column>
      <el-table-column prop="type" label="性质"></el-table-column>
      <el-table-column prop="price" label="加盟费" sortable="custom"></el-table-column>
      <el-table-column prop="created_at" sortable="custom" label="创建时间"></el-table-column>
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
      //排序
      sortChange(column, prop, order) {
        //用于清空样式（点击搜索，清空时）
        this.order = column;
       	switch(true){
					case column.prop==="price"&&column.order==="descending":				
						this.sortCommon({sell_num:"desc"})
						break;
					case column.prop==="price"&&column.order==="ascending":				
						this.sortCommon({sell_num:"asc"})
						break;
					case column.prop==="created_at"&&column.order==="descending":				
						this.sortCommon({create_time:"desc"})
						break;
					case column.prop==="created_at"&&column.order==="ascending":				
						this.sortCommon({create_time:"asc"})
						break;
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
