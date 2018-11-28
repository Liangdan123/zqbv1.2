<template>
  <div class="setAd">
    <el-dialog title="添加广告" :visible.sync="visible" :close-on-click-modal="false">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="广告组名称：">
          <el-input v-model="formInline.name" placeholder="请输入广告组名称"></el-input>
        </el-form-item>
        <el-form-item label="广告位置：">
          <el-select v-model="formInline.region" placeholder="请选择广告位置">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间：">
          <el-time-select placeholder="起始时间" v-model="formInline.startTime">
          </el-time-select>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-time-select placeholder="结束时间" v-model="formInline.endTime" :picker-options="{minTime: formInline.startTime}">
          </el-time-select>
        </el-form-item>
          <el-form-item label="海报播放间隔(秒)：">
          <el-select v-model="formInline.region" placeholder="请选择间隔时间">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="clearfix mb-20">
      <el-button class="store-button2 del  float-l" @click="moreRemove">
        <span class="iconfont icon-shanchu"></span>
        <span>批量删除</span>
      </el-button>
      <el-button class="store-button2   float-r" @click="addAd">
        <span class="iconfont icon-tianjia"></span>
        <span>添加广告</span>
      </el-button>
    </div>
    <el-table :data="list.data" style="width: 100%" @selection-change="SelectionChange" v-loading="loading">
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
    getAdGroupList,
    addAdGroup,
    updateAdGroup,
    delAdGroupList
  } from "@/api/platform"
  export default {
    data() {
      return {
        searchCondition: { //搜索条件
          page: 1,
          per_page: 20,
        },
        formInline: {
          name: '',
          region: '',
          startTime: '',
          endTime: ''
        },
        loading: true,
        list: {
          data: []
        },
        visible: true, //服务商弹框
      }
    },
    mixins: [page],
    methods: {
      addAd() {},
      _doSearch() { //获取广告列表
        getAdGroupList(this.searchCondition)
          .then(({
            data
          }) => {
            this.list = data;
            this.loading = false;
          })
      },
      moreRemove() {
        if (this.selectArr.length == 0) {
          this.$message.error("尚未选中某项");
          return;
        }
        this.$confirm('你是否确定删除此广告组？确定后将删除改组中所有广告内容？', '温馨提示', {
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
              group_id: val.group_id
            })
          }
          delAdGroupList({
            data: arr
          }).then(({
            data
          }) => {
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
            this._doSearch()
          })
        })
      },
      closeMood() { //确认分配管坯弹窗
        this.visible = false;
      }
    }
  }

</script>

<style lang="scss" scoped>
  .setAd {
    .store-button2.del {
      span {
        color: #B4282D;
      }
    }
  }
</style>

<style lang="scss" >
  .setAd {
    .el-dialog--small {
     width:730px;
    }
  }

</style>

