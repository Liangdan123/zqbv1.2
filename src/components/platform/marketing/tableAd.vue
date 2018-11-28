<template>
  <div class="tableAd">
    <el-dialog title="服务商" :visible.sync="dialogVisible" :close-on-click-modal="false" class="content">
      <serviceList :ad_ids="distributeList" :closeMood="closeMood">
      </serviceList>
    </el-dialog>
    <el-dialog title="查看详情" :visible.sync="detailShow"   :close-on-click-modal="false" class="content">
        
    </el-dialog>
    <div class="clearfix mb-10">
      <div class="button float-l">
        <el-button class="store-button2" v-if="isDistribution" @click="distribute">
          <span class="iconfont icon-Rectangle"></span>
          <span>分配广告</span>
        </el-button>
        <el-button class="store-button2 del" @click="batchDel">
          <span class="iconfont icon-shanchu"></span>
          <span>批量删除</span>
        </el-button>
      </div>
      <search :componentList="['input']" @searchMethod="searchAd" :search.sync="searchCondition.search">
      </search>
    </div>
    <el-table :data="list.data" style="width: 100%" @selection-change="handleSelection" v-loading="loading" :empty-text="emptyText">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="group_name" label="组名字" width='100'>
      </el-table-column>
      <el-table-column prop="group_location_name" label="广告位置" width='200'>
      </el-table-column>
      <el-table-column prop="ad_no" label="广告ID" width='100'>
      </el-table-column>
      <el-table-column prop="image_url" label="广告海报" width='120'>
        <img :src="scope.row.image_url" alt="" slot-scope="scope" class='adimg'>
      </el-table-column>
      <el-table-column prop="contact_name" label="姓名" width='60'>
      </el-table-column>
      <el-table-column prop="contact_phone" label="手机号" width='115'>
      </el-table-column>
      <el-table-column prop="wx_qq" label="QQ" width='100'>
      </el-table-column>
      <el-table-column prop="created_at" label="创建时间" width='170'>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click.stop="check(scope.$index)">
            查看详情
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
    deleteAdList,
  } from "@/api/platform"
  import {
    getServerAdList,
    deleteServerAdList,
  } from "@/api/servicer"
  export default {
    components: {
      "serviceList": () => import('@/components/platform/marketing/serviceList')
    },
    data() {
      return {
        searchCondition: { //搜索条件
          search: {},
          page: 1,
          per_page: 20,
        },
        loading: false,
        list: {
          data: []
        },
        detailShow:false,
        emptyText: "暂无数据",
        time: "", //用于清空样式
        deleteList: {
          data: []
        }, //批量删除
        onlyDelete: {
          data: []
        }, //每行中的删除
        dialogVisible: false, //服务商弹框
        distributeList: [], //分配数据列表
      }
    },
    mixins: [page],
    props: {
      isDistribution: {
        type: Boolean,
        default: function () {
          return true
        }
      }
    },
    watch: {
      activeName(val) {
        this.searchCondition = { //搜索条件
          search: {},
          page: 1,
          per_page: 20,
        };
        this.loading = true;
        this.searchMethod();
      }
    },
    methods: {
      _doSearch() { //获取广告列表
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
      check(index){
        this.activeIndex=index;
        this.detailShow=true;
      },
      searchAd() { //输入相关信息搜索
        this.emptyText = "未搜索到相关匹配信息";
        this.searchMethod();
      },
      handleSelection(val) { //选中列表
        let arr = [];
        if (this.isDistribution) { //平台
          for (let item of val) {
            arr.push({
              ad_data_id: item.ad_data_id
            });
          };
        } else { //服务商
          for (let item of val) {
            arr.push({
              distribute_id: item.distribute_id
            });
          };
        }
        this.$set(this.deleteList, "data", arr);
        this.distributeList = JSON.parse(JSON.stringify(arr));
      },
      batchDel() { //批量删除触发
        if (this.deleteList.data.length == 0) {
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
        this._deleteMethods(this.deleteList);
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
      distribute() { //分配广告按钮
        if (this.deleteList.data.length == 0) {
          this.$message({
            showClose: true,
            message: '请选择要分配的广告',
            type: 'info'
          });
          return;
        }
        this.dialogVisible = true;
      },
      closeMood() { //确认分配管坯弹窗
        this.dialogVisible = false;
      }
    }
  }

</script>

<style lang="scss">
  .tableAd {
    .button {
      .store-button2.del {
        span {
          color: #B4282D;
        }
      }
    }
  }

</style>
<style scoped>
  .adimg {
    width: 70px;
    height: 50px;
    border-radius: 2px;
    padding:10px 0;
  }

</style>
