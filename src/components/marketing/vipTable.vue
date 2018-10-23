<template>
  <div class="tableArrow">
    <!--...................会员管理表格..................-->
    <el-table :data="list" style="width: 100%;margin-top: 20px;" empty-text="暂无会员信息" @sort-change="sortChange">
      <el-table-column prop="level" label="会员等级">
	      	<template slot-scope="scope">
						{{scope.row.level|levelString}}
					</template>
      </el-table-column>
      <el-table-column prop="nick_name" label="会员昵称">
      </el-table-column>
      <el-table-column prop="phone" label="手机号">
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
  export default {
    data() {
      return {
        order: null
      }
    },
    filters:{
			levelString(val){//会员等级
				return val===1?"普通用户":val===2?"普通会员":val===3?"黄金会员":val===4?"钻石会员":""
			}
		},
    props: {
      searchCondition:{
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
        console.dir(this.searchCondition);
        this.$emit("searchMethod")
      },
      handleCurrentChange(val) {
        this.$emit("handleCurrent", val)
      },
    }
  }

</script>


