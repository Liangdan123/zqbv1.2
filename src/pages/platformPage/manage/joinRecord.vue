<template>
  <div class="platform commodity">
    <div class="g-content">
      <div class="header">详情信息
        <el-button class="store-button2 edit mb-10 float-r" @click="edit" v-if="(tab==1||tab==2)&&path=='join'&&!isEdit">
          <i class="iconfont icon-Rectangle f12"></i>
          <span class="font-b">编辑信息</span>
        </el-button>
      </div>
      <joinMsgDetail :list="list" :isEdit='isEdit'></joinMsgDetail>
      <el-form :model="form" label-width="100px" class="mt-20 clearfix join" :rules="rules" ref="ruleForm" v-if="isEdit">
        <el-form-item label="姓名：" prop="contact_name">
          <el-input v-model="form.contact_name" size="small" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="sex">
          <el-radio-group v-model.number="form.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="身份证号：" prop="identity_num">
          <el-input v-model="form.identity_num" size="small" :maxlength='18' :minlength='18' placeholder="请输入身份证号码18位"></el-input>
        </el-form-item>
        <el-form-item label="QQ号：" v-if="list.is_company==1" prop="wx_qq">
          <el-input v-model="form.wx_qq" size="small" placeholder="请输入qq号"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="contact_email">
          <el-input v-model="form.contact_email" size="small" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="地址(选填)：">
          <el-input v-model="form.address" size="small" placeholder="请输入详细地址"></el-input>
        </el-form-item>
        <el-form-item label="公司名称：" v-if="list.is_company==1" prop="company_name">
          <el-input v-model="form.company_name" size="small" placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <div class="clearfix"></div>
        <el-form-item label="营业执照副本扫描件（三证合一时）：" prop="license_url" class="identity">
          <imageUpload :imageUrl="form.license_url" :imageType="imageType" @getImageUrl="licenseView">
          </imageUpload>
        </el-form-item>
        <el-form-item label="法人身份证（正面）：" prop="identity_front_url" class="identity ml-10">
          <imageUpload :imageUrl="form.identity_front_url" :imageType="imageType" @getImageUrl="frontalView">
          </imageUpload>
        </el-form-item>
        <el-form-item label="法人身份证（反面）：" prop="identity_back_url" class="identity ml-10">
          <imageUpload :imageUrl="form.identity_back_url" :imageType="imageType" @getImageUrl="reverseView">
          </imageUpload>
        </el-form-item>
        <div class="clearfix"></div>
      </el-form>
      <div v-if="tab==1&&path=='join'" class="mt-10 mb-10">
        <el-radio class="radio ml=20" v-model="status" label="1">通过申请</el-radio>
        <el-radio class="radio ml=20" v-model="status" label="2">拒绝申请</el-radio>
      </div>
      <div class="clearfixs floot">
        <router-link :to="{path:path,query:{'tab':tab}}">
          <!-- 返回join的哪个tab -->
          <el-button class='float-r ml-20' :class="[(tab==1||tab==2)&&path=='join'? 'store-button2 ':'store-button1']">{{(tab==1||tab==2)?"取消":"返回"}}</el-button>
        </router-link>
        <!-- 通过申请的按钮 -->
        <el-button class='store-button1 float-r ml-20' v-if="tab==1&&path=='join'&&!isEdit">确定</el-button>
        <el-button class='store-button1 float-r ml-20' v-if="isEdit" @click="save">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
	import {getApplication,updateApplication} from "@/api/platform"
  import router from '@/router'
  export default {
    data() {
      return {
        status: "1",
        tab: "",
        join_id: "",
        isEdit: false,
        list: {},
        options: [],
        form: {},
        rules: {
          contact_name: [{
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }, ],
          sex: [{
            type: 'number',
            required: true,
            message: '请选择性别',
            trigger: 'change'
          }],
          identity_num: [{
              required: true,
              message: '请输入身份证号',
              trigger: 'blur'
            },
            {
              pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
              message: '证件号码不正确'
            }
          ],
          wx_qq: [{
              required: true,
              message: '请输入qq号',
              trigger: 'blur'
            },
            {
              pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
              message: '输入正确的QQ号'
            }
          ],
          contact_email: [{
              required: true,
              message: '请输入邮箱',
              trigger: 'blur'
            },
            {
              pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
              message: '请输入正确的邮箱'
            }
          ],
          company_name: [{
            required: true,
            message: '请输入公司名称',
            trigger: 'blur'
          }],
          license_url: [{
            required: true,
            message: '请上传营业执照复印件',
            trigger: 'change'
          }],
          identity_front_url: [{
            required: true,
            message: '请上传身份证正面图片',
            trigger: 'change'
          }],
          identity_back_url: [{
            required: true,
            message: '请上传身份证反面图片',
            trigger: 'change'
          }]
        },
        imageType: "identity", //图片类型
      }
    },
    created() {
      this.join_id = this.$route.query.id;
      this.path = this.$route.query.path;
      this.tab = this.$route.query.tab || null;
      //根据id查记录
      getApplication(this.id).then(({data})=>{
          this.list=data;
      })
    },
    methods: {
      save() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.isEdit = false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      edit() {
        let data = {
          "join_id": this.list.join_id,
          "contact_name": this.list.contact_name,
          "sex": this.list.sex,
          "identity_num": this.list.identity_num,
          "contact_email": this.list.contact_email,
          "address": this.list.address,
          "license_url": this.list.license_url,
          "identity_front_url": this.list.identity_front_url,
          "identity_back_url": this.list.identity_back_url
        };
        if (this.list.is_company == 1) {
          data.wx_qq = this.list.wx_qq;
          data.company_name = this.list.company_name;
        }
        this.form = data;
        this.isEdit = true;
      },
      licenseView(data) {
        console.log(data)
        this.form.license_url = data.new_url
      },
      frontalView(data) {
        this.form.identity_front_url = data.new_url
      },
      reverseView(data) {
        this.form.identity_back_url = data.new_url
      },
    }
  }

</script>

<style lang="scss" scoped>
  .g-content {
    font-size: 14px;
  }

  .header {
    color: #333333;
    font-size: 20px;
  }

  .floot {
    margin-right: 20%;
    margin-bottom: 50px;
  }

 .imageUpload {
    width: 400px;
    height: 239px;
    border: 1px dashed #D6D6D6;
  }

</style>

<style lang="scss">
  .join {
    .el-form-item {
      width: 450px;
      float: left;
      height: 36px;
      .el-input {
        width: 300px;
        .el-input__inner {
          border-radius: 2px;
          border: 1px solid rgba(236, 236, 236, 1)
        }
      }
      .area-select.large {
        width: 300px;
        border-radius: 2px;
        border: 1px solid rgba(236, 236, 236, 1)
      }
      .cascader-menu-option {
        width: 290px;
      }
      .el-form-item__label {
        color: $color-light;
      }
      &.identity {
        height: inherit;
        label {
          display: block;
          text-align: left;
          width: 100% !important;
        }
        .el-form-item__content {
          margin: 0 !important;
        }
      }
    }
  }

</style>
