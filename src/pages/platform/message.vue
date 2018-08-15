<template>
  <div class="commodity platform ">
    <Navbar></Navbar>
    <div class="g-content">
      <el-dialog :title="dialogType[dialogIndex].title" :visible.sync="Visible" size="tiny" :close-on-click-modal="false">
        <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 5}" placeholder="请输入内容" v-model="content"></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('ruleForm')">{{dialogType[dialogIndex].btn}}</el-button>
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
          <el-table-column prop="created_at" label="创建时间"></el-table-column>
          <el-table-column prop="content" label="消息内容" width="650"></el-table-column>
          <el-table-column label="操作">
            <el-button type="text" size="small " @click="edit(scope.row,scope.$index)" slot-scope="scope">
              修改消息
            </el-button>
          </el-table-column>
        </el-table>
        <!-- <el-pagination class="pagination mt-20" v-if="resultTotalForFilter>pageSize" @current-change="handleCurrentChange" :current-page.sync="currentPage"
        :page-size="pageSize" layout="total, prev, pager, next" :total="resultTotalForFilter">
      </el-pagination> -->
      </el-tabs>
    </div>

  </div>
</template>

<script>
  import Navbar from "@/components/platform/Navbar";
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
        dialogIndex: 1,
        content: "",
        list: [{
          "message_id": 1,
          "content": "上对方答复",
          "created_at": "2018-08-07 08:45:11"
        }]
      }
    },
    components: {
      Navbar
    },
    methods: {
      SelectionChange() {},
      cancel() {},
      add() {},
      moreRemove() {}
    }
  }

</script>

<style scoped lang="scss">
  .remove {
    span {
      color: #B4282D;
    }
    &:hover {
      background: #B4282D;
      border-color: #B4282D;
      span {
        color: #FFFFFF;
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
