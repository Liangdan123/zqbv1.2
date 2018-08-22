<template>
  <div class="memberCenter">
    <div class="content">
      <!--................累计金额.............-->
      <member :money="money"></member>
      <!--................会员管理与充值优惠管理切换.............-->
      <div class="content-con mt-20">
        <el-tabs v-model="activeName">
          <div class="buttons clearfix mb-20">
            <search :search.sync="searchCondition.search" @searchMethod="searchMethod" @emptyMthod='emptyMthod'  ref="isShow" selectTitle='筛选会员' hintMess="输入相关信息进行搜索">
              <template>
                <div class="condition clearfix mb-10">
                  <span class="float-l grade">会员等级：</span>
                    <el-radio-group v-model="searchCondition.search.level" class="float-l">
                      <el-radio :label="2" class="display-b">普通会员</el-radio>
                      <el-radio :label="3" class="display-b">黄金会员</el-radio>
                      <el-radio :label="4" class="display-b">钻石会员</el-radio>
                    </el-radio-group>
                </div>
              </template>
            </search>
          </div>
          <el-tab-pane label="会员管理" name="first">
            <!-- 会员管理表格 数据父组件提供 -->
            <vipTable :searchCondition='searchCondition' :list="list" :total="total" @searchMethod="searchMethod"></vipTable>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getMemMoney
  } from "@/api/marketing"
  import {
    getMemLists
  } from "@/api/marketing"
  import vipTable from "@/components/marketing/vipTable"
  import member from "@/components/marketing/member"
  import page from '@/utils/page'
  export default {
    components: {
      vipTable,
      member
    },
    mixins: [page],
    data() {
      return {
        money: {},
        activeName: "first",
        searchCondition: {
          page: 1,
          search: {},
          per_page: 20
        },
        list: []
      }
    },
    created() {
      //调用获取会员统计数据API
      var mall_id = this.$store.getters.getMall_id;
      getMemMoney(mall_id)
        .then(({
          data
        }) => {
          this.money = data;
        })
        .catch(({
          response: {
            data
          }
        }) => {
          this.$message.error(data.errorcmt);
        })
    },
    methods: {
      emptyMthod(){
        delete this.searchCondition.search.level//删除等级条件
				this.searchMethods()
			},
      _doSearch() {
        getMemLists(this.searchCondition)
          .then(({
            data
          }) => {
            this.list = data.data;
            this.loading = false;
            if (this.searchCondition.orderby !== undefined) {
              delete this.searchCondition.orderby
            }
          })
          .catch(({
            response: {
              data
            }
          }) => {
            this.$message.error(data.errorcmt);
            if (this.searchCondition.orderby !== undefined) {
              delete this.searchCondition.orderby
            }
          });
      },
    }
  }

</script>

<style scoped="scoped">
  .memberCenter {
    margin-top: 120px;
  }

  .content {
    box-sizing: border-box;
    width: 1240px;
    min-height: 204px;
    border-radius: 4px;
    margin: 0 auto;
  }
  .grade{
    line-height: 25px;
    margin-right: 10px;
  }
  .el-radio{
    line-height: 25px;
    margin: 0;
  }

  .border-b {
    border-bottom: 1px solid #F0F4F7;
  }

  .content-con {
    padding: 20px;
    background-color: #fff;
  }

</style>
