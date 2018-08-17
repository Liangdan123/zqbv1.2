<template>
  <div class="platform commodity">
    <div class="g-content">
      <div class="header">详情信息
        	<el-button class="store-button2 edit mb-10 float-r" @click="edit" v-if="tab==1||tab==2">
            <i class="iconfont icon-Rectangle f12"></i>
            <span class="font-b" >编辑信息</span>
          </el-button>
      </div>
      <div class="msg">
        <p>
          <span>所属区域：</span>{{list.city}}
        </p>
        <p>
          <span>加盟角色：</span>{{list.type==2?"代理商":list.type==3?"合伙人":"服务商"}}
        </p>
        <p>
          <span>性质：</span>{{list.is_company==0?'个人':'企业'}}
        </p>
        <p v-if="!isEdit">
          <span>姓名：</span>{{list.contact_name}}
        </p>
        <p v-if="!isEdit">
          <span>性别：</span>{{list.sex==1?'男':'女'}}
        </p>
        <p>
          <span>手机号：</span>{{list.phone}}
        </p>
        <p v-if="list.is_company==1&&!isEdit">
          <span>QQ：</span>{{list.wx_qq}}
        </p>
        <p v-if="!isEdit">
          <span>地址：</span>{{list.address}}
        </p>
        <p v-if="list.is_company==1&&!isEdit">
          <span>公司名称：</span>{{list.company_name}}
        </p>
         <p v-if="list.type!=2">
          <span>业务范围：</span>{{list.business_range_name}}
        </p>
      </div>
      <div class="clearfix img" v-if="!isEdit">
        <div>
          <div>营业执照副本扫描件（三证合一时）</div>
          <img :src="list.license_url" class="imageUpload"/>
        </div>
         <div class="">
          <div>法人身份证（正面）</div>
          <img :src="list.license_url" class="imageUpload"/>
        </div>
         <div class="">
          <div>法人身份证（反面）</div>
          <img :src="list.license_url" class="imageUpload"/>
        </div>
      </div>
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
      <div class="clearfixs floot">
        <router-link to="join">
          <!-- 返回join的哪个tab -->
          <el-button class='float-r ml-20' :class="[tab==1||tab==2? 'store-button2 ':'store-button1']">{{(tab==1&&tab==2)?"取消":"返回"}}</el-button>
        </router-link>
        <!-- 通过申请的按钮 -->
        <el-button class='store-button1 float-r ml-20' v-if="tab==1">确定</el-button>
        <el-button class='store-button1 float-r ml-20' v-if="isEdit" @click="save">保存</el-button>
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
        tab:"",
        id:"",
        isEdit:false,
        list: {
          "join_id": 1,
          "join_no": "J18013110204412011155",
          "mall_id": 1,
          "is_company": 1,
          "type": 3,
          "cps_id": 0,
          "contact_name": "小王",
          "sex": 1,
          "identity_num": "330702211112222222",
          "phone": "18457922111",
          "wx_qq": "3323312",
          "contact_email": "cs@163.com",
          "province": "浙江省",
          "city": "金华市",
          "address": "豪森智慧谷6幢",
          "company_name": "快服科技",
          "business_range": "1,2,3",
          "business_range_name": "app开发,管理软件,人力资源",
          "license_url": "uploads/1/product/3/2018-07-26-14-30-38-5b596a8e76b2a.png",
          "identity_front_url": "uploads/1/product/3/2018-07-26-14-30-38-5b596a8e76b2a.png",
          "identity_back_url": "uploads/1/product/3/2018-07-26-14-30-38-5b596a8e76b2a.png",
          "pay_fee_yuan": 1000,
          "pay_type": "weixin",
          "audit_status": 1,
          "pay_status": 0,
          "commit_time": "2018-08-07 08:45:11",
          "audit_time": "2018-08-07 08:45:11",
          "pay_time": null,
          "remark": null,
          "created_at": "2018-08-07 08:45:11"
        },
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
        form: {         
        },
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
          license_url:[{
            required: true,
            message: '请上传营业执照复印件',
            trigger: 'change'
          }],
           identity_front_url:[{
            required: true,
            message: '请上传身份证正面图片',
            trigger: 'change'
          }],
           identity_back_url:[{
            required: true,
            message: '请上传身份证反面图片',
            trigger: 'change'
          }]
        },
        imageType: "identity", //图片类型
      }
    },
    created(){
      this.id=this.$route.query.id;
      this.tab=this.$route.query.tab;
      this.tab=2;
    },
    components: {
      imageUpload
    },
    methods: {
      // tabSwitch(tab) {
      //   // 清除表单数据
      //   this.$refs['ruleForm'].resetFields();
      //   if (tab.name == 3) {
      //     this.form.business_range = []
      //   } else if (tab.name == 4) {
      //     this.form.business_range = ""
      //   }
      // },
      save(){
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.isEdit=false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      edit(){
        let data={
          "join_id":this.list.join_id,
          "contact_name": this.list.contact_name,
          "sex": this.list.sex,
          "identity_num": this.list.identity_num,
          "contact_email":this.list.contact_email,
          "address": this.list.address,
          "license_url": this.list.license_url,
          "identity_front_url": this.list.identity_front_url,
          "identity_back_url": this.list.identity_back_url
        };
        if(this.list.is_company==1){
          data.wx_qq= this.list.wx_qq;
          data.company_name= this.list.company_name;
        }
        this.form=data;
        this.isEdit=true;
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
    margin-right: 20%;
    margin-bottom: 50px;
  }

</style>

<style lang="scss" scoped>
  .msg{
    color:#333;
    margin-top:10px;
    >p>span{
      display: inline-block;
      color:#7F7F7F;
      width:75px;
      text-align: right;
      padding:5px;
    }
  }
  .img{
    margin-top: 40px;
    div{
      color:#333;
      margin-bottom: 10px;
      float: left;
      width:450px;
    }
  }
    .imageUpload {
      width: 400px;
      height: 239px;
      border:1px dashed #D6D6D6;
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
      .el-form-item__label{
          color:#333;
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
