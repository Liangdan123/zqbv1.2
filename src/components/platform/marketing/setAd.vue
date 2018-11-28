<template>
  <div class="setAd">
    <el-dialog title="添加广告" :visible.sync="dialogVisible" :close-on-click-modal="false" class="content">
    </el-dialog>
    <div class="clearfix mb-20">
      <el-button class="store-button2 del  float-l" @click="batchDel">
        <span class="iconfont icon-shanchu"></span>
        <span>批量删除</span>
      </el-button>
      <el-button class="store-button2   float-r" @click="addAd">
        <span class="iconfont icon-tianjia"></span>
        <span>添加广告</span>
      </el-button>
    </div>
    <el-table :data="list.data" style="width: 100%" @selection-change="SelectionChange" v-loading="loading" :empty-text="emptyText">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="contact_name" label="广告组名称"></el-table-column>
      <el-table-column prop="contact_phone" label="广告位置"></el-table-column>
      <el-table-column prop="wx_qq" label="开始"> </el-table-column>
      <el-table-column prop="created_at" label="结束"></el-table-column>
      <el-table-column prop="created_at" label="海报播放间隔(秒)"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click.stop="edit(scope.$index)">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="clearfix mt-20">
      <el-pagination :total="list.total" :current-page.sync="list.current_page" :page-size="list.per_page" layout="total, prev, pager, next"
        @current-change="handleCurrentChange" v-if="list.total>list.per_page" class="pagination">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import page from "@/utils/page"
  import {
    getAdList,
    deleteAdList
  } from "@/api/platform"
  import {
    getServerAdList,
    deleteServerAdList
  } from "@/api/servicer"
  export default {
    data() {
      return {
        searchCondition: { //搜索条件
          search: {},
          page: 1,
          per_page: 20,
        },
        loading: true,
        list: {
          data: []
        },
        dialogVisible: false, //服务商弹框
      }
    },
    mixins: [page],
    props: {
      activeName: {
        default: function () {
          return 1
        }
      },
      isDistribution: {
        type: Boolean,
        default: function () {
          return true
        }
      }
    },
    methods: {
      _doSearch() { //获取广告列表
        this.$set(this.searchCondition.search, "type", Number(this.activeName));
        if (this.isDistribution) { //平台
          getAdList(this.searchCondition)
            .then(({
              data
            }) => {
              this.list = data;
              this.loading = false;
            })
        } else if (!this.isDistribution) { //服务商
          this.$set(this.searchCondition, "user_id", this.$store.state.user.user.zhixu_id);
          getServerAdList(this.searchCondition)
            .then(({
              data
            }) => {
              this.list = data;
              this.loading = false;
            })
        }
      },
      batchDel() { //批量删除触发
        if (this.selectArr.length == 0) {
          this.$message({
            showClose: true,
            message: '请选择要删除的广告',
            type: 'info'
          });
          return;
        }
        if (!this.isDistribution) { //服务商
          this.$set(this.deleteList, "user_id", this.$store.state.user.user.zhixu_id);
        }
        this._deleteMethods(this.selectArr);
      },
      _deleteMethods(data) { //批量(每行删除)删除广告			
        this.$confirm('你是否确定删除此信息', '温馨提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          lockScroll: false
        }).then(() => {
          if (this.isDistribution) { //批量删除广告数据(平台)
            deleteAdList(data)
              .then(({
                data
              }) => {
                this._status(data)
              })
          } else if (!this.isDistribution) {
            deleteServerAdList(data) //批量删除服务商分配广告数据
              .then(({
                data
              }) => {
                this._status(data)
              })
          }
        }).catch(() => {
          if (event.srcElement.innerText == "取消") {
            return;
          }
        })
      },
      _status(data) {
        switch (data.status) {
          case "part_success":
            this.$message({
              showClose: true,
              message: '部分商品删除失败',
            });
            break;
          case "all_fail":
            this.$message.error('删除失败');
            break;
          default:
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            });
        };
        this.searchMethod();
      },
      closeMood() { //确认分配管坯弹窗
        this.dialogVisible = false;
      }
    }
  }

</script>

<style lang="scss">
  .setAd {
    .store-button2.del {
      span {
        color: #B4282D;
      }
    }
  }

</style>
