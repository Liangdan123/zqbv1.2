<template lang="html">
  <div class="demand commodity">
    <el-dialog title="需求信息" :visible.sync="Visible" :close-on-click-modal="false">
      <el-form label-width="6em">
        <el-form-item label="姓名：">
          {{xuqiu.name}}
        </el-form-item>
        <el-form-item label="手机号：">
          {{xuqiu.phone}}
        </el-form-item>
        <el-form-item label="创建时间：">
          {{xuqiu.created_at}}
        </el-form-item>
        <el-form-item label="需求留言：">
          {{xuqiu.content}}
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="g-content">
      <el-button class="store-button2 remove mb-20" @click="moreRemove">
        <i class="iconfont icon-shanchu f12"></i>
        <span>批量删除</span>
      </el-button>
      <search :search.sync="searchCondition.search" @searchMethod="searchMethod" ref="isShow" class='float-r'
        :componentList="['input']" inputSearch='order_search' hintMess="输入相关信息进行搜索">
      </search>
      <el-table :data="list" style="width: 100%" @selection-change="SelectionChange">
        <el-table-column type="selection" width="36"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="content" label="需求留言"> </el-table-column>
        <el-table-column prop="created_at" label="创建时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small " @click="check(scope.row)">
              查看更多
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-if="total>searchCondition.per_page" @current-change="handleCurrentChange" :current-page.sync="searchCondition.page"
        :page-size="searchCondition.per_page" layout="total, prev, pager, next" :total="total"> </el-pagination>
    </div>
  </div>
</template>

<script>
  import page from '@/utils/page'
  import Navbar from "@/components/platform/manage/Navbar";
  import {
    delXuqiu,
    xuqiuList
  } from '@/api/platform'
  export default {
    data() {
      return {
        list: [],
        searchCondition: {
          page: 1,
          per_page: 20,
        },
        xuqiu: {},
        total: 0,
        Visible: false,
      }
    },
    mixins: [page],
    methods: {
      _doSearch() {
        xuqiuList(this.searchCondition)
          .then(({
            data
          }) => {
            if (data.data.length == 0 && data.total > 0) {
              this.handleCurrentChange(data.last_page)
            }
            this.list = data.data;
            this.total = data.total;
          })
      },
      check(data) {
        this.xuqiu = data;
        this.Visible = true;
      },
      moreRemove() {
        if (this.selectArr.length == 0) {
          this.$message.error("尚未选中某项");
          return;
        }
        this.$confirm('确认删除选中列表？', '温馨提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          lockScroll: false
        }).then(() => {
          //删除接口用返回值替换list
          let arr = {
            data: []
          };
          for (let val of this.selectArr) {
            arr.data.push({
              xuqiu_id: val.xuqiu_id
            })
          }
          delXuqiu({data:arr}).then(({
            data
          }) => {
            let success = true;
            for (let val of data.data) {
              if (val.errcode) {
                this.$message.error("删除失败");
                success = false;
                break;
              }
            }
            success && this.$message.success("删除成功");
            this._doSearch()
          })
        })
      }
    }
  }

</script>


<style media="screen" lang="scss" scoped>
  .demand {
    .remove {
      span,.icon-shanchu {
        color: #B4282D;
      }
      &:hover {
        background: #B4282D;
        border-color: #B4282D;
        span,.icon-shanchu {
          color: #FFFFFF;
        }
      }
      &:active {
        background: #821D20;
        border-color: #821D20;
        span,.icon-shanchu {
          color: #FFFFFF;
        }
      }
    }
  }
  .el-form-item{
      margin-bottom: 0;
  }
</style>

<style>
  .demand .el-dialog--small{
    width:900px;
  }
</style>
