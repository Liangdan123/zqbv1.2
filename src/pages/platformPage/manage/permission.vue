<template lang="html">
  <div class="commodity platform">
    <navbar></navbar>
    <el-dialog :title="dialogType[dialogIndex].title" :visible.sync="Visible" size="tiny" :close-on-click-modal="false">
      <el-form :model="form" :rules="rules" ref="ruleForm" class="dialog_form">
        <el-form-item label="姓名：" label-width="80px" prop="contact_name" required>
          <el-input v-model="form.contact_name" auto-complete="off" placeholder="请输入用户姓名" size="small"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" label-width="80px" prop="phone" required v-if='dialogIndex==0'>
          <el-input v-model="form.phone" auto-complete="off" placeholder="请输入用户手机号" size="small"></el-input>
        </el-form-item>
        <el-form-item prop="permission" required class="hr">
          <el-checkbox-group v-model="form.permission" class="clearfix">
            <el-checkbox label="监控中心" name="permission"></el-checkbox>
            <el-checkbox label="店铺管理" name="permission"></el-checkbox>
            <el-checkbox label="订单管理" name="permission"></el-checkbox>
            <el-checkbox label="营销管理" name="permission"></el-checkbox>
            <el-checkbox label="商城设置" name="permission"></el-checkbox>
            <el-checkbox label="资金管理" name="permission"></el-checkbox>
            <el-checkbox label="平台管理" name="permission"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')">{{dialogType[dialogIndex].btn}}</el-button>
        <el-button @click="cancel" class="btn-silver">取 消</el-button>
      </div>
    </el-dialog>
    <div class="g-content">
      <el-button class="store-button2 add mb-20" @click="add">
        <i class="iconfont icon-tianjia f12"></i>
        <span>添加用户</span>
      </el-button>
      <el-button class="store-button2 remove mb-20" @click="moreRemove">
        <i class="iconfont icon-shanchu f12"></i>
        <span>批量删除</span>
      </el-button>
      <el-table :data="list" style="width: 100%" @selection-change="SelectionChange">
        <el-table-column type="selection" width="36"></el-table-column>
        <el-table-column prop="contact_name" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="permission" label="拥有权限" width="500">
          <template slot-scope="scope">
            <span v-if="scope.row.permission.length==7||scope.row.is_admin==1">全部权限</span>
            <span v-for="(item,index) in scope.row.permission" v-else>
              {{index!=scope.row.permission.length-1?permission[item]+",":permission[item]}}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间"></el-table-column>
        <el-table-column label="操作">
          <el-button type="text" size="small " @click="edit(scope.row,scope.$index)" slot-scope="scope">
            设置权限
          </el-button>
        </el-table-column>
      </el-table>
      <el-pagination  v-if="total>searchCondition.per_page"  @current-change="handleCurrentChange" 	:current-page.sync="searchCondition.page"
        :page-size="searchCondition.per_page"  layout="total, prev, pager, next" :total="total"> </el-pagination>
    </div>
  </div>
</template>

<script>
  import Navbar from "@/components/platform/manage/Navbar";
  import page from '@/utils/page'
import {platformLists,addPlatform,savePermission,deletePlatform} from '@/api/platform'
  export default {
    data() {
      return {
        list: [],
        searchCondition: {
          page: 1,
          per_page: 20
        },
        permission: ['监控中心', '店铺管理', '订单管理', '营销管理', '商城设置', '资金管理', '平台管理'],
        Visible: false,
        dialogType: [{
          'title': '新增',
          'btn': "添加"
        }, {
          'title': '编辑',
          'btn': "完成"
        }],
        rules: {
          contact_name: [{
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }],
          phone: [{
            required: true,
            message: '请输入电话',
            trigger: 'blur'
          }],
          permission: [{
            type: 'array',
            required: true,
            message: '请至少选择一个权限',
            trigger: 'change'
          }],
        },
        dialogIndex: 1,
        form: {
          contact_name: "",
          phone: '',
          permission: [],
        },
      }
    },
    mixins: [page],
    components: {
      Navbar
    },
    methods: {
      SelectionChange(arr, row) {
        this.selectArr = arr;
      },
      cancel() {
        this.$refs['ruleForm'].resetFields();
        this.Visible = false;
      },
      _doSearch() {
        platformLists(this.searchCondition)
          .then(({
            data
          }) => {
            if(data.data.length==0&&data.total>0){
              this.handleCurrentChange(data.last_page)
            }
           this.list = data.data;
           this.total = data.total;
          })
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
        let arr = {data:[]};
          for (let val of this.selectArr) {
            arr.data.push({user_id:val.user_id})
          }
          deletePlatform(arr).then(({
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
      edit(list, index) {
        list = JSON.parse(JSON.stringify(list));
        //传数据到弹窗\
        this.Visible = true;
        this.actionIndex = index;
        let arr = [];
        if (list.is_admin == 1) {
          arr = JSON.parse(JSON.stringify(this.permission));
        } else {
          for (let val of list.permission) {
            arr.push(this.permission[val])
          }
        }
        this.form = {
          contact_name: list.contact_name,
          permission: arr,
          user_id: list.user_id,
        }
        this.dialogIndex = 1;
      },
      add() {
        this.dialogIndex = 0;
        if (this.page != this.lastPage) {
          this.handleCurrentChange(this.lastPage)
        }
        this.form = {
          contact_name: '',
          phone: '',
          permission: [],
        }
        this.Visible = true;
        if (this.$refs['ruleForm']) {
          this.$refs['ruleForm'].resetFields();
        }
      },
      submitForm(formName) {
        this.Visible = false;
        let item = JSON.parse(JSON.stringify(this.form))
        item.permission = item.permission.map((val) => {
          return this.permission.indexOf(val)
        })
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            return false;
          }
          if (this.dialogIndex == 0) {
            addPlatform(item).then(({
              data
            }) => {
              this.list.push(data)
              this.$message.success("添加成功");
            })
          } else { //发送修改请求
            savePermission(item).then(({
              data
            }) => {
              this.list.splice(this.actionIndex, 1, data)
              this.$message.success("保存成功");
              this.actionIndex = "";
            })
          }
        });
      },
    }
  }

</script>


<style media="screen" lang="scss">
  .platform {
    .el-dialog {
      width: 526px;
    }
    .el-dialog__body {
      .hr {
        padding-top: 30px;
        border-top: 2px solid #d8d8d8;
      }
      .el-checkbox+.el-checkbox {
        margin-left: 0;
        margin-right: 20px;
      }
      .el-checkbox {
        margin-right: 20px;
        .el-checkbox__inner {
          width: 16px;
          height: 16px;
          border-radius: 2px;
        }
      }
    }
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
  }

</style>
