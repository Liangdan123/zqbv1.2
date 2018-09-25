<template>
  <div class="commodity platform ">
    <Navbar></Navbar>
    <div class="g-content">
      <el-dialog :title="dialogType[dialogIndex].title" :visible.sync="Visible" size="tiny" :close-on-click-modal="false">
        <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 5}" placeholder="请输入内容" v-model="form.content"
          class="textarea"></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm">{{dialogType[dialogIndex].btn}}</el-button>
          <el-button @click="cancel" class="btn-silver">取 消</el-button>
        </div>
      </el-dialog>
      <el-tabs value="1">
        <el-tab-pane label="公告通知" name="1">
          <el-button class="store-button2 add mb-20" @click="add">
            <i class="iconfont icon-tianjia f12"></i>
            <span>添加消息</span>
          </el-button>
          <el-button class="store-button2 remove mb-20" @click="moreRemove">
            <i class="iconfont icon-shanchu f12"></i>
            <span>删除消息</span>
          </el-button>
        </el-tab-pane>
        <el-table :data="list" style="width: 100%" @selection-change="SelectionChange">
          <el-table-column type="selection" width="36"></el-table-column>
          <el-table-column prop="created_at" label="创建时间"></el-table-column>
          <el-table-column prop="content" label="消息内容" width="650"></el-table-column>
          <el-table-column label="操作">
            <el-button type="text" size="small " @click="edit(scope.row,scope.$index)" slot-scope="scope">
              修改消息
            </el-button>
          </el-table-column>
        </el-table>
      </el-tabs>
    </div>

  </div>
</template>

<script>
  import Navbar from "@/components/platform/manage/Navbar";
  import page from '@/utils/page'

  import {
    message_lists,
    addMessage,
    updateMessage,
    deleteMessage
  } from '@/api/platform'
  export default {
    data() {
      return {
        Visible: false,
        dialogType: [{
          'title': '添加消息',
          'btn': "添加"
        }, {
          'title': '修改消息',
          'btn': "完成"
        }],
        searchCondition: {
          page: 1,
          per_page: 20
        },
        dialogIndex: 0,
        form: {
          content: ""
        },
        list: [],
        actionIndex: null
      }
    },
    components: {
      Navbar
    },
    mixins: [page],
    methods: {
      submitForm() {
        //调接口添加一条记录
        // 判断dialogindex是否是新增
        if (this.dialogIndex == 0) {
          addMessage(this.form).then(({
            data
          }) => {
            this.list.push(data)
          })
        } else {
          updateMessage(this.form).then(({
            data
          }) => {
            this.list.splice(this.actionIndex, 1, data)
          })
        }
        this.actionIndex = null;
        this.Visible = false;
      },
      cancel() {
        this.form = {
          content: ""
        }
        this.actionIndex = null;
        this.Visible = false;
      },
      _doSearch() {
        message_lists(this.searchCondition)
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
      edit(data, index) {
        this.form = {
          content: data.content,
          message_id: data.message_id
        }
        this.dialogIndex = 1;
        this.actionIndex = index;
        this.Visible = true;
      },
      add() {
        this.form = {
          content: ""
        }
        this.dialogIndex = 0;
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
              message_id: val.message_id
            })
          }
          deleteMessage(arr).then(({
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
        }).catch(() => {
          return;
        })
      },
    }
  }

</script>

<style scoped lang="scss">
  .remove {
    span {
      color: #B4282D;

      .icon-shanchu {
        color: #B4282D;
      }
    }

    &:hover {
      background: #B4282D;
      border-color: #B4282D;

      span {
        color: #FFFFFF;

        .icon-shanchu {
          color: #FFFFFF;
        }
      }
    }

    &:active {
      background: #821D20;
      border-color: #821D20;

      span {
        color: #FFFFFF;
      }
    }
  }

</style>
