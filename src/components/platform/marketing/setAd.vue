<template>
  <div class="setAd">
    <el-dialog :title="dialogType[dialogIndex].title" :visible.sync="visible" :close-on-click-modal="false">
      <el-form :inline="true" :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="广告组名称：" prop="group_name">
          <el-input v-model="form.group_name" placeholder="请输入广告组名称"></el-input>
        </el-form-item>
        <el-form-item label="广告位置：" prop="group_location">
          <el-select v-model="form.group_location" placeholder="请选择广告位置">
            <el-option label="手机端 首页头部 750px*340px" value="mobile_home_head"></el-option>
            <el-option label="手机端 首页中部 700px*200px" value="mobile_home_middle"></el-option>
            <el-option label="PC端 首页头部 1920px*460px" value="pc_home_head"></el-option>
            <el-option label="PC端 首页中部 650px*340px" value="pc_home_middle"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间范围" prop="time">
          <el-date-picker v-model="form.time" type="datetimerange" range-separator="至" format placeholder='请选择显示时间范围'
            start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="海报播放间隔(秒)：" prop="interval_second">
          <el-select v-model="form.interval_second" placeholder="请选择间隔时间">
            <el-option v-for="count  in 10" :key="count" :label="count+'秒'" :value="count">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')">{{dialogType[dialogIndex].btn}}</el-button>
        <el-button @click="cancel" class="btn-silver">取 消</el-button>
      </div>
    </el-dialog>
    <div class="clearfix mb-20">
      <el-button class="store-button2 del  float-l" @click="moreRemove">
        <span class="iconfont icon-shanchu"></span>
        <span>批量删除</span>
      </el-button>
      <el-button class="store-button2   float-r" @click="add" v-if='list.total<20'>
        <span class="iconfont icon-tianjia"></span>
        <span>添加广告</span>
      </el-button>
    </div>
    <el-table :data="list.data" style="width: 100%" @selection-change="SelectionChange" v-loading="loading">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="group_name" label="广告组名称"></el-table-column>
      <el-table-column prop="group_location_name" label="广告位置" width='200'></el-table-column>
      <el-table-column prop="start_time" label="开始"> </el-table-column>
      <el-table-column prop="end_time" label="结束"></el-table-column>
      <el-table-column prop="interval_second" label="海报播放间隔(秒)"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click.stop="edit(scope.row,scope.$index)">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import page from "@/utils/page"
  import dayjs from 'dayjs'
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
        dialogType: [{
          'title': '添加广告',
          'btn': "添加"
        }, {
          'title': '修改广告',
          'btn': "完成"
        }],
        dialogIndex: 0,
        form: {},
        rules: {
          group_name: [{
            required: true,
            message: '请输入广告组名称',
            trigger: 'blur'
          }],
          group_location: [{
            required: true,
            message: '请选择广告位置',
            trigger: 'change'
          }],
          time: [{
            type: 'array',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }],
          interval_second: [{
            type: 'number',
            required: true,
            message: '请选择间隔时间',
            trigger: 'change'
          }]
        },
        loading: true,
        list: {
          data: []
        },
        actionIndex: null,
        visible: false, //服务商弹框
      }
    },
    mixins: [page],
    methods: {
      edit(data, index) {
        data = JSON.parse(JSON.stringify(data));
        this.form = {
          group_name: data.group_name,
          group_location: data.group_location,
          interval_second: data.interval_second,
          time: [+dayjs(data.start_time), +dayjs(data.end_time)],
          group_id: data.group_id
        }
        this.dialogIndex = 1;
        this.actionIndex = index;
        this.visible = true;
      },
      add() {
        if (this.list.data.length < 20) {
          this.dialogIndex = 0;
          this.form = {}
          this.visible = true;
          if (this.$refs['ruleForm']) {
            this.$refs['ruleForm'].resetFields();
          }
        } else {
          this.$message.error("广告组已经达到上限,请删除后重试")
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            return false;
          }
          let item = JSON.parse(JSON.stringify(this.form))
          item.start_time = dayjs(item.time[0]).format('YYYY-MM-DD HH:mm:ss');
          item.end_time = dayjs(item.time[1]).format('YYYY-MM-DD HH:mm:ss');
          delete item.time;
          if (this.dialogIndex == 0) {
            addAdGroup(item).then(({
              data
            }) => {
              this.searchMethod()
              this.$message.success("添加成功");
              this.actionIndex = "";
              this.visible = false;
            })
          } else { //发送修改请求
            updateAdGroup(item).then(({
              data
            }) => {
              this._doSearch()
              this.$message.success("保存成功");
              this.actionIndex = "";
              this.visible = false;
            })
          }
        });
      },
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
      cancel() {
        this.form = {
          content: ""
        }
        this.actionIndex = null;
        this.visible = false;
      },
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

<style lang="scss">
  .setAd {
    .el-dialog--small {
      width: 730px;
    }
  }

</style>
