<template>
  <div class="platform commodity">
    <div class="g-content">
      <el-tabs v-model="tabForShow" @tab-click="tabSwitch">
        <el-tab-pane label="代理商" name="1"></el-tab-pane>
        <el-tab-pane label="合伙人" name="2"></el-tab-pane>
        <el-tab-pane label="服务商" name="3"></el-tab-pane>
      </el-tabs>
      <div class="mt-20">
        <label class="mr-20 ml-20">性质选择：</label>
        <el-radio v-model="is_company" :label="1" class="mr-20">企业</el-radio>
        <el-radio v-model="is_company" :label="2">个人</el-radio>
      </div>
      <el-form :model="form" label-width="120px" class="mt-20">
        <el-form-item label="姓名：">
          <el-input v-model="form.name" size="small" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-radio-group v-model="form.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="身份证号：">
          <el-input v-model="form.identity_num" size="small" :maxlength='18' :minlength='18' placeholder="请输入身份证号码18位"></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input v-model="form.phone" size="small" :maxlength='11' :minlength='11' type="tel" placeholder="请输入手机号11位"></el-input>
        </el-form-item>
        <el-form-item label="QQ号：">
          <el-input v-model="form.wx_qq" size="small"></el-input>
        </el-form-item>
        <el-form-item label="所在地区：">
          <city :areaSelect.sync="form.city" :placeholder="'请选择地区'"></city>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="form.contact_email" size="small" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="地址(选填)：">
          <el-input v-model="form.address" size="small" placeholder="请输入详细地址"></el-input>
        </el-form-item>
        <el-form-item label="公司名称：">
          <el-input v-model="form.company_name" size="small" placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <el-form-item label="业务范围：">
          <el-select v-model="form.business_range" :multiple="tabForShow==2" placeholder="请选择业务范围">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        options: [
          {
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
          name: "",
          sex: "",
          identity_num: '',
          phone: '',
          wx_qq: '',
          city: [],
          contact_email: '',
          address: '',
          company_name: '',
          business_range: ""
        }
      }
    },
    methods: {
      tabSwitch() {}
    }
  }

</script>

<style scoped>
  .g-content {
    font-size: 14px;
  }

</style>
