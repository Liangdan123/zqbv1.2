<template>
  <div class="platform commodity">
    <div class="g-content">
      <div class="header">添加角色</div>
      <el-tabs v-model="tabForShow" @tab-click="tabSwitch">
        <el-tab-pane label="代理商" name="2"></el-tab-pane>
        <el-tab-pane label="合伙人" name="3"></el-tab-pane>
        <el-tab-pane label="服务商" name="4"></el-tab-pane>
      </el-tabs>
      <div class="mt-20">
        <label class="mr-20 ml-20">性质选择：</label>
        <el-radio v-model="is_company" :label="1" class="mr-20">企业</el-radio>
        <el-radio v-model="is_company" :label="2">个人</el-radio>
      </div>
      <el-form :model="form" label-width="120px" class="mt-20 clearfix join" :rules="rules" ref="ruleForm">
        <el-form-item label="姓名：" prop="contact_name">
          <el-input v-model="form.contact_name" size="small" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="sex">
          <el-radio-group v-model="form.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="身份证号：" prop="identity_num">
          <el-input v-model="form.identity_num" size="small" :maxlength='18' :minlength='18' placeholder="请输入身份证号码18位"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="phone">
          <el-input v-model="form.phone" size="small" :maxlength='11' :minlength='11' type="tel" placeholder="请输入手机号11位"></el-input>
        </el-form-item>
        <el-form-item label="QQ号：" v-if="is_company==1" prop="wx_qq">
          <el-input v-model="form.wx_qq" size="small" placeholder="请输入qq号"></el-input>
        </el-form-item>
        <el-form-item label="所在地区：" prop="city">
          <city :areaSelect.sync="form.city" :placeholder="'请选择地区'"></city>
        </el-form-item>
        <el-form-item label="邮箱：" prop="contact_email">
          <el-input v-model="form.contact_email" size="small" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="地址(选填)：">
          <el-input v-model="form.address" size="small" placeholder="请输入详细地址"></el-input>
        </el-form-item>
        <el-form-item label="公司名称：" v-if="is_company==1" prop="company_name">
          <el-input v-model="form.company_name" size="small" placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <el-form-item label="业务范围：" v-if="tabForShow!=2" prop="business_range">
          <el-select v-model="form.business_range" :multiple="tabForShow==3" placeholder="请选择业务范围" size="small">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
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
      <div class="clearfixs floot">
        <router-link to="join">
          <el-button class='store-button2 float-r ml-20'>取消</el-button>
        </router-link>
        <el-button class='store-button1 float-r ml-20' @click="add">添加</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import imageUpload from "@/components/func/imageUpload"
  import router from '@/router'

  export default {
    data() {
      return {
        options: [{
            value: "1",
            label: "工商注册、财务记账"
          },
          {
            value: "2",
            label: "管理软件"
          },
          {
            value: "3",
            label: "网站app开发"
          },
          {
            value: "4",
            label: "人力资源"
          },
          {
            value: "5",
            label: "资质许可证"
          },
          {
            value: "6",
            label: "认证服务"
          },
          {
            value: "7",
            label: "知识产权"
          },
          {
            value: "8",
            label: "企业信用评级"
          },
          {
            value: "9",
            label: "法律顾问"
          },
          {
            value: "10",
            label: "投融资"
          }
        ],
        tabForShow: "2",
        is_company: 1,
        form: {
          contact_name: "",
          sex: "",
          identity_num: '',
          phone: '',
          wx_qq: '',
          city: [],
          contact_email: '',
          address: '',
          company_name: '',
          business_range: "",
          license_url: "",
          identity_front_url: "",
          identity_back_url: "",
        },
        rules: {
          contact_name: [{
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }, ],
          sex: [{
            required: true,
            message: '请选择性别',
            trigger: 'change'
          }, ],
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
          phone: [{
              required: true,
              message: '请输入手机号',
              trigger: 'blur'
            },
            {
              pattern: /^1[34578]\d{9}$/,
              message: '目前只支持中国大陆的手机号码'
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
          city: [{
            required: true,
            message: '请选择城市',
            trigger: 'change'
          }],
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
          business_range: [{
            required: true,
            message: '请选择经营范围',
            trigger: 'change'
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
    components: {
      imageUpload
    },
    methods: {
      add() {
        router.push("join")
      },
      tabSwitch(tab) {
        // 清除表单数据
        this.$refs['ruleForm'].resetFields();
        if (tab.name == 3) {
          this.form.business_range = []
        } else if (tab.name == 4) {
          this.form.business_range = ""
        }
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

<style scoped>
  .g-content {
    font-size: 14px;
  }

  .header {
    color: #333333;
    font-size: 20px;
  }

  .floot {
    margin-right: 30%;
    margin-bottom: 50px;
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
    .imageUpload {
      width: 400px;
      height: 219px;
    }
  }

</style>
